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

const expandableSections = [
  {
    key: 'who-we-are',
    title: 'Who We Are',
    preview: 'Young, ambitious, and driven company focused on next-generation automation technologies.',
    content: `Finit Solutions is a young, ambitious, and driven company focused on the next generation of automation technologies. Unlike traditional IT providers weighed down by bureaucracy, we are fast, direct, and built for impact. Our expertise lies in AI automation and modern CRM systems, designed for a new way of working: cloud-ready, workflow-focused, and modular.`
  },
  {
    key: 'how-we-work',
    title: 'How We Work',
    preview: 'We solve problems step by step, building in modules rather than massive "all or nothing" projects.',
    content: `We believe in solving problems step by step. Instead of tackling one massive "all or nothing" project, we build in modules—small, tested components that connect together into a web of efficiency. This approach gives our clients quick wins early on, lower risk through proven steps, and flexibility to adapt to new needs as they appear. Each phase delivers measurable value, so clients see impact right away.`
  },
  {
    key: 'innovation',
    title: 'Innovation & Proof of Expertise',
    preview: 'Innovation through smart combinations of proven technologies, exemplified by VoiceLink.me.',
    content: `At Finit, we don’t make you switch tools. We make your existing stack work harder. VoiceLink lets reps speak quick updates in WhatsApp, and those notes sync automatically to your CRM: Teamleader, Pipedrive, Salesforce, Odoo, HubSpot, and more. No new inboxes. No extra apps. No habit changes. We remove bottlenecks by connecting proven systems and turning scattered conversations into clean, actionable data. The same approach guides every project: find the friction, automate within your stack, and deliver results that last. If a system has an API, we can integrate it.`
  },
  {
    key: 'what-sets-us-apart',
    title: 'What Sets Us Apart',
    preview: 'Deep CRM knowledge, AI automation expertise, and cloud-ready solutions without bureaucracy.',
    content: `Deep CRM knowledge – We know how to unlock the full potential of CRM systems. AI automation pioneers – We apply AI in real processes, turning advanced tech into daily efficiency. Cloud-ready & workflow-focused – Our systems are designed for today's environment and tomorrow's growth. Efficiency unlocks – We detect bottlenecks others miss and design long-term solutions. Fast delivery – Without the bureaucracy of big firms, we deliver quicker and more directly.`
  },
  {
    key: 'philosophy',
    title: 'Our Philosophy',
    preview: 'We make work smoother without changing how teams operate, automating background tasks.',
    content: `We don't reinvent how teams work—we make their work smoother. The tools people already know stay the same, but we automate repetitive, low-value tasks in the background. This means less energy wasted on admin, and more time for meaningful interactions.`
  },
  {
    key: 'commitment',
    title: 'Commitment to Clients',
    preview: 'Dedicated partners with direct communication and long-term relationship focus.',
    content: `We are dedicated partners, available whenever needed. We communicate directly, make fast decisions, and aim for long-term relationships that continuously unlock new efficiencies as needs evolve.`
  }
];

const benefits = [
  {
    icon: Clock,
    title: "Quick Wins Early On",
    description: "See immediate improvements with our modular approach that delivers value from day one."
  },
  {
    icon: Shield,
    title: "Lower Risk",
    description: "Proven steps and tested components reduce implementation risk significantly."
  },
  {
    icon: Workflow,
    title: "Flexible Adaptation",
    description: "Easily adapt to new needs as they appear with our modular architecture."
  },
  {
    icon: TrendingUp,
    title: "Measurable Value",
    description: "Each phase delivers concrete, measurable improvements to your operations."
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Without bureaucracy, we deliver solutions quicker and more directly."
  },
  {
    icon: Brain,
    title: "AI Automation",
    description: "Turn advanced technology into daily efficiency with practical AI implementations."
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
              <span>Tailored IT Solutions</span>
              <br />
              <span className="finit-highlight mt-4 inline-block" style={{ backgroundColor: '#F7E69B', color: '#1C2C55' }}>Built for Impact</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="finit-body max-w-3xl mx-auto mb-8"
              style={{ color: '#202226' }}
            >
              Fast, direct, and built for the next generation of automation. We specialize in AI automation and modern CRM systems that transform how your business operates.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <ProjectRequestDialog 
                buttonText="Start Your Project"
                buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 finit-body px-8 py-4 rounded-full font-medium"
              />
              <a 
                href="https://calendly.com/alex-finitsolutions/30min"
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
                Why Choose Finit Solutions
              </h2>
              <p className="font-general-sans font-normal text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-white/90">
                Discover what makes us different and how we deliver exceptional results for our clients.
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
                        {section.title}
                      </h3>
                      <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed text-white/80">
                        {section.preview}
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
                              {section.content}
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
              The Benefits for Our Clients
            </h2>
            <p className="font-general-sans font-normal text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-white/90">
              Immediate improvements that compound over time into sustainable competitive advantages.
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
                      {benefit.title}
                    </h3>
                    <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed text-white/80">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
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
              What Sets Us Apart
            </h2>
            <p className="font-general-sans font-normal text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-white/90">
              Modern expertise without the bureaucracy of traditional IT firms.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group"
              >
                <Card className="h-full bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative hover:-translate-y-1">
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center border shadow-lg flex-shrink-0 bg-gradient-to-br from-white/80 via-blue-50/60 to-primary/20" style={{ borderColor: '#1C2C55' }}>
                        <item.icon className="h-7 w-7" style={{ color: '#1C2C55' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-general-sans font-medium text-lg md:text-xl leading-tight mb-3 group-hover:opacity-90 transition-colors text-white">
                          {item.title}
                        </h3>
                        <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed text-white/80">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VoiceLink Showcase */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora">
        <div className="w-full">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/25 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 text-green-100 border border-green-400/30 mb-6">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    <span className="font-general-sans font-normal text-sm">Live Product</span>
                  </div>
                  
                  <h3 className="font-general-sans font-medium text-2xl md:text-3xl leading-tight text-white mb-4">
                    VoiceLink.me
                  </h3>
                  
                  <p className="font-general-sans font-normal text-sm md:text-base leading-relaxed mb-6 text-white/90">
                    A clear example of our innovation philosophy: VoiceLink enables voice-driven updates for sales teams directly into their CRM. By rethinking communication flows, we turned wasted time into efficiency.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="https://voicelink.me" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button 
                        size="lg" 
                        className="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 font-general-sans font-normal text-base px-8 py-4 rounded-full"
                      >
                        Try VoiceLink
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white/60">
                        <Workflow className="h-16 w-16 mx-auto mb-4" />
                        <p className="font-general-sans font-normal text-base">VoiceLink Demo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              Ready to Transform Your Business?
            </h2>
            <p className="font-general-sans font-normal text-base md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-white/90">
              We are not a traditional IT firm. We are modern, fast, and specialized in AI automation and CRM. With Finit Solutions, you have a partner fully committed to your success—today and in the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <ProjectRequestDialog 
                buttonText="Start Your Transformation"
                buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 font-general-sans font-normal text-base px-8 py-4 rounded-full"
              />
              <a 
                href="https://calendly.com/alex-finitsolutions/30min"
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
                <span className="font-general-sans font-normal text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-general-sans font-normal text-sm">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-general-sans font-normal text-sm">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}