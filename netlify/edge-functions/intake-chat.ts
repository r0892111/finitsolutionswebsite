/**
 * /api/intake/chat — streaming chat (Netlify Edge Function on Deno)
 *
 * Replaces the old netlify/functions/intake-chat.ts which kept hitting
 * AWS Lambda Streaming 502s ("unexpected end of JSON input"). Edge
 * Functions run on Deno Deploy with native Web Streams — no Lambda
 * streaming wrapper, no AWS framing, so the 502s go away.
 *
 * Uses the raw Anthropic SDK directly (Vercel AI SDK didn't bundle
 * cleanly for Deno on Netlify Edge — left as a TODO if/when the SDK
 * ships better Deno compatibility). Same SSE event protocol as the old
 * function so OnboardingChat doesn't need to change shape.
 *
 * Conversation state stays in Anthropic's native MessageParam shape in
 * `state_json.messages` — unchanged from before this rewrite.
 */

import Anthropic from "@anthropic-ai/sdk";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { INTAKE_TOOLS } from "../../lib/intake/intake-tools.ts";
import { buildIntakeSystemPrompt } from "../../lib/intake/intake-system-prompt.ts";
import type {
  IntakeChatRequestBody,
  IntakePersonalization,
  IntakeStreamEvent,
  Language,
  WidgetKind,
  WidgetSubmission,
} from "../../lib/intake/types.ts";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MODEL_PRIMARY = "claude-sonnet-4-6";
const MODEL_FALLBACK = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 4096;
const CIRCUIT_BREAKER_TOKENS = 50_000;
const MAX_HISTORY_MESSAGES = 100;
const MAX_SONNET_ATTEMPTS = 3;
const MAX_TOTAL_ATTEMPTS = MAX_SONNET_ATTEMPTS + 1;

const WIDGET_TOOL_NAMES: ReadonlySet<WidgetKind> = new Set<WidgetKind>([
  "ask_text",
  "ask_long_text_voice",
  "ask_single_select",
  "ask_multi_select",
  "ask_slider",
  "ask_confirm",
  "system_picker",
  "closing_summary",
]);

function isWidgetTool(name: string): name is WidgetKind {
  return (WIDGET_TOOL_NAMES as ReadonlySet<string>).has(name);
}

// ---------------------------------------------------------------------------
// Types — local for the row shape; rest from lib/intake/types.
// ---------------------------------------------------------------------------

type GoalStatus = "open" | "probing" | "satisfied";

interface ServerStateJson {
  messages?: Anthropic.MessageParam[];
  answers?: Record<string, unknown>;
  [key: string]: unknown;
}

interface IntakeRow {
  id: string;
  token: string;
  language: Language;
  flavor: string;
  personalization_json: IntakePersonalization;
  state_json: ServerStateJson;
  goal_status_json: Record<string, GoalStatus>;
  expires_at: string | null;
  completed_at: string | null;
}

// ---------------------------------------------------------------------------
// Supabase (inline — avoids dragging Node-only `process.env` from lib/intake)
// ---------------------------------------------------------------------------

let supabaseSingleton: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (supabaseSingleton) return supabaseSingleton;
  const url = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("NEXT_PUBLIC_SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url) throw new Error("SUPABASE_URL is not set");
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  supabaseSingleton = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return supabaseSingleton;
}

const TABLE = "finit_intake_sessions";

async function getSessionByToken(token: string): Promise<IntakeRow | null> {
  const sb = getSupabase();
  const { data, error } = await sb.from(TABLE).select("*").eq("token", token).maybeSingle();
  if (error) throw error;
  return (data as IntakeRow | null) ?? null;
}

async function persistState(
  token: string,
  patch: {
    state_json?: ServerStateJson;
    goal_status_json?: Record<string, GoalStatus>;
    language?: Language;
  },
): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb
    .from(TABLE)
    .update({ ...patch, last_active_at: new Date().toISOString() })
    .eq("token", token);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Anthropic client (uses Deno.env)
// ---------------------------------------------------------------------------

function makeAnthropic(): Anthropic {
  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) throw new Error("ANTHROPIC_API_KEY is not set");
  return new Anthropic({ apiKey: key });
}

function buildSystemBlocks(row: IntakeRow): Anthropic.TextBlockParam[] {
  return [
    {
      type: "text",
      text: buildIntakeSystemPrompt(row.personalization_json),
      cache_control: { type: "ephemeral" },
    },
  ];
}

// ---------------------------------------------------------------------------
// Helpers — kickoff/resume strings + pending tool_use lookup
// ---------------------------------------------------------------------------

