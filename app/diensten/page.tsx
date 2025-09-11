"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Lightbulb, Code, TestTube, Rocket, ArrowDown, Cog, ChevronRight } from "lucide-react";
import { ProcessHero } from "@/components/diensten/ProcessHero";
import { ProcessStep } from "@/components/diensten/ProcessStep";
import { ProcessNavigation } from "@/components/diensten/ProcessNavigation";
import { ProcessBenefits } from "@/components/process/ProcessBenefits";
import { ProcessControls } from "@/components/process/ProcessControls";
import { useProcessScroll } from "@/hooks/useProcessScroll";
import { useProcessAutoplay } from "@/hooks/useProcessAutoplay";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { processSteps } from "@/lib/diensten/process-data";

export default function DienstenPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const processRef = useRef<HTMLDivElement>(null);

  const { activeStep, setActiveStep, visibleSteps } = useProcessScroll(stepRefs, isPlaying);

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

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setHasStarted(false);
    setActiveStep(0);
    if (stepRefs.current[0]) {
      stepRefs.current[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const scrollToProcess = () => {
    if (processRef.current) {
      processRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="pt-20 bg-finit-aurora min-h-screen font-general-sans">
      {/* Hero Section with Aurora Background */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 mt-12 flex w-full items-center justify-center gap-6 md:gap-8"
            >
              <div className="text-center min-w-0 flex-1">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30 mb-8">
                  <Cog className="h-4 w-4 mr-2" />
                  <span>Tailored IT Solutions</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </div>
                
                <h1 className="finit-h1 text-white mb-4">
                  Van Idee tot <span className="finit-highlight">Impact</span>
                </h1>
                <p className="finit-body text-white/90 max-w-3xl mx-auto">
                  Ontdek hoe wij samen met u van uitdaging naar oplossing gaan — kort, duidelijk en resultaatgericht
                </p>
              </div>
            </motion.div>

            {/* Process Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-5xl mx-auto mb-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      className="text-center group"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 border border-white/30">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-sm font-medium text-white mb-2">{step.title}</div>
                      <div className="text-xs text-white/80 font-light">{step.subtitle}</div>
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
                <span className="text-sm font-light tracking-wide">Ontdek het proces</span>
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
        </div>
      </section>

      {/* Process Steps Section with Aurora Background */}
      <section ref={processRef} className="relative py-20 md:py-32 bg-finit-aurora">
        <div className="container mx-auto px-4 relative">
          {/* Process Controls */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white tracking-tight">
                Ons Bewezen Proces
              </h2>
              <p className="text-white/90 text-xl max-w-4xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
                Een gestructureerde aanpak die uw digitale ambities omzet in meetbare bedrijfsresultaten
              </p>
            </motion.div>

            <ProcessControls
              isPlaying={isPlaying}
              hasStarted={hasStarted}
              onPlay={handlePlay}
              onPause={handlePause}
              onReset={handleReset}
            />
          </div>

          {/* Progress Navigation */}
          <ProcessNavigation
            activeStep={activeStep}
            totalSteps={processSteps.length}
            visibleSteps={visibleSteps}
            stepRefs={stepRefs}
          />

          {/* Process Steps */}
          <div className="space-y-32 md:space-y-40 relative z-20">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                className="min-h-[600px] flex items-center"
              >
                <ProcessStep
                  step={step}
                  index={index}
                  isVisible={visibleSteps.has(index)}
                  isActive={activeStep === index}
                  layout={index === 0 ? 'default' : index === 1 ? 'centered' : index === 2 ? 'asymmetric' : index === 3 ? 'three-column' : 'reversed'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Aurora Background */}
      <section className="py-20 md:py-32 bg-finit-aurora relative overflow-hidden">
        <ProcessBenefits />
      </section>

      {/* CTA Section with Aurora Background */}
      <section className="py-20 md:py-28 bg-finit-aurora relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white tracking-tight">
              Klaar voor Excellentie?
            </h2>
            <p className="text-white/90 text-xl mb-12 font-light leading-relaxed tracking-wide max-w-3xl mx-auto">
              Transformeer uw digitale visie in meetbare bedrijfsimpact. Uw ambitie verdient uitzonderlijke uitvoering.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <ProjectRequestDialog 
                buttonText="Begin Uw Transformatie" 
                buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 font-medium px-10 py-4 rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}