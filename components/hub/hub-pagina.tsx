"use client";

/**
 * De resource hub: de enige link op alle socials (beslissing Alex, 28/10/2026).
 * Van boven naar onder: de vraag "Waar ben je naar op zoek?" met drie knoppen
 * die naar de juiste plek springen, de video, de twee keuzes (zelf bouwen =
 * lesreeks op Skool, laten doen = formulier voor een call met Karel) en de
 * gratis resources met een filter per soort.
 *
 * Herkomst: ?bron=tiktok (kanaal) en ?reel=R031 (video) gaan mee naar Skool
 * als utm-parameters, naar het formulier als "Pagina" in de mail en op monday,
 * en naar Google Tag Manager als events (hub_view, hub_menu, hub_klik,
 * hub_vsl_play).
 *
 * Ankers voor links van buitenaf: #zelf, #laten, #karel (opent meteen het
 * formulier) en #resources. #keuze blijft werken voor de twee keuzes samen.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, FileText, PhoneCall, Wrench, X } from "lucide-react";
import lokaleLijst from "@/content/resources.json";
import { Onder, Vinkje } from "@/components/home/ui";
import { VraagFormulier } from "@/components/home/vraag-formulier";
import { pushEvent } from "@/lib/analytics";
import { SKOOL_URL } from "@/lib/finit-links";
import {
  haalExterneLijst,
  leesLijst,
  RESOURCES_URL,
  soortLabel,
  soortMeervoud,
  voegSamen,
  type Resource,
} from "@/lib/resources";
import { HUB } from "./copy";
import { Vsl } from "./vsl";

const LOKAAL = leesLijst(lokaleLijst);
const SKOOL_ABOUT = `${SKOOL_URL}/about`;

const BREED = "mx-auto w-full max-w-[56rem] px-4 sm:px-8";
const KOP = "hp-display text-balance text-center text-[2rem] font-bold leading-[1.08] text-[#1A2D63] sm:text-[2.5rem]";
const INTRO = "mx-auto mt-3 max-w-[36rem] text-center text-[1.0625rem] leading-[1.65] text-[#3D4766]";

const MENU_ICOON = { resources: FileText, zelf: Wrench, laten: PhoneCall } as const;
const MENU_KLEUR = {
  resources: "bg-[#FBE286] text-[#1A2D63]",
  zelf: "bg-[#E6ECF9] text-[#1A2D63]",
  laten: "bg-[#1A2D63] text-white",
} as const;

// Elke soort zijn eigen kleur, zodat je gidsen en prompts in één oogopslag uit elkaar houdt.
const SOORT_KLEUR: Record<string, string> = {
  gids: "bg-[#E6ECF9] text-[#1A2D63]",
  prompt: "bg-[#FBE286] text-[#1A2D63]",
  pakket: "bg-[#E4F3EA] text-[#12784A]",
};

const FILTER_VOLGORDE = ["gids", "prompt", "pakket", "template", "video"];

interface Herkomst {
  bron: string;
  reel: string;
  pad: string;
}

/** Alleen kleine letters, cijfers, - en _: zo kan er niets vreemds in een link of mail belanden. */
function schoon(v: string | null, max: number): string {
  return (v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max);
}

function metHerkomst(h: Herkomst, extra: Record<string, string> = {}): Record<string, string> {
  return { bron: h.bron, ...(h.reel ? { reel: h.reel } : {}), ...extra };
}

