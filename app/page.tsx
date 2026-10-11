'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
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

type CameraFocus = 'default' | 'moon' | 'sun' | 'nakshatra';

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

  // AI-generated subtitle text and 3D camera focus target
  const [subtitles, setSubtitles] = useState('');
  const [cameraFocus, setCameraFocus] = useState<CameraFocus>('default');
  const [apiError, setApiError] = useState<string | null>(null);

  // Store timeout IDs so we can clear them if audio ends early
  const cameraTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const simulatedDate = useMemo(() => {
    const timeMs = baseDate.getTime() + offsetDays * 86400000;
    return new Date(timeMs);
  }, [baseDate, offsetDays]);

  const panchang = useMemo(() => {
    return calculatePanchang(simulatedDate);
  }, [simulatedDate]);

  const clearCameraTimeouts = () => {
    cameraTimeoutsRef.current.forEach(clearTimeout);
    cameraTimeoutsRef.current = [];
  };

  // Lifted audio handler — sends raw panchang data; Gemini authors the script
  const handlePlayGuide = useCallback(async () => {
    if (isFetching || isPlaying) return;
    setIsFetching(true);
    setSubtitles('');
    setCameraFocus('default');

    try {
      const dateStr = panchang.date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: dateStr,
          tithi: language === 'hi' ? panchang.tithi.name : panchang.tithi.nameEn,
          nakshatra: language === 'hi' ? panchang.nakshatra.name : panchang.nakshatra.nameEn,
          angle: panchang.angles.relative.toFixed(1),
          language,
        }),
      });

      const data = await response.json();

      if (data.audioBase64) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);

        // Set subtitles from the AI-generated script
        if (data.generatedText) setSubtitles(data.generatedText);

        // Transition: fetching → playing
        setIsFetching(false);
        setIsPlaying(true);

        // ── Camera choreography sequence ──
        // Immediately fly close to the Moon
        setCameraFocus('moon');

        // At 5s: pan to the Sun angle
        const t1 = setTimeout(() => setCameraFocus('sun'), 5000);
        // At 10s: pull back wide to show the nakshatra ring
        const t2 = setTimeout(() => setCameraFocus('nakshatra'), 10000);
        cameraTimeoutsRef.current = [t1, t2];

        audio.play();

        audio.onended = () => {
          clearCameraTimeouts();
          setCameraFocus('default');
          setIsPlaying(false);
        };
        audio.onerror = () => {
          clearCameraTimeouts();
          setCameraFocus('default');
          setIsPlaying(false);
        };
      } else {
        throw new Error(data.error || 'No audio returned');
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
      clearCameraTimeouts();
      setCameraFocus('default');
      setIsFetching(false);
      setIsPlaying(false);
      setApiError('AI Guide is currently experiencing high demand. Please try again.');
      setTimeout(() => {
        setApiError(null);
      }, 4000);
    }
  }, [isFetching, isPlaying, language, panchang]);

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden bg-[#070b16] text-slate-100 select-none">
      {/* 3D WebGL Canvas — full-screen hero */}
      <CelestialCanvas
        panchang={panchang}
        offsetDays={offsetDays}
        isPlaying={isPlaying}
        subtitles={subtitles}
        cameraFocus={cameraFocus}
      />

      {/* Cinematic guide bar: centered CTA + top controls */}
      <CinematicGuideBar
        isFetching={isFetching}
        isPlaying={isPlaying}
        subtitles={subtitles}
        apiError={apiError}
        onPlayGuide={handlePlayGuide}
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