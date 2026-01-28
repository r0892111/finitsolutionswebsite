"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap, useGSAP, ScrollTrigger, MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin } from '@/lib/gsap';
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  UserMinus,
  TrendingDown,
  MessageSquare,
  Settings,
  Link2,
  Rocket,
  Quote,
  Mail,
  Phone,
  Linkedin,
  Sparkles,
  Users,
  FileText,
  Database,
  BarChart3,
  Headphones,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { CookieSettingsLink } from '@/components/cookie-settings-link';

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

const transformationAfter = [
  "Eén voice memo, alles gesynchroniseerd",
  "Automatische opvolging op het juiste moment",
  "Processen draaien terwijl jij slaapt",
  "Schalen zonder extra personeel"
];

// --- Use Cases Data ---
interface FlowStep {
  icon: LucideIcon;
  label: string;
}

interface UseCase {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  stat: { value: string; label: string };
  flowSteps: FlowStep[];
}

const useCasesData: UseCase[] = [
  {
    id: 'lead-followup',
    category: 'sales',
    categoryLabel: 'Sales',
    title: 'Automatische Lead Follow-up',
    description: 'Een sales team gebruikt AI om automatisch follow-up emails te sturen aan prospects op basis van hun interactie met eerdere berichten.',
    stat: { value: '40%', label: 'meer conversies' },
    flowSteps: [
      { icon: Mail, label: 'Email' },
      { icon: Sparkles, label: 'AI' },
      { icon: Users, label: 'CRM' },
    ],
  },
  {
    id: 'crm-sync',
    category: 'admin',
    categoryLabel: 'Administratie',
    title: 'CRM Data Synchronisatie',
    description: 'Een bedrijf automatiseert het invoeren van klantgegevens vanuit emails en gesprekken direct in hun CRM systeem.',
    stat: { value: '15+', label: 'uur/week bespaard' },
    flowSteps: [
      { icon: MessageSquare, label: 'Gesprek' },
      { icon: Sparkles, label: 'AI' },
      { icon: Database, label: 'CRM' },
    ],
  },
  {
    id: 'scheduling',
    category: 'admin',
    categoryLabel: 'Planning',
    title: 'Intelligente Afsprakenplanning',
    description: 'AI analyseert beschikbaarheid en voorkeuren om automatisch de beste tijdstippen voor meetings voor te stellen.',
    stat: { value: '90%', label: 'minder back-and-forth' },
    flowSteps: [
      { icon: Calendar, label: 'Agenda' },
      { icon: Sparkles, label: 'AI' },
      { icon: Check, label: 'Bevestigd' },
    ],
  },
  {
    id: 'multi-system',
    category: 'data',
    categoryLabel: 'Integratie',
    title: 'Multi-System Integratie',
    description: 'Automatische synchronisatie tussen Excel, CRM en facturatiesysteem - één invoer, alles bijgewerkt.',
    stat: { value: '1x', label: 'invoer, alles bijgewerkt' },
    flowSteps: [
      { icon: FileText, label: 'Excel' },
      { icon: Sparkles, label: 'AI' },
      { icon: Link2, label: 'Systemen' },
    ],
  },
  {
    id: 'customer-service',
    category: 'support',
    categoryLabel: 'Klantenservice',
    title: 'Klantenservice Automatisering',
    description: 'AI beantwoordt veelgestelde vragen en routeert complexe vragen naar het juiste teamlid.',
    stat: { value: '60%', label: 'snellere reactietijd' },
    flowSteps: [
      { icon: Headphones, label: 'Vraag' },
      { icon: Sparkles, label: 'AI' },
      { icon: Users, label: 'Team' },
    ],
  },
  {
    id: 'reporting',
    category: 'data',
    categoryLabel: 'Rapportage',
    title: 'Rapportage Automatisering',
    description: 'Automatische generatie van wekelijkse rapporten door data uit verschillende bronnen te combineren.',
    stat: { value: '5+', label: 'uur/week teruggewonnen' },
    flowSteps: [
      { icon: Database, label: 'Data' },
      { icon: Sparkles, label: 'AI' },
      { icon: BarChart3, label: 'Rapport' },
    ],
  },
];

const impactStats = [
  { value: '80%', label: 'tijdsbesparing' },
  { value: '24/7', label: 'beschikbaar' },
  { value: '15+', label: 'uur/week bespaard' },
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
  "je workflow",
  "routinewerk",
  "data-invoer",
  "je bedrijf",
  "repetitieve taken",
  "dagelijkse admin",
  "klantopvolging",
  "handmatige processen",
  "je operaties",
  "het saaie werk",
  "leadbeheer",
  "e-mailreacties",
  "CRM-invoer",
];

const TypewriterText = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentPhrase = typewriterPhrases[currentPhraseIndex];

  // Ensure component is mounted before starting animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
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
  }, [isMounted, displayedText, isDeleting, isPaused, currentPhrase]);

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
  carouselRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  logoSize?: number;
  logos?: typeof integrationLogos;
  svgTopPercent?: number;
  spacingMultiplier?: number;
  pathD?: string;
  durationSeconds?: number;
}

const LogoCarousel = ({
  carouselRef,
  className,
  logoSize = 74,
  logos,
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

  // Fixed aspect ratio for the curve (width:height)
  // This ensures the curve shape stays identical on all screen sizes
  const CURVE_ASPECT_RATIO = 16 / 9; // 1.778

  // Track mount state and window resize
  useEffect(() => {
    setIsMounted(true);
    
    // Debounce resize to avoid excessive recalculations
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setResizeKey(prev => prev + 1);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    if (!isMounted || !containerRef.current || !svgRef.current) return;

    const logos = containerRef.current.querySelectorAll('.floating-logo');
    const path = svgRef.current.querySelector('#logoMotionPath') as SVGPathElement;

    if (logos.length === 0 || !path) return;

    // Kill existing tweens before creating new ones
    tweensRef.current.forEach(tween => tween.kill());
    tweensRef.current = [];

    const totalLogos = logos.length;
    const animationDuration = durationSeconds ?? 80; // Total loop duration in seconds

    // Calculate spacing as fraction of path (0 to 1)
    const spacing = (1 / totalLogos) * spacingMultiplier;

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
      const tween = gsap.fromTo(logo,
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
      
      tweensRef.current.push(tween);
    });

    // Cleanup function
    return () => {
      tweensRef.current.forEach(tween => tween.kill());
      tweensRef.current = [];
    };
  }, [isMounted, resizeKey, spacingMultiplier]);

  // Use all logos for the carousel
  const displayLogos = logos ?? integrationLogos;

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
      className={className ?? "logo-carousel absolute inset-0 pointer-events-none overflow-visible hidden lg:block"}
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
           top: `${svgTopPercent}%`,
           transform: 'translateY(-50%)',
         }}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid meet"
      >
        {/*
          Path coordinates in 1600x900 space:
          - Starts off-screen left at bottom area
          - Curves down then up through the middle (bend shifted right)
          - Exits off-screen right at top area
        */}
        <path
          id="logoMotionPath"
          d={
            pathD ??
            "M -100,612\n             C 100,650 300,720 500,770\n             C 700,810 850,810 950,780\n             C 1100,730 1250,550 1400,350\n             C 1500,220 1600,120 1700,80"
          }
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
            width: `${logoSize}px`,
            height: `${logoSize}px`,
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

const MobileLogoCarousel = () => {
  const mobilePath = "M -900,612\n   C -420,690 0,820 420,880\n   C 860,940 1180,900 1580,780\n   C 2040,630 2460,430 2900,250\n   C 3300,140 3700,100 4100,80";

  return (
    <div className="relative mt-7 block lg:hidden">
      <div className="relative h-52 sm:h-56 overflow-visible">
        <LogoCarousel
          className="logo-carousel absolute inset-0 pointer-events-none overflow-visible block lg:hidden"
          logoSize={52}
          logos={integrationLogos}
          svgTopPercent={39}
          spacingMultiplier={1.15}
          pathD={mobilePath}
          durationSeconds={60}
        />
      </div>
    </div>
  );
};

// --- Unique Illustration Components for Each Use Case ---
// Refactored to use progress (0-1) for scroll-driven animations

