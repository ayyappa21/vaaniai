"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Send, CheckCircle2, MessageSquare, AlertCircle, Sparkles, MapPin, Phone } from "lucide-react";
import { LANGUAGES } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "te",
    category: "dialect",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please provide your full name.";
    if (!formData.email.trim() || !formData.email.includes("@")) errs.email = "Please provide a valid email address.";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // Optional: trigger confetti if available
      try {
        import("canvas-confetti").then((confetti) => {
          confetti.default({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
        });
      } catch (e) {}
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span>Community & Research Dialogue</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Contact & Linguistic Feedback
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Noticed a pronunciation inaccuracy or want to request a new regional dialect voice? We welcome your input to improve VaaniAI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Panel (md:col-span-5) */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Research Collaboration
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Project VaaniAI collaborates with universities, native language linguists, and accessibility organizations across India.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  <span>research@vaaniai.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Hyderabad & Bangalore Research Labs, India</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-3 text-xs text-indigo-900 dark:text-indigo-200">
              <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Dialect Contribution</span>
              </div>
              <p className="leading-relaxed">
                If you have native audio recordings or pronunciation dictionaries for low-resource Indian dialects, we would love to connect!
              </p>
            </div>
          </div>

          {/* Right Form Panel (md:col-span-7) */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                    ధన్యవాదాలు! Thank you!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Your linguistic feedback has been recorded. Our research team will review the dialect nuances and update the acoustic pronunciation lexicons.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", language: "te", category: "dialect", message: "" });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow"
                  >
                    Send Another Response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. Ramesh Kumar"
                    />
                    {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="ramesh@example.com"
                    />
                    {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                        Relevant Language
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white"
                      >
                        {LANGUAGES.map((l) => (
                          <option key={l.code} value={l.code}>
                            {l.name} ({l.native_name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                        Feedback Topic
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white"
                      >
                        <option value="dialect">Dialect / Pronunciation Nuance</option>
                        <option value="voice">Request New Voice Persona</option>
                        <option value="accessibility">Accessibility Suggestion</option>
                        <option value="research">Academic Collaboration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                      Your Detailed Observations *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the phonetic issue, word example, or suggestion..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Feedback to Research Team</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
