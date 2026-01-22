"use client";

import React, { useState, useEffect, useRef, useCallback, MutableRefObject } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { gsap, useGSAP, ScrollTrigger, MorphSVGPlugin, MotionPathPlugin } from '@/lib/gsap';
import {
  ArrowRight,
  Menu,
  Calendar,
  Star,
  Check,
  Clock,
  UserMinus,
  TrendingDown,
  MessageSquare,
  Settings,
  Link2,
  Rocket,
  Quote,
  X,
  Sparkles,
  ExternalLink,
  Mail,
  ChevronDown,
  Target,
  UserCheck,
  Plug,
  Headphones
} from 'lucide-react';
import Image from 'next/image';

/**
 * AIDesignLanding
 *
 * Finit Solutions landing page - Conversion-optimized structure
 * Color palette: Porcelain white (#FDFBF7), Oxford Navy (#1A2D63), Slate Blue (#475D8F)
 * Typography: Newsreader (serif), Instrument Sans (sans-serif)
 */

// --- Data ---

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

const painPoints = [
  {
    icon: Clock,
    title: "Uren kwijt aan handmatige data-invoer",
    description: "Je typt dezelfde klantinfo in je CRM, Excel, en facturatie. Elke dag opnieuw."
  },
  {
    icon: UserMinus,
    title: "Leads die door de mazen glippen",
    description: "Geen tijd voor follow-ups? Die prospect van vorige week is nu klant bij je concurrent."
  },
  {
    icon: TrendingDown,
    title: "Geen tijd voor wat er echt toe doet",
    description: "Je bent ondernemer geworden om te groeien, niet om admin te doen tot middernacht."
  }
];

const processSteps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Gratis Consult",
    shortDescription: "Analyse van je processen en mogelijkheden",
    description: "We analyseren je huidige processen en identificeren waar AI het meeste impact heeft.",
    details: [
      "Uitgebreide analyse van je huidige workflows en systemen",
      "Identificatie van repetitieve taken die geautomatiseerd kunnen worden",
      "Bepaling van de grootste pijnpunten in je dagelijkse processen",
      "ROI-inschatting voor verschillende automatiseringsmogelijkheden",
      "Concreet actieplan op maat van jouw bedrijf"
    ]
  },
  {
    icon: Settings,
    step: "02",
    title: "Ontwerp op Maat",
    shortDescription: "Custom AI-agents voor jouw workflow",
    description: "We bouwen AI-agents specifiek voor jouw workflow, geen one-size-fits-all.",
    details: [
      "Custom AI-agents ontworpen voor jouw specifieke use cases",
      "Integratie met je bestaande tools en systemen",
      "Flexibele architectuur die meegroeit met je bedrijf",
      "Iteratief proces met regelmatige feedback momenten",
      "Uitgebreide testing voordat we live gaan"
    ]
  },
  {
    icon: Link2,
    step: "03",
    title: "Naadloze Integratie",
    shortDescription: "Koppeling met al je bestaande tools",
    description: "Alles koppelt met tools die je al gebruikt: CRM, email, Excel, boekhouding.",
    details: [
      "Directe koppelingen met je CRM, email, spreadsheets",
      "Automatische data synchronisatie tussen systemen",
      "Geen dubbel werk of handmatige data-invoer meer",
      "Veilige en betrouwbare connecties (GDPR-compliant)",
      "Technische support tijdens en na implementatie"
    ]
  },
  {
    icon: Rocket,
    step: "04",
    title: "Tijd Terug",
    shortDescription: "Focussen op groei, AI regelt de rest",
    description: "Jij focust op groei, de AI handelt de rest af. 24/7, zonder fouten.",
    details: [
      "AI draait continu, ook buiten kantooruren",
      "Directe kostenbesparing door tijdwinst",
      "Menselijke fouten worden geëlimineerd",
      "Schaalbaar zonder extra personeel aan te nemen",
      "Real-time monitoring en rapportage van resultaten"
    ]
  }
];

