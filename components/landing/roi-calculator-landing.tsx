"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import {
  gsap,
  MotionPathPlugin,
} from "@/lib/gsap";
import {
  ArrowRight,
  Calendar,
  Check,
  Zap,
  TrendingUp,
  UserMinus,
  XCircle,
  Sparkles,
  Clock,
  Target,
  Shield,
  Mail,
  Phone,
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
// LOGO CAROUSEL (same GSAP curve as main site)
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
    <div className="relative -mt-3 block lg:hidden">
      <div className="relative h-44 sm:h-48 overflow-visible">
        <LogoCarousel
          className="logo-carousel absolute inset-0 pointer-events-none overflow-visible block lg:hidden"
          logoSize={52}
          svgTopPercent={12}
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
// ANIMATED NUMBER COUNTER
// ============================================

const AnimatedNumber = ({
  value,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}) => {
  const spring = useSpring(0, { stiffness: 600, damping: 50 });
  const display = useTransform(spring, (latest) => {
    const formatted = latest.toFixed(decimals);
    const parts = formatted.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${prefix}${parts.join(",")}${suffix}`;
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
};

// ============================================
// CUSTOM RANGE SLIDER
// ============================================

const RangeSlider = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
  sliderName,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  formatValue: (v: number) => string;
  sliderName: string;
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-3">
        <label className="font-instrument text-[15px] md:text-base text-[#1A2D63] font-medium">
          {label}
        </label>
        <span className="font-newsreader text-xl md:text-2xl font-semibold text-[#1A2D63] tabular-nums shrink-0">
          {formatValue(value)}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const newVal = Number(e.target.value);
            onChange(newVal);
            pushEvent("calculator_interaction", {
              action: "slider_change",
              slider: sliderName,
            });
          }}
          className="roi-slider w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
          style={{
            background: `linear-gradient(to right, #1A2D63 0%, #1A2D63 ${percentage}%, rgba(26, 45, 99, 0.1) ${percentage}%, rgba(26, 45, 99, 0.1) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-[#475D8F]/60 font-instrument">{formatValue(min)}</span>
        <span className="text-xs text-[#475D8F]/60 font-instrument">{formatValue(max)}</span>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export function ROICalculatorLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [showStickyMobileCTA, setShowStickyMobileCTA] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const logoCarouselRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const { isOpen, openForm, closeForm } = useContactForm();

  // Calculator state
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(60);
  const [members, setMembers] = useState(2);

  // Calculations
  const weeksPerYear = 52;
  const totalWeeklyHours = hours * members;
  const yearlyCost = totalWeeklyHours * rate * weeksPerYear;
  const monthlyCost = yearlyCost / 12;
  // Savings estimate: based on typical results from AI automation implementations
  // Conservative range used — most repetitive admin tasks (data entry, follow-ups, reporting) are highly automatable
  const savingsMultiplier = 0.55;
  const yearlySavings = yearlyCost * savingsMultiplier;
  const monthlySavings = yearlySavings / 12;
  const hoursSavedPerWeek = totalWeeklyHours * savingsMultiplier;

  // Nav scroll progress + sticky mobile CTA trigger
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

      {/* Slider custom styles */}
      <style jsx global>{`
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid #1A2D63;
          box-shadow: 0 4px 12px rgba(26, 45, 99, 0.25);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .roi-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 16px rgba(26, 45, 99, 0.35);
        }
        .roi-slider::-webkit-slider-thumb:active {
          transform: scale(1.1);
        }
        .roi-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid #1A2D63;
          box-shadow: 0 4px 12px rgba(26, 45, 99, 0.25);
          cursor: pointer;
        }
        .roi-slider::-moz-range-track {
          height: 8px;
          border-radius: 9999px;
          background: transparent;
        }
        @keyframes urgencyPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>

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

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={() => {
              openForm();
              pushEvent("cta_click", {
                cta_label: "nav_calendly",
                location: "lp_roi_nav",
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

          {/* Mobile CTA */}
          <button
            type="button"
            onClick={() => {
              openForm();
              pushEvent("cta_click", {
                cta_label: "mobile_nav_calendly",
                location: "lp_roi_mobile_nav",
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
      {/* HERO SECTION (full viewport height)           */}
      {/* ============================================ */}
      <header className="relative min-h-screen max-w-[100vw] mx-auto flex flex-col justify-center overflow-hidden">
        <LogoCarousel carouselRef={logoCarouselRef} durationSeconds={60} />

        {/* Desktop layout: centered flex */}
        <div className="hidden md:flex container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 items-center justify-center min-h-screen pt-0 pb-0 w-full relative z-10">
          <div className="relative z-10 text-center max-w-3xl">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-newsreader text-6xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[1.05] tracking-tight text-[#1A2D63]">
                <span className="block font-extralight">Wat kost jouw</span>
                <span className="block font-bold italic">
                  <span className="relative inline-block">
                    <span className="relative z-10">administratie</span>
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
                </span>
                <span className="block font-extralight">je echt?</span>
              </h1>
            </motion.div>

            <motion.p
              className="font-instrument md:text-lg text-[#475D8F] leading-relaxed max-w-lg mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              De gemiddelde KMO-ondernemer verliest{" "}
              <strong className="text-[#1A2D63]">meer dan 780 uur per jaar</strong>{" "}
              aan taken die geautomatiseerd kunnen worden. Bereken hoeveel tijd jij terugwint.
            </motion.p>

            <motion.div
              className="flex flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="#calculator"
                onClick={() =>
                  pushEvent("cta_click", {
                    cta_label: "hero_calculate",
                    location: "lp_roi_hero_calculate",
                  })
                }
                className="group bg-[#1A2D63] text-white px-6 py-3 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Target className="w-4 h-4" />
                <span>Bereken jouw tijdsbesparing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "hero_plan",
                    location: "lp_roi_hero_plan",
                  });
                }}
                className="border-2 border-[#1A2D63] text-[#1A2D63] px-6 py-3 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#1A2D63]/5 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan een gratis gesprek</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile layout: h1 in flow, subtitle+CTA+carousel pinned to bottom */}
        <div className="md:hidden relative z-10 min-h-[calc(100svh-64px)] px-4 sm:px-6">
          {/* Heading - centered in viewport, unaffected by bottom section */}
          <div className="flex items-center justify-center min-h-[calc(100svh-64px)] pt-20 pb-[28rem]">
            <motion.div
              className="text-center max-w-[22rem] sm:max-w-[28rem] px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-newsreader text-5xl leading-[1.05] tracking-tight text-[#1A2D63]">
                <span className="block font-extralight">Wat kost jouw</span>
                <span className="block font-bold italic">
                  <span className="relative inline-block">
                    <span className="relative z-10">administratie</span>
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
                </span>
                <span className="block font-extralight">je echt?</span>
              </h1>
            </motion.div>
          </div>

          {/* Absolutely positioned bottom section - never moves */}
          <div className="absolute -bottom-4 left-4 right-4 sm:left-6 sm:right-6 text-center max-w-[22rem] sm:max-w-[28rem] mx-auto">
            <motion.p
              className="font-instrument text-base sm:text-[17px] text-[#475D8F] leading-relaxed max-w-lg mx-auto mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              De gemiddelde KMO-ondernemer verliest{" "}
              <strong className="text-[#1A2D63]">meer dan 780 uur per jaar</strong>{" "}
              aan taken die geautomatiseerd kunnen worden. Bereken hoeveel tijd jij terugwint.
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="#calculator"
                onClick={() =>
                  pushEvent("cta_click", {
                    cta_label: "hero_calculate",
                    location: "lp_roi_hero_calculate",
                  })
                }
                className="group w-full bg-[#1A2D63] text-white px-6 py-3 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Target className="w-4 h-4" />
                <span>Bereken jouw tijdsbesparing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "hero_plan",
                    location: "lp_roi_hero_plan",
                  });
                }}
                className="w-full border-2 border-[#1A2D63] text-[#1A2D63] px-6 py-3 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#1A2D63]/5 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan een gratis gesprek</span>
              </button>
            </motion.div>

            <motion.p
              className="mt-4 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#475D8F]/70"
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

      {/* Divider: cream -> white */}
      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={0} />

      {/* ============================================ */}
      {/* INTERACTIVE ROI CALCULATOR                    */}
      {/* ============================================ */}
      <section
        id="calculator"
        className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#FDFBF7] relative"
      >
        <div className="max-w-[900px] mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
              Bereken jouw{" "}
              <span className="relative inline-block">
                <span className="relative z-10">tijdsbesparing</span>
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
            <p className="text-[#1A2D63]/60 text-lg md:text-xl max-w-xl mx-auto font-instrument">
              Verschuif de sliders en zie direct wat AI-automatisering jou oplevert.
            </p>
          </motion.div>

          {/* Calculator card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-[#B8C5E6] rounded-full blur-[120px] opacity-30 pointer-events-none" />

            <div className="relative bg-white rounded-3xl shadow-2xl border border-[#1A2D63]/10 overflow-hidden">
              {/* Inputs section */}
              <div className="p-5 sm:p-6 md:p-10 lg:p-12">
                <h3 className="font-newsreader text-lg md:text-xl font-semibold text-[#1A2D63] mb-6">
                  Vul jouw gegevens in
                </h3>
                <RangeSlider
                  label="Aantal medewerkers met admin-taken"
                  min={1}
                  max={25}
                  step={1}
                  value={members}
                  onChange={setMembers}
                  formatValue={(v) => `${v} medewerker${v === 1 ? "" : "s"}`}
                  sliderName="members"
                />
                <RangeSlider
                  label="Uren administratie per week per medewerker"
                  min={5}
                  max={40}
                  step={1}
                  value={hours}
                  onChange={setHours}
                  formatValue={(v) => `${v} uur/week`}
                  sliderName="hours"
                />
                <RangeSlider
                  label="Gemiddelde uurkost (loon + overhead)"
                  min={30}
                  max={150}
                  step={5}
                  value={rate}
                  onChange={setRate}
                  formatValue={(v) => `\u20AC${v}/uur`}
                  sliderName="rate"
                />

              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#1A2D63]/10 to-transparent" />

              {/* Outputs section */}
              <div className="p-5 sm:p-6 md:p-10 lg:p-12">
                {/* Main results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                  {/* Current cost card */}
                  <div className="bg-[#F8F4F0] rounded-2xl p-6 border border-[#C4A882]/20 shadow-sm">
                    <p className="text-sm font-instrument text-[#475D8F] uppercase tracking-wider mb-3">
                      Huidige jaarlijkse kost
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-1.5">
                        <AnimatedNumber
                          value={Math.round(yearlyCost)}
                          prefix={"\u20AC"}
                          className="font-newsreader text-3xl md:text-4xl font-semibold text-[#8B6914]"
                        />
                        <span className="text-[#8B6914]/60 text-sm font-instrument">per jaar</span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <AnimatedNumber
                          value={Math.round(monthlyCost)}
                          prefix={"\u20AC"}
                          className="font-newsreader text-lg md:text-xl font-medium text-[#8B6914]/70"
                        />
                        <span className="text-[#8B6914]/50 text-sm font-instrument">per maand</span>
                      </div>
                      <p className="text-xs text-[#8B6914]/40 font-instrument pt-1">
                        {totalWeeklyHours} uur/week totaal{members > 1 ? ` (${hours}u × ${members} medewerkers)` : ""}
                      </p>
                    </div>
                  </div>

                  {/* Savings card */}
                  <div className="bg-[#1A2D63] rounded-2xl p-6 text-white shadow-xl shadow-[#1A2D63]/25 relative overflow-hidden">
                    <p className="text-sm font-instrument text-white/70 uppercase tracking-wider mb-3 relative z-10">
                      Jouw tijdsbesparing
                    </p>
                    <div className="space-y-2 relative z-10">
                      <div className="flex items-baseline gap-1.5">
                        <AnimatedNumber
                          value={Math.round(hoursSavedPerWeek * 52)}
                          className="font-newsreader text-3xl md:text-4xl font-bold text-white"
                        />
                        <span className="text-white/60 text-sm font-instrument">uur per jaar</span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <AnimatedNumber
                          value={Math.round(hoursSavedPerWeek * 4.33 * 10) / 10}
                          decimals={1}
                          className="font-newsreader text-lg md:text-xl font-medium text-white/80"
                        />
                        <span className="text-white/50 text-sm font-instrument">uur per maand</span>
                      </div>
                      <div className="flex items-baseline gap-1.5 pt-1">
                        <AnimatedNumber
                          value={Math.round(hoursSavedPerWeek * 10) / 10}
                          decimals={1}
                          className="font-newsreader text-base font-medium text-white/70"
                        />
                        <span className="text-white/40 text-xs font-instrument">uur/week teruggewonnen{members > 1 ? ` (totaal)` : ""}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-[#475D8F]/50 font-instrument text-center mb-8">
                  * Schatting gebaseerd op typische resultaten bij KMO-klanten. Jouw werkelijke tijdsbesparing kan afwijken — plan een gratis gesprek voor een persoonlijke analyse.{" "}
                  <button
                    onClick={() => setShowMethodology(true)}
                    className="underline decoration-dotted underline-offset-2 text-[#475D8F]/70 hover:text-[#1A2D63] transition-colors"
                  >
                    Hoe berekenen we dit?
                  </button>
                </p>

                {/* Methodology popup */}
                {showMethodology && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    onClick={() => setShowMethodology(false)}
                  >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <motion.div
                      className="relative bg-white rounded-2xl shadow-2xl border border-[#1A2D63]/10 max-w-md w-full p-7 md:p-8"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setShowMethodology(false)}
                        className="absolute top-4 right-4 text-[#475D8F]/40 hover:text-[#1A2D63] transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>

                      <h3 className="font-newsreader text-xl font-semibold text-[#1A2D63] mb-4">
                        Hoe berekenen we dit?
                      </h3>

                      <div className="space-y-4 text-[14px] text-[#475D8F] font-instrument leading-relaxed">
                        <div>
                          <p className="font-semibold text-[#1A2D63] mb-1">Huidige kost</p>
                          <p>
                            Uren administratie per week &times; aantal medewerkers &times; uurkost &times; 52 weken = jaarlijkse kost.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-[#1A2D63] mb-1">Tijdsbesparing</p>
                          <p>
                            We hanteren een besparingsfactor van 55%. Dit is gebaseerd op typische resultaten bij KMO-automatiseringen waarbij repetitieve taken (data-invoer, opvolging, rapportage) grotendeels worden overgenomen.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-[#1A2D63] mb-1">Waarom 55%?</p>
                          <p>
                            Dit is een conservatieve schatting. Op individuele processen zien we 80-100% besparing, maar niet alle admin-uren zijn even automatiseerbaar. 55% houdt rekening met taken die menselijke input blijven vragen.
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#1A2D63]/[0.06]">
                          <p className="text-xs text-[#475D8F]/50">
                            Dit zijn indicatieve cijfers. Tijdens een vrijblijvend gesprek maken we een analyse op maat van jouw specifieke situatie.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* CTA */}
                <div className="text-center">
                  <p className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-5">
                    Wil je deze uren terugwinnen?
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      openForm();
                      pushEvent("cta_click", {
                        cta_label: "calculator_calendly",
                        location: "lp_roi_calculator_cta",
                      });
                    }}
                    className="group inline-flex items-center gap-2 md:gap-3 bg-[#1A2D63] text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-[#2A4488] hover:scale-105 transition-all shadow-lg shadow-[#1A2D63]/20"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Plan je gratis gesprek</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider: white -> navy */}
      <SectionDivider fromColor="#FDFBF7" toColor="#1A2D63" variant={1} />

      {/* ============================================ */}
      {/* COMPETITIVE PRESSURE (dark navy section)     */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#1A2D63] relative overflow-hidden">
        <div className="max-w-[900px] mx-auto relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-newsreader text-white leading-[1.15] mb-4">
              Terwijl jij twijfelt,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">automatiseert</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-[0.35em] z-0"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 14 Q40 4 100 12 Q160 18 197 8"
                    stroke="#7B8DB5"
                    strokeOpacity="0.4"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              <br className="hidden sm:block" />
              {" "}je concurrent
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                icon: Zap,
                text: "Elke minuut die jij aan admin besteedt, gebruikt je concurrent voor groei.",
              },
              {
                icon: TrendingUp,
                text: "1 op 5 Europese bedrijven automatiseert al met AI in 2026. Dat aantal verdubbelt elk jaar.",
              },
              {
                icon: UserMinus,
                text: "Die concurrent die altijd sneller offreert? Hij werkt niet harder.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 md:p-7 backdrop-blur-sm hover:bg-white/[0.1] transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.15 }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-white/90 font-instrument text-[15px] md:text-base leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider: navy -> white */}
      <SectionDivider fromColor="#1A2D63" toColor="#FDFBF7" variant={2} />

      {/* ============================================ */}
      {/* "DE KOST VAN NIKS DOEN" COMPARISON            */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
              De kost van{" "}
              <span className="relative inline-block">
                <span className="relative z-10">niks doen</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {/* Left: Als je niets doet */}
            <motion.div
              className="bg-[#F7F7F7] rounded-2xl p-7 md:p-8 border border-[#1A2D63]/[0.06]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-[#C53030]" />
                </div>
                <h3 className="font-newsreader text-xl md:text-2xl font-semibold text-[#1A2D63]/60">
                  Als je niets doet
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  {
                    label: `${Math.round(totalWeeklyHours * 52).toLocaleString("nl-BE")} uur per jaar verloren aan admin`,
                    muted: true,
                  },
                  {
                    label: `${Math.round(totalWeeklyHours)} uur per week verloren${members > 1 ? ` (${hours}u × ${members} medewerkers)` : ""}`,
                    muted: true,
                  },
                  {
                    label: "Leads die weglopen door trage opvolging",
                    muted: true,
                  },
                  {
                    label: "Concurrent die marktaandeel pakt",
                    muted: true,
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C53030]/40 mt-2 shrink-0" />
                    <span className="font-instrument text-[15px] text-[#1A2D63]/50 leading-relaxed">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Als je vandaag start */}
            <motion.div
              className="bg-[#1A2D63] rounded-2xl p-7 md:p-8 text-white shadow-2xl shadow-[#1A2D63]/30"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-newsreader text-xl md:text-2xl font-semibold text-white">
                  Als je vandaag start
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  `${Math.round(hoursSavedPerWeek * 52).toLocaleString("nl-BE")} uur per jaar teruggewonnen`,
                  `${Math.round(hoursSavedPerWeek * 10) / 10} uur per week vrijgemaakt${members > 1 ? ` over ${members} medewerkers` : ""}`,
                  "Automatische opvolging — geen gemiste leads",
                  "Meer tijd voor strategie en groei",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-instrument text-[15px] text-white/90 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider: white -> cream */}
      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={3} />

      {/* ============================================ */}
      {/* URGENCY BANNER + FINAL CTA                   */}
      {/* ============================================ */}
      <section
        id="contact"
        className="pt-8 md:pt-12 pb-20 md:pb-32 px-4 sm:px-6 md:px-12 bg-[#FDFBF7] relative"
      >
        <div className="max-w-[800px] mx-auto">
          {/* Urgency Banner */}
          <motion.div
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="bg-[#1A2D63] rounded-2xl px-6 py-4 md:px-8 md:py-5 text-center shadow-xl shadow-[#1A2D63]/25"
              style={{ animation: "urgencyPulse 3s ease-in-out infinite" }}
            >
              <p className="font-newsreader text-lg md:text-xl font-semibold text-white">
                We nemen per maand maximaal 5 nieuwe projecten aan
              </p>
            </div>
          </motion.div>

          {/* Final CTA Card */}
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
                Klaar om je tijd terug te winnen?
              </h2>
              <p className="text-[#1A2D63]/60 text-lg mb-8 font-instrument max-w-lg mx-auto">
                Plan vandaag nog je gesprek. Hoe eerder je start, hoe sneller je resultaat.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                {[
                  "Vrijblijvend",
                  "Concrete tijdsanalyse",
                  "Resultaat in 4 weken",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#1A2D63]"
                  >
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="font-instrument">{item}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "final_calendly",
                    location: "lp_roi_final_cta",
                  });
                }}
                className="group inline-flex items-center gap-2 md:gap-3 bg-[#1A2D63] text-white px-6 py-3.5 md:px-10 md:py-5 rounded-full text-base md:text-lg font-medium hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Boek je gesprek NU
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER (compact version - identical to LP1)  */}
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
              <p className="text-white/70 text-base md:text-lg mb-6 max-w-md text-center lg:text-left mx-auto lg:mx-0 font-instrument">
                Ontdek hoe AI uw bedrijfsprocessen kan transformeren.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => {
                    openForm();
                    pushEvent("cta_click", {
                      cta_label: "footer_calendly",
                      location: "lp_roi_footer",
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
                      location: "lp_roi_footer",
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
                location: "lp_roi_sticky",
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
