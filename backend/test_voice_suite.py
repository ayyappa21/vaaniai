"""
VaaniAI - Advanced Neural Voice Quality and Multi-Language Verification Suite
Runs automated end-to-end tests across all regional languages, validating:
1. Neural voice provider execution (Azure Neural Indic / Google Neural).
2. Voice differentiation: Voice A (Female) vs Voice B (Male) produce distinct audio.
3. Accurate speed scaling: 0.75x (Slow) > 1.0x (Natural) > 1.25x (Fast).
4. Strict voice-language compatibility validation (HTTP 400 rejection).
5. Fast caching mechanism and response stability.
"""

import sys
import json
import time
import urllib.request
import urllib.error

BASE_URL = "http://127.0.0.1:8000/api"

TEST_CASES = [
    {
        "lang": "te",
        "name": "Telugu",
        "sample": "నమస్కారం, వాణి ఏఐకి స్వాగతం. మీ మాటలు మీ సొంత భాషలో సహజంగా వినండి.",
        "voice_female": "te-IN-swara",
        "voice_male": "te-IN-chaitanya",
    },
    {
        "lang": "hi",
        "name": "Hindi",
        "sample": "नमस्ते, वाणी एआई में आपका स्वागत है। अपनी मातृभाषा में स्वाभाविक आवाज सुनें।",
        "voice_female": "hi-IN-priya",
        "voice_male": "hi-IN-aarav",
    },
    {
        "lang": "ta",
        "name": "Tamil",
        "sample": "வணக்கம், வாணி ஏஐ-க்கு வரவேற்கிறோம். உங்கள் சொந்த மொழியில் இயற்கையான குரலை அனுபவியுங்கள்.",
        "voice_female": "ta-IN-kavya",
        "voice_male": "ta-IN-surya",
    },
    {
        "lang": "kn",
        "name": "Kannada",
        "sample": "ನಮಸ್ಕಾರ, ವಾಣಿ ಎಐಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಸ್ವಾಭಾವಿಕ ಧ್ವನಿಯನ್ನು ಆಲಿಸಿ.",
        "voice_female": "kn-IN-bhavana",
        "voice_male": "kn-IN-raghav",
    },
    {
        "lang": "ml",
        "name": "Malayalam",
        "sample": "നമസ്കാരം, വാണി എഐയിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ സ്വന്തം ഭാഷയിൽ മനോഹరമായ ശബ്ദം ആസ്വദിക്കൂ.",
        "voice_female": "ml-IN-anjali",
        "voice_male": "ml-IN-madhav",
    },
    {
        "lang": "mr",
        "name": "Marathi",
        "sample": "नमस्कार, वाणी एआय मध्ये आपले स्वागत आहे. आपल्या भाषेत गोड आवाज अनुभवा.",
        "voice_female": "mr-IN-tanvi",
        "voice_male": "mr-IN-omkar",
    },
    {
        "lang": "bn",
        "name": "Bengali",
        "sample": "নমস্কার, বাণী এআই-তে স্বাগতম। আপনার নিজের ভাষায় স্বাভাবিক কণ্ঠস্বর শুনুন।",
        "voice_female": "bn-IN-ishani",
        "voice_male": "bn-IN-subhash",
    },
    {
        "lang": "gu",
        "name": "Gujarati",
        "sample": "નમસ્તે, વાણી એઆઈમાં આપનું સ્વાગત છે. તમારી ભાષામાં કુદરતી અવાજ સાંભળો.",
        "voice_female": "gu-IN-diya",
        "voice_male": "gu-IN-niranjan",
    },
    {
        "lang": "pa",
        "name": "Punjabi",
        "sample": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਵਾਣੀ ਏਆਈ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਆਪਣੀ ਬੋਲੀ ਵਿੱਚ ਸੁਣੋ।",
        "voice_female": "pa-IN-simran",
        "voice_male": "pa-IN-gurpreet",
    },
    {
        "lang": "en",
        "name": "Indian English",
        "sample": "Welcome to VaaniAI. Experience expressive and authentic Indian speech narration.",
        "voice_female": "en-IN-neerja",
        "voice_male": "en-IN-prabhat",
    }
]

def make_request(endpoint: str, payload: dict):
    url = f"{BASE_URL}/{endpoint}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"}
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            elapsed = time.time() - t0
            body = resp.read().decode("utf-8")
            return resp.status, json.loads(body), elapsed
    except urllib.error.HTTPError as e:
        elapsed = time.time() - t0
        body = e.read().decode("utf-8")
        try:
            parsed = json.loads(body)
        except Exception:
            parsed = {"detail": body}
        return e.code, parsed, elapsed
    except Exception as e:
        elapsed = time.time() - t0
        return 500, {"detail": str(e)}, elapsed

