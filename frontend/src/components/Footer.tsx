"use client";

import React from "react";
import Link from "next/link";
import { Mic2, Heart, ShieldCheck, Globe, Sparkles, BookOpen, ExternalLink } from "lucide-react";
import { LANGUAGES } from "@/lib/data";

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-500 to-amber-500 text-white shadow-lg shadow-indigo-500/20">
                <Mic2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-heading">
                VaaniAI
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An Intelligent System to Narrate Written Regional-Language Content Naturally.
              Empowering students, visually impaired citizens, educators, and rural readers across India.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>WCAG 2.1 AA Compliant</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>12 Indian Scripts</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Studio & Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/studio" className="hover:text-indigo-400 transition-colors">
                  Narration Studio
                </Link>
              </li>
              <li>
                <Link href="/voices" className="hover:text-indigo-400 transition-colors">
                  Voice Library
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-indigo-400 transition-colors">
                  Audio History
                </Link>
              </li>
              <li>
                <Link href="/languages" className="hover:text-indigo-400 transition-colors">
                  Supported Languages
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology & Research */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Technology & AI
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/technology" className="hover:text-indigo-400 transition-colors">
                  Acoustic Pipeline
                </Link>
              </li>
              <li>
                <Link href="/technology#benchmarks" className="hover:text-indigo-400 transition-colors">
                  MOS Benchmarks
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-indigo-400 transition-colors">
                  Assistive Features
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="hover:text-indigo-400 transition-colors">
                  Linguistic Normalization
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Community & Project
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About VaaniAI
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-indigo-400 transition-colors">
                  System Settings
                </Link>
              </li>
              <li>
                <a
                  href="https://ai4bharat.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-400 transition-colors"
                >
                  <span>AI4Bharat Research</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Script Pills Marquee Bar */}
        <div className="py-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-slate-400 font-medium">
            Natural Narration for:
          </span>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <span
                key={l.code}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800/70 border border-slate-700/60 text-slate-300 font-sans"
              >
                {l.name} <span className="opacity-70 ml-1">({l.native_name})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} VaaniAI. Research Initiative for Indian Linguistic Diversity.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Regional Languages
          </p>
        </div>

      </div>
    </footer>
  );
};
