"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, LifeBuoy, Pause, Play, QrCode, RotateCcw, Square } from 'lucide-react';

import { KopieerKnop } from '@/components/lezing/kopieer-knop';
import { BREEDTE, HOOGTE, SlideWeergave, claudeLink, chatgptLink, slideTitel } from '@/components/lezing/slide';
import { cn } from '@/lib/utils';
import { SLIDES, geplandeTijden, stappenVoor, trucVoorId } from '@/lib/lezing/content';
import { useLezingSync, useLezingToetsen, type DeckStand } from '@/hooks/use-lezing-sync';

function Voorbeeld({ index, stand, breedte }: { index: number; stand: DeckStand; breedte: number }) {
  const schaal = breedte / BREEDTE;
  const slide = SLIDES[index];
  if (!slide) return <div style={{ width: breedte, height: HOOGTE * schaal }} className="rounded-xl bg-[#E3E7EF]" />;
  return (
    <div
      className="pointer-events-none overflow-hidden rounded-xl border border-[#E3E7EF] bg-white shadow-sm"
      style={{ width: breedte, height: HOOGTE * schaal }}
    >
      <div style={{ width: BREEDTE, height: HOOGTE, transform: `scale(${schaal})`, transformOrigin: 'top left' }}>
        <SlideWeergave slide={slide} stand={stand} />
      </div>
    </div>
  );
}

