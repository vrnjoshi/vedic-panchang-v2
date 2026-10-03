'use client';
import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Minimize2, 
  Maximize2,
  Sparkles,
  RotateCcw,
  Calculator,
  Compass,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PanchangData, FestivalInfo } from '../types';
import { findNextLunarPhaseOffset, STATIC_FESTIVALS } from '../utils/panchang';
import { VEDIC_NAKSHATRAS } from '../data/nakshatras';
import { useLanguage } from '../context/LanguageContext';

interface LeftPanelProps {
  panchang: PanchangData;
  baseDate: Date;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  offsetDays: number;
  onOffsetChange: (days: number) => void;
  onFestivalSelect?: (fest: FestivalInfo) => void;
}

// Helper to parse "Hindi (English)" into separated parts
function splitBilingual(str: string): { hi: string; en: string } {
  if (!str) return { hi: '', en: '' };
  const match = str.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return { hi: match[1].trim(), en: match[2].trim() };
  }
  return { hi: str.trim(), en: str.trim() };
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  panchang,
  baseDate,
  isMinimized,
  onToggleMinimize,
  offsetDays,
  onOffsetChange,
  onFestivalSelect: _onFestivalSelect,
}) => {
  const { language } = useLanguage();
  const [isMathSectionOpen, setIsMathSectionOpen] = useState(true);

  // Nakshatra metadata
  const currentNakshatraData = VEDIC_NAKSHATRAS[panchang.nakshatra.index] || VEDIC_NAKSHATRAS[0];
  const deitySplit = splitBilingual(currentNakshatraData.deity);
  const rulingPlanetSplit = splitBilingual(currentNakshatraData.rulingPlanet);
  const symbolSplit = splitBilingual(currentNakshatraData.symbolName);

  const formattedDate = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(panchang.date);

  const headerDate = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(panchang.date);

  // Static festival lookup: only display banner if date matches a hardcoded key
  const pad = (n: number) => String(n).padStart(2, '0');
  const baseDateKey = `${baseDate.getFullYear()}-${pad(baseDate.getMonth() + 1)}-${pad(baseDate.getDate())}`;
  const currentDateKey = `${panchang.date.getFullYear()}-${pad(panchang.date.getMonth() + 1)}-${pad(panchang.date.getDate())}`;
  const activeFestival = STATIC_FESTIVALS[baseDateKey] || STATIC_FESTIVALS[currentDateKey] || null;

  // Minimized state: compact pill showing Tithi, Date, and Time (replaces the old angle degrees)
  const compactDate = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-US', {
    day: 'numeric',
    month: 'short',
  }).format(panchang.date);

  const compactTime = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(panchang.date);

  if (isMinimized) {
    const tithiName = language === 'hi' ? panchang.tithi.name : panchang.tithi.nameEn;
    return (
      <div className="pointer-events-auto flex items-center">
        <button
          id="btn-expand-left-panel"
          onClick={onToggleMinimize}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/95 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
          title={language === 'hi' ? 'पंचांग विस्तार करें' : 'Expand Vedic Panchang'}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          
          {/* Tithi */}
          <span className="text-white text-xs font-bold shrink-0 truncate max-w-[110px] sm:max-w-none">
            {tithiName}
          </span>
          
          <span className="text-slate-500 font-normal shrink-0">•</span>

          {/* Date & Time */}
          <span className="text-slate-200 text-xs font-medium shrink-0">
            {compactDate}
          </span>

          <span className="text-amber-300/90 text-xs font-mono font-medium shrink-0">
            {compactTime}
          </span>

          <Maximize2 className="w-3.5 h-3.5 text-amber-300/70 group-hover:text-amber-200 ml-0.5 shrink-0" />
        </button>
      </div>
    );
  }

  return (
    <aside
      id="left-panel"
      className="pointer-events-auto w-full sm:w-96 md:w-[420px] landscape:w-[380px] md:landscape:w-[430px] max-w-[calc(100vw-1rem)] sm:max-w-[420px] flex flex-col rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/90 max-h-[calc(100dvh-1.5rem)] sm:max-h-[85vh] md:max-h-[90vh] overflow-hidden transition-all duration-300"
    >
      {/* Header (NO language toggle here) */}
      <div className="p-3 sm:p-3.5 pb-2.5 border-b border-white/10 flex items-center justify-between gap-2 bg-white/5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight truncate">
              {language === 'hi' ? 'वैदिक पंचांग एवं खगोल' : 'Vedic Panchang & Astronomy'}
            </h1>
            <p className="text-[11px] text-slate-400 font-medium leading-tight truncate">
              {language === 'hi' ? 'पूर्णिमान्त प्रणाली व खगोलीय गणित' : 'Purnimanta System & Celestial Math'}
            </p>
          </div>
        </div>

        {/* Minimize Button */}
        <button
          id="btn-minimize-left-panel"
          onClick={onToggleMinimize}
          className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          title={language === 'hi' ? 'पैनल छोटा करें' : 'Minimize panel'}
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 min-h-0 p-3 sm:p-4 space-y-3 sm:space-y-3.5 overflow-y-auto overscroll-contain custom-scrollbar text-sm">
        {/* Active Festival Banner (only if date matches a static festival) */}
        {activeFestival && (
          <div
            id="festival-banner"
            className="rounded-xl p-3 bg-amber-950/40 text-white shadow-lg border border-amber-500/40 relative overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-3xl drop-shadow-md select-none shrink-0">
                {activeFestival.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  {language === 'hi' ? 'शुभ पर्व' : 'Major Festival'}
                </div>
                <div className="text-base font-bold text-white drop-shadow break-words leading-tight mt-0.5">
                  {language === 'hi' ? activeFestival.hindiName : activeFestival.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Date Display with Live Status and Reset to Today */}
        <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2">
          {/* Top row: Gregorian Date & Reset to Today button */}
          <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-200 font-semibold min-w-0 flex-1">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="break-words leading-tight">{headerDate}</span>
            </div>

            {offsetDays !== 0 ? (
              <button
                id="btn-reset-date"
                onClick={() => onOffsetChange(0)}
                className="px-2.5 py-1 text-xs rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold flex items-center gap-1.5 border border-amber-500/30 transition-colors shrink-0 whitespace-nowrap active:scale-95 shadow-sm"
                title={language === 'hi' ? 'आज पर रीसेट करें' : 'Reset to today'}
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span>{language === 'hi' ? 'आज पर रीसेट' : 'Reset to Today'}</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-semibold text-emerald-300 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{language === 'hi' ? 'आज' : 'Today'}</span>
              </span>
            )}
          </div>

          {/* Localized Date & Geocentric Subtitle */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-100 break-words leading-snug">
              {formattedDate}
            </p>
            <div className="flex items-center justify-between gap-1.5 text-[11px] text-slate-400 mt-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">
                  {language === 'hi' ? 'स्थानीय समय व भूकेन्द्रीय निर्देशांक' : 'Local Time & Geocentric Coordinates'}
                </span>
              </div>
              {offsetDays !== 0 && (
                <span className="text-[10px] text-amber-400 font-mono font-medium px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 shrink-0 whitespace-nowrap">
                  {offsetDays > 0 ? `+${offsetDays.toFixed(1)}d` : `${offsetDays.toFixed(1)}d`}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Core Panchang Attributes */}
        <div className="space-y-2 sm:space-y-2.5">
          {/* Tithi & Maas (Month) Row */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {/* Tithi Card */}
            <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">
                    {language === 'hi' ? 'तिथि' : 'Tithi'}
                  </span>
                  <span className="text-[11px] text-slate-300 font-mono font-bold">
                    {panchang.tithi.number} / 15
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-sm font-bold text-white leading-tight block break-words">
                    {language === 'hi' ? panchang.tithi.name : panchang.tithi.nameEn}
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 break-words">
                  {language === 'hi' ? panchang.paksha : panchang.pakshaEn}
                </span>
              </div>
            </div>

            {/* Maas (Month) Card */}
            <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider block">
                  {language === 'hi' ? 'मास' : 'Month'}
                </span>
                <div className="mt-1">
                  <span className="text-sm font-bold text-white leading-tight block break-words">
                    {language === 'hi' ? panchang.maas : panchang.maasEn}
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-1.5 border-t border-white/5">
                <span className="text-[11px] font-medium text-slate-400 block truncate">
                  {language === 'hi' ? 'पूर्णिमान्त प्रणाली' : 'Purnimanta System'}
                </span>
              </div>
            </div>
          </div>

          {/* Moon & Sun Sign (Rashi) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
              <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider block">
                {language === 'hi' ? 'चन्द्र राशि' : 'Moon Sign'}
              </span>
              <div className="mt-1">
                <span className="text-sm font-bold text-white block break-words leading-tight">
                  {language === 'hi' ? panchang.moonRashi : panchang.moonRashiEn}
                </span>
              </div>
            </div>

            <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
              <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider block">
                {language === 'hi' ? 'सूर्य राशि' : 'Sun Sign'}
              </span>
              <div className="mt-1">
                <span className="text-sm font-bold text-white block break-words leading-tight">
                  {language === 'hi' ? panchang.sunRashi : panchang.sunRashiEn}
                </span>
              </div>
            </div>
          </div>

          {/* Samvatsar & Manvantar */}
          <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-xl border border-white/10 text-xs gap-2">
            <span className="text-xs font-semibold text-slate-300">
              {language === 'hi' ? 'विक्रम संवत्सर' : 'Vikram Samvat'}
            </span>
            <span className="text-slate-100 font-bold font-mono text-sm">{panchang.samvatsar}</span>
          </div>

          <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-xl border border-white/10 text-xs gap-2">
            <span className="text-xs font-semibold text-slate-300">
              {language === 'hi' ? 'मन्वन्तर' : 'Manvantara'}
            </span>
            <span className="text-xs font-semibold text-white">
              {language === 'hi' ? 'वैवस्वत (7वां)' : '7th Vaivasvata'}
            </span>
          </div>
        </div>

        {/* Lunar Phases: Next Purnima, Next Amavasya, and Reset to Today */}
        <div className="pt-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              {language === 'hi' ? 'चन्द्र कलाएं' : 'Lunar Phases'}
            </span>
            {offsetDays !== 0 && (
              <button
                onClick={() => onOffsetChange(0)}
                className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold transition-colors"
                title={language === 'hi' ? 'आज पर लौटें' : 'Reset to today'}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === 'hi' ? 'आज पर लौटें' : 'Back to Today'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="btn-next-purnima"
              onClick={() => {
                const nextOffset = findNextLunarPhaseOffset(180, baseDate, offsetDays);
                onOffsetChange(nextOffset);
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 transition-all flex items-center gap-2 font-medium shadow-sm active:scale-95 text-left group"
              title={language === 'hi' ? 'अगली पूर्णिमा (Δθ = 180°)' : 'Calculate next Full Moon (Δθ = 180°)'}
            >
              <span className="text-xl sm:text-2xl shrink-0 select-none group-hover:scale-110 transition-transform">🌕</span>
              <div className="flex flex-col text-left leading-tight min-w-0">
                <span className="text-white text-xs font-semibold leading-tight">
                  {language === 'hi' ? 'अगली पूर्णिमा' : 'Next Purnima'}
                </span>
                <span className="text-slate-400 text-[10px] leading-tight mt-0.5">
                  {language === 'hi' ? 'पूर्ण चन्द्र (180°)' : 'Full Moon (180°)'}
                </span>
              </div>
            </button>

            <button
              id="btn-next-amavasya"
              onClick={() => {
                const nextOffset = findNextLunarPhaseOffset(0, baseDate, offsetDays);
                onOffsetChange(nextOffset);
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 transition-all flex items-center gap-2 font-medium shadow-sm active:scale-95 text-left group"
              title={language === 'hi' ? 'अगली अमावस्या (Δθ = 0°)' : 'Calculate next New Moon (Δθ = 0°)'}
            >
              <span className="text-xl sm:text-2xl shrink-0 select-none group-hover:scale-110 transition-transform">🌑</span>
              <div className="flex flex-col text-left leading-tight min-w-0">
                <span className="text-white text-xs font-semibold leading-tight">
                  {language === 'hi' ? 'अगली अमावस्या' : 'Next Amavasya'}
                </span>
                <span className="text-slate-400 text-[10px] leading-tight mt-0.5">
                  {language === 'hi' ? 'नव चन्द्र (0°)' : 'New Moon (0°)'}
                </span>
              </div>
            </button>
          </div>

          {/* Reset to Today Option Button */}
          {offsetDays !== 0 && (
            <button
              id="btn-reset-to-today"
              onClick={() => onOffsetChange(0)}
              className="w-full p-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-sm"
              title={language === 'hi' ? 'आज पर रीसेट करें' : 'Reset to today'}
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'hi' ? 'आज के दिन पर रीसेट करें' : 'Reset to Today'}</span>
            </button>
          )}
        </div>

        {/* ======================================================== */}
        {/* MERGED: ASTRONOMICAL CELESTIAL MATH & NAKSHATRA SECTION */}
        {/* ======================================================== */}
        <div className="pt-2 border-t border-white/10">
          <button
            onClick={() => setIsMathSectionOpen((prev) => !prev)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-amber-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm font-bold">
                {language === 'hi' ? 'खगोलीय गणित व सक्रिय नक्षत्र' : 'Astronomical Math & Active Nakshatra'}
              </span>
            </div>
            {isMathSectionOpen ? (
              <ChevronUp className="w-4 h-4 text-amber-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {isMathSectionOpen && (
            <div className="mt-2.5 space-y-3">
              {/* Vedic Nakshatra Spotlight */}
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2.5">
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="text-3xl drop-shadow select-none shrink-0">{currentNakshatraData.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-base font-bold text-white leading-tight truncate">
                          {language === 'hi' ? currentNakshatraData.name : currentNakshatraData.transliteration}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          #{panchang.nakshatra.index + 1}
                        </span>
                      </div>
                      <span className="text-xs text-slate-300 mt-0.5 block truncate">
                        {language === 'hi' ? symbolSplit.hi : (symbolSplit.en || symbolSplit.hi)}
                      </span>
                    </div>
                  </div>

                  {/* Pada Badge */}
                  <div className="shrink-0">
                    <div className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 text-center">
                      <span className="text-xs font-bold text-white whitespace-nowrap">
                        {language === 'hi' ? `चरण ${panchang.nakshatra.pada}` : `Pada ${panchang.nakshatra.pada}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deity & Ruling Planet */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 flex flex-col justify-center">
                    <span className="text-slate-400 text-[11px] block font-medium">
                      {language === 'hi' ? 'अधिष्ठाता देव:' : 'Deity:'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5 truncate">
                      {language === 'hi' ? deitySplit.hi : (deitySplit.en || deitySplit.hi)}
                    </span>
                  </div>

                  <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 flex flex-col justify-center">
                    <span className="text-slate-400 text-[11px] block font-medium">
                      {language === 'hi' ? 'स्वामी ग्रह:' : 'Ruling Planet:'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5 truncate">
                      {language === 'hi' ? rulingPlanetSplit.hi : (rulingPlanetSplit.en || rulingPlanetSplit.hi)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Sidereal Longitudes */}
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2.5">
                <div className="text-xs uppercase font-bold text-slate-300 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="tracking-wider">
                    {language === 'hi' ? 'सटीक खगोलीय रेखांश' : 'Sidereal Longitudes'}
                  </span>
                </div>

                <div className="bg-black/20 rounded-xl p-3 text-xs text-slate-200 space-y-2.5 border border-white/5">
                  <div className="flex justify-between items-center text-xs sm:text-sm gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-200">
                        {language === 'hi' ? 'चन्द्रमा का निरयण रेखांश' : "Moon's Sidereal Longitude"}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {language === 'hi' ? 'तारा चक्र में भौतिक स्थिति' : 'Position against fixed star wheel'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span id="ui-moon-long" className="text-white font-mono font-bold text-sm sm:text-base block">
                        {panchang.angles.moonSidereal.toFixed(1)}°
                      </span>
                      <span className="text-[10px] text-amber-300 font-medium">
                        {language === 'hi' ? panchang.nakshatra.name : currentNakshatraData.transliteration}
                      </span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/10" />

                  <div className="flex justify-between items-center text-xs sm:text-sm gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-200">
                        {language === 'hi' ? 'सूर्य का निरयण रेखांश' : "Sun's Sidereal Longitude"}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {language === 'hi' ? 'सूर्य का क्रांतिवृत्त कोण' : 'Sun position on celestial sphere'}
                      </span>
                    </div>
                    <span id="ui-sun-long" className="text-white font-mono font-bold text-sm sm:text-base shrink-0">
                      {panchang.angles.sunSidereal.toFixed(1)}°
                    </span>
                  </div>

                  <div className="h-px w-full bg-white/10" />

                  <div className="flex justify-between items-center text-xs sm:text-sm gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-amber-300">
                        {language === 'hi' ? 'कोणीय दूरी (Δθ)' : 'Phase Separation (Δθ)'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {language === 'hi' ? 'सूर्य-चन्द्र कोण (12° प्रति तिथि)' : 'Sun-Moon Angle (12° per Tithi)'}
                      </span>
                    </div>
                    <span id="ui-rel-angle" className="text-sm sm:text-base text-amber-300 font-mono font-bold shrink-0">
                      {panchang.angles.relative.toFixed(1)}°
                    </span>
                  </div>
                </div>

                {/* Human-Readable Live Math & Tithi Step */}
                <div className="bg-black/20 border border-white/5 rounded-xl p-3 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold text-white">
                      {language === 'hi' ? 'वर्तमान तिथि निर्धारण' : 'Current Tithi Step'}
                    </span>
                    <span className="text-[11px] text-amber-400 font-mono">
                      {language === 'hi' ? '12° प्रति तिथि' : '12° per Tithi'}
                    </span>
                  </div>
                  <div id="ui-tithi-math" className="text-xs sm:text-sm text-slate-200 bg-white/5 p-2.5 rounded-lg border border-white/10 leading-relaxed">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-slate-400 text-xs">
                        {language === 'hi' ? 'कोणीय दूरी (सूर्य-चन्द्र):' : 'Angular Separation (Sun-Moon):'}
                      </span>
                      <span className="font-mono text-white font-bold">{panchang.angles.relative.toFixed(1)}°</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2 mt-1">
                      <span className="text-slate-400 text-xs">
                        {language === 'hi' ? 'पूर्ण 12° चरण:' : 'Completed 12° Steps:'}
                      </span>
                      <span className="font-mono text-white font-bold">
                        {language === 'hi' 
                          ? `${Math.floor(panchang.angles.relative / 12)} चरण`
                          : `${Math.floor(panchang.angles.relative / 12)} Steps`}
                      </span>
                    </div>
                    <div className="h-px bg-white/10 my-1.5" />
                    <div className="flex items-center justify-between gap-2 font-medium">
                      <span className="text-amber-300 text-xs">
                        {language === 'hi' 
                          ? `प्रगतिशील तिथि (#${panchang.tithi.number}):` 
                          : `Active Tithi (#${panchang.tithi.number}):`}
                      </span>
                      <span className="text-white font-bold text-xs sm:text-sm">
                        {language === 'hi' ? panchang.tithi.name : panchang.tithi.nameEn}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {language === 'hi' 
                      ? `चन्द्रमा सूर्य से ${panchang.angles.relative.toFixed(1)}° आगे है। 12° के ${Math.floor(panchang.angles.relative / 12)} चरण पार कर यह ${panchang.tithi.number}वीं तिथि (${panchang.tithi.name}) में गतिमान है।`
                      : `The Moon is ${panchang.angles.relative.toFixed(1)}° ahead of the Sun. Having completed ${Math.floor(panchang.angles.relative / 12)} steps of 12°, it is currently progressing through Tithi #${panchang.tithi.number} (${panchang.tithi.nameEn}).`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
