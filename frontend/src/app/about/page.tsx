"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  Target,
  BookOpen,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe2
} from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. A. K. Ranganath",
      role: "Lead Speech & NLP Researcher",
      bio: "20+ years of research in computational linguistics, Indian script acoustics, and prosody modeling.",
      avatar: "AR"
    },
    {
      name: "P. V. Sravani",
      role: "Senior Indic Linguistic Engineer",
      bio: "Expert in Dravidian and Indo-Aryan sandhi rules, phonetic transcription, and pronunciation lexicons.",
      avatar: "PS"
    },
    {
      name: "N. Faizan Ahmed",
      role: "Audio AI & Acoustic Systems Architect",
      bio: "Specializes in neural vocoders, low-latency DSP pipelines, and audio alignment algorithms.",
      avatar: "FA"
    },
    {
      name: "Meera Sen",
      role: "Accessibility & Assistive Tech Lead",
      bio: "Advocate for WCAG compliance and assistive technologies for blind and low-vision communities.",
      avatar: "MS"
    }
  ];

  const milestones = [
    {
      quarter: "Phase 1 (Completed)",
      title: "Core Regional Engine & Rule Expansion",
      desc: "Built 12-language phonetic normalizer, numeral verbalizer, and demo synthesizer with karaoke alignment."
    },
    {
      quarter: "Phase 2 (Current)",
      title: "Pluggable Cloud Model Integration",
      desc: "Integrated Indic Parler-TTS, AI4Bharat IndicTTS, OCR text extraction, and side-by-side voice comparison."
    },
    {
      quarter: "Phase 3 (Future Scope)",
      title: "Low-Resource & Tribal Dialects",
      desc: "Extending models to Gondi, Santhali, Bodo, Dogri, and Maithili with zero-shot voice cloning."
    },
    {
      quarter: "Phase 4 (Future Scope)",
      title: "Offline Edge Deployment for Rural Schools",
      desc: "Optimizing models into 8-bit quantized ONNX models running directly on entry-level Android tablets."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Mission & Research Background</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            About Project VaaniAI
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Bridging the digital divide by giving written Indian regional literature and educational material a natural, human voice.
          </p>
        </div>

        {/* PROBLEM STATEMENT & OBJECTIVES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              The Problem Statement
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              While India possesses immense linguistic diversity with over a billion speakers of regional languages, digital voice technologies have historically treated non-English languages as secondary. Existing TTS engines sound robotic, mispronounce native names, fail on conjunct characters, and read Indian numerals incorrectly.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              This leaves millions of students, visually impaired citizens, and regional language readers excluded from digital voice experiences.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Our Key Objectives
            </h2>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2" />
                <span>Provide natural, lifelike prosody across 12 Indian regional languages.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2" />
                <span>Normalize native digits, dates, and abbreviations into spoken regional phrases.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2" />
                <span>Offer full accessibility (WCAG 2.1 AA) for visually impaired and elderly users.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2" />
                <span>Deliver an open, pluggable architecture that works 100% offline in demo mode.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* TEAM SECTION */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              The Minds Behind VaaniAI
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
              Project Research & Engineering Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-amber-500 text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {member.role}
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FUTURE SCOPE & ROADMAP */}
        <section className="p-8 rounded-3xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Future Roadmap
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Evolution & Research Horizons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((m) => (
              <div
                key={m.quarter}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5"
              >
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {m.quarter}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25 text-sm"
          >
            <span>Experience the Studio Firsthand</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
