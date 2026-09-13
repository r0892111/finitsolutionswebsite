"use client";

/**
 * De inhoud van de drie stappen in detail: waarom je het fundament zelf legt,
 * wat er gebeurt als wij bouwen, en wat je vanaf dan hebt. Staat in het
 * paneel bij de stappen op de homepage (home-page.tsx): rechts van de kaarten
 * op desktop, in de kaart op een telefoon. Bewust kort, geen prijzen (die
 * staan op de kaarten) en geen voorbeelden (die staan bij de oplossingen).
 * Het paneel is wit, dus de vakjes hierin zijn lichtgrijs of lichtblauw.
 */

import { BellRing, CalendarClock, LifeBuoy, RefreshCw, Server, ShieldCheck, Unlock } from "lucide-react";
import { HOE } from "./copy";
import { H3, Vinkje } from "./ui";

/** Iconen bij de zes onderdelen van het onderhoud (stap 3), in volgorde van de copy. */
const ONDERHOUD_ICONEN = [Server, BellRing, RefreshCw, LifeBuoy, CalendarClock, Unlock];

export function FundamentDetail() {
  const F = HOE.fundament;
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-8">
      <div className="space-y-5">
        {/* De video van anderhalve minuut komt hier, zodra hij er is. */}
        {F.video && (
          <video controls preload="none" poster={F.video.poster} className="w-full rounded-[16px] bg-[#F5F7FB]">
            <source src={F.video.src} />
          </video>
        )}
        {F.alineas.map((a) => (
          <div key={a.kop}>
            <p className={`${H3} text-[1.05rem]`}>{a.kop}</p>
            <p className="mt-1.5 text-[0.9375rem] leading-[1.65] text-[#3D4766]">{a.tekst}</p>
          </div>
        ))}
        {/* De kwalificatie: wie een snelle fix zoekt, haakt hier af. */}
        <p className="border-l-2 border-[#1A2D63] pl-4 text-[0.875rem] font-medium leading-[1.55] text-[#1A2D63]">{F.eerlijk}</p>
      </div>
      <div className="self-start rounded-[16px] bg-[#E6ECF9] p-5">
        <p className="text-[0.9375rem] font-semibold leading-[1.4] text-[#1A2D63]">{F.lijstTitel}</p>
        <ul className="mt-3.5 space-y-2.5">
          {F.lijst.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.9375rem] font-medium leading-[1.5] text-[#1A2D63]">
              <Vinkje wit />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function BouwDetail() {
  const stappen = HOE.bouw.volgorde;
  return (
    <ol>
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
  );
}

export function OnderhoudDetail() {
  const punten = HOE.onderhoud.punten;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {punten.map((v, i) => {
        const Icoon = ONDERHOUD_ICONEN[i] ?? Server;
        const accent = i === punten.length - 1; // "Van jou, ook als je stopt": de vertrouwenskaart
        return (
          <li key={v.titel} className={`rounded-[16px] p-4 ${accent ? "bg-[#1A2D63]" : "bg-[#F5F7FB]"}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${accent ? "bg-white/12" : "bg-[#E6ECF9]"}`} aria-hidden="true">
              <Icoon className={`h-4 w-4 ${accent ? "text-white" : "text-[#1A2D63]"}`} />
            </span>
            <p className={`mt-2.5 text-[0.9375rem] font-semibold leading-[1.3] ${accent ? "text-white" : "text-[#1A2D63]"}`}>{v.titel}</p>
            <p className={`mt-1 text-[0.8125rem] leading-[1.5] ${accent ? "text-white/85" : "text-[#3D4766]"}`}>{v.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** Eén blok per stap, in de volgorde van HOE.stappen. */
export const STAP_DETAILS = [
  { h3: HOE.fundament.h3, kort: HOE.fundament.kort, Inhoud: FundamentDetail },
  { h3: HOE.bouw.h3, kort: HOE.bouw.kort, Inhoud: BouwDetail },
  { h3: HOE.onderhoud.h3, kort: HOE.onderhoud.kort, Inhoud: OnderhoudDetail },
];
