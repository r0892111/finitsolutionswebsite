"use client";

/**
 * "Over ons" (finitsolutions.be/over-ons/ en /en/about/), wens van Alex 25/11:
 * de oprichters op een eigen tab. Geen nieuwe tekst: dit zijn sectie 7 ("Wie
 * zit er achter Finit") en sectie 5 ("Waarom Finit") uit Amina's copy, met de
 * foto van de drie samen. De knop gaat naar het formulier op de homepage.
 */

import type { Taal } from "./copy";
import { COPY, Kop, OVER_ONS, Steun, TeamBlok, Voet, WaaromBlok, useSecties } from "./kader";

export function OverOnsPagina({ taal }: { taal: Taal }) {
  const t = COPY[taal];
  const { href, klik } = useSecties(taal, false);
  return (
    <div className="nh" lang={taal}>
      <Kop taal={taal} thuis={false} taalPaden={OVER_ONS} actief="over-ons" />
      <main id="inhoud">
        <section className="nh-sectie !pt-12 lg:!pt-20">
          <div className="nh-wrap">
            <h1 className="nh-h2 max-w-[18em]">{t.team.h2}</h1>
            <p className="nh-sub mt-5">{t.team.sub}</p>
            <div className="mt-12">
              <TeamBlok taal={taal} location="over-ons" voorrang />
            </div>
          </div>
        </section>

        <section className="nh-sectie">
          <div className="nh-wrap">
            <WaaromBlok taal={taal} />
          </div>
        </section>

        <section className="nh-sectie">
          <div className="nh-wrap">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
              <div>
                <h2 className="nh-h2">{t.slot.h2}</h2>
                <p className="nh-sub mt-5">{t.slot.kort}</p>
                <p className="nh-tekst mt-3">{t.slot.tekst}</p>
                <a href={href("startgesprek")} onClick={klik("startgesprek", "over-ons")} className="nh-knop nh-knop--breed mt-8">{t.nav.cta}</a>
              </div>
              <div>
                <Steun label={t.hero.ondersteund} />
                <p className="nh-feit mt-6">{t.hero.gesproken}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Voet taal={taal} los />
    </div>
  );
}
