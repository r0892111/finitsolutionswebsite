/**
 * POST /api/intake/chat
 *
 * The streaming chat endpoint. Wires Anthropic Sonnet 4.6 with:
 *   - System prompt built per-request from the personalization JSON
 *   - All 8 widget tools + 4 state tools from intake-tools.ts
 *   - Prompt caching on tools + system block (5-min TTL default)
 *   - SSE pass-through of Anthropic's native stream events (the frontend
 *     parses them directly — the protocol is "whatever the SDK emits")
 *
 * Circuit-breaker: if accumulated input + history exceeds 50K tokens, we
 * append a system-reminder forcing closing_summary on the next turn. Per
 * [intake-flow.md §Edge cases #13](../../../../../finit-os/docs/specs/intake-flow.md).
 *
 * Permission scope: the agent has ONLY the tools listed in intake-tools.ts.
 * No read_file, no execute_command, no web_search, no Agent SDK runtime —
 * see [intake-flow.md §Permission scope].
 *
 * Runtime: Node (Anthropic SDK is Node-friendly; edge runtime not required).
 */
import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  getSessionByToken,
  scanForInjection,
  type IntakeRow,
} from "@/lib/intake/supabase-intake";
import { isPlausibleToken } from "@/lib/intake/token-mint";
import { INTAKE_TOOLS } from "@/lib/intake/intake-tools";
import { buildIntakeSystemPrompt } from "@/lib/intake/intake-system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sonnet 4.6 = best speed/intelligence balance for conversational intake.
// Opus 4.7 is overkill for this — and adaptive thinking + the high-frequency
// chat pattern would push cost past the €4/intake ceiling.
const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 4096;

// Circuit breaker: above this we tell the agent to wrap up.
const CIRCUIT_BREAKER_TOKENS = 50_000;

interface PostBody {
  token?: unknown;
  user_message?: unknown;
  /**
   * Optional client-side conversation history. Wire format mirrors the
   * Anthropic MessageParam[] shape so the client can rebuild it from the
   * stream. The server treats this as untrusted input — the system prompt
   * and tool set are server-controlled.
   */
  history?: Anthropic.MessageParam[];
}

function makeClient(): Anthropic {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY is not set");
  return new Anthropic({ apiKey: key });
}

function buildSystemBlocks(row: IntakeRow): Anthropic.TextBlockParam[] {
  const prompt = buildIntakeSystemPrompt(row.personalization_json);

  // One cached system block. The tools array (ordered, deterministic) and
  // this prompt together form the cached prefix. Any state-from-DB injection
  // happens AFTER the breakpoint, in the messages array.
  return [
    {
      type: "text",
      text: prompt,
      cache_control: { type: "ephemeral" },
    },
  ];
}

function buildResumeContext(row: IntakeRow): string | null {
  const state = row.state_json ?? {};
  const goalStatus = row.goal_status_json ?? {};
  const hasAnswers =
    state.answers && Object.keys(state.answers as object).length > 0;
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

export async function POST(req: NextRequest) {
  let body: PostBody;
  try {
    body = (await req.json()) as PostBody;
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), { status: 400 });
  }

  if (typeof body.token !== "string" || !isPlausibleToken(body.token)) {
    return new Response(JSON.stringify({ error: "missing_or_invalid_token" }), {
      status: 400,
    });
  }
  if (typeof body.user_message !== "string") {
    return new Response(JSON.stringify({ error: "missing_user_message" }), {
      status: 400,
    });
  }

  // Token-keyed Supabase lookup is the actual auth check.
  const row = await getSessionByToken(body.token);
  if (!row) {
    return new Response(JSON.stringify({ error: "not_found" }), { status: 404 });
  }
  if (row.expires_at && new Date(row.expires_at) < new Date()) {
    return new Response(JSON.stringify({ error: "expired" }), { status: 410 });
  }
  if (row.completed_at) {
    return new Response(JSON.stringify({ error: "already_completed" }), {
      status: 410,
    });
  }

  // Light prompt-injection scan on the user message. Logs only (we let the
  // agent decide how to handle suspicious input — it has no privileged tools
  // to abuse anyway).
  const injectionScan = scanForInjection(body.user_message);
  if (injectionScan.suspicious) {
    console.warn(
      `[intake/chat] suspicious user input on token=${body.token.slice(0, 8)}…: ${injectionScan.hits.join(
        ", "
      )}`
    );
  }

  // Build the messages array. Server-controlled order:
  //   1. (optional) resume context as a system-reminder in a leading user msg
  //   2. client-supplied history (untrusted)
  //   3. fresh user_message
  const messages: Anthropic.MessageParam[] = [];

  const clientHistory = Array.isArray(body.history) ? body.history : [];
  // Defensive: cap history to 100 turns. Anything older the agent should rely
  // on state_json for.
  const trimmedHistory = clientHistory.slice(-100);

  // Inject resume context as a system-reminder at the start of the FIRST user
  // turn if this is a fresh conversation. Cheap, doesn't break the cache (it
  // lives in `messages`, not `system`).
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

  // Encoder for SSE output. We forward Anthropic's raw event JSON so the
  // client can use the same shape Anthropic documents (content_block_start,
  // content_block_delta, message_delta, etc.).
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (eventType: string, payload: unknown) => {
        const data = JSON.stringify(payload);
        controller.enqueue(
          encoder.encode(`event: ${eventType}\ndata: ${data}\n\n`)
        );
      };

      try {
        // Pre-flight: roughly estimate context size for the circuit breaker.
        // We use the Anthropic count_tokens endpoint when the history is
        // large enough to matter. For brevity, skip when < ~30 turns.
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
              // Inject one more system-reminder telling the model to wrap.
              messages.push({
                role: "user",
                content:
                  "<system-reminder>Context approaching cap. Wrap up: call closing_summary with what you have, even if some goals are mid-confidence.</system-reminder>",
              });
            }
          } catch {
            /* count_tokens is best-effort; never blocks the chat */
          }
        }

        const sdkStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: systemBlocks,
          tools: INTAKE_TOOLS,
          messages,
        });

        for await (const event of sdkStream) {
          // Forward verbatim — the frontend parses native Anthropic events.
          send(event.type, event);
        }

        const finalMessage = await sdkStream.finalMessage();
        send("final_message", {
          stop_reason: finalMessage.stop_reason,
          usage: finalMessage.usage,
          // Per claude-api skill: surface cache stats so the frontend (or
          // server-side analytics row) can log them.
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
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no", // disable proxy buffering (e.g. Cloudflare)
    },
  });
}
