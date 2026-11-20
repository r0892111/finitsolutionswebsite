"use client";

/**
 * De gratis prompts en gidsen onderaan de hub, achter een e-mailslot.
 *
 * Dicht: je ziet wat je krijgt (de kaartjes vervaagd, niet klikbaar) en één
 * veld voor je e-mailadres, met een vinkje voor de mails dat standaard UIT
 * staat. Open: de volledige lijst met filter per soort. Eenmaal open blijft het
 * open (lib/hub-toegang.ts), ook na herladen of op een andere pagina.
 *
 * De lijst zelf staat in content/resources.json (en eventueel een externe
 * lijst via NEXT_PUBLIC_RESOURCES_URL), zoals voorheen.
 */

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import lokaleLijst from "@/content/resources.json";
import { pushEvent } from "@/lib/analytics";
import { bijBezoek, heeftToegang } from "@/lib/hub-toegang";
import { haalExterneLijst, leesLijst, RESOURCES_URL, soortLabel, soortMeervoud, voegSamen, type Resource } from "@/lib/resources";
import { HUB } from "./copy";
import { SlotFormulier } from "./slot-formulier";

const LOKAAL = leesLijst(lokaleLijst);
const R = HUB.resources;
const S = HUB.slot;
const FILTER_VOLGORDE = ["gids", "prompt", "pakket", "template", "video"];

// Elke soort zijn eigen tint van marineblauw.
const SOORT_KLEUR: Record<string, string> = {
  gids: "bg-[#E6ECF9] text-[#1A2D63]",
  prompt: "bg-[#1A2D63] text-white",
  pakket: "bg-[#C9D3EE] text-[#1A2D63]",
  bronnen: "border border-[#1A2D63]/25 bg-white text-[#1A2D63]",
};

