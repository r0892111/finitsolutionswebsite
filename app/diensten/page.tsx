"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Lightbulb,
  Code,
  TestTube,
  Rocket,
  ChevronRight,
  Cog,
  ChevronDown,
  CheckCircle2,
  Shield,
  Users,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

const processSteps = [
  {
    id: 1,
    title: "Discovery & Analysis",
    subtitle: "Strategische Basis",
    description:
      "Uitgebreide analyse van bedrijfsprocessen om optimalisatiekansen en technische vereisten te identificeren.",
    icon: Search,
    accent: "from-blue-500 to-blue-600",
    details: [
      "Stakeholder alignment workshops",
      "Technische infrastructuur beoordeling",
      "Proces knelpunten identificatie",
      "ROI potentieel berekening",
    ],
    useCase:
      "Document opvraging over 15+ systemen kostte 4 uur per dag per advocaat",
    solution:
      "Geünificeerde kennisarchitectuur met intelligente zoekmogelijkheden",
    outcome: "85% reductie in informatie opvraging tijd",
    visual: "analysis",
    metrics: {
      efficiency: "85%",
      timeSaved: "4h → 36min",
      satisfaction: "9.2/10",
    },
  },
  {
    id: 2,
    title: "Solution Architecture",
    subtitle: "Technische Blauwdruk",
    description:
      "Ontwerpen van schaalbare, veilige systemen die naadloos integreren met uw bestaande infrastructuur.",
    icon: Lightbulb,
    accent: "from-amber-500 to-orange-500",
    details: [
      "Microservices architectuur ontwerp",
      "AI/ML model selectie strategie",
      "Integratie ecosysteem planning",
      "Security framework implementatie",
    ],
    useCase:
      "Complexe juridische terminologie vereiste natuurlijke taalverwerking mogelijkheden",
    solution: "RAG architectuur met vector embeddings voor semantisch zoeken",
    outcome: "340% verbetering in zoek relevantie nauwkeurigheid",
    visual: "design",
    metrics: {
      accuracy: "340%",
      coverage: "100%",
      performance: "Sub-second",
    },
  },
  {
    id: 3,
    title: "Development & Integration",
    subtitle: "Precisie Engineering",
    description:
      "Bouwen van robuuste, schaalbare oplossingen met enterprise-grade beveiliging en prestatie optimalisatie.",
    icon: Code,
    accent: "from-green-500 to-emerald-600",
    details: [
      "Test-driven development methodologie",
      "Real-time prestatie monitoring",
      "Progressieve deployment strategie",
      "Continue integratie pipeline",
    ],
    useCase:
      "Verwerking van 10TB juridische documenten met sub-seconde query response vereisten",
    solution:
      "Gedistribueerde verwerking met intelligente caching en edge optimalisatie",
    outcome: "Response tijden onder 200ms met 99.9% uptime",
    visual: "development",
    metrics: {
      uptime: "99.9%",
      response: "<200ms",
      throughput: "10TB/day",
    },
  },
  {
    id: 4,
    title: "Quality Assurance",
    subtitle: "Excellentie Validatie",
    description:
      "Rigoureuze test protocollen die foutloze prestaties en gebruikerservaring optimalisatie garanderen.",
    icon: TestTube,
    accent: "from-purple-500 to-violet-600",
    details: [
      "Geautomatiseerde regressie testing",
      "Load testing en stress scenario's",
      "Security penetratie testing",
      "Gebruiker acceptatie validatie",
    ],
    useCase:
      "Bereiken van 99.5%+ nauwkeurigheid voor juridische document analyse in productie omgeving",
    solution:
      "Multi-laagse validatie met AI model fine-tuning en menselijk toezicht",
    outcome: "99.8% nauwkeurigheid met 40% snellere gebruiker adoptie",
    visual: "testing",
    metrics: {
      accuracy: "99.8%",
      adoption: "95%",
      bugRate: "0.02%",
    },
  },
  {
    id: 5,
    title: "Launch & Optimization",
    subtitle: "Continue Excellentie",
    description:
      "Strategische deployment met doorlopende prestatie monitoring en continue verbeteringscycli.",
    icon: Rocket,
    accent: "from-red-500 to-pink-600",
    details: [
      "Gefaseerde uitrol strategie",
      "Real-time monitoring systemen",
      "Gebruiker training programma's",
      "Prestatie optimalisatie cycli",
    ],
    useCase:
      "Naadloze adoptie over 120 advocaten zonder productiviteit verstoring",
    solution:
      "Champion-geleide uitrol met uitgebreide training en ondersteuning systemen",
    outcome:
      "95% adoptie rate binnen 3 weken, 45-minuut naar 3-minuut query reductie",
    visual: "launch",
    metrics: {
      adoption: "95%",
      timeReduction: "93%",
      roi: "450%",
    },
  },
];

