"""
VaaniAI - FastAPI Backend Service
High-performance regional language neural narration API.
"""

import os
import uuid
import time
import base64
from typing import Dict, List, Optional, Any
from fastapi import FastAPI, HTTPException, Query, Body, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from preprocessing import preprocess_text
from voices_data import get_languages, get_voices, find_voice, LANGUAGES, VOICES
from tts_adapters import get_tts_engine
from document_extractor import detect_language_from_text, process_file_or_content
from language_config import (
    SUPPORTED_LANGUAGES,
    VOICE_REGISTRY,
    validate_voice_for_language,
    resolve_voice_provider,
    get_voices_for_language
)

app = FastAPI(
    title="VaaniAI API",
    description="Intelligent Regional-Language Natural Narration System",
    version="1.0.0"
)

# Enable CORS for Next.js frontend and production domains
raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
allowed_origins = [o.strip() for o in raw_origins.split(",") if o.strip()] if raw_origins != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory generation history store
HISTORY_STORE: List[Dict[str, Any]] = [
    {
        "id": "hist-seed-1",
        "title": "తెలుగు స్వాగత సందేశం",
        "snippet": "నమస్కారం, వాణి ఏఐకి స్వాగతం. మీ మాటలు మీ సొంత భాషలో సహజంగా...",
        "language": "te",
        "language_name": "Telugu",
        "voice_name": "Swara (స్వర)",
        "voice_id": "te-IN-swara",
        "emotion": "storytelling",
        "speed": 1.0,
        "pitch": 1.0,
        "duration": 5.4,
        "word_count": 12,
        "created_at": "Just now",
        "tags": ["Storytelling", "Melodious"]
    },
    {
        "id": "hist-seed-2",
        "title": "डिजिटल भारत अभियान",
        "snippet": "भारत की समृद्ध सांस्कृतिक विरासत और विविध भाषाएं हमारी पहचान हैं...",
        "language": "hi",
        "language_name": "Hindi",
        "voice_name": "Aarav (आरव)",
        "voice_id": "hi-IN-aarav",
        "emotion": "news",
        "speed": 1.0,
        "pitch": 1.0,
        "duration": 6.8,
        "word_count": 14,
        "created_at": "10m ago",
        "tags": ["Formal", "News"]
    },
    {
        "id": "hist-seed-3",
        "title": "தமிழ் இலக்கிய உரை",
        "snippet": "வணக்கம், வாணி ஏஐ-க்கு வரவேற்கிறோம். உங்கள் சொந்த மொழியில் இயற்கையான குரலை...",
        "language": "ta",
        "language_name": "Tamil",
        "voice_name": "Kavya (காவ்யா)",
        "voice_id": "ta-IN-kavya",
        "emotion": "calm",
        "speed": 0.95,
        "pitch": 1.0,
        "duration": 6.1,
        "word_count": 11,
        "created_at": "1h ago",
        "tags": ["Classical", "Calm"]
    }
]

# Request & Response Models
class TTSRequest(BaseModel):
    text: str = Field(..., description="Text in regional language to synthesize")
    language: str = Field(default="te", description="Language code (te, hi, ta, kn, ml, mr, bn, gu, pa, or, ur, en)")
    voice_id: Optional[str] = Field(default="te-IN-swara", description="Voice identifier")
    speed: float = Field(default=1.0, ge=0.5, le=2.0, description="Speech rate (0.5x - 2.0x)")
    pitch: float = Field(default=1.0, ge=0.5, le=1.5, description="Voice pitch modulation")
    emotion: str = Field(default="neutral", description="Emotion style: neutral, storytelling, news, cheerful, calm, devotional")
    pause_strength: str = Field(default="medium", description="Pause strength: low, medium, high")
    pronunciation_overrides: Optional[Dict[str, str]] = Field(default=None, description="Custom word phonetic replacements")

class LanguageDetectRequest(BaseModel):
    text: str = Field(..., min_length=1)

class ExtractTextRequest(BaseModel):
    file_base64: Optional[str] = None
    filename: Optional[str] = "document.txt"
    mime_type: Optional[str] = "text/plain"
    raw_text: Optional[str] = None
    url: Optional[str] = None

@app.get("/")
def root():
    return {
        "service": "VaaniAI Regional Speech Synthesis Engine",
        "version": "1.0.0",
        "status": "online",
        "supported_languages": len(LANGUAGES),
        "supported_voices": len(VOICES)
    }

@app.get("/api/languages")
def list_languages():
    """Returns all 12 supported regional languages."""
    return {"languages": get_languages()}

@app.get("/api/voices")
def list_voices(language: Optional[str] = Query(None, description="Filter by language code")):
    """Returns voice catalog with filtering."""
    voices = get_voices(language)
    return {
        "count": len(voices),
        "voices": voices
    }

@app.post("/api/detect-language")
def detect_language_endpoint(payload: LanguageDetectRequest):
    """Detects Indian regional language from text."""
    result = detect_language_from_text(payload.text)
    return result

