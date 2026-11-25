"use client";

/**
 * Het formulier op /cursus/, vraag per vraag: dezelfde opbouw en stijl als het
 * formulier van de hub (components/hub/stap-formulier.tsx), met eigen vragen en
 * een eigen bestemming. Bewust een aparte component, zodat de hub en de cursus
 * elk hun eigen vragen kunnen krijgen zonder elkaar te raken.
 *
 * Laatste stap: naam, e-mail, telefoon en website zijn alle vier verplicht
 * (Alex, 25/11). We controleren zelf (geen browserballonnen): bij versturen met
 * een fout staat de melding onder het veld en springt de cursor naar het eerste
 * foute veld. De server doet dezelfde controle.
 *
 * Verstuurt naar /api/cursus-aanvraag: een item in Tuesday (Leads › Socials,
 * groep "Cursus (Skool)", met dezelfde velden als de hubleads) en een mail naar contact@.
 */

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { EMAIL_RE, telefoonOk } from "@/lib/contact-velden";
import { websiteOk } from "@/lib/cursus-aanvraag";
import { CONTACT_EMAIL } from "@/lib/finit-links";
import { kijkProcent, kijkbeurtVoorFormulier } from "@/components/hub/kijkmeting";
import { vetStukken } from "@/components/hub/copy";
import { CURSUS } from "./copy";

const SUBMIT_URL = "/api/cursus-aanvraag";
const TIMEOUT_MS = 10000;
const LETTERS = "ABCDEFGH";
const F = CURSUS.formulier;
const VRAGEN = F.vragen;

const VELD =
  "w-full rounded-xl border border-[#1A2D63]/15 bg-white px-4 py-3 text-[1rem] text-[#1A2D63] placeholder:text-[#6C7590]/60 transition focus:border-[#1A2D63]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15";
const LABEL = "mb-1.5 block text-[0.875rem] font-medium text-[#1A2D63]";
const VELD_FOUT = "border-red-400 focus:border-red-500 focus:ring-red-200";

type Status = "bezig" | "klaar" | "fout" | null;
type Veld = "naam" | "email" | "telefoon" | "website";
type Gegevens = Record<Veld, string>;
const VELDEN: Veld[] = ["naam", "email", "telefoon", "website"];

/** De meldingen voor de verplichte velden; leeg = alles in orde. */
function controleer(g: Gegevens): Partial<Record<Veld, string>> {
  const m = F.meldingen;
  const fouten: Partial<Record<Veld, string>> = {};
  if (g.naam.trim().length < 2) fouten.naam = m.naam;
  if (!g.email.trim()) fouten.email = m.emailLeeg;
  else if (!EMAIL_RE.test(g.email.trim())) fouten.email = m.email;
  if (!g.telefoon.trim()) fouten.telefoon = m.telefoonLeeg;
  else if (!telefoonOk(g.telefoon)) fouten.telefoon = m.telefoon;
  if (!g.website.trim()) fouten.website = m.websiteLeeg;
  else if (!websiteOk(g.website)) fouten.website = m.website;
  return fouten;
}

function Vraag({ zin, id }: { zin: string; id?: string }) {
  return (
    <h3 id={id} className="text-balance text-[1.3rem] leading-[1.3] text-[#1A2D63] sm:text-[1.55rem]">
      {vetStukken(zin).map((s, i) => (
        <span key={i} className={s.vet ? "font-semibold" : "font-normal"}>
          {s.tekst}
        </span>
      ))}
    </h3>
  );
}

