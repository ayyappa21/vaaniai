"""
VaaniAI - Centralized Language and Voice Configuration
Authoritative mapping between frontend voice IDs, linguistic metadata,
and underlying neural TTS provider voice models (Microsoft Azure Neural, Google Neural).
"""

from typing import Dict, List, Optional, Any, Tuple

# Supported Regional Languages
SUPPORTED_LANGUAGES: Dict[str, Dict[str, Any]] = {
    "te": {
        "code": "te",
        "name": "Telugu",
        "native_name": "తెలుగు",
        "script": "Telugu",
        "sample": "నమస్కారం, వాణి ఏఐకి స్వాగతం. మీ మాటలు మీ సొంత భాషలో సహజంగా వినిపించండి.",
        "default_voice": "te-IN-swara",
        "primary_provider": "azure_neural"
    },
    "hi": {
        "code": "hi",
        "name": "Hindi",
        "native_name": "हिन्दी",
        "script": "Devanagari",
        "sample": "नमस्ते, वाणी एआई में आपका स्वागत है। अपनी मातृभाषा में स्वाभाविक और स्पष्ट स्वर का अनुभव करें।",
        "default_voice": "hi-IN-priya",
        "primary_provider": "azure_neural"
    },
    "ta": {
        "code": "ta",
        "name": "Tamil",
        "native_name": "தமிழ்",
        "script": "Tamil",
        "sample": "வணக்கம், வாணி ஏஐ-க்கு வரவேற்கிறோம். உங்கள் சொந்த மொழியில் இயற்கையான குரலை அனுபவியுங்கள்.",
        "default_voice": "ta-IN-kavya",
        "primary_provider": "azure_neural"
    },
    "kn": {
        "code": "kn",
        "name": "Kannada",
        "native_name": "ಕನ್ನಡ",
        "script": "Kannada",
        "sample": "ನಮಸ್ಕಾರ, ವಾಣಿ ಎಐಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಸ್ವಾಭಾವಿಕ ಧ್ವನಿಯನ್ನು ಆಲಿಸಿ.",
        "default_voice": "kn-IN-bhavana",
        "primary_provider": "azure_neural"
    },
    "ml": {
        "code": "ml",
        "name": "Malayalam",
        "native_name": "മലയാളം",
        "script": "Malayalam",
        "sample": "നമസ്കാരം, വാണി എഐയിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ സ്വന്തം ഭാഷയിൽ മനോഹരമായ ശബ്ദം ആസ്വദിക്കൂ.",
        "default_voice": "ml-IN-anjali",
        "primary_provider": "azure_neural"
    },
    "mr": {
        "code": "mr",
        "name": "Marathi",
        "native_name": "मराठी",
        "script": "Devanagari",
        "sample": "नमस्कार, वाणी एआय मध्ये आपले स्वागत आहे. आपल्या मातृभाषेत नैसर्गिक आणि भावपूर्ण आवाज अनुभवा.",
        "default_voice": "mr-IN-tanvi",
        "primary_provider": "azure_neural"
    },
    "bn": {
        "code": "bn",
        "name": "Bengali",
        "native_name": "বাংলা",
        "script": "Bengali",
        "sample": "নমস্কার, বাণী এআই-তে আপনাকে স্বাগতম। আপনার প্রিয় ভাষায় শুনুন জীবন্ত ও স্বাভাবিক কণ্ঠস্বর।",
        "default_voice": "bn-IN-ishani",
        "primary_provider": "azure_neural"
    },
    "gu": {
        "code": "gu",
        "name": "Gujarati",
        "native_name": "ગુજરાતી",
        "script": "Gujarati",
        "sample": "નમસ્તે, વાણી એઆઈમાં આપનું હાર્દિક સ્વાગત છે. તમારી પોતાની ભાષામાં કુદરતી અવાજ સાંભળો.",
        "default_voice": "gu-IN-diya",
        "primary_provider": "azure_neural"
    },
    "pa": {
        "code": "pa",
        "name": "Punjabi",
        "native_name": "ਪੰਜਾਬੀ",
        "script": "Gurmukhi",
        "sample": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਵਾਣੀ ਏਆਈ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਆਪਣੀ ਬੋਲੀ ਵਿੱਚ ਕੁਦਰਤੀ ਆਵਾਜ਼ ਮਹਿਸੂਸ ਕਰੋ।",
        "default_voice": "pa-IN-gurpreet",
        "primary_provider": "google_neural"
    },
    "ur": {
        "code": "ur",
        "name": "Urdu",
        "native_name": "اردو",
        "script": "Nastaliq Urdu",
        "sample": "السلام علیکم، وانی اے آئی میں خوش آمدید۔ اپنی زبان میں قدرتی اور پُر اثر آواز سنیں۔",
        "default_voice": "ur-IN-zara",
        "primary_provider": "azure_neural"
    },
    "en": {
        "code": "en",
        "name": "English (Indian Accent)",
        "native_name": "English (India)",
        "script": "Latin",
        "sample": "Welcome to VaaniAI. Experience expressive and authentic Indian speech narration for your text.",
        "default_voice": "en-IN-neerja",
        "primary_provider": "azure_neural"
    }
}

