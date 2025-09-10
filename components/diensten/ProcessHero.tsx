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
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/8 to-blue-500/8 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/6 to-primary/6 rounded-full blur-3xl animate-float-medium"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-8">
            <Cog className="h-4 w-4 mr-2" />
            <span>Maatwerk proces</span>
            <ChevronRight className="h-4 w-4 ml-2" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-extralight mb-8 text-center bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent tracking-tight"
        >
          Van Idee tot Impact
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-600 text-xl mb-16 max-w-4xl mx-auto text-center leading-relaxed font-light tracking-wide"
        >
          Ontdek hoe wij samen met u van uitdaging naar oplossing gaan — kort, duidelijk en
          resultaatgericht.
        </motion.p>

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
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${step.accent} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-medium text-slate-900 mb-2">{step.title}</div>
                  <div className="text-xs text-slate-600 font-light">{step.subtitle}</div>
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
            className="group flex flex-col items-center gap-3 mx-auto text-slate-600 hover:text-primary transition-colors duration-300"
          >
            <span className="text-sm font-light tracking-wide">Ontdek het proces</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center group-hover:border-primary transition-colors duration-300"
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}