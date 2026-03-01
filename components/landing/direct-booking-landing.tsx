"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { EmbeddedContactForm } from "@/components/contact-form-popup";
import { pushEvent } from "@/lib/analytics";
import { LandingCTA } from "@/components/landing/landing-cta";
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
// CHECKLIST DATA
// ============================================

const checklistItems = [
  "Analyse van je huidige processen",
  "Concrete besparingskansen",
  "Een eerlijk advies \u2014 ook als AI niet past",
  "Vaste prijs \u2014 geen verrassingen",
];

// ============================================
// SECTION DIVIDERS
// ============================================

const sectionDividerData = [
  {
    fill: "M0,70 C480,130 960,-10 1920,50",
    navy: "M0,62 C480,110 960,-18 1920,34 L1920,60 C960,4 480,146 0,78 Z",
    light: "M0,78 C480,146 960,4 1920,60 L1920,74 C960,14 480,164 0,88 Z",
  },
];

const SectionDivider = ({
  fromColor,
  toColor,
}: {
  fromColor: string;
  toColor: string;
}) => {
  const data = sectionDividerData[0];
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

export function DirectBookingLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavScrollProgress(Math.min(scrollY / 100, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FDFBF7] text-[#1A2D63] font-instrument selection:bg-[#B8C5E6] selection:text-[#1A2D63] overflow-x-hidden">
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

          {/* Desktop phone */}
          <a
            href="tel:+32495702314"
            className="hidden md:flex items-center gap-2 text-[#1A2D63]/60 text-sm font-medium hover:text-[#1A2D63] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+32 (0)495 702 314</span>
          </a>
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO + EMBEDDED FORM                         */}
      {/* ============================================ */}
      <header
        className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-12 bg-[#FDFBF7]"
        style={{
          paddingTop: "clamp(64px, 10vh, 96px)",
          paddingBottom: "clamp(12px, 2.5vh, 40px)",
        }}
      >
        <div className="max-w-[980px] mx-auto w-full">
          {/* Heading */}
          <motion.div
            className="text-center"
            style={{ marginBottom: "clamp(12px, 2.5vh, 36px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1
              className="font-newsreader leading-[1.1] tracking-tight text-[#1A2D63]"
              style={{
                fontSize: "clamp(2rem, 6.5vh, 3.75rem)",
                marginBottom: "clamp(6px, 1.2vh, 16px)",
              }}
            >
              Plan je gratis{" "}
              <span className="relative inline-block">
                <span className="relative z-10">analyse</span>
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
            </h1>
            <p
              className="font-instrument text-[#475D8F] leading-relaxed max-w-xl mx-auto"
              style={{ fontSize: "clamp(0.95rem, 2.2vh, 1.2rem)" }}
            >
              Vul je gegevens in en we nemen binnen 24 uur contact op om een gratis analyse van 30 minuten in te plannen.
              Daarin ontdek je waar AI in jouw bedrijf concreet tijd kan besparen.
            </p>
          </motion.div>

          {/* Form + phone card side-by-side on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">

            {/* Left: form */}
            <div className="flex-1 min-w-0">
              {/* Embedded form card */}
              <motion.div
                className="w-full bg-white rounded-3xl shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)] border border-[#1A2D63]/[0.06]"
                style={{ padding: "clamp(1rem, 3vh, 2.5rem)" }}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <EmbeddedContactForm />
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              className="flex lg:flex-col items-center gap-3 my-5 lg:my-0 lg:self-stretch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="flex-1 h-px lg:h-auto lg:w-px w-full bg-[#1A2D63]/10" />
              <span className="text-sm font-instrument text-[#1A2D63]/35 whitespace-nowrap">of</span>
              <div className="flex-1 h-px lg:h-auto lg:w-px w-full bg-[#1A2D63]/10" />
            </motion.div>

            {/* Right: phone card */}
            <motion.div
              className="flex-1 min-w-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a
                href="tel:+32495702314"
                onClick={() => pushEvent("contact_click", { method: "phone", location: "direct_booking_card" })}
                className="w-full block bg-white rounded-2xl px-6 py-8 border border-[#1A2D63]/[0.06] shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)] flex flex-col items-center gap-2 text-center hover:shadow-[0_1px_0_0_rgba(26,45,99,0.15),0_6px_12px_-1px_rgba(26,45,99,0.2),0_16px_28px_-3px_rgba(26,45,99,0.25),0_28px_50px_-8px_rgba(26,45,99,0.2)] transition-shadow"
              >
                <p className="text-[#475D8F]/70 text-xs font-instrument tracking-widest uppercase">Bel gerust op</p>
                <span className="font-newsreader text-[#1A2D63] text-3xl leading-tight">
                  +32 495 70 23 14
                </span>
                <div className="w-10 h-px bg-[#1A2D63]/15 my-0.5" />
                <p className="text-[#475D8F] text-sm font-instrument">
                  ma-za · 8u30-19u
                </p>
              </a>
            </motion.div>

          </div>

          {/* Trust signal + logos — full width, centered */}
          <motion.p
            className="text-center text-base text-[#1A2D63]/50"
            style={{ marginTop: "clamp(28px, 4vh, 52px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            We helpen een beperkt aantal bedrijven tegelijk.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-3.5"
            style={{ marginTop: "clamp(14px, 2.5vh, 32px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#1A2D63]/40 font-medium">Ondersteund door</span>
            <img src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" className="w-auto object-contain" style={{ height: "clamp(20px, 3vh, 34px)" }} />
            <img src="/SI @KBC Black (2).png" alt="Start it @KBC" className="w-auto object-contain" style={{ height: "clamp(20px, 3vh, 34px)" }} />
          </motion.div>
        </div>
      </header>

      <LandingFooter />
    </div>
  );
}
