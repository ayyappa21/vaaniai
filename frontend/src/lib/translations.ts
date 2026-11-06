export type SupportedUiLanguage = "te" | "hi" | "ta" | "kn" | "ml" | "bn" | "mr" | "gu" | "pa" | "en";

export interface UiLanguageMeta {
  code: SupportedUiLanguage;
  name: string;
  native_name: string;
  glyph: string;
}

export const UI_LANGUAGES: UiLanguageMeta[] = [
  { code: "te", name: "Telugu", native_name: "తెలుగు", glyph: "తె" },
  { code: "hi", name: "Hindi", native_name: "हिन्दी", glyph: "ह" },
  { code: "ta", name: "Tamil", native_name: "தமிழ்", glyph: "த" },
  { code: "kn", name: "Kannada", native_name: "ಕನ್ನಡ", glyph: "ಕ" },
  { code: "ml", name: "Malayalam", native_name: "മലയാളം", glyph: "മ" },
  { code: "bn", name: "Bengali", native_name: "বাংলা", glyph: "বা" },
  { code: "mr", name: "Marathi", native_name: "मराठी", glyph: "म" },
  { code: "gu", name: "Gujarati", native_name: "ગુજરાતી", glyph: "ગુ" },
  { code: "pa", name: "Punjabi", native_name: "ਪੰਜਾਬੀ", glyph: "ਪੰ" },
  { code: "en", name: "English", native_name: "English", glyph: "En" }
];

export type TranslationKey =
  // Navbar
  | "nav_studio"
  | "nav_scan"
  | "nav_upload"
  | "nav_stories"
  | "nav_tools"
  | "nav_compare"
  | "nav_pronunciation"
  | "nav_languages"
  | "nav_voices"
  | "nav_history"
  | "nav_accessibility"
  | "nav_tech"
  | "nav_about"
  | "nav_help"
  | "nav_speak_btn"
  | "nav_ui_lang"

  // Common Actions
  | "btn_listen"
  | "btn_stop"
  | "btn_copy"
  | "btn_copied"
  | "btn_clear"
  | "btn_upload"
  | "btn_download"
  | "btn_sample"
  | "btn_try_now"
  | "btn_save"
  | "btn_open_studio"
  | "btn_edit_studio"
  | "btn_replay"

  // Hero Section
  | "hero_badge"
  | "hero_title_part1"
  | "hero_title_accent"
  | "hero_subtitle"
  | "hero_btn_studio"
  | "hero_btn_listen"
  | "hero_pill_free"
  | "hero_pill_nologin"
  | "hero_pill_access"

  // Steps
  | "steps_header_tag"
  | "steps_heading"
  | "steps_subtitle"
  | "step1_title"
  | "step1_desc"
  | "step2_title"
  | "step2_desc"
  | "step3_title"
  | "step3_desc"

  // Dedicated Pages Showcase
  | "tools_header_tag"
  | "tools_heading"
  | "tools_subtitle"
  | "tool_scan_title"
  | "tool_scan_desc"
  | "tool_upload_title"
  | "tool_upload_desc"
  | "tool_stories_title"
  | "tool_stories_desc"
  | "tool_compare_title"
  | "tool_compare_desc"
  | "tool_pron_title"
  | "tool_pron_desc"
  | "tool_studio_title"
  | "tool_studio_desc"

  // Scanner Page
  | "scan_page_badge"
  | "scan_page_title"
  | "scan_page_desc"
  | "scan_drop_title"
  | "scan_drop_sub"
  | "scan_btn_choose"
  | "scan_btn_change"
  | "scan_scanning"
  | "scan_sample_title"

  // Document Upload Page
  | "doc_page_badge"
  | "doc_page_title"
  | "doc_page_desc"
  | "doc_drop_title"
  | "doc_drop_sub"
  | "doc_btn_choose"
  | "doc_reading"
  | "doc_info_title"
  | "doc_ready"
  | "doc_est_time"

  // Stories Page
  | "story_page_badge"
  | "story_page_title"
  | "story_page_desc"
  | "story_btn_play"
  | "story_btn_pause"
  | "story_moral_label"
  | "story_more_title"
  | "story_more_sub"

  // Voice Comparison Page
  | "compare_page_badge"
  | "compare_page_title"
  | "compare_page_desc"
  | "compare_text_label"
  | "compare_voice_a"
  | "compare_voice_b"
  | "compare_speed"

  // Pronunciation Page
  | "pron_page_badge"
  | "pron_page_title"
  | "pron_page_desc"
  | "pron_orig_label"
  | "pron_phon_label"
  | "pron_btn_orig"
  | "pron_btn_new"
  | "pron_btn_save"
  | "pron_my_rules"

  // Accessibility Page
  | "access_page_badge"
  | "access_page_title"
  | "access_page_desc"
  | "access_contrast_title"
  | "access_contrast_desc"
  | "access_text_size_title"
  | "access_voice_test_title"
  | "access_btn_voice_test"
  | "access_shortcuts_title"

  // Studio Page
  | "studio_step1_lang"
  | "studio_step2_voice"
  | "studio_step3_speed"
  | "studio_step4_emotion"
  | "studio_tab_type"
  | "studio_tab_file"
  | "studio_tab_photo"
  | "studio_tab_link"
  | "studio_karaoke_title"
  | "studio_waveform_title"
  | "studio_synthesizing";