/** Zacht naar een anker scrollen, en het anker in de adresbalk zetten. */
function springNaar(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${id}`);
}

export function HubPagina() {
  const [herkomst, setHerkomst] = useState<Herkomst>({ bron: "direct", reel: "", pad: "/" });
  const [resources, setResources] = useState<Resource[]>(() => voegSamen(LOKAAL));
  const [filter, setFilter] = useState<string>("");
  const [formOpen, setFormOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Herkomst uit de URL, één keer bij het openen.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const h: Herkomst = {
      bron: schoon(p.get("bron"), 40) || "direct",
      reel: schoon(p.get("reel"), 12).toUpperCase(),
      pad: window.location.pathname,
    };
    setHerkomst(h);
    pushEvent("hub_view", metHerkomst(h));
    if (window.location.hash === "#karel") setFormOpen(true);
  }, []);

  // De externe lijst (later uit de reel-pipeline), als die ingesteld is.
  useEffect(() => {
    if (!RESOURCES_URL) return;
    let actief = true;
    haalExterneLijst(RESOURCES_URL).then((extern) => {
      if (actief && extern.length > 0) setResources(voegSamen(LOKAAL, extern));
    });
    return () => {
      actief = false;
    };
  }, []);

  useEffect(() => {
    if (formOpen) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [formOpen]);

  const skoolHref = useMemo(() => {
    const u = new URL(SKOOL_ABOUT);
    u.searchParams.set("utm_source", herkomst.bron);
    u.searchParams.set("utm_medium", "hub");
    if (herkomst.reel) u.searchParams.set("utm_content", herkomst.reel);
    return u.toString();
  }, [herkomst]);

  // Komt als "Pagina" in de mail en op monday, zodat Karel ziet waar de lead vandaan komt.
  const formBron = `https://finitsolutions.be${herkomst.pad}?bron=${herkomst.bron}${herkomst.reel ? `&reel=${herkomst.reel}` : ""}`;

  // Vaste volgorde voor de filter: gidsen en prompts eerst, onbekende soorten achteraan.
  const soorten = useMemo(() => {
    const plek = (s: string) => {
      const i = FILTER_VOLGORDE.indexOf(s);
      return i === -1 ? FILTER_VOLGORDE.length : i;
    };
    return Array.from(new Set(resources.map((r) => r.soort))).sort((a, b) => plek(a) - plek(b));
  }, [resources]);
  const zichtbaar = filter ? resources.filter((r) => r.soort === filter) : resources;

  return (
    <main className="min-h-screen bg-white text-[#3D4766]">
      {/* 1. De vraag, met drie knoppen die naar de juiste plek springen */}
      <header className="bg-[#1A2D63] pb-12 pt-6 text-white sm:pb-16 sm:pt-8">
        <div className={BREED}>
          <a href="/" className="inline-flex" aria-label="Finit Solutions, naar de homepage">
            <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="h-7 w-auto brightness-0 invert" priority />
          </a>
          <h1 className="hp-display mt-10 text-balance text-[2.4rem] font-bold leading-[1.04] sm:mt-14 sm:text-center sm:text-[3.4rem]">
            {HUB.titel[0]} <Onder wit>{HUB.titel[1]}</Onder>
          </h1>
          <p className="mt-3 text-[1.125rem] text-white/90 sm:text-center">{HUB.intro}</p>

          <nav aria-label="Kies wat je zoekt" className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {HUB.menu.map((m) => {
              const Icoon = MENU_ICOON[m.doel as keyof typeof MENU_ICOON];
              return (
                <a
                  key={m.doel}
                  href={`#${m.doel}`}
                  onClick={(e) => {
                    e.preventDefault();
                    springNaar(m.doel);
                    pushEvent("hub_menu", metHerkomst(herkomst, { doel: m.doel }));
                  }}
                  className="group flex items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-col sm:items-start sm:p-5"
                >
                  <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-full ${MENU_KLEUR[m.doel as keyof typeof MENU_KLEUR]}`}>
                    <Icoon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="hp-display hp-display-sm block text-[1.1875rem] font-semibold leading-[1.2] text-[#1A2D63]">{m.titel}</span>
                    <span className="mt-1 block text-[0.9375rem] text-[#3D4766]">{m.tekst}</span>
                  </span>
                  <ArrowDown className="h-5 w-5 flex-none text-[#1A2D63] transition-transform group-hover:translate-y-0.5 sm:hidden" aria-hidden="true" />
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 2. De video */}
      <section id="video" className="scroll-mt-4 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[48rem] px-4 sm:px-8">
          <h2 className={KOP}>
            {HUB.videoTitel[0]} <Onder>{HUB.videoTitel[1]}</Onder>
          </h2>
          <p className={INTRO}>{HUB.videoIntro}</p>
          <div className="mt-8">
            <Vsl onPlay={() => pushEvent("hub_vsl_play", metHerkomst(herkomst))} />
          </div>
        </div>
      </section>

      {/* 3. Zelf doen of laten doen */}
      <section id="keuze" className="scroll-mt-4 bg-[#F5F7FB] py-14 sm:py-16">
        <div className={BREED}>
          <h2 className={KOP}>
            {HUB.keuzeTitel[0]} <Onder>{HUB.keuzeTitel[1]}</Onder>
          </h2>
          <p className={INTRO}>{HUB.keuzeIntro}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Keuzekaart
              id="zelf"
              titel={HUB.zelf.titel}
              sub={HUB.zelf.sub}
              voorWie={HUB.zelf.voorWie}
              tekst={HUB.zelf.tekst}
            >
              <a
                href={skoolHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent("hub_klik", metHerkomst(herkomst, { keuze: "lesreeks" }))}
                className="hp-btn hp-btn--primary hp-btn--lg w-full"
              >
                {HUB.zelf.knop}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Keuzekaart>

            <Keuzekaart
              id="laten"
              donker
              titel={HUB.laten.titel}
              sub={HUB.laten.sub}
              voorWie={HUB.laten.voorWie}
              tekst={HUB.laten.tekst}
            >
              <button
                type="button"
                onClick={() => {
                  setFormOpen(true);
                  pushEvent("hub_klik", metHerkomst(herkomst, { keuze: "karel" }));
                }}
                className="hp-btn hp-btn--accent hp-btn--lg w-full"
                aria-expanded={formOpen}
                aria-controls="karel"
              >
                {HUB.laten.knop}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </Keuzekaart>
          </div>

          <div id="karel" ref={formRef} className="scroll-mt-4">
            {formOpen && (
              <div className="hp-card relative mx-auto mt-5 max-w-[40rem] p-6 sm:p-8">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#6C7590] transition-colors hover:bg-[#F5F7FB] hover:text-[#1A2D63]"
                  aria-label={HUB.laten.sluit}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
                <VraagFormulier metTelefoon bron={formBron} location="hub" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. De gratis resources */}
      <section id="resources" className="scroll-mt-4 py-14 sm:py-16">
        <div className={BREED}>
          <h2 className={KOP}>
            {HUB.resourcesTitel[0]} <Onder>{HUB.resourcesTitel[1]}</Onder>
          </h2>
          <p className={INTRO}>{HUB.resourcesIntro}</p>

          {soorten.length > 1 && (
            <div role="group" aria-label={HUB.filterLabel} className="mt-8 flex flex-wrap justify-center gap-2">
              {["", ...soorten].map((s) => {
                const actief = filter === s;
                return (
                  <button
                    key={s || "alles"}
                    type="button"
                    onClick={() => setFilter(s)}
                    aria-pressed={actief}
                    className={`min-h-[2.75rem] rounded-full border px-5 text-[0.9375rem] font-medium transition-colors ${
                      actief
                        ? "border-[#1A2D63] bg-[#1A2D63] text-white"
                        : "border-[#1A2D63]/20 bg-white text-[#1A2D63] hover:border-[#1A2D63]/45"
                    }`}
                  >
                    {s ? soortMeervoud(s) : HUB.filterAlles}
                  </button>
                );
              })}
            </div>
          )}

          {zichtbaar.length === 0 ? (
            <p className="mt-8 text-center text-[1rem] text-[#6C7590]">{HUB.resourcesLeeg}</p>
          ) : (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {zichtbaar.map((r) => (
                <li key={r.id}>
                  <ResourceKaart
                    resource={r}
                    onKlik={() => pushEvent("hub_klik", metHerkomst(herkomst, { keuze: "resource", resource: r.id }))}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <footer className="border-t border-[#E3E7EF] px-4 py-8 text-center text-[0.875rem] text-[#6C7590] sm:px-8">
        Finit Solutions ·{" "}
        <a href="/" className="hp-link">finitsolutions.be</a> ·{" "}
        <a href="/privacy/" className="hp-link">Privacy</a>
      </footer>
    </main>
  );
}

/** Eén van de twee wegen. De donkere ("laten doen") draagt de hoofdknop. */
function Keuzekaart({
  id,
  donker = false,
  titel,
  sub,
  voorWie,
  tekst,
  children,
}: {
  id: string;
  donker?: boolean;
  titel: string;
  sub: string;
  voorWie: string[];
  tekst: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={`flex scroll-mt-4 flex-col rounded-3xl p-6 sm:p-8 ${
        donker
          ? "bg-[#1A2D63] text-white shadow-[0_24px_50px_-24px_rgba(26,45,99,0.7)]"
          : "border-2 border-[#1A2D63]/15 bg-white text-[#3D4766]"
      }`}
    >
      <h3 className={`hp-display text-[2rem] font-bold leading-[1.05] sm:text-[2.25rem] ${donker ? "text-white" : "text-[#1A2D63]"}`}>{titel}</h3>
      <p className={`mt-2 text-[1.0625rem] font-medium ${donker ? "text-white/90" : "text-[#1A2D63]"}`}>{sub}</p>

      <p className={`mt-6 text-[0.9375rem] font-semibold ${donker ? "text-white" : "text-[#1A2D63]"}`}>{HUB.kiesDitAls}</p>
      <ul className="mt-3 space-y-2.5">
        {voorWie.map((zin) => (
          <li key={zin} className={`flex gap-3 text-[1rem] leading-[1.5] ${donker ? "text-white/90" : ""}`}>
            <Vinkje donker={donker} />
            {zin}
          </li>
        ))}
      </ul>

      <p className={`mt-6 flex-1 text-[1rem] leading-[1.65] ${donker ? "text-white/90" : ""}`}>{tekst}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function ResourceKaart({ resource: r, onKlik }: { resource: Resource; onKlik: () => void }) {
  // Pdf's en externe pagina's in een nieuw tabblad, zodat de hub open blijft.
  const nieuwTab = r.url.startsWith("https://") || r.url.toLowerCase().endsWith(".pdf");
  const knop = HUB.openKnop[r.soort] ?? HUB.openKnop.standaard;

  return (
    <a
      href={r.url}
      onClick={onKlik}
      {...(nieuwTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex h-full flex-col rounded-2xl border border-[#D5DCEA] bg-white p-5 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#1A2D63]/50 hover:shadow-[0_16px_36px_-20px_rgba(26,45,99,0.35)] sm:p-6"
    >
      <span className={`self-start rounded-full px-3 py-1 text-[0.8125rem] font-semibold ${SOORT_KLEUR[r.soort] ?? SOORT_KLEUR.gids}`}>
        {soortLabel(r.soort)}
      </span>
      <span className="hp-display hp-display-sm mt-3 text-[1.3125rem] font-semibold leading-[1.2] text-[#1A2D63]">{r.titel}</span>
      {r.beschrijving && <span className="mt-2 flex-1 text-[1rem] leading-[1.6]">{r.beschrijving}</span>}
      <span className="mt-5 inline-flex items-center gap-1.5 text-[1rem] font-semibold text-[#1A2D63]">
        {knop}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  );
}
