"use client";

/**
 * /cases: alle oplossingen volledig uitgeschreven onder elkaar, elk met een
 * anker (/cases#<slug>) waar de kaarten op de homepage naartoe linken. Per
 * oplossing: hoe het vandaag gaat, wat de AI-werknemer doet, wat jij nog doet.
 * Onderaan de quote van Bas en de lesreeks. De data staat in cases.ts.
 */

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { CASES } from "./copy";
import { OPLOSSING_LIJST, logoVoor } from "./cases";
import { Getuigenis } from "./case-kaart";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { CONTAINER, H2, H3, LEAD, LesreeksKnop, Onder } from "./ui";

const LABEL = "text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#6C7590]";

export function CasesOverzicht() {
  const P = CASES.pagina;
  const D = CASES.detail;
  return (
    <div className="hp min-h-screen bg-white text-[#3D4766]">
      <SiteHeader location="cases" />

      <main>
        <section className={`${CONTAINER} pb-10 pt-10 sm:pb-12 sm:pt-14`}>
          <nav aria-label="Kruimelpad" className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-[#6C7590]">
            <a href="/" className="transition-colors hover:text-[#1A2D63]">Home</a>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-[#1A2D63]">{D.kruimel}</span>
          </nav>
          <h1 className={`mt-7 ${H2} sm:text-[2.6rem] lg:text-[3rem]`}>
            {P.h1[0]} <Onder>{P.h1[1]}</Onder>
          </h1>
          <p className={`mt-5 max-w-[40rem] ${LEAD}`}>{P.intro}</p>
        </section>

        <section className="bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-12 sm:py-14`}>
            <ol className="mx-auto grid max-w-[54rem] gap-6">
              {OPLOSSING_LIJST.map((o) => {
                const logos = o.tools.flatMap((naam) => {
                  const l = logoVoor(naam);
                  return l ? [l] : [];
                });
                return (
                  <li key={o.slug} id={o.slug} className="hp-card scroll-mt-24 p-6 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                      <h2 className={`${H3} max-w-[30rem] text-[1.5rem] sm:text-[1.7rem]`}>{o.titel}</h2>
                      <span className="flex flex-wrap gap-2" aria-label={D.gekoppeld}>
                        {logos.map((l) => (
                          <span key={l.naam} className="hp-chip hp-chip--klein">
                            <Image src={l.src} alt="" width={32} height={32} className={l.woordmerk ? "h-3.5 w-auto" : "h-4 w-4 object-contain"} />
                            {!l.woordmerk && l.naam}
                          </span>
                        ))}
                      </span>
                    </div>
                    <p className="mt-2 text-[1.0625rem] leading-[1.6] text-[#3D4766]">{o.kort}</p>

                    <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-8">
                      <div>
                        <p className={LABEL}>{D.vandaag}</p>
                        <p className="mt-2 text-[0.9375rem] leading-[1.65] text-[#3D4766]">{o.vandaag}</p>
                      </div>
                      <div>
                        <p className={LABEL}>{D.metAI}</p>
                        <ol className="mt-2">
                          {o.metAI.map((st, i) => (
                            <li key={st} className="relative flex gap-3 pb-3 last:pb-0">
                              {i < o.metAI.length - 1 && <span className="absolute bottom-0 left-[11.5px] top-7 w-px bg-[#1A2D63]/15" aria-hidden="true" />}
                              <span className="hp-display relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1A2D63] text-[0.75rem] font-bold text-white">{i + 1}</span>
                              <span className="pt-0.5 text-[0.9375rem] leading-[1.55] text-[#3D4766]">{st}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <p className="mt-5 rounded-[14px] bg-[#E6ECF9] px-4 py-3 text-[0.9375rem] leading-[1.5] text-[#1A2D63]">
                      <span className="mr-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#1A2D63]/70">{D.jij}</span>
                      <span className="font-medium">{o.jij}</span>
                    </p>
                  </li>
                );
              })}
            </ol>
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
