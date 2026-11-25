"use client";

/**
 * Het formulier onderaan de homepage: een gratis startgesprek aanvragen.
 *
 * Gaat naar dezelfde Netlify Function als de andere formulieren
 * (/api/contact-submit: eerst een item op monday, dan de mail via Brevo), met
 * dezelfde velden als het vraagformulier op /contact. `website` is de honeypot
 * tegen bots; `bedrijfswebsite` is de echte website.
 *
 * Naam, e-mail, telefoon en website zijn verplicht (Alex, 25/11: zo op elk
 * formulier van de site, behalve dat van de gratis resources). Alleen de vraag
 * is optioneel. De server controleert hetzelfde (lib/contact-velden.ts).
 */

import { useId, useState } from "react";
import { pushEvent } from "@/lib/analytics";
import { EMAIL_RE, telefoonOk, websiteOk } from "@/lib/contact-velden";
import { CONTACT_EMAIL } from "@/lib/finit-links";
import type { Copy, Taal } from "./copy";

const SUBMIT_URL = "/api/contact-submit";
const TIMEOUT_MS = 10000;

type Status = "leeg" | "bezig" | "klaar" | "fout";

const FOUTEN: Record<Taal, { naam: string; email: string; telefoon: string; website: string; optioneel: string }> = {
  nl: {
    naam: "Vul je naam in.",
    email: "Vul een geldig e-mailadres in, bijvoorbeeld naam@jouwbedrijf.be.",
    telefoon: "Vul een telefoonnummer in waarop we je kunnen bereiken, bijvoorbeeld 0470 12 34 56.",
    website: "Vul de website van je bedrijf in, bijvoorbeeld jouwbedrijf.be.",
    optioneel: "optioneel",
  },
  en: {
    naam: "Enter your name.",
    email: "Enter a valid email address, for example name@yourcompany.be.",
    telefoon: "Enter a phone number we can reach you on, for example 0470 12 34 56.",
    website: "Enter your company website, for example yourcompany.be.",
    optioneel: "optional",
  },
};

export function StartFormulier({ t, taal }: { t: Copy["slot"]["formulier"]; taal: Taal }) {
  const id = useId();
  const f = FOUTEN[taal];
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [bedrijfswebsite, setBedrijfswebsite] = useState("");
  const [bericht, setBericht] = useState("");
  const [website, setWebsite] = useState(""); // honeypot: onzichtbaar, blijft leeg bij mensen
  const [fouten, setFouten] = useState<{ naam?: string; email?: string; telefoon?: string; bedrijfswebsite?: string }>({});
  const [status, setStatus] = useState<Status>("leeg");

  const verstuur = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "bezig") return;
    const nieuw: typeof fouten = {};
    if (naam.trim().length < 2) nieuw.naam = f.naam;
    if (!EMAIL_RE.test(email.trim())) nieuw.email = f.email;
    if (!telefoonOk(telefoon)) nieuw.telefoon = f.telefoon;
    if (!websiteOk(bedrijfswebsite)) nieuw.bedrijfswebsite = f.website;
    setFouten(nieuw);
    const eerste = (["naam", "email", "telefoon", "bedrijfswebsite"] as const).find((k) => nieuw[k]);
    if (eerste) {
      document.getElementById(`${id}-${eerste}`)?.focus();
      return;
    }

    setStatus("bezig");
    pushEvent("form_submit", { location: "home_startgesprek", taal });
    const timer = new AbortController();
    const timeout = setTimeout(() => timer.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: timer.signal,
        body: JSON.stringify({
          naam: naam.trim(),
          email: email.trim(),
          telefoonnummer: telefoon.trim(),
          bedrijfswebsite: bedrijfswebsite.trim(),
          // Zonder bericht behandelt de functie het als de oude popup; met bericht als een vraag.
          bericht: bericht.trim() || (taal === "nl" ? "Wil een gratis startgesprek plannen (formulier op de homepage)." : "Wants to plan a free start call (form on the English homepage)."),
          website,
          bron: `https://finitsolutions.be/${taal === "en" ? "en/" : ""}#startgesprek`,
          pagina: window.location.href,
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus("klaar");
      pushEvent("form_submitted", { location: "home_startgesprek", taal });
    } catch {
      setStatus("fout");
    } finally {
      clearTimeout(timeout);
    }
  };

  if (status === "klaar") {
    return (
      <div role="status" className="nh-form">
        <p className="nh-h3">{t.bedankt}</p>
        <p className="mt-2">{t.bedanktSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={verstuur} noValidate className="nh-form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-naam`} className="nh-label">{t.naam}</label>
          <input id={`${id}-naam`} type="text" autoComplete="name" value={naam} onChange={(e) => setNaam(e.target.value)} className="nh-veld" aria-invalid={!!fouten.naam} aria-describedby={fouten.naam ? `${id}-naam-fout` : undefined} />
          {fouten.naam && <p id={`${id}-naam-fout`} className="nh-fout">{fouten.naam}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="nh-label">{t.email}</label>
          <input id={`${id}-email`} type="email" autoComplete="email" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} className="nh-veld" aria-invalid={!!fouten.email} aria-describedby={fouten.email ? `${id}-email-fout` : undefined} />
          {fouten.email && <p id={`${id}-email-fout`} className="nh-fout">{fouten.email}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-telefoon`} className="nh-label">{t.telefoon}</label>
          <input id={`${id}-telefoon`} type="tel" autoComplete="tel" value={telefoon} onChange={(e) => setTelefoon(e.target.value)} className="nh-veld" aria-invalid={!!fouten.telefoon} aria-describedby={fouten.telefoon ? `${id}-telefoon-fout` : undefined} />
          {fouten.telefoon && <p id={`${id}-telefoon-fout`} className="nh-fout">{fouten.telefoon}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-bedrijfswebsite`} className="nh-label">{t.website}</label>
          {/* Tekst in plaats van type="url": zo mag "jouwbedrijf.be" zonder https:// ervoor. */}
          <input id={`${id}-bedrijfswebsite`} type="text" inputMode="url" autoComplete="url" spellCheck={false} value={bedrijfswebsite} onChange={(e) => setBedrijfswebsite(e.target.value)} className="nh-veld" aria-invalid={!!fouten.bedrijfswebsite} aria-describedby={fouten.bedrijfswebsite ? `${id}-bedrijfswebsite-fout` : undefined} />
          {fouten.bedrijfswebsite && <p id={`${id}-bedrijfswebsite-fout`} className="nh-fout">{fouten.bedrijfswebsite}</p>}
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor={`${id}-bericht`} className="nh-label">
          {t.bericht} <span className="font-normal text-[var(--nh-grijs)]">({f.optioneel})</span>
        </label>
        <textarea id={`${id}-bericht`} rows={3} value={bericht} onChange={(e) => setBericht(e.target.value)} className="nh-veld resize-y" />
      </div>

      {/* Honeypot: voor mensen onzichtbaar en niet te bereiken, bots vullen het in. */}
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {status === "fout" && (
        <p role="alert" className="nh-fout mt-5">
          {t.fout.replace("{email}", CONTACT_EMAIL)}
        </p>
      )}

      <div className="mt-6">
        <button type="submit" disabled={status === "bezig"} className="nh-knop nh-knop--breed">
          {status === "bezig" ? t.bezig : t.knop}
        </button>
      </div>
    </form>
  );
}
