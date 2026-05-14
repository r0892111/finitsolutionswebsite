'use client';

/**
 * ConfirmWidget — yes/no/approx, used for pre-fill verification.
 * Per [intake-flow spec § Widget catalog](../../../../finit-os/docs/specs/intake-flow.md):
 *   ask_confirm { prompt, pre_filled_value?, options: ["ja","nee","ongeveer"] }
 */

import * as React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

import type { AskConfirmWidget, Language } from '../types';

interface Props {
  widget: AskConfirmWidget;
  language: Language;
  onSubmit: (result: { confirmed: boolean; value?: string | number | boolean; choice: string }) => void;
  disabled?: boolean;
}

const DEFAULT_OPTS: Record<Language, string[]> = {
  nl: ['ja', 'nee', 'ongeveer'],
  fr: ['oui', 'non', 'à peu près'],
  en: ['yes', 'no', 'roughly'],
};

const COPY: Record<Language, { weHave: string }> = {
  nl: { weHave: 'We hebben genoteerd:' },
  fr: { weHave: 'Nous avons noté :' },
  en: { weHave: 'We have:' },
};

export function ConfirmWidget({ widget, language, onSubmit, disabled }: Props) {
  const options = widget.options && widget.options.length > 0 ? widget.options : DEFAULT_OPTS[language];
  const copy = COPY[language];

  const handle = (choice: string) => {
    if (disabled) return;
    const isYes = ['ja', 'oui', 'yes'].includes(choice.toLowerCase());
    onSubmit({
      confirmed: isYes,
      value: widget.pre_filled_value,
      choice,
    });
  };

  const iconFor = (choice: string) => {
    const c = choice.toLowerCase();
    if (['ja', 'oui', 'yes'].includes(c)) return <Check className="h-4 w-4" strokeWidth={2.5} />;
    if (['nee', 'non', 'no'].includes(c)) return <X className="h-4 w-4" strokeWidth={2.5} />;
    return <ArrowRight className="h-4 w-4" strokeWidth={2.5} />;
  };

  return (
    <div className="w-full rounded-2xl border border-[#E8E6DC] bg-[#FFFEFA] p-5 shadow-[0_1px_2px_rgba(60,50,30,0.04),0_18px_40px_-16px_rgba(60,50,30,0.12)]">
      <h3 className="mb-3 text-[1rem] font-semibold leading-snug text-[#322D26]">{widget.prompt}</h3>
      {widget.pre_filled_value !== undefined && widget.pre_filled_value !== null ? (
        <div className="mb-4 rounded-lg border border-[#C9D0E2] bg-[#F2F4FA] px-4 py-3">
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-[#697597]">
            {copy.weHave}
          </p>
          <p className="mt-1 text-[1rem] font-medium text-[#1A2D63]">
            {String(widget.pre_filled_value)}
          </p>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => {
          const isPrimary = i === 0;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => handle(opt)}
              disabled={disabled}
              className={
                isPrimary
                  ? 'inline-flex items-center gap-2 rounded-lg border border-[#0F1D47] bg-[#1A2D63] px-5 py-2.5 text-[0.9375rem] font-medium text-[#FDFBF7] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.20),0_1px_2px_rgba(20,30,60,0.22),0_6px_14px_-2px_rgba(20,30,60,0.32)] transition-all hover:-translate-y-px hover:bg-[#4D5A82] active:translate-y-px active:bg-[#0F1D47] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
                  : 'inline-flex items-center gap-2 rounded-lg border border-[#D8D5C7] bg-[#FDFBF7] px-5 py-2.5 text-[0.9375rem] font-medium text-[#2A2620] transition-all hover:-translate-y-px hover:border-[#B8B5A6] hover:bg-[#FFFEFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'
              }
            >
              {iconFor(opt)}
              <span className="capitalize">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ConfirmWidget;
