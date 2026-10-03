export interface NakshatraSymbolData {
  index: number;
  name: string;
  transliteration: string;
  symbolName: string;
  emoji: string;
  deity: string;
  rulingPlanet: string;
  degrees: string;
  description: string;
  nature: string;
}

export const VEDIC_NAKSHATRAS: NakshatraSymbolData[] = [
  {
    index: 0,
    name: "अश्विनी",
    transliteration: "Ashwini",
    symbolName: "अश्व शीर्ष (Horse's Head)",
    emoji: "🐴",
    deity: "अश्विनी कुमार (Ashvini Kumaras)",
    rulingPlanet: "केतु (Ketu)",
    degrees: "0°00' - 13°20' मेष",
    description: "Celestial physicians, swift action, healing & vitality",
    nature: "Light & Swift (लघु)"
  },
  {
    index: 1,
    name: "भरणी",
    transliteration: "Bharani",
    symbolName: "योनि / कलश (Womb / Sacred Vessel)",
    emoji: "🏺",
    deity: "यमराज (Lord Yama)",
    rulingPlanet: "शुक्र (Venus)",
    degrees: "13°20' - 26°40' मेष",
    description: "Transformation, bearing creative seeds & cosmic law",
    nature: "Fierce & Severe (उग्र)"
  },
  {
    index: 2,
    name: "कृत्तिका",
    transliteration: "Krittika",
    symbolName: "अग्नि शिखा / छुरी (Flame / Razor)",
    emoji: "🔥",
    deity: "अग्नि देव (Lord Agni)",
    rulingPlanet: "सूर्य (Sun)",
    degrees: "26°40' मेष - 10°00' वृषभ",
    description: "Purifying flame, spiritual fire, cutting illusions",
    nature: "Mixed (मिश्र)"
  },
  {
    index: 3,
    name: "रोहिणी",
    transliteration: "Rohini",
    symbolName: "रथ / बैलगाड़ी (Chariot / Temple Cart)",
    emoji: "🛒",
    deity: "प्रजापति / ब्रह्मा (Brahma)",
    rulingPlanet: "चन्द्र (Moon)",
    degrees: "10°00' - 23°20' वृषभ",
    description: "Fertility, abundance, creative beauty & devotion",
    nature: "Fixed & Permanent (ध्रुव)"
  },
  {
    index: 4,
    name: "मृगशीर्ष",
    transliteration: "Mrigashira",
    symbolName: "मृग शीर्ष (Deer's Head)",
    emoji: "🦌",
    deity: "सोम / चन्द्र (Chandra)",
    rulingPlanet: "मंगल (Mars)",
    degrees: "23°20' वृषभ - 6°40' मिथुन",
    description: "Spiritual quest, search for truth, gentle grace",
    nature: "Soft & Tender (मृदु)"
  },
  {
    index: 5,
    name: "आर्द्रा",
    transliteration: "Ardra",
    symbolName: "अश्रु बिन्दु / मणि (Teardrop / Jewel)",
    emoji: "💧",
    deity: "रुद्र (Lord Rudra)",
    rulingPlanet: "राहु (Rahu)",
    degrees: "6°40' - 20°00' मिथुन",
    description: "Cleansing storm, breakthrough, emotional transformation",
    nature: "Sharp & Dreadful (तीक्ष्ण)"
  },
  {
    index: 6,
    name: "पुनर्वसु",
    transliteration: "Punarvasu",
    symbolName: "धनुष एवं तूणीर (Bow & Quiver)",
    emoji: "🏹",
    deity: "अदिति (Cosmic Mother Aditi)",
    rulingPlanet: "बृहस्पति (Jupiter)",
    degrees: "20°00' मिथुन - 3°20' कर्क",
    description: "Return of the light, renewal, auspicious return",
    nature: "Movable (चर)"
  },
  {
    index: 7,
    name: "पुष्य",
    transliteration: "Pushya",
    symbolName: "कमल पुष्प / धेनु थन (Lotus / Cow's Udder)",
    emoji: "🪷",
    deity: "बृहस्पति (Brihaspati)",
    rulingPlanet: "शनि (Saturn)",
    degrees: "3°20' - 16°40' कर्क",
    description: "Most auspicious Vedic star, spiritual nourishment",
    nature: "Light & Swift (लघु)"
  },
  {
    index: 8,
    name: "आश्लेषा",
    transliteration: "Ashlesha",
    symbolName: "कुंडलित सर्प (Coiled Serpent)",
    emoji: "🐍",
    deity: "सर्प / नाग (Nagas)",
    rulingPlanet: "बुध (Mercury)",
    degrees: "16°40' - 30°00' कर्क",
    description: "Kundalini wisdom, mystical intuition, hypnotic power",
    nature: "Sharp & Dreadful (तीक्ष्ण)"
  },
  {
    index: 9,
    name: "मघा",
    transliteration: "Magha",
    symbolName: "राज सिंहासन / पालकी (Royal Throne / Palanquin)",
    emoji: "👑",
    deity: "पितृगण (Ancestral Pitris)",
    rulingPlanet: "केतु (Ketu)",
    degrees: "0°00' - 13°20' सिंह",
    description: "Ancestral lineage, noble lineage, spiritual heritage",
    nature: "Fierce & Severe (उग्र)"
  },
  {
    index: 10,
    name: "पूर्व फाल्गुनी",
    transliteration: "Purva Phalguni",
    symbolName: "मंच / शय्या (Couch / Front Legs of Bed)",
    emoji: "🛏️",
    deity: "भग (Bhaga - Deity of Bliss)",
    rulingPlanet: "शुक्र (Venus)",
    degrees: "13°20' - 26°40' सिंह",
    description: "Marital delight, prosperity, artistic expression",
    nature: "Fierce & Severe (उग्र)"
  },
  {
    index: 11,
    name: "उत्तर फाल्गुनी",
    transliteration: "Uttara Phalguni",
    symbolName: "चारपाई (Back Legs of Bed)",
    emoji: "🛋️",
    deity: "अर्यमा (Aryaman - Patron of Friendship)",
    rulingPlanet: "सूर्य (Sun)",
    degrees: "26°40' सिंह - 10°00' कन्या",
    description: "Generosity, sacred covenants, enduring unions",
    nature: "Fixed & Permanent (ध्रुव)"
  },
  {
    index: 12,
    name: "हस्त",
    transliteration: "Hasta",
    symbolName: "हस्त / खुली हथेली (Open Hand / Blessing Palm)",
    emoji: "✋",
    deity: "सविता (Solar Illuminator Savitur)",
    rulingPlanet: "चन्द्र (Moon)",
    degrees: "10°00' - 23°20' कन्या",
    description: "Manifestation, healing touch, mastery of craft",
    nature: "Light & Swift (लघु)"
  },
  {
    index: 13,
    name: "चित्रा",
    transliteration: "Chitra",
    symbolName: "उज्ज्वल मणि / मोती (Radiant Gem / Pearl)",
    emoji: "💎",
    deity: "त्वष्टा / विश्वकर्मा (Vishwakarma)",
    rulingPlanet: "मंगल (Mars)",
    degrees: "23°20' कन्या - 6°40' तुला",
    description: "Divine architecture, sparkling brilliance, visual beauty",
    nature: "Soft & Tender (मृदु)"
  },
  {
    index: 14,
    name: "स्वाति",
    transliteration: "Swati",
    symbolName: "अंकुर / कोपल (Sprouting Plant / Coral)",
    emoji: "🌱",
    deity: "वायु देव (Lord Vayu)",
    rulingPlanet: "राहु (Rahu)",
    degrees: "6°40' - 20°00' तुला",
    description: "Flexibility, independence, breath of life & trade",
    nature: "Movable (चर)"
  },
  {
    index: 15,
    name: "विशाखा",
    transliteration: "Vishakha",
    symbolName: "तोरण द्वार / चाक (Triumphal Arch / Potter's Wheel)",
    emoji: "🏛️",
    deity: "इन्द्र व अग्नि (Indra & Agni)",
    rulingPlanet: "बृहस्पति (Jupiter)",
    degrees: "20°00' तुला - 3°20' वृश्चिक",
    description: "Triumphant breakthrough, laser focus, spiritual victory",
    nature: "Mixed (मिश्र)"
  },
  {
    index: 16,
    name: "अनुराधा",
    transliteration: "Anuradha",
    symbolName: "कमल पुष्प / दण्ड (Lotus Flower / Staff)",
    emoji: "🪷",
    deity: "मित्र (Mitra - Deity of Compassion)",
    rulingPlanet: "शनि (Saturn)",
    degrees: "3°20' - 16°40' वृश्चिक",
    description: "Devotional friendship, mystic depth, perseverance",
    nature: "Soft & Tender (मृदु)"
  },
  {
    index: 17,
    name: "ज्येष्ठा",
    transliteration: "Jyeshtha",
    symbolName: "कुंडल / छत्र (Round Amulet / Umbrella)",
    emoji: "🛡️",
    deity: "इन्द्र (King of Gods Indra)",
    rulingPlanet: "बुध (Mercury)",
    degrees: "16°40' - 30°00' वृश्चिक",
    description: "Eldest authority, protective talismans, courage",
    nature: "Sharp & Dreadful (तीक्ष्ण)"
  },
  {
    index: 18,
    name: "मूल",
    transliteration: "Mula",
    symbolName: "मूल / अंकुश (Tied Bundle of Roots / Goad)",
    emoji: "🌿",
    deity: "निरृति (Goddess Nirriti)",
    rulingPlanet: "केतु (Ketu)",
    degrees: "0°00' - 13°20' धनु",
    description: "Root of existence, radical transformation, core truth",
    nature: "Sharp & Dreadful (तीक्ष्ण)"
  },
  {
    index: 19,
    name: "पूर्वाषाढ़ा",
    transliteration: "Purva Ashadha",
    symbolName: "सूप / पंखा (Winnowing Basket / Fan)",
    emoji: "🪭",
    deity: "आपः (Sacred Cosmic Waters Apah)",
    rulingPlanet: "शुक्र (Venus)",
    degrees: "13°20' - 26°40' धनु",
    description: "Invincibility, purification, filtering pure knowledge",
    nature: "Fierce & Severe (उग्र)"
  },
  {
    index: 20,
    name: "उत्तराषाढ़ा",
    transliteration: "Uttara Ashadha",
    symbolName: "गजदन्त / चतुरंग (Elephant's Tusk / Small Cot)",
    emoji: "🐘",
    deity: "विश्वेदेव (The Universal Vishwadevas)",
    rulingPlanet: "सूर्य (Sun)",
    degrees: "26°40' धनु - 10°00' मकर",
    description: "Final enduring victory, integrity, cosmic principles",
    nature: "Fixed & Permanent (ध्रुव)"
  },
  {
    index: 21,
    name: "श्रवण",
    transliteration: "Shravana",
    symbolName: "त्रिपद / कर्ण (Three Footprints / Sacred Ear)",
    emoji: "👂",
    deity: "विष्णु (Lord Vishnu)",
    rulingPlanet: "चन्द्र (Moon)",
    degrees: "10°00' - 23°20' मकर",
    description: "Hearing the Vedas (Shruti), wisdom, universal stride",
    nature: "Movable (चर)"
  },
  {
    index: 22,
    name: "धनिष्ठा",
    transliteration: "Dhanishta",
    symbolName: "डमरू / मृदंग (Sacred Drum / Flute)",
    emoji: "🥁",
    deity: "अष्ट वसु (Eight Vasus)",
    rulingPlanet: "मंगल (Mars)",
    degrees: "23°20' मकर - 6°40' कुम्भ",
    description: "Cosmic rhythm, prosperity, musical harmony",
    nature: "Movable (चर)"
  },
  {
    index: 23,
    name: "शतभिषा",
    transliteration: "Shatabhisha",
    symbolName: "शत तारे / वृत्त (100 Stars / Mystic Circle)",
    emoji: "⭕",
    deity: "वरुण देव (Lord Varuna)",
    rulingPlanet: "राहु (Rahu)",
    degrees: "6°40' - 20°00' कुम्भ",
    description: "Hundred physicians, healing waters, mystic realms",
    nature: "Movable (चर)"
  },
  {
    index: 24,
    name: "पूर्व भाद्रपद",
    transliteration: "Purva Bhadrapada",
    symbolName: "खड्ग / दो मुखी (Swords / Two-Faced Cot)",
    emoji: "⚔️",
    deity: "अज एकपाद (Aja Ekapada)",
    rulingPlanet: "बृहस्पति (Jupiter)",
    degrees: "20°00' कुम्भ - 3°20' मीन",
    description: "Ascetic fire, mystical penance, higher consciousness",
    nature: "Fierce & Severe (उग्र)"
  },
  {
    index: 25,
    name: "उत्तर भाद्रपद",
    transliteration: "Uttara Bhadrapada",
    symbolName: "अहिर्बुध्न्य / सर्प (Serpent of the Depths)",
    emoji: "🌊",
    deity: "अहिर्बुध्न्य (Ahirbudhnya)",
    rulingPlanet: "शनि (Saturn)",
    degrees: "3°20' - 16°40' मीन",
    description: "Deep meditative silence, oceanic wisdom, fertility",
    nature: "Fixed & Permanent (ध्रुव)"
  },
  {
    index: 26,
    name: "रेवती",
    transliteration: "Revati",
    symbolName: "युगल मत्स्य (Pair of Swimming Fish)",
    emoji: "🐟",
    deity: "पूषा (Lord Pushan - Guide of Souls)",
    rulingPlanet: "बुध (Mercury)",
    degrees: "16°40' - 30°00' मीन",
    description: "Safe journey, cosmic nourishment, completion of zodiac",
    nature: "Soft & Tender (मृदु)"
  }
];
