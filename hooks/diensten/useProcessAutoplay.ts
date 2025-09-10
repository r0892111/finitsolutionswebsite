/**
 * Custom hook for managing automatic process step progression
 * Handles play/pause functionality and step timing
 */

import { useEffect } from "react";

export function useProcessAutoplay(
  isPlaying: boolean,
  hasStarted: boolean,
  activeStep: number,
  setActiveStep: (step: number) => void,
  setIsPlaying: (playing: boolean) => void,
  totalSteps: number
) {
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % totalSteps;
        if (next === 0 && hasStarted) {
          setIsPlaying(false);
        }
        return next;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPlaying, hasStarted, setActiveStep, setIsPlaying, totalSteps]);
}