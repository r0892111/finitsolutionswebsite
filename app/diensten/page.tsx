"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Lightbulb, Code, TestTube, Rocket, ChevronRight, Cog, ArrowDown, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useLanguage } from "@/contexts/language-context";

const processSteps = [
  {
    id: 1,
    title: "Discovery",
    subtitle: "Analyse & Inzicht",
    icon: Search,
    accent: "from-blue-500 to-blue-600",
    keyPoint: "Stakeholder interviews & procesanalyse",
    outcome: "Duidelijk beeld van uitdagingen"
  },
  {
    id: 2,
    title: "Design",
    subtitle: "Architectuur & Planning",
    icon: Lightbulb,
    accent: "from-amber-500 to-orange-500",
    keyPoint: "Technische blauwdruk & UX ontwerp",
    outcome: "Gedetailleerd implementatieplan"
  },
  {
    id: 3,
    title: "Development",
    subtitle: "Bouwen & Integreren",
    icon: Code,
    accent: "from-green-500 to-emerald-600",
    keyPoint: "Agile ontwikkeling & moderne tech",
    outcome: "Werkende oplossing met integraties"
  },
  {
    id: 4,
    title: "Testing",
    subtitle: "Kwaliteit & Validatie",
    icon: TestTube,
    accent: "from-purple-500 to-violet-600",
    keyPoint: "Uitgebreide tests & optimalisatie",
    outcome: "Gevalideerde, productie-klare oplossing"
  },
  {
    id: 5,
    title: "Launch",
    subtitle: "Live & Ondersteuning",
    icon: Rocket,
    accent: "from-red-500 to-pink-600",
    keyPoint: "Geleidelijke uitrol & training",
    outcome: "Succesvolle adoptie & continue groei"
  }
];

export default function DienstenPage() {
  const [activeStep, setActiveStep] = useState(0);
  const processRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stepsRef, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  const scrollToProcess = () => {
    processRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-finit-aurora min-h-screen">
      {/* Compact Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
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
            className="finit-h1 mb-8 text-center text-white"
          >
            {t('diensten.hero.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="finit-body text-white/90 mb-16 max-w-4xl mx-auto text-center"
          >
            {t('diensten.hero.description')}
          </motion.p>

          {/* Compact Process Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="grid grid-cols-5 gap-4">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center group cursor-pointer"
                    onClick={() => setActiveStep(index)}
                  >
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-r ${step.accent} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${activeStep === index ? 'ring-4 ring-white/50' : ''}`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="finit-body font-medium text-white text-sm">{step.title}</div>
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
              className="group flex flex-col items-center gap-3 mx-auto text-white/80 hover:text-white transition-colors duration-300 finit-body"
            >
              <span>{t('diensten.hero.scroll')}</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center group-hover:border-white transition-colors duration-300"
              >
                <ArrowDown className="h-4 w-4" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Compact Process Steps with Magic Scrolling Path */}
      <section ref={processRef} className="relative py-20">
        {/* Magic Curved Path SVG */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 1200 800" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
              </linearGradient>
            </defs>
            <path
              d="M 100 150 Q 300 100 500 200 T 900 300 Q 1000 350 1100 400"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          {/* Process Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="finit-h1 mb-4 text-white">
              {t('diensten.process.title')}
            </h2>
            <p className="finit-body text-white/80 max-w-3xl mx-auto">
              {t('diensten.process.subtitle')}
            </p>
          </motion.div>

          {/* Compact Steps Grid */}
          <div ref={stepsRef} className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative cursor-pointer group ${isActive ? 'lg:col-span-2' : ''}`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Card */}
                  <div className={`bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-xl hover:shadow-2xl transition-all duration-500 h-full ${isActive ? 'ring-2 ring-white/50 scale-105' : 'hover:scale-102'}`}>
                    {/* Step Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.accent} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Stap {step.id}</div>
                        <div className="text-xs text-white/70">{step.subtitle}</div>
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="finit-h2 text-white mb-3">
                      {t(`diensten.step${step.id}.title`)}
                    </h3>

                    {/* Key Point */}
                    <div className="mb-4">
                      <div className="text-sm font-medium text-white/90 mb-2">Kern:</div>
                      <p className="text-sm text-white/80">{step.keyPoint}</p>
                    </div>

                    {/* Outcome */}
                    <div className="mb-4">
                      <div className="text-sm font-medium text-white/90 mb-2">Resultaat:</div>
                      <p className="text-sm text-white/80">{step.outcome}</p>
                    </div>

                    {/* Expanded Content for Active Step */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/20 pt-4 mt-4"
                      >
                        <div className="text-sm font-medium text-white/90 mb-3">Details:</div>
                        <div className="space-y-2">
                          {[1, 2, 3, 4].map((detailNum) => (
                            <div key={detailNum} className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                <span className="text-white text-xs">✓</span>
                              </div>
                              <span className="text-xs text-white/80 leading-relaxed">
                                {t(`diensten.step${step.id}.detail${detailNum}`)}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 p-3 rounded-lg bg-white/10 border border-white/20">
                          <div className="text-xs font-medium text-white/90 mb-2">Client Case:</div>
                          <p className="text-xs text-white/80 italic">
                            "{t(`diensten.step${step.id}.usecase`)}"
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Click Indicator */}
                    {!isActive && (
                      <div className="text-center mt-4">
                        <div className="text-xs text-white/60">Klik voor details</div>
                      </div>
                    )}
                  </div>

                  {/* Connection Line to Next Step */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/30 z-30">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full"></div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Consolidated Client Success Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="finit-h2 text-white mb-2">Succesverhaal</h3>
                <p className="text-white/80">Juridisch Technologie Bedrijf</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">85%</div>
                  <div className="text-sm text-white/80">Minder zoektijd</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">340%</div>
                  <div className="text-sm text-white/80">Betere nauwkeurigheid</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">99.8%</div>
                  <div className="text-sm text-white/80">Systeem betrouwbaarheid</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-white/10 border border-white/20">
                <p className="text-white/90 italic text-center">
                  "Van 4 uur zoeken per advocaat naar 15 minuten - onze juridische kennisbank heeft onze productiviteit getransformeerd."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compact Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="finit-h1 mb-4 text-white">
              {t('diensten.benefits.title')}
            </h2>
            <p className="finit-body text-white/80 max-w-3xl mx-auto mb-12">
              {t('diensten.benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/25 hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="finit-h2 mb-3 text-white">{benefit.title}</h3>
                <p className="finit-body text-white/80">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="finit-h1 mb-4 text-white">
              {t('diensten.cta.final.title')}
            </h2>
            <p className="finit-body text-white/80 mb-8">
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