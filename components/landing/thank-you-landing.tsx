"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lightbulb,
  Video,
  Phone,
  Linkedin,
} from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-settings-link";

// ============================================
// DATA
// ============================================

const CALENDLY_URL =
  "https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions";

const timelineSteps = [
  {
    icon: Mail,
    title: "Check je inbox",
    description:
      "Je krijgt een bevestigingsmail met de link voor het gesprek.",
  },
  {
    icon: Lightbulb,
    title: "Denk alvast na over...",
    description:
      "Welke taken kosten jou en je team de meeste tijd? Waar lopen dingen vast of gaan ze te traag? Welke tools gebruik je al (CRM, e-mail, facturatie)?",
  },
  {
    icon: Video,
    title: "We zien je bij het gesprek",
    description:
      "30 minuten, vrijblijvend. We doen het zware denkwerk.",
  },
];

// ============================================
// ANALYTICS
// ============================================

function pushDataLayerEvent(
  event: string,
  params?: Record<string, string>
) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...params });
  }
}

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
// ANIMATED CHECKMARK
// ============================================

const AnimatedCheckmark = () => (
  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8">
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle */}
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
      {/* Checkmark */}
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
// MAIN COMPONENT
// ============================================

export function ThankYouLanding() {
  const currentYear = new Date().getFullYear();

  // Fire conversion event on mount
  useEffect(() => {
    pushDataLayerEvent("booking_completed", {
      location: "lp_thank_you",
    });
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen overflow-x-hidden">
      <NoiseOverlay />

      {/* ============================================ */}
      {/* LIGHTWEIGHT NAV                              */}
      {/* ============================================ */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-[#1A2D63]/10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center px-4 sm:px-6 py-3 md:py-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              className="h-5 md:h-7 w-auto object-contain"
            />
          </a>
        </div>
      </nav>

      {/* ============================================ */}
      {/* MAIN CONTENT - Single screen                 */}
      {/* ============================================ */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-32 md:pt-40 pb-32">
        <div className="max-w-xl mx-auto w-full text-center">
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
            className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-tight mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Top! Je gesprek is ingepland
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-instrument text-base md:text-lg text-[#475D8F] mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            Je ontvangt een bevestiging per e-mail met alle details.
          </motion.p>

          {/* "Wat nu?" Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-6 md:mb-8">
              Wat nu?
            </h2>

            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-5 md:left-6 top-6 bottom-6 w-px bg-[#1A2D63]/10" />

              <div className="space-y-6 md:space-y-8">
                {timelineSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 md:gap-5 text-left"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.7 + index * 0.15,
                    }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#1A2D63]/10 flex items-center justify-center shrink-0 relative z-10">
                      <step.icon className="w-4 h-4 md:w-5 md:h-5 text-[#1A2D63]" />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-[15px] md:text-base font-semibold text-[#1A2D63] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-[15px] text-[#475D8F] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom links */}
          <motion.div
            className="mt-10 md:mt-14 pt-8 border-t border-[#1A2D63]/10 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <p className="text-sm text-[#475D8F]">
              Moet je je afspraak wijzigen?{" "}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  pushDataLayerEvent("cta_click", {
                    cta_label: "reschedule",
                    location: "lp_thank_you",
                  })
                }
                className="text-[#1A2D63] font-medium underline underline-offset-2 hover:text-[#2A4488] transition-colors"
              >
                Herplan hier
              </a>
            </p>
            <p className="text-sm text-[#475D8F]">
              Vragen in de tussentijd?{" "}
              <a
                href="mailto:contact@finitsolutions.be"
                onClick={() =>
                  pushDataLayerEvent("contact_click", {
                    method: "email",
                    location: "lp_thank_you",
                  })
                }
                className="text-[#1A2D63] font-medium underline underline-offset-2 hover:text-[#2A4488] transition-colors"
              >
                contact@finitsolutions.be
              </a>
            </p>
          </motion.div>
        </div>
      </main>

      {/* ============================================ */}
      {/* COMPACT FOOTER                               */}
      {/* ============================================ */}
      <footer className="bg-[#1A2D63] text-white py-8 md:py-10 px-6 relative overflow-visible">
        {/* Wave */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{ transform: "translateY(-99%)" }}
        >
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2278 683"
            className="w-full h-12 md:h-16 block"
            style={{ overflow: "visible" }}
          >
            <path
              fill="#1A2D63"
              d="M0-0.3C0-0.3,464,120,1139,120S2278-0.3,2278-0.3V683H0V-0.3z"
            />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col items-center gap-5 text-center">
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              className="h-7 w-auto object-contain brightness-0 invert"
            />

            <div className="flex items-center gap-4 text-sm text-white/60">
              <a
                href="mailto:contact@finitsolutions.be"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                contact@finitsolutions.be
              </a>
              <span className="text-white/20">|</span>
              <a
                href="https://www.linkedin.com/company/finitsolutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-white/40">
              <span>BTW: BE1020600643</span>
              <a href="/privacy" className="hover:text-white/60 transition-colors">
                Privacybeleid
              </a>
              <a href="/cookieverklaring" className="hover:text-white/60 transition-colors">
                Cookieverklaring
              </a>
              <a href="/disclaimer" className="hover:text-white/60 transition-colors">
                Disclaimer
              </a>
              <div className="text-xs text-white/40 [&>button]:text-white/40 [&>button]:hover:text-white/60 [&>button]:transition-colors">
                <CookieSettingsLink />
              </div>
            </div>

            <p className="text-xs text-white/30">
              &copy; {currentYear} Finit Solutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
