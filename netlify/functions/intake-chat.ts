/**
 * POST /api/intake/chat (mapped via netlify.toml redirect)
 *
 * Streaming chat with full server-side translation between the
 * Anthropic native protocol and the app-shaped event protocol the
 * widget client speaks.
 *
 * Request body — typed by `IntakeChatRequestBody`:
 *   - `op: 'start'`            → kick off (or resume) the conversation
 *   - `op: 'submit_widget'`    → user submitted a widget; payload in `submission`
 *
 * Response — SSE stream of `IntakeStreamEvent` payloads. Each event is
 * one `data: <json>\n\n` frame. Server emits app-shaped events only —
 * raw Anthropic events (`message_start`, `content_block_delta`, etc.)
 * are never forwarded; they're translated here.
 *
 * Conversation state lives server-side in `state_json.messages` so the
 * client doesn't need to manage Anthropic's tool_use / tool_result
 * protocol. On each request the server reconstructs the messages
 * array, appends the new user message (kickoff or tool_results),
 * streams Anthropic, and writes the updated history back to Supabase.
 *
 * Spec references:
 *   - [intake-flow.md §Web app routes]
 *   - [intake-flow.md §Edge cases #13] (circuit breaker)
 *   - [intake-flow.md §Permission scope]
 */
import { stream } from "@netlify/functions";
import { Readable } from "node:stream";
import Anthropic from "@anthropic-ai/sdk";
import {
  getSessionByToken,
  scanForInjection,
  updateSessionState,
  type IntakeRow,
} from "../../lib/intake/supabase-intake";
import { isPlausibleToken } from "../../lib/intake/token-mint";
import { INTAKE_TOOLS } from "../../lib/intake/intake-tools";
import { buildIntakeSystemPrompt } from "../../lib/intake/intake-system-prompt";
import type {
  IntakeChatRequestBody,
  IntakeStreamEvent,
  Language,
  WidgetKind,
  WidgetSubmission,
} from "../../lib/intake/types";

// Sonnet 4.6 = best speed/intelligence balance for conversational intake.
// Haiku 4.5 = fallback when Sonnet is overloaded — same family, lighter,
// almost always has capacity. Slight quality dip but the conversation
// stays alive instead of erroring out.
const MODEL = "claude-sonnet-4-6";
const FALLBACK_MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 4096;
const CIRCUIT_BREAKER_TOKENS = 50_000;
const MAX_HISTORY_MESSAGES = 100;

