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
 * 5. de veelgestelde vragen (allemaal zichtbaar, in de stijl van de homepage);
 * 6. de gratis prompts en gidsen, achter een e-mailslot.
 *
 * /hub/resources/ toont dezelfde pagina en springt meteen naar 6.
 *
 * Herkomst: ?bron=tiktok (kanaal) en ?reel=C03 (post) gaan mee naar het
 * formulier ("Pagina" in de mail en op monday), naar Brevo bij het e-mailslot
 * en naar Google Tag Manager als events (hub_view, hub_menu, vsl_*, hub_form_stap,
 * form_submit, hub_toegang, hub_klik).
 *
 * Alle tekst staat in ./copy.ts (Engels: ./copy.en.ts), de video in ./video.ts.
 *
 * Taal (Alex 25/11): /hub/ is Nederlands, /hub/en/ dezelfde pagina in het Engels, met
 * Engelse ondertitels die meteen aan staan. Rechtsboven wisselt NL | EN, met ?bron= en
 * ?reel= erbij, zodat de herkomst niet verloren gaat.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Check, X } from "lucide-react";
import lokaleLijst from "@/content/resources.json";
import { Onder } from "@/components/home/ui";
import { TwijfelsLijst } from "./twijfels-lijst";
import { pushEvent } from "@/lib/analytics";
import { leesLijst } from "@/lib/resources";
import { HUB, vast, vetStukken } from "./copy";
import { HUB_EN } from "./copy.en";
import { HubTekstContext } from "./taal";
import { ResourceSectie } from "./resource-sectie";
import { StapFormulier } from "./stap-formulier";
import { VSL, VSL_EN } from "./video";
import { VslSpeler } from "./vsl-speler";

const REELS = new Set(leesLijst(lokaleLijst).map((r) => r.reel?.toUpperCase()).filter(Boolean));
const ACCENT = "text-[#2F55C4]";
const KOP = "hp-display hub-sectietitel text-balance text-center font-bold text-[#1A2D63]";
/** Elke zin op een eigen regel, zonder los woordje op het einde (Alex 25/11). */
function zinnen(tekst: string) {
  return tekst.split(/(?<=[.?!…])\s+/).map((zin, i) => (
    <span key={i} className="block">
      {vast(zin)}
    </span>
  ));
}

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

type Taal = "nl" | "en";
const TALEN: ReadonlyArray<{ code: Taal; pad: string; kort: string }> = [
  { code: "nl", pad: "/hub/", kort: "NL" },
  { code: "en", pad: "/hub/en/", kort: "EN" },
];

/** NL | EN rechtsboven. De link neemt ?bron= en ?reel= mee. */
function TaalKnop({ taal, label, meta }: { taal: Taal; label: string; meta: Record<string, string> }) {
  const [zoek, setZoek] = useState("");
  useEffect(() => setZoek(window.location.search), []);
  return (
    <nav className="hub-taal" aria-label={label}>
      {TALEN.map((t) => (
        <a
          key={t.code}
          href={`${t.pad}${zoek}`}
          hrefLang={t.code}
          lang={t.code}
          aria-current={t.code === taal ? "page" : undefined}
          onClick={() => t.code !== taal && pushEvent("hub_taal", { ...meta, naar: t.code })}
          className="hub-taal-knop"
        >
          {t.kort}
        </a>
      ))}
    </nav>
  );
}

