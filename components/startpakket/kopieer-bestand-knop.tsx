"use client";

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { cn } from '@/lib/utils';

interface KopieerBestandKnopProps {
  pad: string;
  className?: string;
}

/** Haalt het bestand op en zet de volledige tekst op het klembord (handig op gsm, waar slepen niet gaat). */
export function KopieerBestandKnop({ pad, className }: KopieerBestandKnopProps) {
  const [status, setStatus] = useState<'klaar' | 'bezig' | 'gekopieerd' | 'fout'>('klaar');

  const kopieer = async () => {
    setStatus('bezig');
    try {
      const antwoord = await fetch(pad);
      if (!antwoord.ok) throw new Error(`HTTP ${antwoord.status}`);
      const tekst = await antwoord.text();
      await navigator.clipboard.writeText(tekst);
      setStatus('gekopieerd');
      window.setTimeout(() => setStatus('klaar'), 2000);
    } catch {
      setStatus('fout');
    }
  };

  return (
    <button type="button" onClick={kopieer} className={cn('hp-btn hp-btn--secondary hp-btn--lg', className)}>
      {status === 'gekopieerd' ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      {status === 'gekopieerd' && 'Gekopieerd'}
      {status === 'bezig' && 'Even geduld…'}
      {status === 'fout' && 'Lukt niet, download het bestand'}
      {status === 'klaar' && 'Kopieer de volledige tekst'}
    </button>
  );
}
