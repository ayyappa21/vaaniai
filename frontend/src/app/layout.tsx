import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "VaaniAI - Regional Language Natural Speech Narration",
  description: "An Intelligent System to Narrate Written Regional-Language Content Naturally. Let your words speak, in your own language.",
  keywords: [
    "Indic TTS", "Regional Language Narration", "Telugu TTS", "Hindi TTS", "Tamil TTS",
    "Kannada TTS", "Bengali TTS", "Malayalam TTS", "AI4Bharat", "Accessibility"
  ],
  authors: [{ name: "VaaniAI Research Group" }],
  openGraph: {
    title: "VaaniAI - Natural Regional Language Voice Narration",
    description: "Convert regional text into lifelike speech with dialect nuances, accurate pauses, and emotional tone.",
    url: "https://vaaniai.org",
    siteName: "VaaniAI",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Telugu:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&family=Noto+Sans+Kannada:wght@400;600;700&family=Noto+Sans+Malayalam:wght@400;600;700&family=Noto+Sans+Bengali:wght@400;600;700&family=Noto+Sans+Gujarati:wght@400;600;700&family=Noto+Sans+Gurmukhi:wght@400;600;700&family=Noto+Sans+Oriya:wght@400;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg"
        >
          Skip to main content
        </a>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
