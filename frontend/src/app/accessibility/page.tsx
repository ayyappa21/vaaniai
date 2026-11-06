"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SpeechPlayer } from "@/lib/audioEngine";
import { useLanguage } from "@/context/LanguageContext";

export default function AccessibilityPage() {
  const { uiLanguage, t } = useLanguage();
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [testSpeechStatus, setTestSpeechStatus] = useState<string>("");

  const testScreenReaderAnnouncement = () => {
    const announcements: Record<string, string> = {
      te: "నమస్కారం! వాణి ఏఐ యాక్సెసిబిలిటీ మోడ్ యాక్టివ్‌గా ఉంది. కంటి చూపు లేని వారికి స్క్రీన్ రీడర్ మరియు కీబోర్డ్ నావిగేషన్ పూర్తిగా సిద్ధంగా ఉన్నాయి.",
      hi: "नमस्ते! वाणी एआई एक्सेसिबिलिटी मोड सक्रिय है। दृष्टिबाधित उपयोगकर्ताओं के लिए स्क्रीन रीडर और कीबोर्ड नेविगेशन पूरी तरह तैयार हैं।",
      ta: "வணக்கம்! வாணி ஏஐ அணுகல்தன்மை முறை இயக்கத்தில் உள்ளது. பார்வையற்ற பயனர்களுக்கு குரல் வழிகாட்டல் மற்றும் விசைப்பலகை வசதிகள் தயாராக உள்ளன.",
      kn: "ನಮಸ್ಕಾರ! ವಾಣಿ ಎಐ ಪ್ರವೇಶಸಾಧ್ಯತೆ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ. ದೃಷ್ಟಿಹೀನ ಬಳಕೆದಾರರಿಗೆ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಸಿದ್ಧವಾಗಿದೆ.",
      ml: "നമസ്കാരം! വാണി എഐ ആക്സസിബിലിറ്റി മോഡ് പ്രവർത്തനക്ഷമമാണ്. സ്ക്രീൻ റീഡറും കീബോർഡ് നാവിഗേഷനും ലഭ്യമാണ്.",
      bn: "নমস্কার! বাণী এআই অ্যাক্সেসিবিলিটি মোড চালু রয়েছে। দৃষ্টি প্রতিবন্ধী পাঠকদের জন্য স্ক্রিন রিডার সুবিধা সক্রিয়।",
      mr: "नमस्कार! वाणी एआय ॲक्सेसिबिलिटी मोड सक्रिय आहे. दृष्टीहीन व्यक्तींसाठी स्क्रीन रीडर सुविधा उपलब्ध आहे.",
      gu: "નમસ્તે! વાણી એઆઈ ઍક્સેસિબિલિટી મોડ સક્રિય છે. દ્રષ્ટિહીન વપરાશકર્તાઓ માટે ઑડિયો માર્ગદર્શન ઉપલબ્ધ છે.",
      pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਵਾਣੀ ਏਆਈ ਪਹੁੰਚਯੋਗਤਾ ਮੋਡ ਚਾਲੂ ਹੈ। ਸਕ੍ਰੀਨ ਰੀਡਰ ਅਤੇ ਕੀਬੋਰਡ ਨੈਵੀਗੇਸ਼ਨ ਤਿਆਰ ਹਨ।",
      en: "Hello! VaaniAI accessibility mode is active. Screen readers and keyboard navigation are fully configured."
    };

    const textToSpeak = announcements[uiLanguage] || announcements["en"];
    setTestSpeechStatus(textToSpeak);
    SpeechPlayer.speak(textToSpeak, uiLanguage, {
      onEnd: () => {
        setTimeout(() => setTestSpeechStatus(""), 4000);
      }
    });
  };

  const keyboardShortcuts = [
    { key: "Ctrl + Enter / ⌘ + Enter", desc: "స్టూడియోలో వాయిస్ వినిపించండి (Synthesize speech)" },
    { key: "Spacebar", desc: "ఆడియో ఆపండి లేదా ప్లే చేయండి (Toggle Play/Pause)" },
    { key: "← / → Arrow Keys", desc: "10 సెకన్లు ముందుకు లేదా వెనుకకు జరపండి (Skip ±10s)" },
    { key: "Tab / Shift + Tab", desc: "బటన్ల మధ్య మారండి (Navigate controls)" },
    { key: "Escape", desc: "డైలాగ్ బాక్స్ మూసివేయండి (Close modal)" },
  ];

  const textSizeClass = {
    normal: "text-base",
    large: "text-xl",
    xlarge: "text-2xl",
  }[textSize];

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      highContrast
        ? "bg-black text-yellow-300 dark:bg-black dark:text-yellow-300 font-bold"
        : "bg-slate-50 dark:bg-slate-950"
    }`}>
      <Navbar />

      <main id="main-content" className={`flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 ${textSizeClass}`}>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border-2 border-emerald-300 dark:border-emerald-700 text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-200">
            <span>♿</span>
            <span>{t("access_page_badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            {t("access_page_title")}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("access_page_desc")}
          </p>
        </div>

        {/* INTERACTIVE ACCESSIBILITY TEST LAB */}
        <div className="p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
                🎛️
              </div>
              <div>
                <h3 className="text-xl font-black font-heading">
                  {t("access_page_badge")}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t("access_contrast_desc")}
                </p>
              </div>
            </div>
          </div>

          {/* Controls: Contrast & Font Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Contrast toggle */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm sm:text-base font-black block">{t("access_contrast_title")}</span>
                <span className="text-xs text-slate-500">{t("access_contrast_desc")}</span>
              </div>
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                  highContrast
                    ? "bg-yellow-400 text-black shadow-lg scale-105"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                }`}
              >
                {highContrast ? "✅ Active" : "Toggle Theme"}
              </button>
            </div>

            {/* Font size picker */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm sm:text-base font-black block">{t("access_text_size_title")}</span>
                <span className="text-xs text-slate-500">Scaling for clear readability</span>
              </div>
              <div className="flex items-center gap-1.5">
                {(["normal", "large", "xlarge"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setTextSize(sz)}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                      textSize === sz
                        ? "bg-indigo-600 text-white shadow-md scale-105"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {sz === "normal" ? "A" : sz === "large" ? "A+" : "A++"}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Test Screen Reader Voice Announcement */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">🗣️</span>
                <span className="text-sm sm:text-base font-black text-indigo-900 dark:text-indigo-200">
                  {t("access_voice_test_title")}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Hear live spoken assistance in {uiLanguage.toUpperCase()}
              </p>
            </div>

            <button
              type="button"
              onClick={testScreenReaderAnnouncement}
              className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/25 active:scale-95 transition-all self-start sm:self-center"
            >
              🔊 {t("access_btn_voice_test")}
            </button>
          </div>

          {testSpeechStatus && (
            <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-200 animate-fadeIn">
              {testSpeechStatus}
            </div>
          )}

        </div>

        {/* KEYBOARD SHORTCUTS */}
        <div className="p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-3xl">⌨️</span>
            <div>
              <h3 className="text-xl font-black font-heading">
                {t("access_shortcuts_title")}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Navigate controls without a mouse
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyboardShortcuts.map((sc, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
              >
                <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                  {sc.desc}
                </span>
                <kbd className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-xs font-mono font-black text-indigo-600 dark:text-indigo-400 shadow-sm flex-shrink-0">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
