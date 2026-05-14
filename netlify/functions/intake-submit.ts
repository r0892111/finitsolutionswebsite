/**
 * POST /api/intake/submit  (mapped via netlify.toml redirect)
 *
 * Finalizes an intake. Body: `{ token }`. Branches on flavor.
 *
 *   paying_client → commit state to client repo via Octokit (3x retry).
 *                   Operator notification = the .intake-complete marker file
 *                   committed alongside the state JSON; the boot ritual on
 *                   the operator's next Claude Code session in that repo
 *                   auto-routes to /01.2-process-intake.
 *                   Commit failure → write error_message on the Supabase row
 *                   (completed_at stays NULL), so the operator's queue check
 *                   in finit-company surfaces it for manual recovery.
 *
 *   lead_magnet   → generate the mini-report HTML and save it onto the
 *                   Supabase row (mini_report_html column). Operator drafts
 *                   the actual prospect email later via gws Gmail (manual
 *                   for v1; DRAFT-only per global CLAUDE.md). Phase F is the
 *                   automated send via Resend — see lib/intake/mini-report.ts
 *                   for the placeholder.
 *
 * Spec: [intake-flow.md §Edge cases #10 + §Submit + §"Email transport"].
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import {
  getSessionByToken,
  markCompleted,
  saveMiniReport,
  markError,
  scanStateJsonForInjection,
} from "../../lib/intake/supabase-intake";
import { isPlausibleToken } from "../../lib/intake/token-mint";
import { commitIntakeToRepo } from "../../lib/intake/github-commit";
import { buildMiniReportHtml } from "../../lib/intake/mini-report";

const GITHUB_OWNER = process.env.INTAKE_GITHUB_OWNER ?? "finit-os";

const JSON_HEADERS = { "Content-Type": "application/json" };

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
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
        await markError(
          row.token,
          `GitHub commit failed after ${commitResult.attempts} attempts: ${commitResult.error ?? "unknown"}`
        );
        return json(502, {
          ok: false,
          error: "github_commit_failed",
          attempts: commitResult.attempts,
          message: commitResult.error,
        });
      }

      await markCompleted(row.token);

      return json(200, {
        ok: true,
        flavor: "paying_client",
        commit_attempts: commitResult.attempts,
        injection_suspicious: injection.suspicious,
        injection_hits: injection.hits,
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

    await saveMiniReport(row.token, {
      subject: report.subject,
      html: report.html,
      text: report.text,
    });

    await markCompleted(row.token);

    return json(200, {
      ok: true,
      flavor: "lead_magnet",
      mini_report_saved: true,
      injection_suspicious: injection.suspicious,
      injection_hits: injection.hits,
    });
  } catch (err) {
    return json(500, {
      ok: false,
      error: "internal_error",
      message: err instanceof Error ? err.message : "unknown",
    });
  }
};
