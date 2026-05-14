/**
 * POST /api/intake/chat (mapped via netlify.toml redirect)
 *
 * Streaming chat. Wires Anthropic Sonnet 4.6 with:
 *   - System prompt built per-request from personalization JSON
 *   - All 8 widget tools + 4 state tools from intake-tools.ts
 *   - Prompt caching on tools + system block (5-min TTL default)
 *   - SSE pass-through of Anthropic's native stream events
 *
 * Uses Netlify's streaming-function API via the `stream()` helper from
 * @netlify/functions. The handler returns a `ReadableStream`; Netlify
 * pipes it back to the client as SSE. See:
 *   https://docs.netlify.com/build/functions/streaming-functions/
 *
 * Circuit-breaker per [intake-flow.md §Edge cases #13].
 * Permission scope per [intake-flow.md §Permission scope].
 */
import { stream } from "@netlify/functions";
import { Readable } from "node:stream";
import Anthropic from "@anthropic-ai/sdk";
import {
  getSessionByToken,
  scanForInjection,
  type IntakeRow,
} from "../../lib/intake/supabase-intake";
import { isPlausibleToken } from "../../lib/intake/token-mint";
import { INTAKE_TOOLS } from "../../lib/intake/intake-tools";
import { buildIntakeSystemPrompt } from "../../lib/intake/intake-system-prompt";

// Sonnet 4.6 = best speed/intelligence balance for conversational intake.
const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 4096;
const CIRCUIT_BREAKER_TOKENS = 50_000;

interface PostBody {
  token?: unknown;
  user_message?: unknown;
  /** Optional client-side history mirroring Anthropic MessageParam[]. */
  history?: Anthropic.MessageParam[];
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

function buildResumeContext(row: IntakeRow): string | null {
  const state = row.state_json ?? {};
  const goalStatus = row.goal_status_json ?? {};
  const hasAnswers = state.answers && Object.keys(state.answers as object).length > 0;
  const hasGoalProgress = Object.keys(goalStatus).length > 0;
  if (!hasAnswers && !hasGoalProgress) return null;
  return [
    "[RESUME CONTEXT — prior state in this same conversation]",
    "Goal status so far:",
    JSON.stringify(goalStatus, null, 2),
    "",
    "Answers captured so far (do NOT re-ask):",
    JSON.stringify(state.answers ?? {}, null, 2),
  ].join("\n");
}

/**
 * Single SSE event builder.
 */
function sseLine(eventType: string, payload: unknown): string {
  return `event: ${eventType}\ndata: ${JSON.stringify(payload)}\n\n`;
}

/**
 * Streaming Netlify Function. The `stream()` wrapper accepts an async
 * handler that returns a ReadableStream<Uint8Array>. Netlify holds the
 * response open and pipes the stream to the client.
 */
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

  let body: PostBody;
  try {
    body = JSON.parse(event.body ?? "{}") as PostBody;
  } catch {
    return errResp(400, "invalid_json");
  }

  if (typeof body.token !== "string" || !isPlausibleToken(body.token)) {
    return errResp(400, "missing_or_invalid_token");
  }
  if (typeof body.user_message !== "string") {
    return errResp(400, "missing_user_message");
  }

  const row = await getSessionByToken(body.token);
  if (!row) return errResp(404, "not_found");
  if (row.expires_at && new Date(row.expires_at) < new Date()) {
    return errResp(410, "expired");
  }
  if (row.completed_at) return errResp(410, "already_completed");

  // Light prompt-injection scan — log only, never block.
  const injectionScan = scanForInjection(body.user_message);
  if (injectionScan.suspicious) {
    console.warn(
      `[intake/chat] suspicious user input on token=${body.token.slice(0, 8)}…: ${injectionScan.hits.join(", ")}`
    );
  }

  const clientHistory = Array.isArray(body.history) ? body.history : [];
  const trimmedHistory = clientHistory.slice(-100);

  const messages: Anthropic.MessageParam[] = [];
  if (trimmedHistory.length === 0) {
    const resumeCtx = buildResumeContext(row);
    if (resumeCtx) {
      messages.push({
        role: "user",
        content: `<system-reminder>\n${resumeCtx}\n</system-reminder>\n\n${body.user_message}`,
      });
    } else {
      messages.push({ role: "user", content: body.user_message });
    }
  } else {
    messages.push(...trimmedHistory);
    messages.push({ role: "user", content: body.user_message });
  }

  const client = makeClient();
  const systemBlocks = buildSystemBlocks(row);

  // Netlify streaming functions expect a Node Readable (PipelineSource), not
  // a Web ReadableStream. Build a passthrough Readable and push SSE chunks
  // as they arrive from the Anthropic SDK.
  const bodyStream = new Readable({ read() {} });
  const send = (eventType: string, payload: unknown) => {
    bodyStream.push(sseLine(eventType, payload));
  };

  // Kick off the SDK work asynchronously — return the stream immediately so
  // Netlify starts piping bytes to the client.
  (async () => {
    try {
        // Circuit-breaker pre-flight on long conversations.
        let breakerHit = false;
        if (trimmedHistory.length >= 30) {
          try {
            const count = await client.messages.countTokens({
              model: MODEL,
              system: systemBlocks,
              tools: INTAKE_TOOLS,
              messages,
            });
            if (count.input_tokens > CIRCUIT_BREAKER_TOKENS) {
              breakerHit = true;
              send("circuit_breaker", {
                tokens: count.input_tokens,
                hint: "context_full_force_closing",
              });
              messages.push({
                role: "user",
                content:
                  "<system-reminder>Context approaching cap. Wrap up: call closing_summary with what you have, even if some goals are mid-confidence.</system-reminder>",
              });
            }
          } catch {
            /* best-effort */
          }
        }

        const sdkStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: systemBlocks,
          tools: INTAKE_TOOLS,
          messages,
        });

        for await (const evt of sdkStream) {
          send(evt.type, evt);
        }

        const finalMessage = await sdkStream.finalMessage();
        send("final_message", {
          stop_reason: finalMessage.stop_reason,
          usage: finalMessage.usage,
          cache_read_input_tokens: finalMessage.usage?.cache_read_input_tokens ?? 0,
          cache_creation_input_tokens:
            finalMessage.usage?.cache_creation_input_tokens ?? 0,
          breakerHit,
        });

      send("done", { ok: true });
    } catch (err) {
      send("error", {
        message: err instanceof Error ? err.message : "unknown",
      });
    } finally {
      bodyStream.push(null); // end of stream
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