// 1. Lead Follow-up - "The Nurture Timeline" - Automated Follow-up Sequence
const LeadFollowupIllustration = ({ progress }: { progress: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  // Create timeline once on mount
  useGSAP(() => {
    if (!svgRef.current) return;
    
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.lf-lead', { scale: 0.8, opacity: 0 });
      gsap.set('.lf-timeline', { drawSVG: '0%' });
      gsap.set('.lf-node', { scale: 0, opacity: 0 });
      gsap.set('.lf-connector', { drawSVG: '0%' });
      gsap.set('.lf-card', { scale: 0, opacity: 0 });
      gsap.set('.lf-label', { opacity: 0 });
      gsap.set('.lf-success', { scale: 0, opacity: 0 });
      
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      
      // Animation sequence
      tl
        .to('.lf-lead', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' })
        .to('.lf-timeline', { drawSVG: '100%', duration: 0.5 }, '-=0.1')
        .to('.lf-node', { scale: 1, opacity: 1, stagger: 0.1, duration: 0.2, ease: 'back.out(2)' }, '-=0.3')
        .to('.lf-connector', { drawSVG: '100%', stagger: 0.1, duration: 0.2 }, '-=0.2')
        .to('.lf-card', { scale: 1, opacity: 1, stagger: 0.1, duration: 0.25, ease: 'back.out(1.5)' }, '-=0.3')
        .to('.lf-label', { opacity: 0.5, stagger: 0.08, duration: 0.2 }, '-=0.2')
        .to('.lf-success', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.5)' }, '-=0.1');
      
      timelineRef.current = tl;
    }, svgRef);
    
    return () => ctx.revert();
  }, { scope: svgRef });
  
  // Update timeline progress when prop changes
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(progress);
    }
  }, [progress]);
  
  return (
    <svg ref={svgRef} viewBox="0 0 280 200" className="w-full h-full" fill="none">
      {/* Lead Avatar - Left side (x=35 ensures r=18 stays within bounds) */}
      <g className="lf-lead" transform="translate(35, 55)">
        <circle cx="0" cy="0" r="18" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <circle cx="0" cy="-3" r="5" fill="#1A2D63" fillOpacity="0.08" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-9,11 Q0,5 9,11" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
      
      {/* Timeline - Horizontal line (from lead edge to success edge) */}
      <path className="lf-timeline" d="M53,55 L227,55" stroke="#1A2D63" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
      
      {/* Timeline Nodes - evenly spaced at x=85, 120, 155, 190 */}
      <circle className="lf-node" cx="85" cy="55" r="4" fill="#1A2D63" fillOpacity="0.4"/>
      <circle className="lf-node" cx="120" cy="55" r="4" fill="#1A2D63" fillOpacity="0.4"/>
      <circle className="lf-node" cx="155" cy="55" r="4" fill="#1A2D63" fillOpacity="0.4"/>
      <circle className="lf-node" cx="190" cy="55" r="4" fill="#1A2D63" fillOpacity="0.4"/>
      
      {/* Connector Lines - from nodes to cards */}
      <line className="lf-connector" x1="85" y1="59" x2="85" y2="80" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.25"/>
      <line className="lf-connector" x1="120" y1="59" x2="120" y2="80" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.25"/>
      <line className="lf-connector" x1="155" y1="59" x2="155" y2="80" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.25"/>
      <line className="lf-connector" x1="190" y1="59" x2="190" y2="80" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.25"/>
      
      {/* Card 1 - Email Day 1 */}
      <g className="lf-card" transform="translate(85, 83)">
        <rect x="-16" y="0" width="32" height="40" rx="4" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Envelope icon */}
        <rect x="-8" y="10" width="16" height="12" rx="2" fill="none" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-7,11 L0,17 L7,11" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text className="lf-label" x="85" y="136" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="400">Day 1</text>
      
      {/* Card 2 - Email Day 3 */}
      <g className="lf-card" transform="translate(120, 83)">
        <rect x="-16" y="0" width="32" height="40" rx="4" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Envelope icon */}
        <rect x="-8" y="10" width="16" height="12" rx="2" fill="none" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-7,11 L0,17 L7,11" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text className="lf-label" x="120" y="136" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="400">Day 3</text>
      
      {/* Card 3 - Email Day 7 */}
      <g className="lf-card" transform="translate(155, 83)">
        <rect x="-16" y="0" width="32" height="40" rx="4" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Envelope icon */}
        <rect x="-8" y="10" width="16" height="12" rx="2" fill="none" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-7,11 L0,17 L7,11" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text className="lf-label" x="155" y="136" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="400">Day 7</text>
      
      {/* Card 4 - Calendar with checkmark (Booked) */}
      <g className="lf-card" transform="translate(190, 83)">
        <rect x="-16" y="0" width="32" height="40" rx="4" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Calendar icon */}
        <rect x="-8" y="8" width="16" height="14" rx="2" fill="none" stroke="#1A2D63" strokeWidth="1.2"/>
        {/* Calendar header bar */}
        <line x1="-8" y1="12" x2="8" y2="12" stroke="#1A2D63" strokeWidth="1"/>
        {/* Calendar grid dots */}
        <circle cx="-3" cy="17" r="1" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="1" cy="17" r="1" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="5" cy="17" r="1" fill="#1A2D63" fillOpacity="0.3"/>
        {/* Checkmark overlay */}
        <circle cx="5" cy="26" r="5" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1"/>
        <path d="M2,26 L4,28 L8,24" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text className="lf-label" x="190" y="136" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="400">Booked</text>
      
      {/* Success Badge - Right end (same size as lead avatar r=18, x=245 ensures within bounds) */}
      <g className="lf-success" transform="translate(245, 55)">
        <circle cx="0" cy="0" r="18" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-6,-1 L-2,4 L6,-5" fill="none" stroke="#1A2D63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
};

// 2. CRM Data Sync - "The Magnetic Hub"
const CRMSyncIllustration = ({ progress }: { progress: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  useGSAP(() => {
    if (!svgRef.current) return;
    
    const ctx = gsap.context(() => {
      // Initial states - no x transform on icons to preserve SVG positioning
      gsap.set('.crm-source', { opacity: 0, scale: 0.8 });
      gsap.set('.crm-path', { drawSVG: '0%' });
      gsap.set('.crm-frame', { opacity: 0, scale: 0.95 });
      gsap.set('.crm-card', { opacity: 0, y: -10 });
      gsap.set('.crm-check', { scale: 0, opacity: 0 });
      
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      
      tl
        .to('.crm-source', { opacity: 1, scale: 1, stagger: 0.06, duration: 0.3, ease: 'back.out(1.5)' })
        .to('.crm-path', { drawSVG: '100%', stagger: 0.04, duration: 0.4 }, '-=0.1')
        .to('.crm-frame', { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }, '-=0.2')
        .to('.crm-card', { opacity: 1, y: 0, stagger: 0.08, duration: 0.25, ease: 'power2.out' }, '-=0.1')
        .to('.crm-check', { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2.5)' });
      
      timelineRef.current = tl;
    }, svgRef);
    
    return () => ctx.revert();
  }, { scope: svgRef });
  
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(progress);
    }
  }, [progress]);
  
  return (
    <svg ref={svgRef} viewBox="0 0 280 200" className="w-full h-full" fill="none">
      
      {/* === SOURCE ICONS (Left Side) === */}
      
      {/* Email Icon - y=30 */}
      <g className="crm-source" transform="translate(45, 30)">
        <rect x="-12" y="-9" width="24" height="18" rx="3" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-10,-7 L0,3 L10,-7" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      
      {/* Document Icon - y=60 */}
      <g className="crm-source" transform="translate(45, 60)">
        <rect x="-12" y="-14" width="24" height="28" rx="2" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <line x1="-6" y1="-6" x2="6" y2="-6" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.4"/>
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.4"/>
        <line x1="-6" y1="6" x2="4" y2="6" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.4"/>
      </g>
      
      {/* Phone Icon - y=100 */}
      <g className="crm-source" transform="translate(45, 100)">
        <rect x="-12" y="-14" width="24" height="28" rx="4" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <line x1="-4" y1="-9" x2="4" y2="-9" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.4"/>
        <circle cx="0" cy="6" r="4" fill="none" stroke="#1A2D63" strokeWidth="1"/>
      </g>
      
      {/* Calendar Icon - y=140 */}
      <g className="crm-source" transform="translate(45, 140)">
        <rect x="-12" y="-12" width="24" height="24" rx="2" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <line x1="-12" y1="-4" x2="12" y2="-4" stroke="#1A2D63" strokeWidth="1"/>
        <line x1="-6" y1="-16" x2="-6" y2="-10" stroke="#1A2D63" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="6" y1="-16" x2="6" y2="-10" stroke="#1A2D63" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="-4" cy="4" r="2" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="5" cy="4" r="2" fill="#1A2D63" fillOpacity="0.3"/>
      </g>
      
      {/* Chat Icon - y=170 (shifted left slightly to align with others due to speech tail) */}
      <g className="crm-source" transform="translate(45, 171)">
        <path d="M-12,-10 L-12,6 L-6,6 L0,14 L0,6 L12,6 L12,-10 Z" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="-5" cy="-2" r="2" fill="#1A2D63" fillOpacity="0.4"/>
        <circle cx="0" cy="-2" r="2" fill="#1A2D63" fillOpacity="0.4"/>
        <circle cx="5" cy="-2" r="2" fill="#1A2D63" fillOpacity="0.4"/>
      </g>
      
      {/* === CONNECTION PATHS - Solid lines for smooth DrawSVG animation === */}
      <path className="crm-path" d="M57,30 Q67,35 78,55" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.3" fill="none"/>
      <path className="crm-path" d="M57,60 Q67,65 78,75" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.3" fill="none"/>
      <path className="crm-path" d="M57,100 Q67,100 78,100" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.3" fill="none"/>
      <path className="crm-path" d="M57,140 Q67,135 78,125" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.3" fill="none"/>
      <path className="crm-path" d="M57,171 Q67,165 78,145" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.3" fill="none"/>
      
      {/* === CRM WINDOW (Right Side) === */}
      <g className="crm-frame">
        {/* Main window frame */}
        <rect x="78" y="20" width="175" height="160" rx="8" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="2"/>
        
        {/* Title bar */}
        <rect x="78" y="20" width="175" height="28" rx="8" fill="#1A2D63" fillOpacity="0.06"/>
        <rect x="78" y="40" width="175" height="8" fill="#1A2D63" fillOpacity="0.06"/>
        <line x1="78" y1="48" x2="253" y2="48" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.12"/>
        
        {/* Window control dots */}
        <circle cx="94" cy="34" r="4" fill="#1A2D63" fillOpacity="0.2"/>
        <circle cx="108" cy="34" r="4" fill="#1A2D63" fillOpacity="0.2"/>
        <circle cx="122" cy="34" r="4" fill="#1A2D63" fillOpacity="0.2"/>
        
        {/* CRM label */}
        <text x="220" y="39" textAnchor="middle" fill="#1A2D63" fontSize="12" fontWeight="600" fillOpacity="0.4">CRM</text>
      </g>
      
      {/* === CONTACT CARDS (Inside CRM Window) === */}
      
      {/* Card 1 */}
      <g className="crm-card">
        <rect x="88" y="58" width="155" height="34" rx="5" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1"/>
        <circle cx="108" cy="75" r="10" fill="#1A2D63" fillOpacity="0.06" stroke="#1A2D63" strokeWidth="0.8"/>
        <circle cx="108" cy="72" r="4" fill="#1A2D63" fillOpacity="0.1"/>
        <path d="M101,80 Q108,76 115,80" fill="none" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.2"/>
        <line x1="126" y1="68" x2="233" y2="68" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.2"/>
        <line x1="126" y1="82" x2="200" y2="82" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.12"/>
      </g>
      
      {/* Card 2 */}
      <g className="crm-card">
        <rect x="88" y="98" width="155" height="34" rx="5" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1"/>
        <circle cx="108" cy="115" r="10" fill="#1A2D63" fillOpacity="0.06" stroke="#1A2D63" strokeWidth="0.8"/>
        <circle cx="108" cy="112" r="4" fill="#1A2D63" fillOpacity="0.1"/>
        <path d="M101,120 Q108,116 115,120" fill="none" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.2"/>
        <line x1="126" y1="108" x2="225" y2="108" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.2"/>
        <line x1="126" y1="122" x2="185" y2="122" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.12"/>
      </g>
      
      {/* Card 3 */}
      <g className="crm-card">
        <rect x="88" y="138" width="155" height="34" rx="5" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1"/>
        <circle cx="108" cy="155" r="10" fill="#1A2D63" fillOpacity="0.06" stroke="#1A2D63" strokeWidth="0.8"/>
        <circle cx="108" cy="152" r="4" fill="#1A2D63" fillOpacity="0.1"/>
        <path d="M101,160 Q108,156 115,160" fill="none" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.2"/>
        <line x1="126" y1="148" x2="215" y2="148" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.2"/>
        <line x1="126" y1="162" x2="170" y2="162" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.12"/>
      </g>
      
      {/* === SUCCESS BADGE (bottom-right of CRM window) === */}
      <g className="crm-check" transform="translate(246, 172)">
        <circle cx="0" cy="0" r="12" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-5,0 L-1,4 L6,-4" fill="none" stroke="#1A2D63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      
    </svg>
  );
};

