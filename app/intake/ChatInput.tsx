'use client';

/**
 * ChatInput — fixed bottom input bar for the intake chat.
 *
 * Always present, Claude-Code / ChatGPT-style. Auto-grows up to ~8 rows
 * then internal scroll. Enter sends, Shift+Enter newline. Mic icon left
 * of the submit arrow: tap to record, tap again to stop → transcript
 * fills the textarea *editable* (so the user can review/correct before
 * sending). Voice path mirrors LongTextVoiceWidget — POSTs the audio
 * blob to /api/intake/transcribe.
 *
 * Disabled state: when a non-text widget is active above, the input
 * grays out with a hint, but the user can still toggle "type freely"
 * to send a free-text reply that overrides the widget.
 */

import * as React from 'react';
import { ArrowUp, Loader2, Mic, Square, Trash2, X } from 'lucide-react';

import type { Language } from './types';

type RecState = 'idle' | 'recording' | 'transcribing' | 'failed' | 'denied';

const COPY: Record<
  Language,
  {
    placeholder: string;
    placeholderTranscribing: string;
    listening: string;
    stopRecording: string;
    discardRecording: string;
    transcribeFailed: string;
    micDenied: string;
    aria: {
      send: string;
      record: string;
      stop: string;
      discard: string;
    };
  }
> = {
  nl: {
    placeholder: 'Typ je antwoord… of klik de mic om in te spreken',
    placeholderTranscribing: 'Bezig met uitschrijven…',
    listening: 'Aan het luisteren — neem je tijd',
    stopRecording: 'Klaar',
    discardRecording: 'Verwijder opname',
    transcribeFailed: 'Spraak werkte niet — typ je antwoord.',
    micDenied: 'Microfoon-toegang geweigerd — typ je antwoord.',
    aria: { send: 'Verstuur', record: 'Opname starten', stop: 'Stop opname', discard: 'Opname verwijderen' },
  },
  fr: {
    placeholder: 'Tape ta réponse… ou clique sur le micro pour parler',
    placeholderTranscribing: 'Transcription…',
    listening: "À l'écoute — prends ton temps",
    stopRecording: 'Terminé',
    discardRecording: "Supprimer l'enregistrement",
    transcribeFailed: 'La voix n\'a pas fonctionné — tape ta réponse.',
    micDenied: 'Accès microphone refusé — tape ta réponse.',
    aria: { send: 'Envoyer', record: 'Démarrer enregistrement', stop: 'Arrêter', discard: "Supprimer l'enregistrement" },
  },
  en: {
    placeholder: 'Type your reply… or tap the mic to speak',
    placeholderTranscribing: 'Transcribing…',
    listening: 'Listening — take your time',
    stopRecording: 'Done',
    discardRecording: 'Discard recording',
    transcribeFailed: "Voice didn't work — type your reply.",
    micDenied: 'Microphone access denied — type your reply.',
    aria: { send: 'Send', record: 'Start recording', stop: 'Stop recording', discard: 'Discard recording' },
  },
};

