/**
 * ElevenLabs Scribe (speech-to-text) wrapper.
 *
 * Per [intake-flow.md §Edge cases #4](../../../finit-os/docs/specs/intake-flow.md),
 * on ANY failure we fall back gracefully — the caller returns
 * `{ text: "", error: "transcription_failed" }` to the client so the UI
 * pivots to text-input. We DO NOT throw at the route level.
 *
 * ElevenLabs Speech-to-Text endpoint:
 *   POST https://api.elevenlabs.io/v1/speech-to-text
 *   Headers: xi-api-key, Accept: application/json
 *   Body: multipart/form-data with `file` + `model_id` (e.g. "scribe_v1")
 */

const SCRIBE_ENDPOINT = "https://api.elevenlabs.io/v1/speech-to-text";
const DEFAULT_MODEL = "scribe_v1";

export interface TranscribeResult {
  text: string;
  language?: string;
}

/**
 * Transcribe an audio Blob/File. Returns `{ text: "" }` on failure so callers
 * can degrade UX without try/catch boilerplate.
 *
 * languageHint is optional ('nl', 'fr', 'en'); ElevenLabs auto-detects but a
 * hint improves accuracy for short clips.
 */
export async function transcribeAudio(
  audio: Blob,
  opts: { languageHint?: string; model?: string } = {}
): Promise<TranscribeResult> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return { text: "" };
  }

  try {
    const form = new FormData();
    form.append("file", audio, "audio.webm");
    form.append("model_id", opts.model ?? DEFAULT_MODEL);
    if (opts.languageHint) form.append("language_code", opts.languageHint);

    const res = await fetch(SCRIBE_ENDPOINT, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        Accept: "application/json",
      },
      body: form,
    });

    if (!res.ok) {
      return { text: "" };
    }

    const json = (await res.json()) as { text?: string; language_code?: string };
    return {
      text: typeof json.text === "string" ? json.text : "",
      language: json.language_code,
    };
  } catch {
    return { text: "" };
  }
}
