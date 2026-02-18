"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { CookieSettingsLink } from "@/components/cookie-settings-link";

// ============================================
// DATA
// ============================================

const CALENDLY_URL =
  "https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions";

type FaqBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "heading"; text: string };

interface FAQItem {
  question: string;
  answer: FaqBlock[];
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Over AI Automatisering",
    items: [
      {
        question: "Welke processen kunnen jullie eigenlijk automatiseren?",
        answer: [
          { type: "p", text: "Alles wat repetitief is en regels volgt, kunnen we automatiseren." },
          { type: "heading", text: "Meest voorkomende automatiseringen voor KMO\u2019s:" },
          { type: "list", items: [
            "Communicatie: offertes automatisch versturen, klanten opvolgen, interne notificaties bij nieuwe leads",
            "Data & admin: facturen verwerken, data tussen systemen synchroniseren, rapportages genereren",
            "Klantbeheer: nieuwe klanten in CRM zetten, follow-up e-mails, projectstatus-updates",
            "Planning: afspraken inplannen, herinneringen versturen, beschikbaarheid checken",
          ]},
          { type: "p", text: "De vuistregel: als je team het nu handmatig doet en het volgt vaste stappen, kunnen wij het automatiseren." },
          { type: "p", text: "Twijfel of jouw proces kan? Vertel ons wat je team dagelijks doet \u2014 wij vertellen of (en hoe) het kan." },
        ],
      },
      {
        question: "Werkt dit samen met onze bestaande software?",
        answer: [
          { type: "p", text: "Ja, juist daarom bouwen we automatiseringen \u2014 we verbinden je bestaande tools met elkaar." },
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
          { type: "p", text: "Dan zoeken we een workaround via e-mail, ge\u00EBxporteerde bestanden, of webhooks. In 95% van de gevallen vinden we een oplossing." },
          { type: "p", text: "Je hoeft geen nieuwe software aan te schaffen. We werken met wat je al hebt en laten die systemen samenwerken." },
          { type: "p", text: "Onzeker of jullie tools compatibel zijn? Stuur ons de lijst, dan checken we het vooraf \u2014 gratis en zonder verplichtingen." },
        ],
      },
      {
        question: "Moet mijn team hiervoor geschoold worden?",
        answer: [
          { type: "p", text: "Minimale onboarding, geen intensieve training." },
          { type: "p", text: "Jouw team hoeft geen technische kennis te hebben. Wat ze w\u00E9l moeten weten:" },
          { type: "list", items: [
            "Hoe triggert de automatisering? (bijv. lead toevoegen in CRM)",
            "Wat gebeurt er automatisch? (zodat ze niet dubbel werk doen)",
            "Waar zien ze de output? (bijv. taken verschijnen in hun inbox)",
          ]},
          { type: "heading", text: "We begeleiden dit met:" },
          { type: "list", items: [
            "Praktische walkthrough tijdens de hypercare-fase",
            "Korte handleiding (geen 50-paginahandboeken)",
            "Support gedurende 2\u20134 weken terwijl ze wennen",
          ]},
          { type: "p", text: "De grootste uitdaging? Niet zozeer \"leren gebruiken\", maar eerder \"vertrouwen dat het werkt en oude gewoontes loslaten\". Daar helpen we actief bij." },
        ],
      },
    ],
  },
  {
    title: "Over Kosten & ROI",
    items: [
      {
        question: "Wat kost AI-automatisering voor mijn bedrijf?",
        answer: [
          { type: "p", text: "Een AI-automatisering kost minder dan een parttime medewerker inhuren, maar werkt 24/7 en maakt geen fouten. Denk aan een investering die vergelijkbaar is met professionele software, maar dan specifiek gebouwd voor jouw processen." },
          { type: "p", text: "De meeste projecten betalen zichzelf terug binnen het eerste halfjaar door tijdsbesparing en minder fouten." },
          { type: "p", text: "Na een gratis intakegesprek en een scopingsessie geven we je een vaste prijs \u2014 geen verrassingen achteraf." },
        ],
      },
      {
        question: "Is dit niet te duur voor een KMO van onze grootte?",
        answer: [
          { type: "p", text: "Juist voor KMO\u2019s is dit interessant. Grote bedrijven hebben IT-afdelingen; jij betaalt voor repetitief werk dat een systeem kan overnemen." },
          { type: "p", text: "Concreet voorbeeld: als je team 10 uur per week kwijt is aan handmatige taken (facturen verwerken, data overzetten, offertes opstellen), dan kost dat je \u20AC15.000\u201320.000 per jaar. Een automatisering van \u20AC5.000\u20138.000 verdient zich in 3\u20136 maanden terug." },
          { type: "p", text: "En dan blijft het werken \u2014 jaar na jaar, met minimale extra kosten." },
          { type: "p", text: "Te klein om te starten? We bouwen ook graag gefaseerd: start met \u00E9\u00E9n proces, breid later uit als je de waarde ziet." },
        ],
      },
      {
        question: "Hoeveel tijd besparen we hier realistisch mee?",
        answer: [
          { type: "p", text: "Tussen de 80% en 100% van de tijd op dat specifieke proces." },
          { type: "heading", text: "Waarom zo hoog?" },
          { type: "p", text: "Simpel: wij adviseren geen automatiseringen met lage ROI. Als een proces maar 30-40% effici\u00EBntiewinst oplevert, zeggen we eerlijk dat het de investering niet waard is." },
          { type: "p", text: "We focussen op processen waar automatisering \u00E9cht verschil maakt \u2014 volledig of grotendeels repetitieve taken die nu handmatig worden uitgevoerd." },
          { type: "heading", text: "Concrete voorbeelden" },
          { type: "list", items: [
            "Lead management: Nu 6 uur/week aan leads in CRM zetten, e-mails versturen, opvolging plannen \u2192 na automatisering: 0 uur. Volledige besparing.",
            "Offerte-proces: Nu 45 minuten per offerte (8x per week) \u2192 na automatisering: 10 minuten (alleen variabele gegevens invullen). Besparing: 4,5 uur/week.",
            "Data synchronisatie: Nu 20 minuten per nieuwe klant om gegevens over te zetten naar boekhouding, projecttool, maillijst \u2192 na automatisering: 0 minuten, gebeurt direct.",
          ]},
          { type: "heading", text: "Meer dan alleen uren" },
          { type: "list", items: [
            "Lead om 18:00u binnen? Nu: pas volgende ochtend verwerkt. Na automatisering: binnen 2 minuten beantwoord (ook buiten kantooruren).",
            "Follow-ups: Nu vergeet je 20% bij drukte. Na automatisering: 0% gemist, alles gebeurt op tijd.",
            "Fouten: Nu typ je klantgegevens 3x over (telkens kans op fouten). Na automatisering: 0 typefouten, data altijd consistent.",
            "Teammoraal: Minder frustratie over admin, meer tijd voor klanten en groei.",
          ]},
          { type: "p", text: "Twijfel of jouw proces geschikt is? Beschrijf het, dan zijn we eerlijk of de ROI er is \u2014 en adviseren we het alleen als het \u00E9cht zin heeft." },
        ],
      },
    ],
  },
  {
    title: "Over Implementatie",
    items: [
      {
        question: "Hoe lang duurt het voor de automatisering live staat?",
        answer: [
          { type: "p", text: "Totaal traject: 4\u201310 weken, afhankelijk van complexiteit." },
          { type: "heading", text: "Fase 1 \u2013 Scoping (1 week)" },
          { type: "p", text: "Samen analyseren we je processen. We starten snel op, geen maanden voorbereiding." },
          { type: "heading", text: "Fase 2 \u2013 Building (2\u20136 weken)" },
          { type: "p", text: "We bouwen en testen de automatisering. Je ziet tussentijds al resultaten." },
          { type: "heading", text: "Fase 3 \u2013 Hypercare (2\u20134 weken)" },
          { type: "p", text: "Het systeem is live en jullie gebruiken het. Wij monitoren intensief en lossen direct op als er iets niet perfect loopt. Pas als het 100% stabiel draait in de echte wereld, ronden we af." },
          { type: "p", text: "Onze hypercare-fase is cruciaal: theorie vs. praktijk kan verschillen, en wij blijven erbij tot het \u00E9cht werkt voor jouw team." },
        ],
      },
      {
        question: "Wat als er iets misloopt met de automatisering?",
        answer: [
          { type: "p", text: "Elke oplossing heeft een test- en integratieperiode, specifiek opgezet om ervoor te zorgen dat jouw automatisering niet zomaar fouten vertoont. Tijdens de hypercare-periode kijken we aandachtig mee naar alle handelingen van je automatisering om zeker te zijn dat alles perfect verloopt. Pas daarna behandelen we jouw project als afgeleverd." },
          { type: "p", text: "Na aflevering laten we je uiteraard niet in de steek. Iedere oplossing bevat ingebouwde monitoring, zodat wij onmiddellijk verwittigd worden als er toch iets hapert." },
        ],
      },
      {
        question: "Wat gebeurt er als we later willen uitbreiden?",
        answer: [
          { type: "p", text: "Uitbreiden is makkelijk \u2014 en dat adviseren we vaak bewust." },
          { type: "heading", text: "Typisch groeipad:" },
          { type: "list", items: [
            "Fase 1 (maand 1\u20133): start met \u00E9\u00E9n high-impact proces, bijv. leadmanagement automatiseren \u2014 investering \u20AC3\u20135k",
            "Fase 2 (maand 4\u20139): volgend proces erbij, bijv. offerteproces \u2014 investering \u20AC4\u20136k",
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
    ],
  },
  {
    title: "Over Ondersteuning",
    items: [
      {
        question: "Krijgen we ondersteuning na de lancering?",
        answer: [
          { type: "p", text: "Na de hypercare-fase zou alles perfect moeten werken \u2014 en daar investeren we samen in." },
          { type: "heading", text: "Wat maakt onze hypercare anders?" },
          { type: "p", text: "We monitoren niet alleen passief. We werken actief samen met jouw team om het systeem grondig te testen:" },
          { type: "list", items: [
            "Probeer het systeem eens te breken (we moedigen dit aan)",
            "Test alle edge cases en \"wat als\u2026\"-scenario\u2019s",
            "Gebruik het in de echte drukte van je bedrijf",
            "Vind de kinderziektes v\u00F3\u00F3r we weggaan",
          ]},
          { type: "p", text: "Waarom? Omdat theorie \u2260 praktijk. Jouw team werkt ermee \u2014 zij kennen de situaties." },
          { type: "heading", text: "Resultaat naar hypercare:" },
          { type: "p", text: "Een systeem dat maandenlang draait zonder dat je aan ons hoeft te denken." },
          { type: "heading", text: "Mocht er toch iets zijn:" },
          { type: "p", text: "We springen bij \u2014 gratis, vanzelfsprekend. Bug? Gratis. API veranderd? Gratis. Iets werkt niet zoals afgesproken? Onze verantwoordelijkheid. Je betaalt alleen voor nieuwe features die je later wilt toevoegen." },
        ],
      },
    ],
  },
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
// ACCORDION COMPONENTS
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
// FAQ ANSWER RENDERER
// ============================================

function renderFaqAnswer(answer: FaqBlock[]) {
  return answer.map((block, i) => {
    switch (block.type) {
      case "p":
        return (
          <p key={i} className="text-[#475D8F] text-[15px] leading-relaxed mb-3 last:mb-0">
            {block.text}
          </p>
        );
      case "heading":
        return (
          <p key={i} className="text-[#1A2D63] text-[15px] font-semibold mt-4 mb-2">
            {block.text}
          </p>
        );
      case "list":
        return (
          <ul key={i} className="list-disc list-inside text-[#475D8F] text-[15px] leading-relaxed mb-3 space-y-1.5 pl-1">
            {block.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  });
}

// ============================================
// MAIN COMPONENT
// ============================================

export function FAQLanding() {
  const [navScrollProgress, setNavScrollProgress] = useState(0);
  const [showStickyMobileCTA, setShowStickyMobileCTA] = useState(false);
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

  // Build flat list of accordion items
  const accordionElements: React.ReactNode[] = [];
  let globalIndex = 0;

  faqCategories.forEach((category, catIndex) => {
    // Category heading
    accordionElements.push(
      <motion.div
        key={`cat-${catIndex}`}
        className={catIndex > 0 ? "mt-10" : ""}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#475D8F]/50 font-medium mb-4">
          {category.title}
        </h3>
      </motion.div>
    );

    category.items.forEach((item) => {
      const itemIndex = globalIndex;
      accordionElements.push(
        <Accordion.Item
          key={`faq-${itemIndex}`}
          value={`faq-${itemIndex}`}
          className="bg-white rounded-xl border border-[#1A2D63]/[0.06] shadow-lg hover:shadow-xl transition-all overflow-hidden"
        >
          <AccordionTrigger className="px-6 text-[#1A2D63] text-[15px] md:text-base">
            <span className="pr-4">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            {renderFaqAnswer(item.answer)}
          </AccordionContent>
        </Accordion.Item>
      );
      globalIndex++;
    });
  });

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
                location: "lp_faq_nav",
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
                location: "lp_faq_mobile_nav",
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
      {/* HERO SECTION (40vh - compact)                */}
      {/* ============================================ */}
      <header className="relative min-h-[40vh] flex flex-col justify-center pt-28 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.h1
            className="font-newsreader text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.1] tracking-tight text-[#1A2D63] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Veelgestelde{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Vragen</span>
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
            className="font-instrument text-base sm:text-[17px] md:text-lg text-[#475D8F] leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Alles wat je wilt weten over AI-automatisering voor je bedrijf
          </motion.p>
        </div>
      </header>

      {/* ============================================ */}
      {/* FAQ ACCORDION                                */}
      {/* ============================================ */}
      <section className="py-8 md:py-16 px-4 sm:px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-[800px] mx-auto">
          <Accordion.Root
            type="single"
            collapsible
            className="space-y-3"
          >
            {accordionElements}
          </Accordion.Root>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA                                    */}
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
                Nog vragen? Of klaar om te starten?
              </h2>
              <p className="text-[#1A2D63]/60 text-lg mb-8">
                Plan een vrijblijvend gesprek. We beantwoorden al je vragen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                {[
                  "Vrijblijvend",
                  "30 minuten",
                  "Al je vragen beantwoord",
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
                    location: "lp_faq_final_cta",
                  })
                }
                className="inline-flex items-center gap-2 md:gap-3 bg-[#1A2D63] text-white px-6 py-3.5 md:px-10 md:py-5 rounded-full text-base md:text-lg font-medium hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Plan je gratis gesprek
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
                      location: "lp_faq_footer",
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
                      location: "lp_faq_footer",
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
                location: "lp_faq_sticky",
              })
            }
            className="flex items-center justify-center gap-2.5 bg-[#1A2D63] text-white w-full py-3 rounded-full text-[15px] font-medium shadow-lg shadow-[#1A2D63]/20"
          >
            <Calendar className="w-4 h-4" />
            Plan je gratis gesprek
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
