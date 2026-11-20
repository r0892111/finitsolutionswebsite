/**
 * Eigen, anonieme kijkmeting van de VSL (wens Alex, 20/11). Geen cookie, geen
 * localStorage: per kijkbeurt een willekeurig id dat alleen in het geheugen van
 * deze pagina leeft. Om de ±5 s, bij pauze, op het einde en bij het verlaten van
 * de pagina gaat er een hartslag naar /api/vsl-meting.
 *
 * Het formulier leest hier hoe ver de kijker kwam ("VSL bekeken tot 63 %") en
 * meldt na het versturen dat deze kijkbeurt tot een aanvraag leidde.
 */
import { VSL } from "./video";

const URL_METING = "/api/vsl-meting";
const ELKE_MS = 5000;

interface Kijkbeurt {
  id: string;
  start: number;
  verste: number;
  duur: number | null;
  hervat: boolean;
  kwaliteit: string;
  bron: string;
  reel: string;
  apparaat: "gsm" | "desktop";
  laatstVerstuurd: number;
  verstuurdTot: number;
}

let huidige: Kijkbeurt | null = null;
let luistert = false;

function nieuwId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function apparaat(): "gsm" | "desktop" {
  return window.matchMedia("(max-width: 767px), (pointer: coarse) and (max-width: 1024px)").matches ? "gsm" : "desktop";
}

function stuur(viaBaken = false) {
  const k = huidige;
  if (!k) return;
  k.laatstVerstuurd = Date.now();
  k.verstuurdTot = k.verste;
  const body = JSON.stringify({
    t: "hartslag",
    id: k.id,
    video: VSL.id,
    start: k.start,
    verste: k.verste,
    duur: k.duur,
    bron: k.bron,
    reel: k.reel,
    apparaat: k.apparaat,
    kwaliteit: k.kwaliteit,
    hervat: k.hervat,
  });
  try {
    if (viaBaken && navigator.sendBeacon) {
      navigator.sendBeacon(URL_METING, new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch(URL_METING, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => undefined);
  } catch {
    /* meten mag nooit iets breken */
  }
}

function opWeg() {
  if (huidige && huidige.verste > huidige.verstuurdTot) stuur(true);
}

/** Een nieuwe kijkbeurt: bij afspelen vanaf het begin, verder kijken of opnieuw beginnen. */
export function startKijkbeurt(o: { start: number; hervat: boolean; bron: string; reel: string; kwaliteit: string }) {
  if (huidige && huidige.verste > huidige.verstuurdTot) stuur();
  huidige = {
    id: nieuwId(),
    start: Math.max(0, o.start),
    verste: Math.max(0, o.start),
    duur: null,
    hervat: o.hervat,
    kwaliteit: o.kwaliteit,
    bron: o.bron,
    reel: o.reel,
    apparaat: apparaat(),
    laatstVerstuurd: 0,
    verstuurdTot: -1,
  };
  if (!luistert) {
    luistert = true;
    window.addEventListener("pagehide", opWeg);
    document.addEventListener("visibilitychange", () => document.visibilityState === "hidden" && opWeg());
  }
  stuur();
}

/** Bij elke tijdsupdate van de video. Stuurt zelf om de ±5 s. */
export function meetTijd(seconde: number, duur: number, kwaliteit: string) {
  const k = huidige;
  if (!k || !Number.isFinite(duur) || duur <= 0) return;
  k.duur = Math.round(duur * 10) / 10;
  k.verste = Math.min(k.duur, Math.max(k.verste, Math.round(seconde * 10) / 10));
  k.kwaliteit = kwaliteit;
  if (Date.now() - k.laatstVerstuurd >= ELKE_MS) stuur();
}

/** Bij pauze en op het einde: meteen versturen. */
export function stuurKijkbeurt() {
  if (huidige && huidige.verste > huidige.verstuurdTot) stuur();
}

/** Hoe ver deze kijker kwam in dit bezoek, in procent (null = niet gekeken). */
export function kijkProcent(): number | null {
  const k = huidige;
  if (!k || !k.duur) return null;
  return Math.min(100, Math.round((100 * k.verste) / k.duur));
}

/** Na een verstuurd formulier: deze kijkbeurt leidde tot een aanvraag. */
export function meldFormulier() {
  const k = huidige;
  if (!k) return;
  stuurKijkbeurt();
  try {
    void fetch(URL_METING, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t: "formulier", id: k.id }),
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* idem */
  }
}
