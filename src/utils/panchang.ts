import { CelestialAngles, FestivalInfo, PanchangData } from '../types';

export const TITHI_NAMES = [
  { hi: "प्रतिपदा", en: "Pratipada" },
  { hi: "द्वितीया", en: "Dwitiya" },
  { hi: "तृतीया", en: "Tritiya" },
  { hi: "चतुर्थी", en: "Chaturthi" },
  { hi: "पंचमी", en: "Panchami" },
  { hi: "षष्ठी", en: "Shashthi" },
  { hi: "सप्तमी", en: "Saptami" },
  { hi: "अष्टमी", en: "Ashtami" },
  { hi: "नवमी", en: "Navami" },
  { hi: "दशमी", en: "Dashami" },
  { hi: "एकादशी", en: "Ekadashi" },
  { hi: "द्वादशी", en: "Dwadashi" },
  { hi: "त्रयोदशी", en: "Trayodashi" },
  { hi: "चतुर्दशी", en: "Chaturdashi" },
  { hi: "पूर्णिमा", en: "Purnima" },
  { hi: "प्रतिपदा", en: "Pratipada" },
  { hi: "द्वितीया", en: "Dwitiya" },
  { hi: "तृतीया", en: "Tritiya" },
  { hi: "चतुर्थी", en: "Chaturthi" },
  { hi: "पंचमी", en: "Panchami" },
  { hi: "षष्ठी", en: "Shashthi" },
  { hi: "सप्तमी", en: "Saptami" },
  { hi: "अष्टमी", en: "Ashtami" },
  { hi: "नवमी", en: "Navami" },
  { hi: "दशमी", en: "Dashami" },
  { hi: "एकादशी", en: "Ekadashi" },
  { hi: "द्वादशी", en: "Dwadashi" },
  { hi: "त्रयोदशी", en: "Trayodashi" },
  { hi: "चतुर्दशी", en: "Chaturdashi" },
  { hi: "अमावस्या", en: "Amavasya" }
];

export const NAKSHATRA_NAMES = [
  { name: "अश्विनी", nameEn: "Ashwini", lord: "केतु", lordEn: "Ketu" },
  { name: "भरणी", nameEn: "Bharani", lord: "शुक्र", lordEn: "Venus" },
  { name: "कृत्तिका", nameEn: "Krittika", lord: "सूर्य", lordEn: "Sun" },
  { name: "रोहिणी", nameEn: "Rohini", lord: "चन्द्र", lordEn: "Moon" },
  { name: "मृगशीर्ष", nameEn: "Mrigashira", lord: "मंगल", lordEn: "Mars" },
  { name: "आर्द्रा", nameEn: "Ardra", lord: "राहु", lordEn: "Rahu" },
  { name: "पुनर्वसु", nameEn: "Punarvasu", lord: "गुरु", lordEn: "Jupiter" },
  { name: "पुष्य", nameEn: "Pushya", lord: "शनि", lordEn: "Saturn" },
  { name: "आश्लेषा", nameEn: "Ashlesha", lord: "बुध", lordEn: "Mercury" },
  { name: "मघा", nameEn: "Magha", lord: "केतु", lordEn: "Ketu" },
  { name: "पूर्व फाल्गुनी", nameEn: "Purva Phalguni", lord: "शुक्र", lordEn: "Venus" },
  { name: "उत्तर फाल्गुनी", nameEn: "Uttara Phalguni", lord: "सूर्य", lordEn: "Sun" },
  { name: "हस्त", nameEn: "Hasta", lord: "चन्द्र", lordEn: "Moon" },
  { name: "चित्रा", nameEn: "Chitra", lord: "मंगल", lordEn: "Mars" },
  { name: "स्वाति", nameEn: "Swati", lord: "राहु", lordEn: "Rahu" },
  { name: "विशाखा", nameEn: "Vishakha", lord: "गुरु", lordEn: "Jupiter" },
  { name: "अनुराधा", nameEn: "Anuradha", lord: "शनि", lordEn: "Saturn" },
  { name: "ज्येष्ठा", nameEn: "Jyeshtha", lord: "बुध", lordEn: "Mercury" },
  { name: "मूल", nameEn: "Mula", lord: "केतु", lordEn: "Ketu" },
  { name: "पूर्वाषाढ़ा", nameEn: "Purva Ashadha", lord: "शुक्र", lordEn: "Venus" },
  { name: "उत्तराषाढ़ा", nameEn: "Uttara Ashadha", lord: "सूर्य", lordEn: "Sun" },
  { name: "श्रवण", nameEn: "Shravana", lord: "चन्द्र", lordEn: "Moon" },
  { name: "धनिष्ठा", nameEn: "Dhanishta", lord: "मंगल", lordEn: "Mars" },
  { name: "शतभिषा", nameEn: "Shatabhisha", lord: "राहु", lordEn: "Rahu" },
  { name: "पूर्व भाद्रपद", nameEn: "Purva Bhadrapada", lord: "गुरु", lordEn: "Jupiter" },
  { name: "उत्तर भाद्रपद", nameEn: "Uttara Bhadrapada", lord: "शनि", lordEn: "Saturn" },
  { name: "रेवती", nameEn: "Revati", lord: "बुध", lordEn: "Mercury" }
];

