"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Lightbulb, Code, TestTube, Rocket, ChevronRight, Cog, ArrowDown, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useProcessScroll } from "@/hooks/useProcessScroll";
import { useProcessAutoplay } from "@/hooks/useProcessAutoplay";
import { processSteps } from "@/lib/diensten/process-data";
import { StepLayoutOne } from "@/components/diensten/step-layouts/StepLayoutOne";
import { StepLayoutTwo } from "@/components/diensten/step-layouts/StepLayoutTwo";
import { StepLayoutThree } from "@/components/diensten/step-layouts/StepLayoutThree";
import { StepLayoutFour } from "@/components/diensten/step-layouts/StepLayoutFour";
import { StepLayoutFive } from "@/components/diensten/step-layouts/StepLayoutFive";


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

              // Use different layout components for each step
              const renderStepLayout = () => {
                switch (step.id) {
                  case 1:
                    return <StepLayoutOne step={step} isEven={index % 2 === 0} />;
                  case 2:
                    return <StepLayoutTwo step={step} isEven={index % 2 === 0} />;
                  case 3:
                    return <StepLayoutThree step={step} isEven={index % 2 === 0} />;
                  case 4:
                    return <StepLayoutFour step={step} isEven={index % 2 === 0} />;
                  case 5:
                    return <StepLayoutFive step={step} isEven={index % 2 === 0} />;
                  default:
                    return null;
                }
              };

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
                  className="relative"
                >
                  {renderStepLayout()}
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