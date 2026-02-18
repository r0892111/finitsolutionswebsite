"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  Phone,
  Mail,
  Linkedin,
  type LucideIcon,
} from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { useContactForm, ContactFormPopup } from "@/components/contact-form-popup";
import { pushEvent } from "@/lib/analytics";

// ============================================
// DATA
// ============================================

interface CaseStudy {
  sector: string;
  heading: string;
  statsBefore: string;
  statsAfter: string;
  statsResult: string;
  resultPercent: string;
  description: string;
  quote: string;
  quotePerson: string;
}

const caseStudies: CaseStudy[] = [
  {
    sector: "Installatie",
    heading: "Installatiebedrijf in Antwerpen",
    statsBefore: "25u admin/week",
    statsAfter: "8u admin/week",
    statsResult: "68% tijdsbesparing",
    resultPercent: "68%",
    description:
      "Dit installatiebedrijf verloor dagelijks klanten door trage opvolging van offertes. Na implementatie van AI-gestuurde offerte-automatisering worden offertes nu binnen minuten verstuurd en wordt elke lead automatisch opgevolgd.",
    quote:
      "Ik heb nu eindelijk tijd om te doen waarvoor ik ondernemer ben geworden.",
    quotePerson: "Zaakvoerder, Installatiebedrijf Antwerpen",
  },
  {
    sector: "Bouw",
    heading: "Bouwbedrijf in Oost-Vlaanderen",
    statsBefore: "20u admin/week",
    statsAfter: "6u admin/week",
    statsResult: "70% tijdsbesparing",
    resultPercent: "70%",
    description:
      "Met een groeiend team werd de planning en administratie onbeheersbaar. AI-automatisering nam de facturatie, planning en klantcommunicatie over, waardoor het team zich kan focussen op de werf.",
    quote:
      "Onze werfplanning loopt nu vanzelf. Geen dubbele boekingen meer, geen gemiste facturen.",
    quotePerson: "Projectmanager, Bouwbedrijf Oost-Vlaanderen",
  },
  {
    sector: "Dienstverlening",
    heading: "Dienstverleningsbedrijf in Limburg",
    statsBefore: "18u admin/week",
    statsAfter: "5u admin/week",
    statsResult: "72% tijdsbesparing",
    resultPercent: "72%",
    description:
      "Klantopvolging en afsprakenbeheer kostten dit bedrijf meer tijd dan de dienstverlening zelf. Met AI-automatisering worden afspraken automatisch ingepland, herinneringen verstuurd en facturen opgemaakt.",
    quote:
      "Klanten worden sneller geholpen en we missen geen enkele opvolging meer.",
    quotePerson: "Eigenaar, Dienstverleningsbedrijf Limburg",
  },
];

const summaryStats = [
  { value: "70%", label: "minder administratietijd" },
  { value: "3x", label: "snellere offerte-doorlooptijd" },
  { value: "<2", label: "maanden ROI" },
];

// ============================================
// NOISE OVERLAY
// ============================================

const NoiseOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.08] mix-blend-multiply"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

// ============================================
// SECTION DIVIDER
// ============================================

