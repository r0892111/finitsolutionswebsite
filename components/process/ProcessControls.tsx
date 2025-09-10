"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessControlsProps {
  isPlaying: boolean;
  hasStarted: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

/**
 * ProcessControls Component
 * Apple-inspired controls for the automated process walkthrough
 */
export function ProcessControls({ 
  isPlaying, 
  hasStarted, 
  onPlay, 
  onPause, 
  onReset 
}: ProcessControlsProps) {
  return (
    <div className="flex justify-center gap-6">
      {!isPlaying ? (
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button
            onClick={onPlay}
            size="lg"
            className="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-4 rounded-2xl"
          >
            <Play className="h-5 w-5 mr-4" />
            <span className="font-light tracking-wide text-base">Start Proces</span>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button
            onClick={onPause}
            size="lg"
            className="bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-4 rounded-2xl"
          >
            <Pause className="h-5 w-5 mr-4" />
            <span className="font-light tracking-wide text-base">Pauzeer</span>
          </Button>
        </motion.div>
      )}

      {hasStarted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onReset}
            size="lg"
            variant="outline"
            className="bg-white/15 backdrop-blur-xl text-white border border-white/30 hover:bg-white/25 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-4 rounded-2xl"
          >
            <RotateCcw className="h-5 w-5 mr-4" />
            <span className="font-light tracking-wide text-base">Opnieuw</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
}