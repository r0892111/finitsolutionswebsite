'use client';

/**
 * LongTextVoiceWidget — open-ended answers with optional voice input.
 *
 * Per [intake-flow spec § Widget catalog](../../../../finit-os/docs/specs/intake-flow.md):
 *   ask_long_text_voice { prompt, placeholder?, voice_enabled: true }
 *
 * Voice path: mic button → MediaRecorder → POST audio blob to
 * /api/intake/transcribe → fill the textarea with returned text.
 * The transcribe route is built by Web-backend; we POST to it and accept
 * `{ text: string }` back. On failure: keep textarea editable + show
 * a fallback notice. Spec § Edge case 4.
 */

import * as React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

import type { AskLongTextVoiceWidget, Language } from '../types';

interface Props {
  widget: AskLongTextVoiceWidget;
  language: Language;
  token: string;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

const COPY: Record<
  Language,
  {
    submit: string;
    recordStart: string;
    recordStop: string;
    transcribing: string;
    failed: string;
    micDenied: string;
    minChars: (n: number) => string;
  }
> = {
  nl: {
    submit: 'Verstuur',
    recordStart: 'Antwoord inspreken',
    recordStop: 'Stop opname',
    transcribing: 'Bezig met uitschrijven...',
    failed: 'Spraak werkte niet, typ je antwoord hier',
    micDenied: 'Microfoon-toegang geweigerd, typ je antwoord',
    minChars: (n: number) => `Minimaal ${n} tekens`,
  },
  fr: {
    submit: 'Envoyer',
    recordStart: 'Enregistrer la réponse',
    recordStop: 'Arrêter',
    transcribing: 'Transcription en cours...',
    failed: 'La voix n\'a pas fonctionné, tapez votre réponse',
    micDenied: 'Accès microphone refusé, tapez votre réponse',
    minChars: (n: number) => `Minimum ${n} caractères`,
  },
  en: {
    submit: 'Send',
    recordStart: 'Record answer',
    recordStop: 'Stop recording',
    transcribing: 'Transcribing...',
    failed: "Voice didn't work, type your answer instead",
    micDenied: 'Microphone access denied, type your answer',
    minChars: (n: number) => `At least ${n} characters`,
  },
};

type RecState = 'idle' | 'recording' | 'transcribing' | 'failed' | 'denied';

export function LongTextVoiceWidget({ widget, language, token, onSubmit, disabled }: Props) {
  const [value, setValue] = React.useState('');
  const [recState, setRecState] = React.useState<RecState>('idle');
  const recorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const streamRef = React.useRef<MediaStream | null>(null);
  const copy = COPY[language];

  const voiceEnabled = widget.voice_enabled !== false;
  const minChars = 10;
  const canSubmit = value.trim().length >= minChars;

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (recorderRef.current && recorderRef.current.state === 'recording') {
        recorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
      setRecState('failed');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : '';
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        await transcribe(blob);
      };
      recorder.start();
      setRecState('recording');
    } catch (err) {
      console.error('mic-error', err);
      setRecState('denied');
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      setRecState('transcribing');
      recorderRef.current.stop();
    }
  };

  const transcribe = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');
      formData.append('token', token);
      formData.append('language', language);
      const res = await fetch('/api/intake/transcribe', { method: 'POST', body: formData });
      if (!res.ok) throw new Error(`transcribe failed: ${res.status}`);
      const data = (await res.json()) as { text?: string };
      if (data.text) {
        setValue((prev) => (prev ? `${prev.trimEnd()} ${data.text}` : data.text!));
        setRecState('idle');
      } else {
        setRecState('failed');
      }
    } catch (err) {
      console.error('transcribe-error', err);
      setRecState('failed');
    }
  };

  return (
    <div className="w-full rounded-2xl border border-[#E8E6DC] bg-[#FFFEFA] p-5 shadow-[0_1px_2px_rgba(60,50,30,0.04),0_18px_40px_-16px_rgba(60,50,30,0.12)]">
      <label htmlFor={`longtext-${widget.widget_id}`} className="mb-3 block text-[1rem] font-semibold text-[#322D26]">
        {widget.prompt}
      </label>
      <div className="relative">
        <textarea
          id={`longtext-${widget.widget_id}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={widget.placeholder}
          disabled={disabled || recState === 'recording' || recState === 'transcribing'}
          rows={5}
          autoFocus
          className="w-full resize-y rounded-lg border border-[#E8E6DC] bg-white px-3.5 py-3 text-[0.9375rem] leading-relaxed text-[#2A2620] placeholder:text-[#94908A] transition-colors focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15 disabled:cursor-not-allowed disabled:opacity-60"
        />
        {recState === 'recording' ? (
          <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#1A2D63] px-2.5 py-1 text-[0.6875rem] font-medium text-[#FDFBF7]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FDFBF7] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FDFBF7]" />
            </span>
            rec
          </div>
        ) : null}
      </div>

      {recState === 'failed' ? (
        <p className="mt-2 text-[0.8125rem] text-[#A04A2A]">{copy.failed}</p>
      ) : null}
      {recState === 'denied' ? (
        <p className="mt-2 text-[0.8125rem] text-[#A04A2A]">{copy.micDenied}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {voiceEnabled ? (
            recState === 'recording' ? (
              <button
                type="button"
                onClick={stopRecording}
                disabled={disabled}
                className="inline-flex items-center gap-2 rounded-lg border border-[#0F1D47] bg-[#1A2D63] px-3.5 py-2 text-[0.875rem] font-medium text-[#FDFBF7] transition-all hover:bg-[#4D5A82] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#1A2D63]"
              >
                <MicOff className="h-4 w-4" />
                {copy.recordStop}
              </button>
            ) : recState === 'transcribing' ? (
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#C9D0E2] bg-[#F2F4FA] px-3.5 py-2 text-[0.875rem] font-medium text-[#1A2D63]">
                <Loader2 className="h-4 w-4 animate-spin" />
                {copy.transcribing}
              </span>
            ) : (
              <button
                type="button"
                onClick={startRecording}
                disabled={disabled}
                className="inline-flex items-center gap-2 rounded-lg border border-[#D8D5C7] bg-[#FDFBF7] px-3.5 py-2 text-[0.875rem] font-medium text-[#2A2620] transition-all hover:-translate-y-px hover:border-[#B8B5A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Mic className="h-4 w-4" />
                {copy.recordStart}
              </button>
            )
          ) : null}
          {!canSubmit ? (
            <span className="text-[0.75rem] text-[#76706A]">{copy.minChars(minChars)}</span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => canSubmit && onSubmit(value.trim())}
          disabled={disabled || !canSubmit || recState === 'recording' || recState === 'transcribing'}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0F1D47] bg-[#1A2D63] px-5 py-2.5 text-[0.9375rem] font-medium text-[#FDFBF7] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.20),0_1px_2px_rgba(20,30,60,0.22),0_6px_14px_-2px_rgba(20,30,60,0.32)] transition-all hover:-translate-y-px hover:bg-[#4D5A82] active:translate-y-px active:bg-[#0F1D47] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {copy.submit}
        </button>
      </div>
    </div>
  );
}

export default LongTextVoiceWidget;
