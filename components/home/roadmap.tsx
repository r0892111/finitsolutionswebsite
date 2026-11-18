"use client";

/**
 * "Hoe werken we samen?" als compacte kaart: een tijdlijn met de vijf fasen en de
 * gekozen fase eronder, met de prijzen bij de fase waar ze horen. Je bladert met de pijlen of klikt op een fase in de tijdlijn.
 * De pijlen staan boven de inhoud, dus ze blijven staan als de kaart van hoogte wisselt.
 * De details openen in een venster (stap-details.tsx). Alle tekst staat in copy.ts.
 */

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Hammer,
  RefreshCw,
  Rocket,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { HOE, type HalteIcoon } from "./copy";
import { HALTE_DETAILS } from "./stap-details";
import { ContactKnop, CONTAINER, H2, H3, KOP, LEAD, Onder, StartKnop } from "./ui";

const HALTE_ICOON: Record<HalteIcoon, LucideIcon> = {
  brein: Brain,
  bouwen: Hammer,
  live: Rocket,
  onderhoud: ShieldCheck,
  uitbreiding: TrendingUp,
};

const PIJL = "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.9375rem] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2D63] disabled:cursor-not-allowed disabled:opacity-40";

/** De details van een fase: optioneel wat je krijgt of wat we bouwen, dan de uitleg. */
function HaltePaneel({ i }: { i: number }) {
  const { h3, kort, Inhoud } = HALTE_DETAILS[i];
  return (
    <div>
      {i === 0 && (
        <div className="mb-5 border-b border-[#E3E7EF] pb-5">
          <h4 className={`${H3} text-[1.35rem]`}>{HOE.setup.puntenTitel}</h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3 sm:gap-5">
            {HOE.setup.punten.map((punt) => (
              <li key={punt} className="text-[0.9375rem] font-medium leading-[1.5] text-[#1A2D63]">{punt}</li>
            ))}
          </ul>
        </div>
      )}
      {i === 1 && (
        <ul className="mb-5 grid gap-x-5 gap-y-2 border-b border-[#E3E7EF] pb-5 sm:grid-cols-2">
          {HOE.bouwstenen.items.map((b) => (
            <li key={b.titel} className="text-[0.9375rem] leading-[1.5] text-[#3D4766]">
              <span className="font-semibold text-[#1A2D63]">{b.titel}:</span> {b.tekst}
            </li>
          ))}
        </ul>
      )}
      <h4 className={`${H3} text-[1.35rem]`}>{h3}</h4>
      <p className="mt-2 max-w-[44rem] text-[1rem] leading-[1.6] text-[#3D4766]">{kort}</p>
      <div className="mt-5">
        <Inhoud />
      </div>
    </div>
  );
}

