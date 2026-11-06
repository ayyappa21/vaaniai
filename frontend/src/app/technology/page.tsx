"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Sliders,
  CheckCircle2,
  BarChart3,
  Code2,
  Terminal,
  FileCode
} from "lucide-react";
import { MOS_DATA } from "@/lib/data";

export default function TechnologyPage() {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineStages = [
    {
      id: "input",
      title: "1. Text & Media Ingestion",
      subtitle: "Unicode Text, PDF streams, DOCX XML, and OCR Image Scans",
      desc: "Ingests raw text across 12 Indic scripts (Devanagari, Telugu, Tamil, Kannada, Malayalam, Bengali, Gujarati, Gurmukhi, Oriya, Nastaliq). Identifies Unicode codepoint ranges and extracts textual payload.",
      tech: "Unicode Block Range Heuristics • Fast Stream Parsers"
    },
    {
      id: "normalize",
      title: "2. Linguistic Normalization & Expansion",
      subtitle: "Converting Non-Standard Words (NSW) into Spoken Phonology",
      desc: "Native Indian digits (e.g. ౧౨, १२, ੧੨) and dates are converted into regional words. Abbreviations like 'డా.' (Telugu) or 'डॉ.' (Hindi) are expanded to 'డాక్టర్' / 'डॉक्टर' with proper case inflection.",
      tech: "Rule-Based Finite State Transducers • Indic Numeral Vocabularies"
    },
    {
      id: "prosody",
      title: "3. Prosodic Pause & Intonation Modeling",
      subtitle: "Predicting Pitch Contours & Punctuation Breaks",
      desc: "Distinguishes question marks, danda (।), double danda (॥), commas, and commas in Urdu. Inserts precise prosodic break durations based on emotional cadence (storytelling, news, calm, devotional).",
      tech: "Prosodic Boundary Predictors • SSML Synthesizer Markers"
    },
    {
      id: "neural_tts",
      title: "4. Neural Acoustic Modeling (Indic Parler-TTS)",
      subtitle: "Mel-Spectrogram Generation from Phonetic Tokens",
      desc: "Converts normalized phonemes into high-resolution mel-spectrograms. Pluggable adapters interface with Indic Parler-TTS, AI4Bharat IndicTTS, or Google Cloud Neural2.",
      tech: "Conformer Transformer Encoder • Multi-Head Cross Attention"
    },
    {
      id: "vocoder",
      title: "5. Neural Vocoder & Timestamp Extraction",
      subtitle: "Generating 24kHz Audio & Word-Level Karaoke Alignment",
      desc: "HiFi-GAN vocoder reconstructs continuous phase and waveform audio. Cross-attention matrices yield exact start and end timestamps for each regional word for synchronized karaoke.",
      tech: "HiFi-GAN Vocoder • Forced Alignment • 16-bit PCM WAV Stream"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Cpu className="w-4 h-4 text-amber-500" />
            <span>Architecture & Neural Pipeline</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            How VaaniAI Works
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A comprehensive look at our five-stage regional synthesis pipeline, linguistic normalization rules, and quality benchmarks against human speech.
          </p>
        </div>

        {/* PIPELINE INTERACTIVE DIAGRAM */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Architectural Flowchart
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                5-Stage Neural Narration Pipeline
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Interactive Diagram: Click any stage to inspect
            </span>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {pipelineStages.map((stage, idx) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  activeStep === idx
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span className="text-[10px] font-mono block opacity-80">Stage 0{idx + 1}</span>
                <span className="text-xs font-bold truncate block">{stage.title.split(". ")[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Details Card */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                {pipelineStages[activeStep].title}
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                {pipelineStages[activeStep].tech}
              </span>
            </div>

            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {pipelineStages[activeStep].subtitle}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {pipelineStages[activeStep].desc}
            </p>
          </div>

          {/* ASCII / Visual Flow Representation */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-2">
            <div className="text-indigo-400 font-bold">{"// Data Flow Pipeline:"}</div>
            <div>[Raw Indic Script] ➔ [Language Detector] ➔ [Numeral/Date Normalizer] ➔ [Prosodic Marker Engine] ➔ [Neural Acoustic Model] ➔ [HiFi-GAN Audio Output + JSON Timestamps]</div>
          </div>
        </div>

        {/* MEAN OPINION SCORE (MOS) CHART */}
        <section id="benchmarks" className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                Mean Opinion Score (MOS) Quality Benchmarks
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Double-blind listening tests scored by native regional speakers on a 1.0 to 5.0 scale. Comparing VaaniAI against Traditional Concatenative TTS and Human Ground Truth.
            </p>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-6 pt-2">
            {MOS_DATA.map((item) => (
              <div key={item.language} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>{item.language}</span>
                  <div className="flex items-center gap-4 text-[11px] font-mono">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">VaaniAI: {item.vaaniai}</span>
                    <span className="text-slate-400">Standard TTS: {item.standard}</span>
                    <span className="text-emerald-500 font-semibold">Human: {item.human}</span>
                  </div>
                </div>

                {/* Comparative Multi-Bar */}
                <div className="space-y-1">
                  {/* VaaniAI Bar */}
                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                    <div
                      className="bg-gradient-to-r from-indigo-600 to-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(item.vaaniai / 5.0) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-600 to-amber-500" />
              <span>VaaniAI Neural Prosody (4.80 - 4.88)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>Standard TTS Baseline (3.45 - 3.80)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Human Ground Truth (4.88 - 4.95)</span>
            </div>
          </div>
        </section>

        {/* PLUGGABLE TTS ADAPTERS & DEV SETUP */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                Pluggable Adapter Architecture
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Seamlessly swap between local synthesis, Indic Parler-TTS, AI4Bharat, and Google Cloud
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            VaaniAI comes out of the box with zero required external API keys. Production deployments can connect directly to Indic Parler-TTS or AI4Bharat models simply by updating environment variables.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs space-y-3 overflow-x-auto">
            <div className="text-slate-400"># Set backend environment variables in backend/.env:</div>
            <div className="text-amber-400">TTS_ENGINE=indic-parler</div>
            <div className="text-indigo-300">HUGGINGFACE_API_KEY=hf_your_api_key_here</div>
            <div className="text-indigo-300">INDIC_PARLER_ENDPOINT=https://api-inference.huggingface.co/models/ai4bharat/indic-parler-tts</div>
            <div className="text-emerald-400"># Or use AI4Bharat Cloud:</div>
            <div className="text-indigo-300">AI4BHARAT_API_KEY=your_ai4bharat_token</div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
