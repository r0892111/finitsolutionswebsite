"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LandingFooter } from "@/components/landing/landing-footer";
import { pushEvent } from "@/lib/analytics";

// ============================================
// DATA
// ============================================

const INTRO_VIDEO_ID = "zN7XGA4Yn1U";

interface SeriesVideo {
  id: string;
  title: string;
  subtitle: string;
}

const seriesVideos: SeriesVideo[] = [
  {
    id: "Pr-zxuY8C80",
    title: "Waarom de meeste AI-projecten mislukken",
    subtitle: "En waarom het probleem meestal niet AI is.",
  },
  {
    id: "gC1z1y9l0T0",
    title: "Waar bedrijven vandaag het meeste tijd verliezen",
    subtitle: "De grootste opportuniteiten zitten vaak waar niemand kijkt.",
  },
  {
    id: "5OM-J3Zptjs",
    title: "Waarom wij eerst een AI-Brein bouwen",
    subtitle: "De meeste bedrijven slaan deze stap volledig over.",
  },
  {
    id: "WunrBRQMiBY",
    title: "Hoe bepalen wij of AI zinvol is voor een bedrijf?",
    subtitle: "Want niet elk AI-traject is de investering waard.",
  },
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
// SQUIGGLE UNDERLINE
// ============================================

const Squiggle = () => (
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
// SECTION DIVIDER
// ============================================

const sectionDividerData = {
  fill: "M0,70 C480,130 960,-10 1920,50",
  navy: "M0,62 C480,110 960,-18 1920,34 L1920,60 C960,4 480,146 0,78 Z",
  light: "M0,78 C480,146 960,4 1920,60 L1920,74 C960,14 480,164 0,88 Z",
};

const SectionDivider = ({
  fromColor,
  toColor,
}: {
  fromColor: string;
  toColor: string;
}) => {
  const fillPath = `${sectionDividerData.fill} L1920,160 L0,160 Z`;
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
        <path d={sectionDividerData.navy} fill="#1A2D63" />
        <path d={sectionDividerData.light} fill="#7B8DB5" />
      </svg>
    </div>
  );
};

// ============================================
// RESPONSIVE YOUTUBE EMBED (16:9)
// ============================================

const VideoEmbed = ({ id, title }: { id: string; title: string }) => (
  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#1A2D63]/5 border border-[#1A2D63]/10 shadow-2xl">
    <iframe
      className="absolute inset-0 w-full h-full"
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================

export function ResourceHubLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const total = seriesVideos.length;
  const seriesActive = activeIndex >= 0;
  const progressPct = seriesActive ? ((activeIndex + 1) / total) * 100 : 0;

  // Scroll-driven nav blur
  useEffect(() => {
    const handleScroll = () => {
      setNavScrollProgress(Math.min(window.scrollY / 100, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which video is in view -> drives progress bar + active highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2D63] font-instrument selection:bg-[#B8C5E6] selection:text-[#1A2D63] overflow-x-hidden [&_h1]:[text-wrap:balance] [&_h2]:[text-wrap:balance] [&_h3]:[text-wrap:balance] [&_p]:[text-wrap:pretty] [&_li]:[text-wrap:pretty]">
      <NoiseOverlay />

      {/* ============================================ */}
      {/* SERIES PROGRESS BAR (slim, marine, sticky)   */}
      {/* ============================================ */}
      <div
        className="fixed top-0 left-0 right-0 z-[45] h-[3px] bg-[#1A2D63]/10 transition-opacity duration-300"
        style={{ opacity: seriesActive ? 1 : 0 }}
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#1A2D63] transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

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

          {/* Permanent top CTA -> AI Opportunity Scan */}
          <Link
            href="/ai-opportunity-scan"
            onClick={() =>
              pushEvent("cta_click", {
                cta_label: "AI Opportunity Scan",
                location: "resource-hub-nav",
              })
            }
            className="flex items-center gap-2 bg-[#1A2D63] text-white rounded-full text-xs sm:text-sm font-medium hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/20 px-4 py-2 sm:px-5 sm:py-2.5"
          >
            <span>AI Opportunity Scan</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO                                          */}
      {/* ============================================ */}
      <header className="relative pt-28 lg:pt-36 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left: copy */}
          <div>
            <motion.p
              className="text-xs uppercase tracking-[0.18em] text-[#475D8F] font-medium mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              AI-videoreeks · ±15 minuten
            </motion.p>

            <motion.h1
              className="font-newsreader text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] tracking-tight text-[#1A2D63] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Waar kan AI écht{" "}
              <span className="relative inline-block">
                <span className="relative z-10">waarde</span>
                <Squiggle />
              </span>{" "}
              creëren binnen jouw bedrijf?
            </motion.h1>

            <motion.p
              className="font-instrument text-lg lg:text-xl text-[#475D8F] leading-relaxed mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              In deze korte videoreeks van ongeveer 15 minuten ontdek je hoe je
              AI doordacht inzet binnen een bedrijf, waar de grootste
              opportuniteiten vandaag liggen en hoe je voorkomt dat AI bij losse
              tools of experimenten blijft.
            </motion.p>

            <motion.ul
              className="flex flex-col gap-3.5 text-[#1A2D63]/80 text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <li className="flex items-start gap-3">
                <HandDrawnCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />
                Ontdek waar AI vandaag de meeste tijd kan besparen
              </li>
              <li className="flex items-start gap-3">
                <HandDrawnCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />
                Begrijp waarom veel AI-initiatieven weinig resultaat opleveren
              </li>
              <li className="flex items-start gap-3">
                <HandDrawnCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />
                Ontdek wanneer een AI-traject écht de moeite waard is
              </li>
            </motion.ul>
          </div>

          {/* Right: intro video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <VideoEmbed id={INTRO_VIDEO_ID} title="Introductievideo — AI-videoreeks" />
          </motion.div>
        </div>
      </header>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" />

      {/* ============================================ */}
      {/* VIDEO SERIES                                  */}
      {/* ============================================ */}
      <div className="bg-[#FDFBF7]">
        {seriesVideos.map((video, i) => {
          const isActive = activeIndex === i;
          const number = String(i + 1).padStart(2, "0");
          return (
            <section
              key={video.id}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              data-index={i}
              className="px-6 md:px-12 py-10 md:py-14"
            >
              <motion.div
                className="max-w-[900px] mx-auto"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-baseline gap-4 md:gap-5 mb-5 md:mb-6">
                  <span
                    className={`font-newsreader text-5xl md:text-6xl font-light select-none pointer-events-none leading-none transition-colors duration-500 ${
                      isActive ? "text-[#1A2D63]/35" : "text-[#1A2D63]/15"
                    }`}
                  >
                    {number}
                  </span>
                  <div>
                    <h2 className="font-newsreader text-2xl md:text-4xl text-[#1A2D63] leading-tight">
                      {video.title}
                    </h2>
                    <p className="font-instrument text-[#475D8F] text-base md:text-lg mt-1.5">
                      {video.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-2xl transition-all duration-500 ${
                    isActive
                      ? "ring-2 ring-[#1A2D63]/25 ring-offset-4 ring-offset-[#FDFBF7]"
                      : "ring-0"
                  }`}
                >
                  <VideoEmbed id={video.id} title={video.title} />
                </div>
              </motion.div>
            </section>
          );
        })}
      </div>

      {/* ============================================ */}
      {/* FINAL CTA -> AI Opportunity Scan             */}
      {/* ============================================ */}
      <section className="px-6 md:px-12 pt-2 md:pt-6 pb-14 md:pb-20 bg-[#FDFBF7]">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            className="relative bg-[#1A2D63] rounded-3xl shadow-[0_25px_70px_-15px_rgba(26,45,99,0.5)] overflow-hidden px-8 py-12 md:px-14 md:py-16 text-center"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10">
              <h2 className="font-newsreader text-3xl md:text-5xl text-white leading-[1.15] mb-5">
                Benieuwd hoe dit eruitziet voor jouw bedrijf?
              </h2>
              <p className="font-instrument text-white/70 text-lg leading-relaxed mb-3 max-w-xl mx-auto">
                Tijdens een AI Opportunity Scan bekijken we waar de grootste
                opportuniteiten liggen en of een AI-traject vandaag voldoende
                waarde kan opleveren.
              </p>
              <p className="font-instrument text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
                Je krijgt een eerlijk advies. Ook als de conclusie is dat vandaag
                nog niet het juiste moment is.
              </p>
              <Link
                href="/ai-opportunity-scan"
                onClick={() =>
                  pushEvent("cta_click", {
                    cta_label: "Plan een AI Opportunity Scan",
                    location: "resource-hub-final",
                  })
                }
                className="group inline-flex items-center gap-2.5 bg-white text-[#1A2D63] px-8 py-4 rounded-full text-base font-medium hover:scale-105 transition-transform shadow-lg"
              >
                <span>Plan een AI Opportunity Scan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
