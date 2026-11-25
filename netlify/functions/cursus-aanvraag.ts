/**
 * POST /api/cursus-aanvraag  (via de redirect in netlify.toml)
 *
 * Het formulier op /cursus/: iemand wil een gesprek van 30 minuten met Luka over
 * de cursus op Skool. Werkt zoals het hubformulier in contact-submit.ts:
 *
 * 1. een item in Tuesday op het bord Leads › Socials, in de groep "Cursus (Skool)",
 *    met dezelfde kolommen als de hubleads (zodat ook de automatische PAPI erop loopt);
 * 2. de kijkbeurt van de VSL krijgt "formulier verstuurd";
 * 3. een mail naar contact@ via Brevo, met een regel over Tuesday;
 * 4. staat de lead in Tuesday, een seintje aan de PAPI-automaat (lib/papi.ts), tegelijk met de mail.
 *
 * Mislukt Tuesday, dan vertrekt de mail toch, met de vraag het item manueel te maken.
 * Naam, e-mail, telefoon en website zijn verplicht (Alex, 25/11). Geen monday: de
 * cursusleads leven alleen in Tuesday.
 *
 * Env (dezelfde als contact-submit): BREVO_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL,
 * CRM_API_TOKEN of CRM_SOCIALS_TOKEN, en PAPI_GITHUB_TOKEN (optioneel). Nooit loggen.
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import { EMAIL_RE, telefoonOk } from "../../lib/contact-velden";
import { CURSUS_GROEP, domein, websiteOk } from "../../lib/cursus-aanvraag";
import { markeerFormulier } from "../../lib/vsl-meting-opslag";
import { naarTuesday, TUESDAY } from "../../lib/tuesday";
import { papiSeintje } from "../../lib/papi";

const JSON_HEADERS = { "Content-Type": "application/json" };
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@finitsolutions.be";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "alex@finitsolutions.be";

// ?bron= of utm_source uit de link naar het label van de keuzelijst "Source" in Tuesday.
const KANALEN: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  ig: "Instagram",
  youtube: "YouTube",
  yt: "YouTube",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  fb: "Facebook",
  meta: "Facebook",
  x: "X",
  twitter: "X",
  threads: "Threads",
};

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
}

function tekst(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function slug(v: unknown, max: number): string {
  return typeof v === "string" ? v.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max) : "";
}

// Alles wat de bezoeker intypt komt in de mail terecht: escapen houdt de HTML heel.
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

  // Honeypot: ingevuld = bot. We doen alsof alles goed ging.
  if (tekst(body.website)) return json(200, { ok: true });

  const naam = tekst(body.naam, 120);
  const email = tekst(body.email, 200);
  const telefoon = tekst(body.telefoonnummer, 40);
  const website = tekst(body.bedrijfswebsite, 200);
  if (naam.length < 2) return json(400, { error: "missing_naam" });
  if (!EMAIL_RE.test(email)) return json(400, { error: "invalid_email" });
  if (!telefoonOk(telefoon)) return json(400, { error: "invalid_telefoon" });
  if (!websiteOk(website)) return json(400, { error: "invalid_website" });

  const c = (body.cursus && typeof body.cursus === "object" ? body.cursus : {}) as Record<string, unknown>;
  const kanaal = slug(c.kanaal, 40);
  const reel = slug(c.reel, 12).toUpperCase();
  const vslProcent = typeof c.vsl_procent === "number" && Number.isFinite(c.vsl_procent) ? Math.round(Math.min(100, Math.max(0, c.vsl_procent))) : 0;
  const vslTekst = tekst(c.vsl_tekst, 80);
  const rol = tekst(c.rol, 120);
  const grootte = tekst(c.grootte, 120);
  const ai = tekst(c.ai, 120);
  const eerst = tekst(c.eerst, 3000);
  const paginaVeld = tekst(c.pagina, 500);
  const pagina = /^https?:\/\//i.test(paginaVeld) ? paginaVeld : "https://finitsolutions.be/cursus/";
  const k = c.kijkbeurt as Record<string, unknown> | null | undefined;
  const kijkbeurt = k && typeof k.id === "string" && typeof k.dag === "string" ? { id: k.id, dag: k.dag } : null;

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("cursus-aanvraag: BREVO_API_KEY ontbreekt");
    return json(500, { error: "mail_not_configured" });
  }

  // Tuesday: dezelfde kolommen als de hubleads (contact-submit), in de eigen groep.
  const siteUrl = /^https?:\/\//i.test(website) ? website : `https://${website}`;
  const bericht = [eerst, ai ? `AI vandaag: ${ai}` : ""].filter(Boolean).join("\n\n");
  const values: Record<string, string | number> = {
    status: "New lead 0%",
    bron: !kanaal || kanaal === "direct" ? "Website" : KANALEN[kanaal] ?? "Other",
    vsl_procent: vslProcent,
    contact_name: naam,
    email,
    phone: telefoon,
    website: siteUrl,
    pagina,
  };
  if (reel) values.reel = reel;
  if (rol) values.contact_role = rol;
  if (grootte) values.grootte = grootte;
  if (bericht) values.message = bericht;
  const tuesdayBelofte = naarTuesday(TUESDAY.socials, { name: domein(website) || naam, group_id: CURSUS_GROEP, values }, "cursus-aanvraag");
  const kijkBelofte = kijkbeurt
    ? markeerFormulier(event, kijkbeurt.id, kijkbeurt.dag).catch(() => console.error("cursus-aanvraag: kijkbeurt niet bijgewerkt"))
    : Promise.resolve();
  const [tuesday] = await Promise.all([tuesdayBelofte, kijkBelofte]);
  // Pas na "ok": anders vindt de automaat de lead nog niet. Loopt naast de mail, zodat de bezoeker niet langer wacht.
  const papiBelofte = tuesday === "ok" ? papiSeintje("cursus-aanvraag") : Promise.resolve();

  const plek = `het bord Socials, groep ${CURSUS_GROEP}`;
  const tuesdayRegel =
    tuesday === "ok"
      ? `<p style="margin:16px 0 0;font-size:14px;color:#6C7590">Tuesday: item op ${plek}.</p>`
      : tuesday === "failed"
        ? `<p style="margin:16px 0 0;font-size:14px;color:#b45309">Tuesday: item aanmaken mislukt, voeg deze manueel toe op ${plek}.</p>`
        : "";

  const rijen: Array<[string, string]> = [
    ["Naam", naam],
    ["E-mail", email],
    ["Telefoon", telefoon],
    ["Website", website],
    ["Rol", rol || "—"],
    ["Aantal mensen", grootte || "—"],
    ["AI vandaag", ai || "—"],
    ["VSL", vslTekst || `${vslProcent} %`],
    ["Pagina", pagina],
  ];
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1A2D63">
      <h2 style="margin:0 0 4px">Nieuwe aanvraag voor de cursus</h2>
      <p style="margin:0 0 16px;color:#6C7590">Wil een gesprek van 30 minuten over de cursus op Skool.</p>
      <table cellpadding="6" style="border-collapse:collapse;font-size:15px">
        ${rijen.map(([k2, v]) => `<tr><td style="color:#6C7590">${k2}</td><td><strong>${esc(v)}</strong></td></tr>`).join("")}
      </table>
      ${eerst ? `<p style="margin:20px 0 6px;color:#6C7590">Wil als eerste</p><p style="margin:0;white-space:pre-wrap;font-size:15px">${esc(eerst)}</p>` : ""}
      ${tuesdayRegel}
    </div>`;

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "Finit website", email: FROM_EMAIL },
        to: [{ email: TO_EMAIL }],
        replyTo: { email, name: naam },
        subject: `Nieuwe cursusaanvraag: ${naam}`,
        htmlContent: html,
      }),
    });
    if (!res.ok) {
      console.error("cursus-aanvraag: Brevo gaf", res.status);
      await papiBelofte;
      return json(502, { error: "mail_failed", status: res.status });
    }
  } catch (err) {
    console.error("cursus-aanvraag: netwerkfout", err instanceof Error ? err.name : "");
    await papiBelofte;
    return json(502, { error: "mail_failed" });
  }
  // Een functie mag niet antwoorden voor het seintje weg is (daarna kan ze bevriezen).
  await papiBelofte;

  return json(200, { ok: true, tuesday });
};
