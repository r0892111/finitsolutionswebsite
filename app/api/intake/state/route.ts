/**
 * GET / PUT /api/intake/state
 *
 * GET ?t=<token>  → returns `{ personalization_json, state_json,
 *                   goal_status_json, language, completed_at, flavor,
 *                   identity }`. NEVER includes the token itself.
 * PUT body { token, state_json?, goal_status_json?, maturity_score?, language? }
 *      → updates Supabase row. Rejects with 410 if `completed_at IS NOT NULL`.
 *
 * Spec: [intake-flow.md §Web app routes](../../../../../finit-os/docs/specs/intake-flow.md)
 *
 * Runtime: Node — Supabase service-role client is server-only.
 */
import { NextRequest, NextResponse } from "next/server";
import {
  getSessionByToken,
  updateSessionState,
  type IntakeStateJson,
  type GoalStatusJson,
} from "@/lib/intake/supabase-intake";
import { isPlausibleToken } from "@/lib/intake/token-mint";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("t");
  if (!token || !isPlausibleToken(token)) {
    return NextResponse.json({ error: "missing_or_invalid_token" }, { status: 400 });
  }

  try {
    const row = await getSessionByToken(token);
    if (!row) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    // Expiry check.
    if (row.expires_at && new Date(row.expires_at) < new Date()) {
      return NextResponse.json({ error: "expired" }, { status: 410 });
    }

    // Shape what the client sees — explicitly omit the token + minted_by.
    return NextResponse.json({
      personalization_json: row.personalization_json,
      state_json: row.state_json ?? {},
      goal_status_json: row.goal_status_json ?? {},
      language: row.language,
      flavor: row.flavor,
      completed_at: row.completed_at,
      identity: {
        first_name: row.first_name,
        last_name: row.last_name,
        company_name: row.company_name,
        email: row.email,
        role: row.role,
        sector: row.sector,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "internal_error",
        message: err instanceof Error ? err.message : "unknown",
      },
      { status: 500 }
    );
  }
}

interface PutBody {
  token?: unknown;
  state_json?: IntakeStateJson;
  goal_status_json?: GoalStatusJson;
  maturity_score?: number;
  language?: "nl" | "fr" | "en";
}

export async function PUT(req: NextRequest) {
  let body: PutBody;
  try {
    body = (await req.json()) as PutBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof body.token !== "string" || !isPlausibleToken(body.token)) {
    return NextResponse.json({ error: "missing_or_invalid_token" }, { status: 400 });
  }

  try {
    const result = await updateSessionState(body.token, {
      state_json: body.state_json,
      goal_status_json: body.goal_status_json,
      maturity_score: body.maturity_score,
      language: body.language,
    });

    if (!result.ok) {
      if (result.reason === "not_found") {
        return NextResponse.json({ error: "not_found" }, { status: 404 });
      }
      if (result.reason === "completed") {
        return NextResponse.json({ error: "already_completed" }, { status: 410 });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      {
        error: "internal_error",
        message: err instanceof Error ? err.message : "unknown",
      },
      { status: 500 }
    );
  }
}
