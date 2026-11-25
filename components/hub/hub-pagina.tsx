"use client";

/**
 * De hub (finitsolutions.be/hub/): de enige link op al onze reels en posts.
 * Sinds 20/11/2026 naar het model van de applypagina van Shadowboys
 * (docs/hub-analyse-shadowboys.md), in onze eigen huisstijl. Eén keuze: de
 * video bekijken en het formulier invullen. Van boven naar onder:
 *
 * 1. een smalle strook naar de gratis resources onderaan;
 * 2. kop, haak, lopende tekst, een zin naar de video, de video, één zin onder
 *    de video, de knop;
 * 3. het formulier, vraag per vraag (vlak onder de video, zoals bij hen);
 * 4. voor wie het wel en niet is, twee kaarten naast elkaar;
 * 5. de veelgestelde vragen (eerst vijf, de rest na "Toon nog X vragen");
 * 6. de gratis prompts en gidsen, achter een e-mailslot.
 *
 * /hub/resources/ toont dezelfde pagina en springt meteen naar 6.
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
import { ArrowDown, ArrowRight, Check, X } from "lucide-react";
import lokaleLijst from "@/content/resources.json";
import { Onder } from "@/components/home/ui";
import { TwijfelsLijst } from "./twijfels-lijst";
import { pushEvent } from "@/lib/analytics";
import { leesLijst } from "@/lib/resources";
import { HUB, vetStukken } from "./copy";
import { ResourceSectie } from "./resource-sectie";
import { StapFormulier } from "./stap-formulier";
import { VslSpeler } from "./vsl-speler";

const REELS = new Set(leesLijst(lokaleLijst).map((r) => r.reel?.toUpperCase()).filter(Boolean));
const ACCENT = "text-[#2F55C4]";
const KOP = "hp-display hub-sectietitel text-balance text-center font-bold text-[#1A2D63]";
const INTRO = "hub-intro mx-auto text-balance text-center text-[#3D4766]";

interface Herkomst {
  bron: string;
  reel: string;
  pad: string;
}

// De eerste bron en reel van dit bezoek, zolang het tabblad open is: wie eerst rondklikt
// en dan zonder ?bron= terugkomt, blijft aan het juiste kanaal gekoppeld (o.a. voor Tuesday).
const HERKOMST_OPSLAG = "finit_hub_herkomst";

/** Alleen kleine letters, cijfers, - en _: zo kan er niets vreemds in een link of mail belanden. */
function schoon(v: string | null, max: number): string {
  return (v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max);
}