export default function DienstenPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(true); // Full-page popup overlay

  // ref for the expanded panel
  const expandedRef = useRef<HTMLDivElement | null>(null);

  const toggleStep = (stepId: number) => {
    setActiveStep((prev) => (prev === stepId ? null : stepId));
  };

  // auto-scroll expanded content into view
  useEffect(() => {
    if (activeStep && expandedRef.current) {
      expandedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeStep]);

  const renderStepVisual = (stepId: number) => {
    switch (stepId) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {[
                "Versnipperde informatie",
                "Handmatige processen",
                "Inefficiënte workflows",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 shadow-sm"
                >
                  <span className="text-sm text-red-800 font-medium">
                    {item}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 text-sm">⚠</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Search className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">
                  Analyse Resultaat
                </span>
              </div>
              <p className="text-blue-700 text-sm">
                Identificatie van 12 kritieke verbeterpunten met geschat ROI
                van €240K/jaar
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                "API Design",
                "Database Schema",
                "Security Layer",
                "UI/UX Flow",
                "Integration Map",
                "Deployment Plan",
              ].map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-center text-sm font-medium text-amber-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="h-5 w-5 text-amber-600" />
                <span className="font-semibold text-amber-800">
                  Architectuur Blueprint
                </span>
              </div>
              <p className="text-amber-700 text-sm">
                Modulaire microservices architectuur met 99.9% uptime garantie
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-900 text-slate-200 text-sm font-mono p-6 border border-slate-700 shadow-lg">
              <div className="flex items-center gap-2 mb-4 text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-xs">DEVELOPMENT ACTIVE</span>
              </div>
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-green-400">function</span>{" "}
                  <span className="text-blue-300">ingestDocuments</span>(){" "}
                  <span className="text-gray-400">{`{ ✓ }`}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <span className="text-green-400">function</span>{" "}
                  <span className="text-blue-300">buildSearchIndex</span>(){" "}
                  <span className="text-gray-400">{`{ ✓ }`}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <span className="text-green-400">function</span>{" "}
                  <span className="text-blue-300">deployChatInterface</span>(){" "}
                  <span className="text-gray-400">{`{ ✓ }`}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <span className="text-purple-300">rag</span>.
                  <span className="text-yellow-300">generateResponse</span>
                  (query, context)
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-semibold text-green-800 text-sm">
                    Backend API
                  </span>
                </div>
                <p className="text-green-700 text-xs">99.9% uptime</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-semibold text-blue-800 text-sm">
                    Frontend UI
                  </span>
                </div>
                <p className="text-blue-700 text-xs">Responsive design</p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                "Security Audit",
                "Performance Test",
                "User Acceptance",
                "Load Testing",
              ].map((test, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200 shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-green-800 font-medium text-sm">
                    {test}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <TestTube className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-800">
                  Test Resultaten
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-700">99.8%</div>
                  <div className="text-xs text-purple-600">Nauwkeurigheid</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-700">
                    &lt;200ms
                  </div>
                  <div className="text-xs text-purple-600">Response tijd</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-700">0 bugs</div>
                  <div className="text-xs text-purple-600">Kritieke issues</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="h-32 flex items-end gap-3 p-4 bg-gradient-to-t from-slate-100 to-white border border-slate-2 00 rounded-lg">
              {[30, 45, 60, 80, 95].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                  className="flex-1 bg-gradient-to-t from-red-500 to-pink-500 rounded-t-lg shadow-sm relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent"></div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                <div className="text-lg font-bold text-green-700">95%</div>
                <div className="text-xs text-green-600">Adoptie rate</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-700">3 weken</div>
                <div className="text-xs text-blue-600">Uitrol tijd</div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-700">450%</div>
                <div className="text-xs text-purple-600">ROI</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="bg-finit-aurora min-h-screen">
      {/* === Full-page Overlay Popup === */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="site-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Modal content */}
            <motion.div
              className="relative mx-4 max-w-lg w-full rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl text-white"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              {/* Close (optional — remove to make non-dismissible) */}
              {/* <button
                onClick={() => setShowOverlay(false)}
                aria-label="Close maintenance notice"
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/15 transition"
              >
                <X className="h-5 w-5" />
              </button> */}

              <div className="p-8 md:p-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 border border-white/25 shadow">
                  <motion.span
                    aria-hidden="true"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                    className="inline-flex"
                  >
                    <Cog className="h-8 w-8" />
                  </motion.span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light tracking-wide">
                  We are currently still working on our website
                </h2>
                <p className="mt-3 text-white/80">
                  Some areas may be incomplete while we polish the experience.
                </p>

                {/* Optional action row */}
                <div className="mt-7 flex justify-center">
  <a
    href="/"
    className="px-6 py-3 rounded-xl bg-white text-slate-900 font-medium shadow hover:shadow-lg transition border border-white/50"
  >
    Go Back
  </a>
</div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* === End Full-page Overlay Popup === */}

      {/* Enhanced Hero Section */}
      <section
        className={`relative overflow-hidden ${
          activeStep ? "pt-10 md:pt-14 pb-16 md:pb-20" : "py-24 md:py-32"
        }`}
      >
        {/* Sophisticated floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/8 to-blue-500/8 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/6 to-primary/6 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/4 to-yellow-500/4 rounded-full blur-3xl animate-float-fast"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30 mb-8 backdrop-blur-sm shadow-lg">
              <Cog className="h-4 w-4 mr-2" />
              <span>Strategische Excellentie</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extralight mb-12 text-center text-white tracking-tight leading-tight"
          >
            Van Idee tot{" "}
            <span className="font-light bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
              Impact
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-xl md:text-2xl mb-16 max-w-5xl mx-auto text-center leading-relaxed font-light tracking-wide"
          >
            Digitale ambities omzetten in meetbare bedrijfsresultaten door
            methodische excellentie en innovatieve engineering.
          </motion.p>

          {/* Enhanced Step Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-7xl mx-auto mb-12"
          >
            {/* Sticky container so the buttons stay visible */}
            <div className="sticky top-24 md:top-28 z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = activeStep === step.id;

                  return (
                    <motion.button
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      onClick={() => toggleStep(step.id)}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white/15 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden p-6 text-center hover:bg-white/20 transition-all duration-300 group relative ${
                        isActive
                          ? "ring-2 ring-white/50 bg-white/25 shadow-2xl"
                          : ""
                      }`}
                    >
                      {/* Gradient overlay for active state */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/10 rounded-2xl"></div>
                      )}

                      {/* Step Icon */}
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.accent} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 mx-auto relative z-10`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <span className="text-white font-bold text-sm">
                          {step.id}
                        </span>
                      </div>

                      {/* Step Content */}
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-white/70 text-sm font-light mb-4">
                          {step.subtitle}
                        </p>

                        {/* Expand indicator */}
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="text-white/60 group-hover:text-white/80 transition-colors"
                        >
                          <ChevronDown className="h-5 w-5 mx-auto" />
                        </motion.div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Full-Width Expanded Content */}
            <AnimatePresence mode="wait">
              {activeStep && (
                <motion.div
                  key={activeStep}
                  ref={expandedRef}
                  className="w-full scroll-mt-24 md:scroll-mt-32"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 shadow-2xl p-8 md:p-12 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 rounded-3xl"></div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                      {/* Left Column - Process Details */}
                      <div className="space-y-8">
                        {/* Header */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${
                                processSteps[activeStep - 1]?.accent
                              } flex items-center justify-center shadow-lg`}
                            >
                              {(() => {
                                const ActiveIcon =
                                  processSteps[activeStep - 1]?.icon;
                                return ActiveIcon ? (
                                  <ActiveIcon className="h-8 w-8 text-white" />
                                ) : null;
                              })()}
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-white">
                                Fase {activeStep}
                              </div>
                              <div className="text-white/80">
                                {processSteps[activeStep - 1]?.subtitle}
                              </div>
                            </div>
                          </div>

                          <h2 className="text-3xl md:text-4xl font-bold text-white">
                            {processSteps[activeStep - 1]?.title}
                          </h2>

                          <p className="text-white/90 text-lg leading-relaxed">
                            {processSteps[activeStep - 1]?.description}
                          </p>
                        </div>

                        {/* Process Details */}
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                            <Zap className="h-5 w-5 text-yellow-300" />
                            Onze Aanpak
                          </h3>
                          <div className="space-y-4">
                            {processSteps[activeStep - 1]?.details.map(
                              (detail, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: i * 0.1,
                                  }}
                                  className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shadow flex-shrink-0 mt-0.5">
                                    <span className="text-white text-sm font-bold">
                                      {i + 1}
                                    </span>
                                  </div>
                                  <span className="text-white/90 font-medium leading-relaxed">
                                    {detail}
                                  </span>
                                </motion.div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Metrics */}
                        {processSteps[activeStep - 1]?.metrics && (
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                              <BarChart3 className="h-5 w-5 text-green-300" />
                              Resultaat Metrics
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                              {Object.entries(
                                processSteps[activeStep - 1]?.metrics || {}
                              ).map(([key, value], i) => (
                                <motion.div
                                  key={key}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: 0.3 + i * 0.1,
                                  }}
                                  className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                                >
                                  <div className="text-2xl font-bold text-white mb-1">
                                    {value}
                                  </div>
                                  <div className="text-white/70 text-xs capitalize">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Client Case & Visual */}
                      <div className="space-y-6">
                        {/* Client Case */}
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/25 to-white/15 flex items-center justify-center border border-white/30 shadow-lg">
                              <Target className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">
                              Juridisch Technologie Bedrijf
                            </h3>
                          </div>

                          <div className="space-y-6">
                            <div className="p-4 bg-red-500/10 border border-red-300/30 rounded-lg">
                              <h4 className="font-semibold text-red-200 mb-2 flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-400"></div>
                                Uitdaging
                              </h4>
                              <p className="text-red-100 text-sm leading-relaxed">
                                {processSteps[activeStep - 1]?.useCase}
                              </p>
                            </div>

                            <div className="p-4 bg-blue-500/10 border border-blue-300/30 rounded-lg">
                              <h4 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                                Oplossing
                              </h4>
                              <p className="text-blue-100 text-sm leading-relaxed">
                                {processSteps[activeStep - 1]?.solution}
                              </p>
                            </div>

                            <div className="p-4 bg-green-500/10 border border-green-300/30 rounded-lg">
                              <h4 className="font-semibold text-green-200 mb-2 flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-green-400"></div>
                                Resultaat
                              </h4>
                              <p className="text-green-100 text-sm leading-relaxed">
                                {processSteps[activeStep - 1]?.outcome}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Visual Example */}
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                              <span className="text-white text-sm">📊</span>
                            </div>
                            Visueel Voorbeeld
                          </h3>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
                            {renderStepVisual(activeStep)}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 md:py-32 relative">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-medium"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-white tracking-tight">
              Waarom ons proces werkt
            </h2>
            <p className="text-white/80 text-xl max-w-4xl mx-auto mb-20 font-light leading-relaxed tracking-wide">
              Bewezen resultaten door een gestructureerde aanpak, continue
              samenwerking en focus op meetbare impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Users,
                title: "Echte samenwerking",
                description:
                  "We werken niet voor u, maar met u — uw expertise gecombineerd met onze technische kennis voor optimale resultaten.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Clock,
                title: "Snelle resultaten",
                description:
                  "Door onze agile aanpak ziet u snel concrete vooruitgang en kunt u tijdig bijsturen voor maximale impact.",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: TrendingUp,
                title: "Meetbare impact",
                description:
                  "Elke oplossing wordt gebouwd met duidelijke KPI's en meetbare verbeteringen die uw ROI aantonen.",
                color: "from-purple-500 to-violet-600",
              },
            ].map((benefit, i) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  className="group"
                >
                  <Card className="h-full bg-white/15 backdrop-blur-xl border border-white/25 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <CardContent className="p-10 text-center relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl`}
                      >
                        <BenefitIcon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-light mb-6 text-white tracking-wide group-hover:text-white/90 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-white/80 font-light leading-relaxed tracking-wide text-base">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-32 relative">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-white/8 via-primary/8 to-blue-500/8 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-white tracking-tight">
              Klaar voor{" "}
              <span className="font-light bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
                Excellentie
              </span>
              ?
            </h2>
            <p className="text-white/80 text-xl mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Transformeer uw digitale visie in meetbare bedrijfsimpact. Uw
              ambitie verdient uitzonderlijke uitvoering.
            </p>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectRequestDialog
                buttonText="Begin Uw Transformatie"
                buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-12 py-5 rounded-2xl font-medium group"
              />
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-8 mt-12 text-white/60"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
