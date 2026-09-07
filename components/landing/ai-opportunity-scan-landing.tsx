"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  Play,
  Search,
  BrainCircuit,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { useContactForm, ContactFormPopup } from "@/components/contact-form-popup";
import { LandingFooter } from "@/components/landing/landing-footer";
import { pushEvent } from "@/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ============================================
// DATA
// ============================================

interface MethodStep {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
  result: string;
}

const methodSteps: MethodStep[] = [
  {
    number: "01",
    icon: Search,
    title: "Gratis AI Opportunity Scan",
    body: "We analyseren hoe jouw bedrijf vandaag werkt, waar de grootste opportuniteiten liggen en of AI voldoende potentieel heeft om een betekenisvolle impact te maken.",
    result:
      "Een duidelijk antwoord op de vraag of een AI-traject vandaag de investering waard is.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "AI Fundament (€3.500 excl. btw.)",
    body: "We brengen je bedrijf grondig in kaart, bouwen een AI-Brein en leggen processen, afspraken en bedrijfskennis centraal vast voor alle toekomstige AI-toepassingen.",
    result:
      "Elke toekomstige toepassing vertrekt vanuit dezelfde kennis van jouw bedrijf.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "AI-oplossingen & automatiseringen",
    body: "We bouwen concrete toepassingen die processen automatiseren, tijd besparen en je bedrijf efficiënter laten werken, stap voor stap vanuit hetzelfde fundament.",
    result: "Een slimme AI-omgeving die meegroeit met jouw bedrijf.",
  },
];

const practicalInfo: { label: string; value: string }[] = [
  { label: "Prijs", value: "AI Opportunity Scan: gratis" },
  { label: "Duur", value: "Ongeveer 45 minuten" },
  { label: "Locatie", value: "Online of bij ons op kantoor" },
  {
    label: "Vervolg",
    value:
      "Alleen wanneer we voldoende potentieel zien, werken we een voorstel uit voor het AI Fundament (€3.500 excl. btw.). Er is geen enkele verplichting om daarna verder te gaan.",
  },
];

const faqItems: { question: string; answer: string }[] = [
  {
    question: "Is de AI Opportunity Scan echt gratis?",
    answer: "Ja. De AI Opportunity Scan is volledig gratis en vrijblijvend.",
  },
  {
    question: "Ben ik verplicht om daarna verder te gaan?",
    answer:
      "Nee. Je beslist volledig zelf of je na de AI Opportunity Scan verdere stappen wilt zetten.",
  },
  {
    question: "Wat als AI vandaag onvoldoende potentieel heeft?",
    answer:
      "Dan zeggen we dat ook. Zo voorkom je een investering die vandaag onvoldoende rendement zou opleveren.",
  },
  {
    question: "Voor welke bedrijven is dit interessant?",
    answer:
      "Voor bedrijven die geloven dat AI potentieel heeft, maar eerst willen bepalen waar het de grootste impact kan maken en of een investering vandaag verantwoord is.",
  },
];

const heroBenefits = [
  "Ontdek waar AI vandaag het meeste tijd kan besparen",
  "Krijg een eerlijk advies, ook als AI vandaag nog niet de juiste stap is",
  "Vertrek vanuit een doordachte aanpak in plaats van losse AI-experimenten",
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
// HAND-DRAWN CHECKMARK
// ============================================

const HandDrawnCheck = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.5 13.5C5 15 8.5 18.5 9.5 19.5C12 15 16 9 21 4.5"
      stroke="#1A2D63"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================
// SECTION DIVIDERS
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
  accent = true,
}: {
  fromColor: string;
  toColor: string;
  variant?: number;
  accent?: boolean;
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
        {accent && <path d={data.light} fill="#7B8DB5" />}
      </svg>
    </div>
  );
};

// ============================================
// UNDERLINE SCRIBBLE (reusable heading accent)
// ============================================

const Scribble = () => (
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
);

// ============================================
// MAIN COMPONENT
// ============================================

