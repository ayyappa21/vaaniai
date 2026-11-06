"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Play,
  Volume2
} from "lucide-react";
import { LANGUAGES } from "@/lib/data";
import { SpeechPlayer } from "@/lib/audioEngine";
import { useLanguage } from "@/context/LanguageContext";

export default function LandingPage() {
  const { uiLanguage, t } = useLanguage();

  const demoSnippets = [
    {
      lang: "Telugu",
      script: "తెలుగు",
      text: "నమస్కారం! వాణి ఏఐతో మీ రచనలను అత్యంత సహజమైన మాతృభాష స్వరంలోకి మార్చుకోండి.",
      speaker: "స్వర (Swara)",
      code: "te",
      glyph: "తె",
      listen_label: "వినండి (Listen)"
    },
    {
      lang: "Hindi",
      script: "हिन्दी",
      text: "नमस्ते! वाणी एआई के साथ अपनी भाषा में स्पष्ट और भावपूर्ण आवाज का अनुभव करें।",
      speaker: "आरव (Aarav)",
      code: "hi",
      glyph: "ह",
      listen_label: "सुनिए (Listen)"
    },
    {
      lang: "Tamil",
      script: "தமிழ்",
      text: "வணக்கம்! வாணி ஏஐ மூலம் உங்கள் கருத்துக்களை இனிமையான தமிழ் குரலில் ஒலிக்கச் செய்யுங்கள்.",
      speaker: "காவ்யா (Kavya)",
      code: "ta",
      glyph: "த",
      listen_label: "கேளுங்கள் (Listen)"
    },
    {
      lang: "Kannada",
      script: "ಕನ್ನಡ",
      text: "ನಮಸ್ಕಾರ! ವಾಣಿ ಎಐ ಮೂಲಕ ಪ್ರತಿಯೊಂದು ಪದವೂ ನಿಮ್ಮ ಹೃದಯಕ್ಕೆ ತಲುಪುವಂತೆ ಆಲಿಸಿ.",
      speaker: "ಭಾವನಾ (Bhavana)",
      code: "kn",
      glyph: "ಕ",
      listen_label: "ಆಲಿಸಿ (Listen)"
    }
  ];

  const [currentSnippetIdx, setCurrentSnippetIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [playingHeroAudio, setPlayingHeroAudio] = useState(false);

  useEffect(() => {
    const currentFullText = demoSnippets[currentSnippetIdx].text;
    let charIdx = 0;
    setIsTyping(true);
    setTypedText("");

    const interval = setInterval(() => {
      if (charIdx <= currentFullText.length) {
        setTypedText(currentFullText.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => {
          setCurrentSnippetIdx((prev) => (prev + 1) % demoSnippets.length);
        }, 3600);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [currentSnippetIdx]);

  const activeSnippet = demoSnippets[currentSnippetIdx];

  const playHeroSpeech = () => {
    if (playingHeroAudio) {
      SpeechPlayer.stopAll();
      setPlayingHeroAudio(false);
      return;
    }

    setPlayingHeroAudio(true);
    SpeechPlayer.speak(activeSnippet.text, activeSnippet.code, {
      onEnd: () => setPlayingHeroAudio(false),
      onError: () => setPlayingHeroAudio(false),
    });
  };

  const features = [
    {
      icon: "🗣️",
      title: "సహజమైన మానవ గొంతు (Human-like Natural Speech)",
      description: "రోబోటిక్ సౌండ్ కాకుండా, నిజమైన మనిషి మాట్లాడినట్లే స్పష్టమైన భావోద్వేగం, విరామ చిహ్నాలతో చదువుతుంది."
    },
    {
      icon: "🔢",
      title: "సంఖ్యలు & తేదీలు మాటల్లోకి (Numbers in Words)",
      description: "౨౦౨౬, 15/08/1947, ₹500 వంటి సంఖ్యలను స్వయంగా భాషా పదాలుగా మార్చి స్పష్టంగా పలుకుతుంది."
    },
    {
      icon: "📸",
      title: "పుస్తకం ఫోటో తీస్తే చాలు (Photo to Voice)",
      description: "ఏదైనా పుస్తకం లేదా పత్రిక పేజీని మొబైల్ కెమెరాతో ఫోటో తీసి వెంటనే వాయిస్ రూపంలో వినవచ్చు."
    },
    {
      icon: "♿",
      title: "కంటి చూపు లేని వారికి సులభం (Accessible for Blind)",
      description: "పెద్ద అక్షరాలు, హై-కాంట్రాస్ట్ స్క్రీన్, కీబోర్డ్ షార్ట్‌కట్‌లతో చదువురాని లేదా చూపులేని వారు సులభంగా వినవచ్చు."
    },
    {
      icon: "🎯",
      title: "ఉచ్చారణ మార్చే సౌకర్యం (Pronunciation Fixer)",
      description: "ఏదైనా పదం పలకడం మారితే, ఆ పదంపై క్లిక్ చేసి మీ సొంత మాండలికానికి తగినట్లుగా సరిదిద్దుకోవచ్చు."
    },
    {
      icon: "👥",
      title: "మగ, ఆడ, పిల్లల గొంతులు (Multiple Voice Personas)",
      description: "మీ కథలు, పాఠాలు లేదా వార్తలకు తగినట్లుగా రకరకాల వయస్సుల వారి గొంతులను ఎంచుకోవచ్చు."
    }
  ];

  const steps = [
    {
      step: "1",
      icon: "🌐",
      title: t("step1_title"),
      desc: t("step1_desc")
    },
    {
      step: "2",
      icon: "✍️",
      title: t("step2_title"),
      desc: t("step2_desc")
    },
    {
      step: "3",
      icon: "🔊",
      title: t("step3_title"),
      desc: t("step3_desc")
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 hero-gradient-mesh">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading & Large Friendly Action Buttons */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                {/* Visual Friendly Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-black shadow-sm">
                  <span className="text-lg">🪔</span>
                  <span>{t("hero_badge")}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white font-heading leading-tight">
                  {t("hero_title_part1")}{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-amber-500 to-rose-600 bg-clip-text text-transparent">
                    {t("hero_title_accent")}
                  </span>
                </h1>

                <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                  {t("hero_subtitle")}
                </p>

                {/* Big Vibrant Primary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/studio"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-3xl font-black text-xl text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:opacity-95 shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 border-2 border-emerald-300"
                  >
                    <span className="text-2xl">🔊</span>
                    <span>{t("hero_btn_studio")}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <button
                    type="button"
                    onClick={playHeroSpeech}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-5 rounded-3xl font-bold text-base text-slate-800 dark:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 shadow-md transition-all"
                  >
                    <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>{playingHeroAudio ? t("btn_stop") : t("hero_btn_listen")}</span>
                  </button>
                </div>

                {/* Friendly Visual Badges */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span>✨</span> {t("hero_pill_free")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span>🔓</span> {t("hero_pill_nologin")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span>♿</span> {t("hero_pill_access")}
                  </span>
                </div>
              </div>

              {/* Right Column: Live Interactive Typing Preview with Big Visual Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md w-full rounded-3xl p-6 shadow-2xl border-3 border-amber-300/80 dark:border-amber-600 bg-white/95 dark:bg-slate-900/95 space-y-5">
                  
                  {/* Card Header with Big Script Emblem */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                        {activeSnippet.glyph}
                      </div>
                      <div>
                        <span className="text-base font-black text-slate-900 dark:text-white block">
                          {activeSnippet.script} ({activeSnippet.lang})
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {activeSnippet.speaker}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={playHeroSpeech}
                      className="p-3 rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/30 transition-transform active:scale-95"
                      title="Play sample speech"
                    >
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </button>
                  </div>

                  {/* Typing Display Box */}
                  <div className="min-h-[140px] p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                    <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed font-sans">
                      &ldquo;{typedText}&rdquo;
                      <span className={`inline-block w-2 h-5 ml-1 bg-amber-500 ${isTyping ? "animate-pulse" : "opacity-0"}`} />
                    </p>

                    <div className="flex items-center justify-between pt-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 mt-2">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span>●</span> Indic Natural Prosody
                      </span>
                      <span className="font-mono text-[11px]">24kHz Neural Audio</span>
                    </div>
                  </div>

                  {/* Animated Soundwave & Waveform Motif */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900">
                    <div className="flex items-center gap-1.5 h-8 px-2">
                      {[6, 22, 14, 30, 16, 26, 12, 32, 18, 28, 10, 24, 16, 29, 14, 20].map((height, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-indigo-600 to-amber-500 rounded-full soundwave-bar"
                          style={{
                            height: `${height}px`,
                            animationDelay: `${i * 0.08}s`
                          }}
                        />
                      ))}
                    </div>

                    <Link
                      href="/studio"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>{t("btn_open_studio")}</span>
                    </Link>
                  </div>

                  {/* Language switch indicators */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    {demoSnippets.map((s, idx) => (
                      <button
                        key={s.lang}
                        onClick={() => setCurrentSnippetIdx(idx)}
                        className={`h-2.5 rounded-full transition-all ${
                          currentSnippetIdx === idx
                            ? "w-10 bg-amber-500"
                            : "w-2.5 bg-slate-300 dark:bg-slate-700"
                        }`}
                        aria-label={`Switch to ${s.lang}`}
                      />
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 1-2-3 VISUAL EASY STEPS FOR USERS WHO CANNOT READ COMPLEX ENGLISH */}
        <section className="py-16 bg-white dark:bg-slate-900 border-y-2 border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {t("steps_header_tag")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
                {t("steps_heading")}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                {t("steps_subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((st) => (
                <div
                  key={st.step}
                  className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all card-hover-friendly space-y-4 text-center sm:text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                      {st.step}
                    </span>
                    <span className="text-4xl">{st.icon}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                      {st.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link
                href="/studio"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl font-extrabold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 hover:opacity-95 shadow-lg shadow-amber-500/30 text-base"
              >
                <span>{t("btn_try_now")}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* DEDICATED FUNCTIONALITY HUBS */}
        <section className="py-20 bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {t("tools_header_tag")}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading">
                {t("tools_heading")}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
                {t("tools_subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Feature 1: Photo Scanner */}
              <Link
                href="/scan"
                className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800/90 dark:to-slate-800/50 border-3 border-amber-300 dark:border-amber-700 shadow-md hover:shadow-2xl transition-all card-hover-friendly flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                    📷
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-600 block">
                      Camera to Voice
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading mt-0.5">
                      {t("tool_scan_title")}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {t("tool_scan_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-amber-700 dark:text-amber-400">
                  <span>{t("nav_scan")} ➔</span>
                </div>
              </Link>

              {/* Feature 2: PDF Document Uploader */}
              <Link
                href="/upload"
                className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800/90 dark:to-slate-800/50 border-3 border-indigo-300 dark:border-indigo-700 shadow-md hover:shadow-2xl transition-all card-hover-friendly flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                    📁
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block">
                      Document Audiobook
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading mt-0.5">
                      {t("tool_upload_title")}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {t("tool_upload_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-indigo-700 dark:text-indigo-400">
                  <span>{t("nav_upload")} ➔</span>
                </div>
              </Link>

              {/* Feature 3: Stories & Books */}
              <Link
                href="/stories"
                className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800/90 dark:to-slate-800/50 border-3 border-emerald-300 dark:border-emerald-700 shadow-md hover:shadow-2xl transition-all card-hover-friendly flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                    📖
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-600 block">
                      Moral Tales & Audiobooks
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading mt-0.5">
                      {t("tool_stories_title")}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {t("tool_stories_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-emerald-700 dark:text-emerald-400">
                  <span>{t("nav_stories")} ➔</span>
                </div>
              </Link>

              {/* Feature 4: Voice Comparison Lab */}
              <Link
                href="/compare"
                className="p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-800/90 dark:to-slate-800/50 border-3 border-violet-300 dark:border-violet-700 shadow-md hover:shadow-2xl transition-all card-hover-friendly flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-violet-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-violet-600/30 group-hover:scale-110 transition-transform">
                    ⚖️
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-violet-600 block">
                      Voice Comparison
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading mt-0.5">
                      {t("tool_compare_title")}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {t("tool_compare_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-violet-700 dark:text-violet-400">
                  <span>{t("nav_compare")} ➔</span>
                </div>
              </Link>

              {/* Feature 5: Pronunciation Fixer */}
              <Link
                href="/pronunciation"
                className="p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800/90 dark:to-slate-800/50 border-3 border-rose-300 dark:border-rose-700 shadow-md hover:shadow-2xl transition-all card-hover-friendly flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-rose-600/30 group-hover:scale-110 transition-transform">
                    🎯
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-rose-600 block">
                      Pronunciation & Dialect
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading mt-0.5">
                      {t("tool_pron_title")}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {t("tool_pron_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-rose-700 dark:text-rose-400">
                  <span>{t("nav_pronunciation")} ➔</span>
                </div>
              </Link>

              {/* Feature 6: Studio Main Hub */}
              <Link
                href="/studio"
                className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all card-hover-friendly flex flex-col justify-between space-y-6 group border-3 border-emerald-300"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    🎙️
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-200 block">
                      Main Creation Suite
                    </span>
                    <h3 className="text-2xl font-black text-white font-heading mt-0.5">
                      {t("tool_studio_title")}
                    </h3>
                    <p className="text-sm font-medium text-emerald-100 mt-2 leading-relaxed">
                      {t("tool_studio_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-amber-300">
                  <span>{t("hero_btn_studio")} ➔</span>
                </div>
              </Link>

            </div>
          </div>
        </section>

        {/* 12 REGIONAL LANGUAGES VISUAL SHOWCASE */}
        <section className="py-16 bg-slate-100/60 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                12 భారతీయ భాషలు • 12 Indian Languages
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white font-heading">
                {t("nav_languages")}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {LANGUAGES.map((l) => (
                <Link
                  key={l.code}
                  href={`/studio?lang=${l.code}`}
                  className="p-4 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all card-hover-friendly flex flex-col items-center text-center space-y-1.5"
                >
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                    {l.glyph}
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">
                    {l.native_name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {l.name}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {l.speakers}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES GRID WITH FRIENDLY VISUAL EMOJIS */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              అద్భుతమైన ఫీచర్లు • Key Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
              చదువురాని వారికి, విద్యార్థులకు ఎంతో ప్రయోజనకరం
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all card-hover-friendly space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-3xl shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL HERO CTA */}
        <section className="py-20 bg-gradient-to-tr from-emerald-800 via-teal-900 to-slate-950 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-5xl">🔊</span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
              {t("hero_title_part1")} {t("hero_title_accent")}
            </h2>
            <p className="text-emerald-200 text-lg max-w-xl mx-auto leading-relaxed">
              {t("hero_subtitle")}
            </p>
            <div>
              <Link
                href="/studio"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-3xl font-black text-xl text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-2xl hover:scale-105 transition-transform"
              >
                <span>{t("hero_btn_studio")}</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
