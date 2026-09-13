"use client";

/**
 * De inhoud van de drie stappen in detail: waarom je het fundament zelf legt,
 * wat je koopt voor € 4.500, en wat de € 90 per maand dekt. Staat in het
 * paneel bij de stappen op de homepage (home-page.tsx, sectie 4): rechts van
 * de kaarten op desktop, in de kaart op een telefoon. Bewust kort: wat je in
 * één blik leest, geen lange lappen tekst. Het paneel is wit, dus de vakjes
 * hierin zijn lichtgrijs. Kolommen splitsen pas op brede schermen, want het
 * paneel is maar een deel van de pagina breed.
 */

import { BellRing, Server, ShieldCheck, Unlock } from "lucide-react";
import { HOE } from "./copy";
import { H3, Vinkje } from "./ui";

/** Iconen bij de vier onderdelen van het onderhoud (stap 03), in volgorde van de copy. */
const ONDERHOUD_ICONEN = [Server, BellRing, ShieldCheck, Unlock];

const RIJ_LABEL = "text-[0.8125rem] font-semibold uppercase tracking-wide text-[#1A2D63]";
const RIJ_TEKST = "text-[1rem] leading-[1.7] text-[#3D4766] sm:text-[1.0625rem]";

/** Tegenhanger van het vinkje, voor wat er níét in zit. */
function Kruisje() {
  return (
    <span className="hp-check hp-check--niet mt-0.5" aria-hidden="true">
      <svg width="9" height="9" viewBox="0 0 9 9">
        <path d="M1.5 1.5l6 6M7.5 1.5l-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function FundamentDetail() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-8">
      <div className="space-y-5">
        {HOE.fundament.alineas.map((a) => (
          <div key={a.kop}>
            <p className={`${H3} text-[1.05rem]`}>{a.kop}</p>
            <p className="mt-1.5 text-[0.9375rem] leading-[1.65] text-[#3D4766]">{a.tekst}</p>
          </div>
        ))}
        {/* De kwalificatie: wie een snelle fix zoekt, haakt hier af. */}
        <p className="border-l-2 border-[#1A2D63] pl-4 text-[0.9375rem] font-medium leading-[1.55] text-[#1A2D63]">{HOE.fundament.eerlijk}</p>
      </div>
      <div className="self-start rounded-[16px] bg-[#F5F7FB] p-5">
        <p className="text-[0.9375rem] font-semibold leading-[1.4] text-[#1A2D63]">{HOE.fundament.lijstTitel}</p>
        <ul className="mt-3.5 space-y-2.5">
          {HOE.fundament.lijst.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-[#3D4766]">
              <Vinkje />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function BouwDetail() {
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-3">
        {HOE.bouw.feiten.map((f) => (
          <li key={f.getal} className="flex items-baseline gap-3 rounded-[14px] bg-[#F5F7FB] px-4 py-3 sm:block sm:p-4">
            <p className="hp-display text-[1.5rem] font-bold leading-none text-[#1A2D63] sm:text-[1.75rem]">{f.getal}</p>
            <p className="text-[0.875rem] leading-[1.4] text-[#3D4766] sm:mt-1.5">{f.label}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <div className="rounded-[16px] bg-[#E6ECF9] p-5">
          <p className={RIJ_LABEL}>{HOE.bouw.welTitel}</p>
          <ul className="mt-3.5 space-y-2.5">
            {HOE.bouw.wel.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9375rem] font-medium leading-[1.5] text-[#1A2D63]">
                <Vinkje wit />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.75rem] font-medium uppercase tracking-wide text-[#6C7590]">{HOE.bouw.voorbeeldenTitel}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {HOE.bouw.voorbeelden.map((v) => (
              <li key={v} className="hp-chip hp-chip--klein">{v}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[16px] border border-[#E3E7EF] bg-white p-5">
          <p className={RIJ_LABEL}>{HOE.bouw.nietTitel}</p>
          <ul className="mt-3.5 space-y-2.5">
            {HOE.bouw.niet.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-[#3D4766]">
                <Kruisje />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function OnderhoudDetail() {
  return (
    <div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] xl:items-start xl:gap-8">
        <p className={RIJ_TEKST}>{HOE.onderhoud.intro}</p>
        <div className="rounded-[16px] border border-[#E3E7EF] bg-white p-5">
          <p className="hp-display text-[2rem] font-bold leading-none text-[#1A2D63]">{HOE.onderhoud.feit.getal}</p>
          <p className="mt-2 text-[0.875rem] leading-[1.5] text-[#3D4766]">{HOE.onderhoud.feit.label}</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {HOE.onderhoud.punten.map((v, i) => {
          const Icoon = ONDERHOUD_ICONEN[i] ?? Server;
          const accent = i === HOE.onderhoud.punten.length - 1; // "Van jou, ook als je stopt": de vertrouwenskaart
          return (
            <li key={v.titel} className={`rounded-[16px] p-5 ${accent ? "bg-[#1A2D63]" : "bg-[#F5F7FB]"}`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${accent ? "bg-white/12" : "bg-[#E6ECF9]"}`} aria-hidden="true">
                <Icoon className={`h-4 w-4 ${accent ? "text-white" : "text-[#1A2D63]"}`} />
              </span>
              <p className={`mt-3 text-[0.9375rem] font-semibold leading-[1.35] ${accent ? "text-white" : "text-[#1A2D63]"}`}>{v.titel}</p>
              <p className={`mt-1.5 text-[0.875rem] leading-[1.55] ${accent ? "text-white/85" : "text-[#3D4766]"}`}>{v.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Eén blok per stap, in de volgorde van HOE.stappen. */
export const STAP_DETAILS = [
  { h3: HOE.fundament.h3, kort: HOE.fundament.kort, Inhoud: FundamentDetail },
  { h3: HOE.bouw.h3, kort: HOE.bouw.kort, Inhoud: BouwDetail },
  { h3: HOE.onderhoud.h3, kort: HOE.onderhoud.kort, Inhoud: OnderhoudDetail },
];
