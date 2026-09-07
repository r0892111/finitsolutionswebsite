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
import { Brein3D } from "./brein-3d";
import { GesprekForm } from "./gesprek-form";
import {
  CTA_LESREEKS,
  FOOTER,
  HERKEN,
  HERO,
  HOE,
  LOGOS,
  NAV,
  OPLOSSING,
  RESULTATEN,
  SLOT,
  VRAGEN,
  WAAROM,
  type FaqBlok,
} from "./copy";

/**
 * De homepage, in de opbouw van de vorige homepage en de landingspagina's:
 * hero → herken jij dit → AI neemt je werk over → hoe wij werken (+ prijzen)
 * → resultaten → waarom Finit → vragen → slot. Alle tekst staat in ./copy.ts.
 *
 * Opmaak: warm papier met verdiepte banden, marineblauw voor navigatiebalk,
 * koppen, knoppen en de resultaten-band. Bricolage Grotesque voor koppen en
 * prijzen, Schibsted Grotesk voor de rest. Eén bewegend element: het brein in
 * de hero. Verder staat alles stil.
 */

const CONTAINER = "mx-auto w-full max-w-[72rem] px-5 sm:px-8";
const H2 = "fs-display text-balance text-[1.9rem] font-bold leading-[1.05] text-[#1A2D63] sm:text-[2.3rem] lg:text-[2.7rem]";
const LEAD = "text-[1.0625rem] leading-[1.6] text-[#57514A] sm:text-[1.125rem]";

const trackLesreeks = (location: string) => pushEvent("cta_click", { cta_label: "lesreeks", location });

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

