"use client";

import { motion } from "framer-motion";
import { ProcessStep } from "@/types/diensten";

interface StepLayoutOneProps {
  step: ProcessStep;
  isEven: boolean;
}

export function StepLayoutOne({ step, isEven }: StepLayoutOneProps) {
  const IconComponent = step.icon;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.accent} flex items-center justify-center shadow-lg`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">Stap {step.id}</div>
            <div className="text-sm text-slate-600">{step.subtitle}</div>
          </div>
        </div>

        <h2 className="text-5xl md:text-6xl font-extralight text-slate-900 tracking-tight leading-tight">
          {step.title}
        </h2>
        
        <p className="text-xl text-slate-600 font-light leading-relaxed">
          {step.description}
        </p>

        <div className="grid grid-cols-1 gap-4">
          {step.details.map((detail: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1C2C55] flex items-center justify-center shadow">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-[#202226] font-medium">{detail}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#1C2C55]/10 flex items-center justify-center">
              <span className="text-[#1C2C55] text-lg">🎯</span>
            </div>
            <h4 className="text-lg font-bold text-[#202226]">Client Case</h4>
          </div>
          <p className="text-slate-800 italic leading-relaxed mb-6">&ldquo;{step.useCase}&rdquo;</p>
          
        </div>
      </motion.div>
    </div>
  );
}