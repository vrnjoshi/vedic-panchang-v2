'use client';

import React from 'react';
import { Play, Loader2, LayoutDashboardIcon, X } from 'lucide-react';
import { useLanguage, LanguageToggle } from '../context/LanguageContext';

interface CinematicGuideBarProps {
  isFetching: boolean;
  isPlaying: boolean;
  subtitles: string;
  apiError?: string | null;
  onPlayGuide: () => void;
  onTogglePanel: () => void;
  isPanelOpen: boolean;
}

export const CinematicGuideBar: React.FC<CinematicGuideBarProps> = ({
  isFetching,
  isPlaying,
  subtitles,
  apiError,
  onPlayGuide,
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

          {/* Top-right: language toggle */}
          <div
            id="top-right-controls"
            className="pointer-events-auto flex items-center bg-slate-950/85 backdrop-blur-xl p-1 sm:p-1.5 rounded-2xl border border-white/10 shadow-2xl shadow-black/70 shrink-0"
          >
            <LanguageToggle size="sm" />
          </div>
        </div>

        {/* ── Bottom-center: Primary "Play Interactive Guide" CTA ── */}
        <div className="flex justify-center w-full pb-28 sm:pb-32">
          <div className="flex flex-col items-center gap-2">
            {/* AI-generated subtitles — shown strictly while playing */}
            {isPlaying && subtitles && (
              <div className="bg-[#070b16]/85 backdrop-blur-md px-5 py-3 rounded-xl border border-slate-700/50 text-slate-100 text-[11px] sm:text-xs font-medium shadow-lg max-w-sm sm:max-w-md text-center leading-relaxed">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse mr-2 align-middle shrink-0" />
                {subtitles}
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
              title={language === 'hi' ? 'आज का खगोलीय विवरण सुनें' : "Hear today's celestial narration"}
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
                  ? language === 'hi' ? 'विवरण तैयार हो रहा है…' : 'Preparing guide...'
                  : isPlaying
                  ? language === 'hi' ? 'सुन रहे हैं' : 'Narrating'
                  : language === 'hi' ? 'आज का खगोलीय विवरण सुनें' : "Hear today's celestial narration"}
              </span>
            </button>

            {/* Error display if apiError occurs */}
            {apiError && (
              <p className="text-[11px] sm:text-xs text-red-400 bg-red-950/80 border border-red-500/50 px-3 py-1 rounded-full animate-pulse font-medium text-center shadow-lg">
                {apiError}
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
