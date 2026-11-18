"use client";

/**
 * Een kleine demo per oplossing op /cases (18/11): een venstertje waarin het werk
 * van de module stap na stap gebeurt. Een bericht komt binnen, krijgt een label,
 * velden vullen zich, een antwoord typt zich, en onderaan staat het resultaat.
 * Daarna begint het opnieuw. Eén sjabloon voor alle cases; het verloop staat in
 * cases.ts (`demo`).
 *
 * Speelt alleen als het venstertje in beeld is. Wie minder beweging wil
 * (prefers-reduced-motion), ziet meteen het eindbeeld. De demo is decoratie bij
 * de tekst ernaast, dus verborgen voor schermlezers.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, HelpCircle, Mail, MessageCircle, Sparkles } from "lucide-react";
import { CASES } from "./copy";
import type { Demo, DemoStap } from "./cases";

/** Hoe lang een stap blijft staan voor de volgende komt, in ms. */
function duur(s: DemoStap): number {
  if (s.t === "typen") return s.tekst.length * 24 + 700;
  if (s.t === "sync") return s.systemen.length * 350 + 900;
  if (s.t === "bericht") return 1100;
  return 850;
}

const BRON_ICOON = { mail: Mail, whatsapp: MessageCircle, vraag: HelpCircle };

const IN = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.35, ease: "easeOut" } } as const;

function Getypt({ tekst, stil }: { tekst: string; stil: boolean }) {
  const [i, setI] = useState(stil ? tekst.length : 0);
  useEffect(() => {
    if (i >= tekst.length) return;
    const t = setTimeout(() => setI(i + 1), 22);
    return () => clearTimeout(t);
  }, [i, tekst]);
  return (
    <>
      {tekst.slice(0, i)}
      {i < tekst.length && <span className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-[#1A2D63]" />}
    </>
  );
}

function Stap({ s, stil }: { s: DemoStap; stil: boolean }) {
  switch (s.t) {
    case "bericht": {
      const Icoon = BRON_ICOON[s.bron];
      return (
        <div className="flex items-start gap-2.5 rounded-[12px] bg-[#F5F7FB] p-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#1A2D63]">
            <Icoon className="h-3.5 w-3.5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[0.75rem] font-semibold text-[#1A2D63]">{s.van}</span>
            <span className="block text-[0.8125rem] leading-[1.45] text-[#3D4766]">{s.tekst}</span>
          </span>
        </div>
      );
    }
    case "label":
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.75rem] font-medium ${s.zacht ? "border border-[#E3E7EF] text-[#6C7590]" : "bg-[#E6ECF9] text-[#1A2D63]"}`}>
          <Sparkles className="h-3 w-3 text-[#E9A13B]" />
          {s.tekst}
        </span>
      );
    case "veld":
      return (
        <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-[#E3E7EF] pb-1.5 text-[0.8125rem]">
          <span className="text-[#6C7590]">{s.label}</span>
          <span className="text-right font-medium text-[#1A2D63]">{s.waarde}</span>
        </div>
      );
    case "typen":
      return (
        <div className="ml-6 rounded-[12px] border border-[#E3E7EF] p-3 text-[0.8125rem] leading-[1.5] text-[#1A2D63]">
          <Getypt tekst={s.tekst} stil={stil} />
        </div>
      );
    case "sync":
      return (
        <div className="grid grid-cols-2 gap-2">
          {s.systemen.map((naam, i) => (
            <motion.span
              key={naam}
              initial={stil ? false : { backgroundColor: "#F5F7FB", color: "#6C7590" }}
              animate={{ backgroundColor: "#E6ECF9", color: "#1A2D63" }}
              transition={{ delay: stil ? 0 : 0.25 + i * 0.35, duration: 0.3 }}
              className="flex items-center justify-between rounded-[10px] px-3 py-2 text-[0.8125rem] font-medium"
            >
              {naam}
              <motion.span initial={stil ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ delay: stil ? 0 : 0.35 + i * 0.35, type: "spring", stiffness: 400, damping: 18 }}>
                <Check className="h-3.5 w-3.5" />
              </motion.span>
            </motion.span>
          ))}
        </div>
      );
    case "klaar":
      return (
        <div className="flex items-center gap-2.5 rounded-[12px] bg-[#1A2D63] px-3 py-2.5 text-[0.8125rem] font-medium text-white">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E9A13B] text-[#1A2D63]">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {s.tekst}
        </div>
      );
  }
}

export function CaseDemo({ demo }: { demo: Demo }) {
  const ref = useRef<HTMLDivElement>(null);
  const inBeeld = useInView(ref, { margin: "-10% 0px" });
  const stil = useReducedMotion() ?? false;
  const [n, setN] = useState(0);
  // Elke ronde krijgt een nieuwe sleutel, zodat alles opnieuw inschuift.
  const [ronde, setRonde] = useState(0);

  useEffect(() => {
    if (stil) {
      setN(demo.stappen.length);
      return;
    }
    if (!inBeeld) return;
    const klaar = n >= demo.stappen.length;
    const wacht = klaar ? 3200 : n === 0 ? 400 : duur(demo.stappen[n - 1]);
    const t = setTimeout(() => {
      if (klaar) {
        setN(0);
        setRonde((r) => r + 1);
      } else setN(n + 1);
    }, wacht);
    return () => clearTimeout(t);
  }, [n, inBeeld, stil, demo.stappen]);

  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden rounded-[16px] border border-[#E3E7EF] bg-white">
      <div className="flex items-center justify-between border-b border-[#E3E7EF] bg-[#F5F7FB] px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-[#1A2D63]/15" />
            <span className="h-2 w-2 rounded-full bg-[#1A2D63]/15" />
            <span className="h-2 w-2 rounded-full bg-[#1A2D63]/15" />
          </span>
          <span className="text-[0.75rem] font-semibold text-[#1A2D63]">{demo.venster}</span>
        </span>
        <span className="flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[#6C7590]">
          <span className="relative flex h-2 w-2">
            {!stil && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E9A13B] opacity-60" />}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E9A13B]" />
          </span>
          {CASES.detail.demo}
        </span>
      </div>
      {/* Hoog genoeg voor de langste demo (Mailbox), zodat de kaart niet verspringt. */}
      <div className="min-h-[22rem] p-4">
        {/* Aan het einde van een ronde vervaagt alles samen; daarna schuift de nieuwe ronde stap voor stap in. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={ronde} exit={{ opacity: 0, transition: { duration: 0.3 } }} className="flex flex-col items-start gap-2.5">
            {demo.stappen.slice(0, n).map((s, i) => (
              <motion.div key={i} {...(stil ? {} : IN)} className={s.t === "label" ? "" : "w-full"}>
                <Stap s={s} stil={stil} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
