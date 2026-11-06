"""
VaaniAI - Regional Language Text Preprocessing Module
Sentence splitting, Indian script numeral normalization, date/abbreviation expansion,
and prosodic pause marker insertion.
"""

import re
from typing import Dict, List, Tuple

# Regional Numeral Maps
INDIC_DIGITS = {
    # Devanagari (Hindi, Marathi)
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
    # Telugu
    '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4',
    '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9',
    # Tamil
    '௦': '0', '௧': '1', '௨': '2', '௩': '3', '௪': '4',
    '௫': '5', '௬': '6', '௭': '7', '௮': '8', '௯': '9',
    # Kannada
    '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4',
    '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9',
    # Bengali
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
    # Gujarati
    '૦': '0', '૧': '1', '૨': '2', '૩': '3', '૪': '4',
    '૫': '5', '૬': '6', '૭': '7', '૮': '8', '૯': '9',
    # Gurmukhi (Punjabi)
    '੦': '0', '੧': '1', '੨': '2', '੩': '3', '੪': '4',
    '੫': '5', '੬': '6', '੭': '7', '੮': '8', '੯': '9',
    # Odia
    '୦': '0', '୧': '1', '୨': '2', '୩': '3', '୪': '4',
    '୫': '5', '୬': '6', '୭': '7', '୮': '8', '୯': '9',
    # Malayalam
    '൦': '0', '൧': '1', '൨': '2', '൩': '3', '൪': '4',
    '൫': '5', '൬': '6', '൭': '7', '൮': '8', '൯': '9',
}

