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
  X,
  Mail,
  Phone,
  Linkedin,
  Users,
  Settings,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { CookieSettingsLink } from "@/components/cookie-settings-link";

// ============================================
// DATA
// ============================================

const CALENDLY_URL =
  "https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions";

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

const typewriterPhrases = [
  "virtuele medewerkers",
  "automatische offertes",
  "slimme opvolging",
  "24/7 klantenservice",
  "zelf-verstuurde facturen",
  "intelligente planning",
];

const misconceptionsLeft = [
  "ChatGPT gebruiken voor e-mails",
  "Complexe technologie leren",
  "Je hele bedrijf omgooien",
  "Dure IT-consultants inhuren",
];

const realityRight = [
  "Systemen die automatisch offertes maken",
  "Klanten die zelf afspraken inplannen",
  "Facturen die zichzelf versturen",
  "Opvolging die vanzelf gebeurt",
];

const processSteps = [
  {
    number: "01",
    title: "Gesprek & Analyse",
    duration: "30 min",
    icon: Users,
    description:
      "We luisteren naar je dagelijkse uitdagingen en brengen in kaart waar de grootste tijdswinst zit.",
    details: [
      "Analyse van je huidige werkprocessen",
      "Identificeren van repetitieve taken",
      "Berekening van potentiële tijdsbesparing",
      "Concrete aanbevelingen op maat",
      "Vrijblijvend en zonder verplichtingen",
    ],
  },
  {
    number: "02",
    title: "Bouw & Integratie",
    duration: "2-4 weken",
    icon: Settings,
    description:
      "We bouwen AI-agents die naadloos integreren met je bestaande tools en workflows.",
    details: [
      "AI-agents gebouwd op maat van jouw processen",
      "Integratie met je bestaande software (CRM, e-mail, agenda)",
      "Uitgebreid testen in een veilige omgeving",
      "Training voor jou en je team",
      "Geen verstoring van je dagelijkse werking",
    ],
  },
  {
    number: "03",
    title: "Resultaat & Optimalisatie",
    duration: "doorlopend",
    icon: TrendingUp,
    description:
      "Je AI-systemen draaien 24/7 en worden continu beter op basis van resultaten.",
    details: [
      "Real-time monitoring van prestaties",
      "Maandelijkse optimalisatie-rapporten",
      "Uitbreidbaar naar nieuwe processen",
      "Persoonlijke support via chat en telefoon",
      "Schaalbaar mee met je groei",
    ],
  },
];

const faqItems = [
  {
    question: "Is dit niet te complex voor mijn bedrijf?",
    answer:
      "Absoluut niet — je hebt geen enkele technische kennis nodig. Wij doen al het technische werk, jij blijft gewoon ondernemer. Na de oplevering volgt een hypercare-fase waarin we alles uitgebreid testen in de praktijk en finetunen tot het perfect draait. We integreren met 500+ bestaande tools zoals je CRM, e-mail, agenda en facturatiesoftware, dus je hoeft niets te veranderen aan je huidige manier van werken.",
  },
  {
    question: "Wat als mijn team er niet mee kan werken?",
    answer:
      "We zorgen voor minimale onboarding, geen intensieve training. Je team hoeft alleen te weten: hoe ze het triggeren, wat er automatisch gebeurt, en waar ze de output kunnen zien. Tijdens de hypercare-fase (2-4 weken) doen we een praktische walkthrough en voorzien we een korte handleiding — geen handboek van 50 pagina's. De grootste uitdaging is meestal niet de techniek, maar het vertrouwen dat het werkt en oude gewoontes loslaten.",
  },
  {
    question: "Kost dit niet een fortuin?",
    answer:
      "Een AI-systeem kost minder dan een parttime medewerker, maar werkt 24/7 — geen vakantiegeld, geen ziekteverzuim, geen opleidingskosten. De investering verdient zich doorgaans binnen de eerste 6 maanden terug. Na een gratis intake en scoping-sessie krijg je een vaste prijs, zonder verrassingen. Je kunt ook gefaseerd starten: begin met één proces en breid later uit. Dit maakt het juist interessant voor KMO's — grote bedrijven hebben IT-afdelingen, jij hebt Finit.",
  },
  {
    question: "Hoe lang duurt het voordat ik resultaat zie?",
    answer:
      "Het totale traject duurt 4 tot 10 weken, afhankelijk van de complexiteit. Fase 1 is scoping (1 week), fase 2 is bouwen (2-6 weken) en fase 3 is hypercare (2-4 weken). Sommige quick wins zijn al binnen enkele dagen zichtbaar. De hypercare-fase is cruciaal: theorie en praktijk kunnen verschillen, en wij blijven aan boord tot het écht werkt in je dagelijkse werking.",
  },
  {
    question: "Wat als het niet werkt voor mijn sector?",
    answer:
      "We starten altijd met een analyse van je processen. Alles wat repetitief is en regels volgt, kunnen we automatiseren — van communicatie en data-invoer tot klantbeheer en planning. We adviseren alleen automatiseringen waar de ROI er écht is; als een proces te weinig oplevert, zeggen we dat eerlijk. Onzeker of je huidige tools compatibel zijn? Stuur ons de lijst, dan checken we het vooraf — gratis en zonder verplichtingen.",
  },
];

