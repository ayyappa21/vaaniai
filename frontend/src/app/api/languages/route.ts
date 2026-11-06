import { NextResponse } from "next/server";
import { LANGUAGES } from "@/lib/data";
import { API_ENDPOINTS } from "@/lib/apiConfig";

export async function GET() {
  try {
    const res = await fetch(API_ENDPOINTS.languages(), {
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (e) {
    // Backend offline / starting
  }

  return NextResponse.json({ languages: LANGUAGES });
}
