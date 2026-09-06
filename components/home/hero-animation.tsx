"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, FileText, Sparkles } from "lucide-react";

/**
 * HeroAnimation
 *
 * Loopt in vier beats:
 *   0. WhatsApp van een klant komt binnen
 *   1. het brein leest mee
 *   2. er staat een offerte klaar
 *   3. de zaakvoerder tikt "ok" en ze vertrekt
 *
 * Geen stockfoto, geen video: alles is DOM, dus scherp op elk scherm
 * en het laadt niets extra. Bij prefers-reduced-motion staat de
 * eindtoestand meteen stil op het scherm.
 */

const STEP_DURATIONS = [2200, 1500, 2800, 3200];

const KLANT_BERICHT =
  "Dag! Wat kost het om 6 stopcontacten en 2 schakelaars te plaatsen in de living?";

export function HeroAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(prefersReducedMotion ? 3 : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStep(3);
      return;
    }
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % 4);
    }, STEP_DURATIONS[step]);
    return () => clearTimeout(timer);
  }, [step, prefersReducedMotion]);

  const show = (from: number) => step >= from;

  return (
    <div className="relative w-full max-w-[26rem] mx-auto lg:mx-0">
      {/* Zachte gloed achter de kaart */}
      <div
        className="absolute -inset-8 bg-[#B8C5E6] rounded-full blur-[80px] opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-3xl border border-[#1A2D63]/10 shadow-[0_20px_60px_-15px_rgba(26,45,99,0.25)] overflow-hidden">
        {/* Kop: WhatsApp-context */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[#1A2D63]/[0.07] bg-[#FDFBF7]">
          <span className="w-2 h-2 rounded-full bg-[#25D366]" aria-hidden="true" />
          <span className="font-instrument text-sm font-medium text-[#1A2D63]">
            WhatsApp
          </span>
          <span className="ml-auto font-instrument text-xs text-[#475D8F]/60">
            zondag, 21.04
          </span>
        </div>

        <div className="px-5 py-5 min-h-[19rem] sm:min-h-[20rem] flex flex-col gap-3">
          {/* 0. Bericht van de klant */}
          <AnimatePresence>
            {show(0) && (
              <motion.div
                key="klant"
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="max-w-[85%]"
              >
                <div className="bg-[#F1F3F8] rounded-2xl rounded-tl-md px-4 py-3">
                  <p className="font-instrument text-[0.9rem] leading-snug text-[#1A2D63]">
                    {KLANT_BERICHT}
                  </p>
                </div>
                <span className="font-instrument text-[0.7rem] text-[#475D8F]/50 pl-2">
                  Klant · 21.04
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 1. Het brein leest mee */}
          <AnimatePresence>
            {show(1) && (
              <motion.div
                key="brein"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-2 self-end"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1A2D63]/50" />
                <span className="font-instrument text-[0.75rem] text-[#475D8F]">
                  je AI-brein leest mee
                </span>
                {step === 1 && (
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#1A2D63]/40"
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.18,
                        }}
                      />
                    ))}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. De offerte staat klaar */}
          <AnimatePresence>
            {show(2) && (
              <motion.div
                key="offerte"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="self-end w-[92%] bg-[#1A2D63] rounded-2xl rounded-tr-md px-4 py-3.5 text-white shadow-lg shadow-[#1A2D63]/20"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <FileText className="w-3.5 h-3.5 text-white/70" />
                  <span className="font-instrument text-[0.7rem] uppercase tracking-[0.14em] text-white/70">
                    Offerte klaar
                  </span>
                </div>
                <ul className="font-instrument text-[0.85rem] leading-relaxed space-y-1 text-white/85">
                  <li className="flex justify-between gap-3">
                    <span>6 stopcontacten, geplaatst</span>
                    <span className="tabular-nums">294</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>2 schakelaars, geplaatst</span>
                    <span className="tabular-nums">88</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>Voorrijkost</span>
                    <span className="tabular-nums">45</span>
                  </li>
                </ul>
                <div className="mt-2.5 pt-2.5 border-t border-white/15 flex justify-between items-baseline">
                  <span className="font-instrument text-[0.8rem] text-white/70">
                    Totaal excl. btw
                  </span>
                  <span className="font-newsreader text-xl tabular-nums">
                    427 euro
                  </span>
                </div>
                <p className="mt-2 font-instrument text-[0.75rem] text-white/60">
                  Jouw prijzen, jouw voorwaarden. Versturen?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Jij tikt ok */}
          <AnimatePresence>
            {show(3) && (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="self-end flex flex-col items-end gap-1.5"
              >
                <div className="bg-[#E6EBF5] rounded-2xl rounded-tr-md px-4 py-2">
                  <span className="font-instrument text-[0.9rem] text-[#1A2D63]">
                    ok
                  </span>
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-1.5 font-instrument text-[0.75rem] text-[#475D8F]"
                >
                  <Check className="w-3.5 h-3.5 text-[#25D366]" />
                  Verstuurd naar de klant om 21.05
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Onderschrift */}
      <p className="mt-4 text-center lg:text-left font-instrument text-sm text-[#475D8F]/70">
        Totale tijd van jou: twee letters.
      </p>
    </div>
  );
}

export default HeroAnimation;