// 3. Scheduling - "Smart Calendar"
// Calendar grid with time blocks + clock, centered layout
const SchedulingIllustration = ({ progress }: { progress: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  useGSAP(() => {
    if (!svgRef.current) return;
    
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.sched-grid', { opacity: 0.2 });
      gsap.set('.sched-block-1', { x: -40, y: -30, rotation: -15, opacity: 0.5 });
      gsap.set('.sched-block-2', { x: 50, y: -40, rotation: 20, opacity: 0.5 });
      gsap.set('.sched-block-3', { x: -30, y: 40, rotation: -10, opacity: 0.5 });
      gsap.set('.sched-block-4', { x: 60, y: 30, rotation: 25, opacity: 0.5 });
      gsap.set('.sched-clock', { opacity: 0, scale: 0.9 });
      gsap.set('.sched-clock-hand-h', { rotation: -30, transformOrigin: '50% 100%' });
      gsap.set('.sched-clock-hand-m', { rotation: -90, transformOrigin: '50% 100%' });
      gsap.set('.sched-check', { scale: 0, opacity: 0 });
      
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      
      tl
        .to('.sched-grid', { opacity: 1, duration: 0.4 })
        .to('.sched-block-1', { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.1')
        .to('.sched-block-2', { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.35')
        .to('.sched-block-3', { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.35')
        .to('.sched-block-4', { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.35')
        .to('.sched-clock', { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2')
        .to('.sched-clock-hand-m', { rotation: 180, duration: 0.7, ease: 'power2.inOut' }, '-=0.1')
        .to('.sched-clock-hand-h', { rotation: 60, duration: 0.7, ease: 'power2.inOut' }, '-=0.7')
        .to('.sched-check', { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2.5)' }, '-=0.1');
      
      timelineRef.current = tl;
    }, svgRef);
    
    return () => ctx.revert();
  }, { scope: svgRef });
  
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(progress);
    }
  }, [progress]);
  
  return (
    <svg ref={svgRef} viewBox="0 0 280 200" className="w-full h-full" fill="none">
      {/* === CALENDAR GRID (left-center) === */}
      <g className="sched-grid">
        {/* Main calendar frame */}
        <rect x="20" y="25" width="140" height="130" rx="6" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        
        {/* Header row */}
        <rect x="20" y="25" width="140" height="24" rx="6" fill="#1A2D63" fillOpacity="0.05"/>
        <rect x="20" y="43" width="140" height="6" fill="#1A2D63" fillOpacity="0.05"/>
        <line x1="20" y1="49" x2="160" y2="49" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.15"/>
        
        {/* Horizontal grid lines */}
        <line x1="20" y1="80" x2="160" y2="80" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.12"/>
        <line x1="20" y1="111" x2="160" y2="111" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.12"/>
        <line x1="20" y1="142" x2="160" y2="142" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.12"/>
        
        {/* Vertical grid lines - 4 columns */}
        <line x1="55" y1="49" x2="55" y2="155" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.12"/>
        <line x1="90" y1="49" x2="90" y2="155" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.12"/>
        <line x1="125" y1="49" x2="125" y2="155" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.12"/>
        
        {/* Day labels in header */}
        <text x="37" y="40" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="500" fillOpacity="0.4">Ma</text>
        <text x="72" y="40" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="500" fillOpacity="0.4">Di</text>
        <text x="107" y="40" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="500" fillOpacity="0.4">Wo</text>
        <text x="142" y="40" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="500" fillOpacity="0.4">Do</text>
      </g>
      
      {/* === TIME BLOCKS (animated into grid cells) === */}
      {/* Block 1: Row 1, Col 1 */}
      <rect className="sched-block-1" x="25" y="54" width="26" height="22" rx="3" fill="#1A2D63" fillOpacity="0.15" stroke="#1A2D63" strokeWidth="1"/>
      {/* Block 2: Row 1, Col 3 */}
      <rect className="sched-block-2" x="95" y="54" width="26" height="22" rx="3" fill="#1A2D63" fillOpacity="0.2" stroke="#1A2D63" strokeWidth="1"/>
      {/* Block 3: Row 2, Col 2 */}
      <rect className="sched-block-3" x="60" y="85" width="26" height="22" rx="3" fill="#1A2D63" fillOpacity="0.18" stroke="#1A2D63" strokeWidth="1"/>
      {/* Block 4: Row 3, Col 4 - the "selected" one */}
      <rect className="sched-block-4" x="130" y="116" width="26" height="22" rx="3" fill="#1A2D63" fillOpacity="0.3" stroke="#1A2D63" strokeWidth="1.2"/>
      
      {/* === CLOCK (right side) === */}
      <g className="sched-clock" transform="translate(210, 100)">
        {/* Clock face */}
        <circle cx="0" cy="0" r="42" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="2"/>
        
        {/* Hour markers */}
        <line x1="0" y1="-36" x2="0" y2="-32" stroke="#1A2D63" strokeWidth="2" strokeLinecap="round"/>
        <line x1="0" y1="32" x2="0" y2="36" stroke="#1A2D63" strokeWidth="2" strokeLinecap="round"/>
        <line x1="-36" y1="0" x2="-32" y2="0" stroke="#1A2D63" strokeWidth="2" strokeLinecap="round"/>
        <line x1="32" y1="0" x2="36" y2="0" stroke="#1A2D63" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Minor hour markers */}
        <circle cx="18" cy="-31" r="1.5" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="31" cy="-18" r="1.5" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="31" cy="18" r="1.5" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="18" cy="31" r="1.5" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="-18" cy="31" r="1.5" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="-31" cy="18" r="1.5" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="-31" cy="-18" r="1.5" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="-18" cy="-31" r="1.5" fill="#1A2D63" fillOpacity="0.3"/>
        
        {/* Hour hand */}
        <line className="sched-clock-hand-h" x1="0" y1="0" x2="0" y2="-20" stroke="#1A2D63" strokeWidth="3" strokeLinecap="round"/>
        {/* Minute hand */}
        <line className="sched-clock-hand-m" x1="0" y1="0" x2="0" y2="-28" stroke="#1A2D63" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Center dot */}
        <circle cx="0" cy="0" r="4" fill="#1A2D63"/>
      </g>
      
      {/* === SUCCESS CHECK (bottom right of clock) === */}
      <g className="sched-check" transform="translate(240, 140)">
        <circle cx="0" cy="0" r="14" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-5,0 L-2,4 L6,-5" stroke="#1A2D63" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    </svg>
  );
};

// 4. Multi-System Integration - "The Sync Flow"
// One data entry syncs to all connected systems
const MultiSystemIllustration = ({ progress }: { progress: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  useGSAP(() => {
    if (!svgRef.current) return;
    
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.ms-center', { scale: 0.9, opacity: 0 });
      gsap.set('.ms-app', { scale: 0.9, opacity: 0 });
      gsap.set('.ms-connector', { drawSVG: '0%' });
      gsap.set('.ms-data', { opacity: 0 });
      gsap.set('.ms-check', { scale: 0, opacity: 0 });
      
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      
      tl
        .to('.ms-center', { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' })
        .to('.ms-connector-1', { drawSVG: '100%', duration: 0.35 }, '-=0.1')
        .to('.ms-connector-2', { drawSVG: '100%', duration: 0.35 }, '-=0.25')
        .to('.ms-connector-3', { drawSVG: '100%', duration: 0.35 }, '-=0.25')
        .to('.ms-app-excel', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)' }, '-=0.2')
        .to('.ms-app-crm', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)' }, '-=0.2')
        .to('.ms-app-invoice', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)' }, '-=0.2')
        .to('.ms-data', { opacity: 1, stagger: 0.08, duration: 0.25 }, '-=0.1')
        .to('.ms-check', { scale: 1, opacity: 1, stagger: 0.1, duration: 0.25, ease: 'back.out(2.5)' }, '-=0.1');
      
      timelineRef.current = tl;
    }, svgRef);
    
    return () => ctx.revert();
  }, { scope: svgRef });
  
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(progress);
    }
  }, [progress]);
  
  return (
    <svg ref={svgRef} viewBox="0 0 280 200" className="w-full h-full" fill="none">
      
      {/* === CONNECTION LINES (from center to apps) === */}
      {/* To Excel (top) */}
      <path className="ms-connector ms-connector-1" d="M140,83 L140,52" stroke="#1A2D63" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
      {/* To CRM (bottom-left) */}
      <path className="ms-connector ms-connector-2" d="M118,118 L62,148" stroke="#1A2D63" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
      {/* To Invoice (bottom-right) */}
      <path className="ms-connector ms-connector-3" d="M162,118 L218,148" stroke="#1A2D63" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
      
      {/* === CENTER INPUT FORM (the source) === */}
      <g className="ms-center" transform="translate(140, 105)">
        {/* Form card */}
        <rect x="-28" y="-22" width="56" height="44" rx="6" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Input field 1 - Name */}
        <rect x="-22" y="-16" width="44" height="14" rx="2" fill="#1A2D63" fillOpacity="0.06" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.3"/>
        <text x="-18" y="-6" fill="#1A2D63" fontSize="7" fontWeight="500" fillOpacity="0.7">Jan de Vries</text>
        {/* Input field 2 - Email */}
        <rect x="-22" y="2" width="44" height="14" rx="2" fill="#1A2D63" fillOpacity="0.06" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.3"/>
        <text x="-18" y="12" fill="#1A2D63" fontSize="6" fillOpacity="0.5">jan@email.nl</text>
      </g>
      
      {/* === EXCEL APP (top) === */}
      <g className="ms-app ms-app-excel" transform="translate(140, 30)">
        {/* Window frame */}
        <rect x="-38" y="-22" width="76" height="44" rx="5" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Title bar */}
        <rect x="-38" y="-22" width="76" height="12" rx="5" fill="#1A2D63" fillOpacity="0.08"/>
        <rect x="-38" y="-14" width="76" height="4" fill="#1A2D63" fillOpacity="0.08"/>
        {/* Window dots */}
        <circle cx="-30" cy="-16" r="2" fill="#1A2D63" fillOpacity="0.2"/>
        <circle cx="-23" cy="-16" r="2" fill="#1A2D63" fillOpacity="0.2"/>
        {/* Grid lines */}
        <line x1="-32" y1="-6" x2="32" y2="-6" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.15"/>
        <line x1="-32" y1="4" x2="32" y2="4" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.15"/>
        <line x1="-32" y1="14" x2="32" y2="14" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.15"/>
        <line x1="-10" y1="-10" x2="-10" y2="18" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.15"/>
        <line x1="12" y1="-10" x2="12" y2="18" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.15"/>
        {/* Data highlight row */}
        <rect className="ms-data" x="-32" y="-5" width="64" height="9" rx="1" fill="#1A2D63" fillOpacity="0.12"/>
        {/* Cell data */}
        <text className="ms-data" x="-28" y="2" fill="#1A2D63" fontSize="6" fontWeight="500" fillOpacity="0.6">Jan</text>
        <text className="ms-data" x="-6" y="2" fill="#1A2D63" fontSize="6" fillOpacity="0.5">de Vries</text>
      </g>
      
      {/* === CRM APP (bottom-left) === */}
      <g className="ms-app ms-app-crm" transform="translate(50, 168)">
        {/* Window frame */}
        <rect x="-38" y="-22" width="76" height="44" rx="5" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Title bar */}
        <rect x="-38" y="-22" width="76" height="12" rx="5" fill="#1A2D63" fillOpacity="0.08"/>
        <rect x="-38" y="-14" width="76" height="4" fill="#1A2D63" fillOpacity="0.08"/>
        {/* Window dots */}
        <circle cx="-30" cy="-16" r="2" fill="#1A2D63" fillOpacity="0.2"/>
        <circle cx="-23" cy="-16" r="2" fill="#1A2D63" fillOpacity="0.2"/>
        {/* Avatar circle */}
        <circle cx="-20" cy="4" r="10" fill="#1A2D63" fillOpacity="0.08" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.3"/>
        <circle cx="-20" cy="1" r="4" fill="#1A2D63" fillOpacity="0.15"/>
        <path d="M-27,10 Q-20,6 -13,10" fill="none" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.2"/>
        {/* Contact details */}
        <text className="ms-data" x="-4" y="-1" fill="#1A2D63" fontSize="7" fontWeight="500" fillOpacity="0.7">Jan de Vries</text>
        <text className="ms-data" x="-4" y="9" fill="#1A2D63" fontSize="5.5" fillOpacity="0.45">jan@email.nl</text>
        <rect className="ms-data" x="-4" y="13" width="28" height="5" rx="1" fill="#1A2D63" fillOpacity="0.1"/>
      </g>
      
      {/* === INVOICE APP (bottom-right) === */}
      <g className="ms-app ms-app-invoice" transform="translate(230, 168)">
        {/* Window frame */}
        <rect x="-38" y="-22" width="76" height="44" rx="5" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Title bar */}
        <rect x="-38" y="-22" width="76" height="12" rx="5" fill="#1A2D63" fillOpacity="0.08"/>
        <rect x="-38" y="-14" width="76" height="4" fill="#1A2D63" fillOpacity="0.08"/>
        {/* Window dots */}
        <circle cx="-30" cy="-16" r="2" fill="#1A2D63" fillOpacity="0.2"/>
        <circle cx="-23" cy="-16" r="2" fill="#1A2D63" fillOpacity="0.2"/>
        {/* Invoice header line */}
        <line x1="-30" y1="-4" x2="30" y2="-4" stroke="#1A2D63" strokeWidth="1.5" strokeOpacity="0.15"/>
        {/* Invoice icon */}
        <rect x="-30" y="0" width="14" height="16" rx="2" fill="none" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.3"/>
        <line x1="-27" y1="5" x2="-19" y2="5" stroke="#1A2D63" strokeWidth="0.6" strokeOpacity="0.2"/>
        <line x1="-27" y1="9" x2="-21" y2="9" stroke="#1A2D63" strokeWidth="0.6" strokeOpacity="0.2"/>
        {/* Client name */}
        <text className="ms-data" x="-10" y="5" fill="#1A2D63" fontSize="6" fillOpacity="0.4">Client:</text>
        <text className="ms-data" x="-10" y="13" fill="#1A2D63" fontSize="6.5" fontWeight="500" fillOpacity="0.6">Jan de Vries</text>
      </g>
      
      {/* === SUCCESS CHECKMARKS === */}
      {/* Excel check */}
      <g className="ms-check" transform="translate(170, 15)">
        <circle cx="0" cy="0" r="8" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-3,0 L-1,2.5 L4,-3" stroke="#1A2D63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      {/* CRM check */}
      <g className="ms-check" transform="translate(80, 153)">
        <circle cx="0" cy="0" r="8" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-3,0 L-1,2.5 L4,-3" stroke="#1A2D63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      {/* Invoice check */}
      <g className="ms-check" transform="translate(260, 153)">
        <circle cx="0" cy="0" r="8" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-3,0 L-1,2.5 L4,-3" stroke="#1A2D63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      
    </svg>
  );
};

