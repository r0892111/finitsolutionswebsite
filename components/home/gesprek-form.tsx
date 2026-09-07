"use client";

import { useEffect, useRef, useState } from "react";
import { pushEvent } from "@/lib/analytics";
import { CONTACT_WEBHOOK_URL, WHATSAPP_LINK, WHATSAPP_NUMBER } from "@/lib/finit-links";
import { FORM } from "./copy";

type Status = "idle" | "sending" | "done" | "error";

/**
 * "Plan 20 minuten met Karel". Stuurt naar de bestaande n8n-flow.
 * De lesreeks-knop komt hier NIET langs: die gaat rechtstreeks naar Skool.
 */
export function GesprekForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    document.body.style.overflow = "hidden";
    const focus = setTimeout(() => firstField.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focus);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const bron = `https://finitsolutions.be${window.location.pathname === "/" ? "" : window.location.pathname}`;

    try {
      const res = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: data.get("naam"),
          telefoonnummer: data.get("telefoon"),
          email: data.get("email"),
          zaak: data.get("zaak"),
          vraag: data.get("vraag"),
          intent: "gesprek",
          bron,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("done");
      pushEvent("form_submit", { intent: "gesprek", location: bron });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gesprek-titel"
    >
      <div className="absolute inset-0 bg-[#0F1D47]/50" onClick={onClose} aria-hidden="true" />

      <div className="fs-paper relative max-h-[92vh] w-full overflow-y-auto rounded-t-[16px] bg-[#FDFBF7] px-6 pb-8 pt-6 sm:max-w-md sm:rounded-[12px] sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label={FORM.sluiten}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-[8px] text-[#57514A] transition-colors hover:bg-[#F5F3EC] hover:text-[#1A2D63]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {status === "done" ? (
          <div className="py-4">
            <h2 id="gesprek-titel" className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#1A2D63]">
              {FORM.klaarTitel}
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-[1.6] text-[#57514A]">{FORM.klaar}</p>
            <button type="button" onClick={onClose} className="fs-btn fs-btn--secondary fs-btn--md mt-6">
              {FORM.sluiten}
            </button>
          </div>
        ) : (
          <>
            <h2 id="gesprek-titel" className="pr-8 text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-[#1A2D63]">
              {FORM.titel}
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-[1.55] text-[#57514A]">{FORM.intro}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Veld label={FORM.velden.naam} name="naam" autoComplete="name" required inputRef={firstField} />
              <Veld label={FORM.velden.zaak} name="zaak" autoComplete="organization" required />
              <Veld label={FORM.velden.email} name="email" type="email" autoComplete="email" required />
              <Veld label={FORM.velden.telefoon} name="telefoon" type="tel" autoComplete="tel" required />
              <div>
                <label htmlFor="gesprek-vraag" className="mb-1.5 block text-[0.875rem] font-medium text-[#57514A]">
                  {FORM.velden.vraag}
                </label>
                <textarea id="gesprek-vraag" name="vraag" rows={3} className="fs-input resize-none" />
              </div>

              {status === "error" && (
                <p className="rounded-[8px] bg-[#F5F3EC] px-4 py-3 text-[0.9375rem] text-[#2A2620]">
                  <strong className="font-semibold">{FORM.fout}</strong>{" "}
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="fs-link">
                    {WHATSAPP_NUMBER}
                  </a>
                </p>
              )}

              <button type="submit" disabled={status === "sending"} className="fs-btn fs-btn--primary fs-btn--lg w-full">
                {status === "sending" ? FORM.bezig : FORM.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Veld({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  inputRef,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}) {
  const id = `gesprek-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.875rem] font-medium text-[#57514A]">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="fs-input"
      />
    </div>
  );
}
