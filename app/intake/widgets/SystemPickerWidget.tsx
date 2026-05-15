'use client';

/**
 * SystemPickerWidget — the centerpiece of the Finit intake.
 *
 * Per [intake-flow spec § system_picker](../../../../finit-os/docs/specs/intake-flow.md):
 *   - 6 logo tiles per category, sourced from logo.clearbit.com/<domain>
 *   - Graceful fallback (puzzle-piece SVG + name text) when logo fails
 *   - "Anders → typ het in" custom text input
 *   - "We gebruiken hier niets voor" toggle
 *   - "Niet zeker, vraag aan collega" toggle (TBD flag for kickoff)
 *   - "Wie heeft admin-toegang?" follow-up (optional)
 *   - Multi-select capable (allow_multi: true is the default)
 *
 * The agent gets a structured SystemPickerSubmission back via onSubmit.
 */

import * as React from 'react';
import { Check, Plus, Puzzle } from 'lucide-react';

import type {
  SystemOption,
  SystemPickerSubmission,
  SystemPickerWidget as SystemPickerWidgetSchema,
  Language,
} from '../types';

interface Props {
  widget: SystemPickerWidgetSchema;
  language: Language;
  onSubmit: (submission: SystemPickerSubmission) => void;
  disabled?: boolean;
}

const COPY: Record<Language, {
  customLabel: string;
  customPlaceholder: string;
  customDomainPlaceholder: string;
  noneLabel: string;
  noneHelper: string;
  unsureLabel: string;
  unsureHelper: string;
  adminLabel: string;
  adminPlaceholder: string;
  adminHelper: string;
  submit: string;
  selectedSummary: (n: number) => string;
  fallbackAlt: (name: string) => string;
}> = {
  nl: {
    customLabel: 'Anders, typ het in',
    customPlaceholder: 'Naam van het systeem',
    customDomainPlaceholder: 'website.be (optioneel)',
    noneLabel: 'We gebruiken hier niets voor',
    noneHelper: 'Geen systeem in deze categorie',
    unsureLabel: 'Niet zeker, vraag aan collega',
    unsureHelper: 'We markeren dit als open vraag voor de kickoff',
    adminLabel: 'Wie heeft admin-toegang?',
    adminPlaceholder: 'Naam of e-mailadres (optioneel)',
    adminHelper: 'Zodat we weten wie we later om read-only toegang vragen',
    submit: 'Doorgaan',
    selectedSummary: (n: number) => `${n} ${n === 1 ? 'systeem gekozen' : 'systemen gekozen'}`,
    fallbackAlt: (name: string) => `Logo van ${name}`,
  },
  fr: {
    customLabel: 'Autre, tapez le nom',
    customPlaceholder: 'Nom du système',
    customDomainPlaceholder: 'site.be (optionnel)',
    noneLabel: "On n'utilise rien pour cette catégorie",
    noneHelper: 'Aucun système dans cette catégorie',
    unsureLabel: 'Pas sûr, je demande à un collègue',
    unsureHelper: 'On marquera ceci pour le kickoff',
    adminLabel: 'Qui a un accès admin ?',
    adminPlaceholder: 'Nom ou e-mail (optionnel)',
    adminHelper: 'Pour savoir à qui demander un accès en lecture seule plus tard',
    submit: 'Continuer',
    selectedSummary: (n: number) => `${n} ${n === 1 ? 'système sélectionné' : 'systèmes sélectionnés'}`,
    fallbackAlt: (name: string) => `Logo de ${name}`,
  },
  en: {
    customLabel: 'Other, type it in',
    customPlaceholder: 'System name',
    customDomainPlaceholder: 'website.be (optional)',
    noneLabel: "We don't use anything for this",
    noneHelper: 'No system in this category',
    unsureLabel: 'Not sure, will ask a colleague',
    unsureHelper: "We'll flag this as an open question for kickoff",
    adminLabel: 'Who has admin access?',
    adminPlaceholder: 'Name or email (optional)',
    adminHelper: 'So we know who to ask for read-only access later',
    submit: 'Continue',
    selectedSummary: (n: number) => `${n} ${n === 1 ? 'system selected' : 'systems selected'}`,
    fallbackAlt: (name: string) => `${name} logo`,
  },
};