export function AiOpportunityScanLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { isOpen, openForm, closeForm } = useContactForm();

  useEffect(() => {
    const handleScroll = () => {
      setNavScrollProgress(Math.min(window.scrollY / 100, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openScan = (label: string, location: string) => {
    openForm();
    pushEvent("cta_click", { cta_label: label, location });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2D63] font-instrument selection:bg-[#B8C5E6] selection:text-[#1A2D63] overflow-x-hidden [&_h1]:[text-wrap:balance] [&_h2]:[text-wrap:balance] [&_h3]:[text-wrap:balance] [&_p]:[text-wrap:pretty] [&_li]:[text-wrap:pretty]">
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
            navScrollProgress > 0 ? `blur(${14 * navScrollProgress}px)` : "none",
          WebkitBackdropFilter:
            navScrollProgress > 0 ? `blur(${14 * navScrollProgress}px)` : "none",
          borderBottom: `1px solid rgba(26, 45, 99, ${0.1 * navScrollProgress})`,
          transition: "background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s",
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

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={() => openScan("nav_scan", "lp_opportunity_nav")}
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
            <span>Plan je gratis scan</span>
          </button>

          {/* Mobile CTA */}
          <button
            type="button"
            onClick={() => openScan("mobile_nav_scan", "lp_opportunity_mobile_nav")}
            className="md:hidden flex items-center gap-1.5 bg-[#1A2D63] text-white rounded-full text-xs font-medium px-3.5 py-2 transition-opacity duration-300"
            style={{
              opacity: navScrollProgress,
              pointerEvents: navScrollProgress > 0.5 ? "auto" : "none",
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Plan je gratis scan</span>
          </button>
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO — copy LEFT, VSL video RIGHT            */}
      {/* ============================================ */}
      <header
        ref={heroRef}
        className="relative max-w-[100vw] mx-auto"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 lg:pt-36 pb-16 md:pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT — copy */}
            <div className="text-center lg:text-left">
              <motion.h1
                className="font-newsreader text-4xl sm:text-5xl xl:text-[3.5rem] leading-[1.12] tracking-tight text-[#1A2D63] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Ontdek waar AI vandaag{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">écht waarde</span>
                  <Scribble />
                </span>{" "}
                kan creëren binnen jouw bedrijf.
              </motion.h1>

              <motion.p
                className="font-instrument text-lg md:text-xl text-[#475D8F] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                Tijdens een gratis AI Opportunity Scan bekijken we samen hoe jouw
                bedrijf vandaag werkt, waar de grootste opportuniteiten liggen en
                of een AI-traject voldoende waarde kan opleveren om de investering
                te verantwoorden.
              </motion.p>

              {/* 3 checkmark benefits */}
              <motion.ul
                className="flex flex-col items-start gap-3 mb-8 max-w-xl mx-auto lg:mx-0 text-left w-fit lg:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {heroBenefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#1A2D63]/80 text-base md:text-lg"
                  >
                    <HandDrawnCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                className="flex flex-col items-center lg:items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <button
                  type="button"
                  onClick={() => openScan("hero_scan", "lp_opportunity_hero")}
                  className="group bg-[#1A2D63] text-white px-7 py-3.5 rounded-full text-base font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Plan een gratis AI Opportunity Scan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-sm text-[#475D8F]/70 italic">
                  Gratis • ±45 minuten • Online of bij ons op kantoor
                </p>
              </motion.div>
            </div>

            {/* RIGHT — VSL video (placeholder) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {/* TODO: vervang door VSL YouTube-embed zodra geëdit.
                  Swap this whole placeholder block for:
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title="AI Opportunity Scan"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  /> */}
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#1A2D63] shadow-2xl border border-[#1A2D63]/10">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-8 h-8 text-white translate-x-0.5" fill="currentColor" />
                  </div>
                  <span className="font-instrument text-white/70 text-sm tracking-wide uppercase">
                    Video volgt binnenkort
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={0} />

      {/* ============================================ */}
      {/* 3-STEP METHOD                                */}
      {/* ============================================ */}
      <section
        id="aanpak"
        className="pt-8 md:pt-12 pb-16 md:pb-20 px-6 md:px-12 bg-[#FDFBF7]"
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            className="text-center mb-5 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15] mb-4">
              Zo bouwen we samen aan AI die{" "}
              <span className="relative inline-block">
                <span className="relative z-10">écht werkt</span>
                <Scribble />
              </span>
            </h2>
            <p className="text-[#1A2D63]/70 text-lg md:text-xl max-w-xl mx-auto">
              Van inzicht naar impact. Onze aanpak in 3 stappen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-3 md:pt-6">
            {methodSteps.map((step, index) => {
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <span
                    className={`absolute -top-4 -right-2 md:-top-5 md:-right-3 font-newsreader text-6xl md:text-7xl font-light ${opacityClass} select-none pointer-events-none z-10`}
                  >
                    {step.number}
                  </span>
                  <div className="bg-white rounded-3xl p-8 md:p-9 h-full shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)] relative flex flex-col">
                    <div className="w-10 h-10 rounded-2xl bg-[#1A2D63]/10 border border-[#1A2D63]/25 flex items-center justify-center mb-5">
                      <step.icon className="w-5 h-5 text-[#1A2D63]" />
                    </div>
                    <h3 className="font-newsreader text-2xl md:text-[1.7rem] font-semibold text-[#1A2D63] mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-[#1A2D63]/75 leading-relaxed mb-6">
                      {step.body}
                    </p>
                    <div className="mt-auto pt-5 border-t border-[#1A2D63]/10">
                      <span className="block text-xs uppercase tracking-wider font-medium text-[#1A2D63]/40 mb-1.5">
                        Je resultaat
                      </span>
                      <p className="flex items-start gap-2 text-base text-[#1A2D63]/80">
                        <Check className="w-5 h-5 text-[#1A2D63]/50 shrink-0 mt-0.5" />
                        <span>{step.result}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#1A2D63" variant={2} />

      {/* ============================================ */}
      {/* TWO OUTCOMES — anti-hard-sell                */}
      {/* ============================================ */}
      <section className="py-8 md:py-12 px-4 sm:px-6 md:px-12 bg-[#1A2D63] relative">
        <div className="max-w-[900px] mx-auto relative z-10">
          <motion.h2
            className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            Er zijn maar twee mogelijke uitkomsten.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Er is voldoende potentieel.",
                body: "Dan werken we een voorstel uit voor het AI Fundament en tonen we hoe AI stap voor stap binnen jouw bedrijf kan worden ingezet.",
                icon: Check,
              },
              {
                title: "AI is vandaag nog niet de juiste investering.",
                body: "Dan zeggen we dat ook.",
                icon: X,
              },
            ].map((outcome, index) => (
              <motion.div
                key={index}
                className="bg-white/[0.06] border border-white/10 rounded-3xl p-7 md:p-8"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <span className="w-12 h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
                    <outcome.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </span>
                  <h3 className="font-newsreader text-xl md:text-2xl text-white leading-tight">
                    {outcome.title}
                  </h3>
                </div>
                <p className="text-white/75 text-base md:text-lg leading-relaxed">
                  {outcome.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-white/60 text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Het doel van de AI Opportunity Scan is niet om zoveel mogelijk
            AI-projecten te verkopen, maar om eerlijk te bepalen of AI vandaag
            voldoende rendement kan opleveren voor jouw bedrijf.
          </motion.p>
        </div>
      </section>

      <SectionDivider fromColor="#1A2D63" toColor="#FDFBF7" variant={3} accent={false} />

      {/* ============================================ */}
      {/* PRACTICAL INFO                               */}
      {/* ============================================ */}
      <section
        id="praktisch"
        className="pt-8 md:pt-12 pb-14 md:pb-16 px-6 md:px-12 bg-[#FDFBF7]"
      >
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15] text-center mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            Praktische informatie
          </motion.h2>

          <motion.div
            className="bg-white rounded-3xl shadow-2xl border border-[#1A2D63]/10 divide-y divide-[#1A2D63]/10 overflow-hidden"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            {practicalInfo.map((row, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-1 sm:gap-6 px-6 md:px-8 py-5 md:py-6"
              >
                <div className="w-full sm:w-40 shrink-0 font-newsreader text-lg font-semibold text-[#1A2D63]">
                  {row.label}
                </div>
                <div className="flex-1 text-[#475D8F] text-base md:text-lg leading-relaxed">
                  {row.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={1} />

      {/* ============================================ */}
      {/* FAQ                                          */}
      {/* ============================================ */}
      <section
        id="faq"
        className="pt-8 md:pt-12 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]"
      >
        <div className="max-w-[800px] mx-auto">
          <motion.div
            className="text-center mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15]">
              Veelgestelde vragen
            </h2>
          </motion.div>

          <div className="bg-white/40 md:bg-transparent rounded-2xl md:rounded-none border border-[#1A2D63]/[0.06] md:border-0 px-4 sm:px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-b border-[#1A2D63]/[0.08] last:border-b-0 md:last:border-b md:border-[#1A2D63]/10"
                >
                  <AccordionTrigger className="py-4 sm:py-5 md:py-6 text-left text-[#1A2D63] font-instrument text-base sm:text-lg md:text-xl font-medium hover:no-underline hover:text-[#475D8F] transition-colors [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5 [&>svg]:text-[#475D8F] [&>svg]:shrink-0 [&>svg]:ml-3 gap-2">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#1A2D63]/75 text-[15px] sm:text-base md:text-[17px] leading-[1.7] pb-5 sm:pb-6 md:pb-7">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA                                    */}
      {/* ============================================ */}
      <section className="pt-6 md:pt-8 pb-12 md:pb-16 px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.h2
            className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            Heeft AI voldoende potentieel binnen jouw bedrijf?
          </motion.h2>
          <motion.p
            className="text-[#475D8F] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Plan een gratis AI Opportunity Scan en ontdek waar AI binnen jouw
            bedrijf de meeste waarde kan creëren en of een AI-traject vandaag de
            investering waard is.
          </motion.p>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              type="button"
              onClick={() => openScan("final_scan", "lp_opportunity_final")}
              className="group inline-flex items-center gap-3 bg-[#1A2D63] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#2A4488] transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(26,45,99,0.4)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan een gratis AI Opportunity Scan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <LandingFooter />

      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