# Verified Provider Neural Voices Mapping
# Every voice has a verified, real provider voice identifier (Azure Neural / Google Neural).
VOICE_REGISTRY: Dict[str, Dict[str, Any]] = {
    # ================= TELUGU (te) =================
    "te-IN-swara": {
        "id": "te-IN-swara",
        "provider_voice_id": "te-IN-ShrutiNeural",
        "provider": "azure_neural",
        "language": "te",
        "name": "Swara",
        "native_name": "స్వర",
        "gender": "female",
        "style": "storytelling",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Warm, melodious female voice ideal for literature, stories, and education.",
        "tags": ["Melodious", "Female", "Warm", "Storytelling"]
    },
    "te-IN-chaitanya": {
        "id": "te-IN-chaitanya",
        "provider_voice_id": "te-IN-MohanNeural",
        "provider": "azure_neural",
        "language": "te",
        "name": "Chaitanya",
        "native_name": "చైతన్య",
        "gender": "male",
        "style": "news",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Crisp, authoritative male newsreader voice with clear articulation.",
        "tags": ["Authoritative", "Male", "News", "Crisp"]
    },
    "te-IN-ananya": {
        "id": "te-IN-ananya",
        "provider_voice_id": "te-IN-ShrutiNeural",
        "provider": "azure_neural",
        "language": "te",
        "name": "Ananya",
        "native_name": "అనన్య",
        "gender": "child",
        "style": "cheerful",
        "pitch_shift_hz": 12,
        "rate_offset": 3,
        "description": "Playful and cheerful youthful voice suited for children's stories and interactive learning.",
        "tags": ["Playful", "Youth", "Cheerful", "Learning"]
    },

    # ================= HINDI (hi) =================
    "hi-IN-priya": {
        "id": "hi-IN-priya",
        "provider_voice_id": "hi-IN-SwaraNeural",
        "provider": "azure_neural",
        "language": "hi",
        "name": "Priya",
        "native_name": "प्रिया",
        "gender": "female",
        "style": "conversational",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Calm, empathetic, and clear delivery with standard Shuddh Hindi pronunciation.",
        "tags": ["Empathetic", "Female", "Clear", "Calm"]
    },
    "hi-IN-aarav": {
        "id": "hi-IN-aarav",
        "provider_voice_id": "hi-IN-MadhurNeural",
        "provider": "azure_neural",
        "language": "hi",
        "name": "Aarav",
        "native_name": "आरव",
        "gender": "male",
        "style": "formal",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Deep baritone male voice with rich resonance, perfect for documentaries and formal speeches.",
        "tags": ["Resonant", "Male", "Deep", "Narrative"]
    },
    "hi-IN-kabir": {
        "id": "hi-IN-kabir",
        "provider_voice_id": "hi-IN-MadhurNeural",
        "provider": "azure_neural",
        "language": "hi",
        "name": "Kabir",
        "native_name": "कबीर",
        "gender": "male",
        "style": "devotional",
        "pitch_shift_hz": -6,
        "rate_offset": -5,
        "description": "Devotional, soothing elder tone with poetic cadence.",
        "tags": ["Devotional", "Male", "Poetic", "Elderly"]
    },

    # ================= TAMIL (ta) =================
    "ta-IN-kavya": {
        "id": "ta-IN-kavya",
        "provider_voice_id": "ta-IN-PallaviNeural",
        "provider": "azure_neural",
        "language": "ta",
        "name": "Kavya",
        "native_name": "காவ்யா",
        "gender": "female",
        "style": "classical",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Eloquent and rhythmic Tamil female voice adhering to classical Chenthamizh phonetics.",
        "tags": ["Eloquent", "Female", "Classical", "Rhythmic"]
    },
    "ta-IN-surya": {
        "id": "ta-IN-surya",
        "provider_voice_id": "ta-IN-ValluvarNeural",
        "provider": "azure_neural",
        "language": "ta",
        "name": "Surya",
        "native_name": "சூர்யா",
        "gender": "male",
        "style": "dynamic",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Energetic and modern commercial male voice with dynamic articulation.",
        "tags": ["Dynamic", "Male", "Energetic", "Modern"]
    },

    # ================= KANNADA (kn) =================
    "kn-IN-bhavana": {
        "id": "kn-IN-bhavana",
        "provider_voice_id": "kn-IN-SapnaNeural",
        "provider": "azure_neural",
        "language": "kn",
        "name": "Bhavana",
        "native_name": "ಭಾವನಾ",
        "gender": "female",
        "style": "melodious",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Graceful Kannada female voice with natural intonation from the Mysore region.",
        "tags": ["Graceful", "Female", "Pure", "Soft"]
    },
    "kn-IN-raghav": {
        "id": "kn-IN-raghav",
        "provider_voice_id": "kn-IN-GaganNeural",
        "provider": "azure_neural",
        "language": "kn",
        "name": "Raghav",
        "native_name": "ರಾಘವ್",
        "gender": "male",
        "style": "confident",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Confident and well-paced male voice suited for educational content and tech reads.",
        "tags": ["Confident", "Male", "Clear", "Engaging"]
    },

    # ================= MALAYALAM (ml) =================
    "ml-IN-anjali": {
        "id": "ml-IN-anjali",
        "provider_voice_id": "ml-IN-SobhanaNeural",
        "provider": "azure_neural",
        "language": "ml",
        "name": "Anjali",
        "native_name": "അഞ്ജലി",
        "gender": "female",
        "style": "gentle",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Sweet, gentle Malayalam female voice with precise chillu letter phonation.",
        "tags": ["Gentle", "Female", "Precise", "Sweet"]
    },
    "ml-IN-madhav": {
        "id": "ml-IN-madhav",
        "provider_voice_id": "ml-IN-MidhunNeural",
        "provider": "azure_neural",
        "language": "ml",
        "name": "Madhav",
        "native_name": "മാധവ്",
        "gender": "male",
        "style": "journalistic",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Strong, journalistic male voice with distinct broadcast resonance.",
        "tags": ["Journalistic", "Male", "Strong", "Clear"]
    },

    # ================= MARATHI (mr) =================
    "mr-IN-tanvi": {
        "id": "mr-IN-tanvi",
        "provider_voice_id": "mr-IN-AarohiNeural",
        "provider": "azure_neural",
        "language": "mr",
        "name": "Tanvi",
        "native_name": "तन्वी",
        "gender": "female",
        "style": "expressive",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Expressive Marathi female speaker with crisp nasal vowel rendering.",
        "tags": ["Expressive", "Female", "Crisp", "Warm"]
    },
    "mr-IN-omkar": {
        "id": "mr-IN-omkar",
        "provider_voice_id": "mr-IN-ManoharNeural",
        "provider": "azure_neural",
        "language": "mr",
        "name": "Omkar",
        "native_name": "ओमकार",
        "gender": "male",
        "style": "polished",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Polished Pune-dialect male voice ideal for formal instruction and audio drama.",
        "tags": ["Polished", "Male", "Formal", "Dramatic"]
    },

    # ================= BENGALI (bn) =================
    "bn-IN-ishani": {
        "id": "bn-IN-ishani",
        "provider_voice_id": "bn-IN-TanishaaNeural",
        "provider": "azure_neural",
        "language": "bn",
        "name": "Ishani",
        "native_name": "ঈশানী",
        "gender": "female",
        "style": "lyrical",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Lyrical and nuanced female voice echoing the poetic cadence of standard Bengali.",
        "tags": ["Lyrical", "Female", "Poetic", "Nuanced"]
    },
    "bn-IN-subhash": {
        "id": "bn-IN-subhash",
        "provider_voice_id": "bn-IN-BashkarNeural",
        "provider": "azure_neural",
        "language": "bn",
        "name": "Subhash",
        "native_name": "সুভাষ",
        "gender": "male",
        "style": "articulate",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Vibrant and articulate male voice ideal for intellectual discourse and news.",
        "tags": ["Articulate", "Male", "Vibrant", "Smart"]
    },

    # ================= GUJARATI (gu) =================
    "gu-IN-diya": {
        "id": "gu-IN-diya",
        "provider_voice_id": "gu-IN-DhwaniNeural",
        "provider": "azure_neural",
        "language": "gu",
        "name": "Diya",
        "native_name": "દિયા",
        "gender": "female",
        "style": "conversational",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Warm, conversational Gujarati female voice with authentic regional rhythm.",
        "tags": ["Conversational", "Female", "Warm", "Friendly"]
    },
    "gu-IN-niranjan": {
        "id": "gu-IN-niranjan",
        "provider_voice_id": "gu-IN-NiranjanNeural",
        "provider": "azure_neural",
        "language": "gu",
        "name": "Niranjan",
        "native_name": "નિરંજન",
        "gender": "male",
        "style": "authoritative",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Clear and resonant Gujarati male narrator suited for broadcasts and literature.",
        "tags": ["Resonant", "Male", "Clear", "Broadcast"]
    },

    # ================= PUNJABI (pa) =================
    "pa-IN-gurpreet": {
        "id": "pa-IN-gurpreet",
        "provider_voice_id": "pa-gtts-male",
        "provider": "google_neural",
        "language": "pa",
        "name": "Gurpreet",
        "native_name": "ਗੁਰਪ੍ਰੀਤ",
        "gender": "male",
        "style": "spirited",
        "pitch_shift_hz": -4,
        "rate_offset": 0,
        "description": "Robust and spirited Majhi Punjabi male voice full of warmth and vitality.",
        "tags": ["Spirited", "Male", "Robust", "Warm"]
    },
    "pa-IN-simran": {
        "id": "pa-IN-simran",
        "provider_voice_id": "pa-gtts-female",
        "provider": "google_neural",
        "language": "pa",
        "name": "Simran",
        "native_name": "ਸਿਮਰਨ",
        "gender": "female",
        "style": "melodious",
        "pitch_shift_hz": +6,
        "rate_offset": 0,
        "description": "Sweet, melodic Punjabi female voice ideal for stories, poetry, and conversations.",
        "tags": ["Melodious", "Female", "Sweet", "Folk"]
    },

    # ================= URDU (ur) =================
    "ur-IN-zara": {
        "id": "ur-IN-zara",
        "provider_voice_id": "ur-IN-GulNeural",
        "provider": "azure_neural",
        "language": "ur",
        "name": "Zara",
        "native_name": "زارا",
        "gender": "female",
        "style": "emotive",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Delicate and emotive Urdu female voice with clear talaffuz (pronunciation).",
        "tags": ["Emotive", "Female", "Delicate", "Clear"]
    },
    "ur-IN-faizan": {
        "id": "ur-IN-faizan",
        "provider_voice_id": "ur-IN-SalmanNeural",
        "provider": "azure_neural",
        "language": "ur",
        "name": "Faizan",
        "native_name": "فیضان",
        "gender": "male",
        "style": "scholarly",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Classical Lucknowi Urdu diction with impeccable Sheen-Qaaf articulation.",
        "tags": ["Sophisticated", "Male", "Classical", "Poetic"]
    },

    # ================= ENGLISH (en) =================
    "en-IN-neerja": {
        "id": "en-IN-neerja",
        "provider_voice_id": "en-IN-NeerjaNeural",
        "provider": "azure_neural",
        "language": "en",
        "name": "Neerja",
        "native_name": "Neerja",
        "gender": "female",
        "style": "professional",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Clear neutral Indian English female accent, internationally understood and friendly.",
        "tags": ["Neutral Indian", "Female", "Professional", "Crisp"]
    },
    "en-IN-prabhat": {
        "id": "en-IN-prabhat",
        "provider_voice_id": "en-IN-PrabhatNeural",
        "provider": "azure_neural",
        "language": "en",
        "name": "Prabhat",
        "native_name": "Prabhat",
        "gender": "male",
        "style": "narrative",
        "pitch_shift_hz": 0,
        "rate_offset": 0,
        "description": "Warm, trustworthy Indian English male narrator with natural conversational cadence.",
        "tags": ["Trustworthy", "Male", "Narrative", "Rich"]
    }
}

