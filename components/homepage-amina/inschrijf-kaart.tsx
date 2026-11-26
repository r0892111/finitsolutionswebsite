"use client";

/**
 * Het inschrijfformulier van Gratis materiaal (Alex 26/11: "eerste scherm iets gelijkaardig" aan
 * een nieuwsbriefformulier, in de stijl van het formulier op de hub).
 *
 * Velden: voornaam (optioneel) en e-mailadres (verplicht). Geen achternaam: die gebruiken we
 * nergens, en we vragen enkel wat we gebruiken. Het vinkje voor de mails staat standaard UIT,
 * zoals bij het slot op de hub (components/hub/slot-formulier.tsx): een vooraf aangevinkt vakje
 * is geen geldige toestemming. Verzending en toegang: lib/hub-toegang.ts, net als het slot.
 */

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { EMAIL_RE } from "@/lib/contact-velden";
import { vraagToegang } from "@/lib/hub-toegang";
import { useHub } from "@/components/hub/taal";
import type { Copy } from "./copy";

// Dezelfde velden als het formulier op de hub (components/hub/stap-formulier.tsx).
const VELD =
  "w-full rounded-xl border border-[#1A2D63]/15 bg-white px-4 py-3 text-[1rem] text-[#1A2D63] placeholder:text-[#6C7590]/60 transition focus:border-[#1A2D63]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15";
const LABEL = "mb-1.5 block text-[0.875rem] font-medium text-[#1A2D63]";
const VELD_FOUT = "border-red-400 focus:border-red-500 focus:ring-red-200";

export function InschrijfKaart({
  tekst: K,
  bron,
  reel,
  meta,
  onOpen,
}: {
  tekst: Copy["gratis"]["kaart"];
  bron: string;
  reel: string;
  /** Gaat mee met het analytics-event (bron, reel, plek). */
  meta: Record<string, string>;
  onOpen: (voornaam: string) => void;
}) {
  const id = useId();
  const S = useHub().slot;
  const [voornaam, setVoornaam] = useState("");
  const [email, setEmail] = useState("");
  const [mails, setMails] = useState(false);
  const [honing, setHoning] = useState(""); // honeypot
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState(false);

  const verstuur = async (e: React.FormEvent) => {
    e.preventDefault();
    const adres = email.trim();
    if (!EMAIL_RE.test(adres)) {
      setFout(true);
      document.getElementById(`${id}-email`)?.focus();
      return;
    }
    setBezig(true);
    setFout(false);
    const naam = voornaam.trim();
    const uitkomst = await vraagToegang({ email: adres, ...(naam ? { voornaam: naam } : {}), mails, bron, reel, plek: meta.plek, website: honing });
    setBezig(false);
    if (uitkomst === "ongeldig") {
      setFout(true);
      return;
    }
    pushEvent("hub_toegang", { ...meta, mails: mails ? "ja" : "nee" });
    onOpen(naam);
  };

  return (
    <div className="hp-card relative overflow-hidden text-left">
      <div className="px-5 pt-6 sm:px-8 sm:pt-8">
        <h2 id={`${id}-titel`} className="hp-display hp-display-sm text-balance text-[1.45rem] font-semibold leading-[1.2] text-[#1A2D63] sm:text-[1.875rem]">
          {K.titel}
        </h2>
        <p className="mt-1.5 text-[1rem] leading-[1.5] text-[#3D4766] sm:mt-2 sm:text-[1.1875rem]">{K.tekst}</p>
      </div>

      <form onSubmit={verstuur} noValidate className="px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6" aria-labelledby={`${id}-titel`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-voornaam`} className={LABEL}>
              {K.voornaam}
            </label>
            <input
              id={`${id}-voornaam`}
              type="text"
              autoComplete="given-name"
              maxLength={60}
              value={voornaam}
              onChange={(e) => setVoornaam(e.target.value)}
              placeholder={K.voornaamHint}
              className={VELD}
            />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={LABEL}>
              {K.email} <span className="text-[#2F55C4]" aria-hidden="true">*</span>
            </label>
            <input
              id={`${id}-email`}
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fout) setFout(false);
              }}
              placeholder={S.emailHint}
              aria-invalid={fout}
              aria-describedby={fout ? `${id}-fout` : undefined}
              className={`${VELD} ${fout ? VELD_FOUT : ""}`}
            />
            {fout && (
              <p id={`${id}-fout`} role="alert" className="mt-1.5 text-[0.875rem] text-red-700">
                {S.fout}
              </p>
            )}
          </div>
        </div>

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

        <button type="submit" disabled={bezig} className="hp-btn hp-btn--primary hp-btn--lg mt-5 w-full">
          {bezig ? S.bezig : K.knop}
          {!bezig && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>

        <p className="mt-4 text-[0.8125rem] leading-[1.55] text-[#6C7590]">
          {S.privacy}{" "}
          <a href="/privacy/" className="hp-link">
            {S.privacyLink}
          </a>
        </p>
      </form>
    </div>
  );
}
