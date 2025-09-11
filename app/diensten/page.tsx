"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Lightbulb,
  Code as CodeIcon,
  TestTube,
  Rocket,
  ChevronRight,
  Cog,
  ArrowDown,
  AlertTriangle,
  Check,
} from "lucide-react";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useProcessScroll } from "@/hooks/useProcessScroll";
import { useProcessAutoplay } from "@/hooks/useProcessAutoplay";

// Brand colors
const DARK_BLUE = "#1C2C55"; // primary background / headings
const LIGHT_YELLOW = "#F7E69B"; // accents & highlights
const CHARCOAL = "#202226"; // body text on light
const WHITE = "#FFFFFF";

const processSteps = [
  {
    id: 1,
    title: "Probleem identificatie",
    subtitle: "Ontdekken & analyseren",
    description:
      "We beginnen met een grondige analyse van uw huidige situatie en identificeren de kernuitdagingen.",
    icon: Search,
    details: [
      "Uitgebreide stakeholderinterviews",
      "Analyse van bestaande systemen en workflows",
      "Identificatie van pijnpunten en inefficiënties",
      "Documentatie van huidige processen",
    ],
    useCase:
      "Een advocatenkantoor worstelt met het snel vinden van relevante juridische informatie verspreid over verschillende documenten en systemen.",
    visual: "analysis",
  },
  {
    id: 2,
    title: "Oplossing ontwerp",
    subtitle: "Strategisch plannen",
    description:
      "Op basis van onze bevindingen ontwerpen we een op maat gemaakte oplossing die perfect aansluit bij uw behoeften.",
    icon: Lightbulb,
    details: [
      "Technische architectuur en systeemontwerp",
      "User experience en interfaceplanning",
      "Integratiestrategie met bestaande systemen",
      "Projectplanning en milestone‑definitie",
    ],
    useCase:
      "We stellen een AI‑gedreven kennisbank voor die alle juridische documenten indexeert en doorzoekbaar maakt via natuurlijke taal.",
    visual: "design",
  },
  {
    id: 3,
    title: "Ontwikkeling",
    subtitle: "Bouwen & integreren",
    description:
      "Ons ervaren team bouwt uw oplossing met de nieuwste technologieën en best practices.",
    icon: CodeIcon,
    details: [
      "Agile ontwikkeling met regelmatige updates",
      "Moderne technologieën en frameworks",
      "Veilige en schaalbare architectuur",
      "Continue integratie en deployment",
    ],
    useCase:
      "We ontwikkelen een RAG‑systeem dat documenten ingesteekt, geïndexeerd en via een intuïtieve chat‑interface doorzoekbaar maakt.",
    visual: "development",
  },
  {
    id: 4,
    title: "Testing & validatie",
    subtitle: "Kwaliteit verzekeren",
    description:
      "Uitgebreide tests zorgen ervoor dat uw oplossing perfect functioneert voordat we live gaan.",
    icon: TestTube,
    details: [
      "Geautomatiseerde en handmatige tests",
      "Performance‑ en security‑audits",
      "User acceptance testing",
      "Bugfixes en optimalisaties",
    ],
    useCase:
      "We testen de zoeknauwkeurigheid, gebruikersinterface en beveiligingsprotocollen met echte juridische cases.",
    visual: "testing",
  },
  {
    id: 5,
    title: "Lancering & ondersteuning",
    subtitle: "Live gaan & groeien",
    description:
      "We lanceren uw oplossing en bieden continue ondersteuning voor optimale prestaties.",
    icon: Rocket,
    details: [
      "Geleidelijke uitrol en go‑live‑ondersteuning",
      "Training en documentatie voor gebruikers",
      "Monitoring en performance‑optimalisatie",
      "Continue ondersteuning en updates",
    ],
    useCase:
      "Het systeem wordt gelanceerd met training voor alle advocaten; we monitoren de prestaties om verder te optimaliseren.",
    visual: "launch",
  },
] as const;

