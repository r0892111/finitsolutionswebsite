/**
 * GET / PUT /api/intake/state  (mapped via netlify.toml redirect)
 *
 * GET ?t=<token>  → returns personalization + state + identity (NO token).
 * PUT body { token, state_json?, goal_status_json?, maturity_score?, language? }
 *      → updates Supabase row. Rejects with 410 if completed.
 *
 * Spec: [intake-flow.md §Web app routes](../../../finit-os/docs/specs/intake-flow.md)
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import {
  getSessionByToken,
  updateSessionState,
  type IntakeStateJson,
  type GoalStatusJson,
} from "../../lib/intake/supabase-intake";
import { isPlausibleToken } from "../../lib/intake/token-mint";
import type { IntakeStateResponse } from "../../lib/intake/types";

const JSON_HEADERS = { "Content-Type": "application/json" };

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
}

async function handleGet(event: HandlerEvent) {
  const token = event.queryStringParameters?.t;
  if (!token || !isPlausibleToken(token)) {
    return json(400, { error: "missing_or_invalid_token" });
  }
  try {
    const row = await getSessionByToken(token);
    if (!row) return json(404, { error: "not_found" });
    if (row.expires_at && new Date(row.expires_at) < new Date()) {
      return json(410, { error: "expired" });
    }
    const body: IntakeStateResponse = {
      personalization: row.personalization_json,
      goal_status: row.goal_status_json ?? {},
      state: row.state_json ?? {},
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
    };
    return json(200, body);
  } catch (err) {
    console.error("[intake-state GET] error:", err);
    let message = "unknown";
    if (err instanceof Error) {
      message = err.message;
    } else if (err && typeof err === "object") {
      const e = err as { message?: string; code?: string; details?: string };
      message = e.message ?? e.details ?? `(${e.code ?? "no-code"})`;
    } else if (typeof err === "string") {
      message = err;
    }
    return json(500, {
      error: "internal_error",
      message,
      env_check: {
        has_supabase_url: !!process.env.SUPABASE_URL,
        has_service_role: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        has_anthropic: !!process.env.ANTHROPIC_API_KEY,
      },
    });
  }
}

interface PutBody {
  token?: unknown;
  state_json?: IntakeStateJson;
  goal_status_json?: GoalStatusJson;
  maturity_score?: number;
  language?: "nl" | "fr" | "en";
}

async function handlePut(event: HandlerEvent) {
  let body: PutBody;
  try {
    body = JSON.parse(event.body ?? "{}") as PutBody;
  } catch {
    return json(400, { error: "invalid_json" });
  }
  if (typeof body.token !== "string" || !isPlausibleToken(body.token)) {
    return json(400, { error: "missing_or_invalid_token" });
  }
  try {
    const result = await updateSessionState(body.token, {
      state_json: body.state_json,
      goal_status_json: body.goal_status_json,
      maturity_score: body.maturity_score,
      language: body.language,
    });
    if (!result.ok) {
      if (result.reason === "not_found") return json(404, { error: "not_found" });
      if (result.reason === "completed") return json(410, { error: "already_completed" });
    }
    return json(200, { ok: true });
  } catch (err) {
    return json(500, {
      error: "internal_error",
      message: err instanceof Error ? err.message : "unknown",
    });
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "GET") return handleGet(event);
  if (event.httpMethod === "PUT") return handlePut(event);
  return { statusCode: 405, body: "Method Not Allowed" };
};
