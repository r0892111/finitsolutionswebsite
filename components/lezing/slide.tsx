"use client";

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowRight, Copy, ExternalLink, FileText, ImageOff, LifeBuoy } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  BREIN,
  DELEN,
  LEZING,
  SNELLE_RONDE,
  STAGIAIR,
  TRUCS,
  trucVoorId,
  type Slide,
  type Truc,
} from '@/lib/lezing/content';
import type { DeckStand } from '@/hooks/use-lezing-sync';

/** De slide wordt altijd op 1600 × 900 getekend en daarna geschaald. */
export const BREEDTE = 1600;
export const HOOGTE = 900;

const NAVY = 'text-[#1A2D63]';
const TEKST = 'text-[#3D4766]';
const STIL = 'text-[#6C7590]';

export function claudeLink(tekst: string) {
  return `https://claude.ai/new?q=${encodeURIComponent(tekst)}`;
}
export function chatgptLink(tekst: string) {
  return `https://chatgpt.com/?q=${encodeURIComponent(tekst)}`;
}

export function QrBlok({ grootte, className }: { grootte: number; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="rounded-3xl bg-white p-5 shadow-[0_20px_50px_-20px_rgba(26,45,99,0.45)]">
        <QRCodeSVG value={LEZING.handoutUrl} size={grootte} fgColor="#1A2D63" level="M" />
      </div>
      <p className={cn('text-[26px] font-medium', NAVY)}>{LEZING.handoutLabel}</p>
    </div>
  );
}

function Kader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative flex h-full w-full flex-col bg-white px-[110px] py-[90px]', className)}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-6 text-[22px] font-semibold uppercase tracking-[0.14em] text-[#E9A13B]">{children}</p>;
}

