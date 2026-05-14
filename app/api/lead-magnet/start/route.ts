/**
 * POST /api/lead-magnet/start
 *
 * Public-form entrypoint. Body fields:
 *   { email, first_name?, last_name?, company_name?, company_website?,
 *     sector?, language?, role?, phone? }
 *
 * Mints a token, inserts a Supabase row with flavor=lead_magnet + sparse
 * personalization_json (just identity + sector defaults), and returns the
 * redirect URL `/intake?t=<token>`.
 *
 * No auth — this IS the entrypoint. Rate-limit via Netlify edge if needed.
 *
 * Spec: [intake-flow.md §Architecture overview — public-form path].
 */
import { NextRequest, NextResponse } from "next/server";
import { mintToken } from "@/lib/intake/token-mint";
import { insertLeadMagnetRow } from "@/lib/intake/supabase-intake";
import type { IntakePersonalization, Language } from "@/lib/intake/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

// Basic-but-not-paranoid email regex. Real validation = the magic-link itself.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: LeadMagnetStartBody;
  try {
    body = (await req.json()) as LeadMagnetStartBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = pickStr(body.email);
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const language = pickLang(body.language);
  const sector = pickStr(body.sector);
  const firstName = pickStr(body.first_name, 100);
  const lastName = pickStr(body.last_name, 100);
  const companyName = pickStr(body.company_name, 200);
  const companyWebsite = pickStr(body.company_website, 300);
  const role = pickStr(body.role, 80);
  const phone = pickStr(body.phone, 40);

  // Sparse personalization JSON. Maturity is unknown — confidence=low —
  // so the agent should treat this prospect as cold and lean explanatory.
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
    return NextResponse.json(
      {
        error: "insert_failed",
        message: err instanceof Error ? err.message : "unknown",
      },
      { status: 500 }
    );
  }

  // Return both the URL and the raw token so the form can either redirect
  // (window.location.assign) or open the chat shell inline.
  return NextResponse.json({
    ok: true,
    redirect_url: `/intake?t=${token}`,
    token,
  });
}
