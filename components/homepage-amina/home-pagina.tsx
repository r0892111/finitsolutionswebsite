"use client";

/**
 * De homepage (finitsolutions.be/ en /en/), branch homepage-amina, 25/11/2026.
 *
 * Copy: Amina (tab "Hub copy", 24/11). Alle tekst staat in ./copy.nl.ts en
 * ./copy.en.ts; deze pagina bevat geen tekst. Opmaak: ./homepage.css.
 *
 * Volgorde, zoals in haar copy: hero → herkenbaar? → wat is een company brain
 * → hoe we werken → waarom Finit → wat we bouwen → wie zit er achter Finit →
 * bewijs → vragen → voor wie → slot met het formulier.
 *
 * Eén gevulde knop op de hele pagina: "Plan een gratis startgesprek". Die
 * springt altijd naar het formulier onderaan (#startgesprek). Al de rest is een
 * link. Geen tekeningen: het enige beeld naast de foto's is het brein zelf, als
 * tekstbestand.
 */

import { useEffect, useState } from "react";
import { ArrowDown, Check, Phone, Plus, X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { PHONE_LINK, PHONE_NUMBER } from "@/lib/finit-links";
import { BreinBlad, BreinVerkenner } from "./brein";
import type { CaseStatus, Taal } from "./copy";
import { COPY, HOME, Kop, Steun, TeamBlok, Voet, WaaromBlok, useSecties } from "./kader";
import { StartFormulier } from "./start-formulier";

const STATUS_VOLGORDE: CaseStatus[] = ["voorstel", "opbouw", "piloot", "opgeleverd"];
/** Zoveel vragen staan er meteen; de rest komt met "Toon alle vragen". */
const VRAGEN_ZICHTBAAR = 8;

function Meter({ aan, van }: { aan: number; van: number }) {
  return (
    <span className="nh-meter" aria-hidden="true">
      {Array.from({ length: van }, (_, i) => (
        <i key={i} data-aan={i < aan} />
      ))}
    </span>
  );
}

export function HomePagina({ taal }: { taal: Taal }) {
  const t = COPY[taal];
  const [plak, setPlak] = useState(false);
  const [alleVragen, setAlleVragen] = useState(false);
  const { klik } = useSecties(taal, true);
  // De knop van het startgesprek: overal dezelfde, springt naar het formulier.
  const start = (location: string) => klik("startgesprek", location);
  const spring = klik;

  // Gsm: de knop plakt onderaan zodra de hero uit beeld is, en verdwijnt bij het formulier.
  useEffect(() => {
    const hero = document.getElementById("hero-knop");
    const slot = document.getElementById("startgesprek");
    if (!hero || !slot) return;
    let heroWeg = false;
    let slotInBeeld = false;
    const zet = () => setPlak(heroWeg && !slotInBeeld);
    const o1 = new IntersectionObserver(([e]) => { heroWeg = !e.isIntersecting && e.boundingClientRect.top < 0; zet(); });
    const o2 = new IntersectionObserver(([e]) => { slotInBeeld = e.isIntersecting; zet(); }, { rootMargin: "0px 0px -20% 0px" });
    o1.observe(hero);
    o2.observe(slot);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  return (
    <div className="nh" lang={taal}>
      <Kop taal={taal} thuis taalPaden={HOME} />

      <main id="inhoud">
        {/* ---------------------------------------------------------- */}
        {/* 1. Hero                                                    */}
        {/* ---------------------------------------------------------- */}
        <header className="nh-hero">
          <div className="nh-wrap nh-hero-grid">
            <div>
              <p className="nh-voorwie">{t.hero.voorWie}</p>
              <h1 className="nh-h1 mt-4">{t.hero.h1}</h1>
              <p className="nh-vervolg mt-5 max-w-[26em]">{t.hero.h1Vervolg}</p>
              <p className="nh-tekst mt-6">{t.hero.sub}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
                <a id="hero-knop" href="#startgesprek" onClick={start("hero")} className="nh-knop nh-knop--breed">{t.hero.knop}</a>
                <a href="#werkwijze" onClick={spring("werkwijze", "hero")} className="nh-link nh-link-neer justify-center sm:justify-start">
                  {t.hero.tweedeLink}
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <ul className="nh-punten mt-8">
                {t.hero.punten.map((p) => (
                  <li key={p} className="nh-punt">
                    <Check className="nh-vink" strokeWidth={2.5} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <figure>
              <BreinBlad bestand={t.brein.verkenner.bestanden[0]} voorbeeld={t.brein.verkenner.voorbeeld} wortel={t.brein.verkenner.wortel} schrijf />
              <figcaption className="nh-klein mt-4">{t.hero.bestandBijschrift}</figcaption>
            </figure>
          </div>

          {/* De vertrouwensstrook: wie ons steunt, en met hoeveel bedrijven we al spraken. */}
          <div className="nh-wrap mt-12 lg:mt-16">
            <div className="flex flex-col gap-6 border-t border-[var(--nh-lijn)] pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <Steun label={t.hero.ondersteund} />
              <p className="font-medium text-[var(--nh-inkt)] lg:pb-1 lg:text-right">{t.hero.gesproken}</p>
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------- */}
        {/* 2. Herkenbaar?                                             */}
        {/* ---------------------------------------------------------- */}
        <section id="herkenbaar" className="nh-sectie nh-donker">
          <div className="nh-wrap">
            <p className="nh-h3 !text-[var(--nh-stift)]">{t.herken.kicker}</p>
            <h2 className="nh-h2 mt-4 max-w-[22em]">{t.herken.h2}</h2>
            <p className="nh-sub mt-5 !text-[var(--nh-op-inkt)]">{t.herken.vraag}</p>

            <ul className="nh-pijnen mt-12 lg:mt-16">
              {t.herken.punten.map((p) => (
                <li key={p.titel} className="nh-pijn">
                  <h3 className="nh-h3">{p.titel}</h3>
                  <p className="mt-3 max-w-[32em]">{p.tekst}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
              <p className="nh-sub !max-w-[30em]">{t.herken.slot}</p>
              <div className="flex flex-col gap-3 lg:items-end">
                <a href="#brein" onClick={spring("brein", "herken")} className="nh-link nh-link-neer text-[1.1875rem]">
                  {t.herken.knop}
                  <ArrowDown className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#startgesprek" onClick={start("herken")} className="nh-klein inline-flex min-h-[44px] items-center underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  {t.herken.kleineLink}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 3. Wat is een company brain?                               */}
        {/* ---------------------------------------------------------- */}
        <section id="brein" className="nh-sectie">
          <div className="nh-wrap">
            <h2 className="nh-h2 max-w-[20em]">{t.brein.h2}</h2>
            <p className="nh-sub mt-5">{t.brein.sub}</p>

            <div className="nh-rail mt-12 lg:mt-16">
              <div className="nh-tekst space-y-5">
                {t.brein.alineas.map((a) => (
                  <p key={a.slice(0, 24)}>{a}</p>
                ))}
              </div>
              <figure className="nh-rail-vast">
                <BreinVerkenner bestanden={t.brein.verkenner.bestanden} voorbeeld={t.brein.verkenner.voorbeeld} wortel={t.brein.verkenner.wortel} label={t.brein.verkenner.titel} />
                <figcaption className="nh-klein mt-4">
                  {t.brein.verkenner.titel}. {t.brein.verkenner.uitleg}
                </figcaption>
              </figure>
            </div>

            <div className="mt-16 lg:mt-24">
              <h3 className="nh-h3">{t.brein.veranderTitel}</h3>
              <ul className="mt-6 grid gap-8 md:grid-cols-2 md:gap-16">
                {t.brein.verander.map((v) => (
                  <li key={v.titel} className="border-t-2 border-[var(--nh-inkt)] pt-5">
                    <h4 className="nh-h3">{v.titel}</h4>
                    <p className="mt-2 max-w-[30em]">{v.tekst}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                <p className="nh-sub">
                  <span className="nh-markeer">{t.brein.slot.split(". ")[0]}.</span> {t.brein.slot.split(". ").slice(1).join(". ")}
                </p>
                <a href="#werkwijze" onClick={spring("werkwijze", "brein")} className="nh-link nh-link-neer shrink-0 text-[1.1875rem]">
                  {t.brein.knop}
                  <ArrowDown className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 4. Hoe we werken                                           */}
        {/* ---------------------------------------------------------- */}
        <section id="werkwijze" className="nh-sectie nh-vel">
          <div className="nh-wrap nh-rail">
            <div className="nh-rail-vast">
              <h2 className="nh-h2">{t.werkwijze.h2}</h2>
              <p className="nh-sub mt-5">{t.werkwijze.sub}</p>
              <p className="nh-tekst mt-5">{t.werkwijze.intro}</p>
              <a href="#startgesprek" onClick={start("werkwijze")} className="nh-knop nh-knop--breed mt-8">{t.werkwijze.knop}</a>
            </div>
            <ol className="nh-rijen">
              {t.werkwijze.stappen.map((s, i) => (
                <li key={s.titel} className="nh-stap">
                  <span className="nh-stap-nr" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="nh-h3">{s.titel}</h3>
                    <p className="mt-2 max-w-[34em]">{s.tekst}</p>
                  </div>
                  <span className="nh-duur">{s.duur}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 5. Waarom Finit                                            */}
        {/* ---------------------------------------------------------- */}
        <section id="waarom" className="nh-sectie">
          <div className="nh-wrap">
            <WaaromBlok taal={taal} />
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 6. Wat we bouwen                                           */}
        {/* ---------------------------------------------------------- */}
        <section id="bouwen" className="nh-sectie nh-vel">
          <div className="nh-wrap">
            <h2 className="nh-h2 max-w-[20em]">{t.bouwen.h2}</h2>
            <p className="nh-sub mt-5">{t.bouwen.sub}</p>
            <p className="nh-tekst mt-5">{t.bouwen.intro}</p>

            {/* De vijf niveaus: elk bouwt verder op het vorige, vandaar de volgorde en het balkje. */}
            <ol className="nh-rijen mt-10">
              {t.bouwen.niveaus.map((n, i) => (
                <li key={n.titel} className="nh-niveau">
                  <Meter aan={i + 1} van={t.bouwen.niveaus.length} />
                  <h3 className="nh-h3">{n.titel}</h3>
                  <p className="max-w-[36em]">{n.tekst}</p>
                </li>
              ))}
            </ol>

            <p className="nh-sub mt-16 lg:mt-24">{t.bouwen.praktijk}</p>
            <ul className="nh-cases mt-8">
              {t.bouwen.cases.map((c) => {
                const stand = STATUS_VOLGORDE.indexOf(c.status) + 1;
                return (
                  <li key={c.sector} className="nh-case">
                    <h3 className="nh-h3">{c.sector}</h3>
                    <p className="text-[1rem] leading-[1.6]">{c.tekst}</p>
                    <div className="nh-case-voet">
                      <p className="nh-status" data-status={c.status}>
                        <Meter aan={stand} van={STATUS_VOLGORDE.length} />
                        <span>
                          {t.bouwen.statusLabel}: {t.bouwen.statussen[c.status].toLowerCase()}
                        </span>
                      </p>
                      {c.statusNoot && <p className="nh-klein">{c.statusNoot}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="nh-tools mt-12">
              <b>{t.bouwen.toolsTitel}</b> {t.bouwen.tools.join(", ")}, {t.bouwen.toolsRest}
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 7. Wie zit er achter Finit                                 */}
        {/* ---------------------------------------------------------- */}
        <section id="team" className="nh-sectie">
          <div className="nh-wrap">
            <h2 className="nh-h2 max-w-[18em]">{t.team.h2}</h2>
            <p className="nh-sub mt-5">{t.team.sub}</p>
            <div className="mt-12">
              <TeamBlok taal={taal} location="team" />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 8. Bewijs                                                  */}
        {/* ---------------------------------------------------------- */}
        {/* Getuigenissen verschijnen pas als er echte in de copy staan (bewijs.getuigenissen). */}
        <section id="bewijs" className="nh-sectie nh-vel">
          <div className="nh-wrap">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
              <div>
                <h2 className="nh-h2">{t.bewijs.h2}</h2>
                <p className="nh-sub mt-5">{t.bewijs.sub}</p>
              </div>
              <div className="flex flex-col gap-8 lg:items-start">
                <Steun label={t.bewijs.ondersteund} />
                <a href="#startgesprek" onClick={start("bewijs")} className="nh-knop nh-knop--breed">{t.bewijs.knop}</a>
              </div>
            </div>

            {t.bewijs.getuigenissen.length > 0 && (
              <div className="mt-16">
                <h3 className="nh-h3">{t.bewijs.getuigenissenTitel}</h3>
                <ul className="mt-6 grid gap-6 md:grid-cols-2">
                  {t.bewijs.getuigenissen.map((g) => (
                    <li key={g.naam} className="nh-case">
                      <blockquote className="nh-quote">&ldquo;{g.quote}&rdquo;</blockquote>
                      <p className="nh-klein">
                        {g.naam}, {g.bedrijf}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 9. Vragen                                                  */}
        {/* ---------------------------------------------------------- */}
        <section id="vragen" className="nh-sectie">
          <div className="nh-wrap nh-rail">
            <div className="nh-rail-vast">
              <h2 className="nh-h2">{t.faq.h2}</h2>
              <p className="nh-sub mt-5">{t.faq.sub}</p>
              <a href="#startgesprek" onClick={start("faq")} className="nh-knop nh-knop--breed mt-8">{t.faq.knop}</a>
            </div>
            <div>
              {t.faq.items.map((item, i) => (
                <details key={item.q} className="nh-vraag" hidden={!alleVragen && i >= VRAGEN_ZICHTBAAR} onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && pushEvent("faq_open", { vraag: item.q.slice(0, 60), taal })}>
                  <summary>
                    <span>{item.q}</span>
                    <Plus className="nh-plus" strokeWidth={2} aria-hidden="true" />
                  </summary>
                  <p className="nh-antwoord">{item.a}</p>
                </details>
              ))}
              {!alleVragen && t.faq.items.length > VRAGEN_ZICHTBAAR && (
                <button
                  type="button"
                  onClick={() => { setAlleVragen(true); pushEvent("faq_alle", { taal }); }}
                  className="nh-link nh-link-neer mt-6"
                >
                  {t.faq.toonAlle.replace("{aantal}", String(t.faq.items.length))}
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 10. Voor wie                                               */}
        {/* ---------------------------------------------------------- */}
        <section id="voor-wie" className="nh-sectie nh-vel">
          <div className="nh-wrap">
            <h2 className="nh-h2 max-w-[18em]">{t.voorWie.h2}</h2>
            <p className="nh-sub mt-5">{t.voorWie.sub}</p>
            <div className="nh-twee mt-12">
              <div className="nh-vak nh-vak--niet">
                <h3 className="nh-h3">{t.voorWie.niet.titel}</h3>
                <ul className="nh-punten mt-6 !gap-4">
                  {t.voorWie.niet.items.map((p) => (
                    <li key={p} className="nh-punt !text-[1.0625rem]">
                      <X className="nh-kruis" strokeWidth={2.25} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="nh-vak nh-vak--wel">
                <h3 className="nh-h3">{t.voorWie.wel.titel}</h3>
                <ul className="nh-punten mt-6 !gap-4">
                  {t.voorWie.wel.items.map((p) => (
                    <li key={p} className="nh-punt !text-[1.0625rem]">
                      <Check className="nh-vink" strokeWidth={2.5} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="nh-sub mt-12">{t.voorWie.slot}</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 11. Slot en formulier                                      */}
        {/* ---------------------------------------------------------- */}
        <section id="startgesprek" className="nh-sectie nh-donker">
          {/* Oudere pagina's (blog, quiz, het oude menu) linken nog naar /#contact: dat komt hier uit. */}
          <span id="contact" className="block" style={{ scrollMarginTop: 72 }} aria-hidden="true" />
          <div className="nh-wrap nh-rail">
            <div>
              <h2 className="nh-h2">{t.slot.h2}</h2>
              <p className="nh-sub mt-5">{t.slot.sub}</p>
              <p className="nh-h3 mt-10 !text-[var(--nh-stift)]">{t.slot.kort}</p>
              <p className="nh-tekst mt-3">{t.slot.tekst}</p>
              <p className="mt-8">
                <a href={PHONE_LINK} onClick={() => pushEvent("contact_click", { method: "phone", location: "slot" })} className="nh-link inline-flex min-h-[44px] items-center gap-3">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {PHONE_NUMBER}
                </a>
              </p>
            </div>
            <StartFormulier t={t.slot.formulier} taal={taal} />
          </div>
        </section>
      </main>

      <Voet taal={taal} />

      {/* Gsm: het startgesprek blijft onderaan bereikbaar, tot je bij het formulier bent. */}
      <div className="nh-plak" data-toon={plak} aria-hidden={!plak}>
        <a href="#startgesprek" onClick={start("plakbalk")} tabIndex={plak ? 0 : -1} className="nh-knop w-full">{t.plakbalk}</a>
      </div>
    </div>
  );
}
