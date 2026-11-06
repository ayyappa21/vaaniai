import { NextResponse } from "next/server";
import { LANGUAGES } from "@/lib/data";

export async function GET() {
  try {
    const backendUrl = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
    const res = await fetch(`${backendUrl}/api/languages`, {
      signal: AbortSignal.timeout(4000),
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
