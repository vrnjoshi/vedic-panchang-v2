'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { LeftPanel } from '../src/components/LeftPanel';
import { TopRightControls } from '../src/components/TopRightControls';
import { FormulaGuideModal } from '../src/components/FormulaGuideModal';
import { calculatePanchang } from '../src/utils/panchang';
import { LanguageProvider } from '../src/context/LanguageContext';

// Dynamically import CelestialCanvas with SSR disabled to prevent server-side WebGL errors
const CelestialCanvas = dynamic(
  () => import('../src/components/CelestialCanvas').then((mod) => mod.CelestialCanvas),
  { ssr: false }
);

export default function Home() {
  const [baseDate] = useState<Date>(() => new Date());
  const [offsetDays, setOffsetDays] = useState<number>(0);

  const [isLeftMinimized, setIsLeftMinimized] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });

  const [isMathGuideOpen, setIsMathGuideOpen] = useState<boolean>(false);

  const simulatedDate = useMemo(() => {
    const timeMs = baseDate.getTime() + offsetDays * 86400000;
    return new Date(timeMs);
  }, [baseDate, offsetDays]);

  const panchang = useMemo(() => {
    return calculatePanchang(simulatedDate);
  }, [simulatedDate]);

  return (
    <LanguageProvider defaultLanguage="hi">
      <main className="relative w-screen h-[100dvh] overflow-hidden bg-[#070b16] text-slate-100 select-none">
        {/* 3D WebGL Canvas Layer */}
        <CelestialCanvas panchang={panchang} offsetDays={offsetDays} />

        {/* UI Overlay Layer */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-2 sm:p-4 md:p-5 overflow-hidden">
          <div className="flex flex-row items-start justify-between gap-3 w-full">
            <LeftPanel
              panchang={panchang}
              baseDate={baseDate}
              isMinimized={isLeftMinimized}
              onToggleMinimize={() => setIsLeftMinimized((prev) => !prev)}
              offsetDays={offsetDays}
              onOffsetChange={(days) => setOffsetDays(days)}
            />

            <TopRightControls onOpenMathGuide={() => setIsMathGuideOpen(true)} />
          </div>
        </div>

        {/* Math Guide Modal */}
        <FormulaGuideModal
          isOpen={isMathGuideOpen}
          onClose={() => setIsMathGuideOpen(false)}
        />
      </main>
    </LanguageProvider>
  );
}