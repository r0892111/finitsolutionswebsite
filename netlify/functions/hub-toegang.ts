/**
 * POST /api/hub-toegang  (via de redirect in netlify.toml)
 *
 * Het e-mailslot op de resources van de hub. Bewaart het adres als contact in
 * Brevo, waar we ook mailen (en waar afmelden al geregeld is):
 *
 * - nieuw adres: contact aanmaken met UTM_SOURCE (kanaal, ?bron=), UTM_MEDIUM
 *   "hub", UTM_CONTENT (de post, ?reel=) en OPT_IN false;
 * - bestaand adres: niets overschrijven;
 * - mails aangevinkt: dubbele bevestiging (double opt-in, sinds 25/11). Brevo stuurt
 *   eerst een mail met een bevestigingsknop (sjabloon BREVO_DOI_SJABLOON_ID). Pas na
 *   die klik zet Brevo OPT_IN op true en het adres op de lijst BREVO_HUB_LIJST_ID.
 *   Zo kan niemand andermans adres inschrijven. Ontbreekt het sjabloon of de lijst,
 *   dan komt niemand op een lijst (en staat dat in de log).
 *
 * Wie niet aanvinkt, krijgt geen mails: dan staat OPT_IN op false en komt hij
 * op geen enkele lijst. Bestaande velden van de contactenlijst, geen nieuwe.
 *
 * Env: BREVO_API_KEY (verplicht, dezelfde als het contactformulier),
 *      BREVO_HUB_LIJST_ID en BREVO_DOI_SJABLOON_ID (allebei nodig voor de mails).
 */
import type { Handler, HandlerEvent } from "@netlify/functions";

const JSON_HEADERS = { "Content-Type": "application/json" };
const BREVO = "https://api.brevo.com/v3/contacts";
// Waar de knop in de bevestigingsmail naartoe gaat.
const NA_BEVESTIGING = "https://finitsolutions.be/hub/";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Welke tekst stond er bij het vinkje: zo weten we later waarvoor iemand toestemming gaf.
// 2026-11-20b: doel van de mails = af en toe AI-nieuwtjes en tips, hooguit twee per maand.
// 2026-11-25: plus "Je krijgt eerst een mail om te bevestigen" (dubbele bevestiging).
const TEKSTVERSIE = "hub-slot-2026-11-25";

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

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("hub-toegang: BREVO_API_KEY ontbreekt");
    return json(500, { error: "not_configured" });
  }
  const lijst = Number(process.env.BREVO_HUB_LIJST_ID);
  const sjabloon = Number(process.env.BREVO_DOI_SJABLOON_ID);
  const headers = { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" };
  const utm = { UTM_SOURCE: bron, UTM_MEDIUM: "hub", ...(reel ? { UTM_CONTENT: reel } : {}) };

  try {
    // Altijd eerst het contact zelf, zonder toestemming voor mails en op geen enkele lijst.
    const nieuw = await fetch(BREVO, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, attributes: { ...utm, OPT_IN: false } }),
    });

    if (nieuw.status === 400) {
      const fout = (await nieuw.json().catch(() => ({}))) as { code?: string; message?: string };
      if (fout.code !== "duplicate_parameter") {
        console.error("hub-toegang: Brevo weigerde", fout.code);
        return json(400, { error: "invalid_email" });
      }
      // Bestaat al: niets overschrijven.
    } else if (!nieuw.ok) {
      throw new Error(`Brevo POST ${nieuw.status}`);
    }
  } catch (err) {
    console.error("hub-toegang: bewaren mislukt", err instanceof Error ? err.message : "onbekende fout");
    return json(502, { error: "save_failed" });
  }

  // Mails aangevinkt: eerst bevestigen. Lukt dat niet, dan krijgt de bezoeker de resources toch.
  let bevestiging: "niet_gevraagd" | "verstuurd" | "niet_ingesteld" | "mislukt" = "niet_gevraagd";
  if (mails) {
    if (!(Number.isInteger(lijst) && lijst > 0 && Number.isInteger(sjabloon) && sjabloon > 0)) {
      bevestiging = "niet_ingesteld";
      console.error("hub-toegang: dubbele bevestiging niet ingesteld (BREVO_HUB_LIJST_ID, BREVO_DOI_SJABLOON_ID): niemand op de lijst gezet");
    } else {
      try {
        const doi = await fetch(`${BREVO}/doubleOptinConfirmation`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            email,
            includeListIds: [lijst],
            templateId: sjabloon,
            redirectionUrl: NA_BEVESTIGING,
            attributes: { ...utm, OPT_IN: true },
          }),
        });
        bevestiging = doi.ok ? "verstuurd" : "mislukt";
        if (!doi.ok) console.error("hub-toegang: bevestigingsmail mislukt", doi.status);
      } catch (err) {
        bevestiging = "mislukt";
        console.error("hub-toegang: bevestigingsmail niet verstuurd", err instanceof Error ? err.name : "onbekende fout");
      }
    }
  }

  // Bewijs van toestemming, zonder het adres zelf in de logs. OPT_IN volgt pas na de bevestiging in Brevo.
  console.log(JSON.stringify({ hub_toegang: true, mails, bevestiging, tekst: TEKSTVERSIE, bron, reel, ts: new Date().toISOString() }));
  return json(200, { ok: true });
};
