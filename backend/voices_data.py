"""
VaaniAI Voice Catalog
Comprehensive dataset of high-quality neural voices across 12 Indian regional languages.
"""

from typing import List, Dict, Any

LANGUAGES = [
    {
        "code": "te",
        "name": "Telugu",
        "native_name": "తెలుగు",
        "script": "Telugu",
        "direction": "ltr",
        "sample": "నమస్కారం, వాణి ఏఐకి స్వాగతం. మీ మాటలు మీ సొంత భాషలో సహజంగా వినిపించండి.",
        "font_family": "'Noto Sans Telugu', sans-serif"
    },
    {
        "code": "hi",
        "name": "Hindi",
        "native_name": "हिन्दी",
        "script": "Devanagari",
        "direction": "ltr",
        "sample": "नमस्ते, वाणी एआई में आपका स्वागत है। अपनी मातृभाषा में स्वाभाविक और स्पष्ट स्वर का अनुभव करें।",
        "font_family": "'Noto Sans Devanagari', sans-serif"
    },
    {
        "code": "ta",
        "name": "Tamil",
        "native_name": "தமிழ்",
        "script": "Tamil",
        "direction": "ltr",
        "sample": "வணக்கம், வாணி ஏஐ-க்கு வரவேற்கிறோம். உங்கள் சொந்த மொழியில் இயற்கையான குரலை அனுபவியுங்கள்.",
        "font_family": "'Noto Sans Tamil', sans-serif"
    },
    {
        "code": "kn",
        "name": "Kannada",
        "native_name": "ಕನ್ನಡ",
        "script": "Kannada",
        "direction": "ltr",
        "sample": "ನಮಸ್ಕಾರ, ವಾಣಿ ಎಐಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಸ್ವಾಭಾವಿಕ ಧ್ವನಿಯನ್ನು ಆಲಿಸಿ.",
        "font_family": "'Noto Sans Kannada', sans-serif"
    },
    {
        "code": "ml",
        "name": "Malayalam",
        "native_name": "മലയാളം",
        "script": "Malayalam",
        "direction": "ltr",
        "sample": "നമസ്കാരം, വാണി എഐയിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ സ്വന്തം ഭാഷയിൽ മനോഹരമായ ശബ്ദം ആസ്വദിക്കൂ.",
        "font_family": "'Noto Sans Malayalam', sans-serif"
    },
    {
        "code": "mr",
        "name": "Marathi",
        "native_name": "मराठी",
        "script": "Devanagari",
        "direction": "ltr",
        "sample": "नमस्कार, वाणी एआय मध्ये आपले स्वागत आहे. आपल्या मातृभाषेत नैसर्गिक आणि भावपूर्ण आवाज अनुभवा.",
        "font_family": "'Noto Sans Devanagari', sans-serif"
    },
    {
        "code": "bn",
        "name": "Bengali",
        "native_name": "বাংলা",
        "script": "Bengali",
        "direction": "ltr",
        "sample": "নমস্কার, বাণী এআই-তে আপনাকে স্বাগতম। আপনার প্রিয় ভাষায় শুনুন জীবন্ত ও স্বাভাবিক কণ্ঠস্বর।",
        "font_family": "'Noto Sans Bengali', sans-serif"
    },
    {
        "code": "gu",
        "name": "Gujarati",
        "native_name": "ગુજરાતી",
        "script": "Gujarati",
        "direction": "ltr",
        "sample": "નમસ્તે, વાણી એઆઈમાં આપનું હાર્દિક સ્વાગત છે. તમારી પોતાની ભાષામાં કુદરતી અવાજ સાંભળો.",
        "font_family": "'Noto Sans Gujarati', sans-serif"
    },
    {
        "code": "pa",
        "name": "Punjabi",
        "native_name": "ਪੰਜਾਬੀ",
        "script": "Gurmukhi",
        "direction": "ltr",
        "sample": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਵਾਣੀ ਏਆਈ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਆਪਣੀ ਬੋਲੀ ਵਿੱਚ ਕੁਦਰਤੀ ਆਵਾਜ਼ ਮਹਿਸੂਸ ਕਰੋ।",
        "font_family": "'Noto Sans Gurmukhi', sans-serif"
    },
    {
        "code": "or",
        "name": "Odia",
        "native_name": "ଓଡ଼ିଆ",
        "script": "Odia",
        "direction": "ltr",
        "sample": "ନମସ୍କାର, ବାଣୀ ଏଆଇକୁ ସ୍ଵାଗତ। ନିଜ ଆଞ୍ଚଳିକ ଭାଷାରେ ପ୍ରାକୃତିକ ସ୍ୱରର ଆନନ୍ଦ ନିଅନ୍ତୁ।",
        "font_family": "'Noto Sans Oriya', sans-serif"
    },
    {
        "code": "ur",
        "name": "Urdu",
        "native_name": "اردو",
        "script": "Nastaliq Urdu",
        "direction": "rtl",
        "sample": "السلام علیکم، وانی اے آئی میں خوش آمدید۔ اپنی زبان میں قدرتی اور پُر اثر آواز سنیں۔",
        "font_family": "'Noto Nastaliq Urdu', serif"
    },
    {
        "code": "en",
        "name": "English (Indian Accent)",
        "native_name": "English (India)",
        "script": "Latin",
        "direction": "ltr",
        "sample": "Welcome to VaaniAI. Experience expressive and authentic Indian speech narration for your text.",
        "font_family": "'Inter', sans-serif"
    }
]

