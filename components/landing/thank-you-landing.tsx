"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowLeft,
} from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { pushEvent } from "@/lib/analytics";
import { LandingFooter } from "@/components/landing/landing-footer";

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
// ANIMATED CHECKMARK
// ============================================

const AnimatedCheckmark = () => (
  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8">
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        cx="48"
        cy="48"
        r="44"
        stroke="#1A2D63"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d="M28 50 L42 64 L68 34"
        stroke="#1A2D63"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      />
    </svg>
  </div>
);

// ============================================
// DATA
// ============================================

const nextSteps = [
  {
    number: "01",
    title: "We nemen contact met je op",
    description:
      "Binnen 24 uur neemt een van ons persoonlijk contact met je op om een kort gesprek in te plannen.",
  },
  {
    number: "02",
    title: "We bespreken jouw situatie",
    description:
      "We bekijken hoe jouw bedrijf vandaag werkt, waar je tijd verliest en waar verbetering mogelijk is.",
  },
  {
    number: "03",
    title: "Je ontvangt een concreet voorstel",
    description:
      "Je krijgt een helder plan met wat we aanpakken, wat het kost en wat je mag verwachten.",
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export function ThankYouLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const currentYear = new Date().getFullYear();

  // Fire conversion event on mount
  useEffect(() => {
    pushEvent("form_submitted", {
      location: "lp_thankyou",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavScrollProgress(Math.min(scrollY / 100, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2D63] font-instrument selection:bg-[#B8C5E6] selection:text-[#1A2D63] overflow-x-hidden">
      <NoiseOverlay />

      {/* ============================================ */}
      {/* LIGHTWEIGHT NAV (logo only)                  */}
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
          className="max-w-[1400px] mx-auto flex items-center justify-center px-4 sm:px-6 relative"
          style={{
            paddingTop: `${12 + (1 - navScrollProgress) * 12}px`,
            paddingBottom: `${12 + (1 - navScrollProgress) * 12}px`,
            transition: "padding 0.3s",
          }}
        >
          <a
            href="/"
            className="absolute left-4 sm:left-6 flex items-center gap-1.5 text-[#1A2D63]/50 hover:text-[#1A2D63] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Terug naar home</span>
          </a>
          <a href="/" className="flex items-center gap-3">
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              style={{
                height: `${24 + (1 - navScrollProgress) * 6}px`,
                transition: "height 0.3s",
              }}
              className="w-auto object-contain md:hidden"
            />
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              style={{
                height: `${32 + (1 - navScrollProgress) * 14}px`,
                transition: "height 0.3s",
              }}
              className="w-auto object-contain hidden md:block"
            />
          </a>
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO - Thank you message                     */}
      {/* ============================================ */}
      <header className="relative pt-44 lg:pt-52 pb-6 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Animated Checkmark */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <AnimatedCheckmark />
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="font-newsreader text-[2.5rem] sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.1] tracking-tight text-[#1A2D63] mb-4 md:mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Bedankt voor je{" "}
            <span className="relative inline-block">
              <span className="relative z-10">aanvraag!</span>
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
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-instrument text-base sm:text-[17px] md:text-lg lg:text-xl text-[#475D8F] leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            Je informatie is goed aangekomen. We nemen zo snel mogelijk contact met je op — meestal binnen 24 uur.
          </motion.p>

          <motion.div className="flex items-center justify-center gap-2.5 mt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#1A2D63]/40 font-medium">Ondersteund door</span>
            <img src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" className="h-5 sm:h-7 w-auto object-contain" />
            <img src="/SI @KBC Black (2).png" alt="Start it @KBC" className="h-5 sm:h-7 w-auto object-contain" />
          </motion.div>
        </div>
      </header>

      {/* Scroll connector line */}
      <motion.div
        className="flex justify-center bg-[#FDFBF7] pb-2 -mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <div className="w-[1.5px] h-32 bg-gradient-to-b from-[#1A2D63]/0 via-[#1A2D63]/35 to-[#1A2D63]/0" />
      </motion.div>

      {/* ============================================ */}
      {/* WHAT HAPPENS NEXT — 3 step cards             */}
      {/* ============================================ */}
      <section
        id="next-steps"
        className="pt-2 pb-12 md:pb-16 px-6 md:px-12 bg-[#FDFBF7]"
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15] mb-4">
              Wat gebeurt er{" "}
              <span className="relative inline-block">
                <span className="relative z-10">nu?</span>
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
            <p className="text-[#1A2D63]/60 text-lg md:text-xl max-w-xl mx-auto">
              Drie duidelijke stappen. Zo weet je precies wat je mag verwachten.
            </p>
          </div>

          {/* 3 step cards — homepage process card styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2 md:pt-3">
            {nextSteps.map((step, index) => {
              const opacityClass =
                index === 0
                  ? "text-[#1A2D63]/[0.18]"
                  : index === 1
                    ? "text-[#1A2D63]/[0.22]"
                    : "text-[#1A2D63]/[0.28]";
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.7 + index * 0.1 }}
                >
                  {/* Watermark number */}
                  <span
                    className={`absolute -top-4 -left-2 md:-top-5 md:-left-3 font-newsreader text-6xl md:text-7xl font-light ${opacityClass} select-none pointer-events-none z-10`}
                  >
                    {step.number}
                  </span>
                  <div className="bg-white rounded-3xl p-8 md:p-10 h-full shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)] relative">
                    <h3 className="font-newsreader text-2xl md:text-3xl font-semibold text-[#1A2D63] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[#1A2D63]/65 text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTACT / QUESTIONS SECTION                  */}
      {/* ============================================ */}
      <section
        id="contact"
        className="pt-6 md:pt-8 pb-12 md:pb-20 px-6 md:px-12 bg-[#FDFBF7] relative"
      >
        <div className="max-w-[800px] mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-[#B8C5E6] rounded-full blur-[120px] opacity-30" />
            <motion.div
              className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#1A2D63]/10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] mb-6">
                Vragen in de tussentijd?
              </h2>
              <p className="text-[#475D8F]/70 text-xs font-instrument tracking-widest uppercase mb-2">
                Bel gerust op
              </p>
              <a
                href="tel:+32495702314"
                onClick={() => pushEvent("contact_click", { method: "phone", location: "lp_thankyou_contact" })}
                className="font-newsreader text-[#1A2D63] text-4xl md:text-5xl leading-tight underline underline-offset-4 decoration-[#1A2D63]/20 hover:decoration-[#1A2D63]/60 hover:text-[#2A4488] transition-colors block mb-1"
              >
                +32 495 70 23 14
              </a>
              <p className="text-[#475D8F] text-sm font-instrument mb-6">ma-za · 8u30-19u</p>

              <div className="w-10 h-px bg-[#1A2D63]/15 mx-auto mb-6" />

              <a
                href="mailto:contact@finitsolutions.be"
                onClick={() => pushEvent("contact_click", { method: "email", location: "lp_thankyou_contact" })}
                className="inline-flex items-center gap-2 bg-[#1A2D63] text-white px-6 py-3.5 rounded-full text-base font-medium hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Mail className="w-4 h-4" />
                contact@finitsolutions.be
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
