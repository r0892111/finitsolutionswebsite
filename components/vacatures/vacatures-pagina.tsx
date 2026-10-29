"use client";

/**
 * /vacatures: drie vacatures en één sollicitatieformulier. Zelfde kop en footer
 * als /contact. "Solliciteer" op een kaart kiest die vacature in het formulier
 * en springt ernaartoe; een link als /vacatures/#content doet hetzelfde.
 * `?bron=` (en `?via=hub` vanaf de hub) komt mee in de mail.
 * Tekst in ./copy.ts, de lijst zelf in lib/vacatures.ts.
 */

import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight, Code2, Clapperboard, KanbanSquare } from "lucide-react";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { CONTAINER, H2, LEAD, Onder, Vinkje } from "@/components/home/ui";
import { pushEvent } from "@/lib/analytics";
import { PROFIELEN, VACATURES, vindVacature } from "@/lib/vacatures";
import { VAC } from "./copy";
import { SollicitatieFormulier } from "./sollicitatie-formulier";

const ICOON = { content: Clapperboard, projectmanagement: KanbanSquare, software: Code2 } as const;
const ICOON_KLEUR = {
  content: "bg-[#FBE286] text-[#1A2D63]",
  projectmanagement: "bg-[#E6ECF9] text-[#1A2D63]",
  software: "bg-[#1A2D63] text-white",
} as const;

/** Alleen kleine letters, cijfers, - en _: zo kan er niets vreemds in de mail belanden. */
function schoon(v: string | null, max: number): string {
  return (v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max);
}

function springNaar(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function VacaturesPagina() {
  const [vacature, setVacature] = useState("");
  const [bron, setBron] = useState("https://finitsolutions.be/vacatures/");

  // Herkomst en een eventuele vacature uit de URL, één keer bij het openen.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const b = schoon(p.get("bron"), 40);
    const via = schoon(p.get("via"), 20);
    const query = [b && `bron=${b}`, via && `via=${via}`].filter(Boolean).join("&");
    setBron(`https://finitsolutions.be/vacatures/${query ? `?${query}` : ""}`);
    pushEvent("vacatures_view", { bron: b || "direct", ...(via ? { via } : {}) });
    const uitHash = window.location.hash.slice(1);
    if (vindVacature(uitHash)) setVacature(uitHash);
  }, []);

  const solliciteer = (id: string) => {
    setVacature(id);
    pushEvent("vacature_klik", { vacature: id });
    springNaar("solliciteer");
  };

  return (
    <div className="hp min-h-screen bg-white text-[#3D4766]">
      <SiteHeader location="vacatures" />

      <main>
        <section className={`${CONTAINER} pb-10 pt-10 sm:pb-14 sm:pt-14`}>
          <nav aria-label="Kruimelpad" className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-[#6C7590]">
            <a href="/" className="transition-colors hover:text-[#1A2D63]">Home</a>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-[#1A2D63]">{VAC.kruimel}</span>
          </nav>
          <h1 className={`mt-7 ${H2} sm:text-[2.6rem] lg:text-[3rem]`}>
            {VAC.h1[0]} <Onder>{VAC.h1[1]}</Onder>
          </h1>
          <p className={`mt-5 max-w-[42rem] ${LEAD}`}>{VAC.intro}</p>
          <p className={`mt-3 max-w-[42rem] ${LEAD}`}>{VAC.introTwee}</p>

          {/* Snel naar de vacature die je zoekt */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {VACATURES.map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  springNaar(v.id);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#1A2D63]/15 bg-white px-4 py-2 text-[0.9375rem] font-medium text-[#1A2D63] transition hover:border-[#1A2D63]/40 hover:bg-[#F5F7FB]"
              >
                {v.titel}
              </a>
            ))}
          </div>
        </section>

        {/* De drie vacatures */}
        <section className="bg-[#F5F7FB]">
          <div className={`${CONTAINER} grid gap-5 py-12 sm:py-14 lg:grid-cols-3`}>
            {VACATURES.map((v) => {
              const Icoon = ICOON[v.id as keyof typeof ICOON];
              const tekst = VAC.vacatures[v.id];
              return (
                <article key={v.id} id={v.id} className="flex scroll-mt-6 flex-col rounded-3xl border border-[#1A2D63]/10 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(26,45,99,0.45)] sm:p-8">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full ${ICOON_KLEUR[v.id as keyof typeof ICOON_KLEUR]}`}>
                    <Icoon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="hp-display mt-5 text-balance text-[1.75rem] font-bold leading-[1.1] text-[#1A2D63]">{v.titel}</h2>

                  <p className="mt-4 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-[#6C7590]">{VAC.voorWie}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {v.profielen.map((p) => (
                      <li key={p} className="rounded-full bg-[#E6ECF9] px-3 py-1 text-[0.875rem] font-medium text-[#1A2D63]">{PROFIELEN[p]}</li>
                    ))}
                  </ul>

                  <p className="mt-6 text-[1rem] font-semibold text-[#1A2D63]">{VAC.watJeDoet}</p>
                  <ul className="mt-2 space-y-2">
                    {tekst.watJeDoet.map((t) => (
                      <li key={t} className="text-[1rem] leading-[1.65] text-[#3D4766]">{t}</li>
                    ))}
                  </ul>

                  <p className="mt-6 text-[1rem] font-semibold text-[#1A2D63]">{VAC.pastBijJou}</p>
                  <ul className="mt-3 flex-1 space-y-2.5">
                    {tekst.pastBijJou.map((t) => (
                      <li key={t} className="flex gap-3 text-[1rem] leading-[1.6] text-[#3D4766]">
                        <Vinkje />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <button type="button" onClick={() => solliciteer(v.id)} aria-label={`${VAC.solliciteer}: ${v.titel}`} className="hp-btn hp-btn--primary hp-btn--lg mt-8 w-full">
                    {VAC.solliciteer}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Het formulier */}
        <section id="solliciteer" className="scroll-mt-4 py-14 sm:py-16">
          <div className="mx-auto w-full max-w-[48rem] px-5 sm:px-8">
            <h2 className={H2}>
              {VAC.form.titel[0]} <Onder>{VAC.form.titel[1]}</Onder>
            </h2>
            <p className={`mt-4 ${LEAD}`}>{VAC.form.intro}</p>
            <div className="mt-8 rounded-3xl border border-[#1A2D63]/10 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(26,45,99,0.45)] sm:p-8">
              <SollicitatieFormulier vacature={vacature} kiesVacature={setVacature} bron={bron} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