/** Single logo tile with Clearbit logo + graceful fallback. */
function LogoTile({
  option,
  selected,
  onToggle,
  disabled,
  language,
}: {
  option: SystemOption;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
  language: Language;
}) {
  const [logoFailed, setLogoFailed] = React.useState(false);
  const copy = COPY[language];
  const logoUrl = `https://logo.clearbit.com/${option.domain}`;

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        'group relative flex flex-col items-center justify-center gap-2.5',
        'rounded-xl border bg-white p-4 text-center transition-all',
        'min-h-[128px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        selected
          ? 'border-[#1A2D63] bg-[#F2F4FA] shadow-[0_0_0_1px_rgba(26,45,99,0.4),0_8px_24px_-8px_rgba(26,45,99,0.25)]'
          : 'border-[#E8E6DC] hover:border-[#D8D5C7] hover:-translate-y-px hover:shadow-[0_8px_18px_-4px_rgba(60,50,30,0.10)]',
      ].join(' ')}
    >
      {/* Selected check badge */}
      <span
        className={[
          'pointer-events-none absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full',
          'transition-all',
          selected
            ? 'bg-[#1A2D63] text-[#FDFBF7] scale-100'
            : 'bg-transparent text-transparent scale-90',
        ].join(' ')}
        aria-hidden="true"
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>

      {/* Logo or fallback */}
      <div className="flex h-12 w-12 items-center justify-center">
        {!logoFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={copy.fallbackAlt(option.name)}
            className="h-12 w-12 rounded-md object-contain"
            onError={() => setLogoFailed(true)}
            loading="lazy"
          />
        ) : (
          <span
            className="flex h-12 w-12 items-center justify-center rounded-md bg-[#F0EEE6] text-[#76706A]"
            aria-hidden="true"
          >
            <Puzzle className="h-6 w-6" />
          </span>
        )}
      </div>

      <span
        className={[
          'text-[0.875rem] font-medium leading-tight',
          selected ? 'text-[#1A2D63]' : 'text-[#2A2620]',
        ].join(' ')}
      >
        {option.name}
      </span>

      {option.tier === 'primary' && !selected ? (
        <span className="text-[0.6875rem] text-[#76706A]">Veelgebruikt</span>
      ) : null}
    </button>
  );
}

