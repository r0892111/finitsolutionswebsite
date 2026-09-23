"use client";

/**
 * De oplossing, meteen onder "Herken jij dit?" in dezelfde lichte band: een
 * marineblauwe kaart met de pitch in drie zinnen (voor wie niet technisch is)
 * en een tekening van het fundament met de systemen eromheen. Daaronder de
 * tool-logo's. Geen voorbeelden van taken: die staan bij de oplossingen.
 * Tekst in copy.ts (OPLOSSING, LOGOS).
 */

import Image from "next/image";
import { Plus } from "lucide-react";
import { LOGOS, OPLOSSING } from "./copy";
import { CONTAINER } from "./ui";

export function OplossingSectie() {
  return (
    <section id="oplossing" className="bg-[#F5F7FB]">
      <div className={`${CONTAINER} pb-14 pt-10 sm:pb-16 sm:pt-12`}>
        <div className="grid rounded-[20px] bg-[#1A2D63] p-7 text-white shadow-[0_20px_44px_-24px_rgba(26,45,99,0.6)] sm:p-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-8 lg:px-10 lg:py-8">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-white/60">{OPLOSSING.label}</p>
            <h2 className="hp-display hp-display-sm mt-3 text-balance text-[1.6rem] font-semibold leading-[1.15] sm:text-[1.9rem] lg:text-[2.1rem]">{OPLOSSING.titel}</h2>
            <div className="mt-5 space-y-3 text-[1rem] leading-[1.6] text-white/85 sm:text-[1.0625rem]">
              {OPLOSSING.pitch.map((zin) => (
                <p key={zin}>{zin}</p>
              ))}
            </div>
          </div>
          {/* Witte lijnen op een transparante achtergrond: de tekening staat rechtstreeks op de blauwe kaart. */}
          <Image src="/home/aze5.png" alt={OPLOSSING.illustratieAria} width={1131} height={819} className="mx-auto mt-6 block h-auto w-full max-w-[32rem] lg:mt-0 lg:max-w-none" />
        </div>

        <div className="mt-10 text-center">
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