const sectionDividerData = [
  {
    fill: "M0,70 C480,130 960,-10 1920,50",
    navy: "M0,62 C480,110 960,-18 1920,34 L1920,60 C960,4 480,146 0,78 Z",
    light: "M0,78 C480,146 960,4 1920,60 L1920,74 C960,14 480,164 0,88 Z",
  },
  {
    fill: "M0,30 C320,110 640,120 960,60 C1280,0 1600,-10 1920,80",
    navy: "M0,22 C320,92 640,100 960,50 C1280,-10 1600,-16 1920,66 L1920,90 C1600,4 1280,10 960,70 C640,134 320,126 0,38 Z",
    light: "M0,38 C320,126 640,134 960,70 C1280,10 1600,4 1920,90 L1920,102 C1600,18 1280,22 960,80 C640,146 320,142 0,48 Z",
  },
  {
    fill: "M0,85 C320,10 640,-5 960,55 C1280,115 1600,130 1920,35",
    navy: "M0,77 C320,-8 640,-25 960,45 C1280,107 1600,114 1920,21 L1920,45 C1600,144 1280,125 960,65 C640,9 320,26 0,93 Z",
    light: "M0,93 C320,26 640,9 960,65 C1280,125 1600,144 1920,45 L1920,57 C1600,158 1280,137 960,75 C640,21 320,40 0,103 Z",
  },
  {
    fill: "M0,55 C240,110 480,110 720,60 C960,10 1200,10 1440,60 C1680,110 1800,110 1920,55",
    navy: "M0,47 C240,92 480,90 720,50 C960,2 1200,4 1440,50 C1680,92 1800,90 1920,41 L1920,65 C1800,124 1680,126 1440,70 C1200,24 960,20 720,70 C480,126 240,124 0,63 Z",
    light: "M0,63 C240,124 480,126 720,70 C960,20 1200,24 1440,70 C1680,126 1800,124 1920,65 L1920,77 C1800,136 1680,140 1440,80 C1200,38 960,32 720,80 C480,138 240,138 0,73 Z",
  },
];

