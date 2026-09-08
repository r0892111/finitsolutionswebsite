"use client";

/**
 * De /bedankt-pagina, waar het contactformulier naartoe stuurt.
 *
 * Volgt de nieuwe huisstijl van de homepage: hetzelfde lettertype (hp-display),
 * dezelfde kaarten, knoppen en kleuren, en dezelfde footer. De oude versie had
 * nog de vorige stijl (crèmekleurige achtergrond, serif-kop, ruisfilter, golven
 * tussen de secties) en vertelde het oude verhaal: wij komen langs met een
 * voorstel. De drie stappen volgen nu het model van de site.
 */

import { useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { CONTACT_EMAIL, PHONE_LINK, PHONE_NUMBER } from "@/lib/finit-links";
import { BEDANKT, MENU } from "@/components/home/copy";
import { SiteFooter } from "@/components/home/site-footer";
import { CONTAINER, H2, H3, KOP, LEAD, LesreeksKnop, Onder } from "@/components/home/ui";

/** Het vinkje dat zich intekent zodra de pagina laadt. */
function Vinkje() {
  return (
    <span className="hp-bedankt-vink mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E6ECF9] sm:h-20 sm:w-20">
      <svg viewBox="0 0 48 48" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
        <path
          d="M12 25 L20 33 L36 15"
          stroke="#1A2D63"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function ThankYouLanding() {
  useEffect(() => {
    pushEvent("form_submitted", { location: "lp_thankyou" });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1A2D63]">
      {/* Lichte kop: alleen het logo en een weg terug. */}
      <header className="border-b border-[#E3E7EF]">
        <div className={`${CONTAINER} flex items-center justify-between py-4`}>
          <a href="/" className="flex items-center gap-2 text-[0.875rem] font-medium text-[#6C7590] transition-colors hover:text-[#1A2D63]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{BEDANKT.terug}</span>
          </a>
          <a href="/" aria-label="Finit Solutions">
            <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="h-7 w-auto sm:h-8" priority />
          </a>
          {/* Houdt het logo in het midden. */}
          <span className="w-4 sm:w-[9.5rem]" aria-hidden="true" />
        </div>
      </header>

      <main>
        {/* -------------------------------------------------------------- */}
        {/* 1. De bevestiging                                              */}
        {/* -------------------------------------------------------------- */}
        <section className={`${CONTAINER} pb-16 pt-16 text-center sm:pb-20 sm:pt-24`}>
          <Vinkje />
          <h1 className={`mt-7 ${H2}`}>
            {BEDANKT.h1[0]} <Onder>{BEDANKT.h1[1]}</Onder>
          </h1>
          <p className={`mx-auto mt-5 max-w-[38rem] ${LEAD}`}>{BEDANKT.sub}</p>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 2. Wat gebeurt er nu — de drie stappen van het model            */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-16 sm:py-20`}>
            <div className={KOP}>
              <h2 className={H2}>
                {BEDANKT.h2[0]} <Onder>{BEDANKT.h2[1]}</Onder>
              </h2>
              <p className={`mt-5 ${LEAD}`}>{BEDANKT.intro}</p>
            </div>

            <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
              {BEDANKT.stappen.map((stap, i) => (
                <li key={stap.nummer} className={`hp-card flex flex-col p-6 sm:p-7 ${i === 0 ? "hp-card--accent" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="hp-display text-[1.75rem] font-bold leading-none text-[#1A2D63]/45">{stap.nummer}</span>
                    <span className="flex flex-wrap justify-end gap-1.5">
                      <span className="rounded-full bg-[#E6ECF9] px-3 py-1 text-[0.75rem] font-medium text-[#1A2D63]">{stap.wie}</span>
                      <span className="rounded-full border border-[#E3E7EF] px-3 py-1 text-[0.75rem] font-medium text-[#6C7590]">{stap.tijd}</span>
                    </span>
                  </div>
                  <h3 className={`mt-4 ${H3} text-[1.45rem]`}>{stap.titel}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#3D4766]">{stap.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 3. Wat je vandaag al kan doen, en hoe je ons bereikt            */}
        {/* -------------------------------------------------------------- */}
        <section className={`${CONTAINER} py-16 sm:py-20`}>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-6">
            <div className="hp-card flex flex-col justify-center p-7 sm:p-9">
              <h2 className={`${H3} text-[1.5rem]`}>{BEDANKT.nu.titel}</h2>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-[#3D4766]">{BEDANKT.nu.body}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <LesreeksKnop location="bedankt" size="md" />
                <span className="text-[0.8125rem] leading-[1.5] text-[#6C7590]">{BEDANKT.nu.noot}</span>
              </div>
            </div>

            <div className="hp-card flex flex-col justify-center p-7 sm:p-9">
              <h2 className={`${H3} text-[1.5rem]`}>{BEDANKT.vragenTitel}</h2>
              <p className="mt-4 text-[0.8125rem] font-medium uppercase tracking-wide text-[#6C7590]">{BEDANKT.belLabel}</p>
              <a
                href={PHONE_LINK}
                onClick={() => pushEvent("contact_click", { method: "phone", location: "lp_thankyou_contact" })}
                className="hp-display mt-1 flex items-center gap-2.5 text-[1.5rem] font-semibold leading-tight text-[#1A2D63] transition-colors hover:text-[#2A4488]"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#1A2D63]/50" aria-hidden="true" />
                {PHONE_NUMBER}
              </a>
              <p className="mt-1 text-[0.875rem] text-[#6C7590]">{MENU.uren}</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => pushEvent("contact_click", { method: "email", location: "lp_thankyou_contact" })}
                className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] text-[#3D4766] transition-colors hover:text-[#1A2D63]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#1A2D63]/50" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