export const VAAR_NAMES = [
  { hi: "रविवार", en: "Sunday" },
  { hi: "सोमवार", en: "Monday" },
  { hi: "मंगलवार", en: "Tuesday" },
  { hi: "बुधवार", en: "Wednesday" },
  { hi: "गुरुवार", en: "Thursday" },
  { hi: "शुक्रवार", en: "Friday" },
  { hi: "शनिवार", en: "Saturday" }
];

export const MAAS_NAMES = [
  { hi: "चैत्र", en: "Chaitra" },
  { hi: "वैशाख", en: "Vaisakha" },
  { hi: "ज्येष्ठ", en: "Jyeshtha" },
  { hi: "आषाढ़", en: "Ashadha" },
  { hi: "श्रावण", en: "Shravana" },
  { hi: "भाद्रपद", en: "Bhadrapada" },
  { hi: "आश्विन", en: "Ashwin" },
  { hi: "कार्तिक", en: "Kartika" },
  { hi: "मार्गशीर्ष", en: "Margashirsha" },
  { hi: "पौष", en: "Pausha" },
  { hi: "माघ", en: "Magha" },
  { hi: "फाल्गुन", en: "Phalguna" }
];

export const RASHI_NAMES = [
  { hi: "मेष", en: "Aries" },
  { hi: "वृषभ", en: "Taurus" },
  { hi: "मिथुन", en: "Gemini" },
  { hi: "कर्क", en: "Cancer" },
  { hi: "सिंह", en: "Leo" },
  { hi: "कन्या", en: "Virgo" },
  { hi: "तुला", en: "Libra" },
  { hi: "वृश्चिक", en: "Scorpio" },
  { hi: "धनु", en: "Sagittarius" },
  { hi: "मकर", en: "Capricorn" },
  { hi: "कुम्भ", en: "Aquarius" },
  { hi: "मीन", en: "Pisces" }
];

export const YOGA_NAMES = [
  { hi: "विष्कुम्भ", en: "Vishkumbha" },
  { hi: "प्रीति", en: "Priti" },
  { hi: "आयुष्मान", en: "Ayushman" },
  { hi: "सौभाग्य", en: "Saubhagya" },
  { hi: "शोभन", en: "Shobhana" },
  { hi: "अतिगण्ड", en: "Atiganda" },
  { hi: "सुकर्मा", en: "Sukarma" },
  { hi: "धृति", en: "Dhriti" },
  { hi: "शूल", en: "Shula" },
  { hi: "गण्ड", en: "Ganda" },
  { hi: "वृद्धि", en: "Vriddhi" },
  { hi: "ध्रुव", en: "Dhruva" },
  { hi: "व्याघात", en: "Vyaghata" },
  { hi: "हर्षण", en: "Harshana" },
  { hi: "वज्र", en: "Vajra" },
  { hi: "सिद्धि", en: "Siddhi" },
  { hi: "व्यतीपात", en: "Vyatipata" },
  { hi: "वरीयान्", en: "Variyan" },
  { hi: "परिघ", en: "Parigha" },
  { hi: "शिव", en: "Shiva" },
  { hi: "सिद्ध", en: "Siddha" },
  { hi: "साध्य", en: "Sadhya" },
  { hi: "शुभ", en: "Shubha" },
  { hi: "शुक्ल", en: "Shukla" },
  { hi: "ब्रह्म", en: "Brahma" },
  { hi: "इन्द्र", en: "Indra" },
  { hi: "वैधृति", en: "Vaidhriti" }
];

