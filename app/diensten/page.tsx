"use client";

/**
 * Premium professional multi-step interface
 * Sophisticated dark blue gradients with subtle yellow accents, highly unique layouts per step
 */

import React from "react";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Lightbulb, Code, TestTube, Rocket, ChevronDown } from "lucide-react";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

const processSteps = [
  {
    id: 1,
    title: "Discovery & Analysis",
    subtitle: "Strategic Foundation",
    description: "Comprehensive business process analysis to identify optimization opportunities and technical requirements.",
    icon: Search,
    keyInsights: [
      "Stakeholder alignment workshops",
      "Technical infrastructure assessment", 
      "Process bottleneck identification",
      "ROI potential calculation"
    ],
    clientExample: {
      company: "Legal Technology Firm",
      challenge: "Document retrieval across 15+ systems consuming 4 hours daily per attorney",
      solution: "Unified knowledge architecture with intelligent search capabilities",
      outcome: "85% reduction in information retrieval time"
    },
    metrics: {
      duration: "1-2 weeks",
      deliverable: "Strategic roadmap",
      impact: "Clear optimization path"
    }
  },
  {
    id: 2,
    title: "Solution Architecture",
    subtitle: "Technical Blueprint",
    description: "Designing scalable, secure systems that integrate seamlessly with your existing infrastructure.",
    icon: Lightbulb,
    keyInsights: [
      "Microservices architecture design",
      "AI/ML model selection strategy",
      "Integration ecosystem planning",
      "Security framework implementation"
    ],
    clientExample: {
      company: "Legal Technology Firm",
      challenge: "Complex legal terminology requiring natural language processing capabilities",
      solution: "RAG architecture with vector embeddings for semantic search",
      outcome: "340% improvement in search relevance accuracy"
    },
    metrics: {
      duration: "2-3 weeks",
      deliverable: "Technical blueprint",
      impact: "Validated approach"
    }
  },
  {
    id: 3,
    title: "Development & Integration",
    subtitle: "Precision Engineering",
    description: "Building robust, scalable solutions with enterprise-grade security and performance optimization.",
    icon: Code,
    keyInsights: [
      "Test-driven development methodology",
      "Real-time performance monitoring",
      "Progressive deployment strategy",
      "Continuous integration pipeline"
    ],
    clientExample: {
      company: "Legal Technology Firm",
      challenge: "Processing 10TB of legal documents with sub-second query response requirements",
      solution: "Distributed processing with intelligent caching and edge optimization",
      outcome: "Response times under 200ms with 99.9% uptime"
    },
    metrics: {
      duration: "6-12 weeks",
      deliverable: "Production-ready system",
      impact: "Measurable performance"
    }
  },
  {
    id: 4,
    title: "Quality Assurance",
    subtitle: "Excellence Validation",
    description: "Rigorous testing protocols ensuring flawless performance and user experience optimization.",
    icon: TestTube,
    keyInsights: [
      "Automated regression testing",
      "Load testing and stress scenarios",
      "Security penetration testing",
      "User acceptance validation"
    ],
    clientExample: {
      company: "Legal Technology Firm",
      challenge: "Achieving 99.5%+ accuracy for legal document analysis in production environment",
      solution: "Multi-layered validation with AI model fine-tuning and human oversight",
      outcome: "99.8% accuracy with 40% faster user adoption"
    },
    metrics: {
      duration: "2-3 weeks",
      deliverable: "Validated system",
      impact: "Quality assurance"
    }
  },
  {
    id: 5,
    title: "Launch & Optimization",
    subtitle: "Continuous Excellence",
    description: "Strategic deployment with ongoing performance monitoring and continuous improvement cycles.",
    icon: Rocket,
    keyInsights: [
      "Phased rollout strategy",
      "Real-time monitoring systems",
      "User training programs",
      "Performance optimization cycles"
    ],
    clientExample: {
      company: "Legal Technology Firm",
      challenge: "Seamless adoption across 120 attorneys without productivity disruption",
      solution: "Champion-led rollout with comprehensive training and support systems",
      outcome: "95% adoption rate within 3 weeks, 45-minute to 3-minute query reduction"
    },
    metrics: {
      duration: "Ongoing",
      deliverable: "Live system + support",
      impact: "Sustained transformation"
    }
  }
];