function kickoffMessage(language: Language): string {
  if (language === "fr") return "Bonjour, je suis prêt(e). Allons-y.";
  if (language === "en") return "Hi, I'm ready to start.";
  return "Hallo, ik ben er. We kunnen beginnen.";
}
function resumeMessage(language: Language): string {
  if (language === "fr") return "Je reprends. Reprenons là où nous nous étions arrêtés.";
  if (language === "en") return "I'm back. Let's pick up where we left off.";
  return "Ik ben terug. Laten we verder gaan waar we gebleven waren.";
}

function pendingToolUseBlocks(
  messages: Anthropic.MessageParam[],
): Array<{ id: string; name: string }> {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== "assistant") continue;
    if (typeof msg.content === "string" || !Array.isArray(msg.content)) return [];
    return msg.content
      .filter((b): b is Anthropic.ToolUseBlockParam => b.type === "tool_use")
      .map((b) => ({ id: b.id, name: b.name }));
  }
  return [];
}

function renderSubmissionForAgent(submission: WidgetSubmission): string {
  return JSON.stringify(
    {
      widget_id: submission.widget_id,
      kind: submission.kind,
      goal_id: submission.goal_id,
      value: submission.value,
    },
    null,
    2,
  );
}

// ---------------------------------------------------------------------------
// Friendly error messages
// ---------------------------------------------------------------------------

