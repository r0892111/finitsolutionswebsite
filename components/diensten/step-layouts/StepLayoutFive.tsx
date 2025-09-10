"use client";

import { motion } from "framer-motion";
import { ProcessStep } from "@/types/diensten";

interface StepLayoutFiveProps {
  step: ProcessStep;
  isEven: boolean;
}

export function StepLayoutFive({ step, isEven }: StepLayoutFiveProps) {
  const IconComponent = step.icon;
  
  return (
    <div className="text-center max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-12"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-[#1C2C55] to-blue-700 flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <IconComponent className="h-12 w-12 text-white" />
        </div>
        
        <h2 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight drop-shadow-lg">
          {step.title}
        </h2>
        
        <p className="text-2xl text-slate-200 font-light leading-relaxed max-w-4xl mx-auto">
          {step.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Live Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-xl"
        >
          <h4 className="text-lg font-bold text-white mb-4">Live Systeem</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-200 text-sm">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-200 text-sm">Gebruikers</span>
              <span className="text-white font-bold">247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-200 text-sm">Queries/dag</span>
              <span className="text-white font-bold">1,834</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-xl"
        >
          <h4 className="text-lg font-bold text-white mb-4">Ondersteuning</h4>
          <div className="space-y-4">
            {step.details.slice(0, 3).map((detail: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1C2C55] flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-slate-200 text-sm leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-xl"
        >
          <h4 className="text-lg font-bold text-white mb-4">Groei Metrics</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-200 text-sm">Efficiëntie</span>
              <span className="text-green-400 font-bold">+340%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-200 text-sm">Tijdsbesparing</span>
              <span className="text-green-400 font-bold">15h/week</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-200 text-sm">ROI</span>
              <span className="text-green-400 font-bold">450%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl"
      >
        <h4 className="text-xl font-bold text-white mb-6">Client Case</h4>
        <p className="text-slate-200 italic text-lg leading-relaxed mb-6">&quot;{step.useCase}&quot;</p>
        
        <div className="space-y-4">
          <h5 className="text-lg font-semibold text-white">Resultaten na lancering:</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/10">
              <div className="text-2xl font-bold text-green-400">85%</div>
              <div className="text-xs text-slate-300">Sneller zoeken</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/10">
              <div className="text-2xl font-bold text-green-400">24/7</div>
              <div className="text-xs text-slate-300">Beschikbaar</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}