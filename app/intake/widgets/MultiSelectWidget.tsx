'use client';

/**
 * MultiSelectWidget — multiple choices.
 * Per [intake-flow spec § Widget catalog](../../../../finit-os/docs/specs/intake-flow.md):
 *   ask_multi_select { prompt, options, min?, max? }
 */

import * as React from 'react';
import { Check, Plus } from 'lucide-react';

import type { AskMultiSelectWidget, Language } from '../types';

interface Props {
  widget: AskMultiSelectWidget;
  language: Language;
  onSubmit: (values: string[]) => void;
  disabled?: boolean;
}

const COPY: Record<
  Language,
  { other: string; otherPlaceholder: string; submit: string; pick: (lo: number, hi?: number) => string }
> = {
  nl: {
    other: 'Anders toevoegen',
    otherPlaceholder: 'Typ en druk op enter',
    submit: 'Verstuur',
    pick: (lo, hi) =>
      hi ? `Kies tussen ${lo} en ${hi}` : lo > 0 ? `Kies minstens ${lo}` : 'Kies een of meer',
  },
  fr: {
    other: 'Ajouter autre',
    otherPlaceholder: 'Taper et appuyer entrée',
    submit: 'Envoyer',
    pick: (lo, hi) =>
      hi ? `Choisir entre ${lo} et ${hi}` : lo > 0 ? `Choisir au moins ${lo}` : 'Choisir un ou plusieurs',
  },
  en: {
    other: 'Add other',
    otherPlaceholder: 'Type and hit enter',
    submit: 'Send',
    pick: (lo, hi) =>
      hi ? `Pick between ${lo} and ${hi}` : lo > 0 ? `Pick at least ${lo}` : 'Pick one or more',
  },
};

export function MultiSelectWidget({ widget, language, onSubmit, disabled }: Props) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [customValues, setCustomValues] = React.useState<string[]>([]);
  const [customInput, setCustomInput] = React.useState('');
  const copy = COPY[language];

  const min = widget.min ?? 1;
  const max = widget.max;
  const total = selected.length + customValues.length;
  const canSubmit = total >= min && (!max || total <= max);

  const toggle = (value: string) => {
    setSelected((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (max && total >= max) return prev;
      return [...prev, value];
    });
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (max && total >= max) return;
    setCustomValues((prev) => [...prev, trimmed]);
    setCustomInput('');
  };

  const removeCustom = (i: number) => {
    setCustomValues((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="w-full rounded-xl border border-[#E8E6DC] bg-[#FFFEFA] p-3 shadow-[0_1px_2px_rgba(60,50,30,0.03)]">
      <h3 className="text-[0.8125rem] font-semibold text-[#322D26]">{widget.prompt}</h3>
      <p className="mb-2.5 mt-0.5 text-[0.6875rem] text-[#76706A]">{copy.pick(min, max)}</p>

      <div className="space-y-1.5">
        {widget.options.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(opt.value)}
              disabled={disabled || (!active && max !== undefined && total >= max)}
              className={[
                'flex w-full items-start gap-2 rounded-lg border px-3 py-1.5 text-left transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FDFBF7]',
                'disabled:cursor-not-allowed disabled:opacity-60',
                active
                  ? 'border-[#1A2D63] bg-[#F2F4FA]'
                  : 'border-[#E8E6DC] bg-white hover:border-[#D8D5C7]',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
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
      </div>

      {widget.allow_other_text ? (
        <div className="mt-2.5 space-y-2">
          {customValues.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {customValues.map((v, i) => (
                <li
                  key={`${v}-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#C9D0E2] bg-[#F2F4FA] px-2 py-0.5 text-[0.6875rem] text-[#1A2D63]"
                >
                  <span className="font-medium">{v}</span>
                  <button
                    type="button"
                    onClick={() => removeCustom(i)}
                    aria-label={`Remove ${v}`}
                    className="text-[#697597] hover:text-[#1A2D63]"
                  >
                    <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M3 3l8 8M11 3l-8 8" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-col gap-1.5 sm:flex-row">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustom();
                }
              }}
              placeholder={copy.otherPlaceholder}
              disabled={disabled || (max !== undefined && total >= max)}
              className="flex-1 rounded-md border border-[#E8E6DC] bg-white px-2.5 py-1.5 text-[0.75rem] text-[#2A2620] placeholder:text-[#94908A] focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="button"
              onClick={addCustom}
              disabled={disabled || !customInput.trim() || (max !== undefined && total >= max)}
              className="inline-flex items-center justify-center gap-1 rounded-md border border-[#D8D5C7] bg-[#FDFBF7] px-2.5 py-1.5 text-[0.6875rem] font-medium text-[#2A2620] hover:border-[#B8B5A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FDFBF7] disabled:cursor-not-allowed disabled:opacity-60 transition-all"
            >
              <Plus className="h-3 w-3" />
              {copy.other}
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-[0.6875rem] text-[#76706A]" aria-live="polite">
          {total} {max ? `/ ${max}` : ''}
        </p>
        <button
          type="button"
          onClick={() => canSubmit && onSubmit([...selected, ...customValues])}
          disabled={disabled || !canSubmit}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#0F1D47] bg-[#1A2D63] px-3 py-1.5 text-[0.75rem] font-medium text-[#FDFBF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.16),0_1px_2px_rgba(20,30,60,0.18)] transition-all hover:bg-[#4D5A82] active:bg-[#0F1D47] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-1 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copy.submit}
        </button>
      </div>
    </div>
  );
}

export default MultiSelectWidget;
