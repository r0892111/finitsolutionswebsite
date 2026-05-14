/**
 * Widget schemas + chat-protocol types for the Finit OS interactive intake.
 *
 * Source of truth: [intake-flow spec § Widget catalog](../../../../finit-os/docs/specs/intake-flow.md).
 *
 * The web-side agent (Anthropic SDK, server-side) emits these widget payloads
 * via tool-use calls. The client renders them; the user's submission is sent
 * back to the server as a `save_answer` payload.
 */

export type Language = "nl" | "fr" | "en";

export type IntakeFlavor = "paying_client" | "lead_magnet";

export type IntakeCompactness = "full" | "compressed";

export type WidgetKind =
  | "ask_text"
  | "ask_long_text_voice"
  | "ask_single_select"
  | "ask_multi_select"
  | "ask_slider"
  | "ask_confirm"
  | "system_picker"
  | "closing_summary";

/* ------------------------------------------------------------------ *
 * Personalization JSON — mirror of spec § "Personalization JSON
 * schema". The chat shell receives this at /api/intake/state and
 * passes the relevant subset to widgets that need it (e.g.
 * system_picker pulls option lists from `system_options`).
 * ------------------------------------------------------------------ */

export interface PreFilledValue<T = string | number | boolean> {
  value: T;
  source: "sales-call" | "website-scrape" | "public-form" | "operator" | "manual";
  confidence?: "low" | "medium" | "high";
}

export interface SystemOption {
  name: string;
  domain: string; // for logo.clearbit.com/<domain>
  tier?: "primary" | "secondary";
  client_count?: number;
}

export interface IntakePersonalization {
  flavor: IntakeFlavor;
  intake_compactness: IntakeCompactness;
  client_slug?: string | null;
  client_legal_name?: string;
  language: Language;
  sector?: string;
  primary_contact?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    role?: "zaakvoerder" | "manager" | "ops" | "other" | string;
    phone?: string;
  };
  company_website?: string;
  maturity_score?: number; // 0-100
  maturity_confidence?: "low" | "medium" | "high";
  maturity_signal?: string;
  stated_vision?: string;
  sales_call_highlights?: string[];
  pre_filled?: Record<string, PreFilledValue>;
  system_options?: Record<string, SystemOption[]> & {
    _sector_specific?: Record<string, SystemOption[]>;
  };
  goal_emphasis?: Record<
    "operational_reality" | "value_drains" | "ai_maturity" | "system_landscape" | "economic_stakes" | "magic_wand",
    "standard" | "deep_probe" | "trim" | "top_3_only" | "skip"
  >;
  minted_at?: string;
  minted_by_operator?: string;
}

/* ------------------------------------------------------------------ *
 * Widget payloads — what the agent emits per tool call.
 * ------------------------------------------------------------------ */

export interface BaseWidget {
  /** Stable id used to correlate the submission back to the agent's tool_use_id. */
  widget_id: string;
  kind: WidgetKind;
  /** Optional goal-tracking metadata. */
  goal_id?: string;
}

export interface AskTextWidget extends BaseWidget {
  kind: "ask_text";
  prompt: string;
  placeholder?: string;
  max_length?: number;
}

