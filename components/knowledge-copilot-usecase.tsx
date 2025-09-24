"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  Mail, 
  Shield, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  MessageSquare,
  Users,
  Settings,
  BarChart3,
  Phone
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

export function KnowledgeCopilotUseCase() {
  const features = [
    {
      icon: Database,
      title: "Connects to your tools",
      description: "If a system has an API, we can plug it in."
    },
    {
      icon: MessageSquare,
      title: "Understands your content",
      description: "AI reads your docs and past emails so you can ask questions in normal language and get precise, source-backed answers."
    },
    {
      icon: Mail,
      title: "Writes with context",
      description: "Inside a clean inbox, the assistant suggests reply drafts you can edit and send."
    },
    {
      icon: Zap,
      title: "Sends data to the right place",
      description: "The AI cleans, labels, and routes information to your CRM or other systems—automatically."
    },
    {
      icon: Shield,
      title: "You stay in control",
      description: "Clear role-based permissions, human-in-the-loop for sensitive cases, plus logging and audit trails."
    }
  ];

  const benefits = [
    "Faster replies, fewer tabs, consistent quality",
    "Less searching; knowledge reused across the team",
    "Security by design (only the right people see the right data)",
    "Practical, affordable front-ends your team actually uses"
  ];

  const expansionAreas = [
    {
      category: "More systems",
      items: ["ERP", "ticketing/ITSM", "e-signature", "data warehouse", "telephony", "Teams/Slack"]
    },
    {
      category: "More channels", 
      items: ["website chat", "WhatsApp or voice notes that create CRM updates"]
    },
    {
      category: "More workflows",
      items: ["auto-triage of cases", "task creation and approvals", "onboarding playbooks", "field-service guides", "finance collections", "procurement Q&A", "multilingual support"]
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora">
      <div className="w-full">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 text-white mb-8 border border-white/30 shadow-lg backdrop-blur-sm">
              <Database className="h-4 w-4 mr-2" />
              <span className="font-medium">Use Case</span>
            </div>
            
            <h2 className="finit-h1 text-white mb-6">
              Knowledge & Email Co-Pilot
            </h2>
            
            <p className="finit-body max-w-4xl mx-auto mb-8" style={{ color: '#36454F' }}>
              One place where your team can find answers and draft great emails using the tools and data you already have—SharePoint documents, email history, CRM, and internal systems.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl">
                <h3 className="finit-h2 mb-8" style={{ color: '#36454F' }}>How it works</h3>
                
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg bg-gradient-to-br from-white/80 via-blue-50/60 to-primary/20 flex-shrink-0" style={{ borderColor: '#1C2C55' }}>
                        <feature.icon className="h-6 w-6" style={{ color: '#1C2C55' }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2" style={{ color: '#36454F' }}>{feature.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: '#36454F' }}>{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What You Get */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Benefits */}
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl">
                <h3 className="finit-h2 mb-6" style={{ color: '#36454F' }}>What you get</h3>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed" style={{ color: '#36454F' }}>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Simple Web Apps */}
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl">
                <h3 className="finit-h2 mb-4" style={{ color: '#36454F' }}>Simple web apps & interfaces</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#36454F' }}>
                  We quickly build lightweight web apps and UIs so your users can interact with the assistant and your data in a simple, focused way—think dashboards, inboxes, checklists, forms, customer portals.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#36454F' }}>
                  Thanks to AI-assisted development, these interfaces are delivered faster and at a lower cost than traditional builds, without sacrificing quality or security.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Expansion Possibilities */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl mb-12"
          >
            <h3 className="finit-h2 mb-8 text-center" style={{ color: '#36454F' }}>Where this can go next</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {expansionAreas.map((area, index) => (
                <motion.div
                  key={area.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center"
                >
                  <h4 className="font-medium mb-4" style={{ color: '#36454F' }}>{area.category}</h4>
                  <div className="space-y-2">
                    {area.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-white/80 text-sm bg-white/10 rounded-lg px-3 py-2 border border-white/20">
                        <span style={{ color: '#36454F' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Summary & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl"
          >
            <p className="finit-body mb-6 max-w-4xl mx-auto" style={{ color: '#36454F' }}>
              In short: we connect your systems, use AI to process the data, and provide fast, affordable interfaces so information lands in the right place—and your team works faster with higher quality.
            </p>
            
            <p className="text-sm mb-8" style={{ color: '#36454F' }}>
              This is just one example. We tailor it to your setup and processes.
            </p>

            <ProjectRequestDialog 
              buttonText="Explore This Solution"
              buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 finit-body px-8 py-4 rounded-full font-medium"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}