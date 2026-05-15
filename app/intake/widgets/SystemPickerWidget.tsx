'use client';

/**
 * SystemPickerWidget — the centerpiece of the Finit intake.
 *
 * Per [intake-flow spec § system_picker](../../../../finit-os/docs/specs/intake-flow.md):
 *   - 6 logo tiles per category, sourced from img.logo.dev/<domain>
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
import { Check, Plus } from 'lucide-react';

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
  tierPrimary: string;
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
    tierPrimary: 'Veelgebruikt',
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
    tierPrimary: 'Courant',
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
    tierPrimary: 'Common',
  },
};

/** Stable hue-shift per system name → recognizable colored initial when no logo. */
function initialColors(name: string): { bg: string; fg: string } {
  // Small marine-palette set; pick deterministically by char-sum so the
  // same brand always gets the same color. Stays within the design system.
  const palette: { bg: string; fg: string }[] = [
    { bg: '#1A2D63', fg: '#FDFBF7' },
    { bg: '#2E3D6E', fg: '#FDFBF7' },
    { bg: '#4D5A82', fg: '#FDFBF7' },
    { bg: '#E5E9F4', fg: '#1A2D63' },
    { bg: '#C9D0E2', fg: '#1A2D63' },
    { bg: '#F2F4FA', fg: '#1A2D63' },
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return palette[sum % palette.length];
}

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
  // logo.dev replaced Clearbit's free Logo API in 2024. Publishable
  // token is fine in the browser per their docs (rate-limited per
  // referer, not a secret). We only try the lookup when domain looks
  // like an actual hostname — agents sometimes hand back option names
  // ("WhatsApp groep") in the domain slot, which would 404 every time.
  const logoToken = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;
  const domain = (option.domain || '').trim();
  const isLikelyDomain = /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain);
  const logoUrl = isLikelyDomain
    ? logoToken
      ? `https://img.logo.dev/${domain}?token=${logoToken}&size=160&format=png`
      : `https://img.logo.dev/${domain}?size=160&format=png`
    : null;
  const showLogo = logoUrl !== null && !logoFailed;
  const initial = option.name.trim().slice(0, 1).toUpperCase() || '?';
  const colors = initialColors(option.name);

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        'group relative flex flex-col items-center justify-center gap-1.5',
        'rounded-lg border bg-white p-2.5 text-center transition-all',
        'min-h-[96px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        selected
          ? 'border-[#1A2D63] bg-[#F2F4FA] shadow-[0_0_0_1px_rgba(26,45,99,0.3),0_6px_16px_-8px_rgba(26,45,99,0.22)]'
          : 'border-[#E8E6DC] hover:border-[#D8D5C7] hover:-translate-y-px hover:shadow-[0_6px_14px_-4px_rgba(60,50,30,0.08)]',
      ].join(' ')}
    >
      {/* Selected check badge */}
      <span
        className={[
          'pointer-events-none absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full',
          'transition-all',
          selected
            ? 'bg-[#1A2D63] text-[#FDFBF7] scale-100'
            : 'bg-transparent text-transparent scale-90',
        ].join(' ')}
        aria-hidden="true"
      >
        <Check className="h-2.5 w-2.5" strokeWidth={3} />
      </span>

      {/* Logo or fallback initial */}
      <div className="flex h-9 w-9 items-center justify-center">
        {showLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl!}
            alt={copy.fallbackAlt(option.name)}
            className="h-9 w-9 rounded-md object-contain"
            onError={() => setLogoFailed(true)}
            loading="lazy"
          />
        ) : (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-md text-[0.8125rem] font-semibold"
            style={{ backgroundColor: colors.bg, color: colors.fg }}
            aria-hidden="true"
          >
            {initial}
          </span>
        )}
      </div>

      <span
        className={[
          'text-[0.75rem] font-medium leading-tight',
          selected ? 'text-[#1A2D63]' : 'text-[#2A2620]',
        ].join(' ')}
      >
        {option.name}
      </span>

      {option.tier === 'primary' && !selected ? (
        <span className="text-[0.625rem] text-[#76706A]">{copy.tierPrimary}</span>
      ) : null}
    </button>
  );
}

