"use client";

import { motion } from "framer-motion";
import { ProcessStep } from "@/types/diensten";

interface StepLayoutTwoProps {
  step: ProcessStep;
  isEven: boolean;
}

export function StepLayoutTwo({ step, isEven }: StepLayoutTwoProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {step.details.map((detail: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1C2C55] flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white font-bold">{i + 1}</span>
            </div>
            <p className="text-white font-light leading-relaxed">{detail}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-16 bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl max-w-4xl mx-auto"
      >
        <h4 className="text-xl font-bold text-white mb-4">Client Case</h4>
        <p className="text-slate-200 italic text-lg leading-relaxed">&ldquo;{step.useCase}&rdquo;</p>
      </motion.div>
    </div>
  );
}