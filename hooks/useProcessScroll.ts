"use client";

import { useEffect, useCallback, useState } from "react";

/**
 * useProcessScroll Hook
 * Manages scroll-based progress tracking and step visibility
 */
export function useProcessScroll(
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  isPlaying: boolean
) {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(new Set([0]));

  const updateScrollProgress = useCallback(() => {
    const windowHeight = window.innerHeight;

    // Update visible steps
    const newVisibleSteps = new Set<number>();
    stepRefs.current.forEach((stepRef, index) => {
      if (stepRef) {
        const stepRect = stepRef.getBoundingClientRect();
        if (stepRect.top <= windowHeight * 0.8) {
          newVisibleSteps.add(index);
        }
      }
    });
    setVisibleSteps(newVisibleSteps);

    // Update active step (only when not auto-playing)
    if (!isPlaying) {
      let newActiveStep = 0;
      stepRefs.current.forEach((stepRef, index) => {
        if (stepRef) {
          const stepRect = stepRef.getBoundingClientRect();
          if (stepRect.top <= windowHeight * 0.5) {
            newActiveStep = index;
          }
        }
      });
      setActiveStep(newActiveStep);
    }
  }, [isPlaying, stepRefs]);

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);
    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();
    
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [updateScrollProgress]);

  return {
    activeStep,
    setActiveStep,
    visibleSteps
  };
}