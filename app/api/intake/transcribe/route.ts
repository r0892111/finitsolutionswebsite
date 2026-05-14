/**
 * POST /api/intake/transcribe
 *
 * Accepts multipart/form-data with `audio` (the recorded blob) and optional
 * `language` hint ("nl" | "fr" | "en"). Returns `{ text }`.
 *
 * On ANY failure (missing key, ElevenLabs 5xx, network blip), the route
 * returns 200 with `{ text: "", error: "transcription_failed" }` so the
 * frontend can pivot to text-input without try/catch boilerplate.
 *
 * Spec: [intake-flow.md §Edge cases #4](../../../../../finit-os/docs/specs/intake-flow.md).
 */
import { NextRequest, NextResponse } from "next/server";
import { transcribeAudio } from "@/lib/intake/elevenlabs-scribe";
import {
  getSessionByToken,
} from "@/lib/intake/supabase-intake";
import { isPlausibleToken } from "@/lib/intake/token-mint";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { text: "", error: "transcription_failed" },
      { status: 200 }
    );
  }

  // Optional token gate — keep this endpoint scoped to live intake sessions,
  // not a wide-open STT proxy.
  const token = form.get("token");
  if (typeof token !== "string" || !isPlausibleToken(token)) {
    return NextResponse.json(
      { text: "", error: "transcription_failed" },
      { status: 200 }
    );
  }
  try {
    const row = await getSessionByToken(token);
    if (!row || row.completed_at) {
      return NextResponse.json(
        { text: "", error: "transcription_failed" },
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json(
      { text: "", error: "transcription_failed" },
      { status: 200 }
    );
  }

  const audio = form.get("audio");
  if (!(audio instanceof Blob)) {
    return NextResponse.json(
      { text: "", error: "transcription_failed" },
      { status: 200 }
    );
  }

  const lang = form.get("language");
  const languageHint =
    typeof lang === "string" && ["nl", "fr", "en"].includes(lang)
      ? lang
      : undefined;

  const result = await transcribeAudio(audio, { languageHint });
  if (!result.text) {
    return NextResponse.json(
      { text: "", error: "transcription_failed" },
      { status: 200 }
    );
  }
  return NextResponse.json({ text: result.text, language: result.language });
}
