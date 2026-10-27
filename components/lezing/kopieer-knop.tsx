"use client";

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { cn } from '@/lib/utils';

interface KopieerKnopProps {
  tekst: string;
  className?: string;
  label?: string;
}

export function KopieerKnop({ tekst, className, label = 'Kopieer' }: KopieerKnopProps) {
  const [gekopieerd, setGekopieerd] = useState(false);

  const kopieer = async () => {
    try {
      await navigator.clipboard.writeText(tekst);
    } catch {
      // Oudere browsers of geen toestemming: via een tijdelijk tekstvak.
      const veld = document.createElement('textarea');
      veld.value = tekst;
      veld.style.position = 'fixed';
      veld.style.opacity = '0';
      document.body.appendChild(veld);
      veld.select();
      document.execCommand('copy');
      veld.remove();
    }
    setGekopieerd(true);
    window.setTimeout(() => setGekopieerd(false), 1800);
  };

  return (
    <button type="button" onClick={kopieer} className={cn('hp-btn hp-btn--secondary hp-btn--sm', className)}>
      {gekopieerd ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      {gekopieerd ? 'Gekopieerd' : label}
    </button>
  );
}
