"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Lightbulb, Code, TestTube, Rocket, ChevronRight, Cog, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useLanguage } from "@/contexts/language-context";

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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { t } = useLanguage();

  const toggleStep = (stepId: number) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  const renderStepVisual = (stepId: number) => {
    switch (stepId) {
      case 1:
        return (
          <div className="grid grid-cols-1 gap-3">
            {["Versnipperde info", "Handmatige stappen", "Onvoldoende vindbaarheid"].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <span className="text-sm text-red-800 font-medium">{item}</span>
                <span className="text-red-500 text-lg">⚠</span>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-3 gap-3">
            {["Scope", "Integraties", "RBAC", "Chat", "E-mail", "Workflows"].map((tag, i) => (
              <div key={i} className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-center text-sm font-medium text-amber-800">
                {tag}
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="rounded-lg bg-slate-900 text-slate-200 text-sm font-mono p-4 border border-slate-700">
            <div className="space-y-1">
              <div><span className="text-green-400">function</span> <span className="text-blue-300">ingestSources</span>() {`{}`}</div>
              <div><span className="text-green-400">function</span> <span className="text-blue-300">indexDocuments</span>() {`{}`}</div>
              <div><span className="text-green-400">function</span> <span className="text-blue-300">buildChatInterface</span>() {`{}`}</div>
              <div><span className="text-purple-300">rag</span>.<span className="text-yellow-300">generate</span>(query, context)</div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-wrap gap-2">
            {["Login OK", "RBAC OK", "Kwaliteit ↑", "E-mail voorstel OK"].map((badge, i) => (
              <span key={i} className="text-sm px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
                {badge}
              </span>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="h-24 flex items-end gap-3">
            {[30, 45, 60, 80].map((height, i) => (
              <div key={i} className="flex-1 bg-blue-50 border border-blue-200 rounded-t-lg overflow-hidden">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="bg-finit-aurora min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30 mb-8 backdrop-blur-sm">
              <Cog className="h-4 w-4 mr-2" />
              <span>{t('diensten.hero.badge')}</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extralight mb-12 text-center text-white tracking-tight"
          >
            {t('diensten.hero.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-xl mb-16 max-w-4xl mx-auto text-center leading-relaxed font-light tracking-wide"
          >
            {t('diensten.hero.description')}
          </motion.p>

          {/* Interactive Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = activeStep === step.id;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden h-fit"
                  >
                    {/* Step Header - Always Visible */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full p-4 md:p-6 text-left hover:bg-white/5 transition-all duration-300 group"
                    >
                      <div className="flex flex-col items-center text-center">
                          {/* Step Icon and Number */}
                          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${step.accent} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-3`}>
                            <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-white" />
                          </div>
                          
                          <div className="text-sm md:text-lg font-bold text-white/80 mb-2">
                            Stap {step.id}
                          </div>
                          
                          {/* Step Title and Subtitle */}
                          <div className="mb-3">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                              {t(`diensten.step${step.id}.title`)}
                            </h3>
                            <p className="text-white/70 text-sm md:text-base font-light">
                              {t(`diensten.step${step.id}.subtitle`)}
                            </p>
                          </div>
                        
                        {/* Expand/Collapse Icon */}
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="text-white/60 group-hover:text-white/80 transition-colors"
                        >
                          <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
                        </motion.div>
                      </div>
                    </button>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-6 pb-6">
                            <div className="border-t border-white/20 pt-8">
                              <div className="space-y-6">
                                {/* Left Column - Process Details */}
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-lg font-bold text-white mb-3">
                                      Wat we doen:
                                    </h4>
                                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
                                      {t(`diensten.step${step.id}.description`)}
                                    </p>
                                  </div>

                                  <div className="space-y-3">
                                    <h5 className="text-base font-semibold text-white">
                                      Onze aanpak:
                                    </h5>
                                    <div className="space-y-2">
                                      {[1, 2, 3, 4].map((detailNum, i) => (
                                        <motion.div
                                          key={i}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.4, delay: i * 0.1 }}
                                          className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                                        >
                                          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shadow">
                                            <span className="text-white text-xs font-bold">✓</span>
                                          </div>
                                          <span className="text-white/90 font-medium text-sm">
                                            {t(`diensten.step${step.id}.detail${detailNum}`)}
                                          </span>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column - Client Case & Visual */}
                                <div className="space-y-4">
                                  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-xl">
                                    <div className="flex items-center gap-3 mb-4">
                                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/25 to-white/15 flex items-center justify-center border border-white/30 shadow-lg">
                                        <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
                                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                        </div>
                                      </div>
                                      <h4 className="text-base font-bold text-white">{t('diensten.clientcase')}</h4>
                                    </div>
                                    <p className="text-white/90 italic leading-relaxed mb-4 text-sm">
                                      &ldquo;{t(`diensten.step${step.id}.usecase`)}&rdquo;
                                    </p>
                                    
                                    {/* Step-specific visual examples */}
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.4, delay: 0.2 }}
                                      className="mt-4"
                                    >
                                      {renderStepVisual(step.id)}
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
            </div>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-white tracking-tight">
              {t('diensten.benefits.title')}
            </h2>
            <p className="text-white/80 text-xl max-w-4xl mx-auto mb-20 font-light leading-relaxed tracking-wide">
              {t('diensten.benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: t('diensten.benefits.collaboration.title'),
                description: t('diensten.benefits.collaboration.description')
              },
              {
                title: t('diensten.benefits.speed.title'),
                description: t('diensten.benefits.speed.description')
              },
              {
                title: t('diensten.benefits.impact.title'),
                description: t('diensten.benefits.impact.description')
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
              {t('diensten.cta.final.title')}
            </h2>
            <p className="text-white/80 text-xl mb-12 leading-relaxed font-light">
              {t('diensten.cta.final.description')}
            </p>
            
            <ProjectRequestDialog 
              buttonText={t('diensten.cta.final.button')}
              buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-4 rounded-2xl font-medium"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}