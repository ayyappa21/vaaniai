"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Play,
  Pause,
  Star
} from "lucide-react";
import { LANGUAGES, VOICES } from "@/lib/data";
import { SpeechPlayer } from "@/lib/audioEngine";
import { useLanguage } from "@/context/LanguageContext";

export default function VoiceComparisonPage() {
  const { uiLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState("te");
  const langVoices = VOICES.filter((v) => v.language === selectedLanguage);
  
  const [voiceAId, setVoiceAId] = useState(langVoices[0]?.id || "te-IN-swara");
  const [voiceBId, setVoiceBId] = useState(langVoices[1]?.id || langVoices[0]?.id || "te-IN-chaitanya");
  
  const [speedA, setSpeedA] = useState(1.0);
  const [speedB, setSpeedB] = useState(1.0);
  
  const [playingVoice, setPlayingVoice] = useState<"A" | "B" | null>(null);

  const [compareText, setCompareText] = useState(
    "నమస్కారం! వాణి ఏఐ సహజ స్వర పోలిక వేదికకు స్వాగతం. ఇక్కడ ఇద్దరు వేర్వేరు వ్యాఖ్యాతల స్వరాలను పక్కపక్కనే విని ఉత్తమమైన వాయిస్‌ని ఎంచుకోవచ్చు."
  );

  const voiceA = VOICES.find((v) => v.id === voiceAId) || langVoices[0] || VOICES[0];
  const voiceB = VOICES.find((v) => v.id === voiceBId) || langVoices[1] || VOICES[1];
  const currentLangObj = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    const newVoices = VOICES.filter((v) => v.language === code);
    if (newVoices.length > 0) {
      setVoiceAId(newVoices[0].id);
      setVoiceBId(newVoices[1]?.id || newVoices[0].id);
    }
    const sample = LANGUAGES.find((l) => l.code === code)?.sample;
    if (sample) setCompareText(sample);
  };

  const handlePlay = async (which: "A" | "B") => {
    if (playingVoice === which) {
      SpeechPlayer.stopAll();
      setPlayingVoice(null);
      return;
    }

    const currentSpeed = which === "A" ? speedA : speedB;
    const targetVoice = which === "A" ? voiceA : voiceB;

    setPlayingVoice(which);
    await SpeechPlayer.speak(compareText, targetVoice.language, {
      voiceId: targetVoice.id,
      speed: currentSpeed,
      onEnd: () => setPlayingVoice(null),
      onError: () => setPlayingVoice(null)
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100/80 dark:bg-violet-950/70 border-2 border-violet-300 dark:border-violet-700 text-xs sm:text-sm font-black text-violet-900 dark:text-violet-200 shadow-sm">
            <span>⚖️</span>
            <span>{t("compare_page_badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            {t("compare_page_title")}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("compare_page_desc")}
          </p>
        </div>

        {/* REGIONAL SCRIPT TABS */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => handleLanguageChange(l.code)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                selectedLanguage === l.code
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-105 border-2 border-violet-300"
                  : "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-violet-400"
              }`}
            >
              <span className="mr-1.5">{l.glyph}</span>
              <span>{l.native_name}</span>
            </button>
          ))}
        </div>

        {/* COMPARISON TEST TEXTAREA */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span>✍️</span>
              <span>{t("compare_text_label")}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                const sample = currentLangObj.sample;
                if (sample) setCompareText(sample);
              }}
              className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
            >
              🔄 {t("btn_sample")}
            </button>
          </div>

          <textarea
            value={compareText}
            onChange={(e) => setCompareText(e.target.value)}
            dir={currentLangObj.direction}
            rows={3}
            className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* SIDE-BY-SIDE SPLIT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* VOICE A CARD */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-3 border-indigo-500/50 shadow-xl space-y-6 flex flex-col justify-between">
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-xs">
                  {t("compare_voice_a")}
                </span>
                <div className="flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 border border-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>MOS {voiceA.mos_score}</span>
                </div>
              </div>

              {/* Character Avatar & Selector */}
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${voiceA.avatar_bg} flex items-center justify-center text-3xl shadow-md flex-shrink-0`}>
                  {voiceA.avatar_emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <select
                    value={voiceAId}
                    onChange={(e) => setVoiceAId(e.target.value)}
                    className="w-full p-3 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base font-black text-slate-900 dark:text-white"
                  >
                    {langVoices.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.native_name}) - {v.friendly_role}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold block mt-1">
                    {voiceA.gender === "female" ? "👩 Female Voice" : voiceA.gender === "male" ? "👨 Male Voice" : "🧒 Student Voice"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {voiceA.description}
              </div>

              {/* Speed Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                  <span>{t("compare_speed")}</span>
                  <span>{speedA}x</span>
                </div>
                <input
                  type="range"
                  min="0.75"
                  max="1.5"
                  step="0.25"
                  value={speedA}
                  onChange={(e) => setSpeedA(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t-2 border-slate-100 dark:border-slate-800 space-y-3">
              <button
                type="button"
                onClick={() => handlePlay("A")}
                className="w-full py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-3 transition-transform hover:scale-102"
              >
                {playingVoice === "A" ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white" />
                )}
                <span>{playingVoice === "A" ? t("btn_stop") : `🔊 ${t("btn_listen")} (${voiceA.name})`}</span>
              </button>

              <Link
                href={`/studio?voice=${voiceA.id}&lang=${voiceA.language}`}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 block"
              >
                {t("btn_open_studio")} ➔
              </Link>
            </div>

          </div>

          {/* VOICE B CARD */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-3 border-violet-500/50 shadow-xl space-y-6 flex flex-col justify-between">
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-black text-xs">
                  {t("compare_voice_b")}
                </span>
                <div className="flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 border border-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>MOS {voiceB.mos_score}</span>
                </div>
              </div>

              {/* Character Avatar & Selector */}
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${voiceB.avatar_bg} flex items-center justify-center text-3xl shadow-md flex-shrink-0`}>
                  {voiceB.avatar_emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <select
                    value={voiceBId}
                    onChange={(e) => setVoiceBId(e.target.value)}
                    className="w-full p-3 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base font-black text-slate-900 dark:text-white"
                  >
                    {langVoices.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.native_name}) - {v.friendly_role}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-violet-600 dark:text-violet-400 font-bold block mt-1">
                    {voiceB.gender === "female" ? "👩 Female Voice" : voiceB.gender === "male" ? "👨 Male Voice" : "🧒 Student Voice"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-violet-50/50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {voiceB.description}
              </div>

              {/* Speed Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                  <span>{t("compare_speed")}</span>
                  <span>{speedB}x</span>
                </div>
                <input
                  type="range"
                  min="0.75"
                  max="1.5"
                  step="0.25"
                  value={speedB}
                  onChange={(e) => setSpeedB(parseFloat(e.target.value))}
                  className="w-full accent-violet-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t-2 border-slate-100 dark:border-slate-800 space-y-3">
              <button
                type="button"
                onClick={() => handlePlay("B")}
                className="w-full py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-95 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-3 transition-transform hover:scale-102"
              >
                {playingVoice === "B" ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white" />
                )}
                <span>{playingVoice === "B" ? t("btn_stop") : `🔊 ${t("btn_listen")} (${voiceB.name})`}</span>
              </button>

              <Link
                href={`/studio?voice=${voiceB.id}&lang=${voiceB.language}`}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 block"
              >
                {t("btn_open_studio")} ➔
              </Link>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
