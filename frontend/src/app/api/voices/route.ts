import { NextRequest, NextResponse } from "next/server";
import { VOICES } from "@/lib/data";
import { API_ENDPOINTS } from "@/lib/apiConfig";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("language") || undefined;

  try {
    const url = API_ENDPOINTS.voices(lang);
    const res = await fetch(url, {
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (e) {}

  const filtered = lang ? VOICES.filter((v) => v.language === lang) : VOICES;
  return NextResponse.json({ count: filtered.length, voices: filtered });
}