function formatElapsed(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = (totalSec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

interface Props {
  language: Language;
  token: string;
  /** True when stream is in flight; submit button shows spinner. */
  busy: boolean;
  onSendText: (text: string) => void;
}

export function ChatInput({ language, token, busy, onSendText }: Props) {
  const copy = COPY[language];
  const [value, setValue] = React.useState('');
  const [recState, setRecState] = React.useState<RecState>('idle');
  const [elapsed, setElapsed] = React.useState(0);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const recorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const streamRef = React.useRef<MediaStream | null>(null);
  const startedAtRef = React.useRef<number>(0);
  const discardRef = React.useRef(false);

  const canSubmit = !busy && value.trim().length > 0;

  // Tick elapsed seconds while recording — visible feedback that the
  // mic is live and capturing.
  React.useEffect(() => {
    if (recState !== 'recording') return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAtRef.current) / 1000));
    }, 500);
    return () => clearInterval(id);
  }, [recState]);

  // Auto-grow textarea up to ~8 lines.
  const adjustHeight = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const max = 8 * 20; // ~8 lines at 20px line-height
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
  }, []);

  React.useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (recorderRef.current && recorderRef.current.state === 'recording') {
        recorderRef.current.stop();
      }
    };
  }, []);

  const submit = () => {
    if (!canSubmit) return;
    const trimmed = value.trim();
    setValue('');
    onSendText(trimmed);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  /* ---------------- voice ---------------- */

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
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        if (discardRef.current) {
          discardRef.current = false;
          chunksRef.current = [];
          setRecState('idle');
          return;
        }
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        await transcribe(blob);
      };
      startedAtRef.current = Date.now();
      setElapsed(0);
      discardRef.current = false;
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

  const cancelRecording = () => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      discardRef.current = true;
      recorderRef.current.stop();
    } else {
      setRecState('idle');
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
        // give the user a beat to see the text before they can hit enter
        setTimeout(() => textareaRef.current?.focus(), 50);
      } else {
        setRecState('failed');
      }
    } catch (err) {
      console.error('transcribe-error', err);
      setRecState('failed');
    }
  };

  /* ---------------- render ---------------- */

  const placeholder =
    recState === 'transcribing' ? copy.placeholderTranscribing : copy.placeholder;

  const isRecording = recState === 'recording';
  const isTranscribing = recState === 'transcribing';

  return (
    <div className="w-full px-4 pb-3 pt-1 md:px-0">
      {isRecording ? (
        /* Recording state — completely different visual so it's
           obvious the input is "live listening" and how to stop. */
        <div className="rounded-2xl border-2 border-[#1A2D63] bg-[#1A2D63] px-3 py-2.5 text-[#FDFBF7] shadow-[0_4px_18px_-6px_rgba(26,45,99,0.35)]">
          <div className="flex items-center gap-3">
            {/* Pulsing mic disc */}
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FDFBF7] opacity-40" />
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#FDFBF7] text-[#1A2D63]">
                <Mic className="h-4 w-4" />
              </span>
            </div>

            {/* Center: status + timer + waveform-style bars */}
            <div className="min-w-0 flex-1">
              <p className="text-[0.8125rem] font-medium leading-tight">{copy.listening}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[0.6875rem] font-medium tabular-nums text-[#C9D0E2]">
                  {formatElapsed(elapsed)}
                </span>
                <ListeningBars />
              </div>
            </div>

            {/* Right: discard (subtle) + stop (prominent) */}
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={cancelRecording}
                aria-label={copy.aria.discard}
                title={copy.discardRecording}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#C9D0E2] transition-colors hover:bg-[#0F1D47] hover:text-[#FDFBF7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDFBF7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A2D63]"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={stopRecording}
                aria-label={copy.aria.stop}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FDFBF7] px-3 py-1.5 text-[0.75rem] font-semibold text-[#1A2D63] transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDFBF7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A2D63]"
              >
                <Square className="h-3 w-3" fill="currentColor" />
                {copy.stopRecording}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Idle / transcribing composer — assistant-ui style: textarea
           on top, mic-left + send-right action row below. */
        <div className="group relative rounded-2xl border border-[#E0DDD2] bg-[#FFFEFA] px-3 pt-2.5 pb-1.5 shadow-[0_1px_2px_rgba(60,50,30,0.04)] transition-all focus-within:border-[#1A2D63] focus-within:shadow-[0_0_0_3px_rgba(26,45,99,0.08)]">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={isTranscribing}
            rows={1}
            className="block w-full resize-none bg-transparent text-[0.875rem] leading-[1.5] text-[#2A2620] placeholder:text-[#94908A] focus:outline-none disabled:cursor-not-allowed"
            style={{ maxHeight: '180px', minHeight: '24px' }}
          />

          <div className="mt-1 flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={startRecording}
              disabled={isTranscribing}
              aria-label={copy.aria.record}
              className={[
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FFFEFA]',
                'disabled:cursor-not-allowed disabled:opacity-50',
                isTranscribing
                  ? 'bg-[#F2F4FA] text-[#1A2D63]'
                  : 'text-[#697597] hover:bg-[#F5F3EC] hover:text-[#1A2D63]',
              ].join(' ')}
            >
              {isTranscribing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Mic className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              aria-label={copy.aria.send}
              className={[
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FFFEFA]',
                canSubmit
                  ? 'bg-[#1A2D63] text-[#FDFBF7] hover:bg-[#4D5A82] active:bg-[#0F1D47] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.16),0_1px_2px_rgba(20,30,60,0.18)]'
                  : 'bg-[#E8E6DC] text-[#A29B92] cursor-not-allowed',
              ].join(' ')}
            >
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowUp className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      )}

      {recState === 'failed' ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.6875rem] text-[#A04A2A]">
          <X className="h-3 w-3" />
          {copy.transcribeFailed}
        </p>
      ) : recState === 'denied' ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.6875rem] text-[#A04A2A]">
          <X className="h-3 w-3" />
          {copy.micDenied}
        </p>
      ) : null}
    </div>
  );
}

/** Animated 4-bar "listening" indicator — staggered scaleY pulse.
 *  Pure CSS via inline keyframe so we don't need to extend tailwind. */
function ListeningBars() {
  return (
    <>
      <style>{`
        @keyframes intake-listen {
          0%, 100% { transform: scaleY(0.35); }
          50%      { transform: scaleY(1); }
        }
      `}</style>
      <div className="flex items-end gap-[3px]" aria-hidden="true">
        {[0, 120, 60, 180].map((delay, i) => (
          <span
            key={i}
            className="block w-[3px] rounded-full bg-[#FDFBF7]"
            style={{
              height: '14px',
              transformOrigin: 'bottom',
              animation: `intake-listen 0.9s ease-in-out ${delay}ms infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default ChatInput;
