/**
 * Type definitions for the Finit OS interactive intake — server-side import.
 *
 * NOTE on duplication: the Web-frontend branch (`intake-build/widgets`)
 * also ships `app/intake/types.ts` with the SAME shapes for use by the
 * widget components. Both files exist on purpose during parallel build —
 * once both branches merge to main, the operator should consolidate to a
 * single canonical types file (recommended location: this one, since
 * `lib/` is the natural shared layer) and update widget imports.
 *
 * Source of truth: [intake-flow.md §Persistence + §Widget catalog]
 * (../../../finit-os/docs/specs/intake-flow.md).
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

export interface PreFilledValue<T = string | number | boolean> {
  value: T;
  source: "sales-call" | "website-scrape" | "public-form" | "operator" | "manual";
  confidence?: "low" | "medium" | "high";
}

export interface SystemOption {
  name: string;
  domain: string;
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
  maturity_score?: number;
  maturity_confidence?: "low" | "medium" | "high";
  maturity_signal?: string;
  stated_vision?: string;
  sales_call_highlights?: string[];
  pre_filled?: Record<string, PreFilledValue>;
  system_options?: Record<string, SystemOption[]> & {
    _sector_specific?: Record<string, SystemOption[]>;
  };
  goal_emphasis?: Record<
    | "operational_reality"
    | "value_drains"
    | "ai_maturity"
    | "system_landscape"
    | "economic_stakes"
    | "magic_wand",
    "standard" | "deep_probe" | "trim" | "top_3_only" | "skip"
  >;
  minted_at?: string;
  minted_by_operator?: string;
}
