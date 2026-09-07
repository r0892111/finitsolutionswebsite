"use client";

import { useState } from "react";
import { BREIN_KAART, BREIN_PAGINA } from "./copy";

/**
 * Het beeld in de hero: een AI-brein zoals het er echt uitziet, als kaart.
 * Pagina's over de zaak van een fictieve installateur die naar elkaar
 * verwijzen (zo ziet de klant zijn eigen brein in hoofdstuk 3), met de pagina
 * "Offertes" opengeklapt eronder. Inkt op papier, geen gloed, geen netwerk-
 * animatie: de lijnen tekenen zich één keer in en dat is het.
 */

type Node = { id: string; x: number; y: number; label: string; persoon?: boolean; lx?: number; ly?: number; anchor?: "start" | "end" | "middle" };

const NODES: Node[] = [
  { id: "klantreis", x: 330, y: 250, label: "Klantreis", lx: 0, ly: -13, anchor: "middle" },
  { id: "offertes", x: 410, y: 430, label: "Offertes", lx: 16, ly: 5 },
  { id: "prijzen", x: 290, y: 470, label: "Prijzen", lx: -10, ly: 4, anchor: "end" },
  { id: "klanten", x: 240, y: 330, label: "Klanten", lx: -11, ly: -6, anchor: "end" },
  { id: "whatsapp", x: 120, y: 390, label: "WhatsApp", lx: -10, ly: 4, anchor: "end" },
  { id: "planning", x: 170, y: 210, label: "Planning", lx: -10, ly: 4, anchor: "end" },
  { id: "werkbonnen", x: 260, y: 120, label: "Werkbonnen", lx: 0, ly: -12, anchor: "middle" },
  { id: "facturatie", x: 440, y: 90, label: "Facturatie", lx: 0, ly: -12, anchor: "middle" },
  { id: "leveranciers", x: 70, y: 110, label: "Leveranciers", lx: 0, ly: -12, anchor: "middle" },
  { id: "materiaal", x: 130, y: 300, label: "Materiaal", lx: -10, ly: 4, anchor: "end" },
  { id: "klachten", x: 480, y: 220, label: "Klachten", lx: 12, ly: 4 },
  { id: "nieuwbouw", x: 560, y: 330, label: "Nieuwbouw", lx: 0, ly: -12, anchor: "middle" },
  { id: "tom", x: 520, y: 480, label: "Tom", persoon: true, lx: 12, ly: 4 },
  { id: "els", x: 560, y: 410, label: "Els", persoon: true, lx: 12, ly: 4 },
];

const EDGES: [string, string][] = [
  ["offertes", "prijzen"], ["offertes", "tom"], ["offertes", "els"], ["offertes", "klanten"],
  ["offertes", "nieuwbouw"], ["offertes", "klantreis"], ["offertes", "whatsapp"],
  ["klantreis", "planning"], ["klantreis", "werkbonnen"], ["klantreis", "klanten"], ["klantreis", "klachten"],
  ["werkbonnen", "facturatie"], ["facturatie", "klanten"], ["planning", "tom"], ["planning", "leveranciers"],
  ["leveranciers", "materiaal"], ["materiaal", "prijzen"], ["klachten", "els"], ["whatsapp", "klanten"],
  ["werkbonnen", "materiaal"], ["nieuwbouw", "els"],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

export function BreinKaart() {
  const [actief, setActief] = useState<string>("offertes");
  const p = BREIN_PAGINA;

  return (
    <figure className="w-full">
      <div className="relative">
        <svg
          viewBox="0 0 600 520"
          className="block h-auto w-full overflow-visible"
          role="img"
          aria-label={BREIN_KAART.aria}
          onMouseLeave={() => setActief("offertes")}
        >
          {EDGES.map(([a, b], i) => {
            const na = byId[a];
            const nb = byId[b];
            const raakt = a === actief || b === actief;
            return (
              <line
                key={`${a}-${b}`}
                className="fs-edge"
                data-actief={raakt}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                pathLength={1}
                style={{ animationDelay: `${120 + i * 35}ms` }}
              />
            );
          })}

          {/* Van de opengeklapte pagina naar de kaart eronder */}
          <line x1={410} y1={430} x2={410} y2={520} stroke="#1A2D63" strokeWidth={1} strokeDasharray="3 4" />

          {NODES.map((n, i) => {
            const isActief = n.id === actief;
            const open = n.id === "offertes";
            return (
              <g
                key={n.id}
                className="fs-node"
                data-actief={isActief}
                onMouseEnter={() => setActief(n.id)}
                style={{ animationDelay: `${300 + i * 40}ms` }}
              >
                {open && <circle cx={n.x} cy={n.y} r={13} fill="none" stroke="#A6B0CC" strokeWidth={1} />}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={open ? 6.5 : isActief ? 6 : 4.5}
                  fill={n.persoon ? "#FDFBF7" : "#1A2D63"}
                  stroke="#1A2D63"
                  strokeWidth={n.persoon ? 1.5 : 0}
                />
                <text
                  x={n.x + (n.lx ?? 10)}
                  y={n.y + (n.ly ?? 4)}
                  textAnchor={n.anchor ?? "start"}
                  fontWeight={open ? 600 : undefined}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* De opengeklapte pagina, opgehangen aan de stippellijn */}
      <div className="fs-rise ml-auto w-full sm:w-[78%]" style={{ animationDelay: "650ms" }}>
        <div className="fs-paper rounded-[10px] border border-[#E8E6DC] bg-[#FFFEFA]">
          <div className="px-5 pt-4 sm:px-6 sm:pt-5">
            <div className="flex items-baseline justify-between gap-4 text-[0.75rem] text-[#76706A]">
              <span>{p.bedrijf}</span>
              <span>{p.pagina}</span>
            </div>
            <p className="fs-display fs-display-sm mt-3 text-[1.5rem] font-semibold leading-none text-[#1A2D63]">
              {p.titel}
            </p>
            <dl className="mt-3 divide-y divide-[#EFEDE3] border-t border-[#EFEDE3]">
              {p.rijen.map((rij) => (
                <div key={rij.k} className="grid grid-cols-[6rem_1fr] gap-3 py-2 text-[0.875rem] leading-[1.45]">
                  <dt className="text-[#76706A]">{rij.k}</dt>
                  <dd className="text-[#2A2620]">{rij.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-3 grid grid-cols-[2.25rem_1fr] gap-x-2 gap-y-2 rounded-b-[10px] border-t border-[#EFEDE3] bg-[#F5F3EC] px-5 py-3.5 text-[0.85rem] leading-[1.45] sm:px-6">
            <span className="font-medium text-[#76706A]">Jij</span>
            <p className="text-[#57514A]">{p.gesprek.jij}</p>
            <span className="font-medium text-[#1A2D63]">AI</span>
            <p className="text-[#2A2620]">{p.gesprek.ai}</p>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-[0.9rem] leading-[1.5] text-[#76706A]">{BREIN_KAART.onderschrift}</figcaption>
    </figure>
  );
}