export const KARANA_NAMES = [
  { hi: "बव", en: "Bava" },
  { hi: "बालव", en: "Balava" },
  { hi: "कौलव", en: "Kaulava" },
  { hi: "तैतिल", en: "Taitila" },
  { hi: "गर", en: "Gara" },
  { hi: "वणिज", en: "Vanija" },
  { hi: "विष्टि/भद्रा", en: "Vishti / Bhadra" },
  { hi: "शकुनि", en: "Shakuni" },
  { hi: "चतुष्पाद", en: "Chatushpada" },
  { hi: "नाग", en: "Naga" },
  { hi: "किंस्तुघ्न", en: "Kinstughna" }
];

export interface StaticFestival {
  name: string;
  hindiName: string;
  icon: string;
  description: string;
}

export const STATIC_FESTIVALS: Record<string, StaticFestival> = {
  // 2026
  '2026-11-08': {
    name: 'Diwali (Deepavali)',
    hindiName: 'दीपावली (लक्ष्मी पूजन)',
    icon: '🪔',
    description: 'Grand Festival of Lights on Kartik Amavasya'
  },
  '2026-03-03': {
    name: 'Holi',
    hindiName: 'होली (रंगोत्सव)',
    icon: '🎨',
    description: 'Vibrant festival of colours and divine love'
  },
  '2026-03-27': {
    name: 'Ram Navami',
    hindiName: 'श्री राम नवमी',
    icon: '🏹',
    description: 'Appearance day of Bhagwan Shri Rama'
  },
  '2026-09-04': {
    name: 'Krishna Janmashtami',
    hindiName: 'श्री कृष्ण जन्माष्टमी',
    icon: '🦚',
    description: 'Appearance day of Bhagwan Shri Krishna'
  },
  '2026-10-20': {
    name: 'Vijayadashami (Dussehra)',
    hindiName: 'विजयादशमी (दशहरा)',
    icon: '🏹',
    description: 'Victory of good over evil'
  },
  '2026-02-15': {
    name: 'Maha Shivaratri',
    hindiName: 'महाशिवरात्रि',
    icon: '🕉️',
    description: 'The auspicious night of Lord Shiva and Shakti'
  },
  // 2025
  '2025-10-20': {
    name: 'Diwali',
    hindiName: 'दीपावली (लक्ष्मी पूजन)',
    icon: '🪔',
    description: 'Grand Festival of Lights on Kartik Amavasya'
  },
  '2025-03-14': {
    name: 'Holi',
    hindiName: 'होली (होलिका दहन)',
    icon: '🎨',
    description: 'Vibrant festival of colours and divine love'
  },
  '2025-02-26': {
    name: 'Maha Shivaratri',
    hindiName: 'महाशिवरात्रि',
    icon: '🕉️',
    description: 'The auspicious night of Lord Shiva and Shakti'
  },
  '2025-04-06': {
    name: 'Ram Navami',
    hindiName: 'श्री राम नवमी',
    icon: '🏹',
    description: 'Appearance day of Bhagwan Shri Rama'
  },
  '2025-08-16': {
    name: 'Krishna Janmashtami',
    hindiName: 'श्री कृष्ण जन्माष्टमी',
    icon: '🦚',
    description: 'Appearance day of Bhagwan Shri Krishna'
  },
  // 2024
  '2024-11-01': {
    name: 'Diwali',
    hindiName: 'दीपावली (लक्ष्मी पूजन)',
    icon: '🪔',
    description: 'Grand Festival of Lights on Kartik Amavasya'
  },
  '2024-03-25': {
    name: 'Holi',
    hindiName: 'होली (रंगोत्सव)',
    icon: '🎨',
    description: 'Festival of colours'
  },
};

export function normalizeAngle(angle: number): number {
  let a = angle % 360;
  if (a < 0) a += 360;
  return a;
}

