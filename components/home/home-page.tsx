"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, ChevronRight, Mail, Menu, X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { ContactFormPopup, useContactForm } from "@/components/contact-form-popup";
import { CONTACT_EMAIL, SKOOL_URL } from "@/lib/finit-links";
import { Brein3D } from "./brein-3d";
import { CaseCatalogus, Getuigenis } from "./case-kaart";
import { HerkenSectie } from "./herken-sectie";
import { SiteFooter } from "./site-footer";
import { STAP_DETAILS } from "./stap-details";
import { CONTAINER, H2, H3, KOP, LEAD, LesreeksKnop, Onder, Vinkje, trackLesreeks } from "./ui";
import { VraagFormulier } from "./vraag-formulier";
import {
  AANPAK_FOTO,
  CASES,
  CTA_KENNISMAKING,
  CTA_LESREEKS,
  FOOTER,
  HERO,
  HOE,
  MENU,
  NAV_DESKTOP,
  NAV_MOBIEL,
  PRODUCTEN,
  SKOOL,
  SLOT,
  VRAGEN,
  type FaqBlok,
} from "./copy";

/**
 * De homepage: hero → de teamfoto met hoe we werken → herken jij dit (met wat
 * een AI-werknemer doet en de tool-logo's) → de lesreeks → hoe wij werken
 * (+ prijzen) → cases → vragen naast het formulier. Alle tekst staat in
 * ./copy.ts, de cases in ./cases.ts.
 *
 * Eén hoofd-CTA: de lesreeks, in de accentkleur (LesreeksKnop). De
 * kennismaking is overal de tweede knop (omlijnd), behalve in de
 * contactsectie, waar het gesprek het onderwerp is. De drie stappen zijn een
 * lijst kaarten met rechts het paneel van de gekozen stap (stap-details.tsx);
 * de lijst blijft staan terwijl je door het paneel scrolt, en onderaan het
 * paneel klik je door naar de volgende stap. Op een telefoon klapt het paneel
 * open in de kaart zelf, zodat je niet hoeft te zoeken.
 *
 * Navigatie en mobiel menu: dezelfde opbouw en tekst als de vorige homepage.
 * Het formulier is het bestaande ContactFormPopup (naar /api/contact-submit,
 * zelfde velden, zelfde /bedankt-pagina). De lesreeks-knop gaat rechtstreeks
 * naar Skool. Het vraagformulier onderaan (vraag-formulier.tsx) gaat naar
 * dezelfde Netlify Function.
 */

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

/**
 * De inhoud van het paneel bij één stap: wat je eruit haalt (de drie vinkjes),
 * de uitleg uit stap-details.tsx, en onderaan de weg naar de volgende stap.
 * `kop` voegt nummer, titel en intro toe; op een telefoon staat die al op de kaart.
 */