export function SystemPickerWidget({ widget, language, onSubmit, disabled }: Props) {
  const allowMulti = widget.allow_multi !== false;
  const allowOther = widget.allow_other_text !== false;
  const allowNone = widget.allow_none !== false;
  const allowUnsure = widget.allow_unsure_probe_at_kickoff !== false;
  const askAdmin = widget.ask_admin_contact === true;
  const copy = COPY[language];

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [customRows, setCustomRows] = React.useState<{ name: string; domain: string }[]>([]);
  const [customName, setCustomName] = React.useState('');
  const [customDomain, setCustomDomain] = React.useState('');
  const [none, setNone] = React.useState(false);
  const [unsure, setUnsure] = React.useState(false);
  const [adminContact, setAdminContact] = React.useState('');
  // Progressive disclosure — keep the default view clean. The custom-add
  // form and admin-contact field are hidden behind toggle links so they
  // only appear when the user actually needs them.
  const [showCustomAdd, setShowCustomAdd] = React.useState(false);
  const [showAdminField, setShowAdminField] = React.useState(false);

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

  const totalSelected = selectedKeys.length + customRows.length;
  const nothingPicked = !none && !unsure && totalSelected === 0;
  // Submit is always allowed. Empty submission = "We gebruiken hier niets".
  const submitDisabled = disabled === true;
  const submitEffectiveNone = none || nothingPicked;

  const adjustedHandleSubmit = () => {
    if (submitDisabled) return;
    const useNone = submitEffectiveNone;
    const selected: SystemPickerSubmission['selected'] = useNone
      ? []
      : [
          ...widget.options
            .filter((o) => selectedKeys.includes(o.name))
            .map((o) => ({ name: o.name, domain: o.domain })),
          ...customRows.map((r) => ({ name: r.name, domain: r.domain, is_custom: true })),
        ];
    onSubmit({
      selected,
      none_selected: useNone && !unsure,
      unsure_probe_at_kickoff: unsure,
      admin_contact: adminContact.trim() || undefined,
    });
  };

  return (
    <div className="w-full rounded-xl border border-[#E8E6DC] bg-[#FFFEFA] p-3 shadow-[0_1px_2px_rgba(60,50,30,0.03)]">
      {/* Subtle prompt — the chat above sometimes skips re-asking the
          question, so we always show the widget's own prompt as a quiet
          sub-title. Font is intentionally lighter than a real heading
          so it doesn't compete with the tiles. */}
      {widget.prompt ? (
        <p className="mb-2.5 text-[0.8125rem] font-medium leading-snug text-[#322D26]">
          {widget.prompt}
        </p>
      ) : null}

      {/* Logo grid — primary action. Fixed 2-on-mobile / 3-on-desktop
          grid keeps rows uniform regardless of tile count. */}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
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

        {/* Compact "+ Ander systeem" tile — same grid slot as a logo tile.
            Tapping it expands the inline custom-add form below. */}
        {allowOther ? (
          <button
            type="button"
            onClick={() => setShowCustomAdd((v) => !v)}
            disabled={disabled || none || unsure}
            className={[
              'group flex min-h-[96px] flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed bg-[#FDFBF7] p-2.5 text-center transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFEFA]',
              'disabled:cursor-not-allowed disabled:opacity-60',
              showCustomAdd
                ? 'border-[#1A2D63] text-[#1A2D63]'
                : 'border-[#D8D5C7] text-[#697597] hover:border-[#B8B5A6] hover:text-[#1A2D63]',
            ].join(' ')}
          >
            <Plus className="h-4 w-4" />
            <span className="text-[0.75rem] font-medium">{copy.customLabel}</span>
          </button>
        ) : null}
      </div>

      {/* Custom-add inline form — only when expanded */}
      {allowOther && showCustomAdd ? (
        <div className="mt-2.5 space-y-2">
          {customRows.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {customRows.map((row, i) => (
                <li
                  key={`${row.name}-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#C9D0E2] bg-[#F2F4FA] px-2 py-0.5 text-[0.6875rem] text-[#1A2D63]"
                >
                  <span className="font-medium">{row.name}</span>
                  {row.domain ? <span className="text-[#697597]">{row.domain}</span> : null}
                  <button
                    type="button"
                    onClick={() => removeCustomRow(i)}
                    aria-label={`Remove ${row.name}`}
                    className="ml-0.5 text-[#697597] transition-colors hover:text-[#1A2D63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-1 rounded-full"
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
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={copy.customPlaceholder}
              disabled={disabled || none || unsure}
              aria-label={copy.customLabel}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomRow();
                }
              }}
              className="flex-1 rounded-md border border-[#E8E6DC] bg-white px-2.5 py-1.5 text-[0.75rem] text-[#2A2620] placeholder:text-[#94908A] transition-colors focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15 disabled:cursor-not-allowed disabled:opacity-60"
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
              className="rounded-md border border-[#E8E6DC] bg-white px-2.5 py-1.5 text-[0.75rem] text-[#2A2620] placeholder:text-[#94908A] transition-colors focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15 disabled:cursor-not-allowed disabled:opacity-60 sm:w-[140px]"
            />
            <button
              type="button"
              onClick={addCustomRow}
              disabled={disabled || none || unsure || !customName.trim()}
              className="inline-flex items-center justify-center gap-1 rounded-md bg-[#1A2D63] px-2.5 py-1.5 text-[0.6875rem] font-medium text-[#FDFBF7] transition-all hover:bg-[#4D5A82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-3 w-3" />
              {language === 'nl' ? 'Voeg toe' : language === 'fr' ? 'Ajouter' : 'Add'}
            </button>
          </div>
        </div>
      ) : null}

      {/* Admin contact — collapsed behind a link, expands inline */}
      {askAdmin && totalSelected > 0 ? (
        <div className="mt-2.5">
          {showAdminField ? (
            <div className="rounded-md bg-[#F5F3EC] p-2.5">
              <label
                htmlFor={`admin-${widget.widget_id}`}
                className="mb-1 block text-[0.6875rem] font-medium text-[#697597]"
              >
                {copy.adminLabel}
              </label>
              <input
                id={`admin-${widget.widget_id}`}
                type="text"
                value={adminContact}
                onChange={(e) => setAdminContact(e.target.value)}
                placeholder={copy.adminPlaceholder}
                disabled={disabled}
                autoFocus
                className="w-full rounded-md border border-[#E8E6DC] bg-white px-2.5 py-1.5 text-[0.75rem] text-[#2A2620] placeholder:text-[#94908A] focus:border-[#1A2D63] focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowAdminField(true)}
              className="text-[0.6875rem] font-medium text-[#697597] hover:text-[#1A2D63] transition-colors"
            >
              + {copy.adminLabel}
            </button>
          )}
        </div>
      ) : null}

      {/* Footer row: text-link escape hatches + submit */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem]">
          {allowNone ? (
            <button
              type="button"
              onClick={onNoneToggle}
              disabled={disabled}
              className={[
                'underline decoration-dotted decoration-1 underline-offset-[3px] transition-colors',
                none
                  ? 'font-semibold text-[#1A2D63] decoration-solid'
                  : 'text-[#4D5A82] hover:text-[#1A2D63] hover:decoration-solid',
              ].join(' ')}
            >
              {none ? '✓ ' : ''}{copy.noneLabel}
            </button>
          ) : null}
          {allowNone && allowUnsure ? (
            <span className="text-[#C9CBC4]" aria-hidden="true">·</span>
          ) : null}
          {allowUnsure ? (
            <button
              type="button"
              onClick={onUnsureToggle}
              disabled={disabled}
              className={[
                'underline decoration-dotted decoration-1 underline-offset-[3px] transition-colors',
                unsure
                  ? 'font-semibold text-[#1A2D63] decoration-solid'
                  : 'text-[#4D5A82] hover:text-[#1A2D63] hover:decoration-solid',
              ].join(' ')}
            >
              {unsure ? '✓ ' : ''}{copy.unsureLabel}
            </button>
          ) : null}
        </div>

        <button
          type="button"
          onClick={adjustedHandleSubmit}
          disabled={submitDisabled}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#0F1D47] bg-[#1A2D63] px-3 py-1.5 text-[0.75rem] font-medium text-[#FDFBF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.16),0_1px_2px_rgba(20,30,60,0.18)] transition-all hover:bg-[#4D5A82] active:bg-[#0F1D47] focus-visible:outline-none focus-visible:outline-[2px] focus-visible:outline-offset-1 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copy.submit}
        </button>
      </div>
    </div>
  );
}

export default SystemPickerWidget;