// 5. Customer Service - "The Smart Router"
const CustomerServiceIllustration = ({ progress }: { progress: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  useGSAP(() => {
    if (!svgRef.current) return;
    
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.cs-bubble', { scale: 1, opacity: 1 });
      gsap.set('.cs-question', { opacity: 1, scale: 1 });
      gsap.set('.cs-sparkle', { scale: 0, opacity: 0 });
      gsap.set('.cs-path', { drawSVG: '0%' });
      gsap.set('.cs-message', { scale: 0, opacity: 0 });
      gsap.set('.cs-avatar', { scale: 0.8, opacity: 0.4 });
      gsap.set('.cs-check', { scale: 0, opacity: 0 });
      
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      
      tl.to('.cs-bubble', { scale: 1.05, duration: 0.2, ease: 'power1.inOut' })
        .to('.cs-bubble', { scale: 1, duration: 0.15 })
        .to('.cs-question', { opacity: 0, scale: 0.3, duration: 0.2 })
        .to('.cs-sparkle', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }, '-=0.05')
        .to('.cs-path-1', { drawSVG: '100%', duration: 0.45 }, '-=0.05')
        .to('.cs-path-2', { drawSVG: '100%', duration: 0.5 }, '-=0.4')
        .to('.cs-path-3', { drawSVG: '100%', duration: 0.45 }, '-=0.45')
        .to('.cs-message', { scale: 1, opacity: 1, stagger: 0.08, duration: 0.2 }, '-=0.1')
        .to('.cs-avatar', { scale: 1, opacity: 1, stagger: 0.06, duration: 0.25 }, '-=0.1')
        .to('.cs-check', { scale: 1, opacity: 1, stagger: 0.08, duration: 0.2, ease: 'back.out(3)' }, '-=0.05');
      
      timelineRef.current = tl;
    }, svgRef);
    
    return () => ctx.revert();
  }, { scope: svgRef });
  
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(progress);
    }
  }, [progress]);
  
  return (
    <svg ref={svgRef} viewBox="0 0 280 200" className="w-full h-full" fill="none">
      {/* Central AI bubble - clean circle with question/sparkle */}
      <g className="cs-bubble" transform="translate(140, 42)">
        {/* Main bubble - simple circle, no tail */}
        <circle cx="0" cy="0" r="32" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="2"/>
        {/* Question mark */}
        <text className="cs-question" x="0" y="10" textAnchor="middle" fill="#1A2D63" fontSize="32" fontWeight="300" fontFamily="Georgia, serif">?</text>
        {/* Sparkle that replaces question - clean 4-point star */}
        <g className="cs-sparkle">
          <path d="M0,-14 L3,-3 L14,0 L3,3 L0,14 L-3,3 L-14,0 L-3,-3 Z" fill="#1A2D63" fillOpacity="0.65"/>
        </g>
      </g>
      
{/* Routing paths - clean curves, visible stroke */}
      {/* Left path */}
      <path className="cs-path cs-path-1" d="M120,70 Q80,95 55,125" stroke="#1A2D63" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
      {/* Center path */}
      <path className="cs-path cs-path-2" d="M140,74 L140,125" stroke="#1A2D63" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
      {/* Right path - mirror of left */}
      <path className="cs-path cs-path-3" d="M160,70 Q200,95 225,125" stroke="#1A2D63" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
      
      {/* Message envelopes - positioned at path ends */}
      <g className="cs-message" transform="translate(55, 125)">
        <rect x="-11" y="0" width="22" height="16" rx="3" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-9,2 L0,10 L9,2" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
      </g>
      <g className="cs-message" transform="translate(140, 125)">
        <rect x="-11" y="0" width="22" height="16" rx="3" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-9,2 L0,10 L9,2" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
      </g>
      <g className="cs-message" transform="translate(225, 125)">
        <rect x="-11" y="0" width="22" height="16" rx="3" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-9,2 L0,10 L9,2" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
      </g>
      
      {/* Team avatars - evenly spaced at bottom */}
      {/* Left avatar */}
      <g className="cs-avatar" transform="translate(55, 168)">
        <circle cx="0" cy="0" r="18" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <circle cx="0" cy="-3" r="6" fill="#1A2D63" fillOpacity="0.08" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-9,12 Q0,6 9,12" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
      {/* Center avatar */}
      <g className="cs-avatar" transform="translate(140, 168)">
        <circle cx="0" cy="0" r="18" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <circle cx="0" cy="-3" r="6" fill="#1A2D63" fillOpacity="0.08" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-9,12 Q0,6 9,12" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
      {/* Right avatar */}
      <g className="cs-avatar" transform="translate(225, 168)">
        <circle cx="0" cy="0" r="18" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        <circle cx="0" cy="-3" r="6" fill="#1A2D63" fillOpacity="0.08" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-9,12 Q0,6 9,12" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
      
      {/* Check badges - positioned to upper-right of each avatar */}
      <g className="cs-check" transform="translate(70, 153)">
        <circle cx="0" cy="0" r="8" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-4,0 L-1,3 L4,-3" stroke="#1A2D63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      <g className="cs-check" transform="translate(155, 153)">
        <circle cx="0" cy="0" r="8" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-4,0 L-1,3 L4,-3" stroke="#1A2D63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      <g className="cs-check" transform="translate(240, 153)">
        <circle cx="0" cy="0" r="8" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-4,0 L-1,3 L4,-3" stroke="#1A2D63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    </svg>
  );
};

