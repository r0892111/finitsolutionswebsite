"use client";

/**
 * /cases: alle cases, met de filter op sector en de quote van Bas. Dit is de
 * pagina die meegroeit: elke case die in cases.ts bijkomt, staat hier vanzelf.
 */

import { ChevronRight } from "lucide-react";
import { CASES } from "./copy";
import { CaseCatalogus, Getuigenis } from "./case-kaart";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { CONTAINER, H2, LEAD, LesreeksKnop, Onder } from "./ui";

export function CasesOverzicht() {
  const P = CASES.pagina;
  return (
    <div className="hp min-h-screen bg-white text-[#3D4766]">
      <SiteHeader location="cases" />

      <main>
        <section className={`${CONTAINER} pb-12 pt-10 sm:pb-14 sm:pt-14`}>
          <nav aria-label="Kruimelpad" className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-[#6C7590]">
            <a href="/" className="transition-colors hover:text-[#1A2D63]">Home</a>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-[#1A2D63]">{CASES.detail.kruimel}</span>
          </nav>
          <h1 className={`mt-7 ${H2} sm:text-[2.9rem] lg:text-[3.3rem]`}>
            {P.h1[0]} <Onder>{P.h1[1]}</Onder>
          </h1>
          <p className={`mt-5 max-w-[40rem] ${LEAD}`}>{P.intro}</p>
        </section>

        <section className="bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-14 sm:py-16`}>
            <CaseCatalogus />
          </div>
        </section>

        <section className="bg-[#1A2D63]">
          <div className={`${CONTAINER} flex flex-col gap-10 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between`}>
            <Getuigenis className="lg:max-w-[46rem]" />
            <LesreeksKnop location="cases_overzicht" className="w-full shrink-0 sm:w-auto" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
