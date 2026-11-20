"use client";

/**
 * De hub (finitsolutions.be/hub/): de enige link op al onze reels en posts.
 * Sinds 20/11/2026 naar het model van de applypagina van Shadowboys
 * (docs/hub-analyse-shadowboys.md), in onze eigen huisstijl. Eén keuze: de
 * video bekijken en het formulier invullen. Van boven naar onder:
 *
 * 1. een smalle strook naar de gratis resources onderaan;
 * 2. badge (voor wie), kop, subzin, de video, twee pillen, de knop;
 * 3. het formulier, vraag per vraag (vlak onder de video, zoals bij hen);
 * 4. de twijfels uit de video als korte FAQ;
 * 5. de gratis prompts en gidsen, achter een e-mailslot.
 *
 * /hub/resources/ toont dezelfde pagina en springt meteen naar 5.
 *
 * Herkomst: ?bron=tiktok (kanaal) en ?reel=C03 (post) gaan mee naar het
 * formulier ("Pagina" in de mail en op monday), naar Brevo bij het e-mailslot
 * en naar Google Tag Manager als events (hub_view, hub_menu, vsl_*, hub_form_stap,
 * form_submit, hub_toegang, hub_klik).
 *
 * Alle tekst staat in ./copy.ts, de video in ./video.ts.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import lokaleLijst from "@/content/resources.json";
import { Onder } from "@/components/home/ui";
import { pushEvent } from "@/lib/analytics";
import { leesLijst } from "@/lib/resources";
import { HUB } from "./copy";
import { ResourceSectie } from "./resource-sectie";
import { StapFormulier } from "./stap-formulier";
import { VslSpeler } from "./vsl-speler";

const REELS = new Set(leesLijst(lokaleLijst).map((r) => r.reel?.toUpperCase()).filter(Boolean));
const ACCENT = "text-[#2F55C4]";
const KOP = "hp-display text-balance text-center text-[2rem] font-bold leading-[1.08] text-[#1A2D63] sm:text-[2.5rem]";
const INTRO = "mx-auto mt-3 max-w-[36rem] text-balance text-center text-[1.0625rem] leading-[1.6] text-[#3D4766] sm:text-[1.125rem]";

interface Herkomst {
  bron: string;
  reel: string;
  pad: string;
}

/** Alleen kleine letters, cijfers, - en _: zo kan er niets vreemds in een link of mail belanden. */
function schoon(v: string | null, max: number): string {
  return (v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max);
}

