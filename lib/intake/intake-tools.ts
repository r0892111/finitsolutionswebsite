/**
 * Anthropic tool-use definitions for the intake agent.
 *
 * Each tool maps 1:1 to a widget kind from [intake-flow.md §Widget catalog]
 * (../../../finit-os/docs/specs/intake-flow.md), plus four state-management
 * tools: save_answer, update_goal_status, request_resume_link, submit_intake.
 *
 * The schemas array is what gets passed to messages.create() and what we
 * prompt-cache together with the system prompt. Keep this list ordered and
 * deterministic — any change to ordering or serialization invalidates the
 * cache prefix.
 */
import type Anthropic from "@anthropic-ai/sdk";

export const INTAKE_TOOLS: Anthropic.Tool[] = [
  // -----------------------------------------------------------------------
  // Widget tools — agent emits these to render UI on the client.
  // -----------------------------------------------------------------------
  {
    name: "ask_text",
    description:
      "Render a short text input. Use for crisp factual answers (name, role, single email, etc.). Output is a single string. Always supply a clear prompt in the user's language.",
    input_schema: {
      type: "object",
      properties: {
        widget_id: {
          type: "string",
          description: "Stable id you choose; reuse if re-rendering the same question.",
        },
        goal_id: {
          type: "string",
          description: "One of: operational_reality, value_drains, ai_maturity, system_landscape, economic_stakes, magic_wand, secondary, identity.",
        },
        prompt: { type: "string" },
        placeholder: { type: "string" },
        max_length: { type: "integer" },
      },
      required: ["widget_id", "prompt"],
    },
  },
  {
    name: "ask_long_text_voice",
    description:
      "Render a long-form text area with voice-recording support. Use for process walkthroughs, vision, magic-wand answers — anything where richness matters more than terseness.",
    input_schema: {
      type: "object",
      properties: {
        widget_id: { type: "string" },
        goal_id: { type: "string" },
        prompt: { type: "string" },
        placeholder: { type: "string" },
        voice_enabled: { type: "boolean", description: "Defaults to true." },
      },
      required: ["widget_id", "prompt"],
    },
  },
  {
    name: "ask_single_select",
    description:
      "Render a single-choice picker. Use only when the choice set is small and known (≤ ~6 options). For sector-specific tool pickers, prefer system_picker.",
    input_schema: {
      type: "object",
      properties: {
        widget_id: { type: "string" },
        goal_id: { type: "string" },
        prompt: { type: "string" },
        options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: { type: "string" },
              label: { type: "string" },
              description: { type: "string" },
            },
            required: ["value", "label"],
          },
        },
        allow_other_text: { type: "boolean" },
      },
      required: ["widget_id", "prompt", "options"],
    },
  },
  {
    name: "ask_multi_select",
    description:
      "Render a multi-choice picker. Use for capabilities, languages-spoken, departments-involved, etc.",
    input_schema: {
      type: "object",
      properties: {
        widget_id: { type: "string" },
        goal_id: { type: "string" },
        prompt: { type: "string" },
        options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: { type: "string" },
              label: { type: "string" },
              description: { type: "string" },
            },
            required: ["value", "label"],
          },
        },
        min: { type: "integer" },
        max: { type: "integer" },
        allow_other_text: { type: "boolean" },
      },
      required: ["widget_id", "prompt", "options"],
    },
  },
  {
    name: "ask_slider",
    description:
      "Render a numeric slider. Use for hourly rates, team-size estimates, EUR/month framings. Anchor labels at min/mid/max land better than raw numbers.",
    input_schema: {
      type: "object",
      properties: {
        widget_id: { type: "string" },
        goal_id: { type: "string" },
        prompt: { type: "string" },
        min: { type: "number" },
        max: { type: "number" },
        step: { type: "number" },
        unit: { type: "string", description: "e.g. EUR, uur/maand, mensen" },
        default_value: { type: "number" },
        anchor_labels: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: { type: "number" },
              label: { type: "string" },
            },
            required: ["value", "label"],
          },
        },
      },
      required: ["widget_id", "prompt", "min", "max", "step"],
    },
  },
  {
    name: "ask_confirm",
    description:
      "Render a yes/no/roughly confirmation, optionally with a pre-filled value to verify (e.g. 'klopt het dat jullie ~8 medewerkers tellen?').",
    input_schema: {
      type: "object",
      properties: {
        widget_id: { type: "string" },
        goal_id: { type: "string" },
        prompt: { type: "string" },
        pre_filled_value: {
          description: "Pre-fill to verify. String, number, or boolean.",
        },
        options: {
          type: "array",
          items: { type: "string" },
          description: "Defaults to ['ja','nee','ongeveer'] when omitted.",
        },
      },
      required: ["widget_id", "prompt"],
    },
  },
  {
    name: "system_picker",
    description:
      "Render the logo-tile system picker for one IT category (CRM / email / bookkeeping / dispatch / ERP / premie-portalen, etc.). Pull options from the personalization JSON's system_options for the matching category, OR add tools the user just named. Always allow 'Anders → typ het in', 'We gebruiken hier niets voor', and 'Niet zeker, vraag aan collega'.",
    input_schema: {
      type: "object",
      properties: {
        widget_id: { type: "string" },
        goal_id: {
          type: "string",
          description: "Should be 'system_landscape' for Goal 4 widgets.",
        },
        category: {
          type: "string",
          description: "e.g. crm, email, bookkeeping, file_storage, project_mgmt, comms, calendar, dispatch, premie_portals.",
        },
        category_label_nl: { type: "string" },
        category_label_fr: { type: "string" },
        category_label_en: { type: "string" },
        prompt: { type: "string" },
        options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              domain: {
                type: "string",
                description: "For logo.clearbit.com/<domain>.",
              },
              tier: { type: "string", enum: ["primary", "secondary"] },
            },
            required: ["name", "domain"],
          },
        },
        allow_multi: { type: "boolean", description: "Default true." },
        allow_other_text: { type: "boolean", description: "Default true." },
        allow_none: { type: "boolean", description: "Default true." },
        allow_unsure_probe_at_kickoff: {
          type: "boolean",
          description: "Default true. Flags TBD for kickoff.",
        },
        ask_admin_contact: {
          type: "boolean",
          description: "Default true; asks 'Wie heeft admin-toegang?' inline.",
        },
      },
      required: ["widget_id", "prompt", "category", "options"],
    },
  },
  {
    name: "closing_summary",
    description:
      "Render the end-of-intake review. The user sees what was captured per goal, can flag corrections, and confirms submission. Use this when ALL prioritized goals are at high confidence OR the user signals 'I'm done'.",
    input_schema: {
      type: "object",
      properties: {
        widget_id: { type: "string" },
        summary: {
          type: "array",
          items: {
            type: "object",
            properties: {
              goal: { type: "string" },
              captured: { type: "string" },
              confidence: { type: "string", enum: ["low", "medium", "high"] },
            },
            required: ["goal", "captured"],
          },
        },
        missing: {
          type: "array",
          items: { type: "string" },
          description: "Optional list of goals that are still low-confidence. Surfaced so the prospect can choose 'finish now' or 'fill in <X>'.",
        },
        prompt: { type: "string" },
      },
      required: ["widget_id", "summary"],
    },
  },

  // -----------------------------------------------------------------------
  // State-management tools — server-side effects, no UI render.
  // -----------------------------------------------------------------------
  {
    name: "save_answer",
    description:
      "Persist a structured answer to Supabase state_json. Call this whenever the user has given a confidence-signal-clearing answer to a goal. Idempotent — overwrites the same key. Use the widget_id (or a goal-derived key like 'value_drains.quote_followup') as the key.",
    input_schema: {
      type: "object",
      properties: {
        goal_id: { type: "string" },
        key: {
          type: "string",
          description: "Stable key under state_json.answers — usually the widget_id or a dotted goal path.",
        },
        value: {
          description: "Any JSON value (string, number, boolean, object, array).",
        },
        confidence: { type: "string", enum: ["low", "medium", "high"] },
      },
      required: ["key", "value"],
    },
  },
  {
    name: "update_goal_status",
    description:
      "Move a goal from 'open' → 'probing' → 'satisfied'. Goal IDs: operational_reality, value_drains, ai_maturity, system_landscape, economic_stakes, magic_wand.",
    input_schema: {
      type: "object",
      properties: {
        goal_id: {
          type: "string",
          enum: [
            "operational_reality",
            "value_drains",
            "ai_maturity",
            "system_landscape",
            "economic_stakes",
            "magic_wand",
            "secondary",
            "identity",
          ],
        },
        status: {
          type: "string",
          enum: ["open", "probing", "satisfied"],
        },
      },
      required: ["goal_id", "status"],
    },
  },
  {
    name: "request_resume_link",
    description:
      "Email a resume-link to the prospect when they want to pause. Server enqueues a transactional email; agent should follow up with a friendly 'we've sent it' message.",
    input_schema: {
      type: "object",
      properties: {
        email: { type: "string" },
      },
      required: ["email"],
    },
  },
  {
    name: "submit_intake",
    description:
      "Finalize the intake. The server will (a) for paying_client: commit state to the client's GitHub repo + email operator, (b) for lead_magnet: generate and email the mini-report. Call this ONLY after the user confirms via closing_summary.",
    input_schema: {
      type: "object",
      properties: {
        confirmed: { type: "boolean", description: "Must be true." },
      },
      required: ["confirmed"],
    },
  },
];

/**
 * The full list of tool names — useful for the chat handler when it needs to
 * decide whether a tool_use block is a "render widget on the client" call vs.
 * a "run side effect on the server" call.
 */
export const WIDGET_TOOL_NAMES = new Set<string>([
  "ask_text",
  "ask_long_text_voice",
  "ask_single_select",
  "ask_multi_select",
  "ask_slider",
  "ask_confirm",
  "system_picker",
  "closing_summary",
]);

export const STATE_TOOL_NAMES = new Set<string>([
  "save_answer",
  "update_goal_status",
  "request_resume_link",
  "submit_intake",
]);

export function isWidgetTool(name: string): boolean {
  return WIDGET_TOOL_NAMES.has(name);
}

export function isStateTool(name: string): boolean {
  return STATE_TOOL_NAMES.has(name);
}
