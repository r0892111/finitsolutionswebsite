/**
 * POST /api/vsl-meting  (via de redirect in netlify.toml)
 *
 * Hartslag van de VSL-speler op de hub: om de ±5 s, bij pauze, op het einde en
 * bij het verlaten van de pagina (sendBeacon). Eén rij per kijkbeurt in
 * hub_vsl_kijkbeurten, de verste seconde gaat alleen omhoog.
 *
 *   { t: "hartslag", id, video, start, verste, duur, bron, reel, apparaat, kwaliteit, hervat }
 *   { t: "formulier", id }   na een verstuurd formulier in hetzelfde bezoek
 *
 * Anoniem: het id is willekeurig en leeft alleen in het geheugen van de pagina.
 * We bewaren geen IP-adres en geen user-agent, en loggen de inhoud niet.
 * Staat de database nog niet ingesteld (zie lib/vsl-meting-db.ts), dan antwoorden
 * we gewoon 202: de speler mag hier nooit last van hebben.
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import { koppen, metingDb } from "../../lib/vsl-meting-db";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
  if (!id) return leeg(400);

  const db = metingDb();
  if (!db) return leeg(202);

  try {
    if (body.t === "formulier") {
      const res = await fetch(`${db.url}/rest/v1/hub_vsl_kijkbeurten?id=eq.${id}`, {
        method: "PATCH",
        headers: koppen(db, { Prefer: "return=minimal" }),
        body: JSON.stringify({ formulier_verstuurd: true, bijgewerkt_op: new Date().toISOString() }),
      });
      return leeg(res.ok ? 204 : 502);
    }

    const duur = getal(body.duur, 7200);
    const start = getal(body.start, 7200) ?? 0;
    const verste = getal(body.verste, 7200);
    const apparaat = body.apparaat === "gsm" ? "gsm" : body.apparaat === "desktop" ? "desktop" : "";
    const video = schoon(body.video, 40);
    if (verste === null || !apparaat || !video) return leeg(400);
    // Verder dan de video lang is, kan niet (een paar tienden marge voor afronding).
    if (duur !== null && verste > duur + 2) return leeg(400);

    const res = await fetch(`${db.url}/rest/v1/rpc/hub_vsl_hartslag`, {
      method: "POST",
      headers: koppen(db),
      body: JSON.stringify({
        p_id: id,
        p_video: video,
        p_start: start,
        p_verste: verste,
        p_duur: duur,
        p_bron: schoon(body.bron, 40) || "direct",
        p_reel: schoon(body.reel, 12).toUpperCase() || null,
        p_apparaat: apparaat,
        p_kwaliteit: schoon(body.kwaliteit, 10) || null,
        p_hervat: body.hervat === true,
      }),
    });
    if (!res.ok) console.error("vsl-meting: database gaf", res.status);
    return leeg(res.ok ? 204 : 502);
  } catch {
    console.error("vsl-meting: netwerkfout naar de database");
    return leeg(502);
  }
};
