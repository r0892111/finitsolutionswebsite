"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Lightbulb, Code, TestTube, Rocket, ChevronRight, Cog, ArrowDown, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useProcessScroll } from "@/hooks/useProcessScroll";
import { useProcessAutoplay } from "@/hooks/useProcessAutoplay";

const processSteps = [
  {
    id: 1,
    title: "Probleem Identificatie",
    subtitle: "Ontdekken & Analyseren",
    description: "We beginnen met een grondige analyse van uw huidige situatie en identificeren de kernuitdagingen.",
    icon: Search,
    accent: "from-blue-500 to-blue-600",
    details: [
      "Uitgebreide stakeholder interviews",
      "Analyse van bestaande systemen en workflows",
      "Identificatie van pijnpunten en inefficiënties",
      "Documentatie van huidige processen"
    ],
    useCase: "Een advocatenkantoor worstelt met het snel vinden van relevante juridische informatie verspreid over verschillende documenten en systemen.",
    visual: "analysis"
  },
  {
    id: 2,
    title: "Oplossing Ontwerp",
    subtitle: "Strategisch Plannen",
    description: "Op basis van onze bevindingen ontwerpen we een op maat gemaakte oplossing die perfect aansluit bij uw behoeften.",
    icon: Lightbulb,
    accent: "from-amber-500 to-orange-500",
    details: [
      "Technische architectuur en systeemontwerp",
      "User experience en interface planning",
      "Integratiestrategie met bestaande systemen",
      "Projectplanning en milestone definitie"
    ],
    useCase: "We stellen een AI-gedreven kennisbank voor die alle juridische documenten indexeert en doorzoekbaar maakt via natuurlijke taal.",
    visual: "design"
  },
  {
    id: 3,
    title: "Ontwikkeling",
    subtitle: "Bouwen & Integreren",
    description: "Ons ervaren team bouwt uw oplossing met de nieuwste technologieën en best practices.",
    icon: Code,
    accent: "from-green-500 to-emerald-600",
    details: [
      "Agile ontwikkeling met regelmatige updates",
      "Moderne technologieën en frameworks",
      "Veilige en schaalbare architectuur",
      "Continue integratie en deployment"
    ],
    useCase: "We ontwikkelen een RAG-systeem dat documenten ingesteert, indexeert en een intuïtieve chat-interface biedt voor juridische zoekopdrachten.",
    visual: "development"
  },
  {
    id: 4,
    title: "Testing & Validatie",
    subtitle: "Kwaliteit Verzekeren",
    description: "Uitgebreide tests zorgen ervoor dat uw oplossing perfect functioneert voordat we live gaan.",
    icon: TestTube,
    accent: "from-purple-500 to-violet-600",
    details: [
      "Geautomatiseerde en handmatige testing",
      "Performance en security audits",
      "User acceptance testing",
      "Bug fixes en optimalisaties"
    ],
    useCase: "We testen de zoeknauwkeurigheid, gebruikersinterface en beveiligingsprotocollen met echte juridische cases.",
    visual: "testing"
  },
  {
    id: 5,
    title: "Lancering & Ondersteuning",
    subtitle: "Live Gaan & Groeien",
    description: "We lanceren uw oplossing en bieden continue ondersteuning voor optimale prestaties.",
    icon: Rocket,
    accent: "from-red-500 to-pink-600",
    details: [
      "Geleidelijke uitrol en go-live ondersteuning",
      "Training en documentatie voor gebruikers",
      "Monitoring en performance optimalisatie",
      "Continue ondersteuning en updates"
    ],
    useCase: "Het systeem wordt gelanceerd met training voor alle advocaten, en we monitoren de prestaties om verder te optimaliseren.",
    visual: "launch"
  }
];

