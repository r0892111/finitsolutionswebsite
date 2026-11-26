"use client";

/**
 * Het e-mailslot: één veld voor je adres en een vinkje voor de mails. Het
 * vinkje staat standaard UIT: een vooraf aangevinkt vakje is geen geldige
 * toestemming (AVG, arrest Planet49, WER art. XII.13). Zonder vinkje dient het
 * adres alleen om het slot te openen.
 *
 * Gebruikt op de hub (onder de resources) en op elke promptpagina (/prompts/…).
 * Na een geldig adres roept het `onOpen` op; de toegang zelf onthoudt
 * lib/hub-toegang.ts.
 */

import { useId, useState } from "react";
import { Lock } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { vraagToegang } from "@/lib/hub-toegang";
import { useHub } from "./taal";

export function SlotFormulier({
  titel,
  tekst,
  bron,
  reel,
  meta,
  onOpen,
  className = "",
}: {
  titel: string;
  tekst: string;
  bron: string;
  reel: string;
  /** Gaat mee met het analytics-event (bron, reel, plek). */
  meta: Record<string, string>;
  onOpen: () => void;
  className?: string;
}) {
  const id = useId();
  const S = useHub().slot;
  const [email, setEmail] = useState("");
  const [mails, setMails] = useState(false);
  const [honing, setHoning] = useState(""); // honeypot
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState(false);

  const verstuur = async (e: React.FormEvent) => {
    e.preventDefault();
    setBezig(true);
    setFout(false);
    const uitkomst = await vraagToegang({ email: email.trim(), mails, bron, reel, website: honing });
    setBezig(false);
    if (uitkomst === "ongeldig") {
      setFout(true);
      return;
    }
    pushEvent("hub_toegang", { ...meta, mails: mails ? "ja" : "nee" });
    onOpen();
  };

  return (
    <form onSubmit={verstuur} className={`hp-card relative p-6 sm:p-8 ${className}`} aria-labelledby={`${id}-titel`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E6ECF9] text-[#1A2D63]" aria-hidden="true">
        <Lock className="h-5 w-5" />
      </span>
      <h3 id={`${id}-titel`} className="hp-display hp-display-sm mt-4 text-[1.4rem] font-semibold leading-[1.2] text-[#1A2D63] sm:text-[1.6rem]">
        {titel}
      </h3>
      <p className="mt-2 text-[1rem] leading-[1.6] text-[#3D4766]">{tekst}</p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">{S.email}</label>
        <input
          id={`${id}-email`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={S.emailHint}
          aria-invalid={fout}
          aria-describedby={fout ? `${id}-fout` : undefined}
          className="min-h-[3.25rem] w-full flex-1 rounded-full border border-[#1A2D63]/20 bg-white px-5 text-[1rem] text-[#1A2D63] placeholder:text-[#6C7590]/60 focus:border-[#1A2D63]/45 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15"
        />
        <button type="submit" disabled={bezig} className="hp-btn hp-btn--primary hp-btn--lg w-full sm:w-auto">
          {bezig ? S.bezig : S.knop}
        </button>
      </div>
      {fout && (
        <p id={`${id}-fout`} role="alert" className="mt-2 text-[0.875rem] text-red-700">{S.fout}</p>
      )}

      {/* Het vinkje voor de mails: optioneel, standaard uit. */}
      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-[#1A2D63]/12 bg-[#F5F7FB] p-3.5 text-[0.9375rem] leading-[1.5] text-[#3D4766] transition-colors hover:border-[#1A2D63]/30">
        <input
          type="checkbox"
          checked={mails}
          onChange={(e) => setMails(e.target.checked)}
          className="mt-[0.2rem] h-[1.1rem] w-[1.1rem] flex-none rounded border-[#1A2D63]/30 accent-[#1A2D63]"
        />
        <span>
          <span className="font-semibold text-[#1A2D63]">{S.mailsKop}</span> {S.mails}
        </span>
      </label>

      {/* Honeypot: voor mensen onzichtbaar, bots vullen het in. */}
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-honing`}>Website</label>
        <input id={`${id}-honing`} type="text" tabIndex={-1} autoComplete="off" value={honing} onChange={(e) => setHoning(e.target.value)} />
      </div>

      <p className="mt-4 text-[0.8125rem] leading-[1.55] text-[#6C7590]">
        {S.privacy}{" "}
        <a href="/privacy/" className="hp-link">{S.privacyLink}</a>
      </p>
    </form>
  );
}
