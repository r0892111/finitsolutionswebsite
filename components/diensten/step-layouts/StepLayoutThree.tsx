"use client";

import { motion } from "framer-motion";
import { ProcessStep } from "@/types/diensten";

interface StepLayoutThreeProps {
  step: ProcessStep;
  isEven: boolean;
}

export function StepLayoutThree({ step, isEven }: StepLayoutThreeProps) {
  const IconComponent = step.icon;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center h-full">
      <div className="lg:col-span-2 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#1C2C55] flex items-center justify-center shadow-lg">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Stap {step.id}</div>
              <div className="text-sm text-slate-300">{step.subtitle}</div>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
            {step.title}
          </h2>
          
          <p className="text-xl text-slate-200 font-light leading-relaxed">
            {step.description}
          </p>
        </motion.div>

        {/* Code Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[#202226] rounded-2xl p-6 shadow-2xl border border-slate-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-sm text-slate-300 space-y-2">
            <div className="text-green-400">{/* AI-gedreven kennisbank implementatie */}</div>
            <div><span className="text-blue-400">const</span> <span className="text-yellow-300">ragSystem</span> = <span className="text-purple-400">new</span> <span className="text-blue-300">DocumentProcessor</span>();</div>
            <div><span className="text-yellow-300">ragSystem</span>.<span className="text-green-300">ingestDocuments</span>(<span className="text-orange-300">&apos;juridische-database&apos;</span>);</div>
            <div><span className="text-yellow-300">ragSystem</span>.<span className="text-green-300">createIndex</span>(<span className="text-orange-300">&apos;vector-embeddings&apos;</span>);</div>
            <div><span className="text-yellow-300">ragSystem</span>.<span className="text-green-300">enableChat</span>(<span className="text-orange-300">&apos;natuurlijke-taal&apos;</span>);</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="space-y-6"
      >
        <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-xl">
          <h4 className="text-lg font-bold text-white mb-4">Ontwikkelingsdetails</h4>
          <div className="space-y-4">
            {step.details.map((detail: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1C2C55] flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-slate-200 text-sm leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-xl">
          <h4 className="text-lg font-bold text-white mb-4">Client Case</h4>
          <p className="text-slate-200 italic leading-relaxed">&ldquo;{step.useCase}&rdquo;</p>
        </div>
      </motion.div>
    </div>
  );
}