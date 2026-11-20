"use client";

/**
 * De twijfels als accordeon (wens Alex, 20/11): er staat er maar één open, en
 * openen en sluiten gaat zacht (hoogte en plusje, ±260 ms). De hoogte loopt via
 * grid-template-rows 0fr → 1fr: werkt overal, ook op iPhone, zonder de hoogte
 * te meten. Bij "minder beweging" in het systeem springt het gewoon open.
 */

import { useId, useState } from "react";

export function TwijfelsLijst({ lijst }: { lijst: ReadonlyArray<{ vraag: string; antwoord: string }> }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="hub-faq-lijst">
      {lijst.map((t, i) => {
        const isOpen = open === i;
        return (
          <div key={t.vraag} className="hub-faq border border-[#E3E7EF] bg-white shadow-[0_1px_2px_rgba(26,45,99,0.04)]">
            <h3>
              <button
                type="button"
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
  );
}
