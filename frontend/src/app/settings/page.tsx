"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sliders, Moon, Sun, Monitor, Check, Trash2, Download, Save, Volume2 } from "lucide-react";
import { LANGUAGES, VOICES } from "@/lib/data";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [defaultLang, setDefaultLang] = useState("te");
  const [defaultSpeed, setDefaultSpeed] = useState(1.0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    const savedT = (localStorage.getItem("vaani_theme") as "light" | "dark") || "system";
    setTheme(savedT);
    const savedL = localStorage.getItem("vaani_default_lang") || "te";
    setDefaultLang(savedL);
    const savedS = parseFloat(localStorage.getItem("vaani_default_speed") || "1.0");
    setDefaultSpeed(savedS);
  }, []);

  const handleSave = () => {
    localStorage.setItem("vaani_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("vaani_default_lang", defaultLang);
    localStorage.setItem("vaani_default_speed", defaultSpeed.toString());

    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleClearHistory = () => {
    if (confirm("Clear all generation history?")) {
      localStorage.removeItem("vaani_history");
      alert("History cleared successfully.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Sliders className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
                Studio Preferences
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Customize default language, synthesis acoustics, and display themes
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20"
          >
            {savedFeedback ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedFeedback ? "Saved!" : "Save Preferences"}</span>
          </button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          
          {/* Appearance Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Appearance & Theme
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "light", label: "Light", icon: Sun },
                { id: "dark", label: "Dark", icon: Moon },
                { id: "system", label: "System", icon: Monitor },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = theme === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTheme(item.id as any)}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Synthesis Defaults Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Narration Defaults
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Default Regional Language
                </label>
                <select
                  value={defaultLang}
                  onChange={(e) => setDefaultLang(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name} ({l.native_name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Default Speech Rate ({defaultSpeed}x)
                </label>
                <select
                  value={defaultSpeed.toString()}
                  onChange={(e) => setDefaultSpeed(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
                >
                  <option value="0.75">0.75x (Careful / Learning)</option>
                  <option value="1.0">1.0x (Standard Natural)</option>
                  <option value="1.25">1.25x (Brisk Listening)</option>
                  <option value="1.5">1.5x (Fast Reader)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
                  Autoplay Audio on Synthesis
                </span>
                <span className="text-xs text-slate-500">
                  Immediately start playback when narration generation completes
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Local Data Storage */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Local Storage & Cache
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage persisted history and custom phonetic dictionary data saved on your device.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleClearHistory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Local History</span>
              </button>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
