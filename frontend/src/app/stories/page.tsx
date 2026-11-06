"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Play,
  Pause
} from "lucide-react";
import { SpeechPlayer } from "@/lib/audioEngine";
import { useLanguage } from "@/context/LanguageContext";

export default function StoriesPage() {
  const { uiLanguage, t } = useLanguage();

  const stories = [
    {
      id: "te-fox",
      title: "జిత్తులమారి నక్క మరియు కాకి",
      en_title: "The Clever Fox and the Crow",
      lang: "te",
      category: "పంచతంత్ర కథలు (Panchatantra)",
      icon: "🦊",
      bgGradient: "from-amber-500 via-orange-500 to-rose-600",
      duration: "2 min",
      moral: "మోసపూరిత పొగడ్తలకు లొంగిపోకూడదు (Beware of flattery).",
      text: "అనగనగా ఒక అడవిలో ఒక కాకి ఉండేది. దానికి ఒక రుచికరమైన జున్ను ముక్క దొరికింది. అది ఆ ముక్కను నోట కరుచుకుని ఒక చెట్టు కొమ్మపై కూర్చుంది. ఇంతలో అటుగా వచ్చిన ఒక జిత్తులమారి నక్కకు ఆ జున్ను ముక్కపై ఆశ పుట్టింది. నక్క కాకి వద్దకు వచ్చి 'ఓ కాకి రాణీ! నీ స్వరం ఎంత మధురంగా ఉంటుందో నేను విన్నాను. దయచేసి నా కోసం ఒక చక్కని పాట పాడవా?' అని పొగిడింది. నక్క మాటలు నమ్మిన కాకి ఆనందంతో కావ్ కావ్ అంటూ నోరు తెరిచింది. వెంటనే ఆ జున్ను ముక్క కింద పడిపోయింది. నక్క దానిని తీసుకుని సంతోషంగా పారిపోయింది."
    },
    {
      id: "te-tenali",
      title: "తెనాలి రామకృష్ణ తెలివితేటలు",
      en_title: "Tenali Rama's Quick Wit",
      lang: "te",
      category: "హాస్య & నీతి కథలు (Wit & Humor)",
      icon: "👑",
      bgGradient: "from-indigo-600 via-purple-600 to-amber-500",
      duration: "3 min",
      moral: "సమయస్ఫూర్తితో ఎలాంటి కష్టాన్నైనా అధిగమించవచ్చు.",
      text: "శ్రీకృష్ణదేవరాయల ఆస్థానంలో తెనాలి రామకృష్ణుడు తన చమత్కారంతో అందరినీ ఆకట్టుకునేవాడు. ఒకసారి ఒక పొరుగు రాజు రాయలవారికి ఒక పరీక్ష పెట్టాడు. మూడు సమానమైన బొమ్మలను పంపి, వాటిలో ఉత్తమమైనది ఏదో చెప్పమన్నాడు. పండితులందరూ తలలు పట్టుకున్నారు. అప్పుడు తెనాలి రామకృష్ణుడు ఒక చిన్న గడ్డిపోచను తీసుకుని మొదటి బొమ్మ చెవిలో దూర్చాడు. అది రెండో చెవిలోంచి వచ్చింది. రెండో బొమ్మ నోట్లోంచి వచ్చింది. మూడో బొమ్మ కడుపులోకి వెళ్ళింది. రామకృష్ణుడు నవ్వుతూ 'మంచి మాటలను విన్న తర్వాత తమలోనే దాచుకునేవాడే ఉత్తముడు' అని మూడో బొమ్మను ఎంచుకున్నాడు. రాయలవారు రామకృష్ణుడిని ఘనంగా సత్కరించారు."
    },
    {
      id: "hi-rabbit",
      title: "शेर और चतुर खरगोश",
      en_title: "The Lion and the Clever Rabbit",
      lang: "hi",
      category: "पंचतंत्र कथाएं (Panchatantra)",
      icon: "🦁",
      bgGradient: "from-rose-600 via-amber-600 to-orange-500",
      duration: "2 min",
      moral: "बुद्धि से बड़ी से बड़ी शक्ति को भी हराया जा सकता है।",
      text: "एक वन में भासुरक नाम का एक बलशाली शेर रहता था। वह प्रतिदिन कई जानवरों का शिकार करता था। जानवरों ने मिलकर तय किया कि प्रतिदिन एक जानवर शेर के भोजन के लिए जाएगा। एक दिन एक छोटे खरगोश की बारी आई। खरगोश जानबूझकर देर से पहुंचा। शेर ने गुस्से में पूछा, 'तुम इतनी देर से क्यों आए?' खरगोश ने कहा, 'महाराज! रास्ते में मुझे दूसरा शेर मिल गया था, वह खुद को वन का राजा बता रहा था।' यह सुनकर शेर आगबबूला हो गया और कहा, 'मुझे दिखाओ वह कहां है।' खरगोश उसे एक गहरे कुएं के पास ले गया। शेर ने पानी में अपनी ही परछाई देखी और दूसरा शेर समझकर कुएं में कूद पड़ा और मारा गया।"
    },
    {
      id: "hi-birbal",
      title: "बीरबल की खिचड़ी",
      en_title: "Birbal's Khichdi",
      lang: "hi",
      category: "अकबर-बीरबल (Akbar Birbal)",
      icon: "🪔",
      bgGradient: "from-emerald-600 via-teal-600 to-indigo-700",
      duration: "3 min",
      moral: "सच्चे न्याय के लिए धैर्य और समझदारी की जरूरत होती है।",
      text: "कड़ाके की सर्दी में बादशाह अकबर ने घोषणा की कि जो कोई यमुना के बर्फीले पानी में रात भर खड़ा रहेगा, उसे भारी इनाम दिया जाएगा। एक गरीब ब्राह्मण ने इनाम के लालच में रात भर पानी में खड़े रहकर बिताई। सुबह जब वह इनाम लेने पहुंचा, तो अकबर ने पूछा, 'तुम इतनी ठंड में कैसे खड़े रहे?' ब्राह्मण ने कहा, 'महल के ऊपर जल रहे दीपक को देखकर मुझे आशा मिलती रही।' अकबर ने कहा, 'तुमने दीपक की गर्मी से जान बचाई, इसलिए तुम्हें इनाम नहीं मिलेगा।' बीरबल को यह अन्याय लगा। अगले दिन बीरबल ने बहुत ऊंचे पेड़ पर हांडी टांगकर नीचे जमीन पर आग जलाई और कहा कि मैं खिचड़ी पका रहा हूं। अकबर ने देखा और कहा, 'इतनी दूर से आग की गर्मी हांडी तक कैसे पहुंचेगी?' बीरबल ने तुरंत कहा, 'जहाँपनाह! जैसे महल का दीपक उस गरीब को गर्मी दे सकता है, वैसे ही यह खिचड़ी भी पक जाएगी।' अकबर को अपनी गलती समझ आ गई और उन्होंने ब्राह्मण को बुलाकर उचित इनाम दिया।"
    },
    {
      id: "ta-tortoise",
      title: "முயலும் ஆமையும்",
      en_title: "The Tortoise and the Hare",
      lang: "ta",
      category: "நீதிக் கதைகள் (Moral Tales)",
      icon: "🐢",
      bgGradient: "from-teal-600 via-emerald-600 to-amber-600",
      duration: "2 min",
      moral: "விடாமுயற்சியே வெற்றிக்கு வழிவகுக்கும் (Slow and steady wins the race).",
      text: "ஒரு காட்டில் வேகமாக ஓடும் முயல் ஒன்று வாழ்ந்து வந்தது. அது மெதுவாக நடக்கும் ஆமையைப் பார்த்து கேலி செய்தது. ஆமை கோபமடைந்து முயலை ஓட்டப் பந்தயத்திற்கு அழைத்தது. பந்தயம் தொடங்கியது. முயல் மின்னல் வேகத்தில் ஓடி வெகுதூரம் சென்றது. ஆமை வெகு தொலைவில் வருவதைக் கண்டு, 'சிறிது நேரம் ஒரு மரத்தடியில் ஓய்வெடுக்கலாம்' என்று படுத்து தூங்கிவிட்டது. ஆனால் ஆமையோ எங்கும் நிற்காமல் மெதுவாகவும் சீராகவும் தொடர்ந்து நடந்து எல்லையை அடைந்தது. முயல் கண் விழித்துப் பார்த்தபோது ஆமை வெற்றி பெற்றுவிட்டதை அறிந்து வெட்கித் தலைகுனிந்தது."
    },
    {
      id: "kn-elephant",
      title: "ಆನೆ ಮತ್ತು ಇರುವೆ",
      en_title: "The Elephant and the Ant",
      lang: "kn",
      category: "ಪಂಚತಂತ್ರ (Panchatantra)",
      icon: "🐘",
      bgGradient: "from-blue-600 via-indigo-600 to-amber-500",
      duration: "2 min",
      moral: "ಯಾರನ್ನೂ ಅವರ ಗಾತ್ರದಿಂದ ಕೀಳಾಗಿ ಕಾಣಬಾರದು (Never underestimate anyone).",
      text: "ದಟ್ಟವಾದ ಕಾಡಿನಲ್ಲಿ ಒಂದು ಬಲಿಷ್ಠ ಆನೆ ಇತ್ತು. ಅದು ತನ್ನ ದೊಡ್ಡ ಗಾತ್ರದ ಬಗ್ಗೆ ತುಂಬಾ ಗರ್ವ ಹೊಂದಿತ್ತು. ದಾರಿಯಲ್ಲಿ ಸಿಗುವ ಸಣ್ಣ ಪ್ರಾಣಿಗಳನ್ನು ಹೆದರಿಸುತ್ತಿತ್ತು. ಒಂದು ದಿನ ಇರುವೆಗಳ ಸಾಲು ಆಹಾರ ಸಂಗ್ರಹಿಸುತ್ತಿದ್ದಾಗ, ಆನೆ ಅವುಗಳ ಮೇಲೆ ನೀರು ಎರಚಿ ತಮಾಷೆ ಮಾಡಿತು. ಒಂದು ಸಣ್ಣ ಇರುವೆ ಆನೆಗೆ ಪಾಠ ಕಲಿಸಲು ನಿರ್ಧರಿಸಿತು. ಆನೆ ಮಲಗಿದ್ದಾಗ ಇರುವೆ ಅದರ ಸೊಂಡಿಲಿನೊಳಗೆ ನುಗ್ಗಿ ಕಚ್ಚಲು ಪ್ರಾರಂಭಿಸಿತು. ಆನೆ ನೋವಿನಿಂದ ಅರಚುತ್ತಾ ಕ್ಷಮೆ ಕೇಳಿತು. ಆಗ ಇರುವೆ ಹೊರಬಂದು ಯಾರನ್ನೂ ಕೀಳಾಗಿ ಕಾಣಬೇಡ ಎಂದು ಬುದ್ಧಿ ಹೇಳಿತು."
    }
  ];

  const [selectedStory, setSelectedStory] = useState(stories[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIdx, setCurrentWordIdx] = useState<number | null>(null);

  const handlePlayStory = async (story: typeof stories[0]) => {
    if (selectedStory.id === story.id && isPlaying) {
      SpeechPlayer.stopAll();
      setIsPlaying(false);
      setCurrentWordIdx(null);
      return;
    }

    setSelectedStory(story);
    setIsPlaying(true);
    setCurrentWordIdx(null);

    await SpeechPlayer.speak(story.text, story.lang, {
      speed: 0.92, // Slower melodious storytelling pace
      emotion: "storytelling",
      onWord: (wIdx) => setCurrentWordIdx(wIdx),
      onEnd: () => {
        setIsPlaying(false);
        setCurrentWordIdx(null);
      },
      onError: () => {
        setIsPlaying(false);
        setCurrentWordIdx(null);
      }
    });
  };

  const words = selectedStory.text.split(/\s+/).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-950/70 border-2 border-amber-300 dark:border-amber-700 text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 shadow-sm">
            <span>📖</span>
            <span>{t("story_page_badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            {t("story_page_title")}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("story_page_desc")}
          </p>
        </div>

        {/* ACTIVE STORY PLAYER BANNER */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-3 border-amber-400 dark:border-amber-600 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-3xl bg-gradient-to-tr ${selectedStory.bgGradient} flex items-center justify-center text-4xl shadow-lg flex-shrink-0`}>
                {selectedStory.icon}
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                  {selectedStory.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
                  {selectedStory.title}
                </h2>
                <span className="text-xs text-slate-500 font-bold">
                  {selectedStory.en_title} • {selectedStory.duration}
                </span>
              </div>
            </div>

            {/* Giant Green Play Button for Selected Story */}
            <button
              type="button"
              onClick={() => handlePlayStory(selectedStory)}
              className="px-8 py-5 rounded-3xl font-black text-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 active:scale-95 transition-all self-start sm:self-center"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
              <span>{isPlaying ? t("story_btn_pause") : `🔊 ${t("story_btn_play")}`}</span>
            </button>
          </div>

          {/* Karaoke Live Highlighting Area */}
          <div className="p-6 rounded-2xl bg-amber-50/40 dark:bg-slate-800/60 border-2 border-amber-200/50 dark:border-slate-700 max-h-72 overflow-y-auto text-xl leading-loose font-bold">
            {words.map((w, idx) => {
              const isActive = idx === currentWordIdx;
              return (
                <span
                  key={idx}
                  className={`inline-block mr-2 px-1.5 py-0.5 rounded-lg transition-all ${
                    isActive
                      ? "karaoke-word-active scale-110 shadow-lg"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {w}
                </span>
              );
            })}
          </div>

          {/* Moral Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/60 dark:to-orange-950/60 border-2 border-amber-300 dark:border-amber-800 flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-200 block">
                {t("story_moral_label")}
              </span>
              <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                {selectedStory.moral}
              </span>
            </div>
          </div>

        </div>

        {/* STORIES CATALOG GRID */}
        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
              {t("story_more_title")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {t("story_more_sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => {
              const isCurrent = selectedStory.id === story.id;
              const isCurrentlyPlaying = isCurrent && isPlaying;
              return (
                <div
                  key={story.id}
                  className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border-3 transition-all flex flex-col justify-between space-y-4 card-hover-friendly ${
                    isCurrent
                      ? "border-amber-400 dark:border-amber-500 shadow-xl"
                      : "border-slate-200 dark:border-slate-800 shadow-md hover:border-amber-300"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${story.bgGradient} flex items-center justify-center text-3xl shadow-md`}>
                        {story.icon}
                      </div>
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {story.duration}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 block">
                        {story.category}
                      </span>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white font-heading mt-0.5">
                        {story.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold">
                        {story.en_title}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {story.text}
                    </p>
                  </div>

                  <div className="pt-3 border-t-2 border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => handlePlayStory(story)}
                      className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
                    >
                      {isCurrentlyPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white" />
                      )}
                      <span>{isCurrentlyPlaying ? t("btn_stop") : `🔊 ${t("story_btn_play")}`}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
