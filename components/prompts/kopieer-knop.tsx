"use client";

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { pushEvent } from '@/lib/analytics';

/** Oude manier, voor browsers of webviews (zoals in Instagram) zonder klembord-API. */
function kopieerViaTekstvak(tekst: string): boolean {
  const vak = document.createElement('textarea');
  vak.value = tekst;
  vak.setAttribute('readonly', '');
  vak.style.position = 'fixed';
  vak.style.opacity = '0';
  document.body.appendChild(vak);
  vak.select();
  const gelukt = document.execCommand('copy');
  document.body.removeChild(vak);
  return gelukt;
}

/** Zet één prompt op het klembord. Lukt het niet, dan selecteer je hem zelf. */
export function KopieerKnop({ tekst, id }: { tekst: string; id: string }) {
  const [status, setStatus] = useState<'klaar' | 'gekopieerd' | 'fout'>('klaar');

  const kopieer = async () => {
    try {
      try {
        await navigator.clipboard.writeText(tekst);
      } catch {
        if (!kopieerViaTekstvak(tekst)) throw new Error('kopiëren lukt niet');
      }
      setStatus('gekopieerd');
      pushEvent('prompt_kopieer', { prompt: id });
      window.setTimeout(() => setStatus('klaar'), 2000);
    } catch {
      setStatus('fout');
    }
  };

  return (
    <button type="button" onClick={kopieer} className="hp-btn hp-btn--primary hp-btn--md">
      {status === 'gekopieerd' ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      {status === 'gekopieerd' ? 'Gekopieerd' : status === 'fout' ? 'Selecteer en kopieer zelf' : 'Kopieer'}
    </button>
  );
}
