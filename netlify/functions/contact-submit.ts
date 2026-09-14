/**
 * POST /api/contact-submit  (via de redirect in netlify.toml)
 *
 * Het contactformulier van de site. Verving de n8n-webhook
 * `website-contact-form`, die stilzwijgend was uitgevallen: de workflow
 * bestond niet meer, de front-end slikte de fout in, en elke lead verdween
 * zonder foutmelding.
 *
 * Deze functie stuurt de inzending als mail via de Brevo API en geeft een
 * echte HTTP-status terug, zodat een storing meteen zichtbaar is.
 *
 * Twee formulieren komen hier binnen: de popup "Plan een kennismaking"
 * (naam, e-mail, telefoon) en het korte vraagformulier op de contactkaart
 * (naam, e-mail, telefoon, website van het bedrijf, bericht). Het onderscheid
 * zit in het veld `bericht`. Het vraagformulier maakt alles verplicht in de
 * browser; hier blijven alleen naam en e-mail verplicht, zodat de popup blijft
 * werken. `bedrijfswebsite` is de echte website, `website` de honeypot.
 *
 * Nodige env-variabelen in Netlify:
 *   BREVO_API_KEY      (verplicht) — Brevo → SMTP & API → API Keys
 *   CONTACT_TO_EMAIL   (optioneel) — ontvanger,  standaard contact@finitsolutions.be
 *   CONTACT_FROM_EMAIL (optioneel) — afzender,   moet een geverifieerde Brevo-sender zijn
 */
import type { Handler, HandlerEvent } from "@netlify/functions";

const JSON_HEADERS = { "Content-Type": "application/json" };
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// contact@ is een gedeeld adres, zodat alle vennoten de aanvragen binnenkrijgen
// en een lead niet in één persoonlijke mailbox blijft hangen.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@finitsolutions.be";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "alex@finitsolutions.be";

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
}

function pickStr(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

// Alles wat de bezoeker intypt komt in de mail terecht; escapen houdt de
// HTML heel en voorkomt injectie in onze eigen inbox.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "method_not_allowed" });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body ?? "{}") as Record<string, unknown>;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // Honeypot: een veld dat onzichtbaar is voor mensen. Ingevuld = bot.
  // We doen alsof alles goed ging, zodat de bot niets leert.
  if (pickStr(body.website)) return json(200, { ok: true });

  const naam = pickStr(body.naam, 120);
  const email = pickStr(body.email, 200);
  const telefoon = pickStr(body.telefoonnummer, 40);
  const bedrijfswebsite = pickStr(body.bedrijfswebsite, 200);
  const bericht = pickStr(body.bericht, 3000);
  const bron = pickStr(body.bron, 300) || "onbekend";

  if (!naam) return json(400, { error: "missing_naam" });
  if (!EMAIL_RE.test(email)) return json(400, { error: "invalid_email" });

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("contact-submit: BREVO_API_KEY ontbreekt");
    return json(500, { error: "mail_not_configured" });
  }

  const rijen: Array<[string, string]> = [
    ["Naam", naam],
    ["E-mail", email],
    ["Telefoon", telefoon || "—"],
    ["Website", bedrijfswebsite || "—"],
    ["Pagina", bron],
  ];

  const isVraag = bericht.length > 0;
  const titel = isVraag ? "Nieuwe vraag via de website" : "Nieuwe aanvraag via de website";
  const onderwerp = isVraag ? `Nieuwe vraag: ${naam}` : `Nieuwe aanvraag: ${naam}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1A2D63">
      <h2 style="margin:0 0 16px">${titel}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-size:15px">
        ${rijen
          .map(
            ([k, v]) =>
              `<tr><td style="color:#6C7590">${k}</td><td><strong>${esc(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      ${
        isVraag
          ? `<p style="margin:20px 0 6px;color:#6C7590">Vraag</p>
      <p style="margin:0;white-space:pre-wrap;font-size:15px">${esc(bericht)}</p>`
          : ""
      }
    </div>`;

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Finit website", email: FROM_EMAIL },
        to: [{ email: TO_EMAIL }],
        // Antwoorden gaat rechtstreeks naar de lead.
        replyTo: { email, name: naam },
        subject: onderwerp,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("contact-submit: Brevo gaf", res.status, detail.slice(0, 500));
      return json(502, { error: "mail_failed", status: res.status });
    }
  } catch (err) {
    console.error("contact-submit: netwerkfout", err);
    return json(502, { error: "mail_failed" });
  }

  return json(200, { ok: true });
};
