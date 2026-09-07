"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE_LINK,
  PHONE_NUMBER,
  SKOOL_URL,
  VAT_NUMBER,
} from "@/lib/finit-links";
import { useConsent } from "@/contexts/consent-context";
import { BreinPagina } from "./brein-pagina";
import { GesprekForm } from "./gesprek-form";
import {
  CTA_LESREEKS,
  FOOTER,
  HERO,
  HOE,
  NAV,
  OVER,
  SLOT,
  VERANDERT,
  VRAGEN,
  WAAROM,
} from "./copy";

/**
 * De homepage. Eén lange pagina, elke sectie beantwoordt de vraag die de lezer
 * op dat moment heeft. Alle tekst staat in ./copy.ts.
 *
 * Opmaak: warm papier, marineblauw voor koppen en knoppen, één lettertype,
 * hairlines als scheiding. Geen scroll-animaties, geen chatbot, geen iconen-tegels.
 */

const CONTAINER = "mx-auto w-full max-w-[72rem] px-5 sm:px-8";
const H2 = "text-balance text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#1A2D63] sm:text-[2.1rem] lg:text-[2.4rem]";
const LEAD = "text-[1.0625rem] leading-[1.6] text-[#57514A] sm:text-[1.125rem]";

const trackLesreeks = (location: string) =>
  pushEvent("cta_click", { cta_label: "lesreeks", location });

