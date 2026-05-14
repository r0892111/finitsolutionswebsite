/**
 * Service-role Supabase client + typed CRUD for `finit_intake_sessions`.
 *
 * Server-side ONLY. The service-role key bypasses RLS — never import this
 * file from a client component or expose it through anything that ships to
 * the browser bundle. RLS is enabled on the table with no policies, so the
 * service-role key is the only thing that can read/write rows.
 *
 * Schema source of truth:
 * [intake-flow.md §Persistence — Supabase](../../../finit-os/docs/specs/intake-flow.md).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  IntakePersonalization,
  Language,
  IntakeFlavor,
} from "@/app/intake/types";

export type GoalStatus = "open" | "probing" | "satisfied";

export interface IntakeStateJson {
  /** Per-widget answers, keyed by widget_id or goal_id (agent decides). */
  answers?: Record<string, unknown>;
  /** Conversation log — the agent's running scratchpad. Optional. */
  notes?: string[];
  /** Whatever else the agent wants to stash. Schemaless on purpose. */
  [key: string]: unknown;
}

export type GoalStatusJson = Record<string, GoalStatus>;

export interface IntakeRow {
  id: string;
  token: string;
  flavor: IntakeFlavor;
  client_slug: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  company_website: string | null;
  role: string | null;
  phone: string | null;
  language: Language;
  sector: string | null;
  maturity_score: number | null;
  maturity_confidence: "low" | "medium" | "high" | null;
  personalization_json: IntakePersonalization;
  state_json: IntakeStateJson;
  goal_status_json: GoalStatusJson;
  created_at: string;
  last_active_at: string;
  completed_at: string | null;
  expires_at: string | null;
  migrated_to_client_slug: string | null;
  migrated_at: string | null;
  minted_by: string | null;
}

let cached: SupabaseClient | null = null;

/**
 * Returns a server-side Supabase client wired with the service-role key.
 * Throws if env vars are missing — fail loud at request time, not silently.
 */
export function getServiceClient(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) is not set");
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

const TABLE = "finit_intake_sessions";

/** Fetch a single row by token. Returns null when not found. */
export async function getSessionByToken(token: string): Promise<IntakeRow | null> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from(TABLE)
    .select("*")
    .eq("token", token)
    .maybeSingle();
  if (error) throw error;
  return (data as IntakeRow | null) ?? null;
}

export interface UpdateStatePayload {
  state_json?: IntakeStateJson;
  goal_status_json?: GoalStatusJson;
  maturity_score?: number | null;
  language?: Language;
}

/**
 * Update live conversation state. Always bumps `last_active_at`.
 * Refuses to write to rows that already have `completed_at` set.
 */
export async function updateSessionState(
  token: string,
  patch: UpdateStatePayload
): Promise<{ ok: boolean; reason?: "completed" | "not_found" }> {
  const row = await getSessionByToken(token);
  if (!row) return { ok: false, reason: "not_found" };
  if (row.completed_at) return { ok: false, reason: "completed" };

  const sb = getServiceClient();
  const { error } = await sb
    .from(TABLE)
    .update({
      ...patch,
      last_active_at: new Date().toISOString(),
    })
    .eq("token", token);

  if (error) throw error;
  return { ok: true };
}

/** Mark a row as completed (idempotent — won't error if already completed). */
export async function markCompleted(token: string): Promise<void> {
  const sb = getServiceClient();
  const { error } = await sb
    .from(TABLE)
    .update({ completed_at: new Date().toISOString() })
    .eq("token", token);
  if (error) throw error;
}

/**
 * INSERT a new lead-magnet row from the public-form path. Personalization is
 * sparse for this flavor; the chat agent will probe to fill gaps.
 */
export interface InsertLeadMagnetPayload {
  token: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  company_name?: string | null;
  company_website?: string | null;
  role?: string | null;
  phone?: string | null;
  language?: Language;
  sector?: string | null;
  personalization_json: IntakePersonalization;
}

export async function insertLeadMagnetRow(
  payload: InsertLeadMagnetPayload
): Promise<IntakeRow> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from(TABLE)
    .insert({
      token: payload.token,
      flavor: "lead_magnet" as IntakeFlavor,
      client_slug: null,
      email: payload.email,
      first_name: payload.first_name ?? null,
      last_name: payload.last_name ?? null,
      company_name: payload.company_name ?? null,
      company_website: payload.company_website ?? null,
      role: payload.role ?? null,
      phone: payload.phone ?? null,
      language: payload.language ?? "nl",
      sector: payload.sector ?? null,
      personalization_json: payload.personalization_json,
      state_json: {},
      goal_status_json: {},
      minted_by: "public-form",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as IntakeRow;
}

/**
 * Cheap regex sanity filter — flags obvious prompt-injection strings in user
 * input. Does NOT block (false-positive cost is too high); just returns a flag
 * the submit handler can email to the operator.
 *
 * See [intake-flow.md §Edge cases #9](../../../finit-os/docs/specs/intake-flow.md).
 */
const INJECTION_PATTERNS: RegExp[] = [
  /ignore (previous|prior|all) instructions/i,
  /system prompt/i,
  /you are now/i,
  /disregard (the )?(previous|above|earlier)/i,
  /\bjailbreak\b/i,
];

export function scanForInjection(text: string): { suspicious: boolean; hits: string[] } {
  const hits: string[] = [];
  for (const re of INJECTION_PATTERNS) {
    const m = text.match(re);
    if (m) hits.push(m[0]);
  }
  return { suspicious: hits.length > 0, hits };
}

export function scanStateJsonForInjection(state: IntakeStateJson): {
  suspicious: boolean;
  hits: string[];
} {
  const text = JSON.stringify(state);
  return scanForInjection(text);
}
