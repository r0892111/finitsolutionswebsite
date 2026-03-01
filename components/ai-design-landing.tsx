"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, useGSAP, ScrollTrigger, MotionPathPlugin, DrawSVGPlugin } from '@/lib/gsap';
import {
  ArrowRight,
  Calendar,
  Check,
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
  Building2,
  Calculator,
  Megaphone,
  ShoppingCart,
  Truck,
  Briefcase,
  Target,
  Flame,
  Hammer,
  UtensilsCrossed,
  Ticket,
  Building,
  Heart,
  Zap,
  Menu,
  X,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { CookieSettingsLink } from '@/components/cookie-settings-link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useContactForm, ContactFormPopup } from '@/components/contact-form-popup';
import { pushEvent } from '@/lib/analytics';

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

// --- FAQ Data (gestructureerd: alinea's, lijsten, kopjes) ---
type FaqBlock = { type: "p"; text: string } | { type: "list"; items: string[] } | { type: "heading"; text: string };

const faqItems: { question: string; answer: FaqBlock[] }[] = [
  {
    question: "Welke processen kunnen jullie automatiseren?",
    answer: [
      { type: "p", text: "De vuistregel: doet je team het nu handmatig, en volgt het vaste stappen? Dan kunnen wij het overnemen." },
      { type: "heading", text: "Enkele succesverhalen bij onze klanten:" },
      { type: "heading", text: "1 \u2013 E-commerce" },
      { type: "p", text: "Een webshop kreeg dagelijks 50 klantemails over bestellingen, leveringen en retouren \u2014 allemaal handmatig beantwoord. We koppelden zijn mailbox aan webshop en zijn kennisbank. Zijn AI-systeem beantwoordt klantemails automatisch, zet bestellingen klaar in de webshop en schakelt alleen een echte medewerker in als de vraag te complex is." },
      { type: "p", text: "\u2192 Resultaat: van 50 naar 5 mails per dag." },
      { type: "heading", text: "2 \u2013 Gidsbedrijf" },
      { type: "p", text: "Een bedrijf met 20 gidsen verwerkte alle boekingen handmatig via website, WhatsApp en mail. We bouwden \u00E9\u00E9n AI-systeem: boekingen komen binnen, de juiste gids wordt gecontacteerd en ingepland, klant en gids krijgen automatisch een bevestiging en facturen worden automatisch opgesteld." },
      { type: "p", text: "\u2192 Resultaat: geen administratie meer, volledige focus op ondernemen." },
      { type: "heading", text: "3 \u2013 Recruitmentbureau" },
      { type: "p", text: "Een recruitmentbureau verwerkte sollicitaties handmatig: cv\u2019s lezen, kandidaten mailen, plannen. Zijn AI-systeem screent binnenkomende cv\u2019s, plant automatisch een kennismakingsgesprek in en houdt kandidaten op de hoogte." },
      { type: "p", text: "\u2192 Resultaat: van dagen wachten naar same-day opvolging, zonder extra personeel." },
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
    categoryLabel: 'Klantopvolging',
    title: 'Elke klant wordt automatisch opgevolgd',
    description: 'Jouw AI-systeem stuurt automatisch de juiste mail op het juiste moment. Geen klant wordt vergeten, ook niet op drukke dagen.',
    stat: { value: '3x', label: 'meer klanten die terugkomen' },
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
    title: 'Klantgegevens worden vanzelf bijgewerkt',
    description: 'Nieuwe klant? De gegevens staan meteen in je CRM, boekhouding en maillijst. Geen dubbel werk meer.',
    stat: { value: '15+', label: 'uur per week bespaard' },
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
    title: 'Klanten plannen zelf hun afspraak in',
    description: 'Geen eindeloos heen-en-weer mailen. Klanten kiezen zelf een moment dat past, en de bevestiging gaat automatisch.',
    stat: { value: '0', label: 'minuten besteed aan plannen' },
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
    title: 'Eén keer invoeren, overal bijgewerkt',
    description: 'Je vult iets in op één plek, en het staat meteen in Excel, je CRM en je facturatie. Geen copy-paste meer.',
    stat: { value: '0', label: 'fouten door overtypen' },
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
    title: 'Veelgestelde vragen automatisch beantwoord',
    description: 'Krijg je elke dag dezelfde vragen? Je AI-systeem antwoordt direct. Moeilijke vragen gaan naar de juiste persoon.',
    stat: { value: '2 min', label: 'gemiddelde reactietijd' },
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
    title: 'Rapporten die zichzelf opmaken',
    description: 'Elke week een overzicht klaar, zonder dat iemand er aan moet denken. Alle cijfers verzameld en netjes gepresenteerd.',
    stat: { value: '5+', label: 'uur per week terug' },
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

// --- Section Divider ---

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

  // Track mount state and window resize (width only — ignore height changes from mobile address bar)
  useEffect(() => {
    setIsMounted(true);

    let lastWidth = window.innerWidth;
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      const newWidth = window.innerWidth;
      // Skip if only height changed (mobile address bar show/hide)
      if (newWidth === lastWidth) return;
      lastWidth = newWidth;
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

      // Set initial centering and make visible — force3D for GPU compositing
      gsap.set(logo, {
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        force3D: true,
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
          immediateRender: true,
          force3D: true,
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
            opacity: 0,
            willChange: 'transform',
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
    <div className="relative -mt-6 block lg:hidden">
      <div className="relative h-44 sm:h-48 overflow-visible">
        <LogoCarousel
          className="logo-carousel absolute inset-0 pointer-events-none overflow-visible block lg:hidden"
          logoSize={52}
          logos={integrationLogos}
          svgTopPercent={22}
          spacingMultiplier={1.15}
          pathD={mobilePath}
          durationSeconds={60}
        />
      </div>
    </div>
  );
};


// --- Recognition Section ("Herken jij dit?") ---
const recognitionItems = [
  "Je weet dat AI kan helpen, maar je wil geen geld uitgeven aan iets dat niets oplevert.",
  "Je hebt al demo's gezien, maar niemand kon concreet tonen wat het in jouw bedrijf bespaart.",
  "Je wil eerlijk advies over wat wél automatiseerbaar is — en wat niet.",
  "Je zoekt geen \"AI-tool\", maar iemand die meedenkt over je processen.",
  "Je wil klein starten, snel resultaat zien en daarna pas opschalen.",
];

const RecognitionSection = ({ onCtaClick }: { onCtaClick?: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('[data-recognition-item]');

    // Items animate when they scroll into view
    gsap.set(items, { y: 25, opacity: 0 });

    const itemsTl = gsap.timeline({ paused: true });
    itemsTl.to(items, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power3.out" });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          itemsTl.play();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    // Observe the first item rather than the whole section
    if (items[0]) observer.observe(items[0]);

    return () => observer.disconnect();
  }, { scope: sectionRef });

  return (
    <section id="recognition" ref={sectionRef} className="pt-0 md:pt-2 pb-8 md:pb-12 px-6 md:px-12 bg-[#FDFBF7]">
      <div className="max-w-[53.33rem] mx-auto">
        <div className="text-center mb-5 md:mb-7">
          <h2 className="font-newsreader text-4xl md:text-5xl text-[#1A2D63] leading-[1.15]">
            Herken jij dit?
          </h2>
        </div>

        <div className="space-y-5 md:space-y-6">
          {recognitionItems.map((title, index) => (
            <div
              key={index}
              data-recognition-item
              className="flex items-center gap-4 md:gap-5 bg-white rounded-2xl p-5 md:p-6 border border-[#1A2D63]/[0.06] shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]"
            >
              <span className="font-newsreader text-2xl md:text-3xl text-[#1A2D63]/20 tabular-nums leading-none flex-shrink-0 w-9 text-right">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-instrument text-base md:text-lg text-[#1A2D63] leading-snug">
                {title}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <button
            type="button"
            onClick={() => {
              onCtaClick?.();
              pushEvent("cta_click", {
                cta_label: "recognition_calendly",
                location: "recognition",
              });
            }}
            className="group inline-flex items-center gap-2.5 bg-[#1A2D63] text-white px-7 py-3.5 rounded-full text-base font-medium hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
          >
            <Calendar className="w-4 h-4" />
            <span>Plan een kennismakingsgesprek</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Company Types Carousel ---
const companyTypes = [
  { label: "Accountantskantoren", icon: Calculator },
  { label: "Coaching", icon: Target },
  { label: "HVAC & Installatie", icon: Flame },
  { label: "Marketingbureaus", icon: Megaphone },
  { label: "E-commerce", icon: ShoppingCart },
  { label: "Logistiek & Transport", icon: Truck },
  { label: "Consultancy", icon: Briefcase },
  { label: "HR & Recruitment", icon: Users },
  { label: "Bouwbedrijven & Aannemers", icon: Hammer },
  { label: "Horeca", icon: UtensilsCrossed },
  { label: "Event- & Verhuurbedrijven", icon: Ticket },
  { label: "Facility Management", icon: Building },
  { label: "VZW's", icon: Heart },
  { label: "Energie", icon: Zap },
  { label: "Vastgoed", icon: Building2 },
];

const CompanyTypesCarousel = () => {
  const items = [...companyTypes, ...companyTypes];

  return (
    <section className="pt-4 md:pt-6 pb-6 md:pb-8 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-4xl mx-auto border-t border-[#1A2D63]/[0.08] mb-6" />
      <p className="text-center text-[#1A2D63]/50 text-[13px] uppercase tracking-wider mb-7 font-medium">
        Voor bedrijven zoals het jouwe
      </p>
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex gap-4 w-max animate-[companyScroll_30s_linear_infinite]">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 bg-[#1A2D63]/[0.07] border border-[#1A2D63]/[0.08] rounded-full px-3 py-1">
              <item.icon className="w-4 h-4 text-[#1A2D63]/40" />
              <span className="text-[13px] font-medium text-[#1A2D63]/65 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-4xl mx-auto border-t border-[#1A2D63]/[0.08] mt-8" />
    </section>
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
    <svg ref={svgRef} viewBox="0 2 280 170" className="w-full h-full" fill="none">
      {/* Lead Avatar - Left side (x=35 ensures r=18 stays within bounds) */}
      <g className="lf-lead" transform="translate(35, 55)">
        <circle cx="0" cy="0" r="18" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
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
        <rect x="-16" y="0" width="32" height="40" rx="4" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Envelope icon */}
        <rect x="-8" y="10" width="16" height="12" rx="2" fill="none" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-7,11 L0,17 L7,11" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text className="lf-label" x="85" y="136" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="400">Day 1</text>
      
      {/* Card 2 - Email Day 3 */}
      <g className="lf-card" transform="translate(120, 83)">
        <rect x="-16" y="0" width="32" height="40" rx="4" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Envelope icon */}
        <rect x="-8" y="10" width="16" height="12" rx="2" fill="none" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-7,11 L0,17 L7,11" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text className="lf-label" x="120" y="136" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="400">Day 3</text>
      
      {/* Card 3 - Email Day 7 */}
      <g className="lf-card" transform="translate(155, 83)">
        <rect x="-16" y="0" width="32" height="40" rx="4" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Envelope icon */}
        <rect x="-8" y="10" width="16" height="12" rx="2" fill="none" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-7,11 L0,17 L7,11" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text className="lf-label" x="155" y="136" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="400">Day 7</text>
      
      {/* Card 4 - Calendar with checkmark (Booked) */}
      <g className="lf-card" transform="translate(190, 83)">
        <rect x="-16" y="0" width="32" height="40" rx="4" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        {/* Calendar icon */}
        <rect x="-8" y="8" width="16" height="14" rx="2" fill="none" stroke="#1A2D63" strokeWidth="1.2"/>
        {/* Calendar header bar */}
        <line x1="-8" y1="12" x2="8" y2="12" stroke="#1A2D63" strokeWidth="1"/>
        {/* Calendar grid dots */}
        <circle cx="-3" cy="17" r="1" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="1" cy="17" r="1" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="5" cy="17" r="1" fill="#1A2D63" fillOpacity="0.3"/>
        {/* Checkmark overlay */}
        <circle cx="5" cy="26" r="5" fill="white" stroke="#1A2D63" strokeWidth="1"/>
        <path d="M2,26 L4,28 L8,24" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text className="lf-label" x="190" y="136" textAnchor="middle" fill="#1A2D63" fontSize="9" fontWeight="400">Booked</text>
      
      {/* Success Badge - Right end (same size as lead avatar r=18, x=245 ensures within bounds) */}
      <g className="lf-success" transform="translate(245, 55)">
        <circle cx="0" cy="0" r="18" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
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
        <rect x="-12" y="-9" width="24" height="18" rx="3" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-10,-7 L0,3 L10,-7" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      
      {/* Document Icon - y=60 */}
      <g className="crm-source" transform="translate(45, 60)">
        <rect x="-12" y="-14" width="24" height="28" rx="2" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <line x1="-6" y1="-6" x2="6" y2="-6" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.4"/>
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.4"/>
        <line x1="-6" y1="6" x2="4" y2="6" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.4"/>
      </g>
      
      {/* Phone Icon - y=100 */}
      <g className="crm-source" transform="translate(45, 100)">
        <rect x="-12" y="-14" width="24" height="28" rx="4" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <line x1="-4" y1="-9" x2="4" y2="-9" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.4"/>
        <circle cx="0" cy="6" r="4" fill="none" stroke="#1A2D63" strokeWidth="1"/>
      </g>
      
      {/* Calendar Icon - y=140 */}
      <g className="crm-source" transform="translate(45, 140)">
        <rect x="-12" y="-12" width="24" height="24" rx="2" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <line x1="-12" y1="-4" x2="12" y2="-4" stroke="#1A2D63" strokeWidth="1"/>
        <line x1="-6" y1="-16" x2="-6" y2="-10" stroke="#1A2D63" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="6" y1="-16" x2="6" y2="-10" stroke="#1A2D63" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="-4" cy="4" r="2" fill="#1A2D63" fillOpacity="0.3"/>
        <circle cx="5" cy="4" r="2" fill="#1A2D63" fillOpacity="0.3"/>
      </g>
      
      {/* Chat Icon - y=170 (shifted left slightly to align with others due to speech tail) */}
      <g className="crm-source" transform="translate(45, 171)">
        <path d="M-12,-10 L-12,6 L-6,6 L0,14 L0,6 L12,6 L12,-10 Z" fill="white" stroke="#1A2D63" strokeWidth="1.5" strokeLinejoin="round"/>
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
        <rect x="78" y="20" width="175" height="160" rx="8" fill="white" stroke="#1A2D63" strokeWidth="2"/>
        
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
        <rect x="88" y="58" width="155" height="34" rx="5" fill="white" stroke="#1A2D63" strokeWidth="1"/>
        <circle cx="108" cy="75" r="10" fill="#1A2D63" fillOpacity="0.06" stroke="#1A2D63" strokeWidth="0.8"/>
        <circle cx="108" cy="72" r="4" fill="#1A2D63" fillOpacity="0.1"/>
        <path d="M101,80 Q108,76 115,80" fill="none" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.2"/>
        <line x1="126" y1="68" x2="233" y2="68" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.2"/>
        <line x1="126" y1="82" x2="200" y2="82" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.12"/>
      </g>
      
      {/* Card 2 */}
      <g className="crm-card">
        <rect x="88" y="98" width="155" height="34" rx="5" fill="white" stroke="#1A2D63" strokeWidth="1"/>
        <circle cx="108" cy="115" r="10" fill="#1A2D63" fillOpacity="0.06" stroke="#1A2D63" strokeWidth="0.8"/>
        <circle cx="108" cy="112" r="4" fill="#1A2D63" fillOpacity="0.1"/>
        <path d="M101,120 Q108,116 115,120" fill="none" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.2"/>
        <line x1="126" y1="108" x2="225" y2="108" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.2"/>
        <line x1="126" y1="122" x2="185" y2="122" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.12"/>
      </g>
      
      {/* Card 3 */}
      <g className="crm-card">
        <rect x="88" y="138" width="155" height="34" rx="5" fill="white" stroke="#1A2D63" strokeWidth="1"/>
        <circle cx="108" cy="155" r="10" fill="#1A2D63" fillOpacity="0.06" stroke="#1A2D63" strokeWidth="0.8"/>
        <circle cx="108" cy="152" r="4" fill="#1A2D63" fillOpacity="0.1"/>
        <path d="M101,160 Q108,156 115,160" fill="none" stroke="#1A2D63" strokeWidth="0.8" strokeOpacity="0.2"/>
        <line x1="126" y1="148" x2="215" y2="148" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.2"/>
        <line x1="126" y1="162" x2="170" y2="162" stroke="#1A2D63" strokeWidth="1.2" strokeOpacity="0.12"/>
      </g>
      
      {/* === SUCCESS BADGE (bottom-right of CRM window) === */}
      <g className="crm-check" transform="translate(246, 172)">
        <circle cx="0" cy="0" r="12" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
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
    <svg ref={svgRef} viewBox="0 -10 280 200" className="w-full h-full" fill="none">
      {/* === CALENDAR GRID (left-center) === */}
      <g className="sched-grid">
        {/* Main calendar frame */}
        <rect x="20" y="25" width="140" height="130" rx="6" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        
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
        <circle cx="0" cy="0" r="42" fill="white" stroke="#1A2D63" strokeWidth="2"/>
        
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
        <circle cx="0" cy="0" r="14" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
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
    <svg ref={svgRef} viewBox="0 -17 280 230" className="w-full h-full" fill="none">

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
        <rect x="-28" y="-22" width="56" height="44" rx="6" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
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
        <rect x="-38" y="-22" width="76" height="44" rx="5" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
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
        <rect x="-38" y="-22" width="76" height="44" rx="5" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
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
        <rect x="-38" y="-22" width="76" height="44" rx="5" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
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
        <circle cx="0" cy="0" r="8" fill="white" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-3,0 L-1,2.5 L4,-3" stroke="#1A2D63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      {/* CRM check */}
      <g className="ms-check" transform="translate(80, 153)">
        <circle cx="0" cy="0" r="8" fill="white" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-3,0 L-1,2.5 L4,-3" stroke="#1A2D63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      {/* Invoice check */}
      <g className="ms-check" transform="translate(260, 153)">
        <circle cx="0" cy="0" r="8" fill="white" stroke="#1A2D63" strokeWidth="1.2"/>
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
    <svg ref={svgRef} viewBox="0 -17 280 230" className="w-full h-full" fill="none">
      {/* Central AI bubble - clean circle with question/sparkle */}
      <g className="cs-bubble" transform="translate(140, 42)">
        {/* Main bubble - simple circle, no tail */}
        <circle cx="0" cy="0" r="32" fill="white" stroke="#1A2D63" strokeWidth="2"/>
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
        <rect x="-11" y="0" width="22" height="16" rx="3" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-9,2 L0,10 L9,2" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
      </g>
      <g className="cs-message" transform="translate(140, 125)">
        <rect x="-11" y="0" width="22" height="16" rx="3" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-9,2 L0,10 L9,2" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
      </g>
      <g className="cs-message" transform="translate(225, 125)">
        <rect x="-11" y="0" width="22" height="16" rx="3" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <path d="M-9,2 L0,10 L9,2" fill="none" stroke="#1A2D63" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
      </g>
      
      {/* Team avatars - evenly spaced at bottom */}
      {/* Left avatar */}
      <g className="cs-avatar" transform="translate(55, 168)">
        <circle cx="0" cy="0" r="18" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <circle cx="0" cy="-3" r="6" fill="#1A2D63" fillOpacity="0.08" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-9,12 Q0,6 9,12" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
      {/* Center avatar */}
      <g className="cs-avatar" transform="translate(140, 168)">
        <circle cx="0" cy="0" r="18" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <circle cx="0" cy="-3" r="6" fill="#1A2D63" fillOpacity="0.08" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-9,12 Q0,6 9,12" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
      {/* Right avatar */}
      <g className="cs-avatar" transform="translate(225, 168)">
        <circle cx="0" cy="0" r="18" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
        <circle cx="0" cy="-3" r="6" fill="#1A2D63" fillOpacity="0.08" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-9,12 Q0,6 9,12" fill="none" stroke="#1A2D63" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
      
      {/* Check badges - positioned to upper-right of each avatar */}
      <g className="cs-check" transform="translate(70, 153)">
        <circle cx="0" cy="0" r="8" fill="white" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-4,0 L-1,3 L4,-3" stroke="#1A2D63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      <g className="cs-check" transform="translate(155, 153)">
        <circle cx="0" cy="0" r="8" fill="white" stroke="#1A2D63" strokeWidth="1.2"/>
        <path d="M-4,0 L-1,3 L4,-3" stroke="#1A2D63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      <g className="cs-check" transform="translate(240, 153)">
        <circle cx="0" cy="0" r="8" fill="white" stroke="#1A2D63" strokeWidth="1.2"/>
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
    <svg ref={svgRef} viewBox="0 15 280 170" className="w-full h-full" fill="none">
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
        <rect x="45" y="45" width="190" height="115" rx="6" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
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
      <circle className="rp-dot" cx="73" cy="120" r="3" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
      <circle className="rp-dot" cx="103" cy="108" r="3" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
      <circle className="rp-dot" cx="133" cy="92" r="3" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
      <circle className="rp-dot" cx="163" cy="78" r="3" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
      <circle className="rp-dot" cx="193" cy="62" r="3" fill="white" stroke="#1A2D63" strokeWidth="1.5"/>
      
      {/* "Analyzed" Badge - top-right of chart frame */}
      <g className="rp-badge" transform="translate(175, 50)">
        <rect x="0" y="0" width="55" height="18" rx="9" fill="white" stroke="#1A2D63" strokeWidth="1"/>
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

// --- Use Cases: horizontally scrollable carousel of large cards ---
const UseCasesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [illustrationProgress, setIllustrationProgress] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  useEffect(() => {
    setIllustrationProgress(0);
    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value: 1,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => setIllustrationProgress(obj.value),
    });
    return () => { tween.kill(); };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    el.scrollLeft = dragScrollLeft.current - walk;
  };

  const stopDragging = () => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = false;
    el.style.cursor = 'grab';
    el.style.userSelect = '';
  };

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(':scope > div') as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 320; // 24px = gap-6
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="use-cases" className="pt-8 md:pt-12 pb-4 md:pb-6 bg-[#FDFBF7]">
      <div className="text-center mb-8 md:mb-10 px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
          Hoe wij AI inzetten voor klanten
        </h2>
        <p className="text-[#1A2D63]/60 text-lg md:text-xl max-w-2xl mx-auto">
          Dit doen AI-systemen vandaag al voor bedrijven zoals die van jou.
        </p>
      </div>

      {/* Scroll progress bar */}
      <div className="px-6 md:px-12 mb-5 flex justify-center">
        <div className="flex items-center gap-3 max-w-xs w-full">
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Vorige"
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-[#1A2D63]/20 text-[#1A2D63]/50 hover:border-[#1A2D63]/50 hover:text-[#1A2D63] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="relative flex-1 h-[5px] rounded-full bg-[#1A2D63]/15 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#1A2D63] transition-none"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-[11px] font-medium tracking-wide text-[#1A2D63]/50 whitespace-nowrap tabular-nums">
            {Math.round(scrollProgress * (useCasesData.length - 1)) + 1} / {useCasesData.length}
          </span>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Volgende"
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-[#1A2D63]/20 text-[#1A2D63]/50 hover:border-[#1A2D63]/50 hover:text-[#1A2D63] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="pt-0 pb-6">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pl-6 md:pl-12 pr-6 md:pr-12 pt-6 pb-12 snap-x snap-mandatory scrollbar-hide scroll-pl-6 md:scroll-pl-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', cursor: 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
                {useCasesData.map((useCase) => {
          const IllustrationComponent = illustrationComponents[useCase.id];
          return (
            <div
              key={useCase.id}
              className={"flex-shrink-0 w-[72vw] sm:w-[52vw] md:w-[34vw] lg:w-[28vw] snap-start rounded-3xl bg-white overflow-hidden shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]"}
              style={{ pointerEvents: isDragging.current ? 'none' : undefined }}
            >
              <div className="h-[180px] sm:h-[200px] md:h-[220px] flex items-center justify-center bg-white overflow-hidden">
                <div className="w-full h-full" style={{ transform: `translateY(${useCase.id === 'crm-sync' ? '10px' : '16px'})` }}>
                  {IllustrationComponent && (
                    <IllustrationComponent progress={illustrationProgress} />
                  )}
                </div>
              </div>
              <div className="px-6 md:px-8 pt-4 md:pt-5 pb-5 md:pb-6">
                <span className="inline-block px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#1A2D63]/50 border border-[#1A2D63]/10 rounded-full mb-3">
                  {useCase.categoryLabel}
                </span>
                <h3 className="font-newsreader text-2xl md:text-3xl text-[#1A2D63] mb-2">
                  {useCase.title}
                </h3>
                <p className="text-[#1A2D63]/65 text-base md:text-lg leading-relaxed">
                  {useCase.description}
                </p>
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
    "We tonen exact waar je vandaag tijd verliest",
    "We identificeren wat meteen automatiseerbaar is",
    "Je krijgt een inschatting van tijd- en omzetwinst",
  ],
  bouw: [
    "We automatiseren offertes, opvolging, administratie en meer",
    "We koppelen je tools zodat alles samenwerkt",
    "Alles op maat van jouw manier van werken",
  ],
  resultaat: [
    "Je systeem werkt dag én nacht, zonder fouten",
    "Minder manueel werk voor jou en je team",
    "Meer omzet zonder extra personeel",
  ],
};

// --- How It Works Section Component ---
const HowItWorksSection = ({ onCtaClick }: { onCtaClick?: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const underlinePathRef = useRef<SVGPathElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<SVGPathElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const ctaDesktopRef = useRef<HTMLDivElement>(null);
  const ctaMobileRef = useRef<HTMLDivElement>(null);

  // Calculate and update SVG line paths based on card positions
  const updateLinePaths = useCallback(() => {
    if (!cardsContainerRef.current || !card1Ref.current || !card2Ref.current || !card3Ref.current) return;
    if (!line1Ref.current || !line2Ref.current || !svgRef.current) return;

    const card1Width = card1Ref.current.offsetWidth;
    const card2Width = card2Ref.current.offsetWidth;

    const card1Left = card1Ref.current.offsetLeft;
    const card2Left = card2Ref.current.offsetLeft;
    const card3Left = card3Ref.current.offsetLeft;

    const containerWidth = cardsContainerRef.current.offsetWidth;
    const containerHeight = cardsContainerRef.current.offsetHeight;
    svgRef.current.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);

    // Y position: vertically centered on the cards
    const connectionY = card1Ref.current.offsetTop + card1Ref.current.offsetHeight / 2;

    // Line 1: Card 1 right edge -> Card 2 left edge
    const line1StartX = card1Left + card1Width;
    const line1EndX = card2Left;

    // Line 2: Card 2 right edge -> Card 3 left edge
    const line2StartX = card2Left + card2Width;
    const line2EndX = card3Left;

    const midX1 = (line1StartX + line1EndX) / 2;
    const path1 = `M ${line1StartX},${connectionY} C ${midX1},${connectionY} ${midX1},${connectionY} ${line1EndX},${connectionY}`;

    const midX2 = (line2StartX + line2EndX) / 2;
    const path2 = `M ${line2StartX},${connectionY} C ${midX2},${connectionY} ${midX2},${connectionY} ${line2EndX},${connectionY}`;

    line1Ref.current.setAttribute('d', path1);
    line2Ref.current.setAttribute('d', path2);
  }, []);

  // Calculate line paths on mount and resize (only for mobile; desktop handled in GSAP setup)
  useEffect(() => {
    updateLinePaths();
  }, [updateLinePaths]);

  return (
    <section ref={sectionRef} id="process" className="bg-[#FDFBF7] relative pt-8 md:pt-12 pb-0 md:pb-0">
      <div ref={pinContainerRef} className="relative">
        {/* Header */}
        <div ref={headerWrapperRef} className="pb-6 md:pb-10">
          <div className="max-w-[73.33rem] mx-auto px-6 md:px-12 text-center">
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-newsreader text-[#1A2D63] leading-[1.15] mb-4">
              Hoe wij AI{" "}
              <span className="relative inline-block">
                <span className="relative z-10">voor jou laten werken</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-[0.35em] z-0"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    ref={underlinePathRef}
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
            <p ref={subtitleRef} className="text-[#1A2D63]/60 text-lg md:text-xl max-w-xl mx-auto">
              Simpel, snel, en zonder dat jij iets hoeft te leren.
            </p>
          </div>
        </div>

        {/* Cards Container - rises from below during Phase 3 */}
        <div ref={cardsWrapperRef} className="w-full px-6 md:px-12 pb-16 md:pb-20">
          <div className="max-w-[73.33rem] mx-auto w-full">
            {/* Cards Container with Connecting Lines */}
            <div ref={cardsContainerRef} className="relative mb-6 md:mb-8 overflow-visible">

              {/* Desktop: Horizontal connecting line segments between cards */}
              <svg
                ref={svgRef}
                className="absolute top-0 left-0 w-full h-full z-0 hidden md:block pointer-events-none overflow-visible"
                viewBox="0 0 1100 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="line1Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1A2D63" stopOpacity="0" />
                    <stop offset="12%" stopColor="#1A2D63" stopOpacity="0.65" />
                    <stop offset="88%" stopColor="#1A2D63" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#1A2D63" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="line2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1A2D63" stopOpacity="0" />
                    <stop offset="12%" stopColor="#1A2D63" stopOpacity="0.65" />
                    <stop offset="88%" stopColor="#1A2D63" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#1A2D63" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  ref={line1Ref}
                  d=""
                  stroke="url(#line1Gradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{ opacity: 1 }}
                />

                <path
                  ref={line2Ref}
                  d=""
                  stroke="url(#line2Gradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{ opacity: 1 }}
                />
              </svg>

              {/* Mobile: Vertical Connecting Line SVG */}
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
                  style={{ strokeDasharray: 1200, strokeDashoffset: 0 }}
                />
              </svg>

              {/* 3 Steps - Same level on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 relative z-10 md:items-start">

                {/* Step 1 */}
                <div
                  ref={card1Ref}
                  className="group relative rounded-3xl p-8 md:p-10
                             bg-white
                             shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]"
                >
                  {/* Watermark number */}
                  <div className="absolute -top-4 -left-2 md:-top-5 md:-left-3">
                    <span className="font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.18] select-none">01</span>
                  </div>

                  <div className="relative pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl border-2 border-[#1A2D63]/25 bg-transparent flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-[#1A2D63]/50" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-[#1A2D63]/50 uppercase tracking-wider">30 min vrijblijvend</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-semibold text-[#1A2D63] mb-4">
                      Analyse
                    </h3>

                    <ul className="space-y-3">
                      {howItWorksDetails.gesprek.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-base md:text-lg text-[#1A2D63]/75">
                          <Check className="w-5 h-5 text-[#1A2D63]/50 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  ref={card2Ref}
                  className="group relative rounded-3xl p-8 md:p-10
                             bg-white
                             shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]"
                >
                  {/* Watermark number */}
                  <div className="absolute -top-4 -left-2 md:-top-5 md:-left-3">
                    <span className="font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.22] select-none">02</span>
                  </div>

                  <div className="relative pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1A2D63]/15 to-[#1A2D63]/5 border border-[#1A2D63]/10 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-[#1A2D63]/70" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-[#1A2D63]/50 uppercase tracking-wider">2–4 weken</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-semibold text-[#1A2D63] mb-4">
                      Bouw
                    </h3>

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

                {/* Step 3 */}
                <div
                  ref={card3Ref}
                  className="group relative rounded-3xl p-8 md:p-10
                             bg-white
                             shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]"
                >
                  {/* Watermark number */}
                  <div className="absolute -top-4 -left-2 md:-top-5 md:-left-3">
                    <span className="font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.28] select-none">03</span>
                  </div>

                  <div className="relative pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#1A2D63]/15 flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-[#1A2D63]" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-[#1A2D63]/50 uppercase tracking-wider">24/7 actief</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-semibold text-[#1A2D63] mb-4">
                      Resultaat
                    </h3>

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
              </div>
            </div>

            {/* CTA Button - centered below Card 2 (middle column) */}
            <div ref={ctaDesktopRef} className="hidden md:flex justify-center mt-8">
              <button
                type="button"
                onClick={onCtaClick}
                className="group inline-flex items-center gap-3 bg-[#1A2D63] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#2A4488] transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(26,45,99,0.4)]"
              >
                <Calendar className="w-5 h-5" />
                <span>Plan een kennismakingsgesprek</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile CTA - centered below cards */}
            <div ref={ctaMobileRef} className="text-center mt-8 md:hidden">
              <button
                type="button"
                onClick={onCtaClick}
                className="group inline-flex items-center gap-3 bg-[#1A2D63] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#2A4488] transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(26,45,99,0.4)]"
              >
                <Calendar className="w-5 h-5" />
                <span>Plan een kennismakingsgesprek</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FAQ Section ---

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !accordionRef.current) return;

    // Initial states
    gsap.set(headingRef.current, { y: 40, opacity: 0 });
    const items = accordionRef.current.querySelectorAll('[data-faq-item]');
    gsap.set(items, { y: 30, opacity: 0 });

    // Build paused timeline
    const tl = gsap.timeline({ paused: true });

    tl.to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      }, 0);

    tl.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: "power3.out",
    }, 0.2);

    // Use IntersectionObserver instead of ScrollTrigger — it calculates
    // positions in real-time so it can't go stale from layout shifts
    // after fonts/images load.
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="faq" className="pt-8 md:pt-12 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
      <div className="max-w-[53.33rem] mx-auto">
        <div ref={headingRef} className="text-center mb-6 md:mb-10">
          <h2 className="font-newsreader text-4xl md:text-5xl text-[#1A2D63] mb-3 md:mb-4">
            Veelgestelde vragen
          </h2>
          
        </div>

        <div ref={accordionRef} className="bg-white/40 md:bg-transparent rounded-2xl md:rounded-none border border-[#1A2D63]/[0.06] md:border-0 px-4 sm:px-5 md:px-0">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-[#1A2D63]/[0.08] last:border-b-0 md:last:border-b md:border-[#1A2D63]/10"
              data-faq-item
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
                            <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#1A2D63]/30 flex-shrink-0" />
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
  );
};

// --- Main Component ---

export function AIDesignLanding() {
  const [scrolled, setScrolled] = useState(false);
  const currentYear = new Date().getFullYear();
  const { isOpen, openForm, closeForm } = useContactForm();

  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const logoCarouselRef = useRef<HTMLDivElement>(null);
  const secondaryCTARef = useRef<HTMLElement>(null);

  // Navigate to section: instant overlay → jump → smooth reveal
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigateToSection = useCallback((sectionId: string) => {
    if (sectionId === "contact") {
      window.location.href = "/plan-gesprek";
      return;
    }

    // Phase 1: instantly show overlay (no transition) — covers everything including mobile menu
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.transition = 'none';
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    }

    // Close mobile menu after overlay is visible
    setMobileMenuOpen(false);

    // Phase 2: after two frames (overlay fully painted), jump to target
    requestAnimationFrame(() => { requestAnimationFrame(() => {
      const navOffset = 80; // space below fixed nav
      let targetTop = 0;
      if (sectionId === "hero") {
        targetTop = 0;
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollY = window.scrollY ?? document.documentElement.scrollTop;
          targetTop = scrollY + rect.top - navOffset;
          targetTop = Math.max(0, targetTop);
        }
      }

      // Override CSS scroll-behavior: smooth to make jump truly instant
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, targetTop);
      document.documentElement.style.scrollBehavior = '';

      // Short loader display, then smooth reveal
      setTimeout(() => {
        if (overlay) {
          overlay.style.transition = 'opacity 400ms ease-in-out';
          overlay.style.opacity = '0';
          overlay.style.pointerEvents = 'none';
        }
      }, 500);
    }); });
  }, []);


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

  // Track scroll position for nav transition (0 = hero state, 1 = compact state)
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Calculate nav transition progress (0 at <=100px, 1 at >=300px)
      const fadeStart = 100;
      const fadeEnd = 300;
      const scrollY = window.scrollY;

      if (scrollY <= fadeStart) {
        setNavScrollProgress(0);
      } else if (scrollY >= fadeEnd) {
        setNavScrollProgress(1);
      } else {
        setNavScrollProgress((scrollY - fadeStart) / (fadeEnd - fadeStart));
      }

      // Determine active section based on scroll position
      const sectionIds = ["recognition", "process", "use-cases", "faq", "contact"];
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2D63] font-instrument selection:bg-[#B8C5E6] selection:text-[#1A2D63] overflow-x-hidden">
      <NoiseOverlay />

      {/* Unified Navigation - transitions from hero state to compact state on scroll */}
      <nav
        className="fixed top-0 w-full z-40"
        style={{
          background: navScrollProgress > 0
            ? `rgba(253, 251, 247, ${0.82 * navScrollProgress})`
            : 'transparent',
          backdropFilter: navScrollProgress > 0 ? `blur(${14 * navScrollProgress}px)` : 'none',
          WebkitBackdropFilter: navScrollProgress > 0 ? `blur(${14 * navScrollProgress}px)` : 'none',
          borderBottom: `1px solid rgba(26, 45, 99, ${0.1 * navScrollProgress})`,
          transition: 'background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s',
        }}
      >
        <div
          className="max-w-[93.33rem] mx-auto flex items-center justify-between px-4 sm:px-6 relative"
          style={{
            paddingTop: `${12 + (1 - navScrollProgress) * 12}px`,
            paddingBottom: `${12 + (1 - navScrollProgress) * 12}px`,
            transition: 'padding 0.3s',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile logo */}
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              onClick={() => navigateToSection("hero")}
              style={{
                height: `${24 + (1 - navScrollProgress) * 6}px`,
                transition: 'height 0.3s',
                cursor: 'pointer',
              }}
              className="w-auto object-contain md:hidden"
            />
            {/* Desktop logo */}
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              onClick={() => navigateToSection("hero")}
              style={{
                height: `${32 + (1 - navScrollProgress) * 14}px`,
                transition: 'height 0.3s',
                cursor: 'pointer',
              }}
              className="w-auto object-contain hidden md:block"
            />
          </div>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {[
              { label: "Herken jij dit?", id: "recognition" },
              { label: "Ons proces", id: "process" },
              { label: "Voorbeelden", id: "use-cases" },
              { label: "FAQ", id: "faq" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToSection(item.id)}
                className={`text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-[#1A2D63]'
                    : 'text-[#1A2D63]/60 hover:text-[#1A2D63]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

            <button
              type="button"
            onClick={() => {
              openForm();
              pushEvent("cta_click", {
                cta_label: "nav_calendly",
                location: "nav",
              });
            }}
            className="hidden md:flex items-center gap-2 bg-[#1A2D63] text-white rounded-full text-sm font-medium hover:scale-105 transition-all shadow-lg shadow-[#1A2D63]/20"
            style={{
              paddingLeft: `${20 + (1 - navScrollProgress) * 4}px`,
              paddingRight: `${20 + (1 - navScrollProgress) * 4}px`,
              paddingTop: `${10 + (1 - navScrollProgress) * 2}px`,
              paddingBottom: `${10 + (1 - navScrollProgress) * 2}px`,
              transition: 'padding 0.3s',
            }}
            >
              <Calendar className="w-4 h-4" />
              <span>Plan een kennismakingsgesprek</span>
            </button>

          {/* Mobile CTA + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                openForm();
                pushEvent("cta_click", {
                  cta_label: "mobile_nav_calendly",
                  location: "mobile_nav",
                });
              }}
              className="flex items-center gap-1.5 bg-[#1A2D63] text-white rounded-full text-xs font-medium px-3.5 py-2 transition-opacity duration-300"
              style={{ opacity: mobileMenuOpen ? 0 : navScrollProgress, pointerEvents: !mobileMenuOpen && navScrollProgress > 0.5 ? 'auto' : 'none' }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan een gesprek</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-11 h-11 rounded-full text-[#1A2D63] hover:bg-[#1A2D63]/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Nav scroll loader overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-[#FDFBF7]" />
        <div className="loader relative z-10" />
                </div>

      {/* Mobile full-screen menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-[#FDFBF7]/95 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex flex-col h-full pt-24 pb-8 px-6">
            {/* Top: CTA + phone */}
            <div className="flex flex-col gap-4 mb-8">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "mobile_nav_calendly",
                    location: "mobile_nav",
                  });
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1A2D63] text-white px-7 py-3.5 rounded-full text-base font-medium"
              >
                <Calendar className="w-4 h-4" />
                Plan een kennismakingsgesprek
              </button>
              <div className="w-full bg-white rounded-2xl px-6 py-5 border border-[#1A2D63]/[0.06] shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)] flex flex-col items-center gap-2 text-center">
                <p className="text-[#475D8F]/70 text-xs font-instrument tracking-widest uppercase">Bel gerust op</p>
                <a
                  href="tel:+32495702314"
                  className="font-newsreader text-[#1A2D63] text-3xl leading-tight underline underline-offset-4 decoration-[#1A2D63]/20 hover:decoration-[#1A2D63]/60 hover:text-[#2A4488] transition-colors"
                  onClick={() => pushEvent("contact_click", { method: "phone", location: "mobile_menu" })}
                >
                  +32 495 70 23 14
                </a>
                <p className="text-[#475D8F] text-sm font-instrument">
                  ma-za · 8u30-19u
                </p>
              </div>
            </div>

            {/* Middle: Nav links */}
            <div className="flex-1">
              <div className="border-t border-[#1A2D63]/10">
                {[
                  { label: "Home", id: "hero" },
                  { label: "Herken jij dit?", id: "recognition" },
                  { label: "Ons proces", id: "process" },
                  { label: "Voorbeelden", id: "use-cases" },
                  { label: "FAQ", id: "faq" },
                  { label: "Contact", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateToSection(item.id)}
                    className="flex items-center justify-between w-full py-4 border-b border-[#1A2D63]/10 text-[#1A2D63] hover:text-[#475D8F] transition-colors"
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-[#1A2D63]/30" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom: Email */}
            <div className="flex items-center justify-center gap-2 text-[#1A2D63]/60 text-sm pt-4">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@finitsolutions.be" className="hover:text-[#1A2D63] transition-colors">
                contact@finitsolutions.be
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* HERO SECTION                                */}
      {/* ============================================ */}
      <header ref={heroRef} className="relative max-w-[100vw] mx-auto flex flex-col">

        {/* Desktop layout */}
        <div className="hidden md:flex container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 items-center justify-center pt-28 lg:pt-32 pb-8 w-full relative z-10">
          <div ref={heroTextRef} className="relative z-10 text-center max-w-3xl">
            <div className="mb-6">
              <h1 className="font-newsreader text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.1] tracking-tight text-[#1A2D63]">
                AI-systemen die 24/7{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">voor je werken.</span>
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
            </div>

            <p className="font-instrument text-lg lg:text-xl text-[#475D8F] leading-relaxed max-w-2xl mx-auto mb-8">
              Finit helpt KMO&apos;s de stap richting AI te zetten — van grondige analyse tot krachtige systemen die écht tijd besparen.
            </p>

            <div className="flex flex-row items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "hero_calendly",
                    location: "hero",
                  });
                }}
                className="group bg-[#1A2D63] text-white px-7 py-3.5 rounded-full text-base font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan een kennismakingsgesprek</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="text-xs uppercase tracking-widest text-[#1A2D63]/40 font-medium">Ondersteund door</span>
              <img src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" className="h-7 w-auto object-contain" />
              <img src="/SI @KBC Black (2).png" alt="Start it @KBC" className="h-7 w-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden relative z-10 px-4 sm:px-6 pt-28 pb-6">
          <div className="text-center max-w-[22rem] sm:max-w-[28rem] mx-auto">
            <h1 className="font-newsreader text-[2.5rem] sm:text-5xl leading-[1.1] tracking-tight text-[#1A2D63] mb-5">
              AI-systemen die 24/7{" "}
              <span className="relative inline-block">
                <span className="relative z-10">voor je werken.</span>
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

            <p className="font-instrument text-base sm:text-[17px] text-[#475D8F] leading-relaxed max-w-lg mx-auto mb-6">
            Finit helpt KMO&apos;s de stap richting AI te zetten — van grondige analyse tot krachtige systemen die écht tijd besparen.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 mb-5">
              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "hero_calendly",
                    location: "hero",
                  });
                }}
                className="group w-full bg-[#1A2D63] text-white px-6 py-3.5 rounded-full text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan een kennismakingsgesprek</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2.5">
              <span className="text-[10px] uppercase tracking-widest text-[#1A2D63]/40 font-medium">Ondersteund door</span>
              <img src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" className="h-5 w-auto object-contain" />
              <img src="/SI @KBC Black (2).png" alt="Start it @KBC" className="h-5 w-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Logo carousel with subtle curve - Desktop */}
        <div className="hidden lg:block relative pt-0 pb-6 md:pt-0 md:pb-8 overflow-visible">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-[#475D8F]/80 mb-4 relative z-10">
            We integreren met al je tools:
          </p>
          <div className="relative h-[8rem] overflow-visible">
            <LogoCarousel
              className="logo-carousel absolute inset-0 pointer-events-none overflow-visible block"
              logoSize={64}
              logos={integrationLogos}
              svgTopPercent={50}
              spacingMultiplier={1}
              pathD="M -400,500 C 100,470 400,430 800,450 C 1200,470 1600,520 2000,420"
              durationSeconds={70}
            />
          </div>
        </div>

        {/* Logo carousel with subtle curve - Mobile/Tablet */}
        <div className="block lg:hidden relative pt-0 pb-4 overflow-visible">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-[#475D8F]/80 mt-4 mb-4 relative z-10">
            We integreren met al je tools:
          </p>
          <div className="relative h-[6.67rem] -mt-2 overflow-visible">
            <LogoCarousel
              className="logo-carousel absolute inset-0 pointer-events-none overflow-visible block"
              logoSize={48}
              logos={integrationLogos}
              svgTopPercent={35}
              spacingMultiplier={1}
              pathD="M -800,500 C -200,450 300,520 800,490 C 1300,460 1800,530 2400,410"
              durationSeconds={55}
            />
          </div>
        </div>

      </header>

      {/* ============================================ */}
      {/* RECOGNITION SECTION - flows directly from hero */}
      {/* ============================================ */}
      <RecognitionSection onCtaClick={openForm} />

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={0} />

      {/* ============================================ */}
      {/* HOW IT WORKS SECTION                        */}
      {/* ============================================ */}
      <HowItWorksSection onCtaClick={openForm} />

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={0} />

      {/* ============================================ */}
      {/* USE CASES SECTION                          */}
      {/* ============================================ */}
      <UseCasesSection />

      <SectionDivider fromColor="#FDFBF7" toColor="#FDFBF7" variant={1} />

      {/* ============================================ */}
      {/* FAQ SECTION                                  */}
      {/* ============================================ */}
      <FAQSection />

      {/* ============================================ */}
      {/* SECONDARY CTA SECTION                       */}
      {/* ============================================ */}
      <section ref={secondaryCTARef} id="contact" className="pt-6 md:pt-8 pb-12 md:pb-20 px-6 md:px-12 bg-[#FDFBF7] relative">
        <div className="max-w-[53.33rem] mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-[#B8C5E6] rounded-full blur-[120px] opacity-30"></div>
            <div className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#1A2D63]/10 text-center flex flex-col items-center gap-6">
              <h2 className="font-newsreader text-4xl md:text-5xl text-[#1A2D63]">
                Ontdek wat AI jouw bedrijf oplevert
              </h2>
              <p className="text-[#1A2D63]/60 text-lg md:text-xl max-w-xl mx-auto">
                In 30 minuten bespreken we je huidige situatie en maken we een inschatting van wat mogelijk is.
              </p>
              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "secondary_calendly",
                    location: "secondary_cta",
                  });
                }}
                className="inline-flex items-center gap-2 md:gap-3 bg-[#1A2D63] text-white px-6 py-3.5 md:px-10 md:py-5 rounded-full text-base md:text-lg font-medium hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Plan een kennismakingsgesprek
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <p className="text-sm text-[#1A2D63]/40">
                We werken met een beperkt aantal bedrijven tegelijk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER                                      */}
      {/* ============================================ */}
      <footer className="bg-[#1A2D63] text-white pt-0 md:pt-0 pb-6 md:pb-8 px-6 relative overflow-visible mt-16 md:mt-20 lg:mt-24">
        {/* SVG Wave */}
        <div className="absolute top-0 left-0 w-full" style={{ transform: 'translateY(-99%)' }}>
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2278 683"
            className="w-full h-16 md:h-20 lg:h-24 block"
            style={{ overflow: 'visible' }}
          >
            <path
              fill="#1A2D63"
              d="M0-0.3C0-0.3,464,120,1139,120S2278-0.3,2278-0.3V683H0V-0.3z"
            />
          </svg>
        </div>

        <div className="max-w-[93.33rem] mx-auto relative z-10">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[1.3fr_1fr] items-start">
          {/* Footer CTA */}
            <div>
              <h2 className="text-4xl md:text-5xl font-newsreader leading-tight mb-4 text-center lg:text-left">
                Ontdek wat AI jouw bedrijf oplevert
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-6 max-w-md text-center lg:text-left mx-auto lg:mx-0">
              In 30 minuten bespreken we je huidige situatie en maken we een inschatting van wat mogelijk is.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => {
                    openForm();
                    pushEvent("cta_click", {
                      cta_label: "footer_calendly",
                      location: "footer_cta",
                    });
                  }}
                  className="bg-white text-[#1A2D63] px-6 py-3 rounded-full text-base font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Plan een kennismakingsgesprek
                </button>
                <a
                  href="mailto:contact@finitsolutions.be"
                  onClick={() =>
                    pushEvent("contact_click", {
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
                    <a href="tel:+32495702314" className="hover:text-white transition-colors" onClick={() => pushEvent("contact_click", { method: "phone", location: "footer" })}>+32 495 70 23 14</a>
                    <a href="tel:+32468029945" className="hover:text-white transition-colors" onClick={() => pushEvent("contact_click", { method: "phone", location: "footer" })}>+32 468 02 99 45</a>
                </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white/70" />
                  <a
                    href="mailto:contact@finitsolutions.be"
                    onClick={() =>
                      pushEvent("contact_click", {
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
                      pushEvent("contact_click", {
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
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
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
      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}

export default AIDesignLanding;