export const TRANSLATIONS: Record<SupportedUiLanguage, Record<TranslationKey, string>> = {
  // TELUGU
  te: {
    nav_studio: "స్టూడియో",
    nav_scan: "ఫోటో స్కానర్",
    nav_upload: "పిడిఎఫ్ ఆడియో",
    nav_stories: "నీతి కథలు",
    nav_tools: "సాధనాలు",
    nav_compare: "స్వర పోలిక",
    nav_pronunciation: "ఉచ్చారణ ల్యాబ్",
    nav_languages: "12 భాషలు",
    nav_voices: "గొంతులు",
    nav_history: "చరిత్ర",
    nav_accessibility: "సులభ ప్రవేశం",
    nav_tech: "సాంకేతికత",
    nav_about: "మా గురించి",
    nav_help: "గైడ్",
    nav_speak_btn: "మాట్లాడించండి",
    nav_ui_lang: "UI భాష",

    btn_listen: "వినండి",
    btn_stop: "ఆపండి",
    btn_copy: "కాపీ చేయండి",
    btn_copied: "కాపీ చేయబడింది!",
    btn_clear: "తుడిచివేయండి",
    btn_upload: "అప్‌లోడ్ చేయండి",
    btn_download: "డౌన్‌లోడ్",
    btn_sample: "ఉదాహరణ",
    btn_try_now: "ఇప్పుడే ప్రయత్నించండి",
    btn_save: "సేవ్ చేయండి",
    btn_open_studio: "స్టూడియో తెరవండి",
    btn_edit_studio: "స్టూడియోలో సవరించండి",
    btn_replay: "మళ్ళీ వినండి",

    hero_badge: "భారతీయ ప్రాంతీయ భాషల సహజ స్వర వేదిక • 12 Indian Languages",
    hero_title_part1: "మీ మాటలను మీ సొంత భాషలోనే",
    hero_title_accent: "సహజంగా వినిపించండి!",
    hero_subtitle: "చదవడం రాని వారైనా, కంటి చూపు లేని వారైనా, గ్రామీణ పాఠకులైనా సరే — పుస్తకాలు, కథలు, వార్తలను మీ మాతృభాషలో సులభంగా వినండి.",
    hero_btn_studio: "ఇప్పుడే మాట్లాడించండి",
    hero_btn_listen: "వాయిస్ వినండి",
    hero_pill_free: "100% ఉచితం",
    hero_pill_nologin: "లాగిన్ అవసరం లేదు",
    hero_pill_access: "సులభమైన యాక్సెసిబిలిటీ",

    steps_header_tag: "ఎంతో సులభం • Very Simple to Use",
    steps_heading: "కేవలం 3 దశల్లో మీ మాటలను వినండి",
    steps_subtitle: "ఎవరైనా సరే ఎటువంటి సాంకేతిక పరిజ్ఞానం లేకుండా సులభంగా ఉపయోగించవచ్చు.",
    step1_title: "1. మీ భాషను ఎంచుకోండి",
    step1_desc: "తెలుగు, హిందీ, తమిళం సహా 12 భారతీయ భాషల్లో మీ భాషను ఒకే ట్యాప్‌తో ఎంచుకోండి.",
    step2_title: "2. రాయండి లేదా ఫోటో పెట్టండి",
    step2_desc: "మీ మాటలను టైప్ చేయండి, లేదా పుస్తక పేజీ ఫోటో అప్‌లోడ్ చేయండి.",
    step3_title: "3. పెద్ద ఆకుపచ్చ బటన్ నొక్కండి",
    step3_desc: "మీ రచనలు స్వయంగా మీ మాతృభాషలో స్పష్టంగా వినిపిస్తాయి. డౌన్‌లోడ్ కూడా చేసుకోవచ్చు!",

    tools_header_tag: "ప్రత్యేక సాధనాలు • Dedicated Tools",
    tools_heading: "ప్రతి అవసరానికి ప్రత్యేకమైన సులభ పేజీలు",
    tools_subtitle: "కేవలం ఒకే క్లిక్‌తో మీరు కోరుకున్న సాధనాన్ని ఉపయోగించండి — చదువురాని వారైనా సరే ఫోటో లేదా కథపై నొక్కితే చాలు!",
    tool_scan_title: "పుస్తకం ఫోటో స్కానర్",
    tool_scan_desc: "ఏదైనా పుస్తకం లేదా పేపర్ ఫోటో తీస్తే చాలు — ఆటోమేటిక్‌గా అక్షరాలను గుర్తించి మీ మాతృభాషలో చదివి వినిపిస్తుంది.",
    tool_upload_title: "పిడిఎఫ్ & డాక్యుమెంట్స్",
    tool_upload_desc: "పాఠశాల పుస్తకాలు, నోట్స్, కథల పుస్తకాల PDF లేదా Word ఫైళ్ళను అప్‌లోడ్ చేసి నిరంతర ఆడియోబుక్‌గా మార్చండి.",
    tool_stories_title: "ప్రాంతీయ నీతి కథలు",
    tool_stories_desc: "పిల్లలు, వృద్ధుల కోసం పంచతంత్ర, తెనాలి రామకృష్ణ కథలు సిద్ధంగా ఉన్నాయి. ఒక్క ట్యాప్‌తో వెంటనే వినవచ్చు!",
    tool_compare_title: "స్వర పోలిక ల్యాబ్",
    tool_compare_desc: "ఇద్దరు వేర్వేరు వ్యాఖ్యాతల స్వరాలను పక్కపక్కనే విని, మీ కోసం అత్యంత సహజమైన ఉత్తమ స్వరాన్ని ఎంచుకోండి.",
    tool_pron_title: "ఉచ్చారణ సరిచేసే సాధనం",
    tool_pron_desc: "మీ స్థానిక యాస లేదా కష్టమైన పదాలను మీ ఇష్టానుసారంగా పలికించేందుకు ఉచ్చారణ నియమాలను రూపొందించండి.",
    tool_studio_title: "వాణి ఏఐ ప్రధాన స్టూడియో",
    tool_studio_desc: "పూర్తి నియంత్రణలతో కూడిన ఆడియో స్టూడియో — వేగం, భావోద్వేగం, క్యారోకే, వేవ్‌ఫార్మ్ మరియు లైవ్ డౌన్‌లోడ్.",

    scan_page_badge: "పుస్తకం ఫోటో స్కానర్ • Camera to Voice",
    scan_page_title: "పుస్తకం లేదా పత్రిక ఫోటో తీసి వినండి!",
    scan_page_desc: "మీ మొబైల్ కెమెరాతో ఏదైనా పుస్తక పేజీ లేదా నోట్సు ఫోటో తీస్తే చాలు — వాణి ఏఐ వెంటనే అక్షరాలను గుర్తించి మీ మాతృభాషలో స్పష్టంగా చదివి వినిపిస్తుంది.",
    scan_drop_title: "పుస్తకం ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి",
    scan_drop_sub: "(PNG, JPG, Camera Capture)",
    scan_btn_choose: "ఫోటో ఎంచుకోండి",
    scan_btn_change: "మరో ఫోటో తీయండి",
    scan_scanning: "అక్షరాలను గుర్తిస్తోంది...",
    scan_sample_title: "లేదా ఉదాహరణ పుస్తకం ప్రయత్నించండి:",

    doc_page_badge: "పిడిఎఫ్ & డాక్యుమెంట్స్ • PDF & Word Audiobook",
    doc_page_title: "మీ పాఠ్యపుస్తకాలను ఆడియోబుక్‌గా మార్చండి",
    doc_page_desc: "పాఠశాల పుస్తకాలు, నోట్స్, కథల పుస్తకాల PDF లేదా DOCX ఫైళ్ళను అప్‌లోడ్ చేసి, మీ మాతృభాషలో స్పష్టమైన కథన శైలిలో వినండి.",
    doc_drop_title: "PDF, Word (DOCX), లేదా TXT ఫైల్ ఇక్కడ వేయండి",
    doc_drop_sub: "పాఠ్యపుస్తకం లేదా స్టడీ మెటీరియల్ ఫైల్ అప్‌లోడ్ చేయండి",
    doc_btn_choose: "ఫైల్ ఎంచుకోండి",
    doc_reading: "డాక్యుమెంట్ చదువుతోంది...",
    doc_info_title: "డాక్యుమెంట్ వివరాలు",
    doc_ready: "సిద్ధంగా ఉంది",
    doc_est_time: "నిమిషాల ప్రసంగం",

    story_page_badge: "ప్రాంతీయ కథల నిధి • Regional Audio Folk Tales",
    story_page_title: "మన భారతీయ నీతి కథలను వినండి!",
    story_page_desc: "పిల్లలు, వృద్ధులు మరియు కుటుంబం కలిసి ఆనందించే పంచతంత్ర, తెనాలి రామకృష్ణ కథలను స్వచ్ఛమైన కథన శైలిలో వినండి.",
    story_btn_play: "కథను వినండి",
    story_btn_pause: "కథను ఆపండి",
    story_moral_label: "ఈ కథలోని నీతి:",
    story_more_title: "మరిన్ని అందమైన కథలు",
    story_more_sub: "ఏ కథపై క్లిక్ చేసినా వెంటనే మీ మాతృభాషలో స్పష్టంగా వినవచ్చు",

    compare_page_badge: "స్వర పోలిక ల్యాబ్ • Voice Comparison",
    compare_page_title: "ఇద్దరు వ్యాఖ్యాతల స్వరాలను పక్కపక్కనే పోల్చి చూడండి!",
    compare_page_desc: "మీ ప్రాజెక్ట్ లేదా పుస్తకానికి సరైన స్వరాన్ని ఎంచుకోవడానికి రెండు విభిన్న స్వరాలను ఒకే వాక్యంపై ఒకదాని తర్వాత ఒకటి విని పరీక్షించండి.",
    compare_text_label: "పోలిక వాక్యం:",
    compare_voice_a: "వాయిస్ 1 (Voice A)",
    compare_voice_b: "వాయిస్ 2 (Voice B)",
    compare_speed: "వేగం (Speed):",

    pron_page_badge: "ఉచ్చారణ ప్రయోగశాల • Pronunciation Tuner",
    pron_page_title: "మీ మాండలికానికి తగినట్లుగా పలికించండి!",
    pron_page_desc: "కష్టమైన పదాలు, పేర్లు లేదా స్థానిక యాసలను మీ ఇష్టానుసారంగా సరిదిద్దుకోండి. అసలు స్వరానికి మరియు కొత్త ఉచ్చారణకు తేడాను వినండి.",
    pron_orig_label: "1. అసలు పదం:",
    pron_phon_label: "2. అది పలకాల్సిన శైలి:",
    pron_btn_orig: "అసలు స్వరం",
    pron_btn_new: "కొత్త శైలి",
    pron_btn_save: "డిక్షనరీలో సేవ్ చేయండి",
    pron_my_rules: "మీ డిక్షనరీ నియమాలు",

    access_page_badge: "సులభమైన యాక్సెసిబిలిటీ • Inclusive Design",
    access_page_title: "కంటి చూపు లేని వారికి & చదువురాని వారికి సులభం",
    access_page_desc: "వాణి ఏఐ ప్రత్యేకంగా గ్రామీణ పౌరులు, వృద్ధులు, మరియు దృష్టి లోపం ఉన్న విద్యార్థులు సొంతంగా భారతీయ ప్రాంతీయ సాహిత్యాన్ని వినగలిగేలా రూపొందించబడింది.",
    access_contrast_title: "హై-కాంట్రాస్ట్ నలుపు/పసుపు థీమ్",
    access_contrast_desc: "చూపు స్పష్టత కోసం (High-Contrast)",
    access_text_size_title: "అక్షరాల సైజు (Text Size)",
    access_voice_test_title: "వాయిస్ గైడెన్స్ పరీక్షించండి",
    access_btn_voice_test: "వాయిస్ వినండి",
    access_shortcuts_title: "కీబోర్డ్ షార్ట్‌కట్‌లు",

    studio_step1_lang: "1. మీ భాషను ఎంచుకోండి:",
    studio_step2_voice: "2. వాయిస్ ఎంచుకోండి:",
    studio_step3_speed: "3. మాట్లాడే వేగం:",
    studio_step4_emotion: "4. భావోద్వేగం / శైలి:",
    studio_tab_type: "రాయండి",
    studio_tab_file: "ఫైల్",
    studio_tab_photo: "ఫోటో",
    studio_tab_link: "లింక్",
    studio_karaoke_title: "క్యారోకే శ్రవణం (పదంపై నొక్కి సరిచేయండి):",
    studio_waveform_title: "శబ్ద తరంగాలు / Audio Waveform",
    studio_synthesizing: "మాట్లాడుతోంది..."
  },

  // HINDI
  hi: {
    nav_studio: "स्टूडियो",
    nav_scan: "फोटो स्कैनर",
    nav_upload: "पीडीएफ ऑडियो",
    nav_stories: "कहानियां",
    nav_tools: "सुविधाएं",
    nav_compare: "आवाज तुलना",
    nav_pronunciation: "उच्चारण लैब",
    nav_languages: "12 भाषाएं",
    nav_voices: "आवाजें",
    nav_history: "इतिहास",
    nav_accessibility: "सुलभ पहुंच",
    nav_tech: "तकनीक",
    nav_about: "हमारे बारे में",
    nav_help: "मदद",
    nav_speak_btn: "सुनिए",
    nav_ui_lang: "भाषा",

    btn_listen: "सुनिए",
    btn_stop: "रोकिए",
    btn_copy: "कॉपी करें",
    btn_copied: "कॉपी हो गया!",
    btn_clear: "साफ करें",
    btn_upload: "अपलोड करें",
    btn_download: "डाउनलोड",
    btn_sample: "उदाहरण",
    btn_try_now: "अभी आजमाएं",
    btn_save: "सहेजें",
    btn_open_studio: "स्टूडियो खोलें",
    btn_edit_studio: "स्टूडियो में बदलें",
    btn_replay: "पुनः सुनें",

    hero_badge: "भारतीय क्षेत्रीय भाषाओं का प्राकृतिक स्वर मंच • 12 Indian Languages",
    hero_title_part1: "अपने विचारों को अपनी ही भाषा में",
    hero_title_accent: "सहजता से सुनिए!",
    hero_subtitle: "चाहे पढ़ना न आता हो, आंखों में कमजोरी हो या ग्रामीण पाठक हों — किताबें, कहानियां और समाचार अपनी मातृभाषा में आसानी से सुनें।",
    hero_btn_studio: "स्टूडियो में आजमाएं",
    hero_btn_listen: "आवाज सुनें",
    hero_pill_free: "100% मुफ़्त",
    hero_pill_nologin: "लॉगिन की आवश्यकता नहीं",
    hero_pill_access: "सुलभ पहुंच",

    steps_header_tag: "अत्यंत सरल • Very Simple to Use",
    steps_heading: "केवल 3 चरणों में अपनी भाषा सुनें",
    steps_subtitle: "कोई भी व्यक्ति बिना किसी तकनीकी ज्ञान के इसका आसानी से उपयोग कर सकता है।",
    step1_title: "1. अपनी भाषा चुनें",
    step1_desc: "हिन्दी, तेलुगु, तमिल सहित 12 भारतीय भाषाओं में से अपनी भाषा एक क्लिक में चुनें।",
    step2_title: "2. लिखें या फोटो लगाएं",
    step2_desc: "अपने शब्द टाइप करें या किताब के पन्ने की फोटो खींचकर लगाएं।",
    step3_title: "3. बड़ा हरा बटन दबाएं",
    step3_desc: "आपकी सामग्री तुरंत स्पष्ट और स्वाभाविक आवाज में सुनाई देगी। डाउनलोड भी कर सकते हैं!",

    tools_header_tag: "विशेष सुविधाएं • Dedicated Tools",
    tools_heading: "हर आवश्यकता के लिए समर्पित सरल पृष्ठ",
    tools_subtitle: "सिर्फ एक क्लिक में मनपसंद साधन चुनें — फोटो या कहानी पर टैप करते ही आवाज शुरू!",
    tool_scan_title: "किताब फोटो स्कैनर",
    tool_scan_desc: "किसी भी किताब या अखबार की फोटो खींचें — वाणी एआई शब्दों को पहचानकर मातृभाषा में पढ़कर सुनाएगी।",
    tool_upload_title: "पीडीएफ व दस्तावेज",
    tool_upload_desc: "स्कूल की किताबें, नोट्स या कहानियों की PDF/Word फाइल अपलोड कर पूरी ऑडियोबुक बनाएं।",
    tool_stories_title: "पंचतंत्र व लोक कथाएं",
    tool_stories_desc: "बच्चों और बुजुर्गों के लिए पंचतंत्र, तेनालीराम व अकबर-बीरबल की कहानियां तैयार हैं।",
    tool_compare_title: "आवाज तुलना लैब",
    tool_compare_desc: "दो अलग-अलग वाचकों की आवाज पास-पास सुनकर अपनी पसंद की सबसे अच्छी आवाज चुनें।",
    tool_pron_title: "उच्चारण सुधारक",
    tool_pron_desc: "कठिन शब्दों या स्थानीय बोलियों का सही उच्चारण तय करने के लिए अपने नियम बनाएं।",
    tool_studio_title: "वाणी एआई मुख्य स्टूडियो",
    tool_studio_desc: "पूर्ण नियंत्रणों वाला स्टूडियो — गति, भाव, कैराओके, वेवफॉर्म व सीधी डाउनलोड सुविधा।",

    scan_page_badge: "किताब फोटो स्कैनर • Camera to Voice",
    scan_page_title: "किताब या अखबार की फोटो खींचकर सुनें!",
    scan_page_desc: "अपने फोन के कैमरे से किसी भी किताब का पन्ना स्कैन करें — वाणी एआई तुरंत शब्दों को पहचानकर बोलकर सुनाएगी।",
    scan_drop_title: "किताब की फोटो खींचें या अपलोड करें",
    scan_drop_sub: "(PNG, JPG, कैमरा कैप्चर)",
    scan_btn_choose: "फोटो चुनें",
    scan_btn_change: "दूसरी फोटो लें",
    scan_scanning: "अक्षर पहचाने जा रहे हैं...",
    scan_sample_title: "या नमूना किताब आजमाएं:",

    doc_page_badge: "पीडीएफ व दस्तावेज • PDF & Word Audiobook",
    doc_page_title: "अपनी पाठ्यपुस्तकों को ऑडियोबुक में बदलें",
    doc_page_desc: "स्कूल की किताबों, नोट्स या साहित्य की PDF/DOCX फाइल अपलोड करके स्वाभाविक आवाज में सुनें।",
    doc_drop_title: "PDF, Word (DOCX) या TXT फाइल यहां डालें",
    doc_drop_sub: "किताब या नोट्स की फाइल अपलोड करें",
    doc_btn_choose: "फाइल चुनें",
    doc_reading: "दस्तावेज पढ़ा जा रहा है...",
    doc_info_title: "फाइल का विवरण",
    doc_ready: "तैयार है",
    doc_est_time: "मिनट का भाषण",

    story_page_badge: "क्षेत्रीय कथा संग्रह • Regional Audio Stories",
    story_page_title: "हमारी भारतीय नीति कथाएं सुनें!",
    story_page_desc: "बच्चों और पूरे परिवार के लिए पंचतंत्र, तेनालीराम और अकबर-बीरबल की मनमोहक कहानियां।",
    story_btn_play: "कहानी सुनें",
    story_btn_pause: "कहानी रोकें",
    story_moral_label: "इस कहानी की सीख:",
    story_more_title: "और भी सुंदर कहानियां",
    story_more_sub: "किसी भी कहानी पर क्लिक करके तुरंत अपनी भाषा में सुनें",

    compare_page_badge: "आवाज तुलना लैब • Voice Comparison",
    compare_page_title: "दो वाचकों की आवाज की तुलना करें!",
    compare_page_desc: "एक ही वाक्य पर दो अलग-अलग आवाजें सुनकर अपनी परियोजना के लिए सर्वोत्तम आवाज चुनें।",
    compare_text_label: "तुलना के लिए वाक्य:",
    compare_voice_a: "आवाज 1 (Voice A)",
    compare_voice_b: "आवाज 2 (Voice B)",
    compare_speed: "बोलने की गति:",

    pron_page_badge: "उच्चारण प्रयोगालय • Pronunciation Tuner",
    pron_page_title: "अपनी बोली और लहजे के अनुसार उच्चारण संवारें!",
    pron_page_desc: "कठिन शब्दों या नामों का सही उच्चारण तय करें। मूल आवाज और नए उच्चारण में अंतर तुरंत सुनें।",
    pron_orig_label: "1. मूल शब्द:",
    pron_phon_label: "2. कैसे बोला जाना चाहिए:",
    pron_btn_orig: "मूल आवाज",
    pron_btn_new: "नया उच्चारण",
    pron_btn_save: "शब्दावली में सहेजें",
    pron_my_rules: "आपके नियम",

    access_page_badge: "सुलभ पहुंच • Inclusive Design",
    access_page_title: "दृष्टिबाधित और सामान्य पाठकों के लिए सुगम",
    access_page_desc: "वाणी एआई विशेष रूप से ग्रामीण नागरिकों, बुजुर्गों और दृष्टिबाधित विद्यार्थियों की सुविधा हेतु बनाई गई है।",
    access_contrast_title: "उच्च-कंट्रास्ट पीला/काला थीम",
    access_contrast_desc: "स्पष्ट दृष्टि हेतु (High-Contrast)",
    access_text_size_title: "अक्षरों का आकार (Text Size)",
    access_voice_test_title: "आवाज निर्देश का परीक्षण",
    access_btn_voice_test: "आवाज सुनें",
    access_shortcuts_title: "कीबोर्ड शॉर्टकट",

    studio_step1_lang: "1. अपनी भाषा चुनें:",
    studio_step2_voice: "2. वाचक चुनें:",
    studio_step3_speed: "3. बोलने की गति:",
    studio_step4_emotion: "4. भाव / शैली:",
    studio_tab_type: "लिखें",
    studio_tab_file: "फाइल",
    studio_tab_photo: "फोटो",
    studio_tab_link: "लिंक",
    studio_karaoke_title: "कैराओके श्रवण (शब्द पर क्लिक कर उच्चारण सुधारें):",
    studio_waveform_title: "ध्वनि तरंगें / Audio Waveform",
    studio_synthesizing: "आवाज तैयार हो रही है..."
  },

  // TAMIL
  ta: {
    nav_studio: "ஸ்டுடியோ",
    nav_scan: "புகைப்பட ஸ்கேனர்",
    nav_upload: "பிடிஎஃப் ஆடியோ",
    nav_stories: "நீதிக் கதைகள்",
    nav_tools: "வசதிகள்",
    nav_compare: "குரல் ஒப்பீடு",
    nav_pronunciation: "உச்சரிப்பு கூடம்",
    nav_languages: "12 மொழிகள்",
    nav_voices: "குரல்கள்",
    nav_history: "வரலாறு",
    nav_accessibility: "எளிய அணுகல்",
    nav_tech: "தொழில்நுட்பம்",
    nav_about: "எங்களைப் பற்றி",
    nav_help: "உதவி",
    nav_speak_btn: "பேசுக",
    nav_ui_lang: "மொழி",

    btn_listen: "கேளுங்கள்",
    btn_stop: "நிறுத்துக",
    btn_copy: "நகலெடு",
    btn_copied: "நகலெடுக்கப்பட்டது!",
    btn_clear: "அழிக்க",
    btn_upload: "பதிவேற்று",
    btn_download: "பதிவிறக்கு",
    btn_sample: "மாதிரி",
    btn_try_now: "இப்போதே முயற்சி செய்க",
    btn_save: "சேமிக்க",
    btn_open_studio: "ஸ்டுடியோ திறக்க",
    btn_edit_studio: "ஸ்டுடியோவில் திருத்துக",
    btn_replay: "மீண்டும் கேட்க",

    hero_badge: "இந்திய மொழிகளுக்கான இயற்கை குரல் தளம் • 12 Indian Languages",
    hero_title_part1: "உங்கள் சொற்களை தாய்மொழியிலேயே",
    hero_title_accent: "இயற்கையாக கேளுங்கள்!",
    hero_subtitle: "படிக்கத் தெரியாதவர்கள், பார்வைக்குறைபாடு உள்ளவர்கள் மற்றும் ஊரக வாசகர்கள் புத்தகங்களையும் கதைகளையும் தாய்மொழியில் எளிதாகக் கேளுங்கள்.",
    hero_btn_studio: "ஸ்டுடியோவில் முயற்சிக்க",
    hero_btn_listen: "குரல் கேட்க",
    hero_pill_free: "100% இலவசம்",
    hero_pill_nologin: "உள்நுழைவு தேவையில்லை",
    hero_pill_access: "எளிய அணுகல்",

    steps_header_tag: "மிகவும் எளிது • Very Simple to Use",
    steps_heading: "3 எளிய படிகளில் உங்கள் மொழியைக் கேளுங்கள்",
    steps_subtitle: "தொழில்நுட்ப அறிவு இல்லாமலும் எவரும் எளிதாகப் பயன்படுத்தலாம்.",
    step1_title: "1. மொழியைத் தேர்வு செய்க",
    step1_desc: "தமிழ், தெலுங்கு, இந்தி உட்பட 12 இந்திய மொழிகளில் உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்.",
    step2_title: "2. எழுதவும் அல்லது புகைப்படம் வைக்கவும்",
    step2_desc: "சொற்களை தட்டச்சு செய்யவும் அல்லது புத்தகப் பக்கத்தை படமெடுத்து வைக்கவும்.",
    step3_title: "3. பெரிய பச்சை பொத்தானை அழுத்தவும்",
    step3_desc: "உங்கள் வரிகள் இனிமையான தாய்மொழிக் குரலில் ஒலிக்கும். பதிவிறக்கமும் செய்யலாம்!",

    tools_header_tag: "சிறப்பு கருவிகள் • Dedicated Tools",
    tools_heading: "ஒவ்வொரு தேவைக்கும் பிரத்யேக பக்கங்கள்",
    tools_subtitle: "ஒரே கிளிக்கில் தேவையான கருவியைப் பயன்படுத்துங்கள்!",
    tool_scan_title: "புத்தக புகைப்பட ஸ்கேனர்",
    tool_scan_desc: "புத்தகம் அல்லது செய்தித்தாளைப் படமெடுத்தால் போதும் — வாணி ஏஐ எழுத்துக்களைப் படித்துக் காட்டும்.",
    tool_upload_title: "பிடிஎஃப் & ஆவணங்கள்",
    tool_upload_desc: "பாடப்புத்தகங்கள் அல்லது கதைகளின் PDF கோப்பைப் பதிவேற்றி முழு ஆடியோபுக்காக மாற்றவும்.",
    tool_stories_title: "நீதிக் கதைகள்",
    tool_stories_desc: "பஞ்சதந்திரம், தெனாலிராமன் கதைகள் தயார் நிலையில் உள்ளன. உடனே கேட்கலாம்!",
    tool_compare_title: "குரல் ஒப்பீட்டுக் கூடம்",
    tool_compare_desc: "இரு வேறு குரல்களை அருகருகே கேட்டு சிறந்த குரலைத் தேர்ந்தெடுக்கவும்.",
    tool_pron_title: "உச்சரிப்பு திருத்தி",
    tool_pron_desc: "வட்டார வழக்கு மற்றும் கடின சொற்களின் உச்சரிப்பை உங்கள் விருப்பப்படி மாற்றியமைக்கவும்.",
    tool_studio_title: "வாணி ஏஐ முதன்மை ஸ்டுடியோ",
    tool_studio_desc: "வேகம், உணர்ச்சி, காரோக்கே வசதிகளுடன் கூடிய முழுமையான ஆடியோ ஸ்டுடியோ.",

    scan_page_badge: "புகைப்பட ஸ்கேனர் • Camera to Voice",
    scan_page_title: "புத்தகத்தை படமெடுத்து கேளுங்கள்!",
    scan_page_desc: "உங்கள் கைபேசி கேமராவால் புத்தகப் பக்கத்தைப் படம் பிடித்தால் போதும் — எழுத்துக்களை இனங்கண்டு தமிழில் வாசிக்கும்.",
    scan_drop_title: "படமெடுக்கவும் அல்லது பதிவேற்றவும்",
    scan_drop_sub: "(PNG, JPG கோப்புகள்)",
    scan_btn_choose: "படம் தேர்வுசெய்க",
    scan_btn_change: "வேறு படம் எடுக்க",
    scan_scanning: "எழுத்துக்கள் கண்டறியப்படுகின்றன...",
    scan_sample_title: "அல்லது மாதிரி புத்தகம் முயல்க:",

    doc_page_badge: "பிடிஎஃப் ஆடியோபுக் • Document Audiobook",
    doc_page_title: "பாடப்புத்தகங்களை ஆடியோபுக்காக மாற்றுங்கள்",
    doc_page_desc: "பள்ளிப் புத்தகங்கள் மற்றும் குறிப்புகளின் PDF/DOCX கோப்புகளைப் பதிவேற்றி இனிய குரலில் கேளுங்கள்.",
    doc_drop_title: "PDF, Word (DOCX) கோப்பை இங்கே இடவும்",
    doc_drop_sub: "புத்தகம் அல்லது குறிப்பு கோப்பைப் பதிவேற்றவும்",
    doc_btn_choose: "கோப்பைத் தேர்வுசெய்க",
    doc_reading: "ஆவணம் வாசிக்கப்படுகிறது...",
    doc_info_title: "கோப்பு விவரம்",
    doc_ready: "தயாராக உள்ளது",
    doc_est_time: "நிமிட உரை",

    story_page_badge: "நீதிக் கதை பெட்டகம் • Audio Stories",
    story_page_title: "பாரம்பரிய நீதிக் கதைகளைக் கேளுங்கள்!",
    story_page_desc: "குழந்தைகளும் முதியவர்களும் விரும்பும் பஞ்சதந்திர கதைகள் பாட்டி குரல் பாணியில்.",
    story_btn_play: "கதை கேட்க",
    story_btn_pause: "நிறுத்த",
    story_moral_label: "கதையின் நீதி:",
    story_more_title: "மேலும் கதைகள்",
    story_more_sub: "எந்தக் கதையையும் சொடுக்கி உடனே தமிழில் கேளுங்கள்",

    compare_page_badge: "குரல் ஒப்பீடு • Voice Comparison",
    compare_page_title: "இரு குரல்களை அருகருகே ஒப்பிடுங்கள்!",
    compare_page_desc: "ஒரே வாக்கியத்தில் இரு குரல்களைக் கேட்டு உங்கள் தேவைக்கு ஏற்ற குரலை முடிவு செய்யுங்கள்.",
    compare_text_label: "ஒப்பீட்டு வாக்கியம்:",
    compare_voice_a: "குரல் 1 (Voice A)",
    compare_voice_b: "குரல் 2 (Voice B)",
    compare_speed: "பேசும் வேகம்:",

    pron_page_badge: "உச்சரிப்பு கூடம் • Pronunciation Tuner",
    pron_page_title: "உங்கள் வட்டார வழக்கிற்கு ஏற்ப உச்சரியுங்கள்!",
    pron_page_desc: "சொற்களின் உச்சரிப்பை மாற்றி சரியான ஒலிப்பை உறுதிப்படுத்தவும்.",
    pron_orig_label: "1. மூலச் சொல்:",
    pron_phon_label: "2. ஒலிக்க வேண்டிய விதம்:",
    pron_btn_orig: "பழைய குரல்",
    pron_btn_new: "புதிய உச்சரிப்பு",
    pron_btn_save: "அகராதியில் சேமிக்க",
    pron_my_rules: "உங்கள் விதிகள்",

    access_page_badge: "எளிய அணுகல் • Inclusive Design",
    access_page_title: "பார்வையற்றோர் மற்றும் அனைவருக்கும் எளிய பயன்பாடு",
    access_page_desc: "பார்வைக் குறைபாடு உடையவர்களும் முதியவர்களும் எளிதாக ஆடியோ வழிகாட்டுதலுடன் பயன்படுத்தலாம்.",
    access_contrast_title: "உயர்-மாறுபட்ட மஞ்சள்/கருப்பு நிறம்",
    access_contrast_desc: "தெளிவான பார்வைக்கு (High-Contrast)",
    access_text_size_title: "எழுத்தின் அளவு (Text Size)",
    access_voice_test_title: "குரல் வழிகாட்டி சோதனை",
    access_btn_voice_test: "குரல் கேட்க",
    access_shortcuts_title: "விசைப்பலகை குறுக்குவழிகள்",

    studio_step1_lang: "1. மொழியைத் தேர்வு செய்க:",
    studio_step2_voice: "2. குரலைத் தேர்வு செய்க:",
    studio_step3_speed: "3. பேசும் வேகம்:",
    studio_step4_emotion: "4. உணர்ச்சி / நடை:",
    studio_tab_type: "எழுதுக",
    studio_tab_file: "கோப்பு",
    studio_tab_photo: "படம்",
    studio_tab_link: "இணைப்பு",
    studio_karaoke_title: "காரோக்கே (சொல்லைத் தொட்டு உச்சரிப்பைத் திருத்தலாம்):",
    studio_waveform_title: "ஒலி அலைகள் / Audio Waveform",
    studio_synthesizing: "குரல் உருவாகிறது..."
  },

  // KANNADA
  kn: {
    nav_studio: "ಸ್ಟುಡಿಯೋ",
    nav_scan: "ಫೋಟೋ ಸ್ಕ್ಯಾನರ್",
    nav_upload: "ಪಿಡಿಎಫ್ ಆಡಿಯೋ",
    nav_stories: "ನೀತಿ ಕಥೆಗಳು",
    nav_tools: "ಸಾಧನಗಳು",
    nav_compare: "ಧ್ವನಿ ಹೋಲಿಕೆ",
    nav_pronunciation: "ಉಚ್ಚಾರಣೆ ಪ್ರಯೋಗಾಲಯ",
    nav_languages: "12 ಭಾಷೆಗಳು",
    nav_voices: "ಧ್ವನಿಗಳು",
    nav_history: "ಇತಿಹಾಸ",
    nav_accessibility: "ಸುಲಭ ಪ್ರವೇಶ",
    nav_tech: "ತಂತ್ರಜ್ಞಾನ",
    nav_about: "ನಮ್ಮ ಬಗ್ಗೆ",
    nav_help: "ಸಹಾಯ",
    nav_speak_btn: "ಮಾತನಾಡಿಸಿ",
    nav_ui_lang: "ಭಾಷೆ",

    btn_listen: "ಆಲಿಸಿ",
    btn_stop: "ನಿಲ್ಲಿಸಿ",
    btn_copy: "ಕಾಪಿ ಮಾಡಿ",
    btn_copied: "ಕಾಪಿಯಾಗಿದೆ!",
    btn_clear: "ಅಳಿಸಿ",
    btn_upload: "ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    btn_download: "ಡೌನ್ಲೋಡ್",
    btn_sample: "ಉದಾಹರಣೆ",
    btn_try_now: "ಈಗಲೇ ಪ್ರಯತ್ನಿಸಿ",
    btn_save: "ಉಳಿಸಿ",
    btn_open_studio: "ಸ್ಟುಡಿಯೋ ತೆರೆಯಿರಿ",
    btn_edit_studio: "ಸ್ಟುಡಿಯೋದಲ್ಲಿ ತಿದ್ದಿ",
    btn_replay: "ಮತ್ತೆ ಆಲಿಸಿ",

    hero_badge: "ಭಾರತೀಯ ಭಾಷೆಗಳ ನೈಸರ್ಗಿಕ ಧ್ವನಿ ವೇದಿಕೆ • 12 Indian Languages",
    hero_title_part1: "ನಿಮ್ಮ ಮಾತುಗಳನ್ನು ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ",
    hero_title_accent: "ಸ್ವಾಭಾವಿಕವಾಗಿ ಆಲಿಸಿ!",
    hero_subtitle: "ಓದಲು ಬಾರದಿದ್ದರೂ, ದೃಷ್ಟಿ ದೋಷವಿದ್ದರೂ ಪುಸ್ತಕಗಳು ಹಾಗೂ ಕಥೆಗಳನ್ನು ಸುಲಭವಾಗಿ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಆಲಿಸಿ.",
    hero_btn_studio: "ಸ್ಟುಡಿಯೋದಲ್ಲಿ ಪ್ರಯತ್ನಿಸಿ",
    hero_btn_listen: "ಧ್ವನಿ ಕೇಳಿ",
    hero_pill_free: "100% ಉಚಿತ",
    hero_pill_nologin: "ಲಾಗಿನ್ ಅಗತ್ಯವಿಲ್ಲ",
    hero_pill_access: "ಸುಲಭ ಪ್ರವೇಶ",

    steps_header_tag: "ಬಹಳ ಸರಳ • Very Simple to Use",
    steps_heading: "ಕೇವಲ 3 ಹಂತಗಳಲ್ಲಿ ನಿಮ್ಮ ಭಾಷೆ ಆಲಿಸಿ",
    steps_subtitle: "ಯಾವುದೇ ತಾಂತ್ರಿಕ ಜ್ಞಾನವಿಲ್ಲದೆಯೂ ಯಾರು ಬೇಕಾದರೂ ಬಳಸಬಹುದು.",
    step1_title: "1. ನಿಮ್ಮ ಭಾಷೆ ಆರಿಸಿ",
    step1_desc: "ಕನ್ನಡ, ತೆಲುಗು, ಹಿಂದಿ ಸೇರಿದಂತೆ 12 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ನಿಮ್ಮ ಭಾಷೆ ಆರಿಸಿ.",
    step2_title: "2. ಬರೆಯಿರಿ ಅಥವಾ ಫೋಟೋ ಇಡಿ",
    step2_desc: "ಪದಗಳನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಪುಸ್ತಕದ ಪುಟದ ಫೋಟೋ ಹಾಕಿ.",
    step3_title: "3. ದೊಡ್ಡ ಹಸಿರು ಬಟನ್ ಒತ್ತಿ",
    step3_desc: "ನಿಮ್ಮ ಬರಹವು ಸ್ಪಷ್ಟ ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿಸುತ್ತದೆ. ಡೌನ್‌ಲೋಡ್ ಕೂಡ ಮಾಡಿಕೊಳ್ಳಬಹುದು!",

    tools_header_tag: "ವಿಶೇಷ ಸಾಧನಗಳು • Dedicated Tools",
    tools_heading: "ಪ್ರತಿಯೊಂದು ಅಗತ್ಯಕ್ಕೂ ಪ್ರತ್ಯೇಕ ಪುಟಗಳು",
    tools_subtitle: "ಕೇವಲ ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಬೇಕಾದ ಸೌಲಭ್ಯ ಬಳಸಿ!",
    tool_scan_title: "ಪುಸ್ತಕ ಫೋಟೋ ಸ್ಕ್ಯಾನರ್",
    tool_scan_desc: "ಪುಸ್ತಕದ ಪುಟ ಫೋಟೋ ತೆಗೆದರೆ ಸಾಕು — ವಾಣಿ ಎಐ ಅಕ್ಷರಗಳನ್ನು ಓದಿ ಹೇಳುತ್ತದೆ.",
    tool_upload_title: "ಪಿಡಿಎಫ್ ಮತ್ತು ದಾಖಲೆಗಳು",
    tool_upload_desc: "ಪುಸ್ತಕಗಳ PDF ಅಪ್ಲೋಡ್ ಮಾಡಿ ನಿರಂತರ ಆಡಿಯೋಬುಕ್ ಆಗಿ ಪರಿವರ್ತಿಸಿ.",
    tool_stories_title: "ಪ್ರಾದೇಶಿಕ ನೀತಿ ಕಥೆಗಳು",
    tool_stories_desc: "ಮಕ್ಕಳಿಗಾಗಿ ಪಂಚತಂತ್ರ ಹಾಗೂ ತೆನಾಲಿ ರಾಮಕೃಷ್ಣನ ಕಥೆಗಳು ಸಿದ್ಧವಾಗಿವೆ.",
    tool_compare_title: "ಧ್ವನಿ ಹೋಲಿಕೆ ಲ್ಯಾಬ್",
    tool_compare_desc: "ಇಬ್ಬರು ವಾಚಕರ ಧ್ವನಿಯನ್ನು ಪಕ್ಕಪಕ್ಕದಲ್ಲಿ ಹೋಲಿಸಿ ಉತ್ತಮ ಧ್ವನಿ ಆರಿಸಿ.",
    tool_pron_title: "ಉಚ್ಚಾರಣೆ ತಿದ್ದುವ ಸಾಧನ",
    tool_pron_desc: "ಸ್ಥಳೀಯ ಉಪಭಾಷೆಯಂತೆ ಉಚ್ಚಾರಣೆ ತಿದ್ದಲು ನಿಯಮಗಳನ್ನು ರೂಪಿಸಿ.",
    tool_studio_title: "ವಾಣಿ ಎಐ ಮುಖ್ಯ ಸ್ಟುಡಿಯೋ",
    tool_studio_desc: "ವೇಗ, ಭಾವನೆ ಮತ್ತು ಕ್ಯಾರಿಯೋಕೆ ಹೊಂದಿರುವ ಸಂಪೂರ್ಣ ಆಡಿಯೋ ಸ್ಟುಡಿಯೋ.",

    scan_page_badge: "ಫೋಟೋ ಸ್ಕ್ಯಾನರ್ • Camera to Voice",
    scan_page_title: "ಪುಸ್ತಕದ ಫೋಟೋ ತೆಗೆದು ಆಲಿಸಿ!",
    scan_page_desc: "ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾದಿಂದ ಪುಸ್ತಕದ ಪುಟ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ — ವಾಣಿ ಎಐ ತಕ್ಷಣವೇ ಕನ್ನಡದಲ್ಲಿ ಓದುತ್ತದೆ.",
    scan_drop_title: "ಪುಸ್ತಕದ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    scan_drop_sub: "(PNG, JPG ಫೋಟೋ)",
    scan_btn_choose: "ಫೋಟೋ ಆರಿಸಿ",
    scan_btn_change: "ಮತ್ತೊಂದು ಫೋಟೋ",
    scan_scanning: "ಅಕ್ಷರಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...",
    scan_sample_title: "ಅಥವಾ ಮಾದರಿ ಪುಸ್ತಕ ನೋಡಿ:",

    doc_page_badge: "ಪಿಡಿಎಫ್ ಆಡಿಯೋಬುಕ್ • Document Audiobook",
    doc_page_title: "ಪಠ್ಯಪುಸ್ತಕಗಳನ್ನು ಆಡಿಯೋಬುಕ್ ಆಗಿ ಪರಿವರ್ತಿಸಿ",
    doc_page_desc: "ಶಾಲಾ ಪುಸ್ತಕಗಳ PDF/DOCX ಫೈಲ್ ಹಾಕಿ ಸುಂದರ ಧ್ವನಿಯಲ್ಲಿ ಆಲಿಸಿ.",
    doc_drop_title: "PDF, Word (DOCX) ಫೈಲ್ ಇಲ್ಲಿ ಇಡಿ",
    doc_drop_sub: "ಪುಸ್ತಕದ ಫೈಲ್ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    doc_btn_choose: "ಫೈಲ್ ಆರಿಸಿ",
    doc_reading: "ದಾಖಲೆ ಓದಲಾಗುತ್ತಿದೆ...",
    doc_info_title: "ದಾಖಲೆಯ ವಿವರ",
    doc_ready: "ಸಿದ್ಧವಾಗಿದೆ",
    doc_est_time: "ನಿಮಿಷಗಳ ಮಾತು",

    story_page_badge: "ನೀತಿ ಕಥೆಗಳ ಭಂಡಾರ • Audio Stories",
    story_page_title: "ನಮ್ಮ ಭಾರತೀಯ ನೀತಿ ಕಥೆಗಳನ್ನು ಆಲಿಸಿ!",
    story_page_desc: "ಪಂಚತಂತ್ರ, ತೆನಾಲಿ ರಾಮಕೃಷ್ಣನ ಕಥೆಗಳು ಅಜ್ಜಿ ಹೇಳಿದ ಶೈಲಿಯಲ್ಲಿ.",
    story_btn_play: "ಕಥೆ ಆಲಿಸಿ",
    story_btn_pause: "ನಿಲ್ಲಿಸಿ",
    story_moral_label: "ಕಥೆಯ ನೀತಿ:",
    story_more_title: "ಇನ್ನಷ್ಟು ಕಥೆಗಳು",
    story_more_sub: "ಯಾವುದೇ ಕಥೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ ತಕ್ಷಣ ಆಲಿಸಿ",

    compare_page_badge: "ಧ್ವನಿ ಹೋಲಿಕೆ • Voice Comparison",
    compare_page_title: "ಇಬ್ಬರು ವಾಚಕರ ಧ್ವನಿಯನ್ನು ಹೋಲಿಸಿ!",
    compare_page_desc: "ಒಂದೇ ವಾಕ್ಯವನ್ನು ಇಬ್ಬರ ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ ನಿಮ್ಮ ಇಷ್ಟದ ಧ್ವನಿ ಆರಿಸಿಕೊಳ್ಳಿ.",
    compare_text_label: "ಹೋಲಿಕೆಯ ವಾಕ್ಯ:",
    compare_voice_a: "ಧ್ವನಿ 1 (Voice A)",
    compare_voice_b: "ಧ್ವನಿ 2 (Voice B)",
    compare_speed: "ಮಾತಿನ ವೇಗ:",

    pron_page_badge: "ಉಚ್ಚಾರಣೆ ಲ್ಯಾಬ್ • Pronunciation Tuner",
    pron_page_title: "ನಿಮ್ಮ ಪ್ರಾದೇಶಿಕ ಶೈಲಿಯಂತೆ ಉಚ್ಚಾರಣೆ ಸರಿಪಡಿಸಿ!",
    pron_page_desc: "ಕಷ್ಟದ ಪದಗಳ ಉಚ್ಚಾರಣೆಯನ್ನು ತಿದ್ದಿ ಹೊಸ ಧ್ವನಿಯನ್ನು ಪರೀಕ್ಷಿಸಿ.",
    pron_orig_label: "1. ಮೂಲ ಪದ:",
    pron_phon_label: "2. ಉಚ್ಚರಿಸಬೇಕಾದ ಬಗೆ:",
    pron_btn_orig: "ಮೂಲ ಧ್ವನಿ",
    pron_btn_new: "ಹೊಸ ಉಚ್ಚಾರಣೆ",
    pron_btn_save: "ಉಳಿಸಿ",
    pron_my_rules: "ನಿಮ್ಮ ನಿಯಮಗಳು",

    access_page_badge: "ಸುಲಭ ಪ್ರವೇಶ • Inclusive Design",
    access_page_title: "ದೃಷ್ಟಿಹೀನರಿಗೆ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಸುಲಭ ಬಳಕೆ",
    access_page_desc: "ದೃಷ್ಟಿ ದೋಷವಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು ಹಾಗೂ ಹಿರಿಯ ನಾಗರಿಕರಿಗಾಗಿ ಸುಲಭ ಧ್ವನಿ ಸೌಲಭ್ಯ.",
    access_contrast_title: "ಹೈ-ಕಾಂಟ್ರಾಸ್ಟ್ ಕಪ್ಪು/ಹಳದಿ ಥೀಮ್",
    access_contrast_desc: "ಸ್ಪಷ್ಟ ದೃಷ್ಟಿಗಾಗಿ (High-Contrast)",
    access_text_size_title: "ಅಕ್ಷರಗಳ ಗಾತ್ರ (Text Size)",
    access_voice_test_title: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಪರೀಕ್ಷಿಸಿ",
    access_btn_voice_test: "ಧ್ವನಿ ಕೇಳಿ",
    access_shortcuts_title: "ಕೀಬೋರ್ಡ್ ಶಾರ್ಟ್‌ಕಟ್‌ಗಳು",

    studio_step1_lang: "1. ನಿಮ್ಮ ಭಾಷೆ ಆರಿಸಿ:",
    studio_step2_voice: "2. ಧ್ವನಿ ಆರಿಸಿ:",
    studio_step3_speed: "3. ಮಾತಿನ ವೇಗ:",
    studio_step4_emotion: "4. ಭಾವನೆ / ಶೈಲಿ:",
    studio_tab_type: "ಬರೆಯಿರಿ",
    studio_tab_file: "ಫೈಲ್",
    studio_tab_photo: "ಫೋಟೋ",
    studio_tab_link: "ಲಿಂಕ್",
    studio_karaoke_title: "ಕ್ಯಾರಿಯೋಕೆ (ಪದದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ ತಿದ್ದಿ):",
    studio_waveform_title: "ಧ್ವನಿ ತರಂಗಗಳು / Audio Waveform",
    studio_synthesizing: "ಧ್ವನಿ ಸಿದ್ಧವಾಗುತ್ತಿದೆ..."
  },

  // MALAYALAM
  ml: {
    nav_studio: "സ്റ്റുഡിയോ",
    nav_scan: "ഫോട്ടോ സ്കാനർ",
    nav_upload: "പിഡിഎഫ് ഓഡിയോ",
    nav_stories: "കഥകൾ",
    nav_tools: "സവിശേഷതകൾ",
    nav_compare: "ശബ്ദ താരതമ്യം",
    nav_pronunciation: "ഉച്ചാരണ ലാബ്",
    nav_languages: "12 ഭാഷകൾ",
    nav_voices: "ശബ്ദങ്ങൾ",
    nav_history: "ചരിത്രം",
    nav_accessibility: "ലളിതമായ പ്രവേശനം",
    nav_tech: "സാങ്കേതികവിദ്യ",
    nav_about: "ഞങ്ങളെക്കുറിച്ച്",
    nav_help: "സഹായം",
    nav_speak_btn: "കേൾക്കൂ",
    nav_ui_lang: "ഭാഷ",

    btn_listen: "കേൾക്കൂ",
    btn_stop: "നിർത്തൂ",
    btn_copy: "പകർത്തൂ",
    btn_copied: "പകർത്തി!",
    btn_clear: "മായ്ക്കൂ",
    btn_upload: "അപ്‌ലോഡ് ചെയ്യൂ",
    btn_download: "ഡൗൺലോഡ്",
    btn_sample: "ഉദാഹരണം",
    btn_try_now: "ഇപ്പോൾ പരീക്ഷിക്കൂ",
    btn_save: "സൂക്ഷിക്കുക",
    btn_open_studio: "സ്റ്റുഡിയോ തുറക്കൂ",
    btn_edit_studio: "സ്റ്റുഡിയോയിൽ തിരുത്തൂ",
    btn_replay: "വീണ്ടും കേൾക്കൂ",

    hero_badge: "ഇന്ത്യൻ പ്രാദേശിക ഭാഷാ ശബ്ദ പ്ലാറ്റ്ഫോം • 12 Indian Languages",
    hero_title_part1: "നിങ്ങളുടെ വാക്കുകൾ നിങ്ങളുടെ മാതൃഭാഷയിൽ",
    hero_title_accent: "സ്വാഭാവികമായി കേൾക്കൂ!",
    hero_subtitle: "വായിക്കാൻ പ്രയാസമുള്ളവർക്കും കാഴ്ചപരിമിതർക്കും പുസ്തകങ്ങളും വാർത്തകളും സ്വന്തം മാതൃഭാഷയിൽ ലളിതമായി കേൾക്കാം.",
    hero_btn_studio: "സ്റ്റുഡിയോയിൽ ശ്രമിക്കൂ",
    hero_btn_listen: "ശബ്ദം കേൾക്കൂ",
    hero_pill_free: "100% സൗജന്യം",
    hero_pill_nologin: "ലോഗിൻ ആവശ്യമില്ല",
    hero_pill_access: "ലളിതമായ പ്രവേശനം",

    steps_header_tag: "വളരെ ലളിതം • Very Simple to Use",
    steps_heading: "3 ലളിതമായ ഘട്ടങ്ങളിൽ ഭാഷ കേൾക്കൂ",
    steps_subtitle: "സാങ്കേതിക പരിജ്ഞാനമില്ലാതെ ആർക്കും എളുപ്പത്തിൽ ഉപയോഗിക്കാം.",
    step1_title: "1. ഭാഷ തിരഞ്ഞെടുക്കൂ",
    step1_desc: "മലയാളം, തെലുങ്ക്, ഹിന്ദി ഉൾപ്പെടെ 12 ഭാഷകളിൽ ഒന്ന് തിരഞ്ഞെടുക്കൂ.",
    step2_title: "2. എഴുതുകയോ ഫോട്ടോ നൽകുകയോ ചെയ്യുക",
    step2_desc: "വാക്കുകൾ ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ പുസ്തക പേജിന്റെ ഫോട്ടോ നൽകുക.",
    step3_title: "3. പച്ച ബട്ടൺ അമർത്തൂ",
    step3_desc: "നിങ്ങളുടെ വാചകങ്ങൾ മനോഹരമായ ശബ്ദത്തിൽ കേൾക്കാം!",

    tools_header_tag: "പ്രത്യേക സൗകര്യങ്ങൾ • Dedicated Tools",
    tools_heading: "ഓരോ ആവശ്യത്തിനും പ്രത്യേക പേജുകൾ",
    tools_subtitle: "ഒറ്റ ക്ലിക്കിൽ ഇഷ്ടമുള്ള ഉപകരണം ഉപയോഗിക്കൂ!",
    tool_scan_title: "പുസ്തക ഫോട്ടോ സ്കാനർ",
    tool_scan_desc: "ഏതെങ്കിലും പുസ്തകത്തിന്റെ ഫോട്ടോ എടുത്താൽ വാണി എഐ അത് വായിച്ചു കേൾപ്പിക്കും.",
    tool_upload_title: "പിഡിഎഫ് & രേഖകൾ",
    tool_upload_desc: "പാഠപുസ്തകങ്ങളുടെ PDF അപ്‌ലോഡ് ചെയ്ത് പൂർണ്ണ ഓഡിയോബുക്ക് ആക്കൂ.",
    tool_stories_title: "പഞ്ചതന്ത്ര കഥകൾ",
    tool_stories_desc: "കുട്ടികൾക്കായി പഞ്ചതന്ത്രം, തെനാലിരാമൻ കഥകൾ തയ്യാറാണ്.",
    tool_compare_title: "ശബ്ദ താരതമ്യ ലാബ്",
    tool_compare_desc: "രണ്ട് വ്യത്യസ്ത ശബ്ദങ്ങൾ കേട്ട് ഏറ്റവും അനുയോജ്യമായത് തിരഞ്ഞെടുക്കൂ.",
    tool_pron_title: "ഉച്ചാരണ തിരുത്തൽ",
    tool_pron_desc: "പ്രാദേശിക ശൈലിക്ക് അനുസരിച്ച് വാക്കുകളുടെ ഉച്ചാരണം മാറ്റാം.",
    tool_studio_title: "വാണി എഐ സ്റ്റുഡിയോ",
    tool_studio_desc: "വേഗത, ഭാവം, കരോക്കെ എന്നിവയുള്ള പൂർണ്ണ ഓഡിയോ സ്റ്റുഡിയോ.",

    scan_page_badge: "ഫോട്ടോ സ്കാനർ • Camera to Voice",
    scan_page_title: "പുസ്തകത്തിന്റെ ഫോട്ടോ എടുത്ത് കേൾക്കൂ!",
    scan_page_desc: "ഫോൺ ക്യാമറ ഉപയോഗിച്ച് പുസ്തകം സ്കാൻ ചെയ്യൂ — മലയാളത്തിൽ വ്യക്തമായി കേൾക്കാം.",
    scan_drop_title: "ഫോട്ടോ എടുക്കുകയോ അപ്‌ലോഡ് ചെയ്യുകയോ ചെയ്യുക",
    scan_drop_sub: "(PNG, JPG ഫയലുകൾ)",
    scan_btn_choose: "ഫോട്ടോ തിരഞ്ഞെടുക്കൂ",
    scan_btn_change: "മറ്റൊരു ഫോട്ടോ",
    scan_scanning: "അക്ഷരങ്ങൾ വായിക്കുന്നു...",
    scan_sample_title: "മാതൃകാ പുസ്തകം പരീക്ഷിക്കൂ:",

    doc_page_badge: "പിഡിഎഫ് ഓഡിയോ • Document Audiobook",
    doc_page_title: "പാഠപുസ്തകങ്ങളെ ഓഡിയോബുക്ക് ആക്കൂ",
    doc_page_desc: "സ്കൂൾ പുസ്തകങ്ങളുടെ PDF/DOCX ഫയൽ നൽകി സ്വാഭാവിക ശബ്ദത്തിൽ കേൾക്കൂ.",
    doc_drop_title: "PDF, Word ഫയൽ ഇവിടെ നൽകുക",
    doc_drop_sub: "പുസ്തകത്തിന്റെ ഫയൽ അപ്‌ലോഡ് ചെയ്യുക",
    doc_btn_choose: "ഫയൽ തിരഞ്ഞെടുക്കൂ",
    doc_reading: "രേഖ വായിക്കുന്നു...",
    doc_info_title: "വിവരങ്ങൾ",
    doc_ready: "തയ്യാറാണ്",
    doc_est_time: "മിനിറ്റ് പ്രസംഗം",

    story_page_badge: "കഥാ സമാഹാരം • Audio Stories",
    story_page_title: "ഭാരതീയ ഗുണപാഠ കഥകൾ കേൾക്കൂ!",
    story_page_desc: "കുട്ടികൾക്കും മുതിർന്നവർക്കും ഒരുപോലെ ആസ്വദിക്കാൻ പറ്റിയ പഞ്ചതന്ത്ര കഥകൾ.",
    story_btn_play: "കഥ കേൾക്കൂ",
    story_btn_pause: "നിർത്തൂ",
    story_moral_label: "ഗുണപാഠം:",
    story_more_title: "കൂടുതൽ കഥകൾ",
    story_more_sub: "ഏത് കഥയും ക്ലിക്ക് ചെയ്ത് മലയാളത്തിൽ ആസ്വദിക്കൂ",

    compare_page_badge: "ശബ്ദ താരതമ്യം • Voice Comparison",
    compare_page_title: "രണ്ട് ശബ്ദങ്ങൾ താരതമ്യം ചെയ്യൂ!",
    compare_page_desc: "ഒരേ വാചകത്തിൽ രണ്ട് ശബ്ദങ്ങൾ കേട്ട് മികച്ചത് കണ്ടെത്തൂ.",
    compare_text_label: "വാചകം:",
    compare_voice_a: "ശബ്ദം 1 (Voice A)",
    compare_voice_b: "ശബ്ദം 2 (Voice B)",
    compare_speed: "വേഗത:",

    pron_page_badge: "ഉച്ചാരണ ലാബ് • Pronunciation Tuner",
    pron_page_title: "നിങ്ങളുടെ പ്രാദേശിക ശൈലിയിൽ ഉച്ചരിക്കൂ!",
    pron_page_desc: "കഠിനമായ വാക്കുകളുടെ ഉച്ചാരണം കൃത്യമായി ക്രമീകരിക്കൂ.",
    pron_orig_label: "1. മൂല വാക്ക്:",
    pron_phon_label: "2. ഉച്ചരിക്കേണ്ട വിധം:",
    pron_btn_orig: "പഴയ ശബ്ദം",
    pron_btn_new: "പുതിയ ഉച്ചാരണം",
    pron_btn_save: "സൂക്ഷിക്കുക",
    pron_my_rules: "നിങ്ങളുടെ നിയമങ്ങൾ",

    access_page_badge: "ലളിതമായ പ്രവേശനം • Inclusive Design",
    access_page_title: "കാഴ്ചപരിമിതർക്കും എല്ലാവർക്കും ലളിതം",
    access_page_desc: "ശബ്ദ സഹായത്തോടെ എളുപ്പത്തിൽ ഉപയോഗിക്കാൻ സാധിക്കുന്ന സംവിധാനം.",
    access_contrast_title: "ഹൈ-കോൺട്രാസ്റ്റ് മഞ്ഞ/കറുപ്പ് തീം",
    access_contrast_desc: "വ്യക്തതയ്ക്കായി (High-Contrast)",
    access_text_size_title: "അക്ഷര വലിപ്പം (Text Size)",
    access_voice_test_title: "ശബ്ദ നിർദ്ദേശം പരീക്ഷിക്കൂ",
    access_btn_voice_test: "ശബ്ദം കേൾക്കൂ",
    access_shortcuts_title: "കീബോർഡ് കുറുക്കുവഴികൾ",

    studio_step1_lang: "1. ഭാഷ തിരഞ്ഞെടുക്കൂ:",
    studio_step2_voice: "2. ശബ്ദം തിരഞ്ഞെടുക്കൂ:",
    studio_step3_speed: "3. സംസാരിക്കുന്ന വേഗത:",
    studio_step4_emotion: "4. ഭാവം / ശൈലി:",
    studio_tab_type: "എഴുതൂ",
    studio_tab_file: "ഫയൽ",
    studio_tab_photo: "ഫോട്ടോ",
    studio_tab_link: "ലിങ്ക്",
    studio_karaoke_title: "കരോക്കെ (വാക്കിൽ ക്ലിക്ക് ചെയ്ത് തിരുത്താം):",
    studio_waveform_title: "ശബ്ദ തരംഗങ്ങൾ / Audio Waveform",
    studio_synthesizing: "ശബ്ദം ഉണ്ടാക്കുന്നു..."
  },

  // BENGALI
  bn: {
    nav_studio: "স্টুডিও",
    nav_scan: "ফটো স্ক্যানার",
    nav_upload: "পিডিএফ অডিও",
    nav_stories: "গল্পগুচ্ছ",
    nav_tools: "টুলস",
    nav_compare: "কণ্ঠ তুলনা",
    nav_pronunciation: "উচ্চারণ ল্যাব",
    nav_languages: "১২টি ভাষা",
    nav_voices: "কণ্ঠস্বর",
    nav_history: "ইতিহাস",
    nav_accessibility: "সহজ অ্যাক্সেস",
    nav_tech: "প্রযুক্তি",
    nav_about: "আমাদের কথা",
    nav_help: "সাহায্য",
    nav_speak_btn: "শুনুন",
    nav_ui_lang: "ভাষা",

    btn_listen: "শুনুন",
    btn_stop: "থামান",
    btn_copy: "কপি করুন",
    btn_copied: "কপি হয়েছে!",
    btn_clear: "মুছুন",
    btn_upload: "আপলোড",
    btn_download: "ডাউনলোড",
    btn_sample: "নমুনা",
    btn_try_now: "এখনই দেখুন",
    btn_save: "সংরক্ষণ",
    btn_open_studio: "স্টুডিও খুলুন",
    btn_edit_studio: "স্টুডিওতে এডিট",
    btn_replay: "পুনরায় শুনুন",

    hero_badge: "ভারতীয় আঞ্চলিক ভাষার স্বাভাবিক কণ্ঠস্বর মঞ্চ • 12 Indian Languages",
    hero_title_part1: "আপনার মনের কথা নিজের ভাষাতেই",
    hero_title_accent: "স্বাভাবিকভাবে শুনুন!",
    hero_subtitle: "পড়তে অসুবিধা হলে বা দৃষ্টিশক্তি কম হলেও — বই, গল্প ও সংবাদ মাতৃভাষায় স্পষ্ট কণ্ঠে শুনুন।",
    hero_btn_studio: "স্টুডিওতে চেষ্টা করুন",
    hero_btn_listen: "কণ্ঠস্বর শুনুন",
    hero_pill_free: "১০০% বিনামূল্যে",
    hero_pill_nologin: "লগইনের দরকার নেই",
    hero_pill_access: "সহজ অ্যাক্সেস",

    steps_header_tag: "খুবই সহজ • Very Simple to Use",
    steps_heading: "মাত্র ৩টি ধাপে নিজের ভাষায় শুনুন",
    steps_subtitle: "কোনো প্রযুক্তিগত জ্ঞান ছাড়াই যে কেউ সহজে ব্যবহার করতে পারেন।",
    step1_title: "১. নিজের ভাষা বেছে নিন",
    step1_desc: "বাংলা, হিন্দি, তেলুগু সহ ১২টি ভারতীয় ভাষার মধ্যে বেছে নিন।",
    step2_title: "২. লিখুন বা ছবি দিন",
    step2_desc: "শব্দ টাইপ করুন অথবা বইয়ের পাতার ছবি দিন।",
    step3_title: "৩. সবুজ বোতাম চাপুন",
    step3_desc: "মুহূর্তের মধ্যে নিজের মাতৃভাষায় মিষ্টি কণ্ঠে শুনুন!",

    tools_header_tag: "বিশেষ ফিচার • Dedicated Tools",
    tools_heading: "প্রতিটি প্রয়োজনের জন্য আলাদা সহজ পেজ",
    tools_subtitle: "একটি ক্লিকেই পছন্দের টুল ব্যবহার করুন!",
    tool_scan_title: "বইয়ের ফটো স্ক্যানার",
    tool_scan_desc: "বই বা খবরের কাগজের ছবি তুলুন — বাণী এআই বাংলায় পড়ে শোনাবে।",
    tool_upload_title: "পিডিএফ ও নথি",
    tool_upload_desc: "বইয়ের PDF আপলোড করে নিরবচ্ছিন্ন অডিওবুক তৈরি করুন।",
    tool_stories_title: "আঞ্চলিক নীতি গল্প",
    tool_stories_desc: "বাচ্চা ও বড়দের জন্য পঞ্চতন্ত্র ও শিক্ষণীয় গল্পের সংগ্রহ।",
    tool_compare_title: "কণ্ঠ তুলনা ল্যাব",
    tool_compare_desc: "দুটি কণ্ঠ পাশাপাশি শুনে সেরা কণ্ঠটি বেছে নিন।",
    tool_pron_title: "উচ্চারণ সংশোধনকারী",
    tool_pron_desc: "স্থানীয় টান বা কঠিন শব্দের সঠিক উচ্চারণ নির্ধারণ করুন।",
    tool_studio_title: "বাণী এআই প্রধান স্টুডিও",
    tool_studio_desc: "গতি, আবেগ, কারাওকে সম্বলিত সম্পূর্ণ অডিও স্টুডিও।",

    scan_page_badge: "ফটো স্ক্যানার • Camera to Voice",
    scan_page_title: "বইয়ের ছবি তুলে শুনে নিন!",
    scan_page_desc: "ফোনের ক্যামেরা দিয়ে বইয়ের পাতা স্ক্যান করুন — বাণী এআই বাংলায় পড়ে শোনাবে।",
    scan_drop_title: "ছবি তুলুন বা আপলোড করুন",
    scan_drop_sub: "(PNG, JPG ফরম্যাট)",
    scan_btn_choose: "ছবি নির্বাচন করুন",
    scan_btn_change: "অন্য ছবি",
    scan_scanning: "অক্ষর চেনা হচ্ছে...",
    scan_sample_title: "অথবা নমুনা দেখুন:",

    doc_page_badge: "পিডিএফ অডিওবুক • Document Audiobook",
    doc_page_title: "পাঠ্যবইকে অডিওবুকে রূপান্তর করুন",
    doc_page_desc: "স্কুলের বই বা নোটের PDF আপলোড করে স্পষ্ট কণ্ঠে শুনুন।",
    doc_drop_title: "PDF বা Word ফাইল এখানে রাখুন",
    doc_drop_sub: "বইয়ের ফাইল আপলোড করুন",
    doc_btn_choose: "ফাইল নির্বাচন",
    doc_reading: "নথি পড়া হচ্ছে...",
    doc_info_title: "ফাইলের বিবরণ",
    doc_ready: "প্রস্তুত",
    doc_est_time: "মিনিটের বক্তব্য",

    story_page_badge: "গল্পের ভান্ডার • Audio Stories",
    story_page_title: "ভারতীয় নীতি গল্প শুনুন!",
    story_page_desc: "পঞ্চতন্ত্র ও ঈশপের গল্প ঠাকুরমার মিষ্টি কণ্ঠে শুনুন।",
    story_btn_play: "গল্প শুনুন",
    story_btn_pause: "থামান",
    story_moral_label: "গল্পের শিক্ষা:",
    story_more_title: "আরও গল্প",
    story_more_sub: "যেকোনো গল্পে ক্লিক করে বাংলায় শুনুন",

    compare_page_badge: "কণ্ঠ তুলনা • Voice Comparison",
    compare_page_title: "দুটি কণ্ঠস্বর পাশাপাশি মিলিয়ে দেখুন!",
    compare_page_desc: "একই বাক্যে দুটি ভিন্ন কণ্ঠ শুনে সেরাটি বেছে নিন।",
    compare_text_label: "তুলনার বাক্য:",
    compare_voice_a: "কণ্ঠ ১ (Voice A)",
    compare_voice_b: "কণ্ঠ ২ (Voice B)",
    compare_speed: "গতি:",

    pron_page_badge: "উচ্চারণ ল্যাব • Pronunciation Tuner",
    pron_page_title: "নিজের আঞ্চলিক উচ্চারণে সাজিয়ে নিন!",
    pron_page_desc: "কঠিন শব্দের উচ্চারণ নিজের মতো করে পরিবর্তন করুন।",
    pron_orig_label: "১. মূল শব্দ:",
    pron_phon_label: "২. যেভাবে বলতে হবে:",
    pron_btn_orig: "পুরনো কণ্ঠ",
    pron_btn_new: "নতুন উচ্চারণ",
    pron_btn_save: "সংরক্ষণ করুন",
    pron_my_rules: "আপনার নিয়মাবলী",

    access_page_badge: "সহজ অ্যাক্সেস • Inclusive Design",
    access_page_title: "দৃষ্টিহীন ও সকল পাঠকের জন্য অত্যন্ত সহজ",
    access_page_desc: "অডিও সহায়তা ও বড় হরফের মাধ্যমে সহজে ব্যবহারযোগ্য।",
    access_contrast_title: "উচ্চ-কন্ট্রাস্ট হলুদ/কালো থিম",
    access_contrast_desc: "স্পষ্ট দেখার জন্য (High-Contrast)",
    access_text_size_title: "হরফের আকার (Text Size)",
    access_voice_test_title: "কণ্ঠ সহায়তার পরীক্ষা",
    access_btn_voice_test: "কণ্ঠ শুনুন",
    access_shortcuts_title: "কীবোর্ড শর্টকাট",

    studio_step1_lang: "১. ভাষা বেছে নিন:",
    studio_step2_voice: "২. কণ্ঠস্বর বাছুন:",
    studio_step3_speed: "৩. বলার গতি:",
    studio_step4_emotion: "৪. ভাব / ভঙ্গি:",
    studio_tab_type: "লিখুন",
    studio_tab_file: "ফাইল",
    studio_tab_photo: "ছবি",
    studio_tab_link: "লিঙ্ক",
    studio_karaoke_title: "কারাওকে (শব্দে ক্লিক করে উচ্চারণ ঠিক করুন):",
    studio_waveform_title: "শব্দ তরঙ্গ / Audio Waveform",
    studio_synthesizing: "কণ্ঠ তৈরি হচ্ছে..."
  },

  // MARATHI
  mr: {
    nav_studio: "स्टୁडिओ",
    nav_scan: "फोटो स्कॅनर",
    nav_upload: "पीडीएफ ऑडिओ",
    nav_stories: "बोधकथा",
    nav_tools: "साधने",
    nav_compare: "आवाज तुलना",
    nav_pronunciation: "उच्चार प्रयोगशाळा",
    nav_languages: "१२ भाषा",
    nav_voices: "आवाज",
    nav_history: "इतिहास",
    nav_accessibility: "सुलभ वापर",
    nav_tech: "तंत्रज्ञान",
    nav_about: "आमच्याविषयी",
    nav_help: "मदत",
    nav_speak_btn: "ऐका",
    nav_ui_lang: "भाषा",

    btn_listen: "ऐका",
    btn_stop: "थांबवा",
    btn_copy: "कॉपी करा",
    btn_copied: "कॉपी झाले!",
    btn_clear: "साफ करा",
    btn_upload: "अपलोड",
    btn_download: "डाउनलोड",
    btn_sample: "नमुना",
    btn_try_now: "आता वापरून पहा",
    btn_save: "जतन करा",
    btn_open_studio: "स्टुडिओ उघडा",
    btn_edit_studio: "स्टुडिओमध्ये बदला",
    btn_replay: "पुन्हा ऐका",

    hero_badge: "भारतीय प्रादेशिक भाषांचा नैसर्गिक आवाज मंच • 12 Indian Languages",
    hero_title_part1: "तुमचे विचार तुमच्या स्वतःच्या भाषेत",
    hero_title_accent: "सहजपणे ऐका!",
    hero_subtitle: "वाचता येत नसेल किंवा दृष्टी कमी असेल तरीही पुस्तके, कथा आणि बातम्या मातृभाषेत ऐका.",
    hero_btn_studio: "स्टुडिओमध्ये पहा",
    hero_btn_listen: "आवाज ऐका",
    hero_pill_free: "१००% मोफत",
    hero_pill_nologin: "लॉगिनची गरज नाही",
    hero_pill_access: "सुलभ वापर",

    steps_header_tag: "अतिशय सोपे • Very Simple to Use",
    steps_heading: "फक्त ३ टप्प्यांत आपली भाषा ऐका",
    steps_subtitle: "कोणत्याही तांत्रिक ज्ञानाशिवाय कोणीही सहज वापरू शकते.",
    step1_title: "१. आपली भाषा निवडा",
    step1_desc: "मराठी, हिंदी, तेलुगू यासह १२ भारतीय भाषांमधून निवडा.",
    step2_title: "२. लिहा किंवा फोटो लावा",
    step2_desc: "शब्द टाईप करा किंवा पुस्तकाच्या पानाचा फोटो लावा.",
    step3_title: "३. हिरवे बटण दाबा",
    step3_desc: "तुमचा मजकूर स्पष्ट आवाजात ऐकू येईल!",

    tools_header_tag: "खास साधने • Dedicated Tools",
    tools_heading: "प्रत्येक गरजेसाठी स्वतंत्र पाने",
    tools_subtitle: "एका क्लिकवर आवडते साधन वापरा!",
    tool_scan_title: "पुस्तक फोटो स्कॅनर",
    tool_scan_desc: "पुस्तकाचा फोटो काढा — वाणी एआय मराठीत वाचून दाखवेल.",
    tool_upload_title: "पीडीएफ व कागदपत्रे",
    tool_upload_desc: "पुस्तकांची PDF फाईल अपलोड करून ऑडिओबुक बनवा.",
    tool_stories_title: "प्रादेशिक बोधकथा",
    tool_stories_desc: "लहान मुलांसाठी आणि सर्वांसाठी पंचतंत्र कथा तयार आहेत.",
    tool_compare_title: "आवाज तुलना लॅब",
    tool_compare_desc: "दोन आवाज ऐकून सर्वात चांगला आवाज निवडा.",
    tool_pron_title: "उच्चार सुधारक",
    tool_pron_desc: "स्थानिक बोलीनुसार योग्य उच्चार ठरवा.",
    tool_studio_title: "वाणी एआय मुख्य स्टुडिओ",
    tool_studio_desc: "वेग, भावना आणि कॅराओके असलेला संपूर्ण स्टुडिओ.",

    scan_page_badge: "फोटो स्कॅनर • Camera to Voice",
    scan_page_title: "पुस्तकाचा फोटो काढून ऐका!",
    scan_page_desc: "कॅमेऱ्याने पान स्कॅन करा — वाणी एआय लगेच वाचून दाखवेल.",
    scan_drop_title: "फोटो काढा किंवा अपलोड करा",
    scan_drop_sub: "(PNG, JPG फॉरमॅट)",
    scan_btn_choose: "फोटो निवडा",
    scan_btn_change: "दुसरा फोटो",
    scan_scanning: "अक्षरे वाचली जात आहेत...",
    scan_sample_title: "किंवा नमुना पहा:",

    doc_page_badge: "पीडीएफ ऑडिओबुक • Document Audiobook",
    doc_page_title: "पुस्तकांना ऑडिओबुकमध्ये रूपांतरित करा",
    doc_page_desc: "शालेय पुस्तकांची PDF फाईल टाकून मराठीत ऐका.",
    doc_drop_title: "PDF किंवा Word फाईल टाका",
    doc_drop_sub: "पुस्तकाची फाईल अपलोड करा",
    doc_btn_choose: "फाईल निवडा",
    doc_reading: "कागदपत्र वाचले जात आहे...",
    doc_info_title: "तपशील",
    doc_ready: "तयार आहे",
    doc_est_time: "मिनिटांचे वाचन",

    story_page_badge: "बोधकथा संग्रह • Audio Stories",
    story_page_title: "आपल्या भारतीय बोधकथा ऐका!",
    story_page_desc: "पंचतंत्र आणि बिरबलाच्या गोष्टी आजीच्या गोड आवाजात.",
    story_btn_play: "कथा ऐका",
    story_btn_pause: "थांबवा",
    story_moral_label: "कथेचे तात्पर्य:",
    story_more_title: "आणखी कथा",
    story_more_sub: "कोणत्याही कथेवर क्लिक करून ऐका",

    compare_page_badge: "आवाज तुलना • Voice Comparison",
    compare_page_title: "दोन आवाज समोरासमोर ऐका!",
    compare_page_desc: "एकाच वाक्यावर दोन आवाज तपासा.",
    compare_text_label: "वाक्य:",
    compare_voice_a: "आवाज १ (Voice A)",
    compare_voice_b: "आवाज २ (Voice B)",
    compare_speed: "वेग:",

    pron_page_badge: "उच्चार लॅब • Pronunciation Tuner",
    pron_page_title: "आपल्या स्थानिक बोलीप्रमाणे उच्चार सुधारा!",
    pron_page_desc: "कठीण शब्दांचे उच्चार हवे तसे बदला.",
    pron_orig_label: "१. मूळ शब्द:",
    pron_phon_label: "२. असा उच्चार व्हावा:",
    pron_btn_orig: "मूळ आवाज",
    pron_btn_new: "नवीन उच्चार",
    pron_btn_save: "जतन करा",
    pron_my_rules: "तुमचे नियम",

    access_page_badge: "सुलभ वापर • Inclusive Design",
    access_page_title: "दृष्टीबाधित आणि सर्वांसाठी सोयीचे",
    access_page_desc: "ध्वनी मार्गदर्शनाने सहज वापरता येण्याजोगे तंत्रज्ञान.",
    access_contrast_title: "हाय-कॉन्ट्रास्ट पिवळा/काळा थीम",
    access_contrast_desc: "स्पष्ट दिसण्यासाठी (High-Contrast)",
    access_text_size_title: "अक्षरांचा आकार (Text Size)",
    access_voice_test_title: "आवाज मार्गदर्शनाची चाचणी",
    access_btn_voice_test: "आवाज ऐका",
    access_shortcuts_title: "कीबोर्ड शॉर्टकट",

    studio_step1_lang: "१. भाषा निवडा:",
    studio_step2_voice: "२. आवाज निवडा:",
    studio_step3_speed: "३. बोलण्याचा वेग:",
    studio_step4_emotion: "४. भावना / शैली:",
    studio_tab_type: "लिहा",
    studio_tab_file: "फाईल",
    studio_tab_photo: "फोटो",
    studio_tab_link: "लिंक",
    studio_karaoke_title: "कॅराओके (शब्दावर क्लिक करून उच्चार सुधारा):",
    studio_waveform_title: "ध्वनी लहरी / Audio Waveform",
    studio_synthesizing: "आवाज तयार होत आहे..."
  },

  // GUJARATI
  gu: {
    nav_studio: "સ્ટુડિયો",
    nav_scan: "ફોટો સ્કેનર",
    nav_upload: "પીડીએફ ઑડિયો",
    nav_stories: "બોધકથાઓ",
    nav_tools: "સાધનો",
    nav_compare: "અવાજ સરખામણી",
    nav_pronunciation: "ઉચ્ચાર પ્રયોગશાળા",
    nav_languages: "૧૨ ભાષાઓ",
    nav_voices: "અવાજો",
    nav_history: "ઇતિહાસ",
    nav_accessibility: "સરળ ઉપયોગ",
    nav_tech: "ટેકનોલોજી",
    nav_about: "અમારા વિશે",
    nav_help: "મદદ",
    nav_speak_btn: "સાંભળો",
    nav_ui_lang: "ભાષા",

    btn_listen: "સાંભળો",
    btn_stop: "રોકો",
    btn_copy: "કૉપિ કરો",
    btn_copied: "કૉપિ થઈ ગયું!",
    btn_clear: "સાફ કરો",
    btn_upload: "અપલોડ",
    btn_download: "ડાઉનલોડ",
    btn_sample: "નમૂનો",
    btn_try_now: "અત્યારે અજમાવો",
    btn_save: "સાચવો",
    btn_open_studio: "સ્ટુડિયો ખોલો",
    btn_edit_studio: "સ્ટુડિયોમાં સુધારો",
    btn_replay: "ફરી સાંભળો",

    hero_badge: "ભારતીય પ્રાદેશિક ભાષાઓનું કુદરતી અવાજ મંચ • 12 Indian Languages",
    hero_title_part1: "તમારા વિચારો તમારી જ ભાષામાં",
    hero_title_accent: "સરળતાથી સાંભળો!",
    hero_subtitle: "વાંચવામાં તકલીફ હોય કે દ્રષ્ટિ ઓછી હોય — પુસ્તકો અને વાર્તાઓ તમારી માતૃભાષામાં સ્પષ્ટ સાંભળો.",
    hero_btn_studio: "સ્ટુડિયો ખોલો",
    hero_btn_listen: "અવાજ સાંભળો",
    hero_pill_free: "૧૦૦% મફત",
    hero_pill_nologin: "લૉગિન જરૂરી નથી",
    hero_pill_access: "સરળ ઉપયોગ",

    steps_header_tag: "ખૂબ જ સરળ • Very Simple to Use",
    steps_heading: "માત્ર ૩ પગલાંમાં તમારી ભાષા સાંભળો",
    steps_subtitle: "કોઈપણ વ્યક્તિ ટેકનિકલ જ્ઞાન વગર વાપરી શકે છે.",
    step1_title: "૧. ભાષા પસંદ કરો",
    step1_desc: "ગુજરાતી, હિન્દી, તેલુગુ સહિત ૧૨ ભાષાઓમાંથી પસંદ કરો.",
    step2_title: "૨. લખો અથવા ફોટો મૂકો",
    step2_desc: "શબ્દો ટાઈપ કરો અથવા પુસ્તકના પાનાનો ફોટો મૂકો.",
    step3_title: "૩. લીલું બટન દબાવો",
    step3_desc: "તમારો મનપસંદ લખાણ સ્પષ્ટ અવાજમાં સાંભળો!",

    tools_header_tag: "ખાસ સાધનો • Dedicated Tools",
    tools_heading: "દરેક જરૂરિયાત માટે અલગ સરળ પેજ",
    tools_subtitle: "એક ક્લિકમાં ઇચ્છિત સાધન વાપરો!",
    tool_scan_title: "પુસ્તક ફોટો સ્કેનર",
    tool_scan_desc: "પુસ્તકનો ફોટો પાડો — વાણી એઆઈ ગુજરાતીમાં વાંચી સંભળાવશે.",
    tool_upload_title: "પીડીએફ અને દસ્તાવેજ",
    tool_upload_desc: "પુસ્તકોની PDF ફાઈલ અપલોડ કરી ઑડિયોબુક બનાવો.",
    tool_stories_title: "પ્રાદેશિક બોધકથાઓ",
    tool_stories_desc: "બાળકો માટે પંચતંત્ર અને અકબર-બીરબલની વાર્તાઓ.",
    tool_compare_title: "અવાજ સરખામણી લેબ",
    tool_compare_desc: "બે અલગ અવાજો સરખાવી શ્રેષ્ઠ અવાજ પસંદ કરો.",
    tool_pron_title: "ઉચ્ચાર સુધારક",
    tool_pron_desc: "તમારી બોલી પ્રમાણે યોગ્ય ઉચ્ચાર નક્કી કરો.",
    tool_studio_title: "વાણી એઆઈ મુખ્ય સ્ટુડિયો",
    tool_studio_desc: "ઝડપ, લાગણી અને કેરાઓકે સાથેનો સંપૂર્ણ સ્ટુડિયો.",

    scan_page_badge: "ફોટો સ્કેનર • Camera to Voice",
    scan_page_title: "પુસ્તકનો ફોટો પાડીને સાંભળો!",
    scan_page_desc: "કેમેરાથી પુસ્તકનું પાનું સ્કેન કરો — ગુજરાતીમાં સ્પષ્ટ સાંભળો.",
    scan_drop_title: "ફોટો પાડો અથવા અપલોડ કરો",
    scan_drop_sub: "(PNG, JPG ફાઈલ)",
    scan_btn_choose: "ફોટો પસંદ કરો",
    scan_btn_change: "બીજો ફોટો",
    scan_scanning: "શબ્દો ઓળખાઈ રહ્યા છે...",
    scan_sample_title: "અથવા નમૂનો જુઓ:",

    doc_page_badge: "પીડીએફ ઑડિયોબુક • Document Audiobook",
    doc_page_title: "પુસ્તકોને ઑડિયોબુકમાં ફેરવો",
    doc_page_desc: "શાળાના પુસ્તકોની PDF અપલોડ કરી સાંભળો.",
    doc_drop_title: "PDF અથવા Word ફાઈલ અહીં મૂકો",
    doc_drop_sub: "પુસ્તકની ફાઈલ અપલોડ કરો",
    doc_btn_choose: "ફાઈલ પસંદ કરો",
    doc_reading: "દસ્તાવેજ વંચાઈ રહ્યો છે...",
    doc_info_title: "વિગત",
    doc_ready: "તૈયાર છે",
    doc_est_time: "મિનિટનું વાચન",

    story_page_badge: "વાર્તા સંગ્રહ • Audio Stories",
    story_page_title: "ભારતીય બોધકથાઓ સાંભળો!",
    story_page_desc: "પંચતંત્રની વાર્તાઓ દાદીમાના મીઠા અવાજમાં.",
    story_btn_play: "વાર્તા સાંભળો",
    story_btn_pause: "રોકો",
    story_moral_label: "વાર્તાનો બોધ:",
    story_more_title: "વધુ વાર્તાઓ",
    story_more_sub: "કોઈપણ વાર્તા પર ક્લિક કરી ગુજરાતીમાં સાંભળો",

    compare_page_badge: "અવાજ સરખામણી • Voice Comparison",
    compare_page_title: "બે અવાજો સામસામે સરખાવો!",
    compare_page_desc: "એક જ વાક્ય પર બે અવાજ ચકાસી શ્રેષ્ઠ પસંદ કરો.",
    compare_text_label: "સરખામણીનું વાક્ય:",
    compare_voice_a: "અવાજ ૧ (Voice A)",
    compare_voice_b: "અવાજ ૨ (Voice B)",
    compare_speed: "ઝડપ:",

    pron_page_badge: "ઉચ્ચાર લેબ • Pronunciation Tuner",
    pron_page_title: "તમારી બોલી મુજબ ઉચ્ચાર સુધારો!",
    pron_page_desc: "અઘરા શબ્દોના ઉચ્ચાર સરળતાથી બદલો.",
    pron_orig_label: "૧. મૂળ શબ્દ:",
    pron_phon_label: "૨. આ રીતે બોલાવો:",
    pron_btn_orig: "મૂળ અવાજ",
    pron_btn_new: "નવો ઉચ્ચાર",
    pron_btn_save: "સાચવો",
    pron_my_rules: "તમારા નિયમો",

    access_page_badge: "સરળ ઉપયોગ • Inclusive Design",
    access_page_title: "દ્રષ્ટિહીન અને સૌ માટે સરળ",
    access_page_desc: "ઑડિયો માર્ગદર્શન સાથે સરળતાથી વાપરી શકાય તેવું પ્લેટફોર્મ.",
    access_contrast_title: "હાઈ-કોન્ટ્રાસ્ટ પીળો/કાળો થીમ",
    access_contrast_desc: "સ્પષ્ટતા માટે (High-Contrast)",
    access_text_size_title: "અક્ષરોનું માપ (Text Size)",
    access_voice_test_title: "અવાજ માર્ગદર્શન ટેસ્ટ",
    access_btn_voice_test: "અવાજ સાંભળો",
    access_shortcuts_title: "કીબોર્ડ શોર્ટકટ્સ",

    studio_step1_lang: "૧. ભાષા પસંદ કરો:",
    studio_step2_voice: "૨. અવાજ પસંદ કરો:",
    studio_step3_speed: "૩. ઝડપ:",
    studio_step4_emotion: "૪. ભાવ / શૈલી:",
    studio_tab_type: "લખો",
    studio_tab_file: "ફાઈલ",
    studio_tab_photo: "ફોટો",
    studio_tab_link: "લિંક",
    studio_karaoke_title: "કેરાઓકે (શબ્દ પર ક્લિક કરી ઉચ્ચાર સુધારો):",
    studio_waveform_title: "ધ્વનિ તરંગો / Audio Waveform",
    studio_synthesizing: "અવાજ તૈયાર થઈ રહ્યો છે..."
  },

  // PUNJABI
  pa: {
    nav_studio: "ਸਟੂਡੀਓ",
    nav_scan: "ਫੋਟੋ ਸਕੈਨਰ",
    nav_upload: "ਪੀਡੀਐਫ ਆਡੀਓ",
    nav_stories: "ਸਿੱਖਿਆਦਾਇਕ ਕਹਾਣੀਆਂ",
    nav_tools: "ਸਾਧਨ",
    nav_compare: "ਆਵਾਜ਼ ਤੁਲਨਾ",
    nav_pronunciation: "ਉਚਾਰਨ ਲੈਬ",
    nav_languages: "12 ਬੋਲੀਆਂ",
    nav_voices: "ਆਵਾਜ਼ਾਂ",
    nav_history: "ਇਤਿਹਾਸ",
    nav_accessibility: "ਸੌਖੀ ਵਰਤੋਂ",
    nav_tech: "ਤਕਨਾਲੋਜੀ",
    nav_about: "ਸਾਡੇ ਬਾਰੇ",
    nav_help: "ਮਦਦ",
    nav_speak_btn: "ਸੁਣੋ",
    nav_ui_lang: "ਬੋਲੀ",

    btn_listen: "ਸੁਣੋ",
    btn_stop: "ਰੋਕੋ",
    btn_copy: "ਕਾਪੀ ਕਰੋ",
    btn_copied: "ਕਾਪੀ ਹੋ ਗਿਆ!",
    btn_clear: "ਸਾਫ਼ ਕਰੋ",
    btn_upload: "ਅਪਲੋਡ",
    btn_download: "ਡਾਊਨਲੋਡ",
    btn_sample: "ਨਮੂਨਾ",
    btn_try_now: "ਹੁਣੇ ਅਜ਼ਮਾਓ",
    btn_save: "ਸੰਭਾਲੋ",
    btn_open_studio: "ਸਟੂਡੀਓ ਖੋਲ੍ਹੋ",
    btn_edit_studio: "ਸਟੂਡੀਓ ਵਿੱਚ ਬਦਲੋ",
    btn_replay: "ਮੁੜ ਸੁਣੋ",

    hero_badge: "ਭਾਰਤੀ ਬੋਲੀਆਂ ਦਾ ਕੁਦਰਤੀ ਆਵਾਜ਼ ਮੰਚ • 12 Indian Languages",
    hero_title_part1: "ਆਪਣੇ ਵਿਚਾਰ ਆਪਣੀ ਹੀ ਬੋਲੀ ਵਿੱਚ",
    hero_title_accent: "ਕੁਦਰਤੀ ਤਰੀਕੇ ਸੁਣੋ!",
    hero_subtitle: "ਚਾਹੇ ਪੜ੍ਹਨ ਵਿੱਚ ਮੁਸ਼ਕਲ ਹੋਵੇ ਜਾਂ ਨਜ਼ਰ ਕਮਜ਼ੋਰ ਹੋਵੇ — ਕਿਤਾਬਾਂ ਅਤੇ ਕਹਾਣੀਆਂ ਮਾਂ-ਬੋਲੀ ਵਿੱਚ ਸਪੱਸ਼ਟ ਸੁਣੋ।",
    hero_btn_studio: "ਸਟੂਡੀਓ ਖੋਲ੍ਹੋ",
    hero_btn_listen: "ਆਵਾਜ਼ ਸੁਣੋ",
    hero_pill_free: "100% ਮੁਫ਼ਤ",
    hero_pill_nologin: "ਕੋਈ ਲੌਗਇਨ ਨਹੀਂ",
    hero_pill_access: "ਸੌਖੀ ਵਰਤੋਂ",

    steps_header_tag: "ਬਹੁਤ ਹੀ ਆਸਾਨ • Very Simple to Use",
    steps_heading: "ਸਿਰਫ਼ 3 ਕਦਮਾਂ ਵਿੱਚ ਆਪਣੀ ਬੋਲੀ ਸੁਣੋ",
    steps_subtitle: "ਬਿਨਾਂ ਕਿਸੇ ਤਕਨੀਕੀ ਜਾਣਕਾਰੀ ਦੇ ਕੋਈ ਵੀ ਆਸਾਨੀ ਨਾਲ ਵਰਤ ਸਕਦਾ ਹੈ।",
    step1_title: "1. ਆਪਣੀ ਬੋਲੀ ਚੁਣੋ",
    step1_desc: "ਪੰਜਾਬੀ, ਹਿੰਦੀ, ਤੇਲਗੂ ਸਮੇਤ 12 ਭਾਰਤੀ ਬੋਲੀਆਂ ਵਿੱਚੋਂ ਚੁਣੋ।",
    step2_title: "2. ਲਿਖੋ ਜਾਂ ਫੋਟੋ ਲਗਾਓ",
    step2_desc: "ਸ਼ਬਦ ਟਾਈਪ ਕਰੋ ਜਾਂ ਕਿਤਾਬ ਦੇ ਪੰਨੇ ਦੀ ਫੋਟੋ ਲਗਾਓ।",
    step3_title: "3. ਹਰਾ ਬਟਨ ਦਬਾਓ",
    step3_desc: "ਤੁਹਾਡਾ ਲਿਖਿਆ ਸਪੱਸ਼ਟ ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣਾਈ ਦੇਵੇਗਾ!",

    tools_header_tag: "ਖਾਸ ਸਾਧਨ • Dedicated Tools",
    tools_heading: "ਹਰ ਲੋੜ ਲਈ ਵੱਖਰੇ ਸੌਖੇ ਪੰਨੇ",
    tools_subtitle: "ਇੱਕ ਕਲਿੱਕ ਵਿੱਚ ਮਨਪਸੰਦ ਸਾਧਨ ਵਰਤੋ!",
    tool_scan_title: "ਕਿਤਾਬ ਫੋਟੋ ਸਕੈਨਰ",
    tool_scan_desc: "ਕਿਤਾਬ ਦੀ ਫੋਟੋ ਖਿੱਚੋ — ਵਾਣੀ ਏਆਈ ਪੰਜਾਬੀ ਵਿੱਚ ਪੜ੍ਹ ਕੇ ਸੁਣਾਏਗੀ।",
    tool_upload_title: "ਪੀਡੀਐਫ ਤੇ ਦਸਤਾਵੇਜ਼",
    tool_upload_desc: "ਕਿਤਾਬਾਂ ਦੀ PDF ਅਪਲੋਡ ਕਰਕੇ ਆਡੀਓਬੁੱਕ ਬਣਾਓ।",
    tool_stories_title: "ਸਿੱਖਿਆਦਾਇਕ ਕਹਾਣੀਆਂ",
    tool_stories_desc: "ਬੱਚਿਆਂ ਲਈ ਪੰਚਤੰਤਰ ਤੇ ਅਕਬਰ-ਬੀਰਬਲ ਦੀਆਂ ਕਹਾਣੀਆਂ।",
    tool_compare_title: "ਆਵਾਜ਼ ਤੁਲਨਾ ਲੈਬ",
    tool_compare_desc: "ਦੋ ਵੱਖਰੀਆਂ ਆਵਾਜ਼ਾਂ ਸੁਣ ਕੇ ਸਭ ਤੋਂ ਵਧੀਆ ਆਵਾਜ਼ ਚੁਣੋ।",
    tool_pron_title: "ਉਚਾਰਨ ਸੁਧਾਰਕ",
    tool_pron_desc: "ਆਪਣੇ ਲਹਿਜੇ ਅਨੁਸਾਰ ਸ਼ਬਦਾਂ ਦਾ ਸਹੀ ਉਚਾਰਨ ਤੈਅ ਕਰੋ।",
    tool_studio_title: "ਵਾਣੀ ਏਆਈ ਮੁੱਖ ਸਟੂਡੀਓ",
    tool_studio_desc: "ਗਤੀ, ਭਾਵਨਾ ਅਤੇ ਕੈਰਾਓਕੇ ਵਾਲਾ ਪੂਰਾ ਸਟੂਡੀਓ।",

    scan_page_badge: "ਫੋਟੋ ਸਕੈਨਰ • Camera to Voice",
    scan_page_title: "ਕਿਤਾਬ ਦੀ ਫੋਟੋ ਖਿੱਚ ਕੇ ਸੁਣੋ!",
    scan_page_desc: "ਕੈਮਰੇ ਨਾਲ ਕਿਤਾਬ ਦਾ ਪੰਨਾ ਸਕੈਨ ਕਰੋ — ਪੰਜਾਬੀ ਵਿੱਚ ਸਪੱਸ਼ਟ ਸੁਣੋ।",
    scan_drop_title: "ਫੋਟੋ ਖਿੱਚੋ ਜਾਂ ਅਪਲੋਡ ਕਰੋ",
    scan_drop_sub: "(PNG, JPG ਫਾਈਲ)",
    scan_btn_choose: "ਫੋਟੋ ਚੁਣੋ",
    scan_btn_change: "ਦੂਜੀ ਫੋਟੋ ਲਓ",
    scan_scanning: "ਅੱਖਰ ਪੜ੍ਹੇ ਜਾ ਰਹੇ ਹਨ...",
    scan_sample_title: "ਜਾਂ ਨਮੂਨਾ ਦੇਖੋ:",

    doc_page_badge: "ਪੀਡੀਐਫ ਆਡੀਓਬੁੱਕ • Document Audiobook",
    doc_page_title: "ਕਿਤਾਬਾਂ ਨੂੰ ਆਡੀਓਬੁੱਕ ਵਿੱਚ ਬਦਲੋ",
    doc_page_desc: "ਸਕੂਲ ਦੀਆਂ ਕਿਤਾਬਾਂ ਦੀ PDF ਫਾਈਲ ਪਾ ਕੇ ਸੁਣੋ।",
    doc_drop_title: "PDF ਜਾਂ Word ਫਾਈਲ ਇੱਥੇ ਪਾਓ",
    doc_drop_sub: "ਕਿਤਾਬ ਦੀ ਫਾਈਲ ਅਪਲੋਡ ਕਰੋ",
    doc_btn_choose: "ਫਾਈਲ ਚੁਣੋ",
    doc_reading: "ਦਸਤਾਵੇਜ਼ ਪੜ੍ਹਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    doc_info_title: "ਵੇਰਵਾ",
    doc_ready: "ਤਿਆਰ ਹੈ",
    doc_est_time: "ਮਿੰਟ ਦਾ ਪਾਠ",

    story_page_badge: "ਕਹਾਣੀ ਸੰਗ੍ਰਹਿ • Audio Stories",
    story_page_title: "ਸਾਡੀਆਂ ਸਿੱਖਿਆਦਾਇਕ ਕਹਾਣੀਆਂ ਸੁਣੋ!",
    story_page_desc: "ਪੰਚਤੰਤਰ ਦੀਆਂ ਕਹਾਣੀਆਂ ਦਾਦੀ ਮਾਂ ਦੀ ਮਿੱਠੀ ਆਵਾਜ਼ ਵਿੱਚ।",
    story_btn_play: "ਕਹਾਣੀ ਸੁਣੋ",
    story_btn_pause: "ਰੋਕੋ",
    story_moral_label: "ਕਹਾਣੀ ਦੀ ਸਿੱਖਿਆ:",
    story_more_title: "ਹੋਰ ਕਹਾਣੀਆਂ",
    story_more_sub: "ਕਿਸੇ ਵੀ ਕਹਾਣੀ ਉੱਤੇ ਕਲਿੱਕ ਕਰਕੇ ਸੁਣੋ",

    compare_page_badge: "ਆਵਾਜ਼ ਤੁਲਨਾ • Voice Comparison",
    compare_page_title: "ਦੋ ਆਵਾਜ਼ਾਂ ਆਹਮੋ-ਸਾਹਮਣੇ ਸੁਣੋ!",
    compare_page_desc: "ਇੱਕੋ ਵਾਕ ਉੱਤੇ ਦੋ ਆਵਾਜ਼ਾਂ ਪਰਖ ਕੇ ਸਭ ਤੋਂ ਵਧੀਆ ਚੁਣੋ।",
    compare_text_label: "ਤੁਲਨਾ ਲਈ ਵਾਕ:",
    compare_voice_a: "ਆਵਾਜ਼ 1 (Voice A)",
    compare_voice_b: "ਆਵਾਜ਼ 2 (Voice B)",
    compare_speed: "ਗਤੀ:",

    pron_page_badge: "ਉਚਾਰਨ ਲੈਬ • Pronunciation Tuner",
    pron_page_title: "ਆਪਣੀ ਬੋਲੀ ਮੁਤਾਬਕ ਉਚਾਰਨ ਸੁਧਾਰੋ!",
    pron_page_desc: "ਔਖੇ ਸ਼ਬਦਾਂ ਦੇ ਉਚਾਰਨ ਆਪਣੀ ਮਰਜ਼ੀ ਅਨੁਸਾਰ ਬਦਲੋ।",
    pron_orig_label: "1. ਮੂਲ ਸ਼ਬਦ:",
    pron_phon_label: "2. ਇਸ ਤਰ੍ਹਾਂ ਬੋਲਿਆ ਜਾਵੇ:",
    pron_btn_orig: "ਮੂਲ ਆਵਾਜ਼",
    pron_btn_new: "ਨਵਾਂ ਉਚਾਰਨ",
    pron_btn_save: "ਸੰਭਾਲੋ",
    pron_my_rules: "ਤੁਹਾਡੇ ਨਿਯਮ",

    access_page_badge: "ਸੌਖੀ ਵਰਤੋਂ • Inclusive Design",
    access_page_title: "ਨੇਤਰਹੀਣਾਂ ਅਤੇ ਸਭ ਲਈ ਆਸਾਨ",
    access_page_desc: "ਆਵਾਜ਼ ਮਾਰਗਦਰਸ਼ਨ ਨਾਲ ਆਸਾਨੀ ਨਾਲ ਵਰਤਣਯੋਗ ਤਕਨਾਲੋਜੀ।",
    access_contrast_title: "ਹਾਈ-ਕੰਟ੍ਰਾਸਟ ਪੀਲਾ/ਕਾਲਾ ਥੀਮ",
    access_contrast_desc: "ਸਪੱਸ਼ਟ ਦੇਖਣ ਲਈ (High-Contrast)",
    access_text_size_title: "ਅੱਖਰਾਂ ਦਾ ਆਕਾਰ (Text Size)",
    access_voice_test_title: "ਆਵਾਜ਼ ਮਾਰਗਦਰਸ਼ਨ ਟੈਸਟ",
    access_btn_voice_test: "ਆਵਾਜ਼ ਸੁਣੋ",
    access_shortcuts_title: "ਕੀਬੋਰਡ ਸ਼ਾਰਟਕੱਟ",

    studio_step1_lang: "1. ਬੋਲੀ ਚੁਣੋ:",
    studio_step2_voice: "2. ਆਵਾਜ਼ ਚੁਣੋ:",
    studio_step3_speed: "3. ਗਤੀ:",
    studio_step4_emotion: "4. ਭਾਵਨਾ / ਅੰਦਾਜ਼:",
    studio_tab_type: "ਲਿਖੋ",
    studio_tab_file: "ਫਾਈਲ",
    studio_tab_photo: "ਫੋਟੋ",
    studio_tab_link: "ਲਿੰਕ",
    studio_karaoke_title: "ਕੈਰਾਓਕੇ (ਸ਼ਬਦ ਉੱਤੇ ਕਲਿੱਕ ਕਰਕੇ ਉਚਾਰਨ ਸੁਧਾਰੋ):",
    studio_waveform_title: "ਧੁਨੀ ਤਰੰਗਾਂ / Audio Waveform",
    studio_synthesizing: "ਆਵਾਜ਼ ਤਿਆਰ ਹੋ ਰਹੀ ਹੈ..."
  },

  // ENGLISH
  en: {
    nav_studio: "Studio",
    nav_scan: "Scan Book",
    nav_upload: "PDF Audio",
    nav_stories: "Stories",
    nav_tools: "Tools",
    nav_compare: "Voice Lab",
    nav_pronunciation: "Pronounce",
    nav_languages: "12 Languages",
    nav_voices: "Voices",
    nav_history: "History",
    nav_accessibility: "Easy Access",
    nav_tech: "Technology",
    nav_about: "About Us",
    nav_help: "Guide",
    nav_speak_btn: "Speak Now",
    nav_ui_lang: "UI Language",

    btn_listen: "Listen Now",
    btn_stop: "Stop Audio",
    btn_copy: "Copy Text",
    btn_copied: "Copied!",
    btn_clear: "Clear All",
    btn_upload: "Upload",
    btn_download: "Download WAV",
    btn_sample: "Try Sample",
    btn_try_now: "Try It Now",
    btn_save: "Save",
    btn_open_studio: "Open Studio",
    btn_edit_studio: "Edit in Studio",
    btn_replay: "Replay Audio",

    hero_badge: "Indian Regional Speech Narration Platform • 12 Indian Languages",
    hero_title_part1: "Let your written words speak in",
    hero_title_accent: "your own mother tongue!",
    hero_subtitle: "Empowering non-readers, visually impaired citizens, and regional learners to naturally listen to books, stories, and articles in their own language.",
    hero_btn_studio: "Launch Studio",
    hero_btn_listen: "Hear Sample Voice",
    hero_pill_free: "100% Free",
    hero_pill_nologin: "No Login Required",
    hero_pill_access: "Inclusive Accessibility",

    steps_header_tag: "Very Simple to Use • 3 Easy Steps",
    steps_heading: "Hear Your Regional Words in 3 Steps",
    steps_subtitle: "Anyone can use it effortlessly without any prior technical knowledge.",
    step1_title: "1. Pick Your Language",
    step1_desc: "Choose from 12 official regional Indian languages with a single tap.",
    step2_title: "2. Type, Paste or Scan",
    step2_desc: "Type your words, paste an article, or scan a printed book photo.",
    step3_title: "3. Press Green Listen Button",
    step3_desc: "Your words are immediately read aloud in lifelike natural regional voice with karaoke highlighting.",

    tools_header_tag: "Dedicated Tools • Feature Hubs",
    tools_heading: "Dedicated Simple Pages for Every Need",
    tools_subtitle: "Access each tool with a single click — tailored for intuitive regional usage.",
    tool_scan_title: "Book Photo Scanner",
    tool_scan_desc: "Take a picture of any textbook page or newspaper — VaaniAI automatically extracts and narrates it aloud.",
    tool_upload_title: "PDF & Document Audio",
    tool_upload_desc: "Upload school textbooks and study notes in PDF or DOCX format to create continuous regional audiobooks.",
    tool_stories_title: "Regional Moral Stories",
    tool_stories_desc: "Panchatantra, Tenali Rama, and Akbar-Birbal tales ready for children and families. No typing required!",
    tool_compare_title: "Voice Comparison Lab",
    tool_compare_desc: "Audition two regional neural voices side-by-side on identical text to find your ideal narrator.",
    tool_pron_title: "Pronunciation Tuner",
    tool_pron_desc: "Fine-tune dialect nuances, names, and difficult syllables with custom phonetic replacement rules.",
    tool_studio_title: "VaaniAI Creation Studio",
    tool_studio_desc: "Full-featured acoustic studio with speed, pitch, emotion styles, canvas waveform, and real-time karaoke.",

    scan_page_badge: "Book Photo Scanner • Camera to Voice",
    scan_page_title: "Photograph Any Book Page & Listen Aloud!",
    scan_page_desc: "Use your smartphone camera to capture any book page — VaaniAI instantly extracts the text and reads it in your language.",
    scan_drop_title: "Snap Photo or Upload Book Page",
    scan_drop_sub: "(PNG, JPG, Camera Capture)",
    scan_btn_choose: "Choose Photo",
    scan_btn_change: "Change Photo",
    scan_scanning: "Recognizing characters...",
    scan_sample_title: "Or try a sample book page:",

    doc_page_badge: "PDF & Documents • Document Audiobook",
    doc_page_title: "Convert Textbooks Into Natural Audiobooks",
    doc_page_desc: "Upload school textbooks, notes, or literature in PDF/DOCX format to listen in an authentic regional narration style.",
    doc_drop_title: "Drop PDF, Word (DOCX) or TXT here",
    doc_drop_sub: "Upload textbook or study material",
    doc_btn_choose: "Choose Document",
    doc_reading: "Reading document content...",
    doc_info_title: "Document Details",
    doc_ready: "Ready for Narration",
    doc_est_time: "minutes narration",

    story_page_badge: "Folk Tales Library • Audio Stories",
    story_page_title: "Listen to Indian Moral Folk Tales!",
    story_page_desc: "Enjoy Panchatantra, Tenali Rama, and Akbar-Birbal stories in sweet grandmother and storyteller voices.",
    story_btn_play: "Play Story",
    story_btn_pause: "Pause Story",
    story_moral_label: "Moral of the Story:",
    story_more_title: "Explore More Stories",
    story_more_sub: "Click any story card to immediately listen in your mother tongue",

    compare_page_badge: "Voice Comparison Lab • Dual Voice",
    compare_page_title: "Audition Two Regional Voices Side-by-Side!",
    compare_page_desc: "Hear how two different narrators speak the same sentence to pick the best voice for your content.",
    compare_text_label: "Comparison Sentence:",
    compare_voice_a: "Voice 1 (Voice A)",
    compare_voice_b: "Voice 2 (Voice B)",
    compare_speed: "Speech Speed:",

    pron_page_badge: "Pronunciation Lab • Dialect Tuner",
    pron_page_title: "Tune Pronunciation to Your Local Dialect!",
    pron_page_desc: "Customize difficult words, names, and regional slang. Hear before/after audio comparisons live.",
    pron_orig_label: "1. Original Word:",
    pron_phon_label: "2. Phonetic Replacement:",
    pron_btn_orig: "Original Voice",
    pron_btn_new: "New Pronunciation",
    pron_btn_save: "Save to Dictionary",
    pron_my_rules: "Your Phonetic Rules",

    access_page_badge: "Inclusive Design • WCAG 2.1 AA",
    access_page_title: "Built for Visually Impaired and Non-Readers",
    access_page_desc: "Engineered so rural citizens, elderly readers, and blind students can effortlessly navigate via sound.",
    access_contrast_title: "High-Contrast Yellow/Black Theme",
    access_contrast_desc: "Optimized for visual clarity (High-Contrast)",
    access_text_size_title: "Text Size Scaling",
    access_voice_test_title: "Test Spoken Guidance",
    access_btn_voice_test: "Hear Spoken Help",
    access_shortcuts_title: "Keyboard Shortcuts",

    studio_step1_lang: "1. Choose Your Language:",
    studio_step2_voice: "2. Pick Your Narrator:",
    studio_step3_speed: "3. Speech Speed:",
    studio_step4_emotion: "4. Emotion / Style:",
    studio_tab_type: "Type / Paste",
    studio_tab_file: "Document",
    studio_tab_photo: "Scan Photo",
    studio_tab_link: "Web Link",
    studio_karaoke_title: "Karaoke View (Click word to fix pronunciation):",
    studio_waveform_title: "Audio Waveform / Soundwaves",
    studio_synthesizing: "Synthesizing regional voice..."
  }
};
