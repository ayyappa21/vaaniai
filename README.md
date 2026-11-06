# VaaniAI (వాణి ఏఐ / वाणी एआई)
> *"Let your words speak, in your own language."*  
> **An Intelligent System to Narrate Written Regional-Language Content Naturally**

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com)
[![Next.js 16](https://img.shields.io/badge/Frontend-Next.js%2016-black.svg)](https://nextjs.org)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-emerald.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Languages](https://img.shields.io/badge/Supported%20Languages-12%20Scripts-amber.svg)](#supported-regional-languages)

---

## 🌟 Overview & Purpose

Standard text-to-speech (TTS) solutions routinely mispronounce Indian names, stumble on conjunct syllables, misread native numerals (e.g. `౨౦౨౬`, `१५/०८`), and produce monotonic, unnatural speech lacking prosodic breathing pauses.

**VaaniAI** is a production-grade regional speech narration web platform built specifically for Indian languages. It enables students, visually impaired citizens, teachers, rural readers, and regional content creators to paste, type, upload documents (TXT, PDF, DOCX), or scan photos (OCR) and generate lifelike, emotional narration with correct pronunciation, natural pauses, and word-by-word synchronized karaoke highlighting.

---

## 📱 Dedicated Functionality Hubs & Pages

To make the platform deeply accessible to users who may not be well-educated or proficient in English, VaaniAI provides dedicated, purpose-built pages with visual, tactile, and spoken affordances:

| Route | Page Name | Primary Purpose & Low-Literacy Affordance |
| :--- | :--- | :--- |
| **`/studio`** | **Main Creation Studio** | Two-pane studio with speed controls (🐢 Slow, 🚶 Normal, 🐇 Fast), visual mood cards, canvas audio waveform, and real-time karaoke. |
| **`/scan`** | **Book & Photo OCR Scanner** | Take a photo of any textbook, newspaper, or pamphlet. The app automatically extracts the regional script and reads it aloud with one giant green button. |
| **`/upload`** | **PDF & Document Converter** | Upload school textbooks, notes, or storybooks in `.pdf` or `.docx` format to convert entire chapters into natural audiobooks. |
| **`/stories`** | **Regional Stories & Folk Tales** | Pre-loaded Panchatantra, Tenali Rama, and Akbar-Birbal moral stories in regional scripts. No typing needed—just click a card and listen. |
| **`/compare`** | **Dual Voice Comparison Lab** | Audition two regional neural voices side-by-side on identical text with MOS quality benchmark comparisons. |
| **`/pronunciation`**| **Phonetic Pronunciation Lab**| Adjust dialect nuance, regional slang, or complex names with live audio test before/after cards. |
| **`/languages`** | **12 Regional Languages** | Rich catalog of all 12 supported Indian regional languages with native script emblems and instant voice greetings. |
| **`/voices`** | **Voice Character Library** | Browse 24+ regional narrator personas (e.g., 👩‍🏫 Teacher, 👨‍💼 News Anchor, 👵 Grandmother, 🧒 Student). |
| **`/accessibility`**| **Inclusive Assistive Tech** | High-contrast black/yellow mode, text resizer (`A-`, `A`, `A+`), spoken announcements, and keyboard shortcuts. |
| **`/history`** | **Saved Narration History** | Searchable local history of all generated speech with instant replay, deletion, and WAV export. |
| **`/technology`** | **AI Pipeline & Architecture** | 5-stage neural narration pipeline diagram, linguistic normalization rules, and MOS benchmark chart. |

---

## 🇮🇳 Supported Regional Languages & Scripts

| Language | Native Script | Direction | Primary Regions | Sample Spoken Sentence |
| :--- | :--- | :--- | :--- | :--- |
| **Telugu** | తెలుగు | LTR | Andhra Pradesh, Telangana | *నమస్కారం! వాణి ఏఐకి స్వాగతం. మీ మాటలు మీ సొంత భాషలో వినండి.* |
| **Hindi** | हिन्दी | LTR | Pan-India / North / Central | *नमस्ते! वाणी एआई में आपका स्वागत है। अपनी मातृभाषा में स्वाभाविक स्वर सुनें।* |
| **Tamil** | தமிழ் | LTR | Tamil Nadu, Puducherry | *வணக்கம்! வாணி ஏஐ-க்கு வரவேற்கிறோம். உங்கள் சொந்த மொழியில் இயற்கையான குரல்.* |
| **Kannada** | ಕನ್ನಡ | LTR | Karnataka | *ನಮಸ್ಕಾರ! ವಾಣಿ ಎಐಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಧ್ವನಿಯನ್ನು ಆಲಿಸಿ.* |
| **Malayalam** | മലയാളം | LTR | Kerala, Lakshadweep | *നമസ്കാരം! വാണി എഐയിലേക്ക് സ്വാഗതം. മനോഹരമായ ശബ്ദം ആസ്വദിക്കൂ.* |
| **Marathi** | मराठी | LTR | Maharashtra, Goa | *नमस्कार! वाणी एआय मध्ये आपले स्वागत आहे. भावपूर्ण आवाज अनुभवा.* |
| **Bengali** | বাংলা | LTR | West Bengal, Tripura | *নমস্কার! বাণী এআই-তে আপনাকে স্বাগতম। শুনুন জীবন্ত ও স্বাভাবিক কণ্ঠস্বর।* |
| **Gujarati** | ગુજરાતી | LTR | Gujarat | *નમસ્તે! વાણી એઆઈમાં આપનું હાર્દિક સ્વાગત છે. કુદરતી અવાજ સાંભળો.* |
| **Punjabi** | ਪੰਜਾਬੀ | LTR | Punjab | *ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਵਾਣੀ ਏਆਈ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਆਪਣੀ ਬੋਲੀ ਵਿੱਚ ਕੁਦਰਤੀ ਆਵਾਜ਼।* |
| **Odia** | ଓଡ଼ିଆ | LTR | Odisha | *ନମସ୍କାର! ବାଣୀ ଏଆଇକୁ ସ୍ଵାଗତ। ନିଜ ଆଞ୍ଚଳିକ ଭାଷାରେ ପ୍ରାକୃତିକ ସ୍ୱର.* |
| **Urdu** | اردو | **RTL** | Telangana, UP, Bihar, J&K | *السلام علیکم! وانی اے آئی میں خوش آمدید۔ اپنی زبان میں قدرتی آواز سنیں۔* |
| **Indian English**| English | LTR | Pan-India | *Welcome to VaaniAI. Experience expressive Indian regional speech.* |

---

## 🏗️ Architecture & Technology Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                          VaaniAI System Architecture                   │
└────────────────────────────────────────────────────────────────────────┘

 [Input Layer] ────► [Linguistic Normalization] ────► [Prosody & Pause] ────► [Pluggable Synthesis] ────► [Output Layer]
  • Text / URL        • Indic Digits (౧, २, ೩)          • SSML Break Tokens     • Local Harmonic Engine   • 24kHz WAV Audio
  • DOCX Parser       • Abbreviations (డా., डॉ.)        • Question Contours     • Indic Parler-TTS (HF)   • Word Timestamps
  • PDF Text Streams  • Date Expansion (15/08)         • Emotion Modulation    • AI4Bharat IndicTTS      • Karaoke Highlight
  • OCR Image Scan    • Phonetic Overrides Fixer       (Story, News, Calm)     • Google Cloud Neural2    • Interactive Waveform
```

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS + Lucide Icons + Canvas Waveform + Framer Motion.
- **Backend**: FastAPI (Python 3.13) with REST endpoints:
  - `POST /api/tts`: Full synthesis pipeline with custom phonetic overrides and word-by-word timestamp generation.
  - `POST /api/detect-language`: Unicode script block detection with confidence scoring and RTL recognition.
  - `POST /api/extract-text`: Pure-Python zero-dependency extraction for TXT, DOCX, PDF, and image OCR.
  - `GET /api/voices`: Filterable catalog of 24+ neural voices across 12 languages.
  - `GET /api/languages`: Full linguistic metadata, native scripts, sample phrases, and speaker demographics.
  - `GET /api/history`: Narration history persistence.
- **Pluggable Audio Engine**:
  - **Demo Offline Engine**: A pure-Python harmonic formant synthesizer generating valid 16-bit PCM WAV audio and word-level karaoke timestamps without any external API keys or cloud dependencies.
  - **Indic Parler-TTS Adapter**: Pluggable integration with HuggingFace Indic Parler-TTS.
  - **AI4Bharat IndicTTS Adapter**: Pluggable adapter for AI4Bharat Indic speech models.
  - **Google Cloud TTS Adapter**: Google Cloud Neural2 Indic voices.
  - **Web Speech API**: Client-side browser synthesis with explicit BCP-47 locale tags (`te-IN`, `hi-IN`, `ta-IN`, etc.).

---

## 🚀 Quickstart & Setup Guide

### 1. Start Both Services in One Command
```bash
./start.sh
```
Or start each service individually:

### 2. Start the Backend (FastAPI)
```bash
cd backend
python3 -m uvicorn main:app --host 127.0.0.1 --port 8000
```
FastAPI Swagger documentation is accessible at `http://127.0.0.1:8000/docs`.

### 3. Start the Frontend (Next.js)
```bash
cd frontend
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## ♿ Accessibility & Visual Design for Non-English Users

1. **Native Script First**: Every language selection and preview features high-contrast native glyphs (`తె`, `ह`, `த`, `ಕ`, etc.) and native button labels like *"వినండి"*, *"सुनिए"*, *"கேளுங்கள்"*.
2. **Tactile & Big Affordances**: Minimum 44px–64px touch targets with 3D elevation effects (`.btn-tactile`, `.btn-listen-giant`) and glowing pulse rings.
3. **Animal & Real-World Metaphors**: Speed is visually represented with 🐢 Slow, 🚶 Normal, 🐇 Brisk, 🚀 Fast; voices with illustrated character personas (Teacher, News Anchor, Grandmother, Child).
4. **Speaking UI / Voice Guidance**: Integrated spoken help in regional languages accessible with one tap in the navigation header.
5. **Universal Screen-Reader Support**: Semantic HTML, ARIA landmark labels, WCAG AA contrast ratio compliance, and high-contrast yellow/black theme toggle.
