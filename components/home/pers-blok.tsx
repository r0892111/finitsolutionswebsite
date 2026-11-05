"use client";

/**
 * Het persblok op de homepage, op de marineblauwe band onder de oplossingen (in de
 * plaats van de quote van Bas, 5/11). Toont het nieuwste artikel uit lib/pers.ts:
 * het medium, de titel, één citaat en de link naar het artikel.
 */

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { PERS, datumNL } from "@/lib/pers";
import { NAV_PERS, PERS_BLOK } from "./copy";

export function PersBlok({ className = "" }: { className?: string }) {
  const a = PERS[0];
  if (!a) return null;
  return (
    <div className={`grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 ${className}`}>
      <figure>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.875rem] text-white/70">
          <span className="rounded-[4px] bg-white px-2 py-0.5 text-[0.8125rem] font-bold text-[#1A2D63]">{a.medium}</span>
          <span>{PERS_BLOK.label}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={a.datum}>{datumNL(a.datum)}</time>
        </p>
        <p className="mt-4 text-[1rem] font-semibold leading-[1.4] text-white">{a.titel}</p>
        <blockquote className="hp-display hp-display-sm mt-4 max-w-[48rem] text-[1.25rem] font-medium leading-[1.45] text-white sm:text-[1.45rem]">
          &ldquo;{a.citaat}&rdquo;
        </blockquote>
        <figcaption className="mt-3 text-[0.9375rem] text-white/75">{a.citaatVan}</figcaption>
      </figure>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
        <a
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => pushEvent("pers_klik", { medium: a.medium, location: "home" })}
          className="hp-btn hp-btn--light hp-btn--md w-full sm:w-auto"
        >
          {PERS_BLOK.lees} ({a.medium})
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a href={NAV_PERS.href} className="hp-btn hp-btn--md w-full !border-white/40 text-white hover:bg-white/10 sm:w-auto">
          {PERS_BLOK.alles}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
