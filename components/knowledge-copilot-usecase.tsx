"use client";

import React from "react";
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
import { useLanguage } from "@/contexts/language-context";

export function KnowledgeCopilotUseCase() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Database,
      title: t('knowledge_copilot.features.connects_tools'),
      description: t('knowledge_copilot.features.connects_tools_description')
    },
    {
      icon: MessageSquare,
      title: t('knowledge_copilot.features.understands_content'),
      description: t('knowledge_copilot.features.understands_content_description')
    },
    {
      icon: Mail,
      title: t('knowledge_copilot.features.writes_context'),
      description: t('knowledge_copilot.features.writes_context_description')
    },
    {
      icon: Zap,
      title: t('knowledge_copilot.features.sends_data'),
      description: t('knowledge_copilot.features.sends_data_description')
    },
    {
      icon: Shield,
      title: t('knowledge_copilot.features.stay_control'),
      description: t('knowledge_copilot.features.stay_control_description')
    }
  ];

  const benefits = [
    t('knowledge_copilot.benefits.faster_replies'),
    t('knowledge_copilot.benefits.less_searching'),
    t('knowledge_copilot.benefits.security_design'),
    t('knowledge_copilot.benefits.practical_frontends')
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
              <span className="font-medium">{t('knowledge_copilot.badge')}</span>
            </div>
            
            <h2 className="finit-h1 text-white mb-6">
              {t('knowledge_copilot.title')}
            </h2>
            
            <p className="finit-body max-w-4xl mx-auto mb-8" style={{ color: '#36454F' }}>
              {t('knowledge_copilot.description')}
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
                <h3 className="finit-h2 mb-8" style={{ color: '#36454F' }}>{t('knowledge_copilot.how_it_works')}</h3>
                
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
                <h3 className="finit-h2 mb-6" style={{ color: '#36454F' }}>{t('knowledge_copilot.what_you_get')}</h3>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0" />
                      <span className="text-sm" style={{ color: '#36454F' }}>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Simple Web Apps */}
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl">
                <h3 className="finit-h2 mb-4" style={{ color: '#36454F' }}>{t('knowledge_copilot.simple_web_apps')}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#36454F' }}>
                  {t('knowledge_copilot.simple_web_apps_description')}
                </p>
                <p className="text-xs" style={{ color: '#36454F' }}>
                  {t('knowledge_copilot.simple_web_apps_note')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Expansion Areas */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl">
              <h3 className="finit-h2 mb-6 text-center" style={{ color: '#36454F' }}>{t('knowledge_copilot.where_expand')}</h3>
              <p className="text-center mb-8 max-w-3xl mx-auto" style={{ color: '#36454F' }}>
                {t('knowledge_copilot.expand_description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="font-semibold mb-3" style={{ color: '#36454F' }}>{t('knowledge_copilot.connect_more_tools')}</h4>
                  <p className="text-sm" style={{ color: '#36454F' }}>
                    {t('knowledge_copilot.connect_more_tools_description')}
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="font-semibold mb-3" style={{ color: '#36454F' }}>{t('knowledge_copilot.add_more_channels')}</h4>
                  <p className="text-sm" style={{ color: '#36454F' }}>
                    {t('knowledge_copilot.add_more_channels_description')}
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="font-semibold mb-3" style={{ color: '#36454F' }}>{t('knowledge_copilot.automate_more_tasks')}</h4>
                  <p className="text-sm" style={{ color: '#36454F' }}>
                    {t('knowledge_copilot.automate_more_tasks_description')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            
          </motion.div>

          {/* Marketplace CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center"
          >
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/25 shadow-2xl">
              <h3 className="finit-h2 mb-4" style={{ color: '#36454F' }}>
                {t('knowledge_copilot.marketplace_cta_title')}
              </h3>
              <p className="finit-body mb-8" style={{ color: '#36454F' }}>
                {t('knowledge_copilot.marketplace_cta_description')}
              </p>
              <a href="/marketplace">
                <button className="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 finit-body px-8 py-4 rounded-full font-medium">
                  {t('knowledge_copilot.visit_marketplace')}
                  <svg className="ml-2 h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}