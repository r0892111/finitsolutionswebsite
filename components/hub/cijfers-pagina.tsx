"use client";

/**
 * /hub/cijfers/: de eigen kijkmeting van de VSL (zie ./kijkmeting.ts en
 * netlify/functions/vsl-cijfers.ts). Intern, achter een geheime sleutel (Netlify-
 * variabele HUB_CIJFERS_SLEUTEL): intypen, of /hub/cijfers/#sleutel=… (na het hekje,
 * dus nooit naar een server of in een log). Hij gaat in een header naar de functie
 * en blijft alleen in dit tabblad bewaard (sessionStorage). Spoelen kan niet in de
 * speler, dus de verste seconde van een kijkbeurt is meteen hoe lang die kijker bleef.
 *
 * - retentie per seconde (alleen kijkbeurten die vooraan begonnen; hervattingen apart);
 * - kijkbeurten, gemiddelde kijktijd, % tot het einde, verstuurde formulieren;
 * - de vijf vensters van 10 s waar de meeste kijkers afhaken, met wat Alex daar zegt;
 * - filters per periode, bron, apparaat en video. Elke versie van de video (VSL.id: v3, v4 …) heeft
 *   een eigen tijdlijn, dus de cijfers tonen altijd één versie tegelijk, standaard die nu op de hub staat.
 *
 * ?demo=1 toont verzonnen voorbeelddata, zonder sleutel en zonder database.
 */

import { useEffect, useMemo, useState } from "react";
import type { Kijkrij } from "@/lib/vsl-meting-opslag";
import { VSL } from "./video";

type Regel = [number, number, Array<[string, number, number]>];
type Staat = { soort: "laden" } | { soort: "sleutel" } | { soort: "fout"; tekst: string } | { soort: "klaar"; rijen: Kijkrij[]; demo: boolean };

const VENSTER = 10;
const SLEUTEL_OPSLAG = "finit_hub_cijfers_sleutel";
const PERIODES: Array<[string, string]> = [["7", "7 dagen"], ["30", "30 dagen"], ["90", "90 dagen"], ["365", "Een jaar"]];

