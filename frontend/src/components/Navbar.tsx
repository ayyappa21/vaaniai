"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mic2,
  ChevronDown,
  Volume1,
  Sun,
  Moon,
  Menu,
  X
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { UI_LANGUAGES } from "@/lib/translations";
import { SpeechPlayer } from "@/lib/audioEngine";

export const Navbar = () => {
  const pathname = usePathname();
  const { uiLanguage, setUiLanguage, currentLangMeta, t } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [moreToolsOpen, setMoreToolsOpen] = useState(false);
  const [playingHelp, setPlayingHelp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial theme check
    const savedTheme = localStorage.getItem("vaani_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("vaani_theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("vaani_theme", "dark");
      setIsDark(true);
    }
  };

  const primaryLinks = [
    { href: "/studio", label: t("nav_studio"), icon: "🎙️", badge: "Live" },
    { href: "/scan", label: t("nav_scan"), icon: "📷" },
    { href: "/upload", label: t("nav_upload"), icon: "📁" },
    { href: "/stories", label: t("nav_stories"), icon: "📖" },
  ];

  const secondaryLinks = [
    { href: "/compare", label: t("nav_compare"), icon: "⚖️", desc: "Compare two regional voices" },
    { href: "/pronunciation", label: t("nav_pronunciation"), icon: "🎯", desc: "Fine-tune dialect phonetics" },
    { href: "/languages", label: t("nav_languages"), icon: "🌐", desc: "All supported regional scripts" },
    { href: "/voices", label: t("nav_voices"), icon: "👥", desc: "24+ regional narrator personas" },
    { href: "/history", label: t("nav_history"), icon: "🕒", desc: "Your saved audio narrations" },
    { href: "/accessibility", label: t("nav_accessibility"), icon: "♿", desc: "Assistive tools for blind & low vision" },
    { href: "/technology", label: t("nav_tech"), icon: "⚙️", desc: "5-stage AI model architecture" },
    { href: "/about", label: t("nav_about"), icon: "ℹ️", desc: "Project mission & research" }
  ];

  const playVoiceHelp = () => {
    if (playingHelp) {
      SpeechPlayer.stopAll();
      setPlayingHelp(false);
      return;
    }

    setPlayingHelp(true);
    const helpMessages: Record<string, string> = {
      te: "నమస్కారం! వాణి ఏఐకి స్వాగతం. మీ మాటలు లేదా పుస్తక పేజీలను మీ సొంత భాషలో స్పష్టమైన స్వరంతో వినడానికి స్టూడియో బటన్ నొక్కండి.",
      hi: "नमस्ते! वाणी एआई में आपका स्वागत है। अपनी भाषा में पुस्तकों और विचारों को सुनने के लिए स्टूडियो बटन पर क्लिक करें।",
      ta: "வணக்கம்! வாணி ஏஐ-க்கு வரவேற்கிறோம். உங்கள் தாய்மொழியில் புத்தகங்கள் மற்றும் உரையை கேட்க ஸ்டுடியோ பொத்தானை அழுத்தவும்.",
      kn: "ನಮಸ್ಕಾರ! ವಾಣಿ ಎಐಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಆಲಿಸಲು ಸ್ಟುಡಿಯೋ ಬಟನ್ ಒತ್ತಿರಿ.",
      ml: "നമസ്കാരം! വാണി എഐയിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ മാതൃഭാഷയിൽ വരികൾ കേൾക്കാൻ സ്റ്റുഡിയോ ബട്ടൺ ക്ലിക്ക് ചെയ്യുക.",
      bn: "নমস্কার! বাণী এআই-তে স্বাগতম। আপনার নিজের ভাষায় স্পষ্ট কণ্ঠে শুনতে স্টুডিও বোতাম চাপুন।",
      mr: "नमस्कार! वाणी एआय मध्ये आपले स्वागत आहे. आपल्या मातृभाषेत स्पष्ट आवाजात ऐकण्यासाठी स्टुडिओ बटणावर क्लिक करा.",
      gu: "નમસ્તે! વાણી એઆઈમાં આપનું સ્વાગત છે. તમારી પોતાની ભાષામાં સાંભળવા માટે સ્ટુડિયો બટન પર ક્લિક કરો.",
      pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਵਾਣੀ ਏਆਈ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸੁਣਨ ਲਈ ਸਟੂਡੀਓ ਬਟਨ ਦਬਾਓ।",
      en: "Welcome to VaaniAI! Convert text and documents into natural regional speech. Click Studio to start."
    };

    const textToSpeak = helpMessages[uiLanguage] || helpMessages["en"];
    SpeechPlayer.speakWithWebSpeech(textToSpeak, uiLanguage, {
      onEnd: () => setPlayingHelp(false),
      onError: () => setPlayingHelp(false)
    });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-b border-slate-200 dark:border-slate-800"
          : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-amber-500 to-rose-600 text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl font-black">{currentLangMeta.glyph}</span>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-amber-600 dark:from-indigo-400 dark:via-violet-300 dark:to-amber-400 bg-clip-text text-transparent font-heading">
                  VaaniAI
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  {currentLangMeta.native_name}
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden xl:block leading-none">
                Let your words speak, in your own language
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-extrabold rounded-xl transition-all ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 shadow-sm border border-indigo-200 dark:border-indigo-800"
                      : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-black px-1.5 py-0.2 bg-emerald-500 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* "More Tools" Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreToolsOpen(!moreToolsOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-extrabold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>✨ {t("nav_tools")}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {moreToolsOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 glass-dropdown rounded-2xl shadow-2xl z-50 p-2.5 border-2 border-slate-200 dark:border-slate-800 space-y-1 animate-fadeIn"
                  onMouseLeave={() => setMoreToolsOpen(false)}
                >
                  <div className="text-[11px] font-black text-slate-400 px-3 py-1 uppercase tracking-wider">
                    {t("nav_tools")}
                  </div>
                  {secondaryLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreToolsOpen(false)}
                      className={`flex items-start gap-2.5 p-2 rounded-xl text-xs font-bold transition-all ${
                        pathname === item.href
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="text-lg mt-0.5">{item.icon}</span>
                      <div>
                        <span className="block font-black">{item.label}</span>
                        <span className={`text-[10px] block opacity-80 ${pathname === item.href ? "text-indigo-100" : "text-slate-400"}`}>
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions: Voice Guide, Regional Language Switcher, Theme Toggle, Studio Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Audio Voice Guide Button */}
            <button
              type="button"
              onClick={playVoiceHelp}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all ${
                playingHelp
                  ? "bg-amber-500 text-white animate-pulse"
                  : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200 border border-amber-300 dark:border-amber-800"
              }`}
              title="Click to hear spoken guidance"
            >
              <Volume1 className="w-4 h-4" />
              <span>{playingHelp ? "వివరణ..." : `🔊 ${t("nav_help")}`}</span>
            </button>

            {/* Quick Regional Script Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-extrabold rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 hover:border-indigo-400 text-slate-800 dark:text-slate-100 shadow-sm transition-all"
                aria-label="Change language script"
              >
                <span className="text-indigo-600 dark:text-indigo-400 text-base font-bold">{currentLangMeta.glyph}</span>
                <span className="font-bold">{currentLangMeta.native_name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-60 max-h-80 overflow-y-auto glass-dropdown rounded-2xl shadow-2xl z-50 p-2 border-2 border-slate-200 dark:border-slate-800"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  <div className="text-[11px] font-black text-slate-400 px-3 py-1 uppercase tracking-wider">
                    {t("nav_ui_lang")}
                  </div>
                  {UI_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setUiLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-left transition-all ${
                        uiLanguage === lang.code
                          ? "bg-indigo-600 text-white font-black shadow-sm"
                          : "text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-amber-400">{lang.glyph}</span>
                        <span className="font-bold">{lang.native_name}</span>
                      </div>
                      <span className="text-[11px] opacity-80">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Launch Studio CTA Button */}
            <Link
              href="/studio"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:opacity-95 rounded-2xl shadow-md shadow-emerald-500/25 transition-all hover:scale-105 border-2 border-emerald-300"
            >
              <Mic2 className="w-4 h-4" />
              <span>🔊 {t("nav_speak_btn")}</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer with ALL features */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-50 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-950 border-b-2 border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-4 block">
                {t("nav_tools")}
              </span>
              {[...primaryLinks, ...secondaryLinks].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200"
                        : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 space-y-3">
              <Link
                href="/studio"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-base font-black text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 shadow-lg shadow-emerald-500/25"
              >
                <Mic2 className="w-5 h-5" />
                <span>🔊 {t("nav_speak_btn")}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
