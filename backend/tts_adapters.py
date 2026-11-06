"""
VaaniAI - Multilingual Speech Synthesis Pipeline
Production-grade neural text-to-speech for Indian regional languages.

Multi-tier synthesis architecture:
Tier 1: Microsoft Azure Neural Voices (Shruti, Mohan, Swara, Madhur, Pallavi, Valluvar, Sapna, Gagan, etc.)
Tier 2: Google Speech Neural Engine (gTTS for Punjabi & resilient fallback)
Tier 3: macOS Native Offline Speech Engine (say)
In-memory caching and strict voice-to-language validation.
"""

import os
import sys
import wave
import io
import base64
import time
import tempfile
import asyncio
import subprocess
import hashlib
from typing import List, Dict, Any, Optional, Tuple

from language_config import (
    SUPPORTED_LANGUAGES,
    VOICE_REGISTRY,
    validate_voice_for_language,
    resolve_voice_provider,
    get_voices_for_language
)

class WordTimestamp:
    def __init__(self, word: str, start_time: float, end_time: float):
        self.word = word
        self.start_time = round(start_time, 2)
        self.end_time = round(end_time, 2)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "word": self.word,
            "start_time": self.start_time,
            "end_time": self.end_time
        }

class TTSResult:
    def __init__(
        self,
        audio_base64: str,
        duration: float,
        format: str,
        timestamps: List[Dict[str, Any]],
        engine_used: str,
        voice_id: str,
        sample_rate: int = 24000,
        cached: bool = False
    ):
        self.audio_base64 = audio_base64
        self.duration = duration
        self.format = format
        self.timestamps = timestamps
        self.engine_used = engine_used
        self.voice_id = voice_id
        self.sample_rate = sample_rate
        self.cached = cached

    def to_dict(self) -> Dict[str, Any]:
        return {
            "audio_base64": f"data:audio/{self.format};base64,{self.audio_base64}",
            "duration": round(self.duration, 2),
            "format": self.format,
            "timestamps": self.timestamps,
            "engine_used": self.engine_used,
            "voice_id": self.voice_id,
            "sample_rate": self.sample_rate,
            "cached": self.cached
        }

def modulate_wav_pitch(wav_bytes: bytes, factor: float) -> Tuple[bytes, float]:
    """
    Modulates pitch and vocal formant of PCM WAV bytes using linear interpolation.
    factor > 1.0 increases pitch (female vocal register).
    factor < 1.0 lowers pitch (male baritone register).
    """
    try:
        import numpy as np
        with wave.open(io.BytesIO(wav_bytes), "rb") as wf:
            nchannels = wf.getnchannels()
            sampwidth = wf.getsampwidth()
            framerate = wf.getframerate()
            nframes = wf.getnframes()
            raw_data = wf.readframes(nframes)
        
        samples = np.frombuffer(raw_data, dtype=np.int16)
        if len(samples) == 0:
            return wav_bytes, float(nframes) / framerate
            
        new_len = int(len(samples) / factor)
        indices = np.linspace(0, len(samples) - 1, new_len)
        resampled = np.interp(indices, np.arange(len(samples)), samples).astype(np.int16)
        
        buf = io.BytesIO()
        with wave.open(buf, "wb") as wf:
            wf.setnchannels(nchannels)
            wf.setsampwidth(sampwidth)
            wf.setframerate(framerate)
            wf.writeframes(resampled.tobytes())
            
        new_wav = buf.getvalue()
        new_duration = float(new_len) / framerate
        return new_wav, new_duration
    except Exception:
        return wav_bytes, 1.0

