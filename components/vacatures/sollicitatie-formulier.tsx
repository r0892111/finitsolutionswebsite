"use client";

/**
 * Het sollicitatieformulier op /vacatures. Eén formulier voor de drie vacatures:
 * de bezoeker kiest de vacature, en daarna alleen de profielen die ervoor mogen
 * solliciteren (lib/vacatures.ts). Stagiairs en jobstudenten krijgen er twee
 * velden bij: studierichting en studiejaar.
 *
 * Gaat naar /api/sollicitatie-submit (Netlify Function → Brevo → dezelfde inbox
 * als het contactformulier). Het veld `website` is de honeypot tegen bots.
 */

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/finit-links";
import { isStudent, PROFIELEN, vindVacature, VACATURES, type Profiel } from "@/lib/vacatures";
import { VAC } from "./copy";

const SUBMIT_URL = "/api/sollicitatie-submit";
const TIMEOUT_MS = 10000;

const VELD =
  "w-full rounded-xl border border-[#1A2D63]/15 bg-white px-4 py-3 text-[1rem] text-[#1A2D63] placeholder:text-[#6C7590]/60 transition focus:border-[#1A2D63]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15";
const LABEL = "mb-1.5 block text-[0.875rem] font-medium text-[#1A2D63]";
const GROEP = "mb-3 block text-[1rem] font-semibold text-[#1A2D63]";
// Een keuze als knop: de radio zelf is onzichtbaar, het label krijgt de stijl.
const KEUZE =
  "flex cursor-pointer items-center gap-3 rounded-xl border-2 border-[#1A2D63]/12 bg-white px-4 py-3 text-[1rem] font-medium text-[#1A2D63] transition hover:border-[#1A2D63]/35 has-[:checked]:border-[#1A2D63] has-[:checked]:bg-[#E6ECF9] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1A2D63]/30";

type Status = "leeg" | "bezig" | "klaar" | "fout";