export function calculatePanchang(date: Date): PanchangData {
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  const day = date.getUTCDate() + (date.getUTCHours() / 24) + (date.getUTCMinutes() / 1440) + (date.getUTCSeconds() / 86400);

  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  const T = (JD - 2451545.0) / 36525;

  // Mean longitude of Sun
  const L0 = normalizeAngle(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  // Mean anomaly of Sun
  const M_sun = normalizeAngle(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const M_sun_rad = (M_sun * Math.PI) / 180;

  // Sun's Equation of Center
  const C_sun = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M_sun_rad) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M_sun_rad) +
    0.000289 * Math.sin(3 * M_sun_rad);

  const tropicalSun = normalizeAngle(L0 + C_sun);

  // Moon's parameters
  const Lp = normalizeAngle(218.3164477 + 481267.88123421 * T);
  const D = normalizeAngle(297.8501921 + 445267.1114034 * T);
  const D_rad = (D * Math.PI) / 180;
  const Mp = normalizeAngle(134.9633964 + 477198.8675055 * T);
  const Mp_rad = (Mp * Math.PI) / 180;
  const F = normalizeAngle(93.2720950 + 483202.0175233 * T);
  const F_rad = (F * Math.PI) / 180;

  // Perturbations for Moon's longitude
  const tropicalMoon = normalizeAngle(
    Lp + 6.289 * Math.sin(Mp_rad) +
    1.274 * Math.sin(2 * D_rad - Mp_rad) +
    0.658 * Math.sin(2 * D_rad) +
    0.214 * Math.sin(2 * Mp_rad) -
    0.186 * Math.sin(M_sun_rad) -
    0.114 * Math.sin(2 * F_rad)
  );

  // Moon's Ecliptic Latitude (inclination of lunar orbit to ecliptic is ~5.145°, creating up to ~5.2° latitude)
  const moonLatitude = 5.128 * Math.sin(F_rad) + 0.281 * Math.sin(Mp_rad + F_rad);

  // Lahiri Ayanamsa computation
  const ayanamsa = 23.85 + (1.396 / 100) * ((date.getFullYear() - 2000) + (month / 12));
  const siderealSun = normalizeAngle(tropicalSun - ayanamsa);
  const siderealMoon = normalizeAngle(tropicalMoon - ayanamsa);

  // Relative elongation between Moon and Sun (0 to 360 deg)
  const relativeAngle = normalizeAngle(tropicalMoon - tropicalSun);
  const tithiIndexRaw = Math.floor(relativeAngle / 12);
  const tithiAngleRem = relativeAngle % 12;
  const tithiProgressPercent = Math.round((tithiAngleRem / 12) * 100);

  const isShukla = tithiIndexRaw < 15;
  const pakshaHi = isShukla ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
  const pakshaEn = isShukla ? "Waxing (Shukla)" : "Waning (Krishna)";
  const tithiNumber = (tithiIndexRaw % 15) + 1;

  // Nakshatra: 360 / 27 = 13.333333 degrees each
  const nakshatraDegrees = 360 / 27;
  const nakshatraIndexRaw = Math.floor(siderealMoon / nakshatraDegrees);
  const nakshatraRem = siderealMoon % nakshatraDegrees;
  const pada = Math.min(4, Math.floor((nakshatraRem / (nakshatraDegrees / 4)) + 1));

  // Vaar (Day of week)
  const vaarIndexRaw = date.getDay();

  // Maas (Solar/Lunar representation)
  let maasIndex = Math.floor(siderealSun / 30);
  maasIndex = (maasIndex + 1) % 12;

  // Rashis
  const moonRashiIndex = Math.floor(siderealMoon / 30);
  const sunRashiIndex = Math.floor(siderealSun / 30);

  // Yoga: (siderealSun + siderealMoon) / (360 / 27)
  const totalSum = normalizeAngle(siderealSun + siderealMoon);
  const yogaIndex = Math.floor(totalSum / (360 / 27)) % 27;

  // Karana: half of a tithi (6 degrees each)
  const karanaIndex = Math.floor(relativeAngle / 6) % 60;
  let karanaObj = KARANA_NAMES[0];
  if (karanaIndex === 0) karanaObj = KARANA_NAMES[10]; // Kimstughna
  else if (karanaIndex >= 57) karanaObj = KARANA_NAMES[7 + (karanaIndex - 57)]; // Shakuni, Chatushpada, Naga
  else karanaObj = KARANA_NAMES[(karanaIndex - 1) % 7];

  const vikramSamvatYear = date.getFullYear() + 57;

  const currentMaas = MAAS_NAMES[maasIndex];

  // Match static festival if date matches YYYY-MM-DD
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const staticFest = STATIC_FESTIVALS[dateKey] || null;
  const matchedFestival: FestivalInfo | null = staticFest ? {
    name: staticFest.name,
    hindiName: staticFest.hindiName,
    icon: staticFest.icon,
    description: staticFest.description,
    maas: currentMaas.hi,
    isShukla: isShukla,
    tithiNumber: tithiNumber,
    colors: "from-amber-500 to-rose-600"
  } : null;

  const angles: CelestialAngles = {
    sunTropical: tropicalSun,
    moonTropical: tropicalMoon,
    sunSidereal: siderealSun,
    moonSidereal: siderealMoon,
    relative: relativeAngle,
    ayanamsa: ayanamsa,
    moonLatitude: parseFloat(moonLatitude.toFixed(2))
  };

  const tithiData = TITHI_NAMES[tithiIndexRaw] || { hi: "प्रतिपदा", en: "Pratipada" };
  const nakshatraData = NAKSHATRA_NAMES[nakshatraIndexRaw] || { name: "अश्विनी", nameEn: "Ashwini", lord: "केतु", lordEn: "Ketu" };
  const vaarData = VAAR_NAMES[vaarIndexRaw] || { hi: "रविवार", en: "Sunday" };
  const moonRashiData = RASHI_NAMES[moonRashiIndex] || { hi: "मेष", en: "Aries" };
  const sunRashiData = RASHI_NAMES[sunRashiIndex] || { hi: "मेष", en: "Aries" };
  const yogaData = YOGA_NAMES[yogaIndex] || { hi: "विष्कुम्भ", en: "Vishkumbha" };

  return {
    date,
    angles,
    tithi: {
      index: tithiIndexRaw,
      name: tithiData.hi,
      nameEn: tithiData.en,
      number: tithiNumber,
      paksha: pakshaHi,
      pakshaEn: pakshaEn,
      progressPercent: tithiProgressPercent
    },
    paksha: pakshaHi,
    pakshaEn: pakshaEn,
    nakshatra: {
      index: nakshatraIndexRaw,
      name: nakshatraData.name,
      nameEn: nakshatraData.nameEn,
      lord: nakshatraData.lord,
      lordEn: nakshatraData.lordEn,
      pada,
      degrees: siderealMoon
    },
    maas: currentMaas.hi,
    maasEn: currentMaas.en,
    vaar: vaarData.hi,
    vaarEn: vaarData.en,
    samvatsar: `${vikramSamvatYear}`,
    samvatsarEn: `${vikramSamvatYear}`,
    moonRashi: moonRashiData.hi,
    moonRashiEn: moonRashiData.en,
    sunRashi: sunRashiData.hi,
    sunRashiEn: sunRashiData.en,
    yoga: yogaData.hi,
    yogaEn: yogaData.en,
    karana: karanaObj.hi,
    karanaEn: karanaObj.en,
    activeFestival: matchedFestival
  };
}