// 6. Reporting - "The Data Symphony" - Sales Analytics Dashboard
const ReportingIllustration = ({ progress }: { progress: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  useGSAP(() => {
    if (!svgRef.current) return;
    
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.rp-data', { opacity: 0, scale: 0.7 });
      gsap.set('.rp-chart-frame', { opacity: 0 });
      gsap.set('.rp-bar', { scaleY: 0, transformOrigin: 'bottom center' });
      gsap.set('.rp-line', { drawSVG: '0%' });
      gsap.set('.rp-dot', { scale: 0, opacity: 0 });
      gsap.set('.rp-badge', { scale: 0, opacity: 0 });
      
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      
      tl
        .to('.rp-data', { opacity: 1, scale: 1, stagger: 0.12, duration: 0.5 })
        .to('.rp-data', { duration: 0.4 })
        .to('.rp-data-1', { x: 80, y: 65, opacity: 0, scale: 0.4, duration: 0.6 }, '+=0.1')
        .to('.rp-data-2', { x: -80, y: 65, opacity: 0, scale: 0.4, duration: 0.6 }, '-=0.5')
        .to('.rp-data-3', { x: 105, y: 0, opacity: 0, scale: 0.4, duration: 0.6 }, '-=0.5')
        .to('.rp-data-4', { x: -105, y: 0, opacity: 0, scale: 0.4, duration: 0.6 }, '-=0.5')
        .to('.rp-data-5', { x: 0, y: -75, opacity: 0, scale: 0.4, duration: 0.6 }, '-=0.5')
        .to('.rp-chart-frame', { opacity: 1, duration: 0.25 }, '-=0.2')
        .to('.rp-bar', { scaleY: 1, stagger: 0.06, duration: 0.35, ease: 'back.out(1.4)' }, '-=0.1')
        .to('.rp-line', { drawSVG: '100%', duration: 0.4 }, '-=0.15')
        .to('.rp-dot', { scale: 1, opacity: 1, stagger: 0.05, duration: 0.2, ease: 'back.out(2)' }, '-=0.2')
        .to('.rp-badge', { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2.5)' }, '-=0.1');
      
      timelineRef.current = tl;
    }, svgRef);
    
    return () => ctx.revert();
  }, { scope: svgRef });
  
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(progress);
    }
  }, [progress]);
  
  return (
    <svg ref={svgRef} viewBox="0 0 280 200" className="w-full h-full" fill="none">
      {/* Floating data labels - positioned in orbital pattern around center */}
      {/* Top-left: Revenue */}
      <text className="rp-data rp-data-1" x="55" y="30" fill="#1A2D63" fontSize="14" fontWeight="600">€12.4k</text>
      {/* Top-right: Growth */}
      <text className="rp-data rp-data-2" x="205" y="30" fill="#1A2D63" fontSize="14" fontWeight="600">+23%</text>
      {/* Left: Orders */}
      <text className="rp-data rp-data-3" x="25" y="100" fill="#1A2D63" fontSize="13" fontWeight="600">847</text>
      {/* Right: Satisfaction */}
      <text className="rp-data rp-data-4" x="235" y="100" fill="#1A2D63" fontSize="13" fontWeight="600">94%</text>
      {/* Bottom: AOV */}
      <text className="rp-data rp-data-5" x="140" y="185" fill="#1A2D63" fontSize="13" fontWeight="600" textAnchor="middle">€14.7</text>
      
{/* Chart frame - centered and larger */}
      <g className="rp-chart-frame">
        <rect x="45" y="45" width="190" height="115" rx="6" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Clean baseline only */}
        <line x1="60" y1="145" x2="220" y2="145" stroke="#1A2D63" strokeWidth="1" strokeOpacity="0.25"/>
        {/* Subtle horizontal gridlines */}
        <line x1="60" y1="115" x2="220" y2="115" stroke="#1A2D63" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4"/>
        <line x1="60" y1="85" x2="220" y2="85" stroke="#1A2D63" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4"/>
      </g>
      
      {/* Bar chart - 5 bars with graduated heights (monthly sales growth story) */}
      {/* Jan */}
      <rect className="rp-bar" x="62" y="120" width="22" height="25" rx="2" fill="#1A2D63" fillOpacity="0.18"/>
      {/* Feb */}
      <rect className="rp-bar" x="92" y="108" width="22" height="37" rx="2" fill="#1A2D63" fillOpacity="0.26"/>
      {/* Mar */}
      <rect className="rp-bar" x="122" y="92" width="22" height="53" rx="2" fill="#1A2D63" fillOpacity="0.34"/>
      {/* Apr */}
      <rect className="rp-bar" x="152" y="78" width="22" height="67" rx="2" fill="#1A2D63" fillOpacity="0.42"/>
      {/* May */}
      <rect className="rp-bar" x="182" y="62" width="22" height="83" rx="2" fill="#1A2D63" fillOpacity="0.52"/>
      
      {/* Trend line - smooth curve through bar tops */}
      <path className="rp-line" d="M73,120 C88,115 98,108 103,108 S118,95 133,92 S148,82 163,78 S178,68 193,62" stroke="#1A2D63" strokeWidth="2" strokeLinecap="round" fill="none"/>
      
      {/* Dots on trend line at each bar */}
      <circle className="rp-dot" cx="73" cy="120" r="3" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
      <circle className="rp-dot" cx="103" cy="108" r="3" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
      <circle className="rp-dot" cx="133" cy="92" r="3" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
      <circle className="rp-dot" cx="163" cy="78" r="3" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
      <circle className="rp-dot" cx="193" cy="62" r="3" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1.5"/>
      
      {/* "Analyzed" Badge - top-right of chart frame */}
      <g className="rp-badge" transform="translate(175, 50)">
        <rect x="0" y="0" width="55" height="18" rx="9" fill="#FDFBF7" stroke="#1A2D63" strokeWidth="1"/>
        <text x="27.5" y="12.5" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="500">Analyzed</text>
      </g>
    </svg>
  );
};

// Map use case IDs to their illustration components
const illustrationComponents: Record<string, React.FC<{ progress: number }>> = {
  'lead-followup': LeadFollowupIllustration,
  'crm-sync': CRMSyncIllustration,
  'scheduling': SchedulingIllustration,
  'multi-system': MultiSystemIllustration,
  'customer-service': CustomerServiceIllustration,
  'reporting': ReportingIllustration,
};

