"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  activeStep: number;
  totalSteps: number;
  visibleSteps: Set<number>;
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

/**
 * ProgressBar Component
 * Manages the vertical progress bar that tracks user progress through steps
 */
export function ProgressBar({ activeStep, totalSteps, visibleSteps, stepRefs }: ProgressBarProps) {
  const [barTop, setBarTop] = useState(0);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const updateProgressBar = () => {
      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
      if (steps.length >= 2) {
        const firstRect = steps[0]!.getBoundingClientRect();
        const lastRect = steps[steps.length - 1]!.getBoundingClientRect();

        const start = firstRect.top + window.scrollY + Math.min(48, firstRect.height * 0.15);
        const end = lastRect.top + window.scrollY + lastRect.height - Math.min(48, lastRect.height * 0.15);

        setBarTop(start);
        setBarHeight(Math.max(120, end - start));
      }
    };

    updateProgressBar();
    window.addEventListener("scroll", updateProgressBar);
    window.addEventListener("resize", updateProgressBar);

    return () => {
      window.removeEventListener("scroll", updateProgressBar);
      window.removeEventListener("resize", updateProgressBar);
    };
  }, [stepRefs]);

  return (
    <div className="absolute left-6 top-0 z-40 hidden lg:block">
      {/* Progress rail */}
      <div
        className="absolute w-1 bg-slate-200 rounded-full"
        style={{ top: barTop, height: barHeight }}
      />
      
      {/* Progress fill */}
      <motion.div
        className="absolute w-1 bg-gradient-to-b from-primary to-blue-600 rounded-full"
        style={{
          top: barTop,
          height: `${(activeStep / (totalSteps - 1)) * barHeight}px`
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Progress markers */}
      <ProgressMarkers 
        stepRefs={stepRefs}
        activeStep={activeStep}
        visibleSteps={visibleSteps}
      />
    </div>
  );
}

/**
 * ProgressMarkers Component
 * Renders individual markers for each step on the progress bar
 */
function ProgressMarkers({ 
  stepRefs, 
  activeStep, 
  visibleSteps 
}: {
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  activeStep: number;
  visibleSteps: Set<number>;
}) {
  return (
    <>
      {stepRefs.current.map((el, index) => {
        if (!el) return null;
        
        const stepNumberEl = el.querySelector('.step-number-marker');
        if (!stepNumberEl) return null;
        
        const numberRect = stepNumberEl.getBoundingClientRect();
        const top = numberRect.top + window.scrollY;
        
        const active = activeStep === index;
        const seen = visibleSteps.has(index);
        
        return (
          <motion.div
            key={index}
            className="absolute w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center"
            style={{
              top,
              left: "-16px",
              backgroundColor: seen ? (active ? "#1d4ed8" : "#2563eb") : "#e5e7eb"
            }}
            animate={{ scale: active ? 1.25 : seen ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs font-bold text-white select-none">{index + 1}</span>
          </motion.div>
        );
      })}
    </>
  );
}