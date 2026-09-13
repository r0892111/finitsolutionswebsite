"use client";

/**
 * Het korte vraagformulier op de contactkaart (naast de FAQ op de homepage, en
 * op /contact): naam, e-mail, telefoonnummer (optioneel) en de vraag. Lager op
 * de drempel dan een gesprek inplannen. Gaat naar de Netlify Function
 * (/api/contact-submit) met het veld `bericht` erbij, en toont de bevestiging
 * ter plekke in plaats van naar /bedankt te gaan.
 */

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/finit-links";
import { VRAAG } from "./copy";

const SUBMIT_URL = "/api/contact-submit";
const TIMEOUT_MS = 10000;

const VELD =
  "w-full rounded-xl border border-[#1A2D63]/15 bg-white px-4 py-3 text-[0.9375rem] text-[#1A2D63] placeholder:text-[#6C7590]/60 transition focus:border-[#1A2D63]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15";
const LABEL = "mb-1.5 block text-[0.8125rem] font-medium text-[#1A2D63]";

type Status = "leeg" | "bezig" | "klaar" | "fout";

export function VraagFormulier({
  metTelefoon = false,
  bron = "https://finitsolutions.be/#contact",
  location = "vraag",
}: {
  /** Ook een (optioneel) telefoonnummer vragen. */
  metTelefoon?: boolean;
  /** De pagina die in de mail komt te staan. */
  bron?: string;
  /** Voor de analytics. */
  location?: string;
}) {
  const id = useId();
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoonnummer, setTelefoonnummer] = useState("");
  const [bericht, setBericht] = useState("");
  const [website, setWebsite] = useState(""); // honeypot: onzichtbaar, blijft leeg bij mensen
  const [status, setStatus] = useState<Status>("leeg");

  const verstuur = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("bezig");
    pushEvent("form_submit", { location });

    const timer = new AbortController();
    const timeout = setTimeout(() => timer.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: timer.signal,
        body: JSON.stringify({ naam, email, telefoonnummer: metTelefoon ? telefoonnummer : "", bericht, website, bron }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus("klaar");
      pushEvent("form_submitted", { location });
    } catch {
      setStatus("fout");
    } finally {
      clearTimeout(timeout);
    }
  };

  if (status === "klaar") {
    return (
      <div role="status" className="flex h-full flex-col justify-center py-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6ECF9]" aria-hidden="true">
          <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none">
            <path d="M12 25 L20 33 L36 15" stroke="#1A2D63" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="hp-display hp-display-sm mt-5 text-[1.3rem] font-semibold leading-[1.2] text-[#1A2D63]">{VRAAG.bedankt}</p>
        <p className="mt-2 text-[0.9375rem] text-[#3D4766]">{VRAAG.bedanktSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={verstuur} className="flex h-full flex-col">
      <h3 className="hp-display hp-display-sm text-[1.3rem] font-semibold leading-[1.2] text-[#1A2D63]">{VRAAG.titel}</h3>
      <p className="mt-2 text-[0.9375rem] leading-[1.55] text-[#3D4766]">{VRAAG.sub}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <label htmlFor={`${id}-naam`} className={LABEL}>{VRAAG.naam}</label>
          <input id={`${id}-naam`} type="text" required autoComplete="name" value={naam} onChange={(e) => setNaam(e.target.value)} className={VELD} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={LABEL}>{VRAAG.email}</label>
          <input id={`${id}-email`} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={VELD} />
        </div>
        {metTelefoon && (
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <label htmlFor={`${id}-telefoon`} className={LABEL}>{VRAAG.telefoon}</label>
            <input id={`${id}-telefoon`} type="tel" autoComplete="tel" value={telefoonnummer} onChange={(e) => setTelefoonnummer(e.target.value)} className={VELD} />
          </div>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor={`${id}-bericht`} className={LABEL}>{VRAAG.bericht}</label>
        <textarea id={`${id}-bericht`} required rows={3} value={bericht} onChange={(e) => setBericht(e.target.value)} placeholder={VRAAG.berichtHint} className={`${VELD} resize-y`} />
      </div>

      {/* Honeypot: voor mensen onzichtbaar en niet te bereiken, bots vullen het in. */}
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {status === "fout" && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[0.875rem] text-red-700">
          {VRAAG.fout.replace("{email}", CONTACT_EMAIL)}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "bezig"} className="hp-btn hp-btn--primary hp-btn--md w-full sm:w-auto">
          {status === "bezig" ? VRAAG.bezig : VRAAG.knop}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="text-[0.8125rem] text-[#6C7590]">{VRAAG.privacy}</p>
      </div>
    </form>
  );
}
