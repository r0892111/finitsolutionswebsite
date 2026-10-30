"use client";

/**
 * Het sollicitatieformulier op /vacatures. Eén formulier voor de drie vacatures:
 * de bezoeker kiest de vacature, en daarna alleen de profielen die ervoor mogen
 * solliciteren (lib/vacatures.ts). Stagiairs en jobstudenten krijgen er twee
 * velden bij: studierichting en studiejaar.
 *
 * "Vertel ons over jezelf" vraagt wat we willen horen voor de eerste interviewronde,
 * met punten die per vacature verschillen. Bestanden (portfolio, cv) gaan als bijlage
 * mee in de mail, samen maximaal 4 MB (lib/vacatures.ts, BIJLAGEN); grote video's
 * komen via het linkveld.
 *
 * Gaat naar /api/sollicitatie-submit (Netlify Function → Brevo → dezelfde inbox
 * als het contactformulier). Het veld `website` is de honeypot tegen bots.
 */

import { useId, useState } from "react";
import { ArrowRight, Paperclip, UploadCloud, X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { ALEX_INSTAGRAM_URL, ALEX_TIKTOK_URL, CONTACT_EMAIL } from "@/lib/finit-links";
import { BIJLAGEN, extensie, isStudent, PROFIELEN, vindVacature, VACATURES, type Profiel } from "@/lib/vacatures";
import { VAC } from "./copy";

const SUBMIT_URL = "/api/sollicitatie-submit";
const TIMEOUT_MS = 10000;
// Met bijlagen duurt het versturen langer, zeker op een gsm.
const TIMEOUT_MET_BESTANDEN_MS = 45000;

const VELD =
  "w-full rounded-xl border border-[#1A2D63]/15 bg-white px-4 py-3 text-[1rem] text-[#1A2D63] placeholder:text-[#6C7590]/60 transition focus:border-[#1A2D63]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/15";
const LABEL = "mb-1.5 block text-[0.875rem] font-medium text-[#1A2D63]";
const GROEP = "mb-3 block text-[1rem] font-semibold text-[#1A2D63]";
// Een keuze als knop: de radio zelf is onzichtbaar, het label krijgt de stijl.
const KEUZE =
  "flex cursor-pointer items-center gap-3 rounded-xl border-2 border-[#1A2D63]/12 bg-white px-4 py-3 text-[1rem] font-medium text-[#1A2D63] transition hover:border-[#1A2D63]/35 has-[:checked]:border-[#1A2D63] has-[:checked]:bg-[#E6ECF9] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1A2D63]/30";

type Status = "leeg" | "bezig" | "klaar" | "fout";

const LINKS: Record<string, { href: string; label: string }> = {
  "{instagram}": { href: ALEX_INSTAGRAM_URL, label: "Instagram" },
  "{tiktok}": { href: ALEX_TIKTOK_URL, label: "TikTok" },
};

/** Tekst met {instagram} en {tiktok} erin, met die woorden als link. */
function MetLinks({ tekst }: { tekst: string }) {
  return (
    <>
      {tekst.split(/(\{instagram\}|\{tiktok\})/).map((deel, i) => {
        const link = LINKS[deel];
        return link ? (
          <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#1A2D63] underline underline-offset-2">{link.label}</a>
        ) : (
          <span key={i}>{deel}</span>
        );
      })}
    </>
  );
}

function grootte(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} kB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** Een bestand als base64, zonder het "data:...;base64,"-stuk ervoor. */
function leesBase64(bestand: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const lezer = new FileReader();
    lezer.onload = () => resolve(String(lezer.result).split(",")[1] ?? "");
    lezer.onerror = () => reject(lezer.error);
    lezer.readAsDataURL(bestand);
  });
}

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
  const [bestanden, setBestanden] = useState<File[]>([]);
  const [bestandFout, setBestandFout] = useState("");
  const [sleept, setSleept] = useState(false);
  const [link, setLink] = useState("");
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

  const voegToe = (nieuw: FileList | null) => {
    if (!nieuw?.length) return;
    let lijst = [...bestanden];
    let fout = "";
    for (const f of Array.from(nieuw)) {
      if (!BIJLAGEN.extensies.includes(extensie(f.name))) {
        fout = VAC.form.bestanden.verkeerdType.replace("{naam}", f.name);
        continue;
      }
      if (lijst.length >= BIJLAGEN.maxBestanden) {
        fout = VAC.form.bestanden.teVeel;
        break;
      }
      if (lijst.reduce((som, b) => som + b.size, 0) + f.size > BIJLAGEN.maxBytes) {
        fout = VAC.form.bestanden.teGroot;
        continue;
      }
      if (!lijst.some((b) => b.name === f.name && b.size === f.size)) lijst = [...lijst, f];
    }
    setBestanden(lijst);
    setBestandFout(fout);
  };

  const verstuur = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gekozen || !huidigProfiel) {
      setKiesEerst(true);
      document.getElementById(`${id}-keuzes`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("bezig");
    pushEvent("form_submit", { location: "vacatures", vacature: gekozen.id, profiel: huidigProfiel, bijlagen: String(bestanden.length), link: link ? "ja" : "nee" });

    const timer = new AbortController();
    const timeout = setTimeout(() => timer.abort(), bestanden.length ? TIMEOUT_MET_BESTANDEN_MS : TIMEOUT_MS);
    try {
      const bijlagen = await Promise.all(bestanden.map(async (b) => ({ naam: b.name, inhoud: await leesBase64(b) })));
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
          link,
          bijlagen,
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
      </div>

      {/* Vertel ons over jezelf: wat we willen horen, met punten per vacature */}
      <div className="mt-8">
        <label htmlFor={`${id}-motivatie`} className={GROEP}>{VAC.form.vertel.titel}</label>
        <div className="rounded-2xl bg-[#F5F7FB] p-4 sm:p-5">
          <p className="text-[0.9375rem] font-medium text-[#1A2D63]">{VAC.form.vertel.intro}</p>
          <ul className="mt-3 space-y-2">
            {[
              VAC.form.vertel.ervaring,
              ...(gekozen ? VAC.form.vertel.perVacature[gekozen.id] ?? [] : []),
              VAC.form.vertel.portfolio,
              VAC.form.vertel.start,
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[0.9375rem] leading-[1.55] text-[#3D4766]">
                <span className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full bg-[#1A2D63]/50" aria-hidden="true" />
                <span><MetLinks tekst={t} /></span>
              </li>
            ))}
          </ul>
          {!gekozen && <p className="mt-3 text-[0.875rem] italic text-[#6C7590]">{VAC.form.vertel.kiesEerst}</p>}
        </div>
        <textarea id={`${id}-motivatie`} required rows={8} value={motivatie} onChange={(e) => setMotivatie(e.target.value)} placeholder={VAC.form.vertel.hint} className={`${VELD} mt-3 resize-y`} />
      </div>

      {/* Portfolio: bestanden slepen of kiezen, en/of een link */}
      <div className="mt-8">
        <p className={GROEP}>
          {VAC.form.bestanden.titel} <span className="text-[0.875rem] font-normal text-[#6C7590]">({VAC.form.bestanden.nietVerplicht})</span>
        </p>
        <label
          htmlFor={`${id}-bestanden`}
          onDragOver={(e) => {
            e.preventDefault();
            setSleept(true);
          }}
          onDragLeave={() => setSleept(false)}
          onDrop={(e) => {
            e.preventDefault();
            setSleept(false);
            voegToe(e.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-5 py-8 text-center transition ${sleept ? "border-[#1A2D63] bg-[#E6ECF9]" : "border-[#1A2D63]/20 bg-white hover:border-[#1A2D63]/40 hover:bg-[#F5F7FB]"}`}
        >
          <UploadCloud className="h-8 w-8 text-[#1A2D63]/60" aria-hidden="true" />
          <span className="text-[1rem] font-medium text-[#1A2D63]">{VAC.form.bestanden.vak}</span>
          <span className="text-[0.875rem] text-[#6C7590]">{VAC.form.bestanden.regels}</span>
          <input
            id={`${id}-bestanden`}
            type="file"
            multiple
            accept={BIJLAGEN.extensies.map((x) => `.${x}`).join(",")}
            onChange={(e) => {
              voegToe(e.target.files);
              e.target.value = "";
            }}
            className="sr-only"
          />
        </label>

        {bestanden.length > 0 && (
          <ul className="mt-3 space-y-2">
            {bestanden.map((b) => (
              <li key={`${b.name}-${b.size}`} className="flex items-center gap-3 rounded-xl border border-[#1A2D63]/10 bg-white px-4 py-2.5 text-[0.9375rem] text-[#1A2D63]">
                <Paperclip className="h-4 w-4 flex-none text-[#6C7590]" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">{b.name}</span>
                <span className="flex-none text-[0.8125rem] text-[#6C7590]">{grootte(b.size)}</span>
                <button
                  type="button"
                  onClick={() => {
                    setBestanden(bestanden.filter((x) => x !== b));
                    setBestandFout("");
                  }}
                  aria-label={`${VAC.form.bestanden.verwijder}: ${b.name}`}
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[#6C7590] transition hover:bg-[#F5F7FB] hover:text-[#1A2D63]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {bestandFout && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-[0.9375rem] text-red-700">{bestandFout}</p>}

        <label htmlFor={`${id}-link`} className={`${LABEL} mt-5`}>
          {VAC.form.bestanden.link} <span className="font-normal text-[#6C7590]">({VAC.form.bestanden.nietVerplicht})</span>
        </label>
        {/* Tekst in plaats van type="url": zo mag "instagram.com/jouwnaam" zonder https:// ervoor. */}
        <input id={`${id}-link`} type="text" inputMode="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder={VAC.form.bestanden.linkHint} className={VELD} />
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
