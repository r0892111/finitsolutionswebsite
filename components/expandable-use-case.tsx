"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Database, Mail, Shield, Zap, Globe, MessageSquare, Settings, Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const useCaseData = {
  title: "Knowledge & Email Co-Pilot",
  subtitle: "Simple overview",
  description: "One place where your team can find answers and draft great emails using the tools and data you already have—SharePoint documents, email history, CRM, and internal systems.",
  
  sections: [
    {
      key: 'how-it-works',
      title: 'How it works (plain language)',
      icon: Settings,
      items: [
        {
          title: "Connects to your tools",
          description: "If a system has an API, we can plug it in."
        },
        {
          title: "Understands your content",
          description: "AI reads your docs and past emails so you can ask questions in normal language and get precise, source-backed answers."
        },
        {
          title: "Writes with context",
          description: "Inside a clean inbox, the assistant suggests reply drafts you can edit and send."
        },
        {
          title: "Sends data to the right place",
          description: "The AI cleans, labels, and routes information to your CRM or other systems—automatically."
        },
        {
          title: "You stay in control",
          description: "Clear role-based permissions, human-in-the-loop for sensitive cases, plus logging and audit trails."
        }
      ]
    },
    {
      key: 'simple-web-apps',
      title: 'Simple web apps & interfaces (fast and affordable)',
      icon: Globe,
      content: "We quickly build lightweight web apps and UIs so your users can interact with the assistant and your data in a simple, focused way—think dashboards, inboxes, checklists, forms, customer portals. Thanks to AI-assisted development, these interfaces are delivered faster and at a lower cost than traditional builds, without sacrificing quality or security."
    },
    {
      key: 'what-you-get',
      title: 'What you get',
      icon: Zap,
      items: [
        "Faster replies, fewer tabs, consistent quality",
        "Less searching; knowledge reused across the team",
        "Security by design (only the right people see the right data)",
        "Practical, affordable front-ends your team actually uses"
      ]
    },
    {
      key: 'where-this-goes',
      title: 'Where this can go next (subtle ideas)',
      icon: ArrowRight,
      subsections: [
        {
          title: "More systems",
          items: ["ERP", "ticketing/ITSM", "e-signature", "data warehouse", "telephony", "Teams/Slack"]
        },
        {
          title: "More channels",
          items: ["website chat", "WhatsApp or voice notes that create CRM updates"]
        },
        {
          title: "More workflows",
          items: ["auto-triage of cases", "task creation and approvals", "onboarding playbooks", "field-service guides", "finance collections", "procurement Q&A", "multilingual support"]
        }
      ]
    }
  ]
};

export function ExpandableUseCase() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora">
      <div className="w-full">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="font-general-sans font-medium text-2xl md:text-3xl leading-tight mb-4 text-white">
              Use case — {useCaseData.title}
            </h2>
            <p className="font-general-sans font-normal text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-white/90 mb-2">
              {useCaseData.subtitle}
            </p>
          </motion.div>

          {/* What it is */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-600/50 shadow-xl overflow-hidden mb-8"
          >
            <div className="p-6 md:p-8">
              <h3 className="font-general-sans font-medium text-lg md:text-xl leading-tight mb-4 text-white">
                What it is
              </h3>
              <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed text-white/90">
                {useCaseData.description}
              </p>
            </div>
          </motion.div>

          {/* Single Expandable Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-600/50 shadow-xl overflow-hidden"
          >
            <button
              onClick={toggleExpanded}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-black/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg bg-gradient-to-br from-primary/30 to-blue-600/30 border-slate-600/50">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-general-sans font-medium text-lg md:text-xl leading-tight group-hover:opacity-90 transition-colors text-white">
                  Complete Solution Overview
                </h3>
              </div>
              <div className="flex-shrink-0 ml-6">
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center border bg-gradient-to-br from-primary/30 to-blue-600/30 border-slate-600/50"
                >
                  <ChevronDown className="h-5 w-5 text-white" />
                </motion.div>
              </div>
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.04, 0.62, 0.23, 0.98]
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="bg-slate-700/80 rounded-b-2xl p-6 relative z-10 space-y-8">
                      
                      {/* How it works section */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-lg bg-primary/30 flex items-center justify-center">
                            <Settings className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-general-sans font-medium text-lg text-white">
                            How it works (plain language)
                          </h4>
                        </div>
                        <div className="space-y-4">
                          {useCaseData.sections[0].items?.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-white text-xs font-bold">✓</span>
                              </div>
                              <div>
                                <h5 className="font-general-sans font-medium text-sm text-white mb-1">
                                  {item.title}
                                </h5>
                                <p className="font-general-sans font-normal text-sm leading-relaxed text-white/80">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Simple web apps section */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-primary/30 flex items-center justify-center">
                            <Globe className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-general-sans font-medium text-lg text-white">
                            Simple web apps & interfaces (fast and affordable)
                          </h4>
                        </div>
                        <p className="font-general-sans font-normal text-sm leading-relaxed text-white/90 ml-11">
                          {useCaseData.sections[1].content}
                        </p>
                      </div>

                      {/* What you get section */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-primary/30 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-general-sans font-medium text-lg text-white">
                            What you get
                          </h4>
                        </div>
                        <div className="space-y-3 ml-11">
                          {useCaseData.sections[2].items?.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-white text-xs font-bold">✓</span>
                              </div>
                              <p className="font-general-sans font-normal text-sm leading-relaxed text-white/90">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Where this can go next section */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-primary/30 flex items-center justify-center">
                            <ArrowRight className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-general-sans font-medium text-lg text-white">
                            Where this can go next (subtle ideas)
                          </h4>
                        </div>
                        <div className="space-y-6 ml-11">
                          {useCaseData.sections[3].subsections?.map((subsection, idx) => (
                            <div key={idx}>
                              <h5 className="font-general-sans font-medium text-sm text-white mb-3">
                                {subsection.title}:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {subsection.items.map((item, itemIdx) => (
                                  <span 
                                    key={itemIdx}
                                    className="px-3 py-1 bg-primary/20 text-white/90 rounded-full text-xs font-medium border border-primary/30"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Summary */}
                      <div className="border-t border-slate-600/30 pt-6">
                        <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed text-white/90 text-center mb-4">
                          <strong>This is just one example.</strong> We tailor it to your setup and processes.
                        </p>
                        <div className="bg-slate-600/30 rounded-xl p-4">
                          <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed text-white/90 text-center">
                            <strong>In short:</strong> we connect your systems, use AI to process the data, and provide fast, affordable interfaces so information lands in the right place—and your team works faster with higher quality.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}