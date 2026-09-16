"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Mail, Menu, X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { CONTACT_EMAIL, SKOOL_URL } from "@/lib/finit-links";
import { Brein3D } from "./brein-3d";
import { Getuigenis, OplossingCatalogus } from "./case-kaart";
import { ContactKaart } from "./contact-kaart";
import { HerkenSectie } from "./herken-sectie";
import { OplossingSectie } from "./oplossing-sectie";
import { SiteFooter } from "./site-footer";
import { STAP_DETAILS } from "./stap-details";
import { CONTAINER, ContactKnop, H2, H3, KOP, LEAD, LesreeksKnop, Onder, Vinkje, trackLesreeks } from "./ui";
import {
  AANPAK_FOTO,
  CASES,
  CTA_CONTACT,
  CTA_LESREEKS,
  FOOTER,
  HERO,
  HOE,
  MENU,
  NAV_DESKTOP,
  NAV_MOBIEL,
  PRODUCTEN,
  SKOOL,
  VRAGEN,
  type FaqBlok,
} from "./copy";

/**
 * De homepage: hero → de teamfoto met één statement → herken jij dit (drie
 * punten met een tekening) → de oplossing (met de tool-logo's) → hoe krijg jij
 * jouw AI-werknemer (drie stappen + prijzen) → de onboarding → de oplossingen die
 * we het vaakst bouwen → vragen naast de contactkaart. Alle tekst staat in
 * ./copy.ts, de oplossingen in ./cases.ts.
 *
 * Eén hoofd-CTA: de onboarding op Finit OS (tot 15/09 de lesreeks; de knop heet
 * in de code nog LesreeksKnop), in de accentkleur. De tweede
 * knop is "Neem contact met ons op" en gaat naar /contact (ContactKnop); er
 * wordt geen kennismaking meer ingepland vanaf de homepage. De drie stappen
 * zijn een lijst kaarten met rechts het paneel van de gekozen stap
 * (stap-details.tsx); de lijst blijft staan terwijl je door het paneel scrolt,
 * en onderaan het paneel klik je door naar de volgende stap. Op een telefoon
 * klapt het paneel open in de kaart zelf.
 *
 * Navigatie en mobiel menu: dezelfde opbouw en tekst als de vorige homepage.
 * De lesreeks-knop gaat rechtstreeks naar Skool. Het vraagformulier op de
 * contactkaart (contact-kaart.tsx) gaat naar de Netlify Function.
 */