# Spoken number tables for 0-20
NUMBERS_TO_WORDS = {
    "te": {
        0: "సున్నా", 1: "ఒకటి", 2: "రెండు", 3: "మూడు", 4: "నాలుగు", 5: "ఐదు",
        6: "ఆరు", 7: "ఏడు", 8: "ఎనిమిది", 9: "తొమ్మిది", 10: "పది",
        11: "పదకొండు", 12: "పన్నెండు", 13: "పదమూడు", 14: "పద్నాలుగు", 15: "పదిహేను",
        16: "పదహారు", 17: "పదిహేడు", 18: "పద్దెనిమిది", 19: "పంతొమ్మిది", 20: "ఇరవై",
        30: "ముప్పై", 40: "నలభై", 50: "యాభై", 60: "అరవై", 70: "డెబ్బై", 80: "ఎనభై", 90: "తొంభై",
        100: "వంద", 1000: "వేయి", 100000: "లక్ష", 10000000: "కోటి"
    },
    "hi": {
        0: "शून्य", 1: "एक", 2: "दो", 3: "तीन", 4: "चार", 5: "पाँच",
        6: "छह", 7: "सात", 8: "आठ", 9: "नौ", 10: "दस",
        11: "ग्यारह", 12: "बारह", 13: "तेरह", 14: "चौदह", 15: "पंद्रह",
        16: "सोलह", 17: "सत्रह", 18: "अट्ठारह", 19: "उन्नीस", 20: "बीस",
        30: "तीस", 40: "चालीस", 50: "पचास", 60: "साठ", 70: "सत्तर", 80: "अस्सी", 90: "नब्बे",
        100: "सौ", 1000: "हज़ार", 100000: "लाख", 10000000: "करोड़"
    },
    "ta": {
        0: "பூஜ்ஜியம்", 1: "ஒன்று", 2: "இரண்டு", 3: "மூன்று", 4: "நான்கு", 5: "ஐந்து",
        6: "ஆறு", 7: "ஏழு", 8: "எட்டு", 9: "ஒன்பது", 10: "பத்து",
        11: "பதினொன்று", 12: "பன்னிரண்டு", 13: "பதின்மூன்று", 14: "பதினான்கு", 15: "பதினைந்து",
        16: "பதினாறு", 17: "பதினேழு", 18: "பதினெட்டு", 19: "பத்தொன்பது", 20: "இருபது",
        30: "முப்பது", 40: "நாற்பது", 50: "ஐம்பது", 60: "அறுபது", 70: "எழுபது", 80: "எண்பது", 90: "தொண்ணூறு",
        100: "நூறு", 1000: "ஆயிரம்", 100000: "இலட்சம்", 10000000: "கோடி"
    },
    "kn": {
        0: "ಸೊನ್ನೆ", 1: "ಒಂದು", 2: "ಎರಡು", 3: "ಮೂರು", 4: "ನಾಲ್ಕು", 5: "ಐದು",
        6: "ಆರು", 7: "ಏಳು", 8: "ಎಂಟು", 9: "ಒಂಬತ್ತು", 10: "ಹತ್ತು",
        11: "ಹನ್ನೊಂದು", 12: "ಹನ್ನೆರಡು", 13: "ಹದಿಮೂರು", 14: "ಹದಿನಾಲ್ಕು", 15: "ಹದಿನೈದು",
        16: "ಹದಿನಾರು", 17: "ಹದಿನೇಳು", 18: "ಹದಿನೆಂಟು", 19: "ಹತ್ತೊಂಬತ್ತು", 20: "ಇಪ್ಪತ್ತು",
        30: "ಮೂವತ್ತು", 40: "ನಲವತ್ತು", 50: "ಐವತ್ತು", 60: "ಅರವತ್ತು", 70: "ಎಪ್ಪತ್ತು", 80: "ಎಂಬತ್ತು", 90: "ತೊಂಬತ್ತು",
        100: "ನೂರು", 1000: "ಸಾವಿರ", 100000: "ಲಕ್ಷ", 10000000: "ಕೋಟಿ"
    },
    "mr": {
        0: "शून्य", 1: "एक", 2: "दोन", 3: "तीन", 4: "चार", 5: "पाच",
        6: "सहा", 7: "सात", 8: "आठ", 9: "नऊ", 10: "दहा",
        11: "अकरा", 12: "बारा", 13: "तेरा", 14: "चौदा", 15: "पंधरा",
        16: "सोळा", 17: "सतरा", 18: "अठरा", 19: "एकोणीस", 20: "वीस",
        30: "तीस", 40: "चाळीस", 50: "पन्नास", 60: "साठ", 70: "सत्तर", 80: "ऐंशी", 90: "नव्वद",
        100: "शंभर", 1000: "हजार", 100000: "लाख", 10000000: "कोटी"
    },
    "bn": {
        0: "শূন্য", 1: "এক", 2: "দুই", 3: "তিন", 4: "চার", 5: "পাঁচ",
        6: "ছয়", 7: "সাত", 8: "আট", 9: "নয়", 10: "দশ",
        11: "এগারো", 12: "বারো", 13: "তেরো", 14: "চৌদ্দ", 15: "পনেরো",
        16: "ষোলো", 17: "সতেরো", 18: "আঠারো", 19: "উনিশ", 20: "কুড়ি",
        30: "ত্রিশ", 40: "চল্লিশ", 50: "পঞ্চাশ", 60: "ষাট", 70: "সত্তর", 80: "আশি", 90: "নব্বই",
        100: "একশো", 1000: "হাজার", 100000: "লাখ", 10000000: "কোটি"
    },
    "gu": {
        0: "શૂન્ય", 1: "એક", 2: "બે", 3: "ત્રણ", 4: "ચાર", 5: "પાંચ",
        6: "છ", 7: "સાત", 8: "આઠ", 9: "નવ", 10: "દસ",
        11: "અગિયાર", 12: "બાર", 13: "તેર", 14: "ચૌદ", 15: "પંદર",
        20: "વીસ", 30: "ત્રીસ", 40: "ચાલીસ", 50: "પચાસ", 100: "સો", 1000: "હજાર"
    },
    "pa": {
        0: "ਸਿਫ਼ਰ", 1: "ਇੱਕ", 2: "ਦੋ", 3: "ਤਿੰਨ", 4: "ਚਾਰ", 5: "ਪੰਜ",
        6: "ਛੇ", 7: "ਸੱਤ", 8: "ਅੱਠ", 9: "ਨੌਂ", 10: "ਦੱਸ",
        11: "ਗਿਆਰਾਂ", 12: "ਬਾਰਾਂ", 13: "ਤੇਰਾਂ", 14: "ਚੌਦਾਂ", 15: "ਪੰਦਰਾਂ",
        20: "ਵੀਹ", 30: "ਤੀਹ", 40: "ਚਾਲੀ", 50: "ਪੰਜਾਹ", 100: "ਸੌ", 1000: "ਹਜ਼ਾਰ"
    },
    "ml": {
        0: "പൂജ്യം", 1: "ഒന്ന്", 2: "രണ്ട്", 3: "മൂന്ന്", 4: "നാല്", 5: "അഞ്ച്",
        6: "ആറ്", 7: "ഏഴ്", 8: "എട്ട്", 9: "ഒൻപത്", 10: "പത്ത്",
        11: "പതിനൊന്ന്", 12: "പന്ത്രണ്ട്", 13: "പതിമൂന്ന്", 14: "പതിനാല്", 15: "പതിനഞ്ച്",
        20: "ഇരുപത്", 30: "മുപ്പത്", 40: "നാല്പത്", 50: "അമ്പത്", 100: "നൂറ്", 1000: "ആയിരം"
    },
    "or": {
        0: "ଶୂନ", 1: "ଏକ", 2: "ଦୁଇ", 3: "ତିନି", 4: "ଚାରି", 5: "ପାଞ୍ଚ",
        6: "ଛଅ", 7: "ସାତ", 8: "ଆଠ", 9: "ନଅ", 10: "ଦଶ",
        11: "ଏଗାର", 12: "ବାର", 13: "ତେର", 14: "ଚଉଦ", 15: "ପନ୍ଦର",
        20: "କୋଡ଼ିଏ", 30: "ତିରିଶ", 40: "ଚାଳିଶ", 50: "ପଚାଶ", 100: "ଶହେ", 1000: "ହଜାର"
    },
    "ur": {
        0: "صفر", 1: "ایک", 2: "دو", 3: "تین", 4: "چار", 5: "پانچ",
        6: "چھ", 7: "سات", 8: "آٹھ", 9: "نو", 10: "دس",
        11: "گیارہ", 12: "بارہ", 13: "تیرہ", 14: "چودہ", 15: "پندرہ",
        20: "بیس", 30: "تیس", 40: "چالیس", 50: "پچاس", 100: "سو", 1000: "ہزار"
    },
    "en": {
        0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
        6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
        11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
        16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty",
        30: "thirty", 40: "forty", 50: "fifty", 60: "sixty", 70: "seventy", 80: "eighty", 90: "ninety",
        100: "hundred", 1000: "thousand", 100000: "lakh", 10000000: "crore"
    }
}

