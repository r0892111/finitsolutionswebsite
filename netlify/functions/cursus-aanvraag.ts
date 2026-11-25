/**
 * POST /api/cursus-aanvraag  (via de redirect in netlify.toml)
 *
 * Het formulier "Inschrijven" op /cursus/: daarna belt Luka om de inschrijving voor de
 * cursus op Skool rond te maken. Werkt zoals het hubformulier in contact-submit.ts:
 *
 * 0. de wacht (lib/formulier-wacht.ts): Origin, honeypot, invultijd, Turnstile, dubbels, teller;
 * 1. een item in Tuesday op het bord Leads › Socials, in de cursusgroep (vast id, lib/cursus-aanvraag.ts),
 *    met dezelfde kolommen als de hubleads (zodat ook de automatische PAPI erop loopt);
 * 2. de kijkbeurt van de VSL krijgt "formulier verstuurd";
 * 3. staat de lead in Tuesday: meteen 200 voor de bezoeker. Daarna, op de achtergrond,
 *    het PAPI-seintje (hooguit één per e-mailadres per dag) en de mail naar contact@;
 * 4. mislukt Tuesday: de mail is het vangnet en vertrekt eerst. Mislukt die ook, dan 502
 *    en mag de bezoeker opnieuw proberen met hetzelfde aanvraag_id.
 *
 * Naam, e-mail, telefoon en website zijn verplicht (Alex, 25/11). Geen monday: de
 * cursusleads leven alleen in Tuesday. Nieuwe functievorm (export default), voor de
 * verse teller in Netlify Blobs en voor waitUntil.
 *
 * Env (dezelfde als contact-submit): BREVO_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL,
 * CRM_API_TOKEN of CRM_SOCIALS_TOKEN, PAPI_GITHUB_TOKEN en TURNSTILE_SECRET_KEY (optioneel). Nooit loggen.
 */
import type { Context } from "@netlify/functions";
import { EMAIL_RE, telefoonOk } from "../../lib/contact-velden";
import { CURSUS_GROEP, domein, websiteOk } from "../../lib/cursus-aanvraag";
import { markeerFormulier } from "../../lib/vsl-meting-opslag";
import { naarTuesday, TUESDAY } from "../../lib/tuesday";
import { papiSeintje } from "../../lib/papi";
import { aanvraagId, eenRegel, papiMagVandaag, vergeet, wacht } from "../../lib/formulier-wacht";
import { esc, mailNaarContact, papiRegel } from "../../lib/brevo-mail";
import { CURSUS } from "../../components/cursus/copy";

const JSON_HEADERS = { "Content-Type": "application/json" };

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

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function tekst(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

// Een keuzeveld mag alleen een antwoord uit de vaste lijst op de pagina zijn; anders leeg.
function keuze(v: unknown, vraagId: string): string {
  const t = tekst(v, 120);
  const vraag = CURSUS.formulier.vragen.find((q) => q.id === vraagId);
  return vraag && "opties" in vraag && (vraag.opties as readonly string[]).includes(t) ? t : "";
}

function slug(v: unknown, max: number): string {
  return typeof v === "string" ? v.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max) : "";
}

export default async (req: Request, context: Context): Promise<Response> => {
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  let body: Record<string, unknown>;
  try {
    const b: unknown = await req.json();
    if (!b || typeof b !== "object" || Array.isArray(b)) return json(400, { error: "invalid_json" });
    body = b as Record<string, unknown>;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const naam = eenRegel(tekst(body.naam, 120));
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
  const rol = keuze(c.rol, "rol");
  const grootte = keuze(c.grootte, "grootte");
  const ai = keuze(c.ai, "ai");
  const eerst = tekst(c.eerst, 3000);
  const paginaVeld = tekst(c.pagina, 500);
  const pagina = /^https?:\/\//i.test(paginaVeld) ? paginaVeld : "https://finitsolutions.be/cursus/";
  const k = c.kijkbeurt as Record<string, unknown> | null | undefined;
  const kijkbeurt = k && typeof k.id === "string" && typeof k.dag === "string" ? { id: k.id, dag: k.dag } : null;

  // Bots, vreemde sites, dubbels en een vloed stoppen hier (zie lib/formulier-wacht.ts).
  const stop = await wacht(req, context.ip, body, "cursus-aanvraag");
  if (stop) return stop;
  const id = aanvraagId(body);

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
    ? markeerFormulier(kijkbeurt.id, kijkbeurt.dag).catch(() => console.error("cursus-aanvraag: kijkbeurt niet bijgewerkt"))
    : Promise.resolve();
  const [tuesday] = await Promise.all([tuesdayBelofte, kijkBelofte]);

  // Geen groepsnaam in de mail: die mag in Tuesday vrij veranderen.
  const plek = "het bord Socials, in de cursusgroep";
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
  const html = (extra = "") => `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1A2D63">
      <h2 style="margin:0 0 4px">Nieuwe aanvraag voor de cursus</h2>
      <p style="margin:0 0 16px;color:#6C7590">Wil een gesprek van 30 minuten over de cursus op Skool.</p>
      <table cellpadding="6" style="border-collapse:collapse;font-size:15px">
        ${rijen.map(([k2, v]) => `<tr><td style="color:#6C7590">${k2}</td><td><strong>${esc(v)}</strong></td></tr>`).join("")}
      </table>
      ${eerst ? `<p style="margin:20px 0 6px;color:#6C7590">Wil als eerste</p><p style="margin:0;white-space:pre-wrap;font-size:15px">${esc(eerst)}</p>` : ""}
      ${tuesdayRegel}
      ${extra}
    </div>`;
  const mail = (extra = "") =>
    mailNaarContact({ onderwerp: `Nieuwe cursusaanvraag: ${naam}`, html: html(extra), antwoordAan: { email, naam } }, "cursus-aanvraag");

  if (tuesday === "ok") {
    // De lead staat veilig in Tuesday: de bezoeker hoeft niet te wachten op GitHub of Brevo.
    // Pas na "ok" het seintje, anders vindt de automaat de lead nog niet.
    context.waitUntil(
      (async () => {
        const papi = (await papiMagVandaag(email)) ? await papiSeintje("cursus-aanvraag") : "overgeslagen";
        await mail(papiRegel(papi));
      })()
    );
    return json(200, { ok: true, tuesday });
  }

  // Geen Tuesday: de mail is het vangnet. Mislukt die ook, dan mag de bezoeker opnieuw.
  if (!(await mail())) {
    await vergeet(id);
    return json(502, { error: "mail_failed" });
  }
  return json(200, { ok: true, tuesday });
};