function friendlyError(language: Language, err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  const isOverloaded = /overloaded|529/i.test(raw);
  const isRateLimited = /rate.?limit|429/i.test(raw);
  if (isOverloaded) {
    return language === "fr"
      ? "Le service est temporairement saturé. Réessaie dans une minute."
      : language === "en"
        ? "The service is temporarily overloaded. Try again in a minute."
        : "Het systeem is even overbelast. Probeer over een minuut opnieuw.";
  }
  if (isRateLimited) {
    return language === "fr"
      ? "Trop de requêtes en peu de temps. Une petite pause et on reprend."
      : language === "en"
        ? "Too many requests in a short time. Brief pause and we'll continue."
        : "Even teveel verkeer. Kleine pauze en we gaan verder.";
  }
  return language === "fr"
    ? "Une erreur s'est produite. Réessaie en envoyant ta réponse à nouveau."
    : language === "en"
      ? "Something went wrong. Try submitting your answer again."
      : "Er ging iets mis. Probeer je antwoord opnieuw te versturen.";
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const errResp = (status: number, error: string) =>
    new Response(JSON.stringify({ error }), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  let body: IntakeChatRequestBody;
  try {
    body = (await req.json()) as IntakeChatRequestBody;
  } catch {
    return errResp(400, "invalid_json");
  }

  if (typeof body.token !== "string" || body.token.length < 16) {
    return errResp(400, "missing_or_invalid_token");
  }
  if (body.op !== "start" && body.op !== "submit_widget") {
    return errResp(400, "invalid_op");
  }
  if (body.op === "submit_widget" && (!body.submission || typeof body.submission.widget_id !== "string")) {
    return errResp(400, "missing_submission");
  }

  let row: IntakeRow | null;
  try {
    row = await getSessionByToken(body.token);
  } catch (err) {
    console.error("[intake/chat] supabase load failed:", err);
    return errResp(500, "supabase_load_failed");
  }
  if (!row) return errResp(404, "not_found");
  if (row.expires_at && new Date(row.expires_at) < new Date()) return errResp(410, "expired");
  if (row.completed_at) return errResp(410, "already_completed");

  const language: Language = body.language ?? row.language ?? "nl";
  const persistedState: ServerStateJson = (row.state_json as ServerStateJson) ?? {};
  const history: Anthropic.MessageParam[] = Array.isArray(persistedState.messages)
    ? persistedState.messages
    : [];
  const persistedAnswers: Record<string, unknown> =
    (persistedState.answers as Record<string, unknown>) ?? {};

  console.log(
    `[intake/chat] op=${body.op} token=${body.token.slice(0, 8)}… history.length=${history.length}`,
  );

  // ----- Build the new user message ----------------------------------------
  let newUserMessage: Anthropic.MessageParam | null = null;

  if (body.op === "start") {
    if (history.length === 0) {
      newUserMessage = { role: "user", content: kickoffMessage(language) };
    } else {
      const pending = pendingToolUseBlocks(history);
      if (pending.length === 0) {
        newUserMessage = { role: "user", content: resumeMessage(language) };
      } else {
        newUserMessage = {
          role: "user",
          content: pending.map((p) => ({
            type: "tool_result" as const,
            tool_use_id: p.id,
            content: isWidgetTool(p.name)
              ? "User did not respond yet (resumed without submitting). Re-prompt them gently."
              : '{"ok":true}',
          })),
        };
      }
    }
  } else {
    const pending = pendingToolUseBlocks(history);
    const submission = body.submission!;
    if (pending.length === 0) {
      newUserMessage = {
        role: "user",
        content: renderSubmissionForAgent(submission),
      };
    } else {
      const matchedWidget = pending.find((p) => isWidgetTool(p.name));
      const submissionContent = renderSubmissionForAgent(submission);
      newUserMessage = {
        role: "user",
        content: pending.map((p) => ({
          type: "tool_result" as const,
          tool_use_id: p.id,
          content:
            matchedWidget && p.id === matchedWidget.id
              ? submissionContent
              : '{"ok":true}',
        })),
      };
    }
  }

  if (!newUserMessage) return errResp(500, "could_not_build_user_message");

  const trimmedHistory = history.slice(-MAX_HISTORY_MESSAGES);
  const messagesForApi: Anthropic.MessageParam[] = [...trimmedHistory, newUserMessage];

  const client = makeAnthropic();
  const systemBlocks = buildSystemBlocks(row);

  // ----- Stream setup -------------------------------------------------------
  const encoder = new TextEncoder();
  let streamController!: ReadableStreamDefaultController<Uint8Array>;
  let streamClosed = false;

  const webStream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      // Comment frame — forces immediate bytes-on-the-wire so reverse proxies
      // never see the response as truncated during Anthropic's first-token
      // latency.
      controller.enqueue(encoder.encode(`:open\n\n`));
    },
  });

  const send = (e: IntakeStreamEvent) => {
    if (streamClosed) return;
    try {
      streamController.enqueue(encoder.encode(`data: ${JSON.stringify(e)}\n\n`));
    } catch {
      /* controller already closed */
    }
  };

  // ----- Async work — kick off Anthropic stream + translate events ---------
  type CurrentBlock =
    | { type: "text"; text: string }
    | { type: "tool_use"; id: string; name: string; partialJson: string };

  (async () => {
    const newGoalStatus: Record<string, GoalStatus> = {
      ...((row!.goal_status_json as Record<string, GoalStatus>) ?? {}),
    };
    const updatedAnswers: Record<string, unknown> = { ...persistedAnswers };
    const assistantBlocks: Anthropic.ContentBlockParam[] = [];
    let textEmitted = false;

    try {
      // Pre-flight token count + circuit breaker on long histories.
      if (trimmedHistory.length >= 30) {
        try {
          const count = await client.messages.countTokens({
            model: MODEL_PRIMARY,
            system: systemBlocks,
            tools: INTAKE_TOOLS,
            messages: messagesForApi,
          });
          if (count.input_tokens > CIRCUIT_BREAKER_TOKENS) {
            send({
              type: "circuit_breaker",
              tokens: count.input_tokens,
              hint: "context_full_force_closing",
            });
            messagesForApi.push({
              role: "user",
              content:
                "<system-reminder>Context approaching cap. Wrap up: call closing_summary with what you have, even if some goals are mid-confidence.</system-reminder>",
            });
          }
        } catch {
          /* best-effort */
        }
      }

      let currentBlock: CurrentBlock | null = null;
      let attempt = 0;

      while (true) {
        const useFallback = attempt >= MAX_SONNET_ATTEMPTS;
        const activeModel = useFallback ? MODEL_FALLBACK : MODEL_PRIMARY;

        const sdkStream = client.messages.stream({
          model: activeModel,
          max_tokens: MAX_TOKENS,
          system: systemBlocks,
          tools: INTAKE_TOOLS,
          messages: messagesForApi,
        });

        try {
          for await (const evt of sdkStream) {
            if (evt.type === "content_block_start") {
              const cb = evt.content_block;
              if (cb.type === "text") {
                currentBlock = { type: "text", text: "" };
              } else if (cb.type === "tool_use") {
                currentBlock = {
                  type: "tool_use",
                  id: cb.id,
                  name: cb.name,
                  partialJson: "",
                };
              }
            } else if (evt.type === "content_block_delta") {
              if (!currentBlock) continue;
              if (evt.delta.type === "text_delta" && currentBlock.type === "text") {
                currentBlock.text += evt.delta.text;
                send({ type: "assistant_text_delta", text: evt.delta.text });
                textEmitted = true;
              } else if (
                evt.delta.type === "input_json_delta" &&
                currentBlock.type === "tool_use"
              ) {
                currentBlock.partialJson += evt.delta.partial_json;
              }
            } else if (evt.type === "content_block_stop") {
              if (!currentBlock) continue;
              if (currentBlock.type === "text") {
                assistantBlocks.push({ type: "text", text: currentBlock.text });
              } else {
                let parsedInput: Record<string, unknown> = {};
                try {
                  parsedInput = currentBlock.partialJson
                    ? (JSON.parse(currentBlock.partialJson) as Record<string, unknown>)
                    : {};
                } catch (err) {
                  console.warn(
                    `[intake/chat] could not parse tool input for ${currentBlock.name}:`,
                    err,
                  );
                }

                assistantBlocks.push({
                  type: "tool_use",
                  id: currentBlock.id,
                  name: currentBlock.name,
                  input: parsedInput,
                });

                const toolName = currentBlock.name;

                if (isWidgetTool(toolName)) {
                  const widgetId =
                    (parsedInput.widget_id as string | undefined) ??
                    `w-${currentBlock.id.slice(-8)}`;
                  send({
                    type: "widget",
                    widget: {
                      ...parsedInput,
                      kind: toolName,
                      widget_id: widgetId,
                    },
                  });
                } else if (toolName === "update_goal_status") {
                  const goalId = parsedInput.goal_id as string | undefined;
                  const status = parsedInput.status as GoalStatus | undefined;
                  if (goalId && status) {
                    newGoalStatus[goalId] = status;
                    send({ type: "goal_update", goal_id: goalId, status });
                  }
                } else if (toolName === "save_answer") {
                  const goalId =
                    (parsedInput.key as string | undefined) ??
                    (parsedInput.goal_id as string | undefined) ??
                    (parsedInput.widget_id as string | undefined);
                  if (goalId) {
                    updatedAnswers[goalId] = parsedInput.value ?? parsedInput;
                  }
                } else if (toolName === "request_resume_link") {
                  send({
                    type: "request_resume_link",
                    email: parsedInput.email as string | undefined,
                  });
                } else if (toolName === "submit_intake") {
                  send({ type: "done", ok: true });
                }
              }
              currentBlock = null;
            }
            // message_start / message_delta / message_stop are ignored.
          }
          break; // streamed cleanly — exit retry loop
        } catch (streamErr) {
          const msg = streamErr instanceof Error ? streamErr.message : String(streamErr);
          const isOverloaded = /overloaded|529/i.test(msg);
          const safeToRetry =
            isOverloaded &&
            !textEmitted &&
            assistantBlocks.length === 0 &&
            attempt < MAX_TOTAL_ATTEMPTS - 1;
          if (!safeToRetry) throw streamErr;
          attempt++;
          const willFallback = attempt >= MAX_SONNET_ATTEMPTS;
          const backoff = willFallback ? 0 : attempt * 2000;
          console.warn(
            `[intake/chat] anthropic overloaded on ${activeModel} — ${
              willFallback
                ? `falling back to ${MODEL_FALLBACK}`
                : `retry ${attempt}/${MAX_SONNET_ATTEMPTS - 1} in ${backoff}ms`
            }`,
          );
          if (backoff > 0) await new Promise((r) => setTimeout(r, backoff));
          currentBlock = null;
          continue;
        }
      }

      if (textEmitted) {
        send({ type: "assistant_text_done" });
      }

      // ----- Persist updated state -------------------------------------------
      // Filter empty text blocks — Anthropic rejects {type:'text', text:''} in
      // subsequent turns' history.
      const filteredAssistantBlocks = assistantBlocks.filter((b) => {
        if (b.type === "text") {
          return typeof b.text === "string" && b.text.trim().length > 0;
        }
        return true;
      });
      const newAssistantMessage: Anthropic.MessageParam = {
        role: "assistant",
        content:
          filteredAssistantBlocks.length > 0
            ? filteredAssistantBlocks
            : [{ type: "text", text: "(no content)" }],
      };
      console.log(
        `[intake/chat] persisting turn — text_blocks=${
          filteredAssistantBlocks.filter((b) => b.type === "text").length
        } tool_use_blocks=${filteredAssistantBlocks.filter((b) => b.type === "tool_use").length}`,
      );
      const updatedHistory: Anthropic.MessageParam[] = [
        ...history,
        newUserMessage!,
        newAssistantMessage,
      ];

      const updatedState: ServerStateJson = {
        ...persistedState,
        messages: updatedHistory,
        answers: updatedAnswers,
      };

      try {
        await persistState(body.token, {
          state_json: updatedState,
          goal_status_json: newGoalStatus,
          language,
        });
      } catch (persistErr) {
        console.error("[intake/chat] state persist failed:", persistErr);
      }
    } catch (err) {
      console.error("[intake/chat] stream error:", err);
      send({ type: "error", message: friendlyError(language, err) });
    } finally {
      streamClosed = true;
      try {
        streamController.close();
      } catch {
        /* already closed */
      }
    }
  })();

  return new Response(webStream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
};

export const config = {
  path: "/api/intake/chat",
};