# Regional Abbreviations Dictionary
ABBREVIATIONS: Dict[str, Dict[str, str]] = {
    "te": {
        "డా.": "డాక్టర్",
        "డా||": "డాక్టర్",
        "కి.మీ.": "కిలోమీటర్లు",
        "కిమీ": "కిలోమీటర్లు",
        "రూ.": "రూపాయలు",
        "శ్రీ.": "శ్రీమాన్",
        "ఇం.": "ఇంజనీరింగ్",
        "ప్రొ.": "ప్రొఫెసర్",
        "తేది:": "తేదీ",
    },
    "hi": {
        "डॉ.": "डॉक्टर",
        "डॉ०": "डॉक्टर",
        "कि.मी.": "किलोमीटर",
        "किमी": "किलोमीटर",
        "रु.": "रुपये",
        "रू.": "रुपये",
        "पं.": "पंडित",
        "प्रो.": "प्रोफ़ेसर",
        "श्री.": "श्रीमान",
        "क्र.": "क्रमांक",
    },
    "ta": {
        "டாக்டர்.": "டாக்டர்",
        "கி.மீ.": "கிலோமீட்டர்",
        "ரூ.": "ரூபாய்",
        "திரு.": "திருவாளர்",
        "பேரா.": "பேராசிரியர்",
    },
    "kn": {
        "ಡಾ.": "ಡಾಕ್ಟರ್",
        "ಕಿ.ಮೀ.": "ಕಿಲೋಮೀಟರ್",
        "ರೂ.": "ರೂಪಾಯಿ",
        "ಶ್ರೀ.": "ಶ್ರೀಮಾನ್",
        "ಪ್ರಾ.": "ಪ್ರಾಧ್ಯಾಪಕ",
    },
    "bn": {
        "ডাঃ": "ডাক্তার",
        "ডা.": "ডাক্তার",
        "কিমি": "কিলোমিটার",
        "টাকা": "টাকা",
        "শ্রী": "শ্রীযুক্ত",
    },
    "mr": {
        "डॉ.": "डॉक्टर",
        "कि.मी.": "किलोमीटर",
        "रु.": "रुपये",
        "प्रा.": "प्राध्यापक",
        "श्री.": "श्रीमान",
    },
    "ur": {
        "ڈاکٹر": "ڈاکٹر",
        "پروفیسر": "پروفیسر",
        "کلومیٹر": "کلومیٹر",
        "روپے": "روپے",
    },
    "en": {
        "Dr.": "Doctor",
        "Prof.": "Professor",
        "km": "kilometers",
        "km/h": "kilometers per hour",
        "Rs.": "Rupees",
        "INR": "Indian Rupees",
        "approx.": "approximately",
        "vs.": "versus",
    }
}

