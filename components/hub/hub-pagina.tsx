"use client";

/**
 * De resource hub: de enige link op alle socials (beslissing Alex, 28/10/2026).
 * Van boven naar onder: de VSL, de keuze (zelf bouwen = lesreeks op Skool,
 * laten doen = formulier voor een call met Karel) en de gratis resources.
 *
 * Herkomst: ?bron=tiktok (kanaal) en ?reel=R031 (video) gaan mee naar Skool
 * als utm-parameters, naar het formulier als "Pagina" in de mail en op monday,
 * en naar Google Tag Manager als events (hub_view, hub_klik, hub_vsl_play).
 *
 * Ankers voor links van buitenaf: #keuze, #karel (opent meteen het formulier)
 * en #resources.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, X } from "lucide-react";
import lokaleLijst from "@/content/resources.json";
import { VraagFormulier } from "@/components/home/vraag-formulier";
import { pushEvent } from "@/lib/analytics";
import { SKOOL_URL } from "@/lib/finit-links";
import { haalExterneLijst, leesLijst, RESOURCES_URL, soortLabel, voegSamen, type Resource } from "@/lib/resources";
import { HUB } from "./copy";
import { Vsl } from "./vsl";

const LOKAAL = leesLijst(lokaleLijst);
const SKOOL_ABOUT = `${SKOOL_URL}/about`;

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

export function HubPagina() {
  const [herkomst, setHerkomst] = useState<Herkomst>({ bron: "direct", reel: "", pad: "/" });
  const [resources, setResources] = useState<Resource[]>(() => voegSamen(LOKAAL));
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

  return (
    <main className="min-h-screen bg-white text-[#3D4766]">
      <header className="bg-[#1A2D63] px-4 pb-28 pt-7 text-white sm:px-8 sm:pb-36 sm:pt-9">
        <div className="mx-auto max-w-[760px]">
          <a href="/" className="inline-flex" aria-label="Finit Solutions, naar de homepage">
            <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="h-7 w-auto brightness-0 invert" priority />
          </a>
          <p className="mb-3 mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-[#FBE286]">{HUB.bovenschrift}</p>
          <h1 className="hp-display text-balance text-[2.25rem] font-semibold leading-[1.05] sm:text-5xl">{HUB.titel}</h1>
          <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-relaxed text-white/80">{HUB.intro}</p>
          <a
            href="#resources"
            className="mt-5 inline-block text-[0.9375rem] text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
          >
            {HUB.naarResources}
            <ArrowDown className="ml-1 inline h-4 w-4 align-[-3px]" aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="mx-auto -mt-20 max-w-[760px] px-4 sm:-mt-28 sm:px-8">
        <Vsl onPlay={() => pushEvent("hub_vsl_play", metHerkomst(herkomst))} />
      </div>

      <section id="keuze" className="mt-14 scroll-mt-6 bg-[#F5F7FB] px-4 py-14 sm:mt-16 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-[760px]">
          <h2 className="hp-display text-[1.75rem] font-semibold leading-tight text-[#1A2D63] sm:text-[2rem]">{HUB.keuzeTitel}</h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="hp-card flex flex-col p-6">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#6C7590]">{HUB.zelf.label}</p>
              <h3 className="hp-display hp-display-sm mt-2 text-[1.35rem] font-semibold leading-tight text-[#1A2D63]">{HUB.zelf.titel}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-[1.6]">{HUB.zelf.tekst}</p>
              <a
                href={skoolHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent("hub_klik", metHerkomst(herkomst, { keuze: "lesreeks" }))}
                className="hp-btn hp-btn--primary hp-btn--md mt-6 w-full"
              >
                {HUB.zelf.knop}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="hp-card flex flex-col p-6">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#6C7590]">{HUB.laten.label}</p>
              <h3 className="hp-display hp-display-sm mt-2 text-[1.35rem] font-semibold leading-tight text-[#1A2D63]">{HUB.laten.titel}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-[1.6]">{HUB.laten.tekst}</p>
              <button
                type="button"
                onClick={() => {
                  setFormOpen(true);
                  pushEvent("hub_klik", metHerkomst(herkomst, { keuze: "karel" }));
                }}
                className="hp-btn hp-btn--accent hp-btn--md mt-6 w-full"
                aria-expanded={formOpen}
                aria-controls="karel"
              >
                {HUB.laten.knop}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div id="karel" ref={formRef} className="scroll-mt-6">
            {formOpen && (
              <div className="hp-card relative mt-5 p-6 sm:p-8">
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

      <section id="resources" className="scroll-mt-6 px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-[760px]">
          <h2 className="hp-display text-[1.75rem] font-semibold leading-tight text-[#1A2D63] sm:text-[2rem]">{HUB.resourcesTitel}</h2>
          <p className="mt-2 text-[1rem] leading-relaxed">{HUB.resourcesIntro}</p>

          {resources.length === 0 ? (
            <p className="mt-7 text-[0.9375rem] text-[#6C7590]">{HUB.resourcesLeeg}</p>
          ) : (
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {resources.map((r) => (
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

function ResourceKaart({ resource: r, onKlik }: { resource: Resource; onKlik: () => void }) {
  // Pdf's en externe pagina's in een nieuw tabblad, zodat de hub open blijft.
  const nieuwTab = r.url.startsWith("https://") || r.url.toLowerCase().endsWith(".pdf");
  const knop = HUB.openKnop[r.soort] ?? HUB.openKnop.standaard;

  return (
    <a
      href={r.url}
      onClick={onKlik}
      {...(nieuwTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="hp-card group flex h-full flex-col p-5 transition-colors hover:border-[#1A2D63]/30"
    >
      <span className="self-start rounded-full bg-[#E6ECF9] px-2.5 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#1A2D63]">
        {soortLabel(r.soort)}
      </span>
      <span className="hp-display hp-display-sm mt-3 text-[1.15rem] font-semibold leading-snug text-[#1A2D63]">{r.titel}</span>
      {r.beschrijving && <span className="mt-1.5 flex-1 text-[0.9375rem] leading-[1.55]">{r.beschrijving}</span>}
      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-[#1A2D63]">
        {knop}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  );
}