export default function DienstenPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const processRef = useRef<HTMLDivElement>(null);

  const { activeStep, setActiveStep, visibleSteps } = useProcessScroll(
    stepRefs,
    isPlaying
  );

  useProcessAutoplay(
    isPlaying,
    hasStarted,
    activeStep,
    setActiveStep,
    setIsPlaying,
    processSteps.length
  );

  const handlePlay = () => {
    setIsPlaying(true);
    setHasStarted(true);
  };

  const handlePause = () => setIsPlaying(false);

  const handleReset = () => {
    setIsPlaying(false);
    setHasStarted(false);
    setActiveStep(0);
  };

  const scrollToProcess = () => {
    processRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen font-general-sans">
      {/* HERO (marketing): Dark Blue canvas + White type; Light Yellow accents */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: DARK_BLUE }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border"
                 style={{
                   color: WHITE,
                   borderColor: "rgba(255,255,255,0.35)",
                   background: "rgba(255,255,255,0.12)",
                   backdropFilter: "blur(6px)",
                 }}>
              <Cog className="h-4 w-4 mr-2" />
              <span>Maatwerk proces</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </div>
          </motion.div>

          {/* H1 — Bold, 2.5–3.5rem, line-height ~1.15 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-bold text-center tracking-normal"
            style={{
              color: WHITE,
              fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
              lineHeight: 1.15,
            }}
          >
            Van idee tot
            {" "}
            <span
              className="relative inline-block ml-2"
              aria-label="Impact highlight"
            >
              <span
                className="rounded-full px-3 py-1 shadow-sm"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(247,230,155,1) 0%, rgba(255,255,255,0.85) 100%)",
                  color: DARK_BLUE,
                }}
              >
                impact
              </span>
            </span>
          </motion.h1>

          {/* Body — Regular, 16–18px, line-height 1.5–1.65 */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mx-auto text-center font-normal mt-6"
            style={{ color: "rgba(255,255,255,0.9)", maxWidth: 920, fontSize: "1.125rem", lineHeight: 1.6 }}
          >
            Ontdek hoe wij samen met u van uitdaging naar oplossing gaan — kort, duidelijk
            en resultaatgericht.
          </motion.p>

          {/* Process Preview (icons) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="max-w-6xl mx-auto mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.08 }}
                    className="text-center group cursor-default"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div
                        className="absolute inset-0 rounded-2xl border shadow"
                        style={{
                          background: "rgba(255,255,255,0.12)",
                          borderColor: "rgba(255,255,255,0.35)",
                          backdropFilter: "blur(8px)",
                        }}
                      />
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div
                          className="w-14 h-14 rounded-xl border flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)",
                            borderColor: "rgba(255,255,255,0.4)",
                          }}
                        >
                          <IconComponent className="h-7 w-7" style={{ color: WHITE }} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-base font-medium" style={{ color: WHITE }}>
                        {step.title}
                      </div>
                      <div className="text-sm font-normal" style={{ color: "rgba(255,255,255,0.8)" }}>
                        {step.subtitle}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="text-center mt-16"
          >
            <button
              onClick={scrollToProcess}
              className="group flex flex-col items-center gap-3 mx-auto"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              <span className="text-sm font-normal">Ontdek het proces</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: "currentColor" }}
              >
                <ArrowDown className="h-5 w-5" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* PROCESS (content): White background, Dark Blue headings, Charcoal body */}
      <section ref={processRef} className="relative py-20 md:py-28 bg-white">
        {/* Vertical progress */}
        <div className="absolute left-6 top-0 z-40 hidden lg:block" aria-hidden>
          <div
            className="absolute w-[3px] rounded-full"
            style={{ height: "100%", backgroundColor: "rgba(28,44,85,0.12)" }}
          />
          <motion.div
            className="absolute w-[3px] rounded-full"
            style={{
              height: `${(activeStep / (processSteps.length - 1)) * 100}%`,
              background: DARK_BLUE,
            }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-left"
          >
            {/* H2 — Medium, 24–32px */}
            <h2
              className="font-medium tracking-normal"
              style={{ color: DARK_BLUE, fontSize: "clamp(1.75rem, 3.5vw, 2rem)", lineHeight: 1.25 }}
            >
              Ons bewezen proces
            </h2>
            <p
              className="mt-4 font-normal"
              style={{ color: CHARCOAL, fontSize: "1.0625rem", lineHeight: 1.6, maxWidth: 720 }}
            >
              Een gestructureerde aanpak die zorgt voor resultaten.
            </p>
          </motion.div>

          <div className="space-y-24 max-w-7xl mx-auto">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isVisible = visibleSteps.has(index);
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={step.id}
                  ref={(el) => (stepRefs.current[index] = el)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: isVisible ? 1 : 0.35,
                    y: isVisible ? 0 : 12,
                    scale: isActive ? 1.01 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start"
                >
                  {/* Left: info */}
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl border"
                         style={{ backgroundColor: LIGHT_YELLOW, borderColor: "rgba(28,44,85,0.18)" }}>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(28,44,85,1) 0%, rgba(42,58,110,1) 100%)",
                        }}
                      >
                        <IconComponent className="h-6 w-6" style={{ color: WHITE }} />
                      </div>
                      <div>
                        <div className="text-sm font-bold" style={{ color: DARK_BLUE }}>
                          Stap {step.id}
                        </div>
                        <div className="text-xs font-normal" style={{ color: CHARCOAL }}>
                          {step.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-medium tracking-normal"
                      style={{ color: DARK_BLUE, fontSize: "clamp(2rem, 4vw, 2.5rem)", lineHeight: 1.2 }}
                    >
                      {step.title}
                    </h3>

                    {/* Body */}
                    <p className="font-normal" style={{ color: CHARCOAL, fontSize: "1.0625rem", lineHeight: 1.6 }}>
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="grid grid-cols-1 gap-3">
                      {step.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.06 }}
                          className="flex items-start gap-3 rounded-xl border bg-white p-4"
                          style={{ borderColor: "rgba(28,44,85,0.15)" }}
                        >
                          <div
                            className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md"
                            style={{ backgroundColor: "rgba(28,44,85,0.08)" }}
                          >
                            <Check className="h-4 w-4" style={{ color: DARK_BLUE }} />
                          </div>
                          <span className="font-medium" style={{ color: CHARCOAL }}>
                            {detail}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: case */}
                  <div className="relative">
                    <div className="rounded-3xl border p-8 bg-white"
                         style={{ borderColor: "rgba(28,44,85,0.15)" }}>
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border"
                          style={{
                            backgroundColor: "rgba(28,44,85,0.06)",
                            borderColor: "rgba(28,44,85,0.2)",
                          }}
                        >
                          <div className="w-6 h-6 rounded-full flex items-center justify-center"
                               style={{ backgroundColor: "rgba(28,44,85,0.18)" }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DARK_BLUE }} />
                          </div>
                        </div>
                        <h4 className="text-sm font-bold" style={{ color: DARK_BLUE }}>
                          Client case
                        </h4>
                      </div>
                      <p className="italic mb-6"
                         style={{ color: CHARCOAL, lineHeight: 1.6 }}>
                        “{step.useCase}”
                      </p>

                      {/* Step visuals */}
                      <div className="mt-4">
                        {step.id === 1 && (
                          <div className="grid grid-cols-1 gap-2">
                            {["Versnipperde info", "Handmatige stappen", "Onvoldoende vindbaarheid"].map(
                              (item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between rounded-md px-3 py-2 border bg-white"
                                  style={{ borderColor: "rgba(28,44,85,0.15)" }}
                                >
                                  <span className="text-sm" style={{ color: CHARCOAL }}>
                                    {item}
                                  </span>
                                  <AlertTriangle className="h-4 w-4" style={{ color: DARK_BLUE }} />
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {step.id === 2 && (
                          <div className="flex flex-wrap gap-2">
                            {["Scope", "Integraties", "RBAC", "Chat", "E‑mail", "Workflows"].map(
                              (tag, i) => (
                                <div
                                  key={i}
                                  className="rounded-md px-2 py-1 text-xs font-medium border"
                                  style={{
                                    color: DARK_BLUE,
                                    backgroundColor: "rgba(28,44,85,0.06)",
                                    borderColor: "rgba(28,44,85,0.18)",
                                  }}
                                >
                                  {tag}
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {step.id === 3 && (
                          <div
                            className="rounded-md font-mono text-xs p-3 border overflow-x-auto"
                            style={{ color: CHARCOAL, backgroundColor: "#F9FAFB", borderColor: "rgba(28,44,85,0.15)" }}
                          >
                            <div>ingest_sources()</div>
                            <div>index_documents()</div>
                            <div>build_chat_interface()</div>
                            <div>rag.generate(query, context)</div>
                          </div>
                        )}

                        {step.id === 4 && (
                          <div className="flex flex-wrap gap-2">
                            {["Login OK", "RBAC OK", "Kwaliteit ↑", "E‑mail voorstel OK"].map((badge, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-full border"
                                style={{
                                  color: DARK_BLUE,
                                  backgroundColor: "rgba(28,44,85,0.06)",
                                  borderColor: "rgba(28,44,85,0.18)",
                                }}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        )}

                        {step.id === 5 && (
                          <div className="h-24 flex items-end gap-2">
                            {[30, 45, 60, 80].map((height, i) => (
                              <div key={i} className="flex-1 rounded border overflow-hidden"
                                   style={{ borderColor: "rgba(28,44,85,0.18)", backgroundColor: "rgba(28,44,85,0.06)" }}>
                                <div
                                  className="w-full rounded-b"
                                  style={{
                                    height: `${height}%`,
                                    background:
                                      "linear-gradient(180deg, rgba(28,44,85,1) 0%, rgba(247,230,155,1) 100%)",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS (content) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left mb-12"
          >
            <h2
              className="font-medium tracking-normal"
              style={{ color: DARK_BLUE, fontSize: "clamp(1.75rem, 3.5vw, 2rem)", lineHeight: 1.25 }}
            >
              Waarom ons proces werkt
            </h2>
            <p className="mt-4 font-normal" style={{ color: CHARCOAL, fontSize: "1.0625rem", lineHeight: 1.6, maxWidth: 820 }}>
              Bewezen resultaten door een gestructureerde aanpak, continue samenwerking en focus op meetbare impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Echte samenwerking",
                description:
                  "We werken niet voor u, maar met u — uw expertise gecombineerd met onze technische kennis voor optimale resultaten.",
              },
              {
                title: "Snelle resultaten",
                description:
                  "Door onze agile aanpak ziet u snel concrete vooruitgang en kunt u tijdig bijsturen voor maximale impact.",
              },
              {
                title: "Meetbare impact",
                description:
                  "Elke oplossing wordt gebouwd met duidelijke KPI's en meetbare verbeteringen die uw ROI aantonen.",
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border p-6 bg-white"
                style={{ borderColor: "rgba(28,44,85,0.15)" }}
              >
                <h3 className="mb-3 font-medium" style={{ color: DARK_BLUE, fontSize: "1.25rem", lineHeight: 1.25 }}>
                  {benefit.title}
                </h3>
                <p className="font-normal" style={{ color: CHARCOAL, lineHeight: 1.6 }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (marketing): Dark Blue + Light Yellow button */}
      <section className="py-20 md:py-28" style={{ backgroundColor: DARK_BLUE }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2
              className="font-bold tracking-normal"
              style={{ color: WHITE, fontSize: "clamp(2rem, 4.5vw, 2.75rem)", lineHeight: 1.2 }}
            >
              Klaar voor excellentie?
            </h2>
            <p className="mt-4 font-normal"
               style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.125rem", lineHeight: 1.6 }}>
              Transformeer uw digitale visie in meetbare bedrijfsimpact. Uw ambitie verdient uitzonderlijke uitvoering.
            </p>

            <div className="mt-10">
              <ProjectRequestDialog
                buttonText="Begin uw transformatie"
                buttonClassName="rounded-2xl px-8 py-4 font-medium"
                // Inline style to guarantee brand colors even if Tailwind config is unchanged
                // (Light Yellow pill with Dark Blue text)
                style={{
                  backgroundColor: LIGHT_YELLOW,
                  color: DARK_BLUE,
                  border: "none",
                } as any}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