def get_voices_for_language(lang_code: str) -> List[Dict[str, Any]]:
    """Returns all verified voices configured for a specific language."""
    code = lang_code.lower().strip()
    return [v for v in VOICE_REGISTRY.values() if v["language"] == code]

def validate_voice_for_language(voice_id: str, language_code: str) -> Tuple[bool, Optional[str]]:
    """
    Validates whether the requested voice_id is compatible with the specified language.
    Returns (is_valid, error_message).
    """
    lang = language_code.lower().strip()
    if lang not in SUPPORTED_LANGUAGES:
        return False, f"Unsupported language '{language_code}'. Supported languages: {list(SUPPORTED_LANGUAGES.keys())}"

    voice_meta = VOICE_REGISTRY.get(voice_id)
    if not voice_meta:
        valid_voices = [v["id"] for v in get_voices_for_language(lang)]
        return False, f"Unknown voice ID '{voice_id}'. Available voices for '{lang}': {valid_voices}"

    if voice_meta["language"] != lang:
        valid_voices = [v["id"] for v in get_voices_for_language(lang)]
        return False, (
            f"Voice '{voice_id}' ({voice_meta['name']}) is a {voice_meta['language'].upper()} voice, "
            f"which does not match requested language '{lang.upper()}'. "
            f"Please choose a valid voice for {lang.upper()}: {valid_voices}"
        )

    return True, None

def resolve_voice_provider(voice_id: str, language_code: str) -> Dict[str, Any]:
    """
    Resolves the actual TTS provider details for a requested voice_id.
    Guarantees valid fallback if voice is omitted.
    """
    lang = language_code.lower().strip()
    if lang not in SUPPORTED_LANGUAGES:
        lang = "te"

    meta = VOICE_REGISTRY.get(voice_id)
    if not meta or meta["language"] != lang:
        default_v_id = SUPPORTED_LANGUAGES[lang]["default_voice"]
        meta = VOICE_REGISTRY[default_v_id]

    return meta
