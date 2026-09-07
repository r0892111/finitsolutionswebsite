"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Calendar, ChevronDown, ChevronRight, Euro, KeyRound, Layers, Linkedin, Mail, Menu, Phone, Plus, Workflow, X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { ContactFormPopup, useContactForm } from "@/components/contact-form-popup";
import { useConsent } from "@/contexts/consent-context";
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, SKOOL_URL, VAT_NUMBER } from "@/lib/finit-links";
import { Brein3D } from "./brein-3d";
import {
  CTA_GESPREK_KORT,
  CTA_KENNISMAKING,
  CTA_LESREEKS,
  FOOTER,
  HERKEN,
  HERO,
  HOE,
  LOGOS,
  MENU,
  NAV_DESKTOP,
  NAV_MOBIEL,
  OPLOSSING,
  PRODUCTEN,
  RESULTATEN,
  SLOT,
  VRAGEN,
  WAAROM,
  type FaqBlok,
} from "./copy";

/**
 * De homepage, in de opbouw van de vorige homepage en de landingspagina's:
 * hero → herken jij dit → AI neemt je werk over → hoe wij werken (+ prijzen)
 * → resultaten → waarom Finit → vragen → contact. Alle tekst staat in ./copy.ts.
 *
 * Navigatie en mobiel menu: dezelfde opbouw en tekst als de vorige homepage.
 * Het formulier is het bestaande ContactFormPopup (zelfde n8n-flow, zelfde
 * velden, zelfde /bedankt-pagina). De lesreeks-knop gaat rechtstreeks naar Skool.
 */

const CONTAINER = "mx-auto w-full max-w-[74rem] px-5 sm:px-8";
const H2 = "hp-display text-balance text-[2rem] font-bold leading-[1.06] text-[#1A2D63] sm:text-[2.5rem] lg:text-[2.9rem]";
const LEAD = "text-[1.0625rem] leading-[1.65] text-[#3D4766] sm:text-[1.125rem]";
const H3 = "hp-display hp-display-sm text-[1.3rem] font-semibold leading-[1.2] text-[#1A2D63]";
/** Gecentreerde sectiekop met intro. */
const KOP = "mx-auto max-w-[44rem] text-center";
/** Eén icoon per pijler in "Waarom Finit", in de volgorde van WAAROM.pijlers. */
const PIJLER_ICONEN = [Layers, Workflow, Euro, KeyRound];

