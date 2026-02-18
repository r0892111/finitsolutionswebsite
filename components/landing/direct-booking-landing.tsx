"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Calendar,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { useContactForm, ContactFormPopup, EmbeddedContactForm } from "@/components/contact-form-popup";
import { pushEvent } from "@/lib/analytics";

// ============================================
// DATA
// ============================================

const checklistItems = [
  "Analyse van je huidige processen",
  "Identificatie van automatiseringskansen",
  "Concrete ROI-schatting",
  "Geen verplichtingen, geen verkooppraatje",
];

// ============================================
// NOISE OVERLAY (same as main site)
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
// MAIN COMPONENT
// ============================================

export function DirectBookingLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const currentYear = new Date().getFullYear();
  const { isOpen, openForm, closeForm } = useContactForm();

  // Nav scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavScrollProgress(Math.min(scrollY / 100, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen overflow-x-hidden">
      <NoiseOverlay />

      {/* ============================================ */}
      {/* LIGHTWEIGHT NAV (logo only, no menu)         */}
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
        </div>
      </nav>

      {/* ============================================ */}
      {/* MAIN CONTENT - Single Screen Booking         */}
      {/* ============================================ */}
      <main className="pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-[800px] mx-auto">
          {/* Heading */}
          <motion.div
            className="text-center mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="font-newsreader text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[#1A2D63] mb-3">
              Plan je gratis gesprek
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-[#475D8F] leading-relaxed">
              30 minuten die je bedrijf kunnen veranderen
            </p>
          </motion.div>

          {/* Calendly Embed */}
          <motion.div
            className="mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <EmbeddedContactForm />
          </motion.div>

          {/* Checklist */}
          <motion.div
            className="mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="font-newsreader text-xl sm:text-2xl text-[#1A2D63] text-center mb-5">
              Wat je krijgt in dit gesprek
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {checklistItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-[#1A2D63]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1A2D63]/[0.08] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#1A2D63]" />
                  </div>
                  <span className="font-instrument text-sm sm:text-[15px] leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trust Signal */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="font-instrument text-sm text-[#475D8F]/70">
              Vrijblijvend &middot; Geen verplichtingen &middot; Binnen 24 uur reactie
            </p>
          </motion.div>
        </div>
      </main>

      {/* ============================================ */}
      {/* FOOTER (compact version)                     */}
      {/* ============================================ */}
      <footer className="bg-[#1A2D63] text-white pt-12 md:pt-16 pb-10 md:pb-12 px-6 relative overflow-visible">
        {/* Wave */}
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
                      location: "lp_direct_booking_footer",
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
                      location: "lp_direct_booking_footer",
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
      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
