/**
 * POST /api/hub-toegang  (via de redirect in netlify.toml)
 *
 * Het e-mailslot op de resources van de hub. Bewaart het adres als contact in
 * Brevo, waar we ook mailen (en waar afmelden al geregeld is):
 *
 * - nieuw adres: contact aanmaken met UTM_SOURCE (kanaal, ?bron=), UTM_MEDIUM
 *   "hub" of "gratis-materiaal" (de aparte pagina met de gratis prompts, sinds
 *   26/11: die bezoekers zijn koudere leads en krijgen later een eigen mailreeks),
 *   UTM_CONTENT (de post, ?reel=) en OPT_IN (mails aangevinkt of niet);
 * - bestaand adres: niets overschrijven, alleen OPT_IN aanzetten als hij nu
 *   wel mails wil;
 * - mails aangevinkt en BREVO_HUB_LIJST_ID ingesteld: ook op die lijst.
 *
 * Wie niet aanvinkt, krijgt geen mails: dan staat OPT_IN op false en komt hij
 * op geen enkele lijst. Bestaande velden van de contactenlijst, geen nieuwe.
 *
 * Een nieuw adres komt daarnaast in Tuesday, bord Socials, groep "mailinglijst"
 * (Alex, 26/11): apart van de leads en zonder status, zodat niemand het voor een
 * aanvraag houdt. Mislukt Tuesday, dan merkt de bezoeker niets (lib/tuesday.ts).
 *
 * Env: BREVO_API_KEY (verplicht, dezelfde als het contactformulier),
 *      BREVO_HUB_LIJST_ID (optioneel, het nummer van de lijst in Brevo),
 *      CRM_API_TOKEN of CRM_SOCIALS_TOKEN (optioneel) — sleutel voor Tuesday. Nooit loggen.
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import { kanaalLabel, naarTuesday, TUESDAY } from "../../lib/tuesday";

const JSON_HEADERS = { "Content-Type": "application/json" };
const BREVO = "https://api.brevo.com/v3/contacts";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Welke tekst stond er bij het vinkje: zo weten we later waarvoor iemand toestemming gaf.
// 2026-11-20b: doel van de mails = af en toe AI-nieuwtjes en tips, hooguit twee per maand.
const TEKSTVERSIE = "hub-slot-2026-11-20b";
// Socials › "mailinglijst", op het vaste id (een onbekend id belandt zonder fout in de eerste groep). Aangemaakt 26/11.
const MAILINGLIJST_GROEP = "groep_mxaahhq";

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
}

function schoon(v: unknown, max: number): string {
  return typeof v === "string" ? v.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max) : "";
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") return json(405, { error: "method_not_allowed" });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body ?? "{}") as Record<string, unknown>;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // Honeypot: ingevuld = bot. Doen alsof het lukte.
  if (typeof body.website === "string" && body.website.trim()) return json(200, { ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
  if (!EMAIL_RE.test(email)) return json(400, { error: "invalid_email" });
  const mails = body.mails === true;
  const bron = schoon(body.bron, 40) || "direct";
  const reel = schoon(body.reel, 12).toUpperCase();
  // Alleen de aparte pagina krijgt een eigen waarde; al de rest (hub, promptpagina's) blijft "hub".
  const medium = schoon(body.plek, 40) === "gratis-materiaal" ? "gratis-materiaal" : "hub";

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("hub-toegang: BREVO_API_KEY ontbreekt");
    return json(500, { error: "not_configured" });
  }
  const lijst = Number(process.env.BREVO_HUB_LIJST_ID);
  const lijsten = mails && Number.isInteger(lijst) && lijst > 0 ? [lijst] : undefined;
  const headers = { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" };
  let nieuwContact = false;

  try {
    const nieuw = await fetch(BREVO, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        attributes: { UTM_SOURCE: bron, UTM_MEDIUM: medium, ...(reel ? { UTM_CONTENT: reel } : {}), OPT_IN: mails },
        ...(lijsten ? { listIds: lijsten } : {}),
      }),
    });

    if (nieuw.status === 400) {
      const fout = (await nieuw.json().catch(() => ({}))) as { code?: string; message?: string };
      if (fout.code !== "duplicate_parameter") {
        console.error("hub-toegang: Brevo weigerde", fout.code, fout.message);
        return json(400, { error: "invalid_email" });
      }
      // Bestaat al: alleen bijwerken als hij nu mails wil.
      if (mails) {
        const bij = await fetch(`${BREVO}/${encodeURIComponent(email)}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ attributes: { OPT_IN: true }, ...(lijsten ? { listIds: lijsten } : {}) }),
        });
        if (!bij.ok) throw new Error(`Brevo PUT ${bij.status}`);
      }
    } else if (!nieuw.ok) {
      throw new Error(`Brevo POST ${nieuw.status} ${(await nieuw.text()).slice(0, 300)}`);
    } else {
      nieuwContact = true;
    }
  } catch (err) {
    console.error("hub-toegang: bewaren mislukt", err);
    return json(502, { error: "save_failed" });
  }

  // Alleen een nieuw adres naar Tuesday: een bestaand staat er al (of kwam van vóór 26/11).
  if (nieuwContact) {
    await naarTuesday(
      TUESDAY.socials,
      {
        name: email,
        group_id: MAILINGLIJST_GROEP,
        values: {
          email,
          bron: kanaalLabel(bron),
          ...(reel ? { reel } : {}),
          message: `Opende de gratis prompts (${medium === "gratis-materiaal" ? "pagina Gratis materiaal" : "hub"}). Mails: ${mails ? "ja" : "nee"}.`,
        },
      },
      "hub-toegang",
    );
  }

  // Bewijs van toestemming, zonder het adres zelf in de logs.
  console.log(JSON.stringify({ hub_toegang: true, mails, tekst: TEKSTVERSIE, bron, reel, plek: medium, ts: new Date().toISOString() }));
  return json(200, { ok: true });
};
