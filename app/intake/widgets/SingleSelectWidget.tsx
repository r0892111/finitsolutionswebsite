'use client';

/**
 * SingleSelectWidget — one choice from a small known set.
 * Per [intake-flow spec § Widget catalog](../../../../finit-os/docs/specs/intake-flow.md):
 *   ask_single_select { prompt, options: [{value, label, description?}] }
 */

import * as React from 'react';
import { Check } from 'lucide-react';

import type { AskSingleSelectWidget, Language } from '../types';

interface Props {
  widget: AskSingleSelectWidget;
  language: Language;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

const COPY: Record<Language, { other: string; otherPlaceholder: string; submit: string }> = {
  nl: { other: 'Anders', otherPlaceholder: 'Specifiëer', submit: 'Verstuur' },
  fr: { other: 'Autre', otherPlaceholder: 'Préciser', submit: 'Envoyer' },
  en: { other: 'Other', otherPlaceholder: 'Specify', submit: 'Send' },
};

export function SingleSelectWidget({ widget, language, onSubmit, disabled }: Props) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [otherText, setOtherText] = React.useState('');
  const allowOther = widget.allow_other_text === true;
  const copy = COPY[language];

  const isOther = selected === '__other__';
  const canSubmit = selected !== null && (!isOther || otherText.trim().length > 0);
  const finalValue = isOther ? otherText.trim() : (selected ?? '');

  return (
    <div className="w-full rounded-xl border border-[#E8E6DC] bg-[#FFFEFA] p-3 shadow-[0_1px_2px_rgba(60,50,30,0.03)]">
      <h3 className="mb-2.5 text-[0.8125rem] font-semibold text-[#322D26]">{widget.prompt}</h3>
      <div className="space-y-1.5" role="radiogroup" aria-label={widget.prompt}>
        {widget.options.map((opt) => {
          const active = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelected(opt.value)}
              disabled={disabled}
              className={[
                'flex w-full items-start gap-2 rounded-lg border px-3 py-1.5 text-left transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FDFBF7]',
                'disabled:cursor-not-allowed disabled:opacity-60',
                active
                  ? 'border-[#1A2D63] bg-[#F2F4FA] shadow-[0_0_0_1px_rgba(26,45,99,0.3)]'
                  : 'border-[#E8E6DC] bg-white hover:border-[#D8D5C7] hover:-translate-y-px hover:shadow-[0_4px_10px_-2px_rgba(60,50,30,0.08)]',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                  active ? 'border-[#1A2D63] bg-[#1A2D63]' : 'border-[#B8B5A6] bg-white',
                ].join(' ')}
                aria-hidden="true"
              >
                {active ? <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} /> : null}
              </span>
              <span className="flex-1">
                <span className={`block text-[0.75rem] font-medium ${active ? 'text-[#1A2D63]' : 'text-[#2A2620]'}`}>
                  {opt.label}
                </span>
                {opt.description ? (
                  <span className="mt-0.5 block text-[0.6875rem] text-[#76706A]">{opt.description}</span>
                ) : null}
              </span>
            </button>
          );
        })}
        {allowOther ? (
          <button
            type="button"
            role="radio"
            aria-checked={selected === '__other__'}
            onClick={() => setSelected('__other__')}
            disabled={disabled}
            className={[
              'flex w-full items-start gap-2 rounded-lg border px-3 py-1.5 text-left transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FDFBF7]',
              isOther
                ? 'border-[#1A2D63] bg-[#F2F4FA]'
                : 'border-dashed border-[#D8D5C7] bg-white hover:border-[#B8B5A6]',
            ].join(' ')}
          >
            <span
              className={[
                'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                isOther ? 'border-[#1A2D63] bg-[#1A2D63]' : 'border-[#B8B5A6] bg-white',
              ].join(' ')}
              aria-hidden="true"
            >
              {isOther ? <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} /> : null}
            </span>
            <span className="flex-1 text-[0.75rem] font-medium text-[#322D26]">{copy.other}</span>
          </button>
        ) : null}
        {isOther ? (
          <input
            type="text"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder={copy.otherPlaceholder}
            autoFocus
            className="w-full rounded-md border border-[#E8E6DC] bg-white px-2.5 py-1.5 text-[0.75rem] text-[#2A2620] placeholder:text-[#94908A] focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15"
          />
        ) : null}
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => canSubmit && onSubmit(finalValue)}
          disabled={disabled || !canSubmit}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#0F1D47] bg-[#1A2D63] px-3 py-1.5 text-[0.75rem] font-medium text-[#FDFBF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.16),0_1px_2px_rgba(20,30,60,0.18)] transition-all hover:bg-[#4D5A82] active:bg-[#0F1D47] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-1 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copy.submit}
        </button>
      </div>
    </div>
  );
}

export default SingleSelectWidget;
