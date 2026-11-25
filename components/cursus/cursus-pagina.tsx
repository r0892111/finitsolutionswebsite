"use client";

/**
 * De landingspagina van de cursus (finitsolutions.be/cursus/): de pagina achter
 * de advertenties voor de cursus op Skool. Zelfde opbouw, stijl en werking als
 * de hub (components/hub/hub-pagina.tsx), maar puur over de cursus:
 *
 * 1. een smalle strook naar "Wat je krijgt";
 * 2. badge, kop, subzin, de VSL van de cursus, twee pillen, de knop;
 * 3. het formulier voor een gesprek van 30 minuten met Luka;
 * 4. wat je krijgt (de lessen, plus de promptbibliotheek en de supportcall);
 * 5. de twijfels als korte FAQ.
 *
 * Herkomst: ?bron= en ?reel= zoals op de hub, of anders utm_source en
 * utm_content van de advertentie. Gaat mee naar Tuesday, de kijkmeting en
 * Google Tag Manager (cursus_view, vsl_*, cursus_form_stap, form_submit).
 *
 * Alle tekst staat in ./copy.ts, de video in ./video.ts.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Onder } from "@/components/home/ui";
import { TwijfelsLijst } from "@/components/hub/twijfels-lijst";
import { VslSpeler } from "@/components/hub/vsl-speler";
import { pushEvent } from "@/lib/analytics";
import { CURSUS } from "./copy";
import { CursusFormulier } from "./cursus-formulier";
import { CURSUS_VSL } from "./video";

const ACCENT = "text-[#2F55C4]";
const KOP = "hp-display hub-sectietitel text-balance text-center font-bold text-[#1A2D63]";
const INTRO = "hub-intro mx-auto text-balance text-center text-[#3D4766]";
const HERKOMST_OPSLAG = "finit_cursus_herkomst";

interface Herkomst {
  bron: string;
  reel: string;
}

/** Alleen kleine letters, cijfers, - en _: zo kan er niets vreemds in een link of mail belanden. */
function schoon(v: string | null, max: number): string {
  return (v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max);
}

