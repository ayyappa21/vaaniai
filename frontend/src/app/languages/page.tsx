"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Play, Pause, ArrowRight, Search, Globe2, Volume2, Sparkles, MapPin, Users } from "lucide-react";
import { LANGUAGES, Language } from "@/lib/data";
import { SpeechPlayer } from "@/lib/audioEngine";

export default function LanguagesPage() {
  const [search, setSearch] = useState("");
  const [playingCode, setPlayingCode] = useState<string | null>(null);

  const filteredLanguages = LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.native_name.includes(search) ||
    l.region.toLowerCase().includes(search.toLowerCase())
  );

  const playSample = (lang: Language) => {
    if (playingCode === lang.code) {
      SpeechPlayer.stopAll();
      setPlayingCode(null);
      return;
    }

    setPlayingCode(lang.code);
    SpeechPlayer.speak(lang.sample, lang.code, {
      onEnd: () => setPlayingCode(null),
      onError: () => setPlayingCode(null),
    }).then((spoken) => {
      if (!spoken) {
        setTimeout(() => setPlayingCode(null), 3000);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header with Visual Regional Affirmation */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-950/70 border-2 border-amber-300 dark:border-amber-700 text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 shadow-sm">
            <span>🪔</span>
            <span>12 భారతీయ ప్రాంతీయ భాషలు • 12 Official Regional Indian Languages</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            మీ మాతృభాషను ఎంచుకోండి
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            ప్రతి భాషలోని అక్షరాల ఉచ్చారణ, సహజ శైలి, విరామ చిహ్నాలు ఖచ్చితంగా ఉండేలా రూపొందించబడింది. ఏ భాషనైనా ఒక్క ట్యాప్‌తో విని చూడండి!
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-5 h-5 absolute left-3.5 top-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="భాషను వెతకండి / Search language, script, or state..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
          </div>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLanguages.map((lang) => {
            const isPlaying = playingCode === lang.code;
            return (
              <div
                key={lang.code}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-600 transition-all flex flex-col justify-between space-y-5 card-hover-friendly"
              >
                <div className="space-y-4">
                  
                  {/* Top line: Script glyph & Native Name */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-amber-500 text-white font-black text-3xl flex items-center justify-center shadow-md flex-shrink-0">
                        {lang.glyph}
                      </div>
                      <div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white font-sans">
                          {lang.native_name}
                        </div>
                        <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          {lang.name}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {lang.script}
                    </span>
                  </div>

                  {/* Speaker count & Region */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span className="font-semibold">{lang.speakers} మాట్లాడే ప్రజలు (Speakers)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>{lang.region}</span>
                    </div>
                  </div>

                  {/* Sample Sentence Quote Box */}
                  <div
                    dir={lang.direction}
                    className="p-4 rounded-2xl bg-amber-50/40 dark:bg-slate-800/80 border-2 border-amber-200/60 dark:border-slate-700 text-base text-slate-900 dark:text-slate-100 font-bold font-sans leading-relaxed"
                  >
                    &ldquo;{lang.sample}&rdquo;
                  </div>
                </div>

                {/* Card Actions: Big Tactile Play & Studio Button */}
                <div className="flex items-center gap-3 pt-3 border-t-2 border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => playSample(lang)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isPlaying ? "ఆపండి (Stop)" : `🔊 ${lang.listen_label}`}</span>
                  </button>

                  <Link
                    href={`/studio?lang=${lang.code}`}
                    className="p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold transition-all"
                    title={`Open ${lang.name} in Studio`}
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
