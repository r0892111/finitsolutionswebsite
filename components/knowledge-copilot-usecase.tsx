"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  Mail, 
  Shield, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Users,
  Settings,
  BarChart3
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

export function KnowledgeCopilotUseCase() {
  const features = [
    {
      icon: Database,
      title: "Connects to your existing tools",
      description: "Works with your current systems - no need to change anything"
    },
    {
      icon: MessageSquare,
      title: "Understands your business",
      description: "AI learns from your documents and emails to give smart answers"
    },
    {
      icon: Mail,
      title: "Helps write better emails",
      description: "Suggests professional email replies you can edit and send"
    },
    {
      icon: Zap,
      title: "Saves information automatically",
      description: "Important details get saved to the right place without manual work"
    }
  ];

  const benefits = [
    "Reply to emails faster with better quality",
    "Find information quickly without searching through files",
    "Your data stays secure - only authorized people see what they need",
    "Simple interfaces that your team will actually want to use"
  ];

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora">
      <div className="w-full">
        <div className="max-w-6xl mx-auto">
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
              <span className="font-medium">Use Case Example</span>
            </div>
            
            <h2 className="finit-h1 text-white mb-6">
              Knowledge & Email Assistant
            </h2>
            
            <p className="finit-body max-w-4xl mx-auto mb-8" style={{ color: '#36454F' }}>
              One smart system where your team can find answers and write better emails using the tools and information you already have.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-xl">
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
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-xl">
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

              {/* Simple Apps */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-xl">
                <h3 className="finit-h2 mb-4" style={{ color: '#36454F' }}>Easy-to-use interfaces</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#36454F' }}>
                  We build simple web apps so your team can easily use the AI assistant - like dashboards, email inboxes, and forms.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#36454F' }}>
                  These are built quickly and cost-effectively, without compromising on quality or security.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Future Possibilities - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-xl mb-12"
          >
            <h3 className="finit-h2 mb-8 text-center" style={{ color: '#36454F' }}>This can grow with your business</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h4 className="font-medium mb-4" style={{ color: '#36454F' }}>Connect more systems</h4>
                <div className="space-y-2">
                  {["Your accounting software", "Customer support tools", "Document signing", "Phone systems"].map((item, index) => (
                    <div key={index} className="text-sm bg-white/60 rounded-lg px-3 py-2 border border-white/20">
                      <span style={{ color: '#36454F' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="font-medium mb-4" style={{ color: '#36454F' }}>Add more ways to communicate</h4>
                <div className="space-y-2">
                  {["Website chat", "WhatsApp integration", "Voice messages", "Mobile apps"].map((item, index) => (
                    <div key={index} className="text-sm bg-white/60 rounded-lg px-3 py-2 border border-white/20">
                      <span style={{ color: '#36454F' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="font-medium mb-4" style={{ color: '#36454F' }}>Automate more tasks</h4>
                <div className="space-y-2">
                  {["Sort customer requests", "Create tasks automatically", "Help with onboarding", "Multi-language support"].map((item, index) => (
                    <div key={index} className="text-sm bg-white/60 rounded-lg px-3 py-2 border border-white/20">
                      <span style={{ color: '#36454F' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Summary & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-xl"
          >
            <p className="finit-body mb-6 max-w-4xl mx-auto" style={{ color: '#36454F' }}>
              We connect your existing systems, use AI to make sense of your data, and build simple interfaces so your team can work faster and smarter.
            </p>
            
            <p className="text-sm mb-8" style={{ color: '#36454F' }}>
              This is just one example - we customize everything to fit your specific business needs.
            </p>

            <ProjectRequestDialog 
              buttonText="Learn More About This Solution"
              buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 finit-body px-8 py-4 rounded-full font-medium"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}