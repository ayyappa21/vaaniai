import { Voice, LANGUAGES } from "./data";

export const BCP47_MAP: Record<string, string> = {
  te: "te-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  mr: "mr-IN",
  bn: "bn-IN",
  gu: "gu-IN",
  pa: "pa-IN",
  or: "or-IN",
  ur: "ur-IN",
  en: "en-IN",
};

/**
 * Universal Speech Engine
 * Supports:
 * 1. Web Speech API with BCP-47 regional voice match & boundary events
 * 2. HTML5 Audio playback for Neural WAV audio streams
 * 3. Fallback sound generation
 */
export class SpeechPlayer {
  private static activeUtterance: SpeechSynthesisUtterance | null = null;
  private static activeAudio: HTMLAudioElement | null = null;

  public static stopAll() {
    if (typeof window !== "undefined") {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (this.activeAudio) {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
        this.activeAudio = null;
      }
      this.activeUtterance = null;
    }
  }

  public static speakWithWebSpeech(
    text: string,
    langCode: string,
    options?: {
      rate?: number;
      pitch?: number;
      onWord?: (wordIndex: number) => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): boolean {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return false;
    }

    this.stopAll();

    const bcpTag = BCP47_MAP[langCode] || langCode;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = bcpTag;
    utterance.rate = options?.rate || 1.0;
    utterance.pitch = options?.pitch || 1.0;

    // Attempt to match installed browser voice for this regional language
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.toLowerCase() === bcpTag.toLowerCase() || v.lang.startsWith(langCode)
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    const words = text.split(/\s+/).filter(Boolean);
    let wordIdx = 0;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        if (options?.onWord) {
          options.onWord(wordIdx);
          wordIdx++;
        }
      }
    };

    utterance.onend = () => {
      this.activeUtterance = null;
      options?.onEnd?.();
    };

    utterance.onerror = () => {
      this.activeUtterance = null;
      options?.onError?.();
    };

    this.activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  /**
   * Primary Multilingual Speech Synthesis Method
   * 1. Attempts Neural Speech synthesis from FastAPI backend (Azure Neural Indic / gTTS / macOS say).
   * 2. Automatically decodes and streams PCM WAV audio with karaoke timestamp tracking.
   * 3. Gracefully falls back to browser Web Speech API if offline or backend unavailable.
   */
  public static async speak(
    text: string,
    langCode: string,
    options?: {
      voiceId?: string;
      speed?: number;
      pitch?: number;
      emotion?: string;
      onWord?: (wordIndex: number) => void;
      onTimeUpdate?: (currentTime: number) => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): Promise<boolean> {
    this.stopAll();

    // 1. High-fidelity Neural Indic TTS synthesis via backend
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          language: langCode,
          voice_id: options?.voiceId,
          speed: options?.speed || 1.0,
          pitch: options?.pitch || 1.0,
          emotion: options?.emotion || "neutral",
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audio_base64) {
          this.playAudioUrl(data.audio_base64, {
            rate: options?.speed || 1.0,
            onTimeUpdate: (currentTime) => {
              options?.onTimeUpdate?.(currentTime);
              if (data.timestamps && options?.onWord) {
                const idx = data.timestamps.findIndex(
                  (ts: { start_time: number; end_time: number }) =>
                    currentTime >= ts.start_time && currentTime <= ts.end_time
                );
                if (idx !== -1) options.onWord(idx);
              }
            },
            onEnd: options?.onEnd,
            onError: () => {
              // Fallback to Web Speech if audio element fails to play
              this.speakWithWebSpeech(text, langCode, options);
            },
          });
          return true;
        }
      }
    } catch {
      // Backend unavailable / timeout -> proceed to Web Speech API fallback
    }

    // 2. Fallback: Browser Web Speech API
    return this.speakWithWebSpeech(text, langCode, options);
  }

  public static playAudioUrl(
    url: string,
    options?: {
      rate?: number;
      volume?: number;
      onTimeUpdate?: (currentTime: number) => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): HTMLAudioElement {
    this.stopAll();

    const audio = new Audio(url);
    audio.playbackRate = options?.rate || 1.0;
    audio.volume = options?.volume !== undefined ? options.volume : 1.0;

    if (options?.onTimeUpdate) {
      audio.ontimeupdate = () => {
        options.onTimeUpdate?.(audio.currentTime);
      };
    }

    audio.onended = () => {
      this.activeAudio = null;
      options?.onEnd?.();
    };

    audio.onerror = () => {
      this.activeAudio = null;
      options?.onError?.();
    };

    this.activeAudio = audio;
    audio.play().catch(() => {
      options?.onError?.();
    });

    return audio;
  }
}