export function SystemPickerWidget({ widget, language, onSubmit, disabled }: Props) {
  const allowMulti = widget.allow_multi !== false;
  const allowOther = widget.allow_other_text !== false;
  const allowNone = widget.allow_none !== false;
  const allowUnsure = widget.allow_unsure_probe_at_kickoff !== false;
  const askAdmin = widget.ask_admin_contact !== false;
  const copy = COPY[language];

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [customRows, setCustomRows] = React.useState<{ name: string; domain: string }[]>([]);
  const [customName, setCustomName] = React.useState('');
  const [customDomain, setCustomDomain] = React.useState('');
  const [none, setNone] = React.useState(false);
  const [unsure, setUnsure] = React.useState(false);
  const [adminContact, setAdminContact] = React.useState('');

  // Mutual exclusion: ticking "none" clears all picks; picking a tile clears "none"
  const toggleOption = (option: SystemOption) => {
    if (disabled) return;
    setNone(false);
    setUnsure(false);
    setSelectedKeys((prev) => {
      if (prev.includes(option.name)) {
        return prev.filter((k) => k !== option.name);
      }
      return allowMulti ? [...prev, option.name] : [option.name];
    });
  };

  const addCustomRow = () => {
    const trimmedName = customName.trim();
    if (!trimmedName) return;
    setNone(false);
    setUnsure(false);
    setCustomRows((prev) => [...prev, { name: trimmedName, domain: customDomain.trim() }]);
    setCustomName('');
    setCustomDomain('');
  };

  const removeCustomRow = (index: number) => {
    setCustomRows((prev) => prev.filter((_, i) => i !== index));
  };

  const onNoneToggle = () => {
    if (disabled) return;
    setNone((v) => {
      const next = !v;
      if (next) {
        setSelectedKeys([]);
        setCustomRows([]);
        setUnsure(false);
      }
      return next;
    });
  };

  const onUnsureToggle = () => {
    if (disabled) return;
    setUnsure((v) => {
      const next = !v;
      if (next) {
        setSelectedKeys([]);
        setCustomRows([]);
        setNone(false);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    if (disabled || !canSubmit) return;
    const selected: SystemPickerSubmission['selected'] = none
      ? []
      : [
          ...widget.options
            .filter((o) => selectedKeys.includes(o.name))
            .map((o) => ({ name: o.name, domain: o.domain })),
          ...customRows.map((r) => ({ name: r.name, domain: r.domain, is_custom: true })),
        ];

    onSubmit({
      selected,
      none_selected: none,
      unsure_probe_at_kickoff: unsure,
      admin_contact: adminContact.trim() || undefined,
    });
  };

  const totalSelected = selectedKeys.length + customRows.length;
  const canSubmit = none || unsure || totalSelected > 0;

  return (
    <div className="w-full rounded-xl border border-[#E8E6DC] bg-[#FFFEFA] p-3 shadow-[0_1px_2px_rgba(60,50,30,0.03)]">
      {widget.category_label_nl && language === 'nl' ? (
        <p className="mb-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-[#697597]">
          {widget.category_label_nl}
        </p>
      ) : widget.category_label_fr && language === 'fr' ? (
        <p className="mb-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-[#697597]">
          {widget.category_label_fr}
        </p>
      ) : widget.category_label_en && language === 'en' ? (
        <p className="mb-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-[#697597]">
          {widget.category_label_en}
        </p>
      ) : null}

      <h3 className="mb-2.5 text-[0.875rem] font-semibold leading-snug text-[#322D26]">
        {widget.prompt}
      </h3>

      {/* Logo grid: 3 cols on mobile, 6 across desktop per spec */}
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {widget.options.map((option) => (
          <LogoTile
            key={option.name}
            option={option}
            selected={selectedKeys.includes(option.name)}
            onToggle={() => toggleOption(option)}
            disabled={disabled || none || unsure}
            language={language}
          />
        ))}
      </div>

      {/* Custom-add row */}
      {allowOther ? (
        <div className="mt-5 space-y-3">
          {customRows.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {customRows.map((row, i) => (
                <li
                  key={`${row.name}-${i}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#C9D0E2] bg-[#F2F4FA] px-3 py-1 text-[0.8125rem] text-[#1A2D63]"
                >
                  <span className="font-medium">{row.name}</span>
                  {row.domain ? <span className="text-[#697597]">{row.domain}</span> : null}
                  <button
                    type="button"
                    onClick={() => removeCustomRow(i)}
                    aria-label={`Remove ${row.name}`}
                    className="ml-1 text-[#697597] transition-colors hover:text-[#1A2D63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-1 rounded-full"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M3 3l8 8M11 3l-8 8" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={copy.customPlaceholder}
              disabled={disabled || none || unsure}
              aria-label={copy.customLabel}
              className="flex-1 rounded-lg border border-[#E8E6DC] bg-white px-3.5 py-2.5 text-[0.9375rem] text-[#2A2620] placeholder:text-[#94908A] transition-colors focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder={copy.customDomainPlaceholder}
              disabled={disabled || none || unsure}
              aria-label="website"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomRow();
                }
              }}
              className="rounded-lg border border-[#E8E6DC] bg-white px-3.5 py-2.5 text-[0.9375rem] text-[#2A2620] placeholder:text-[#94908A] transition-colors focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15 disabled:cursor-not-allowed disabled:opacity-60 sm:w-[180px]"
            />
            <button
              type="button"
              onClick={addCustomRow}
              disabled={disabled || none || unsure || !customName.trim()}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#D8D5C7] bg-[#FDFBF7] px-3.5 py-2.5 text-[0.875rem] font-medium text-[#2A2620] transition-all hover:border-[#B8B5A6] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <Plus className="h-4 w-4" />
              {copy.customLabel}
            </button>
          </div>
        </div>
      ) : null}

      {/* Toggle row: none + unsure */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {allowNone ? (
          <ToggleChip
            checked={none}
            onChange={onNoneToggle}
            disabled={disabled}
            label={copy.noneLabel}
            helper={copy.noneHelper}
          />
        ) : null}
        {allowUnsure ? (
          <ToggleChip
            checked={unsure}
            onChange={onUnsureToggle}
            disabled={disabled}
            label={copy.unsureLabel}
            helper={copy.unsureHelper}
          />
        ) : null}
      </div>

      {/* Admin contact follow-up */}
      {askAdmin && (totalSelected > 0 || none) ? (
        <div className="mt-5 rounded-lg border border-[#E8E6DC] bg-[#F5F3EC] p-4">
          <label htmlFor={`admin-${widget.widget_id}`} className="mb-1 block text-[0.875rem] font-medium text-[#322D26]">
            {copy.adminLabel}
          </label>
          <p className="mb-2 text-[0.8125rem] text-[#76706A]">{copy.adminHelper}</p>
          <input
            id={`admin-${widget.widget_id}`}
            type="text"
            value={adminContact}
            onChange={(e) => setAdminContact(e.target.value)}
            placeholder={copy.adminPlaceholder}
            disabled={disabled}
            className="w-full rounded-lg border border-[#E8E6DC] bg-white px-3.5 py-2.5 text-[0.9375rem] text-[#2A2620] placeholder:text-[#94908A] transition-colors focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      ) : null}

      {/* Submit row */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-[0.6875rem] text-[#76706A]" aria-live="polite">
          {none ? copy.noneHelper : unsure ? copy.unsureHelper : copy.selectedSummary(totalSelected)}
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || !canSubmit}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#0F1D47] bg-[#1A2D63] px-3 py-1.5 text-[0.75rem] font-medium text-[#FDFBF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.16),0_1px_2px_rgba(20,30,60,0.18)] transition-all hover:bg-[#4D5A82] active:bg-[#0F1D47] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-1 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copy.submit}
        </button>
      </div>
    </div>
  );
}

/** Soft toggle chip used for "none" + "unsure" rows. */
function ToggleChip({
  checked,
  onChange,
  disabled,
  label,
  helper,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label: string;
  helper: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      aria-pressed={checked}
      className={[
        'group inline-flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-left transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        checked
          ? 'border-[#1A2D63] bg-[#E4E8F2]'
          : 'border-[#E8E6DC] bg-[#FDFBF7] hover:border-[#D8D5C7]',
      ].join(' ')}
    >
      <span
        className={[
          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
          checked ? 'border-[#1A2D63] bg-[#1A2D63]' : 'border-[#B8B5A6] bg-white',
        ].join(' ')}
        aria-hidden="true"
      >
        {checked ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
      </span>
      <span className="leading-tight">
        <span className={`block text-[0.875rem] font-medium ${checked ? 'text-[#1A2D63]' : 'text-[#322D26]'}`}>
          {label}
        </span>
        <span className="block text-[0.75rem] text-[#76706A]">{helper}</span>
      </span>
    </button>
  );
}

export default SystemPickerWidget;
