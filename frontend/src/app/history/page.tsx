"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Play, Pause, Trash2, Download, Search, History as HistoryIcon, Clock, Sparkles, Volume2 } from "lucide-react";
import { HistoryItem } from "@/lib/api";
import { SpeechPlayer } from "@/lib/audioEngine";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const initialSeedHistory: HistoryItem[] = [
    {
      id: "seed-1",
      title: "తెలుగు స్వాగత సందేశం",
      snippet: "నమస్కారం, వాణి ఏఐకి స్వాగతం. మీ మాటలు మీ సొంత భాషలో సహజంగా, భావోద్వేగంతో...",
      full_text: "నమస్కారం, వాణి ఏఐకి స్వాగతం. మీ మాటలు మీ సొంత భాషలో సహజంగా, భావోద్వేగంతో వినిపించండి.",
      language: "te",
      language_name: "Telugu",
      voice_name: "స్వర (Swara)",
      voice_id: "te-IN-swara",
      emotion: "storytelling",
      speed: 1.0,
      pitch: 1.0,
      duration: 5.4,
      word_count: 12,
      created_at: "ఇప్పుడే (Just now)",
      tags: ["కథలు", "సహజ శైలి"]
    },
    {
      id: "seed-2",
      title: "डिजिटल भारत अभियान",
      snippet: "भारत की समृद्ध सांस्कृतिक विरासत और विविध भाषाएं हमारी पहचान हैं...",
      full_text: "भारत की समृद्ध सांस्कृतिक विरासत और विविध भाषाएं हमारी पहचान हैं। डिजिटल तकनीक से इन्हें सशक्त बनाना हमारा लक्ष्य है।",
      language: "hi",
      language_name: "Hindi",
      voice_name: "आरव (Aarav)",
      voice_id: "hi-IN-aarav",
      emotion: "news",
      speed: 1.0,
      pitch: 1.0,
      duration: 6.8,
      word_count: 18,
      created_at: "15నిమిషాల క్రితం",
      tags: ["వార్తలు", "స్పష్టత"]
    },
    {
      id: "seed-3",
      title: "தமிழ் இலக்கிய உரை",
      snippet: "வணக்கம், வாணி ஏஐ-க்கு வரவேற்கிறோம். உங்கள் சொந்த மொழியில் இயற்கையான...",
      full_text: "வணக்கம், வாணி ஏஐ-க்கு வரவேற்கிறோம். உங்கள் சொந்த மொழியில் இயற்கையான மற்றும் உயிரோட்டமான குரலை அனுபவியுங்கள்.",
      language: "ta",
      language_name: "Tamil",
      voice_name: "காவ்யா (Kavya)",
      voice_id: "ta-IN-kavya",
      emotion: "calm",
      speed: 0.95,
      pitch: 1.0,
      duration: 6.1,
      word_count: 11,
      created_at: "1 గంట క్రితం",
      tags: ["ప్రశాంతం"]
    }
  ];

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vaani_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          setHistory(parsed);
          return;
        }
      }
      setHistory(initialSeedHistory);
      localStorage.setItem("vaani_history", JSON.stringify(initialSeedHistory));
    } catch (e) {
      setHistory(initialSeedHistory);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    try {
      localStorage.setItem("vaani_history", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAll = () => {
    if (confirm("మీ చరిత్రలోని అన్ని రికార్డులను తీసివేయాలనుకుంటున్నారా? (Clear all history?)")) {
      setHistory([]);
      localStorage.removeItem("vaani_history");
    }
  };

  const handlePlay = (item: HistoryItem) => {
    if (playingId === item.id) {
      SpeechPlayer.stopAll();
      setPlayingId(null);
      return;
    }

    setPlayingId(item.id);
    if (item.audioUrl) {
      SpeechPlayer.playAudioUrl(item.audioUrl, {
        rate: item.speed || 1.0,
        onEnd: () => setPlayingId(null),
        onError: () => setPlayingId(null),
      });
      return;
    }

    SpeechPlayer.speak(item.full_text || item.snippet, item.language, {
      voiceId: item.voice_id,
      speed: item.speed || 1.0,
      pitch: item.pitch || 1.0,
      emotion: item.emotion || "storytelling",
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    }).then((spoken) => {
      if (!spoken) {
        setTimeout(() => setPlayingId(null), 3000);
      }
    });
  };

  const filteredHistory = history.filter((h) =>
    h.title.toLowerCase().includes(search.toLowerCase()) ||
    h.snippet.toLowerCase().includes(search.toLowerCase()) ||
    h.language_name.toLowerCase().includes(search.toLowerCase()) ||
    h.voice_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
                🕒
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
                  మీరు విన్న మాటల చరిత్ర (History)
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  మీ మునుపటి రికార్డులను ఎప్పుడైనా మళ్ళీ సులభంగా వినండి మరియు డౌన్‌లోడ్ చేయండి.
                </p>
              </div>
            </div>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 py-2.5 rounded-2xl border-2 border-rose-300 dark:border-rose-900 text-xs font-black text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 inline-flex items-center gap-2 self-start sm:self-center transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>అన్నీ తొలగించండి (Clear All)</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="వాక్యాలను లేదా భాషను వెతకండి / Search history..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <span className="text-5xl block">📻</span>
            <h3 className="text-lg font-black text-slate-700 dark:text-slate-300">
              ఎటువంటి రికార్డులు లేవు
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              స్టూడియోలో ఏదైనా వాక్యాన్ని మాట్లాడించి ఇక్కడ సేవ్ చేసుకోండి.
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md"
            >
              <span>🔊 స్టూడియోకి వెళ్ళండి</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => {
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 card-hover-friendly"
                >
                  <div className="space-y-2.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {item.language_name}
                      </span>
                      <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                        {item.voice_name}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.duration}s</span>
                      </span>
                    </div>

                    <p className="text-base font-bold text-slate-900 dark:text-slate-100 font-sans leading-relaxed line-clamp-2">
                      &ldquo;{item.snippet}&rdquo;
                    </p>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>{item.created_at}</span>
                      <span>•</span>
                      <span className="capitalize">{item.emotion} శైలి</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handlePlay(item)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/25 active:scale-95 transition-all"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      <span>{isPlaying ? "ఆపండి" : "🔊 వినండి"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-3 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
                      title="Delete from history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