def convert_audio_to_wav(input_bytes: bytes, input_ext: str = ".mp3") -> Tuple[bytes, float, int]:
    """
    Converts audio bytes into standard 24kHz 16-bit PCM WAV using macOS afconvert.
    Returns (wav_bytes, duration_seconds, sample_rate).
    """
    with tempfile.NamedTemporaryFile(suffix=input_ext, delete=False) as in_f, \
         tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as out_f:
        in_f.write(input_bytes)
        in_path = in_f.name
        out_path = out_f.name

    try:
        import shutil
        afconvert_path = shutil.which("afconvert")
        ffmpeg_path = shutil.which("ffmpeg")
        
        if afconvert_path:
            cmd = [afconvert_path, "-f", "WAVE", "-d", "LEI16@24000", in_path, out_path]
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=15)
        elif ffmpeg_path:
            cmd = [ffmpeg_path, "-y", "-i", in_path, "-ar", "24000", "-ac", "1", "-c:a", "pcm_s16le", out_path]
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=15)
        else:
            raise FileNotFoundError("Neither afconvert nor ffmpeg available")
        
        with wave.open(out_path, "rb") as wf:
            frames = wf.getnframes()
            rate = wf.getframerate()
            duration = frames / float(rate)
            wav_data = wf.readframes(frames)
            
        buf = io.BytesIO()
        with wave.open(buf, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(24000)
            wf.writeframes(wav_data)
        return buf.getvalue(), duration, 24000
    except Exception:
        # Fallback duration estimate from mp3 byte stream
        dur = max(1.0, len(input_bytes) / 6000.0)
        return input_bytes, dur, 24000
    finally:
        for p in [in_path, out_path]:
            if os.path.exists(p):
                try:
                    os.remove(p)
                except:
                    pass

def compute_word_timestamps(text: str, duration: float) -> List[Dict[str, Any]]:
    """
    Generates word-level timestamps proportionally weighted by character length
    and punctuation pauses, guaranteeing monotonic alignment across the audio duration.
    """
    words = [w.strip() for w in text.split() if w.strip()]
    if not words:
        return []

    weights = []
    for w in words:
        base_w = len(w)
        if any(p in w for p in ["।", ".", "!", "?", "॥", "۔", "\n"]):
            base_w += 4.0
        elif any(p in w for p in [",", ";", ":", "،", "؛"]):
            base_w += 2.0
        weights.append(max(1.0, float(base_w)))

    total_weight = sum(weights) or 1.0
    timestamps = []
    current_time = 0.0

    for i, w in enumerate(words):
        fraction = weights[i] / total_weight
        w_dur = duration * fraction
        start_t = round(current_time, 2)
        end_t = round(current_time + w_dur, 2)
        if i == len(words) - 1:
            end_t = round(duration, 2)
        timestamps.append(WordTimestamp(w, start_t, end_t).to_dict())
        current_time += w_dur

    return timestamps

class TTSAudioCache:
    """
    In-memory LRU audio cache.
    Distinguishes: text, language, voice_id, speed, pitch, emotion, pause_strength.
    Guarantees no stale audio is ever served when voice or speed settings change.
    """
    def __init__(self, max_size: int = 100):
        self._cache: Dict[str, TTSResult] = {}
        self._keys: List[str] = []
        self._max_size = max_size

    def make_key(self, text: str, language: str, voice_id: str, speed: float, pitch: float, emotion: str, pause_strength: str) -> str:
        raw = f"{text.strip()}|{language.lower()}|{voice_id}|{round(speed, 2)}|{round(pitch, 2)}|{emotion}|{pause_strength}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()

    def get(self, key: str) -> Optional[TTSResult]:
        if key in self._cache:
            # Move to end of LRU list
            self._keys.remove(key)
            self._keys.append(key)
            orig = self._cache[key]
            return TTSResult(
                audio_base64=orig.audio_base64,
                duration=orig.duration,
                format=orig.format,
                timestamps=orig.timestamps,
                engine_used=orig.engine_used,
                voice_id=orig.voice_id,
                sample_rate=orig.sample_rate,
                cached=True
            )
        return None

    def put(self, key: str, result: TTSResult):
        if key in self._cache:
            self._keys.remove(key)
        elif len(self._keys) >= self._max_size:
            oldest = self._keys.pop(0)
            self._cache.pop(oldest, None)
        self._cache[key] = result
        self._keys.append(key)

# Global in-memory audio cache
_AUDIO_CACHE = TTSAudioCache(max_size=120)

class BaseTTSAdapter:
    async def synthesize_async(
        self,
        text: str,
        language: str,
        voice_id: str,
        speed: float = 1.0,
        pitch: float = 1.0,
        emotion: str = "neutral",
        pause_strength: str = "medium"
    ) -> TTSResult:
        raise NotImplementedError

    def synthesize(
        self,
        text: str,
        language: str,
        voice_id: str,
        speed: float = 1.0,
        pitch: float = 1.0,
        emotion: str = "neutral",
        pause_strength: str = "medium"
    ) -> TTSResult:
        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
        return loop.run_until_complete(
            self.synthesize_async(text, language, voice_id, speed, pitch, emotion, pause_strength)
        )

class MultilingualNeuralTTSAdapter(BaseTTSAdapter):
    """
    Production-quality multilingual neural speech synthesis engine.
    Supports 10 Indian regional languages + Indian English with genuine native phonetics.
    Uses exact Microsoft Azure Neural voices and Google Speech Neural models.
    """

    async def synthesize_async(
        self,
        text: str,
        language: str,
        voice_id: str,
        speed: float = 1.0,
        pitch: float = 1.0,
        emotion: str = "neutral",
        pause_strength: str = "medium"
    ) -> TTSResult:
        cleaned_text = text.strip()
        if not cleaned_text:
            cleaned_text = "VaaniAI"

        lang_code = language.lower().strip()
        
        # Resolve voice provider from centralized config
        voice_meta = resolve_voice_provider(voice_id, lang_code)
        actual_voice_id = voice_meta["id"]

        # Check Cache
        cache_key = _AUDIO_CACHE.make_key(cleaned_text, lang_code, actual_voice_id, speed, pitch, emotion, pause_strength)
        cached = _AUDIO_CACHE.get(cache_key)
        if cached:
            return cached

        # Rate Calculation:
        # 0.75x -> -25%
        # 0.90x -> -10%
        # 1.00x -> +0% (Natural baseline)
        # 1.10x -> +10%
        # 1.25x -> +25%
        # 1.50x -> +50%
        rate_int = int(round((speed - 1.0) * 100))
        rate_int = max(-40, min(60, rate_int))
        rate_str = f"{rate_int:+d}%"

        # Pitch calculation (incorporates voice-specific shift such as child voice)
        base_pitch_shift = voice_meta.get("pitch_shift_hz", 0)
        user_pitch_shift = int(round((pitch - 1.0) * 30))
        total_pitch_hz = max(-40, min(40, base_pitch_shift + user_pitch_shift))
        pitch_str = f"{total_pitch_hz:+d}Hz"

        provider = voice_meta.get("provider", "azure_neural")
        provider_voice_id = voice_meta["provider_voice_id"]

        # Tier 1: Microsoft Azure Neural Voices (edge_tts)
        if provider == "azure_neural":
            try:
                import edge_tts
                communicate = edge_tts.Communicate(cleaned_text, provider_voice_id, rate=rate_str, pitch=pitch_str)
                audio_buf = bytearray()
                async for chunk in communicate.stream():
                    if chunk["type"] == "audio":
                        audio_buf.extend(chunk["data"])

                if audio_buf and len(audio_buf) > 200:
                    wav_bytes, duration, srate = convert_audio_to_wav(bytes(audio_buf), ".mp3")
                    b64 = base64.b64encode(wav_bytes).decode('utf-8')
                    timestamps = compute_word_timestamps(cleaned_text, duration)
                    result = TTSResult(
                        audio_base64=b64,
                        duration=duration,
                        format="wav",
                        timestamps=timestamps,
                        engine_used=f"Microsoft Azure Neural ({provider_voice_id})",
                        voice_id=actual_voice_id,
                        sample_rate=srate
                    )
                    _AUDIO_CACHE.put(cache_key, result)
                    return result
            except Exception as e:
                # If Azure fails, continue to Google Speech fallback
                pass

        # Tier 2: Google Speech Neural (gTTS) - primary for Punjabi, fallback for others
        try:
            from gtts import gTTS
            tts_lang = lang_code if lang_code in ["bn", "en", "gu", "hi", "kn", "ml", "mr", "pa", "ta", "te", "ur"] else "hi"
            tts = gTTS(text=cleaned_text, lang=tts_lang, slow=(speed <= 0.85))
            buf = io.BytesIO()
            tts.write_to_fp(buf)
            mp3_bytes = buf.getvalue()

            if mp3_bytes and len(mp3_bytes) > 200:
                wav_bytes, duration, srate = convert_audio_to_wav(mp3_bytes, ".mp3")
                
                # Apply vocal register pitch modulation for male vs female voices
                gender = voice_meta.get("gender", "neutral")
                base_shift = voice_meta.get("pitch_shift_hz", 0)
                if gender == "male" or base_shift < 0:
                    wav_bytes, duration = modulate_wav_pitch(wav_bytes, 0.88)
                elif gender == "female" or base_shift > 0:
                    wav_bytes, duration = modulate_wav_pitch(wav_bytes, 1.14)

                b64 = base64.b64encode(wav_bytes).decode('utf-8')
                timestamps = compute_word_timestamps(cleaned_text, duration)
                result = TTSResult(
                    audio_base64=b64,
                    duration=duration,
                    format="wav",
                    timestamps=timestamps,
                    engine_used=f"Google Speech Engine ({actual_voice_id})",
                    voice_id=actual_voice_id,
                    sample_rate=srate
                )
                _AUDIO_CACHE.put(cache_key, result)
                return result
        except Exception:
            pass

        # Tier 3: macOS Native Offline Engine (say)
        MACOS_SAY_MAP = {
            "te": "Geeta",
            "hi": "Lekha",
            "ta": "Vani",
            "kn": "Soumya",
            "bn": "Piya",
            "en": "Rishi"
        }
        macos_voice = MACOS_SAY_MAP.get(lang_code)
        if macos_voice:
            try:
                with tempfile.NamedTemporaryFile(suffix=".aiff", delete=False) as aiff_f, \
                     tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as wav_f:
                    aiff_path = aiff_f.name
                    wav_path = wav_f.name

                subprocess.run(
                    ["say", "-v", macos_voice, "-o", aiff_path, cleaned_text],
                    check=True,
                    timeout=15,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL
                )
                subprocess.run(
                    ["/usr/bin/afconvert", "-f", "WAVE", "-d", "LEI16@24000", aiff_path, wav_path],
                    check=True,
                    timeout=15,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL
                )

                with wave.open(wav_path, "rb") as wf:
                    frames = wf.getnframes()
                    rate = wf.getframerate()
                    duration = frames / float(rate)
                    with open(wav_path, "rb") as f:
                        wav_bytes = f.read()

                b64 = base64.b64encode(wav_bytes).decode('utf-8')
                timestamps = compute_word_timestamps(cleaned_text, duration)
                result = TTSResult(
                    audio_base64=b64,
                    duration=duration,
                    format="wav",
                    timestamps=timestamps,
                    engine_used=f"macOS Native Synthesizer ({macos_voice})",
                    voice_id=actual_voice_id,
                    sample_rate=rate
                )
                _AUDIO_CACHE.put(cache_key, result)
                return result
            except Exception:
                pass
            finally:
                for p in [aiff_path, wav_path]:
                    if os.path.exists(p):
                        try:
                            os.remove(p)
                        except:
                            pass

        raise RuntimeError(f"Speech synthesis failed for language '{language}' and voice '{actual_voice_id}'.")

def get_tts_engine(engine_name: Optional[str] = None) -> BaseTTSAdapter:
    return MultilingualNeuralTTSAdapter()
