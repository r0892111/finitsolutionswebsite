/**
 * POST /api/vsl-meting  (via de redirect in netlify.toml)
 *
 * Hartslag van de VSL-speler op de hub: om de ±5 s, bij pauze, op het einde en
 * bij het verlaten van de pagina (sendBeacon). Eén sleutel per kijkbeurt in de
 * Netlify Blobs-store (zie lib/vsl-meting-opslag.ts); max_s gaat alleen omhoog.
 *
 *   { id, dag, video, start, verste, duur, bron, reel, apparaat, kwaliteit, hervat }
 *
 * Anoniem: het id is willekeurig en leeft alleen in het geheugen van de pagina.
 * Geen IP-adres, geen user-agent, en we loggen de inhoud niet. Of het formulier
 * daarna verstuurd werd, zet contact-submit zelf op de kijkbeurt.
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import { DAG, UUID, dagMagNieuw, kijkStore, type Kijkbeurt } from "../../lib/vsl-meting-opslag";

function leeg(statusCode: number) {
  return { statusCode, body: "" };
}

function schoon(v: unknown, max: number): string {
  return typeof v === "string" ? v.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max) : "";
}

function getal(v: unknown, max: number): number | null {
  const n = typeof v === "number" ? v : NaN;
  return Number.isFinite(n) && n >= 0 && n <= max ? Math.round(n * 10) / 10 : null;
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") return leeg(405);

  let body: Record<string, unknown>;
  try {
    const tekst = event.isBase64Encoded ? Buffer.from(event.body ?? "", "base64").toString("utf8") : event.body ?? "{}";
    body = JSON.parse(tekst) as Record<string, unknown>;
  } catch {
    return leeg(400);
  }

  const id = typeof body.id === "string" && UUID.test(body.id) ? body.id.toLowerCase() : "";
  const dag = typeof body.dag === "string" && DAG.test(body.dag) ? body.dag : "";
  const verste = getal(body.verste, 7200);
  const duur = getal(body.duur, 7200);
  const start = getal(body.start, 7200) ?? 0;
  const apparaat = body.apparaat === "gsm" ? "gsm" : body.apparaat === "desktop" ? "desktop" : null;
  const video = schoon(body.video, 40);
  if (!id || !dag || verste === null || !apparaat || !video) return leeg(400);
  // Verder dan de video lang is, kan niet (wat marge voor afronding).
  if (duur !== null && verste > duur + 2) return leeg(400);

  try {
    const store = kijkStore(event);
    const sleutel = `${dag}/${id}`;
    const oud = (await store.get(sleutel, { type: "json" })) as Kijkbeurt | null;
    if (!oud && !dagMagNieuw(dag)) return leeg(400);
    const nu = new Date().toISOString();
    const nieuw: Kijkbeurt = {
      video: oud?.video ?? video,
      start_s: oud?.start_s ?? start,
      max_s: Math.max(oud?.max_s ?? 0, verste, oud?.start_s ?? start),
      duur_s: duur ?? oud?.duur_s ?? null,
      bron: oud?.bron ?? (schoon(body.bron, 40) || "direct"),
      reel: oud?.reel ?? (schoon(body.reel, 12).toUpperCase() || null),
      apparaat: oud?.apparaat ?? apparaat,
      kwaliteit: schoon(body.kwaliteit, 10) || oud?.kwaliteit || null,
      hervat: oud?.hervat ?? body.hervat === true,
      formulier: oud?.formulier ?? false,
      start: oud?.start ?? nu,
      laatst: nu,
    };
    await store.setJSON(sleutel, nieuw);
    return leeg(204);
  } catch {
    console.error("vsl-meting: opslaan mislukt");
    return leeg(502);
  }
};
