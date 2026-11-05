"use client";

/**
 * Het persblok op de homepage, op de marineblauwe band onder de oplossingen (in de
 * plaats van de quote van Bas, 5/11). Toont het nieuwste artikel uit lib/pers.ts: een
 * foto uit het artikel, het logo van het medium, de titel, één citaat en de link naar
 * het artikel. Op een telefoon staat de foto boven de tekst.
 */

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { PERS, datumNL } from "@/lib/pers";
import { NAV_PERS, PERS_BLOK } from "./copy";
import { Watermerk } from "./ui";

export function PersBlok({ className = "" }: { className?: string }) {
  const a = PERS[0];
  if (!a) return null;
  const foto = a.blokFoto ?? a.foto;
  return (
    <div className={`grid gap-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12 ${className}`}>
      {foto && (
        <div className="relative aspect-[3/2] overflow-hidden rounded-[20px]">
          <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 1024px) 30rem, 100vw" className="object-cover" />
          <Watermerk boven={a.blokFoto?.watermerkBoven}>{foto.credit}</Watermerk>
        </div>
      )}
      <div>
        <figure>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.875rem] text-white/70">
            {a.logo ? (
              <Image src={a.logo} alt={a.medium} width={32} height={32} className="h-8 w-8" />
            ) : (
              <span className="rounded-[4px] bg-white px-2 py-0.5 text-[0.8125rem] font-bold text-[#1A2D63]">{a.medium}</span>
            )}
            <span>{PERS_BLOK.label}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={a.datum}>{datumNL(a.datum)}</time>
          </p>
          <p className="mt-4 text-[1rem] font-semibold leading-[1.4] text-white">{a.titel}</p>
          <blockquote className="hp-display hp-display-sm mt-4 text-[1.2rem] font-medium leading-[1.45] text-white sm:text-[1.35rem]">
            &ldquo;{a.citaat}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-[0.9375rem] text-white/75">{a.citaatVan}</figcaption>
        </figure>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
    </div>
  );
}
