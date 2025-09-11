/**
 * Individual process step component
 * Renders step content with visual examples and use cases
 */

"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";
import type { ProcessStep as ProcessStepType } from "@/types/diensten";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isVisible: boolean;
  isActive: boolean;
  stepRef: (el: HTMLDivElement | null) => void;
}

export function ProcessStep({ step, index, isVisible, isActive, stepRef }: ProcessStepProps) {
  const IconComponent = step.icon;

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: isVisible ? 1 : 0.35,
        y: isVisible ? 0 : 20,
        scale: isActive ? 1.01 : 1
      }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      {/* Left Column - Process Info */}
      <div className="space-y-8">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl step-number-marker">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.accent} flex items-center justify-center shadow-lg`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">Stap {step.id}</div>
            <div className="text-sm text-white/70">{step.subtitle}</div>
          </div>
        </div>

        <h2 className="text-5xl md:text-6xl font-extralight text-white tracking-tight leading-tight">
          {step.title}
        </h2>
        
        <p className="text-xl text-white/80 font-light leading-relaxed">
          {step.description}
        </p>

        <div className="grid grid-cols-1 gap-4">
          {step.details.map((detail, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 shadow-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shadow">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-white/90 font-medium">{detail}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column - Client Case */}
      <div className="relative">
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/25">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/25 to-white/15 flex items-center justify-center border border-white/30 shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white">Client Case</h4>
          </div>
          <p className="text-white/90 italic leading-relaxed mb-6">&ldquo;{step.useCase}&rdquo;</p>
          
          {/* Step-specific visual examples */}
          <div className="mt-6">
            <StepVisualExample stepId={step.id} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Step-specific visual examples component
 * Renders contextual visual content for each step
 */
function StepVisualExample({ stepId }: { stepId: number }) {
  switch (stepId) {
    case 1:
      return (
        <div className="grid grid-cols-1 gap-2">
          {["Versnipperde info", "Handmatige stappen", "Onvoldoende vindbaarheid"].map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border border-white/20 px-3 py-2 bg-white/10">
              <span className="text-sm text-white/80">{item}</span>
              <span className="text-amber-400">⚠️</span>
            </div>
          ))}
        </div>
      );
      
    case 2:
      return (
        <div className="grid grid-cols-3 gap-2">
          {["Scope", "Integraties", "RBAC", "Chat", "E-mail", "Workflows"].map((tag, i) => (
            <div key={i} className="rounded-md bg-white/20 border border-white/30 px-2 py-2 text-center text-xs font-medium text-white">
              {tag}
            </div>
          ))}
        </div>
      );
      
    case 3:
      return (
        <div className="rounded-md bg-slate-900/50 text-slate-200 text-xs font-mono p-3 border border-white/20">
          <div>ingest_sources()</div>
          <div>index_documents()</div>
          <div>build_chat_interface()</div>
          <div>rag.generate(query, context)</div>
        </div>
      );
      
    case 4:
      return (
        <div className="flex flex-wrap gap-2">
          {["Login OK", "RBAC OK", "Kwaliteit ↑", "E-mail voorstel OK"].map((badge, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/30">
              {badge}
            </span>
          ))}
        </div>
      );
      
    case 5:
      return (
        <div className="h-20 flex items-end gap-2">
          {[30, 45, 60, 80].map((height, i) => (
            <div key={i} className="flex-1 bg-white/20 border border-white/30 rounded">
              <div
                className="w-full bg-gradient-to-t from-blue-400 to-white rounded-b"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
      );
      
    default:
      return null;
  }
}