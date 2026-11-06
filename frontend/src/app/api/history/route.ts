import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/lib/apiConfig";

export async function GET() {
  try {
    const res = await fetch(API_ENDPOINTS.history(), {
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (e) {
    // Return empty history fallback if backend is sleeping
  }

  return NextResponse.json({ count: 0, history: [] });
}
