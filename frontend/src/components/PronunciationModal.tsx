"use client";

import React, { useState } from "react";
import { X, Volume2, Check, Sparkles, AlertCircle } from "lucide-react";

interface PronunciationModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  currentPhonetic?: string;
  language: string;
  onSave: (word: string, phonetic: string) => void;
  onPreview: (phonetic: string) => void;
}

export const PronunciationModal: React.FC<PronunciationModalProps> = ({
  isOpen,
  onClose,
  word,
  currentPhonetic = "",
  language,
  onSave,
  onPreview,
}) => {
  const [phonetic, setPhonetic] = useState(currentPhonetic || word);

  if (!isOpen) return null;

  const phoneticTips: Record<string, string[]> = {
    te: [
      "Use double vowels for Dirgham (e.g., 'రాముడు' instead of 'రముడు')",
      "Add 'హ' for Mahaprana aspirated consonants (e.g., 'ఖ', 'ఘ')",
      "Break complex Samyuktaksharas with space if needed"
    ],
    hi: [
      "Use 'aa', 'ee', 'oo' for Deergh swar (e.g., 'पानी')",
      "Add dot (Nukta) for Urdu loanwords like 'ज़', 'फ़'",
      "Use Halant (्) for half letters (e.g., 'सत्य')"
    ],
    ta: [
      "Use doubled letters for Vallinam hard consonants",
      "Tamil retroflex 'ழ' (zh) can be spelled phonetically for clarity",
      "Aytham 'ஃ' indicates subtle glottal stop"
    ],
    kn: [
      "Use explicit Otthakshara conjuncts for emphasis",
      "Distinguish short 'e' vs long 'ee' vowels"
    ]
  };

  const tips = phoneticTips[language] || [
    "Type the word phonetically exactly as it should sound",
    "Separate compound words with hyphen or space for natural pauses"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Pronunciation Fixer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tune exact phonetic articulation and dialect nuance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Word comparison */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Original Word in Text
            </label>
            <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-medium text-base font-sans">
              {word}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Phonetic Replacement (How VaaniAI will pronounce it)
            </label>
            <input
              type="text"
              value={phonetic}
              onChange={(e) => setPhonetic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter custom phonetic spelling..."
            />
          </div>

          {/* Quick Regional Tips */}
          <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-1.5 text-xs text-indigo-900 dark:text-indigo-200">
            <div className="flex items-center gap-1.5 font-semibold text-indigo-700 dark:text-indigo-300">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Phonetic Tuning Tips:</span>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] opacity-90">
              {tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => onPreview(phonetic)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Test Sound</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onSave(word, phonetic);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Apply Fix</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
