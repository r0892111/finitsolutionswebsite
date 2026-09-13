"use client";

/**
 * De bouwstenen van de cases: één kaart, de catalogus met filter op sector,
 * en de quote van Bas. Gebruikt op de homepage (marineblauwe band, `donker`),
 * op /cases en onderaan elke case. De data staat in cases.ts.
 */

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CASES } from "./copy";
import { CASE_LIJST, SECTOREN, leestijd, logoVoor, type Case } from "./cases";
import { H3 } from "./ui";

export function CaseKaart({ c }: { c: Case }) {
  const kop = c.cijfers[0];
  const logos = (c.tools ?? []).flatMap((naam) => {
    const l = logoVoor(naam);
    return l ? [l] : [];
  });
  return (
    <a href={`/cases/${c.slug}`} className="hp-card hp-case group flex h-full flex-col overflow-hidden text-left">
      <span className="hp-stippen flex min-h-[10rem] flex-col justify-between gap-6 border-b border-[#E3E7EF] bg-[#F5F7FB] p-5">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-white px-3 py-1 text-[0.75rem] font-medium text-[#1A2D63] shadow-[0_1px_2px_rgba(26,45,99,0.08)]">{c.sector}</span>
          {c.voorbeeld && (
            <span className="rounded-full border border-[#1A2D63]/15 bg-white/60 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-wide text-[#6C7590]">{CASES.voorbeeld}</span>
          )}
        </span>
        <span className="flex items-end justify-between gap-4">
          <span className="min-w-0">
            <span className="hp-display block text-[1.85rem] font-bold leading-none text-[#1A2D63]">{kop.getal}</span>
            <span className="mt-1.5 block text-[0.8125rem] leading-[1.35] text-[#3D4766]">{kop.label}</span>
          </span>
          {logos.length > 0 && (
            <span className="flex shrink-0 -space-x-2" aria-hidden="true">
              {logos.map((l) => (
                <span key={l.naam} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F5F7FB] bg-white">
                  <Image src={l.src} alt="" width={40} height={40} className={l.woordmerk ? "h-3 w-auto" : "h-4 w-4 object-contain"} />
                </span>
              ))}
            </span>
          )}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        <span className={`block ${H3} text-[1.2rem]`}>{c.titel}</span>
        <span className="mt-2 overflow-hidden text-[0.9375rem] leading-[1.55] text-[#3D4766] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box]">{c.samenvatting}</span>
        <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-[0.875rem]">
          <span className="flex items-center gap-1.5 font-medium text-[#1A2D63]">
            {CASES.lees}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          <span className="text-[#6C7590]">
            {leestijd(c)} {CASES.minLezen}
          </span>
        </span>
      </span>
    </a>
  );
}

/** Alle cases als raster, met bovenaan een filter op sector. `max` beperkt het aantal kaarten (de homepage). */
export function CaseCatalogus({ donker = false, max }: { donker?: boolean; max?: number }) {
  const [filter, setFilter] = useState("");
  const lijst = CASE_LIJST.filter((c) => !filter || c.sector === filter);
  const getoond = max ? lijst.slice(0, max) : lijst;
  const knop = (aan: boolean) =>
    `inline-flex items-center rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-colors ${
      donker
        ? aan ? "border-white bg-white text-[#1A2D63]" : "border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
        : aan ? "border-[#1A2D63] bg-[#1A2D63] text-white" : "border-[#1A2D63]/15 bg-white text-[#1A2D63] hover:border-[#1A2D63]/40"
    }`;
  const opties = [{ label: CASES.alle, waarde: "" }, ...SECTOREN.map((s) => ({ label: s, waarde: s }))];

  return (
    <div>
      <div role="group" aria-label={CASES.filterLabel} className="flex flex-wrap justify-center gap-2">
        {opties.map(({ label, waarde }) => (
          <button key={label} type="button" aria-pressed={filter === waarde} onClick={() => setFilter(waarde)} className={knop(filter === waarde)}>
            {label}
          </button>
        ))}
      </div>
      <ul key={filter} className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {getoond.map((c) => (
          <li key={c.slug} className="hp-wissel">
            <CaseKaart c={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** De quote van Bas, op een marineblauwe ondergrond. */
export function Getuigenis({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8 ${className}`}>
      <div
        className="h-24 w-24 shrink-0 rounded-full border-2 border-white/20 sm:h-28 sm:w-28"
        role="img"
        aria-label={CASES.naam}
        style={{ backgroundImage: `url('${CASES.foto}')`, backgroundSize: "150%", backgroundPosition: "center 25%", backgroundRepeat: "no-repeat" }}
      />
      <div>
        <blockquote className="hp-display hp-display-sm text-[1.35rem] font-medium leading-[1.4] text-white sm:text-[1.6rem]">&ldquo;{CASES.quote}&rdquo;</blockquote>
        <p className="mt-3 text-[0.9375rem] text-white/75">{CASES.naam}</p>
      </div>
    </div>
  );
}
