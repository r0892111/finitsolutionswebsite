"use client";

/**
 * De homepage (finitsolutions.be/ en /en/), branch homepage-amina, 25/11/2026.
 *
 * Alleen de copy van Amina (tab "Hub copy", 24/11), in haar volgorde: hero →
 * herkenbaar? → wat is een company brain → hoe we werken → waarom Finit → wat
 * we bouwen → wie zit er achter Finit → bewijs → FAQ → voor wie → slot met het
 * formulier. Alle tekst staat in ./copy.nl.ts en ./copy.en.ts; deze pagina
 * bevat geen tekst. Opmaak: ./homepage.css, regels: ./DESIGN.md.
 *
 * Knoppen: één gevulde knop, "Boek een conversatie", op de plaatsen
 * waar Amina ze zette (hero, na de vijf stappen, na de FAQ, in het formulier; ook
 * bij het bewijs zodra daar getuigenissen staan) en in het menu. Ze springt altijd naar het formulier. Haar
 * twee andere knoppen ("Toon me wat er ontbreekt", "Toon me hoe het werkt")
 * zijn links met een pijl naar de volgende sectie, zodat er per scherm maar
 * één gevulde knop staat.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, Check, Phone, Plus, X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { PHONE_LINK, PHONE_NUMBER } from "@/lib/finit-links";
import type { Taal } from "./copy";
import { COPY, HOME, Kop, Steun, TeamBlok, Voet, WaaromBlok, useSecties } from "./kader";
import { StartFormulier } from "./start-formulier";

/** De echte logo's van de tools uit Amina's lijst, in hun eigen kleur. Stripe is een woordmerk. */
const TOOL_LOGO: Record<string, string> = {
  Teamleader: "/Teamleader_Icon.svg",
  Odoo: "/tool-odoo.svg",
  Outlook: "/Microsoft_Office_Outlook_(2018–2024).svg",
  Gmail: "/Gmail_icon_(2020).png",
  Excel: "/Microsoft_Office_Excel_(2019–2025).svg",
  Teams: "/Microsoft_Office_Teams_(2019–2025).svg",
  WhatsApp: "/tool-whatsapp.svg",
  "Google Calendar": "/tool-googlecalendar.svg",
  "Google Drive": "/tool-googledrive.svg",
  HubSpot: "/tool-hubspot.svg",
  Pipedrive: "/Pipedrive_id-7ejZnwv_0.svg",
  Shopify: "/shopify_icon.png",
  WooCommerce: "/tool-woocommerce.svg",
  Notion: "/tool-notion.svg",
};