export interface AskLongTextVoiceWidget extends BaseWidget {
  kind: "ask_long_text_voice";
  prompt: string;
  placeholder?: string;
  voice_enabled?: boolean; // defaults true per spec
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface AskSingleSelectWidget extends BaseWidget {
  kind: "ask_single_select";
  prompt: string;
  options: SelectOption[];
  allow_other_text?: boolean;
}

export interface AskMultiSelectWidget extends BaseWidget {
  kind: "ask_multi_select";
  prompt: string;
  options: SelectOption[];
  min?: number;
  max?: number;
  allow_other_text?: boolean;
}

export interface AskSliderWidget extends BaseWidget {
  kind: "ask_slider";
  prompt: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
  default_value?: number;
  anchor_labels?: { value: number; label: string }[];
}

export interface AskConfirmWidget extends BaseWidget {
  kind: "ask_confirm";
  prompt: string;
  pre_filled_value?: string | number | boolean;
  options?: string[]; // defaults ["ja", "nee", "ongeveer"]
}

export interface SystemPickerWidget extends BaseWidget {
  kind: "system_picker";
  category: string; // e.g. "crm", "bookkeeping"
  category_label_nl?: string;
  category_label_fr?: string;
  category_label_en?: string;
  prompt: string;
  options: SystemOption[];
  allow_multi?: boolean; // default true
  allow_other_text?: boolean; // default true
  allow_none?: boolean; // default true
  allow_unsure_probe_at_kickoff?: boolean; // default true (TBD flag)
  ask_admin_contact?: boolean; // default true
}

export interface ClosingSummaryWidget extends BaseWidget {
  kind: "closing_summary";
  summary: { goal: string; captured: string; confidence?: "low" | "medium" | "high" }[];
  missing?: string[];
  prompt?: string;
}

export type AnyWidget =
  | AskTextWidget
  | AskLongTextVoiceWidget
  | AskSingleSelectWidget
  | AskMultiSelectWidget
  | AskSliderWidget
  | AskConfirmWidget
  | SystemPickerWidget
  | ClosingSummaryWidget;

/* ------------------------------------------------------------------ *
 * Submission shape — what the client sends back per widget.
 * ------------------------------------------------------------------ */

export type SystemPickerSubmission = {
  selected: { name: string; domain: string; is_custom?: boolean }[];
  none_selected: boolean;
  unsure_probe_at_kickoff: boolean;
  admin_contact?: string;
};

export type WidgetSubmissionValue =
  | string
  | number
  | boolean
  | string[]
  | SystemPickerSubmission
  | { confirmed: boolean; value?: string | number | boolean }
  | { proceed: boolean; revisit?: string[] };

export interface WidgetSubmission {
  widget_id: string;
  kind: WidgetKind;
  value: WidgetSubmissionValue;
  goal_id?: string;
}

/* ------------------------------------------------------------------ *
 * Chat-stream events — what the SSE stream from
 * /api/intake/chat emits. Client renders accordingly.
 * ------------------------------------------------------------------ */

export type StreamEvent =
  | { type: "assistant_text_delta"; text: string }
  | { type: "assistant_text_done" }
  | { type: "widget"; widget: AnyWidget }
  | { type: "goal_update"; goal_id: string; status: "open" | "probing" | "satisfied" }
  | { type: "done" }
  | { type: "error"; message: string };

export interface ChatMessage {
  id: string;
  role: "assistant" | "user" | "system";
  text?: string;
  widget?: AnyWidget;
  submission?: WidgetSubmission;
  /** Streaming-in-progress flag for the typing cursor. */
  streaming?: boolean;
}

export interface IntakeState {
  token: string;
  personalization: IntakePersonalization;
  goal_status: Record<string, "open" | "probing" | "satisfied">;
  /**
   * Raw server-side state_json passthrough. Contains `messages` (the
   * Anthropic conversation history) so the client can rebuild the chat
   * on reload. Schemaless on purpose — server may stash other keys here.
   */
  state?: Record<string, unknown>;
  /** Server-provided opening message (i18n'd in personalization.language). */
  opening_assistant_text?: string;
  /** When set, the chat shell resumes mid-flow with a friendly welcome-back banner. */
  resumed?: { from_goal: string; assistant_text: string };
}

/**
 * Wire shape for `GET /api/intake/state?t=<token>`.
 *
 * Mirrored in [lib/intake/types.ts](../../lib/intake/types.ts) — both files
 * must stay in sync until the post-merge consolidation. Single source of
 * truth for the contract between `netlify/functions/intake-state.ts` (the
 * producer) and this page (the consumer).
 *
 * Note: keys are camelCase / no `_json` suffix. The DB column names
 * (`personalization_json` etc.) stay inside the function — wire shape ≠
 * Postgres schema. The token is intentionally NOT echoed back (the client
 * already has it from the URL).
 */
export interface IntakeStateResponse {
  personalization: IntakePersonalization;
  goal_status: Record<string, "open" | "probing" | "satisfied">;
  state: Record<string, unknown>;
  language: "nl" | "fr" | "en";
  flavor: "paying_client" | "lead_magnet";
  completed_at: string | null;
  identity: {
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
    email: string;
    role: string | null;
    sector: string | null;
  };
}
