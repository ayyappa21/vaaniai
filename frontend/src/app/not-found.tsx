import React from "react";
import Link from "next/link";
import { Mic2, ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* Glow Badge */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/30">
          <Mic2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-6xl sm:text-7xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Page Not Found
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 font-sans">
            పేజీ కనుగొనబడలేదు • पृष्ठ नहीं मिला • பக்கம் கிடைக்கவில்லை
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
          The requested regional resource or page could not be located. You can return to the home page or start narrating in the Studio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/studio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Studio</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
