"use client";

/**
 * De contactkaart: naast de FAQ op de homepage en op /contact. Van boven naar
 * onder: de lesreeks (de weg die we voorstellen), het vraagformulier voor wie
 * eerst iets wil vragen, en het telefoonnummer. Geen kennismaking meer inplannen
 * (review van 13 september 2026), geen foto (14 september).
 * Tekst in copy.ts (SLOT, VRAAG, MENU, FOOTER).
 */

import { Mail } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/finit-links";
import { FOOTER, MENU, SKOOL, SLOT } from "./copy";
import { H3, LesreeksKnop } from "./ui";
import { VraagFormulier } from "./vraag-formulier";

export function ContactKaart({ location, bron, className = "" }: { location: string; bron: string; className?: string }) {
  const tel = FOOTER.telefoons[0];
  return (
    <div className={`hp-card p-6 sm:p-8 ${className}`}>
      <h2 className={`${H3} text-[1.4rem] sm:text-[1.55rem]`}>{SLOT.lesreeksTitel}</h2>
      <LesreeksKnop location={`${location}_lesreeks`} size="md" className="mt-4 w-full" />
      <p className="mt-2.5 text-center text-[0.8125rem] leading-[1.5] text-[#6C7590]">{SKOOL.noot}</p>

      <div className="relative mt-7 border-t border-[#E3E7EF] pt-7">
        <VraagFormulier metTelefoon bron={bron} location={location} />
      </div>

      <div className="mt-7 border-t border-[#E3E7EF] pt-7">
        <div className="min-w-0">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#6C7590]">{MENU.belTitel}</p>
          <a
            href={tel.link}
            onClick={() => pushEvent("contact_click", { method: "phone", location })}
            className="hp-display mt-1 block text-[1.35rem] font-semibold leading-tight text-[#1A2D63] underline decoration-[#1A2D63]/20 underline-offset-4 transition-colors hover:text-[#2A4488] hover:decoration-[#1A2D63]/60"
          >
            {tel.nummer}
          </a>
          <p className="mt-1.5 text-[0.875rem] leading-[1.5] text-[#3D4766]">
            {SLOT.bel} <span className="text-[#6C7590]">{MENU.uren}</span>
          </p>
          <p className="mt-1.5 text-[0.875rem] text-[#6C7590]">
            {SLOT.mailLabel}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => pushEvent("contact_click", { method: "email", location })} className="hp-link inline-flex items-center gap-1 text-[#1A2D63]">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