const SectionDivider = ({
  fromColor,
  toColor,
  variant = 0,
}: {
  fromColor: string;
  toColor: string;
  variant?: number;
}) => {
  const data = sectionDividerData[variant % sectionDividerData.length];
  const fillPath = `${data.fill} L1920,160 L0,160 Z`;

  return (
    <div
      className="relative w-full"
      style={{ backgroundColor: fromColor, marginTop: -1, marginBottom: -1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 -40 1920 200"
        preserveAspectRatio="none"
        className="w-full block h-[50px] md:h-[75px] lg:h-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <path d={fillPath} fill={toColor} />
        <path d={data.navy} fill="#1A2D63" />
        <path d={data.light} fill="#7B8DB5" />
      </svg>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export function CaseStudiesLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [showStickyMobileCTA, setShowStickyMobileCTA] = useState(false);
  const currentYear = new Date().getFullYear();
  const { isOpen, openForm, closeForm } = useContactForm();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavScrollProgress(Math.min(scrollY / 100, 1));
      setShowStickyMobileCTA(scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen overflow-x-hidden">
      <NoiseOverlay />

      {/* ============================================ */}
      {/* LIGHTWEIGHT NAV                              */}
      {/* ============================================ */}
      <nav
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background:
            navScrollProgress > 0
              ? `rgba(253, 251, 247, ${0.82 * navScrollProgress})`
              : "transparent",
          backdropFilter:
            navScrollProgress > 0
              ? `blur(${14 * navScrollProgress}px)`
              : "none",
          WebkitBackdropFilter:
            navScrollProgress > 0
              ? `blur(${14 * navScrollProgress}px)`
              : "none",
          borderBottom: `1px solid rgba(26, 45, 99, ${0.1 * navScrollProgress})`,
          transition:
            "background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s",
        }}
      >
        <div
          className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 relative"
          style={{
            paddingTop: `${12 + (1 - navScrollProgress) * 12}px`,
            paddingBottom: `${12 + (1 - navScrollProgress) * 12}px`,
            transition: "padding 0.3s",
          }}
        >
          <a href="/" className="flex items-center gap-3">
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              style={{
                height: `${20 + (1 - navScrollProgress) * 6}px`,
                transition: "height 0.3s",
              }}
              className="w-auto object-contain md:hidden"
            />
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              style={{
                height: `${28 + (1 - navScrollProgress) * 12}px`,
                transition: "height 0.3s",
              }}
              className="w-auto object-contain hidden md:block"
            />
          </a>

          <button
            type="button"
            onClick={() => {
              openForm();
              pushEvent("cta_click", {
                cta_label: "nav_calendly",
                location: "lp_case_studies_nav",
              });
            }}
            className="hidden md:flex items-center gap-2 bg-[#1A2D63] text-white rounded-full text-sm font-medium hover:scale-105 transition-all shadow-lg shadow-[#1A2D63]/20"
            style={{
              paddingLeft: `${20 + (1 - navScrollProgress) * 4}px`,
              paddingRight: `${20 + (1 - navScrollProgress) * 4}px`,
              paddingTop: `${10 + (1 - navScrollProgress) * 2}px`,
              paddingBottom: `${10 + (1 - navScrollProgress) * 2}px`,
              transition: "padding 0.3s",
            }}
          >
            <Calendar className="w-4 h-4" />
            <span>Plan een gesprek</span>
          </button>

          <button
            type="button"
            onClick={() => {
              openForm();
              pushEvent("cta_click", {
                cta_label: "mobile_nav_calendly",
                location: "lp_case_studies_mobile_nav",
              });
            }}
            className="md:hidden flex items-center gap-1.5 bg-[#1A2D63] text-white rounded-full text-xs font-medium px-3.5 py-2 transition-opacity duration-300"
            style={{
              opacity: navScrollProgress,
              pointerEvents: navScrollProgress > 0.5 ? "auto" : "none",
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Plan een gesprek</span>
          </button>
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO SECTION (50vh - compact)                */}
      {/* ============================================ */}
      <header className="relative min-h-[55vh] max-w-[100vw] mx-auto flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex items-center justify-center min-h-[55vh] pt-32 md:pt-40 pb-8 w-full relative z-10">
          <div className="relative z-10 text-center max-w-[22rem] sm:max-w-[28rem] md:max-w-3xl px-2 sm:px-0">
            <motion.div
              className="mb-5 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-newsreader text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.1] tracking-tight text-[#1A2D63]">
                <span className="block font-extralight">
                  Wat AI voor anderen
                </span>
                <span className="block font-bold italic">heeft gedaan</span>
              </h1>
            </motion.div>

            <motion.p
              className="font-instrument text-base sm:text-[17px] md:text-lg text-[#475D8F] leading-relaxed max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Echte resultaten. Echte bedrijven. Echte besparingen.
            </motion.p>

            <motion.p
              className="mt-4 text-xs text-[#475D8F]/50 max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              *Voorbeelden gebaseerd op gemiddelde klantresultaten
            </motion.p>
          </div>
        </div>
      </header>

      {/* ============================================ */}
      {/* CASE STUDY CARDS                             */}
      {/* ============================================ */}
      <section
        id="case-studies"
        className="py-12 md:py-20 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]"
      >
        <div className="max-w-[900px] mx-auto space-y-8 md:space-y-10">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-2xl border border-[#1A2D63]/10 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-7 md:p-10">
                {/* Sector badge */}
                <div className="mb-5">
                  <span className="inline-block bg-[#1A2D63]/[0.06] text-[#1A2D63] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {study.sector}
                  </span>
                </div>

                {/* Company heading */}
                <h3 className="font-newsreader text-2xl md:text-3xl text-[#1A2D63] font-semibold mb-6 leading-tight">
                  {study.heading}
                </h3>

                {/* 3-column stats: Before -> After -> Result */}
                <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 md:gap-4 mb-8">
                  <div className="flex-1 bg-[#1A2D63]/[0.03] rounded-xl p-5 text-center border border-[#1A2D63]/[0.06]">
                    <p className="text-[10px] uppercase tracking-widest text-[#1A2D63]/40 mb-2 font-medium">
                      Voorheen
                    </p>
                    <p className="text-2xl md:text-3xl font-newsreader text-[#1A2D63] font-semibold leading-none">
                      {study.statsBefore}
                    </p>
                  </div>
                  <div className="flex items-center justify-center px-1">
                    <ArrowRight className="w-5 h-5 text-[#1A2D63]/20 rotate-90 sm:rotate-0" />
                  </div>
                  <div className="flex-1 bg-[#1A2D63]/[0.03] rounded-xl p-5 text-center border border-[#1A2D63]/[0.06]">
                    <p className="text-[10px] uppercase tracking-widest text-[#1A2D63]/40 mb-2 font-medium">
                      Nu
                    </p>
                    <p className="text-2xl md:text-3xl font-newsreader text-[#1A2D63] font-semibold leading-none">
                      {study.statsAfter}
                    </p>
                  </div>
                  <div className="flex items-center justify-center px-1">
                    <ArrowRight className="w-5 h-5 text-[#1A2D63]/20 rotate-90 sm:rotate-0" />
                  </div>
                  <div className="flex-1 bg-[#1A2D63] rounded-xl p-5 text-center shadow-lg shadow-[#1A2D63]/15">
                    <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2 font-medium">
                      Resultaat
                    </p>
                    <p className="text-2xl md:text-3xl font-newsreader text-white font-semibold leading-none">
                      {study.resultPercent}
                    </p>
                    <p className="text-white/60 text-xs mt-1">tijdsbesparing</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#475D8F] text-[15px] leading-relaxed mb-6">
                  {study.description}
                </p>

                {/* Quote */}
                <div className="border-l-[3px] border-[#1A2D63]/20 pl-5 mb-8">
                  <blockquote className="font-newsreader text-lg md:text-xl text-[#1A2D63] italic leading-relaxed">
                    &ldquo;{study.quote}&rdquo;
                  </blockquote>
                  <p className="font-instrument text-sm text-[#475D8F]/60 mt-2">
                    &mdash; {study.quotePerson}
                  </p>
                </div>

                {/* CTA per card */}
                <button
                  type="button"
                  onClick={() => {
                    openForm();
                    pushEvent("cta_click", {
                      cta_label: `case_study_${index}_calendly`,
                      location: "lp_case_studies_card",
                    });
                  }}
                  className="group inline-flex items-center gap-2 text-[#1A2D63] font-medium text-[15px] hover:text-[#2A4488] transition-colors"
                >
                  <span>Vergelijkbare resultaten? Plan een gesprek</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={1} />

      {/* ============================================ */}
      {/* SUMMARY + CTA                                */}
      {/* ============================================ */}
      <section
        id="summary"
        className="py-16 md:py-24 pb-24 md:pb-36 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]"
      >
        <div className="max-w-[900px] mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
              Gemiddelde resultaten van{" "}
              <span className="relative inline-block">
                <span className="relative z-10">onze klanten</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-[0.35em] z-0"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 14 Q40 4 100 12 Q160 18 197 8"
                    stroke="#1A2D63"
                    strokeOpacity="0.15"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
          </motion.div>

          {/* Summary counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-16">
            {summaryStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-7 md:p-8 text-center border border-[#1A2D63]/[0.06] shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-newsreader text-[#1A2D63] font-semibold leading-none mb-2"
                >
                  {stat.value}
                </p>
                <p className="text-[#475D8F] text-sm mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Final CTA card */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#B8C5E6] rounded-full blur-[120px] opacity-30" />
            <motion.div
              className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#1A2D63]/10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-newsreader text-3xl md:text-4xl lg:text-5xl text-[#1A2D63] mb-4">
                Jouw bedrijf kan dit ook
              </h2>
              <p className="text-[#1A2D63]/60 text-lg mb-8 max-w-lg mx-auto">
                Plan een vrijblijvend gesprek van 30 minuten. Wij laten je zien
                waar de grootste kansen liggen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                {[
                  "Vrijblijvend",
                  "Geen technische kennis nodig",
                  "Resultaat binnen 4 weken",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#1A2D63]"
                  >
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "final_calendly",
                    location: "lp_case_studies_final_cta",
                  });
                }}
                className="inline-flex items-center gap-2 md:gap-3 bg-[#1A2D63] text-white px-6 py-3.5 md:px-10 md:py-5 rounded-full text-base md:text-lg font-medium hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Plan je gratis gesprek
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER                                       */}
      {/* ============================================ */}
      <footer className="bg-[#1A2D63] text-white pt-12 md:pt-16 pb-10 md:pb-12 px-6 relative overflow-visible">
        <div
          className="absolute top-0 left-0 w-full"
          style={{ transform: "translateY(-99%)" }}
        >
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2278 683"
            className="w-full h-16 md:h-20 lg:h-24 block"
            style={{ overflow: "visible" }}
          >
            <path
              fill="#1A2D63"
              d="M0-0.3C0-0.3,464,120,1139,120S2278-0.3,2278-0.3V683H0V-0.3z"
            />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[1.3fr_1fr] items-start">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-newsreader leading-tight mb-4 text-center lg:text-left">
                Klaar om uw bedrijf
                <br />
                te automatiseren?
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-6 max-w-md text-center lg:text-left mx-auto lg:mx-0">
                Ontdek hoe AI uw bedrijfsprocessen kan transformeren.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => {
                    openForm();
                    pushEvent("cta_click", {
                      cta_label: "footer_calendly",
                      location: "lp_case_studies_footer",
                    });
                  }}
                  className="bg-white text-[#1A2D63] px-6 py-3 rounded-full text-base font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Plan een gesprek
                </button>
                <a
                  href="mailto:contact@finitsolutions.be"
                  onClick={() =>
                    pushEvent("contact_click", {
                      method: "email",
                      location: "lp_case_studies_footer",
                    })
                  }
                  className="border border-white/20 px-6 py-3 rounded-full text-base font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@finitsolutions.be
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7 shadow-lg shadow-black/10">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-white/70 mt-0.5" />
                  <div className="flex flex-col">
                    <span>+32 (0)495 702 314</span>
                    <span>+32 (0)468 029 945</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white/70" />
                  <a
                    href="mailto:contact@finitsolutions.be"
                    className="hover:text-white transition-colors"
                  >
                    contact@finitsolutions.be
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-white/70" />
                  <a
                    href="https://www.linkedin.com/company/finitsolutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-white/60">
              <img
                src="/Finit Logo Blue@4x.png"
                alt="Finit Logo"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60 md:gap-6">
              <span>BTW: BE1020600643</span>
              <a
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacybeleid
              </a>
              <a
                href="/cookieverklaring"
                className="hover:text-white transition-colors"
              >
                Cookieverklaring
              </a>
              <a
                href="/disclaimer"
                className="hover:text-white transition-colors"
              >
                Disclaimer
              </a>
              <div className="text-sm text-white/60 [&>button]:text-white/60 [&>button]:hover:text-white [&>button]:transition-colors">
                <CookieSettingsLink />
              </div>
            </div>
            <p className="text-sm text-white/40">
              &copy; {currentYear} Finit Solutions
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================ */}
      {/* STICKY MOBILE CTA                            */}
      {/* ============================================ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300"
        style={{
          transform: showStickyMobileCTA
            ? "translateY(0)"
            : "translateY(100%)",
          opacity: showStickyMobileCTA ? 1 : 0,
        }}
      >
        <div className="bg-[#FDFBF7]/90 backdrop-blur-xl border-t border-[#1A2D63]/10 px-4 py-3">
          <button
            type="button"
            onClick={() => {
              openForm();
              pushEvent("cta_click", {
                cta_label: "sticky_mobile_calendly",
                location: "lp_case_studies_sticky",
              });
            }}
            className="flex items-center justify-center gap-2.5 bg-[#1A2D63] text-white w-full py-3 rounded-full text-[15px] font-medium shadow-lg shadow-[#1A2D63]/20"
          >
            <Calendar className="w-4 h-4" />
            Plan je gratis gesprek
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