export function HubPagina({ start }: { start?: "resources" }) {
  const [herkomst, setHerkomst] = useState<Herkomst>({ bron: "direct", reel: "", pad: "/hub/" });

  // Herkomst uit de URL, één keer bij het openen. Op /hub/resources/ meteen naar de resources.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const uitUrl = { bron: schoon(p.get("bron"), 40), reel: schoon(p.get("reel"), 12).toUpperCase() };
    let eerste: { bron: string; reel: string } | null = null;
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
    const h: Herkomst = {
      bron: eerste?.bron || uitUrl.bron || "direct",
      reel: eerste?.reel || uitUrl.reel,
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
      // Het formulier in het midden van het scherm (wens Alex 20/11). Is het hoger dan het
      // scherm (gsm), dan de bovenkant in beeld met wat ruimte erboven.
      const kaart = document.querySelector<HTMLElement>("#gesprek .hp-card") ?? document.getElementById("gesprek");
      if (kaart) {
        const r = kaart.getBoundingClientRect();
        const ruimte = 24;
        const past = r.height + 2 * ruimte <= window.innerHeight;
        const top = window.scrollY + r.top - (past ? (window.innerHeight - r.height) / 2 : ruimte);
        const zacht = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: Math.max(0, top), behavior: zacht ? "smooth" : "auto" });
      }
      pushEvent("hub_menu", { ...meta, doel: "gesprek", via });
    },
    [meta]
  );

  // Stippen over de hele pagina: hetzelfde patroon als in de case-kaarten op de homepage (wens Alex 20/11).
  return (
    <main className="hub-ritme hp-stippen min-h-screen bg-white text-[#3D4766]">
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

      {/* 2. Kop, haak, lopende tekst, zin naar de video, video, knop */}
      <section className="hub-hero hub-hero-vsl">
        <div className="hub-wrap text-center">
          <a href="/" className="hub-logo mx-auto flex w-fit" aria-label="Finit Solutions, naar de homepage">
            <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="h-6 w-auto sm:h-7" priority />
          </a>

          <h1 className="hp-display hub-titel mx-auto text-balance font-bold text-[#1A2D63]">
            {HUB.kop.voor}{" "}
            <span className={ACCENT}>
              <Onder>{HUB.kop.accent}</Onder>
            </span>{" "}
            {HUB.kop.na}
          </h1>

          <p className="hub-haak text-balance">{HUB.haak}</p>

          <p className="hub-lead text-balance">
            {HUB.sub.map((regel, r) => (
              <span key={r} className="block">
                {vetStukken(regel).map((s, i) => (s.vet ? <strong key={i} className="font-semibold text-[#1A2D63]">{s.tekst}</strong> : <span key={i}>{s.tekst}</span>))}
              </span>
            ))}
          </p>

          <p className="hub-naar-video text-balance">{HUB.naarVideo}</p>

          <div className="hub-video mx-auto">
            <VslSpeler meta={meta} onNaarFormulier={() => naarFormulier("einde_video")} />
          </div>

          <div className="hub-steun">
            <p className="hub-steun-label">{HUB.steun.label}</p>
            <ul className="hub-steun-logos">
              {HUB.steun.logos.map((l) => (
                <li key={l.id}>
                  <Image src={l.src} alt={l.alt} width={l.breed} height={l.hoog} className={`hub-steun-logo hub-steun-logo--${l.id}`} />
                </li>
              ))}
            </ul>
          </div>

          <p className="hub-onder-video text-balance">{HUB.onderVideo}</p>

          <button
            type="button"
            onClick={() => naarFormulier("knop_onder_video")}
            className="hp-btn hp-btn--primary hub-knop"
          >
            {HUB.knop}
            <ArrowRight aria-hidden="true" />
          </button>
          <p className="hub-noot text-[#6C7590]">{HUB.knopNoot}</p>
        </div>
      </section>

      {/* 3. Het formulier, meteen onder de video */}
      <section id="gesprek" className="scroll-mt-4 pb-[var(--hub-r6)]" aria-labelledby="gesprek-titel">
        <div className="hub-form-wrap">
          <StapFormulier bron={formBron} meta={meta} kopId="gesprek-titel" />
          <div className="hub-naar-website-wrap text-center">
            <a
              href={HUB.naarWebsite.href}
              onClick={() => pushEvent("hub_klik", { ...meta, keuze: "website_aanpak" })}
              className="hub-naar-website inline-flex items-center rounded-full border border-[#1A2D63]/20 bg-white font-semibold text-[#1A2D63] transition-colors hover:bg-[#F5F7FB]"
            >
              {/* Op gsm bewust twee regels: de vraag, dan de rest. */}
              <span>
                {HUB.naarWebsite.vraag} <br className="sm:hidden" />
                {HUB.naarWebsite.tekst}
              </span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. Voor wie wel en niet (Alex 25/11): twee kaarten naast elkaar, groen en rood. */}
      <section id="voor-wie" className="scroll-mt-4 pb-[var(--hub-r6)]">
        <div className="hub-wrap">
          <h2 className={KOP}>
            {HUB.voorWie.titel.voor} <Onder>{HUB.voorWie.titel.accent}</Onder>
          </h2>

          <div className="hub-wie-raster">
            {(["wel", "niet"] as const).map((soort) => {
              const blok = HUB.voorWie[soort];
              const Icoon = soort === "wel" ? Check : X;
              return (
                <div key={soort} className={`hub-wie-kaart hub-wie-kaart--${soort}`}>
                  <h3 className="hub-wie-titel">
                    <span className="hub-wie-icoon" aria-hidden="true">
                      <Icoon strokeWidth={3} />
                    </span>
                    {blok.titel}
                  </h3>
                  <ul className="hub-wie-lijst">
                    {blok.items.map((item) => (
                      <li key={item}>
                        <span className="hub-wie-icoon hub-wie-icoon--klein" aria-hidden="true">
                          <Icoon strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Veelgestelde vragen: eerst vijf, de rest na "Toon nog X vragen". */}
      <section id="twijfels" className="hp-stippen scroll-mt-4 bg-[#F5F7FB] py-[var(--hub-r6)]">
        <div className="hub-faq-wrap">
          <h2 className={KOP}>
            {HUB.twijfels.titel.voor} <Onder>{HUB.twijfels.titel.accent}</Onder>
          </h2>
          <p className={INTRO}>{HUB.twijfels.intro}</p>

          <TwijfelsLijst lijst={HUB.twijfels.lijst} zichtbaar={HUB.twijfels.zichtbaar} meer={HUB.twijfels.meer} />

          <div className="hub-slot-cta text-center">
            <button type="button" onClick={() => naarFormulier("na_twijfels")} className="hp-btn hp-btn--primary hub-knop">
              {HUB.knop}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. De gratis resources, achter een e-mailslot */}
      <section id="resources" className="scroll-mt-4 py-[var(--hub-r6)]">
        <div className="mx-auto w-full max-w-[56rem] px-4 sm:px-8">
          <h2 className={KOP}>
            {HUB.resources.titel.voor} <Onder>{HUB.resources.titel.accent}</Onder>
          </h2>
          <p className={INTRO}>{HUB.resources.intro}</p>
          <ResourceSectie reel={herkomst.reel} meta={meta} />
        </div>
      </section>

      <footer className="border-t border-[#E3E7EF] px-4 py-[var(--hub-r4)] text-center text-[0.875rem] text-[#6C7590] sm:px-8">
        Finit Solutions · <a href="/" className="hp-link">finitsolutions.be</a> ·{" "}
        <a href="/privacy/" className="hp-link">{HUB.footer.privacy}</a> ·{" "}
        <a href={`/vacatures/${zoek}&via=hub`} className="hp-link">
          {HUB.footer.vacatures}
        </a>
      </footer>
    </main>
  );
}
