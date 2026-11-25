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
 * Staan de MONDAY_*-variabelen ingesteld, dan wordt de inzending eerst als
 * item op het leadsbord in monday.com gezet (zie lib/monday/create-item.ts)
 * en krijgt de mail een link naar dat item. Mislukt monday, dan vertrekt de
 * mail toch, met de melding dat de lead manueel moet worden toegevoegd. De
 * mail blijft dus het vangnet.
 *
 * Elke aanvraag gaat daarnaast naar Tuesday (lib/tuesday.ts). Die van het
 * hubformulier (/hub/, met het veld `hub`) als item op het bord Leads › Socials,
 * met het kanaal, de reel en hoe ver de VSL bekeken werd; de kijkbeurt van de
 * VSL-meting krijgt dan "formulier verstuurd". Alle andere (popup, vraagformulier)
 * via Jords route /api/intake/website-lead naar het bord Content. Mislukt Tuesday,
 * dan vertrekken mail en monday gewoon; de fout wordt gelogd zonder
 * persoonsgegevens en zonder sleutel.
 *
 * Sinds 25/11 (veiligheidsronde): eerst de wacht (lib/formulier-wacht.ts: Origin, honeypot,
 * invultijd, Turnstile, dubbels via aanvraag_id, hooguit 5 per IP per uur). Staat de lead
 * in Tuesday, dan krijgt de bezoeker meteen 200 en lopen monday, het PAPI-seintje (hooguit
 * één per e-mailadres per dag) en de mail op de achtergrond (waitUntil). Mislukt Tuesday,
 * dan is de mail het vangnet en vertrekt ze eerst; mislukt die ook, dan 502 en mag de
 * bezoeker opnieuw met hetzelfde aanvraag_id. Nieuwe functievorm (export default).
 *
 * Nodige env-variabelen in Netlify:
 *   BREVO_API_KEY      (verplicht) — Brevo → SMTP & API → API Keys
 *   CONTACT_TO_EMAIL   (optioneel) — ontvanger,  standaard contact@finitsolutions.be
 *   CONTACT_FROM_EMAIL (optioneel) — afzender,   moet een geverifieerde Brevo-sender zijn
 *   MONDAY_API_TOKEN, MONDAY_BOARD_ID (optioneel, samen) — monday.com
 *   MONDAY_GROUP_ID, MONDAY_COL_*, MONDAY_STATUS_LABEL (optioneel) — zie lib/monday/create-item.ts
 *   CRM_API_TOKEN of CRM_SOCIALS_TOKEN (optioneel) — sleutel voor Tuesday. Nooit loggen.
 *   PAPI_GITHUB_TOKEN, TURNSTILE_SECRET_KEY (optioneel) — zie lib/papi.ts en lib/formulier-wacht.ts
 */
import type { Context } from "@netlify/functions";
import { createMondayItem, mondayConfigFromEnv } from "../../lib/monday/create-item";
import { EMAIL_RE, telefoonOk } from "../../lib/contact-velden";
// Dezelfde websitecontrole als het cursusformulier.
import { websiteOk } from "../../lib/cursus-aanvraag";
import { markeerFormulier } from "../../lib/vsl-meting-opslag";
import { naarTuesday, TUESDAY, type TuesdayStatus } from "../../lib/tuesday";
import { papiSeintje } from "../../lib/papi";
import { aanvraagId, eenRegel, papiMagVandaag, vergeet, wacht } from "../../lib/formulier-wacht";
import { esc, mailNaarContact, papiRegel } from "../../lib/brevo-mail";
import { HUB } from "../../components/hub/copy";

// monday loopt naast Tuesday en mag nooit langer duren dan Tuesday zelf (5 s).
const MONDAY_TIMEOUT_MS = 5000;

const JSON_HEADERS = { "Content-Type": "application/json" };

// ?bron= uit de link naar het label van de keuzelijst "bron" in Tuesday.
const KANALEN: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  ig: "Instagram",
  youtube: "YouTube",
  yt: "YouTube",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  fb: "Facebook",
  x: "X",
  twitter: "X",
  threads: "Threads",
};

// Een gratis mailadres zegt niets over het bedrijf: dan heet het item naar de persoon.
const GRATIS_MAIL = new Set([
  "gmail.com", "googlemail.com", "hotmail.com", "hotmail.be", "outlook.com", "outlook.be", "live.com", "live.be",
  "msn.com", "icloud.com", "me.com", "yahoo.com", "telenet.be", "skynet.be", "proximus.be", "scarlet.be",
]);
// De mail gaat naar contact@ (lib/brevo-mail.ts): een gedeeld adres, zodat alle vennoten
// de aanvragen binnenkrijgen en een lead niet in één persoonlijke mailbox blijft hangen.

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

