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
  Clock,
  Mail,
  FileText,
  CalendarCheck,
  ShieldAlert,
  HeartHandshake,
  TrendingUp,
  RefreshCw,
  Plus,
  Phone,
  Linkedin,
  Layers,
  MessageSquare,
  Settings,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { useContactForm, ContactFormPopup } from "@/components/contact-form-popup";
import { LandingCTA } from "@/components/landing/landing-cta";
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

interface PainPoint {
  icon: LucideIcon;
  text: string;
}

const painPoints: PainPoint[] = [
  { icon: ShieldAlert, text: "Je weet dat AI kansen biedt, maar je wil geen tienduizenden euro's verspillen aan iets dat niets oplevert." },
  { icon: Clock, text: "Je team besteedt uren aan taken die eigenlijk geautomatiseerd kunnen worden." },
  { icon: Layers, text: "Je processen zitten verspreid over tools, Excel-bestanden en mailboxen." },
  { icon: HeartHandshake, text: 'Je zoekt geen "AI-tool", maar iemand die meedenkt over je processen.' },
  { icon: TrendingUp, text: "Je wil klein starten, snel resultaat zien en daarna pas opschalen." },
];

interface Solution {
  icon: LucideIcon;
  title: string;
  description: string;
}

const solutions: Solution[] = [
  {
    icon: FileText,
    title: "Je offerte gaat de deur uit binnen de minuut",
    description: "Klant vraagt een prijs? Je AI-werknemer maakt de offerte, stuurt hem door en plant de opvolging. Jij hoeft niks te doen.",
  },
  {
    icon: CalendarCheck,
    title: "Je agenda vult zichzelf aan",
    description: "Klanten sturen naar je Whatsapp nummer. Je AI-werknemer reageert, plant de afspraak in en stuurt een bevestiging, herinnering en opvolging.",
  },
  {
    icon: RefreshCw,
    title: "Je verliest geen potentiële klanten meer",
    description: "Elk prospect krijgt op het juiste moment de juiste mail, zonder dat jij eraan moet denken.",
  },
];

const howItWorksDetails = {
  analyse: [
    "We tonen exact waar je vandaag tijd verliest",
    "We identificeren wat meteen automatiseerbaar is",
    "Je krijgt een inschatting van tijd- en omzetwinst",
  ],
  bouw: [
    "We automatiseren offertes, opvolging en/of administratie",
    "We koppelen je tools zodat alles samenwerkt",
    "Alles op maat van jouw manier van werken",
  ],
  resultaat: [
    "Offertes worden automatisch verstuurd en opgevolgd",
    "Minder manueel werk voor jou en je team",
    "Meer omzet zonder extra personeel",
  ],
};

// --- FAQ Data ---
type FaqBlock = { type: "p"; text: string } | { type: "list"; items: string[] } | { type: "heading"; text: string };

