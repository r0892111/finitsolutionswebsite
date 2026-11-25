/**
 * POST /api/lead-magnet/start  (mapped via netlify.toml redirect)
 *
 * Public-form entrypoint. Body fields: email (required), first_name,
 * last_name, company_name, company_website, sector, language, role, phone.
 *
 * Mints a token, inserts a Supabase row with flavor=lead_magnet + sparse
 * personalization_json. Returns the redirect URL `/intake?t=<token>`.
 *
 * Spec: [intake-flow.md §Architecture overview — public-form path].
 *
 * Daarnaast (Alex, 20/11): de lead gaat ook naar Tuesday, via Jords route
 * /api/intake/website-lead (bord Content), parallel met de Supabase-stap, max 5 s.
 * Mislukt Tuesday, dan merkt de bezoeker niets (zie lib/tuesday.ts).
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import { mintToken } from "../../lib/intake/token-mint";
import { insertLeadMagnetRow } from "../../lib/intake/supabase-intake";
import type { IntakePersonalization, Language } from "../../lib/intake/types";
import { naarTuesday, TUESDAY } from "../../lib/tuesday";

const JSON_HEADERS = { "Content-Type": "application/json" };

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
}

interface LeadMagnetStartBody {
  email?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  company_name?: unknown;
  company_website?: unknown;
  sector?: unknown;
  language?: unknown;
  role?: unknown;
  phone?: unknown;
}

function pickStr(v: unknown, max = 200): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

function pickLang(v: unknown): Language {
  if (v === "fr" || v === "en" || v === "nl") return v;
  return "nl";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Gesloten sinds 25/11/2026 (veiligheidsronde): geen enkele pagina gebruikt de intake nog, en open
// kostte ze geld (Claude, ElevenLabs) zonder maximum. Weer open: INTAKE_OPEN=1 in Netlify.
export const handler: Handler = async (event: HandlerEvent) => {
  if (process.env.INTAKE_OPEN !== "1") return json(410, { error: "gesloten" });
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body: LeadMagnetStartBody;
  try {
    body = JSON.parse(event.body ?? "{}") as LeadMagnetStartBody;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const email = pickStr(body.email);
  if (!email || !EMAIL_RE.test(email)) {
    return json(400, { error: "invalid_email" });
  }

  const language = pickLang(body.language);
  const sector = pickStr(body.sector);
  const firstName = pickStr(body.first_name, 100);
  const lastName = pickStr(body.last_name, 100);
  const companyName = pickStr(body.company_name, 200);
  const companyWebsite = pickStr(body.company_website, 300);
  const role = pickStr(body.role, 80);
  const phone = pickStr(body.phone, 40);

  const personalization: IntakePersonalization = {
    flavor: "lead_magnet",
    intake_compactness: "compressed",
    client_slug: null,
    language,
    sector: sector ?? undefined,
    primary_contact: {
      first_name: firstName ?? undefined,
      last_name: lastName ?? undefined,
      email,
      role: role ?? undefined,
      phone: phone ?? undefined,
    },
    company_website: companyWebsite ?? undefined,
    maturity_score: 30,
    maturity_confidence: "low",
    maturity_signal:
      "Public-form path — no operator context. Default to explanatory tone; calibrate up only on active signal.",
    goal_emphasis: {
      operational_reality: "trim",
      value_drains: "deep_probe",
      ai_maturity: "standard",
      system_landscape: "top_3_only",
      economic_stakes: "skip",
      magic_wand: "standard",
    },
    minted_at: new Date().toISOString(),
    minted_by_operator: "public-form",
  };

  // Tuesday vraagt name, email en message. De rest staat in het bericht.
  const extra = [
    role && `Rol: ${role}`,
    sector && `Sector: ${sector}`,
    companyName && `Bedrijf: ${companyName}`,
    `Taal: ${language}`,
  ].filter(Boolean);
  const lead: Record<string, string> = {
    name: [firstName, lastName].filter(Boolean).join(" ") || companyName || email,
    email,
    message: ["Gratis analyse via de intake gestart", ...extra].join("\n"),
    page: "https://finitsolutions.be/intake",
  };
  if (phone) lead.phone = phone;
  if (companyWebsite) lead.website = companyWebsite;
  const tuesday = naarTuesday(TUESDAY.websiteLead, lead, "lead-magnet-start");

  const token = mintToken();
  try {
    await insertLeadMagnetRow({
      token,
      email,
      first_name: firstName,
      last_name: lastName,
      company_name: companyName,
      company_website: companyWebsite,
      role,
      phone,
      language,
      sector,
      personalization_json: personalization,
    });
  } catch (err) {
    console.error("lead-magnet-start: insert mislukt", err instanceof Error ? err.message : "onbekende fout");
    await tuesday;
    return json(500, { error: "insert_failed" });
  }

  await tuesday;
  return json(200, {
    ok: true,
    redirect_url: `/intake?t=${token}`,
    token,
  });
};
