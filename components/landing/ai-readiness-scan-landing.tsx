"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  gsap,
  MotionPathPlugin,
} from "@/lib/gsap";
import {
  ArrowRight,
  Calendar,
  Check,
  Search,
  BarChart3,
  TrendingUp,
  ClipboardList,
  Wrench,
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

const integrationLogos = [
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
  { name: "Odoo", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Odoo_logo.svg" },
  { name: "Outlook", logo: "/Microsoft_Office_Outlook_(2018–2024).svg" },
  { name: "Gmail", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
  { name: "Excel", logo: "/Microsoft_Office_Excel_(2019–2025).svg" },
  { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
  { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
  { name: "Google Calendar", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" },
  { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
  { name: "Pipedrive", logo: "/Pipedrive_id-7ejZnwv_0.svg" },
  { name: "Mailchimp", logo: "https://logos-world.net/wp-content/uploads/2021/02/Mailchimp-Logo.png" },
  { name: "Jira", logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Jira_%28Software%29_logo.svg" },
  { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { name: "Zendesk", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Zendesk_logo.svg" },
  { name: "Twilio", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg" },
  { name: "WhatsApp", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
  { name: "Zoom", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg" },
  { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Telegram", logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" },
  { name: "Google Workspace", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg" },
  { name: "Microsoft Teams", logo: "/Microsoft_Office_Teams_(2019–2025).svg" },
  { name: "Trello", logo: "/trello-tile.svg" },
  { name: "Asana", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg" },
  { name: "Teamleader", logo: "/Teamleader_Icon.svg" },
  { name: "Zoho", logo: "/ZOHO_logo_2023.svg.png" },
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "Monday", logo: "/Monday_logo.svg" },
  { name: "Microsoft Dynamics", logo: "/microsoft-dynamics-icon.svg" },
  { name: "DocuSign", logo: "/docusign.svg" },
];

interface Deliverable {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const deliverables: Deliverable[] = [
  {
    number: "01",
    icon: Search,
    title: "Procesanalyse",
    description: "Overzicht van je huidige workflows en waar tijd verloren gaat",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Automatiseringskansen",
    description: "Top 3 processen die het meest opleveren om te automatiseren",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "ROI-schatting",
    description: "Concrete berekening van de potenti\u00eble besparing in uren en euro\u2019s",
  },
  {
    number: "04",
    icon: ClipboardList,
    title: "Implementatieplan",
    description: "Stappenplan met tijdlijn en prioriteiten",
  },
  {
    number: "05",
    icon: Wrench,
    title: "Tool-advies",
    description: "Welke tools en integraties het beste passen bij jouw situatie",
  },
];

interface TimelineStep {
  label: string;
  title: string;
  description: string;
}

const timelineSteps: TimelineStep[] = [
  {
    label: "Vandaag",
    title: "Plan een gesprek",
    description: "Kies een moment dat jou uitkomt. Duurt maar 2 minuten.",
  },
  {
    label: "Dag van gesprek",
    title: "Doorlichting",
    description: "We brengen je processen in kaart en identificeren kansen. 30 minuten.",
  },
  {
    label: "Binnen 48 uur",
    title: "Scan-rapport",
    description: "Je ontvangt een persoonlijk rapport met concrete aanbevelingen.",
  },
  {
    label: "Jouw keuze",
    title: "Verder of niet",
    description: "Ga door met implementatie, of niet. Geen druk, geen verplichtingen.",
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Moet ik iets voorbereiden?",
    answer: "Nee. Een open gesprek is voldoende.",
  },
  {
    question: "Wordt er iets verkocht?",
    answer: "Nee. De scan is 100% vrijblijvend.",
  },
  {
    question: "Hoe snel zie ik resultaat als ik doorga?",
    answer: "Gemiddeld 2-4 weken van start tot werkend systeem.",
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
// LOGO CAROUSEL
// ============================================

interface LogoCarouselProps {
  carouselRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  logoSize?: number;
  svgTopPercent?: number;
  spacingMultiplier?: number;
  pathD?: string;
  durationSeconds?: number;
}

const LogoCarousel = ({
  carouselRef,
  className,
  logoSize = 74,
  svgTopPercent = 50,
  spacingMultiplier = 1,
  pathD,
  durationSeconds,
}: LogoCarouselProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [resizeKey, setResizeKey] = useState(0);

  const CURVE_ASPECT_RATIO = 16 / 9;

  useEffect(() => {
    setIsMounted(true);
    let lastWidth = window.innerWidth;
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth === lastWidth) return;
      lastWidth = newWidth;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setResizeKey((prev) => prev + 1);
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current || !svgRef.current) return;
    const logos = containerRef.current.querySelectorAll(".floating-logo");
    const path = svgRef.current.querySelector(
      "#logoMotionPath"
    ) as SVGPathElement;
    if (logos.length === 0 || !path) return;

    tweensRef.current.forEach((tween) => tween.kill());
    tweensRef.current = [];

    const totalLogos = logos.length;
    const animationDuration = durationSeconds ?? 80;
    const spacing = (1 / totalLogos) * spacingMultiplier;

    logos.forEach((logo, index) => {
      const startProgress = index * spacing;
      gsap.set(logo, {
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        force3D: true,
      });
      const tween = gsap.fromTo(
        logo,
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: startProgress,
            end: startProgress,
          },
        },
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: startProgress,
            end: startProgress + 1,
          },
          duration: animationDuration,
          ease: "none",
          repeat: -1,
          immediateRender: true,
          force3D: true,
        }
      );
      tweensRef.current.push(tween);
    });

    return () => {
      tweensRef.current.forEach((tween) => tween.kill());
      tweensRef.current = [];
    };
  }, [isMounted, resizeKey, spacingMultiplier, durationSeconds]);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;
      if (carouselRef && "current" in carouselRef) {
        (
          carouselRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = node;
      }
    },
    [carouselRef]
  );

  return (
    <div
      ref={setRefs}
      className={
        className ??
        "logo-carousel absolute inset-0 pointer-events-none overflow-visible hidden lg:block"
      }
      style={{ zIndex: 6 }}
    >
      <svg
        ref={svgRef}
        className="absolute left-0"
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: `${CURVE_ASPECT_RATIO}`,
          top: `${svgTopPercent}%`,
          transform: "translateY(-50%)",
        }}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          id="logoMotionPath"
          d={
            pathD ??
            "M -100,612 C 100,650 300,720 500,770 C 700,810 850,810 950,780 C 1100,730 1250,550 1400,350 C 1500,220 1600,120 1700,80"
          }
          fill="none"
          stroke="transparent"
        />
      </svg>
      {integrationLogos.map((logo, index) => (
        <div
          key={`floating-${logo.name}-${index}`}
          className="floating-logo absolute"
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
            left: 0,
            top: 0,
            opacity: 0,
            willChange: "transform",
          }}
        >
          <div className="w-full h-full rounded-xl bg-white shadow-lg border border-[#1A2D63]/5 p-2.5 flex items-center justify-center">
            <img
              src={logo.logo}
              alt={logo.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const MobileLogoCarousel = () => {
  const mobilePath =
    "M -900,612 C -420,690 0,820 420,880 C 860,940 1180,900 1580,780 C 2040,630 2460,430 2900,250 C 3300,140 3700,100 4100,80";

  return (
    <div className="relative mt-7 block lg:hidden">
      <div className="relative h-52 sm:h-56 overflow-visible">
        <LogoCarousel
          className="logo-carousel absolute inset-0 pointer-events-none overflow-visible block lg:hidden"
          logoSize={52}
          svgTopPercent={30}
          spacingMultiplier={1.15}
          pathD={mobilePath}
          durationSeconds={60}
        />
      </div>
    </div>
  );
};

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
// TIMELINE DOT (fills on scroll)
// ============================================

const TimelineDot = ({ index }: { index: number }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
        }
      },
      { threshold: 0.6 }
    );
    if (dotRef.current) observer.observe(dotRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={dotRef}
      className="w-4 h-4 rounded-full border-2 border-[#1A2D63] shrink-0 transition-all duration-500"
      style={{
        backgroundColor: filled ? "#1A2D63" : "transparent",
        transitionDelay: `${index * 100}ms`,
      }}
    />
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export function AIReadinessScanLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [showStickyMobileCTA, setShowStickyMobileCTA] = useState(false);
  const logoCarouselRef = useRef<HTMLDivElement>(null);
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
                location: "lp_ai_readiness_scan_nav",
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
                location: "lp_ai_readiness_scan_mobile_nav",
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
      {/* HERO SECTION (fullscreen)                    */}
      {/* ============================================ */}
      <header className="relative min-h-screen max-w-[100vw] mx-auto flex flex-col justify-center overflow-hidden">
        <LogoCarousel carouselRef={logoCarouselRef} />

        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex items-center justify-center min-h-screen pt-20 md:pt-0 pb-0 w-full relative z-10">
          <div className="relative z-10 text-center max-w-[22rem] sm:max-w-[28rem] md:max-w-3xl px-2 sm:px-0">
            <motion.div
              className="mb-5 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-newsreader text-5xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[1] tracking-tight text-[#1A2D63]">
                <span className="block font-extralight">Gratis</span>
                <span className="block font-bold">AI Readiness Scan</span>
              </h1>
            </motion.div>

            <motion.p
              className="font-instrument text-base sm:text-[17px] md:text-lg text-[#475D8F] leading-relaxed max-w-md mx-auto mb-6 sm:mb-7 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              In 30 minuten weet je precies waar AI jouw bedrijf kan versterken
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "hero_calendly",
                    location: "lp_ai_readiness_scan_hero",
                  });
                }}
                className="group w-full sm:w-auto bg-[#1A2D63] text-white px-6 py-3 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan je gratis scan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.p
              className="mt-8 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#475D8F]/70 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Integraties met je tools
            </motion.p>
            <MobileLogoCarousel />
          </div>
        </div>
      </header>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={0} />

      {/* ============================================ */}
      {/* WAT IS DE AI READINESS SCAN?                 */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-newsreader text-[#1A2D63] leading-[1.15] mb-6">
                Wat is de AI{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Readiness Scan?</span>
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
              <p className="text-[#475D8F] text-base md:text-lg leading-relaxed mb-4">
                Een vrijblijvend gesprek van 30 minuten waarin we jouw
                bedrijfsprocessen doorlichten. We identificeren waar AI het
                meeste impact kan hebben en geven je een concreet actieplan mee.
              </p>
              <p className="text-[#1A2D63] font-medium text-base md:text-lg">
                Geen technische kennis nodig. Geen verplichtingen.
              </p>
            </motion.div>

            <motion.div
              className="flex-1 max-w-sm w-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#1A2D63]/10 relative">
                <div className="absolute inset-0 bg-[#B8C5E6] rounded-full blur-[80px] opacity-20 -z-10" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A2D63] to-[#2A4488] flex items-center justify-center shadow-md shadow-[#1A2D63]/15">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[#1A2D63] font-semibold text-lg">30 min</p>
                    <p className="text-[#475D8F] text-sm">Vrijblijvend gesprek</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {["Procesanalyse", "Kansen-identificatie", "Concreet actieplan", "ROI-berekening"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-3 text-[#1A2D63] text-[15px]">
                        <Check className="w-4 h-4 text-green-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={1} />

      {/* ============================================ */}
      {/* WAT JE KRIJGT - 5 DELIVERABLES               */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
              Wat je krijgt
            </h2>
            <p className="text-[#1A2D63]/60 text-lg md:text-xl max-w-xl mx-auto">
              Na de scan ontvang je een persoonlijk rapport met deze 5 onderdelen
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-5">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                className="group flex items-start gap-5 bg-white rounded-2xl px-6 py-5 md:px-8 md:py-6 border border-[#1A2D63]/[0.06] hover:border-[#1A2D63]/[0.15] transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A2D63] to-[#2A4488] flex items-center justify-center shrink-0 shadow-md shadow-[#1A2D63]/15">
                  <span className="text-white font-newsreader font-semibold text-lg">
                    {item.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <item.icon className="w-4 h-4 text-[#1A2D63]/50" />
                    <h3 className="text-[17px] font-semibold text-[#1A2D63] leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[#475D8F] text-[15px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={2} />

      {/* ============================================ */}
      {/* HOE HET WERKT - VERTICAL TIMELINE            */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[700px] mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
              Hoe het werkt
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#1A2D63]/10" />

            <div className="space-y-10">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-6 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.12 }}
                >
                  <TimelineDot index={index} />
                  <div className="flex-1 -mt-1">
                    <span className="text-xs uppercase tracking-widest text-[#475D8F]/60 font-medium">
                      {step.label}
                    </span>
                    <h3 className="text-lg font-semibold text-[#1A2D63] mt-1 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[#475D8F] text-[15px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={3} />

      {/* ============================================ */}
      {/* OBJECTION PREEMPTION + CTA                   */}
      {/* ============================================ */}
      <section className="pt-16 md:pt-24 pb-24 md:pb-36 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[800px] mx-auto">
          {/* Inline FAQs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-16">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#1A2D63]/[0.06] shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-[15px] font-semibold text-[#1A2D63] mb-2 leading-snug">
                  {faq.question}
                </h3>
                <p className="text-[#475D8F] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Card */}
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
                Plan je gratis AI Readiness Scan
              </h2>
              <p className="text-[#1A2D63]/60 text-lg mb-8">
                30 minuten die je bedrijf kunnen veranderen. Vrijblijvend en
                zonder verplichtingen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                {[
                  "Vrijblijvend",
                  "Geen technische kennis nodig",
                  "Rapport binnen 48 uur",
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
                    location: "lp_ai_readiness_scan_final_cta",
                  });
                }}
                className="inline-flex items-center gap-2 md:gap-3 bg-[#1A2D63] text-white px-6 py-3.5 md:px-10 md:py-5 rounded-full text-base md:text-lg font-medium hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Kies een moment
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
                      location: "lp_ai_readiness_scan_footer",
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
                      location: "lp_ai_readiness_scan_footer",
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
                location: "lp_ai_readiness_scan_sticky",
              });
            }}
            className="flex items-center justify-center gap-2.5 bg-[#1A2D63] text-white w-full py-3 rounded-full text-[15px] font-medium shadow-lg shadow-[#1A2D63]/20"
          >
            <Calendar className="w-4 h-4" />
            Plan je gratis scan
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