function mmss(s: number): string {
  const t = Math.max(0, Math.round(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}

function pct(n: number, d: number): string {
  return d ? `${Math.round((100 * n) / d)} %` : "–";
}

/** Verzonnen kijkbeurten voor ?demo=1: afhakers vooraan, een paar dipjes, ±20 % tot het einde. */
function voorbeeld(): Kijkrij[] {
  let zaad = 7;
  const rnd = () => ((zaad = (zaad * 16807) % 2147483647) - 1) / 2147483646;
  const duur = 455.4;
  const bronnen = ["tiktok", "instagram", "instagram", "linkedin", "youtube", "direct"];
  const rijen: Kijkrij[] = [];
  for (let i = 0; i < 420; i++) {
    const r = rnd();
    let verste: number;
    if (r < 0.18) verste = rnd() * 15;
    else if (r < 0.3) verste = 15 + rnd() * 40;
    else if (r < 0.42) verste = 92 + rnd() * 10;
    else if (r < 0.62) verste = 55 + rnd() * 200;
    else if (r < 0.72) verste = 248 + rnd() * 12;
    else if (r < 0.8) verste = 260 + rnd() * 200;
    else verste = duur;
    const hervat = rnd() < 0.05;
    const start = hervat ? Math.min(verste, 30 + rnd() * 150) : 0;
    const einde = verste >= duur - 1;
    const moment = new Date(Date.now() - rnd() * 14 * 864e5).toISOString();
    rijen.push({
      dag: moment.slice(0, 10),
      video: VSL.id,
      start_s: Math.round(start * 10) / 10,
      max_s: Math.round(verste * 10) / 10,
      duur_s: duur,
      bron: bronnen[Math.floor(rnd() * bronnen.length)],
      reel: null,
      apparaat: rnd() < 0.7 ? "gsm" : "desktop",
      kwaliteit: "auto",
      hervat,
      formulier: einde ? rnd() < 0.18 : rnd() < 0.01,
      start: moment,
      laatst: moment,
    });
  }
  return rijen;
}

export function CijfersPagina() {
  const [staat, setStaat] = useState<Staat>({ soort: "laden" });
  const [regels, setRegels] = useState<Regel[]>([]);
  const [bron, setBron] = useState("alle");
  const [apparaat, setApparaat] = useState("alle");
  const [video, setVideo] = useState("");
  const [invoer, setInvoer] = useState("");
  const [sleutel, setSleutel] = useState("");
  const [dagen, setDagen] = useState("30");
  const [wissen, setWissen] = useState<"" | "bezig" | "mislukt">("");

  // De sleutel: uit het hekje van de link of uit dit tabblad.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") === "1") {
      setStaat({ soort: "klaar", rijen: voorbeeld(), demo: true });
      return;
    }
    const uitHekje = new URLSearchParams(window.location.hash.slice(1)).get("sleutel");
    if (uitHekje) history.replaceState(null, "", window.location.pathname + window.location.search);
    let bewaard = "";
    try {
      bewaard = sessionStorage.getItem(SLEUTEL_OPSLAG) ?? "";
    } catch {
      /* geen opslag: dan telkens intypen */
    }
    const s = uitHekje || bewaard;
    if (s) setSleutel(s);
    else setStaat({ soort: "sleutel" });
  }, []);

  // De kijkbeurten van de gekozen periode ophalen (de sleutel in een header, nooit in de link).
  useEffect(() => {
    if (!sleutel) return;
    setStaat({ soort: "laden" });
    fetch(`/api/vsl-cijfers?dagen=${dagen}`, { cache: "no-store", headers: { "x-hub-sleutel": sleutel } })
      .then(async (r) => {
        const j = (await r.json().catch(() => ({}))) as { rijen?: Kijkrij[]; error?: string };
        if (r.ok && j.rijen) {
          try {
            sessionStorage.setItem(SLEUTEL_OPSLAG, sleutel);
          } catch {
            /* idem */
          }
          setStaat({ soort: "klaar", rijen: j.rijen, demo: false });
        } else if (j.error === "verkeerde_sleutel") {
          try {
            sessionStorage.removeItem(SLEUTEL_OPSLAG);
          } catch {
            /* idem */
          }
          setSleutel("");
          setStaat({ soort: "fout", tekst: "Die sleutel klopt niet." });
        } else setStaat({ soort: "fout", tekst: `De cijfers laden niet (${j.error ?? r.status}).` });
      })
      .catch(() => setStaat({ soort: "fout", tekst: "De cijfers laden niet (netwerk)." }));
  }, [sleutel, dagen]);

  // Alles wissen (bv. testdata): zelfde sleutel, DELETE op dezelfde functie.
  const wisAlles = async () => {
    if (!window.confirm("Alle kijkcijfers wissen? Dat kan niet ongedaan gemaakt worden.")) return;
    setWissen("bezig");
    try {
      const r = await fetch("/api/vsl-cijfers", { method: "DELETE", headers: { "x-hub-sleutel": sleutel } });
      if (!r.ok) throw new Error(String(r.status));
      setWissen("");
      setStaat({ soort: "klaar", rijen: [], demo: false });
    } catch {
      setWissen("mislukt");
    }
  };

  const alleRijen = staat.soort === "klaar" ? staat.rijen : [];
  const videos = useMemo(() => Array.from(new Set(alleRijen.map((r) => r.video))), [alleRijen]);
  // Standaard de versie die nu op de hub staat; is die er (nog) niet, de nieuwste in de data.
  const huidigeVideo = video || (videos.includes(VSL.id) ? VSL.id : videos[videos.length - 1]) || "";
  // Ondertitels van die versie, voor "wat Alex daar zegt" bij de afhaakpunten.
  useEffect(() => {
    if (!huidigeVideo) return;
    setRegels([]);
    fetch(huidigeVideo === VSL.id ? "/hub/vsl/ondertitels.json" : `/hub/vsl/ondertitels-${huidigeVideo}.json`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => Array.isArray(d) && setRegels(d as Regel[]))
      .catch(() => undefined);
  }, [huidigeVideo]);
  const bronnen = useMemo(() => Array.from(new Set(alleRijen.map((r) => r.bron))).sort(), [alleRijen]);

  const rijen = useMemo(
    () => alleRijen.filter((r) => r.video === huidigeVideo && (bron === "alle" || r.bron === bron) && (apparaat === "alle" || r.apparaat === apparaat)),
    [alleRijen, huidigeVideo, bron, apparaat]
  );

  const cijfers = useMemo(() => {
    const duur = Math.max(0, ...rijen.map((r) => r.duur_s ?? 0)) || Math.max(1, ...rijen.map((r) => r.max_s));
    const sec = Math.ceil(duur);
    const vers = rijen.filter((r) => !r.hervat && r.start_s < 1);
    // Retentie: hoeveel van de vooraan gestarte kijkbeurten zitten op seconde s nog te kijken.
    const verschil = new Array(sec + 2).fill(0);
    vers.forEach((r) => {
      verschil[0] += 1;
      verschil[Math.min(sec + 1, Math.floor(r.max_s) + 1)] -= 1;
    });
    const retentie: number[] = [];
    let lopend = 0;
    for (let s = 0; s <= sec; s++) {
      lopend += verschil[s];
      retentie.push(vers.length ? lopend / vers.length : 0);
    }
    // Afhaakpunten: de vensters van 10 s met de grootste daling, niet overlappend.
    const vensters = [];
    for (let s = 0; s + VENSTER <= sec; s++) vensters.push({ van: s, tot: s + VENSTER, daling: retentie[s] - retentie[s + VENSTER] });
    vensters.sort((a, b) => b.daling - a.daling);
    const afhaak: typeof vensters = [];
    for (const v of vensters) {
      if (afhaak.length >= 5 || v.daling <= 0) break;
      if (afhaak.every((a) => v.tot <= a.van || v.van >= a.tot)) afhaak.push(v);
    }
    const kijktijd = rijen.length ? rijen.reduce((t, r) => t + Math.max(0, r.max_s - r.start_s), 0) / rijen.length : 0;
    const totEinde = rijen.filter((r) => r.duur_s && r.max_s >= r.duur_s - 3).length;
    const formulier = rijen.filter((r) => r.formulier).length;
    return { duur, retentie, afhaak, kijktijd, totEinde, formulier, vers: vers.length, hervat: rijen.length - vers.length };
  }, [rijen]);

  const zegt = (van: number, tot: number) =>
    regels
      .filter((r) => r[1] >= van && r[0] <= tot)
      .flatMap((r) => r[2].map((w) => w[0]))
      .join(" ")
      .split(" ")
      .slice(0, 22)
      .join(" ");

  return (
    <main className="min-h-screen bg-[#F5F7FB] px-4 py-10 text-[#3D4766] sm:px-8 sm:py-14">
      <div className="mx-auto max-w-[64rem]">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-[#6C7590]">Intern</p>
        <h1 className="hp-display mt-1 text-[2rem] font-bold leading-[1.15] text-[#1A2D63] sm:text-[2.5rem]">Kijkcijfers van de VSL</h1>
        <p className="mt-2 max-w-[44rem] text-[1rem] leading-[1.55]">
          Anoniem gemeten zonder cookies: per kijkbeurt een willekeurig nummer, de verste seconde, het toestel en de bron. Spoelen kan niet, dus de
          verste seconde is hoe lang iemand bleef.
        </p>

        {staat.soort === "laden" && <p className="mt-8">Laden…</p>}
        {staat.soort === "fout" && <p className="mt-8 rounded-xl bg-red-50 px-4 py-3 text-red-700">{staat.tekst}</p>}
        {(staat.soort === "sleutel" || (staat.soort === "fout" && !sleutel)) && (
          <form
            className="mt-8 flex max-w-[28rem] gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (invoer.trim()) setSleutel(invoer.trim());
            }}
          >
            <label htmlFor="sleutel" className="sr-only">Sleutel</label>
            <input id="sleutel" type="password" value={invoer} onChange={(e) => setInvoer(e.target.value)} placeholder="Sleutel" className="w-full rounded-xl border border-[#1A2D63]/15 bg-white px-4 py-2.5 text-[#1A2D63]" />
            <button type="submit" className="hp-btn hp-btn--primary hp-btn--md">Open</button>
          </form>
        )}

        {staat.soort === "klaar" && (
          <>
            {staat.demo && (
              <p className="mt-6 rounded-xl border border-[#2F55C4]/25 bg-[#E6ECF9] px-4 py-3 text-[0.9375rem] text-[#1A2D63]">
                Voorbeelddata (?demo=1): verzonnen kijkbeurten om de pagina te tonen. Geen echte cijfers.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3 text-[0.9375rem]">
              {!staat.demo && <Keuze label="Periode" waarde={dagen} zet={setDagen} opties={PERIODES} />}
              {videos.length > 1 && (
                <Keuze label="Video" waarde={huidigeVideo} zet={setVideo} opties={videos.map((v) => [v, v === VSL.id ? `${v} (nu op de hub)` : v])} />
              )}
              <Keuze label="Bron" waarde={bron} zet={setBron} opties={[["alle", "Alle bronnen"], ...bronnen.map((b) => [b, b] as [string, string])]} />
              <Keuze label="Apparaat" waarde={apparaat} zet={setApparaat} opties={[["alle", "Gsm en desktop"], ["gsm", "Gsm"], ["desktop", "Desktop"]]} />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              <Tegel titel="Kijkbeurten" waarde={String(rijen.length)} sub={cijfers.hervat ? `waarvan ${cijfers.hervat} hervat` : "allemaal vooraan gestart"} />
              <Tegel titel="Gemiddelde kijktijd" waarde={mmss(cijfers.kijktijd)} sub={`van ${mmss(cijfers.duur)}`} />
              <Tegel titel="Tot het einde" waarde={pct(cijfers.totEinde, rijen.length)} sub={`${cijfers.totEinde} kijkbeurten`} />
              <Tegel titel="Formulier verstuurd" waarde={pct(cijfers.formulier, rijen.length)} sub={`${cijfers.formulier} na het kijken`} />
            </div>

            <section className="mt-6 rounded-2xl border border-[#E3E7EF] bg-white p-5 sm:p-6">
              <h2 className="text-[1.125rem] font-semibold text-[#1A2D63]">Retentie per seconde</h2>
              <p className="mt-1 text-[0.875rem] text-[#6C7590]">Welk deel van de {cijfers.vers} vooraan gestarte kijkbeurten op elk moment nog kijkt.</p>
              <Grafiek retentie={cijfers.retentie} duur={cijfers.duur} afhaak={cijfers.afhaak} />
            </section>

            <section className="mt-6 rounded-2xl border border-[#E3E7EF] bg-white p-5 sm:p-6">
              <h2 className="text-[1.125rem] font-semibold text-[#1A2D63]">Waar haken de meeste kijkers af?</h2>
              {cijfers.afhaak.length === 0 ? (
                <p className="mt-2 text-[0.9375rem]">Nog te weinig kijkbeurten.</p>
              ) : (
                <ol className="mt-3 grid gap-3">
                  {cijfers.afhaak.map((a) => (
                    <li key={a.van} className="grid gap-1 rounded-xl bg-[#F5F7FB] px-4 py-3 sm:grid-cols-[9rem_6rem_1fr] sm:items-baseline sm:gap-4">
                      <span className="font-semibold text-[#1A2D63]">
                        {mmss(a.van)} tot {mmss(a.tot)}
                      </span>
                      <span className="font-semibold text-[#2F55C4]">−{Math.round(a.daling * 100)} % kijkers</span>
                      <span className="text-[0.9375rem] italic text-[#3D4766]">{zegt(a.van, a.tot) ? `“${zegt(a.van, a.tot)}…”` : ""}</span>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            {!staat.demo && (
              <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.875rem]">
                <button
                  type="button"
                  onClick={wisAlles}
                  disabled={wissen === "bezig"}
                  className="rounded-xl border border-[#1A2D63]/20 bg-white px-4 py-2 font-semibold text-[#1A2D63] hover:bg-[#E6ECF9] disabled:opacity-50"
                >
                  {wissen === "bezig" ? "Bezig met wissen…" : "Alle kijkcijfers wissen"}
                </button>
                <span className="text-[#6C7590]">
                  {wissen === "mislukt" ? "Wissen lukte niet. Probeer opnieuw." : "Bijvoorbeeld na testen. Kan niet ongedaan gemaakt worden."}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function Keuze({ label, waarde, zet, opties }: { label: string; waarde: string; zet: (v: string) => void; opties: Array<[string, string]> }) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-[#6C7590]">{label}</span>
      <select value={waarde} onChange={(e) => zet(e.target.value)} className="rounded-lg border border-[#1A2D63]/15 bg-white px-3 py-1.5 text-[#1A2D63]">
        {opties.map(([w, t]) => (
          <option key={w} value={w}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}

function Tegel({ titel, waarde, sub }: { titel: string; waarde: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-[#E3E7EF] bg-white px-5 py-4">
      <p className="text-[0.8125rem] text-[#6C7590]">{titel}</p>
      <p className="hp-display mt-1 text-[1.75rem] font-bold leading-none text-[#1A2D63]">{waarde}</p>
      <p className="mt-1.5 text-[0.8125rem] text-[#6C7590]">{sub}</p>
    </div>
  );
}

/** Lijngrafiek zonder bibliotheek: retentie (0-100 %) tegen de tijd, afhaakpunten gemarkeerd. */
function Grafiek({ retentie, duur, afhaak }: { retentie: number[]; duur: number; afhaak: Array<{ van: number; tot: number }> }) {
  const B = 640;
  const H = 220;
  const L = 36;
  const O = 24;
  const x = (s: number) => L + (s / Math.max(1, duur)) * (B - L - 8);
  const y = (v: number) => 8 + (1 - v) * (H - O - 8);
  const pad = retentie.map((v, s) => `${s === 0 ? "M" : "L"}${x(s).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const minuten = Array.from({ length: Math.floor(duur / 60) + 1 }, (_, m) => m * 60);
  return (
    <svg viewBox={`0 0 ${B} ${H}`} className="mt-4 h-auto w-full" role="img" aria-label="Retentie per seconde">
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <g key={v}>
          <line x1={L} x2={B - 8} y1={y(v)} y2={y(v)} stroke="#E3E7EF" />
          <text x={L - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#6C7590">{Math.round(v * 100)}%</text>
        </g>
      ))}
      {minuten.map((s) => (
        <text key={s} x={x(s)} y={H - 6} textAnchor="middle" fontSize="10" fill="#6C7590">{mmss(s)}</text>
      ))}
      {afhaak.map((a) => (
        <rect key={a.van} x={x(a.van)} y={8} width={Math.max(2, x(a.tot) - x(a.van))} height={H - O - 8} fill="#2F55C4" opacity="0.1" />
      ))}
      {retentie.length > 1 && <path d={`${pad}L${x(retentie.length - 1)},${y(0)}L${x(0)},${y(0)}Z`} fill="#1A2D63" opacity="0.08" />}
      {retentie.length > 1 && <path d={pad} fill="none" stroke="#1A2D63" strokeWidth="2" />}
    </svg>
  );
}
