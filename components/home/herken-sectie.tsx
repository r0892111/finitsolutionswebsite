"use client";

/**
 * "Herken jij dit?", opgebouwd volgens de copy-logica uit vikingbeast-analyse.md
 * (§4.1 herkenning, §4.3 contrast) en het Liam Ottley-onderzoek:
 *
 * 1. Een korte kop en één zin autoriteit.
 * 2. Twee kaarten naast elkaar: "Vandaag" met zes korte punten die met "Je"
 *    beginnen, tegenover "Met een AI-werknemer" met de besparing en wat AI
 *    overneemt. Het contrast doet het werk, niet de lengte van de tekst.
 * 3. De vraag "Herkenbaar?" met de knop, zodat de lezer al ja zegt voor hij klikt.
 * 4. De tools.
 *
 * Geen animatie, geen tabbladen. Tekst in copy.ts (HERKEN en OPLOSSING).
 */

import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { CTA_KENNISMAKING, HERKEN, LOGOS, OPLOSSING } from "./copy";
import { CONTAINER, H2, KOP, LEAD, LesreeksKnop, Onder, Vinkje } from "./ui";

const LABEL = "text-[0.75rem] font-semibold uppercase tracking-[0.08em]";

export function HerkenSectie({ onGesprek }: { onGesprek: () => void }) {
  return (
    <section id="recognition" className="scroll-mt-20 bg-[#F5F7FB]">
      <div className={`${CONTAINER} pb-24 pt-16 sm:pb-28 sm:pt-20`}>
        <div className={KOP}>
          <h2 className={H2}>
            {HERKEN.h2[0]} <Onder>{HERKEN.h2[1]}</Onder>
          </h2>
          <p className={`mt-4 ${LEAD}`}>{HERKEN.intro}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[64rem] gap-5 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-6">
          {/* Vandaag: wat de lezer herkent */}
          <div className="hp-card flex flex-col p-6 sm:p-8">
            <p className={`${LABEL} text-[#6C7590]`}>{HERKEN.label}</p>
            {/* De punten verdelen zich over de hoogte van de blauwe kaart ernaast. */}
            <ul className="mt-5 flex flex-1 flex-col justify-between gap-4">
              {HERKEN.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.45] text-[#1A2D63]">
                  <Vinkje />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Met een AI-werknemer: het contrast */}
          <div className="rounded-[20px] bg-[#1A2D63] p-6 text-white shadow-[0_20px_44px_-24px_rgba(26,45,99,0.6)] sm:p-8">
            <p className={`${LABEL} text-white/60`}>{OPLOSSING.label}</p>
            <p className="hp-display hp-display-sm mt-3 text-[1.45rem] font-semibold leading-[1.2] sm:text-[1.6rem]">{OPLOSSING.titel}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="hp-display text-[1.4rem] font-bold leading-none text-white/45 line-through decoration-white/40 decoration-2">{OPLOSSING.zonder}</span>
              <ArrowRight className="h-4 w-4 text-white/50" aria-hidden="true" />
              <span className="hp-display text-[2.4rem] font-bold leading-none">{OPLOSSING.met}</span>
            </div>
            <p className="mt-2 text-[0.875rem] leading-[1.4] text-white/70">{OPLOSSING.eenheid}</p>

            <ul className="mt-6 space-y-3.5 border-t border-white/15 pt-6">
              {OPLOSSING.resultaten.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[1rem] leading-[1.45] text-white">
                  <Vinkje donker />
                  <span>{r}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-[1rem] leading-[1.45] text-white/80">
                <span className="hp-check hp-check--donker mt-0.5" aria-hidden="true">
                  <Plus className="h-3 w-3" />
                </span>
                <span>{OPLOSSING.breedte}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* De vraag en de knop */}
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="hp-display text-[1.6rem] font-semibold leading-tight text-[#1A2D63] sm:text-[1.9rem]">{HERKEN.overgang}</p>
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
            <LesreeksKnop location="recognition" className="w-full sm:w-auto" />
            <button type="button" onClick={onGesprek} className="hp-link text-[0.9375rem] font-medium">
              {CTA_KENNISMAKING}
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-[#6C7590]">{OPLOSSING.koppelingen}</p>
          <ul className="mx-auto mt-5 flex max-w-[58rem] flex-wrap justify-center gap-2.5">
            {LOGOS.map((l) => (
              <li key={l.naam} className="hp-chip">
                <Image src={l.src} alt={l.naam} width={48} height={48} className={l.woordmerk ? "h-5 w-auto" : "h-5 w-5 object-contain"} />
                {!l.woordmerk && <span>{l.naam}</span>}
              </li>
            ))}
            <li className="hp-chip hp-chip--plus">
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>{OPLOSSING.koppelingenPlus}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
