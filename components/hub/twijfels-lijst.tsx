"use client";

/**
 * De twijfels als accordeon (wens Alex, 20/11): er staat er maar één open, en
 * openen en sluiten gaat zacht (hoogte en plusje, ±260 ms). De hoogte loopt via
 * grid-template-rows 0fr → 1fr: werkt overal, ook op iPhone, zonder de hoogte
 * te meten. Bij "minder beweging" in het systeem springt het gewoon open.
 *
 * Met `zichtbaar` staan er eerst maar zoveel vragen; de knop eronder ("Toon nog X
 * vragen", tekst in `meer`) toont de rest, en de focus gaat naar de eerste nieuwe
 * vraag (Alex 25/11, hub). Zonder `zichtbaar` staan ze er allemaal, zoals op /cursus/.
 */

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function TwijfelsLijst({
  lijst,
  zichtbaar,
  meer = "Toon nog {aantal} vragen",
}: {
  lijst: ReadonlyArray<{ vraag: string; antwoord: string }>;
  zichtbaar?: number;
  meer?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);
  const [alles, setAlles] = useState(false);
  const eersteNieuwe = useRef<HTMLButtonElement>(null);
  const grens = zichtbaar && !alles ? Math.min(zichtbaar, lijst.length) : lijst.length;
  const rest = lijst.length - grens;

  // Na "Toon nog X vragen": de focus naar de eerste vraag die erbij kwam.
  useEffect(() => {
    if (alles) eersteNieuwe.current?.focus();
  }, [alles]);

  return (
    <>
    <div className="hub-faq-lijst">
      {lijst.slice(0, grens).map((t, i) => {
        const isOpen = open === i;
        return (
          <div key={t.vraag} className="hub-faq border border-[#E3E7EF] bg-white shadow-[0_1px_2px_rgba(26,45,99,0.04)]">
            <h3>
              <button
                type="button"
                ref={zichtbaar && i === zichtbaar ? eersteNieuwe : undefined}
                id={`${id}-k${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="hub-faq-vraag flex w-full items-start justify-between text-left font-semibold text-[#1A2D63]"
              >
                <span>{t.vraag}</span>
                <span className="hub-faq-plus flex shrink-0 items-center justify-center rounded-full bg-[#E6ECF9] text-[#1A2D63]" data-open={isOpen} aria-hidden="true">
                  <svg viewBox="0 0 12 12">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-k${i}`} aria-hidden={!isOpen} className="hub-faq-paneel" data-open={isOpen}>
              <div>
                <p className="hub-faq-antwoord text-[#3D4766]">{t.antwoord}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    {rest > 0 && (
      <div className="hub-faq-meer-wrap text-center">
        <button type="button" onClick={() => setAlles(true)} className="hub-faq-meer inline-flex items-center rounded-full border border-[#1A2D63]/20 bg-white font-semibold text-[#1A2D63] transition-colors hover:bg-[#F5F7FB]">
          {meer.replace("{aantal}", String(rest))}
          <ChevronDown aria-hidden="true" />
        </button>
      </div>
    )}
    </>
  );
}
