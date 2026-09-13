"use client";

/**
 * De bouwstenen van de oplossingen: één kaart, de catalogus, en de quote van
 * Bas. Gebruikt op de homepage (marineblauwe band) en op /cases. De data
 * staat in cases.ts. Op de kaart is de titel het grootste element: het
 * resultaat in een paar woorden. Geen cijfers, geen sectoren.
 */

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CASES } from "./copy";
import { OPLOSSING_LIJST, logoVoor, type Oplossing } from "./cases";
import { H3 } from "./ui";

export function OplossingKaart({ o }: { o: Oplossing }) {
  const logos = o.tools.flatMap((naam) => {
    const l = logoVoor(naam);
    return l ? [l] : [];
  });
  return (
    <a href={`/cases#${o.slug}`} className="hp-card hp-case group flex h-full flex-col overflow-hidden text-left">
      <span className="hp-stippen flex items-center border-b border-[#E3E7EF] bg-[#F5F7FB] px-5 py-4">
        {logos.length > 0 && (
          <span className="flex -space-x-2" aria-hidden="true">
            {logos.map((l) => (
              <span key={l.naam} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F5F7FB] bg-white">
                <Image src={l.src} alt="" width={40} height={40} className={l.woordmerk ? "h-3 w-auto" : "h-4 w-4 object-contain"} />
              </span>
            ))}
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        <span className={`block ${H3} text-[1.35rem]`}>{o.titel}</span>
        <span className="mt-2 text-[0.9375rem] leading-[1.55] text-[#3D4766]">{o.kort}</span>
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-[0.875rem] font-medium text-[#1A2D63]">
          {CASES.lees}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}

/** Alle oplossingen als raster. `max` beperkt het aantal kaarten (de homepage). */
export function OplossingCatalogus({ max }: { max?: number }) {
  const getoond = max ? OPLOSSING_LIJST.slice(0, max) : OPLOSSING_LIJST;
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {getoond.map((o) => (
        <li key={o.slug}>
          <OplossingKaart o={o} />
        </li>
      ))}
    </ul>
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
