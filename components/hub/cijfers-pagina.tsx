"use client";

/**
 * /hub/cijfers/: de eigen kijkmeting van de VSL (zie ./kijkmeting.ts en
 * netlify/functions/vsl-cijfers.ts). Intern, achter ?sleutel=… (Netlify-variabele
 * HUB_CIJFERS_SLEUTEL). Spoelen kan niet in de speler, dus de verste seconde van
 * een kijkbeurt is meteen hoe lang die kijker bleef.
 *
 * - retentie per seconde (alleen kijkbeurten die vooraan begonnen; hervattingen apart);
 * - kijkbeurten, gemiddelde kijktijd, % tot het einde, verstuurde formulieren;
 * - de vijf vensters van 10 s waar de meeste kijkers afhaken, met wat Alex daar zegt;
 * - filters per bron, apparaat en video.
 *
 * ?demo=1 toont verzonnen voorbeelddata, zonder sleutel en zonder database.
 */

import { useEffect, useMemo, useState } from "react";
import type { Kijkrij } from "@/lib/vsl-meting-db";

type Regel = [number, number, Array<[string, number, number]>];
type Staat = { soort: "laden" } | { soort: "sleutel" } | { soort: "fout"; tekst: string } | { soort: "klaar"; rijen: Kijkrij[]; demo: boolean };

const VENSTER = 10;

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
  const duur = 463.8;
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
    rijen.push({
      gestart_op: new Date(Date.now() - rnd() * 14 * 864e5).toISOString(),
      video: "v3",
      start_seconde: Math.round(start * 10) / 10,
      verste_seconde: Math.round(verste * 10) / 10,
      duur,
      bron: bronnen[Math.floor(rnd() * bronnen.length)],
      reel: null,
      apparaat: rnd() < 0.7 ? "gsm" : "desktop",
      kwaliteit: "auto",
      hervat,
      formulier_verstuurd: einde ? rnd() < 0.18 : rnd() < 0.01,
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

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    fetch("/hub/vsl/ondertitels.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => Array.isArray(d) && setRegels(d as Regel[]))
      .catch(() => undefined);
    if (p.get("demo") === "1") {
      setStaat({ soort: "klaar", rijen: voorbeeld(), demo: true });
      return;
    }
    const sleutel = p.get("sleutel");
    if (!sleutel) {
      setStaat({ soort: "sleutel" });
      return;
    }
    fetch(`/api/vsl-cijfers?sleutel=${encodeURIComponent(sleutel)}`, { cache: "no-store" })
      .then(async (r) => {
        const j = (await r.json().catch(() => ({}))) as { rijen?: Kijkrij[]; error?: string };
        if (r.ok && j.rijen) setStaat({ soort: "klaar", rijen: j.rijen, demo: false });
        else setStaat({ soort: "fout", tekst: j.error === "verkeerde_sleutel" ? "Die sleutel klopt niet." : `De cijfers laden niet (${j.error ?? r.status}).` });
      })
      .catch(() => setStaat({ soort: "fout", tekst: "De cijfers laden niet (netwerk)." }));
  }, []);

  const alleRijen = staat.soort === "klaar" ? staat.rijen : [];
  const videos = useMemo(() => Array.from(new Set(alleRijen.map((r) => r.video))), [alleRijen]);
  const huidigeVideo = video || videos[0] || "";
  const bronnen = useMemo(() => Array.from(new Set(alleRijen.map((r) => r.bron))).sort(), [alleRijen]);

  const rijen = useMemo(
    () => alleRijen.filter((r) => r.video === huidigeVideo && (bron === "alle" || r.bron === bron) && (apparaat === "alle" || r.apparaat === apparaat)),
    [alleRijen, huidigeVideo, bron, apparaat]
  );

  const cijfers = useMemo(() => {
    const duur = Math.max(0, ...rijen.map((r) => r.duur ?? 0)) || Math.max(1, ...rijen.map((r) => r.verste_seconde));
    const sec = Math.ceil(duur);
    const vers = rijen.filter((r) => !r.hervat && r.start_seconde < 1);
    // Retentie: hoeveel van de vooraan gestarte kijkbeurten zitten op seconde s nog te kijken.
    const verschil = new Array(sec + 2).fill(0);
    vers.forEach((r) => {
      verschil[0] += 1;
      verschil[Math.min(sec + 1, Math.floor(r.verste_seconde) + 1)] -= 1;
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
    const kijktijd = rijen.length ? rijen.reduce((t, r) => t + Math.max(0, r.verste_seconde - r.start_seconde), 0) / rijen.length : 0;
    const totEinde = rijen.filter((r) => r.duur && r.verste_seconde >= r.duur - 3).length;
    const formulier = rijen.filter((r) => r.formulier_verstuurd).length;
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
        {staat.soort === "sleutel" && (
          <form
            className="mt-8 flex max-w-[28rem] gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (invoer.trim()) window.location.search = `?sleutel=${encodeURIComponent(invoer.trim())}`;
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
              {videos.length > 1 && (
                <Keuze label="Video" waarde={huidigeVideo} zet={setVideo} opties={videos.map((v) => [v, v])} />
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