const comparisonRows = [
  { label: "Kosten", employee: "~€50.000/jaar", ai: "Fractie van 1 FTE — ROI in maanden" },
  {
    label: "Beschikbaarheid",
    employee: "8u/dag, 5d/week",
    ai: "24/7, 365 dagen",
  },
  { label: "Vakantie", employee: "4 weken/jaar", ai: "Nooit" },
  { label: "Ziekteverzuim", employee: "10 dagen/jaar", ai: "Nooit" },
  { label: "Opstarttijd", employee: "3-6 maanden", ai: "2-4 weken" },
  { label: "Schaalbaar", employee: "Nieuwe vacature", ai: "Knop omzetten" },
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
// TYPEWRITER
// ============================================

const TypewriterText = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentPhrase = typewriterPhrases[currentPhraseIndex];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDrawing(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentPhraseIndex(
          (prev) => (prev + 1) % typewriterPhrases.length
        );
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40);
      }
    } else {
      if (displayedText.length === currentPhrase.length) {
        setIsDrawing(true);
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 80);
      }
    }

    return () => clearTimeout(timeout);
  }, [isMounted, displayedText, isDeleting, isPaused, currentPhrase]);

  const words = displayedText.trim().split(" ");
  const lastWord = words[words.length - 1];
  const textBeforeLastWord = words.slice(0, -1).join(" ");

  return (
    <span className="block font-bold italic">
      {textBeforeLastWord && <>{textBeforeLastWord} </>}
      <span className="relative inline-block">
        <span className="relative z-10">{lastWord}</span>
        <svg
          className="absolute -bottom-1 left-0 w-full h-[0.45em] z-0"
          viewBox="0 0 120 20"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 16Q50 6 118 10"
            stroke="#2D3A5C"
            strokeOpacity="0.22"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: isDrawing ? 0 : 1,
              opacity: isDrawing ? 1 : 0,
              transition: isDrawing
                ? "stroke-dashoffset 400ms ease-out, opacity 0ms"
                : "opacity 0ms",
            }}
          />
        </svg>
      </span>
      <span className="inline-block w-[3px] h-[1em] bg-[#1A2D63] ml-1 animate-pulse" />
    </span>
  );
};

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
    <div className="relative mt-7 block lg:hidden">
      <div className="relative h-52 sm:h-56 overflow-visible">
        <LogoCarousel
          className="logo-carousel absolute inset-0 pointer-events-none overflow-visible block lg:hidden"
          logoSize={52}
          svgTopPercent={39}
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
// ACCORDION TRIGGER (for Radix)
// ============================================

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger> & {
    children: React.ReactNode;
  }
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={`group flex flex-1 items-center justify-between py-4 text-left font-medium transition-all ${className ?? ""}`}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDown className="w-5 h-5 text-[#475D8F] shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Content> & {
    children: React.ReactNode;
  }
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={`overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up ${className ?? ""}`}
    {...props}
    ref={forwardedRef}
  >
    <div className="pb-4">{children}</div>
  </Accordion.Content>
));
AccordionContent.displayName = "AccordionContent";

// ============================================
// MAIN COMPONENT
// ============================================