export function HubPagina({ start }: { start?: "resources" }) {
  const [herkomst, setHerkomst] = useState<Herkomst>({ bron: "direct", reel: "", pad: "/hub/" });

  // Herkomst uit de URL, één keer bij het openen. Op /hub/resources/ meteen naar de resources.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const h: Herkomst = {
      bron: schoon(p.get("bron"), 40) || "direct",
      reel: schoon(p.get("reel"), 12).toUpperCase(),
      pad: window.location.pathname,
    };
    setHerkomst(h);
    pushEvent("hub_view", { bron: h.bron, ...(h.reel ? { reel: h.reel } : {}) });
    // Oude ankers van vóór 20/11 (#karel, #laten, #keuze) gaan naar het formulier.
    const hash = window.location.hash;
    const doel =
      start === "resources" || hash === "#resources" ? "resources" : ["#gesprek", "#karel", "#laten", "#keuze"].includes(hash) ? "gesprek" : "";
    if (!doel) return;
    // De browser zet de pagina na het laden terug op de oude plek (scroll restoration).
    // Daarom: dat uitzetten, meteen springen (niet zacht) en het een paar keer nakijken.
    try {
      history.scrollRestoration = "manual";
    } catch {
      /* oudere browser */
    }
    const timers: number[] = [];
    const spring = (poging: number) => {
      const el = document.getElementById(doel);
      if (!el) return;
      if (Math.abs(el.getBoundingClientRect().top) > 24) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      if (poging < 5) timers.push(window.setTimeout(() => spring(poging + 1), 150 * poging));
    };
    timers.push(window.setTimeout(() => spring(1), 0));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [start]);

  const meta = useMemo(() => ({ bron: herkomst.bron, ...(herkomst.reel ? { reel: herkomst.reel } : {}) }), [herkomst]);
  const zoek = `?bron=${herkomst.bron}${herkomst.reel ? `&reel=${herkomst.reel}` : ""}`;
  // Komt als "Pagina" in de mail en op monday, zodat we zien waar de lead vandaan komt.
  const formBron = `https://finitsolutions.be${herkomst.pad}${zoek}`;
  const strook = herkomst.reel && REELS.has(herkomst.reel) ? HUB.strookUitPost : HUB.strook;

  const naarResources = useCallback(
    (e: React.MouseEvent) => {
      // Alleen scrollen. De adresbalk aanpassen (history.replaceState) laat Next.js
      // het scrollen onderbreken; /hub/resources/ is er voor links van buitenaf.
      e.preventDefault();
      document.getElementById("resources")?.scrollIntoView({ behavior: "smooth", block: "start" });
      pushEvent("hub_menu", { ...meta, doel: "resources" });
    },
    [meta]
  );

  const naarFormulier = useCallback(
    (via: string) => {
      document.getElementById("gesprek")?.scrollIntoView({ behavior: "smooth", block: "start" });
      pushEvent("hub_menu", { ...meta, doel: "gesprek", via });
    },
    [meta]
  );

  return (
    <main className="min-h-screen bg-white text-[#3D4766]">
      {/* 1. De strook naar de gratis resources */}
      <a
        href="/hub/resources/"
        onClick={naarResources}
        className="group flex items-center justify-center gap-x-1.5 bg-[#1A2D63] px-4 py-2.5 text-center text-[0.875rem] leading-[1.4] text-white/90 sm:text-[0.9375rem]"
      >
        <span>
          {strook.tekst}{" "}
          <span className="whitespace-nowrap font-semibold text-white underline decoration-white/40 underline-offset-4 transition group-hover:decoration-white">
            {strook.link}
            <ArrowDown className="ml-1 inline h-3.5 w-3.5 align-[-0.125em] transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </span>
        </span>
      </a>

      {/* 2. Badge, kop, subzin, video, knop */}
      <section className="bg-[radial-gradient(60%_45%_at_50%_0%,#EEF2FB_0%,#FFFFFF_70%)] pb-10 pt-7 sm:pb-14 sm:pt-10">
        <div className="mx-auto w-full max-w-[80rem] px-4 text-center sm:px-8">
          <a href="/" className="inline-flex" aria-label="Finit Solutions, naar de homepage">
            <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="h-6 w-auto sm:h-7" priority />
          </a>

          <p className="mx-auto mt-6 flex w-fit max-w-full items-center rounded-full border border-[#1A2D63]/15 bg-white px-4 py-1.5 text-[0.8125rem] font-semibold text-[#1A2D63] shadow-[0_6px_18px_-12px_rgba(26,45,99,0.5)] sm:mt-8 sm:px-5 sm:py-2 sm:text-[1rem]">
            {HUB.badge}
          </p>

          <h1 className="hp-display mx-auto mt-4 max-w-[58rem] text-balance text-[2.35rem] font-bold leading-[1.04] text-[#1A2D63] min-[400px]:text-[2.6rem] sm:mt-5 sm:text-[3.4rem] lg:text-[4.3rem]">
            {HUB.kop.voor}{" "}
            <span className={ACCENT}>
              <Onder>{HUB.kop.accent}</Onder>
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-[48rem] text-balance text-[1.0625rem] leading-[1.5] text-[#6C7590] sm:mt-5 sm:text-[1.25rem] lg:text-[1.4375rem]">{HUB.sub}</p>

          <div className="mx-auto mt-7 max-w-[74rem] sm:mt-10">
            <VslSpeler meta={meta} onNaarFormulier={() => naarFormulier("einde_video")} />
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
            {HUB.pillen.map((p) => (
              <li key={p} className="rounded-full border border-[#1A2D63]/20 bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold text-[#1A2D63] sm:px-5 sm:py-2 sm:text-[1rem]">
                {p}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => naarFormulier("knop_onder_video")}
            className="hp-btn hp-btn--primary mt-6 min-h-[3.5rem] w-full px-8 text-[1.0625rem] sm:mt-8 sm:min-h-[4rem] sm:w-auto sm:min-w-[24rem] sm:text-[1.1875rem]"
          >
            {HUB.knop}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="mt-2.5 text-[0.875rem] text-[#6C7590] sm:text-[0.9375rem]">{HUB.knopNoot}</p>
        </div>
      </section>

      {/* 3. Het formulier, meteen onder de video */}
      <section id="gesprek" className="scroll-mt-4 pb-14 sm:pb-20" aria-labelledby="gesprek-titel">
        <div className="mx-auto w-full max-w-[44rem] px-4 sm:px-8">
          <h2 id="gesprek-titel" className="sr-only">
            {HUB.formulier.titel}
          </h2>
          <StapFormulier bron={formBron} meta={meta} />
        </div>
      </section>

      {/* 4. De twijfels uit de video */}
      <section id="twijfels" className="scroll-mt-4 bg-[#F5F7FB] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-[48rem] px-4 sm:px-8">
          <h2 className={KOP}>
            {HUB.twijfels.titel.voor} <Onder>{HUB.twijfels.titel.accent}</Onder>
          </h2>
          <p className={INTRO}>{HUB.twijfels.intro}</p>

          <div className="mt-8 space-y-3 sm:mt-10">
            {HUB.twijfels.lijst.map((t) => (
              <details key={t.vraag} className="hp-details rounded-2xl border border-[#E3E7EF] bg-white px-5 shadow-[0_1px_2px_rgba(26,45,99,0.04)] sm:px-6">
                <summary className="flex items-start justify-between gap-5 py-4 text-[1.0625rem] font-semibold leading-snug text-[#1A2D63] sm:py-5 sm:text-[1.125rem]">
                  <span>{t.vraag}</span>
                  <span className="hp-plus mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6ECF9] text-[#1A2D63]" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="-mt-1 pb-5 text-[1rem] leading-[1.65] text-[#3D4766] sm:pb-6">{t.antwoord}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button type="button" onClick={() => naarFormulier("na_twijfels")} className="hp-btn hp-btn--primary hp-btn--lg w-full sm:w-auto">
              {HUB.knop}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. De gratis resources, achter een e-mailslot */}
      <section id="resources" className="scroll-mt-4 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-[56rem] px-4 sm:px-8">
          <h2 className={KOP}>
            {HUB.resources.titel.voor} <Onder>{HUB.resources.titel.accent}</Onder>
          </h2>
          <p className={INTRO}>{HUB.resources.intro}</p>
          <ResourceSectie reel={herkomst.reel} meta={meta} />
        </div>
      </section>

      <footer className="border-t border-[#E3E7EF] px-4 py-8 text-center text-[0.875rem] text-[#6C7590] sm:px-8">
        Finit Solutions · <a href="/" className="hp-link">finitsolutions.be</a> ·{" "}
        <a href="/privacy/" className="hp-link">{HUB.footer.privacy}</a> ·{" "}
        <a href={`/vacatures/${zoek}&via=hub`} className="hp-link">
          {HUB.footer.vacatures}
        </a>
      </footer>
    </main>
  );
}
