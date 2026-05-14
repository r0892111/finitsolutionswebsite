'use client';

/**
 * TextWidget — short free-text answer.
 * Per [intake-flow spec § Widget catalog](../../../../finit-os/docs/specs/intake-flow.md):
 *   ask_text { prompt, placeholder?, max_length? }
 */

import * as React from 'react';

import type { AskTextWidget, Language } from '../types';

interface Props {
  widget: AskTextWidget;
  language: Language;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

const COPY: Record<Language, { submit: string; chars: string }> = {
  nl: { submit: 'Verstuur', chars: 'tekens' },
  fr: { submit: 'Envoyer', chars: 'caractères' },
  en: { submit: 'Send', chars: 'characters' },
};

export function TextWidget({ widget, language, onSubmit, disabled }: Props) {
  const [value, setValue] = React.useState('');
  const copy = COPY[language];
  const max = widget.max_length;
  const canSubmit = value.trim().length > 0 && (!max || value.length <= max);

  return (
    <div className="w-full rounded-2xl border border-[#E8E6DC] bg-[#FFFEFA] p-5 shadow-[0_1px_2px_rgba(60,50,30,0.04),0_18px_40px_-16px_rgba(60,50,30,0.12)]">
      <label htmlFor={`text-${widget.widget_id}`} className="mb-3 block text-[1rem] font-semibold text-[#322D26]">
        {widget.prompt}
      </label>
      <input
        id={`text-${widget.widget_id}`}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={widget.placeholder}
        maxLength={max}
        disabled={disabled}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && canSubmit) {
            e.preventDefault();
            onSubmit(value.trim());
          }
        }}
        className="w-full rounded-lg border border-[#E8E6DC] bg-white px-3.5 py-3 text-[0.9375rem] text-[#2A2620] placeholder:text-[#94908A] transition-colors focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15 disabled:cursor-not-allowed disabled:opacity-60"
      />
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[0.75rem] text-[#76706A]">
          {max ? `${value.length} / ${max} ${copy.chars}` : ''}
        </p>
        <button
          type="button"
          onClick={() => canSubmit && onSubmit(value.trim())}
          disabled={disabled || !canSubmit}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0F1D47] bg-[#1A2D63] px-5 py-2.5 text-[0.9375rem] font-medium text-[#FDFBF7] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.20),0_1px_2px_rgba(20,30,60,0.22),0_6px_14px_-2px_rgba(20,30,60,0.32)] transition-all hover:-translate-y-px hover:bg-[#4D5A82] active:translate-y-px active:bg-[#0F1D47] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {copy.submit}
        </button>
      </div>
    </div>
  );
}

export default TextWidget;
