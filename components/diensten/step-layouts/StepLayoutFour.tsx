"use client";

import { motion } from "framer-motion";
import { ProcessStep } from "@/types/diensten";

interface StepLayoutFourProps {
  step: ProcessStep;
  isEven: boolean;
}

export function StepLayoutFour({ step, isEven }: StepLayoutFourProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Testing Cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-xl"
        >
          <h4 className="text-xl font-bold text-white mb-6">Kwaliteitscontrole</h4>
          <div className="space-y-4">
            {["Functionaliteit", "Performance", "Beveiliging", "Gebruiksvriendelijkheid"].map((test, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/10">
                <span className="text-slate-200">{test}</span>
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-xl"
        >
          <h4 className="text-xl font-bold text-white mb-6">Test Resultaten</h4>
          <div className="space-y-4">
            {[
              { label: "Nauwkeurigheid", value: "98.5%" },
              { label: "Responstijd", value: "<200ms" },
              { label: "Uptime", value: "99.9%" },
              { label: "Tevredenheid", value: "9.2/10" }
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-slate-200">{metric.label}</span>
                <span className="text-white font-bold">{metric.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl max-w-4xl mx-auto"
      >
        <h4 className="text-xl font-bold text-white mb-4">Client Case</h4>
        <p className="text-slate-200 italic text-lg leading-relaxed">&quot;{step.useCase}&quot;</p>
      </motion.div>
    </div>
  );
}