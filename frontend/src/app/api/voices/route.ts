import { NextRequest, NextResponse } from "next/server";
import { VOICES } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("language");

  try {
    const backendUrl = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
    const url = lang
      ? `${backendUrl}/api/voices?language=${lang}`
      : `${backendUrl}/api/voices`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(4000),
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
