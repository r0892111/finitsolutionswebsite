/**
 * GET /api/vsl-bron?bron=<HLS-link van Bunny Stream>  (via de redirect in netlify.toml)
 *
 * Geeft een ondertekende, tijdelijke versie van de videolink terug (Bunny's
 * token-authenticatie, "directory token" in het pad). Staat token-authenticatie
 * aan op de pull zone van de videobibliotheek, dan speelt de video alleen met
 * zo'n link: niemand kan onze video dan rechtstreeks op zijn eigen site zetten
 * en onze bandbreedte gebruiken. Het token staat in het pad, dus de playlists en
 * stukjes video die de speler daarna ophaalt, krijgen het vanzelf mee.
 *
 * De speler vraagt dit alleen als NEXT_PUBLIC_HUB_VSL_TOKEN=1 (components/hub/video.ts).
 *
 * Env: BUNNY_TOKEN_SLEUTEL = de "URL Token Authentication Key" van die pull zone
 *      (Bunny › Stream › bibliotheek › API › Pull Zone › Manage › Security › Token Authentication).
 *
 * Zelfde berekening als Bunny's eigen Node-voorbeeld
 * (github.com/BunnyWay/BunnyCDN.TokenAuthentication), zonder IP-binding:
 * een gsm wisselt onderweg van IP.
 */
import { createHmac } from "node:crypto";
import type { Handler, HandlerEvent } from "@netlify/functions";

/** 12 uur: ruim genoeg om de video met pauzes uit te kijken. */
const GELDIG = 12 * 60 * 60;
/** Bunny Stream: https://vz-….b-cdn.net/<video-id>/playlist.m3u8 */
const PLAYLIST = /^\/[0-9a-f-]{36}\/playlist\.m3u8$/i;

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify(body) };
}

/** Ondertekent de link voor de hele map van de video (playlist + alle stukjes). */
export function onderteken(link: string, sleutel: string, nu = Date.now()): string {
  const u = new URL(link);
  const map = u.pathname.slice(0, u.pathname.lastIndexOf("/") + 1);
  const expires = String(Math.floor(nu / 1000) + GELDIG);
  const token = createHmac("sha256", sleutel).update(map).update(expires).update(`token_path=${map}`).digest("base64url");
  return `${u.protocol}//${u.host}/bcdn_token=HS256-${token}&token_path=${encodeURIComponent(map)}&expires=${expires}${u.pathname}`;
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "GET") return json(405, { error: "method_not_allowed" });

  const sleutel = process.env.BUNNY_TOKEN_SLEUTEL;
  if (!sleutel) {
    console.error("vsl-bron: BUNNY_TOKEN_SLEUTEL ontbreekt");
    return json(500, { error: "not_configured" });
  }

  // Alleen een Bunny Stream-playlist ondertekenen, niets anders.
  let link: URL;
  try {
    link = new URL(event.queryStringParameters?.bron ?? "");
  } catch {
    return json(400, { error: "invalid_source" });
  }
  if (link.protocol !== "https:" || !link.hostname.endsWith(".b-cdn.net") || link.search || !PLAYLIST.test(link.pathname)) {
    return json(400, { error: "invalid_source" });
  }

  return json(200, { bron: onderteken(link.toString(), sleutel) });
};
