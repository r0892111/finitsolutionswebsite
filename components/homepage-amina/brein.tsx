"use client";

/**
 * Het brein zoals het echt is: een map met gewone tekstbestanden.
 *
 * - `BreinBlad` toont één bestand. In de hero wordt het bij het laden
 *   "geschreven" (regel na regel, daarna de markeerstift over één regel).
 * - `BreinVerkenner` toont de map: links de bestanden, rechts het bestand dat
 *   je aanklikt.
 *
 * De inhoud is een voorbeeld en staat in copy.nl.ts en copy.en.ts
 * (brein.verkenner.bestanden).
 */

import { useState } from "react";
import { FileText } from "lucide-react";
import type { BreinBestand } from "./copy";

function Regels({ bestand }: { bestand: BreinBestand }) {
  const aantal = bestand.regels.length;
  return (
    <>
      {bestand.regels.map((regel, i) => (
        <span key={i} className={`nh-regel ${i === 0 ? "nh-regel--titel" : ""}`} style={{ "--i": i, "--n": aantal } as React.CSSProperties}>
          {i === bestand.markeer ? <span className="nh-markeer">{regel}</span> : regel}
        </span>
      ))}
    </>
  );
}

function Pad({ bestand, voorbeeld, wortel }: { bestand: BreinBestand; voorbeeld: string; wortel: string }) {
  return (
    <div className="nh-blad-kop">
      <span>
        {wortel} / {bestand.map} / <b>{bestand.naam}</b>
      </span>
      <span>{voorbeeld}</span>
    </div>
  );
}

export function BreinBlad({ bestand, voorbeeld, wortel, schrijf = false }: { bestand: BreinBestand; voorbeeld: string; wortel: string; schrijf?: boolean }) {
  return (
    <div className="nh-blad">
      <Pad bestand={bestand} voorbeeld={voorbeeld} wortel={wortel} />
      <div className={`nh-blad-lijf ${schrijf ? "nh-schrijf" : ""}`}>
        <Regels bestand={bestand} />
      </div>
    </div>
  );
}

export function BreinVerkenner({ bestanden, voorbeeld, wortel, label }: { bestanden: BreinBestand[]; voorbeeld: string; wortel: string; label: string }) {
  const [open, setOpen] = useState(0);
  const bestand = bestanden[open];
  return (
    <div className="nh-blad">
      <div className="nh-verkenner">
        <div className="nh-boom" role="tablist" aria-label={label}>
          {bestanden.map((b, i) => (
            <div key={b.naam} className="nh-boom-item">
              {(i === 0 || bestanden[i - 1].map !== b.map) && <div className="nh-map">{b.map}/</div>}
              <button
                type="button"
                role="tab"
                id={`brein-tab-${i}`}
                aria-selected={open === i}
                aria-controls="brein-paneel"
                onClick={() => setOpen(i)}
                className="nh-bestand"
              >
                <FileText aria-hidden="true" />
                {b.naam}
              </button>
            </div>
          ))}
        </div>
        <div id="brein-paneel" role="tabpanel" aria-labelledby={`brein-tab-${open}`}>
          <Pad bestand={bestand} voorbeeld={voorbeeld} wortel={wortel} />
          <div key={open} className="nh-blad-lijf nh-wissel">
            <Regels bestand={bestand} />
          </div>
        </div>
      </div>
    </div>
  );
}
