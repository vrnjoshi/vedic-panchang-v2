'use client';

import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { LeftPanel } from '../src/components/LeftPanel';
import { CinematicGuideBar } from '../src/components/CinematicGuideBar';
import { FormulaGuideModal } from '../src/components/FormulaGuideModal';
import { calculatePanchang } from '../src/utils/panchang';
import { LanguageProvider, useLanguage } from '../src/context/LanguageContext';

// Dynamically import CelestialCanvas with SSR disabled to prevent server-side WebGL errors
const CelestialCanvas = dynamic(
  () => import('../src/components/CelestialCanvas').then((mod) => mod.CelestialCanvas),
  { ssr: false }
);

function HomeInner() {
  const { language } = useLanguage();

  const [baseDate] = useState<Date>(() => new Date());
  const [offsetDays, setOffsetDays] = useState<number>(0);

  // Panel is hidden by default — 3D canvas is the hero
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState<boolean>(false);
  const [isMathGuideOpen, setIsMathGuideOpen] = useState<boolean>(false);

  // Split audio state: isFetching = API in-flight, isPlaying = audio buffer outputting
  const [isFetching, setIsFetching] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const simulatedDate = useMemo(() => {
    const timeMs = baseDate.getTime() + offsetDays * 86400000;
    return new Date(timeMs);
  }, [baseDate, offsetDays]);

  const panchang = useMemo(() => {
    return calculatePanchang(simulatedDate);
  }, [simulatedDate]);

  // Lifted audio handler — split into fetch phase and play phase
  const handlePlayGuide = useCallback(async () => {
    if (isFetching || isPlaying) return;
    setIsFetching(true);

    try {
      const textToSpeak =
        language === 'hi'
          ? `वर्तमान में चन्द्रमा सूर्य से ${panchang.angles.relative.toFixed(1)} डिग्री आगे है। आज ${panchang.tithi.name} तिथि और ${panchang.nakshatra.name} नक्षत्र चल रहा है।`
          : `Currently, the Moon is ${panchang.angles.relative.toFixed(1)} degrees ahead of the Sun. Today is ${panchang.tithi.nameEn} Tithi, and the active Nakshatra is ${panchang.nakshatra.nameEn}.`;

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, language }),
      });

      const data = await response.json();

      if (data.audioBase64) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
        // Transition from fetching → playing once audio is ready to output
        setIsFetching(false);
        setIsPlaying(true);
        audio.play();
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => setIsPlaying(false);
      } else {
        throw new Error(data.error || 'No audio returned');
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
      setIsFetching(false);
      setIsPlaying(false);
    }
  }, [isFetching, isPlaying, language, panchang]);

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden bg-[#070b16] text-slate-100 select-none">
      {/* 3D WebGL Canvas — full-screen hero */}
      <CelestialCanvas panchang={panchang} offsetDays={offsetDays} isPlaying={isPlaying} />

      {/* Cinematic guide bar: centered CTA + top-right secondary controls */}
      <CinematicGuideBar
        isFetching={isFetching}
        isPlaying={isPlaying}
        onPlayGuide={handlePlayGuide}
        onOpenMathGuide={() => setIsMathGuideOpen(true)}
        onTogglePanel={() => setIsLeftPanelOpen((prev) => !prev)}
        isPanelOpen={isLeftPanelOpen}
      />

      {/* Data drawer — slides in from the left, hidden by default */}
      {isLeftPanelOpen && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-start justify-start p-2 sm:p-4 md:p-5 overflow-hidden">
          <LeftPanel
            panchang={panchang}
            baseDate={baseDate}
            isMinimized={false}
            onToggleMinimize={() => setIsLeftPanelOpen(false)}
            offsetDays={offsetDays}
            onOffsetChange={(days) => setOffsetDays(days)}
          />
        </div>
      )}

      {/* Math Guide Modal */}
      <FormulaGuideModal
        isOpen={isMathGuideOpen}
        onClose={() => setIsMathGuideOpen(false)}
      />
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider defaultLanguage="hi">
      <HomeInner />
    </LanguageProvider>
  );
}