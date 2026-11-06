import { NextRequest, NextResponse } from "next/server";
import { VOICES, Voice } from "@/lib/data";

function generateNodeOfflineWav(text: string, voice: Voice, speed: number, pitch: number, emotion: string) {
  const words = text.split(/\s+/).filter(Boolean);
  const sampleRate = 22050;
  const isFemale = voice.gender === "female";
  const isChild = voice.gender === "child";
  
  let baseF0 = isChild ? 290 : isFemale ? 220 : 135;
  baseF0 *= pitch;

  const emotionMultipliers: Record<string, number> = {
    neutral: 1.0,
    storytelling: 0.95,
    news: 1.08,
    cheerful: 1.15,
    calm: 0.88,
    devotional: 0.92,
  };
  baseF0 *= emotionMultipliers[emotion] || 1.0;

  const speedFactor = Math.max(0.5, Math.min(2.0, speed));
  const timestamps: { word: string; start_time: number; end_time: number }[] = [];
  const samples: number[] = [];
  let currentTime = 0;

  words.forEach((word) => {
    const wordDur = Math.max(0.24, Math.min(1.1, word.length * 0.08)) / speedFactor;
    const startT = Math.round(currentTime * 100) / 100;
    const endT = Math.round((currentTime + wordDur) * 100) / 100;
    timestamps.push({ word, start_time: startT, end_time: endT });

    const numSamples = Math.floor(wordDur * sampleRate);
    for (let s = 0; s < numSamples; s++) {
      const t = s / sampleRate;
      const envelope = Math.pow(Math.sin(Math.PI * (s / numSamples)), 0.8);
      const inflection = Math.sin(2.0 * Math.PI * 1.5 * t) * 8.0;
      const f0 = baseF0 + inflection;

      const val = (
        0.50 * Math.sin(2 * Math.PI * f0 * t) +
        0.28 * Math.sin(2 * Math.PI * (f0 * 2) * t) +
        0.14 * Math.sin(2 * Math.PI * (f0 * 3) * t)
      ) * envelope;
      samples.push(val);
    }

    currentTime = endT;
    const pauseDur = (word.match(/[।\.\?!,،]/) ? 0.25 : 0.08) / speedFactor;
    const pauseSamples = Math.floor(pauseDur * sampleRate);
    for (let p = 0; p < pauseSamples; p++) {
      samples.push(0);
    }
    currentTime += pauseDur;
  });

  const buffer = Buffer.alloc(44 + samples.length * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + samples.length * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(samples.length * 2, 40);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    const int16 = clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF;
    buffer.writeInt16LE(int16, offset);
    offset += 2;
  }

  const base64Audio = buffer.toString("base64");
  return {
    audio_base64: `data:audio/wav;base64,${base64Audio}`,
    duration: Math.round(currentTime * 100) / 100,
    format: "wav",
    timestamps,
    engine_used: "VaaniAI Acoustic Engine (Edge Fallback)",
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const voice = VOICES.find((v) => v.id === body.voice_id) || VOICES[0];

  try {
    const backendUrl = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
    const res = await fetch(`${backendUrl}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20000),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (e) {
    console.error("FastAPI proxy error:", e);
  }

  // Fallback generation
  const generated = generateNodeOfflineWav(
    body.text || "VaaniAI",
    voice,
    body.speed || 1.0,
    body.pitch || 1.0,
    body.emotion || "neutral"
  );

  return NextResponse.json({
    success: true,
    audio_base64: generated.audio_base64,
    duration: generated.duration,
    format: generated.format,
    timestamps: generated.timestamps,
    preprocessed_text: body.text,
    engine_used: generated.engine_used,
    voice,
    preprocessing_metadata: {
      original_char_count: (body.text || "").length,
      sentence_count: 1,
    },
    history_item: {
      id: `hist-${Date.now()}`,
      title: (body.text || "").slice(0, 35),
      snippet: (body.text || "").slice(0, 100),
      full_text: body.text,
      language: body.language || "te",
      language_name: "Telugu",
      voice_name: `${voice.name} (${voice.native_name})`,
      voice_id: voice.id,
      emotion: body.emotion || "neutral",
      speed: body.speed || 1.0,
      pitch: body.pitch || 1.0,
      duration: generated.duration,
      word_count: (body.text || "").split(/\s+/).filter(Boolean).length,
      created_at: "Just now",
      tags: voice.tags,
    },
  });
}