export default function DienstenPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleStepNavigation = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    const stepElement = document.getElementById(`step-${stepIndex}`);
    if (stepElement) {
      stepElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sophisticated background gradients using brand colors
  const getStepBackground = (index: number): string => {
    const backgrounds = [
      // Hero: Deep brand blue with subtle yellow glow
      "bg-gradient-to-br from-[#0f1419] via-[#1C2C55] to-[#0a1628]",
      // Step 1: Radial blue with yellow accent
      "bg-gradient-to-r from-[#1C2C55] via-[#2a3f6b] to-[#1a2951]",
      // Step 2: Diagonal sophisticated blue
      "bg-gradient-to-tr from-[#0f1419] via-[#1C2C55] to-[#243560]",
      // Step 3: Complex multi-directional blue
      "bg-gradient-to-bl from-[#1a2951] via-[#1C2C55] to-[#0f1419]",
      // Step 4: Sophisticated blue with warm undertones
      "bg-gradient-to-tl from-[#1C2C55] via-[#243560] to-[#1a2951]",
      // Step 5: Premium blue with subtle yellow energy
      "bg-gradient-to-br from-[#0f1419] via-[#1C2C55] to-[#243560]",
      // CTA: Premium gradient finale
      "bg-gradient-to-r from-[#1a2951] via-[#1C2C55] to-[#0f1419]"
    ];
    
    return backgrounds[index] || backgrounds[0];
  };

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section - Sophisticated Introduction */}
      <section className={`min-h-screen flex items-center justify-center relative overflow-hidden ${getStepBackground(0)}`}>
        {/* Sophisticated floating elements with brand colors */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              x: [0, 120, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#F7E69B]/20 to-[#F7E69B]/5 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, 80, 0],
              scale: [1, 0.8, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-[#1C2C55]/30 to-[#243560]/20 rounded-full blur-3xl"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center z-10 px-6 max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/8 backdrop-blur-xl border border-white/15 shadow-2xl">
              <div className="w-3 h-3 rounded-full bg-[#F7E69B] animate-pulse"></div>
              <span className="text-white/90 font-light tracking-wider text-lg">Premium Process</span>
            </div>
          </motion.div>

          <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-extralight text-white mb-12 tracking-tight leading-none">
            Strategic
            <span className="block bg-gradient-to-r from-[#F7E69B] via-[#F7E69B]/80 to-[#F7E69B] bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="text-2xl md:text-3xl text-slate-300 font-extralight max-w-5xl mx-auto leading-relaxed mb-20 tracking-wide"
          >
            Transforming digital ambitions into measurable business outcomes through 
            methodical excellence and innovative engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="cursor-pointer"
            onClick={() => handleStepNavigation(0)}
          >
            <div className="inline-flex flex-col items-center gap-6 text-white/60 hover:text-white transition-all duration-700">
              <span className="font-extralight tracking-[0.3em] text-sm uppercase">Explore Process</span>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm hover:border-[#F7E69B]/50 transition-all duration-500"
              >
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Step 1: Discovery - Asymmetric Layout */}
      <section
        id="step-0"
        className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden ${getStepBackground(1)}`}
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              x: [0, 80, 0],
              y: [0, -40, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/5 left-1/5 w-[400px] h-[400px] bg-gradient-to-r from-[#F7E69B]/15 to-[#F7E69B]/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            {/* Left: Content - 8 columns */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-8 space-y-12"
            >
              <div className="space-y-8">
                <div className="inline-flex items-center gap-5 px-8 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#1C2C55] to-[#243560] flex items-center justify-center shadow-xl">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">Phase {processSteps[0].id}</div>
                    <div className="text-lg text-white/60 font-light tracking-wide">{processSteps[0].subtitle}</div>
                  </div>
                </div>

                <h2 className="text-7xl md:text-8xl font-extralight text-white tracking-tight leading-none">
                  {processSteps[0].title}
                </h2>
                
                <p className="text-2xl text-white/85 font-light leading-relaxed max-w-3xl">
                  {processSteps[0].description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {processSteps[0].keyInsights.map((insight: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    className="flex items-center gap-5 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/8 transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#F7E69B] to-[#F7E69B]/80 flex items-center justify-center shadow-lg">
                      <span className="text-[#1C2C55] text-lg font-bold">{i + 1}</span>
                    </div>
                    <span className="text-white/90 font-light leading-relaxed text-lg">{insight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Client Case - 4 columns */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="lg:col-span-4"
            >
              <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-10 border border-white/15 shadow-2xl">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{processSteps[0].clientExample.company}</h3>
                    <p className="text-white/50 text-sm font-light tracking-wide uppercase">Case Study</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[#F7E69B] font-semibold mb-3 tracking-wide text-lg">Challenge</h4>
                      <p className="text-white/85 leading-relaxed font-light">{processSteps[0].clientExample.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-[#F7E69B] font-semibold mb-3 tracking-wide text-lg">Approach</h4>
                      <p className="text-white/85 leading-relaxed font-light">{processSteps[0].clientExample.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-[#F7E69B] font-semibold mb-3 tracking-wide text-lg">Result</h4>
                      <p className="text-white/85 leading-relaxed font-light">{processSteps[0].clientExample.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4 bg-white/8 backdrop-blur-xl rounded-full px-10 py-5 border border-white/15 shadow-2xl z-50">
            {processSteps.map((_, dotIndex) => (
              <motion.button
                key={dotIndex}
                onClick={() => handleStepNavigation(dotIndex)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`relative transition-all duration-700 ${
                  0 === dotIndex 
                    ? 'w-16 h-5 bg-gradient-to-r from-[#F7E69B] to-[#F7E69B]/80 rounded-full shadow-lg' 
                    : 'w-5 h-5 bg-white/30 rounded-full hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Step 2: Architecture - Centered Showcase Layout */}
      <section
        id="step-1"
        className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden ${getStepBackground(2)}`}
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              x: [0, -60, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-to-l from-[#F7E69B]/12 to-[#F7E69B]/3 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-20"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-[#1C2C55] to-[#243560] flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <Lightbulb className="h-12 w-12 text-white" />
              </div>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/8 backdrop-blur-sm border border-white/15 mb-8">
                <span className="text-white/80 text-lg font-light tracking-wide">Phase {processSteps[1].id}</span>
                <div className="w-2 h-2 rounded-full bg-white/40"></div>
                <span className="text-white/60 text-lg font-light">{processSteps[1].subtitle}</span>
              </div>
              
              <h2 className="text-7xl md:text-8xl font-extralight text-white mb-8 tracking-tight">
                {processSteps[1].title}
              </h2>
              
              <p className="text-2xl text-white/85 font-light leading-relaxed max-w-4xl mx-auto">
                {processSteps[1].description}
              </p>
            </motion.div>

            {/* Architecture showcase grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {processSteps[1].keyInsights.map((insight: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.25 }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="bg-white/8 backdrop-blur-xl rounded-2xl p-8 border border-white/15 shadow-xl hover:shadow-2xl transition-all duration-700"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#F7E69B] to-[#F7E69B]/70 flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-[#1C2C55] font-bold text-xl">{i + 1}</span>
                  </div>
                  <p className="text-white/90 font-light leading-relaxed text-lg">{insight}</p>
                </motion.div>
              ))}
            </div>

            {/* Client story showcase */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1 }}
              className="bg-white/8 backdrop-blur-xl rounded-3xl p-12 border border-white/15 shadow-2xl max-w-5xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-white mb-12 text-center">Architecture in Practice</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#F7E69B]/20 to-[#F7E69B]/10 flex items-center justify-center mx-auto">
                    <div className="w-3 h-3 rounded-full bg-[#F7E69B]"></div>
                  </div>
                  <h4 className="text-[#F7E69B] font-semibold text-xl tracking-wide">Challenge</h4>
                  <p className="text-white/80 leading-relaxed font-light">{processSteps[1].clientExample.challenge}</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#F7E69B]/20 to-[#F7E69B]/10 flex items-center justify-center mx-auto">
                    <div className="w-3 h-3 rounded-full bg-[#F7E69B]"></div>
                  </div>
                  <h4 className="text-[#F7E69B] font-semibold text-xl tracking-wide">Solution</h4>
                  <p className="text-white/80 leading-relaxed font-light">{processSteps[1].clientExample.solution}</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#F7E69B]/20 to-[#F7E69B]/10 flex items-center justify-center mx-auto">
                    <div className="w-3 h-3 rounded-full bg-[#F7E69B]"></div>
                  </div>
                  <h4 className="text-[#F7E69B] font-semibold text-xl tracking-wide">Impact</h4>
                  <p className="text-white/80 leading-relaxed font-light">{processSteps[1].clientExample.outcome}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4 bg-white/8 backdrop-blur-xl rounded-full px-10 py-5 border border-white/15 shadow-2xl z-50">
            {processSteps.map((_, dotIndex) => (
              <motion.button
                key={dotIndex}
                onClick={() => handleStepNavigation(dotIndex)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`relative transition-all duration-700 ${
                  1 === dotIndex 
                    ? 'w-16 h-5 bg-gradient-to-r from-[#F7E69B] to-[#F7E69B]/80 rounded-full shadow-lg' 
                    : 'w-5 h-5 bg-white/30 rounded-full hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Step 3: Development - Split Technical Layout */}
      <section
        id="step-2"
        className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden ${getStepBackground(3)}`}
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/6 w-[350px] h-[350px] bg-gradient-to-r from-[#F7E69B]/18 to-[#F7E69B]/8 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* Left: Technical showcase - 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-3 space-y-10"
            >
              <div className="flex items-center gap-5 mb-10">
                <div className="w-18 h-18 rounded-2xl bg-gradient-to-r from-[#1C2C55] to-[#243560] flex items-center justify-center shadow-2xl">
                  <Code className="h-10 w-10 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-white">Phase {processSteps[2].id}</div>
                  <div className="text-xl text-white/60 font-light tracking-wide">{processSteps[2].subtitle}</div>
                </div>
              </div>

              <h2 className="text-6xl md:text-7xl font-extralight text-white tracking-tight leading-tight">
                {processSteps[2].title}
              </h2>
              
              <p className="text-xl text-white/85 font-light leading-relaxed">
                {processSteps[2].description}
              </p>

              {/* Technical terminal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="bg-[#0a0e1a]/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/30"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-4 h-4 rounded-full bg-red-400"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                  <div className="w-4 h-4 rounded-full bg-green-400"></div>
                  <span className="ml-6 text-slate-400 text-sm font-light tracking-wide">development-environment</span>
                </div>
                <div className="font-mono text-sm space-y-3 text-slate-300">
                  <div className="text-green-400">Enterprise-grade system architecture</div>
                  <div><span className="text-blue-400">const</span> <span className="text-yellow-300">system</span> = <span className="text-purple-400">new</span> <span className="text-blue-300">EnterpriseProcessor</span>();</div>
                  <div><span className="text-yellow-300">system</span>.<span className="text-green-300">initializeSecureInfrastructure</span>();</div>
                  <div><span className="text-yellow-300">system</span>.<span className="text-green-300">deployMicroservices</span>(<span className="text-orange-300">'production'</span>);</div>
                  <div><span className="text-yellow-300">system</span>.<span className="text-green-300">enableRealTimeMonitoring</span>();</div>
                  <div className="text-green-400">System operational and optimized</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Metrics and progress - 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, delay: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="bg-white/8 backdrop-blur-xl rounded-2xl p-8 border border-white/15 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-8">Development Progress</h4>
                <div className="space-y-6">
                  {[
                    { component: "Core Architecture", progress: 100, color: "from-green-400 to-emerald-500" },
                    { component: "AI Integration", progress: 90, color: "from-[#F7E69B] to-[#F7E69B]/70" },
                    { component: "Security Layer", progress: 95, color: "from-blue-400 to-indigo-500" },
                    { component: "API Gateway", progress: 85, color: "from-purple-400 to-violet-500" }
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 font-light">{item.component}</span>
                        <span className="text-[#F7E69B] font-bold">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-white/15 rounded-full h-3 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: i * 0.3, ease: "easeOut" }}
                          className={`bg-gradient-to-r ${item.color} h-3 rounded-full shadow-lg`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/8 backdrop-blur-xl rounded-2xl p-8 border border-white/15 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-6">Client Impact</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Processing Speed</span>
                    <span className="text-[#F7E69B] font-bold">340% faster</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Accuracy Rate</span>
                    <span className="text-green-400 font-bold">99.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">System Uptime</span>
                    <span className="text-blue-400 font-bold">99.99%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4 bg-white/8 backdrop-blur-xl rounded-full px-10 py-5 border border-white/15 shadow-2xl z-50">
            {processSteps.map((_, dotIndex) => (
              <motion.button
                key={dotIndex}
                onClick={() => handleStepNavigation(dotIndex)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`relative transition-all duration-700 ${
                  2 === dotIndex 
                    ? 'w-16 h-5 bg-gradient-to-r from-[#F7E69B] to-[#F7E69B]/80 rounded-full shadow-lg' 
                    : 'w-5 h-5 bg-white/30 rounded-full hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Step 4: Validation - Diagonal Split Layout */}
      <section
        id="step-3"
        className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden ${getStepBackground(4)}`}
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-to-r from-[#F7E69B]/14 to-[#F7E69B]/4 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Diagonal header layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-end mb-20">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#1C2C55] to-[#243560] flex items-center justify-center shadow-2xl">
                  <TestTube className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">Phase {processSteps[3].id}</div>
                  <div className="text-lg text-white/60 font-light">{processSteps[3].subtitle}</div>
                </div>
              </div>
              
              <h2 className="text-6xl md:text-7xl font-extralight text-white mb-8 tracking-tight text-left">
                {processSteps[3].title}
              </h2>
              
              <p className="text-xl text-white/85 font-light leading-relaxed text-left">
                {processSteps[3].description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="bg-white/8 backdrop-blur-xl rounded-2xl p-8 border border-white/15 shadow-xl"
            >
              <h4 className="text-xl font-bold text-white mb-6">Quality Metrics</h4>
              <div className="space-y-4">
                {[
                  { label: "Accuracy", value: "99.8%", icon: "target" },
                  { label: "Response", value: "<150ms", icon: "speed" },
                  { label: "Uptime", value: "99.99%", icon: "reliability" },
                  { label: "Satisfaction", value: "9.4/10", icon: "rating" }
                ].map((metric, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-white/80">{metric.label}</span>
                    <span className="text-[#F7E69B] font-bold text-lg">{metric.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Testing showcase grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-white/8 backdrop-blur-xl rounded-2xl p-10 border border-white/15 shadow-xl"
            >
              <h4 className="text-2xl font-bold text-white mb-8">Validation Process</h4>
              <div className="space-y-6">
                {processSteps[3].keyInsights.map((insight: string, i: number) => (
                  <div key={i} className="flex items-center gap-5 p-4 rounded-lg bg-white/5">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-white/90 font-light leading-relaxed">{insight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-white/8 backdrop-blur-xl rounded-2xl p-10 border border-white/15 shadow-xl"
            >
              <h4 className="text-2xl font-bold text-white mb-8">Client Validation</h4>
              <div className="space-y-6">
                <div>
                  <h5 className="text-[#F7E69B] font-semibold mb-3 text-lg">Challenge</h5>
                  <p className="text-white/80 leading-relaxed font-light">{processSteps[3].clientExample.challenge}</p>
                </div>
                <div>
                  <h5 className="text-[#F7E69B] font-semibold mb-3 text-lg">Solution</h5>
                  <p className="text-white/80 leading-relaxed font-light">{processSteps[3].clientExample.solution}</p>
                </div>
                <div>
                  <h5 className="text-[#F7E69B] font-semibold mb-3 text-lg">Outcome</h5>
                  <p className="text-white/80 leading-relaxed font-light">{processSteps[3].clientExample.outcome}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4 bg-white/8 backdrop-blur-xl rounded-full px-10 py-5 border border-white/15 shadow-2xl z-50">
            {processSteps.map((_, dotIndex) => (
              <motion.button
                key={dotIndex}
                onClick={() => handleStepNavigation(dotIndex)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`relative transition-all duration-700 ${
                  3 === dotIndex 
                    ? 'w-16 h-5 bg-gradient-to-r from-[#F7E69B] to-[#F7E69B]/80 rounded-full shadow-lg' 
                    : 'w-5 h-5 bg-white/30 rounded-full hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Step 5: Transformation - Grand Finale Layout */}
      <section
        id="step-4"
        className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden ${getStepBackground(5)}`}
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.08, 0.15, 0.08],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#F7E69B]/20 to-[#F7E69B]/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            {/* Grand header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-24"
            >
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-r from-[#1C2C55] to-[#243560] flex items-center justify-center mx-auto mb-12 shadow-2xl">
                <Rocket className="h-14 w-14 text-white" />
              </div>
              
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/8 backdrop-blur-sm border border-white/15 mb-10">
                <span className="text-white/80 text-xl font-light tracking-wide">Phase {processSteps[4].id}</span>
                <div className="w-2 h-2 rounded-full bg-white/40"></div>
                <span className="text-white/60 text-xl font-light">{processSteps[4].subtitle}</span>
              </div>
              
              <h2 className="text-7xl md:text-8xl font-extralight text-white mb-10 tracking-tight">
                {processSteps[4].title}
              </h2>
              
              <p className="text-2xl text-white/85 font-light leading-relaxed max-w-5xl mx-auto">
                {processSteps[4].description}
              </p>
            </motion.div>

            {/* Success metrics showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-white/8 backdrop-blur-xl rounded-2xl p-10 border border-white/15 shadow-xl"
              >
                <h4 className="text-2xl font-bold text-white mb-8">System Status</h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-white/80">Operational</span>
                    </div>
                    <span className="text-green-400 font-bold">Live</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Active Users</span>
                    <span className="text-[#F7E69B] font-bold text-xl">247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Daily Queries</span>
                    <span className="text-[#F7E69B] font-bold text-xl">1,834</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Avg Response</span>
                    <span className="text-green-400 font-bold">0.8s</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="bg-white/8 backdrop-blur-xl rounded-2xl p-10 border border-white/15 shadow-xl"
              >
                <h4 className="text-2xl font-bold text-white mb-8">Support Framework</h4>
                <div className="space-y-6">
                  {processSteps[4].keyInsights.map((insight: string, i: number) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F7E69B] to-[#F7E69B]/70 flex items-center justify-center mt-1 shadow">
                        <span className="text-[#1C2C55] text-sm font-bold">✓</span>
                      </div>
                      <span className="text-white/80 leading-relaxed font-light">{insight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="bg-white/8 backdrop-blur-xl rounded-2xl p-10 border border-white/15 shadow-xl"
              >
                <h4 className="text-2xl font-bold text-white mb-8">Business Impact</h4>
                <div className="space-y-6">
                  <div className="text-center p-6 rounded-xl bg-white/5">
                    <div className="text-4xl font-bold text-[#F7E69B] mb-2">85%</div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">Faster Retrieval</div>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-white/5">
                    <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">Availability</div>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-white/5">
                    <div className="text-4xl font-bold text-blue-400 mb-2">€180K</div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">Annual Savings</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Final transformation story */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="bg-white/8 backdrop-blur-xl rounded-3xl p-12 border border-white/15 shadow-2xl max-w-5xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-white mb-10 text-center">Transformation Complete</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#F7E69B]/20 to-[#F7E69B]/10 flex items-center justify-center mx-auto">
                    <div className="w-4 h-4 rounded-full bg-[#F7E69B]"></div>
                  </div>
                  <h4 className="text-[#F7E69B] font-semibold text-xl">Deployment</h4>
                  <p className="text-white/80 leading-relaxed font-light">{processSteps[4].clientExample.challenge}</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#F7E69B]/20 to-[#F7E69B]/10 flex items-center justify-center mx-auto">
                    <div className="w-4 h-4 rounded-full bg-[#F7E69B]"></div>
                  </div>
                  <h4 className="text-[#F7E69B] font-semibold text-xl">Adoption</h4>
                  <p className="text-white/80 leading-relaxed font-light">{processSteps[4].clientExample.solution}</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#F7E69B]/20 to-[#F7E69B]/10 flex items-center justify-center mx-auto">
                    <div className="w-4 h-4 rounded-full bg-[#F7E69B]"></div>
                  </div>
                  <h4 className="text-[#F7E69B] font-semibold text-xl">Results</h4>
                  <p className="text-white/80 leading-relaxed font-light">{processSteps[4].clientExample.outcome}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4 bg-white/8 backdrop-blur-xl rounded-full px-10 py-5 border border-white/15 shadow-2xl z-50">
            {processSteps.map((_, dotIndex) => (
              <motion.button
                key={dotIndex}
                onClick={() => handleStepNavigation(dotIndex)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`relative transition-all duration-700 ${
                  4 === dotIndex 
                    ? 'w-16 h-5 bg-gradient-to-r from-[#F7E69B] to-[#F7E69B]/80 rounded-full shadow-lg' 
                    : 'w-5 h-5 bg-white/30 rounded-full hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className={`min-h-screen flex items-center justify-center relative overflow-hidden ${getStepBackground(6)}`}>
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 270, 360]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#F7E69B]/15 to-[#F7E69B]/5 rounded-full blur-3xl"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center z-10 px-6 max-w-6xl mx-auto"
        >
          <h2 className="text-7xl md:text-8xl font-extralight text-white mb-12 tracking-tight leading-tight">
            Ready for
            <span className="block bg-gradient-to-r from-[#F7E69B] via-[#F7E69B]/90 to-[#F7E69B] bg-clip-text text-transparent">
              Excellence?
            </span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-slate-300 font-extralight max-w-4xl mx-auto leading-relaxed mb-20">
            Transform your digital vision into measurable business impact. 
            Your ambition deserves exceptional execution.
          </p>

          <motion.div
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProjectRequestDialog 
              buttonText="Begin Your Transformation"
              buttonClassName="bg-gradient-to-r from-[#F7E69B] via-[#F7E69B]/90 to-[#F7E69B] hover:from-[#F7E69B]/90 hover:via-[#F7E69B]/80 hover:to-[#F7E69B]/90 text-[#1C2C55] px-16 py-8 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-700 font-semibold tracking-wide border border-[#F7E69B]/30"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}