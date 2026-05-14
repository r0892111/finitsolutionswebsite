/**
 * POST /api/intake/transcribe  (mapped via netlify.toml redirect)
 *
 * Accepts multipart/form-data with `audio` (recorded blob), `token`, and
 * optional `language` hint. Returns `{ text }`. On ANY failure returns 200
 * with `{ text: "", error: "transcription_failed" }` so the frontend can
 * pivot to text-input.
 *
 * Spec: [intake-flow.md §Edge cases #4].
 *
 * Note: Netlify Functions deliver multipart bodies as base64-encoded raw
 * strings. We parse the multipart manually (lightweight — only need the
 * audio blob + a few string fields) rather than pulling in a parser.
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import { transcribeAudio } from "../../lib/intake/elevenlabs-scribe";
import { getSessionByToken } from "../../lib/intake/supabase-intake";
import { isPlausibleToken } from "../../lib/intake/token-mint";

const FAIL_RESPONSE = {
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "", error: "transcription_failed" }),
};

interface MultipartPart {
  name: string;
  filename?: string;
  contentType?: string;
  data: Buffer;
}

/**
 * Minimal multipart/form-data parser. Handles the parts we need:
 *   - text fields (token, language)
 *   - one binary field (audio)
 * Returns null on malformed input.
 */
function parseMultipart(body: Buffer, boundary: string): MultipartPart[] | null {
  const delim = Buffer.from(`--${boundary}`);
  const closeDelim = Buffer.from(`--${boundary}--`);
  const parts: MultipartPart[] = [];

  let idx = 0;
  while (idx < body.length) {
    const start = body.indexOf(delim, idx);
    if (start < 0) break;
    const afterDelim = start + delim.length;
    // Could be the closing boundary.
    if (body.subarray(start, start + closeDelim.length).equals(closeDelim)) break;

    // Skip CRLF after the boundary.
    const headerStart = afterDelim + 2; // \r\n
    const headerEnd = body.indexOf("\r\n\r\n", headerStart);
    if (headerEnd < 0) return null;

    const headerStr = body.subarray(headerStart, headerEnd).toString("utf8");
    const dataStart = headerEnd + 4;

    // Find next boundary to know where data ends.
    const nextBoundary = body.indexOf(delim, dataStart);
    if (nextBoundary < 0) return null;
    // Strip trailing CRLF.
    const dataEnd = nextBoundary - 2;
    if (dataEnd <= dataStart) return null;

    // Parse Content-Disposition + Content-Type.
    const nameMatch = headerStr.match(/name="([^"]+)"/);
    const filenameMatch = headerStr.match(/filename="([^"]*)"/);
    const ctMatch = headerStr.match(/Content-Type:\s*([^\r\n]+)/i);

    if (nameMatch) {
      parts.push({
        name: nameMatch[1],
        filename: filenameMatch?.[1],
        contentType: ctMatch?.[1]?.trim(),
        data: body.subarray(dataStart, dataEnd),
      });
    }
    idx = nextBoundary;
  }
  return parts;
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const contentType =
      event.headers["content-type"] || event.headers["Content-Type"] || "";
    const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/);
    if (!boundaryMatch) return FAIL_RESPONSE;
    const boundary = boundaryMatch[1] ?? boundaryMatch[2];
    if (!event.body) return FAIL_RESPONSE;

    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, "base64")
      : Buffer.from(event.body, "binary");

    const parts = parseMultipart(raw, boundary);
    if (!parts) return FAIL_RESPONSE;

    const tokenPart = parts.find((p) => p.name === "token");
    const audioPart = parts.find((p) => p.name === "audio");
    const langPart = parts.find((p) => p.name === "language");

    const token = tokenPart?.data.toString("utf8");
    if (!token || !isPlausibleToken(token)) return FAIL_RESPONSE;

    const row = await getSessionByToken(token);
    if (!row || row.completed_at) return FAIL_RESPONSE;

    if (!audioPart || audioPart.data.length === 0) return FAIL_RESPONSE;

    const blob = new Blob([audioPart.data], {
      type: audioPart.contentType || "audio/webm",
    });

    const langStr = langPart?.data.toString("utf8");
    const languageHint =
      langStr && ["nl", "fr", "en"].includes(langStr) ? langStr : undefined;

    const result = await transcribeAudio(blob, { languageHint });
    if (!result.text) return FAIL_RESPONSE;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: result.text, language: result.language }),
    };
  } catch {
    return FAIL_RESPONSE;
  }
};
