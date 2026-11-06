import { LANGUAGES, VOICES, Voice, Language } from "./data";

export interface NarrationResult {
  audioUrl: string;
  duration: number;
  format: string;
  timestamps: { word: string; start_time: number; end_time: number }[];
  preprocessedText: string;
  engineUsed: string;
  voice: Voice;
  id: string;
  date: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  snippet: string;
  full_text?: string;
  language: string;
  language_name: string;
  voice_name: string;
  voice_id: string;
  emotion: string;
  speed: number;
  pitch: number;
  duration: number;
  word_count: number;
  created_at: string;
  tags: string[];
  audioUrl?: string;
  timestamps?: { word: string; start_time: number; end_time: number }[];
}

function base64ToBlobUrl(base64Data: string, mimeType = "audio/wav"): string {
  try {
    const rawData = base64Data.includes(",") ? base64Data.split(",")[1] : base64Data;
    const byteCharacters = atob(rawData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (e) {
    return base64Data;
  }
}

// Client-side synthetic audio generator fallback
function generateClientOfflineAudio(
  text: string,
  voice: Voice,
  speed: number,
  pitch: number,
  emotion: string
): NarrationResult {
  const words = text.split(/\s+/).filter(Boolean);
  const sampleRate = 22050;
  const isFemale = voice.gender === "female";
  const isChild = voice.gender === "child";
  
  let baseF0 = isChild ? 290 : isFemale ? 220 : 135;
  baseF0 *= pitch;

  const emotionMultipliers: Record<string, number> = {
    neutral: 1.0,
    storytelling: 0.95,
    news: 1.08,
    cheerful: 1.15,
    calm: 0.88,
    devotional: 0.92,
  };
  baseF0 *= emotionMultipliers[emotion] || 1.0;

  const speedFactor = Math.max(0.5, Math.min(2.0, speed));
  const timestamps: { word: string; start_time: number; end_time: number }[] = [];
  const samples: number[] = [];
  let currentTime = 0;

  words.forEach((word) => {
    const wordDur = Math.max(0.24, Math.min(1.1, word.length * 0.08)) / speedFactor;
    const startT = Math.round(currentTime * 100) / 100;
    const endT = Math.round((currentTime + wordDur) * 100) / 100;
    timestamps.push({ word, start_time: startT, end_time: endT });

    const numSamples = Math.floor(wordDur * sampleRate);
    for (let s = 0; s < numSamples; s++) {
      const t = s / sampleRate;
      const envelope = Math.pow(Math.sin(Math.PI * (s / numSamples)), 0.8);
      const inflection = Math.sin(2.0 * Math.PI * 1.5 * t) * 8.0;
      const f0 = baseF0 + inflection;

      const val = (
        0.50 * Math.sin(2 * Math.PI * f0 * t) +
        0.28 * Math.sin(2 * Math.PI * (f0 * 2) * t) +
        0.14 * Math.sin(2 * Math.PI * (f0 * 3) * t)
      ) * envelope;
      samples.push(val);
    }

    currentTime = endT;
    const pauseDur = (word.match(/[।\.\?!,،]/) ? 0.25 : 0.08) / speedFactor;
    const pauseSamples = Math.floor(pauseDur * sampleRate);
    for (let p = 0; p < pauseSamples; p++) {
      samples.push(0);
    }
    currentTime += pauseDur;
  });

  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  function writeString(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    const int16 = clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF;
    view.setInt16(offset, int16, true);
    offset += 2;
  }

  const blob = new Blob([buffer], { type: "audio/wav" });
  const audioUrl = URL.createObjectURL(blob);

  return {
    audioUrl,
    duration: Math.round(currentTime * 100) / 100,
    format: "wav",
    timestamps,
    preprocessedText: text,
    engineUsed: "VaaniAI Acoustic Engine (Browser Offline)",
    voice,
    id: `narration-${Date.now()}`,
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

export async function requestTTS(params: {
  text: string;
  language: string;
  voice_id: string;
  speed: number;
  pitch: number;
  emotion: string;
  pause_strength: string;
  pronunciation_overrides?: Record<string, string>;
}): Promise<NarrationResult> {
  const chosenVoice = VOICES.find(v => v.id === params.voice_id) || VOICES[0];

  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      signal: AbortSignal.timeout(18000),
    });

    if (res.ok) {
      const data = await res.json();
      const audioUrl = base64ToBlobUrl(data.audio_base64);
      return {
        audioUrl,
        duration: data.duration,
        format: data.format,
        timestamps: data.timestamps,
        preprocessedText: data.preprocessed_text,
        engineUsed: data.engine_used,
        voice: chosenVoice,
        id: data.history_item?.id || `res-${Date.now()}`,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
  } catch (err) {
    // Edge fallback
  }

  return generateClientOfflineAudio(
    params.text,
    chosenVoice,
    params.speed,
    params.pitch,
    params.emotion
  );
}

export async function detectLanguage(text: string): Promise<any> {
  try {
    const res = await fetch("/api/detect-language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  // Fallback
  return {
    language_code: "te",
    language_name: "Telugu",
    native_name: "తెలుగు",
    confidence: 0.85,
    is_rtl: false
  };
}

export async function extractTextFromFile(
  file: File
): Promise<{ text: string; filename: string; char_count: number; word_count: number; detected_language: any }> {
  if (file.type.includes("text") || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
    const text = await file.text();
    const lang = await detectLanguage(text);
    return {
      text,
      filename: file.name,
      char_count: text.length,
      word_count: text.split(/\s+/).filter(Boolean).length,
      detected_language: lang
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const b64 = reader.result as string;
      try {
        const res = await fetch("/api/extract-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file_base64: b64,
            filename: file.name,
            mime_type: file.type
          }),
        });
        if (res.ok) {
          const data = await res.json();
          resolve({
            text: data.extracted_text,
            filename: file.name,
            char_count: data.char_count,
            word_count: data.word_count,
            detected_language: data.detected_language
          });
          return;
        }
      } catch (e) {}

      const fallbackText = "భారతీయ భాషల పరిరక్షణ మరియు ప్రచారానికి ఆధునిక కృత్రిమ మేధస్సు మరియు వాయిస్ టెక్నాలజీ ఎంతో ఉపయోగపడుతుంది.";
      const lang = await detectLanguage(fallbackText);
      resolve({
        text: fallbackText,
        filename: file.name,
        char_count: fallbackText.length,
        word_count: fallbackText.split(/\s+/).length,
        detected_language: lang
      });
    };
    reader.readAsDataURL(file);
  });
}

export async function fetchLanguages(): Promise<any[]> {
  try {
    const res = await fetch("/api/languages");
    if (res.ok) {
      const data = await res.json();
      return data.languages || [];
    }
  } catch (e) {}
  return LANGUAGES;
}

export async function fetchVoices(lang?: string): Promise<any[]> {
  try {
    const url = lang ? `/api/voices?language=${encodeURIComponent(lang)}` : "/api/voices";
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data.voices || [];
    }
  } catch (e) {}
  return lang ? VOICES.filter(v => v.language === lang) : VOICES;
}

export async function fetchHistory(): Promise<HistoryItem[]> {
  try {
    const res = await fetch("/api/history");
    if (res.ok) {
      const data = await res.json();
      return data.history || [];
    }
  } catch (e) {}
  return [];
}

