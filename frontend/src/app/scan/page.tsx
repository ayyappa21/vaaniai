"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Camera,
  Play,
  Pause,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Trash2
} from "lucide-react";
import { LANGUAGES } from "@/lib/data";
import { SpeechPlayer } from "@/lib/audioEngine";
import { extractTextFromFile } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export default function ScanPage() {
  const { uiLanguage, t } = useLanguage();
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [extractedText, setExtractedText] = useState(
    "వాణి ఏఐ కెమెరా ద్వారా పుస్తక పేజీలు, దినపత్రికలు మరియు విద్యా సంబంధిత పాఠాలను సులభంగా స్కాన్ చేసి సహజమైన మాతృభాష స్వరంలో వినవచ్చు."
  );
  const [selectedLanguage, setSelectedLanguage] = useState("te");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIdx, setCurrentWordIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">("large");

  // Sample book pages for 1-click test
  const samplePages = [
    {
      title: "తెలుగు బాలల కథ (Telugu Story)",
      lang: "te",
      snippet: "అనగనగా ఒక అందమైన అడవిలో ఒక తెలివైన కుందేలు ఉండేది. ఆ అడవిలోని జంతువులన్నింటికీ అది ఎంతో సహాయం చేసేది.",
      previewImg: "📖"
    },
    {
      title: "हिन्दी समाचार पत्र (Hindi News)",
      lang: "hi",
      snippet: "डिजिटल साक्षरता अभियान से ग्रामीण भारत में बड़ा बदलाव आ रहा है। सभी नागरिक अब अपनी भाषा में जानकारी प्राप्त कर रहे हैं।",
      previewImg: "📰"
    },
    {
      title: "தமிழ் அறிவியல் பாடம் (Tamil Science)",
      lang: "ta",
      snippet: "சூரிய குடும்பத்தில் உள்ள கோள்களைப் பற்றிய விரிவான தகவல்கள் மற்றும் விண்வெளி ஆராய்ச்சியின் புதிய சாதனைகள்.",
      previewImg: "🔭"
    },
    {
      title: "ಕನ್ನಡ ಸಾಹಿತ್ಯ (Kannada Book)",
      lang: "kn",
      snippet: "ಕನ್ನಡ ಸಾಹಿತ್ಯವು ಸಾವಿರಾರು ವರ್ಷಗಳ ಇತಿಹಾಸವನ್ನು ಹೊಂದಿದೆ. ನಮ್ಮ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಆಚಾರ-ವಿಚಾರಗಳು ಇದರಲ್ಲಿ ಪ್ರತಿಬಿಂಬಿತವಾಗಿವೆ.",
      previewImg: "📜"
    }
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setScannedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsScanning(true);
    try {
      const res = await extractTextFromFile(file);
      setExtractedText(res.text);
      if (res.detected_language) {
        setSelectedLanguage(res.detected_language.language_code);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSelectSample = (sample: typeof samplePages[0]) => {
    setSelectedLanguage(sample.lang);
    setExtractedText(sample.snippet);
    setScannedImage(null);
  };

  const handleListen = async () => {
    if (isPlaying) {
      SpeechPlayer.stopAll();
      setIsPlaying(false);
      setCurrentWordIdx(null);
      return;
    }

    if (!extractedText.trim()) return;

    setIsPlaying(true);
    await SpeechPlayer.speak(extractedText, selectedLanguage, {
      onWord: (wIdx) => setCurrentWordIdx(wIdx),
      onEnd: () => {
        setIsPlaying(false);
        setCurrentWordIdx(null);
      },
      onError: () => {
        setIsPlaying(false);
        setCurrentWordIdx(null);
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];
  const wordsList = extractedText.split(/\s+/).filter(Boolean);

  const textSizeClass = {
    normal: "text-lg",
    large: "text-2xl leading-relaxed",
    xlarge: "text-3xl leading-loose font-extrabold"
  }[textSize];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Header with Visual Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-950/70 border-2 border-amber-300 dark:border-amber-700 text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 shadow-sm">
            <span>📷</span>
            <span>{t("scan_page_badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            {t("scan_page_title")}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("scan_page_desc")}
          </p>
        </div>

        {/* 3-STEP VISUAL GUIDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "1", icon: "📸", title: t("step1_title"), sub: "Take / Upload Photo" },
            { step: "2", icon: "✨", title: t("step2_title"), sub: "Text Extracted Automatically" },
            { step: "3", icon: "🔊", title: t("step3_title"), sub: "Tap Green Button to Listen" }
          ].map((s) => (
            <div
              key={s.step}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-black text-xl flex items-center justify-center shadow-md flex-shrink-0">
                {s.step}
              </div>
              <div>
                <span className="text-2xl mr-2">{s.icon}</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  {s.title}
                </span>
                <span className="text-xs text-slate-500 block">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN SCAN & EXTRACT WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Photo Capture & Sample Chooser */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Camera / Upload Box */}
            <div className="p-8 rounded-3xl border-3 border-dashed border-amber-400 dark:border-amber-600 bg-amber-50/40 dark:bg-amber-950/20 text-center space-y-5 shadow-inner">
              {scannedImage ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400 max-h-72 mx-auto">
                  <img
                    src={scannedImage}
                    alt="Scanned book"
                    className="w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setScannedImage(null)}
                    className="absolute top-2 right-2 p-2 rounded-xl bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-3xl bg-amber-500 text-white mx-auto flex items-center justify-center text-4xl shadow-lg shadow-amber-500/30">
                    📷
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {t("scan_drop_title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {t("scan_drop_sub")}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl font-black text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 hover:opacity-95 shadow-lg shadow-amber-500/30 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                  <Camera className="w-5 h-5" />
                  <span>{scannedImage ? t("scan_btn_change") : t("scan_btn_choose")}</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {isScanning && (
                <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-sm font-black flex items-center justify-center gap-2 animate-pulse">
                  <Sparkles className="w-5 h-5" />
                  <span>{t("scan_scanning")}</span>
                </div>
              )}
            </div>

            {/* Quick Sample Pages to Test */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
                {t("scan_sample_title")}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {samplePages.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(s)}
                    className="p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-slate-50 dark:bg-slate-800 text-left transition-all card-hover-friendly flex items-center gap-3"
                  >
                    <span className="text-3xl">{s.previewImg}</span>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate block">
                        {s.title}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t("btn_listen")} ➔
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Extracted Text & Giant Listen Player */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Giant Green Listen Button */}
            <button
              type="button"
              onClick={handleListen}
              className="w-full btn-listen-giant p-5 rounded-3xl text-white flex items-center justify-center gap-4 text-xl sm:text-2xl font-black tracking-wide cursor-pointer transition-transform hover:scale-102"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white ml-1" />
                )}
              </div>
              <div className="text-left">
                <span className="block leading-tight">
                  {isPlaying ? t("btn_stop") : `🔊 ${currentLangObj.listen_label}`}
                </span>
                <span className="text-xs font-semibold text-emerald-100 block opacity-90">
                  {isPlaying ? "Playing with word-by-word highlight" : "Click to Read Extracted Book Aloud"}
                </span>
              </div>
            </button>

            {/* Extracted Text Box with Karaoke Highlighting */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              
              {/* Header inside Extracted Text */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-amber-500">{currentLangObj.glyph}</span>
                  <div>
                    <span className="text-sm font-black text-slate-900 dark:text-white block">
                      {currentLangObj.native_name} ({currentLangObj.name})
                    </span>
                    <span className="text-xs text-slate-500">
                      {wordsList.length} words • Optical Character Recognition
                    </span>
                  </div>
                </div>

                {/* Text Resizer for visually impaired */}
                <div className="flex items-center gap-1.5">
                  {(["normal", "large", "xlarge"] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setTextSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                        textSize === sz
                          ? "bg-amber-500 text-white shadow"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                      title="Adjust reading font size"
                    >
                      {sz === "normal" ? "A" : sz === "large" ? "A+" : "A++"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Karaoke Text Area */}
              <div
                dir={currentLangObj.direction}
                className={`p-6 rounded-2xl bg-amber-50/30 dark:bg-slate-800/60 border-2 border-amber-200/50 dark:border-slate-700 max-h-96 overflow-y-auto ${textSizeClass}`}
              >
                {wordsList.map((word, idx) => {
                  const isActive = idx === currentWordIdx;
                  return (
                    <span
                      key={idx}
                      className={`inline-block mr-2 px-1 py-0.5 rounded-lg transition-all ${
                        isActive
                          ? "karaoke-word-active scale-110"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>

              {/* Action Buttons: Copy, Open in Studio */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-300 inline-flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t("btn_copied") : t("btn_copy")}</span>
                </button>

                <Link
                  href={`/studio?lang=${selectedLanguage}`}
                  className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-indigo-600 hover:bg-indigo-500 shadow-md inline-flex items-center gap-2"
                >
                  <span>{t("btn_edit_studio")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
