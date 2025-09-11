"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ProcessStepProps {
  step: {
    id: number;
    title: string;
    subtitle: string;
    icon: LucideIcon;
    visual: string;
    useCase: string;
    details: string[];
  };
  index: number;
  isVisible: boolean;
  isActive: boolean;
  accent: string;
}

/**
 * ProcessStep Component
 * Renders a single step in the process with both general process info and client use case
 */
export function ProcessStep({ step, index, isVisible, isActive, accent }: ProcessStepProps) {
  const IconComponent = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: isVisible ? 1 : 0.35,
        y: isVisible ? 0 : 20,
        scale: isActive ? 1.01 : 1
      }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start py-6"
    >
      {/* Left Column - General Finit Process */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-xl bg-primary/5 border border-primary/15 shadow-sm step-number-marker">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${accent} flex items-center justify-center text-white shadow`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">Stap {step.id}</div>
            <div className="text-xs text-slate-600">{step.subtitle}</div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{step.title}</h2>

        <div className="space-y-2">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
            <span className="text-primary">⚡</span>
            Ons Algemene Proces:
          </h4>
          <ul className="space-y-1.5">
            {step.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${accent} flex items-center justify-center shadow mt-0.5`}>
                  <span className="text-white text-xs">✓</span>
                </div>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column - Client Use Case */}
      <div className="border border-slate-200 rounded-lg p-5 shadow-sm bg-white">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-lg">🎯</span>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-1 text-sm">Client Case</h4>
            <p className="text-slate-700 italic text-sm leading-relaxed">
              &ldquo;{step.useCase}&rdquo;
            </p>
          </div>
        </div>

        {/* Step-specific visual examples */}
        <StepVisualExample stepId={step.id} />
      </div>
    </motion.div>
  );
}

/**
 * StepVisualExample Component
 * Renders step-specific visual examples for client cases
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
        <div className="mt-3 rounded-md bg-slate-900 text-slate-100 text-xs font-mono p-3">
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