"use client";

import React, { useState, useEffect, useRef, useCallback, MutableRefObject } from 'react';
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
  Mail
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
    description: "We analyseren je huidige processen en identificeren waar AI het meeste impact heeft."
  },
  {
    icon: Settings,
    step: "02",
    title: "Ontwerp op Maat",
    description: "We bouwen AI-agents specifiek voor jouw workflow, geen one-size-fits-all."
  },
  {
    icon: Link2,
    step: "03",
    title: "Naadloze Integratie",
    description: "Alles koppelt met tools die je al gebruikt: CRM, email, Excel, boekhouding."
  },
  {
    icon: Rocket,
    step: "04",
    title: "Tijd Terug",
    description: "Jij focust op groei, de AI handelt de rest af. 24/7, zonder fouten."
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

const testimonials = [
  {
    quote: "Finit Solutions heeft onze bedrijfsprocessen compleet getransformeerd. Eindelijk heb ik mijn avonden terug.",
    author: "Thomas Janssens",
    position: "CEO, TechVision BV",
    context: "Software, 25 medewerkers",
    avatar: "TJ",
    outcome: "Processen 3x sneller"
  },
  {
    quote: "Als ondernemer was ik altijd op zoek naar manieren om tijd te besparen. Finit heeft dit mogelijk gemaakt met hun slimme automatiseringsoplossingen.",
    author: "Lisa van den Berg",
    position: "Eigenaar, Digital Solutions",
    context: "Marketing, 8 medewerkers",
    avatar: "LB",
    outcome: "10+ uur/week bespaard"
  },
  {
    quote: "De persoonlijke aanpak en technische expertise van Finit Solutions hebben ons overtuigd. Ze denken echt mee over de beste oplossing.",
    author: "Mark de Vries",
    position: "Directeur, InnovateNow",
    context: "Consultancy, 15 medewerkers",
    avatar: "MV",
    outcome: "Geen gemiste leads meer"
  }
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroTextRef = useRef(null);
  const introRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const logoCarouselRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const footerWaveRef = useRef<SVGPathElement>(null);

  // Hero animation - curtain split effect
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    if (leftCurtainRef.current) {
      tl.to(leftCurtainRef.current, { xPercent: -100, ease: "power2.inOut" }, 0);
    }
    if (rightCurtainRef.current) {
      tl.to(rightCurtainRef.current, { xPercent: 100, ease: "power2.inOut" }, 0);
    }

    if (heroTextRef.current) {
      const textElements = (heroTextRef.current as HTMLElement).children;
      tl.to(textElements, {
        x: '-100vw',
        rotationY: 45,
        opacity: 0,
        skewX: 5,
        stagger: 0.02,
        ease: "power2.inOut",
        transformOrigin: "left center"
      }, 0);
    }

    if (heroImageRef.current) {
      tl.to(heroImageRef.current, {
        x: '100vw',
        rotationY: -45,
        filter: "blur(5px)",
        opacity: 0.5,
        ease: "power2.inOut",
        transformOrigin: "right center"
      }, 0);
    }

    if (introRef.current) {
      tl.fromTo(introRef.current,
        { y: "30%", scale: 0.95 },
        { y: "0%", scale: 1, ease: "power2.out" },
        0
      );
    }

    // Fade logo carousel quickly at the very start of the scroll
    if (logoCarouselRef.current) {
      tl.to(logoCarouselRef.current, {
        opacity: 0,
        duration: 0.15, // Only takes 15% of the total scroll animation
        ease: "power2.in",
      }, 0); // Starts at the same time as everything else, but ends much sooner
    }

  }, { scope: heroRef });


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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
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
              href="https://calendly.com/alex-finitsolutions/30min"
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
      <header ref={heroRef} className="relative min-h-screen max-w-[100vw] mx-auto flex flex-col justify-center overflow-hidden" style={{ perspective: '1000px' }}>

        {/* Floating Logo Carousel - Background animation */}
        <LogoCarousel carouselRef={logoCarouselRef} />

        {/* Rising Card - Problem Teaser (replaces quote) */}
        <div
          ref={introRef}
          className="absolute bottom-0 left-0 right-0 h-full z-0 bg-[#F0F4F8] text-[#1A2D63] flex items-center justify-center rounded-t-[1.5rem] md:rounded-t-[3rem] shadow-[0_-20px_60px_rgba(26,45,99,0.1)] border-t border-[#1A2D63]/5 overflow-hidden"
          style={{ transform: "translateY(30%) scale(0.95)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col justify-center relative z-10 py-16 md:py-0">
            <div className="flex flex-col items-center text-center">
              <div className="space-y-6 sm:space-y-8 md:space-y-10 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-2 sm:gap-4 text-[#1A2D63]">
                  <span className="h-[1px] w-6 sm:w-12 bg-[#1A2D63]"></span>
                  <span className="font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold">Herken je dit?</span>
                  <span className="h-[1px] w-6 sm:w-12 bg-[#1A2D63]"></span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-newsreader text-[#1A2D63] leading-[1.15] sm:leading-[1.1] px-2">
                  Te veel tijd kwijt aan taken die een computer beter kan doen?
                </h2>

                <p className="font-instrument text-base sm:text-lg md:text-xl text-[#1A2D63]/70 font-medium leading-relaxed px-2 max-w-2xl mx-auto">
                  Data invoeren, follow-ups bijhouden, rapportages maken... Terwijl jij je zou moeten focussen op groei.
                </p>

                <div className="pt-6 sm:pt-8">
                  <a
                    href="#problem"
                    className="inline-flex items-center gap-2 bg-[#1A2D63] text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
                  >
                    Ontdek de oplossing
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curtain Panels */}
        <div ref={leftCurtainRef} className="absolute top-0 left-0 w-[50.5%] h-full bg-[#FDFBF7] z-[5] pointer-events-none origin-left"></div>
        <div ref={rightCurtainRef} className="absolute top-0 right-0 w-[50.5%] h-full bg-[#FDFBF7] z-[5] pointer-events-none origin-right"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-4 items-center min-h-screen py-20 md:py-0 w-full relative z-10" style={{ transformStyle: 'preserve-3d' }}>
          {/* Left Content */}
          <div ref={heroTextRef} className="lg:col-span-6 relative z-10 will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
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
                href="https://calendly.com/alex-finitsolutions/30min"
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

          {/* Right Content - Abstract Hero Image */}
          <div ref={heroImageRef} className="lg:col-span-6 relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] xl:h-[600px] 2xl:h-[660px] w-full will-change-transform">
            <div className="absolute inset-0 rounded-t-[3rem] sm:rounded-t-[4rem] md:rounded-t-[5rem] lg:rounded-t-[6rem] rounded-b-xl sm:rounded-b-2xl overflow-hidden border border-[#1A2D63]/10 bg-[#F0F4F8]">
              <img
                src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/ce8677f5-f08e-41ee-b50a-35874bebd9e3/generated-images/generated-29d0da8e-473e-4ff5-b24a-cdd6a97a756d.png"
                alt="Abstract Art Hero"
                className="w-full h-full object-cover opacity-90 mix-blend-multiply transition-transform duration-[2s] ease-out"
              />

            </div>
            {/* Bottom blur overlay - outside container to blur frame too */}
            <div className="absolute inset-x-0 bottom-0 h-20 backdrop-blur-[6px] rounded-b-xl sm:rounded-b-2xl pointer-events-none" style={{ maskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}></div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FDFBF7] to-transparent rounded-b-xl sm:rounded-b-2xl pointer-events-none"></div>
          </div>
        </div>
      </header>

      {/* Spacer after hero */}
      <div className="h-24 bg-[#F0F4F8]"></div>

      {/* ============================================ */}
      {/* PROBLEM-AGITATE SECTION                     */}
      {/* ============================================ */}
      <section id="problem" className="py-20 md:py-32 px-6 md:px-12 bg-[#FDFBF7] relative">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4 text-[#1A2D63]/60">
              <div className="h-[1px] w-12 bg-[#1A2D63]/30"></div>
              <span className="text-sm font-medium uppercase tracking-widest">Het Probleem</span>
              <div className="h-[1px] w-12 bg-[#1A2D63]/30"></div>
            </div>
            <h2 className="font-newsreader text-3xl md:text-4xl lg:text-5xl text-[#1A2D63] mb-6">
              Als ondernemer herken je dit...
            </h2>
          </div>

          {/* Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {painPoints.map((pain, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-[#1A2D63]/10 shadow-sm hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                  <pain.icon className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-3">{pain.title}</h3>
                <p className="text-[#1A2D63]/70 leading-relaxed">{pain.description}</p>
              </div>
            ))}
          </div>

          {/* Transition */}
          <div className="text-center">
            <div className="inline-block bg-[#1A2D63] text-white px-8 py-4 rounded-2xl">
              <p className="font-newsreader text-xl md:text-2xl">
                Wat als AI dit allemaal kon overnemen?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS SECTION                        */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#F0F4F8] relative border-t border-[#1A2D63]/5">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4 text-[#1A2D63]/60">
              <div className="h-[1px] w-12 bg-[#1A2D63]/30"></div>
              <span className="text-sm font-medium uppercase tracking-widest">Het Proces</span>
              <div className="h-[1px] w-12 bg-[#1A2D63]/30"></div>
            </div>
            <h2 className="font-newsreader text-3xl md:text-4xl lg:text-5xl text-[#1A2D63] mb-6">
              Van idee naar werkende AI in 4 stappen
            </h2>
            <p className="text-[#1A2D63]/70 text-lg max-w-2xl mx-auto">
              Geen complexe trajecten. Wij maken het proces eenvoudig en toegankelijk.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line (desktop) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-[#1A2D63]/10"></div>
                )}

                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#1A2D63]/10 shadow-sm hover:shadow-lg transition-all relative z-10 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#1A2D63] flex items-center justify-center text-white">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-sm text-[#1A2D63]/40">{step.step}</span>
                  </div>
                  <h3 className="font-newsreader text-xl md:text-2xl text-[#1A2D63] mb-3">{step.title}</h3>
                  <p className="text-[#1A2D63]/70 leading-relaxed text-sm md:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRANSFORMATION SECTION                      */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#FDFBF7] relative border-t border-[#1A2D63]/5">
        <div className="max-w-[1000px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4 text-[#1A2D63]/60">
              <div className="h-[1px] w-12 bg-[#1A2D63]/30"></div>
              <span className="text-sm font-medium uppercase tracking-widest">De Transformatie</span>
              <div className="h-[1px] w-12 bg-[#1A2D63]/30"></div>
            </div>
            <h2 className="font-newsreader text-3xl md:text-4xl lg:text-5xl text-[#1A2D63]">
              Van overweldigd naar geautomatiseerd
            </h2>
          </div>

          {/* Before/After Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Before */}
            <div className="bg-red-50 p-8 md:p-10 rounded-2xl border border-red-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-newsreader text-2xl text-red-700">Nu</h3>
              </div>
              <div className="space-y-4">
                {transformationBefore.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-600" />
                    </div>
                    <span className="text-red-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="bg-green-50 p-8 md:p-10 rounded-2xl border border-green-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-newsreader text-2xl text-green-700">Met Finit</h3>
              </div>
              <div className="space-y-4">
                {transformationAfter.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-700" />
                    </div>
                    <span className="text-green-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SOCIAL PROOF SECTION                        */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 px-6 bg-[#F0F4F8] border-t border-[#1A2D63]/5">
        <div className="max-w-5xl mx-auto">
          {/* Header with Stats */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 bg-[#1A2D63] text-white px-6 py-3 rounded-full mb-8">
              <span className="font-newsreader text-2xl font-bold">50+</span>
              <span className="text-white/80">ondernemers gingen je voor</span>
            </div>
            <h2 className="font-newsreader text-3xl md:text-4xl text-[#1A2D63] mb-4">Wat onze klanten zeggen</h2>
          </div>

          {/* Active Testimonial */}
          <div className="relative">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-[#1A2D63]/10">
              {/* Quote */}
              <div className="flex justify-center mb-8">
                <div className="w-12 h-12 bg-[#1A2D63]/5 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-[#1A2D63]" />
                </div>
              </div>

              <h3 className="font-newsreader text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8 text-[#1A2D63] max-w-3xl mx-auto text-center">
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </h3>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#1A2D63] bg-[#1A2D63]/10 flex items-center justify-center">
                    <span className="font-newsreader text-lg text-[#1A2D63] font-bold">{testimonials[activeTestimonial].avatar}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#1A2D63] font-newsreader text-lg">{testimonials[activeTestimonial].author}</p>
                    <p className="text-sm text-[#1A2D63]/60">{testimonials[activeTestimonial].position}</p>
                    <p className="text-xs text-[#1A2D63]/40">{testimonials[activeTestimonial].context}</p>
                  </div>
                </div>

                {/* Outcome Badge */}
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  {testimonials[activeTestimonial].outcome}
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-[#1A2D63] w-8'
                      : 'bg-[#1A2D63]/20 hover:bg-[#1A2D63]/40'
                  }`}
                />
              ))}
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
                href="https://calendly.com/alex-finitsolutions/30min"
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
      {/* PLUG & PLAY TEASER                          */}
      {/* ============================================ */}
      <section className="py-12 px-6 md:px-12 bg-[#F0F4F8] border-t border-[#1A2D63]/5">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#1A2D63]/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1A2D63]/5 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#1A2D63]" />
              </div>
              <div>
                <h3 className="font-newsreader text-xl text-[#1A2D63]">Geen tijd voor maatwerk?</h3>
                <p className="text-[#1A2D63]/60 text-sm">Probeer onze kant-en-klare AI-tools</p>
              </div>
            </div>
            <a
              href="/marketplace"
              className="inline-flex items-center gap-2 border border-[#1A2D63]/20 px-6 py-3 rounded-full text-[#1A2D63] hover:bg-[#1A2D63]/5 transition-colors font-medium"
            >
              Bekijk de Marketplace
              <ExternalLink className="w-4 h-4" />
            </a>
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
            <div className="bg-[#0F1C40] rounded-2xl p-6 md:p-8 border border-white/10 max-w-2xl mx-auto relative overflow-hidden">
              {/* Chess piece background */}
              <div className="absolute right-0 top-0 w-32 h-32 md:w-40 md:h-40 opacity-10">
                <img
                  src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/ce8677f5-f08e-41ee-b50a-35874bebd9e3/generated-images/generated-58f1aff4-5041-49a6-a449-dbf5df0da054.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10">
                <Quote className="w-8 h-8 text-white/20 mb-4" />
                <blockquote className="font-newsreader text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 italic">
                  &ldquo;AI will not replace humans, but those who use AI will replace those who don&apos;t.&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="font-newsreader text-sm font-bold">GK</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Garry Kasparov</p>
                    <p className="text-white/50 text-sm">Schaakgrootmeester & Strateeg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-newsreader leading-tight mb-4">
                Klaar om uw bedrijf <br/>te automatiseren?
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-6 max-w-md">
                Ontdek hoe AI uw bedrijfsprocessen kan transformeren.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://calendly.com/alex-finitsolutions/30min"
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

            <div className="relative flex justify-center lg:justify-end">
              <div className="w-36 h-36 md:w-44 md:h-44 bg-[#0F1C40] rounded-full p-6 flex items-center justify-center relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#475D8F]/20 to-transparent"></div>
                <div className="text-center relative z-10 text-white">
                  <span className="block text-3xl md:text-4xl font-newsreader mb-1">50+</span>
                  <span className="block text-xs md:text-sm font-instrument uppercase tracking-widest text-white/70">Klanten</span>
                </div>
              </div>
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
