"use client";

/**
 * /contact: waar "Neem contact met ons op" naartoe gaat. Zelfde kop en footer
 * als de andere pagina's buiten de homepage, en dezelfde contactkaart als
 * naast de FAQ (contact-kaart.tsx): de lesreeks, het vraagformulier met
 * telefoonnummer, en het telefoonnummer. Tekst in copy.ts (CONTACT).
 */

import { ChevronRight } from "lucide-react";
import { CONTACT } from "./copy";
import { ContactKaart } from "./contact-kaart";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { CONTAINER, H2, LEAD, Onder } from "./ui";

export function ContactPagina() {
  return (
    <div className="hp min-h-screen bg-white text-[#3D4766]">
      <SiteHeader location="contact" />

      <main>
        <section className={`${CONTAINER} pb-10 pt-10 sm:pb-12 sm:pt-14`}>
          <nav aria-label="Kruimelpad" className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-[#6C7590]">
            <a href="/" className="transition-colors hover:text-[#1A2D63]">Home</a>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-[#1A2D63]">{CONTACT.kruimel}</span>
          </nav>
          <h1 className={`mt-7 ${H2} sm:text-[2.6rem] lg:text-[3rem]`}>
            {CONTACT.h1[0]} <Onder>{CONTACT.h1[1]}</Onder>
          </h1>
          <p className={`mt-5 max-w-[40rem] ${LEAD}`}>{CONTACT.intro}</p>
        </section>

        <section className="bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-12 sm:py-14`}>
            <ContactKaart location="contact_pagina" bron="https://finitsolutions.be/contact" className="mx-auto max-w-[40rem]" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
