"use client";

/**
 * De homepage (finitsolutions.be/ en /en/), branch homepage-amina.
 *
 * Tekst: de copy van Amina (tab "Hub copy", stand 25/11 na de comments van Alex),
 * in haar volgorde: hero → herkenbaar? → wat is een company brain → hoe we werken
 * → waarom Finit → wat we bouwen → wie zit er achter Finit → (bewijs) → FAQ →
 * voor wie → slot met het formulier. Alle tekst staat in ./copy.nl.ts en
 * ./copy.en.ts; deze pagina bevat geen tekst.
 *
 * Opmaak: de huisstijl van de live site (Alex, 25/11: terug naar de oude stijl,
 * zonder de tekeningen). Dat is het hp-blok in app/globals.css met de bouwstenen
 * uit components/home/ui.tsx: witte en lichtgrijze banden, marineblauw, de amber
 * pilknop voor de ene hoofdactie, witte kaarten met zachte schaduw, de streep
 * onder het einde van een kop. Zie ./DESIGN.md.
 *
 * Knoppen: de amber knop is altijd "Boek een conversatie" en springt naar het
 * formulier. Amina's twee andere knoppen ("Toon me wat er ontbreekt", "Toon me
 * hoe het werkt") gaan naar de volgende sectie en zijn marineblauw of wit.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { CONTAINER, H2, H3, KOP, LEAD, Vinkje } from "@/components/home/ui";
import type { Taal } from "./copy";
import { COPY, HOME, Kop, Plusje, Steun, Streep, TEKST, TeamBlok, Voet, WaaromBlok, useSecties, vast } from "./kader";
import { StartFormulier } from "./start-formulier";
import { TOOLS } from "./tools";

/** Het pilletje "Stap 1", "Stap 2": het is een traject, geen keuze (zoals op de live site). */
function StapPil({ label }: { label: string }) {
  return <span className="rounded-full bg-[#1A2D63] px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white">{label}</span>;
}

/**
 * De zes voorbeelden per sector. Alex, 25/11: aanklikbaar, maar er mag niets verschuiven.
 *
 * Desktop: de sectoren links, de tekst van de gekozen sector rechts in één wit paneel.
 * Alle teksten liggen in dat paneel op elkaar (de niet-gekozen onzichtbaar), zodat het
 * paneel altijd zo hoog is als de langste tekst en de blauwe band nooit meebeweegt.
 * Gsm: de tekst klapt open in de rij zelf, één tegelijk.
 */
