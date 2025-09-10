/**
 * Type definitions for the Diensten (Services) page
 * Centralizes all TypeScript interfaces and types
 */

import React from "react";

export interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  details: string[];
  useCase: string;
  visual: string;
  metrics: {
    time: string;
    deliverable: string;
    impact: string;
  };
}

export interface FloatingElement {
  id: string;
  size: string;
  color: string;
  position: {
    top: string;
    left: string;
  };
  animation: string;
}

export interface ProcessState {
  activeStep: number;
  isPlaying: boolean;
  hasStarted: boolean;
  visibleSteps: Set<number>;
}