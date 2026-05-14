/**
 * POST /api/intake/submit  (mapped via netlify.toml redirect)
 *
 * Finalizes an intake. Body: `{ token }`. Branches on flavor.
 *   paying_client → commit to client repo via Octokit (3x retry) + email
 *   lead_magnet   → generate mini-report, send via Resend, email operator
 *
 * Spec: [intake-flow.md §Edge cases #10 + §Submit].
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import {
  getSessionByToken,
  markCompleted,
  scanStateJsonForInjection,
} from "../../lib/intake/supabase-intake";
import { isPlausibleToken } from "../../lib/intake/token-mint";
import { commitIntakeToRepo } from "../../lib/intake/github-commit";
import {
  buildMiniReportHtml,
  sendMiniReport,
  notifyOperator,
} from "../../lib/intake/mini-report";

const OPERATOR_EMAIL =
  process.env.INTAKE_OPERATOR_EMAIL ?? "alex@finitsolutions.be";
const GITHUB_OWNER = process.env.INTAKE_GITHUB_OWNER ?? "finit-os";

const JSON_HEADERS = { "Content-Type": "application/json" };

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface PostBody {
  token?: unknown;
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body: PostBody;
  try {
    body = JSON.parse(event.body ?? "{}") as PostBody;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  if (typeof body.token !== "string" || !isPlausibleToken(body.token)) {
    return json(400, { error: "missing_or_invalid_token" });
  }

  const row = await getSessionByToken(body.token);
  if (!row) return json(404, { error: "not_found" });
  if (row.completed_at) return json(200, { ok: true, already_completed: true });

  const injection = scanStateJsonForInjection(row.state_json ?? {});

  try {
    if (row.flavor === "paying_client") {
      if (!row.client_slug) {
        return json(500, {
          error: "missing_client_slug",
          message: "paying_client without client_slug",
        });
      }

      const commitResult = await commitIntakeToRepo({
        repo: { owner: GITHUB_OWNER, repo: row.client_slug, branch: "main" },
        stateJson: {
          token_ref: row.token,
          flavor: row.flavor,
          client_slug: row.client_slug,
          language: row.language,
          sector: row.sector,
          identity: {
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            company_name: row.company_name,
            role: row.role,
            phone: row.phone,
          },
          maturity_score: row.maturity_score,
          maturity_confidence: row.maturity_confidence,
          personalization_json: row.personalization_json,
          state_json: row.state_json,
          goal_status_json: row.goal_status_json,
          completed_at: new Date().toISOString(),
        },
        token: row.token,
      });

      if (!commitResult.ok) {
        await notifyOperator({
          toOperator: OPERATOR_EMAIL,
          subject: `[Finit intake] FAILED commit for ${row.client_slug} — manual recovery needed`,
          bodyHtml: `<p>Intake for <b>${escapeHtml(row.client_slug ?? "")}</b> finished but the GitHub commit failed after 3 retries.</p>
<p>Error: <code>${escapeHtml(commitResult.error ?? "unknown")}</code></p>
<p>Supabase row is still alive (token: <code>${escapeHtml(row.token)}</code>). You can:</p>
<ol>
<li>Re-run /api/intake/submit (idempotent — completed_at only set on success).</li>
<li>Or recover via /01.2-process-intake using the Supabase MCP fallback.</li>
</ol>
<pre>${escapeHtml(JSON.stringify(row.state_json ?? {}, null, 2))}</pre>`,
          bodyText: `Commit failed for ${row.client_slug}. Error: ${commitResult.error}. Token: ${row.token}.`,
        });
        return json(502, {
          ok: false,
          error: "github_commit_failed",
          attempts: commitResult.attempts,
          message: commitResult.error,
        });
      }

      await markCompleted(row.token);

      await notifyOperator({
        toOperator: OPERATOR_EMAIL,
        subject: `[Finit intake] Completed: ${row.client_slug}`,
        bodyHtml: `<p>Intake completed for <b>${escapeHtml(row.client_slug ?? "")}</b> (${escapeHtml(row.email)}).</p>
<p>Committed to <code>${escapeHtml(GITHUB_OWNER)}/${escapeHtml(row.client_slug ?? "")}</code> on attempt ${commitResult.attempts}.</p>
<p>Next: open the client repo in Claude Code, boot ritual auto-routes to <code>/01.2-process-intake</code>.</p>
${injection.suspicious ? `<p><b>⚠ Note:</b> state_json contains patterns that look like prompt-injection (${escapeHtml(injection.hits.join(", "))}). Review before processing.</p>` : ""}`,
        bodyText: `Intake completed: ${row.client_slug} (${row.email}). Committed on attempt ${commitResult.attempts}.${injection.suspicious ? ` Suspicious: ${injection.hits.join(", ")}` : ""}`,
      });

      return json(200, {
        ok: true,
        flavor: "paying_client",
        commit_attempts: commitResult.attempts,
      });
    }

    // -- lead-magnet branch ------------------------------------------------
    const report = buildMiniReportHtml({
      personalization: row.personalization_json,
      state: row.state_json ?? {},
      fallback: {
        first_name: row.first_name ?? undefined,
        company_name: row.company_name ?? undefined,
      },
    });

    const sendResult = await sendMiniReport(row.email, report);
    if (!sendResult.ok) {
      await notifyOperator({
        toOperator: OPERATOR_EMAIL,
        subject: `[Finit lead-magnet] Send FAILED to ${row.email}`,
        bodyHtml: `<p>Lead-magnet mini-report send failed for <b>${escapeHtml(row.email)}</b>.</p>
<p>Error: <code>${escapeHtml(sendResult.error ?? "unknown")}</code></p>
<p>The prospect can retry via the closing-summary 'stuur opnieuw' button.</p>`,
        bodyText: `Lead-magnet send failed: ${row.email}. Error: ${sendResult.error}.`,
      });
      return json(502, {
        ok: false,
        error: "send_failed",
        message: sendResult.error,
      });
    }

    await markCompleted(row.token);

    await notifyOperator({
      toOperator: OPERATOR_EMAIL,
      subject: `[Finit lead-magnet] New intake: ${row.email}`,
      bodyHtml: `<p>New lead-magnet intake completed.</p>
<ul>
<li>Email: ${escapeHtml(row.email)}</li>
<li>Name: ${escapeHtml([row.first_name, row.last_name].filter(Boolean).join(" "))}</li>
<li>Company: ${escapeHtml(row.company_name ?? "")}</li>
<li>Sector: ${escapeHtml(row.sector ?? "(unknown)")}</li>
<li>Maturity: ${row.maturity_score ?? "n/a"} (${row.maturity_confidence ?? "n/a"})</li>
</ul>
<p>Mini-report sent. Follow up via Karel's calendar link.</p>
${injection.suspicious ? `<p><b>⚠ Note:</b> state_json contains patterns that look like prompt-injection (${escapeHtml(injection.hits.join(", "))}).</p>` : ""}`,
      bodyText: `Lead-magnet completed: ${row.email}. Sector: ${row.sector}. Maturity: ${row.maturity_score}.${injection.suspicious ? ` Suspicious: ${injection.hits.join(", ")}` : ""}`,
    });

    return json(200, { ok: true, flavor: "lead_magnet" });
  } catch (err) {
    return json(500, {
      ok: false,
      error: "internal_error",
      message: err instanceof Error ? err.message : "unknown",
    });
  }
};
