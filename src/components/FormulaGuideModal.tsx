import React from 'react';
import { BookOpen, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FormulaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaGuideModal: React.FC<FormulaGuideModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md pointer-events-auto">
      <div className="bg-slate-950 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[calc(100dvh-2rem)] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center justify-between bg-white/5 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {language === 'hi' 
                  ? 'पंचांग खगोलीय गणित व सूत्र रहस्य' 
                  : 'Mathematical Foundations of Vedic Astronomy'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                {language === 'hi' 
                  ? 'दोहरी चक्र प्रणाली एवं खगोलीय सामंजस्य' 
                  : 'The Dual-Wheel Architecture & Cosmic Cycles'}
              </p>
            </div>
          </div>
          <button
            id="btn-close-math-guide"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
            title={language === 'hi' ? 'बंद करें' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain p-4 sm:p-5 space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed custom-scrollbar">
          
          {/* Static Constants reference */}
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-xs uppercase font-bold text-slate-400 block mb-2">
              {language === 'hi' ? 'दोहरी चक्र प्रणाली' : 'The Dual-Wheel Architecture'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block font-sans text-[11px]">
                  {language === 'hi' ? 'नक्षत्र चक्र (Star Wheel):' : 'Star Wheel (Nakshatras):'}
                </span>
                <span className="text-white font-bold block">
                  {language === 'hi' ? '27.3 दिन (360° ÷ 27 = 13°20\')' : '27.3 Days (360° ÷ 27 = 13°20\')'}
                </span>
                <span className="text-slate-400 text-[10px] font-sans">
                  {language === 'hi' ? 'स्थिर तारों के सापेक्ष' : 'Relative to fixed background stars'}
                </span>
              </div>
              <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block font-sans text-[11px]">
                  {language === 'hi' ? 'तिथि चक्र (Phase Wheel):' : 'Phase Wheel (Tithis):'}
                </span>
                <span className="text-white font-bold block">
                  {language === 'hi' ? '29.5 दिन (360° ÷ 30 = 12°00\')' : '29.5 Days (360° ÷ 30 = 12°00\')'}
                </span>
                <span className="text-slate-400 text-[10px] font-sans">
                  {language === 'hi' ? 'सूर्य-चन्द्र दूरी (कलाएं)' : 'Sun-Moon elongation (Moon phases)'}
                </span>
              </div>
              <div className="bg-black/20 p-2.5 rounded-lg border border-white/5 sm:col-span-3 lg:col-span-1">
                <span className="text-slate-400 block font-sans text-[11px]">
                  {language === 'hi' ? 'अधिक मास (Solar Sync):' : 'Adhika Masa (Leap Month):'}
                </span>
                <span className="text-amber-300 font-bold block">
                  {language === 'hi' ? 'प्रत्येक ~32.5 माह में' : 'Every ~32.5 Months'}
                </span>
                <span className="text-slate-400 text-[10px] font-sans">
                  {language === 'hi' ? '11 दिन वार्षिक अंतर संतुलन' : 'Bridges 11-day annual solar drift'}
                </span>
              </div>
            </div>
          </div>

          {/* 1. The Two Harmonized Wheels */}
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-3">
            <div className="border-b border-white/10 pb-2">
              <span className="text-white font-bold text-sm block">
                {language === 'hi' 
                  ? '1. दो समानांतर चक्र: नक्षत्र और तिथि' 
                  : '1. The Two Harmonized Systems: Nakshatra vs. Tithi'}
              </span>
              <span className="text-slate-400 text-xs block">
                {language === 'hi' 
                  ? 'The Two Parallel Wheels (Sidereal vs. Synodic)' 
                  : 'Parallel Tracking of Physical Stars and Lunar Illumination'}
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-200">
              {language === 'hi' ? (
                <>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">नक्षत्र चक्र (The Star Wheel):</strong> आकाश के 360° को 27 समान भागों (प्रत्येक 13°20') में विभाजित करता है। यह स्थिर तारों की पृष्ठभूमि में चन्द्रमा की वास्तविक भौतिक स्थिति को दर्शाता है (27.3 दिनों का चक्र)।
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">तिथि चक्र (The Phase Wheel):</strong> सूर्य और चन्द्रमा के बीच की सापेक्षिक कोणीय दूरी (Elongation) को मापता है। यह 360° के सम्पूर्ण प्रकाश-चक्र को 30 तिथियों (प्रत्येक ठीक 12°) में विभाजित करता है (29.5 दिनों का चक्र)।
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-amber-300 font-semibold">स्वचालित सामंजस्य:</strong> क्योंकि तिथि किसी स्थिर स्थान के बजाय सूर्य-चन्द्र की आपसी दूरी को मापती है, इसलिए यह प्रत्येक माह नक्षत्रों पर आगे खिसकते हुए पृथ्वी की वार्षिक सूर्य-परिक्रमा को स्वतः समाहित (absorb) कर लेती है।
                  </p>
                </>
              ) : (
                <>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">The Star Wheel (Nakshatras):</strong> Divides the 360° celestial sphere into 27 equal divisions of 13°20' each. It tracks the Moon's true physical position against the background of fixed stars (27.3-day sidereal cycle).
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">The Phase Wheel (Tithis):</strong> Measures the relative angular separation (elongation) between the Sun and the Moon. It divides the 360° illumination cycle into 30 lunar days (tithis) of exactly 12° each (29.5-day synodic cycle).
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-amber-300 font-semibold">Automatic Compensation:</strong> Because a Tithi is relative to the moving Sun rather than fixed stars, it seamlessly absorbs Earth's orbital movement around the Sun without needing artificial adjustments.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 2. How Tithi Compensates for Earth's Orbit */}
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-3">
            <div className="border-b border-white/10 pb-2">
              <span className="text-white font-bold text-sm block">
                {language === 'hi' 
                  ? '2. 2.2 दिन का अतिरिक्त अंतर क्यों?' 
                  : "2. Why the Moon Needs an Extra 2.2 Days to Complete its Phase"}
              </span>
              <span className="text-slate-400 text-xs block">
                {language === 'hi' 
                  ? "How Tithis Compensate for Earth's Orbit Around the Sun" 
                  : "Earth's Orbital Shift and Lunar Phase Realignment"}
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-200">
              {language === 'hi' ? (
                <>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    अमावस्या पर सूर्य और चन्द्रमा 0° पर एक साथ होते हैं। 27.3 दिनों बाद चन्द्रमा 360° पूरा घूमकर उसी मूल नक्षत्र में लौट आता है। <strong>किन्तु इन 27.3 दिनों में पृथ्वी भी सूर्य के चारों ओर लगभग 27° आगे बढ़ चुकी होती है!</strong>
                  </p>
                  
                  {/* Visual Catch-up Diagram */}
                  <div className="bg-black/40 p-3 rounded-lg border border-white/10 font-mono text-[11px] sm:text-xs text-amber-200 space-y-1 overflow-x-auto">
                    <div>[दिन 27.3: तारा मास] ──► चन्द्रमा मूल नक्षत्र पर पहुँचा</div>
                    <div className="text-slate-400 pl-4">└─► किन्तु सूर्य पृथ्वी की गति के कारण ~27° आगे निकल गया</div>
                    <div className="pt-1">[दिन 29.5: चांद्र मास] ──► चन्द्रमा ने ~2.2 दिन अतिरिक्त चलकर सूर्य को पकड़ा (अमावस्या)</div>
                  </div>

                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    सूर्य को पुनः पकड़ने के लिए चन्द्रमा को लगभग <strong>2.2 दिन और चलना पड़ता है</strong> (लगभग 2 अतिरिक्त नक्षत्र पार करने होते हैं)। वैदिक पंचांग तिथि को 12° की दर से मापता है, अतः चांद्र मास केवल तभी समाप्त होता है जब 30वीं तिथि पूर्ण हो जाए—चाहे वह किसी भी नक्षत्र में क्यों न हो।
                  </p>
                </>
              ) : (
                <>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    At the New Moon (Amavasya), the Sun and Moon align at 0°. After 27.3 days, the Moon completes a full 360° orbit and returns to the same constellation. <strong>However, during those 27.3 days, Earth has traveled ~27° forward in its orbit around the Sun!</strong>
                  </p>
                  
                  {/* Visual Catch-up Diagram */}
                  <div className="bg-black/40 p-3 rounded-lg border border-white/10 font-mono text-[11px] sm:text-xs text-amber-200 space-y-1 overflow-x-auto">
                    <div>[Day 27.3: Star Month Ends]  ──► Moon reaches original Nakshatra</div>
                    <div className="text-slate-400 pl-4">└─► But Sun has moved ~27° ahead due to Earth's orbit</div>
                    <div className="pt-1">[Day 29.5: Phase Month Ends] ──► Moon travels extra ~2.2 days to catch up (New Moon)</div>
                  </div>

                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    To realign with the Sun and complete the phase cycle, the Moon must travel an additional <strong>~2.2 days</strong> (~2 extra Nakshatras). Because the Vedic Tithi is pegged to 12° increments of Sun-Moon separation, a lunar month only concludes when all 30 Tithis finish, ensuring automatic geometric harmony.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 3. Why Ancient Indian Rishis Chose Exactly 27 Nakshatras */}
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-3">
            <div className="border-b border-white/10 pb-2">
              <span className="text-white font-bold text-sm block">
                {language === 'hi' 
                  ? '3. 27 नक्षत्र ही क्यों? (ऋषियों का खगोलीय रहस्य)' 
                  : '3. Why Ancient Indian Rishis Chose Exactly 27 Nakshatras'}
              </span>
              <span className="text-slate-400 text-xs block">
                {language === 'hi' 
                  ? 'The Mathematical Logic Behind 27 Lunar Mansions & 108 Padas' 
                  : 'Daily Moon Travel, 108 Sacred Padas, and the Intercalary Star Abhijit'}
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-200">
              {language === 'hi' ? (
                <>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">तारों की दैनिक यात्रा:</strong> चन्द्रमा को स्थिर तारों के सापेक्ष सम्पूर्ण चक्र पूरा करने में <strong className="text-amber-300 font-semibold">27.32 दिन</strong> लगते हैं। प्राचीन ऋषियों ने देखा कि हर रात चन्द्रमा एक भिन्न प्रमुख तारा-समूह (नक्षत्र) के पास विश्राम करता है।
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">पूर्णांक विभाजन:</strong> 360° आकाश को 27 भागों में बांटने से प्रतिदिन का स्पष्ट पैमाना मिला:
                    <span className="block mt-1 font-mono text-amber-200 text-xs sm:text-sm">
                      360° ÷ 27 नक्षत्र = 13°20' (13.333°) प्रति नक्षत्र
                    </span>
                    यह ठीक वही दूरी है जो चन्द्रमा प्रतिदिन आकाश में तय करता है!
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">108 पवित्र चरण (पाद):</strong> प्रत्येक नक्षत्र के 4 चरण करने पर कुल <strong className="text-amber-300 font-semibold">108 पाद</strong> बनते हैं (27 × 4 = 108)। 12 राशियों में 108 को बांटने पर प्रत्येक राशि में ठीक <strong className="text-amber-300 font-semibold">9 पाद</strong> (2¼ नक्षत्र) आते हैं, जिसने बिना किसी दशमलव के सूर्य और चन्द्र दोनों चक्रों को जोड़ दिया।
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">28वाँ सूक्ष्म नक्षत्र (अभिजीत):</strong> 27.32 दिन 27 से थोड़ा अधिक है। शेष ~0.32 दिन (लगभग 7.7 घंटे) को 28वें विशेष नक्षत्र <em className="text-amber-200">अभिजीत</em> (अभिजित / Vega तारा) के रूप में अत्यंत शुभ क्षणों के लिए मान्य किया गया।
                  </p>
                </>
              ) : (
                <>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">Daily Lunar Transit:</strong> The Moon takes approximately <strong className="text-amber-300 font-semibold">27.32 days</strong> to orbit the Earth relative to fixed background stars. Ancient Indian astronomers observed that each night, the Moon rests alongside a distinct prominent star grouping (lunar mansion or Nakshatra).
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">Natural Integer Division:</strong> Dividing the 360° circle into 27 equal divisions produced an elegant daily distance metric:
                    <span className="block mt-1 font-mono text-amber-200 text-xs sm:text-sm">
                      360° ÷ 27 Nakshatras = 13°20' (13.333°) per Nakshatra
                    </span>
                    This matches almost exactly the distance the Moon travels across the celestial sphere in a single day!
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">The 108 Sacred Steps (Padas):</strong> Dividing each Nakshatra into 4 quarters (padas) produces <strong className="text-amber-300 font-semibold">108 celestial steps</strong> (27 × 4 = 108). When overlaid onto the 12 solar Zodiac signs, each sign contains exactly <strong className="text-amber-300 font-semibold">9 padas</strong> (2¼ Nakshatras), beautifully bridging solar and lunar cycles with zero fractional remainder.
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">The 28th Intercalary Star (Abhijit):</strong> Because the sidereal month is 27.32 days (slightly longer than 27), the fractional ~0.32 day (~7.7 hours) was honored as the intercalary asterism <em className="text-amber-200">Abhijit</em> (the star Vega), reserved for auspicious timings.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 4. Long-Term Solar Alignment: Adhika Masa */}
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-3">
            <div className="border-b border-white/10 pb-2">
              <span className="text-white font-bold text-sm block">
                {language === 'hi' 
                  ? '4. दीर्घकालिक संतुलन: अधिक मास (Leap Month)' 
                  : '4. Long-Term Solar Alignment: The Adhika Masa'}
              </span>
              <span className="text-slate-400 text-xs block">
                {language === 'hi' 
                  ? 'Bridging the 11-Day Annual Gap Between Solar and Lunar Years' 
                  : 'Sankranti Transits and the 32.5-Month Synchronization Cycle'}
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-200">
              {language === 'hi' ? (
                <>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">11 दिन का वार्षिक अंतर:</strong> 12 चांद्र मासों का एक वर्ष 354 दिनों (12 × 29.5 दिन) का होता है, जो पृथ्वी के 365.25 दिनों के सौर वर्ष से लगभग <strong>11 दिन छोटा</strong> होता है। यदि इसे ठीक न किया जाए, तो हर 3 साल में ऋतुएं एक माह आगे खिसक जाएंगी।
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">संक्रांति का नियम:</strong> प्राचीन भारतीय खगोलविदों ने सूर्य के राशि परिवर्तन (संक्रांति) को देखा। जब कोई चांद्र मास बिना किसी सूर्य संक्रांति के बीत जाता है (लगभग <strong>प्रत्येक 32.5 महीनों में</strong>), तब उस वर्ष में एक 13वाँ अतिरिक्त मास जोड़ दिया जाता है जिसे <strong className="text-amber-300 font-semibold">अधिक मास (पुरुषोत्तम मास)</strong> कहा जाता है।
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    यह व्यवस्था चांद्र मासों और ऋतुओं (सौर वर्ष) को हमेशा के लिए एक आदर्श प्राकृतिक सामंजस्य में बनाए रखती है।
                  </p>
                </>
              ) : (
                <>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">The 11-Day Annual Drift:</strong> A lunar year of 12 synodic months spans approximately 354 days (12 × 29.53 days), falling roughly <strong>11 days short</strong> of the 365.25-day tropical solar year. Without correction, agricultural seasons and festivals would drift by a full month every 3 years.
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    <strong className="text-white font-semibold">The Sankranti Rule:</strong> Ancient Vedic astronomers tied lunar months to solar ingress (Sankranti, when the Sun moves into a new Zodiac sign). Whenever a lunar month transpires with no solar transit (occurring approximately <strong>every 32.5 months</strong>), a 13th leap month—<strong className="text-amber-300 font-semibold">Adhika Masa</strong>—is inserted.
                  </p>
                  <p className="bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                    This elegant astronomical feedback loop keeps the lunar calendar continuously locked to Earth's solar seasons, equinoxes, and solstices for millennia.
                  </p>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