function StapPaneel({ i, naarStap, kop = false }: { i: number; naarStap: (i: number) => void; kop?: boolean }) {
  const stap = HOE.stappen[i];
  const { h3, kort, Inhoud } = STAP_DETAILS[i];
  const vorige = HOE.stappen[i - 1];
  const volgende = HOE.stappen[i + 1];
  return (
    <div>
      {kop && (
        <div>
          <span className="hp-display text-[1.5rem] font-bold leading-none text-[#1A2D63]/45">{stap.nummer}</span>
          <h3 className={`mt-3 ${H3} text-[1.6rem]`}>{stap.titel}</h3>
          <p className="mt-2 max-w-[40rem] text-[1rem] leading-[1.6] text-[#3D4766]">{stap.intro}</p>
        </div>
      )}
      <ul className={`grid gap-2.5 sm:grid-cols-3 ${kop ? "mt-6" : ""}`}>
        {stap.punten.map((punt) => (
          <li key={punt} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-[#1A2D63]">
            <Vinkje />
            <span>{punt}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 border-t border-[#E3E7EF] pt-7">
        <h4 className={`${H3} text-[1.35rem]`}>{h3}</h4>
        <p className="mt-2 max-w-[44rem] text-[1rem] leading-[1.6] text-[#3D4766]">{kort}</p>
        <div className="mt-6">
          <Inhoud />
        </div>
      </div>
      {/* Door naar de volgende stap, zonder terug te scrollen naar de kaarten. Na stap 03: de lesreeks. */}
      <div className="mt-8 flex flex-col gap-3 border-t border-[#E3E7EF] pt-6 sm:flex-row sm:items-center sm:justify-between">
        {vorige ? (
          <button type="button" onClick={() => naarStap(i - 1)} className="hp-btn hp-btn--secondary hp-btn--md w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{HOE.paneel.vorige}: {vorige.nummer}</span>
          </button>
        ) : (
          <span className="hidden sm:block" aria-hidden="true" />
        )}
        {volgende ? (
          <button type="button" onClick={() => naarStap(i + 1)} className="hp-btn hp-btn--primary hp-btn--md w-full sm:w-auto">
            <span>{HOE.paneel.volgende}: {volgende.nummer} {volgende.titel}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <LesreeksKnop location="stappen_paneel" size="md" className="w-full sm:w-auto" />
        )}
      </div>
    </div>
  );
}

export function HomePage() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /**
   * Welke stap gekozen is (0, 1, 2) of -1: nog niets aangeklikt. Op een telefoon is dan alles
   * dicht; op desktop toont het paneel rechts dan stap 01. Zo klopt de eerste weergave op
   * beide, zonder de schermbreedte te moeten kennen bij het renderen.
   */
  const [openStap, setOpenStap] = useState(-1);
  const getoond = openStap >= 0 ? openStap : 0;
  const kaarten = useRef<(HTMLLIElement | null)[]>([]);
  const paneel = useRef<HTMLDivElement>(null);
  const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
  /** Kies een stap. Schuift alleen bij als het paneel (desktop) of de kaart (telefoon) niet goed in beeld staat. */
  const naarStap = useCallback((i: number) => {
    setOpenStap(i);
    const stil = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      const el = isDesktop() ? paneel.current : kaarten.current[i];
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 88 || top > window.innerHeight * 0.7) window.scrollTo({ top: window.scrollY + top - 96, behavior: stil ? "auto" : "smooth" });
    });
  }, []);
  const kies = (i: number) => {
    if (!isDesktop() && openStap === i) { setOpenStap(-1); return; } // op een telefoon klapt een open kaart weer dicht
    naarStap(i);
  };
  const { isOpen, openForm, closeForm } = useContactForm();

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

  /** De kennismaking: standaard omlijnd (tweede knop), marineblauw alleen waar het gesprek het onderwerp is. */
  const GesprekKnop = ({ label = CTA_KENNISMAKING, ctaLabel, location, variant = "secondary", size = "lg", className = "" }: { label?: string; ctaLabel: string; location: string; variant?: "primary" | "secondary" | "light"; size?: "lg" | "md"; className?: string }) => (
    <button type="button" onClick={() => gesprek(ctaLabel, location)} className={`hp-btn hp-btn--${variant} hp-btn--${size} ${className}`}>
      <Calendar className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );

  const navBg = navScrollProgress > 0 ? `rgba(255,255,255,${0.86 * navScrollProgress})` : "transparent";

  return (
    <div className="hp min-h-screen [overflow-x:clip] bg-white text-[#3D4766]">
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
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 whitespace-nowrap lg:flex xl:gap-7">
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

          {/* Desktop rechts: de lesreeks als de ene knop, de kennismaking als tekst (pas als er plaats is). */}
          <div className="hidden items-center gap-5 whitespace-nowrap lg:flex">
            <button type="button" onClick={() => gesprek("nav_calendly", "nav")} className="hidden text-[0.9375rem] font-medium text-[#1A2D63]/80 transition-colors hover:text-[#1A2D63] 2xl:block">
              {CTA_KENNISMAKING}
            </button>
            <LesreeksKnop location="nav" size="md" />
          </div>

          {/* Mobiel: knop verschijnt bij het scrollen + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLesreeks("mobile_nav")}
              className="hp-btn hp-btn--accent hp-btn--sm transition-opacity duration-300"
              style={{ opacity: mobileMenuOpen ? 0 : navScrollProgress, pointerEvents: !mobileMenuOpen && navScrollProgress > 0.5 ? "auto" : "none" }}
              tabIndex={!mobileMenuOpen && navScrollProgress > 0.5 ? 0 : -1}
            >
              {CTA_LESREEKS}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
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
            <div className="mb-8 flex flex-col gap-3">
              <LesreeksKnop location="mobile_menu" className="w-full" />
              <GesprekKnop ctaLabel="mobile_nav_calendly" location="mobile_nav" className="w-full" />
              <div className="hp-card mt-1 flex flex-col items-center gap-2 px-6 py-5 text-center">
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
                <Onder accent>{HERO.h1[1]}</Onder>
              </h1>
              <p className={`mt-6 max-w-[36rem] ${LEAD}`}>{HERO.sub}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LesreeksKnop location="hero" className="w-full sm:w-auto" />
                <GesprekKnop ctaLabel="hero_calendly" location="hero" className="w-full sm:w-auto" />
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
        {/* 1b. De teamfoto op de naad onder de hero, met hoe we werken    */}
        {/* -------------------------------------------------------------- */}
        {/* Wit boven, grijs onder: de foto ligt op de overgang naar "Herken jij dit?". Geen
            sectiekop: wat erop staat, is hoe we werken, niet wie we zijn. */}
        <div className="bg-[linear-gradient(to_bottom,#FFFFFF_0,#FFFFFF_50%,#F5F7FB_50%,#F5F7FB_100%)]">
          <div className={CONTAINER}>
            <figure className="hp-card relative overflow-hidden">
              <div className="relative aspect-[3/2] sm:aspect-[16/9] lg:aspect-[21/8]">
                <Image src={AANPAK_FOTO.foto} alt={AANPAK_FOTO.fotoAlt} fill sizes="(min-width: 1184px) 74rem, 100vw" className="object-cover" style={{ objectPosition: "center 42%" }} />
                <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#1A2D63]/50 via-[#1A2D63]/10 to-transparent sm:block" aria-hidden="true" />
                <span className="absolute right-3 top-3 rounded-full bg-[#1A2D63]/55 px-3 py-1 text-[0.75rem] font-medium text-white backdrop-blur-sm sm:bottom-4 sm:right-4 sm:top-auto">{AANPAK_FOTO.onderschrift}</span>
              </div>
              <figcaption className="p-6 sm:absolute sm:bottom-5 sm:left-5 sm:max-w-[24rem] sm:rounded-[18px] sm:bg-white/95 sm:shadow-[0_20px_44px_-24px_rgba(26,45,99,0.55)] sm:backdrop-blur lg:bottom-8 lg:left-8 lg:max-w-[27rem] lg:p-7">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#6C7590]">{AANPAK_FOTO.label}</p>
                <p className="hp-display hp-display-sm mt-2 text-[1.3rem] font-semibold leading-[1.2] text-[#1A2D63] lg:text-[1.55rem]">{AANPAK_FOTO.titel}</p>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.55] text-[#3D4766]">{AANPAK_FOTO.tekst}</p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 2. Herken jij dit? Klusjes, met wat een AI-werknemer ermee doet */}
        {/* -------------------------------------------------------------- */}
        <HerkenSectie onGesprek={() => gesprek("recognition_calendly", "recognition")} />

        {/* -------------------------------------------------------------- */}
        {/* 2b. De lesreeks, op de naad tussen sectie 2 en sectie 3        */}
        {/* -------------------------------------------------------------- */}
        {/* De achtergrond breekt precies in het midden: grijs boven, wit
            onder. Daardoor ligt de kaart exact op de middenschijding van
            de twee secties. */}
        <div className="bg-[linear-gradient(to_bottom,#F5F7FB_0,#F5F7FB_50%,#FFFFFF_50%,#FFFFFF_100%)]">
          <div className={CONTAINER}>
            {/* De deur naar de lesreeks: knop, Skool-woordmerk en de cover van de community. */}
            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLesreeks("breedte")}
              className="hp-card group grid overflow-hidden text-left transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(26,45,99,0.45)] md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]"
            >
              <span className="flex flex-col justify-center p-6 sm:p-7 lg:p-9">
                <span className="flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-wide text-[#6C7590]">
                  <span>{SKOOL.label}</span>
                  <Image src="/skool-wordmark.svg" alt="Skool" width={62} height={20} className="h-[1.05rem] w-auto -translate-y-[2px]" />
                </span>
                <span className={`mt-3 block ${H3} text-[1.5rem]`}>{SKOOL.titel}</span>
                <span className="mt-2 block text-[0.9375rem] leading-[1.6] text-[#3D4766]">{SKOOL.body}</span>
                <span className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="hp-btn hp-btn--accent hp-btn--md">
                    {SKOOL.knop}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                  <span className="text-[0.8125rem] leading-[1.5] text-[#6C7590]">{SKOOL.noot}</span>
                </span>
              </span>
              <span className="relative min-h-[11rem] bg-[#F5F7FB] md:min-h-0">
                <Image src="/skool-cover.webp" alt={SKOOL.coverAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </span>
            </a>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 3. Hoe wij AI voor jou laten werken + prijzen                  */}
        {/* -------------------------------------------------------------- */}
        <section id="aanpak" className="scroll-mt-20">
          <div className={`${CONTAINER} py-20 sm:py-28`}>
            <div className={KOP}>
              <h2 className={H2}>{HOE.h2[0]} <Onder>{HOE.h2[1]}</Onder></h2>
              <p className={`mt-5 ${LEAD}`}>{HOE.intro}</p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start lg:gap-6">
              {/* Links: de drie kaarten. Blijven staan terwijl je rechts door het paneel scrolt. */}
              <ol className="grid gap-4 lg:sticky lg:top-24">
                {HOE.stappen.map((stap, i) => {
                  const open = openStap === i; // telefoon: het paneel staat open in de kaart
                  const actief = getoond === i; // desktop: het paneel rechts toont deze stap
                  return (
                    <li
                      key={stap.nummer}
                      ref={(el) => { kaarten.current[i] = el; }}
                      data-open={open}
                      data-actief={actief}
                      className={`hp-card hp-stap scroll-mt-24 ${i === 0 ? "hp-card--accent" : ""}`}
                    >
                      <button type="button" onClick={() => kies(i)} aria-expanded={open} aria-controls={`stap-detail-${i}`} className="w-full p-5 text-left sm:p-6">
                        <span className="flex items-center justify-between gap-3">
                          <span className="hp-display text-[1.5rem] font-bold leading-none text-[#1A2D63]/45">{stap.nummer}</span>
                          <span className="flex flex-wrap justify-end gap-1.5">
                            <span className="rounded-full bg-[#E6ECF9] px-3 py-1 text-[0.75rem] font-medium text-[#1A2D63]">{stap.wie}</span>
                            <span className="rounded-full border border-[#E3E7EF] px-3 py-1 text-[0.75rem] font-medium text-[#6C7590]">{stap.tijd}</span>
                          </span>
                        </span>
                        <span className={`mt-3 block ${H3} text-[1.3rem]`}>{stap.titel}</span>
                        <span className="mt-1.5 block text-[0.9375rem] leading-[1.55] text-[#3D4766] lg:hidden">{stap.intro}</span>
                        <span className="mt-4 flex items-end justify-between gap-3 border-t border-[#E3E7EF] pt-4">
                          <span>
                            <span className="block text-[0.75rem] font-medium uppercase tracking-wide text-[#6C7590]">{stap.prijsLabel}</span>
                            <span className="mt-1 flex flex-wrap items-baseline gap-x-2">
                              <span className="hp-display text-[1.75rem] font-bold leading-none text-[#1A2D63]">{stap.prijs}</span>
                              {stap.prijsOud && (
                                <s className="hp-display text-[1.05rem] font-semibold leading-none text-[#6C7590] decoration-[#6C7590]/70 decoration-[1.5px]">
                                  <span className="sr-only">daarna </span>{stap.prijsOud}
                                </s>
                              )}
                            </span>
                          </span>
                          <span className="hp-stap-meer flex shrink-0 items-center gap-1.5 pb-0.5 text-[0.85rem] font-medium text-[#1A2D63]">
                            <span className="lg:hidden">{open ? HOE.minder : HOE.meer}</span>
                            <span className="hidden lg:inline">{HOE.meer}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 lg:hidden ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                            <ChevronRight className="hidden h-4 w-4 lg:block" aria-hidden="true" />
                          </span>
                        </span>
                      </button>
                      {stap.cta && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                          <LesreeksKnop location="stappen" size="md" className="w-full" />
                          {stap.ctaNoot && <p className="mt-2.5 text-center text-[0.8125rem] text-[#6C7590]">{stap.ctaNoot}</p>}
                        </div>
                      )}
                      {/* Telefoon en tablet: het paneel klapt open in de kaart zelf. */}
                      <div id={`stap-detail-${i}`} className="hp-vouw lg:hidden" data-open={open} aria-hidden={!open}>
                        <div>
                          <div className="border-t border-[#E3E7EF] px-5 pb-6 pt-5 sm:px-6">
                            <StapPaneel i={i} naarStap={naarStap} />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Rechts: het paneel van de gekozen stap. Nieuwe inhoud schuift in. */}
              <div ref={paneel} id="stap-paneel" className="hp-card hidden scroll-mt-24 p-7 lg:block lg:p-9">
                <div key={getoond} className="hp-wissel">
                  <StapPaneel i={getoond} naarStap={naarStap} kop />
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
              <p className="text-[1rem] text-[#3D4766]">{HOE.slotVraag}</p>
              <GesprekKnop ctaLabel="aanpak_calendly" location="aanpak" size="md" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 4. Cases uit de praktijk: catalogus, elke case een eigen pagina */}
        {/* -------------------------------------------------------------- */}
        <section id="cases" className="scroll-mt-20 bg-[#1A2D63] text-white">
          <div className={`${CONTAINER} py-20 sm:py-28`}>
            <div className={KOP}>
              <h2 className="hp-display text-balance text-[2rem] font-bold leading-[1.06] sm:text-[2.5rem] lg:text-[2.9rem]">{CASES.h2}</h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.65] text-white/75 sm:text-[1.125rem]">{CASES.intro}</p>
            </div>
            <div className="mt-10">
              <CaseCatalogus donker max={6} />
            </div>
            <div className="mt-10 flex justify-center">
              <a href="/cases" className="hp-btn hp-btn--light hp-btn--md">
                {CASES.allesBekijken}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <Getuigenis className="mt-14 border-t border-white/10 pt-12" />
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. Vragen links, de kennismaking en het formulier rechts        */}
        {/* -------------------------------------------------------------- */}
        <section id="contact" className="scroll-mt-20 bg-[#F5F7FB]">
          <div className={`${CONTAINER} grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-12`}>
            <div id="faq" className="min-w-0 scroll-mt-24">
              <h2 className={H2}>{VRAGEN.h2}</h2>
              <div className="hp-card mt-8 px-6 sm:px-8">
                {VRAGEN.items.map((item, i) => (
                  <details key={item.q} className={`hp-details ${i > 0 ? "border-t border-[#E3E7EF]" : ""}`}>
                    <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium leading-snug text-[#1A2D63]">
                      <span>{item.q}</span>
                      <span className="hp-plus mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6ECF9] text-[#1A2D63]" aria-hidden="true">
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

            <div className="hp-card p-6 sm:p-8 lg:sticky lg:top-24">
              <h2 className={`${H3} text-[1.5rem] sm:text-[1.7rem]`}>{SLOT.h2}</h2>
              <p className="mt-2.5 text-[1rem] leading-[1.6] text-[#3D4766]">{SLOT.p}</p>
              <GesprekKnop ctaLabel="secondary_calendly" location="secondary_cta" variant="primary" size="md" className="mt-5 w-full" />
              <p className="mt-3 text-center text-[0.8125rem] text-[#6C7590]">{SLOT.micro}</p>
              <p className="mt-3 text-center">
                <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackLesreeks("contact")} className="hp-link text-[0.9375rem] font-medium">
                  {SLOT.lesreeksLink}
                </a>
              </p>
              <div className="relative mt-7 border-t border-[#E3E7EF] pt-7">
                <VraagFormulier />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* Footer (opbouw van de vorige homepage)                             */}
      {/* ---------------------------------------------------------------- */}
      <SiteFooter />

      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