/** De handgetekende streep onder het laatste woord van een kop, zoals op de vorige site. */
function Onder({ children }: { children: React.ReactNode }) {
  return (
    <span className="hp-onder">
      {children}
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M3 14 Q40 4 100 12 Q160 18 197 8" stroke="#1A2D63" strokeOpacity="0.15" strokeWidth="10" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Vinkje({ donker = false }: { donker?: boolean }) {
  return (
    <span className={`hp-check mt-0.5 ${donker ? "hp-check--donker" : ""}`} aria-hidden="true">
      <svg width="11" height="9" viewBox="0 0 11 9">
        <path d="M1 4.5l3 3L10 1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const trackLesreeks = (location: string) => pushEvent("cta_click", { cta_label: "lesreeks", location });

function LesreeksKnop({ location, size = "lg", className = "", variant = "primary" }: { location: string; size?: "lg" | "md"; className?: string; variant?: "primary" | "light" | "secondary" }) {
  return (
    <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackLesreeks(location)} className={`hp-btn hp-btn--${variant} hp-btn--${size} ${className}`}>
      {CTA_LESREEKS}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function FaqAntwoord({ blokken }: { blokken: FaqBlok[] }) {
  return (
    <div className="space-y-3 pb-6 pr-8 text-[1rem] leading-[1.65] text-[#3D4766] sm:pr-12">
      {blokken.map((b, i) => {
        if (b.t === "h") return <p key={i} className="pt-1 font-semibold text-[#1A2D63]">{b.tekst}</p>;
        if (b.t === "res") return <p key={i} className="font-medium text-[#1A2D63]">{b.tekst}</p>;
        if (b.t === "list")
          return (
            <ul key={i} className="space-y-2">
              {b.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A2D63]" aria-hidden="true" />
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
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOpen, openForm, closeForm } = useContactForm();
  const { openSettings } = useConsent();

  // Navigatiebalk: doorzichtig bovenaan, wit met wazige rand zodra je scrolt (zoals vroeger).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrollProgress(y <= 100 ? 0 : y >= 300 ? 1 : (y - 100) / 200);
      let current = "";
      for (const item of NAV_DESKTOP) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) current = item.id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Het mobiele menu blokkeert het scrollen en sluit zichzelf op een breed scherm.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    const onResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = ""; window.removeEventListener("resize", onResize); };
  }, [mobileMenuOpen]);

  const navigateToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      if (id === "hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const gesprek = useCallback((label: string, location: string) => {
    setMobileMenuOpen(false);
    openForm();
    pushEvent("cta_click", { cta_label: label, location });
  }, [openForm]);

  const GesprekKnop = ({ label = CTA_KENNISMAKING, ctaLabel, location, variant = "primary", size = "lg", className = "" }: { label?: string; ctaLabel: string; location: string; variant?: "primary" | "secondary" | "light"; size?: "lg" | "md"; className?: string }) => (
    <button type="button" onClick={() => gesprek(ctaLabel, location)} className={`hp-btn hp-btn--${variant} hp-btn--${size} ${className}`}>
      <Calendar className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );

  const navBg = navScrollProgress > 0 ? `rgba(255,255,255,${0.86 * navScrollProgress})` : "transparent";

  return (
    <div className="hp min-h-screen overflow-x-hidden bg-white text-[#3D4766]">
      {/* ---------------------------------------------------------------- */}
      {/* Navigatie (opbouw van de vorige homepage)                          */}
      {/* ---------------------------------------------------------------- */}
      <nav
        className="fixed top-0 z-40 w-full"
        style={{
          background: navBg,
          backdropFilter: navScrollProgress > 0 ? `blur(${14 * navScrollProgress}px)` : "none",
          WebkitBackdropFilter: navScrollProgress > 0 ? `blur(${14 * navScrollProgress}px)` : "none",
          borderBottom: `1px solid rgba(26, 45, 99, ${0.1 * navScrollProgress})`,
          transition: "background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s",
        }}
      >
        <div
          className="relative mx-auto flex max-w-[93.33rem] items-center justify-between px-4 sm:px-6"
          style={{ paddingTop: `${12 + (1 - navScrollProgress) * 10}px`, paddingBottom: `${12 + (1 - navScrollProgress) * 10}px`, transition: "padding 0.3s" }}
        >
          <button type="button" onClick={() => navigateToSection("hero")} className="flex shrink-0 items-center" aria-label="Finit Solutions, naar boven">
            <Image
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              width={1698}
              height={480}
              priority
              className="w-auto object-contain"
              style={{ height: `${28 + (1 - navScrollProgress) * 10}px`, transition: "height 0.3s" }}
            />
          </button>

          {/* Desktop: Producten + secties */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            <div className="group relative">
              <button type="button" className="flex items-center gap-1 text-[0.9375rem] font-medium text-[#1A2D63]/80 transition-colors hover:text-[#1A2D63]">
                {PRODUCTEN.label}
                <ChevronDown className="mt-0.5 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
              </button>
              <div className="invisible absolute left-0 top-full translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="hp-card w-[32rem] p-5">
                  <a href={PRODUCTEN.voicelink.url} target="_blank" rel="noopener noreferrer" className="group/item flex items-center gap-5">
                    <div className="h-36 w-24 shrink-0 overflow-hidden rounded-xl border border-[#E3E7EF] bg-[#F5F7FB]">
                      <Image src="/phone-mock-menu.webp" alt="VoiceLink WhatsApp-mockup" width={240} height={298} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="hp-display hp-display-sm text-[1.25rem] font-semibold text-[#1A2D63]">{PRODUCTEN.voicelink.naam}</span>
                        <ArrowRight className="h-4 w-4 text-[#1A2D63]/40 transition-all group-hover/item:translate-x-1 group-hover/item:text-[#1A2D63]" aria-hidden="true" />
                      </div>
                      <p className="text-[0.9375rem] leading-relaxed text-[#3D4766]">{PRODUCTEN.voicelink.tekst}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {NAV_DESKTOP.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToSection(item.id)}
                className={`text-[0.9375rem] font-medium transition-colors ${activeSection === item.id ? "text-[#1A2D63]" : "text-[#1A2D63]/70 hover:text-[#1A2D63]"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <GesprekKnop ctaLabel="nav_calendly" location="nav" size="md" />
          </div>

          {/* Mobiel: knop verschijnt bij het scrollen + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => gesprek("mobile_nav_calendly", "mobile_nav")}
              className="hp-btn hp-btn--primary hp-btn--sm transition-opacity duration-300"
              style={{ opacity: mobileMenuOpen ? 0 : navScrollProgress, pointerEvents: !mobileMenuOpen && navScrollProgress > 0.5 ? "auto" : "none" }}
              tabIndex={!mobileMenuOpen && navScrollProgress > 0.5 ? 0 : -1}
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>{CTA_GESPREK_KORT}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-12 w-12 items-center justify-center rounded-full text-[#1A2D63] transition-colors hover:bg-[#1A2D63]/5"
              aria-label={mobileMenuOpen ? MENU.sluiten : MENU.openen}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-8 w-8" strokeWidth={1.75} /> : <Menu className="h-8 w-8" strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobiel menu, schermvullend (opbouw van de vorige homepage) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 flex h-full flex-col overflow-y-auto overscroll-contain px-6 pb-8 pt-24">
            <div className="mb-8 flex flex-col gap-4">
              <GesprekKnop ctaLabel="mobile_nav_calendly" location="mobile_nav" className="w-full" />
              <div className="hp-card flex flex-col items-center gap-2 px-6 py-5 text-center">
                <p className="text-xs uppercase tracking-widest text-[#6C7590]">{MENU.belTitel}</p>
                <a
                  href={FOOTER.telefoons[0].link}
                  className="hp-display text-[1.9rem] font-semibold leading-tight text-[#1A2D63] underline decoration-[#1A2D63]/20 underline-offset-4 transition-colors hover:text-[#2A4488] hover:decoration-[#1A2D63]/60"
                  onClick={() => pushEvent("contact_click", { method: "phone", location: "mobile_menu" })}
                >
                  {FOOTER.telefoons[0].nummer}
                </a>
                <p className="text-sm text-[#6C7590]">{MENU.uren}</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="border-t border-[#1A2D63]/10">
                {NAV_MOBIEL.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToSection(item.id)}
                    className="flex w-full items-center justify-between border-b border-[#1A2D63]/10 py-4 text-[#1A2D63] transition-colors hover:text-[#475D8F]"
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                    <ChevronRight className="h-5 w-5 text-[#1A2D63]/30" aria-hidden="true" />
                  </button>
                ))}
                <a
                  href={PRODUCTEN.voicelink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-between border-b border-[#1A2D63]/10 py-4 text-[#1A2D63] transition-colors hover:text-[#475D8F]"
                >
                  <span className="text-lg font-medium">{PRODUCTEN.voicelink.naam}</span>
                  <ChevronRight className="h-5 w-5 text-[#1A2D63]/30" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4 text-sm text-[#1A2D63]/60">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-[#1A2D63]">{CONTACT_EMAIL}</a>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* -------------------------------------------------------------- */}
        {/* 1. Hero                                                        */}
        {/* -------------------------------------------------------------- */}
        <header id="hero" className={`${CONTAINER} pb-12 pt-32 sm:pt-36 lg:pb-10 lg:pt-32`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-10">
            <div className="hp-rise">
              <h1 className="hp-display text-balance text-[2.15rem] font-bold leading-[1.02] text-[#1A2D63] min-[400px]:text-[2.4rem] sm:text-[3.2rem] lg:text-[3.1rem] xl:text-[3.6rem]">
                <span className="block">{HERO.h1[0]}</span>
                <Onder>{HERO.h1[1]}</Onder>
              </h1>
              <p className={`mt-6 max-w-[36rem] ${LEAD}`}>{HERO.sub}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LesreeksKnop location="hero" className="w-full sm:w-auto" />
                <GesprekKnop ctaLabel="hero_calendly" location="hero" variant="secondary" className="w-full sm:w-auto" />
              </div>

              <ul className="mt-7 space-y-2.5">
                {HERO.punten.map((punt) => (
                  <li key={punt} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-[#3D4766]">
                    <Vinkje />
                    <span>{punt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
                <span className="text-[0.8125rem] font-medium text-[#6C7590]">{HERO.ondersteund}</span>
                <Image src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" width={400} height={120} className="hp-logo h-6 w-auto" />
                <Image src="/SI @KBC Black (2).png" alt="Start it @KBC" width={400} height={120} className="hp-logo h-6 w-auto" />
              </div>
            </div>

            <div className="mx-auto w-full max-w-[26rem] lg:max-w-none">
              <Brein3D />
            </div>
          </div>
        </header>

        {/* -------------------------------------------------------------- */}
        {/* 2. Herken jij dit?                                             */}
        {/* -------------------------------------------------------------- */}
        <section id="recognition" className="scroll-mt-20">
          <div className={`${CONTAINER} pb-20 pt-12 sm:pb-28 sm:pt-14 lg:pt-10`}>
            <div className={KOP}>
              <h2 className={H2}>Herken jij <Onder>dit?</Onder></h2>
              <p className={`mt-4 ${LEAD}`}>{HERKEN.intro}</p>
            </div>
            <ol className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {HERKEN.items.map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 border-t border-[#E3E7EF] pt-5">
                  <span className="hp-display w-8 shrink-0 text-[1.5rem] font-bold leading-none text-[#1A2D63]/45">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[1.0625rem] leading-[1.55] text-[#1A2D63] sm:text-[1.125rem]">{item}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 flex flex-col items-center gap-6 text-center">
              <p className="hp-display text-[1.7rem] font-semibold leading-tight text-[#1A2D63] sm:text-[2rem]">{HERKEN.overgang}</p>
              <GesprekKnop ctaLabel="recognition_calendly" location="recognition" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 3. Wij zorgen ervoor dat AI jouw werk overneemt                */}
        {/* -------------------------------------------------------------- */}
        <section id="use-cases" className="scroll-mt-20 bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-20 sm:py-28`}>
            <div className={KOP}>
              <h2 className={H2}>{OPLOSSING.h2[0]} <Onder>{OPLOSSING.h2[1]}</Onder></h2>
              <p className={`mt-5 ${LEAD}`}>{OPLOSSING.intro}</p>
            </div>
            <div className="mx-auto mt-10 max-w-[34rem]">
              <div className="flex items-stretch gap-3 sm:gap-4">
                <div className="hp-card flex-1 p-5 sm:p-6">
                  <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-[#6C7590]">{OPLOSSING.zonder.label}</p>
                  <p className="hp-display mt-2 text-[2.75rem] font-bold leading-none text-[#1A2D63] sm:text-[3.25rem]">{OPLOSSING.zonder.getal}</p>
                  <p className="mt-2 text-[0.875rem] leading-[1.4] text-[#3D4766]">{OPLOSSING.zonder.eenheid}</p>
                </div>
                <div className="flex items-center text-[#1A2D63]/50" aria-hidden="true">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <div className="flex-1 rounded-[20px] bg-[#1A2D63] p-5 text-white shadow-[0_16px_40px_-20px_rgba(26,45,99,0.6)] sm:p-6">
                  <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-white/70">{OPLOSSING.met.label}</p>
                  <p className="hp-display mt-2 text-[2.75rem] font-bold leading-none sm:text-[3.25rem]">{OPLOSSING.met.getal}</p>
                  <p className="mt-2 text-[0.875rem] leading-[1.4] text-white/75">{OPLOSSING.met.eenheid}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
              {OPLOSSING.kaarten.map((k) => (
                <div key={k.titel} className="hp-card p-6 sm:p-7">
                  <h3 className={H3}>{k.titel}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.65] text-[#3D4766]">{k.body}</p>
                </div>
              ))}
            </div>

            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLesreeks("breedte")}
              className="group mt-6 flex w-full items-center gap-5 rounded-[20px] border border-dashed border-[#1A2D63]/30 p-6 text-left transition-colors hover:border-[#1A2D63]/60 hover:bg-white sm:p-7"
            >
              <span className="hp-display hidden shrink-0 text-[2.5rem] font-bold leading-none text-[#1A2D63]/45 sm:block" aria-hidden="true">+</span>
              <span className="min-w-0 flex-1">
                <span className={`block ${H3}`}>{OPLOSSING.breedteTitel}</span>
                <span className="mt-1.5 block text-[0.9375rem] leading-[1.6] text-[#3D4766]">{OPLOSSING.breedteBody}</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-[#1A2D63]/50 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>

            <div className="mt-14 text-center">
              <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-[#6C7590]">{OPLOSSING.koppelingen}</p>
              <ul className="mx-auto mt-5 flex max-w-[58rem] flex-wrap justify-center gap-2.5">
                {LOGOS.map((l) => (
                  <li key={l.naam} className="hp-chip">
                    <Image src={l.src} alt={l.naam} width={48} height={48} className={l.woordmerk ? "h-5 w-auto" : "h-5 w-5 object-contain"} />
                    {!l.woordmerk && <span>{l.naam}</span>}
                  </li>
                ))}
                <li className="hp-chip hp-chip--plus">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>{OPLOSSING.koppelingenPlus}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 4. Hoe wij AI voor jou laten werken + prijzen + het AI-brein   */}
        {/* -------------------------------------------------------------- */}
        <section id="aanpak" className="scroll-mt-20">
          <div className={`${CONTAINER} py-20 sm:py-28`}>
            <div className={KOP}>
              <h2 className={H2}>{HOE.h2[0]} <Onder>{HOE.h2[1]}</Onder></h2>
              <p className={`mt-5 ${LEAD}`}>{HOE.intro}</p>
            </div>

            <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
              {HOE.stappen.map((stap, i) => (
                <li key={stap.nummer} className={`hp-card flex flex-col p-6 sm:p-7 ${i === 0 ? "hp-card--accent" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="hp-display text-[1.75rem] font-bold leading-none text-[#1A2D63]/45">{stap.nummer}</span>
                    <span className="flex flex-wrap justify-end gap-1.5">
                      <span className="rounded-full bg-[#E6ECF9] px-3 py-1 text-[0.75rem] font-medium text-[#1A2D63]">{stap.wie}</span>
                      <span className="rounded-full border border-[#E3E7EF] px-3 py-1 text-[0.75rem] font-medium text-[#6C7590]">{stap.tijd}</span>
                    </span>
                  </div>
                  <h3 className={`mt-4 ${H3} text-[1.45rem]`}>{stap.titel}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#3D4766]">{stap.intro}</p>
                  <ul className="mt-5 space-y-2.5">
                    {stap.punten.map((punt) => (
                      <li key={punt} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-[#3D4766]">
                        <Vinkje />
                        <span>{punt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-[#E3E7EF] pt-5">
                    <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-[#6C7590]">{stap.prijsLabel}</p>
                    <p className="hp-display mt-1 text-[2.25rem] font-bold leading-none text-[#1A2D63]">{stap.prijs}</p>
                    <p className="mt-2 text-[0.9rem] leading-[1.5] text-[#3D4766]">{stap.prijsDetail}</p>
                  </div>
                  {stap.cta && (
                    <div className="mt-6">
                      <LesreeksKnop location="stappen" className="w-full" />
                      {stap.ctaNoot && <p className="mt-3 text-center text-[0.8125rem] text-[#6C7590]">{stap.ctaNoot}</p>}
                    </div>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-14 grid gap-8 rounded-[24px] bg-[#F5F7FB] p-7 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
              <div>
                <h3 className={`${H3} text-[1.5rem]`}>{HOE.fundament.h3}</h3>
                {HOE.fundament.alineas.map((a) => (
                  <p key={a} className="mt-4 text-[1rem] leading-[1.7] text-[#3D4766] sm:text-[1.0625rem]">{a}</p>
                ))}
              </div>
              <div className="lg:pt-1">
                <p className="text-[0.9375rem] font-medium text-[#1A2D63]">{HOE.fundament.lijstTitel}</p>
                <ul className="mt-4 space-y-2.5">
                  {HOE.fundament.lijst.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[1rem] leading-[1.5] text-[#3D4766]">
                      <Vinkje />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-3 border-l-2 border-[#1A2D63]/40 pl-4">
                  {HOE.fundament.eerlijk.map((a, i) => (
                    <p key={a} className={`text-[0.9375rem] leading-[1.6] ${i === 0 ? "font-medium text-[#1A2D63]" : "text-[#3D4766]"}`}>{a}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <GesprekKnop ctaLabel="aanpak_calendly" location="aanpak" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. Resultaten uit de praktijk, marineblauwe band                */}
        {/* -------------------------------------------------------------- */}
        <section id="resultaten" className="scroll-mt-20 bg-[#1A2D63] text-white">
          <div className={`${CONTAINER} py-20 sm:py-28`}>
            <div className={KOP}>
              <h2 className="hp-display text-balance text-[2rem] font-bold leading-[1.06] sm:text-[2.5rem] lg:text-[2.9rem]">{RESULTATEN.h2}</h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.65] text-white/75 sm:text-[1.125rem]">{RESULTATEN.intro}</p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
              {RESULTATEN.cases.map((c) => (
                <div key={c.sector} className="rounded-[20px] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
                  <h3 className="hp-display hp-display-sm text-[1.4rem] font-semibold leading-[1.2]">{c.sector}</h3>
                  <dl className="mt-6 space-y-5 text-[0.9375rem] leading-[1.65]">
                    <div>
                      <dt className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/65">{RESULTATEN.labels.uitdaging}</dt>
                      <dd className="mt-1.5 text-white/90">{c.uitdaging}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/65">{RESULTATEN.labels.aanpak}</dt>
                      <dd className="mt-1.5 text-white/90">{c.aanpak}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/65">{RESULTATEN.labels.resultaat}</dt>
                      <dd className="mt-2">
                        <ul className="space-y-2">
                          {c.resultaat.map((r) => (
                            <li key={r} className="flex items-start gap-3 text-white">
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

            <div className="mt-12 flex flex-col items-start gap-6 border-t border-white/10 pt-12 sm:flex-row sm:items-center sm:gap-8">
              <div
                className="h-24 w-24 shrink-0 rounded-full border-2 border-white/20 sm:h-28 sm:w-28"
                role="img"
                aria-label={RESULTATEN.naam}
                style={{ backgroundImage: `url('${RESULTATEN.foto}')`, backgroundSize: "150%", backgroundPosition: "center 25%", backgroundRepeat: "no-repeat" }}
              />
              <div>
                <blockquote className="hp-display hp-display-sm text-[1.35rem] font-medium leading-[1.4] sm:text-[1.6rem]">&ldquo;{RESULTATEN.quote}&rdquo;</blockquote>
                <p className="mt-3 text-[0.9375rem] text-white/75">{RESULTATEN.naam}</p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 6. Waarom bedrijven voor Finit kiezen                          */}
        {/* -------------------------------------------------------------- */}
        <section id="waarom" className="scroll-mt-20">
          <div className={`${CONTAINER} py-20 sm:py-28`}>
            <div className={KOP}>
              <h2 className={H2}>{WAAROM.h2}</h2>
              <p className={`mt-4 ${LEAD}`}>{WAAROM.intro}</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {WAAROM.pijlers.map((p, i) => {
                const Icoon = PIJLER_ICONEN[i] ?? Layers;
                return (
                  <div key={p.titel} className="hp-card p-6 sm:p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E6ECF9] text-[#1A2D63]" aria-hidden="true">
                      <Icoon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className={`mt-5 ${H3} text-[1.2rem]`}>{p.titel}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-[#3D4766]">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 7. Veelgestelde vragen                                         */}
        {/* -------------------------------------------------------------- */}
        <section id="faq" className="scroll-mt-20 bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-20 sm:py-28`}>
            <div className="mx-auto max-w-[48rem]">
              <h2 className={`${H2} text-center`}>{VRAGEN.h2}</h2>
              <div className="hp-card mt-10 px-6 sm:px-8">
                {VRAGEN.items.map((item, i) => (
                  <details key={item.q} className={`hp-details ${i > 0 ? "border-t border-[#E3E7EF]" : ""}`}>
                    <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium leading-snug text-[#1A2D63] sm:text-[1.125rem]">
                      <span>{item.q}</span>
                      <span className="hp-plus mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6ECF9] text-[#1A2D63]" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 12 12">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
        {/* 8. Contact                                                     */}
        {/* -------------------------------------------------------------- */}
        <section id="contact" className="scroll-mt-20">
          <div className={`${CONTAINER} py-20 sm:py-28`}>
            <div className="mx-auto max-w-[44rem] text-center">
              <h2 className={H2}>{SLOT.h2}</h2>
              <p className={`mx-auto mt-5 max-w-[36rem] ${LEAD}`}>{SLOT.p}</p>
              <div className="mt-8 flex justify-center">
                <GesprekKnop ctaLabel="secondary_calendly" location="secondary_cta" className="w-full sm:w-auto" />
              </div>
              <p className="mt-4 text-[0.875rem] text-[#6C7590]">{SLOT.micro}</p>
              <p className="mt-6">
                <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackLesreeks("contact")} className="hp-link text-[1rem] font-medium">
                  {SLOT.lesreeksLink}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* Footer (opbouw van de vorige homepage)                             */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-[#1A2D63] text-white/75">
        <div className={`${CONTAINER} py-14 sm:py-16`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
            <div>
              <h2 className="hp-display text-balance text-[1.75rem] font-bold leading-[1.1] text-white sm:text-[2.1rem]">{FOOTER.slotTitel}</h2>
              <p className="mt-3 max-w-[32rem] text-[1rem] leading-[1.65] text-white/70">{FOOTER.slotTekst}</p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <LesreeksKnop location="footer_cta" variant="light" className="w-full sm:w-auto" />
                <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => pushEvent("contact_click", { method: "email", location: "footer_cta" })} className="inline-flex items-center gap-2 text-[0.9375rem] text-white/80 transition-colors hover:text-white">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-white/65">{FOOTER.contactTitel}</h3>
              <ul className="mt-4 space-y-3 text-[0.9375rem]">
                <li className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-white/65" aria-hidden="true" />
                  <div className="flex flex-col">
                    {FOOTER.telefoons.map((t) => (
                      <a key={t.link} href={t.link} onClick={() => pushEvent("contact_click", { method: "phone", location: "footer" })} className="transition-colors hover:text-white">{t.nummer}</a>
                    ))}
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-white/65" aria-hidden="true" />
                  <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => pushEvent("contact_click", { method: "email", location: "footer_contact" })} className="transition-colors hover:text-white">{CONTACT_EMAIL}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 shrink-0 text-white/65" aria-hidden="true" />
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" onClick={() => pushEvent("contact_click", { method: "linkedin", location: "footer_contact" })} className="transition-colors hover:text-white">LinkedIn</a>
                  <span className="text-white/30" aria-hidden="true">·</span>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={() => pushEvent("contact_click", { method: "instagram", location: "footer_contact" })} className="transition-colors hover:text-white">Instagram</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Image src="/finit-logo-white.svg" alt="Finit Solutions" width={424} height={120} className="h-6 w-auto" />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-white/60">
              <span>BTW: {VAT_NUMBER}</span>
              {FOOTER.links.map((l) => (
                <a key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</a>
              ))}
              <button type="button" onClick={openSettings} className="underline underline-offset-2 transition-colors hover:text-white">{FOOTER.cookies}</button>
            </div>
          </div>
          <p className="mt-6 text-[0.8125rem] text-white/55">© {new Date().getFullYear()} Finit Solutions</p>
        </div>
      </footer>

      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
