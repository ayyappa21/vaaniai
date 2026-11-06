"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SupportedUiLanguage,
  UiLanguageMeta,
  UI_LANGUAGES,
  TranslationKey,
  TRANSLATIONS,
} from "@/lib/translations";

interface LanguageContextType {
  uiLanguage: SupportedUiLanguage;
  setUiLanguage: (lang: SupportedUiLanguage) => void;
  currentLangMeta: UiLanguageMeta;
  t: (key: TranslationKey, fallback?: string) => string;
  isMounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [uiLanguage, setUiLanguageState] = useState<SupportedUiLanguage>("te");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("vaani_ui_lang") as SupportedUiLanguage | null;
      if (saved && UI_LANGUAGES.some((l) => l.code === saved)) {
        setUiLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        document.documentElement.lang = "te";
      }
    } catch {
      // ignore localStorage errors in restricted environments
    }
  }, []);

  const setUiLanguage = (lang: SupportedUiLanguage) => {
    setUiLanguageState(lang);
    try {
      localStorage.setItem("vaani_ui_lang", lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const currentLangMeta =
    UI_LANGUAGES.find((l) => l.code === uiLanguage) || UI_LANGUAGES[0];

  const t = (key: TranslationKey, fallback?: string): string => {
    const langDict = TRANSLATIONS[uiLanguage];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English if translation key missing
    const enDict = TRANSLATIONS["en"];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        uiLanguage,
        setUiLanguage,
        currentLangMeta,
        t,
        isMounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