function minNaarTekst(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function LezingSpreker() {
  const sync = useLezingSync();
  const { stand, wijzig, naarSlide, volgende, vorige } = sync;
  useLezingToetsen(sync);

  const tijden = useMemo(() => geplandeTijden(), []);
  const [nu, setNu] = useState<Date | null>(null);
  const [gestart, setGestart] = useState<number | null>(null);
  const [gepauzeerd, setGepauzeerd] = useState<number | null>(null);

  useEffect(() => {
    setNu(new Date());
    const t = window.setInterval(() => setNu(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const slide = SLIDES[stand.index];
  const truc = slide.soort === 'truc' ? trucVoorId(slide.trucId) : null;
  const verstreken = gestart && nu ? (gepauzeerd ?? nu.getTime()) - gestart : 0;
  const stappen = stappenVoor(slide);
  const volgendeStand: DeckStand = { ...stand, stap: 0, backup: false, promptIndex: 0 };

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6 text-[#3D4766]">
      <style>{`[data-cookie-banner]{display:none!important}`}</style>

      {/* Bovenbalk */}
      <div className="mb-5 flex flex-wrap items-center gap-4">
        <div className="text-[34px] font-semibold tabular-nums text-[#1A2D63]">
          {nu ? nu.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
        </div>
        <div className="rounded-full bg-white px-4 py-2 text-sm">
          Volgens planning nu: <strong className="text-[#1A2D63]">{tijden[stand.index]}</strong>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm">
          Lezing: <strong className="tabular-nums text-[#1A2D63]">{minNaarTekst(verstreken)}</strong>
          {!gestart ? (
            <button type="button" onClick={() => setGestart(Date.now())} className="ml-1 text-[#1A2D63]" aria-label="Start">
              <Play className="h-4 w-4" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  if (gepauzeerd) {
                    setGestart(gestart + (Date.now() - gepauzeerd));
                    setGepauzeerd(null);
                  } else setGepauzeerd(Date.now());
                }}
                className="ml-1 text-[#1A2D63]"
                aria-label={gepauzeerd ? 'Verder' : 'Pauze'}
              >
                {gepauzeerd ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setGestart(null);
                  setGepauzeerd(null);
                }}
                className="text-[#1A2D63]"
                aria-label="Reset"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={vorige} className="hp-btn hp-btn--secondary hp-btn--sm">
            <ChevronLeft className="h-4 w-4" /> Vorige
          </button>
          <button type="button" onClick={volgende} className="hp-btn hp-btn--primary hp-btn--sm">
            Volgende <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => wijzig((s) => ({ ...s, qr: !s.qr, zwart: false }))}
            className={cn('hp-btn hp-btn--sm', stand.qr ? 'hp-btn--primary' : 'hp-btn--secondary')}
          >
            <QrCode className="h-4 w-4" /> QR
          </button>
          <button
            type="button"
            onClick={() => wijzig((s) => ({ ...s, zwart: !s.zwart, qr: false }))}
            className={cn('hp-btn hp-btn--sm', stand.zwart ? 'hp-btn--primary' : 'hp-btn--secondary')}
          >
            <Square className="h-4 w-4" /> Zwart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        {/* Links: huidige en volgende slide */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#1A2D63]">
              Nu ({stand.index + 1}/{SLIDES.length}) · {slideTitel(slide)}
              {stappen > 0 && ` · stap ${stand.stap}/${stappen}`}
            </p>
            <Voorbeeld index={stand.index} stand={stand} breedte={620} />
          </div>
          <div>
            <p className="mb-2 text-sm text-[#6C7590]">
              Volgende · {SLIDES[stand.index + 1] ? slideTitel(SLIDES[stand.index + 1]) : 'einde'}
            </p>
            <Voorbeeld index={stand.index + 1} stand={volgendeStand} breedte={360} />
          </div>
        </div>

        {/* Rechts: notities en demo */}
        <div className="flex flex-col gap-4">
          <div className="hp-card p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#E9A13B]">
              Notities · {slide.minuten} min
            </p>
            <ul className="space-y-3 text-[19px] leading-snug text-[#1A2D63]">
              {slide.notities.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>

          {truc && truc.prompts.length > 0 && (
            <div className="hp-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#E9A13B]">Demo</p>
                <button
                  type="button"
                  onClick={() => wijzig((s) => ({ ...s, backup: !s.backup }))}
                  className={cn('hp-btn hp-btn--sm', stand.backup ? 'hp-btn--primary' : 'hp-btn--secondary')}
                >
                  <LifeBuoy className="h-4 w-4" /> Back-up op beamer
                </button>
              </div>
              <div className="space-y-3">
                {truc.prompts.map((p, i) => (
                  <div
                    key={p.label}
                    className={cn(
                      'rounded-xl border p-3',
                      i === Math.min(stand.promptIndex, truc.prompts.length - 1)
                        ? 'border-[#1A2D63] bg-white'
                        : 'border-[#E3E7EF] bg-[#F5F7FB]',
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => wijzig((s) => ({ ...s, promptIndex: i, backup: false }))}
                        className="mr-auto text-left font-semibold text-[#1A2D63]"
                      >
                        {i + 1}. {p.label}
                      </button>
                      <a href={claudeLink(p.tekst)} target="_blank" rel="noreferrer" className="hp-btn hp-btn--primary hp-btn--sm">
                        Claude <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a href={chatgptLink(p.tekst)} target="_blank" rel="noreferrer" className="hp-btn hp-btn--secondary hp-btn--sm">
                        ChatGPT
                      </a>
                      <KopieerKnop tekst={p.tekst} />
                    </div>
                  </div>
                ))}
              </div>
              {truc.demo?.bestanden && (
                <ul className="mt-4 space-y-1 text-sm">
                  {truc.demo.bestanden.map((b) => (
                    <li key={b.naam}>
                      {b.pad ? (
                        <a href={b.pad} target="_blank" rel="noreferrer" className="hp-link">
                          {b.naam}
                        </a>
                      ) : (
                        <span className="text-[#B4532A]">Nog te maken: {b.naam}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Alle slides */}
          <div className="hp-card max-h-[320px] overflow-auto p-4">
            <ol className="space-y-1 text-sm">
              {SLIDES.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => naarSlide(i)}
                    className={cn(
                      'flex w-full gap-3 rounded-lg px-2 py-1 text-left',
                      i === stand.index ? 'bg-[#1A2D63] text-white' : 'hover:bg-[#F5F7FB]',
                    )}
                  >
                    <span className="w-12 tabular-nums opacity-70">{tijden[i]}</span>
                    <span className="truncate">{slideTitel(s)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