VOICES: List[Dict[str, Any]] = [
    # Telugu
    {
        "id": "te-IN-swara",
        "name": "Swara",
        "native_name": "స్వర",
        "language": "te",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Warm, melodious storytelling voice ideal for audiobooks and education.",
        "tags": ["Melodious", "Warm", "Storytelling"],
        "recommended_for": ["audiobooks", "education", "literature"]
    },
    {
        "id": "te-IN-chaitanya",
        "name": "Chaitanya",
        "native_name": "చైతన్య",
        "language": "te",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Crisp, authoritative newsreader voice with clear articulation.",
        "tags": ["Authoritative", "News", "Crisp"],
        "recommended_for": ["news", "podcasts", "technical"]
    },
    {
        "id": "te-IN-ananya",
        "name": "Ananya",
        "native_name": "అనన్య",
        "language": "te",
        "gender": "child",
        "age_bracket": "Youth",
        "description": "Playful and cheerful voice suited for children's stories and interactive learning.",
        "tags": ["Playful", "Cheerful", "Learning"],
        "recommended_for": ["kids", "games", "learning"]
    },

    # Hindi
    {
        "id": "hi-IN-aarav",
        "name": "Aarav",
        "native_name": "आरव",
        "language": "hi",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Deep baritone voice with rich resonance, perfect for documentaries and formal speeches.",
        "tags": ["Resonant", "Deep", "Narrative"],
        "recommended_for": ["documentaries", "corporate", "lectures"]
    },
    {
        "id": "hi-IN-priya",
        "name": "Priya",
        "native_name": "प्रिया",
        "language": "hi",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Calm, empathetic, and clear delivery with standard Shuddh Hindi pronunciation.",
        "tags": ["Empathetic", "Clear", "Calm"],
        "recommended_for": ["assistants", "meditation", "educational"]
    },
    {
        "id": "hi-IN-kabir",
        "name": "Kabir",
        "native_name": "कबीर",
        "language": "hi",
        "gender": "male",
        "age_bracket": "Elderly",
        "description": "Devotional, soothing elder tone with poetic cadence.",
        "tags": ["Devotional", "Poetic", "Elderly"],
        "recommended_for": ["spiritual", "poetry", "cultural"]
    },

    # Tamil
    {
        "id": "ta-IN-kavya",
        "name": "Kavya",
        "native_name": "காவ்யா",
        "language": "ta",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Eloquent and rhythmic Tamil voice adhering to classical Chenthamizh phonetics.",
        "tags": ["Eloquent", "Classical", "Rhythmic"],
        "recommended_for": ["literature", "narration", "broadcast"]
    },
    {
        "id": "ta-IN-surya",
        "name": "Surya",
        "native_name": "சூர்யா",
        "language": "ta",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Energetic and modern commercial voice with dynamic pitch range.",
        "tags": ["Dynamic", "Energetic", "Modern"],
        "recommended_for": ["advertisements", "tutorials", "social"]
    },

    # Kannada
    {
        "id": "kn-IN-bhavana",
        "name": "Bhavana",
        "native_name": "ಭಾವನಾ",
        "language": "kn",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Graceful Kannada voice with natural intonation from the Mysore region.",
        "tags": ["Graceful", "Pure", "Soft"],
        "recommended_for": ["stories", "customer-service", "guidance"]
    },
    {
        "id": "kn-IN-raghav",
        "name": "Raghav",
        "native_name": "ರಾಘವ್",
        "language": "kn",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Confident and well-paced voice suited for educational content and tech reads.",
        "tags": ["Confident", "Clear", "Engaging"],
        "recommended_for": ["education", "tech", "presentations"]
    },

    # Malayalam
    {
        "id": "ml-IN-anjali",
        "name": "Anjali",
        "native_name": "അഞ്ജലി",
        "language": "ml",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Sweet, gentle Malayalam voice with precise chillu letter phonation.",
        "tags": ["Gentle", "Precise", "Sweet"],
        "recommended_for": ["poetry", "audiobooks", "healthcare"]
    },
    {
        "id": "ml-IN-madhav",
        "name": "Madhav",
        "native_name": "മാധവ്",
        "language": "ml",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Strong, journalistic voice with distinct broadcast resonance.",
        "tags": ["Journalistic", "Strong", "Clear"],
        "recommended_for": ["news", "history", "podcasts"]
    },

    # Marathi
    {
        "id": "mr-IN-tanvi",
        "name": "Tanvi",
        "native_name": "तन्वी",
        "language": "mr",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Expressive Marathi speaker with crisp nasal vowel rendering.",
        "tags": ["Expressive", "Crisp", "Warm"],
        "recommended_for": ["dialogues", "podcasts", "audio-tours"]
    },
    {
        "id": "mr-IN-omkar",
        "name": "Omkar",
        "native_name": "ओमकार",
        "language": "mr",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Polished Pune-dialect voice ideal for formal instruction and audio drama.",
        "tags": ["Polished", "Formal", "Dramatic"],
        "recommended_for": ["corporate", "theatre", "literature"]
    },

    # Bengali
    {
        "id": "bn-IN-ishani",
        "name": "Ishani",
        "native_name": "ঈশানী",
        "language": "bn",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Lyrical and nuanced voice echoing the poetic beauty of Rabindra-style Bengali.",
        "tags": ["Lyrical", "Poetic", "Nuanced"],
        "recommended_for": ["poetry", "stories", "creative"]
    },
    {
        "id": "bn-IN-subhash",
        "name": "Subhash",
        "native_name": "সুভাষ",
        "language": "bn",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Vibrant and articulate voice ideal for intellectual discourse and news.",
        "tags": ["Articulate", "Vibrant", "Smart"],
        "recommended_for": ["news", "education", "interviews"]
    },

    # Gujarati
    {
        "id": "gu-IN-diya",
        "name": "Diya",
        "native_name": "દિયા",
        "language": "gu",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Warm, conversational Gujarati voice with authentic regional rhythm.",
        "tags": ["Conversational", "Warm", "Friendly"],
        "recommended_for": ["business", "podcasts", "audiobooks"]
    },
    {
        "id": "gu-IN-niranjan",
        "name": "Niranjan",
        "native_name": "નિરંજન",
        "language": "gu",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Clear and resonant Gujarati male narrator suited for broadcasts and literature.",
        "tags": ["Resonant", "Clear", "Broadcast"],
        "recommended_for": ["news", "literature", "documentaries"]
    },

    # Punjabi
    {
        "id": "pa-IN-gurpreet",
        "name": "Gurpreet",
        "native_name": "ਗੁਰਪ੍ਰੀਤ",
        "language": "pa",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Robust and spirited Majhi Punjabi voice full of warmth and vitality.",
        "tags": ["Spirited", "Robust", "Warm"],
        "recommended_for": ["folk-tales", "broadcast", "motivation"]
    },
    {
        "id": "pa-IN-simran",
        "name": "Simran",
        "native_name": "ਸਿਮਰਨ",
        "language": "pa",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Sweet, melodic Punjabi female voice ideal for stories, poetry, and conversations.",
        "tags": ["Melodious", "Sweet", "Folk"],
        "recommended_for": ["stories", "poetry", "conversation"]
    },

    # Odia
    {
        "id": "or-IN-subhadra",
        "name": "Subhadra",
        "native_name": "ସୁଭଦ୍ରା",
        "language": "or",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Melodious Utkali voice with natural retroflex phonetics.",
        "tags": ["Melodious", "Native", "Authentic"],
        "recommended_for": ["folklore", "learning", "audio-magazines"]
    },

    # Urdu
    {
        "id": "ur-IN-faizan",
        "name": "Faizan",
        "native_name": "فیضان",
        "language": "ur",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Classical Lucknowi Urdu diction with impeccable Sheen-Qaaf articulation.",
        "tags": ["Sophisticated", "Classical", "Poetic"],
        "recommended_for": ["ghazals", "history", "narration"]
    },
    {
        "id": "ur-IN-zara",
        "name": "Zara",
        "native_name": "زارا",
        "language": "ur",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Delicate and emotive Urdu voice with clear talaffuz (pronunciation).",
        "tags": ["Emotive", "Delicate", "Clear"],
        "recommended_for": ["audiobooks", "dramas", "dialogue"]
    },

    # English (Indian Accent)
    {
        "id": "en-IN-neerja",
        "name": "Neerja",
        "native_name": "Neerja",
        "language": "en",
        "gender": "female",
        "age_bracket": "Adult",
        "description": "Clear neutral Indian English accent, internationally understood and friendly.",
        "tags": ["Neutral Indian", "Professional", "Crisp"],
        "recommended_for": ["corporate", "elearning", "support"]
    },
    {
        "id": "en-IN-prabhat",
        "name": "Prabhat",
        "native_name": "Prabhat",
        "language": "en",
        "gender": "male",
        "age_bracket": "Adult",
        "description": "Warm, trustworthy Indian English narrator with natural cadence.",
        "tags": ["Trustworthy", "Narrative", "Rich"],
        "recommended_for": ["documentaries", "explainer", "podcasts"]
    }
]

def get_languages() -> List[Dict[str, Any]]:
    return LANGUAGES

def get_voices(language_code: str = None) -> List[Dict[str, Any]]:
    if not language_code:
        return VOICES
    return [v for v in VOICES if v["language"] == language_code]

def find_voice(voice_id: str) -> Dict[str, Any]:
    for v in VOICES:
        if v["id"] == voice_id:
            return v
    return VOICES[0]
