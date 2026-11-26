"use client";

/**
 * Het bedanktvenster na een formulier (Amina en Alex, 25/11): een apart venster boven de
 * pagina, met een klein feestje (confetti rond het vinkje), een zin die tot snelheid
 * aanzet en twee wegen: terug naar de pagina (sluit het venster) of lezen hoe we werken.
 *
 * Toegankelijk: role="dialog", de focus springt naar het venster en gaat bij het sluiten
 * terug; Escape, het kruisje en een klik naast het venster sluiten het. Bij "minder
 * beweging" geen confetti en geen animatie.
 */

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Clock, X } from "lucide-react";

export type BedanktTekst = {
  titel: string;
  sub: string;
  urgentie: string;
  terug: string;
  meer: string;
  meerHref: string;
  sluiten: string;
};

// Twaalf stukjes confetti in de kleuren van de site, rond het vinkje.
const CONFETTI = Array.from({ length: 12 }, (_, i) => ({
  hoek: i * 30 + (i % 2 ? 8 : -6),
  afstand: 70 + (i % 3) * 22,
  kleur: ["#1A2D63", "#2F55C4", "#E9A13B", "#9DB2E8"][i % 4],
  draai: (i % 2 ? 1 : -1) * (120 + i * 15),
}));

export function BedanktVenster({ tekst, onSluit, onMeer }: { tekst: BedanktTekst; onSluit: () => void; onMeer?: () => void }) {
  const venster = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vorige = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    venster.current?.focus();
    const toets = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSluit();
    };
    window.addEventListener("keydown", toets);
    return () => {
      window.removeEventListener("keydown", toets);
      document.body.style.overflow = overflow;
      vorige?.focus?.();
    };
  }, [onSluit]);

  return createPortal(
    <div className="bv-achtergrond" onClick={onSluit}>
      <div
        ref={venster}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bv-titel"
        tabIndex={-1}
        className="bv-venster"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onSluit} className="bv-sluit" aria-label={tekst.sluiten}>
          <X aria-hidden="true" />
        </button>

        <div className="bv-vink-wrap" aria-hidden="true">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="bv-confetti"
              style={
                {
                  "--hoek": `${c.hoek}deg`,
                  "--afstand": `${c.afstand}px`,
                  "--draai": `${c.draai}deg`,
                  background: c.kleur,
                } as React.CSSProperties
              }
            />
          ))}
          <span className="bv-vink">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M12 25 L20 33 L36 15" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <h2 id="bv-titel" className="bv-titel hp-display text-balance">
          {tekst.titel}
        </h2>
        <p className="bv-sub text-balance">{tekst.sub}</p>

        <p className="bv-urgentie">
          <Clock aria-hidden="true" />
          <span>{tekst.urgentie}</span>
        </p>

        <div className="bv-knoppen">
          <a href={tekst.meerHref} onClick={onMeer} className="hp-btn hp-btn--primary bv-knop">
            {tekst.meer}
            <ArrowRight aria-hidden="true" />
          </a>
          <button type="button" onClick={onSluit} className="bv-knop bv-knop--terug">
            {tekst.terug}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