const differentiators = [
  {
    icon: Target,
    title: "Maatwerk voor Vlaamse KMO's",
    description: "Oplossingen die passen bij jouw specifieke workflow en processen"
  },
  {
    icon: UserCheck,
    title: "Geen technische kennis vereist",
    description: "Wij regelen alles van A tot Z, jij focust op je core business"
  },
  {
    icon: Plug,
    title: "Volledige integratie",
    description: "Koppelt naadloos met tools die je al gebruikt: CRM, email, Excel, boekhouding"
  },
  {
    icon: Headphones,
    title: "Support in het Nederlands",
    description: "Belgisch team, 24/7 bereikbaar, begrijpt jouw KMO-uitdagingen"
  }
];

const transformationBefore = [
  "3 systemen handmatig bijwerken",
  "Follow-ups vergeten of te laat",
  "Avonden en weekends aan admin",
  "Groei beperkt door tijd"
];

const transformationAfter = [
  "Eén voice memo, alles gesynchroniseerd",
  "Automatische opvolging op het juiste moment",
  "Processen draaien terwijl jij slaapt",
  "Schalen zonder extra personeel"
];


// --- Utility Components ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.08] mix-blend-multiply"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}
  />
);

// --- Typewriter Animation Component ---
const typewriterPhrases = [
  "your workflow",
  "routine work",
  "data entry",
  "your business",
  "repetitive tasks",
  "daily admin",
  "customer follow-ups",
  "manual processes",
  "your operations",
  "the boring stuff",
  "lead management",
  "email responses",
];

const TypewriterText = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentPhrase = typewriterPhrases[currentPhraseIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDrawing(false); // Reset drawing state before deleting
        setIsDeleting(true);
      }, 2000); // Pause for 2 seconds before deleting
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40); // Delete speed
      }
    } else {
      if (displayedText.length === currentPhrase.length) {
        setIsDrawing(true); // Trigger highlighter draw animation
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 80); // Type speed
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, isPaused, currentPhrase]);

  // Split displayed text into words for highlighting the last word
  const words = displayedText.trim().split(' ');
  const lastWord = words[words.length - 1];
  const textBeforeLastWord = words.slice(0, -1).join(' ');

  return (
    <span className="block font-bold italic">
      {textBeforeLastWord && <>{textBeforeLastWord} </>}
      <span className="relative inline-block">
        <span className="relative z-10">{lastWord}</span>
        {/* Marker brush stroke SVG - hand-drawn animation */}
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
                ? 'stroke-dashoffset 400ms ease-out, opacity 0ms'
                : 'opacity 0ms',
            }}
          />
        </svg>
      </span>
      <span className="inline-block w-[3px] h-[1em] bg-[#1A2D63] ml-1 animate-pulse" />
    </span>
  );
};

// --- Logo Carousel with Curved Motion Path ---
interface LogoCarouselProps {
  carouselRef: React.RefObject<HTMLDivElement | null>;
}

