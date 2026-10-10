'use client';

import React from 'react';
import { Play, Loader2, BookOpen, LayoutDashboardIcon, X } from 'lucide-react';
import { useLanguage, LanguageToggle } from '../context/LanguageContext';

interface CinematicGuideBarProps {
  isFetching: boolean;
  isPlaying: boolean;
  onPlayGuide: () => void;
  onOpenMathGuide: () => void;
  onTogglePanel: () => void;
  isPanelOpen: boolean;
}

export const CinematicGuideBar: React.FC<CinematicGuideBarProps> = ({
  isFetching,
  isPlaying,
  onPlayGuide,
  onOpenMathGuide,
  onTogglePanel,
  isPanelOpen,
}) => {
  const { language } = useLanguage();

  const isActive = isFetching || isPlaying;

  return (
    <>
      {/* ── Top-right secondary controls ── */}
      <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-2 sm:p-4 md:p-5 overflow-hidden">
        <div className="flex flex-row items-start justify-between w-full">
          {/* Top-left: Panchang drawer toggle */}
          <button
            onClick={onTogglePanel}
            className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900/95 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            title={language === 'hi' ? 'पंचांग डेटा देखें' : 'View Panchang Data'}
          >
            {isPanelOpen ? (
              <X className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <LayoutDashboardIcon className="w-3.5 h-3.5 shrink-0" />
            )}
            <span className="whitespace-nowrap">
              {isPanelOpen
                ? language === 'hi' ? 'बंद करें' : 'Close'
                : language === 'hi' ? 'पंचांग' : 'Panchang'}
            </span>
          </button>

          {/* Top-right: Math guide + language toggle */}
          <div
            id="top-right-controls"
            className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-slate-950/85 backdrop-blur-xl p-1 sm:p-1.5 rounded-2xl border border-white/10 shadow-2xl shadow-black/70 shrink-0"
          >
            <button
              id="btn-open-math-guide"
              onClick={onOpenMathGuide}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title={language === 'hi' ? 'सूत्र व्याख्या' : 'Learn Astronomical Formulas'}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">
                {language === 'hi' ? 'सूत्र' : 'Math'}
                <span className="hidden sm:inline"> {language === 'hi' ? 'सीखें' : 'Guide'}</span>
              </span>
            </button>
            <LanguageToggle size="sm" />
          </div>
        </div>

        {/* ── Bottom-center: Primary "Play Interactive Guide" CTA ── */}
        <div className="flex justify-center w-full pb-1 sm:pb-2">
          <div className="flex flex-col items-center gap-2">
            {/* Status label that appears while audio is active */}
            {isActive && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-sky-500/30 text-sky-300 text-[11px] font-medium backdrop-blur-md shadow-lg animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                {isFetching
                  ? language === 'hi' ? 'ऑडियो तैयार हो रहा है…' : 'Preparing audio…'
                  : language === 'hi' ? 'खगोलीय विवरण सुन रहे हैं…' : 'Playing celestial narration…'}
              </div>
            )}

            <button
              onClick={onPlayGuide}
              disabled={isActive}
              className={`
                pointer-events-auto group relative flex items-center gap-2.5 sm:gap-3
                px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-bold text-sm sm:text-base
                shadow-2xl shadow-black/60 backdrop-blur-xl
                border transition-all duration-300
                ${isActive
                  ? 'bg-slate-900/90 border-sky-500/40 text-sky-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600/90 via-orange-500/90 to-amber-600/90 border-amber-400/50 text-white hover:from-amber-500 hover:via-orange-400 hover:to-amber-500 hover:scale-[1.04] hover:shadow-amber-500/20 active:scale-[0.98]'
                }
              `}
              title={language === 'hi' ? 'इंटरैक्टिव खगोल मार्गदर्शन सुनें' : 'Start the Interactive Celestial Guide'}
            >
              {/* Shimmer ring while active */}
              {isActive && (
                <span className="absolute inset-0 rounded-2xl border border-sky-400/30 animate-ping" />
              )}

              {isFetching ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin shrink-0" />
              ) : isPlaying ? (
                /* Animated sound bars */
                <span className="flex items-end gap-[3px] h-4 sm:h-5 shrink-0">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-sky-300"
                      style={{
                        height: `${40 + i * 15}%`,
                        animation: `soundBar 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                      }}
                    />
                  ))}
                </span>
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0 group-hover:scale-110 transition-transform" />
              )}

              <span className="leading-tight">
                {isFetching
                  ? language === 'hi' ? 'लोड हो रहा है…' : 'Loading…'
                  : isPlaying
                  ? language === 'hi' ? 'सुन रहे हैं' : 'Narrating'
                  : language === 'hi' ? 'इंटरैक्टिव मार्गदर्शन' : 'Play Interactive Guide'}
              </span>
            </button>

            {/* Subtle hint for new users — only shown when idle */}
            {!isActive && (
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium text-center pointer-events-none">
                {language === 'hi'
                  ? 'आज के खगोलीय विवरण को सुनें'
                  : "Hear today's celestial narration"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Inline keyframes for the sound-bar animation */}
      <style jsx global>{`
        @keyframes soundBar {
          from { transform: scaleY(0.4); opacity: 0.6; }
          to   { transform: scaleY(1);   opacity: 1; }
        }
      `}</style>
    </>
  );
};