function Voet() {
  return (
    <div className={cn('absolute bottom-[40px] left-[110px] right-[110px] flex justify-between text-[18px]', STIL)}>
      <span>{LEZING.spreker}</span>
      <span>{LEZING.handoutLabel}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TitelSlide() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center bg-[#1A2D63] px-[130px] text-white">
      <p className="mb-8 text-[26px] font-semibold uppercase tracking-[0.16em] text-[#E9A13B]">Open Boek</p>
      <h1 className="hp-display max-w-[1200px] text-[120px] font-semibold leading-[1.02]">{LEZING.titel}</h1>
      <p className="mt-10 text-[30px] text-white/75">{LEZING.ondertitel}</p>
      <p className="absolute bottom-[70px] left-[130px] text-[26px] text-white/60">{LEZING.spreker}</p>
    </div>
  );
}

function StatementSlide({ tekst, bron }: { tekst: string; bron?: string }) {
  return (
    <Kader className="justify-center">
      <p className={cn('hp-display whitespace-pre-line text-[96px] font-semibold leading-[1.08]', NAVY)}>{tekst}</p>
      {bron && <p className={cn('mt-12 text-[28px]', STIL)}>{bron}</p>}
      <Voet />
    </Kader>
  );
}

function LijstSlide({
  label,
  kop,
  items,
  zichtbaar,
}: {
  label?: string;
  kop: string;
  items: string[];
  zichtbaar: number;
}) {
  return (
    <Kader>
      {label && <Label>{label}</Label>}
      <h2 className={cn('hp-display mb-14 text-[76px] font-semibold leading-[1.05]', NAVY)}>{kop}</h2>
      <ul className="flex flex-col gap-9">
        {items.map((item, i) => (
          <li
            key={item}
            className={cn(
              'flex items-start gap-7 text-[40px] leading-[1.25] transition-opacity duration-300',
              TEKST,
              i < zichtbaar ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span className="mt-[6px] flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full bg-[#E6ECF9] text-[24px] font-semibold text-[#1A2D63]">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Voet />
    </Kader>
  );
}

function SectieSlide({ deel }: { deel: 1 | 2 | 3 }) {
  const d = DELEN[deel];
  return (
    <div className="flex h-full w-full flex-col justify-center bg-[#1A2D63] px-[130px] text-white">
      <p className="mb-8 text-[28px] font-semibold uppercase tracking-[0.16em] text-[#E9A13B]">Deel {deel}</p>
      <h2 className="hp-display text-[110px] font-semibold leading-[1.02]">{d.titel}</h2>
      <p className="mt-10 text-[36px] text-white/70">{d.ondertitel}</p>
    </div>
  );
}

function StagiairSlide() {
  return (
    <Kader className="py-[80px]">
      <Label>Het beeld voor vanavond</Label>
      <h2 className={cn('hp-display mb-12 text-[66px] font-semibold leading-[1.05]', NAVY)}>
        AI is een slimme stagiair op zijn eerste dag
      </h2>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-8 gap-y-5">
        {STAGIAIR.map((r) => (
          <React.Fragment key={r.is}>
            <p className={cn('text-[32px] leading-tight', TEKST)}>{r.is}</p>
            <ArrowRight className="h-8 w-8 text-[#E9A13B]" aria-hidden />
            <p className={cn('text-[32px] font-semibold leading-tight', NAVY)}>{r.dus}</p>
          </React.Fragment>
        ))}
      </div>
    </Kader>
  );
}

function DemoPaneel({
  truc,
  stand,
  onPrompt,
  onBackup,
}: {
  truc: Truc;
  stand: DeckStand;
  onPrompt: (i: number) => void;
  onBackup: () => void;
}) {
  if (truc.prompts.length === 0) return null;
  const index = Math.min(stand.promptIndex, truc.prompts.length - 1);
  const prompt = truc.prompts[index];
  const lang = prompt.tekst.length;
  const grootte = lang < 90 ? 'text-[38px]' : lang < 260 ? 'text-[28px]' : lang < 480 ? 'text-[22px]' : 'text-[19px]';

  return (
    <div className="flex h-full min-h-0 flex-col">
      {truc.prompts.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {truc.prompts.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => onPrompt(i)}
              className={cn(
                'rounded-full border px-4 py-2 text-[17px] font-medium transition-colors',
                i === index
                  ? 'border-[#1A2D63] bg-[#1A2D63] text-white'
                  : 'border-[#1A2D63]/20 bg-white text-[#1A2D63] hover:border-[#1A2D63]/50',
              )}
            >
              <span className="mr-2 opacity-60">{i + 1}</span>
              {p.label}
            </button>
          ))}
        </div>
      )}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[24px] border border-[#E3E7EF] bg-[#F5F7FB] p-8">
        {truc.prompts.length === 1 && <p className={cn('mb-3 text-[18px] font-semibold', STIL)}>{prompt.label}</p>}
        <p className={cn('whitespace-pre-line leading-[1.4]', grootte, NAVY)}>{prompt.tekst}</p>
        {stand.backup && (
          <div className="absolute inset-0 overflow-auto bg-white p-8">
            <p className="mb-3 text-[18px] font-semibold uppercase tracking-[0.12em] text-[#E9A13B]">Back-up</p>
            <p className={cn('whitespace-pre-line text-[22px] leading-[1.45]', TEKST)}>
              {truc.demo?.backup ??
                'Nog geen back-up. Test deze demo vooraf en plak de beste output in lib/lezing/content.ts (demo.backup).'}
            </p>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a href={claudeLink(prompt.tekst)} target="_blank" rel="noreferrer" className="hp-btn hp-btn--primary hp-btn--md">
          Open in Claude <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
        <a href={chatgptLink(prompt.tekst)} target="_blank" rel="noreferrer" className="hp-btn hp-btn--secondary hp-btn--md">
          ChatGPT <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
        <button
          type="button"
          onClick={() => void navigator.clipboard?.writeText(prompt.tekst)}
          className="hp-btn hp-btn--secondary hp-btn--md"
        >
          <Copy className="h-4 w-4" aria-hidden /> Kopieer
        </button>
        <button type="button" onClick={onBackup} className="hp-btn hp-btn--secondary hp-btn--md">
          <LifeBuoy className="h-4 w-4" aria-hidden /> {stand.backup ? 'Verberg back-up' : 'Back-up'}
        </button>
      </div>
    </div>
  );
}

function TrucSlide({
  truc,
  stand,
  onPrompt,
  onBackup,
}: {
  truc: Truc;
  stand: DeckStand;
  onPrompt: (i: number) => void;
  onBackup: () => void;
}) {
  return (
    <div className="grid h-full w-full grid-cols-[600px_1fr] gap-[60px] bg-white px-[90px] py-[80px]">
      <div className="flex min-h-0 flex-col">
        <p className="mb-5 text-[22px] font-semibold uppercase tracking-[0.14em] text-[#E9A13B]">
          Truc {truc.nummer}
          {truc.demo ? ` · ${truc.demo.domein}` : ''}
        </p>
        <h2 className={cn('hp-display text-[64px] font-semibold leading-[1.04]', NAVY)}>{truc.titel}</h2>
        <p className={cn('mt-7 text-[28px] leading-[1.35]', TEKST)}>{truc.kort}</p>
        <ul className="mt-8 flex flex-col gap-4">
          {truc.punten.map((p) => (
            <li key={p} className={cn('flex gap-4 text-[24px] leading-snug', TEKST)}>
              <span className="mt-[11px] h-[9px] w-[9px] flex-none rounded-full bg-[#E9A13B]" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-2 pt-6">
          {truc.link && (
            <a href={truc.link.url} target="_blank" rel="noreferrer" className={cn('text-[20px] font-medium underline', NAVY)}>
              {truc.link.label}
            </a>
          )}
          {truc.demo?.bestanden?.map((b) =>
            b.pad ? (
              <a
                key={b.naam}
                href={b.pad}
                target="_blank"
                rel="noreferrer"
                className={cn('flex items-center gap-2 text-[18px] underline decoration-[#1A2D63]/30', NAVY)}
              >
                <FileText className="h-5 w-5" aria-hidden /> {b.naam}
              </a>
            ) : (
              <span key={b.naam} className="flex items-center gap-2 text-[18px] text-[#B4532A]">
                <ImageOff className="h-5 w-5" aria-hidden /> {b.naam}
              </span>
            ),
          )}
          {truc.bron && <p className={cn('text-[17px] italic', STIL)}>{truc.bron}</p>}
        </div>
      </div>
      <DemoPaneel truc={truc} stand={stand} onPrompt={onPrompt} onBackup={onBackup} />
    </div>
  );
}

function SnelSlide({ zichtbaar }: { zichtbaar: number }) {
  return (
    <Kader className="px-[90px] py-[70px]">
      <Label>Snelle ronde</Label>
      <h2 className={cn('hp-display mb-10 text-[64px] font-semibold leading-none', NAVY)}>
        10 trucs voor elke dag
      </h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
        {SNELLE_RONDE.map((t, i) => (
          <div
            key={t.titel}
            className={cn(
              'flex items-center gap-5 rounded-[18px] border px-6 py-[14px] transition-all duration-300',
              i < zichtbaar ? 'border-[#E3E7EF] bg-white opacity-100' : 'border-transparent opacity-25',
              i === zichtbaar - 1 && 'border-[#E9A13B] shadow-[0_0_0_2px_#E9A13B]',
            )}
          >
            <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-[#1A2D63] text-[20px] font-semibold text-white">
              {i + 1}
            </span>
            <span className={cn('text-[27px] font-medium leading-tight', NAVY)}>{t.titel}</span>
          </div>
        ))}
      </div>
    </Kader>
  );
}

function OverzichtSlide() {
  return (
    <div className="grid h-full w-full grid-cols-[1fr_440px] gap-[60px] bg-white px-[90px] py-[80px]">
      <div>
        <Label>Alles op één slide</Label>
        <div className="grid grid-cols-1 gap-8">
          {([1, 2, 3] as const).map((deel) => (
            <div key={deel}>
              <p className={cn('mb-3 text-[26px] font-semibold', NAVY)}>{DELEN[deel].titel}</p>
              <div className="flex flex-wrap gap-3">
                {TRUCS.filter((t) => t.deel === deel).map((t) => (
                  <span
                    key={t.id}
                    className="rounded-full bg-[#F5F7FB] px-5 py-[10px] text-[22px] text-[#1A2D63]"
                  >
                    {t.titel}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <QrBlok grootte={330} />
      </div>
    </div>
  );
}

function QrSlide({ kop, tekst }: { kop: string; tekst: string }) {
  return (
    <div className="flex h-full w-full items-center justify-between bg-[#F5F7FB] px-[130px]">
      <div className="max-w-[720px]">
        <h2 className={cn('hp-display text-[96px] font-semibold leading-[1.02]', NAVY)}>{kop}</h2>
        <p className={cn('mt-8 text-[36px]', TEKST)}>{tekst}</p>
      </div>
      <QrBlok grootte={460} />
    </div>
  );
}

function BreinBeeld() {
  const n = BREIN.collegas.length;
  return (
    <div className="relative h-[560px] w-[560px]">
      <svg className="absolute inset-0" viewBox="0 0 560 560" aria-hidden>
        {BREIN.collegas.map((c, i) => {
          const hoek = (i / n) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={c}
              x1={280}
              y1={280}
              x2={280 + Math.cos(hoek) * 215}
              y2={280 + Math.sin(hoek) * 215}
              stroke="#1A2D63"
              strokeOpacity={0.18}
              strokeWidth={3}
            />
          );
        })}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1A2D63] text-center text-[30px] font-semibold leading-tight text-white shadow-[0_24px_60px_-20px_rgba(26,45,99,0.6)]">
        Company
        <br />
        brain
      </div>
      {BREIN.collegas.map((c, i) => {
        const hoek = (i / n) * Math.PI * 2 - Math.PI / 2;
        return (
          <div
            key={c}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E3E7EF] bg-white px-5 py-3 text-[22px] font-medium text-[#1A2D63] shadow-[0_10px_30px_-18px_rgba(26,45,99,0.5)]"
            style={{ left: 280 + Math.cos(hoek) * 225, top: 280 + Math.sin(hoek) * 225 }}
          >
            {c}
          </div>
        );
      })}
    </div>
  );
}

function BreinSlide({ stap }: { stap: 'probleem' | 'idee' | 'uitnodiging' }) {
  if (stap === 'probleem') {
    return (
      <Kader className="justify-center">
        <Label>En dan?</Label>
        <p className={cn('hp-display max-w-[1250px] text-[64px] font-semibold leading-[1.12]', NAVY)}>
          {BREIN.probleem}
        </p>
        <Voet />
      </Kader>
    );
  }
  if (stap === 'idee') {
    return (
      <div className="grid h-full w-full grid-cols-[1fr_560px] items-center gap-[60px] bg-white px-[110px]">
        <div>
          <Label>Het idee</Label>
          <p className={cn('hp-display text-[54px] font-semibold leading-[1.12]', NAVY)}>{BREIN.idee}</p>
          <ul className="mt-10 flex flex-col gap-4">
            {BREIN.voorbeelden.map((v) => (
              <li key={v} className={cn('flex gap-4 text-[30px] leading-snug', TEKST)}>
                <span className="mt-[14px] h-[10px] w-[10px] flex-none rounded-full bg-[#E9A13B]" />
                {v}
              </li>
            ))}
          </ul>
        </div>
        <BreinBeeld />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-between bg-[#1A2D63] px-[130px] text-white">
      <div className="max-w-[760px]">
        <p className="mb-8 text-[26px] font-semibold uppercase tracking-[0.16em] text-[#E9A13B]">Vragen?</p>
        <p className="hp-display text-[72px] font-semibold leading-[1.08]">{BREIN.uitnodiging}</p>
        <p className="mt-10 text-[30px] text-white/70">Alle prompts en de link staan achter de QR-code.</p>
      </div>
      <div className="rounded-3xl bg-white p-6">
        <QRCodeSVG value={LEZING.handoutUrl} size={400} fgColor="#1A2D63" level="M" />
        <p className="mt-4 text-center text-[24px] font-medium text-[#1A2D63]">{LEZING.handoutLabel}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export interface SlideProps {
  slide: Slide;
  stand: DeckStand;
  onPrompt?: (i: number) => void;
  onBackup?: () => void;
}

export function SlideWeergave({ slide, stand, onPrompt = () => {}, onBackup = () => {} }: SlideProps) {
  switch (slide.soort) {
    case 'titel':
      return <TitelSlide />;
    case 'statement':
      return <StatementSlide tekst={slide.tekst} bron={slide.bron} />;
    case 'lijst':
      return (
        <LijstSlide
          label={slide.label}
          kop={slide.kop}
          items={slide.items}
          zichtbaar={slide.stapsgewijs ? stand.stap : slide.items.length}
        />
      );
    case 'sectie':
      return <SectieSlide deel={slide.deel} />;
    case 'stagiair':
      return <StagiairSlide />;
    case 'truc':
      return <TrucSlide truc={trucVoorId(slide.trucId)} stand={stand} onPrompt={onPrompt} onBackup={onBackup} />;
    case 'snel':
      return <SnelSlide zichtbaar={stand.stap} />;
    case 'overzicht':
      return <OverzichtSlide />;
    case 'qr':
      return <QrSlide kop={slide.kop} tekst={slide.tekst} />;
    case 'brein':
      return <BreinSlide stap={slide.stap} />;
  }
}

/** Korte titel van een slide, voor het sprekersscherm. */
export function slideTitel(slide: Slide): string {
  switch (slide.soort) {
    case 'titel':
      return 'Titel';
    case 'statement':
      return slide.tekst.replace(/\n/g, ' ');
    case 'lijst':
      return slide.kop;
    case 'sectie':
      return `Deel ${slide.deel}: ${DELEN[slide.deel].titel}`;
    case 'stagiair':
      return 'De slimme stagiair';
    case 'truc': {
      const t = trucVoorId(slide.trucId);
      return `Truc ${t.nummer}: ${t.titel}`;
    }
    case 'snel':
      return 'Snelle ronde: 10 trucs';
    case 'overzicht':
      return 'Overzicht + QR';
    case 'qr':
      return 'QR-code';
    case 'brein':
      return `Company brain: ${slide.stap}`;
  }
}

