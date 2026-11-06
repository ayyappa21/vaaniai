"use client";

import React, { useRef, useEffect, useState } from "react";

interface AudioWaveformProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onSeek: (time: number) => void;
  barColor?: string;
  progressColor?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  currentTime,
  duration,
  isPlaying,
  onSeek,
  barColor = "rgba(148, 163, 184, 0.35)",
  progressColor = "#4f46e5"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);

  // Generate static pseudo-random waveform peaks based on duration
  const peaksRef = useRef<number[]>([]);
  useEffect(() => {
    const barsCount = 70;
    const peaks: number[] = [];
    for (let i = 0; i < barsCount; i++) {
      // Natural speech rhythm has bursts and valleys
      const rhythm = Math.sin(i * 0.25) * 0.4 + 0.5;
      const noise = (Math.sin(i * 1.7) + Math.cos(i * 0.8)) * 0.2;
      const height = Math.max(0.15, Math.min(0.95, rhythm + noise));
      peaks.push(height);
    }
    peaksRef.current = peaks;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const peaks = peaksRef.current;
    if (!peaks.length) return;

    const barWidth = 3;
    const gap = (width - peaks.length * barWidth) / (peaks.length - 1);
    const progressRatio = duration > 0 ? currentTime / duration : 0;

    peaks.forEach((peak, i) => {
      const x = i * (barWidth + gap);
      const barH = peak * (height - 8);
      const y = (height - barH) / 2;
      const isPast = x / width <= progressRatio;

      ctx.fillStyle = isPast ? progressColor : barColor;
      
      // Rounded bar
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, 2);
      ctx.fill();
    });

    // Draw playhead cursor
    if (duration > 0) {
      const playheadX = progressRatio * width;
      ctx.fillStyle = "#f59e0b"; // Saffron amber accent
      ctx.beginPath();
      ctx.roundRect(Math.max(0, playheadX - 1.5), 2, 3, height - 4, 2);
      ctx.fill();
    }
  }, [currentTime, duration, isPlaying, barColor, progressColor]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || duration <= 0) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * duration);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || duration <= 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    setHoverTime(ratio * duration);
    setHoverX(x);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
    setHoverX(null);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="relative w-full select-none">
      <canvas
        ref={canvasRef}
        width={560}
        height={48}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-12 cursor-pointer rounded-lg bg-slate-100/50 dark:bg-slate-900/50 transition-colors"
        aria-label="Audio waveform seeker"
      />
      {hoverTime !== null && hoverX !== null && (
        <div
          className="absolute -top-7 pointer-events-none transform -translate-x-1/2 bg-slate-800 text-white text-[11px] font-mono px-1.5 py-0.5 rounded shadow"
          style={{ left: `${hoverX}px` }}
        >
          {formatTime(hoverTime)}
        </div>
      )}
    </div>
  );
};