function Voorbeelden({ cases }: { cases: { sector: string; tekst: string }[] }) {
  const [actief, setActief] = useState(0);
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-5">
      <ul className="space-y-2.5">
        {cases.map((c, i) => {
          const open = i === actief;
          return (
            <li key={c.sector} className={`overflow-hidden rounded-[16px] border transition-colors duration-200 ${open ? "border-white bg-white text-[#1A2D63]" : "border-white/15 bg-white/[0.07] text-white hover:bg-white/[0.13]"}`}>
              <button
                type="button"
                onClick={() => setActief(i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[1.0625rem] font-semibold leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#E9A13B]"
              >
                <span>{c.sector}</span>
                <ChevronRight className={`h-5 w-5 shrink-0 transition-transform duration-200 ${open ? "rotate-90 lg:rotate-0" : "opacity-70"}`} aria-hidden="true" />
              </button>
              <div className="hp-vouw lg:hidden" data-open={open}>
                <div>
                  <div>
                    <p className="px-5 pb-5 text-[0.9375rem] leading-[1.6] text-[#3D4766]">{vast(c.tekst)}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="hp-card hidden p-8 lg:grid xl:p-10" aria-live="polite">
        {cases.map((c, i) => (
          <div key={c.sector} className={`[grid-area:1/1] ${i === actief ? "hp-wissel" : "invisible"}`} aria-hidden={i !== actief}>
            <h3 className="hp-display hp-display-sm text-[1.45rem] font-semibold leading-[1.2] text-[#1A2D63]">{c.sector}</h3>
            <p className="mt-3 text-[1.0625rem] leading-[1.65] text-[#3D4766]">{vast(c.tekst)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Wit H2 op een marineblauwe band: zelfde maat als H2. */
const H2_WIT = "hp-display text-balance text-[1.9rem] font-bold leading-[1.06] text-white sm:text-[2.3rem] lg:text-[2.6rem]";

export function HomePagina({ taal }: { taal: Taal }) {
  const t = COPY[taal];
  const [plak, setPlak] = useState(false);
  const { klik } = useSecties(taal, true);
  const start = (location: string) => klik("startgesprek", location);

  // Gsm: de knop plakt onderaan zodra de hele hero voorbij is (Alex, 25/11: niet terwijl je nog
  // op de hero zit, anders staan er twee dezelfde knoppen tegelijk), en verdwijnt bij het formulier.
  // De hero telt als voorbij wanneer hij volledig onder de navigatie (68 px) verdwenen is.
  useEffect(() => {
    const hero = document.getElementById("hero");
    const slot = document.getElementById("startgesprek");
    if (!hero || !slot) return;
    let heroWeg = false;
    let slotInBeeld = false;
    const zet = () => setPlak(heroWeg && !slotInBeeld);
    const o1 = new IntersectionObserver(([e]) => { heroWeg = !e.isIntersecting && e.boundingClientRect.bottom <= 68; zet(); }, { rootMargin: "-68px 0px 0px 0px" });
    const o2 = new IntersectionObserver(([e]) => { slotInBeeld = e.isIntersecting; zet(); }, { rootMargin: "0px 0px -20% 0px" });
    o1.observe(hero);
    o2.observe(slot);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  /** De amber hoofdknop, overal dezelfde. */
  const Hoofdknop = ({ location, label, id, className = "" }: { location: string; label: string; id?: string; className?: string }) => (
    <a id={id} href="#startgesprek" onClick={start(location)} className={`hp-btn hp-btn--accent hp-btn--lg ${className}`}>
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );

  return (
    <div className="hp nh" lang={taal}>
      <Kop taal={taal} thuis taalPaden={HOME} />

      <main id="inhoud">
        {/* -------------------------------------------------------------- */}
        {/* 1. Hero                                                        */}
        {/* -------------------------------------------------------------- */}
        <header id="hero" className={`${CONTAINER} pb-12 pt-12 text-center sm:pt-16 lg:pb-14 lg:pt-20`}>
          <div className="hp-rise mx-auto max-w-[58rem]">
            <p className="mx-auto max-w-[22rem] text-[0.9375rem] font-semibold leading-[1.4] text-[#1A2D63] sm:max-w-none sm:text-[1rem]">{t.hero.voorWie}</p>
            <h1 className="hp-display mt-4 text-[2.4rem] font-bold leading-[1.04] text-[#1A2D63] sm:text-[3.1rem] lg:text-[3.7rem]">
              <Streep tekst={t.hero.h1} streep={t.hero.h1Streep} accent />
            </h1>
            <p className="mx-auto mt-6 max-w-[42rem] text-[1.1875rem] font-medium leading-[1.45] text-[#1A2D63] sm:text-[1.3125rem]">{vast(t.hero.h1Vervolg)}</p>
            <p className={`mx-auto mt-4 max-w-[44rem] ${LEAD}`}>{vast(t.hero.sub)}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Hoofdknop id="hero-knop" location="hero" label={t.hero.knop} className="w-full sm:w-auto" />
              <a href="#werkwijze" onClick={klik("werkwijze", "hero")} className="hp-btn hp-btn--secondary hp-btn--lg w-full sm:w-auto">
                {t.hero.tweedeLink}
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <ul className="mx-auto mt-7 w-fit space-y-2.5 text-left">
              {t.hero.punten.map((punt) => (
                <li key={punt} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-[#3D4766] lg:text-[1rem]">
                  <Vinkje />
                  <span>{punt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-[#E3E7EF] pt-8">
              <Steun label={t.hero.ondersteund} midden />
            </div>
          </div>
        </header>

        {/* -------------------------------------------------------------- */}
        {/* 2. Herkenbaar?                                                 */}
        {/* -------------------------------------------------------------- */}
        <section id="herkenbaar" className="nh-sectie bg-[#F5F7FB]">
          <div className={`${CONTAINER} pb-10 pt-14 sm:pt-20`}>
            <div className={`${KOP} max-w-[52rem]`}>
              <p className="inline-flex rounded-full bg-[#E6ECF9] px-3.5 py-1.5 text-[0.8125rem] font-semibold text-[#1A2D63]">{t.herken.kicker}</p>
              <h2 className={`mt-4 ${H2}`}><Streep tekst={t.herken.h2} /></h2>
              <p className={`mt-4 ${LEAD} font-medium text-[#1A2D63]`}>{t.herken.vraag}</p>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {t.herken.punten.map((p) => (
                <li key={p.titel} className="hp-card p-6 sm:p-7">
                  <h3 className={H3}>{p.titel}</h3>
                  <p className={`mt-2 ${TEKST}`}>{vast(p.tekst)}</p>
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-10 max-w-[46rem] text-center">
              <p className="hp-display hp-display-sm text-[1.25rem] font-semibold leading-[1.35] text-[#1A2D63] sm:text-[1.45rem]">{vast(t.herken.slot)}</p>
              <div className="mt-6 flex flex-col items-center gap-4">
                <a href="#brein" onClick={klik("brein", "herken")} className="hp-btn hp-btn--primary hp-btn--lg w-full sm:w-auto">
                  {t.herken.knop}
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#startgesprek" onClick={start("herken")} className="hp-link text-[0.9375rem] font-medium">{t.herken.kleineLink}</a>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 3. Wat is een company brain: het marineblauwe paneel           */}
        {/* -------------------------------------------------------------- */}
        <section id="brein" className="nh-sectie bg-[#F5F7FB]">
          <div className={`${CONTAINER} pb-14 pt-4 sm:pb-20`}>
            <div className="rounded-[20px] bg-[#1A2D63] p-7 text-white shadow-[0_20px_44px_-24px_rgba(26,45,99,0.6)] sm:p-9 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-12">
                <div>
                  <h2 className="hp-display hp-display-sm text-[1.6rem] font-semibold leading-[1.15] sm:text-[1.9rem] lg:text-[2.1rem]">
                    <Streep tekst={t.brein.h2} wit />
                  </h2>
                  <p className="mt-4 text-[1.0625rem] font-medium leading-[1.5] text-white sm:text-[1.125rem]">{vast(t.brein.sub)}</p>
                  <div className="mt-5 space-y-3 text-[1rem] leading-[1.6] text-white/85 sm:text-[1.0625rem]">
                    {t.brein.alineas.map((a) => (
                      <p key={a}>{vast(a)}</p>
                    ))}
                  </div>
                </div>
                <ul className="space-y-4">
                  {t.brein.verander.map((v) => (
                    <li key={v.titel} className="flex items-start gap-3.5 rounded-[16px] border border-white/15 bg-white/[0.07] p-5">
                      <Vinkje donker groot />
                      <div>
                        <h3 className="text-[1.0625rem] font-semibold leading-[1.35] text-white">{v.titel}</h3>
                        <p className="mt-1 text-[0.9375rem] leading-[1.55] text-white/80">{vast(v.tekst)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex flex-col gap-5 border-t border-white/15 pt-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <p className="max-w-[40rem] text-[1.0625rem] leading-[1.55] text-white">{vast(t.brein.slot)}</p>
                <a href="#werkwijze" onClick={klik("werkwijze", "brein")} className="hp-btn hp-btn--light hp-btn--lg w-full shrink-0 sm:w-auto">
                  {t.brein.knop}
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 4. Hoe we werken: vier stappen                                 */}
        {/* -------------------------------------------------------------- */}
        {/* De knop onder het formulier op /hub linkt naar /#aanpak (zo heette deze sectie op de vorige homepage). */}
        <span id="aanpak" className="nh-anker" aria-hidden="true" />
        <section id="werkwijze" className="nh-sectie bg-white">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <div className={`${KOP} max-w-[48rem]`}>
              <h2 className={H2}><Streep tekst={t.werkwijze.h2} /></h2>
              <p className={`mt-4 ${LEAD}`}>{vast(t.werkwijze.sub)}</p>
            </div>
            <ol className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-2">
              {t.werkwijze.stappen.map((s, i) => (
                <li key={s.titel} className="hp-card p-6 sm:p-7">
                  <StapPil label={`${t.werkwijze.stap} ${i + 1}`} />
                  <h3 className={`mt-4 ${H3}`}>{s.titel}</h3>
                  <p className={`mt-2 ${TEKST}`}>{vast(s.tekst)}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex justify-center">
              <Hoofdknop location="werkwijze" label={t.werkwijze.knop} className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. Waarom Finit                                                */}
        {/* -------------------------------------------------------------- */}
        <section id="waarom" className="nh-sectie bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <WaaromBlok taal={taal} />
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 6. Wat we bouwen: de voorbeelden klap je open                  */}
        {/* -------------------------------------------------------------- */}
        <section id="bouwen" className="nh-sectie bg-[#1A2D63] text-white">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <div className={`${KOP} max-w-[48rem]`}>
              <h2 className={H2_WIT}><Streep tekst={t.bouwen.h2} wit /></h2>
              <p className="mt-4 text-[1.0625rem] font-medium leading-[1.55] text-white sm:text-[1.125rem]">{vast(t.bouwen.sub)}</p>
              <p className="mt-3 text-[1rem] leading-[1.65] text-white/80 sm:text-[1.0625rem]">{vast(t.bouwen.intro)}</p>
            </div>

            <p className="mx-auto mt-10 max-w-[40rem] text-center text-[0.9375rem] leading-[1.55] text-white/70">{vast(t.bouwen.praktijk)}</p>
            <Voorbeelden cases={t.bouwen.cases} />
          </div>
        </section>

        {/* De tools: alleen de logo's, zonder naam ernaast (Alex, 25/11). De lijst staat in ./tools.ts. */}
        <div className="bg-white">
          <div className={`${CONTAINER} pt-12 text-center sm:pt-14`}>
            <p className="text-[0.9375rem] font-semibold text-[#6C7590]">{t.bouwen.toolsTitel}</p>
            <ul className="mx-auto mt-5 flex max-w-[64rem] flex-wrap justify-center gap-2.5">
              {TOOLS.map((tool) => (
                <li key={tool.naam} className={`nh-logo ${tool.vorm ? `nh-logo--${tool.vorm}` : ""}`} title={tool.naam}>
                  <Image src={tool.src} alt={tool.naam} width={96} height={48} />
                </li>
              ))}
              <li className="hp-chip hp-chip--plus min-h-[52px]">
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>{t.bouwen.toolsRest}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 7. Wie zit er achter Finit                                     */}
        {/* -------------------------------------------------------------- */}
        <section id="team" className="nh-sectie bg-white">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <div className={`${KOP} max-w-[48rem]`}>
              <h2 className={H2}><Streep tekst={t.team.h2} /></h2>
              <p className={`mt-4 ${LEAD}`}>{vast(t.team.sub)}</p>
            </div>
            <div className="mt-10">
              <TeamBlok taal={taal} location="team" />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 8. Bewijs: verborgen tot er een getuigenis in de copy staat     */}
        {/* -------------------------------------------------------------- */}
        {t.bewijs.getuigenissen.length > 0 && (
          <section id="bewijs" className="nh-sectie bg-[#1A2D63] text-white">
            <div className={`${CONTAINER} py-14 sm:py-20`}>
              <div className={`${KOP} max-w-[48rem]`}>
                <h2 className={H2_WIT}><Streep tekst={t.bewijs.h2} wit /></h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.55] text-white/85 sm:text-[1.125rem]">{vast(t.bewijs.sub)}</p>
                <p className="mt-6 text-[0.9375rem] font-semibold text-white/70">{t.bewijs.getuigenissenTitel}</p>
              </div>
              <ul className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2">
                {t.bewijs.getuigenissen.map((g) => (
                  <li key={g.naam} className="hp-card p-6 sm:p-7">
                    <blockquote className="hp-display hp-display-sm text-[1.2rem] font-medium leading-[1.4] text-[#1A2D63]">&ldquo;{g.quote}&rdquo;</blockquote>
                    <p className="mt-4 text-[0.875rem] font-medium text-[#6C7590]">{g.naam}, {g.bedrijf}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex justify-center">
                <Hoofdknop location="bewijs" label={t.bewijs.knop} className="w-full sm:w-auto" />
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------- */}
        {/* 9. Veelgestelde vragen                                         */}
        {/* -------------------------------------------------------------- */}
        <section id="vragen" className="nh-sectie bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <div className={`${KOP} max-w-[48rem]`}>
              <h2 className={H2}><Streep tekst={t.faq.h2} /></h2>
              <p className={`mt-4 ${LEAD}`}>{vast(t.faq.sub)}</p>
            </div>
            <div className="hp-card mx-auto mt-10 max-w-[54rem] px-6 sm:px-8">
              {t.faq.items.map((item, i) => (
                <details key={item.q} className={`hp-details ${i > 0 ? "border-t border-[#E3E7EF]" : ""}`}>
                  <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium leading-snug text-[#1A2D63]">
                    <span>{item.q}</span>
                    <Plusje />
                  </summary>
                  <p className={`pb-6 pr-8 sm:pr-12 ${TEKST}`}>{vast(item.a)}</p>
                </details>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Hoofdknop location="faq" label={t.faq.knop} className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 10. Voor wie is dit                                            */}
        {/* -------------------------------------------------------------- */}
        <section id="voor-wie" className="nh-sectie bg-white">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <div className={`${KOP} max-w-[48rem]`}>
              <h2 className={H2}><Streep tekst={t.voorWie.h2} /></h2>
            </div>
            {/* Woordelijk de kaarten van de hub (Alex, 25/11): groen voor wie wel, rood voor wie niet. */}
            <div className="nh-wie-raster">
              {(["wel", "niet"] as const).map((soort) => {
                const blok = t.voorWie[soort];
                const Icoon = soort === "wel" ? Check : X;
                return (
                  <div key={soort} className={`nh-wie-kaart nh-wie-kaart--${soort}`}>
                    <h3 className="nh-wie-titel">
                      <span className="nh-wie-icoon" aria-hidden="true">
                        <Icoon strokeWidth={3} />
                      </span>
                      {blok.titel}
                    </h3>
                    <ul className="nh-wie-lijst">
                      {blok.items.map((item) => (
                        <li key={item}>
                          <span className="nh-wie-icoon nh-wie-icoon--klein" aria-hidden="true">
                            <Icoon strokeWidth={3} />
                          </span>
                          <span>{vast(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 11. Slot en formulier                                          */}
        {/* -------------------------------------------------------------- */}
        {/* Oudere pagina's (blog, quiz, het oude menu) linken nog naar /#contact: dat komt hier uit. */}
        <span id="contact" className="nh-anker" aria-hidden="true" />
        <section id="startgesprek" className="nh-sectie bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-14">
              <div className="lg:pt-4">
                <h2 className={H2}><Streep tekst={t.slot.h2} /></h2>
                <p className={`mt-4 ${LEAD} font-medium text-[#1A2D63]`}>{vast(t.slot.sub)}</p>
                <p className="mt-6 inline-flex rounded-full bg-[#E6ECF9] px-3.5 py-1.5 text-[0.875rem] font-semibold text-[#1A2D63]">{t.slot.kort}</p>
                <p className={`mt-4 ${LEAD}`}>{vast(t.slot.tekst)}</p>
              </div>
              <div className="hp-card p-6 sm:p-8">
                <StartFormulier t={t.slot.formulier} taal={taal} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Voet taal={taal} />

      {/* Gsm: de hoofdknop blijft onderaan bereikbaar, tot je bij het formulier bent. */}
      <div className="nh-plak" data-toon={plak} aria-hidden={!plak}>
        <a href="#startgesprek" onClick={start("plakbalk")} tabIndex={plak ? 0 : -1} className="hp-btn hp-btn--accent hp-btn--lg w-full">
          {t.plakbalk}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
