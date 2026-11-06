"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AudioWaveform } from "@/components/AudioWaveform";
import { PronunciationModal } from "@/components/PronunciationModal";
import { VoiceComparisonModal } from "@/components/VoiceComparisonModal";
import {
  Mic2,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Download,
  Share2,
  Trash2,
  FileText,
  Upload,
  Camera,
  Globe,
  Sliders,
  Sparkles,
  Volume2,
  VolumeX,
  Check,
  ArrowLeftRight,
  Clock,
  Layers,
  ChevronDown,
  Info,
  Radio,
  BookOpen,
  Newspaper,
  Smile,
  Heart,
  Flame,
  Zap,
  HelpCircle,
  Volume1
} from "lucide-react";
import { LANGUAGES, VOICES, SAMPLE_TEXTS_BY_LANG, Voice, Language } from "@/lib/data";
import { requestTTS, detectLanguage, extractTextFromFile, NarrationResult } from "@/lib/api";
import { SpeechPlayer, BCP47_MAP } from "@/lib/audioEngine";
import { useLanguage } from "@/context/LanguageContext";

export default function StudioPage() {
  const { uiLanguage, t } = useLanguage();

  // Input mode tab: "text" | "file" | "ocr" | "url"
  const [activeTab, setActiveTab] = useState<"text" | "file" | "ocr" | "url">("text");
  
  // Editor text & detected language
  const [text, setText] = useState(SAMPLE_TEXTS_BY_LANG["te"]);
  const [selectedLanguage, setSelectedLanguage] = useState("te");
  const [engineMode, setEngineMode] = useState<"neural" | "webspeech">("neural");
  
  const [detectedLangInfo, setDetectedLangInfo] = useState<{
    code: string;
    name: string;
    native: string;
    confidence: number;
    isRtl?: boolean;
  }>({
    code: "te",
    name: "Telugu",
    native: "తెలుగు",
    confidence: 0.98,
    isRtl: false
  });

  // Voice & acoustic controls
  const [selectedVoiceId, setSelectedVoiceId] = useState("te-IN-swara");
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [emotion, setEmotion] = useState<string>("storytelling");
  const [pauseStrength, setPauseStrength] = useState<string>("medium");
  
  // Phonetic overrides map (word -> phonetic)
  const [pronunciationOverrides, setPronunciationOverrides] = useState<Record<string, string>>({});

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [narration, setNarration] = useState<NarrationResult | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("vaaniai-audio.wav");

  // Audio Playback state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reqSeqRef = useRef<number>(0);
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(6.0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [currentWordIdx, setCurrentWordIdx] = useState<number | null>(null);

  // Modals state
  const [editingWord, setEditingWord] = useState<string | null>(null);
  const [isPronunciationOpen, setIsPronunciationOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Filter voices by selected language
  const availableVoices = VOICES.filter(v => v.language === selectedLanguage);
  const currentVoice = availableVoices.find(v => v.id === selectedVoiceId) || availableVoices[0] || VOICES[0];
  const currentLangObj = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];

  // Auto-detect language when user types
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (text.trim().length > 3) {
        const detected = await detectLanguage(text);
        if (detected) {
          setDetectedLangInfo({
            code: detected.language_code,
            name: detected.language_name,
            native: detected.native_name,
            confidence: detected.confidence || 0.95,
            isRtl: detected.is_rtl || false
          });
        }
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [text]);

  // Handle language change (invalidates stale audio to prevent cross-language cache collisions)
  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    const newVoices = VOICES.filter(v => v.language === langCode);
    if (newVoices.length > 0) {
      setSelectedVoiceId(newVoices[0].id);
    }
    // Load sample text for selected language
    if (SAMPLE_TEXTS_BY_LANG[langCode]) {
      setText(SAMPLE_TEXTS_BY_LANG[langCode]);
    }

    // Stop and invalidate previous audio
    SpeechPlayer.stopAll();
    setIsPlaying(false);
    setNarration(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
    }
  };

  // Handle Voice Selection (invalidates previous audio so switching voices immediately updates output)
  const handleVoiceSelect = (vId: string) => {
    if (vId === selectedVoiceId) return;
    setSelectedVoiceId(vId);
    SpeechPlayer.stopAll();
    setIsPlaying(false);
    setNarration(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
    }
  };

  // Dedicated Voice Preview
  const handlePreviewVoice = async (voice: Voice) => {
    if (previewingVoiceId === voice.id) {
      SpeechPlayer.stopAll();
      setPreviewingVoiceId(null);
      return;
    }

    setPreviewingVoiceId(voice.id);
    const previewSnippet = text.trim() ? text.slice(0, 80) : currentLangObj.sample.slice(0, 80);
    await SpeechPlayer.speak(previewSnippet, voice.language, {
      voiceId: voice.id,
      speed: 1.0,
      onEnd: () => setPreviewingVoiceId(null),
      onError: () => setPreviewingVoiceId(null),
    });
  };

  // Handle Speed Change (invalidates previous audio to ensure fresh generation at exact speed)
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    SpeechPlayer.stopAll();
    setIsPlaying(false);
    setNarration(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
    }
  };

  // URL query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get("lang");
      const voiceParam = params.get("voice");
      if (langParam && LANGUAGES.some((l) => l.code === langParam)) {
        handleLanguageChange(langParam);
      }
      if (voiceParam && VOICES.some((v) => v.id === voiceParam)) {
        setSelectedVoiceId(voiceParam);
      }
    }
  }, []);

  // Generate Narration
  const handleGenerate = async () => {
    if (!text.trim()) return;
    const reqSeq = ++reqSeqRef.current;
    setIsGenerating(true);
    setIsPlaying(false);
    SpeechPlayer.stopAll();
    setCurrentWordIdx(null);

    try {
      if (engineMode === "webspeech") {
        const words = text.split(/\s+/).filter(Boolean);
        const estDuration = Math.max(2, (words.length * 0.45) / speed);
        setDuration(estDuration);
        setCurrentTime(0);
        setIsPlaying(true);

        const success = SpeechPlayer.speakWithWebSpeech(text, selectedLanguage, {
          rate: speed,
          pitch,
          onWord: (wIdx) => setCurrentWordIdx(wIdx),
          onEnd: () => {
            setIsPlaying(false);
            setCurrentWordIdx(null);
            setCurrentTime(estDuration);
          },
          onError: () => {
            setIsPlaying(false);
            setCurrentWordIdx(null);
          }
        });

        if (success) {
          setIsGenerating(false);
          return;
        }
      }

      // Neural synthesis mode
      const result = await requestTTS({
        text,
        language: selectedLanguage,
        voice_id: currentVoice.id,
        speed,
        pitch,
        emotion,
        pause_strength: pauseStrength,
        pronunciation_overrides: pronunciationOverrides
      });

      // Discard stale response if another generation was initiated
      if (reqSeq !== reqSeqRef.current) return;

      setNarration(result);
      setDuration(result.duration);
      setCurrentTime(0);

      // Stable download filename for this audio generation
      const safeId = result.id ? result.id.replace(/[^a-zA-Z0-9_-]/g, "") : "audio-latest";
      setDownloadFilename(`vaaniai-${selectedLanguage}-${safeId}.wav`);

      // Save to localStorage history
      try {
        const stored = JSON.parse(localStorage.getItem("vaani_history") || "[]");
        const newHist = [
          {
            id: result.id,
            title: text.slice(0, 35) + (text.length > 35 ? "..." : ""),
            snippet: text.slice(0, 100),
            full_text: text,
            language: selectedLanguage,
            language_name: currentLangObj.name,
            voice_name: `${result.voice.name} (${result.voice.native_name})`,
            voice_id: result.voice.id,
            emotion,
            speed,
            pitch,
            duration: result.duration,
            word_count: text.split(/\s+/).filter(Boolean).length,
            created_at: "Just now",
            tags: result.voice.tags,
            audioUrl: result.audioUrl,
            timestamps: result.timestamps
          },
          ...stored
        ].slice(0, 30);
        localStorage.setItem("vaani_history", JSON.stringify(newHist));
      } catch (e) {}

      // Play audio - set playbackRate to 1.0 because audio is already synthesized at target speed!
      if (audioRef.current) {
        audioRef.current.src = result.audioUrl;
        audioRef.current.playbackRate = 1.0;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (reqSeq === reqSeqRef.current) {
        setIsGenerating(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const t = audioRef.current.currentTime;
    setCurrentTime(t);

    if (narration?.timestamps) {
      const idx = narration.timestamps.findIndex(
        (ts) => t >= ts.start_time && t <= ts.end_time
      );
      if (idx !== -1 && idx !== currentWordIdx) {
        setCurrentWordIdx(idx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentWordIdx(null);
  };

  const togglePlayPause = () => {
    if (!narration && !isPlaying) {
      handleGenerate();
      return;
    }

    if (engineMode === "webspeech") {
      if (isPlaying) {
        SpeechPlayer.stopAll();
        setIsPlaying(false);
        setCurrentWordIdx(null);
      } else {
        handleGenerate();
      }
      return;
    }

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src && narration?.audioUrl) {
        audioRef.current.src = narration.audioUrl;
      }
      audioRef.current.playbackRate = 1.0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipSeconds = (sec: number) => {
    if (audioRef.current) {
      const newT = Math.max(0, Math.min(duration, audioRef.current.currentTime + sec));
      audioRef.current.currentTime = newT;
      setCurrentTime(newT);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackSpeed = (sp: number) => {
    setPlaybackSpeed(sp);
    if (audioRef.current) {
      audioRef.current.playbackRate = sp;
    }
  };

  // Download Audio WAV handler
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!narration?.audioUrl) {
      e.preventDefault();
      handleGenerate();
      return;
    }

    const targetFilename = downloadFilename || `vaaniai-${selectedLanguage}-${narration.id || "audio"}.wav`;
    const anchor = document.createElement("a");
    anchor.href = narration.audioUrl;
    anchor.download = targetFilename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    e.preventDefault();
  };

  // File / OCR Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await extractTextFromFile(file);
    setText(res.text);
    if (res.detected_language) {
      setSelectedLanguage(res.detected_language.language_code);
    }
    setActiveTab("text");
  };

  // URL extraction
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sampleText = SAMPLE_TEXTS_BY_LANG[selectedLanguage] || SAMPLE_TEXTS_BY_LANG["te"];
    setText(sampleText);
    setActiveTab("text");
  };

  // Pronunciation Fixer handlers
  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[।\.\?!,،؛:]/g, "");
    if (cleanWord.trim()) {
      setEditingWord(cleanWord);
      setIsPronunciationOpen(true);
    }
  };

  const handleSavePronunciation = (orig: string, phon: string) => {
    setPronunciationOverrides(prev => ({
      ...prev,
      [orig]: phon
    }));
  };

  const handlePreviewPhonetic = (phon: string) => {
    SpeechPlayer.speakWithWebSpeech(phon, selectedLanguage);
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [text, selectedLanguage, selectedVoiceId, speed, pitch, emotion, pauseStrength, engineMode]);

  const wordsList = text.split(/(\s+)/);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* 1. VISUAL LANGUAGE SELECTOR TILES (Accessible for non-English speakers) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span>{t("studio_step1_lang")}</span>
            </span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {currentLangObj.name} ({currentLangObj.native_name}) Selected
            </span>
          </div>

          {/* Visual Language Cards Horizontal Scroll / Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all card-hover-friendly ${
                    isSelected
                      ? "bg-gradient-to-tr from-indigo-600 via-indigo-700 to-amber-500 text-white shadow-lg shadow-indigo-500/30 scale-105 border-2 border-amber-300 ring-2 ring-amber-400/40"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400"
                  }`}
                >
                  <span className={`text-xl sm:text-2xl font-black mb-0.5 ${isSelected ? "text-amber-200" : "text-indigo-600 dark:text-indigo-400"}`}>
                    {lang.glyph}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold truncate w-full">
                    {lang.native_name}
                  </span>
                  <span className={`text-[10px] truncate w-full ${isSelected ? "text-indigo-100" : "text-slate-400"}`}>
                    {lang.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. MAIN TWO-PANE WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANE: Editor, Big Visual Ingestion Tabs, Karaoke View (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Visual Input Mode Navigation Tabs */}
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("text")}
                className={`py-2.5 px-2 rounded-2xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                  activeTab === "text"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 border-2 border-indigo-400"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span className="text-base sm:text-lg">✍️</span>
                <span>{t("studio_tab_type")}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("file")}
                className={`py-2.5 px-2 rounded-2xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                  activeTab === "file"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 border-2 border-indigo-400"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span className="text-base sm:text-lg">📄</span>
                <span>{t("studio_tab_file")}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ocr")}
                className={`py-2.5 px-2 rounded-2xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                  activeTab === "ocr"
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/25 border-2 border-amber-300"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span className="text-base sm:text-lg">📸</span>
                <span>{t("studio_tab_photo")}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("url")}
                className={`py-2.5 px-2 rounded-2xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                  activeTab === "url"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 border-2 border-indigo-400"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span className="text-base sm:text-lg">🌐</span>
                <span>{t("studio_tab_link")}</span>
              </button>
            </div>

            {/* TAB UPLOAD PANELS */}
            {activeTab === "file" && (
              <div className="p-6 rounded-3xl border-3 border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50/40 dark:bg-indigo-950/20 text-center space-y-3">
                <div className="text-4xl">📁</div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Drop your PDF, Word (DOCX), or Text file here
                  </h4>
                  <p className="text-xs text-slate-500">
                    పుస్తకం లేదా నోట్స్ ఫైల్ ఇక్కడ అప్‌లోడ్ చేయండి
                  </p>
                </div>
                <input
                  type="file"
                  accept=".txt,.docx,.pdf,.md"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-600 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
              </div>
            )}

            {activeTab === "ocr" && (
              <div className="p-6 rounded-3xl border-3 border-dashed border-amber-400 dark:border-amber-700 bg-amber-50/40 dark:bg-amber-950/20 text-center space-y-3">
                <div className="text-4xl">📷</div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Scan or Upload Photo of Printed Regional Book
                  </h4>
                  <p className="text-xs text-slate-500">
                    పుస్తక పేజీ లేదా పత్రిక ఫోటో తీసి ఇక్కడ అప్‌లోడ్ చేయండి
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-600 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-white hover:file:bg-amber-600 cursor-pointer"
                />
              </div>
            )}

            {activeTab === "url" && (
              <form onSubmit={handleUrlSubmit} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/regional-news-article"
                  className="flex-1 px-4 py-3 text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md"
                >
                  చదవండి (Read Article)
                </button>
              </form>
            )}

            {/* MAIN TEXT AREA & INTERACTIVE KARAOKE CONTAINER */}
            <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
              
              {/* Header inside Editor */}
              <div className="flex items-center justify-between px-5 py-3 bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    భాష (Script):
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
                    {detectedLangInfo.native} ({detectedLangInfo.name})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setText(SAMPLE_TEXTS_BY_LANG[selectedLanguage] || SAMPLE_TEXTS_BY_LANG["te"])}
                    className="px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    🔄 ఉదాహరణ (Sample)
                  </button>
                  <button
                    type="button"
                    onClick={() => setText("")}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                    title="Clear text"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                dir={currentLangObj.direction}
                rows={6}
                placeholder="ఇక్కడ మీ భాషలో టైప్ చేయండి లేదా మాట్లాడించాల్సిన వాక్యాలను అతికించండి..."
                className="w-full p-5 bg-transparent text-slate-900 dark:text-white text-lg sm:text-xl font-medium leading-relaxed resize-y focus:outline-none font-sans"
              />

              {/* Real-time Karaoke Word Highlighting Area */}
              <div className="p-5 bg-amber-50/30 dark:bg-amber-950/20 border-t-2 border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{t("studio_karaoke_title")}</span>
                  </div>
                  {currentWordIdx !== null && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-900">
                      Word {currentWordIdx + 1}
                    </span>
                  )}
                </div>

                <div
                  dir={currentLangObj.direction}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-h-48 overflow-y-auto leading-loose text-lg font-sans shadow-inner"
                >
                  {narration && narration.timestamps && narration.timestamps.length > 0 ? (
                    narration.timestamps.map((ts, idx) => {
                      const isActive = idx === currentWordIdx;
                      const hasOverride = Boolean(pronunciationOverrides[ts.word]);
                      return (
                        <span
                          key={`${ts.word}-${idx}`}
                          onClick={() => handleWordClick(ts.word)}
                          className={`cursor-pointer px-1.5 py-0.5 rounded-lg transition-all inline-block mr-1.5 ${
                            isActive
                              ? "karaoke-word-active"
                              : "text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800"
                          } ${hasOverride ? "underline decoration-amber-400 decoration-wavy" : ""}`}
                          title={`Click to adjust pronunciation for "${ts.word}"`}
                        >
                          {ts.word}
                        </span>
                      );
                    })
                  ) : (
                    wordsList.map((token, i) => {
                      if (!token.trim()) return <span key={i}>{token}</span>;
                      const isKaraokeActive = Math.floor(i / 2) === currentWordIdx;
                      return (
                        <span
                          key={i}
                          onClick={() => handleWordClick(token)}
                          className={`cursor-pointer rounded px-1 transition-colors ${
                            isKaraokeActive
                              ? "karaoke-word-active"
                              : "hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600"
                          }`}
                          title="Click to fix pronunciation"
                        >
                          {token}
                        </span>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            {/* Pronunciation overrides chip */}
            {Object.keys(pronunciationOverrides).length > 0 && (
              <div className="flex flex-wrap items-center gap-2 p-3.5 rounded-2xl bg-amber-100/70 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-xs font-medium">
                <span className="font-bold text-amber-900 dark:text-amber-200">
                  Phonetic Overrides ({Object.keys(pronunciationOverrides).length}):
                </span>
                {Object.entries(pronunciationOverrides).map(([orig, rep]) => (
                  <span
                    key={orig}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-slate-800 dark:text-slate-200 shadow-sm"
                  >
                    <span className="font-bold">{orig}</span> ➔ <span>{rep}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const copy = { ...pronunciationOverrides };
                        delete copy[orig];
                        setPronunciationOverrides(copy);
                      }}
                      className="ml-1 text-slate-400 hover:text-rose-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT PANE: Visual Voice Cards, Speed Turtles, Big Listen Button & Player (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* GIANT GREEN LISTEN BUTTON (Most intuitive element on page!) */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
              className="w-full btn-listen-giant p-5 rounded-3xl text-white flex items-center justify-center gap-4 text-xl sm:text-2xl font-black tracking-wide cursor-pointer disabled:opacity-50"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
              <div className="text-left">
                <span className="block leading-tight">
                  {isGenerating ? t("studio_synthesizing") : currentLangObj.listen_label}
                </span>
                <span className="text-xs font-semibold text-emerald-100 block opacity-90">
                  {isGenerating ? t("studio_synthesizing") : "Click to Hear Natural Speech"}
                </span>
              </div>
            </button>

            {/* 3. VISUAL VOICE CHARACTER CARDS */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
                  {t("studio_step2_voice")}
                </span>
                <button
                  type="button"
                  onClick={() => setIsCompareOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 bg-violet-50 dark:bg-violet-950/60 px-2.5 py-1 rounded-xl border border-violet-200 dark:border-violet-800 transition-colors"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>పోల్చండి (Compare Voices)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableVoices.map((voice) => {
                  const isSelected = selectedVoiceId === voice.id;
                  const isPreviewing = previewingVoiceId === voice.id;
                  const genderColor =
                    voice.gender === "female"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                      : voice.gender === "male"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800";

                  return (
                    <div
                      key={voice.id}
                      onClick={() => handleVoiceSelect(voice.id)}
                      className={`p-3 rounded-2xl flex flex-col justify-between gap-3 text-left transition-all cursor-pointer card-hover-friendly ${
                        isSelected
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 border-2 border-amber-300 ring-2 ring-indigo-400/40"
                          : "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${voice.avatar_bg} flex items-center justify-center text-2xl shadow-sm flex-shrink-0`}>
                          {voice.avatar_emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-sm font-bold truncate">
                              {voice.name} ({voice.native_name})
                            </span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${genderColor}`}>
                              {voice.gender}
                            </span>
                          </div>
                          <span className={`text-[11px] block truncate mt-0.5 ${isSelected ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"}`}>
                            {voice.friendly_role}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                        <span className={`text-[10px] font-mono ${isSelected ? "text-indigo-200" : "text-slate-400"}`}>
                          MOS {voice.mos_score || 4.8}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreviewVoice(voice);
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            isPreviewing
                              ? "bg-rose-500 text-white animate-pulse"
                              : isSelected
                              ? "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                              : "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800"
                          }`}
                          title={`Preview ${voice.name} speech`}
                        >
                          {isPreviewing ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{isPreviewing ? "ఆపండి (Stop)" : "వినండి (Preview)"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. VISUAL SPEED SELECTOR (0.75x, 0.90x, 1.0x, 1.10x, 1.25x, 1.50x) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
                  {t("studio_step3_speed")}
                </span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                  Current: {speed.toFixed(2)}x {speed === 1.0 ? "(Natural Default)" : ""}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { val: 0.75, icon: "🐢", label: "నెమ్మది", sub: "Slow" },
                  { val: 0.90, icon: "🚶", label: "సహజం -", sub: "Relaxed" },
                  { val: 1.00, icon: "🎯", label: "సహజం", sub: "Natural" },
                  { val: 1.10, icon: "🏃", label: "వేగం +", sub: "Brisk" },
                  { val: 1.25, icon: "🐇", label: "వేగంగా", sub: "Fast" },
                  { val: 1.50, icon: "🚀", label: "ఎక్కువ", sub: "Very Fast" },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => handleSpeedChange(s.val)}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all ${
                      Math.abs(speed - s.val) < 0.01
                        ? "bg-amber-500 text-white shadow-md shadow-amber-500/30 border-2 border-amber-300 font-bold scale-105"
                        : "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750"
                    }`}
                  >
                    <span className="text-2xl mb-0.5">{s.icon}</span>
                    <span className="text-xs font-bold">{s.label}</span>
                    <span className="text-[10px] opacity-80">{s.sub} ({s.val}x)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. VISUAL MOOD & EMOTION SELECTOR */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
                {t("studio_step4_emotion")}
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "storytelling", icon: "📖", name: "కథలు", en: "Story" },
                  { id: "news", icon: "📰", name: "వార్తలు", en: "News" },
                  { id: "cheerful", icon: "😊", name: "ఆనందం", en: "Happy" },
                  { id: "calm", icon: "🧘", name: "ప్రశాంతం", en: "Calm" },
                  { id: "devotional", icon: "🪔", name: "భక్తి", en: "Devotional" },
                  { id: "neutral", icon: "🎙️", name: "సాధారణం", en: "Standard" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setEmotion(m.id)}
                    className={`p-2 rounded-2xl flex flex-col items-center text-center transition-all ${
                      emotion === m.id
                        ? "bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md font-bold scale-105 border-2 border-indigo-300"
                        : "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-xl mb-0.5">{m.icon}</span>
                    <span className="text-xs font-bold leading-tight">{m.name}</span>
                    <span className="text-[10px] opacity-80">{m.en}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. PREMIUM AUDIO PLAYER */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-900 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-indigo-600"}`} />
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                    {t("studio_waveform_title")}
                  </span>
                </div>

                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-full">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Interactive Canvas Waveform */}
              <AudioWaveform
                currentTime={currentTime}
                duration={duration || 6}
                isPlaying={isPlaying}
                onSeek={handleSeek}
              />

              {/* Big Touch Playback Controls */}
              <div className="flex items-center justify-between pt-2">
                
                <button
                  type="button"
                  onClick={() => skipSeconds(-10)}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                  title="Skip back 10s"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-emerald-500 via-teal-600 to-indigo-600 text-white shadow-xl shadow-emerald-500/40 hover:scale-105 transition-transform"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 fill-white ml-1" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => skipSeconds(10)}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                  title="Skip forward 10s"
                >
                  <RotateCw className="w-5 h-5" />
                </button>

                {/* Volume & Mute */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-16 sm:w-20 accent-indigo-600"
                  />
                </div>

              </div>

              {/* Action Buttons: Download WAV, Share */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={narration?.audioUrl || "#"}
                  download={downloadFilename}
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>డౌన్‌లోడ్ (Save Audio WAV)</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyShare}
                  className="py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 inline-flex items-center gap-1.5"
                >
                  {copyFeedback ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  <span>{copyFeedback ? "Copied!" : "షేర్ (Share)"}</span>
                </button>
              </div>

              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnded}
                className="hidden"
              />

            </div>

          </div>

        </div>

      </main>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="lg:hidden sticky bottom-0 z-30 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl flex items-center justify-between gap-3 pb-safe">
        <button
          type="button"
          onClick={togglePlayPause}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating || !text.trim()}
          className="flex-1 py-3 px-5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 shadow-lg"
        >
          {isGenerating ? "మాట్లాడుతోంది..." : `🔊 ${currentLangObj.listen_label}`}
        </button>
      </div>

      {/* MODALS */}
      <PronunciationModal
        isOpen={isPronunciationOpen}
        onClose={() => setIsPronunciationOpen(false)}
        word={editingWord || ""}
        currentPhonetic={editingWord ? pronunciationOverrides[editingWord] : ""}
        language={selectedLanguage}
        onSave={handleSavePronunciation}
        onPreview={handlePreviewPhonetic}
      />

      <VoiceComparisonModal
        isOpen={isCompareOpen}
        onClose={() => {
          setIsCompareOpen(false);
          SpeechPlayer.stopAll();
          setPreviewingVoiceId(null);
        }}
        language={selectedLanguage}
        currentVoiceId={selectedVoiceId}
        sampleText={text.slice(0, 150)}
        onSelectVoice={(vId) => handleVoiceSelect(vId)}
        onPlaySample={async (vId) => {
          if (previewingVoiceId === vId) {
            SpeechPlayer.stopAll();
            setPreviewingVoiceId(null);
            return;
          }
          setPreviewingVoiceId(vId);
          await SpeechPlayer.speak(text.slice(0, 70) || currentLangObj.sample.slice(0, 70), selectedLanguage, {
            voiceId: vId,
            speed: 1.0,
            onEnd: () => setPreviewingVoiceId(null),
            onError: () => setPreviewingVoiceId(null)
          });
        }}
        playingVoiceId={previewingVoiceId}
      />

      <Footer />
    </div>
  );
}
