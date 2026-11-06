"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Play, Pause, ArrowRight, Search, Volume2, Sparkles, Filter, Check, Star } from "lucide-react";
import { VOICES, LANGUAGES, Voice } from "@/lib/data";
import { SpeechPlayer } from "@/lib/audioEngine";

export default function VoicesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const filteredVoices = VOICES.filter((v) => {
    const matchesLang = selectedLanguage === "all" || v.language === selectedLanguage;
    const matchesGender = selectedGender === "all" || v.gender === selectedGender;
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.native_name.includes(search) ||
      v.description.toLowerCase().includes(search.toLowerCase()) ||
      v.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      v.friendly_role.toLowerCase().includes(search.toLowerCase());
    return matchesLang && matchesGender && matchesSearch;
  });

  const handlePlayVoice = (voice: Voice) => {
    if (playingVoiceId === voice.id) {
      SpeechPlayer.stopAll();
      setPlayingVoiceId(null);
      return;
    }

    const langObj = LANGUAGES.find(l => l.code === voice.language);
    const sampleText = langObj?.sample || `నమస్కారం, ఇది ${voice.name} స్వరం.`;

    setPlayingVoiceId(voice.id);
    SpeechPlayer.speak(sampleText, voice.language, {
      voiceId: voice.id,
      onEnd: () => setPlayingVoiceId(null),
      onError: () => setPlayingVoiceId(null),
    }).then((spoken) => {
      if (!spoken) {
        setTimeout(() => setPlayingVoiceId(null), 3000);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header with Visual Indicators */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100/80 dark:bg-violet-950/70 border-2 border-violet-300 dark:border-violet-700 text-xs sm:text-sm font-black text-violet-900 dark:text-violet-200 shadow-sm">
            <span>🎭</span>
            <span>24+ సహజ స్వరాలు • 24+ Natural Regional Character Voices</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            మీకు ఇష్టమైన గొంతును ఎంచుకోండి
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            కథలు చెప్పే అమ్మమ్మ/తాతయ్య స్వరం, పాఠాలు బోధించే ఉపాధ్యాయుల స్వరం, లేదా స్పష్టమైన వార్తా స్వరాలలో ఏదైనా ఎంచుకోండి!
          </p>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="గొంతు పేరు లేదా శైలిని వెతకండి / Search voice name, role..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
              />
            </div>

            {/* Language filter dropdown */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100"
            >
              <option value="all">🌐 అన్ని భాషలు (All 12 Languages)</option>
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.glyph} {l.name} ({l.native_name})</option>
              ))}
            </select>

            {/* Gender filter dropdown */}
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100"
            >
              <option value="all">👥 అందరి గొంతులు (All Voices)</option>
              <option value="female">👩 స్త్రీ గొంతులు (Female)</option>
              <option value="male">👨 పురుష గొంతులు (Male)</option>
              <option value="child">🧒 పిల్లల గొంతులు (Young / Child)</option>
            </select>
          </div>
        </div>

        {/* Voices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVoices.map((voice) => {
            const isPlaying = playingVoiceId === voice.id;
            const lang = LANGUAGES.find(l => l.code === voice.language);
            return (
              <div
                key={voice.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-violet-400 dark:hover:border-violet-600 transition-all flex flex-col justify-between space-y-4 card-hover-friendly"
              >
                <div className="space-y-3">
                  
                  {/* Top Character Row: Avatar + Name + Rating */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${voice.avatar_bg} flex items-center justify-center text-3xl shadow-md flex-shrink-0`}>
                        {voice.avatar_emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-slate-900 dark:text-white font-heading">
                            {voice.name}
                          </h3>
                          <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 font-sans">
                            ({voice.native_name})
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                          {lang?.name} • {voice.gender === "female" ? "👩 స్త్రీ" : voice.gender === "male" ? "👨 పురుషుడు" : "🧒 విద్యార్థి"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs font-black text-amber-600 dark:text-amber-400 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{voice.mos_score}</span>
                    </div>
                  </div>

                  {/* Character Persona Tag */}
                  <div className="p-3 rounded-2xl bg-violet-50/60 dark:bg-slate-800/80 border border-violet-100 dark:border-slate-700">
                    <span className="text-xs font-black text-violet-800 dark:text-violet-300 flex items-center gap-1.5">
                      <span>🎯 శైలి (Role):</span>
                      <span className="font-extrabold">{voice.friendly_role}</span>
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {voice.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {voice.tags.map(t => (
                      <span
                        key={t}
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions: Audition Voice + Use in Studio */}
                <div className="flex items-center gap-3 pt-3 border-t-2 border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handlePlayVoice(voice)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-500/25 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isPlaying ? "ఆపండి (Stop)" : "🔊 గొంతు వినండి (Hear Voice)"}</span>
                  </button>

                  <Link
                    href={`/studio?voice=${voice.id}&lang=${voice.language}`}
                    className="p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-violet-400 bg-white dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/60 text-violet-600 dark:text-violet-300 font-bold transition-all"
                    title={`Use ${voice.name} in Studio`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
}
