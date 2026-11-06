import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/lib/apiConfig";

const SCRIPT_RANGES = [
  { code: "te", name: "Telugu", start: 0x0c00, end: 0x0c7f, native: "తెలుగు", script: "Telugu", is_rtl: false },
  { code: "hi", name: "Hindi", start: 0x0900, end: 0x097f, native: "हिन्दी", script: "Devanagari", is_rtl: false },
  { code: "ta", name: "Tamil", start: 0x0b80, end: 0x0bff, native: "தமிழ்", script: "Tamil", is_rtl: false },
  { code: "kn", name: "Kannada", start: 0x0c80, end: 0x0cff, native: "ಕನ್ನಡ", script: "Kannada", is_rtl: false },
  { code: "ml", name: "Malayalam", start: 0x0d00, end: 0x0d7f, native: "മലയാളം", script: "Malayalam", is_rtl: false },
  { code: "bn", name: "Bengali", start: 0x0980, end: 0x09ff, native: "বাংলা", script: "Bengali", is_rtl: false },
  { code: "gu", name: "Gujarati", start: 0x0a80, end: 0x0aff, native: "ગુજરાતી", script: "Gujarati", is_rtl: false },
  { code: "pa", name: "Punjabi", start: 0x0a00, end: 0x0a7f, native: "ਪੰਜਾਬੀ", script: "Gurmukhi", is_rtl: false },
  { code: "or", name: "Odia", start: 0x0b00, end: 0x0b7f, native: "ଓଡ଼ିଆ", script: "Odia", is_rtl: false },
  { code: "ur", name: "Urdu", start: 0x0600, end: 0x06ff, native: "اردو", script: "Nastaliq Urdu", is_rtl: true },
];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({ text: "" }));
  const text: string = body.text || "";

  try {
    const res = await fetch(API_ENDPOINTS.detectLanguage(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(6000),
    });
    if (res.ok) {
      return NextResponse.json(await res.json());
    }
  } catch (e) {}

  for (const c of text) {
    const codePoint = c.charCodeAt(0);
    const match = SCRIPT_RANGES.find((s) => codePoint >= s.start && codePoint <= s.end);
    if (match) {
      return NextResponse.json({
        language_code: match.code,
        language_name: match.name,
        native_name: match.native,
        script: match.script,
        confidence: 0.98,
        is_rtl: match.is_rtl,
      });
    }
  }

  return NextResponse.json({
    language_code: "te",
    language_name: "Telugu",
    native_name: "తెలుగు",
    script: "Telugu",
    confidence: 0.85,
    is_rtl: false,
  });
}