export function HubPagina({ start, taal = "nl" }: { start?: "resources"; taal?: Taal }) {
  const T = taal === "en" ? HUB_EN : HUB;
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

  const meta = useMemo(
    () => ({ bron: herkomst.bron, ...(herkomst.reel ? { reel: herkomst.reel } : {}), ...(taal === "en" ? { taal } : {}) }),
    [herkomst, taal]
  );
  const zoek = `?bron=${herkomst.bron}${herkomst.reel ? `&reel=${herkomst.reel}` : ""}`;
  // Komt als "Pagina" in de mail en op monday, zodat we zien waar de lead vandaan komt.
  const formBron = `https://finitsolutions.be${herkomst.pad}${zoek}`;
  const strook = herkomst.reel && REELS.has(herkomst.reel) ? T.strookUitPost : T.strook;

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
    <HubTekstContext.Provider value={T}>
    <main lang={taal} className="hub-ritme hp-stippen min-h-screen bg-white text-[#3D4766]">
      {/* 1. De strook naar de gratis resources */}
      <a
        href={taal === "en" ? "/hub/en/#resources" : "/hub/resources/"}
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
        <TaalKnop taal={taal} label={T.taal.label} meta={meta} />
        <div className="hub-wrap text-center">
          <a href={T.taal.home} className="hub-logo mx-auto flex w-fit" aria-label={T.taal.logo}>
            <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="h-6 w-auto sm:h-7" priority />
          </a>

          <h1 className="hp-display hub-titel mx-auto text-balance font-bold text-[#1A2D63]">
            {T.kop.voor}{" "}
            <span className={ACCENT}>
              <Onder>{T.kop.accent}</Onder>
            </span>{" "}
            {T.kop.na}
          </h1>

          <p className="hub-haak text-balance">{vast(T.haak)}</p>

          {/* Desktop: één alinea, twee even lange regels. Gsm: elk stuk op een eigen regel. */}
          <p className="hub-lead">
            {T.sub.map((deel, r) => (
              <span key={r} className="hub-lead-deel">
                {vetStukken(vast(deel)).map((s, i) => (s.vet ? <strong key={i} className="font-semibold text-[#1A2D63]">{s.tekst}</strong> : <span key={i}>{s.tekst}</span>))}
                {r < T.sub.length - 1 ? " " : null}
              </span>
            ))}
          </p>

          <p className="hub-naar-video text-balance">{vast(T.naarVideo)}</p>

          <div className="hub-video mx-auto">
            <VslSpeler meta={meta} video={taal === "en" ? VSL_EN : VSL} tekst={T.speler} onNaarFormulier={() => naarFormulier("einde_video")} />
          </div>

          <div className="hub-steun">
            <p className="hub-steun-label">{T.steun.label}</p>
            <ul className="hub-steun-logos">
              {T.steun.logos.map((l) => (
                <li key={l.id}>
                  <Image src={l.src} alt={l.alt} width={l.breed} height={l.hoog} className={`hub-steun-logo hub-steun-logo--${l.id}`} />
                </li>
              ))}
            </ul>
          </div>

          <p className="hub-onder-video">
            {T.onderVideo.map((zin) => (
              <span key={zin} className="block">
                {vast(zin)}
              </span>
            ))}
          </p>

          <button
            type="button"
            onClick={() => naarFormulier("knop_onder_video")}
            className="hp-btn hp-btn--primary hub-knop"
          >
            {T.knop}
            <ArrowRight aria-hidden="true" />
          </button>
          <p className="hub-noot text-[#6C7590]">{vast(T.knopNoot)}</p>
        </div>
      </section>

      {/* 3. Het formulier, meteen onder de video */}
      <section id="gesprek" className="scroll-mt-4 pb-[var(--hub-r5)]" aria-labelledby="gesprek-titel">
        <div className="hub-form-wrap">
          <StapFormulier bron={formBron} meta={meta} kopId="gesprek-titel" />
          <div className="hub-naar-website-wrap text-center">
            <a
              href={T.naarWebsite.href}
              onClick={() => pushEvent("hub_klik", { ...meta, keuze: "website_aanpak" })}
              className="hub-naar-website inline-flex items-center rounded-full border border-[#1A2D63]/20 bg-white font-semibold text-[#1A2D63] transition-colors hover:bg-[#F5F7FB]"
            >
              {/* Op gsm bewust twee regels: de vraag, dan de rest. */}
              <span>
                {T.naarWebsite.vraag} <br className="sm:hidden" />
                {T.naarWebsite.tekst}
              </span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. Voor wie wel en niet (Alex 25/11): twee kaarten naast elkaar, groen en rood. */}
      <section id="voor-wie" className="scroll-mt-4 pb-[var(--hub-r5)]">
        <div className="hub-wrap">
          <h2 className={KOP}>
            {T.voorWie.titel.voor} <Onder>{T.voorWie.titel.accent}</Onder>
          </h2>

          <div className="hub-wie-raster">
            {(["wel", "niet"] as const).map((soort) => {
              const blok = T.voorWie[soort];
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

      {/* 5. Veelgestelde vragen: allemaal zichtbaar, in één kaart zoals op de homepage (Amina 26/11). */}
      <section id="twijfels" className="hp-stippen scroll-mt-4 bg-[#F5F7FB] py-[var(--hub-r5)]">
        <div className="hub-faq-wrap">
          <h2 className={KOP}>
            {T.twijfels.titel.voor} <Onder>{T.twijfels.titel.accent}</Onder>
          </h2>
          <p className={INTRO}>{zinnen(T.twijfels.intro)}</p>

          <TwijfelsLijst lijst={T.twijfels.lijst} kaart />

          <div className="hub-slot-cta text-center">
            <button type="button" onClick={() => naarFormulier("na_twijfels")} className="hp-btn hp-btn--primary hub-knop">
              {T.knop}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. De gratis resources, achter een e-mailslot */}
      <section id="resources" className="scroll-mt-4 py-[var(--hub-r5)]">
        <div className="mx-auto w-full max-w-[56rem] px-4 sm:px-8">
          <h2 className={KOP}>
            {T.resources.titel.voor} <Onder>{T.resources.titel.accent}</Onder>
          </h2>
          <p className={INTRO}>{zinnen(T.resources.intro)}</p>
          <ResourceSectie reel={herkomst.reel} meta={meta} />
        </div>
      </section>

      <footer className="border-t border-[#E3E7EF] px-4 py-[var(--hub-r4)] text-center text-[0.875rem] text-[#6C7590] sm:px-8">
        Finit Solutions · <a href={T.taal.home} className="hp-link">finitsolutions.be</a> ·{" "}
        <a href="/privacy/" className="hp-link">{T.footer.privacy}</a> ·{" "}
        <a href={`/vacatures/${zoek}&via=hub`} className="hp-link">
          {T.footer.vacatures}
        </a>
      </footer>
    </main>
    </HubTekstContext.Provider>
  );
}