function Vinkje({ donker = false }: { donker?: boolean }) {
  return (
    <span className="fs-check mt-0.5" aria-hidden="true" style={donker ? { background: "rgba(253,251,247,0.14)", color: "#FDFBF7" } : undefined}>
      <svg width="10" height="8" viewBox="0 0 10 8">
        <path d="M1 4l2.6 2.6L9 1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function FaqAntwoord({ blokken }: { blokken: FaqBlok[] }) {
  return (
    <div className="space-y-3 pb-6 pr-6 text-[1rem] leading-[1.6] text-[#57514A] sm:pr-10">
      {blokken.map((b, i) => {
        if (b.t === "h") return <p key={i} className="pt-1 font-semibold text-[#2A2620]">{b.tekst}</p>;
        if (b.t === "list")
          return (
            <ul key={i} className="space-y-2">
              {b.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A2D63]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        return <p key={i}>{b.tekst}</p>;
      })}
    </div>
  );
}

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [voorbijHero, setVoorbijHero] = useState(false);
  const { openSettings } = useConsent();

  // Sticky knop op mobiel zodra de hero uit beeld is.
  useEffect(() => {
    const onScroll = () => setVoorbijHero(window.scrollY > 640);
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
      {/* Navigatie: marineblauwe balk                                      */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#1A2D63] text-[#FDFBF7]">
        <div className={`${CONTAINER} flex h-16 items-center justify-between gap-6`}>
          <a href="#top" className="flex shrink-0 items-center" aria-label="Finit Solutions, naar boven">
            <Image src="/finit-logo-white.svg" alt="Finit Solutions" width={424} height={120} priority className="h-7 w-auto" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hoofdnavigatie">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-[0.9375rem] font-medium text-[#FDFBF7]/75 transition-colors hover:text-[#FDFBF7]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LesreeksKnop location="nav" size="md" variant="cream" className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-[8px] text-[#FDFBF7] transition-colors hover:bg-white/10 lg:hidden"
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
          <div className={`${CONTAINER} flex min-h-full flex-col pb-8 pt-2`}>
            <nav className="border-b border-[#E8E6DC]" aria-label="Mobiele navigatie">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="fs-display block border-t border-[#E8E6DC] py-4 text-[1.5rem] font-semibold text-[#1A2D63]">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <LesreeksKnop location="mobile_menu" className="w-full" />
              <button type="button" onClick={() => openGesprek("mobile_menu")} className="fs-btn fs-btn--secondary fs-btn--lg w-full">
                {SLOT.gesprekKnop}
              </button>
            </div>
            <a href={PHONE_LINK} className="mt-8 text-center text-[1rem] text-[#57514A]">
              of bel ons op {PHONE_NUMBER}
            </a>
          </div>
        </div>
      )}

      <main id="top" className="scroll-mt-16">
        {/* -------------------------------------------------------------- */}
        {/* 1. Hero                                                        */}
        {/* -------------------------------------------------------------- */}
        <section className={`${CONTAINER} pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:items-center lg:gap-12">
            <div>
              <h1 className="fs-display text-balance text-[2.5rem] font-bold leading-[1.02] text-[#1A2D63] sm:text-[3rem] lg:text-[2.9rem] xl:text-[3.3rem]">
                {HERO.h1.map((regel) => (
                  <span key={regel} className="block">
                    {regel}
                  </span>
                ))}
              </h1>
              <p className={`mt-6 max-w-[34rem] ${LEAD}`}>{HERO.sub}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LesreeksKnop location="hero" className="w-full sm:w-auto" />
                <button type="button" onClick={() => openGesprek("hero")} className="fs-btn fs-btn--secondary fs-btn--lg w-full sm:w-auto">
                  {SLOT.gesprekKnop}
                </button>
              </div>

              <ul className="mt-7 space-y-2.5">
                {HERO.punten.map((punt) => (
                  <li key={punt} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-[#57514A]">
                    <Vinkje />
                    <span>{punt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                <span className="text-[0.8125rem] font-medium text-[#94908A]">{HERO.ondersteund}</span>
                <Image src="/SI @KBC Black (2).png" alt="Start it @KBC" width={400} height={120} className="fs-logo h-6 w-auto" />
                <Image src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" width={400} height={120} className="fs-logo h-6 w-auto" />
              </div>
            </div>

            <Brein3D />
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 2. Herken jij dit?                                             */}
        {/* -------------------------------------------------------------- */}
        <section className="border-t border-[#E8E6DC]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="max-w-[46rem]">
              <h2 className={H2}>{HERKEN.h2}</h2>
              <p className={`mt-4 ${LEAD}`}>{HERKEN.intro}</p>
              <ul className="mt-10 border-t border-[#E8E6DC]">
                {HERKEN.items.map((item) => (
                  <li key={item} className="flex items-start gap-4 border-b border-[#E8E6DC] py-4 text-[1.0625rem] leading-[1.55] text-[#2A2620] sm:text-[1.125rem]">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A2D63]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="fs-display mt-10 text-[1.6rem] font-semibold leading-tight text-[#1A2D63] sm:text-[1.9rem]">{HERKEN.overgang}</p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 3. Wij zorgen ervoor dat AI jouw werk overneemt                */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-[#F5F3EC]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
              <div className="max-w-[40rem]">
                <h2 className={H2}>{OPLOSSING.h2}</h2>
                <p className={`mt-5 ${LEAD}`}>{OPLOSSING.intro}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[OPLOSSING.zonder, OPLOSSING.met].map((blok, i) => (
                  <div key={blok.label} className={`rounded-[12px] border p-5 sm:p-6 ${i === 1 ? "border-[#1A2D63] bg-[#1A2D63] text-[#FDFBF7]" : "border-[#D8D5C7] bg-[#FFFEFA] text-[#1A2D63]"}`}>
                    <p className={`text-[0.8125rem] font-medium ${i === 1 ? "text-[#FDFBF7]/70" : "text-[#76706A]"}`}>{blok.label}</p>
                    <p className="fs-display mt-2 text-[2.75rem] font-bold leading-none sm:text-[3.25rem]">{blok.getal}</p>
                    <p className={`mt-2 text-[0.875rem] leading-[1.4] ${i === 1 ? "text-[#FDFBF7]/75" : "text-[#57514A]"}`}>{blok.eenheid}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
              {OPLOSSING.kaarten.map((k) => (
                <div key={k.titel} className="fs-paper rounded-[12px] border border-[#E8E6DC] bg-[#FFFEFA] p-6 sm:p-7">
                  <h3 className="fs-display fs-display-sm text-[1.35rem] font-semibold leading-[1.15] text-[#1A2D63]">{k.titel}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.6] text-[#57514A]">{k.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[12px] border border-dashed border-[#B8B5A6] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-7">
              <div>
                <h3 className="fs-display fs-display-sm text-[1.25rem] font-semibold leading-snug text-[#1A2D63]">{OPLOSSING.breedteTitel}</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#57514A]">{OPLOSSING.breedteBody}</p>
              </div>
              <LesreeksKnop location="breedte" className="mt-5 w-full sm:mt-0 sm:w-auto sm:shrink-0" />
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="text-[0.8125rem] font-medium text-[#76706A]">{OPLOSSING.koppelingen}</span>
              {LOGOS.map((l) => (
                <Image key={l.naam} src={l.src} alt={l.naam} title={l.naam} width={120} height={40} className="fs-logo-kleur h-6 w-auto" />
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 4. Hoe wij AI voor jou laten werken + prijzen                  */}
        {/* -------------------------------------------------------------- */}
        <section id="hoe-het-werkt" className="scroll-mt-16">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="max-w-[40rem]">
              <h2 className={H2}>{HOE.h2}</h2>
              <p className={`mt-5 ${LEAD}`}>{HOE.intro}</p>
            </div>

            <ol id="prijzen" className="mt-12 grid scroll-mt-24 gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
              {HOE.stappen.map((stap, i) => {
                const uitgelicht = i === 0;
                return (
                  <li
                    key={stap.nummer}
                    className={
                      uitgelicht
                        ? "fs-paper flex flex-col rounded-[12px] border border-[#E8E6DC] bg-[#FFFEFA] p-6 sm:p-7"
                        : "flex flex-col border-t border-[#E8E6DC] pt-6 md:pt-7"
                    }
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="fs-display text-[2rem] font-bold leading-none text-[#1A2D63]">{stap.nummer}</span>
                      <span className="text-[0.8125rem] font-medium text-[#76706A]">{stap.tijd}</span>
                    </div>
                    <h3 className="fs-display fs-display-sm mt-4 text-[1.45rem] font-semibold leading-[1.12] text-[#1A2D63]">{stap.titel}</h3>

                    <ul className="mt-5 space-y-2.5">
                      {stap.punten.map((punt) => (
                        <li key={punt} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-[#2A2620]">
                          <Vinkje />
                          <span>{punt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 border-t border-[#E8E6DC] pt-5">
                      <p className="fs-display text-[2.5rem] font-bold leading-none text-[#1A2D63]">{stap.prijs}</p>
                      <p className="mt-2 text-[0.9375rem] leading-[1.5] text-[#57514A]">{stap.prijsDetail}</p>
                    </div>

                    {stap.cta && (
                      <div className="mt-6">
                        <LesreeksKnop location="stappen" className="w-full" />
                        {stap.ctaNoot && <p className="mt-3 text-[0.875rem] leading-[1.5] text-[#76706A]">{stap.ctaNoot}</p>}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="mt-14 grid gap-8 rounded-[12px] bg-[#F5F3EC] p-6 sm:p-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
              <div>
                <h3 className="fs-display fs-display-sm text-[1.5rem] font-semibold leading-snug text-[#1A2D63]">{HOE.aanpak.h3}</h3>
                <p className="mt-4 text-[1rem] leading-[1.65] text-[#2A2620] sm:text-[1.0625rem]">{HOE.aanpak.p1}</p>
                <p className="mt-3 text-[1rem] leading-[1.65] text-[#2A2620] sm:text-[1.0625rem]">{HOE.aanpak.p2}</p>
              </div>
              <div className="lg:pt-1">
                <p className="text-[0.9375rem] font-medium text-[#76706A]">{HOE.aanpak.lijstTitel}</p>
                <ul className="mt-3 space-y-2.5">
                  {HOE.aanpak.lijst.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[1rem] leading-[1.5] text-[#2A2620]">
                      <Vinkje />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. Resultaten uit de praktijk, marineblauwe band                */}
        {/* -------------------------------------------------------------- */}
        <section id="resultaten" className="scroll-mt-16 bg-[#1A2D63] text-[#FDFBF7]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="max-w-[40rem]">
              <h2 className="fs-display text-balance text-[1.9rem] font-bold leading-[1.05] sm:text-[2.3rem] lg:text-[2.7rem]">{RESULTATEN.h2}</h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.6] text-[#FDFBF7]/75 sm:text-[1.125rem]">{RESULTATEN.intro}</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
              {RESULTATEN.cases.map((c) => (
                <div key={c.sector} className="rounded-[12px] border border-white/10 bg-white/[0.06] p-6 sm:p-7">
                  <h3 className="fs-display fs-display-sm text-[1.35rem] font-semibold leading-[1.15]">{c.sector}</h3>
                  <dl className="mt-5 space-y-4 text-[0.9375rem] leading-[1.6]">
                    <div>
                      <dt className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-[#FDFBF7]/55">{RESULTATEN.labels.uitdaging}</dt>
                      <dd className="mt-1 text-[#FDFBF7]/85">{c.uitdaging}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-[#FDFBF7]/55">{RESULTATEN.labels.aanpak}</dt>
                      <dd className="mt-1 text-[#FDFBF7]/85">{c.aanpak}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-[#FDFBF7]/55">{RESULTATEN.labels.resultaat}</dt>
                      <dd className="mt-2">
                        <ul className="space-y-2">
                          {c.resultaat.map((r) => (
                            <li key={r} className="flex items-start gap-3 text-[#FDFBF7]">
                              <Vinkje donker />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start gap-5 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:gap-7">
              <div
                className="h-20 w-20 shrink-0 rounded-full border-2 border-[#FDFBF7]/20 sm:h-24 sm:w-24"
                role="img"
                aria-label={RESULTATEN.naam}
                style={{ backgroundImage: `url('${RESULTATEN.foto}')`, backgroundSize: "150%", backgroundPosition: "center 25%", backgroundRepeat: "no-repeat" }}
              />
              <div>
                <blockquote className="text-[1.125rem] leading-[1.5] sm:text-[1.25rem]">&ldquo;{RESULTATEN.quote}&rdquo;</blockquote>
                <p className="mt-2 text-[0.9375rem] text-[#FDFBF7]/65">{RESULTATEN.naam}</p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 6. Waarom bedrijven voor Finit kiezen                          */}
        {/* -------------------------------------------------------------- */}
        <section className="border-b border-[#E8E6DC]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="max-w-[40rem]">
              <h2 className={H2}>{WAAROM.h2}</h2>
              <p className={`mt-4 ${LEAD}`}>{WAAROM.intro}</p>
            </div>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {WAAROM.pijlers.map((p) => (
                <div key={p.titel} className="border-t border-[#E8E6DC] pt-5">
                  <h3 className="fs-display fs-display-sm text-[1.2rem] font-semibold leading-snug text-[#1A2D63]">{p.titel}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#57514A]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 7. Veelgestelde vragen                                         */}
        {/* -------------------------------------------------------------- */}
        <section id="faq" className="scroll-mt-16">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="max-w-[46rem]">
              <h2 className={H2}>{VRAGEN.h2}</h2>
              <div className="mt-8 border-t border-[#E8E6DC]">
                {VRAGEN.items.map((item) => (
                  <details key={item.q} className="fs-details border-b border-[#E8E6DC]">
                    <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium leading-snug text-[#1A2D63] sm:text-[1.125rem]">
                      <span>{item.q}</span>
                      <span className="fs-plus mt-1 shrink-0 text-[#76706A]" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <FaqAntwoord blokken={item.a} />
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 8. Slot                                                        */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-[#F5F3EC]">
          <div className={`${CONTAINER} py-16 sm:py-24`}>
            <div className="fs-paper mx-auto max-w-[46rem] rounded-[14px] border border-[#E8E6DC] bg-[#FFFEFA] px-6 py-10 text-center sm:px-12 sm:py-14">
              <h2 className="fs-display text-balance text-[2rem] font-bold leading-[1.05] text-[#1A2D63] sm:text-[2.5rem] lg:text-[2.8rem]">{SLOT.h2}</h2>
              <p className={`mx-auto mt-5 max-w-[36rem] ${LEAD}`}>{SLOT.p}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <LesreeksKnop location="slot" className="w-full sm:w-auto" />
                <button type="button" onClick={() => openGesprek("slot")} className="fs-btn fs-btn--secondary fs-btn--lg w-full sm:w-auto">
                  {SLOT.gesprekKnop}
                </button>
              </div>
              <p className="mt-5 text-[0.875rem] text-[#76706A]">{SLOT.micro}</p>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-[#1A2D63] pb-24 text-[#FDFBF7]/70 sm:pb-0">
        <div className={`${CONTAINER} py-10 sm:py-12`}>
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="text-[0.9375rem] leading-[1.7]">
              <p className="font-medium text-[#FDFBF7]">{FOOTER.bedrijf}</p>
              <p>{FOOTER.plaats}</p>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-[#FDFBF7]">{CONTACT_EMAIL}</a>
              </p>
              <p>
                <a href={PHONE_LINK} className="transition-colors hover:text-[#FDFBF7]">{PHONE_NUMBER}</a>
                <span className="text-[#FDFBF7]/45"> · {FOOTER.uren}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[0.9375rem] leading-[1.7] sm:grid-cols-[auto_auto]">
              <div className="flex flex-col">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#FDFBF7]">Instagram</a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#FDFBF7]">LinkedIn</a>
              </div>
              <div className="flex flex-col">
                {FOOTER.links.map((l) => (
                  <a key={l.href} href={l.href} className="transition-colors hover:text-[#FDFBF7]">{l.label}</a>
                ))}
                <button type="button" onClick={openSettings} className="text-left transition-colors hover:text-[#FDFBF7]">
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

      {/* Sticky knop op mobiel, zodra de hero voorbij is */}
      <div
        className="fs-sticky fixed inset-x-0 bottom-0 z-20 border-t border-[#E8E6DC] bg-[#FDFBF7] px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:hidden"
        data-zichtbaar={voorbijHero && !menuOpen && !formOpen}
        aria-hidden={!voorbijHero}
      >
        <LesreeksKnop location="sticky" className="w-full" />
      </div>

      <GesprekForm open={formOpen} onClose={closeGesprek} />
    </div>
  );
}
