export interface Language {
  code: string;
  name: string;
  native_name: string;
  script: string;
  direction: "ltr" | "rtl";
  speakers: string;
  region: string;
  sample: string;
  phonetics_sample: string;
  font_family: string;
  color_gradient: string;
  glyph: string;
  listen_label: string;
  state_flag_color: string;
}

export interface Voice {
  id: string;
  name: string;
  native_name: string;
  language: string;
  gender: "male" | "female" | "child";
  age_bracket: string;
  description: string;
  tags: string[];
  recommended_for: string[];
  mos_score: number;
  avatar_emoji: string;
  avatar_bg: string;
  friendly_role: string;
}

export const LANGUAGES: Language[] = [
  {
    code: "te",
    name: "Telugu",
    native_name: "తెలుగు",
    script: "Telugu",
    direction: "ltr",
    speakers: "96 Million",
    region: "Andhra Pradesh, Telangana",
    sample: "నమస్కారం! వాణి ఏఐకి స్వాగతం. మీ మాటలు మీ సొంత భాషలో సహజంగా, భావోద్వేగంతో వినిపించండి.",
    phonetics_sample: "నమస్కారం! వాణి ఏఐకి స్వాగతం.",
    font_family: "'Noto Sans Telugu', sans-serif",
    color_gradient: "from-amber-500 via-orange-500 to-red-600",
    glyph: "తె",
    listen_label: "వినండి (Listen)",
    state_flag_color: "bg-amber-500 text-white"
  },
  {
    code: "hi",
    name: "Hindi",
    native_name: "हिन्दी",
    script: "Devanagari",
    direction: "ltr",
    speakers: "600 Million",
    region: "Northern & Central India",
    sample: "नमस्ते! वाणी एआई में आपका स्वागत है। अपनी मातृभाषा में स्वाभाविक, स्पष्ट और जीवंत स्वर का अनुभव करें।",
    phonetics_sample: "नमस्ते! वाणी एआई में आपका स्वागत है।",
    font_family: "'Noto Sans Devanagari', sans-serif",
    color_gradient: "from-indigo-600 via-purple-600 to-pink-600",
    glyph: "ह",
    listen_label: "सुनिए (Listen)",
    state_flag_color: "bg-indigo-600 text-white"
  },
  {
    code: "ta",
    name: "Tamil",
    native_name: "தமிழ்",
    script: "Tamil",
    direction: "ltr",
    speakers: "88 Million",
    region: "Tamil Nadu, Puducherry",
    sample: "வணக்கம்! வாணி ஏஐ-க்கு வரவேற்கிறோம். உங்கள் சொந்த மொழியில் இயற்கையான மற்றும் உயிரோட்டமான குரலை அனுபவியுங்கள்.",
    phonetics_sample: "வணக்கம்! வாணி ஏஐ-க்கு வரவேற்கிறோம்.",
    font_family: "'Noto Sans Tamil', sans-serif",
    color_gradient: "from-rose-500 via-red-600 to-amber-600",
    glyph: "த",
    listen_label: "கேளுங்கள் (Listen)",
    state_flag_color: "bg-rose-600 text-white"
  },
  {
    code: "kn",
    name: "Kannada",
    native_name: "ಕನ್ನಡ",
    script: "Kannada",
    direction: "ltr",
    speakers: "44 Million",
    region: "Karnataka",
    sample: "ನಮಸ್ಕಾರ! ವಾಣಿ ಎಐಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಸ್ವಾಭಾವಿಕ ಮತ್ತು ಸ್ಪಷ್ಟವಾದ ಧ್ವನಿಯನ್ನು ಆಲಿಸಿ.",
    phonetics_sample: "ನಮಸ್ಕಾರ! ವಾಣಿ ಎಐಗೆ ಸುಸ್ವಾಗತ.",
    font_family: "'Noto Sans Kannada', sans-serif",
    color_gradient: "from-yellow-500 via-amber-600 to-red-600",
    glyph: "ಕ",
    listen_label: "ಆಲಿಸಿ (Listen)",
    state_flag_color: "bg-yellow-500 text-black"
  },
  {
    code: "ml",
    name: "Malayalam",
    native_name: "മലയാളം",
    script: "Malayalam",
    direction: "ltr",
    speakers: "38 Million",
    region: "Kerala, Lakshadweep",
    sample: "നമസ്കാരം! വാണി എഐയിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ സ്വന്തം ഭാഷയിൽ മനോഹരമായ, സ്വാഭാവിക ശബ്ദം ആസ്വദിക്കൂ.",
    phonetics_sample: "നമസ്കാരം! വാണി എഐയിലേക്ക് സ്വാഗതം.",
    font_family: "'Noto Sans Malayalam', sans-serif",
    color_gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    glyph: "മ",
    listen_label: "കേൾക്കൂ (Listen)",
    state_flag_color: "bg-emerald-600 text-white"
  },
  {
    code: "mr",
    name: "Marathi",
    native_name: "मराठी",
    script: "Devanagari",
    direction: "ltr",
    speakers: "83 Million",
    region: "Maharashtra, Goa",
    sample: "नमस्कार! वाणी एआय मध्ये आपले स्वागत आहे. आपल्या मातृभाषेत नैसर्गिक आणि भावपूर्ण आवाज अनुभवा.",
    phonetics_sample: "नमस्कार! वाणी एआय मध्ये आपले स्वागत आहे.",
    font_family: "'Noto Sans Devanagari', sans-serif",
    color_gradient: "from-orange-500 via-amber-600 to-indigo-700",
    glyph: "म",
    listen_label: "ऐका (Listen)",
    state_flag_color: "bg-orange-600 text-white"
  },
  {
    code: "bn",
    name: "Bengali",
    native_name: "বাংলা",
    script: "Bengali",
    direction: "ltr",
    speakers: "270 Million",
    region: "West Bengal, Tripura",
    sample: "নমস্কার! বাণী এআই-তে আপনাকে স্বাগতম। আপনার প্রিয় ভাষায় শুনুন জীবন্ত ও স্বাভাবিক কণ্ঠস্বর।",
    phonetics_sample: "নমস্কার! বাণী এআই-তে আপনাকে স্বাগতম।",
    font_family: "'Noto Sans Bengali', sans-serif",
    color_gradient: "from-teal-500 via-cyan-600 to-blue-700",
    glyph: "বা",
    listen_label: "শুনুন (Listen)",
    state_flag_color: "bg-teal-600 text-white"
  },
  {
    code: "gu",
    name: "Gujarati",
    native_name: "ગુજરાતી",
    script: "Gujarati",
    direction: "ltr",
    speakers: "56 Million",
    region: "Gujarat",
    sample: "નમસ્તે! વાણી એઆઈમાં આપનું હાર્દિક સ્વાગત છે. તમારી પોતાની ભાષામાં કુદરતી અવાજ સાંભળો.",
    phonetics_sample: "નમસ્તે! વાણી એઆઈમાં આપનું હાર્દિક સ્વાગત છે.",
    font_family: "'Noto Sans Gujarati', sans-serif",
    color_gradient: "from-blue-500 via-indigo-600 to-violet-700",
    glyph: "ગુ",
    listen_label: "સાંભળો (Listen)",
    state_flag_color: "bg-blue-600 text-white"
  },
  {
    code: "pa",
    name: "Punjabi",
    native_name: "ਪੰਜਾਬੀ",
    script: "Gurmukhi",
    direction: "ltr",
    speakers: "33 Million",
    region: "Punjab",
    sample: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਵਾਣੀ ਏਆਈ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਆਪਣੀ ਬੋਲੀ ਵਿੱਚ ਕੁਦਰਤੀ ਆਵਾਜ਼ ਮਹਿਸੂਸ ਕਰੋ।",
    phonetics_sample: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਵਾਣੀ ਏਆਈ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।",
    font_family: "'Noto Sans Gurmukhi', sans-serif",
    color_gradient: "from-amber-400 via-yellow-500 to-orange-600",
    glyph: "ਪੰ",
    listen_label: "ਸੁਣੋ (Listen)",
    state_flag_color: "bg-yellow-600 text-white"
  },
  {
    code: "or",
    name: "Odia",
    native_name: "ଓଡ଼ିଆ",
    script: "Odia",
    direction: "ltr",
    speakers: "35 Million",
    region: "Odisha",
    sample: "ନମସ୍କାର! ବାଣୀ ଏଆଇକୁ ସ୍ଵାଗତ। ନିଜ ଆଞ୍ଚଳିକ ଭାଷାରେ ପ୍ରାକୃତିକ ସ୍ୱରର ଆନନ୍ଦ ନିଅନ୍ତୁ।",
    phonetics_sample: "ନମସ୍କାର! ବାଣୀ ଏଆଇକୁ ସ୍ଵାଗତ।",
    font_family: "'Noto Sans Oriya', sans-serif",
    color_gradient: "from-purple-500 via-pink-600 to-rose-700",
    glyph: "ଓ",
    listen_label: "ଶୁଣନ୍ତୁ (Listen)",
    state_flag_color: "bg-purple-600 text-white"
  },
  {
    code: "ur",
    name: "Urdu",
    native_name: "اردو",
    script: "Nastaliq Urdu",
    direction: "rtl",
    speakers: "70 Million",
    region: "Telangana, UP, Bihar, J&K",
    sample: "السلام علیکم! وانی اے آئی میں خوش آمدید۔ اپنی زبان میں قدرتی اور پُر اثر آواز سنیں۔",
    phonetics_sample: "السلام علیکم! وانی اے آئی میں خوش آمدید۔",
    font_family: "'Noto Nastaliq Urdu', serif",
    color_gradient: "from-emerald-600 via-teal-700 to-slate-800",
    glyph: "اردو",
    listen_label: "سنئے (Listen)",
    state_flag_color: "bg-emerald-700 text-white"
  },
  {
    code: "en",
    name: "English (Indian Accent)",
    native_name: "English (India)",
    script: "Latin",
    direction: "ltr",
    speakers: "130 Million",
    region: "Pan-India",
    sample: "Welcome to VaaniAI! Experience expressive and authentic Indian speech narration for regional content.",
    phonetics_sample: "Welcome to VaaniAI speech narration.",
    font_family: "'Plus Jakarta Sans', sans-serif",
    color_gradient: "from-indigo-600 via-blue-600 to-cyan-600",
    glyph: "En",
    listen_label: "Listen",
    state_flag_color: "bg-indigo-600 text-white"
  }
];

