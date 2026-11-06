"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mic2, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { LANGUAGES } from "@/lib/data";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    primaryLang: "te",
    role: "student"
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Mic2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Join VaaniAI
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Create an account for personalized dialect libraries and audiobook exports
            </p>
          </div>

          {isSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                Welcome to VaaniAI!
              </h4>
              <p className="text-xs text-emerald-600 dark:text-emerald-300">
                Your profile is active. Ready to narrate in your native tongue.
              </p>
              <Link
                href="/studio"
                className="inline-block px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl"
              >
                Launch Studio
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ananya@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Primary Language
                  </label>
                  <select
                    value={formData.primaryLang}
                    onChange={(e) => setFormData({ ...formData, primaryLang: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.name} ({l.native_name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    I am a...
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="student">Student / Aspirant</option>
                    <option value="visually_impaired">Visually Impaired Reader</option>
                    <option value="teacher">Teacher / Educator</option>
                    <option value="creator">Audiobook Creator</option>
                    <option value="linguist">Linguist / Researcher</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-amber-500 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Sign In
            </Link>{" "}
            or{" "}
            <Link href="/studio" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Try Studio without sign-up
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