export default function DienstenPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const processRef = useRef<HTMLDivElement>(null);

  const { activeStep, setActiveStep, visibleSteps } = useProcessScroll(stepRefs, isPlaying);

  useProcessAutoplay(isPlaying, hasStarted, activeStep, setActiveStep, setIsPlaying, processSteps.length);

  const handlePlay = () => {
    setIsPlaying(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setHasStarted(false);
    setActiveStep(0);
  };

  const scrollToProcess = () => {
    processRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-finit-aurora min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30 mb-8 backdrop-blur-sm">
              <Cog className="h-4 w-4 mr-2" />
              <span>Maatwerk proces</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-extralight mb-12 text-center text-white tracking-tight"
          >
            Van Idee tot Impact
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-2xl mb-20 max-w-5xl mx-auto text-center leading-relaxed font-light tracking-wide"
          >
            Ontdek hoe wij samen met u van uitdaging naar oplossing gaan — kort, duidelijk en
            resultaatgericht.
          </motion.p>

          {/* Process Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-6xl mx-auto mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center group cursor-pointer"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      {/* Professional glass morphism container */}
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105" />
                      
                      {/* Icon container with brand colors */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/25 to-white/10 flex items-center justify-center border border-white/40 shadow-lg">
                          <IconComponent className="h-7 w-7 text-white drop-shadow-sm" />
                        </div>
                      </div>
                      
                      {/* Subtle accent ring */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-white tracking-wide group-hover:text-white/90 transition-colors duration-300">
                        {step.title}
                      </div>
                      <div className="text-base text-white/80 font-light tracking-wide leading-relaxed">
                        {step.subtitle}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <button
              onClick={scrollToProcess}
              className="group flex flex-col items-center gap-3 mx-auto text-white/80 hover:text-white transition-colors duration-300"
            >
              <span className="text-base font-light tracking-wide">Ontdek het proces</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center group-hover:border-white transition-colors duration-300"
              >
                <ArrowDown className="h-5 w-5" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section ref={processRef} className="relative py-20 md:py-32">
        {/* Progress Bar */}
        <div className="absolute left-6 top-0 z-40 hidden lg:block">
          <div className="absolute w-1 bg-white/20 rounded-full" style={{ height: '100%' }} />
          <motion.div
            className="absolute w-1 bg-gradient-to-b from-white to-white/60 rounded-full"
            style={{
              height: `${(activeStep / (processSteps.length - 1)) * 100}%`
            }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Process Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-white tracking-tight">
              Ons Bewezen Proces
            </h2>
            <p className="text-white/80 text-xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Een gestructureerde aanpak die zorgt voor resultaten
            </p>

            {/* Controls */}
            <div className="flex justify-center gap-6">
            </div>
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-32 max-w-7xl mx-auto">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isVisible = visibleSteps.has(index);
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={step.id}
                  ref={(el) => (stepRefs.current[index] = el)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: isVisible ? 1 : 0.35,
                    y: isVisible ? 0 : 20,
                    scale: isActive ? 1.01 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                  {/* Left Column - Process Info */}
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl step-number-marker">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.accent} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">Stap {step.id}</div>
                        <div className="text-sm text-white/70">{step.subtitle}</div>
                      </div>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-extralight text-white tracking-tight leading-tight">
                      {step.title}
                    </h2>
                    
                    <p className="text-xl text-white/80 font-light leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      {step.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 shadow-lg"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shadow">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <span className="text-white/90 font-medium">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Client Case */}
                  <div className="relative">
                    <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/25">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/25 to-white/15 flex items-center justify-center border border-white/30 shadow-lg">
                          <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-white">Client Case</h4>
                      </div>
                      <p className="text-white/90 italic leading-relaxed mb-6">&ldquo;{step.useCase}&rdquo;</p>
                      
                      {/* Step-specific visual examples */}
                      <div className="mt-6">
                        {step.id === 1 && (
                          <div className="grid grid-cols-1 gap-2">
                            {["Versnipperde info", "Handmatige stappen", "Onvoldoende vindbaarheid"].map((item, i) => (
                              <div key={i} className="flex items-center justify-between rounded-md border border-white/20 px-3 py-2 bg-white/10">
                                <span className="text-sm text-white/80">{item}</span>
                                <span className="text-amber-400">⚠️</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {step.id === 2 && (
                          <div className="grid grid-cols-3 gap-2">
                            {["Scope", "Integraties", "RBAC", "Chat", "E-mail", "Workflows"].map((tag, i) => (
                              <div key={i} className="rounded-md bg-white/20 border border-white/30 px-2 py-2 text-center text-xs font-medium text-white">
                                {tag}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {step.id === 3 && (
                          <div className="rounded-md bg-slate-900/50 text-slate-200 text-xs font-mono p-3 border border-white/20">
                            <div>ingest_sources()</div>
                            <div>index_documents()</div>
                            <div>build_chat_interface()</div>
                            <div>rag.generate(query, context)</div>
                          </div>
                        )}
                        
                        {step.id === 4 && (
                          <div className="flex flex-wrap gap-2">
                            {["Login OK", "RBAC OK", "Kwaliteit ↑", "E-mail voorstel OK"].map((badge, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/30">
                                {badge}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {step.id === 5 && (
                          <div className="h-20 flex items-end gap-2">
                            {[30, 45, 60, 80].map((height, i) => (
                              <div key={i} className="flex-1 bg-white/20 border border-white/30 rounded">
                                <div
                                  className="w-full bg-gradient-to-t from-blue-400 to-white rounded-b"
                                  style={{ height: `${height}%` }}
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

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white tracking-tight">
              Waarom ons proces werkt
            </h2>
            <p className="text-white/80 text-xl max-w-4xl mx-auto mb-20 font-light leading-relaxed tracking-wide">
              Bewezen resultaten door een gestructureerde aanpak, continue samenwerking en focus op meetbare impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Echte samenwerking",
                description: "We werken niet voor u, maar met u — uw expertise gecombineerd met onze technische kennis voor optimale resultaten."
              },
              {
                title: "Snelle resultaten", 
                description: "Door onze agile aanpak ziet u snel concrete vooruitgang en kunt u tijdig bijsturen voor maximale impact."
              },
              {
                title: "Meetbare impact",
                description: "Elke oplossing wordt gebouwd met duidelijke KPI's en meetbare verbeteringen die uw ROI aantonen."
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/25 hover:shadow-3xl transition-all duration-500"
              >
                <h3 className="text-xl font-light mb-6 text-white tracking-wide">{benefit.title}</h3>
                <p className="text-white/80 font-light leading-relaxed tracking-wide text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-white tracking-tight">
              Klaar voor Excellentie?
            </h2>
            <p className="text-white/80 text-xl mb-12 leading-relaxed font-light">
              Transformeer uw digitale visie in meetbare bedrijfsimpact. Uw ambitie verdient uitzonderlijke uitvoering.
            </p>
            
            <ProjectRequestDialog 
              buttonText="Begin Uw Transformatie"
              buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-4 rounded-2xl font-medium"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}