// --- Use Cases Section Component (Scroll-Driven) ---
const UseCasesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef<number>(0);
  const isFirstRender = useRef<boolean>(true);
  const scrollDirectionRef = useRef<number>(1); // 1 = scrolling down, -1 = scrolling up
  const [activeIndex, setActiveIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const TOTAL_USE_CASES = useCasesData.length;
  const SCROLL_DISTANCE = 5800; // Total scroll distance (increased for reduced sensitivity)
  const START_BUFFER = 0.15; // 15% hold at start before animation begins
  const ANIMATION_PORTION = 0.50; // 50% for animation
  // Remaining 35% = hold at end before transition
  
  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // GSAP text crossfade animation (Desktop only)
  useGSAP(() => {
    if (!textContentRef.current || isMobile) return;
    
    const ctx = gsap.context(() => {
      const prevIndex = prevIndexRef.current;
      const currentIndex = activeIndex;
      
      // Set initial states for all content blocks
      useCasesData.forEach((_, index) => {
        if (index !== currentIndex && index !== prevIndex) {
          gsap.set(`.uc-content-${index}`, { visibility: 'hidden' });
          gsap.set([`.uc-pill-${index}`, `.uc-title-${index}`, `.uc-desc-${index}`, `.uc-stat-${index}`], { 
            opacity: 0, y: 20 
          });
        }
      });
      
      // On first render, just animate entrance
      if (isFirstRender.current) {
        isFirstRender.current = false;
        gsap.set(`.uc-content-${currentIndex}`, { visibility: 'visible' });
        
        const entranceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        entranceTl
          .fromTo(`.uc-pill-${currentIndex}`, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.35 }
          )
          .fromTo(`.uc-title-${currentIndex}`, 
            { y: 25, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.4 }, 
            '-=0.2'
          )
          .fromTo(`.uc-desc-${currentIndex}`, 
            { y: 25, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.4 }, 
            '-=0.25'
          )
          .fromTo(`.uc-stat-${currentIndex}`, 
            { y: 30, opacity: 0, scale: 0.95 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.7)' }, 
            '-=0.2'
          );
        
        return;
      }
      
      // Crossfade: exit previous, enter current (direction-aware)
      if (prevIndex !== currentIndex) {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        
        // Get scroll direction: 1 = scrolling down, -1 = scrolling up
        const direction = scrollDirectionRef.current;
        
        // Direction-aware Y values:
        // Scrolling DOWN: exit slides UP (-), enter comes from BELOW (+)
        // Scrolling UP: exit slides DOWN (+), enter comes from ABOVE (-)
        const exitY = direction === 1 ? -15 : 15;
        const enterFromY = direction === 1 ? 20 : -20;
        const enterFromYLarge = direction === 1 ? 25 : -25;
        const enterFromYStat = direction === 1 ? 30 : -30;
        
        // Make both visible during transition
        gsap.set(`.uc-content-${prevIndex}`, { visibility: 'visible' });
        gsap.set(`.uc-content-${currentIndex}`, { visibility: 'visible' });
        
        // Exit previous (staggered fade out + direction-aware slide)
        tl.to(`.uc-pill-${prevIndex}`, { y: exitY, opacity: 0, duration: 0.25, ease: 'power2.in' })
          .to(`.uc-title-${prevIndex}`, { y: exitY, opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.18')
          .to(`.uc-desc-${prevIndex}`, { y: exitY, opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.18')
          .to(`.uc-stat-${prevIndex}`, { y: exitY, opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.18')
          // Hide previous after exit
          .set(`.uc-content-${prevIndex}`, { visibility: 'hidden' })
          
          // Enter current (staggered fade in + direction-aware slide)
          .fromTo(`.uc-pill-${currentIndex}`, 
            { y: enterFromY, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.35 }, 
            '-=0.15'
          )
          .fromTo(`.uc-title-${currentIndex}`, 
            { y: enterFromYLarge, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.4 }, 
            '-=0.25'
          )
          .fromTo(`.uc-desc-${currentIndex}`, 
            { y: enterFromYLarge, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.4 }, 
            '-=0.3'
          )
          .fromTo(`.uc-stat-${currentIndex}`, 
            { y: enterFromYStat, opacity: 0, scale: 0.95 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.7)' }, 
            '-=0.25'
          );
      }
      
      // Update prevIndexRef for next transition
      prevIndexRef.current = currentIndex;
      
    }, textContentRef);
    
    return () => ctx.revert();
  }, { scope: textContentRef, dependencies: [activeIndex, isMobile] });
  
  // GSAP scroll-driven animations (Desktop only)
  useGSAP(() => {
    if (!sectionRef.current || !pinnedRef.current || isMobile) return;
    
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      // Create ScrollTrigger for the pinned section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${SCROLL_DISTANCE}`,
        pin: pinnedRef.current,
        scrub: 1.4,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Track scroll direction (1 = down/forward, -1 = up/backward)
          scrollDirectionRef.current = self.direction;
          
          // Calculate which use case we're on (0 to TOTAL_USE_CASES - 1)
          const rawIndex = progress * TOTAL_USE_CASES;
          const newIndex = Math.min(Math.floor(rawIndex), TOTAL_USE_CASES - 1);
          
          // Calculate progress within current use case segment (0 to 1)
          const segmentProgress = rawIndex - newIndex;
          
          // Map segment progress to animation progress with hold periods
          // First 15% = hold at 0 (buffer before animation starts)
          // Next 50% = animation plays (0 → 1)
          // Last 35% = hold at 1 (breathing room before next)
          let animationProgress: number;
          if (segmentProgress <= START_BUFFER) {
            // Start buffer: stay at 0
            animationProgress = 0;
          } else if (segmentProgress <= START_BUFFER + ANIMATION_PORTION) {
            // Animation phase: scale to 0-1
            animationProgress = (segmentProgress - START_BUFFER) / ANIMATION_PORTION;
          } else {
            // End hold phase: stay at 1
            animationProgress = 1;
          }
          
          setActiveIndex(newIndex);
          setLocalProgress(Math.min(animationProgress, 1));
        },
      });
      
      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    });
    
    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [isMobile] });
  
  // Get the progress to pass to each illustration
  const getIllustrationProgress = (index: number) => {
    if (index < activeIndex) return 1; // Already passed - show completed state
    if (index > activeIndex) return 0; // Not reached yet - show initial state
    return localProgress; // Current one - use scroll progress
  };

  // Desktop: Scroll-driven split-screen layout
  if (!isMobile) {
    return (
      <section 
        ref={sectionRef} 
        id="use-cases" 
        className="relative bg-[#FDFBF7]"
        style={{ height: `calc(${SCROLL_DISTANCE}px + 100vh)` }}
      >
        {/* Pinned container - full viewport height */}
        <div 
          ref={pinnedRef}
          className="h-screen w-full flex flex-col justify-center"
        >
          {/* Centered Header - styled like HowItWorksSection */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
              Praktijkvoorbeelden
            </h2>
            <p className="text-[#1A2D63]/60 text-lg md:text-xl max-w-xl mx-auto">
              Hoe klanten AI gebruiken
            </p>
          </div>
          
          <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-16">
            {/* Split-screen layout */}
            <div className="flex items-center gap-12 lg:gap-20">
              
              {/* LEFT: Illustrations (50%) */}
              <div className="w-1/2 relative flex items-center justify-center">
                <div className="w-full max-w-[480px] aspect-[4/3] relative">
                  {useCasesData.map((useCase, index) => {
                    const IllustrationComponent = illustrationComponents[useCase.id];
                    const isActive = index === activeIndex;
                    const progress = getIllustrationProgress(index);
                    
                    return IllustrationComponent ? (
                      <div 
                        key={useCase.id}
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                        style={{ 
                          opacity: isActive ? 1 : 0,
                          pointerEvents: isActive ? 'auto' : 'none',
                        }}
                      >
                        <IllustrationComponent progress={progress} />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              
              {/* RIGHT: Text Content (50%) */}
              <div className="w-1/2 relative">
                <div className="max-w-[480px]">
                  {/* Use case content - GSAP crossfade based on activeIndex */}
                  <div ref={textContentRef} className="relative min-h-[280px]">
                    {useCasesData.map((useCase, index) => {
                      const isActive = index === activeIndex;
                      
                      return (
                        <div 
                          key={useCase.id}
                          className={`absolute inset-0 uc-content-${index}`}
                          style={{ 
                            visibility: isActive ? 'visible' : 'hidden',
                            pointerEvents: isActive ? 'auto' : 'none',
                          }}
                        >
                          {/* Category pill */}
                          <span className={`uc-pill-${index} inline-block px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#1A2D63]/50 border border-[#1A2D63]/15 rounded-full mb-4`}>
                            {useCase.categoryLabel}
                          </span>
                          
                          {/* Title */}
                          <h3 className={`uc-title-${index} font-newsreader text-2xl lg:text-3xl text-[#1A2D63] mb-4 leading-tight`}>
                            {useCase.title}
                          </h3>
                          
                          {/* Description */}
                          <p className={`uc-desc-${index} text-[#1A2D63]/60 text-base lg:text-lg leading-relaxed mb-6`}>
                            {useCase.description}
                          </p>
                          
                          {/* Stat highlight */}
                          <div className={`uc-stat-${index} inline-flex items-baseline gap-2 bg-[#1A2D63] text-white px-5 py-3 rounded-xl shadow-[0_4px_20px_-4px_rgba(26,45,99,0.35)]`}>
                            <span className="font-newsreader text-3xl lg:text-4xl font-light">
                              {useCase.stat.value}
                            </span>
                            <span className="text-white/60 text-sm">
                              {useCase.stat.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-10 flex items-center gap-3">
                    {useCasesData.map((_, index) => (
                      <div 
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index === activeIndex 
                            ? 'w-8 bg-[#1A2D63]' 
                            : index < activeIndex
                              ? 'w-2 bg-[#1A2D63]/40'
                              : 'w-2 bg-[#1A2D63]/15'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-[#1A2D63]/40">
                      {activeIndex + 1} / {TOTAL_USE_CASES}
                    </span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // Mobile: Simplified vertical scroll layout (not pinned)
  return (
    <section 
      ref={sectionRef} 
      id="use-cases" 
      className="py-16 px-6 bg-[#FDFBF7]"
    >
      <div className="max-w-[600px] mx-auto">
        {/* Header - styled like HowItWorksSection */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
            Praktijkvoorbeelden
          </h2>
          <p className="text-[#1A2D63]/60 text-lg">
            Hoe klanten AI gebruiken
          </p>
        </div>
        
        {/* Use cases as vertical cards */}
        <div className="space-y-8">
          {useCasesData.map((useCase, index) => {
            const IllustrationComponent = illustrationComponents[useCase.id];
            
            return (
              <div 
                key={useCase.id}
                className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(26,45,99,0.12)] overflow-hidden"
              >
                {/* Illustration */}
                <div className="h-[200px] flex items-center justify-center bg-[#FDFBF7]/50 p-4">
                  {IllustrationComponent && (
                    <IllustrationComponent progress={1} />
                  )}
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#1A2D63]/50 border border-[#1A2D63]/10 rounded-full mb-3">
                    {useCase.categoryLabel}
                  </span>
                  
                  <h3 className="font-newsreader text-xl text-[#1A2D63] mb-2">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-[#1A2D63]/55 text-sm leading-relaxed mb-4">
                    {useCase.description}
                  </p>
                  
                  <div className="inline-flex items-baseline gap-1.5 bg-[#1A2D63] text-white px-3 py-2 rounded-lg">
                    <span className="font-newsreader text-xl font-light">
                      {useCase.stat.value}
                    </span>
                    <span className="text-white/60 text-xs">
                      {useCase.stat.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- How It Works Card Expansion Data ---
const howItWorksDetails = {
  gesprek: [
    "Grondige analyse van je huidige processen",
    "Concrete voorstellen met voorbeelden uit jouw sector",
    "Duidelijke ROI-berekening vooraf",
    "Vrijblijvend en zonder verplichtingen",
  ],
  bouw: [
    "AI-agents die 24/7 op de achtergrond werken",
    "Naadloze integratie met CRM, e-mail, spreadsheets",
    "Je workflow blijft ongewijzigd",
    "Volledige automatisering van admin-taken",
    "Feedback momenten elke paar maanden",
  ],
  resultaat: [
    "Human-in-the-loop waar nodig",
    "Schaal op zonder extra personeel",
    "Real-time monitoring van je processen",
    "Al je data gesynchroniseerd - geen verspreide tools",
    "GDPR-compliant & veilige verbindingen",
  ],
};

// --- How It Works Section Component ---
const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<SVGPathElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card1ContentRef = useRef<HTMLDivElement>(null);
  const card2ContentRef = useRef<HTMLDivElement>(null);
  const card3ContentRef = useRef<HTMLDivElement>(null);
  const number1Ref = useRef<HTMLSpanElement>(null);
  const number2Ref = useRef<HTMLSpanElement>(null);
  const number3Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileCTARef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Function to calculate and update SVG line paths based on FINAL card positions (not animated positions)
  // Uses offset* properties which give base positions without CSS transforms
  const updateLinePaths = useCallback(() => {
    if (!cardsContainerRef.current || !card1Ref.current || !card2Ref.current || !card3Ref.current) return;
    if (!line1Ref.current || !line2Ref.current || !svgRef.current) return;

    // Get card dimensions and base positions (without GSAP transforms)
    // offsetLeft/offsetWidth give position relative to offsetParent (the grid container)
    const card1Width = card1Ref.current.offsetWidth;
    const card2Width = card2Ref.current.offsetWidth;
    
    const card1Left = card1Ref.current.offsetLeft;
    const card2Left = card2Ref.current.offsetLeft;
    const card3Left = card3Ref.current.offsetLeft;

    // Final Y offsets (from GSAP animation - these are the settled positions)
    const card1FinalY = 60;
    const card2FinalY = 180;
    const card3FinalY = 300;

    // Fixed connection point offset from top of card (targets the header area)
    // Using a fixed value ensures consistent line lengths regardless of card content
    const connectionOffset = 80;

    // Update SVG viewBox to match container dimensions
    const containerWidth = cardsContainerRef.current.offsetWidth;
    const containerHeight = 600; // Fixed height to accommodate all cards and lines
    svgRef.current.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);

    // Calculate connection points at FINAL settled positions
    // Lines connect at a fixed offset from top of each card
    // Line 1: Card 1 right edge → Card 2 left edge
    const line1StartX = card1Left + card1Width;
    const line1StartY = card1FinalY + connectionOffset;
    const line1EndX = card2Left;
    const line1EndY = card2FinalY + connectionOffset;

    // Line 2: Card 2 right edge → Card 3 left edge
    const line2StartX = card2Left + card2Width;
    const line2StartY = card2FinalY + connectionOffset;
    const line2EndX = card3Left;
    const line2EndY = card3FinalY + connectionOffset;

    // Build smooth S-curve paths using cubic bezier
    // The curve starts horizontal, bends down, then ends horizontal
    const midX1 = (line1StartX + line1EndX) / 2;
    const path1 = `M ${line1StartX},${line1StartY} C ${midX1},${line1StartY} ${midX1},${line1EndY} ${line1EndX},${line1EndY}`;

    const midX2 = (line2StartX + line2EndX) / 2;
    const path2 = `M ${line2StartX},${line2StartY} C ${midX2},${line2StartY} ${midX2},${line2EndY} ${line2EndX},${line2EndY}`;

    line1Ref.current.setAttribute('d', path1);
    line2Ref.current.setAttribute('d', path2);

    // Calculate path lengths for strokeDasharray (needed for drawSVG)
    const length1 = line1Ref.current.getTotalLength();
    const length2 = line2Ref.current.getTotalLength();
    
    line1Ref.current.style.strokeDasharray = `${length1}`;
    line1Ref.current.style.strokeDashoffset = `${length1}`;
    line2Ref.current.style.strokeDasharray = `${length2}`;
    line2Ref.current.style.strokeDashoffset = `${length2}`;
  }, []);

  // GSAP scroll-triggered animations - Theatrical Curtain Rise with Pinning
  useGSAP(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop animations (768px+) - Full theatrical pinned experience
    mm.add("(min-width: 768px)", () => {
      if (!pinContainerRef.current || !line1Ref.current || !line2Ref.current || !card1Ref.current || !card2Ref.current || !card3Ref.current) return;
      if (!card1ContentRef.current || !card2ContentRef.current || !card3ContentRef.current) return;

      // Calculate line paths FIRST (synchronously) before setting initial states
      updateLinePaths();

      // Main pinned timeline - 1800px scroll distance (tight transition to next section)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          pin: true,
          start: "top 5%",
          end: "+=1800",
          scrub: 2,
          pinSpacing: true,
          anticipatePin: 1,
        }
      });

      // Initial state - cards start below viewport
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        y: "100vh",
        opacity: 0,
      });
      gsap.set([card1ContentRef.current, card2ContentRef.current, card3ContentRef.current], {
        height: 0,
        opacity: 0,
        marginTop: 0,
      });
      gsap.set([number1Ref.current, number2Ref.current, number3Ref.current], {
        opacity: 0,
      });
      // Lines start hidden (opacity 0) AND at drawSVG 0%
      gsap.set([line1Ref.current, line2Ref.current], { 
        drawSVG: "0%",
        opacity: 0,
      });
      if (ctaRef.current) {
        // CTA starts hidden well below Card 3, will animate in while everything shifts up
        // Card 3 at y:240 + ~400px expanded height + 100px gap = ~740 minimum
        gsap.set(ctaRef.current, { opacity: 0, top: 890 });
      }

      // Timeline with proper spacing and dead time buffers:
      // Card 1 starts at 0.03 (3%) for responsive but not instant start
      // Lines draw AFTER the NEXT card has settled (connecting the two)
      
      // 0.03 - 0.16: Card 1 rises
      // 0.16 - 0.24: Card 1 expands
      // 0.24 - 0.30: Buffer
      // 0.30 - 0.43: Card 2 rises
      // 0.43 - 0.51: Card 2 expands
      // 0.51 - 0.59: Line 1 draws (after Card 2 settled - connects Card 1 to Card 2)
      // 0.59 - 0.65: Buffer
      // 0.65 - 0.78: Card 3 rises
      // 0.78 - 0.86: Card 3 expands
      // 0.86 - 0.94: Line 2 draws (after Card 3 settled - connects Card 2 to Card 3)
      // 0.94 - 1.00: CTA appears

      // Card 1 - Rises first, settles highest (y: 0), then expands
      tl.addLabel("card1Start", 0)
        .to(card1Ref.current, {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 0.13,
        }, 0)
        .to(number1Ref.current, {
          opacity: 1,
          ease: "power3.out",
          duration: 0.08,
        }, 0.05)
        .addLabel("card1Expand", 0.16)
        .to(card1ContentRef.current, {
          height: "auto",
          opacity: 1,
          marginTop: 16,
          ease: "power3.out",
          duration: 0.08,
        }, 0.16);

      // Card 2 - Rises second, settles middle (y: 120px), then expands
      tl.addLabel("card2Start", 0.30)
        .to(card2Ref.current, {
          y: 120,
          opacity: 1,
          ease: "power3.out",
          duration: 0.13,
        }, 0.30)
        .to(number2Ref.current, {
          opacity: 1,
          ease: "power3.out",
          duration: 0.08,
        }, 0.35)
        // Line 1 starts drawing just as Card 2 settles, before expansion
        .addLabel("line1Draw", 0.41)
        .to(line1Ref.current, {
          drawSVG: "100%",
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.10,
        }, 0.41)
        .addLabel("card2Expand", 0.43)
        .to(card2ContentRef.current, {
          height: "auto",
          opacity: 1,
          marginTop: 16,
          ease: "power3.out",
          duration: 0.08,
        }, 0.43);

      // Card 3 - Rises last, settles lowest (y: 240px), then expands
      tl.addLabel("card3Start", 0.65)
        .to(card3Ref.current, {
          y: 240,
          opacity: 1,
          ease: "power3.out",
          duration: 0.13,
        }, 0.65)
        .to(number3Ref.current, {
          opacity: 1,
          ease: "power3.out",
          duration: 0.08,
        }, 0.70)
        // Line 2 starts drawing just as Card 3 settles, before expansion
        .addLabel("line2Draw", 0.76)
        .to(line2Ref.current, {
          drawSVG: "100%",
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.10,
        }, 0.76)
        .addLabel("card3Expand", 0.78)
        .to(card3ContentRef.current, {
          height: "auto",
          opacity: 1,
          marginTop: 16,
          ease: "power3.out",
          duration: 0.08,
        }, 0.78);

      // CTA appears at the end - everything shifts up together to make room
      // Shift amount to move everything up when CTA comes in
      const shiftAmount = -100;
      
      tl.addLabel("finish", 0.92)
        // Shift all cards up
        .to(card1Ref.current, {
          y: 0 + shiftAmount,
          ease: "power3.out",
          duration: 0.08,
        }, 0.92)
        .to(card2Ref.current, {
          y: 120 + shiftAmount,
          ease: "power3.out",
          duration: 0.08,
        }, 0.92)
        .to(card3Ref.current, {
          y: 240 + shiftAmount,
          ease: "power3.out",
          duration: 0.08,
        }, 0.92)
        // Shift SVG lines up too
        .to(svgRef.current, {
          y: shiftAmount,
          ease: "power3.out",
          duration: 0.08,
        }, 0.92)
        // CTA comes in from below - positioned below Card 3
        .to(ctaRef.current, {
          opacity: 1,
          top: 620,
          ease: "power3.out",
          duration: 0.08,
        }, 0.92);
      
      // CTA animation finishes at 1.0 (0.92 + 0.08) - no buffer/dead time after

      // Add resize listener
      const handleResize = () => {
        updateLinePaths();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    // Mobile animations (<768px) - Simpler scroll-linked without pinning
    mm.add("(max-width: 767px)", () => {
      if (!mobileLineRef.current || !card1Ref.current || !card2Ref.current || !card3Ref.current) return;
      if (!card1ContentRef.current || !card2ContentRef.current || !card3ContentRef.current) return;

      // Set initial states
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        y: 30,
        opacity: 0,
      });
      gsap.set([card1ContentRef.current, card2ContentRef.current, card3ContentRef.current], {
        height: "auto",
        opacity: 1,
        marginTop: 16,
      });
      gsap.set(mobileLineRef.current, { drawSVG: "0%" });
      if (mobileCTARef.current) {
        gsap.set(mobileCTARef.current, { opacity: 0, y: 20 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 2.0,
        }
      });

      // Draw the vertical connecting line
      tl.to(mobileLineRef.current, {
        drawSVG: "100%",
        ease: "none",
        duration: 1,
      }, 0);

      // Cards rise sequentially with smooth feel
      tl.to(card1Ref.current, {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.25,
      }, 0.05);

      tl.to(card2Ref.current, {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.25,
      }, 0.35);

      tl.to(card3Ref.current, {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.25,
      }, 0.65);

      // Mobile CTA
      if (mobileCTARef.current) {
        tl.to(mobileCTARef.current, {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.1,
        }, 0.9);
      }
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [updateLinePaths] });

  return (
    <section ref={sectionRef} id="process" className="bg-[#FDFBF7] relative">
      {/* Sticky Header - Stays fixed at top during entire scroll experience */}
      <div className="sticky top-0 z-20 bg-[#FDFBF7] pt-20 md:pt-24 pb-4 md:pb-6">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
            AI implementeren
            <span className="relative inline-block ml-2">
              <span className="relative z-10">zonder gedoe</span>
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
            Geen maanden wachten. Geen IT-team nodig.
          </p>
        </div>
      </div>

      {/* Pin Container - Only cards get pinned on desktop */}
      <div ref={pinContainerRef} className="px-6 md:px-12 flex flex-col justify-start overflow-visible">
        <div className="max-w-[1100px] mx-auto w-full">
          {/* Cards Container with Connecting Line */}
          <div ref={cardsContainerRef} className="relative mb-6 md:mb-8 md:min-h-[850px] overflow-visible">
            
            {/* Desktop: Two clean curved S-curve line segments connecting cards */}
            <svg 
              ref={svgRef}
              className="absolute top-0 left-0 w-full h-full z-0 hidden md:block pointer-events-none overflow-visible"
              viewBox="0 0 1100 700"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Gradient definitions for faded tips at card edges */}
              <defs>
                {/* Segment 1: Card 1 → Card 2 */}
                <linearGradient id="line1Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1A2D63" stopOpacity="0" />
                  <stop offset="12%" stopColor="#1A2D63" stopOpacity="0.65" />
                  <stop offset="88%" stopColor="#1A2D63" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#1A2D63" stopOpacity="0" />
                </linearGradient>
                {/* Segment 2: Card 2 → Card 3 */}
                <linearGradient id="line2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1A2D63" stopOpacity="0" />
                  <stop offset="12%" stopColor="#1A2D63" stopOpacity="0.65" />
                  <stop offset="88%" stopColor="#1A2D63" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#1A2D63" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Paths are dynamically calculated in JavaScript based on actual card positions */}
              <path
                ref={line1Ref}
                d=""
                stroke="url(#line1Gradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                style={{ opacity: 0 }}
              />
              
              <path
                ref={line2Ref}
                d=""
                stroke="url(#line2Gradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                style={{ opacity: 0 }}
              />
            </svg>

            {/* Mobile: Vertical Connecting Line SVG with subtle S-curve */}
            <svg 
              className="absolute left-1/2 top-0 w-24 h-full -translate-x-1/2 z-0 md:hidden pointer-events-none overflow-visible"
              viewBox="0 0 80 900"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mobileLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1A2D63" stopOpacity="0.15" />
                  <stop offset="15%" stopColor="#1A2D63" stopOpacity="0.35" />
                  <stop offset="85%" stopColor="#1A2D63" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#1A2D63" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <path
                ref={mobileLineRef}
                d="M 40,30
                   Q 55,120 40,240
                   Q 25,360 40,480
                   Q 55,600 40,720
                   Q 25,820 40,870"
                stroke="url(#mobileLineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                style={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
              />
            </svg>

            {/* 3 Steps - Staggered layout on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 relative z-10 md:items-start">
              
              {/* Step 1 - Highest position */}
              <div
                ref={card1Ref}
                className="group relative rounded-3xl p-8 md:p-10 
                           bg-white
                           shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]"
                style={{ willChange: "transform, filter, opacity" }}
              >
                {/* Watermark number */}
                <div className="absolute -top-2 -left-2 md:-top-5 md:-left-3">
                  <span ref={number1Ref} className="font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.18] select-none">01</span>
                </div>
                
                <div className="relative pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl border-2 border-[#1A2D63]/25 bg-transparent flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#1A2D63]/50" />
                    </div>
                    <span className="text-xs font-medium text-[#1A2D63]/40 uppercase tracking-wider">30 min gratis</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1A2D63] mb-2">
                    Gesprek
                  </h3>
                  <p className="text-[#1A2D63]/60 text-[15px] leading-relaxed">
                    We analyseren je processen en identificeren waar AI impact heeft.
                  </p>
                  
                  {/* Expandable Content - Controlled by GSAP */}
                  <div 
                    ref={card1ContentRef}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0, marginTop: 0 }}
                  >
                    <div className="border-t border-[#1A2D63]/10 pt-4">
                      <ul className="space-y-2">
                        {howItWorksDetails.gesprek.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#1A2D63]/60">
                            <Check className="w-4 h-4 text-[#1A2D63]/40 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 - Middle position */}
              <div
                ref={card2Ref}
                className="group relative rounded-3xl p-8 md:p-10 
                           bg-white
                           shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]"
                style={{ willChange: "transform, filter, opacity" }}
              >
                {/* Watermark number */}
                <div className="absolute -top-4 -left-2 md:-top-5 md:-left-3">
                  <span ref={number2Ref} className="font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.22] select-none">02</span>
                </div>
                
                <div className="relative pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1A2D63]/15 to-[#1A2D63]/5 border border-[#1A2D63]/10 flex items-center justify-center">
                      <Settings className="w-5 h-5 text-[#1A2D63]/70" />
                    </div>
                    <span className="text-xs font-medium text-[#1A2D63]/40 uppercase tracking-wider">2-4 weken</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1A2D63] mb-2">
                    Bouw
                  </h3>
                  <p className="text-[#1A2D63]/60 text-[15px] leading-relaxed">
                    We bouwen en integreren AI op maat van jouw workflow.
                  </p>
                  
                  {/* Expandable Content - Controlled by GSAP */}
                  <div 
                    ref={card2ContentRef}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0, marginTop: 0 }}
                  >
                    <div className="border-t border-[#1A2D63]/10 pt-4">
                      <ul className="space-y-2">
                        {howItWorksDetails.bouw.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#1A2D63]/60">
                            <Check className="w-4 h-4 text-[#1A2D63]/40 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 - Lowest position */}
              <div
                ref={card3Ref}
                className="group relative rounded-3xl p-8 md:p-10 
                           bg-white
                           shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]"
                style={{ willChange: "transform, filter, opacity" }}
              >
                {/* Watermark number */}
                <div className="absolute -top-4 -left-2 md:-top-5 md:-left-3">
                  <span ref={number3Ref} className="font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.28] select-none">03</span>
                </div>
                
                <div className="relative pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#1A2D63]/15 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-[#1A2D63]" />
                    </div>
                    <span className="text-xs font-medium text-[#1A2D63]/50 uppercase tracking-wider">24/7 actief</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1A2D63] mb-2">
                    Resultaat
                  </h3>
                  <p className="text-[#1A2D63]/60 text-[15px] leading-relaxed">
                    Jij bespaart tijd, de AI doet het werk. Zonder fouten.
                  </p>
                  
                  {/* Expandable Content - Controlled by GSAP */}
                  <div 
                    ref={card3ContentRef}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0, marginTop: 0 }}
                  >
                    <div className="border-t border-[#1A2D63]/10 pt-4">
                      <ul className="space-y-2">
                        {howItWorksDetails.resultaat.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#1A2D63]/60">
                            <Check className="w-4 h-4 text-[#1A2D63]/40 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button - absolutely positioned below Card 3 on desktop */}
            <div 
              ref={ctaRef} 
              className="absolute hidden md:flex justify-center items-center z-20"
              style={{ 
                willChange: "transform, opacity",
                right: "-16px",
                width: "33.333%",
                top: 0,
              }}
            >
              <a
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#1A2D63] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#2A4488] transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(26,45,99,0.4)]"
              >
                <Calendar className="w-5 h-5" />
                <span>Plan een gratis gesprek</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Mobile CTA - centered below cards */}
          <div ref={mobileCTARef} className="text-center md:hidden">
            <a
              href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#1A2D63] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#2A4488] transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(26,45,99,0.4)]"
            >
              <Calendar className="w-5 h-5" />
              <span>Plan een gratis gesprek</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Component ---

export function AIDesignLanding() {
  const [scrolled, setScrolled] = useState(false);
  const currentYear = new Date().getFullYear();

  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const logoCarouselRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const footerWaveRef = useRef<SVGPathElement>(null);
  const secondaryCTARef = useRef<HTMLElement>(null);

  const pushDataLayerEvent = (eventName: string, params: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    const dataLayerTarget = window as Window & { dataLayer?: Array<Record<string, unknown>> };
    if (!Array.isArray(dataLayerTarget.dataLayer)) {
      dataLayerTarget.dataLayer = [];
    }
    dataLayerTarget.dataLayer.push({ event: eventName, ...params });
  };

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

  // Secondary CTA section entrance animation - slides up from below
  useGSAP(() => {
    if (!secondaryCTARef.current) return;
    
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(secondaryCTARef.current,
        { y: 100 },
        {
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: secondaryCTARef.current,
            start: "top bottom",    // When section's top hits viewport bottom
            end: "top 30%",         // Finish when section's top is 30% from viewport top
            scrub: 1.2,
          }
        }
      );
    });
    
    return () => mm.revert();
  });

  // Track scroll position for nav fade effect
  const [navOpacity, setNavOpacity] = useState(1);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Fade out nav when scrolling past hero section
      // Start fading at 100px, fully hidden by 300px
      const fadeStart = 100;
      const fadeEnd = 300;
      const scrollY = window.scrollY;
      
      if (scrollY <= fadeStart) {
        setNavOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setNavOpacity(0);
      } else {
        setNavOpacity(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2D63] font-instrument selection:bg-[#B8C5E6] selection:text-[#1A2D63] overflow-x-hidden">
      <NoiseOverlay />

      {/* Navigation - fades out when scrolling past hero */}
      <nav 
        className="fixed top-0 w-full z-40 transition-opacity duration-300 px-4 sm:px-6 py-4 md:py-6 bg-transparent"
        style={{ 
          opacity: navOpacity,
          pointerEvents: navOpacity < 0.1 ? 'none' : 'auto'
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                pushDataLayerEvent("cta_click", {
                  cta_label: "nav_calendly",
                  location: "nav",
                })
              }
              className="hidden md:flex items-center gap-2 bg-[#1A2D63] text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg shadow-[#1A2D63]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan een gesprek</span>
            </a>
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
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex items-center justify-center min-h-[calc(100svh-64px)] md:min-h-screen pt-20 md:pt-0 pb-0 w-full relative z-10">
          {/* Centered Content */}
          <div ref={heroTextRef} className="relative z-10 text-center max-w-[22rem] sm:max-w-[28rem] md:max-w-3xl px-2 sm:px-0">
            <div className="mb-5 sm:mb-6 md:mb-8">
              <h1 className="font-newsreader text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[1] tracking-tight text-[#1A2D63]">
                <span className="block font-extralight">Automatiseer</span>
                <TypewriterText />
              </h1>
            </div>

            <p className="font-instrument text-base sm:text-[17px] md:text-lg text-[#475D8F] leading-relaxed max-w-lg mx-auto mb-6 sm:mb-7 md:mb-8">
            AI op maat, perfect geïntegreerd in je bestaande tools, klaar om werk over te nemen terwijl jij je focus op groei kunt richten.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  pushDataLayerEvent("cta_click", {
                    cta_label: "hero_calendly",
                    location: "hero",
                  })
                }
                className="group w-full sm:w-auto bg-[#1A2D63] text-white px-6 py-3 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan een gratis consult</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <p className="mt-8 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#475D8F]/70 lg:hidden">
              Integraties met je tools
            </p>
            <MobileLogoCarousel />
          </div>
        </div>

      </header>

      {/* ============================================ */}
      {/* HOW IT WORKS SECTION - Enhanced 3 Steps      */}
      {/* ============================================ */}
      <HowItWorksSection />

      {/* ============================================ */}
      {/* USE CASES SECTION                          */}
      {/* ============================================ */}
      <UseCasesSection />

      {/* ============================================ */}
      {/* SECONDARY CTA SECTION                       */}
      {/* ============================================ */}
      <section ref={secondaryCTARef} id="contact" className="py-20 md:py-32 px-6 md:px-12 bg-[#FDFBF7] relative">
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
                onClick={() =>
                  pushDataLayerEvent("cta_click", {
                    cta_label: "secondary_calendly",
                    location: "secondary_cta",
                  })
                }
                className="inline-flex items-center gap-3 bg-[#1A2D63] text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20"
              >
                <Calendar className="w-6 h-6" />
                Plan je gratis gesprek
                <ArrowRight className="w-6 h-6" />
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER                                      */}
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
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[1.3fr_1fr] items-start">
            {/* Footer CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-newsreader leading-tight mb-4 text-center lg:text-left">
                Klaar om uw bedrijf <br />te automatiseren?
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-6 max-w-md text-center lg:text-left mx-auto lg:mx-0">
                Ontdek hoe AI uw bedrijfsprocessen kan transformeren.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    pushDataLayerEvent("cta_click", {
                      cta_label: "footer_calendly",
                      location: "footer_cta",
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
                      location: "footer_cta",
                    })
                  }
                  className="border border-white/20 px-6 py-3 rounded-full text-base font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@finitsolutions.be
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
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
                    onClick={() =>
                      pushDataLayerEvent("contact_click", {
                        method: "email",
                        location: "footer_contact",
                      })
                    }
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
                    onClick={() =>
                      pushDataLayerEvent("contact_click", {
                        method: "linkedin",
                        location: "footer_contact",
                      })
                    }
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
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
              <a href="/privacy" className="hover:text-white transition-colors">Privacybeleid</a>
              <a href="/cookieverklaring" className="hover:text-white transition-colors">Cookieverklaring</a>
              <a href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
              <div className="text-sm text-white/60 [&>button]:text-white/60 [&>button]:hover:text-white [&>button]:transition-colors">
                <CookieSettingsLink />
              </div>
            </div>
            <p className="text-sm text-white/40">© {currentYear} Finit Solutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AIDesignLanding;