function FaqAntwoord({ blokken }: { blokken: FaqBlok[] }) {
  return (
    <div className="space-y-3 pb-6 pr-8 text-[1rem] leading-[1.65] text-[#3D4766] sm:pr-12">
      {blokken.map((b, i) => {
        if (b.t === "h") return <p key={i} className="pt-1 font-semibold text-[#1A2D63]">{b.tekst}</p>;
        if (b.t === "res") return <p key={i} className="font-medium text-[#1A2D63]">{b.tekst}</p>;
        if (b.t === "link")
          return (
            <p key={i}>
              <a href={b.href} className="hp-link inline-flex items-center gap-1.5 font-medium text-[#1A2D63]">
                {b.tekst}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </p>
          );
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

/** Het pilletje "Stap 1", "Stap 2", "Stap 3": het is een traject, geen keuze. */
function StapPil({ label }: { label: string }) {
  return <span className="rounded-full bg-[#1A2D63] px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white">{label}</span>;
}

/** Het citaat van Y Combinator over het "company brain", met het YC-logo en de bron als link. */
function Citaat({ className = "" }: { className?: string }) {
  const c = AANPAK_FOTO.citaat;
  return (
    <blockquote className={className}>
      <div className="flex items-center gap-2.5">
        <Image src={c.logo} alt="" width={28} height={28} className="h-7 w-7 rounded-[5px]" />
        <span className="text-[0.875rem] font-semibold text-[#1A2D63]">{c.logoNaam}</span>
      </div>
      <p className="mt-3 text-[0.9375rem] leading-[1.5] text-[#3D4766]">&ldquo;{c.tekst}&rdquo;</p>
      <cite className="mt-1.5 block text-[0.8125rem] not-italic text-[#6C7590]">
        {c.url ? (
          <a href={c.url} target="_blank" rel="noopener noreferrer" className="hp-link">{c.bron}</a>
        ) : (
          c.bron
        )}
      </cite>
    </blockquote>
  );
}

/**
 * De inhoud van het paneel bij één stap: wat je eruit haalt (de vinkjes, alleen
 * bij stap 1), de uitleg uit stap-details.tsx, en onderaan de weg naar de
 * volgende stap. `kop` voegt het stapnummer en de titel toe; op een telefoon
 * staan die al op de kaart.
 */
function StapPaneel({ i, naarStap, kop = false }: { i: number; naarStap: (i: number) => void; kop?: boolean }) {
  const stap = HOE.stappen[i];
  const { h3, kort, Inhoud } = STAP_DETAILS[i];
  const vorige = HOE.stappen[i - 1];
  const volgende = HOE.stappen[i + 1];
  return (
    <div>
      {kop && (
        <div className="flex flex-wrap items-center gap-3">
          <StapPil label={stap.stapLabel} />
          <h3 className={`${H3} text-[1.6rem]`}>{stap.titel}</h3>
        </div>
      )}
      {stap.punten && (
        <ul className={`grid gap-3 sm:grid-cols-3 ${kop ? "mt-5" : ""}`}>
          {stap.punten.map((punt) => (
            <li key={punt} className="flex items-start gap-3 text-[1rem] font-medium leading-[1.45] text-[#1A2D63]">
              <Vinkje groot />
              <span>{punt}</span>
            </li>
          ))}
        </ul>
      )}
      <div className={kop || stap.punten ? "mt-5 border-t border-[#E3E7EF] pt-5" : ""}>
        <h4 className={`${H3} text-[1.35rem]`}>{h3}</h4>
        <p className="mt-2 max-w-[44rem] text-[1rem] leading-[1.6] text-[#3D4766]">{kort}</p>
        <div className="mt-5">
          <Inhoud />
        </div>
      </div>
      {/* Door naar de volgende stap, zonder terug te scrollen naar de kaarten. Na stap 3: de lesreeks. */}
      <div className="mt-6 flex flex-col gap-3 border-t border-[#E3E7EF] pt-5 sm:flex-row sm:items-center sm:justify-between">
        {vorige ? (
          <button type="button" onClick={() => naarStap(i - 1)} className="hp-btn hp-btn--secondary hp-btn--md w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{HOE.paneel.vorige}: {vorige.stapLabel}</span>
          </button>
        ) : (
          <span className="hidden sm:block" aria-hidden="true" />
        )}
        {volgende ? (
          <button type="button" onClick={() => naarStap(i + 1)} className="hp-btn hp-btn--primary hp-btn--md w-full sm:w-auto">
            <span>{HOE.paneel.volgende}: {volgende.stapLabel}, {volgende.titel}</span>
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
   * dicht; op desktop toont het paneel rechts dan stap 1. Zo klopt de eerste weergave op
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

          {/* Desktop rechts: de lesreeks als de ene knop, contact als tekst (pas als er plaats is). */}
          <div className="hidden items-center gap-5 whitespace-nowrap lg:flex">
            <a href="/contact" onClick={() => pushEvent("cta_click", { cta_label: "contact", location: "nav" })} className="hidden text-[0.9375rem] font-medium text-[#1A2D63]/80 transition-colors hover:text-[#1A2D63] 2xl:block">
              {CTA_CONTACT}
            </a>
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
              <ContactKnop location="mobile_nav" className="w-full" />
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
        <header id="hero" className={`${CONTAINER} pb-8 pt-24 sm:pt-28 lg:pb-6 lg:pt-24`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-10">
            <div className="hp-rise">
              <h1 className="hp-display text-balance text-[2.15rem] font-bold leading-[1.02] text-[#1A2D63] min-[400px]:text-[2.4rem] sm:text-[3.2rem] lg:text-[3rem] xl:text-[3.3rem]">
                <span className="block">{HERO.h1[0]}</span>
                <Onder accent>{HERO.h1[1]}</Onder>
              </h1>
              <p className={`mt-5 max-w-[36rem] ${LEAD}`}>{HERO.sub}</p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LesreeksKnop location="hero" className="w-full sm:w-auto" />
                <ContactKnop location="hero" className="w-full sm:w-auto" />
              </div>

              <ul className="mt-6 space-y-2.5">
                {HERO.punten.map((punt) => (
                  <li key={punt} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-[#3D4766]">
                    <Vinkje />
                    <span>{punt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
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
        {/* 1b. De teamfoto op de naad onder de hero, met één statement    */}
        {/* -------------------------------------------------------------- */}
        {/* Wit boven, grijs onder: de foto ligt op de overgang naar "Herken jij dit?". De
            linkerhelft is vervaagd, zodat het statement er rechtstreeks op staat. Het citaat van
            Y Combinator hangt als kaartje over de rechteronderhoek: half in de foto, half eronder
            (op een smaller scherm staat het onder de foto). De foto knipt zichzelf af, het kaartje
            staat erbuiten, zodat het niet mee afgeknipt wordt. */}
        <div className="bg-[linear-gradient(to_bottom,#FFFFFF_0,#FFFFFF_50%,#F5F7FB_50%,#F5F7FB_100%)]">
          <div className={`${CONTAINER} relative`}>
            <Citaat className="hp-card absolute bottom-0 right-8 z-10 hidden w-[23rem] translate-y-1/2 p-5 lg:block xl:right-0" />
            <div className="hp-card relative overflow-hidden">
              <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/8]">
                <Image
                  src={AANPAK_FOTO.foto}
                  alt={AANPAK_FOTO.fotoAlt}
                  fill
                  sizes="(min-width: 1184px) 74rem, 100vw"
                  className="object-cover [filter:brightness(1.3)_contrast(1.03)]"
                  style={{ objectPosition: "center 42%" }}
                />
                <div className="hp-foto-waas pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] sm:block" aria-hidden="true" />
                {/* Op een telefoon staat het scherm bovenaan in beeld: daar vervaagt de bovenkant. */}
                <div className="hp-foto-waas-boven pointer-events-none absolute inset-x-0 top-0 h-[58%] sm:hidden" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A2D63]/85 via-[#1A2D63]/40 to-transparent sm:bg-gradient-to-r sm:from-[#1A2D63]/75 sm:via-[#1A2D63]/35 sm:to-transparent" aria-hidden="true" />
                <p className="hp-display absolute inset-x-5 bottom-5 text-balance text-[1.6rem] font-bold leading-[1.08] text-white sm:inset-auto sm:left-7 sm:top-1/2 sm:max-w-[26rem] sm:-translate-y-1/2 sm:text-[2.1rem] lg:left-9 lg:max-w-[30rem] lg:text-[2.5rem]">
                  {AANPAK_FOTO.statement}
                </p>
              </div>
              <Citaat className="p-5 lg:hidden" />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 2. Herken jij dit? en daaronder de oplossing                   */}
        {/* -------------------------------------------------------------- */}
        <HerkenSectie />
        <OplossingSectie />

        {/* -------------------------------------------------------------- */}
        {/* 3. Hoe krijg jij jouw AI-werknemer: de drie stappen + prijzen  */}
        {/* -------------------------------------------------------------- */}
        <section id="aanpak" className="scroll-mt-20">
          <div className={`${CONTAINER} py-14 sm:py-16`}>
            <div className={KOP}>
              <h2 className={H2}>{HOE.h2[0]} <Onder>{HOE.h2[1]}</Onder></h2>
              <p className={`mt-4 ${LEAD}`}>{HOE.intro}</p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start lg:gap-6">
              {/* Links: de drie kaarten. Blijven staan terwijl je rechts door het paneel scrolt. */}
              <ol className="grid gap-4 lg:sticky lg:top-24" aria-label="De drie stappen">
                {HOE.stappen.map((stap, i) => {
                  const open = openStap === i; // telefoon: het paneel staat open in de kaart
                  const actief = getoond === i; // desktop: het paneel rechts toont deze stap
                  return (
                    <li
                      key={stap.stapLabel}
                      ref={(el) => { kaarten.current[i] = el; }}
                      data-open={open}
                      data-actief={actief}
                      className={`hp-card hp-stap scroll-mt-24 ${i === 0 ? "hp-card--accent" : ""}`}
                    >
                      <button type="button" onClick={() => kies(i)} aria-expanded={open} aria-controls={`stap-detail-${i}`} className="w-full p-4 text-left sm:p-5">
                        <span className="flex items-center justify-between gap-3">
                          <StapPil label={stap.stapLabel} />
                          <span className="flex flex-wrap justify-end gap-1.5">
                            <span className="rounded-full bg-[#E6ECF9] px-3 py-1 text-[0.75rem] font-medium text-[#1A2D63]">{stap.wie}</span>
                            <span className="rounded-full border border-[#E3E7EF] px-3 py-1 text-[0.75rem] font-medium text-[#6C7590]">{stap.tijd}</span>
                          </span>
                        </span>
                        <span className={`mt-3 block ${H3} text-[1.35rem]`}>{stap.titel}</span>
                        <span className="mt-1 block text-[0.9375rem] leading-[1.5] text-[#3D4766]">{stap.intro}</span>
                        <span className="mt-3.5 flex flex-wrap items-end justify-between gap-3 border-t border-[#E3E7EF] pt-3.5">
                          <span>
                            <span className="block text-[0.75rem] font-medium uppercase tracking-wide text-[#6C7590]">{stap.prijsLabel}</span>
                            <span className="mt-1 flex flex-wrap items-baseline gap-x-2">
                              {/* "vanaf": het echte voorstel komt in het strategiegesprek. */}
                              {stap.prijsPrefix && <span className="text-[0.8125rem] font-medium text-[#6C7590]">{stap.prijsPrefix}</span>}
                              <span className="hp-display text-[1.5rem] font-bold leading-none text-[#1A2D63]">{stap.prijs}</span>
                              {stap.prijsSub && <span className="text-[0.8125rem] font-medium text-[#6C7590]">{stap.prijsSub}</span>}
                              {stap.prijsOud && (
                                <s className="hp-display text-[1rem] font-semibold leading-none text-[#6C7590] decoration-[#6C7590]/70 decoration-[1.5px]">
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
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                          <LesreeksKnop location="stappen" size="md" className="w-full" />
                          {stap.ctaNoot && <p className="mt-2 text-center text-[0.8125rem] text-[#6C7590]">{stap.ctaNoot}</p>}
                        </div>
                      )}
                      {/* Telefoon en tablet: het paneel klapt open in de kaart zelf. */}
                      <div id={`stap-detail-${i}`} className="hp-vouw lg:hidden" data-open={open} aria-hidden={!open}>
                        <div>
                          <div className="border-t border-[#E3E7EF] px-4 pb-5 pt-5 sm:px-5">
                            <StapPaneel i={i} naarStap={naarStap} />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Rechts: het paneel van de gekozen stap. Nieuwe inhoud schuift in. */}
              <div ref={paneel} id="stap-paneel" className="hp-card hidden scroll-mt-24 p-6 lg:block lg:p-7">
                <div key={getoond} className="hp-wissel">
                  <StapPaneel i={getoond} naarStap={naarStap} kop />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
              <p className="text-[1rem] text-[#3D4766]">{HOE.slotVraag}</p>
              <ContactKnop location="aanpak" size="md" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 3b. De onboarding, op de naad tussen de stappen en de oplossingen */}
        {/* -------------------------------------------------------------- */}
        {/* De achtergrond breekt precies in het midden: wit boven, marineblauw
            onder. Daardoor ligt de kaart exact op de middenschijding van de
            twee secties: de deur naar de onboarding, nadat je de drie stappen kent.
            De onboarding draait vandaag nog op Skool. */}
        <div className="bg-[linear-gradient(to_bottom,#FFFFFF_0,#FFFFFF_50%,#1A2D63_50%,#1A2D63_100%)]">
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
        {/* 4. De oplossingen die we het vaakst bouwen                     */}
        {/* -------------------------------------------------------------- */}
        <section id="cases" className="scroll-mt-20 bg-[#1A2D63] text-white">
          <div className={`${CONTAINER} pb-14 pt-10 sm:pb-16 sm:pt-12`}>
            <div className={KOP}>
              {/* Zelfde maat als H2, maar wit. */}
              <h2 className="hp-display text-balance text-[1.9rem] font-bold leading-[1.06] text-white sm:text-[2.3rem] lg:text-[2.6rem]">
                {CASES.h2[0]} <Onder wit>{CASES.h2[1]}</Onder>
              </h2>
            </div>
            <div className="mt-8">
              <OplossingCatalogus max={6} />
            </div>
            <div className="mt-8 flex justify-center">
              <a href="/cases" className="hp-btn hp-btn--light hp-btn--md">
                {CASES.allesBekijken}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <Getuigenis className="mt-12 border-t border-white/10 pt-10" />
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. Vragen links, de contactkaart rechts                        */}
        {/* -------------------------------------------------------------- */}
        <section id="contact" className="scroll-mt-20 bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-14 sm:py-16`}>
            <h2 id="faq" className={`${H2} scroll-mt-24`}>{VRAGEN.h2}</h2>
            {/* De vragen en de contactkaart zijn even lang: de kaarten rekken mee met de langste, en
                elke vraag krijgt een gelijk deel van de hoogte (flex-1), met de vraag in het midden. Gaat
                er een vraag open, dan groeien beide kaarten mee. */}
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
              <div className="hp-card flex min-w-0 flex-col px-6 sm:px-8">
                {VRAGEN.items.map((item, i) => (
                  <div key={item.q} className={`flex flex-1 flex-col justify-center ${i > 0 ? "border-t border-[#E3E7EF]" : ""}`}>
                    <details className="hp-details">
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
                  </div>
                ))}
              </div>

              <ContactKaart location="contact" bron="https://finitsolutions.be/#contact" />
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* Footer (opbouw van de vorige homepage)                             */}
      {/* ---------------------------------------------------------------- */}
      <SiteFooter />
    </div>
  );
}
