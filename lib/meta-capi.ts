/**
 * Eén "Lead" naar Meta via de Conversions API, vanaf de server (contact-submit en
 * cursus-aanvraag). Zo telt Meta een aanvraag ook als de pixel in de browser niet laadde
 * (adblocker, Safari). De pixel zelf zit in Google Tag Manager, niet hier.
 *
 * Staat standaard uit. Er vertrekt alleen iets als:
 * - META_PIXEL_ID en META_CAPI_TOKEN allebei in Netlify staan, en
 * - de bezoeker toestemming gaf voor marketingcookies (`toestemming_marketing: true`).
 *
 * Het event_id is hetzelfde als in `form_submitted` in de browser (het aanvraag_id van het
 * formulier), zodat Meta de pixel en de server als één aanvraag telt.
 *
 * E-mail en telefoon gaan alleen versleuteld mee (SHA-256, zoals Meta het vraagt), nooit leesbaar.
 * Mislukt Meta, dan gebeurt er niets met de aanvraag: we loggen alleen de status, zonder
 * persoonsgegevens en zonder sleutel.
 *
 * Env in Netlify:
 *   META_PIXEL_ID, META_CAPI_TOKEN (samen, anders staat het uit). De sleutel nooit loggen.
 *   META_GRAPH_VERSIE    (optioneel) standaard v27.0, de nieuwste versie op 26/11/2026
 *                        (developers.facebook.com/docs/graph-api/changelog: v27.0 sinds 4/11/2026)
 *   META_TEST_EVENT_CODE (optioneel) om te testen in Events Manager › Testgebeurtenissen
 */
import { createHash } from "node:crypto";

const STANDAARD_VERSIE = "v27.0";
const TIMEOUT_MS = 3000;

function tekst(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function sha256(v: string): string {
  return createHash("sha256").update(v).digest("hex");
}

/** Alleen cijfers, met landcode: een Belgisch nummer dat met 0 begint, krijgt 32 ervoor. */
function telefoonVoorMeta(t: string): string {
  let cijfers = t.replace(/\D/g, "");
  if (cijfers.startsWith("00")) cijfers = cijfers.slice(2);
  else if (cijfers.startsWith("0")) cijfers = `32${cijfers.slice(1)}`;
  return cijfers.length >= 8 ? cijfers : "";
}

interface Aanvraag {
  /** De body van het formulier: event_id, toestemming_marketing, fbp, fbc. */
  body: Record<string, unknown>;
  req: Request;
  /** context.ip van Netlify, als die er is. */
  ip?: string;
  email: string;
  telefoon: string;
  /** De pagina van de aanvraag (de eerste link van het bezoek). */
  pagina: string;
  /** Voor de logs: welke functie. */
  bron: string;
}

/** Stuurt de Lead, of doet niets. Gooit nooit een fout. */
export async function stuurMetaLead(a: Aanvraag): Promise<void> {
  const pixel = (process.env.META_PIXEL_ID ?? "").trim();
  const token = (process.env.META_CAPI_TOKEN ?? "").trim();
  if (!pixel || !token || a.body.toestemming_marketing !== true) return;
  const eventId = tekst(a.body.event_id, 64) || tekst(a.body.aanvraag_id, 64);
  if (!eventId || !a.email) return;

  const userData: Record<string, unknown> = { em: [sha256(a.email.trim().toLowerCase())] };
  const ph = telefoonVoorMeta(a.telefoon);
  if (ph) userData.ph = [sha256(ph)];
  const fbp = tekst(a.body.fbp, 255);
  if (/^fb\.\d\.\d+\.\d+$/.test(fbp)) userData.fbp = fbp;
  const fbc = tekst(a.body.fbc, 600);
  if (/^fb\.\d\.\d+\.[A-Za-z0-9_-]+$/.test(fbc)) userData.fbc = fbc;
  const ip =
    a.ip ||
    a.req.headers.get("x-nf-client-connection-ip") ||
    (a.req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (ip) userData.client_ip_address = ip;
  const ua = tekst(a.req.headers.get("user-agent"), 500);
  if (ua) userData.client_user_agent = ua;

  const gevraagd = (process.env.META_GRAPH_VERSIE ?? "").trim().replace(/^(?=\d)/, "v");
  const versie = /^v\d+\.\d+$/.test(gevraagd) ? gevraagd : STANDAARD_VERSIE;
  const test = (process.env.META_TEST_EVENT_CODE ?? "").trim();
  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    ...(/^https?:\/\//i.test(a.pagina) ? { event_source_url: a.pagina } : {}),
    user_data: userData,
  };

  const timer = new AbortController();
  const timeout = setTimeout(() => timer.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`https://graph.facebook.com/${versie}/${encodeURIComponent(pixel)}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: timer.signal,
      body: JSON.stringify({ data: [event], access_token: token, ...(test ? { test_event_code: test } : {}) }),
    });
    if (!res.ok) {
      // Alleen de foutcode van Meta, geen tekst: daar kan een veld van de aanvraag in staan.
      const fout = (await res.json().catch(() => null)) as { error?: { code?: unknown; error_subcode?: unknown } } | null;
      console.error(`${a.bron}: Meta Lead mislukt (status ${res.status}, code ${String(fout?.error?.code ?? "?")}/${String(fout?.error?.error_subcode ?? "-")})`);
    }
  } catch (err) {
    console.error(`${a.bron}: Meta Lead mislukt`, err instanceof Error ? err.name : "onbekende fout");
  } finally {
    clearTimeout(timeout);
  }
}
