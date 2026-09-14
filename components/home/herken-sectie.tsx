"use client";

/**
 * "Herken jij dit?": drie punten die de lezer herkent, elk met een tekening
 * (illustraties.tsx), om en om links en rechts van de tekst. Daaronder de
 * vraag "Herkenbaar?" met de knop, zodat de lezer al ja zegt voor hij klikt.
 * De oplossing volgt meteen (oplossing-sectie.tsx), in dezelfde lichte band.
 *
 * Geen cijfers, geen voorbeelden, geen kaarten: die zijn na de review van
 * 13 september 2026 vervangen door drie grote zinnen die je in één blik leest.
 * Tekst in copy.ts (HERKEN).
 */

import type { ComponentType } from "react";
import { HERKEN, type HerkenBeeld } from "./copy";
import { CONTAINER, H2, KOP, LEAD, LesreeksKnop, Onder } from "./ui";
import { BeginnenTekening, ChatgptTekening, FlessenhalsTekening } from "./illustraties";

const BEELDEN: Record<HerkenBeeld, ComponentType<{ className?: string }>> = {
  flessenhals: FlessenhalsTekening,
  chatgpt: ChatgptTekening,
  beginnen: BeginnenTekening,
};

export function HerkenSectie() {
  return (
    <section id="recognition" className="scroll-mt-20 bg-[#F5F7FB]">
      {/* Op desktop meer ruimte bovenaan: het YC-kaartje hangt half onder de foto erboven. */}
      <div className={`${CONTAINER} pt-12 sm:pt-14 lg:pt-24`}>
        <div className={KOP}>
          <h2 className={H2}>
            {HERKEN.h2[0]} <Onder>{HERKEN.h2[1]}</Onder>
          </h2>
          <p className={`mt-4 ${LEAD}`}>{HERKEN.intro}</p>
        </div>

        {/* De drie punten: tekst en tekening, om en om. De tekst staat eerst in de DOM. */}
        <ol className="mx-auto mt-8 grid max-w-[60rem] gap-8 lg:gap-6">
          {HERKEN.items.map((item, i) => {
            const Beeld = BEELDEN[item.beeld];
            const tekstRechts = i % 2 === 1;
            return (
              <li key={item.tekst} className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8 lg:gap-12">
                <p className={`hp-display text-balance text-[1.5rem] font-semibold leading-[1.15] text-[#1A2D63] sm:text-[1.75rem] lg:text-[1.9rem] ${tekstRechts ? "sm:order-last sm:text-right" : ""}`}>
                  {item.tekst}
                </p>
                {/* Zonder kader: de tekening staat rechtstreeks op de lichte band. */}
                <Beeld className="block h-auto w-full" />
              </li>
            );
          })}
        </ol>

        {/* De vraag en de knop */}
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="hp-display text-[1.6rem] font-semibold leading-tight text-[#1A2D63] sm:text-[1.9rem]">{HERKEN.overgang}</p>
          <LesreeksKnop location="recognition" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