export function SollicitatieFormulier({
  vacature,
  kiesVacature,
  bron,
}: {
  vacature: string;
  kiesVacature: (id: string) => void;
  /** De pagina (met ?bron=) die in de mail komt te staan. */
  bron: string;
}) {
  const id = useId();
  const [profiel, setProfiel] = useState<Profiel | "">("");
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [studierichting, setStudierichting] = useState("");
  const [studiejaar, setStudiejaar] = useState("");
  const [motivatie, setMotivatie] = useState("");
  const [toestemming, setToestemming] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot: onzichtbaar, blijft leeg bij mensen
  const [status, setStatus] = useState<Status>("leeg");
  const [kiesEerst, setKiesEerst] = useState(false);

  const gekozen = vindVacature(vacature);
  const profielen = gekozen?.profielen ?? [];
  // Mag het gekozen profiel niet voor deze vacature (of is er maar één keuze), dan past het zich aan.
  const huidigProfiel: Profiel | "" =
    profielen.length === 1 ? profielen[0] : profiel && profielen.includes(profiel) ? profiel : "";
  const student = isStudent(huidigProfiel);

  const verstuur = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gekozen || !huidigProfiel) {
      setKiesEerst(true);
      document.getElementById(`${id}-keuzes`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("bezig");
    pushEvent("form_submit", { location: "vacatures", vacature: gekozen.id, profiel: huidigProfiel });

    const timer = new AbortController();
    const timeout = setTimeout(() => timer.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: timer.signal,
        body: JSON.stringify({
          vacature: gekozen.id,
          profiel: huidigProfiel,
          naam,
          email,
          telefoon,
          studierichting: student ? studierichting : "",
          studiejaar: student ? studiejaar : "",
          motivatie,
          toestemming,
          website,
          bron,
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus("klaar");
      pushEvent("form_submitted", { location: "vacatures", vacature: gekozen.id, profiel: huidigProfiel });
    } catch {
      setStatus("fout");
    } finally {
      clearTimeout(timeout);
    }
  };

  if (status === "klaar") {
    return (
      <div role="status" className="py-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6ECF9]" aria-hidden="true">
          <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none">
            <path d="M12 25 L20 33 L36 15" stroke="#1A2D63" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="hp-display hp-display-sm mt-5 text-[1.5rem] font-semibold leading-[1.2] text-[#1A2D63]">{VAC.form.bedankt}</p>
        <p className="mt-2 text-[1rem] text-[#3D4766]">{VAC.form.bedanktSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={verstuur}>
      <div id={`${id}-keuzes`} className="scroll-mt-6">
        <fieldset>
          <legend className={GROEP}>{VAC.form.vacature}</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {VACATURES.map((v) => (
              <label key={v.id} className={KEUZE}>
                <input
                  type="radio"
                  name={`${id}-vacature`}
                  value={v.id}
                  checked={vacature === v.id}
                  onChange={() => {
                    kiesVacature(v.id);
                    setKiesEerst(false);
                  }}
                  className="sr-only"
                />
                <span className="leading-[1.3]">{v.titel}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {gekozen && (
          <fieldset className="mt-6">
            <legend className={GROEP}>{VAC.form.profiel}</legend>
            <div className="flex flex-wrap gap-3">
              {profielen.map((p) => (
                <label key={p} className={`${KEUZE} py-2.5`}>
                  <input
                    type="radio"
                    name={`${id}-profiel`}
                    value={p}
                    checked={huidigProfiel === p}
                    onChange={() => {
                      setProfiel(p);
                      setKiesEerst(false);
                    }}
                    className="sr-only"
                  />
                  <span>{PROFIELEN[p]}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {kiesEerst && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[0.9375rem] text-red-700">{VAC.form.kiesEerst}</p>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-naam`} className={LABEL}>{VAC.form.naam}</label>
          <input id={`${id}-naam`} type="text" required autoComplete="name" value={naam} onChange={(e) => setNaam(e.target.value)} className={VELD} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={LABEL}>{VAC.form.email}</label>
          <input id={`${id}-email`} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={VELD} />
        </div>
        <div>
          <label htmlFor={`${id}-telefoon`} className={LABEL}>{VAC.form.telefoon}</label>
          <input id={`${id}-telefoon`} type="tel" required autoComplete="tel" value={telefoon} onChange={(e) => setTelefoon(e.target.value)} className={VELD} />
        </div>
        {student && (
          <>
            <div>
              <label htmlFor={`${id}-richting`} className={LABEL}>{VAC.form.studierichting}</label>
              <input id={`${id}-richting`} type="text" required value={studierichting} onChange={(e) => setStudierichting(e.target.value)} placeholder={VAC.form.studierichtingHint} className={VELD} />
            </div>
            <div>
              <label htmlFor={`${id}-jaar`} className={LABEL}>{VAC.form.studiejaar}</label>
              <input id={`${id}-jaar`} type="text" required value={studiejaar} onChange={(e) => setStudiejaar(e.target.value)} placeholder={VAC.form.studiejaarHint} className={VELD} />
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-motivatie`} className={LABEL}>{VAC.form.motivatie}</label>
          <textarea id={`${id}-motivatie`} required rows={5} value={motivatie} onChange={(e) => setMotivatie(e.target.value)} placeholder={VAC.form.motivatieHint} className={`${VELD} resize-y`} />
        </div>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-[1.55] text-[#3D4766]">
        <input type="checkbox" required checked={toestemming} onChange={(e) => setToestemming(e.target.checked)} className="mt-1 h-5 w-5 flex-none cursor-pointer accent-[#1A2D63]" />
        <span>
          {VAC.form.toestemming}{" "}
          <a href="/privacy" target="_blank" rel="noopener" className="font-medium text-[#1A2D63] underline underline-offset-2">{VAC.form.privacyLink}</a>.
        </span>
      </label>

      {/* Honeypot: voor mensen onzichtbaar en niet te bereiken, bots vullen het in. */}
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {status === "fout" && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-[0.9375rem] text-red-700">
          {VAC.form.fout.replace("{email}", CONTACT_EMAIL)}
        </p>
      )}

      <button type="submit" disabled={status === "bezig"} className="hp-btn hp-btn--primary hp-btn--lg mt-6 w-full sm:w-auto">
        {status === "bezig" ? VAC.form.bezig : VAC.form.knop}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
