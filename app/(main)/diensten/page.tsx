"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Users,
  Zap,
  Target,
  Shield,
  Clock,
  Brain,
  Database,
  Cloud,
  Workflow,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Calendar
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useLanguage } from "@/contexts/language-context";
import { KnowledgeCopilotUseCase } from "@/components/knowledge-copilot-usecase";

const expandableSections = [
  {
    key: 'who-we-are',
    title: 'diensten.sections.who_we_are.title',
    preview: 'diensten.sections.who_we_are.preview',
    content: 'diensten.sections.who_we_are.content'
  },
  {
    key: 'how-we-work',
    title: 'diensten.sections.how_we_work.title',
    preview: 'diensten.sections.how_we_work.preview',
    content: 'diensten.sections.how_we_work.content'
  },
  {
    key: 'innovation',
    title: 'diensten.sections.innovation.title',
    preview: 'diensten.sections.innovation.preview',
    content: 'diensten.sections.innovation.content'
  },
  {
    key: 'what-sets-us-apart',
    title: 'diensten.sections.what_sets_apart.title',
    preview: 'diensten.sections.what_sets_apart.preview',
    content: 'diensten.sections.what_sets_apart.content'
  },
  {
    key: 'philosophy',
    title: 'diensten.sections.philosophy.title',
    preview: 'diensten.sections.philosophy.preview',
    content: 'diensten.sections.philosophy.content'
  },
  {
    key: 'commitment',
    title: 'diensten.sections.commitment.title',
    preview: 'diensten.sections.commitment.preview',
    content: 'diensten.sections.commitment.content'
  }
];

const benefits = [
  {
    icon: Clock,
    title: "diensten.benefits.quick_wins.title",
    description: "diensten.benefits.quick_wins.description"
  },
  {
    icon: Shield,
    title: "diensten.benefits.lower_risk.title",
    description: "diensten.benefits.lower_risk.description"
  },
  {
    icon: Workflow,
    title: "diensten.benefits.flexible_adaptation.title",
    description: "diensten.benefits.flexible_adaptation.description"
  },
  {
    icon: TrendingUp,
    title: "diensten.benefits.measurable_value.title",
    description: "diensten.benefits.measurable_value.description"
  },
  {
    icon: Zap,
    title: "diensten.benefits.fast_delivery.title",
    description: "diensten.benefits.fast_delivery.description"
  },
  {
    icon: Brain,
    title: "diensten.benefits.ai_automation.title",
    description: "diensten.benefits.ai_automation.description"
  }
];

const differentiators = [
  {
    icon: Database,
    title: "Deep CRM Knowledge",
    description: "We unlock the full potential of CRM systems with specialized expertise."
  },
  {
    icon: Brain,
    title: "AI Automation Pioneers",
    description: "We apply AI in real processes, turning advanced tech into daily efficiency."
  },
  {
    icon: Cloud,
    title: "Cloud-Ready & Workflow-Focused",
    description: "Our systems are designed for today's environment and tomorrow's growth."
  },
  {
    icon: Target,
    title: "Efficiency Unlocks",
    description: "We detect bottlenecks others miss and design long-term solutions."
  }
];

export default function TailoredITSolutionsPage() {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const { t } = useLanguage();

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <main className="pt-20 bg-finit-aurora min-h-screen font-general-sans">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora overflow-hidden">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-6 mt-12"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-white/20 text-white mb-8 border border-white/30 shadow-lg backdrop-blur-sm">
                <Workflow className="h-4 w-4 mr-2" />
                <span>{t('nav.services')}</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="finit-h1 text-white mb-6"
            >
              <span>{t('diensten.hero.title')}</span>
              <br />
              <span className="finit-highlight mt-4 inline-block" style={{ backgroundColor: '#F7E69B', color: '#1C2C55' }}>{t('diensten.hero.highlight')}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="finit-body max-w-3xl mx-auto mb-8"
              style={{ color: '#202226' }}
            >
              {t('diensten.hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <ProjectRequestDialog 
                buttonText={t('project.start')}
                buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 finit-body px-8 py-4 rounded-full font-medium"
              />
              <a 
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-8 py-4 border border-gray-300 text-gray-800 hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 finit-body rounded-full backdrop-blur-sm font-medium"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t('hero.cta.meeting')}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expandable Content Sections */}
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
                {t('diensten.why.title')}
              </h2>
              <p className="font-general-sans font-normal text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-white/90">
                {t('diensten.why.subtitle')}
              </p>
            </motion.div>

            <div className="space-y-6">
              {expandableSections.map((section, index) => (
                <motion.div
                  key={section.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-700/40 transition-colors group"
                  >
                    <div className="flex-1">
                      <h3 className="font-general-sans font-medium text-lg md:text-xl leading-tight mb-2 group-hover:opacity-90 transition-colors text-white">
                        {t(section.title)}
                      </h3>
                      <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed text-white/80">
                        {t(section.preview)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-6">
                      <motion.div
                        animate={{ rotate: expandedSections[section.key] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center border bg-gradient-to-br from-white/80 via-blue-50/60 to-primary/20"
                        style={{ borderColor: '#1C2C55' }}
                      >
                        <ChevronDown className="h-5 w-5" style={{ color: '#1C2C55' }} />
                      </motion.div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections[section.key] && (
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
                          <div className="bg-white/90 rounded-xl p-6 border" style={{ borderColor: '#1C2C55' }}>
                            <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed" style={{ color: '#202226' }}>
                              {t(section.content)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="font-general-sans font-medium text-2xl md:text-3xl leading-tight mb-4 text-white">
              {t('diensten.benefits.title')}
            </h2>
            <p className="font-general-sans font-normal text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-white/90">
              {t('diensten.benefits.subtitle')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group"
              >
                <Card className="h-full bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative hover:-translate-y-1">
                  <CardContent className="p-6 relative z-10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border shadow-lg bg-gradient-to-br from-white/80 via-blue-50/60 to-primary/20" style={{ borderColor: '#1C2C55' }}>
                      <benefit.icon className="h-6 w-6" style={{ color: '#1C2C55' }} />
                    </div>
                    <h3 className="font-general-sans font-medium text-lg md:text-xl leading-tight mb-3 group-hover:opacity-90 transition-colors text-white">
                      {t(benefit.title)}
                    </h3>
                    <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed text-white/80">
                      {t(benefit.description)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge & Email Co-Pilot Use Case */}
      <KnowledgeCopilotUseCase />

     

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora relative overflow-hidden">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="font-general-sans font-medium text-2xl md:text-3xl leading-tight mb-4 text-white">
              {t('diensten.cta.title')}
            </h2>
            <p className="font-general-sans font-normal text-base md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-white/90">
              {t('diensten.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <ProjectRequestDialog 
                buttonText={t('diensten.cta.button')}
                buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 font-general-sans font-normal text-base px-8 py-4 rounded-full"
              />
              <a 
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-8 py-4 border border-gray-300 text-gray-800 hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 font-general-sans font-normal text-base rounded-full backdrop-blur-sm"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t('hero.cta.meeting')}
              </a>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-8 mt-8 text-white/70"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="font-general-sans font-normal text-sm">{t('diensten.trust.gdpr')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-general-sans font-normal text-sm">{t('diensten.trust.uptime')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-general-sans font-normal text-sm">{t('diensten.trust.support')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}