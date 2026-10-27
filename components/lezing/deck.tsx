"use client";

import React, { useCallback, useEffect, useState } from 'react';

import { BREEDTE, HOOGTE, QrBlok, SlideWeergave } from '@/components/lezing/slide';
import { SLIDES } from '@/lib/lezing/content';
import { useLezingSync, useLezingToetsen } from '@/hooks/use-lezing-sync';

/** Schaalt het canvas van 1600 × 900 zo groot mogelijk in het venster. */
function useSchaal() {
  const [schaal, setSchaal] = useState(1);
  useEffect(() => {
    const meet = () => setSchaal(Math.min(window.innerWidth / BREEDTE, window.innerHeight / HOOGTE));
    meet();
    window.addEventListener('resize', meet);
    return () => window.removeEventListener('resize', meet);
  }, []);
  return schaal;
}

export function LezingDeck() {
  const sync = useLezingSync();
  const { stand, wijzig } = sync;
  const schaal = useSchaal();
  const [hulp, setHulp] = useState(false);

  const extra = useCallback((e: KeyboardEvent) => {
    if (e.key === 'f' || e.key === 'F') {
      if (document.fullscreenElement) void document.exitFullscreen();
      else void document.documentElement.requestFullscreen();
      return true;
    }
    if (e.key === 's' || e.key === 'S') {
      window.open('/lezing/spreker/', 'finit-spreker', 'width=1280,height=800');
      return true;
    }
    if (e.key === '?') {
      setHulp((h) => !h);
      return true;
    }
    return false;
  }, []);
  useLezingToetsen(sync, extra);

  // /lezing/presenteren/#8 springt meteen naar slide 8.
  const { naarSlide } = sync;
  useEffect(() => {
    const n = Number(window.location.hash.slice(1));
    if (Number.isInteger(n) && n >= 1 && n <= SLIDES.length) naarSlide(n - 1);
  }, [naarSlide]);

  const slide = SLIDES[stand.index];

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#0E1630]">
      {/* Geen cookiebanner op de beamer */}
      <style>{`[data-cookie-banner]{display:none!important}`}</style>

      <div
        className="relative overflow-hidden bg-white"
        style={{ width: BREEDTE, height: HOOGTE, transform: `scale(${schaal})`, flex: 'none' }}
      >
        <SlideWeergave
          slide={slide}
          stand={stand}
          onPrompt={(i) => wijzig((s) => ({ ...s, promptIndex: i, backup: false }))}
          onBackup={() => wijzig((s) => ({ ...s, backup: !s.backup }))}
        />

        {stand.qr && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#F5F7FB]">
            <QrBlok grootte={520} />
          </div>
        )}
        {stand.zwart && <div className="absolute inset-0 z-30 bg-black" />}

        <div className="absolute bottom-0 left-0 z-10 h-[5px] bg-[#E9A13B] transition-all duration-300" style={{ width: `${((stand.index + 1) / SLIDES.length) * 100}%` }} />
      </div>

      {hulp && (
        <div className="fixed right-6 top-6 z-50 w-[300px] rounded-2xl bg-white p-5 text-sm text-[#3D4766] shadow-2xl">
          <p className="mb-2 font-semibold text-[#1A2D63]">Sneltoetsen</p>
          <ul className="space-y-1">
            <li>→ / spatie / clicker: volgende</li>
            <li>←: vorige</li>
            <li>1–9: andere prompt bij een demo</li>
            <li>H: back-up tonen</li>
            <li>Q: QR-code over alles</li>
            <li>B: zwart scherm</li>
            <li>F: volledig scherm</li>
            <li>S: sprekersscherm openen</li>
            <li>?: deze hulp</li>
          </ul>
        </div>
      )}
    </div>
  );
}
