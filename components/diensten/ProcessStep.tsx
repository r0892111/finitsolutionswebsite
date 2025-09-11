/**
 * Individual process step component
 * Renders step content with visual examples and use cases
 */

"use client";

import { motion } from "framer-motion";
import type { ProcessStep as ProcessStepType } from "@/types/diensten";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isVisible: boolean;
  isActive: boolean;
  layout: 'default' | 'centered' | 'asymmetric' | 'three-column' | 'reversed';
}

export function ProcessStep({ step, index, isVisible, isActive, layout }: ProcessStepProps) {
  const IconComponent = step.icon;

  const getLayoutClasses = () => {
    switch (layout) {
      case 'centered':
        return "flex flex-col items-center text-center max-w-4xl mx-auto";
      case 'asymmetric':
        return "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start";
      case 'three-column':
        return "grid grid-cols-1 md:grid-cols-3 gap-6";
      case 'reversed':
        return "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center";
      default:
        return "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: isVisible ? 1 : 0.35,
        y: isVisible ? 0 : 20,
        scale: isActive ? 1.01 : 1
      }}
      transition={{ duration: 0.5 }}
      className={getLayoutClasses()}
    >
      {/* Step Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-xl bg-primary/5 border border-primary/15 shadow-sm step-number-marker">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${step.accent} flex items-center justify-center text-white shadow`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">Stap {step.id}</div>
            <div className="text-xs text-slate-700">{step.subtitle}</div>
          </div>
        </div>

        <h2 className="finit-h1 tracking-tight leading-tight" style={{ color: '#202226' }}>{step.title}</h2>

        <div className="space-y-2">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
            <span className="text-primary">⚡</span>
            Ons Algemene Proces:
          </h4>
          <ul className="space-y-1.5">
            {step.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                <span className="text-white text-xs">✓</span>
                <span className="finit-body text-white/90">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Client Use Case */}
      <div className="border border-slate-200 rounded-lg p-5 shadow-sm bg-white">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-lg">🎯</span>
          </div>
          <div>
            <h4 className="finit-h2 text-white">Client Case</h4>
            <p className="finit-body text-white/90 italic mb-6">
              &quot;{step.useCase}&quot;
            </p>
          </div>
        </div>

        <StepVisualExample stepId={step.id} />
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
        <div className="mt-3 grid grid-cols-1 gap-2">
          {["Versnipperde info", "Handmatige stappen", "Onvoldoende vindbaarheid"].map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
              <span className="text-sm text-slate-700">{item}</span>
              <span className="text-amber-500">⚠️</span>
            </div>
          ))}
        </div>
      );

    case 2:
      return (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["Scope", "Integraties", "RBAC", "Chat", "E-mail", "Workflows"].map((tag, i) => (
            <div key={i} className="rounded-md bg-yellow-50 border border-yellow-100 px-2 py-2 text-center text-xs font-medium text-yellow-800">
              {tag}
            </div>
          ))}
        </div>
      );

    case 3:
      return (
        <div className="mt-3 rounded-md bg-slate-900 text-slate-200 text-xs font-mono p-3">
          <div>ingest_sources()</div>
          <div>index_documents()</div>
          <div>build_chat_interface()</div>
          <div>rag.generate(query, context)</div>
        </div>
      );

    case 4:
      return (
        <div className="mt-3 flex flex-wrap gap-2">
          {["Login OK", "RBAC OK", "Kwaliteit ↑", "E-mail voorstel OK"].map((badge, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
              {badge}
            </span>
          ))}
        </div>
      );

    case 5:
      return (
        <div className="mt-3 h-20 flex items-end gap-2">
          {[30, 45, 60, 80].map((height, i) => (
            <div key={i} className="flex-1 bg-blue-50 border border-blue-100 rounded">
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-primary rounded-b"
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