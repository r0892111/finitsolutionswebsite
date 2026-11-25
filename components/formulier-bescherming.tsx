"use client";

/**
 * Wat elk leadformulier meestuurt voor de wacht op de server (lib/formulier-wacht.ts):
 * - aanvraag_id: één id per aanvraag. Blijft gelijk als de bezoeker na een foutmelding
 *   opnieuw verstuurt, zodat de server een dubbele inzending herkent; na succes een nieuw.
 * - ingevuld_ms: hoe lang het formulier al open stond (bots versturen binnen 3 s).
 * - controle: een honeypot, onzichtbaar voor mensen. Bewust geen naam als "fax" of
 *   "website", die een browser of wachtwoordbeheerder zelf zou kunnen invullen.
 * - turnstile: het bewijs van Cloudflare Turnstile, alleen als NEXT_PUBLIC_TURNSTILE_SITE_KEY
 *   bij de build gezet is (en TURNSTILE_SECRET_KEY in de functies). Zonder sleutel: niets.
 *
 * Gebruik: `const b = useBescherming();` → `...b.velden()` in de body, `{b.extraVelden}`
 * in het formulier, en na het versturen `b.naVersturen(gelukt)`.
 */
import { useCallback, useEffect, useRef, useState } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opties: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

function nieuwId(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  // Oudere browsers: hetzelfde formaat (uuid v4), uit getRandomValues.
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

let scriptBelofte: Promise<void> | null = null;
function laadTurnstile(): Promise<void> {
  scriptBelofte ??= new Promise<void>((klaar, mis) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => klaar();
    s.onerror = () => mis(new Error("turnstile"));
    document.head.appendChild(s);
  });
  return scriptBelofte;
}

export function useBescherming() {
  const start = useRef(0);
  const id = useRef<string | null>(null);
  const token = useRef("");
  const widget = useRef<string | null>(null);
  const [controle, setControle] = useState("");

  useEffect(() => {
    start.current = Date.now();
  }, []);

  // Het vak voor Turnstile: zodra het in de pagina staat (ook in een popup die later opengaat).
  const vak = useCallback((el: HTMLDivElement | null) => {
    if (!el || !SITE_KEY) return;
    laadTurnstile()
      .then(() => {
        if (!window.turnstile || !el.isConnected) return;
        widget.current = window.turnstile.render(el, {
          sitekey: SITE_KEY,
          callback: (t: string) => {
            token.current = t;
          },
          "expired-callback": () => {
            token.current = "";
          },
        });
      })
      .catch(() => undefined);
  }, []);

  /** De extra velden voor de body van de aanvraag. */
  const velden = useCallback(() => {
    id.current ??= nieuwId();
    return {
      aanvraag_id: id.current,
      ingevuld_ms: start.current ? Date.now() - start.current : null,
      controle,
      ...(token.current ? { turnstile: token.current } : {}),
    };
  }, [controle]);

  /** Na elke poging: een Turnstile-bewijs geldt maar één keer. Na succes ook een nieuw id. */
  const naVersturen = useCallback((gelukt: boolean) => {
    if (gelukt) id.current = null;
    if (widget.current && window.turnstile) {
      token.current = "";
      window.turnstile.reset(widget.current);
    }
  }, []);

  const extraVelden = (
    <>
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Laat dit veld leeg
          <input type="text" name="controle" tabIndex={-1} autoComplete="off" value={controle} onChange={(e) => setControle(e.target.value)} />
        </label>
      </div>
      {SITE_KEY ? <div ref={vak} className="min-h-[65px]" /> : null}
    </>
  );

  return { velden, naVersturen, extraVelden };
}