function LesreeksKnop({
  location,
  size = "lg",
  className = "",
  variant = "primary",
}: {
  location: string;
  size?: "lg" | "md";
  className?: string;
  variant?: "primary" | "cream";
}) {
  return (
    <a
      href={SKOOL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLesreeks(location)}
      className={`fs-btn fs-btn--${variant} fs-btn--${size} ${className}`}
    >
      {CTA_LESREEKS}
    </a>
  );
}

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openSettings } = useConsent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Het mobiele menu blokkeert het scrollen en sluit zichzelf op een breed scherm.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const openGesprek = useCallback((location: string) => {
    setMenuOpen(false);
    setFormOpen(true);
    pushEvent("cta_click", { cta_label: "gesprek", location });
    pushEvent("form_open", { intent: "gesprek", location });
  }, []);
  const closeGesprek = useCallback(() => setFormOpen(false), []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A2620]">
      {/* ---------------------------------------------------------------- */}
      {/* Navigatie                                                         */}
      {/* ---------------------------------------------------------------- */}
      <header
        className={`sticky top-0 z-40 border-b bg-[#FDFBF7] transition-colors duration-200 ${
          scrolled || menuOpen ? "border-[#E8E6DC]" : "border-transparent"
        }`}
      >
        <div className={`${CONTAINER} flex h-16 items-center justify-between gap-6`}>
          <a href="#top" className="flex shrink-0 items-center" aria-label="Finit Solutions, naar boven">
            <Image
              src="/Finit Logo Blue@4x.png"
              alt="Finit Solutions"
              width={1698}
              height={480}
              priority
              className="h-7 w-auto"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hoofdnavigatie">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.9375rem] font-medium text-[#57514A] transition-colors hover:text-[#1A2D63]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LesreeksKnop location="nav" size="md" className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-[8px] text-[#1A2D63] transition-colors hover:bg-[#F5F3EC] lg:hidden"
              aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-6 w-6" strokeWidth={1.75} /> : <Menu className="h-6 w-6" strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto bg-[#FDFBF7] lg:hidden">
          <div className={`${CONTAINER} flex min-h-full flex-col pb-8 pt-4`}>
            <nav className="border-b border-[#E8E6DC]" aria-label="Mobiele navigatie">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-t border-[#E8E6DC] py-4 text-[1.375rem] font-semibold text-[#1A2D63]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <LesreeksKnop location="mobile_menu" className="w-full" />
              <button
                type="button"
                onClick={() => openGesprek("mobile_menu")}
                className="fs-btn fs-btn--secondary fs-btn--lg w-full"
              >
                {SLOT.gesprekKnop}
              </button>
            </div>
            <a href={PHONE_LINK} className="mt-8 text-center text-[1rem] text-[#57514A]">
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      )}

      <main id="top" className="scroll-mt-16">
        {/* -------------------------------------------------------------- */}
        {/* 1. Hero                                                        */}
        {/* -------------------------------------------------------------- */}
        <section className={`${CONTAINER} pb-16 pt-10 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
            <div>
              <h1 className="text-balance text-[2.1rem] font-bold leading-[1.06] tracking-[-0.025em] text-[#1A2D63] sm:text-[2.6rem] lg:text-[2.5rem] xl:text-[2.8rem]">
                {HERO.h1.map((regel) => (
                  <span key={regel} className="block">
                    {regel}
                  </span>
                ))}
              </h1>
              <p className={`mt-6 max-w-[36rem] ${LEAD}`}>{HERO.sub}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LesreeksKnop location="hero" className="w-full sm:w-auto" />
                <a href="#hoe-het-werkt" className="fs-btn fs-btn--secondary fs-btn--lg w-full sm:w-auto">
                  {HERO.secundair}
                </a>
              </div>
              <p className="mt-5 text-[0.9375rem] leading-[1.5] text-[#76706A]">{HERO.meta}</p>
            </div>

            <BreinPagina />
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 2. Waarom ChatGPT je werk niet doet                            */}
        {/* -------------------------------------------------------------- */}
        <section className="border-t border-[#E8E6DC]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
              <div className="max-w-[36rem]">
                <h2 className={H2}>{WAAROM.h2}</h2>
                <p className={`mt-6 ${LEAD}`}>{WAAROM.p1}</p>
                <p className={`mt-4 ${LEAD}`}>{WAAROM.p2}</p>
                <p className={`mt-4 ${LEAD}`}>{WAAROM.p3}</p>
              </div>
              <div className="lg:pt-2">
                <p className="text-[0.9375rem] font-medium text-[#76706A]">{WAAROM.lijstTitel}</p>
                <ul className="mt-3 divide-y divide-[#E8E6DC] border-y border-[#E8E6DC]">
                  {WAAROM.lijst.map((item) => (
                    <li key={item} className="py-3.5 text-[1.0625rem] leading-[1.5] text-[#2A2620]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 3. Wat er verandert (nu / straks)                              */}
        {/* -------------------------------------------------------------- */}
        <section className="border-t border-[#E8E6DC]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="max-w-[40rem]">
              <h2 className={H2}>{VERANDERT.h2}</h2>
              <p className={`mt-5 ${LEAD}`}>{VERANDERT.intro}</p>
            </div>

            <div className="mt-10 border-t border-[#E8E6DC]">
              <div className="hidden gap-x-10 py-3 text-[0.8125rem] font-medium text-[#76706A] md:grid md:grid-cols-2">
                <span>{VERANDERT.kolomNu}</span>
                <span>{VERANDERT.kolomStraks}</span>
              </div>
              {VERANDERT.rijen.map((rij) => (
                <div
                  key={rij.nu}
                  className="grid gap-y-3 border-b border-[#E8E6DC] py-5 md:grid-cols-2 md:gap-x-10 md:py-6"
                >
                  <p className="text-[1.0625rem] leading-[1.5] text-[#57514A]">
                    <span className="mb-1 block text-[0.75rem] font-medium text-[#94908A] md:hidden">
                      {VERANDERT.kolomNu}
                    </span>
                    {rij.nu}
                  </p>
                  <p className="text-[1.0625rem] font-medium leading-[1.5] text-[#1A2D63]">
                    <span className="mb-1 block text-[0.75rem] font-medium text-[#94908A] md:hidden">
                      {VERANDERT.kolomStraks}
                    </span>
                    {rij.straks}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-[44rem] text-[0.9375rem] leading-[1.55] text-[#76706A]">{VERANDERT.noot}</p>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 4. Hoe het werkt + prijzen                                     */}
        {/* -------------------------------------------------------------- */}
        <section id="hoe-het-werkt" className="scroll-mt-16 border-t border-[#E8E6DC]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="max-w-[40rem]">
              <h2 className={H2}>{HOE.h2}</h2>
              <p className={`mt-5 ${LEAD}`}>{HOE.intro}</p>
            </div>

            <ol
              id="prijzen"
              className="mt-12 grid scroll-mt-24 gap-12 border-t border-[#E8E6DC] pt-8 md:grid-cols-3 md:gap-8"
            >
              {HOE.stappen.map((stap) => (
                <li key={stap.label} className="flex flex-col">
                  <p className="text-[0.8125rem] font-medium text-[#76706A]">{stap.label}</p>
                  <h3 className="mt-2 text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.01em] text-[#1A2D63]">
                    {stap.titel}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] font-medium text-[#4D5A82]">{stap.rol}</p>

                  <div className="mt-5 border-t border-[#E8E6DC] pt-5">
                    <p className="text-[2rem] font-semibold leading-none tracking-[-0.02em] text-[#1A2D63]">
                      {stap.prijs}
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-[1.5] text-[#57514A]">{stap.prijsDetail}</p>
                  </div>

                  <p className="mt-5 text-[1rem] leading-[1.6] text-[#2A2620]">{stap.body}</p>
                  <p className="mt-3 text-[0.9375rem] leading-[1.6] text-[#57514A]">{stap.resultaat}</p>

                  {stap.cta && (
                    <div className="mt-6">
                      <LesreeksKnop location="stappen" className="w-full sm:w-auto" />
                      {stap.ctaNoot && (
                        <p className="mt-3 text-[0.875rem] leading-[1.5] text-[#76706A]">{stap.ctaNoot}</p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[0.8125rem] text-[#76706A]">{HOE.btwNoot}</p>

            <div className="mt-12 max-w-[52rem] rounded-[12px] bg-[#F5F3EC] p-6 sm:p-8">
              <h3 className="text-[1.25rem] font-semibold leading-snug text-[#1A2D63]">{HOE.waarom.h3}</h3>
              <p className="mt-3 text-[1rem] leading-[1.6] text-[#2A2620] sm:text-[1.0625rem]">{HOE.waarom.p}</p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. Over ons                                                    */}
        {/* -------------------------------------------------------------- */}
        <section id="over-ons" className="scroll-mt-16 border-t border-[#E8E6DC]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <h2 className={H2}>{OVER.h2}</h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:gap-8">
              {OVER.team.map((lid) => (
                <div key={lid.naam} className="grid grid-cols-[5.5rem_1fr] items-start gap-4 sm:block">
                  <div className="relative aspect-square w-full overflow-hidden rounded-[10px] border border-[#E8E6DC] bg-[#F5F3EC]">
                    <Image
                      src={lid.foto}
                      alt={lid.alt}
                      fill
                      sizes="(min-width: 640px) 30vw, 6rem"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="sm:mt-4">
                    <p className="text-[1.125rem] font-semibold text-[#1A2D63]">{lid.naam}</p>
                    <p className="mt-1 text-[0.9375rem] leading-[1.55] text-[#57514A]">{lid.rol}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className={`mt-12 max-w-[44rem] ${LEAD}`}>{OVER.p}</p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="text-[0.8125rem] font-medium text-[#76706A]">{OVER.logosLabel}</span>
              <Image
                src="/SI @KBC Black (2).png"
                alt="Start it @KBC"
                width={400}
                height={120}
                className="h-6 w-auto opacity-70"
              />
              <Image
                src="/VLAIO_sponsorlogo-antraciet.png"
                alt="VLAIO"
                width={400}
                height={120}
                className="h-6 w-auto opacity-70"
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 6. Vragen                                                      */}
        {/* -------------------------------------------------------------- */}
        <section id="vragen" className="scroll-mt-16 border-t border-[#E8E6DC]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="max-w-[46rem]">
              <h2 className={H2}>{VRAGEN.h2}</h2>
              <div className="mt-8 border-t border-[#E8E6DC]">
                {VRAGEN.items.map((item) => (
                  <details key={item.q} className="fs-details group border-b border-[#E8E6DC]">
                    <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium leading-snug text-[#1A2D63] sm:text-[1.125rem]">
                      <span>{item.q}</span>
                      <span className="fs-plus mt-1 shrink-0 text-[#76706A]" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <p className="pb-6 pr-10 text-[1rem] leading-[1.6] text-[#57514A] sm:text-[1.0625rem]">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 7. Slot                                                        */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-[#1A2D63] text-[#FDFBF7]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="max-w-[40rem]">
              <h2 className="text-balance text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[2.1rem] lg:text-[2.4rem]">
                {SLOT.h2}
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-[1.6] text-[#FDFBF7]/80 sm:text-[1.125rem]">{SLOT.p}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <LesreeksKnop location="slot" variant="cream" className="w-full sm:w-auto" />
                <button
                  type="button"
                  onClick={() => openGesprek("slot")}
                  className="text-left text-[1rem] text-[#FDFBF7]/85 underline decoration-[#FDFBF7]/40 underline-offset-4 transition-colors hover:text-[#FDFBF7] hover:decoration-[#FDFBF7]"
                >
                  {SLOT.secundair}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-white/10 bg-[#1A2D63] text-[#FDFBF7]/70">
        <div className={`${CONTAINER} py-10 sm:py-12`}>
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="text-[0.9375rem] leading-[1.7]">
              <p className="font-medium text-[#FDFBF7]">{FOOTER.bedrijf}</p>
              <p>{FOOTER.plaats}</p>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-[#FDFBF7]">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>
                <a href={PHONE_LINK} className="transition-colors hover:text-[#FDFBF7]">
                  {PHONE_NUMBER}
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[0.9375rem] leading-[1.7] sm:grid-cols-[auto_auto]">
              <div className="flex flex-col">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#FDFBF7]">
                  Instagram
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#FDFBF7]">
                  LinkedIn
                </a>
              </div>
              <div className="flex flex-col">
                {FOOTER.links.map((l) => (
                  <a key={l.href} href={l.href} className="transition-colors hover:text-[#FDFBF7]">
                    {l.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={openSettings}
                  className="text-left transition-colors hover:text-[#FDFBF7]"
                >
                  Cookie-instellingen
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[0.8125rem] text-[#FDFBF7]/50 sm:flex-row sm:justify-between">
            <span>BTW {VAT_NUMBER}</span>
            <span>© {new Date().getFullYear()} Finit Solutions</span>
          </div>
        </div>
      </footer>

      <GesprekForm open={formOpen} onClose={closeGesprek} />
    </div>
  );
}
