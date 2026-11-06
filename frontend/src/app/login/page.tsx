"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mic2, Lock, Mail, Phone, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function LoginPage() {
  const [method, setMethod] = useState<"email" | "phone">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
              Welcome back to VaaniAI
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sign in to sync your custom pronunciation dictionaries across devices
            </p>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>Note: Studio works 100% free with zero login required!</span>
          </div>

          {/* Toggle Email vs Phone */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMethod("phone")}
              className={`py-2 rounded-lg transition-colors ${
                method === "phone"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Indian Mobile (OTP)
            </button>
            <button
              type="button"
              onClick={() => setMethod("email")}
              className={`py-2 rounded-lg transition-colors ${
                method === "email"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Email & Password
            </button>
          </div>

          {isSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                Authentication Successful
              </h4>
              <p className="text-xs text-emerald-600 dark:text-emerald-300">
                Redirecting you to the studio...
              </p>
              <Link
                href="/studio"
                className="inline-block px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl"
              >
                Go to Studio
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {method === "phone" ? (
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Mobile Number (+91)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-semibold text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25 transition-all"
              >
                <span>{method === "phone" ? "Send OTP Code" : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Create an account
            </Link>{" "}
            or{" "}
            <Link href="/studio" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Use as Guest
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
