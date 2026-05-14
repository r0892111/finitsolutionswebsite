/**
 * Octokit wrapper for committing the final intake snapshot to a paying
 * client's GitHub repo.
 *
 * Used ONLY from /api/intake/submit. The GitHub PAT lives in the submit
 * handler's env (`GITHUB_TOKEN`) and is never exposed elsewhere.
 *
 * Commits two files:
 *   - brain/raw/audit/01-intake-state.json   (the full state dump)
 *   - brain/raw/audit/.intake-complete       (marker for boot-ritual auto-pickup)
 *
 * Retry: 3 attempts with exponential backoff per
 * [intake-flow.md §Edge cases #10](../../../finit-os/docs/specs/intake-flow.md).
 */
import { Octokit } from "@octokit/rest";

export interface ClientRepoRef {
  /** GitHub org or user that hosts the client's repo (Finit's org). */
  owner: string;
  /** Repo name — typically the client_slug from personalization. */
  repo: string;
  /** Default branch to commit to. Defaults to "main". */
  branch?: string;
}

export interface CommitIntakePayload {
  repo: ClientRepoRef;
  stateJson: unknown;
  /** Optional opaque token reference for the marker — helps fallback recovery. */
  token?: string;
  /** Optional commit message — defaults to a standard one. */
  message?: string;
}

const STATE_PATH = "brain/raw/audit/01-intake-state.json";
const MARKER_PATH = "brain/raw/audit/.intake-complete";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function getOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return new Octokit({ auth: token });
}

/**
 * Create-or-update a file via the Contents API. Looks up sha if file exists.
 */
async function putFile(
  octokit: Octokit,
  ref: ClientRepoRef,
  path: string,
  contentUtf8: string,
  message: string
): Promise<void> {
  const branch = ref.branch ?? "main";
  const content = Buffer.from(contentUtf8, "utf8").toString("base64");

  // Look up existing sha (404 = create-new).
  let sha: string | undefined;
  try {
    const res = await octokit.rest.repos.getContent({
      owner: ref.owner,
      repo: ref.repo,
      path,
      ref: branch,
    });
    // getContent returns either a single object or an array (dir). For a file:
    if (!Array.isArray(res.data) && "sha" in res.data) {
      sha = res.data.sha;
    }
  } catch (err: unknown) {
    const status = (err as { status?: number }).status;
    if (status !== 404) throw err;
  }

  await octokit.rest.repos.createOrUpdateFileContents({
    owner: ref.owner,
    repo: ref.repo,
    path,
    message,
    content,
    branch,
    sha,
  });
}

/**
 * Commit both files with retry. Throws on final failure so the submit handler
 * can email the operator + leave the Supabase row in a recoverable state.
 */
export async function commitIntakeToRepo(payload: CommitIntakePayload): Promise<{
  ok: boolean;
  attempts: number;
  error?: string;
}> {
  const octokit = getOctokit();
  const stateJsonStr = JSON.stringify(payload.stateJson, null, 2);
  const markerContent = JSON.stringify(
    {
      completed_at: new Date().toISOString(),
      token_ref: payload.token ?? null,
      note: "Created by /api/intake/submit. /01.2-process-intake should pick this up via boot-ritual marker detection.",
    },
    null,
    2
  );
  const message = payload.message ?? "intake: snapshot completed intake state + completion marker";

  let lastErr: unknown = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      // Commit state first, then marker — boot ritual relies on the marker
      // existing only if state is also there.
      await putFile(octokit, payload.repo, STATE_PATH, stateJsonStr, message);
      await putFile(octokit, payload.repo, MARKER_PATH, markerContent, message);
      return { ok: true, attempts: attempt };
    } catch (err) {
      lastErr = err;
      if (attempt < 3) {
        // 1s, 4s exponential backoff.
        await sleep(1000 * Math.pow(4, attempt - 1));
      }
    }
  }

  return {
    ok: false,
    attempts: 3,
    error: lastErr instanceof Error ? lastErr.message : String(lastErr),
  };
}
