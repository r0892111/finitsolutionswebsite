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
    return json(200, {
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
    return json(500, {
      error: "internal_error",
      message: err instanceof Error ? err.message : "unknown",
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