const faqItems: { question: string; answer: FaqBlock[] }[] = [
  {
    question: "Welke processen kunnen jullie automatiseren?",
    answer: [
      { type: "p", text: "De vuistregel: doet je team het nu handmatig, en volgt het vaste stappen? Dan kunnen wij het overnemen." },
      { type: "heading", text: "Enkele succesverhalen bij onze klanten:" },
      { type: "heading", text: "1 – E-commerce" },
      { type: "p", text: "Een webshop kreeg dagelijks 50 klantemails over bestellingen, leveringen en retouren — allemaal handmatig beantwoord. We koppelden zijn mailbox aan webshop en zijn kennisbank. Zijn AI-systeem beantwoordt klantemails automatisch, zet bestellingen klaar in de webshop en schakelt alleen een echte medewerker in als de vraag te complex is." },
      { type: "p", text: "→ Resultaat: van 50 naar 5 mails per dag." },
      { type: "heading", text: "2 – Gidsbedrijf" },
      { type: "p", text: "Een bedrijf met 20 gidsen verwerkte alle boekingen handmatig via website, WhatsApp en mail. We bouwden één AI-systeem: boekingen komen binnen, de juiste gids wordt gecontacteerd en ingepland, klant en gids krijgen automatisch een bevestiging en facturen worden automatisch opgesteld." },
      { type: "p", text: "→ Resultaat: geen administratie meer, volledige focus op ondernemen." },
      { type: "heading", text: "3 – Recruitmentbureau" },
      { type: "p", text: "Een recruitmentbureau verwerkte sollicitaties handmatig: cv's lezen, kandidaten mailen, plannen. Zijn AI-systeem screent binnenkomende cv's, plant automatisch een kennismakingsgesprek in en houdt kandidaten op de hoogte." },
      { type: "p", text: "→ Resultaat: van dagen wachten naar same-day opvolging, zonder extra personeel." },
      { type: "p", text: "Jij kent je bedrijf, wij de technologie. Tijdens een analysegesprek denken we actief met je mee om samen te kijken waar de opportuniteiten liggen." },
    ],
  },
  {
    question: "Werkt dit samen met onze bestaande software?",
    answer: [
      { type: "p", text: "Ja, juist daarom bouwen we automatiseringen — we verbinden je bestaande tools met elkaar." },
      { type: "heading", text: "Types software waar we mee werken:" },
      { type: "list", items: [
        "CRM-systemen (Teamleader, HubSpot, Salesforce, ...)",
        "Boekhoudpakketten (Exact Online, Yuki, ...)",
        "E-mail & marketingplatformen (Gmail, Outlook, Mailchimp, ...)",
        "Cloud-opslag (Google Drive, OneDrive, Dropbox, ...)",
        "Betalingsplatformen (Stripe, Mollie, PayPal, ...)",
        "Projectmanagement tools (Monday, Asana, Trello, ...)",
        "Communicatie (Slack, Microsoft Teams, ...)",
        "En 500+ andere via standaard koppelingen",
      ]},
      { type: "heading", text: "Hoe we koppelen" },
      { type: "p", text: "Als je software een API heeft (vrijwel alle moderne systemen sinds 2015), kunnen we het koppelen. Obscure of minder courante software? Zolang het een koppelingsmogelijkheid heeft, lukt het waarschijnlijk." },
      { type: "heading", text: "Geen API?" },
      { type: "p", text: "Dan zoeken we een workaround via e-mail, geëxporteerde bestanden, of webhooks. In 95% van de gevallen vinden we een oplossing." },
      { type: "p", text: "Je hoeft geen nieuwe software aan te schaffen. We werken met wat je al hebt en laten die systemen samenwerken." },
      { type: "p", text: "Onzeker of jullie tools compatibel zijn? Stuur ons de lijst, dan checken we het vooraf — gratis en zonder verplichtingen." },
    ],
  },
  {
    question: "Wat kost AI-automatisering voor mijn bedrijf?",
    answer: [
      { type: "p", text: "Minder dan een halftijdse medewerker inhuren, maar dan werkt het 24/7, maakt geen fouten en is nooit ziek." },
      { type: "p", text: "Concreet voorbeeld: als je team 10 uur per week kwijt is aan handmatige taken, kost dat je €15.000–20.000 per jaar. Een automatisering van €5.000–8.000 verdient zichzelf terug in 3 tot 6 maanden." },
      { type: "p", text: "En daarna blijft het werken — jaar na jaar, met minimale extra kosten." },
      { type: "p", text: "Na een gratis kennismakingsgesprek krijg je een vaste prijs. Geen verrassingen achteraf." },
    ],
  },
  {
    question: "Is dit niet te duur voor een KMO van onze grootte?",
    answer: [
      { type: "p", text: "Juist voor KMO's is dit interessant. Grote bedrijven hebben IT-afdelingen; jij betaalt voor repetitief werk dat een systeem kan overnemen." },
      { type: "p", text: "Te klein om te starten? We bouwen ook graag gefaseerd: start met één proces, breid later uit als je de waarde ziet." },
      { type: "p", text: "De investering is vergelijkbaar met professionele software, maar dan specifiek gebouwd voor jouw processen." },
    ],
  },
  {
    question: "Hoeveel tijd besparen we hier realistisch mee?",
    answer: [
      { type: "p", text: "Tussen de 80% en 100% van de tijd op dat specifieke proces." },
      { type: "heading", text: "Waarom zo hoog?" },
      { type: "p", text: "Simpel: wij adviseren geen automatiseringen met lage ROI. Als een proces maar 30–40% efficiëntiewinst oplevert, zeggen we eerlijk dat het de investering niet waard is." },
      { type: "heading", text: "Concrete voorbeelden" },
      { type: "list", items: [
        "Lead management: Nu 6 uur/week → na automatisering: 0 uur. Volledige besparing.",
        "Offerte-proces: Nu 45 min per offerte (8x/week) → na automatisering: 10 min. Besparing: 4,5 uur/week.",
        "Data synchronisatie: Nu 20 min per nieuwe klant → na automatisering: 0 min, gebeurt direct.",
      ]},
      { type: "heading", text: "Meer dan alleen uren" },
      { type: "list", items: [
        "Lead om 18:00u binnen? Binnen 2 minuten beantwoord, ook buiten kantooruren.",
        "Follow-ups: 0% gemist, alles gebeurt automatisch op tijd.",
        "Fouten: 0 typefouten, data altijd consistent.",
        "Teammoraal: minder frustratie over administratie, meer tijd voor klanten.",
      ]},
      { type: "p", text: "Twijfel of jouw proces geschikt is? Beschrijf het, dan zijn we eerlijk of de ROI er is." },
    ],
  },
  {
    question: "Hoe lang duurt het voor de automatisering live staat?",
    answer: [
      { type: "p", text: "Totaal traject: 4–10 weken, afhankelijk van complexiteit." },
      { type: "heading", text: "Fase 1 – Analyse (1 week)" },
      { type: "p", text: "Samen analyseren we je processen. We starten snel op, geen maanden voorbereiding." },
      { type: "heading", text: "Fase 2 – Building (2–6 weken)" },
      { type: "p", text: "We bouwen en testen de automatisering. Je ziet tussentijds al resultaten." },
      { type: "heading", text: "Fase 3 – Hypercare (2–4 weken)" },
      { type: "p", text: "Het systeem is live en jullie gebruiken het. Wij monitoren intensief en lossen direct op als er iets niet perfect loopt. Pas als het 100% stabiel draait, ronden we af." },
      { type: "p", text: "Onze hypercare-fase is cruciaal: theorie vs. praktijk kan verschillen, en wij blijven erbij tot het écht werkt voor jouw team." },
    ],
  },
  {
    question: "Moet mijn team hiervoor geschoold worden?",
    answer: [
      { type: "p", text: "Minimale onboarding, geen intensieve training." },
      { type: "p", text: "Jouw team hoeft geen technische kennis te hebben. Wat ze wél moeten weten:" },
      { type: "list", items: [
        "Hoe triggert de automatisering? (bijv. lead toevoegen in CRM)",
        "Wat gebeurt er automatisch? (zodat ze niet dubbel werk doen)",
        "Waar zien ze de output? (bijv. taken verschijnen in hun inbox)",
      ]},
      { type: "heading", text: "We begeleiden dit met:" },
      { type: "list", items: [
        "Praktische walkthrough tijdens de hypercare-fase",
        "Korte handleiding (geen 50-paginahandboeken)",
        "Support gedurende 2–4 weken terwijl ze wennen",
      ]},
      { type: "p", text: "De grootste uitdaging? Niet zozeer \"leren gebruiken\", maar eerder \"vertrouwen dat het werkt en oude gewoontes loslaten\". Daar helpen we actief bij." },
    ],
  },
  {
    question: "Wat als er iets misloopt met de automatisering?",
    answer: [
      { type: "p", text: "Elke oplossing heeft een test- en integratieperiode. Tijdens de hypercare kijken we aandachtig mee naar alle handelingen. Pas als alles perfect verloopt, ronden we af." },
      { type: "p", text: "Na aflevering laten we je niet in de steek. Elke oplossing bevat ingebouwde monitoring. Wij worden onmiddellijk verwittigd als er iets hapert." },
      { type: "p", text: "Bug? Gratis. API veranderd? Gratis. Onze verantwoordelijkheid, niet de jouwe." },
    ],
  },
  {
    question: "Wat gebeurt er als we later willen uitbreiden?",
    answer: [
      { type: "p", text: "Uitbreiden is makkelijk — en dat adviseren we vaak bewust." },
      { type: "heading", text: "Typisch groeipad:" },
      { type: "list", items: [
        "Fase 1 (maand 1–3): start met één high-impact proces, bijv. leadmanagement",
        "Fase 2 (maand 4–9): volgend proces erbij, bijv. offerteproces",
        "Fase 3 (jaar 2): volledige workflow-automatisering, meerdere systemen praten met elkaar",
      ]},
      { type: "heading", text: "Waarom gefaseerd werken slim is:" },
      { type: "list", items: [
        "Kleiner risico per stap",
        "Team went geleidelijk aan automatisering",
        "Je ziet ROI tussen elke fase",
        "Budget spreiding",
      ]},
      { type: "p", text: "Technisch bouwen we modulair: nieuwe automatisering sluit aan op bestaande. Geen grote herbouw nodig." },
    ],
  },
  {
    question: "Krijgen we ondersteuning na de lancering?",
    answer: [
      { type: "p", text: "Na de hypercare-fase zou alles perfect moeten werken — en daar investeren we samen in." },
      { type: "heading", text: "Wat maakt onze hypercare anders?" },
      { type: "p", text: "We monitoren niet alleen passief. We werken actief samen met jouw team:" },
      { type: "list", items: [
        "Probeer het systeem eens te breken (we moedigen dit aan)",
        "Test alle edge cases en \"wat als…\"-scenario's",
        "Gebruik het in de echte drukte van je bedrijf",
        "Vind de kinderziektes vóór we weggaan",
      ]},
      { type: "heading", text: "Resultaat na hypercare:" },
      { type: "p", text: "Een systeem dat maandenlang draait zonder dat je aan ons hoeft te denken." },
      { type: "heading", text: "Mocht er toch iets zijn:" },
      { type: "p", text: "We springen bij — gratis, vanzelfsprekend. Je betaalt alleen voor nieuwe features die je later wilt toevoegen." },
    ],
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
// HAND-DRAWN CHECKMARK (same as homepage)
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
// MAIN COMPONENT
// ============================================

export function AwarenessLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [showStickyMobileCTA, setShowStickyMobileCTA] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2D63] font-instrument selection:bg-[#B8C5E6] selection:text-[#1A2D63] overflow-x-hidden">
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
            onClick={() => {
              openForm();
              pushEvent("cta_click", {
                cta_label: "nav_calendly",
                location: "lp_awareness_nav",
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
                location: "lp_awareness_mobile_nav",
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
      {/* HERO SECTION                                 */}
      {/* ============================================ */}
      <header
        ref={heroRef}
        className="relative max-w-[100vw] mx-auto flex flex-col"
      >
        {/* Desktop layout — matches homepage structure */}
        <div className="hidden md:flex container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 items-center justify-center pt-28 lg:pt-32 pb-8 w-full relative z-10">
          <div className="relative z-10 text-center max-w-5xl">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-newsreader text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.1] tracking-tight text-[#1A2D63]">
                Bespaar gemiddeld 15 uur per week{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">met AI.</span>
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
              </h1>
            </motion.div>

            <motion.p
              className="font-instrument text-lg lg:text-xl text-[#475D8F] leading-relaxed max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Wij bouwen AI-oplossingen op maat die repetitieve processen in jouw bedrijf automatisch laten verlopen — zonder dat jij je manier van werken hoeft te veranderen.

            </motion.p>

            <motion.div
              className="flex flex-row items-center justify-center gap-3 mb-6"
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
                    location: "lp_awareness_hero",
                  });
                }}
                className="group bg-[#1A2D63] text-white px-7 py-3.5 rounded-full text-base font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan een kennismakingsgesprek</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div className="flex items-center justify-center gap-3 mt-6 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
              <span className="text-xs uppercase tracking-widest text-[#1A2D63]/40 font-medium">Ondersteund door</span>
              <img src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" className="h-7 w-auto object-contain" />
              <img src="/SI @KBC Black (2).png" alt="Start it @KBC" className="h-7 w-auto object-contain" />
            </motion.div>

            {/* 3 value bullets — same structure as homepage */}
            <motion.div
              className="flex flex-row items-center justify-center gap-6 text-[#1A2D63]/70 text-base mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <HandDrawnCheck className="w-6 h-6 flex-shrink-0" />
                Automatische offertes, mails, opvolging en meer.
              </span>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <HandDrawnCheck className="w-6 h-6 flex-shrink-0" />
                Geen vergeten taken of gemiste aanvragen.
              </span>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <HandDrawnCheck className="w-6 h-6 flex-shrink-0" />
                Groeien zonder extra personeel aan te nemen.
              </span>
            </motion.div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden relative z-10 px-4 sm:px-6 pt-28 pb-6">
          <div className="text-center max-w-[22rem] sm:max-w-[28rem] mx-auto">
            <motion.h1
              className="font-newsreader text-[2.5rem] sm:text-5xl leading-[1.1] tracking-tight text-[#1A2D63] mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Bespaar gemiddeld 15 uur per week{" "}
              <span className="relative inline-block">
                <span className="relative z-10">met AI.</span>
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
            </motion.h1>

            <motion.p
              className="font-instrument text-base sm:text-[17px] text-[#475D8F] leading-relaxed max-w-lg mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Wij bouwen AI-oplossingen op maat die repetitieve processen in jouw bedrijf automatisch laten verlopen — zonder dat jij je manier van werken hoeft te veranderen.

            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-3 mb-5"
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
                    location: "lp_awareness_hero",
                  });
                }}
                className="group w-full bg-[#1A2D63] text-white px-6 py-3.5 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan een kennismakingsgesprek</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div className="flex items-center justify-center gap-2.5 mt-5 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
              <span className="text-[10px] uppercase tracking-widest text-[#1A2D63]/40 font-medium">Ondersteund door</span>
              <img src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" className="h-5 w-auto object-contain" />
              <img src="/SI @KBC Black (2).png" alt="Start it @KBC" className="h-5 w-auto object-contain" />
            </motion.div>

            {/* 3 value bullets — mobile */}
            <motion.div
              className="flex flex-col items-start gap-2.5 text-[#1A2D63]/70 text-sm mx-auto w-fit text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="flex items-center gap-2.5">
                <HandDrawnCheck className="w-6 h-6 flex-shrink-0" />
                Automatische offertes, mails, opvolging en meer.
              </span>
              <span className="flex items-center gap-2.5">
                <HandDrawnCheck className="w-6 h-6 flex-shrink-0" />
                Geen vergeten taken of gemiste aanvragen.
              </span>
              <span className="flex items-center gap-2.5">
                <HandDrawnCheck className="w-6 h-6 flex-shrink-0" />
                Groeien zonder extra personeel aan te nemen.
              </span>
            </motion.div>
          </div>
        </div>

        {/* Logo carousel - Desktop */}
        <div className="hidden lg:block relative pt-0 pb-6 md:pt-0 md:pb-8 overflow-visible">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-[#475D8F]/80 mb-4 relative z-10">
            We integreren met al je tools:
          </p>
          <div className="relative h-[8rem] overflow-visible">
            <LogoCarousel
              className="logo-carousel absolute inset-0 pointer-events-none overflow-visible block"
              logoSize={64}
              svgTopPercent={50}
              spacingMultiplier={1}
              pathD="M -400,500 C 100,470 400,430 800,450 C 1200,470 1600,520 2000,420"
              durationSeconds={70}
            />
          </div>
        </div>

        {/* Logo carousel - Mobile/Tablet */}
        <div className="block lg:hidden relative pt-0 pb-4 overflow-visible">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-[#475D8F]/80 mt-4 mb-4 relative z-10">
            We integreren met al je tools:
          </p>
          <div className="relative h-[6.67rem] -mt-2 overflow-visible">
            <LogoCarousel
              className="logo-carousel absolute inset-0 pointer-events-none overflow-visible block"
              logoSize={48}
              svgTopPercent={35}
              spacingMultiplier={1}
              pathD="M -800,500 C -200,450 300,520 800,490 C 1300,460 1800,530 2400,410"
              durationSeconds={55}
            />
          </div>
        </div>

      </header>

      {/* ============================================ */}
      {/* PAIN POINTS - "Klinkt dit bekend?"           */}
      {/* Starts with minimal top padding so it peeks  */}
      {/* into the hero above as a scroll indicator     */}
      {/* ============================================ */}
      <section
        id="pain-points"
        className="-mt-4 md:mt-0 pt-0 md:pt-6 pb-8 md:pb-10 px-6 md:px-12 bg-[#FDFBF7]"
      >
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15] mb-4">
              Klinkt dit{" "}
              <span className="relative inline-block">
                <span className="relative z-10">bekend?</span>
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
              We spreken dagelijks ondernemers. Dit zijn de frustraties die we het vaakst horen.
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 md:gap-5 bg-white rounded-2xl p-5 md:p-6 border border-[#1A2D63]/[0.06] shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0">
                  <point.icon className="w-full h-full text-[#1A2D63]" strokeWidth={1.5} />
                </div>
                <p className="font-instrument text-base md:text-lg text-[#1A2D63] leading-snug">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={0} />

      {/* ============================================ */}
      {/* SOLUTIONS - "Wij zorgen ervoor dat AI jouw..." */}
      {/* ============================================ */}
      <section
        id="solutions"
        className="pt-8 md:pt-12 pb-8 md:pb-10 px-6 md:px-12 bg-[#FDFBF7]"
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            className="text-center mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15] mb-4">
              Wij zorgen ervoor dat AI jouw{" "}
              <span className="relative inline-block">
                <span className="relative z-10">werk overneemt</span>
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
              Op basis van onze ervaring is dit de gemiddelde besparing bij onze klanten.
            </p>
          </motion.div>

          {/* Before/After comparison */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch justify-center gap-4 md:gap-6 max-w-2xl mx-auto mb-10 md:mb-12"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1 bg-[#1A2D63]/[0.04] rounded-2xl p-7 md:p-8 text-center border border-[#1A2D63]/[0.08] shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]">
              <p className="text-xs uppercase tracking-widest text-[#1A2D63]/40 mb-3 font-medium">
                Zonder AI
              </p>
              <p className="text-4xl md:text-5xl font-newsreader text-[#1A2D63] font-semibold leading-none">
                15+
              </p>
              <p className="text-[#475D8F] text-sm md:text-base mt-2">
                uur administratie per week
              </p>
            </div>
            <div className="flex items-center justify-center px-2">
              <ArrowRight className="w-7 h-7 text-[#1A2D63]/20 rotate-90 sm:rotate-0" />
            </div>
            <div className="flex-1 bg-[#1A2D63] rounded-2xl p-7 md:p-8 text-center shadow-xl shadow-[#1A2D63]/15">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-3 font-medium">
                Met AI
              </p>
              <p className="text-4xl md:text-5xl font-newsreader text-white font-semibold leading-none">
                2
              </p>
              <p className="text-white/60 text-sm md:text-base mt-2">
                uur administratie per week
              </p>
            </div>
          </motion.div>

          {/* Solution cards — homepage card styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-3xl p-8 md:p-10 h-full shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]">
                  <div className="w-10 h-10 rounded-2xl bg-[#1A2D63]/10 border border-[#1A2D63]/25 flex items-center justify-center mb-5">
                    <solution.icon className="w-5 h-5 text-[#1A2D63]" />
                  </div>
                  <h3 className="font-newsreader text-2xl md:text-3xl font-semibold text-[#1A2D63] mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-[#1A2D63]/65 text-base md:text-lg leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Breadth indicator — BIGGER */}
          <motion.div
            className="mt-8 md:mt-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <button
              type="button"
              onClick={() => {
                openForm();
                pushEvent("cta_click", {
                  cta_label: "breadth_card_calendly",
                  location: "lp_awareness_solutions",
                });
              }}
              className="group relative flex items-center gap-5 md:gap-6 max-w-2xl mx-auto rounded-3xl border-2 border-dashed border-[#1A2D63]/20 hover:border-[#1A2D63]/40 px-8 py-7 md:px-10 md:py-8 transition-all hover:bg-white/60 cursor-pointer w-full text-left"
            >
              <div className="hidden md:flex w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#1A2D63]/[0.08] group-hover:bg-[#1A2D63]/[0.15] items-center justify-center shrink-0 transition-colors">
                <Plus className="w-7 h-7 md:w-8 md:h-8 text-[#1A2D63]" />
              </div>
              <div className="md:hidden absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#1A2D63]/[0.08] group-hover:bg-[#1A2D63]/[0.15] flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-[#1A2D63]" />
              </div>
              <div className="flex-1 min-w-0 pr-12 md:pr-0">
                <p className="font-newsreader text-xl md:text-2xl text-[#1A2D63] leading-snug mb-1">
                  En alles wat repetitief is in jouw bedrijf
                </p>
                <p className="text-[#1A2D63]/60 text-base md:text-lg">
                  Vertel ons wat je team dagelijks doet — wij laten zien wat er kan.
                </p>
              </div>
              <ArrowRight className="hidden md:block w-5 h-5 md:w-6 md:h-6 text-[#1A2D63]/30 group-hover:text-[#1A2D63]/60 shrink-0 group-hover:translate-x-1 transition-all" />
            </button>
          </motion.div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={1} />

      {/* ============================================ */}
      {/* HOW IT WORKS                                 */}
      {/* ============================================ */}
      <section
        id="how-it-works"
        className="pt-8 md:pt-12 pb-12 md:pb-16 px-6 md:px-12 bg-[#FDFBF7]"
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            className="text-center mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15] mb-4">
              Hoe wij AI voor jou laten{" "}
              <span className="relative inline-block">
                <span className="relative z-10">werken</span>
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

          {/* 3 step cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 md:pt-8">
            {/* Card 1 - Analyse */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0 }}
            >
              <span className="absolute -top-4 -left-2 md:-top-5 md:-left-3 font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.18] select-none pointer-events-none z-10">01</span>
              <div className="bg-white rounded-3xl p-8 md:p-10 h-full shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)] relative">
                <div className="relative pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl border-2 border-[#1A2D63]/25 bg-transparent flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#1A2D63]/50" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-[#1A2D63]/50 uppercase tracking-wider">30 min vrijblijvend</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#1A2D63] mb-4">Analyse</h3>
                  <ul className="space-y-3">
                    {howItWorksDetails.analyse.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-base md:text-lg text-[#1A2D63]/75">
                        <Check className="w-5 h-5 text-[#1A2D63]/50 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            {/* Card 2 - Bouw */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <span className="absolute -top-4 -left-2 md:-top-5 md:-left-3 font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.22] select-none pointer-events-none z-10">02</span>
              <div className="bg-white rounded-3xl p-8 md:p-10 h-full shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)] relative">
                <div className="relative pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1A2D63]/15 to-[#1A2D63]/5 border border-[#1A2D63]/10 flex items-center justify-center">
                      <Settings className="w-5 h-5 text-[#1A2D63]/70" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-[#1A2D63]/50 uppercase tracking-wider">2–4 weken</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#1A2D63] mb-4">Bouw</h3>
                  <ul className="space-y-3">
                    {howItWorksDetails.bouw.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-base md:text-lg text-[#1A2D63]/75">
                        <Check className="w-5 h-5 text-[#1A2D63]/50 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            {/* Card 3 - Resultaat */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              <span className="absolute -top-4 -left-2 md:-top-5 md:-left-3 font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.28] select-none pointer-events-none z-10">03</span>
              <div className="bg-white rounded-3xl p-8 md:p-10 h-full shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)] relative">
                <div className="relative pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#1A2D63]/15 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-[#1A2D63]" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-[#1A2D63]/50 uppercase tracking-wider">24/7 actief</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#1A2D63] mb-4">Resultaat</h3>
                  <ul className="space-y-3">
                    {howItWorksDetails.resultaat.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-base md:text-lg text-[#1A2D63]/75">
                        <Check className="w-5 h-5 text-[#1A2D63]/50 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA after process — same as homepage process section */}
          <motion.div
            className="flex justify-center mt-10 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              type="button"
              onClick={() => {
                openForm();
                pushEvent("cta_click", {
                  cta_label: "process_calendly",
                  location: "lp_awareness_process",
                });
              }}
              className="group inline-flex items-center gap-3 bg-[#1A2D63] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#2A4488] transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(26,45,99,0.4)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan een kennismakingsgesprek</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <SectionDivider fromColor="#FDFBF7" toColor="#1A2D63" variant={2} />

      {/* ============================================ */}
      {/* TESTIMONIAL                                  */}
      {/* ============================================ */}
      <section className="py-8 md:py-10 px-4 sm:px-6 md:px-12 bg-[#1A2D63] relative">
        <div className="max-w-[800px] mx-auto relative z-10">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Photo — left side, round, bigger */}
            <div
              className="w-24 h-24 md:w-32 md:h-32 rounded-full shrink-0 shadow-lg shadow-black/20"
              role="img"
              aria-label="Bas - PRS Rotselaar"
              style={{
                backgroundImage: "url('/papa foto.jpg')",
                backgroundSize: "150%",
                backgroundPosition: "center 25%",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="text-center md:text-left">
              <blockquote className="font-instrument text-lg md:text-xl text-white leading-relaxed mb-3">
                &ldquo;Snelle oplevering, sympathieke gasten. Ik wist niet dat AI vandaag al zoveel werk kon overnemen!&rdquo;
              </blockquote>
              <p className="font-instrument text-sm md:text-base text-white/60">
                &mdash; Bas, PRS Rotselaar
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider fromColor="#1A2D63" toColor="#FDFBF7" variant={3} />

      {/* ============================================ */}
      {/* FAQ SECTION                                  */}
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
            <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15] mb-4">
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
                  <AccordionContent className="text-[#1A2D63]/65 text-[15px] sm:text-base md:text-[17px] leading-[1.7] pb-5 sm:pb-6 md:pb-7 space-y-3.5">
                    {item.answer.map((block, i) => {
                      if (block.type === "p") {
                        return <p key={i}>{block.text}</p>;
                      }
                      if (block.type === "heading") {
                        return (
                          <p key={i} className="font-semibold text-[#1A2D63]/85 mt-5 first:mt-0 text-[15px] sm:text-base md:text-[17px]">
                            {block.text}
                          </p>
                        );
                      }
                      if (block.type === "list") {
                        return (
                          <ul key={i} className="space-y-2 pl-1">
                            {block.items.map((entry, j) => (
                              <li key={j} className="flex items-start gap-2.5">
                                <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#1A2D63]/30 shrink-0" />
                                <span>{entry}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return null;
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <LandingCTA />
      <LandingFooter />


      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
