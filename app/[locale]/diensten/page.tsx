"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Lightbulb, Code, TestTube, Rocket, ChevronRight, Cog, ArrowDown, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useProcessScroll } from "@/hooks/useProcessScroll";
import { useProcessAutoplay } from "@/hooks/useProcessAutoplay";
import { useTranslations } from 'next-intl';

const processSteps = [
  {
    id: 1,
    icon: Search,
    accent: "from-blue-500 to-blue-600",
    visual: "analysis"
  },
  {
    id: 2,
    icon: Lightbulb,
    accent: "from-amber-500 to-orange-500",
    visual: "design"
  },
  {
    id: 3,
    icon: Code,
    accent: "from-green-500 to-emerald-600",
    visual: "development"
  },
  {
    id: 4,
    icon: TestTube,
    accent: "from-purple-500 to-violet-600",
    visual: "testing"
  },
  {
    id: 5,
    icon: Rocket,
    accent: "from-red-500 to-pink-600",
    visual: "launch"
  }
];

export default function DienstenPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const processRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

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
              <span>{t('diensten.hero.badge')}</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-extralight mb-12 text-center text-white tracking-tight"
          >
            {t('diensten.hero.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-2xl mb-20 max-w-5xl mx-auto text-center leading-relaxed font-light tracking-wide"
          >
            {t('diensten.hero.description')}
          </motion.p>

          {/* Compact Process Overview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-6xl mx-auto mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {/* Magic Curved Path */}
              <svg 
                className="absolute top-1/2 left-0 w-full h-24 pointer-events-none hidden md:block"
                viewBox="0 0 1000 100"
                fill="none"
                style={{ transform: 'translateY(-50%)' }}
              >
                <path
                  d="M50 50 Q250 20 450 50 T950 50"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  strokeDasharray="8,8"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>

              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = selectedStep === index;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center group cursor-pointer relative z-10"
                    onClick={() => setSelectedStep(isActive ? null : index)}
                  >
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      {/* Active ring indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 1 }}
                          className="absolute inset-0 rounded-2xl border-2 border-white/60 animate-pulse"
                        />
                      )}
                      
                      {/* Glass morphism container */}
                      <motion.div 
                        className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl transition-all duration-500"
                        whileHover={{ scale: 1.05, y: -4 }}
                        animate={{ 
                          scale: isActive ? 1.1 : 1,
                          boxShadow: isActive ? '0 25px 50px -12px rgba(255,255,255,0.25)' : '0 10px 25px -5px rgba(0,0,0,0.1)'
                        }}
                      />
                      
                      {/* Icon container */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/25 to-white/10 flex items-center justify-center border border-white/40 shadow-lg">
                          <IconComponent className="h-7 w-7 text-white drop-shadow-sm" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-white tracking-wide group-hover:text-white/90 transition-colors duration-300">
                        {t(`diensten.steps.${step.id}.title`)}
                      </div>
                      <div className="text-sm text-white/80 font-light tracking-wide leading-relaxed">
                        {t(`diensten.steps.${step.id}.subtitle`)}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 bg-white/15 backdrop-blur-xl rounded-xl p-6 border border-white/25 shadow-xl"
                      >
                        <p className="text-white/90 text-sm leading-relaxed mb-4">
                          {t(`diensten.steps.${step.id}.description`)}
                        </p>
                        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                          <h5 className="text-white font-medium text-xs mb-2">Client Case:</h5>
                          <p className="text-white/80 italic text-xs leading-relaxed">
                            "{t(`diensten.steps.${step.id}.usecase`)}"
                          </p>
                        </div>
                      </motion.div>
                    )}
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
              <span className="text-base font-light tracking-wide">{t('diensten.hero.scroll')}</span>
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

      {/* Consolidated Success Story */}
      <section ref={processRef} className="py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white tracking-tight">
              {t('diensten.caseStudy.title')}
            </h2>
            <p className="text-white/80 text-xl max-w-4xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
              {t('diensten.caseStudy.subtitle')}
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Challenge & Solution */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4">Challenge</h3>
                  <p className="text-white/90 leading-relaxed">
                    {t('diensten.caseStudy.challenge')}
                  </p>
                </div>

                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4">Solution</h3>
                  <p className="text-white/90 leading-relaxed">
                    {t('diensten.caseStudy.solution')}
                  </p>
                </div>
              </motion.div>

              {/* Results Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { key: 'efficiency', icon: '⚡' },
                  { key: 'adoption', icon: '👥' },
                  { key: 'accuracy', icon: '🎯' },
                  { key: 'time', icon: '⏱️' }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-xl text-center"
                  >
                    <div className="text-3xl mb-3">{metric.icon}</div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {t(`diensten.caseStudy.results.${metric.key}`)}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
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
              {t('diensten.benefits.title')}
            </h2>
            <p className="text-white/80 text-xl max-w-4xl mx-auto mb-20 font-light leading-relaxed tracking-wide">
              {t('diensten.benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {['collaboration', 'speed', 'impact'].map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/25 hover:shadow-3xl transition-all duration-500"
              >
                <h3 className="text-xl font-light mb-6 text-white tracking-wide">
                  {t(`diensten.benefits.items.${benefit}.title`)}
                </h3>
                <p className="text-white/80 font-light leading-relaxed tracking-wide text-base">
                  {t(`diensten.benefits.items.${benefit}.description`)}
                </p>
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
              {t('diensten.cta.title')}
            </h2>
            <p className="text-white/80 text-xl mb-12 leading-relaxed font-light">
              {t('diensten.cta.description')}
            </p>
            
            <ProjectRequestDialog 
              buttonText={t('diensten.cta.button')}
              buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-4 rounded-2xl font-medium"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}