// Een keuzeveld van de hub mag alleen een antwoord uit de vaste lijst zijn; anders leeg.
function keuze(t: string, vraagId: string): string {
  const vraag = HUB.formulier.vragen.find((q) => q.id === vraagId);
  return vraag && "opties" in vraag && (vraag.opties as readonly string[]).includes(t) ? t : "";
}

function pickStr(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function kanaalLabel(slug: string): string {
  if (!slug || slug === "direct") return "Website";
  return KANALEN[slug] ?? "Other";
}

/** "https://www.jouwbedrijf.be/x" → "jouwbedrijf.be"; ongeldig → "". */
function domein(url: string): string {
  try {
    return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

interface HubVelden {
  kanaal: string;
  reel: string;
  vslProcent: number;
  rol: string;
  grootte: string;
  meesteTijd: string;
  eerst: string;
  pagina: string;
  kijkbeurt: { id: string; dag: string } | null;
}

function leesHub(v: unknown): HubVelden | null {
  if (!v || typeof v !== "object") return null;
  const h = v as Record<string, unknown>;
  const slug = (x: unknown, max: number) => (typeof x === "string" ? x.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max) : "");
  const procent = typeof h.vsl_procent === "number" && Number.isFinite(h.vsl_procent) ? Math.round(Math.min(100, Math.max(0, h.vsl_procent))) : 0;
  const pagina = pickStr(h.pagina, 500);
  const k = h.kijkbeurt as Record<string, unknown> | null | undefined;
  return {
    kanaal: slug(h.kanaal, 40),
    reel: slug(h.reel, 12).toUpperCase(),
    vslProcent: procent,
    rol: keuze(pickStr(h.rol, 120), "rol"),
    grootte: keuze(pickStr(h.grootte, 120), "grootte"),
    meesteTijd: keuze(pickStr(h.meeste_tijd, 120), "tijd"),
    eerst: pickStr(h.eerst, 3000),
    pagina: /^https?:\/\//i.test(pagina) ? pagina : "",
    kijkbeurt: k && typeof k.id === "string" && typeof k.dag === "string" ? { id: k.id, dag: k.dag } : null,
  };
}

export default async (req: Request, context: Context): Promise<Response> => {
  if (req.method !== "POST") {
    return json(405, { error: "method_not_allowed" });
  }

  let body: Record<string, unknown>;
  try {
    const b: unknown = await req.json();
    if (!b || typeof b !== "object" || Array.isArray(b)) return json(400, { error: "invalid_json" });
    body = b as Record<string, unknown>;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // De honeypot (`website`, `controle`) zit in de wacht hieronder, na de controle van de velden.
  const naam = eenRegel(pickStr(body.naam, 120));
  const email = pickStr(body.email, 200);
  const telefoon = pickStr(body.telefoonnummer, 40);
  let bedrijfswebsite = pickStr(body.bedrijfswebsite, 200);
  const bericht = pickStr(body.bericht, 3000);
  const bron = pickStr(body.bron, 300) || "onbekend";
  // De volledige adresbalk (met ?bron=…) voor Tuesday; de mail en monday houden `bron`.
  const paginaVeld = pickStr(body.pagina, 500);
  const pagina = /^https?:\/\//i.test(paginaVeld) ? paginaVeld : bron;

  if (!naam) return json(400, { error: "missing_naam" });
  if (!EMAIL_RE.test(email)) return json(400, { error: "invalid_email" });
  // Het hubformulier (/hub/, of met het veld `hub`) vraagt ook een telefoonnummer, verplicht
  // (Alex, 20/11), en dezelfde controles als in de browser. De popup en het vraagformulier
  // elders op de site houden hun eigen regels.
  const isHub = /^https:\/\/finitsolutions\.be\/hub\//.test(bron);
  const vanHub = isHub || (typeof body.hub === "object" && body.hub !== null);
  if (vanHub && naam.length < 2) return json(400, { error: "missing_naam" });
  if (vanHub && !telefoonOk(telefoon)) return json(400, { error: "invalid_telefoon" });
  // De website is op de hub (nog) optioneel: een onzinwaarde gaat niet naar Tuesday.
  if (vanHub && bedrijfswebsite && !websiteOk(bedrijfswebsite)) bedrijfswebsite = "";

  // Bots, vreemde sites, dubbels en een vloed stoppen hier (zie lib/formulier-wacht.ts).
  const stop = await wacht(req, context.ip, body, "contact-submit");
  if (stop) return stop;
  const id = aanvraagId(body);

  // Tuesday, monday en de kijkbeurt lopen parallel. Het hubformulier gaat alleen naar
  // Socials, de rest naar Content.
  const hub = vanHub ? leesHub(body.hub) : null;
  let tuesdayBelofte: Promise<TuesdayStatus> = Promise.resolve("off");
  if (hub) {
    const mailDomein = email.split("@")[1]?.toLowerCase() ?? "";
    const naamItem = domein(bedrijfswebsite) || (mailDomein && !GRATIS_MAIL.has(mailDomein) ? mailDomein : "") || naam;
    const values: Record<string, string | number> = {
      status: "New lead 0%",
      bron: kanaalLabel(hub.kanaal),
      vsl_procent: hub.vslProcent,
      contact_name: naam,
      email,
      phone: telefoon,
    };
    if (hub.reel) values.reel = hub.reel;
    if (hub.rol) values.contact_role = hub.rol;
    if (bedrijfswebsite) values.website = /^https?:\/\//i.test(bedrijfswebsite) ? bedrijfswebsite : `https://${bedrijfswebsite}`;
    if (hub.grootte) values.grootte = hub.grootte;
    if (hub.meesteTijd) values.meeste_tijd = hub.meesteTijd;
    if (hub.eerst) values.message = hub.eerst;
    if (hub.pagina) values.pagina = hub.pagina;
    tuesdayBelofte = naarTuesday(TUESDAY.socials, { name: naamItem, values }, "contact-submit");
  } else if (!vanHub) {
    // Jords route vraagt name, email en message; de popup heeft geen bericht.
    const lead: Record<string, string> = {
      name: naam,
      email,
      message: bericht || "Wil een kennismaking plannen (popup op de website).",
      page: pagina,
    };
    if (telefoon) lead.phone = telefoon;
    if (bedrijfswebsite) lead.website = bedrijfswebsite;
    tuesdayBelofte = naarTuesday(TUESDAY.websiteLead, lead, "contact-submit");
  }
  const kijkBelofte = hub?.kijkbeurt
    ? markeerFormulier(hub.kijkbeurt.id, hub.kijkbeurt.dag).catch(() => console.error("contact-submit: kijkbeurt niet bijgewerkt"))
    : Promise.resolve();

  // monday naast Tuesday; de mail zegt daarna of de lead er staat.
  const monday = mondayConfigFromEnv();
  const mondayBelofte: Promise<string> = (async () => {
    if (!monday) return "";
    const mondayTimer = new AbortController();
    const mondayTimeout = setTimeout(() => mondayTimer.abort(), MONDAY_TIMEOUT_MS);
    try {
      const item = await createMondayItem(
        monday,
        { naam, email, telefoon, bedrijfswebsite, bericht, bron },
        mondayTimer.signal
      );
      return `<p style="margin:16px 0 0;font-size:14px;color:#6C7590">monday: <a href="${esc(item.url)}" style="color:#1A2D63">item #${esc(item.id)}</a></p>`;
    } catch (err) {
      console.error("contact-submit: monday-item mislukt", err instanceof Error ? err.name : "onbekende fout");
      return `<p style="margin:16px 0 0;font-size:14px;color:#b45309">monday: lead aanmaken mislukt, voeg deze manueel toe.</p>`;
    } finally {
      clearTimeout(mondayTimeout);
    }
  })();

  const tuesdayStatus = await tuesdayBelofte;
  await kijkBelofte;
  const bord = hub ? "Socials" : "Content";
  const tuesdayRegel =
    tuesdayStatus === "ok"
      ? `<p style="margin:8px 0 0;font-size:14px;color:#6C7590">Tuesday: item op het bord ${bord}.</p>`
      : tuesdayStatus === "failed"
        ? `<p style="margin:8px 0 0;font-size:14px;color:#b45309">Tuesday: item aanmaken mislukt, voeg deze manueel toe op het bord ${bord}.</p>`
        : "";

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

  const html = (mondayRegel: string, extra: string) => `
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
      ${mondayRegel}
      ${tuesdayRegel}
      ${extra}
    </div>`;
  const mail = async (extra = "") =>
    mailNaarContact({ onderwerp, html: html(await mondayBelofte, extra), antwoordAan: { email, naam } }, "contact-submit");

  if (tuesdayStatus === "ok") {
    // De lead staat veilig in Tuesday: de bezoeker hoeft niet te wachten op monday, GitHub of Brevo.
    // Pas na "ok" het PAPI-seintje (lib/papi.ts), anders vindt de automaat de lead nog niet.
    context.waitUntil(
      (async () => {
        const papi = (await papiMagVandaag(email)) ? await papiSeintje("contact-submit") : "overgeslagen";
        await mail(papiRegel(papi));
      })()
    );
    return json(200, { ok: true, tuesday: tuesdayStatus });
  }

  // Geen Tuesday: de mail is het vangnet. Mislukt die ook, dan mag de bezoeker opnieuw.
  if (!(await mail())) {
    await vergeet(id);
    return json(502, { error: "mail_failed" });
  }
  return json(200, { ok: true, tuesday: tuesdayStatus });
};