export const VOICES: Voice[] = [
  // Telugu
  {
    id: "te-IN-swara",
    name: "Swara",
    native_name: "స్వర",
    language: "te",
    gender: "female",
    age_bracket: "Adult (26-35)",
    description: "Warm, melodious storytelling voice ideal for audiobooks and education.",
    tags: ["Melodious", "Warm", "Storytelling"],
    recommended_for: ["audiobooks", "education", "literature"],
    mos_score: 4.82,
    avatar_emoji: "👩‍🏫",
    avatar_bg: "from-pink-500 to-rose-600",
    friendly_role: "కథలు & చదువు (Story & Learning)"
  },
  {
    id: "te-IN-chaitanya",
    name: "Chaitanya",
    native_name: "చైతన్య",
    language: "te",
    gender: "male",
    age_bracket: "Adult (30-45)",
    description: "Crisp, authoritative newsreader voice with clear articulation.",
    tags: ["Authoritative", "News", "Crisp"],
    recommended_for: ["news", "podcasts", "technical"],
    mos_score: 4.79,
    avatar_emoji: "👨‍💼",
    avatar_bg: "from-blue-600 to-indigo-700",
    friendly_role: "వార్తలు & సమాచారం (News & Clear Speech)"
  },
  {
    id: "te-IN-ananya",
    name: "Ananya",
    native_name: "అనన్య",
    language: "te",
    gender: "child",
    age_bracket: "Youth (10-14)",
    description: "Playful and cheerful voice suited for children's stories and interactive learning.",
    tags: ["Playful", "Cheerful", "Learning"],
    recommended_for: ["kids", "games", "learning"],
    mos_score: 4.65,
    avatar_emoji: "👧",
    avatar_bg: "from-amber-400 to-orange-500",
    friendly_role: "పిల్లల కథలు (Kids Voice)"
  },

  // Hindi
  {
    id: "hi-IN-aarav",
    name: "Aarav",
    native_name: "आरव",
    language: "hi",
    gender: "male",
    age_bracket: "Adult (30-40)",
    description: "Deep baritone voice with rich resonance, perfect for documentaries and formal speeches.",
    tags: ["Resonant", "Deep", "Narrative"],
    recommended_for: ["documentaries", "corporate", "lectures"],
    mos_score: 4.88,
    avatar_emoji: "👨‍🏫",
    avatar_bg: "from-indigo-600 to-violet-800",
    friendly_role: "गंभीर व स्पष्ट (Deep & Clear)"
  },
  {
    id: "hi-IN-priya",
    name: "Priya",
    native_name: "प्रिया",
    language: "hi",
    gender: "female",
    age_bracket: "Adult (24-32)",
    description: "Calm, empathetic, and clear delivery with standard Shuddh Hindi pronunciation.",
    tags: ["Empathetic", "Clear", "Calm"],
    recommended_for: ["assistants", "meditation", "educational"],
    mos_score: 4.85,
    avatar_emoji: "👩‍💼",
    avatar_bg: "from-emerald-500 to-teal-700",
    friendly_role: "मधुर व शांत (Sweet & Calm)"
  },
  {
    id: "hi-IN-kabir",
    name: "Kabir",
    native_name: "कबीर",
    language: "hi",
    gender: "male",
    age_bracket: "Senior (55+)",
    description: "Devotional, soothing elder tone with poetic cadence.",
    tags: ["Devotional", "Poetic", "Elderly"],
    recommended_for: ["spiritual", "poetry", "cultural"],
    mos_score: 4.76,
    avatar_emoji: "👴",
    avatar_bg: "from-amber-600 to-orange-800",
    friendly_role: "बुजुर्ग व भक्ति भाव (Elder & Devotional)"
  },

  // Tamil
  {
    id: "ta-IN-kavya",
    name: "Kavya",
    native_name: "காவ்யா",
    language: "ta",
    gender: "female",
    age_bracket: "Adult (25-35)",
    description: "Eloquent and rhythmic Tamil voice adhering to classical Chenthamizh phonetics.",
    tags: ["Eloquent", "Classical", "Rhythmic"],
    recommended_for: ["literature", "narration", "broadcast"],
    mos_score: 4.84,
    avatar_emoji: "👩‍🎨",
    avatar_bg: "from-rose-500 to-pink-600",
    friendly_role: "இலக்கிய குரல் (Classical Tamil)"
  },
  {
    id: "ta-IN-surya",
    name: "Surya",
    native_name: "சூர்யா",
    language: "ta",
    gender: "male",
    age_bracket: "Adult (28-38)",
    description: "Energetic and modern commercial voice with dynamic pitch range.",
    tags: ["Dynamic", "Energetic", "Modern"],
    recommended_for: ["advertisements", "tutorials", "social"],
    mos_score: 4.77,
    avatar_emoji: "👨‍💻",
    avatar_bg: "from-blue-600 to-cyan-600",
    friendly_role: "இளமை குரல் (Youth & Energy)"
  },

  // Kannada
  {
    id: "kn-IN-bhavana",
    name: "Bhavana",
    native_name: "ಭಾವನಾ",
    language: "kn",
    gender: "female",
    age_bracket: "Adult (25-35)",
    description: "Graceful Kannada voice with natural intonation from the Mysore-Bangalore region.",
    tags: ["Graceful", "Pure", "Soft"],
    recommended_for: ["stories", "customer-service", "guidance"],
    mos_score: 4.81,
    avatar_emoji: "👩",
    avatar_bg: "from-yellow-500 to-amber-600",
    friendly_role: "ಮೈಸೂರು ಕನ್ನಡ (Sweet Storyteller)"
  },
  {
    id: "kn-IN-raghav",
    name: "Raghav",
    native_name: "ರಾಘವ್",
    language: "kn",
    gender: "male",
    age_bracket: "Adult (30-42)",
    description: "Confident and well-paced voice suited for educational content and tech reads.",
    tags: ["Confident", "Clear", "Engaging"],
    recommended_for: ["education", "tech", "presentations"],
    mos_score: 4.75,
    avatar_emoji: "👨",
    avatar_bg: "from-amber-600 to-red-600",
    friendly_role: "ಸ್ಪಷ್ಟ ಭಾಷಣ (Clear Speaker)"
  },

  // Malayalam
  {
    id: "ml-IN-anjali",
    name: "Anjali",
    native_name: "അഞ്ജലി",
    language: "ml",
    gender: "female",
    age_bracket: "Adult (24-34)",
    description: "Sweet, gentle Malayalam voice with precise chillu letter phonation.",
    tags: ["Gentle", "Precise", "Sweet"],
    recommended_for: ["poetry", "audiobooks", "healthcare"],
    mos_score: 4.83,
    avatar_emoji: "👩‍🌾",
    avatar_bg: "from-emerald-500 to-teal-700",
    friendly_role: "മൃദുല സ്വരം (Gentle Poetry & Tales)"
  },
  {
    id: "ml-IN-madhav",
    name: "Madhav",
    native_name: "മാധവ്",
    language: "ml",
    gender: "male",
    age_bracket: "Adult (32-45)",
    description: "Strong, journalistic voice with distinct broadcast resonance.",
    tags: ["Journalistic", "Strong", "Clear"],
    recommended_for: ["news", "history", "podcasts"],
    mos_score: 4.78,
    avatar_emoji: "👨‍🏫",
    avatar_bg: "from-teal-600 to-blue-700",
    friendly_role: "വാർത്താ അവതാരകൻ (News Narrator)"
  },

  // Marathi
  {
    id: "mr-IN-tanvi",
    name: "Tanvi",
    native_name: "तन्वी",
    language: "mr",
    gender: "female",
    age_bracket: "Adult (25-35)",
    description: "Expressive Marathi speaker with crisp nasal vowel rendering.",
    tags: ["Expressive", "Crisp", "Warm"],
    recommended_for: ["dialogues", "podcasts", "audio-tours"],
    mos_score: 4.80,
    avatar_emoji: "👩‍🎨",
    avatar_bg: "from-orange-500 to-amber-600",
    friendly_role: "भावपूर्ण स्वर (Expressive Voice)"
  },
  {
    id: "mr-IN-omkar",
    name: "Omkar",
    native_name: "ओमकार",
    language: "mr",
    gender: "male",
    age_bracket: "Adult (30-40)",
    description: "Polished Pune-dialect voice ideal for formal instruction and audio drama.",
    tags: ["Polished", "Formal", "Dramatic"],
    recommended_for: ["corporate", "theatre", "literature"],
    mos_score: 4.76,
    avatar_emoji: "👨‍💼",
    avatar_bg: "from-indigo-600 to-purple-800",
    friendly_role: "पुणेरी संवाद (Formal & Drama)"
  },

  // Bengali
  {
    id: "bn-IN-ishani",
    name: "Ishani",
    native_name: "ঈশানী",
    language: "bn",
    gender: "female",
    age_bracket: "Adult (24-34)",
    description: "Lyrical and nuanced voice echoing the poetic beauty of Rabindra-style Bengali.",
    tags: ["Lyrical", "Poetic", "Nuanced"],
    recommended_for: ["poetry", "stories", "creative"],
    mos_score: 4.86,
    avatar_emoji: "👩‍🎤",
    avatar_bg: "from-teal-500 to-cyan-600",
    friendly_role: "কাব্যিক কণ্ঠ (Poetic Voice)"
  },
  {
    id: "bn-IN-subhash",
    name: "Subhash",
    native_name: "সুভাষ",
    language: "bn",
    gender: "male",
    age_bracket: "Adult (35-48)",
    description: "Vibrant and articulate voice ideal for intellectual discourse and news.",
    tags: ["Articulate", "Vibrant", "Smart"],
    recommended_for: ["news", "education", "interviews"],
    mos_score: 4.80,
    avatar_emoji: "👨‍🏫",
    avatar_bg: "from-blue-600 to-indigo-700",
    friendly_role: "স্পষ্ট বার্তা (Clear Discourse)"
  },

  // Gujarati
  {
    id: "gu-IN-diya",
    name: "Diya",
    native_name: "દિયા",
    language: "gu",
    gender: "female",
    age_bracket: "Adult (24-32)",
    description: "Warm, conversational Gujarati voice with authentic regional rhythm.",
    tags: ["Conversational", "Warm", "Friendly"],
    recommended_for: ["business", "podcasts", "audiobooks"],
    mos_score: 4.75,
    avatar_emoji: "👩‍💼",
    avatar_bg: "from-amber-500 to-orange-600",
    friendly_role: "મીઠો અવાજ (Friendly Voice)"
  },
  {
    id: "gu-IN-niranjan",
    name: "Niranjan",
    native_name: "નિરંજન",
    language: "gu",
    gender: "male",
    age_bracket: "Adult (30-45)",
    description: "Clear and resonant Gujarati male narrator suited for broadcasts and literature.",
    tags: ["Resonant", "Clear", "Broadcast"],
    recommended_for: ["news", "literature", "documentaries"],
    mos_score: 4.78,
    avatar_emoji: "👨‍💼",
    avatar_bg: "from-blue-600 to-indigo-700",
    friendly_role: "સ્પષ્ટ અવાજ (Clear Narrator)"
  },

  // Punjabi
  {
    id: "pa-IN-gurpreet",
    name: "Gurpreet",
    native_name: "ਗੁਰਪ੍ਰੀਤ",
    language: "pa",
    gender: "male",
    age_bracket: "Adult (28-40)",
    description: "Robust and spirited Majhi Punjabi voice full of warmth and vitality.",
    tags: ["Spirited", "Robust", "Warm"],
    recommended_for: ["folk-tales", "broadcast", "motivation"],
    mos_score: 4.81,
    avatar_emoji: "👳",
    avatar_bg: "from-yellow-500 to-amber-600",
    friendly_role: "ਜੋਸ਼ੀਲੀ ਬੋਲੀ (Spirited Folk Voice)"
  },
  {
    id: "pa-IN-simran",
    name: "Simran",
    native_name: "ਸਿਮਰਨ",
    language: "pa",
    gender: "female",
    age_bracket: "Adult (22-32)",
    description: "Sweet, melodic Punjabi female voice ideal for stories, poetry, and conversations.",
    tags: ["Melodious", "Sweet", "Folk"],
    recommended_for: ["stories", "poetry", "conversation"],
    mos_score: 4.79,
    avatar_emoji: "👧",
    avatar_bg: "from-rose-500 to-pink-600",
    friendly_role: "ਮਿੱਠੀ ਬੋਲੀ (Melodic Voice)"
  },

  // Odia
  {
    id: "or-IN-subhadra",
    name: "Subhadra",
    native_name: "ସୁଭଦ୍ରା",
    language: "or",
    gender: "female",
    age_bracket: "Adult (25-35)",
    description: "Melodious Utkali voice with natural retroflex phonetics.",
    tags: ["Melodious", "Native", "Authentic"],
    recommended_for: ["folklore", "learning", "audio-magazines"],
    mos_score: 4.73,
    avatar_emoji: "👩",
    avatar_bg: "from-purple-500 to-pink-600",
    friendly_role: "ମଧୁର କଣ୍ଠ (Sweet Folklore)"
  },

  // Urdu
  {
    id: "ur-IN-faizan",
    name: "Faizan",
    native_name: "فیضان",
    language: "ur",
    gender: "male",
    age_bracket: "Adult (30-45)",
    description: "Classical Lucknowi Urdu diction with impeccable Sheen-Qaaf articulation.",
    tags: ["Sophisticated", "Classical", "Poetic"],
    recommended_for: ["ghazals", "history", "narration"],
    mos_score: 4.87,
    avatar_emoji: "👨‍🎨",
    avatar_bg: "from-emerald-700 to-teal-800",
    friendly_role: "لکھنوی لب و لہجہ (Classical Urdu)"
  },
  {
    id: "ur-IN-zara",
    name: "Zara",
    native_name: "زارا",
    language: "ur",
    gender: "female",
    age_bracket: "Adult (22-30)",
    description: "Delicate and emotive Urdu voice with clear talaffuz (pronunciation).",
    tags: ["Emotive", "Delicate", "Clear"],
    recommended_for: ["audiobooks", "dramas", "dialogue"],
    mos_score: 4.84,
    avatar_emoji: "👩",
    avatar_bg: "from-teal-600 to-cyan-700",
    friendly_role: "شائستہ آواز (Delicate & Emotive)"
  },

  // English (Indian Accent)
  {
    id: "en-IN-neerja",
    name: "Neerja",
    native_name: "Neerja",
    language: "en",
    gender: "female",
    age_bracket: "Adult (26-36)",
    description: "Clear neutral Indian English accent, internationally understood and friendly.",
    tags: ["Neutral Indian", "Professional", "Crisp"],
    recommended_for: ["corporate", "elearning", "support"],
    mos_score: 4.89,
    avatar_emoji: "👩‍💼",
    avatar_bg: "from-indigo-600 to-blue-600",
    friendly_role: "Professional Indian Accent"
  },
  {
    id: "en-IN-prabhat",
    name: "Prabhat",
    native_name: "Prabhat",
    language: "en",
    gender: "male",
    age_bracket: "Adult (32-45)",
    description: "Warm, trustworthy Indian English narrator with natural cadence.",
    tags: ["Trustworthy", "Narrative", "Rich"],
    recommended_for: ["documentaries", "explainer", "podcasts"],
    mos_score: 4.83,
    avatar_emoji: "👨‍🏫",
    avatar_bg: "from-blue-600 to-indigo-800",
    friendly_role: "Warm Storyteller"
  }
];