export function ConsiderationLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [showStickyMobileCTA, setShowStickyMobileCTA] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const logoCarouselRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

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
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushDataLayerEvent("cta_click", {
                cta_label: "nav_calendly",
                location: "lp_consideration_nav",
              })
            }
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
          </a>

          {/* Mobile CTA only */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushDataLayerEvent("cta_click", {
                cta_label: "mobile_nav_calendly",
                location: "lp_consideration_mobile_nav",
              })
            }
            className="md:hidden flex items-center gap-1.5 bg-[#1A2D63] text-white rounded-full text-xs font-medium px-3.5 py-2 transition-opacity duration-300"
            style={{
              opacity: navScrollProgress,
              pointerEvents: navScrollProgress > 0.5 ? "auto" : "none",
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Plan een gesprek</span>
          </a>
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO SECTION                                 */}
      {/* ============================================ */}
      <header
        ref={heroRef}
        className="relative min-h-screen max-w-[100vw] mx-auto flex flex-col justify-center overflow-hidden"
      >
        <LogoCarousel carouselRef={logoCarouselRef} />

        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex items-center justify-center min-h-[calc(100svh-64px)] md:min-h-screen pt-20 md:pt-0 pb-0 w-full relative z-10">
          <div className="relative z-10 text-center max-w-[22rem] sm:max-w-[28rem] md:max-w-3xl px-2 sm:px-0">
            <motion.div
              className="mb-5 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-newsreader text-5xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[1] tracking-tight text-[#1A2D63]">
                <span className="block font-extralight">
                  Vergeet ChatGPT.
                </span>
                <span className="block font-extralight">Ontdek</span>
                <TypewriterText />
              </h1>
            </motion.div>

            <motion.p
              className="font-instrument text-base sm:text-[17px] md:text-lg text-[#475D8F] leading-relaxed max-w-md mx-auto mb-6 sm:mb-7 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Virtuele medewerkers die nooit ziek zijn, nooit vakantie nemen,
              en 24/7 voor je werken. Voor een fractie van de kosten.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  pushDataLayerEvent("cta_click", {
                    cta_label: "hero_calendly",
                    location: "lp_consideration_hero",
                  })
                }
                className="group w-full sm:w-auto bg-[#1A2D63] text-white px-6 py-3 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan je gratis AI Readiness Scan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
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
      {/* SECTION: Vergelijking                        */}
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
              Medewerker vs{" "}
              <span className="relative inline-block">
                <span className="relative z-10">AI-systeem</span>
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
              Geen vervanging, maar een versterking die altijd beschikbaar is.
            </p>
          </motion.div>

          {/* Comparison table */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl border border-[#1A2D63]/[0.08] shadow-lg shadow-[#1A2D63]/5 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[0.8fr_1fr_1fr] border-b border-[#1A2D63]/[0.08]">
                <div className="hidden md:block px-6 py-5" />
                <div className="px-5 py-5 md:px-6 text-center border-l border-[#1A2D63]/[0.06]">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#475D8F]/50 font-medium mb-1">
                    Extra medewerker
                  </p>
                  <p className="text-base md:text-lg font-newsreader font-semibold text-[#475D8F]">
                    Traditioneel
                  </p>
                </div>
                <div className="px-5 py-5 md:px-6 text-center bg-[#1A2D63] relative">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-white/50 font-medium mb-1">
                    AI-systeem
                  </p>
                  <p className="text-base md:text-lg font-newsreader font-semibold text-white">
                    Finit Solutions
                  </p>
                </div>
              </div>

              {/* Table rows */}
              {comparisonRows.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-[1fr_1fr] md:grid-cols-[0.8fr_1fr_1fr] group hover:bg-[#1A2D63]/[0.015] transition-colors ${
                    index < comparisonRows.length - 1
                      ? "border-b border-[#1A2D63]/[0.06]"
                      : ""
                  }`}
                >
                  {/* Row label */}
                  <div className="hidden md:flex items-center px-6 py-5">
                    <p className="text-[15px] font-semibold text-[#1A2D63]">
                      {row.label}
                    </p>
                  </div>

                  {/* Employee value */}
                  <div className="px-5 py-4 md:px-6 md:py-5 border-l border-[#1A2D63]/[0.06] flex flex-col justify-center text-center">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#475D8F]/40 font-medium mb-1 md:hidden">
                      {row.label}
                    </p>
                    <p className="text-sm md:text-[15px] text-[#475D8F]">
                      {row.employee}
                    </p>
                  </div>

                  {/* AI value */}
                  <div className="px-5 py-4 md:px-6 md:py-5 bg-[#1A2D63]/[0.03] flex flex-col justify-center text-center border-l border-[#1A2D63]/[0.04]">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#1A2D63]/35 font-medium mb-1 md:hidden">
                      {row.label}
                    </p>
                    <p className="text-sm md:text-[15px] text-[#1A2D63] font-semibold">
                      {row.ai}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom highlight pill */}
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-3 bg-[#1A2D63] rounded-full px-6 py-3 shadow-lg shadow-[#1A2D63]/15">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-sm text-white font-medium">
                  AI werkt naast je team, niet in plaats van
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#1A2D63" variant={3} />

      {/* ============================================ */}
      {/* SECTION 3: "Hoe het werkt" - 3 Steps         */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#1A2D63]">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-newsreader text-white leading-[1.15] mb-4">
              Hoe het{" "}
              <span className="relative inline-block">
                <span className="relative z-10">werkt</span>
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
                    strokeOpacity="0.5"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto">
              Drie stappen. Van gesprek tot werkend systeem.
            </p>
          </motion.div>

          <Accordion.Root
            type="single"
            collapsible
            defaultValue="step-0"
            className="space-y-4"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
              >
                <Accordion.Item
                  value={`step-${index}`}
                  className="bg-white/[0.06] rounded-2xl border border-white/10 hover:bg-white/[0.09] hover:-translate-y-1 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15"
                >
                  <AccordionTrigger className="px-6 md:px-8 text-white [&>svg]:text-white/40">
                    <div className="flex items-center gap-4 md:gap-5 flex-1 pr-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                        <step.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm font-newsreader font-semibold text-white/40">
                            {step.number}
                          </span>
                          <h3 className="text-lg md:text-xl font-semibold text-white">
                            {step.title}
                          </h3>
                          <span className="text-xs font-medium text-white/70 bg-white/10 px-2.5 py-1 rounded-full">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm md:text-[15px] mt-1 leading-relaxed hidden sm:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 md:px-8">
                    <p className="text-white/60 text-sm leading-relaxed mb-4 sm:hidden">
                      {step.description}
                    </p>
                    <div className="ml-0 sm:ml-[4.25rem] md:ml-[4.75rem] space-y-2.5 pb-2">
                      {step.details.map((detail, dIndex) => (
                        <div
                          key={dIndex}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </div>
      </section>

      <SectionDivider fromColor="#1A2D63" toColor="#FDFBF7" variant={1} />

      {/* ============================================ */}
      {/* SECTION 4: Bezwaar-handling FAQ               */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
              Je twijfelt{" "}
              <span className="relative inline-block">
                <span className="relative z-10">misschien</span>
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
              </span>{" "}
              over...
            </h2>
            <p className="text-[#1A2D63]/60 text-lg md:text-xl max-w-xl mx-auto">
              Logisch. Dit zijn de vragen die we het vaakst krijgen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <Accordion.Root
              type="single"
              collapsible
              className="space-y-3"
            >
              {faqItems.map((item, index) => (
                <Accordion.Item
                  key={index}
                  value={`faq-${index}`}
                  className="bg-white rounded-xl border border-[#1A2D63]/[0.06] shadow-lg hover:shadow-xl transition-all overflow-hidden"
                >
                  <AccordionTrigger className="px-6 text-[#1A2D63] text-[15px] md:text-base">
                    <span className="pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6">
                    <p className="text-[#475D8F] text-[15px] leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </motion.div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={2} />

      {/* ============================================ */}
      {/* SECTION 6: Final CTA                         */}
      {/* ============================================ */}
      <section
        id="contact"
        className="pt-8 md:pt-12 pb-20 md:pb-32 px-6 md:px-12 bg-[#FDFBF7] relative"
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
              <h2 className="font-newsreader text-3xl md:text-4xl lg:text-5xl text-[#1A2D63] mb-4">
                Benieuwd wat AI echt voor jouw bedrijf kan doen?
              </h2>
              <p className="text-[#1A2D63]/60 text-lg mb-8">
                Plan een vrijblijvend gesprek van 30 minuten. Wij analyseren
                waar de grootste kansen liggen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                {[
                  "Vrijblijvend",
                  "30 minuten",
                  "Concrete aanbevelingen",
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

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  pushDataLayerEvent("cta_click", {
                    cta_label: "final_calendly",
                    location: "lp_consideration_final_cta",
                  })
                }
                className="inline-flex items-center gap-2 md:gap-3 bg-[#1A2D63] text-white px-6 py-3.5 md:px-10 md:py-5 rounded-full text-base md:text-lg font-medium hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Plan je gratis AI Readiness Scan
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER                                       */}
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
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    pushDataLayerEvent("cta_click", {
                      cta_label: "footer_calendly",
                      location: "lp_consideration_footer",
                    })
                  }
                  className="bg-white text-[#1A2D63] px-6 py-3 rounded-full text-base font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Plan een gesprek
                </a>
                <a
                  href="mailto:contact@finitsolutions.be"
                  onClick={() =>
                    pushDataLayerEvent("contact_click", {
                      method: "email",
                      location: "lp_consideration_footer",
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
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushDataLayerEvent("cta_click", {
                cta_label: "sticky_mobile_calendly",
                location: "lp_consideration_sticky",
              })
            }
            className="flex items-center justify-center gap-2.5 bg-[#1A2D63] text-white w-full py-3 rounded-full text-[15px] font-medium shadow-lg shadow-[#1A2D63]/20"
          >
            <Calendar className="w-4 h-4" />
            Plan je gratis AI Readiness Scan
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