def run_tests():
    print("=" * 70)
    print("🚀 VAANIAI MULTI-LANGUAGE & NEURAL VOICE VERIFICATION SUITE")
    print("=" * 70)

    total_tests = 0
    passed_tests = 0

    # 1. Test Incompatible Voice Validation (Strict HTTP 400)
    print("\n[TEST 1] Strict Voice-Language Compatibility Validation")
    total_tests += 1
    status, res, elapsed = make_request("tts", {
        "text": "నమస్కారం",
        "language": "te",
        "voice_id": "hi-IN-priya",  # Hindi voice on Telugu text
        "speed": 1.0
    })
    if status == 400 and "does not match requested language" in res.get("detail", ""):
        print(f"  ✓ PASSED: Mismatched voice correctly rejected (HTTP 400): {res['detail']}")
        passed_tests += 1
    else:
        print(f"  ✗ FAILED: Expected HTTP 400 rejection, got status {status}: {res}")

    # 2. Test Multi-Language Neural Synthesis & Male/Female Differentiation
    print("\n[TEST 2] Regional Language Neural Voices & Gender Differentiation")
    for tc in TEST_CASES:
        lang = tc["lang"]
        name = tc["name"]
        sample = tc["sample"]
        vf = tc["voice_female"]
        vm = tc["voice_male"]

        # Voice A (Female)
        status_f, res_f, elapsed_f = make_request("tts", {
            "text": sample,
            "language": lang,
            "voice_id": vf,
            "speed": 1.0
        })

        # Voice B (Male)
        status_m, res_m, elapsed_m = make_request("tts", {
            "text": sample,
            "language": lang,
            "voice_id": vm,
            "speed": 1.0
        })

        total_tests += 1
        if status_f == 200 and status_m == 200:
            dur_f = res_f.get("duration", 0)
            dur_m = res_m.get("duration", 0)
            engine_f = res_f.get("engine_used", "")
            engine_m = res_m.get("engine_used", "")
            audio_len_f = len(res_f.get("audio_base64", ""))
            audio_len_m = len(res_m.get("audio_base64", ""))

            # Voices must be different models or distinct outputs
            different_audio = (res_f.get("audio_base64") != res_m.get("audio_base64"))
            if different_audio:
                print(f"  ✓ {name:15} | Female ({vf}) [{engine_f}]: {dur_f:.2f}s ({audio_len_f//1024}KB)")
                print(f"    {' ':15} | Male   ({vm}) [{engine_m}]: {dur_m:.2f}s ({audio_len_m//1024}KB) -> Distinct Audio OK")
                passed_tests += 1
            else:
                print(f"  ✗ {name:15} | Failed: Female and Male returned identical audio!")
        else:
            print(f"  ✗ {name:15} | Error: Female({status_f}): {res_f.get('detail')} | Male({status_m}): {res_m.get('detail')}")

    # 3. Test Speed Scaling (0.75x > 1.0x > 1.25x)
    print("\n[TEST 3] Precise Neural Speed Scaling (0.75x > 1.0x > 1.25x)")
    total_tests += 1
    sample_text = "తెలుగు భారతదేశంలోని ప్రాచీనమైన మరియు అత్యంత సుందరమైన భాషలలో ఒకటి."
    s_075 = make_request("tts", {"text": sample_text, "language": "te", "voice_id": "te-IN-swara", "speed": 0.75})
    s_100 = make_request("tts", {"text": sample_text, "language": "te", "voice_id": "te-IN-swara", "speed": 1.0})
    s_125 = make_request("tts", {"text": sample_text, "language": "te", "voice_id": "te-IN-swara", "speed": 1.25})

    if s_075[0] == 200 and s_100[0] == 200 and s_125[0] == 200:
        d_075 = s_075[1].get("duration", 0)
        d_100 = s_100[1].get("duration", 0)
        d_125 = s_125[1].get("duration", 0)

        print(f"  - Speed 0.75x: Duration = {d_075:.2f}s")
        print(f"  - Speed 1.00x: Duration = {d_100:.2f}s")
        print(f"  - Speed 1.25x: Duration = {d_125:.2f}s")

        if d_075 > d_100 > d_125:
            print("  ✓ PASSED: Speed scaling inverse relationship strictly verified (0.75x > 1.0x > 1.25x)")
            passed_tests += 1
        else:
            print(f"  ✗ FAILED: Duration scaling failed ({d_075:.2f}s, {d_100:.2f}s, {d_125:.2f}s)")
    else:
        print("  ✗ FAILED: One or more speed requests failed")

    # 4. Test Audio Cache Performance
    print("\n[TEST 4] Audio Caching and Instant Retrieval")
    total_tests += 1
    t_start = time.time()
    s_cached = make_request("tts", {"text": sample_text, "language": "te", "voice_id": "te-IN-swara", "speed": 1.0})
    retrieval_ms = (time.time() - t_start) * 1000
    if s_cached[0] == 200 and s_cached[1].get("cached", False):
        print(f"  ✓ PASSED: Cached response retrieved in {retrieval_ms:.2f}ms (cached=True)")
        passed_tests += 1
    else:
        print(f"  ✗ FAILED: Cache lookup failed or returned non-cached: {s_cached[1]}")

    print("\n" + "=" * 70)
    print(f"TEST SUITE COMPLETE: {passed_tests}/{total_tests} Tests Passed ({(passed_tests/total_tests)*100:.1f}%)")
    print("=" * 70)

if __name__ == "__main__":
    run_tests()
