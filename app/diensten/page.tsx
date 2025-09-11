"use client";

import { useState, useRef } from "react";
import { ProcessHero } from "@/components/diensten/ProcessHero";
import { ProcessStep } from "@/components/diensten/ProcessStep";
import { ProcessBenefits } from "@/components/diensten/ProcessBenefits";
import { ProcessCTA } from "@/components/diensten/ProcessCTA";
import { useProcessScroll } from "@/hooks/useProcessScroll";
import { processSteps } from "@/lib/diensten/process-data";

export default function DienstenPage() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const processRef = useRef<HTMLDivElement>(null);

  const { activeStep, visibleSteps } = useProcessScroll(stepRefs, false);

  const scrollToProcess = () => {
    processRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-finit-aurora min-h-screen">
      {/* Hero Section - Full Screen */}
      <ProcessHero onScrollToProcess={scrollToProcess} />

      {/* Process Steps Section */}
      <section ref={processRef} className="relative py-20 md:py-32">
        {/* Progress Bar */}
        <div className="absolute left-6 top-0 z-40 hidden lg:block">
          <div className="absolute w-1 bg-white/20 rounded-full" style={{ height: '100%' }} />
          <div
            className="absolute w-1 bg-gradient-to-b from-white to-white/60 rounded-full"
            style={{
              height: `${(activeStep / (processSteps.length - 1)) * 100}%`
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Process Steps */}
          <div className="space-y-32 max-w-7xl mx-auto">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                isVisible={visibleSteps.has(index)}
                isActive={activeStep === index}
                stepRef={(el) => (stepRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <ProcessBenefits />

      {/* CTA Section */}
      <ProcessCTA />
    </main>
  );
}