/**
 * Calculates the exact next time the Moon-Sun relative angle (Δθ) reaches
 * a target angle: 180° for Full Moon (Purnima) or 0° for New Moon (Amavasya).
 */
export function findNextLunarPhaseOffset(targetAngle: 0 | 180, baseDate: Date, currentOffset: number): number {
  const currentDate = new Date(baseDate.getTime() + currentOffset * 86400000);
  const currentPanchang = calculatePanchang(currentDate);
  const currentRel = currentPanchang.angles.relative;

  // Angular difference to travel forward in the synodic cycle
  let diff = (targetAngle - currentRel + 360) % 360;
  // If already at or very close (< 0.2°) to the target, jump to the next lunar cycle
  if (diff < 0.2) {
    diff = 360;
  }

  // Mean synodic motion rate: 360° / 29.53058885 days ≈ 12.190747°/day
  let daysForward = diff / 12.190747;
  let candidateOffset = currentOffset + daysForward;

  // Refine candidate offset using Newton-Raphson iterations with exact celestial mechanics
  for (let i = 0; i < 4; i++) {
    const testDate = new Date(baseDate.getTime() + candidateOffset * 86400000);
    const p = calculatePanchang(testDate);
    // Angular error wrapped into [-180, 180]
    let error = ((p.angles.relative - targetAngle + 540) % 360) - 180;
    candidateOffset -= error / 12.190747;
  }

  return parseFloat(candidateOffset.toFixed(1));
}
