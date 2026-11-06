"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  FileText,
  Upload,
  Play,
  Pause,
  Clock
} from "lucide-react";
import { LANGUAGES, VOICES } from "@/lib/data";
import { SpeechPlayer } from "@/lib/audioEngine";
import { extractTextFromFile } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export default function DocumentUploadPage() {
  const { uiLanguage, t } = useLanguage();
  const [docFile, setDocFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("పదవ తరగతి సాంఘిక శాస్త్రం పాఠం.pdf");
  const [docText, setDocText] = useState(
    "భారతదేశం విభిన్న సంస్కృతులు, భాషలు మరియు ఆచారాలతో కూడిన మహోన్నత దేశం. మన రాజ్యాంగం 22 ప్రాంతీయ భాషలను అధికారికంగా గుర్తించింది. ప్రతి పౌరుడికి వారి మాతృభాషలోనే విద్యను అభ్యసించే హక్కు ఉంది. ఆధునిక కృత్రిమ మేధస్సు (AI) సాంకేతికత ద్వారా ఈ భాషలలోని పుస్తకాలను నేరుగా సహజ స్వరంలోకి మార్చడం ఇప్పుడు సాధ్యమవుతోంది."
  );
  const [selectedLanguage, setSelectedLanguage] = useState("te");
  const [selectedVoiceId, setSelectedVoiceId] = useState("te-IN-swara");
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIdx, setCurrentWordIdx] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample Documents pre-loaded for immediate testing
  const sampleDocs = [
    {
      title: "10వ తరగతి పాఠ్యపుస్తకం (Telugu Textbook)",
      lang: "te",
      name: "Class10_Social_Studies.pdf",
      text: "భారతదేశం విభిన్న సంస్కృతులు, భాషలు మరియు ఆచారాలతో కూడిన మహోన్నత దేశం. మన రాజ్యాంగం 22 ప్రాంతీయ భాషలను అధికారికంగా గుర్తించింది. ప్రతి పౌరుడికి వారి మాతృభాషలోనే విద్యను అభ్యసించే హక్కు ఉంది."
    },
    {
      title: "हिन्दी साहित्य अध्याय (Hindi Literature)",
      lang: "hi",
      name: "Premchand_Godan_Chapter1.docx",
      text: "होरी बेलगाम भाग रहा था। उसके दिल में एक ही उम्मीद थी कि किसी तरह इस साल फसल अच्छी हो जाए और महाजन का कर्ज उतर सके। भारतीय किसान का जीवन संघर्षों से भरा रहा है।"
    },
    {
      title: "தமிழ் வரலாற்று பாடம் (Tamil History)",
      lang: "ta",
      name: "Chola_Dynasty_History.pdf",
      text: "சோழப் பேரரசு தென்னிந்திய வரலாற்றில் ஒரு பொற்காலமாகும். அவர்களின் கப்பற்படை, கட்டிடக்கலை மற்றும் விவசாய பாசன முறைகள் உலகப் புகழ்பெற்றவை."
    },
    {
      title: "ಕನ್ನಡ ವಿಜ್ಞಾನ ಟಿಪ್ಪಣಿಗಳು (Kannada Science)",
      lang: "kn",
      name: "Karnataka_Ecology_Notes.docx",
      text: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು ಜೀವವೈವಿಧ್ಯತೆಯ ಪ್ರಮುಖ ತಾಣಗಳಾಗಿವೆ. ನೂರಾರು ಅಪರೂಪದ ಸಸ್ಯಗಳು ಮತ್ತು ಪ್ರಾಣಿಗಳು ಇಲ್ಲಿ ಕಂಡುಬರುತ್ತವೆ. ಇವುಗಳನ್ನು ಸಂರಕ್ಷಿಸುವುದು ನಮ್ಮೆಲ್ಲರ ಕರ್ತವ್ಯ."
    }
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDocFile(file);
    setFileName(file.name);
    setIsLoading(true);

    try {
      const res = await extractTextFromFile(file);
      setDocText(res.text);
      if (res.detected_language) {
        setSelectedLanguage(res.detected_language.language_code);
        const v = VOICES.find((vox) => vox.language === res.detected_language.language_code);
        if (v) setSelectedVoiceId(v.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sample: typeof sampleDocs[0]) => {
    setFileName(sample.name);
    setDocText(sample.text);
    setSelectedLanguage(sample.lang);
    const v = VOICES.find((vox) => vox.language === sample.lang);
    if (v) setSelectedVoiceId(v.id);
  };

  const handleTogglePlay = async () => {
    if (isPlaying) {
      SpeechPlayer.stopAll();
      setIsPlaying(false);
      setCurrentWordIdx(null);
      return;
    }

    if (!docText.trim()) return;

    setIsPlaying(true);
    await SpeechPlayer.speak(docText, selectedLanguage, {
      voiceId: selectedVoiceId,
      speed,
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

  const words = docText.split(/\s+/).filter(Boolean);
  const currentLangObj = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];
  const langVoices = VOICES.filter((v) => v.language === selectedLanguage);
  const currentVoice = langVoices.find((v) => v.id === selectedVoiceId) || langVoices[0] || VOICES[0];
  const estMinutes = Math.max(1, Math.round(words.length / 120));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-950/70 border-2 border-indigo-300 dark:border-indigo-700 text-xs sm:text-sm font-black text-indigo-900 dark:text-indigo-200 shadow-sm">
            <span>📚</span>
            <span>{t("doc_page_badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            {t("doc_page_title")}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("doc_page_desc")}
          </p>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Upload Box & Document Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Drag & Drop Upload Zone */}
            <div className="p-8 rounded-3xl border-3 border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50/40 dark:bg-indigo-950/20 text-center space-y-4 shadow-inner">
              <div className="w-20 h-20 rounded-3xl bg-indigo-600 text-white mx-auto flex items-center justify-center text-4xl shadow-lg shadow-indigo-600/30">
                📁
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {t("doc_drop_title")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {t("doc_drop_sub")}
                </p>
              </div>

              <div>
                <label className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl font-black text-base text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                  <Upload className="w-5 h-5" />
                  <span>{t("doc_btn_choose")}</span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {isLoading && (
                <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-black animate-pulse">
                  {t("doc_reading")}
                </div>
              )}
            </div>

            {/* Document Info Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  {t("doc_info_title")}
                </span>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {t("doc_ready")}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <FileText className="w-8 h-8 text-indigo-600 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                    {fileName}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span>{words.length} words</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>~{estMinutes} {t("doc_est_time")}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Documents Chooser */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                {t("scan_sample_title")}
              </span>

              <div className="space-y-2">
                {sampleDocs.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(s)}
                    className="w-full p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-slate-50 dark:bg-slate-800 text-left transition-all card-hover-friendly flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white block">
                        {s.title}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {s.name}
                      </span>
                    </div>
                    <span className="text-indigo-600 font-bold text-xs">{t("btn_listen")} ➔</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Voice Controls, Giant Listen Button & Document Reader */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Giant Green Listen Button */}
            <button
              type="button"
              onClick={handleTogglePlay}
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
                  {isPlaying ? "Playing continuous regional audiobook" : "Click to Play Full Document Audio"}
                </span>
              </div>
            </button>

            {/* Narrator Voice & Speed Chooser */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Narrator Selection */}
                <div className="space-y-1 flex-1">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                    {t("studio_step2_voice")}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${currentVoice.avatar_bg} flex items-center justify-center text-xl shadow flex-shrink-0`}>
                      {currentVoice.avatar_emoji}
                    </div>
                    <select
                      value={selectedVoiceId}
                      onChange={(e) => setSelectedVoiceId(e.target.value)}
                      className="flex-1 p-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-black text-slate-800 dark:text-slate-100"
                    >
                      {langVoices.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.native_name}) - {v.friendly_role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Speed Selection */}
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                    {t("studio_step3_speed")}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { val: 0.8, icon: "🐢", label: "Slow" },
                      { val: 1.0, icon: "🚶", label: "Normal" },
                      { val: 1.25, icon: "🐇", label: "Fast" }
                    ].map((s) => (
                      <button
                        key={s.val}
                        type="button"
                        onClick={() => setSpeed(s.val)}
                        className={`px-3 py-2 rounded-xl text-xs font-black transition-all ${
                          speed === s.val
                            ? "bg-amber-500 text-white shadow scale-105"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <span>{s.icon} {s.val}x</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Document Reader Container with Live Karaoke Highlighting */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-indigo-600">{currentLangObj.glyph}</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {currentLangObj.native_name} ({currentLangObj.name})
                  </span>
                </div>
                {currentWordIdx !== null && (
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-400 text-slate-900">
                    Word {currentWordIdx + 1} of {words.length}
                  </span>
                )}
              </div>

              <div
                dir={currentLangObj.direction}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto text-xl leading-loose font-bold"
              >
                {words.map((w, idx) => {
                  const isActive = idx === currentWordIdx;
                  return (
                    <span
                      key={idx}
                      className={`inline-block mr-2 px-1 rounded-lg transition-all ${
                        isActive
                          ? "karaoke-word-active scale-110"
                          : "text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {w}
                    </span>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-slate-100 dark:border-slate-800">
                <Link
                  href={`/studio?lang=${selectedLanguage}`}
                  className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-black text-white bg-indigo-600 hover:bg-indigo-500 shadow-md inline-flex items-center gap-2"
                >
                  <span>{t("btn_edit_studio")} ➔</span>
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
