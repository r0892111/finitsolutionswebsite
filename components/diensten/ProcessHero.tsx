/**
 * Hero section component for the diensten page
 * Displays title, description, and process overview
 */

"use client";

import { motion } from "framer-motion";
import { ChevronRight, Cog, ArrowDown } from "lucide-react";
import { processSteps } from "@/lib/diensten/process-data";

interface ProcessHeroProps {
  onScrollToProcess: () => void;
}

export function ProcessHero({ onScrollToProcess }: ProcessHeroProps) {
  return (
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
            onClick={onScrollToProcess}
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
  );
}