'use client';

/**
 * SliderWidget — numeric on a range with anchor labels.
 * Per [intake-flow spec § Widget catalog](../../../../finit-os/docs/specs/intake-flow.md):
 *   ask_slider { prompt, min, max, step, unit, anchor_labels? }
 *
 * Used for hourly-rate anchoring (Goal 5) and similar numeric inputs.
 */

import * as React from 'react';

import type { AskSliderWidget, Language } from '../types';

interface Props {
  widget: AskSliderWidget;
  language: Language;
  onSubmit: (value: number) => void;
  disabled?: boolean;
}

const COPY: Record<Language, { submit: string }> = {
  nl: { submit: 'Verstuur' },
  fr: { submit: 'Envoyer' },
  en: { submit: 'Send' },
};

export function SliderWidget({ widget, language, onSubmit, disabled }: Props) {
  const start =
    widget.default_value ?? Math.round((widget.min + widget.max) / 2 / widget.step) * widget.step;
  const [value, setValue] = React.useState<number>(start);
  const copy = COPY[language];

  const pct = ((value - widget.min) / (widget.max - widget.min)) * 100;

  return (
    <div className="w-full rounded-2xl border border-[#E8E6DC] bg-[#FFFEFA] p-5 shadow-[0_1px_2px_rgba(60,50,30,0.04),0_18px_40px_-16px_rgba(60,50,30,0.12)]">
      <h3 className="mb-5 text-[1rem] font-semibold text-[#322D26]">{widget.prompt}</h3>

      <div className="flex items-baseline justify-center gap-2">
        <span className="tabular-nums text-[2.5rem] font-bold leading-none text-[#1A2D63]">
          {value}
        </span>
        {widget.unit ? (
          <span className="text-[1rem] font-medium text-[#697597]">{widget.unit}</span>
        ) : null}
      </div>

      <div className="mt-6">
        <input
          type="range"
          min={widget.min}
          max={widget.max}
          step={widget.step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          disabled={disabled}
          aria-label={widget.prompt}
          className="finit-slider w-full"
          style={
            {
              ['--slider-pct' as string]: `${pct}%`,
            } as React.CSSProperties
          }
        />
        <div className="mt-2 flex justify-between text-[0.75rem] text-[#76706A]">
          <span>
            {widget.min}
            {widget.unit ? ` ${widget.unit}` : ''}
          </span>
          <span>
            {widget.max}
            {widget.unit ? ` ${widget.unit}` : ''}
          </span>
        </div>

        {widget.anchor_labels && widget.anchor_labels.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {widget.anchor_labels.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => setValue(a.value)}
                disabled={disabled}
                className={[
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.75rem] font-medium transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]',
                  value === a.value
                    ? 'border-[#1A2D63] bg-[#E4E8F2] text-[#1A2D63]'
                    : 'border-[#E8E6DC] bg-[#FDFBF7] text-[#57514A] hover:border-[#D8D5C7]',
                ].join(' ')}
              >
                <span className="tabular-nums font-semibold">
                  {a.value}
                  {widget.unit ? ` ${widget.unit}` : ''}
                </span>
                <span className="text-[#76706A]">{a.label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => onSubmit(value)}
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0F1D47] bg-[#1A2D63] px-5 py-2.5 text-[0.9375rem] font-medium text-[#FDFBF7] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.20),0_1px_2px_rgba(20,30,60,0.22),0_6px_14px_-2px_rgba(20,30,60,0.32)] transition-all hover:-translate-y-px hover:bg-[#4D5A82] active:translate-y-px active:bg-[#0F1D47] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {copy.submit}
        </button>
      </div>

      <style jsx>{`
        :global(.finit-slider) {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 9999px;
          background: linear-gradient(
            to right,
            #1A2D63 0%,
            #1A2D63 var(--slider-pct, 50%),
            #E4E8F2 var(--slider-pct, 50%),
            #E4E8F2 100%
          );
          outline: none;
          cursor: pointer;
        }
        :global(.finit-slider::-webkit-slider-thumb) {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #1A2D63;
          border: 3px solid #FDFBF7;
          box-shadow: 0 2px 6px rgba(20, 30, 60, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
          cursor: grab;
          transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        :global(.finit-slider::-webkit-slider-thumb:hover) {
          transform: scale(1.08);
        }
        :global(.finit-slider::-webkit-slider-thumb:active) {
          cursor: grabbing;
          transform: scale(0.96);
        }
        :global(.finit-slider::-moz-range-thumb) {
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #1A2D63;
          border: 3px solid #FDFBF7;
          box-shadow: 0 2px 6px rgba(20, 30, 60, 0.35);
          cursor: grab;
        }
      `}</style>
    </div>
  );
}

export default SliderWidget;
