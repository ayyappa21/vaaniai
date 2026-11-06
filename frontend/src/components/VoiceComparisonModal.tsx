"use client";

import React, { useState } from "react";
import { X, Play, Pause, ArrowLeftRight, Check, Sparkles } from "lucide-react";
import { Voice, VOICES } from "@/lib/data";

interface VoiceComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  currentVoiceId: string;
  sampleText: string;
  onSelectVoice: (voiceId: string) => void;
  onPlaySample: (voiceId: string) => void;
  playingVoiceId: string | null;
}

export const VoiceComparisonModal: React.FC<VoiceComparisonModalProps> = ({
  isOpen,
  onClose,
  language,
  currentVoiceId,
  sampleText,
  onSelectVoice,
  onPlaySample,
  playingVoiceId,
}) => {
  const languageVoices = VOICES.filter(v => v.language === language);
  const [voiceAId, setVoiceAId] = useState(currentVoiceId);
  const [voiceBId, setVoiceBId] = useState(
    languageVoices.find(v => v.id !== currentVoiceId)?.id || (languageVoices[1]?.id || languageVoices[0]?.id)
  );

  if (!isOpen) return null;

  const voiceA = VOICES.find(v => v.id === voiceAId) || VOICES[0];
  const voiceB = VOICES.find(v => v.id === voiceBId) || VOICES[1] || VOICES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Side-by-Side Voice Comparison
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audition two regional neural voices side by side on your chosen text
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

        {/* Text Snippet */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-sans line-clamp-2">
          &ldquo;{sampleText}&rdquo;
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Voice A Card */}
          <div className="p-4 rounded-xl border-2 border-indigo-500/40 bg-indigo-50/20 dark:bg-indigo-950/20 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Voice A (Current)
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                  MOS {voiceA.mos_score}
                </span>
              </div>

              <select
                value={voiceAId}
                onChange={(e) => setVoiceAId(e.target.value)}
                className="w-full text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-white"
              >
                {languageVoices.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.native_name}) - {v.gender}
                  </option>
                ))}
              </select>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[40px]">
                {voiceA.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {voiceA.tags.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => onPlaySample(voiceA.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm"
              >
                {playingVoiceId === voiceA.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{playingVoiceId === voiceA.id ? "Playing Voice A..." : "Audition Voice A"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectVoice(voiceA.id);
                  onClose();
                }}
                className="p-2 rounded-xl border border-indigo-300 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
                title="Select this voice"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Voice B Card */}
          <div className="p-4 rounded-xl border-2 border-violet-500/40 bg-violet-50/20 dark:bg-violet-950/20 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  Voice B (Alternative)
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300">
                  MOS {voiceB.mos_score}
                </span>
              </div>

              <select
                value={voiceBId}
                onChange={(e) => setVoiceBId(e.target.value)}
                className="w-full text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-white"
              >
                {languageVoices.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.native_name}) - {v.gender}
                  </option>
                ))}
              </select>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[40px]">
                {voiceB.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {voiceB.tags.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => onPlaySample(voiceB.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 shadow-sm"
              >
                {playingVoiceId === voiceB.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{playingVoiceId === voiceB.id ? "Playing Voice B..." : "Audition Voice B"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectVoice(voiceB.id);
                  onClose();
                }}
                className="p-2 rounded-xl border border-violet-300 dark:border-violet-700 hover:bg-violet-100 dark:hover:bg-violet-900 text-violet-600 dark:text-violet-300"
                title="Select this voice"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