const LogoCarousel = ({ carouselRef }: LogoCarouselProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fixed aspect ratio for the curve (width:height)
  // This ensures the curve shape stays identical on all screen sizes
  const CURVE_ASPECT_RATIO = 16 / 9; // 1.778

  useGSAP(() => {
    if (!containerRef.current || !svgRef.current) return;

    const logos = containerRef.current.querySelectorAll('.floating-logo');
    const path = svgRef.current.querySelector('#logoMotionPath') as SVGPathElement;

    if (logos.length === 0 || !path) return;

    const totalLogos = logos.length;
    const animationDuration = 80; // Total loop duration in seconds

    // Calculate spacing as fraction of path (0 to 1)
    const spacing = 1 / totalLogos;

    // Animate each logo along the path with fixed spacing
    logos.forEach((logo, index) => {
      // Calculate starting position on the path (evenly distributed)
      const startProgress = index * spacing;

      // Set initial centering and make visible
      gsap.set(logo, {
        xPercent: -50,
        yPercent: -50,
        opacity: 1,  // Show logo once GSAP takes control
      });

      // Create continuous looping animation - immediateRender positions them instantly
      gsap.fromTo(logo,
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: startProgress,
            end: startProgress,
          },
        },
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: startProgress,
            end: startProgress + 1, // Full loop
          },
          duration: animationDuration,
          ease: "none",
          repeat: -1,
          immediateRender: true, // Ensures logos are positioned immediately on page load
        }
      );
    });
  }, { scope: containerRef });

  // Use all logos for the carousel
  const displayLogos = integrationLogos;

  // Callback ref to set both internal and external refs
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    // Set local ref for GSAP animations
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    // Set parent ref for scroll-triggered fade
    if (carouselRef && 'current' in carouselRef) {
      (carouselRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  }, [carouselRef]);

  return (
    <div
      ref={setRefs}
      className="logo-carousel absolute inset-0 pointer-events-none overflow-visible hidden lg:block"
      style={{ zIndex: 6 }}
    >
      {/*
        SVG with fixed aspect ratio curve.
        - viewBox uses 1600x900 (16:9) coordinate system
        - preserveAspectRatio="xMidYMid meet" maintains curve shape
        - Container spans full width, height scales proportionally
        - On wider screens: same curve, icons spread further apart
        - On narrower screens: same curve, icons closer together
      */}
      <svg
        ref={svgRef}
        className="absolute left-0"
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: `${CURVE_ASPECT_RATIO}`,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid meet"
      >
        {/*
          Path coordinates in 1600x900 space:
          - Starts off-screen left at bottom area
          - Curves down then up through the middle
          - Exits off-screen right at top area
        */}
        <path
          id="logoMotionPath"
          d="M -100,612
             C 150,680 300,750 480,780
             C 660,800 750,720 880,612
             C 1000,510 1080,400 1200,320
             C 1320,240 1450,160 1700,80"
          fill="none"
          stroke="transparent"
        />
      </svg>

      {/* Logo cards following the path */}
      {displayLogos.map((logo, index) => (
        <div
          key={`floating-${logo.name}-${index}`}
          className="floating-logo absolute"
          style={{
            width: '74px',
            height: '74px',
            left: 0,
            top: 0,
            opacity: 0,  // Hidden until GSAP positions them
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

// --- Main Component ---

export function AIDesignLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroTextRef = useRef(null);
  const logoCarouselRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const footerWaveRef = useRef<SVGPathElement>(null);

  // No scroll animation - just normal scroll


  // Footer bounce animation
  useGSAP(() => {
    const curvedPath = 'M0-0.3C0-0.3,464,120,1139,120S2278-0.3,2278-0.3V683H0V-0.3z';
    const flatPath = 'M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z';

    if (footerRef.current && footerWaveRef.current) {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top bottom',
        onEnter: (self) => {
          const velocity = self.getVelocity();
          const variation = velocity / 10000;

          gsap.fromTo(footerWaveRef.current,
            { morphSVG: curvedPath },
            {
              duration: 2,
              morphSVG: flatPath,
              ease: `elastic.out(${1 + variation}, ${1 - variation})`,
              overwrite: true
            }
          );
        }
      });
    }
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2D63] font-instrument selection:bg-[#B8C5E6] selection:text-[#1A2D63] overflow-x-hidden">
      <NoiseOverlay />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 px-4 sm:px-6 py-4 md:py-6 ${scrolled ? 'bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#1A2D63]/5' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>

          <div className="hidden md:flex items-center gap-1 bg-[#1A2D63]/5 p-1 rounded-full backdrop-blur-sm border border-[#1A2D63]/5">
            {[
              { label: 'Diensten', href: '/diensten' },
              { label: 'Over Ons', href: '/about' },
              { label: 'Cases', href: '/blog' },
              { label: 'Contact', href: '#contact' }
            ].map((item) => (
              <a key={item.label} href={item.href} className="px-5 py-2 rounded-full text-sm font-medium text-[#1A2D63]/70 hover:bg-[#FFFFFF] hover:text-[#1A2D63] transition-all duration-300">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#1A2D63] text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg shadow-[#1A2D63]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan een gesprek</span>
            </a>
            <button className="md:hidden p-2 bg-[#1A2D63]/10 rounded-full text-[#1A2D63]">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO SECTION - Keep animation, update copy  */}
      {/* ============================================ */}
      <header ref={heroRef} className="relative min-h-screen max-w-[100vw] mx-auto flex flex-col justify-center overflow-hidden">

        {/* Floating Logo Carousel - Background animation */}
        <LogoCarousel carouselRef={logoCarouselRef} />

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-4 items-center min-h-screen py-20 md:py-0 w-full relative z-10">
          {/* Left Content */}
          <div ref={heroTextRef} className="lg:col-span-6 relative z-10">
            <div className="h-[5.5rem] sm:h-[7rem] md:h-[8.5rem] lg:h-[10rem] xl:h-[11rem] flex flex-col justify-end mb-5 sm:mb-6 md:mb-8">
              <h1 className="font-newsreader text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[1] tracking-tight text-[#1A2D63]">
                <span className="block font-extralight">Automate</span>
                <TypewriterText />
              </h1>
            </div>

            <p className="font-instrument text-base sm:text-[17px] md:text-lg text-[#475D8F] leading-relaxed max-w-lg mb-6 sm:mb-7 md:mb-8">
              Wij bouwen custom AI-agents die integreren met je bestaande tools en repetitieve taken volledig overnemen.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto bg-[#1A2D63] text-white px-6 py-3 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan een gratis consult</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Content - Dynamic Animated Design */}
          <div ref={heroImageRef} className="lg:col-span-6 relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] xl:h-[600px] 2xl:h-[660px] w-full overflow-visible">
            <div className="absolute inset-0 rounded-t-[3rem] sm:rounded-t-[4rem] md:rounded-t-[5rem] lg:rounded-t-[6rem] rounded-b-xl sm:rounded-b-2xl overflow-visible bg-transparent">
              {/* Animated Background Shapes */}
              <svg className="absolute -inset-[60px] w-[calc(100%+120px)] h-[calc(100%+120px)]" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A2D63" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#475D8F" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1A2D63" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2A4488" stopOpacity="0.28" />
                  </linearGradient>
                </defs>
                
                {/* Animated Circle 1 */}
                <motion.circle
                  cx="200"
                  cy="150"
                  r="90"
                  fill="url(#gradient1)"
                  initial={{ x: 0, y: 0 }}
                  animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -25, 15, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Animated Circle 2 */}
                <motion.circle
                  cx="600"
                  cy="300"
                  r="110"
                  fill="url(#gradient2)"
                  initial={{ x: 0, y: 0 }}
                  animate={{
                    x: [0, -40, 25, 0],
                    y: [0, 30, -20, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                
                {/* Animated Circle 3 */}
                <motion.circle
                  cx="400"
                  cy="450"
                  r="75"
                  fill="url(#gradient1)"
                  initial={{ x: 0, y: 0 }}
                  animate={{
                    x: [0, 20, -15, 0],
                    y: [0, -30, 20, 0],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                  }}
                />
                
                {/* Floating Lines */}
                <motion.path
                  d="M 100 200 Q 300 100 500 200 T 700 200"
                  stroke="#1A2D63"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.1"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.15, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.path
                  d="M 150 400 Q 350 300 550 400 T 750 400"
                  stroke="#475D8F"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.08"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.12, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </svg>
              
              {/* Animated Grid Pattern Overlay */}
              <div 
                className="absolute -inset-[60px] w-[calc(100%+120px)] h-[calc(100%+120px)] opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(#1A2D63 1px, transparent 1px),
                    linear-gradient(90deg, #1A2D63 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                  animation: shouldReduceMotion ? 'none' : 'gridMove 20s linear infinite'
                }}
              />
              
              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#1A2D63]"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    opacity: 0.15
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 15, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
            
            {/* Bottom blur overlay */}
            <div className="absolute inset-x-0 bottom-0 h-20 backdrop-blur-[6px] rounded-b-xl sm:rounded-b-2xl pointer-events-none" style={{ maskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}></div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FDFBF7] to-transparent rounded-b-xl sm:rounded-b-2xl pointer-events-none"></div>
          </div>
        </div>

      </header>

      {/* ============================================ */}
      {/* HOW IT WORKS SECTION - Process Steps         */}
      {/* ============================================ */}
      <section id="process" className="py-12 md:py-[60px] px-6 md:px-[80px] bg-[#F0F4F8] relative border-t border-[#1A2D63]/5">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-newsreader text-[#1A2D63] leading-[1.2] sm:leading-[1.15] px-2 mb-6 max-w-4xl mx-auto">
              <span className="block mb-2">Hoe kan je AI implementeren</span>
              <span className="block">
                in je bedrijf 
                <span className="relative inline-block mx-2">
                  <span className="relative z-10">zonder alles om te gooien?</span>
                  <svg 
                    className="absolute -bottom-1 left-0 w-full h-[0.4em] z-0 text-[#1A2D63]/20" 
                    viewBox="0 0 200 20" 
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M5 15 Q50 5 100 10 T195 8" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </span>
            </h2>
            <p className="text-[#1A2D63]/70 text-lg max-w-2xl mx-auto mt-4">
              Van eerste gesprek tot volledige implementatie - in vier duidelijke stappen
            </p>
          </div>

          {/* Side-by-Side Process Layout */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 relative">
            {/* LEFT PANEL - Compact Cards */}
            <div className="w-full lg:w-[40%] lg:min-w-[400px] flex flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {/* Mobile: Horizontal Scroll */}
              <div className="flex lg:flex-col gap-4 lg:gap-4 min-w-max lg:min-w-0">
              {processSteps.map((step, index) => {
                const isActive = activeStep === index;
                const handleClick = () => {
                  setActiveStep(isActive ? null : index);
                  if (rightPanelRef.current) {
                    rightPanelRef.current.scrollTop = 0;
                  }
                };
                
                const handleKeyDown = (e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const nextIndex = e.key === 'ArrowDown' 
                      ? (index + 1) % processSteps.length
                      : (index - 1 + processSteps.length) % processSteps.length;
                    const nextCard = document.querySelector(`[data-step-index="${nextIndex}"]`) as HTMLElement;
                    nextCard?.focus();
                  }
                };
                
                return (
                  <motion.div
                    key={`step-${step.step}-${index}`}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: index * 0.1 }}
                    className="w-[280px] lg:w-full shrink-0 lg:shrink"
                  >
                    <motion.button
                      onClick={handleClick}
                      onKeyDown={handleKeyDown}
                      type="button"
                      data-step-index={index}
                      aria-selected={isActive}
                      aria-expanded={isActive}
                      className={`group relative w-full h-[120px] bg-white border rounded-2xl p-6 text-left transition-all duration-200 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/20 focus:ring-offset-2 ${
                        isActive 
                          ? 'border-l-4 border-l-[#1A2D63] bg-[#F9FAFB] shadow-[0_4px_16px_rgba(0,0,0,0.15)]' 
                          : 'border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:translate-x-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:border-[#1A2D63]/30'
                      }`}
                      whileHover={!isActive ? { x: shouldReduceMotion ? 0 : 4 } : {}}
                      whileTap={{ scale: 0.98 }}
                      style={{ willChange: 'transform' }}
                    >
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-[#1A2D63] flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        {step.step}
                      </div>
                      
                      {/* Click Indicator - Arrow icon */}
                      {!isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#1A2D63]/10 flex items-center justify-center group-hover:bg-[#1A2D63]/20 transition-colors"
                        >
                          <ChevronDown className="w-3 h-3 text-[#1A2D63] rotate-[-90deg]" />
                        </motion.div>
                      )}
                      
                      <div className="flex items-start gap-4 h-full pr-8">
                        {/* Icon */}
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-[#F8F9FB] flex items-center justify-center shrink-0 group-hover:bg-[#1A2D63]/5 transition-colors"
                          whileHover={!isActive ? { scale: 1.1 } : {}}
                          transition={{ duration: 0.2 }}
                        >
                          <step.icon className="w-5 h-5 text-[#1A2D63]" />
                        </motion.div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-[#1A2D63] mb-1 group-hover:text-[#1A2D63] transition-colors">{step.title}</h3>
                          <p className="text-sm text-[#1A2D63]/70 line-clamp-1 group-hover:text-[#1A2D63]/80 transition-colors">{step.shortDescription}</p>
                          {!isActive && (
                            <span className="text-xs text-[#1A2D63]/50 mt-1 block group-hover:text-[#1A2D63]/60 transition-colors">
                              Klik voor details
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
              </div>
            </div>

            {/* RIGHT PANEL - Detail View */}
            <motion.div
              ref={rightPanelRef}
              className="w-full lg:w-[60%] lg:sticky lg:top-[100px] bg-white border border-[#E5E7EB] rounded-[20px] p-6 md:p-12 min-h-[500px] shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              style={{ willChange: 'transform, opacity' }}
            >
              <AnimatePresence mode="wait">
                {activeStep === null ? (
                  // PLACEHOLDER STATE
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                    className="h-full flex flex-col items-center justify-center py-4"
                  >
                    {/* Logo */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
                      className="mb-6"
                    >
                      <img
                        src="/Finit Logo Blue@4x.png"
                        alt="Finit Solutions"
                        className="h-10 md:h-12 w-auto object-contain"
                      />
                    </motion.div>
                    
                    <h2 className="text-xl md:text-2xl font-bold text-[#1A2D63] text-center mb-3">
                      Waarom kiezen voor ons?
                    </h2>
                    
                    <p className="text-sm md:text-base text-[#1A2D63]/70 text-center mb-6 max-w-xl">
                      Ontdek wat ons uniek maakt
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 max-w-[550px] w-full">
                      {differentiators.map((diff, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: shouldReduceMotion ? 0 : 0.3, 
                            delay: idx * 0.1 
                          }}
                          className="text-center"
                        >
                          <motion.div
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#F8F9FB] flex items-center justify-center mx-auto mb-3"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(26, 45, 99, 0.05)' }}
                            transition={{ duration: 0.2 }}
                          >
                            <diff.icon className="w-6 h-6 md:w-7 md:h-7 text-[#1A2D63]" />
                          </motion.div>
                          <h3 className="text-base md:text-lg font-semibold text-[#1A2D63] mb-1">{diff.title}</h3>
                          <p className="text-xs md:text-sm text-[#1A2D63]/75 leading-relaxed">{diff.description}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-xs text-[#1A2D63]/50 text-center mt-6 flex items-center justify-center gap-2"
                    >
                      <span>👈</span>
                      <span>Klik op een stap voor details</span>
                    </motion.p>
                  </motion.div>
                ) : (
                  // ACTIVE STATE - Step Details
                  <motion.div
                    key={`step-${activeStep}`}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                    className="h-full"
                  >
                    {(() => {
                      const step = processSteps[activeStep];
                      return (
                        <>
                          {/* Large Icon */}
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                            className="w-16 h-16 md:w-[100px] md:h-[100px] rounded-full bg-[#F8F9FB] flex items-center justify-center mb-4 md:mb-6"
                          >
                            <step.icon className="w-8 h-8 md:w-20 md:h-20 text-[#1A2D63]" />
                          </motion.div>
                          
                          {/* Title */}
                          <h2 className="text-2xl md:text-[32px] font-bold text-[#1A2D63] mb-3 md:mb-4">
                            {step.title}
                          </h2>
                          
                          {/* Description */}
                          <p className="text-base md:text-lg text-[#1A2D63]/80 leading-relaxed mb-6 md:mb-8">
                            {step.description}
                          </p>
                          
                          {/* Bullet Points */}
                          <ul className="space-y-4 mb-10">
                            {step.details?.map((detail, detailIndex) => (
                              <motion.li
                                key={detailIndex}
                                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  duration: shouldReduceMotion ? 0 : 0.3,
                                  delay: detailIndex * 0.05
                                }}
                                className="flex items-start gap-3"
                              >
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-base text-[#1A2D63]/85 leading-relaxed">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          {/* CTA Button */}
                          <motion.a
                            href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#1A2D63] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#2A4488] transition-colors shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Calendar className="w-5 h-5" />
                            Plan een gratis consult
                          </motion.a>
                        </>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* CTA Buttons after Process */}
          <div className="text-center mt-12 md:mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#1A2D63] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/20"
              >
                <Calendar className="w-5 h-5" />
                <span>Plan een gratis consult</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#use-cases"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('use-cases');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center gap-2 border-2 border-[#1A2D63]/20 text-[#1A2D63] px-8 py-4 rounded-full font-medium hover:bg-[#1A2D63]/5 hover:border-[#1A2D63]/40 transition-colors"
              >
                <span>Bekijk echte voorbeelden</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* USE CASES SECTION                          */}
      {/* ============================================ */}
      <section id="use-cases" className="py-20 md:py-32 px-6 md:px-12 bg-[#F0F4F8] relative border-t border-[#1A2D63]/5">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4 text-[#1A2D63]/60">
              <div className="h-[1px] w-12 bg-[#1A2D63]/30"></div>
              <span className="text-sm font-medium uppercase tracking-widest">Echte Voorbeelden</span>
              <div className="h-[1px] w-12 bg-[#1A2D63]/30"></div>
            </div>
            <h2 className="font-newsreader text-3xl md:text-4xl lg:text-5xl text-[#1A2D63] mb-4">
              Hoe klanten AI gebruiken
            </h2>
            <p className="text-[#1A2D63]/70 text-lg max-w-2xl mx-auto">
              Ontdek hoe bedrijven uit verschillende sectoren AI inzetten om hun processen te automatiseren
            </p>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Use Case 1 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-[#1A2D63]/10 shadow-sm hover:shadow-xl hover:border-[#1A2D63]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-[#1A2D63]" />
              </div>
              <h3 className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-3">
                Automatische Lead Follow-up
              </h3>
              <p className="text-[#1A2D63]/70 leading-relaxed mb-4">
                Een sales team gebruikt AI om automatisch follow-up emails te sturen aan prospects op basis van hun interactie met eerdere berichten.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#1A2D63]/60">
                <span className="font-semibold">Resultaat:</span>
                <span>40% meer conversies</span>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-[#1A2D63]/10 shadow-sm hover:shadow-xl hover:border-[#1A2D63]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-[#1A2D63]" />
              </div>
              <h3 className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-3">
                CRM Data Synchronisatie
              </h3>
              <p className="text-[#1A2D63]/70 leading-relaxed mb-4">
                Een bedrijf automatiseert het invoeren van klantgegevens vanuit emails en gesprekken direct in hun CRM systeem.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#1A2D63]/60">
                <span className="font-semibold">Resultaat:</span>
                <span>15 uur/week bespaard</span>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-[#1A2D63]/10 shadow-sm hover:shadow-xl hover:border-[#1A2D63]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#1A2D63]" />
              </div>
              <h3 className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-3">
                Intelligente Afsprakenplanning
              </h3>
              <p className="text-[#1A2D63]/70 leading-relaxed mb-4">
                AI analyseert beschikbaarheid en voorkeuren om automatisch de beste tijdstippen voor meetings voor te stellen.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#1A2D63]/60">
                <span className="font-semibold">Resultaat:</span>
                <span>90% minder back-and-forth</span>
              </div>
            </div>

            {/* Use Case 4 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-[#1A2D63]/10 shadow-sm hover:shadow-xl hover:border-[#1A2D63]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 flex items-center justify-center mb-4">
                <Link2 className="w-6 h-6 text-[#1A2D63]" />
              </div>
              <h3 className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-3">
                Multi-System Integratie
              </h3>
              <p className="text-[#1A2D63]/70 leading-relaxed mb-4">
                Automatische synchronisatie tussen Excel, CRM en facturatiesysteem - één invoer, alles bijgewerkt.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#1A2D63]/60">
                <span className="font-semibold">Resultaat:</span>
                <span>0% data fouten</span>
              </div>
            </div>

            {/* Use Case 5 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-[#1A2D63]/10 shadow-sm hover:shadow-xl hover:border-[#1A2D63]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-[#1A2D63]" />
              </div>
              <h3 className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-3">
                Klantenservice Automatisering
              </h3>
              <p className="text-[#1A2D63]/70 leading-relaxed mb-4">
                AI beantwoordt veelgestelde vragen en routeert complexe vragen naar het juiste teamlid.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#1A2D63]/60">
                <span className="font-semibold">Resultaat:</span>
                <span>60% snellere reactietijd</span>
              </div>
            </div>

            {/* Use Case 6 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-[#1A2D63]/10 shadow-sm hover:shadow-xl hover:border-[#1A2D63]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-600/5 flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-[#1A2D63]" />
              </div>
              <h3 className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-3">
                Rapportage Automatisering
              </h3>
              <p className="text-[#1A2D63]/70 leading-relaxed mb-4">
                Automatische generatie van wekelijkse rapporten door data uit verschillende bronnen te combineren.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#1A2D63]/60">
                <span className="font-semibold">Resultaat:</span>
                <span>5 uur/week teruggewonnen</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================ */}
      {/* SECONDARY CTA SECTION                       */}
      {/* ============================================ */}
      <section id="contact" className="py-20 md:py-32 px-6 md:px-12 bg-[#FDFBF7] relative border-t border-[#1A2D63]/5">
        <div className="max-w-[800px] mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-[#B8C5E6] rounded-full blur-[120px] opacity-30"></div>
            <div className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#1A2D63]/10 text-center">
              <h2 className="font-newsreader text-3xl md:text-4xl lg:text-5xl text-[#1A2D63] mb-4">
                Klaar om te ontdekken wat AI voor jou kan doen?
              </h2>
              <p className="text-[#1A2D63]/60 text-lg mb-8">30 minuten, gratis, geen verplichtingen</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                {[
                  'Analyse van je processen',
                  'Automatiseringskansen',
                  'Concreet plan',
                  'ROI inschatting'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#1A2D63]">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#1A2D63] text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20"
              >
                <Calendar className="w-6 h-6" />
                Plan je gratis gesprek
                <ArrowRight className="w-6 h-6" />
              </a>

              <p className="text-[#1A2D63]/40 text-sm mt-6">Reactie binnen 24 uur</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER with Kasparov Quote                  */}
      {/* ============================================ */}
      <footer ref={footerRef} className="bg-[#1A2D63] text-white pt-16 md:pt-20 pb-12 md:pb-16 px-6 relative overflow-visible mt-16 md:mt-20 lg:mt-24">
        {/* Bouncy SVG Wave */}
        <div className="absolute top-0 left-0 w-full" style={{ transform: 'translateY(-99%)' }}>
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2278 683"
            className="w-full h-16 md:h-20 lg:h-24 block"
            style={{ overflow: 'visible' }}
          >
            <path
              ref={footerWaveRef}
              fill="#1A2D63"
              d="M0-0.3C0-0.3,464,120,1139,120S2278-0.3,2278-0.3V683H0V-0.3z"
            />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Kasparov Quote Card */}
          <div className="mb-12 md:mb-16">
            <motion.div 
              className="bg-gradient-to-br from-[#0F1C40] to-[#1A2D63] rounded-3xl p-8 md:p-10 border border-white/10 max-w-2xl mx-auto relative overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50"></div>
              
              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Quote className="w-10 h-10 md:w-12 md:h-12 text-white/30 mb-6" />
                </motion.div>
                <motion.blockquote 
                  className="font-newsreader text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-8 italic font-light"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  &ldquo;AI will not replace humans, but those who use AI will replace those who don&apos;t.&rdquo;
                </motion.blockquote>
                <motion.div 
                  className="flex items-center gap-4 pt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center border border-white/20 overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Garry_Kasparov_2007.jpg/800px-Garry_Kasparov_2007.jpg"
                      alt="Garry Kasparov"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base">Garry Kasparov</p>
                    <p className="text-white/60 text-sm">Schaakgrootmeester & Strateeg</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Footer CTA */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-newsreader leading-tight mb-4 text-center lg:text-left">
              Klaar om uw bedrijf <br/>te automatiseren?
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-6 max-w-md text-center lg:text-left mx-auto lg:mx-0">
              Ontdek hoe AI uw bedrijfsprocessen kan transformeren.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#1A2D63] px-6 py-3 rounded-full text-base font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Plan een gesprek
              </a>
              <a
                href="mailto:contact@finitsolutions.be"
                className="border border-white/20 px-6 py-3 rounded-full text-base font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                contact@finitsolutions.be
              </a>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/Finit Logo Blue@4x.png"
                alt="Finit Logo"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/algemene-voorwaarden" className="hover:text-white transition-colors">Voorwaarden</a>
              <a href="/cookieverklaring" className="hover:text-white transition-colors">Cookies</a>
            </div>
            <p className="text-sm text-white/40">© 2025 Finit Solutions</p>
          </div>
        </div>

        {/* Large Watermark */}
        <div className="absolute bottom-0 left-0 w-full text-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
          <span className="text-[12vw] font-newsreader font-bold leading-none text-white">FINIT</span>
        </div>
      </footer>
    </div>
  );
}

export default AIDesignLanding;
