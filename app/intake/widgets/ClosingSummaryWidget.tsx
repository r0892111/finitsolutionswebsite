'use client';

/**
 * ClosingSummaryWidget — the end-of-intake review.
 * Per [intake-flow spec § Widget catalog](../../../../finit-os/docs/specs/intake-flow.md):
 *   closing_summary { summary: [{goal, captured}], missing?: [...] }
 *
 * Per spec § Edge case 12: when goal confidence is low, ask explicitly
 * "finish now or save for kickoff?" — we expose a "revisit" array on
 * submission so the agent can branch.
 */

import * as React from 'react';
import { Check, AlertCircle, Sparkles } from 'lucide-react';

import type { ClosingSummaryWidget as ClosingSummaryWidgetSchema, Language } from '../types';

interface Props {
  widget: ClosingSummaryWidgetSchema;
  language: Language;
  onSubmit: (result: { proceed: boolean; revisit?: string[] }) => void;
  disabled?: boolean;
}

const COPY: Record<
  Language,
  {
    intro: string;
    captured: string;
    missing: string;
    submit: string;
    saveForKickoff: string;
    revisitOne: string;
    confidenceLow: string;
    confidenceMedium: string;
    confidenceHigh: string;
  }
> = {
  nl: {
    intro: 'Een korte samenvatting voor we afsluiten',
    captured: 'Wat we hebben',
    missing: 'Wat we minder zeker weten',
    submit: 'Afronden en versturen',
    saveForKickoff: 'Bewaar voor kickoff',
    revisitOne: 'Nog even oppakken',
    confidenceLow: 'lage zekerheid',
    confidenceMedium: 'redelijke zekerheid',
    confidenceHigh: 'volledig',
  },
  fr: {
    intro: 'Un résumé avant de conclure',
    captured: 'Ce que nous avons',
    missing: 'Ce dont nous sommes moins sûrs',
    submit: 'Terminer et envoyer',
    saveForKickoff: 'Garder pour le kickoff',
    revisitOne: 'Revenir dessus',
    confidenceLow: 'peu sûr',
    confidenceMedium: 'assez sûr',
    confidenceHigh: 'complet',
  },
  en: {
    intro: 'A short summary before we close',
    captured: "What we have",
    missing: "What we're less sure about",
    submit: 'Finish and submit',
    saveForKickoff: 'Save for kickoff',
    revisitOne: 'Revisit briefly',
    confidenceLow: 'low confidence',
    confidenceMedium: 'medium confidence',
    confidenceHigh: 'complete',
  },
};

export function ClosingSummaryWidget({ widget, language, onSubmit, disabled }: Props) {
  const copy = COPY[language];
  const [revisit, setRevisit] = React.useState<string[]>([]);

  const toggleRevisit = (goal: string) => {
    setRevisit((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
  };

  const confidenceLabel = (c?: 'low' | 'medium' | 'high') => {
    if (c === 'low') return copy.confidenceLow;
    if (c === 'medium') return copy.confidenceMedium;
    if (c === 'high') return copy.confidenceHigh;
    return undefined;
  };

  return (
    <div className="w-full rounded-2xl border border-[#E8E6DC] bg-[#FFFEFA] p-6 shadow-[0_1px_2px_rgba(60,50,30,0.04),0_18px_40px_-16px_rgba(60,50,30,0.12)]">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9D0E2] bg-[#F2F4FA] px-3 py-1 text-[0.75rem] font-medium text-[#1A2D63]">
        <Sparkles className="h-3.5 w-3.5" />
        {copy.intro}
      </div>

      {widget.prompt ? (
        <p className="mb-4 text-[1rem] font-medium text-[#322D26]">{widget.prompt}</p>
      ) : null}

      <div className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#697597]">
        {copy.captured}
      </div>
      <ul className="space-y-3">
        {widget.summary.map((item, i) => {
          const flagged = revisit.includes(item.goal);
          const lowConf = item.confidence === 'low';
          return (
            <li
              key={`${item.goal}-${i}`}
              className="rounded-lg border border-[#E8E6DC] bg-[#FDFBF7] px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    lowConf ? 'bg-[#F0EEE6] text-[#A04A2A]' : 'bg-[#1A2D63] text-[#FDFBF7]'
                  }`}
                  aria-hidden="true"
                >
                  {lowConf ? (
                    <AlertCircle className="h-3 w-3" strokeWidth={2.5} />
                  ) : (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[0.875rem] font-semibold text-[#322D26]">{item.goal}</span>
                    {confidenceLabel(item.confidence) ? (
                      <span
                        className={`text-[0.6875rem] font-medium uppercase tracking-[0.06em] ${
                          lowConf ? 'text-[#A04A2A]' : 'text-[#697597]'
                        }`}
                      >
                        {confidenceLabel(item.confidence)}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-[#57514A]">{item.captured}</p>

                  {lowConf ? (
                    <button
                      type="button"
                      onClick={() => toggleRevisit(item.goal)}
                      className={[
                        'mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.75rem] font-medium transition-colors',
                        flagged
                          ? 'border-[#1A2D63] bg-[#1A2D63] text-[#FDFBF7]'
                          : 'border-[#D8D5C7] bg-white text-[#57514A] hover:border-[#B8B5A6]',
                      ].join(' ')}
                    >
                      {flagged ? (
                        <>
                          <Check className="h-3 w-3" strokeWidth={3} />
                          {copy.revisitOne}
                        </>
                      ) : (
                        copy.revisitOne
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {widget.missing && widget.missing.length > 0 ? (
        <>
          <div className="mb-2 mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#A04A2A]">
            {copy.missing}
          </div>
          <ul className="flex flex-wrap gap-2">
            {widget.missing.map((m) => (
              <li
                key={m}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DCC9] bg-[#FAF5EC] px-2.5 py-1 text-[0.75rem] text-[#74532A]"
              >
                <AlertCircle className="h-3 w-3" />
                {m}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
        {revisit.length > 0 ? (
          <button
            type="button"
            onClick={() => onSubmit({ proceed: false, revisit })}
            disabled={disabled}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D8D5C7] bg-[#FDFBF7] px-4 py-2.5 text-[0.875rem] font-medium text-[#2A2620] transition-all hover:border-[#B8B5A6] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {copy.revisitOne} ({revisit.length})
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onSubmit({ proceed: true, revisit: revisit.length > 0 ? revisit : undefined })}
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0F1D47] bg-[#1A2D63] px-5 py-2.5 text-[0.9375rem] font-medium text-[#FDFBF7] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.20),0_1px_2px_rgba(20,30,60,0.22),0_6px_14px_-2px_rgba(20,30,60,0.32)] transition-all hover:-translate-y-px hover:bg-[#4D5A82] active:translate-y-px active:bg-[#0F1D47] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {copy.submit}
        </button>
      </div>
    </div>
  );
}

export default ClosingSummaryWidget;
