"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  Volume2,
  Play,
  Plus,
  Trash2
} from "lucide-react";
import { LANGUAGES } from "@/lib/data";
import { SpeechPlayer } from "@/lib/audioEngine";
import { useLanguage } from "@/context/LanguageContext";

export default function PronunciationLabPage() {
  const { uiLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState("te");
  const [inputWord, setInputWord] = useState("రాముడు");
  const [phoneticCorrection, setPhoneticCorrection] = useState("రాాముడు");
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  
  // Custom dictionary rules persisted locally
  const [savedRules, setSavedRules] = useState<Array<{ word: string; phonetic: string; lang: string }>>([
    { word: "డాక్టర్", phonetic: "డాాక్టర్", lang: "te" },
    { word: "విద్యాపీఠం", phonetic: "విద్యా పీఠం", lang: "te" },
    { word: "ज़िन्दगी", phonetic: "जिन्दगी", lang: "hi" },
    { word: "கவிதை", phonetic: "கவிதை", lang: "ta" },
    { word: "ಬೆಳಗಾವಿ", phonetic: "ಬೆಳ ಗಾವಿ", lang: "kn" }
  ]);

  const phoneticTips: Record<string, Array<{ rule: string; example: string; tip: string }>> = {
    te: [
      { rule: "దీర్ఘం (Long Vowels)", example: "రాాముడు", tip: "అక్షరాన్ని సాగదీసి పలకడానికి రెట్టింపు అచ్చులు ఉపయోగించండి" },
      { rule: "మహాప్రాణాలు (Aspirated)", example: "ఖ, ఘ, ఛ, ఝ", tip: "గాలి ఒత్తిడితో పలికేందుకు హ-కారాన్ని చేర్చండి" },
      { rule: "సంయుక్తాక్షరాలు (Conjuncts)", example: "విద్యా పీఠం", tip: "సంక్లిష్ట పదాలను మధ్యలో చిన్న స్పేస్ ఇవ్వడం ద్వారా విడదీయండి" }
    ],
    hi: [
      { rule: "दीर्घ स्वर (Long Vowels)", example: "पानी ➔ पाानी", tip: "स्वर को स्पष्ट और खिंचाव देने के लिए दोहरे स्वर जोड़ें" },
      { rule: "नुक़्ता (Urdu Loanwords)", example: "ज़फ़र ➔ ज़फर", tip: "उर्दू ध्वनियों के लिए नुक़्ता का सही प्रयोग करें" },
      { rule: "हलंत (Half Consonants)", example: "सत्य, कर्म", tip: "अर्ध अक्षरों के स्पष्ट उच्चारण के लिए विराम दें" }
    ],
    ta: [
      { rule: "வல்லினம் (Hard Consonants)", example: "பட்டம்", tip: "மெய் எழுத்துக்களுக்கு இரட்டிப்பு ஒலியைப் பயன்படுத்தவும்" },
      { rule: "சிறப்பு ழகரம் (Retroflex zh)", example: "தமிழ் ➔ த-மி-ழ்", tip: "நாக்கை மேல் அன்னத்தில் மடித்து உச்சரிக்கவும்" },
      { rule: "ஆய்த எழுத்து (Aytham)", example: "அஃது", tip: "தொண்டை ஒலியைச் சேர்க்க 'ஃ' பயன்படுத்தவும்" }
    ],
    kn: [
      { rule: "ಒತ್ತಕ್ಷರಗಳು (Conjuncts)", example: "ಅಪ್ಪ, ಅಮ್ಮ", tip: "ಒತ್ತು ನೀಡಲು ಎರಡನೇ ವ್ಯಂಜನವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಪಾಲಿಸಿ" },
      { rule: "ದೀರ್ಘ ಸ್ವರಗಳು (Long Vowels)", example: "ಶಾಲೆ ➔ ಶಾಾಲೆ", tip: "ಸ್ವರದ ಸ್ಪಷ್ಟತೆಗಾಗಿ ದೀರ್ಘ ಅಕ್ಷರ ಬಳಸಿ" }
    ]
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputWord.trim() || !phoneticCorrection.trim()) return;

    const newRule = {
      word: inputWord.trim(),
      phonetic: phoneticCorrection.trim(),
      lang: selectedLanguage
    };

    setSavedRules((prev) => [newRule, ...prev.filter((r) => r.word !== newRule.word)]);
    setInputWord("");
    setPhoneticCorrection("");
  };

  const handleDeleteRule = (word: string) => {
    setSavedRules((prev) => prev.filter((r) => r.word !== word));
  };

  const playSpeech = async (text: string, langCode: string, keyId: string) => {
    if (playingKey === keyId) {
      SpeechPlayer.stopAll();
      setPlayingKey(null);
      return;
    }

    setPlayingKey(keyId);
    await SpeechPlayer.speak(text, langCode, {
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    });
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];
  const tips = phoneticTips[selectedLanguage] || phoneticTips["te"];
  const filteredRules = savedRules.filter((r) => r.lang === selectedLanguage);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-950/70 border-2 border-amber-300 dark:border-amber-700 text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 shadow-sm">
            <span>🎯</span>
            <span>{t("pron_page_badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            {t("pron_page_title")}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("pron_page_desc")}
          </p>
        </div>

        {/* LANGUAGE SELECTOR STRIP */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setSelectedLanguage(l.code)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                selectedLanguage === l.code
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-105 border-2 border-amber-300"
                  : "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-amber-400"
              }`}
            >
              <span className="mr-1.5">{l.glyph}</span>
              <span>{l.native_name}</span>
            </button>
          ))}
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Interactive Tuner Form */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              
              <div className="flex items-center gap-3 pb-4 border-b-2 border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
                  ✍️
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {t("pron_page_title")}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fine-tune phonetic spellings and dialects
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddRule} className="space-y-4">
                
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1.5">
                    {t("pron_orig_label")}
                  </label>
                  <input
                    type="text"
                    value={inputWord}
                    onChange={(e) => setInputWord(e.target.value)}
                    placeholder="e.g. రాముడు, సత్య..."
                    className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1.5">
                    {t("pron_phon_label")}
                  </label>
                  <input
                    type="text"
                    value={phoneticCorrection}
                    onChange={(e) => setPhoneticCorrection(e.target.value)}
                    placeholder="e.g. రాాముడు..."
                    className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Instant Listen Preview Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => playSpeech(inputWord, selectedLanguage, "preview-orig")}
                    className="p-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 inline-flex items-center justify-center gap-2"
                  >
                    <Volume2 className="w-4 h-4 text-slate-500" />
                    <span>{t("pron_btn_orig")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => playSpeech(phoneticCorrection, selectedLanguage, "preview-phon")}
                    className="p-3.5 rounded-2xl border-2 border-emerald-400 bg-emerald-500 text-white text-xs sm:text-sm font-black inline-flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{t("pron_btn_new")}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 shadow-lg shadow-amber-500/25 inline-flex items-center justify-center gap-2 transition-transform hover:scale-102"
                >
                  <Plus className="w-5 h-5" />
                  <span>{t("pron_btn_save")}</span>
                </button>

              </form>

            </div>

            {/* Phonetic Dialect Guide Tips */}
            <div className="p-6 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800/60 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-black text-amber-900 dark:text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{currentLangObj.native_name} Nuance Tips:</span>
              </div>

              <div className="space-y-3">
                {tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 dark:text-white">
                        {tip.rule}
                      </span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                        {tip.example}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      {tip.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Saved Pronunciation Rules List */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b-2 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📖</span>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {t("pron_my_rules")} ({filteredRules.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Applied automatically in Studio narrations
                    </p>
                  </div>
                </div>
              </div>

              {filteredRules.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <span className="text-4xl block">📝</span>
                  <p className="text-sm font-bold">No custom rules for this language yet</p>
                  <p className="text-xs">Add words using the left panel to personalize pronunciation.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 card-hover-friendly"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white text-base truncate">
                          {rule.word}
                        </div>
                        <span className="text-amber-500 font-black">➔</span>
                        <div className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base truncate">
                          {rule.phonetic}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => playSpeech(rule.phonetic, rule.lang, `rule-${idx}`)}
                          className="p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-md transition-transform active:scale-95"
                          title="Play corrected speech"
                        >
                          <Play className="w-4 h-4 fill-white" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteRule(rule.word)}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:bg-slate-100 transition-colors"
                          title="Delete rule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <Link
                  href={`/studio?lang=${selectedLanguage}`}
                  className="w-full py-3.5 rounded-2xl font-black text-sm text-center text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 block transition-colors"
                >
                  {t("btn_open_studio")} ➔
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
