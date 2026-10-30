/**
 * POST /api/sollicitatie-submit  (via de redirect in netlify.toml)
 *
 * Het sollicitatieformulier op /vacatures. Zelfde weg als het contactformulier
 * (contact-submit.ts): een mail via de Brevo API naar dezelfde inbox, met een
 * echte HTTP-status terug zodat een storing zichtbaar is. Geen monday: een
 * sollicitatie is geen lead.
 *
 * De lijst met vacatures en wie ervoor mag solliciteren komt uit
 * lib/vacatures.ts, dezelfde lijst als op de pagina. Bestanden (portfolio, cv)
 * komen als base64 binnen en gaan als bijlage mee in de mail; ze worden nergens
 * anders bewaard. Grenzen in BIJLAGEN (lib/vacatures.ts).
 *
 * Env-variabelen in Netlify (dezelfde als het contactformulier):
 *   BREVO_API_KEY         (verplicht)
 *   SOLLICITATIE_TO_EMAIL (optioneel) — eigen ontvanger voor sollicitaties
 *   CONTACT_TO_EMAIL      (optioneel) — anders deze, standaard contact@finitsolutions.be
 *   CONTACT_FROM_EMAIL    (optioneel) — afzender, moet een geverifieerde Brevo-sender zijn
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import { BIJLAGEN, extensie, isStudent, PROFIELEN, vindVacature, type Profiel } from "../../lib/vacatures";

const JSON_HEADERS = { "Content-Type": "application/json" };
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TO_EMAIL =
  process.env.SOLLICITATIE_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "contact@finitsolutions.be";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "alex@finitsolutions.be";

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
}

function pickStr(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const BASE64_RE = /^[A-Za-z0-9+/]+={0,2}$/;

interface Bijlage {
  name: string;
  content: string;
}

/** Controleert de bestanden: aantal, soort en grootte. Geeft null terug als iets niet klopt. */
function leesBijlagen(v: unknown): Bijlage[] | null {
  if (v === undefined || v === null) return [];
  if (!Array.isArray(v) || v.length > BIJLAGEN.maxBestanden) return null;
  let totaal = 0;
  const uit: Bijlage[] = [];
  for (const item of v) {
    const b = item as Record<string, unknown>;
    // Alleen een veilige bestandsnaam: geen mappen, geen vreemde tekens.
    const naam = pickStr(b?.naam, 120).replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_");
    const inhoud = typeof b?.inhoud === "string" ? b.inhoud : "";
    if (!naam || !inhoud || !BIJLAGEN.extensies.includes(extensie(naam)) || !BASE64_RE.test(inhoud)) return null;
    totaal += Math.floor((inhoud.length * 3) / 4);
    if (totaal > BIJLAGEN.maxBytes) return null;
    const ext = extensie(naam);
    uit.push({ name: `${naam.slice(0, -ext.length)}${ext}`, content: inhoud });
  }
  return uit;
}

/** Een link naar werk: alleen http(s), en zonder https:// ervoor zetten we het er zelf voor. */
function leesLink(v: unknown): string {
  const s = pickStr(v, 500);
  if (!s) return "";
  const metSchema = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(metSchema);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : "";
  } catch {
    return "";
  }
}

// Alles wat de bezoeker intypt komt in de mail; escapen houdt de HTML heel.
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") return json(405, { error: "method_not_allowed" });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body ?? "{}") as Record<string, unknown>;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // Honeypot ingevuld = bot. Doen alsof alles goed ging.
  if (pickStr(body.website)) return json(200, { ok: true });

  const vacature = vindVacature(pickStr(body.vacature, 40));
  const profiel = pickStr(body.profiel, 20) as Profiel;
  const naam = pickStr(body.naam, 120);
  const email = pickStr(body.email, 200);
  const telefoon = pickStr(body.telefoon, 40);
  const studierichting = pickStr(body.studierichting, 150);
  const studiejaar = pickStr(body.studiejaar, 60);
  const motivatie = pickStr(body.motivatie, 6000);
  const link = leesLink(body.link);
  const bijlagen = leesBijlagen(body.bijlagen);
  const bron = pickStr(body.bron, 300) || "onbekend";

  if (!vacature) return json(400, { error: "invalid_vacature" });
  if (!vacature.profielen.includes(profiel)) return json(400, { error: "invalid_profiel" });
  if (!naam) return json(400, { error: "missing_naam" });
  if (!EMAIL_RE.test(email)) return json(400, { error: "invalid_email" });
  if (!telefoon) return json(400, { error: "missing_telefoon" });
  if (!motivatie) return json(400, { error: "missing_motivatie" });
  if (isStudent(profiel) && (!studierichting || !studiejaar)) return json(400, { error: "missing_studie" });
  if (body.toestemming !== true) return json(400, { error: "missing_toestemming" });
  if (bijlagen === null) return json(400, { error: "invalid_bijlagen" });

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("sollicitatie-submit: BREVO_API_KEY ontbreekt");
    return json(500, { error: "mail_not_configured" });
  }

  const nu = new Date().toLocaleString("nl-BE", { timeZone: "Europe/Brussels" });
  const rijen: Array<[string, string]> = [
    ["Vacature", vacature.titel],
    ["Ik ben een", PROFIELEN[profiel]],
    ["Naam", naam],
    ["E-mail", email],
    ["Telefoon", telefoon],
    ...(isStudent(profiel)
      ? ([
          ["Studierichting", studierichting],
          ["Studiejaar", studiejaar],
        ] as Array<[string, string]>)
      : []),
    ["Link naar werk", link || "—"],
    ["Bijlagen", bijlagen.length ? bijlagen.map((b) => b.name).join(", ") : "geen"],
    ["Pagina", bron],
    ["Privacy", `toestemming gegeven op ${nu}`],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1A2D63">
      <h2 style="margin:0 0 16px">Nieuwe sollicitatie via de website</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-size:15px">
        ${rijen
          .map(([k, v]) => {
            const waarde = k === "Link naar werk" && link ? `<a href="${esc(link)}" style="color:#1A2D63">${esc(link)}</a>` : esc(v);
            return `<tr><td style="color:#6C7590">${k}</td><td><strong>${waarde}</strong></td></tr>`;
          })
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#6C7590">Over zichzelf</p>
      <p style="margin:0;white-space:pre-wrap;font-size:15px">${esc(motivatie)}</p>
    </div>`;

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "Finit website", email: FROM_EMAIL },
        to: [{ email: TO_EMAIL }],
        // Antwoorden gaat rechtstreeks naar de kandidaat.
        replyTo: { email, name: naam },
        subject: `Sollicitatie: ${vacature.titel} – ${naam}`,
        htmlContent: html,
        ...(bijlagen.length ? { attachment: bijlagen } : {}),
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("sollicitatie-submit: Brevo gaf", res.status, detail.slice(0, 500));
      return json(502, { error: "mail_failed", status: res.status });
    }
  } catch (err) {
    console.error("sollicitatie-submit: netwerkfout", err);
    return json(502, { error: "mail_failed" });
  }

  return json(200, { ok: true });
};