export function Roadmap() {
  const [actief, setActief] = useState(0);
  const [details, setDetails] = useState<number | null>(null);
  const laatste = HOE.haltes.length - 1;
  const gekozen = details === null ? null : HOE.haltes[details];

  return (
    <section id="aanpak" className="scroll-mt-20">
      <div className={`${CONTAINER} py-14 sm:py-16`}>
        <div className={KOP}>
          <h2 className={H2}>{HOE.h2[0]} <Onder>{HOE.h2[1]}</Onder></h2>
          <p className={`mt-4 ${LEAD}`}>{HOE.intro}</p>
        </div>

        <div className="hp-card mx-auto mt-8 max-w-[56rem] p-5 sm:p-7">
          {/* De tijdlijn: de lijn loopt van het midden van de eerste tot de laatste kolom. */}
          <div className="relative">
            <div className="absolute left-[10%] right-[10%] top-5 h-0.5 bg-[#E3E7EF]" aria-hidden="true" />
            <ol className="relative grid grid-cols-5">
              {HOE.haltes.map((h, i) => {
                const Icoon = HALTE_ICOON[h.icoon];
                return (
                  <li key={h.titel} className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setActief(i)}
                      aria-label={h.titel}
                      aria-current={actief === i ? "step" : undefined}
                      className="flex flex-col items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2D63]"
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                          actief === i && "border-[#1A2D63] bg-[#1A2D63] text-white",
                          i < actief && "border-[#E6ECF9] bg-[#E6ECF9] text-[#1A2D63]",
                          i > actief && "border-[#E3E7EF] bg-white text-[#6C7590]",
                        )}
                      >
                        <Icoon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                      </span>
                      <span className={cn("hidden text-center text-[0.8125rem] leading-tight sm:block", actief === i ? "font-semibold text-[#1A2D63]" : "font-medium text-[#6C7590]")}>
                        {h.titel}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* De pijlen staan boven de inhoud: zo blijven ze op hun plaats als de hoogte wisselt. */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <button type="button" onClick={() => setActief(actief - 1)} disabled={actief === 0} className={cn(PIJL, "text-[#1A2D63] enabled:hover:bg-[#F5F7FB]")}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {HOE.vorige}
            </button>
            <span className="text-[0.8125rem] font-medium text-[#6C7590]">{actief + 1} / {HOE.haltes.length}</span>
            <button type="button" onClick={() => setActief(actief + 1)} disabled={actief === laatste} className={cn(PIJL, "bg-[#1A2D63] text-white enabled:hover:bg-[#2A4488]")}>
              {HOE.volgende}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* De gekozen fase. */}
          <div className="mt-4 border-t border-[#E3E7EF] pt-5" aria-live="polite">
            {HOE.haltes.map((h, i) => i === actief && (
              <div key={h.titel} className="hp-wissel">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h3 className={`${H3} text-[1.35rem] sm:text-[1.5rem]`}>{h.titel}</h3>
                  <span className="rounded-full border border-[#E3E7EF] px-2.5 py-0.5 text-[0.75rem] font-medium text-[#6C7590]">{h.tijd}</span>
                  {h.prijs && <span className="rounded-full bg-[#E6ECF9] px-2.5 py-0.5 text-[0.75rem] font-semibold text-[#1A2D63]">{h.prijs}</span>}
                </div>
                <p className="mt-2 max-w-[44rem] text-[1rem] leading-[1.6] text-[#3D4766]">{h.tekst}</p>
                {i === 1 && (
                  <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {HOE.prijzen.map((r) => (
                      <li key={r.titel} className="rounded-xl bg-[#F5F7FB] px-3 py-2">
                        <span className="block text-[0.875rem] font-semibold leading-tight text-[#1A2D63]">{r.titel}</span>
                        {r.tekst && <span className="block text-[0.75rem] leading-tight text-[#6C7590]">{r.tekst}</span>}
                        <span className="mt-1 block text-[0.9375rem] font-semibold text-[#1A2D63]">{r.prijs}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {i <= 1 && <p className="mt-2 text-[0.8125rem] leading-[1.5] text-[#6C7590]">{HOE.prijsNoot}</p>}
                {i === laatste && (
                  <p className="mt-2 flex items-center gap-1.5 text-[0.875rem] font-medium text-[#1A2D63]">
                    <RefreshCw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {HOE.lus}
                  </p>
                )}
                <button type="button" onClick={() => setDetails(i)} className="hp-link mt-2 text-[0.9375rem] font-medium text-[#1A2D63]">
                  {HOE.meer}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <div className="w-full text-center sm:w-auto">
            <StartKnop location="stappen" size="md" className="w-full sm:w-auto" />
            <p className="mt-2 text-[0.8125rem] text-[#6C7590]">{HOE.ctaNoot}</p>
          </div>
          <div className="flex w-full flex-col items-center gap-2 sm:w-auto">
            <ContactKnop location="aanpak" size="md" className="w-full sm:w-auto" />
            <p className="text-[0.8125rem] text-[#6C7590]">{HOE.slotVraag}</p>
          </div>
        </div>
      </div>

      <Dialog open={details !== null} onOpenChange={(o) => { if (!o) setDetails(null); }}>
        <DialogContent className="hp max-h-[85svh] max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8">
          {gekozen && details !== null && (
            <>
              <DialogTitle className={`${H3} text-[1.6rem]`}>{gekozen.titel}</DialogTitle>
              <DialogDescription className="text-[1rem] leading-[1.6] text-[#3D4766]">{gekozen.tekst}</DialogDescription>
              <div className="mt-3 border-t border-[#E3E7EF] pt-5">
                <HaltePaneel i={details} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
