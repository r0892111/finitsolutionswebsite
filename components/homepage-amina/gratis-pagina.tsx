"use client";

/**
 * "Gratis materiaal" (finitsolutions.be/gratis-materiaal/ en /en/free-resources/).
 *
 * Vraag van Amina, 26/11: een eigen pagina met de gratis prompts, met een eigen knop in het
 * menu. Wie hier komt, is een koudere lead dan wie de video bekijkt; later krijgen die twee
 * groepen elk hun eigen mailreeks. Daarom krijgt een aanmelding van deze pagina de herkomst
 * "gratis-materiaal" mee (in Brevo: UTM_MEDIUM), die van de hub blijft "hub".
 *
 * Opbouw (Alex 26/11, in de stijl van de hub):
 * 1. dicht: een grote kop en een inschrijfformulier zoals bij een nieuwsbrief (voornaam,
 *    e-mailadres, vinkje voor de mails dat standaard uit staat), met eronder wat je krijgt;
 * 2. open: de BREIN-prompt apart bovenaan (de pdf op Drive, dezelfde als in de Instagram-DM's),
 *    daaronder alle andere prompts en gidsen met hun filter (components/hub/resource-sectie.tsx).
 * Eenmaal open blijft het open op dit toestel (lib/hub-toegang.ts), net als op de hub.
 *
 * Onderaan een blok naar de video op /hub/ (Alex aan Amina: bezoekers moeten weten dat die
 * pagina bestaat), met de kop en de haak van de hub zelf.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Play } from "lucide-react";
import { Onder } from "@/components/home/ui";
import { HUB } from "@/components/hub/copy";
import { HUB_EN } from "@/components/hub/copy.en";
import { ResourceSectie } from "@/components/hub/resource-sectie";
import { HubTekstContext } from "@/components/hub/taal";
import { VSL } from "@/components/hub/video";
import { pushEvent } from "@/lib/analytics";
import { bewaardeVoornaam, heeftToegang } from "@/lib/hub-toegang";
import type { Taal } from "./copy";
import { COPY, GRATIS, Kop, TEKST, Voet, vast } from "./kader";
import { InschrijfKaart } from "./inschrijf-kaart";

const HUB_PAD: Record<Taal, string> = { nl: "/hub/", en: "/hub/en/" };
const PLEK = "gratis-materiaal";
const ACCENT = "text-[#2F55C4]";

const schoon = (v: string | null, max: number) => (v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max);

export function GratisPagina({ taal }: { taal: Taal }) {
  const t = COPY[taal];
  const G = t.gratis;
  const H = taal === "en" ? HUB_EN : HUB;
  // ?bron=tiktok (kanaal) en ?reel=C03 (post), zoals op de hub: gaan mee met de aanmelding.
  const [herkomst, setHerkomst] = useState({ bron: "direct", reel: "" });
  // null = nog niet gekeken (eerste weergave): dan het inschrijfscherm, dat is wat de meesten zien.
  const [open, setOpen] = useState<boolean | null>(null);
  const [voornaam, setVoornaam] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setHerkomst({ bron: schoon(p.get("bron"), 40) || "direct", reel: schoon(p.get("reel"), 12).toUpperCase() });
    const toegang = heeftToegang();
    setOpen(toegang);
    if (toegang) setVoornaam(bewaardeVoornaam());
  }, []);

  const meta = { bron: herkomst.bron, reel: herkomst.reel, plek: PLEK, taal };
  const naarVideo = () => pushEvent("nav_click", { doel: "hub", location: PLEK, taal });

  const opengezet = (naam: string) => {
    setVoornaam(naam);
    setOpen(true);
    const zacht = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: zacht ? "smooth" : "auto" });
  };

  return (
    <HubTekstContext.Provider value={H}>
      <div className="hp nh hub-ritme" lang={taal}>
        <Kop taal={taal} thuis={false} taalPaden={GRATIS} actief="gratis" />
        <main id="inhoud" className="hp-stippen bg-white">
          {open !== true ? (
            /* 1. Het inschrijfscherm */
            <section className="pb-[var(--hub-r5)] pt-28 sm:pt-32">
              <div className="hub-wrap text-center">
                <h1 className="hp-display hub-titel mx-auto text-balance font-bold text-[#1A2D63]">
                  {G.kop.voor}{" "}
                  <span className={ACCENT}>
                    <Onder>{G.kop.accent}</Onder>
                  </span>{" "}
                  {G.kop.na}
                </h1>
                <p className="hub-lead">{vast(G.sub)}</p>
              </div>

              <div className="mx-auto mt-[var(--hub-r4)] w-[min(calc(100%-28px),46rem)]">
                <InschrijfKaart tekst={G.kaart} bron={herkomst.bron} reel={herkomst.reel} meta={meta} onOpen={opengezet} />

                <ul className="mx-auto mt-[var(--hub-r3)] grid max-w-[40rem] gap-2.5">
                  {G.krijg.map((regel) => (
                    <li key={regel} className="flex items-start gap-3 text-[1rem] leading-[1.5] text-[#3D4766]">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#E6ECF9] text-[#1A2D63]" aria-hidden="true">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {vast(regel)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : (
            /* 2. Open: de BREIN-prompt apart, daaronder de rest */
            <section className="pb-[var(--hub-r5)] pt-28 sm:pt-32">
              <div className="hub-wrap text-center">
                <h1 className="hp-display hub-sectietitel text-balance font-bold text-[#1A2D63]">
                  {G.open.titel.replace("{naam}", voornaam ? `, ${voornaam}` : "")}
                </h1>
                <p className="hub-intro mx-auto">{vast(G.open.intro)}</p>
              </div>

              <div className="hub-wrap">
                <div className="mx-auto mt-[var(--hub-r4)] max-w-[62rem]">
                  <a
                    href={G.brein.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => pushEvent("hub_klik", { ...meta, keuze: "resource", resource: "brein-prompt" })}
                    className="hp-card group grid overflow-hidden border-2 border-[#1A2D63] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-24px_rgba(26,45,99,0.45)] sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-center"
                  >
                    {/* De pdf zelf, ingezoomd op de bovenkant en tot aan de rand (Alex 26/11: geen kader errond). */}
                    <span className="relative block aspect-[4/3] w-full overflow-hidden border-b border-[#1A2D63]/10 sm:aspect-auto sm:h-full sm:min-h-[20rem] sm:border-b-0 sm:border-r">
                      <Image src={G.brein.cover} alt="" fill sizes="(min-width: 640px) 420px, 100vw" className="object-cover object-top" />
                    </span>
                    <span className="flex flex-col p-6 sm:p-8 lg:p-10">
                      <span className="w-fit rounded-full bg-[#1A2D63] px-3 py-1 text-[0.8125rem] font-semibold text-white">{G.brein.label}</span>
                      <span className="hp-display hp-display-sm mt-4 text-[1.6rem] font-semibold leading-[1.15] text-[#1A2D63] sm:text-[2rem]">{G.brein.titel}</span>
                      <span className={`mt-3 ${TEKST} sm:text-[1.0625rem]`}>{vast(G.brein.tekst)}</span>
                      <span className="hp-btn hp-btn--primary hp-btn--lg mt-6 w-full sm:w-fit">
                        {G.brein.knop}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </span>
                  </a>

                  <h2 className="hp-display mt-[var(--hub-r5)] text-balance text-center text-[1.75rem] font-bold leading-[1.15] text-[#1A2D63] sm:text-[2.25rem]">
                    {G.open.rest}
                  </h2>
                  <ResourceSectie reel={herkomst.reel} meta={{ bron: herkomst.bron, reel: herkomst.reel }} plek={PLEK} slot={false} />
                </div>
              </div>
            </section>
          )}

          {/* De video op /hub/: wie hier voor de prompts komt, moet weten dat ze bestaat. */}
          <section className="bg-[#F5F7FB]">
            <div className="hub-wrap py-[var(--hub-r5)]">
              <div className="hp-card grid overflow-hidden lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
                <a href={HUB_PAD[taal]} onClick={naarVideo} aria-label={G.videoKnop} className="group relative block aspect-[16/9] bg-[#1A2D63]">
                  <Image src={VSL.affiche} alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
                  <span className="absolute inset-0 bg-[#1A2D63]/20 transition-colors group-hover:bg-[#1A2D63]/10" aria-hidden="true" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1A2D63] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-105" aria-hidden="true">
                    <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                  </span>
                </a>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <h2 className="hp-display hp-display-sm text-[1.6rem] font-semibold leading-[1.15] text-[#1A2D63] sm:text-[1.9rem]">
                    {H.kop.voor} {H.kop.accent} {H.kop.na}
                  </h2>
                  <p className="mt-3 text-[1.0625rem] font-medium leading-[1.5] text-[#1A2D63]">{vast(H.haak)}</p>
                  <p className={`mt-2 ${TEKST}`}>{vast(H.naarVideo)}</p>
                  <div className="mt-6">
                    <a href={HUB_PAD[taal]} onClick={naarVideo} className="hp-btn hp-btn--primary hp-btn--lg w-full sm:w-auto">
                      {G.videoKnop}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Voet taal={taal} />
      </div>
    </HubTekstContext.Provider>
  );
}