def normalize_indic_digits(text: str) -> str:
    """Replaces native Indic digits with standard ASCII digits for uniform processing."""
    chars = []
    for char in text:
        chars.append(INDIC_DIGITS.get(char, char))
    return "".join(chars)

def number_to_indic_words(num: int, lang: str) -> str:
    """Converts a number up to 99999999 into spoken regional words."""
    lang_dict = NUMBERS_TO_WORDS.get(lang, NUMBERS_TO_WORDS["hi"])
    
    if num in lang_dict:
        return lang_dict[num]
        
    if num < 100:
        tens = (num // 10) * 10
        units = num % 10
        if tens in lang_dict and units in lang_dict:
            return f"{lang_dict[tens]} {lang_dict[units]}"
        return str(num)
        
    if num < 1000:
        hundreds = num // 100
        remainder = num % 100
        h_word = lang_dict.get(100, "hundred")
        if remainder > 0:
            return f"{number_to_indic_words(hundreds, lang)} {h_word} {number_to_indic_words(remainder, lang)}"
        return f"{number_to_indic_words(hundreds, lang)} {h_word}"
        
    if num < 100000:
        thousands = num // 1000
        remainder = num % 1000
        t_word = lang_dict.get(1000, "thousand")
        if remainder > 0:
            return f"{number_to_indic_words(thousands, lang)} {t_word} {number_to_indic_words(remainder, lang)}"
        return f"{number_to_indic_words(thousands, lang)} {t_word}"
        
    if num < 10000000:
        lakhs = num // 100000
        remainder = num % 100000
        l_word = lang_dict.get(100000, "lakh")
        if remainder > 0:
            return f"{number_to_indic_words(lakhs, lang)} {l_word} {number_to_indic_words(remainder, lang)}"
        return f"{number_to_indic_words(lakhs, lang)} {l_word}"
        
    return str(num)

def expand_numbers_and_dates(text: str, lang: str) -> str:
    """Expands dates (DD/MM/YYYY) and standalone numbers into spoken regional words."""
    # Convert native numerals first
    text = normalize_indic_digits(text)
    
    # Date pattern: DD/MM/YYYY or DD-MM-YYYY
    def replace_date(match):
        d, m, y = match.group(1), match.group(2), match.group(3)
        try:
            d_word = number_to_indic_words(int(d), lang)
            y_word = number_to_indic_words(int(y), lang)
            return f"{d_word} / {m} / {y_word}"
        except:
            return match.group(0)

    text = re.sub(r'(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})', replace_date, text)

    # Standalone numbers
    def replace_num(match):
        val = int(match.group(0))
        if val <= 1000000:
            return number_to_indic_words(val, lang)
        return match.group(0)

    text = re.sub(r'\b\d+\b', replace_num, text)
    return text

def expand_abbreviations(text: str, lang: str) -> str:
    """Expands common abbreviations in the regional language."""
    abbr_map = ABBREVIATIONS.get(lang, {})
    for abbr, expanded in abbr_map.items():
        text = text.replace(abbr, expanded)
    return text

def split_sentences_indic(text: str) -> List[str]:
    """
    Splits text into sentences respecting Indic punctuation:
    Danda (। - U+0964), Double Danda (॥ - U+0965),
    Western punctuation (. ! ?), and Urdu punctuation (۔ ، ؟).
    """
    pattern = r'([।॥!?\.\n]+|[\u06D4\u061F]+)'
    tokens = re.split(pattern, text)
    sentences = []
    
    current = ""
    for token in tokens:
        if not token:
            continue
        if re.match(pattern, token):
            current += token
            clean = current.strip()
            if clean:
                sentences.append(clean)
            current = ""
        else:
            current += token
            
    if current.strip():
        sentences.append(current.strip())
        
    return sentences if sentences else [text]

def normalize_prosodic_punctuation(text: str, pause_strength: str = "medium") -> str:
    """
    Normalizes Indic prosodic punctuation for neural synthesis engines
    without injecting raw XML break tags into plain text.
    Ensures natural breathing cadence after dandas, full stops, question marks, and commas.
    """
    # Standardize spacing around punctuation
    text = re.sub(r'\s*([,;،])\s*', r'\1 ', text)
    text = re.sub(r'\s*([।॥\.\?!۔\u061F])\s*', r'\1 ', text)
    # Ensure double dandas or paragraph breaks are clean
    text = re.sub(r'\s*([॥])\s*', r' ॥ ', text)
    text = re.sub(r'\n{2,}', r' । ', text)
    text = re.sub(r'\s+', r' ', text)
    return text.strip()

def preprocess_text(
    text: str,
    language: str,
    pause_strength: str = "medium",
    pronunciation_overrides: Dict[str, str] = None
) -> Tuple[str, List[str], Dict[str, any]]:
    """
    Full pipeline for pre-processing regional language text before TTS generation:
    1. Pronunciation dictionary substitutions
    2. Regional abbreviation expansion
    3. Numeral & date vocalization in regional words
    4. Indic sentence segmentation
    5. Clean prosodic punctuation normalization
    """
    cleaned = text.strip()
    
    # 1. Apply user phonetic / pronunciation overrides
    if pronunciation_overrides:
        for original, phonetic in pronunciation_overrides.items():
            cleaned = re.sub(rf'\b{re.escape(original)}\b', phonetic, cleaned)

    # 2. Expand abbreviations
    cleaned = expand_abbreviations(cleaned, language)

    # 3. Expand numbers and dates
    cleaned = expand_numbers_and_dates(cleaned, language)

    # 4. Split sentences
    sentences = split_sentences_indic(cleaned)

    # 5. Clean prosodic punctuation
    synthesized_text = normalize_prosodic_punctuation(cleaned, pause_strength)

    metadata = {
        "original_char_count": len(text),
        "normalized_char_count": len(cleaned),
        "sentence_count": len(sentences),
        "sentences": sentences,
        "pause_strength": pause_strength
    }

    return synthesized_text, sentences, metadata

    return synthesized_text, sentences, metadata