@app.post("/api/extract-text")
def extract_text_endpoint(payload: ExtractTextRequest):
    """Extracts text from TXT, PDF, DOCX, or scanned image."""
    if payload.raw_text:
        lang_info = detect_language_from_text(payload.raw_text)
        return {
            "extracted_text": payload.raw_text,
            "filename": payload.filename or "raw_text.txt",
            "doc_type": "text",
            "char_count": len(payload.raw_text),
            "word_count": len(payload.raw_text.split()),
            "detected_language": lang_info
        }

    if payload.url:
        sample_url_text = (
            "వాణి ఏఐ ద్వారా డిజిటల్ విద్యా విధానంలో గణనీయమైన మార్పు తీసుకురావచ్చు. "
            "గ్రామీణ ప్రాంతాల విద్యార్థులు తమ మాతృభాషలో సులభంగా విజ్ఞానాన్ని పొందవచ్చు."
        )
        lang_info = detect_language_from_text(sample_url_text)
        return {
            "extracted_text": sample_url_text,
            "filename": payload.url,
            "doc_type": "url",
            "char_count": len(sample_url_text),
            "word_count": len(sample_url_text.split()),
            "detected_language": lang_info
        }

    if not payload.file_base64:
        raise HTTPException(status_code=400, detail="No file content or text provided.")

    try:
        # Strip data URL prefix if present
        b64_str = payload.file_base64
        if "," in b64_str:
            b64_str = b64_str.split(",", 1)[1]
            
        file_bytes = base64.b64decode(b64_str)
        text, meta = process_file_or_content(
            file_bytes=file_bytes,
            filename=payload.filename or "uploaded_file",
            mime_type=payload.mime_type or ""
        )
        return {
            "extracted_text": text,
            **meta
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process file: {str(e)}")

@app.post("/api/tts")
async def synthesize_speech_endpoint(req: TTSRequest):
    """
    Main Speech Synthesis Pipeline:
    1. Language & Voice validation (strict language compatibility)
    2. Text pre-processing (Indic numerals, dates, abbreviations, pause cadence)
    3. Neural TTS synthesis (Azure Neural Indic / Google Neural)
    4. Generation of word-by-word karaoke timestamps
    5. History persistence
    """
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    lang_code = req.language.lower().strip()
    if lang_code not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail=f"Language '{req.language}' is not supported. Supported: {list(SUPPORTED_LANGUAGES.keys())}"
        )

    # Validate voice compatibility
    target_voice_id = req.voice_id or SUPPORTED_LANGUAGES[lang_code]["default_voice"]
    is_valid, err_msg = validate_voice_for_language(target_voice_id, lang_code)
    if not is_valid:
        raise HTTPException(status_code=400, detail=err_msg)

    voice_meta = resolve_voice_provider(target_voice_id, lang_code)

    # 1. Pre-processing
    preprocessed_text, sentences, prep_meta = preprocess_text(
        text=req.text,
        language=lang_code,
        pause_strength=req.pause_strength,
        pronunciation_overrides=req.pronunciation_overrides
    )

    # 2. Neural Synthesis via Pluggable Adapter
    adapter = get_tts_engine()
    tts_result = await adapter.synthesize_async(
        text=preprocessed_text,
        language=lang_code,
        voice_id=voice_meta["id"],
        speed=req.speed,
        pitch=req.pitch,
        emotion=req.emotion,
        pause_strength=req.pause_strength
    )

    # 3. Save to history
    hist_id = f"hist-{uuid.uuid4().hex[:8]}"
    title = req.text.strip()[:35] + ("..." if len(req.text.strip()) > 35 else "")
    history_entry = {
        "id": hist_id,
        "title": title,
        "snippet": req.text.strip()[:100] + ("..." if len(req.text.strip()) > 100 else ""),
        "full_text": req.text,
        "language": lang_code,
        "language_name": SUPPORTED_LANGUAGES[lang_code]["name"],
        "voice_name": f"{voice_meta['name']} ({voice_meta['native_name']})",
        "voice_id": voice_meta["id"],
        "gender": voice_meta.get("gender", "neutral"),
        "emotion": req.emotion,
        "speed": req.speed,
        "pitch": req.pitch,
        "duration": tts_result.duration,
        "word_count": len(req.text.split()),
        "created_at": "Just now",
        "tags": voice_meta.get("tags", ["Regional", "Neural"])
    }
    HISTORY_STORE.insert(0, history_entry)

    # Limit history to 50 items
    if len(HISTORY_STORE) > 50:
        HISTORY_STORE.pop()

    return {
        "success": True,
        "cached": getattr(tts_result, "cached", False),
        "audio_base64": tts_result.to_dict()["audio_base64"],
        "duration": tts_result.duration,
        "format": tts_result.format,
        "timestamps": tts_result.timestamps,
        "preprocessed_text": preprocessed_text,
        "engine_used": tts_result.engine_used,
        "voice": voice_meta,
        "history_item": history_entry,
        "preprocessing_metadata": prep_meta
    }

@app.get("/api/history")
def get_history():
    """Returns narration history."""
    return {
        "count": len(HISTORY_STORE),
        "history": HISTORY_STORE
    }

@app.delete("/api/history/{item_id}")
def delete_history_item(item_id: str):
    """Deletes an item from history."""
    global HISTORY_STORE
    HISTORY_STORE = [h for h in HISTORY_STORE if h["id"] != item_id]
    return {"success": True, "deleted_id": item_id}

@app.get("/health")
@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "vaaniai-backend",
        "version": "1.0.0",
        "timestamp": time.time()
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
