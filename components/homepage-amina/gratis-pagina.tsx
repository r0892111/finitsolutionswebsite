"use client";

/**
 * "Gratis materiaal" (finitsolutions.be/gratis-materiaal/ en /en/free-resources/).
 *
 * Vraag van Amina, 26/11: een eigen pagina met de gratis prompts, met een eigen knop in het
 * menu. Wie hier komt, is een koudere lead dan wie de video bekijkt; later krijgen die twee
 * groepen elk hun eigen mailreeks. Daarom krijgt een aanmelding van deze pagina de herkomst
 * "gratis-materiaal" mee (in Brevo: UTM_MEDIUM), die van de hub blijft "hub".
 *
 * Geen nieuwe tekst en geen nieuwe techniek: de lijst met prompts en gidsen, het e-mailslot
 * en hun teksten (NL en EN) zijn die van de hub (components/hub/resource-sectie.tsx). Het
 * slot opent de prompts meteen op de pagina; er vertrekt (nog) geen mail met de prompt.
 * Toestemming: het vinkje voor de mails staat standaard uit (wettelijk minimum).
 *
 * Onderaan een blok naar de video op /hub/ (Alex aan Amina: bezoekers moeten weten dat die
 * pagina bestaat), met de kop en de haak van de hub zelf.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { CONTAINER, LEAD, Onder } from "@/components/home/ui";
import { HUB } from "@/components/hub/copy";
import { HUB_EN } from "@/components/hub/copy.en";
import { ResourceSectie } from "@/components/hub/resource-sectie";
import { HubTekstContext } from "@/components/hub/taal";
import { VSL } from "@/components/hub/video";
import { pushEvent } from "@/lib/analytics";
import type { Taal } from "./copy";
import { COPY, GRATIS, Kop, TEKST, Voet, vast } from "./kader";

const HUB_PAD: Record<Taal, string> = { nl: "/hub/", en: "/hub/en/" };
const PLEK = "gratis-materiaal";

const schoon = (v: string | null, max: number) => (v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max);

export function GratisPagina({ taal }: { taal: Taal }) {
  const t = COPY[taal];
  const H = taal === "en" ? HUB_EN : HUB;
  // ?bron=tiktok (kanaal) en ?reel=C03 (post), zoals op de hub: gaan mee met de aanmelding.
  const [herkomst, setHerkomst] = useState({ bron: "direct", reel: "" });
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setHerkomst({ bron: schoon(p.get("bron"), 40) || "direct", reel: schoon(p.get("reel"), 12).toUpperCase() });
  }, []);

  const naarVideo = () => pushEvent("nav_click", { doel: "hub", location: PLEK, taal });

  return (
    <div className="hp nh hub-ritme" lang={taal}>
      <Kop taal={taal} thuis={false} taalPaden={GRATIS} actief="gratis" />
      <main id="inhoud">
        <section className="bg-white">
          <div className={`${CONTAINER} pb-14 pt-28 sm:pb-20 sm:pt-32`}>
            <div className="hp-rise mx-auto max-w-[44rem] text-center">
              <h1 className="hp-display text-[2.2rem] font-bold leading-[1.05] text-[#1A2D63] sm:text-[2.8rem] lg:text-[3.2rem]">
                {H.resources.titel.voor} <Onder accent>{H.resources.titel.accent}</Onder>
              </h1>
              <p className={`mt-5 ${LEAD}`}>{vast(H.resources.intro)}</p>
            </div>
            <div className="mx-auto max-w-[62rem]">
              <HubTekstContext.Provider value={H}>
                <ResourceSectie reel={herkomst.reel} meta={{ bron: herkomst.bron, reel: herkomst.reel }} plek={PLEK} />
              </HubTekstContext.Provider>
            </div>
          </div>
        </section>

        {/* De video op /hub/: wie hier voor de prompts komt, moet weten dat ze bestaat. */}
        <section className="bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-14 sm:py-20`}>
            <div className="hp-card grid overflow-hidden lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
              <a href={HUB_PAD[taal]} onClick={naarVideo} aria-label={t.gratis.videoKnop} className="group relative block aspect-[16/9] bg-[#1A2D63]">
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
                    {t.gratis.videoKnop}
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
  );
}
