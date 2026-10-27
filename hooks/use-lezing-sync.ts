"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

import { SLIDES, stappenVoor } from '@/lib/lezing/content';

/**
 * Gedeelde stand van de presentatie. Het presentatievenster (beamer) en het
 * sprekersscherm (laptop) houden elkaar in sync via een BroadcastChannel:
 * werkt zonder internet, zolang beide vensters in dezelfde browser openstaan.
 */
export interface DeckStand {
  index: number;
  stap: number;
  zwart: boolean;
  qr: boolean;
  backup: boolean;
  promptIndex: number;
}

const BEGIN: DeckStand = { index: 0, stap: 0, zwart: false, qr: false, backup: false, promptIndex: 0 };
const KANAAL = 'finit-lezing';
const OPSLAG = 'finit-lezing-stand';

type Bericht = { type: 'stand'; stand: DeckStand } | { type: 'hallo' };

function leesOpslag(): DeckStand {
  try {
    const ruw = localStorage.getItem(OPSLAG);
    if (!ruw) return BEGIN;
    const stand = JSON.parse(ruw) as DeckStand;
    if (typeof stand.index !== 'number' || stand.index < 0 || stand.index >= SLIDES.length) return BEGIN;
    return { ...BEGIN, ...stand };
  } catch {
    return BEGIN;
  }
}

export function useLezingSync() {
  const [stand, setStandLokaal] = useState<DeckStand>(BEGIN);
  const kanaal = useRef<BroadcastChannel | null>(null);
  const huidig = useRef<DeckStand>(BEGIN);

  const zet = useCallback((volgende: DeckStand, verspreid: boolean) => {
    huidig.current = volgende;
    setStandLokaal(volgende);
    try {
      localStorage.setItem(OPSLAG, JSON.stringify(volgende));
    } catch {
      /* opslag niet beschikbaar: geen probleem */
    }
    if (verspreid) kanaal.current?.postMessage({ type: 'stand', stand: volgende } satisfies Bericht);
  }, []);

  useEffect(() => {
    zet(leesOpslag(), false);
    if (typeof BroadcastChannel === 'undefined') return;
    const k = new BroadcastChannel(KANAAL);
    kanaal.current = k;
    k.onmessage = (e: MessageEvent<Bericht>) => {
      if (e.data.type === 'stand') zet(e.data.stand, false);
      if (e.data.type === 'hallo') k.postMessage({ type: 'stand', stand: huidig.current } satisfies Bericht);
    };
    k.postMessage({ type: 'hallo' } satisfies Bericht);
    return () => {
      k.close();
      kanaal.current = null;
    };
  }, [zet]);

  const wijzig = useCallback(
    (fn: (s: DeckStand) => DeckStand) => zet(fn(huidig.current), true),
    [zet],
  );

  const naarSlide = useCallback(
    (index: number, stap = 0) =>
      wijzig((s) => ({
        ...s,
        index: Math.max(0, Math.min(SLIDES.length - 1, index)),
        stap,
        backup: false,
        promptIndex: 0,
      })),
    [wijzig],
  );

  const volgende = useCallback(() => {
    const s = huidig.current;
    if (s.zwart || s.qr) return wijzig((x) => ({ ...x, zwart: false, qr: false }));
    if (s.stap < stappenVoor(SLIDES[s.index])) return wijzig((x) => ({ ...x, stap: x.stap + 1 }));
    if (s.index < SLIDES.length - 1) naarSlide(s.index + 1);
  }, [wijzig, naarSlide]);

  const vorige = useCallback(() => {
    const s = huidig.current;
    if (s.zwart || s.qr) return wijzig((x) => ({ ...x, zwart: false, qr: false }));
    if (s.stap > 0) return wijzig((x) => ({ ...x, stap: x.stap - 1 }));
    if (s.index > 0) naarSlide(s.index - 1, stappenVoor(SLIDES[s.index - 1]));
  }, [wijzig, naarSlide]);

  return { stand, wijzig, naarSlide, volgende, vorige };
}

/** Sneltoetsen, gedeeld door het presentatievenster en het sprekersscherm. */
export function useLezingToetsen(
  sync: ReturnType<typeof useLezingSync>,
  extra?: (e: KeyboardEvent) => boolean,
) {
  const { volgende, vorige, naarSlide, wijzig } = sync;
  useEffect(() => {
    const opToets = (e: KeyboardEvent) => {
      const doel = e.target as HTMLElement | null;
      if (doel && (doel.tagName === 'INPUT' || doel.tagName === 'TEXTAREA' || doel.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (extra?.(e)) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          volgende();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          vorige();
          break;
        case 'Home':
          naarSlide(0);
          break;
        case 'End':
          naarSlide(SLIDES.length - 1);
          break;
        case 'b':
        case 'B':
        case '.':
          wijzig((s) => ({ ...s, zwart: !s.zwart, qr: false }));
          break;
        case 'q':
        case 'Q':
          wijzig((s) => ({ ...s, qr: !s.qr, zwart: false }));
          break;
        case 'h':
        case 'H':
          wijzig((s) => ({ ...s, backup: !s.backup }));
          break;
        case 'Escape':
          wijzig((s) => ({ ...s, zwart: false, qr: false, backup: false }));
          break;
        default:
          if (/^[1-9]$/.test(e.key)) wijzig((s) => ({ ...s, promptIndex: Number(e.key) - 1, backup: false }));
      }
    };
    window.addEventListener('keydown', opToets);
    return () => window.removeEventListener('keydown', opToets);
  }, [volgende, vorige, naarSlide, wijzig, extra]);
}
