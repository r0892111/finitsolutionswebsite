/**
 * POST /api/intake/submit
 *
 * Finalizes an intake. Body: `{ token }`. Branches on flavor:
 *
 *   flavor=paying_client:
 *     - Commits brain/raw/audit/01-intake-state.json + .intake-complete marker
 *       to the client's repo via Octokit. 3x exponential-backoff retry.
 *     - On success: SET completed_at. Email operator a draft notification.
 *     - On final failure: leave Supabase row intact, email operator with the
 *       JSON inline + manual recovery instructions.
 *
 *   flavor=lead_magnet:
 *     - Generate HTML mini-report via lib/intake/mini-report.ts.
 *     - Email to prospect via Resend transactional send.
 *     - SET completed_at.
 *     - Also CC the operator so they see lead-magnet activity in their inbox.
 *
 * Runtime: Node — Octokit needs it. Edge runtime would not work.
 *
 * Spec: [intake-flow.md §Edge cases #10 + §Submit](../../../../../finit-os/docs/specs/intake-flow.md).
 */
import { NextRequest, NextResponse } from "next/server";
import {
  getSessionByToken,
  markCompleted,
  scanStateJsonForInjection,
} from "@/lib/intake/supabase-intake";
import { isPlausibleToken } from "@/lib/intake/token-mint";
import { commitIntakeToRepo } from "@/lib/intake/github-commit";
import {
  buildMiniReportHtml,
  sendMiniReport,
  notifyOperator,
} from "@/lib/intake/mini-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PostBody {
  token?: unknown;
}

const OPERATOR_EMAIL =
  process.env.INTAKE_OPERATOR_EMAIL ?? "alex@finitsolutions.be";
const GITHUB_OWNER = process.env.INTAKE_GITHUB_OWNER ?? "finit-os";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: PostBody;
  try {
    body = (await req.json()) as PostBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof body.token !== "string" || !isPlausibleToken(body.token)) {
    return NextResponse.json({ error: "missing_or_invalid_token" }, { status: 400 });
  }

  const row = await getSessionByToken(body.token);
  if (!row) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (row.completed_at) {
    return NextResponse.json({ ok: true, already_completed: true });
  }

  // Sanity scan — flag suspicious state but never block the submit.
  const injection = scanStateJsonForInjection(row.state_json ?? {});

  try {
    if (row.flavor === "paying_client") {
      if (!row.client_slug) {
        return NextResponse.json(
          { error: "missing_client_slug", message: "paying_client without client_slug" },
          { status: 500 }
        );
      }

      const commitResult = await commitIntakeToRepo({
        repo: {
          owner: GITHUB_OWNER,
          repo: row.client_slug,
          branch: "main",
        },
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
        // Recovery path: row stays alive, operator gets alerted.
        await notifyOperator({
          toOperator: OPERATOR_EMAIL,
          subject: `[Finit intake] FAILED commit for ${row.client_slug} — manual recovery needed`,
          bodyHtml: `<p>Intake for <b>${escapeHtml(row.client_slug ?? "")}</b> finished but the GitHub commit failed after 3 retries.</p>
<p>Error: <code>${escapeHtml(commitResult.error ?? "unknown")}</code></p>
<p>The Supabase row is still alive (token: <code>${escapeHtml(row.token)}</code>). You can:
<ol>
<li>Re-run /api/intake/submit (it's idempotent — completed_at is only set on success).</li>
<li>Or recover via /01.2-process-intake using the Supabase MCP fallback path.</li>
</ol></p>
<pre>${escapeHtml(JSON.stringify(row.state_json ?? {}, null, 2))}</pre>`,
          bodyText: `Commit failed for ${row.client_slug}. Error: ${commitResult.error}. Token: ${row.token}. Manual recovery required.`,
        });
        return NextResponse.json(
          {
            ok: false,
            error: "github_commit_failed",
            attempts: commitResult.attempts,
            message: commitResult.error,
          },
          { status: 502 }
        );
      }

      await markCompleted(row.token);

      // Operator success notification.
      await notifyOperator({
        toOperator: OPERATOR_EMAIL,
        subject: `[Finit intake] Completed: ${row.client_slug}`,
        bodyHtml: `<p>Intake completed for <b>${escapeHtml(row.client_slug ?? "")}</b> (${escapeHtml(row.email)}).</p>
<p>Committed to <code>${escapeHtml(GITHUB_OWNER)}/${escapeHtml(row.client_slug ?? "")}</code> on attempt ${commitResult.attempts}.</p>
<p>Next: open the client repo in Claude Code, the boot ritual will auto-route to <code>/01.2-process-intake</code>.</p>
${injection.suspicious ? `<p><b>⚠ Note:</b> state_json contains patterns that look like prompt-injection (${escapeHtml(injection.hits.join(", "))}). Review before processing.</p>` : ""}`,
        bodyText: `Intake completed: ${row.client_slug} (${row.email}). Committed on attempt ${commitResult.attempts}.${injection.suspicious ? ` Suspicious state: ${injection.hits.join(", ")}` : ""}`,
      });

      return NextResponse.json({
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
      // Don't fail the request — flag for operator and let the prospect
      // retry via the closing-summary "stuur opnieuw" button.
      await notifyOperator({
        toOperator: OPERATOR_EMAIL,
        subject: `[Finit lead-magnet] Send FAILED to ${row.email}`,
        bodyHtml: `<p>Lead-magnet mini-report send failed for <b>${escapeHtml(row.email)}</b>.</p>
<p>Error: <code>${escapeHtml(sendResult.error ?? "unknown")}</code></p>
<p>The prospect can retry via the closing-summary page button. Their state is preserved.</p>`,
        bodyText: `Lead-magnet send failed: ${row.email}. Error: ${sendResult.error}.`,
      });
      return NextResponse.json(
        { ok: false, error: "send_failed", message: sendResult.error },
        { status: 502 }
      );
    }

    await markCompleted(row.token);

    // Operator notification — async-ish, ignore failure (it's nice-to-have).
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
      bodyText: `Lead-magnet completed: ${row.email}. Sector: ${row.sector}. Maturity: ${row.maturity_score}.${injection.suspicious ? ` Suspicious state: ${injection.hits.join(", ")}` : ""}`,
    });

    return NextResponse.json({ ok: true, flavor: "lead_magnet" });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: "internal_error",
        message: err instanceof Error ? err.message : "unknown",
      },
      { status: 500 }
    );
  }
}