export const SAMPLE_TEXTS_BY_LANG: Record<string, string> = {
  te: "ఆధునిక సమాజంలో విద్య అనేది ప్రతి ఒక్కరి ప్రాథమిక హక్కు. గ్రామీణ ప్రాంతాల్లో డిజిటల్ విద్యా విధానాన్ని బలోపేతం చేయడానికి ప్రాంతీయ భాషలలో నాణ్యమైన కంటెంట్ అందించడం ఎంతో అవసరం. వాణి ఏఐ ద్వారా విద్యార్థులు తమ మాతృభాషలోనే పాఠాలను వినవచ్చు మరియు సులభంగా అర్థం చేసుకోవచ్చు.",
  hi: "भारतीय संस्कृति विश्व की सबसे प्राचीन और समृद्ध संस्कृतियों में से एक है। हमारी भाषाएं केवल संवाद का साधन नहीं, बल्कि हमारी परंपरा, ज्ञान और संस्कारों की संवाहक हैं। डिजिटल तकनीक के माध्यम से प्रत्येक क्षेत्रीय भाषा को आधुनिक स्वरूप देना अत्यंत आवश्यक है।",
  ta: "தமிழ் மொழி மிகத் தொன்மையான இலக்கண, இலக்கிய வளங்களைக் கொண்ட திராவிட மொழியாகும். தொழில்நுட்ப வளர்ச்சியின் இந்த காலகட்டத்தில், நமது தாய்மொழியில் அனைத்து வகை அறிவுத் தகவல்களும் குரல் வடிவில் எளிதாகக் கிடைக்கப்பெறுவது இளைய தலைமுறைக்கு பேருதவியாக இருக்கும்.",
  kn: "ಕನ್ನಡ ನಾಡು ಮತ್ತು ನುಡಿಯು ಅದ್ಭುತ ಸಾಹಿತ್ಯಿಕ ಶ್ರೀಮಂತಿಕೆಯನ್ನು ಹೊಂದಿದೆ. ಇಂದಿನ ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಯುಗದಲ್ಲಿ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಲ್ಲಿ ಸ್ವಾಭಾವಿಕ ಸಂಭಾಷಣಾ ಧ್ವನಿಯನ್ನು ರೂಪಿಸುವುದು ಸಮಗ್ರ ಶಿಕ್ಷಣ ಮತ್ತು ಜ್ಞಾನ ವಿಸ್ತರಣೆಗೆ ಅತ್ಯಂತ ಮಹತ್ವದ ಹೆಜ್ಜೆಯಾಗಿದೆ.",
  ml: "കേരളത്തിന്റെ തനതായ സംസ്കാരവും ഭാഷാ സൗന്ദര്യവും പ്രതിഫലിപ്പിക്കുന്നതാണ് നമ്മുടെ സാഹിത്യ സമ്പത്ത്. കൃത്രിമബുദ്ധിയുടെ സഹായത്തോടെ പ്രാദേശിക ഉള്ളടക്കം ജീവസ്സുറ്റ ശബ്ദത്തിൽ കേൾക്കാൻ സാധിക്കുന്നത് വിജ്ഞാന വിപ്ലവത്തിന് വഴിയൊരുക്കും.",
  mr: "महाराष्ट्राची संत परंपरा आणि समृद्ध साहित्य वारसा जपणे हे आपले कर्तव्य आहे. विज्ञान आणि तंत्रज्ञानाचा प्रसार मातृभाषेतून झाल्यास ग्रामीण व शहरी भागातील ज्ञानाचे अंतर सहजपणे मिटू शकते.",
  bn: "রবীন্দ্রনাথের গান এবং নজরুলের কবিতা বাংলা ভাষার আত্মাকে চিরকাল আন্দোলিত করে। ডিজিটাল যুগে আমাদের সমৃদ্ধ সাহিত্য ও সমসাময়িক লেখাকে জীবন্ত কণ্ঠে রূপান্তর করা এক ঐতিহাসিক মাইলফলক।",
  gu: "ગુજરાતની વેપારી કુનેહ અને ભાષાની મીઠાશ વિશ્વભરમાં જાણીતી છે. આપણી માતૃભાષામાં નવીનતમ માહિતી અને શિક્ષણ સરળતાથી મળી રહે તે માટે આધુનિક અવાજ ટેકનોલોજી અત્યંત ઉપયોગી સાબિત થશે.",
  pa: "ਪੰਜਾਬ ਦੀ ਧਰਤੀ ਵੀਰਾਂ, ਸੂਰਬੀਰਾਂ ਅਤੇ ਸੂਫ਼ੀ ਫ਼ਕੀਰਾਂ ਦੀ ਧਰਤੀ ਹੈ। ਆਪਣੀ ਮਾਂ ਬੋਲੀ ਪੰਜਾਬੀ ਵਿੱਚ ਲਿਖਤਾਂ ਨੂੰ ਸ਼ੁੱਧ ਅਤੇ ਸੁਰੀਲੀ ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣਨਾ ਹਰ ਪੰਜਾਬੀ ਲਈ ਮਾਣ ਵਾਲੀ ਗੱਲ ਹੈ।",
  or: "ଓଡ଼ିଶାର କଳା, ସ୍ଥାପତ୍ୟ ଏବଂ ଜଗନ୍ନାଥ ସଂସ୍କୃତି ବିଶ୍ୱବିଦିତ। ଓଡ଼ିଆ ଭାଷାରେ ରଚିତ ଅମୂଲ୍ୟ ଗ୍ରନ୍ଥ ଓ ଆଧୁନିକ ସାହିତ୍ୟକୁ ସ୍ୱାଭାବିକ କଣ୍ଠସ୍ୱରରେ ଉପସ୍ଥାପନ କରିବା ଦ୍ୱାରା ନୂଆ ପିଢ଼ି ଅଧିକ ଉତ୍ସାହିତ ହେବ।",
  ur: "اردو زبان اپنی شیرینی، تہذیب اور شائستگی کی بدولت دنیا بھر میں ممتاز مقام رکھتی ہے۔ شاعری، ادب اور سائنسی علوم کو ایک معیاری اور خوبصورت لب و لہجے میں سننا واقعی ایک دلکش تجربہ ہے۔",
  en: "Welcome to VaaniAI, the pioneering regional speech synthesis platform. By combining advanced neural acoustic modeling with authentic dialect prosody, we bridge the digital accessibility divide for millions across India."
};

export const MOS_DATA = [
  { language: "Telugu", human: 4.90, vaaniai: 4.82, standard: 3.55 },
  { language: "Hindi", human: 4.95, vaaniai: 4.88, standard: 3.80 },
  { language: "Tamil", human: 4.92, vaaniai: 4.84, standard: 3.60 },
  { language: "Kannada", human: 4.88, vaaniai: 4.81, standard: 3.50 },
  { language: "Bengali", human: 4.91, vaaniai: 4.86, standard: 3.65 },
  { language: "Urdu", human: 4.93, vaaniai: 4.87, standard: 3.70 },
  { language: "Malayalam", human: 4.89, vaaniai: 4.83, standard: 3.45 },
  { language: "Marathi", human: 4.90, vaaniai: 4.80, standard: 3.52 },
];