export function ResourceSectie({ reel, meta }: { reel: string; meta: Record<string, string> }) {
  const [resources, setResources] = useState<Resource[]>(() => voegSamen(LOKAAL));
  const [filter, setFilter] = useState("");
  // null = nog niet gekeken (eerste render op de server): dan niets tonen dat flitst.
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const toegang = heeftToegang();
    setOpen(toegang);
    if (toegang) void bijBezoek();
  }, []);

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

  const soorten = useMemo(() => {
    const plek = (s: string) => {
      const i = FILTER_VOLGORDE.indexOf(s);
      return i === -1 ? FILTER_VOLGORDE.length : i;
    };
    return Array.from(new Set(resources.map((r) => r.soort))).sort((a, b) => plek(a) - plek(b));
  }, [resources]);

  // Komt iemand van een post (?reel=C03) en hoort er een resource bij, dan staat die bovenaan.
  const uitPost = reel ? resources.find((r) => r.reel?.toUpperCase() === reel) : undefined;
  const gefilterd = filter ? resources.filter((r) => r.soort === filter) : resources;
  const zichtbaar = uitPost && gefilterd.includes(uitPost) ? [uitPost, ...gefilterd.filter((r) => r !== uitPost)] : gefilterd;

  return (
    <>
      {open === false && (
        <div className="relative mt-8">
          {/* Wat je krijgt: echt, maar vervaagd en niet klikbaar. */}
          <ul className="hp-slot-voorbeeld pointer-events-none grid max-h-[26rem] gap-4 overflow-hidden sm:grid-cols-2" aria-hidden="true">
            {zichtbaar.slice(0, 4).map((r) => (
              <li key={r.id}>
                <ResourceKaart resource={r} uitPost={r === uitPost} voorbeeld />
              </li>
            ))}
          </ul>

          <SlotFormulier
            titel={S.titel}
            tekst={S.tekst.replace("{aantal}", String(resources.length))}
            bron={meta.bron ?? "direct"}
            reel={reel}
            meta={{ ...meta, plek: "hub" }}
            onOpen={() => setOpen(true)}
            className="z-10 mx-auto -mt-40 max-w-[34rem] sm:-mt-48"
          />
        </div>
      )}

      {open === true && (
        <>
          {soorten.length > 1 && (
            <div role="group" aria-label={R.filterLabel} className="mt-8 flex flex-wrap justify-center gap-2">
              {["", ...soorten].map((s) => {
                const actief = filter === s;
                return (
                  <button
                    key={s || "alles"}
                    type="button"
                    onClick={() => setFilter(s)}
                    aria-pressed={actief}
                    className={`min-h-[2.75rem] rounded-full border px-5 text-[0.9375rem] font-medium transition-colors ${
                      actief ? "border-[#1A2D63] bg-[#1A2D63] text-white" : "border-[#1A2D63]/20 bg-white text-[#1A2D63] hover:border-[#1A2D63]/45"
                    }`}
                  >
                    {s ? soortMeervoud(s) : R.filterAlles}
                  </button>
                );
              })}
            </div>
          )}

          {zichtbaar.length === 0 ? (
            <p className="mt-8 text-center text-[1rem] text-[#6C7590]">{R.leeg}</p>
          ) : (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {zichtbaar.map((r) => (
                <li key={r.id}>
                  <ResourceKaart
                    resource={r}
                    uitPost={r === uitPost}
                    onKlik={() => pushEvent("hub_klik", { ...meta, keuze: "resource", resource: r.id })}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {open === null && <div className="mt-8 min-h-[26rem]" aria-hidden="true" />}
    </>
  );
}

function ResourceKaart({
  resource: r,
  uitPost = false,
  voorbeeld = false,
  onKlik,
}: {
  resource: Resource;
  uitPost?: boolean;
  /** Achter het slot: geen link, niet te bereiken met de tab-toets. */
  voorbeeld?: boolean;
  onKlik?: () => void;
}) {
  // Pdf's en externe pagina's in een nieuw tabblad, zodat de hub open blijft.
  const nieuwTab = r.url.startsWith("https://") || r.url.toLowerCase().endsWith(".pdf");
  const knop = R.openKnop[r.soort] ?? R.openKnop.standaard;

  const Tag = voorbeeld ? "div" : "a";
  const link = voorbeeld ? {} : { href: r.url, onClick: onKlik, ...(nieuwTab ? { target: "_blank", rel: "noopener noreferrer" } : {}) };

  return (
    <Tag
      {...link}
      className={`group flex h-full flex-col rounded-2xl border bg-white p-5 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#1A2D63]/50 hover:shadow-[0_16px_36px_-20px_rgba(26,45,99,0.35)] sm:p-6 ${
        uitPost ? "border-2 border-[#1A2D63]" : "border-[#D5DCEA]"
      }`}
    >
      <span className="flex flex-1 gap-4">
        {/* De cover van de post, zodat wie via de link in bio komt hem herkent. */}
        {r.thumbnail && (
          <span className="relative aspect-[4/5] w-24 flex-none self-start overflow-hidden rounded-xl bg-[#E6ECF9] sm:w-28">
            <Image src={r.thumbnail} alt="" fill sizes="112px" className="object-cover object-top" />
          </span>
        )}
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-[0.8125rem] font-semibold ${SOORT_KLEUR[r.soort] ?? SOORT_KLEUR.gids}`}>{soortLabel(r.soort)}</span>
            {uitPost && <span className="text-[0.8125rem] font-semibold text-[#1A2D63]">{R.uitPost}</span>}
          </span>
          <span className="hp-display hp-display-sm mt-3 text-[1.3125rem] font-semibold leading-[1.2] text-[#1A2D63]">{r.titel}</span>
          {r.beschrijving && <span className="mt-2 flex-1 text-[1rem] leading-[1.6] text-[#3D4766]">{r.beschrijving}</span>}
        </span>
      </span>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[1rem] font-semibold text-[#1A2D63]">
        {knop}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Tag>
  );
}