export function HomePagina({ taal }: { taal: Taal }) {
  const t = COPY[taal];
  const [plak, setPlak] = useState(false);
  const { klik } = useSecties(taal, true);
  const start = (location: string) => klik("startgesprek", location);

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
        {/* 1. Hero: alleen letters, alleen op het eerste scherm       */}
        {/* ---------------------------------------------------------- */}
        <header className="nh-hero">
          <div className="nh-wrap nh-hero-lijf">
            <p className="nh-voorwie nh-kom">{t.hero.voorWie}</p>
            <h1 className="nh-h1 nh-kom mt-4" style={{ "--d": 1 } as React.CSSProperties}>{t.hero.h1}</h1>

            <div className="nh-hero-rij nh-kom" style={{ "--d": 2 } as React.CSSProperties}>
              <div>
                <p className="nh-vervolg">{t.hero.h1Vervolg}</p>
                <div className="nh-acties mt-8">
                  <a id="hero-knop" href="#startgesprek" onClick={start("hero")} className="nh-knop nh-knop--breed">{t.hero.knop}</a>
                  <a href="#werkwijze" onClick={klik("werkwijze", "hero")} className="nh-link nh-link-neer justify-center sm:justify-start">
                    {t.hero.tweedeLink}
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div>
                <p>{t.hero.sub}</p>
                <ul className="nh-punten mt-6">
                  {t.hero.punten.map((p) => (
                    <li key={p} className="nh-punt">
                      <Check className="nh-vink" strokeWidth={2.25} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="nh-wrap">
            <div className="nh-strook">
              <Steun label={t.hero.ondersteund} />
              <p className="nh-feit">{t.hero.gesproken}</p>
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------- */}
        {/* 2. Herkenbaar?                                             */}
        {/* ---------------------------------------------------------- */}
        <section id="herkenbaar" className="nh-sectie nh-donker">
          <div className="nh-wrap">
            <p className="nh-h3">{t.herken.kicker}</p>
            <h2 className="nh-h2 mt-4 max-w-[22em]">{t.herken.h2}</h2>
            <p className="nh-groot mt-6 !text-[var(--nh-op-inkt)]">{t.herken.vraag}</p>

            <ul className="nh-pijnen mt-12 lg:mt-16">
              {t.herken.punten.map((p) => (
                <li key={p.titel} className="nh-pijn">
                  <h3 className="nh-h3">{p.titel}</h3>
                  <p className="mt-3 max-w-[32em]">{p.tekst}</p>
                </li>
              ))}
            </ul>

            <p className="nh-groot mt-12 lg:mt-16">{t.herken.slot}</p>
            <div className="nh-acties mt-6">
              <a href="#brein" onClick={klik("brein", "herken")} className="nh-link nh-link-neer text-[1.1875rem]">
                {t.herken.knop}
                <ArrowDown className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="#startgesprek" onClick={start("herken")} className="inline-flex min-h-[44px] items-center text-[1rem] text-[var(--nh-op-inkt)] underline decoration-white/40 underline-offset-4 hover:text-white hover:decoration-white">
                {t.herken.kleineLink}
              </a>
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

            {/* Links de uitleg, rechts (blijft staan) de twee dingen die veranderen. Op gsm staan ze eronder, zoals in de copy. */}
            <div className="nh-rail nh-rail--lees mt-12 lg:mt-16">
              <div className="nh-tekst space-y-5">
                {t.brein.alineas.map((a) => (
                  <p key={a.slice(0, 24)}>{a}</p>
                ))}
              </div>
              <div className="nh-paneel nh-rail-vast">
                <h3 className="nh-h3">{t.brein.veranderTitel}</h3>
                <ul className="mt-6">
                  {t.brein.verander.map((v) => (
                    <li key={v.titel}>
                      <p className="font-semibold text-[var(--nh-inkt)]">{v.titel}</p>
                      <p className="mt-1">{v.tekst}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="nh-groot mt-12 lg:mt-16">{t.brein.slot}</p>
            <div className="nh-acties mt-6">
              <a href="#werkwijze" onClick={klik("werkwijze", "brein")} className="nh-link nh-link-neer text-[1.1875rem]">
                {t.brein.knop}
                <ArrowDown className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 4. Hoe we werken                                           */}
        {/* ---------------------------------------------------------- */}
        <section id="werkwijze" className="nh-sectie">
          <div className="nh-wrap nh-rail">
            <div className="nh-rail-vast">
              <h2 className="nh-h2">{t.werkwijze.h2}</h2>
              <p className="nh-sub mt-5">{t.werkwijze.sub}</p>
              <p className="nh-tekst mt-5">{t.werkwijze.intro}</p>
            </div>
            <div>
              <ol className="nh-stappen">
                {t.werkwijze.stappen.map((s, i) => (
                  <li key={s.titel} className="nh-stap">
                    <span className="nh-stap-nr" aria-hidden="true">{i + 1}</span>
                    <div className="nh-stap-lijf">
                      <h3 className="nh-h3">{s.titel}</h3>
                      <p className="mt-2 max-w-[34em]">{s.tekst}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {/* De knop staat na de vijf stappen, zoals in de copy, en lijnt uit met de tekst van de stappen. */}
              <div className="mt-10 sm:pl-[68px] md:pl-[80px]">
                <a href="#startgesprek" onClick={start("werkwijze")} className="nh-knop nh-knop--breed">{t.werkwijze.knop}</a>
              </div>
            </div>
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
        <section id="bouwen" className="nh-sectie">
          <div className="nh-wrap">
            <h2 className="nh-h2 max-w-[20em]">{t.bouwen.h2}</h2>
            <p className="nh-sub mt-5">{t.bouwen.sub}</p>

            {/* Amina's alinea, zin per zin: elke zin bouwt verder op de vorige, vandaar de trap. */}
            <p className="nh-tekst mt-12">{t.bouwen.intro}</p>
            <ol className="nh-trap mt-6">
              {t.bouwen.niveaus.map((zin, i) => (
                <li key={zin} className="nh-trede" style={{ "--t": i } as React.CSSProperties}>{zin}</li>
              ))}
            </ol>

            <p className="nh-groot mt-16 lg:mt-24">{t.bouwen.praktijk}</p>
            <ul className="nh-blad mt-8">
              {t.bouwen.cases.map((c) => (
                <li key={c.sector} className="nh-dossier-rij">
                  <h3 className="nh-dossier-sector">{c.sector}</h3>
                  <p className="nh-dossier-tekst">{c.tekst}</p>
                </li>
              ))}
            </ul>

            <p className="mt-12 font-semibold text-[var(--nh-inkt)]">{t.bouwen.toolsTitel}</p>
            <ul className="nh-tools mt-4">
              {t.bouwen.tools.map((naam) => (
                <li key={naam} className="nh-tool" translate="no">
                  {naam === "Stripe" ? (
                    <Image src="/Stripe_Logo,_revised_2016.svg.webp" alt="Stripe" width={86} height={36} className="!h-[20px] !w-auto" />
                  ) : (
                    <>
                      {TOOL_LOGO[naam] && <Image src={TOOL_LOGO[naam]} alt="" width={44} height={44} />}
                      {naam}
                    </>
                  )}
                </li>
              ))}
              <li className="nh-tool !whitespace-normal">{t.bouwen.toolsRest}</li>
            </ul>
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
        {/* De hele sectie verschijnt pas als er echte getuigenissen in de copy staan (bewijs.getuigenissen).
            Zonder getuigenissen zou de kop een vraag stellen waar niets op volgt. */}
        {t.bewijs.getuigenissen.length > 0 && (
          <section id="bewijs" className="nh-sectie">
            <div className="nh-wrap">
              <h2 className="nh-h2 max-w-[18em]">{t.bewijs.h2}</h2>
              <p className="nh-sub mt-5">{t.bewijs.sub}</p>

              <p className="nh-h3 mt-12">{t.bewijs.getuigenissenTitel}</p>
              <ul className="mt-6 grid gap-6 md:grid-cols-2">
                {t.bewijs.getuigenissen.map((g) => (
                  <li key={g.naam} className="nh-getuige">
                    <blockquote className="nh-quote">&ldquo;{g.quote}&rdquo;</blockquote>
                    <p className="nh-klein">
                      {g.naam}, {g.bedrijf}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <Steun label={t.bewijs.ondersteund} />
                <a href="#startgesprek" onClick={start("bewijs")} className="nh-knop nh-knop--breed">{t.bewijs.knop}</a>
              </div>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------- */}
        {/* 9. FAQ                                                     */}
        {/* ---------------------------------------------------------- */}
        <section id="vragen" className="nh-sectie">
          <div className="nh-wrap nh-rail">
            <div className="nh-rail-vast">
              <h2 className="nh-h2">{t.faq.h2}</h2>
              <p className="nh-sub mt-5">{t.faq.sub}</p>
            </div>
            <div>
              {t.faq.items.map((item) => (
                <details key={item.q} className="nh-vraag" onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && pushEvent("faq_open", { vraag: item.q.slice(0, 60), taal })}>
                  <summary>
                    <span>{item.q}</span>
                    <Plus className="nh-plus" strokeWidth={2} aria-hidden="true" />
                  </summary>
                  <p className="nh-antwoord">{item.a}</p>
                </details>
              ))}
              {/* De knop staat na de vragen, zoals in de copy. */}
              <div className="mt-10">
                <a href="#startgesprek" onClick={start("faq")} className="nh-knop nh-knop--breed">{t.faq.knop}</a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 10. Voor wie                                               */}
        {/* ---------------------------------------------------------- */}
        <section id="voor-wie" className="nh-sectie">
          <div className="nh-wrap">
            <h2 className="nh-h2 max-w-[18em]">{t.voorWie.h2}</h2>
            <div className="nh-twee mt-12">
              <div className="nh-kolom nh-kolom--niet">
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
              <div className="nh-kolom">
                <h3 className="nh-h3">{t.voorWie.wel.titel}</h3>
                <ul className="nh-punten mt-6 !gap-4">
                  {t.voorWie.wel.items.map((p) => (
                    <li key={p} className="nh-punt !text-[1.0625rem]">
                      <Check className="nh-vink" strokeWidth={2.25} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="nh-groot mt-12 lg:mt-16">{t.voorWie.slot}</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 11. Slot en formulier: de tweede marineblauwe band         */}
        {/* ---------------------------------------------------------- */}
        <section id="startgesprek" className="nh-sectie nh-band">
          {/* Oudere pagina's (blog, quiz, het oude menu) linken nog naar /#contact: dat komt hier uit. */}
          <span id="contact" className="block" style={{ scrollMarginTop: 72 }} aria-hidden="true" />
          <div className="nh-wrap nh-rail">
            <div>
              <h2 className="nh-h2">{t.slot.h2}</h2>
              <p className="nh-sub mt-5">{t.slot.sub}</p>
              <p className="nh-h3 mt-10">{t.slot.kort}</p>
              <p className="nh-tekst mt-3">{t.slot.tekst}</p>
              <p className="mt-8">
                <a href={PHONE_LINK} onClick={() => pushEvent("contact_click", { method: "phone", location: "slot" })} className="nh-link inline-flex min-h-[44px] items-center gap-3">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span translate="no">{PHONE_NUMBER}</span>
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
