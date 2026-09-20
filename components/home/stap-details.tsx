"use client";

/**
 * De inhoud van de drie stappen in detail: waarom je het fundament zelf legt,
 * wat er gebeurt als wij bouwen, en wat je vanaf dan hebt. Staat in het
 * paneel bij de stappen op de homepage (home-page.tsx): rechts van de kaarten
 * op desktop, in de kaart op een telefoon. Bewust kort, geen prijzen (die
 * staan op de kaarten) en geen voorbeelden (die staan bij de oplossingen).
 * Het paneel is wit, dus de vakjes hierin zijn lichtgrijs of lichtblauw.
 *
 * Sinds 16 september 2026 is er in stap 2 één weg: het strategiegesprek, het
 * voorstel per AI-werknemer, bouwen, live. Het AI-native traject is geschrapt.
 */

import { ShieldCheck } from "lucide-react";
import { HOE } from "./copy";
import { Vinkje } from "./ui";

/**
 * Stap 1: één doorlopende uitleg, geen tussenkopjes en geen kaartje ernaast
 * (20/09). Eén boodschap: jij kent je bedrijf, de AI stelt de vragen. Wat er
 * in je fundament komt, zit in de zin zelf; alleen de kwalificatie eronder
 * blijft apart staan.
 */
export function FundamentDetail() {
  const F = HOE.fundament;
  return (
    <div className="max-w-[46rem] space-y-5">
      {/* De video van anderhalve minuut komt hier, zodra hij er is. */}
      {F.video && (
        <video controls preload="none" poster={F.video.poster} className="w-full rounded-[16px] bg-[#F5F7FB]">
          <source src={F.video.src} />
        </video>
      )}
      <p className="text-[0.9375rem] leading-[1.7] text-[#3D4766]">{F.tekst}</p>
      {/* De kwalificatie: wie een snelle fix zoekt, haakt hier af. */}
      <p className="border-l-2 border-[#1A2D63] pl-4 text-[0.875rem] font-medium leading-[1.55] text-[#1A2D63]">{F.eerlijk}</p>
    </div>
  );
}

/** Stap 2: hoe het pakket schaalt, en dan de vier stappen van gesprek tot live. */
export function BouwDetail() {
  const stappen = HOE.bouw.volgorde;
  return (
    <div>
      <p className="rounded-[16px] bg-[#F5F7FB] p-5 text-[0.9375rem] leading-[1.6] text-[#3D4766]">{HOE.bouw.intro}</p>
      <ol className="mt-6">
        {stappen.map((s, i) => {
          const laatste = i === stappen.length - 1;
          return (
            <li key={s.titel} className="relative flex gap-4 pb-5 last:pb-0">
              {!laatste && <span className="absolute bottom-0 left-[15.5px] top-9 w-px bg-[#1A2D63]/15" aria-hidden="true" />}
              <span className="hp-display relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A2D63] text-[0.875rem] font-bold text-white">
                {laatste ? <ShieldCheck className="h-4 w-4" aria-hidden="true" /> : i + 1}
              </span>
              <div className="pt-1">
                <p className="text-[1rem] font-semibold leading-[1.35] text-[#1A2D63]">{s.titel}</p>
                <p className="mt-1 text-[0.9375rem] leading-[1.6] text-[#3D4766]">{s.tekst}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Stap 3: wat je vanaf dan hebt, als lijst met groene vinkjes. Waren zes
 * kaartjes met een icoon, en het eigendom als marineblauwe accentkaart. Dat
 * kostte veel plaats voor weinig tekst (20/09); het eigendom staat er nu als
 * laatste punt in dezelfde lijst.
 */
export function OnderhoudDetail() {
  return (
    <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {HOE.onderhoud.punten.map((v) => (
        <li key={v.titel} className="flex items-start gap-3">
          <Vinkje groen />
          <div>
            <p className="text-[0.9375rem] font-semibold leading-[1.35] text-[#1A2D63]">{v.titel}</p>
            <p className="mt-0.5 text-[0.875rem] leading-[1.55] text-[#3D4766]">{v.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Eén blok per stap, in de volgorde van HOE.stappen. */
export const STAP_DETAILS = [
  { h3: HOE.fundament.h3, kort: HOE.fundament.kort, Inhoud: FundamentDetail },
  { h3: HOE.bouw.h3, kort: HOE.bouw.kort, Inhoud: BouwDetail },
  { h3: HOE.onderhoud.h3, kort: HOE.onderhoud.kort, Inhoud: OnderhoudDetail },
];
