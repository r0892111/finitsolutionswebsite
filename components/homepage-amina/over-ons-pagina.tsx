"use client";

/**
 * "Over ons" (finitsolutions.be/over-ons/ en /en/about/), wens van Alex 25/11:
 * de oprichters op een eigen tab. Geen nieuwe tekst: dit zijn sectie 7 ("Wie
 * zit er achter Finit") en sectie 5 ("Waarom Finit") uit Amina's copy, met de
 * foto van de drie samen. De knop gaat naar het formulier op de homepage.
 * Zelfde huisstijl als de homepage (die van de live site).
 */

import { ArrowRight } from "lucide-react";
import { CONTAINER, LEAD } from "@/components/home/ui";
import type { Taal } from "./copy";
import { COPY, Kop, OVER_ONS, Steun, Streep, TeamBlok, Voet, WaaromBlok, useSecties, vast } from "./kader";

export function OverOnsPagina({ taal }: { taal: Taal }) {
  const t = COPY[taal];
  const { href, klik } = useSecties(taal, false);
  return (
    <div className="hp nh" lang={taal}>
      <Kop taal={taal} thuis={false} taalPaden={OVER_ONS} actief="over-ons" />
      <main id="inhoud">
        <section className="bg-white">
          <div className={`${CONTAINER} pb-14 pt-12 sm:pb-20 sm:pt-16`}>
            <div className="hp-rise mx-auto max-w-[48rem] text-center">
              <h1 className="hp-display text-[2.2rem] font-bold leading-[1.05] text-[#1A2D63] sm:text-[2.8rem] lg:text-[3.2rem]">
                <Streep tekst={t.team.h2} accent />
              </h1>
              <p className={`mt-5 ${LEAD}`}>{vast(t.team.sub)}</p>
            </div>
            <div className="mt-10">
              <TeamBlok taal={taal} location="over-ons" voorrang />
            </div>
          </div>
        </section>

        <section className="bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <WaaromBlok taal={taal} />
          </div>
        </section>

        <section className="bg-white">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <div className="rounded-[20px] bg-[#1A2D63] p-7 text-white shadow-[0_20px_44px_-24px_rgba(26,45,99,0.6)] sm:p-9 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-center lg:gap-12">
                <div>
                  <h2 className="hp-display hp-display-sm text-[1.6rem] font-semibold leading-[1.15] sm:text-[1.9rem] lg:text-[2.1rem]">
                    <Streep tekst={t.slot.h2} wit />
                  </h2>
                  <p className="mt-4 text-[1.0625rem] font-medium leading-[1.5] text-white sm:text-[1.125rem]">{t.slot.kort}</p>
                  <p className="mt-2 max-w-[40rem] text-[1rem] leading-[1.6] text-white/85 sm:text-[1.0625rem]">{vast(t.slot.tekst)}</p>
                </div>
                <div className="lg:justify-self-end">
                  <a href={href("startgesprek")} onClick={klik("startgesprek", "over-ons")} className="hp-btn hp-btn--accent hp-btn--lg w-full sm:w-auto">
                    {t.nav.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Steun label={t.hero.ondersteund} midden />
            </div>
          </div>
        </section>
      </main>
      <Voet taal={taal} />
    </div>
  );
}
