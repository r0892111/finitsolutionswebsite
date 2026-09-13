"use client";

/**
 * De lichte kop voor de juridische pagina's. Logo naar de homepage, een weg
 * terug, en de hoofd-CTA. Geen secties om naartoe te scrollen, dus geen menu.
 */

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { HEADER } from "./copy";
import { CONTAINER, LesreeksKnop } from "./ui";

export function SiteHeader({ location }: { location: string }) {
  return (
    <header className="border-b border-[#E3E7EF] bg-white">
      <div className={`${CONTAINER} flex items-center justify-between gap-4 py-4`}>
        <a href="/" className="flex shrink-0 items-center" aria-label="Finit Solutions, naar de homepage">
          <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="h-7 w-auto sm:h-8" priority />
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          <a href="/" className="hidden items-center gap-2 text-[0.875rem] font-medium text-[#6C7590] transition-colors hover:text-[#1A2D63] sm:inline-flex">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{HEADER.terug}</span>
          </a>
          <LesreeksKnop location={`header_${location}`} size="md" />
        </div>
      </div>
    </header>
  );
}