export function CursusFormulier({ meta = {}, kopId }: { meta?: Record<string, string>; kopId?: string }) {
  const id = useId();
  const [stap, setStap] = useState(0);
  const [antwoorden, setAntwoorden] = useState<Record<string, string>>({});
  const [gegevens, setGegevens] = useState<Gegevens>({ naam: "", email: "", telefoon: "", website: "" });
  const [honing, setHoning] = useState(""); // honeypot: blijft leeg bij mensen
  const [status, setStatus] = useState<Status>(null);
  // Pas na de eerste poging tot versturen tonen we meldingen; daarna lopen ze mee met wat je typt.
  const [geprobeerd, setGeprobeerd] = useState(false);
  const gemeld = useRef(false);
  const kader = useRef<HTMLDivElement>(null);
  const bezigRef = useRef(false);

  const vraag = VRAGEN[stap];
  const laatste = stap === VRAGEN.length - 1;
  const zet = (veld: Veld) => (v: string) => setGegevens((g) => ({ ...g, [veld]: v }));

  const naarStap = (n: number) => {
    setStap(n);
    pushEvent("cursus_form_stap", { ...meta, stap: String(n + 1) });
    // Op een gsm de vraag weer bovenaan zetten als ze uit beeld zou vallen.
    const top = kader.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) kader.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const kies = (optie: string) => {
    if (!gemeld.current) {
      gemeld.current = true;
      pushEvent("form_start", { ...meta, location: "cursus" });
    }
    setAntwoorden((a) => ({ ...a, [vraag.id]: optie }));
    // Even tonen wat je koos, dan door.
    window.setTimeout(() => naarStap(stap + 1), 220);
  };

  // A, B, C … op het toetsenbord kiest een optie (niet als je in een veld typt).
  useEffect(() => {
    if (vraag.soort !== "keuze" || status === "klaar") return;
    const opties = vraag.opties ?? [];
    const opToets = (e: KeyboardEvent) => {
      const doel = e.target as HTMLElement | null;
      if (doel && /^(INPUT|TEXTAREA|SELECT)$/.test(doel.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const r = kader.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      const i = LETTERS.indexOf(e.key.toUpperCase());
      if (i >= 0 && i < opties.length) {
        e.preventDefault();
        kies(opties[i]);
      }
    };
    window.addEventListener("keydown", opToets);
    return () => window.removeEventListener("keydown", opToets);
  });

  const fouten = geprobeerd ? controleer(gegevens) : {};

  const verstuur = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!laatste) {
      naarStap(stap + 1);
      return;
    }
    const nuFout = controleer(gegevens);
    const eerste = VELDEN.find((v) => nuFout[v]);
    if (eerste) {
      setGeprobeerd(true);
      const veld = document.getElementById(`${id}-${eerste}`);
      veld?.focus({ preventScroll: true });
      veld?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // Geen dubbele aanvragen bij een dubbelklik.
    if (bezigRef.current) return;
    bezigRef.current = true;
    setStatus("bezig");
    const kijk = kijkbeurtVoorFormulier();
    const procent = kijkProcent();
    const cursus = {
      kanaal: meta.bron ?? "direct",
      reel: meta.reel ?? "",
      vsl_procent: procent ?? 0,
      vsl_tekst: procent === null ? F.vslNiet : F.vslGekeken.replace("{procent}", String(procent)),
      rol: antwoorden.rol ?? "",
      grootte: antwoorden.grootte ?? "",
      ai: antwoorden.ai ?? "",
      eerst: (antwoorden.bericht ?? "").trim(),
      pagina: window.location.href,
      kijkbeurt: kijk ? { id: kijk.id, dag: kijk.dag } : null,
    };
    pushEvent("form_submit", { ...meta, location: "cursus" });
    const timer = new AbortController();
    const timeout = setTimeout(() => timer.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: timer.signal,
        body: JSON.stringify({
          naam: gegevens.naam.trim(),
          email: gegevens.email.trim(),
          telefoonnummer: gegevens.telefoon.trim(),
          bedrijfswebsite: gegevens.website.trim(),
          website: honing,
          cursus,
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus("klaar");
      pushEvent("form_submitted", { ...meta, location: "cursus" });
    } catch {
      setStatus("fout");
    } finally {
      clearTimeout(timeout);
      bezigRef.current = false;
    }
  };

  if (status === "klaar") {
    const voornaam = gegevens.naam.trim().split(/\s+/)[0];
    return (
      <div ref={kader} role="status" className="hp-card scroll-mt-6 px-6 py-12 text-center sm:px-12 sm:py-16">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6ECF9]" aria-hidden="true">
          <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none">
            <path d="M12 25 L20 33 L36 15" stroke="#1A2D63" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="hp-display hp-display-sm mx-auto mt-5 max-w-[30rem] text-balance text-[1.4rem] font-semibold leading-[1.25] text-[#1A2D63]">
          {F.bedankt.replace("{naam}", voornaam ? `, ${voornaam}` : "")}
        </p>
        <p className="mt-3 text-[1rem] text-[#3D4766]">{F.bedanktSub}</p>
      </div>
    );
  }

  return (
    <div ref={kader} className="hp-card scroll-mt-6 overflow-hidden">
      <div className="px-5 pt-6 sm:px-8 sm:pt-8">
        <h2 id={kopId} className="hp-display hp-display-sm text-[1.45rem] font-semibold leading-[1.2] text-[#1A2D63] sm:text-[1.875rem]">
          {F.titel}
        </h2>
        <p className="mt-1.5 text-[1rem] leading-[1.5] text-[#3D4766] sm:mt-2 sm:text-[1.1875rem]">{F.uitleg}</p>
      </div>

      {/* Streepjes: één per vraag, de huidige en de vorige gekleurd. */}
      <div className="flex gap-1.5 px-5 pt-5 sm:px-8 sm:pt-6" aria-hidden="true">
        {VRAGEN.map((v, i) => (
          <span key={v.id} className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E3E7EF]">
            <span className={`block h-full rounded-full bg-[#1A2D63] transition-transform duration-300 ease-out origin-left ${i <= stap ? "scale-x-100" : "scale-x-0"}`} />
          </span>
        ))}
      </div>

      {/* Op de gegevensstap controleren we zelf (noValidate), op de andere stappen doet de browser het. */}
      <form onSubmit={verstuur} noValidate={vraag.soort === "gegevens"} className="px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6" aria-labelledby={`${id}-vraag`}>
        <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[0.875rem] text-[#6C7590]">
          {stap > 0 ? (
            <button
              type="button"
              onClick={() => naarStap(stap - 1)}
              className="-ml-2 inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-full px-2 font-medium text-[#1A2D63] transition-colors hover:bg-[#F5F7FB]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {F.terug}
            </button>
          ) : (
            <span />
          )}
          <span className="font-semibold text-[#1A2D63]">{F.stapVan.replace("{nu}", String(stap + 1)).replace("{totaal}", String(VRAGEN.length))}</span>
        </div>

        <div key={stap} className="hub-stap-in mt-3">
          <Vraag zin={vraag.vraag} id={`${id}-vraag`} />

          {vraag.soort === "keuze" && (
            <div className="mt-5 grid gap-2.5" role="group" aria-labelledby={`${id}-vraag`}>
              {(vraag.opties ?? []).map((optie, i) => {
                const gekozen = antwoorden[vraag.id] === optie;
                return (
                  <button
                    key={optie}
                    type="button"
                    onClick={() => kies(optie)}
                    aria-pressed={gekozen}
                    className="hp-keuze flex min-h-[3.25rem] w-full items-center gap-3 rounded-xl border border-[#1A2D63]/15 bg-white px-3 py-2.5 text-left text-[1rem] text-[#1A2D63] sm:max-w-[30rem]"
                  >
                    <span
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-md border text-[0.8125rem] font-semibold ${
                        gekozen ? "border-[#1A2D63] bg-[#1A2D63] text-white" : "border-[#1A2D63]/20 bg-[#F5F7FB] text-[#1A2D63]"
                      }`}
                      aria-hidden="true"
                    >
                      {LETTERS[i]}
                    </span>
                    {optie}
                  </button>
                );
              })}
            </div>
          )}

          {vraag.soort === "tekst" && (
            <div className="mt-5">
              <label htmlFor={`${id}-bericht`} className="mb-2 block text-[0.9375rem] text-[#6C7590]">
                {vraag.hint}
              </label>
              <textarea
                id={`${id}-bericht`}
                required
                rows={3}
                autoFocus
                value={antwoorden.bericht ?? ""}
                onChange={(e) => setAntwoorden((a) => ({ ...a, bericht: e.target.value }))}
                placeholder={vraag.placeholder}
                className={`${VELD} resize-y`}
              />
            </div>
          )}

          {vraag.soort === "gegevens" && (
            <>
              {vraag.sub && <p className="mt-2 text-[1rem] leading-[1.55] text-[#3D4766]">{vraag.sub}</p>}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Invoer id={`${id}-naam`} label={F.velden.naam} type="text" autoComplete="name" waarde={gegevens.naam} zet={zet("naam")} fout={fouten.naam} />
                <Invoer id={`${id}-email`} label={F.velden.email} type="email" autoComplete="email" waarde={gegevens.email} zet={zet("email")} fout={fouten.email} />
                <Invoer id={`${id}-telefoon`} label={F.velden.telefoon} type="tel" autoComplete="tel" waarde={gegevens.telefoon} zet={zet("telefoon")} fout={fouten.telefoon} />
                {/* Tekst in plaats van type="url": zo mag "jouwbedrijf.be" zonder https:// ervoor. */}
                <Invoer
                  id={`${id}-website`}
                  label={F.velden.website}
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder={F.velden.websiteHint}
                  waarde={gegevens.website}
                  zet={zet("website")}
                  fout={fouten.website}
                />
              </div>
              {/* Honeypot: voor mensen onzichtbaar, bots vullen het in. */}
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor={`${id}-honing`}>Website</label>
                <input id={`${id}-honing`} type="text" tabIndex={-1} autoComplete="off" value={honing} onChange={(e) => setHoning(e.target.value)} />
              </div>
            </>
          )}
        </div>

        {status === "fout" && (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-[0.9375rem] text-red-700">
            {F.fout.replace("{email}", CONTACT_EMAIL)}
          </p>
        )}

        {vraag.soort !== "keuze" && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={status === "bezig"} className="hp-btn hp-btn--primary hp-btn--lg w-full sm:w-auto">
              {laatste ? (status === "bezig" ? F.bezig : F.verstuur) : F.volgende}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            {laatste && (
              <p className="text-[0.8125rem] text-[#6C7590]">
                {F.privacy}{" "}
                <a href="/privacy/" className="hp-link">{F.privacyLink}</a>
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

/** Een verplicht veld met zijn melding eronder (alleen zichtbaar als er iets niet klopt). */
function Invoer({
  id,
  label,
  type,
  autoComplete,
  waarde,
  zet,
  fout,
  inputMode,
  placeholder,
}: {
  id: string;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  waarde: string;
  zet: (v: string) => void;
  fout?: string;
  inputMode?: "url";
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={waarde}
        onChange={(e) => zet(e.target.value)}
        aria-invalid={fout ? true : undefined}
        aria-describedby={fout ? `${id}-fout` : undefined}
        className={`${VELD} ${fout ? VELD_FOUT : ""}`}
      />
      {fout && (
        <p id={`${id}-fout`} className="mt-1.5 text-[0.8125rem] leading-[1.4] text-red-700">
          {fout}
        </p>
      )}
    </div>
  );
}