export function CursusPagina() {
  const [herkomst, setHerkomst] = useState<Herkomst>({ bron: "direct", reel: "" });

  // Herkomst uit de link, één keer bij het openen. De eerste van dit bezoek blijft gelden.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const uitUrl = {
      bron: schoon(p.get("bron") ?? p.get("utm_source"), 40),
      reel: schoon(p.get("reel") ?? p.get("utm_content"), 12).toUpperCase(),
    };
    let eerste: Herkomst | null = null;
    try {
      const bewaard = JSON.parse(sessionStorage.getItem(HERKOMST_OPSLAG) ?? "null") as { bron?: unknown; reel?: unknown } | null;
      if (bewaard) eerste = { bron: schoon(String(bewaard.bron ?? ""), 40), reel: schoon(String(bewaard.reel ?? ""), 12).toUpperCase() };
      if (!eerste && (uitUrl.bron || uitUrl.reel)) {
        eerste = uitUrl;
        sessionStorage.setItem(HERKOMST_OPSLAG, JSON.stringify(uitUrl));
      }
    } catch {
      /* geen opslag: dan geldt gewoon de link */
    }
    const h = { bron: eerste?.bron || uitUrl.bron || "direct", reel: eerste?.reel || uitUrl.reel };
    setHerkomst(h);
    pushEvent("cursus_view", { bron: h.bron, ...(h.reel ? { reel: h.reel } : {}) });
  }, []);

  const meta = useMemo(() => ({ bron: herkomst.bron, ...(herkomst.reel ? { reel: herkomst.reel } : {}) }), [herkomst]);

  const naarInhoud = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      document.getElementById("inhoud")?.scrollIntoView({ behavior: "smooth", block: "start" });
      pushEvent("cursus_menu", { ...meta, doel: "inhoud" });
    },
    [meta]
  );

  const naarFormulier = useCallback(
    (via: string) => {
      // Het formulier in het midden van het scherm; is het hoger dan het scherm (gsm), de bovenkant in beeld.
      const kaart = document.querySelector<HTMLElement>("#gesprek .hp-card") ?? document.getElementById("gesprek");
      if (kaart) {
        const r = kaart.getBoundingClientRect();
        const ruimte = 24;
        const past = r.height + 2 * ruimte <= window.innerHeight;
        const top = window.scrollY + r.top - (past ? (window.innerHeight - r.height) / 2 : ruimte);
        const zacht = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: Math.max(0, top), behavior: zacht ? "smooth" : "auto" });
      }
      pushEvent("cursus_menu", { ...meta, doel: "gesprek", via });
    },
    [meta]
  );

  const knop = (via: string) => (
    <button type="button" onClick={() => naarFormulier(via)} className="hp-btn hp-btn--primary hub-knop">
      {CURSUS.knop}
      <ArrowRight aria-hidden="true" />
    </button>
  );

  return (
    <main className="hub-ritme hp-stippen min-h-screen bg-white text-[#3D4766]">
      {/* 1. De strook naar "Wat je krijgt" */}
      <a
        href="#inhoud"
        onClick={naarInhoud}
        className="group flex items-center justify-center gap-x-1.5 bg-[#1A2D63] px-4 py-2.5 text-center text-[0.875rem] leading-[1.4] text-white/90 sm:text-[0.9375rem]"
      >
        <span>
          {CURSUS.strook.tekst}{" "}
          <span className="whitespace-nowrap font-semibold text-white underline decoration-white/40 underline-offset-4 transition group-hover:decoration-white">
            {CURSUS.strook.link}
            <ArrowDown className="ml-1 inline h-3.5 w-3.5 align-[-0.125em] transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </span>
        </span>
      </a>

      {/* 2. Badge, kop, subzin, video, knop */}
      <section className="hub-hero bg-[radial-gradient(60%_45%_at_50%_0%,#EEF2FB_0%,rgba(238,242,251,0)_70%)]">
        <div className="hub-wrap text-center">
          <a href="/" className="hub-logo mx-auto flex w-fit" aria-label="Finit Solutions, naar de homepage">
            <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="h-6 w-auto sm:h-7" priority />
          </a>

          <p className="hub-badge mx-auto flex w-fit max-w-full items-center rounded-full border border-[#1A2D63]/15 bg-white font-semibold text-[#1A2D63] shadow-[0_6px_18px_-12px_rgba(26,45,99,0.5)]">
            {CURSUS.badge}
          </p>

          <h1 className="hp-display hub-titel mx-auto text-balance font-bold text-[#1A2D63]">
            {CURSUS.kop.voor} <br className="hidden sm:inline" />
            <span className={ACCENT}>
              <Onder>{CURSUS.kop.accent}</Onder>
            </span>
          </h1>

          <p className="hub-sub text-balance text-[#6C7590]">{CURSUS.sub}</p>

          <div className="hub-video mx-auto">
            <VslSpeler meta={meta} video={CURSUS_VSL} tekst={CURSUS.speler} onNaarFormulier={() => naarFormulier("einde_video")} />
          </div>

          <ul className="hub-pillen flex flex-wrap justify-center">
            {CURSUS.pillen.map((p) => (
              <li key={p} className="hub-pil inline-flex items-center rounded-full border border-[#1A2D63]/20 bg-white font-semibold text-[#1A2D63]">
                {p}
              </li>
            ))}
          </ul>

          {knop("knop_onder_video")}
          <p className="hub-noot text-[#6C7590]">{CURSUS.knopNoot}</p>
        </div>
      </section>

      {/* 3. Het formulier, meteen onder de video */}
      <section id="gesprek" className="scroll-mt-4 pb-[var(--hub-r6)]" aria-labelledby="gesprek-titel">
        <div className="hub-form-wrap">
          <CursusFormulier meta={meta} kopId="gesprek-titel" />
        </div>
      </section>

      {/* 4. Wat je krijgt */}
      <section id="inhoud" className="scroll-mt-4 bg-[#F5F7FB] py-[var(--hub-r6)]">
        <div className="hub-faq-wrap">
          <h2 className={KOP}>
            {CURSUS.inhoud.titel.voor} <Onder>{CURSUS.inhoud.titel.accent}</Onder>
          </h2>
          <p className={INTRO}>{CURSUS.inhoud.intro}</p>

          <ul className="mt-[var(--hub-r4)] grid gap-[var(--hub-r3)] sm:grid-cols-2">
            {CURSUS.inhoud.lijst.map((d) => (
              <li key={d.titel} className="rounded-[27px] border border-[#E3E7EF] bg-white p-6 shadow-[0_1px_2px_rgba(26,45,99,0.04)] sm:p-8">
                <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.375rem] font-semibold leading-[1.2] text-[#1A2D63] sm:text-[1.75rem]">
                  {d.titel}
                  {d.nieuw && (
                    <span className="rounded-full bg-[#E6ECF9] px-2.5 py-0.5 text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#2F55C4] sm:text-[0.875rem]">
                      {CURSUS.inhoud.nieuw}
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-[1.0625rem] leading-[1.5] text-[#3D4766] sm:mt-3 sm:text-[1.3125rem]">{d.tekst}</p>
              </li>
            ))}
          </ul>

          <div className="mt-[var(--hub-r3)] rounded-[27px] bg-[#1A2D63] p-6 text-white sm:p-8">
            <h3 className="text-[1.375rem] font-semibold leading-[1.2] sm:text-[1.75rem]">{CURSUS.inhoud.eindeTitel}</h3>
            <ol className="mt-3 grid gap-3 sm:mt-4 sm:gap-4">
              {CURSUS.inhoud.einde.map((t, i) => (
                <li key={t} className="flex gap-3 text-[1.0625rem] leading-[1.5] text-white/90 sm:text-[1.3125rem]">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/15 text-[0.9375rem] font-semibold text-white sm:mt-0.5 sm:h-8 sm:w-8">
                    {i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="hub-slot-cta text-center">
            {knop("na_inhoud")}
          </div>
        </div>
      </section>

      {/* 5. De twijfels */}
      <section id="twijfels" className="scroll-mt-4 py-[var(--hub-r6)]">
        <div className="hub-faq-wrap">
          <h2 className={KOP}>
            {CURSUS.twijfels.titel.voor} <Onder>{CURSUS.twijfels.titel.accent}</Onder>
          </h2>
          <p className={INTRO}>{CURSUS.twijfels.intro}</p>

          <TwijfelsLijst lijst={CURSUS.twijfels.lijst} />

          <div className="hub-slot-cta text-center">
            {knop("na_twijfels")}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E3E7EF] px-4 py-[var(--hub-r4)] text-center text-[0.875rem] text-[#6C7590] sm:px-8">
        Finit Solutions · <a href="/" className="hp-link">finitsolutions.be</a> ·{" "}
        <a href="/privacy/" className="hp-link">{CURSUS.footer.privacy}</a>
      </footer>
    </main>
  );
}