// Names of the 8 widget-rendering tools. State tools (save_answer,
// update_goal_status, request_resume_link, submit_intake) are NOT in
// this set — they don't render UI, they manipulate state.
const WIDGET_TOOL_NAMES = new Set<WidgetKind>([
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
  return (WIDGET_TOOL_NAMES as Set<string>).has(name);
}

function makeClient(): Anthropic {
  const key = process.env.ANTHROPIC_API_KEY;
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

/**
 * Server-maintained state_json shape. The agent's full conversation
 * history lives here so the client doesn't manage tool_use protocol.
 */
interface ServerStateJson {
  messages?: Anthropic.MessageParam[];
  answers?: Record<string, unknown>;
  [key: string]: unknown;
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

/**
 * Find the most recent assistant message and return its tool_use blocks.
 * Used to construct matching tool_result blocks on the next user turn —
 * Anthropic requires every tool_use to have a paired tool_result before
 * the next assistant turn.
 */
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

export const handler = stream(async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "text/plain" } as Record<string, string>,
      body: "Method Not Allowed",
    };
  }

  const errResp = (statusCode: number, err: string) => ({
    statusCode,
    headers: { "Content-Type": "application/json" } as Record<string, string>,
    body: JSON.stringify({ error: err }),
  });

  let body: IntakeChatRequestBody;
  try {
    body = JSON.parse(event.body ?? "{}") as IntakeChatRequestBody;
  } catch {
    return errResp(400, "invalid_json");
  }

  if (typeof body.token !== "string" || !isPlausibleToken(body.token)) {
    return errResp(400, "missing_or_invalid_token");
  }
  if (body.op !== "start" && body.op !== "submit_widget") {
    return errResp(400, "invalid_op");
  }
  if (body.op === "submit_widget") {
    if (!body.submission || typeof body.submission.widget_id !== "string") {
      return errResp(400, "missing_submission");
    }
  }

  const row = await getSessionByToken(body.token);
  if (!row) return errResp(404, "not_found");
  if (row.expires_at && new Date(row.expires_at) < new Date()) {
    return errResp(410, "expired");
  }
  if (row.completed_at) return errResp(410, "already_completed");

  // Light prompt-injection scan on submission free-text — log only.
  if (body.op === "submit_widget" && body.submission) {
    const v = body.submission.value;
    if (typeof v === "string") {
      const scan = scanForInjection(v);
      if (scan.suspicious) {
        console.warn(
          `[intake/chat] suspicious widget answer on token=${body.token.slice(0, 8)}…: ${scan.hits.join(", ")}`,
        );
      }
    }
  }

  const language: Language = body.language ?? row.language ?? "nl";
  const persistedState: ServerStateJson = (row.state_json as ServerStateJson) ?? {};
  const history: Anthropic.MessageParam[] = Array.isArray(persistedState.messages)
    ? persistedState.messages
    : [];
  const persistedAnswers: Record<string, unknown> =
    (persistedState.answers as Record<string, unknown>) ?? {};

  console.log(
    `[intake/chat] op=${body.op} token=${body.token.slice(0, 8)}... history.length=${history.length}`,
  );

  // ----- Build the new user message --------------------------------------
  let newUserMessage: Anthropic.MessageParam | null = null;

  if (body.op === "start") {
    if (history.length === 0) {
      newUserMessage = { role: "user", content: kickoffMessage(language) };
    } else {
      // Resume — if the last assistant turn was waiting on a widget answer,
      // close out that pending tool_use with a friendly placeholder so the
      // agent isn't stuck mid-tool-use.
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
    // submit_widget — construct tool_result blocks for ALL pending tool_uses
    // in the prior assistant message. The matching widget tool_use gets the
    // user's submission as its content; state-tool tool_uses get a synthetic
    // {"ok":true}. Anthropic requires every tool_use to have a tool_result.
    const pending = pendingToolUseBlocks(history);
    const submission = body.submission!;
    if (pending.length === 0) {
      // Edge case: client submitted a widget but server has no record of
      // a pending widget. Degrade gracefully — pass the submission as a
      // plain user message; the agent can recover.
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

  // Trim history to last MAX_HISTORY_MESSAGES so token usage stays bounded.
  const trimmedHistory = history.slice(-MAX_HISTORY_MESSAGES);
  const messagesForApi: Anthropic.MessageParam[] = [
    ...trimmedHistory,
    newUserMessage,
  ];

  const client = makeClient();
  const systemBlocks = buildSystemBlocks(row);

  // ----- Stream setup ----------------------------------------------------
  // Web ReadableStream wrapped in Node.Readable.fromWeb for @netlify/
  // functions stream() compatibility. The Web ReadableStream gives us
  // unambiguous controller.close() semantics that AWS Lambda Streaming
  // can decode reliably (vs the prior PassThrough buffering pattern that
  // intermittently produced "unexpected end of JSON input" 502s).
  const encoder = new TextEncoder();
  let streamController!: ReadableStreamDefaultController<Uint8Array>;
  const webStream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      // Heartbeat comment (SSE-spec: lines starting with `:` are ignored
      // by event handlers). Forces immediate bytes-on-the-wire so AWS
      // doesn't perceive the stream as malformed during Anthropic latency.
      controller.enqueue(encoder.encode(`:open\n\n`));
    },
  });
  const bodyStream = Readable.fromWeb(
    webStream as unknown as import("node:stream/web").ReadableStream<Uint8Array>,
  );
  let streamClosed = false;
  const send = (e: IntakeStreamEvent) => {
    if (streamClosed) return;
    try {
      streamController.enqueue(encoder.encode(`data: ${JSON.stringify(e)}\n\n`));
    } catch {
      /* controller already closed — silently drop */
    }
  };

  type CurrentBlock =
    | { type: "text"; text: string }
    | { type: "tool_use"; id: string; name: string; partialJson: string };

  // ----- Async work — kick off Anthropic stream + translate events ------
  (async () => {
    const newGoalStatus: Record<string, "open" | "probing" | "satisfied"> = {
      ...((row.goal_status_json as Record<
        string,
        "open" | "probing" | "satisfied"
      >) ?? {}),
    };
    const updatedAnswers: Record<string, unknown> = { ...persistedAnswers };
    const assistantBlocks: Anthropic.ContentBlockParam[] = [];
    let textEmitted = false;

    try {
      // Pre-flight token count + circuit breaker on long histories. Best-
      // effort — if the count call itself fails, just proceed.
      if (trimmedHistory.length >= 30) {
        try {
          const count = await client.messages.countTokens({
            model: MODEL,
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

      // Retry-on-overload loop. Anthropic's overloaded_error / 529 only
      // surfaces during async iteration of messages.stream(), so wrap the
      // whole streaming block. Retry is GUARDED — only fires while nothing
      // has been sent to the client yet, so we never produce duplicate
      // text or widgets if the first attempt partially streamed.
      //
      // Strategy: 3 attempts on Sonnet 4.6 (with 2s+4s backoffs), then
      // 1 attempt on Haiku 4.5 as a fallback. Haiku has separate capacity
      // and almost always responds even when Sonnet is hot.
      const MAX_SONNET_ATTEMPTS = 3;
      const MAX_TOTAL_ATTEMPTS = MAX_SONNET_ATTEMPTS + 1;
      let currentBlock: CurrentBlock | null = null;
      let attempt = 0;

      while (true) {
      const useFallback = attempt >= MAX_SONNET_ATTEMPTS;
      const activeModel = useFallback ? FALLBACK_MODEL : MODEL;
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
          if (!currentBlock) {
            continue;
          } else if (currentBlock.type === "text") {
            assistantBlocks.push({ type: "text", text: currentBlock.text });
          } else {
            // Parse the tool input now that the block is complete.
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
              const status = parsedInput.status as
                | "open"
                | "probing"
                | "satisfied"
                | undefined;
              if (goalId && status) {
                newGoalStatus[goalId] = status;
                send({ type: "goal_update", goal_id: goalId, status });
              }
            } else if (toolName === "save_answer") {
              const goalId =
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
              // Agent has confirmed the intake is complete. The client's
              // `done` event handler is what shows the "thanks, your
              // answers are saved" banner — emit it ONLY here, never per
              // stream. (Actual finalize via /api/intake/submit is a
              // follow-up; for now the row stays open and the operator's
              // queue check picks it up.)
              send({ type: "done", ok: true });
            }
          }
          currentBlock = null;
        }
        // message_start / message_delta / message_stop are ignored —
        // we surface our own `done` event after persistence.
      }
      break; // streaming completed cleanly — exit retry loop
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
        // Sonnet retries: 2s, 4s. Fallback to Haiku: no extra wait.
        const backoff = willFallback ? 0 : attempt * 2000;
        console.warn(
          `[intake/chat] anthropic overloaded on ${activeModel} — ${willFallback ? `falling back to ${FALLBACK_MODEL}` : `retry ${attempt}/${MAX_SONNET_ATTEMPTS - 1} in ${backoff}ms`}`,
        );
        if (backoff > 0) await new Promise((r) => setTimeout(r, backoff));
        // Reset transient per-attempt state. newGoalStatus/updatedAnswers
        // are unchanged because we never reached the tool_use processing.
        currentBlock = null;
        continue;
      }
      } // end retry loop

      if (textEmitted) {
        send({ type: "assistant_text_done" });
      }

      // ----- Persist updated state ------------------------------------------
      // Filter out empty text blocks — Anthropic rejects {type:'text', text:''}
      // in subsequent turns' history. Better a missing block than a poison one.
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
        `[intake/chat] persisting turn — text_blocks=${filteredAssistantBlocks.filter((b) => b.type === "text").length} tool_use_blocks=${filteredAssistantBlocks.filter((b) => b.type === "tool_use").length}`,
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
        await updateSessionState(body.token, {
          state_json: updatedState,
          goal_status_json: newGoalStatus,
          language,
        });
      } catch (persistErr) {
        // Don't fail the stream — client got its events. Surface in
        // logs so the operator's queue check picks it up.
        console.error("[intake/chat] state persist failed:", persistErr);
      }

      // NOTE: do NOT emit `done` per stream. The client's `done` handler
      // means "intake fully complete — clear widget, show thanks banner".
      // We only emit it when the agent calls submit_intake (handled above).
      // The natural end of the SSE stream (reader.read() → done=true) is
      // what tells the client this turn is over.
    } catch (err) {
      console.error("[intake/chat] stream error:", err);
      // Friendly error mapping per language. Raw err.message is rarely
      // useful to the prospect (e.g. JSON-stringified Anthropic error
      // payloads); map common cases to plain-language Dutch/FR/EN.
      const raw = err instanceof Error ? err.message : String(err);
      const isOverloaded = /overloaded|529/i.test(raw);
      const isRateLimited = /rate.?limit|429/i.test(raw);
      let friendly: string;
      if (isOverloaded) {
        friendly =
          language === "fr"
            ? "Le service est temporairement saturé. Réessaie dans une minute."
            : language === "en"
              ? "The service is temporarily overloaded. Try again in a minute."
              : "Het systeem is even overbelast. Probeer over een minuut opnieuw.";
      } else if (isRateLimited) {
        friendly =
          language === "fr"
            ? "Trop de requêtes en peu de temps. Une petite pause et on reprend."
            : language === "en"
              ? "Too many requests in a short time. Brief pause and we'll continue."
              : "Even teveel verkeer. Kleine pauze en we gaan verder.";
      } else {
        friendly =
          language === "fr"
            ? "Une erreur s'est produite. Réessaie en envoyant ta réponse à nouveau."
            : language === "en"
              ? "Something went wrong. Try submitting your answer again."
              : "Er ging iets mis. Probeer je antwoord opnieuw te versturen.";
      }
      send({ type: "error", message: friendly });
    } finally {
      // Web ReadableStream close() = clean EOF, signals AWS Lambda
      // Streaming to write its trailer metadata so the response decodes
      // properly on the client side.
      streamClosed = true;
      try {
        streamController.close();
      } catch {
        /* already closed */
      }
    }
  })();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
    body: bodyStream,
  };
});
