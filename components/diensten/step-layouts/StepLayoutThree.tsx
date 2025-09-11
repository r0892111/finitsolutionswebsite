"use client";

import { motion } from "framer-motion";
import { ProcessStep } from "@/types/diensten";

interface StepLayoutThreeProps {
  step: ProcessStep;
  isEven: boolean;
}

export function StepLayoutThree({ step, isEven }: StepLayoutThreeProps) {
  const IconComponent = step.icon;
  
  return (
    <div className="relative">
      {/* Three-column development layout */}
      <div className="relative overflow-hidden">
        <div className="relative rounded-3xl shadow-4xl border border-white/30 overflow-hidden"
             style={{
               background: `
                 radial-gradient(800px 600px at 80% 20%, rgba(28,44,85,0.95) 0%, rgba(28,44,85,0.15) 70%),
                 radial-gradient(600px 400px at 20% 80%, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.05) 60%),
                 radial-gradient(400px 300px at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)
               `
             }}>
          
          <div className="p-16 relative">
            {/* Header with large number */}
            <div className="text-center mb-16 step-number-marker">
              <div className="text-9xl font-bold leading-none bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 bg-clip-text text-transparent opacity-40 mb-8">
                03
              </div>
              
              <div className="inline-block px-6 py-3 rounded-full text-sm font-medium mb-6 bg-gradient-to-r from-slate-100 to-white border border-slate-200/50 shadow-sm" style={{ color: '#1C2C55' }}>
                {step.subtitle}
              </div>
              
              <h2 className="finit-h1 mb-6" style={{ color: '#1C2C55' }}>
                {step.title}
              </h2>
              
              <p className="finit-body max-w-4xl mx-auto" style={{ color: '#202226' }}>
                {step.description}
              </p>
            </div>

            {/* Three-column grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Code Preview */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="finit-h2 mb-6" style={{ color: '#1C2C55' }}>Code Preview</h3>
                
                {/* Terminal-style code window */}
                <div className="rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, #202226 0%, #1a1d21 100%)' }}>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-slate-400 text-xs ml-2 font-mono">development.ts</span>
                  </div>
                  <div className="p-6 font-mono text-sm space-y-2">
                    <div className="text-green-400">// AI-gedreven kennisbank implementatie</div>
                    <div><span className="text-blue-400">const</span> <span className="text-yellow-300">ragSystem</span> = <span className="text-purple-400">new</span> <span className="text-blue-300">DocumentProcessor</span>();</div>
                    <div><span className="text-yellow-300">ragSystem</span>.<span className="text-green-300">ingestDocuments</span>(<span className="text-orange-300">'juridische-database'</span>);</div>
                    <div><span className="text-yellow-300">ragSystem</span>.<span className="text-green-300">createIndex</span>(<span className="text-orange-300">'vector-embeddings'</span>);</div>
                    <div><span className="text-yellow-300">ragSystem</span>.<span className="text-green-300">enableChat</span>(<span className="text-orange-300">'natuurlijke-taal'</span>);</div>
                  </div>
                </div>

                {/* Build metrics */}
                <div className="p-6 rounded-xl shadow-lg border"
                     style={{
                       background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(34,197,94,0.15) 100%)',
                       borderColor: 'rgba(28,44,85,0.1)'
                     }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1C2C55' }}>Build Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#202226' }}>Tests</span>
                      <span className="text-green-600 font-bold">247 passed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#202226' }}>Coverage</span>
                      <span className="text-green-600 font-bold">94.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#202226' }}>Build time</span>
                      <span className="text-green-600 font-bold">2.3s</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Middle Column - Development Process */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="finit-h2 mb-6" style={{ color: '#1C2C55' }}>Ontwikkelingsproces</h3>
                
                <div className="space-y-4">
                  {step.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(34,197,94,0.15) 100%)',
                        borderColor: 'rgba(28,44,85,0.1)'
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                           style={{ background: 'linear-gradient(135deg, #22c55e 0%, rgba(34,197,94,0.8) 100%)' }}>
                        <span className="text-white text-sm font-bold">{i + 1}</span>
                      </div>
                      <span className="finit-body font-medium leading-relaxed" style={{ color: '#202226' }}>{detail}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Architecture components */}
                <div className="p-6 rounded-xl shadow-lg border"
                     style={{
                       background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(34,197,94,0.15) 100%)',
                       borderColor: 'rgba(28,44,85,0.1)'
                     }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1C2C55' }}>Technische Componenten</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["API Gateway", "Database", "AI Engine", "Frontend", "Security", "Monitoring"].map((component, i) => (
                      <div key={i} className="p-3 rounded-lg text-center text-sm font-medium border transition-all duration-300 hover:scale-105"
                           style={{ 
                             background: 'linear-gradient(135deg, rgba(28,44,85,0.9) 0%, rgba(28,44,85,0.7) 100%)',
                             borderColor: 'rgba(28,44,85,0.3)',
                             color: 'white'
                           }}>
                        {component}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Client Case & Performance */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="p-8 rounded-2xl border shadow-lg"
                     style={{ 
                       background: `
                         radial-gradient(400px 300px at 30% 20%, rgba(28,44,85,0.95) 0%, rgba(28,44,85,0.85) 100%),
                         linear-gradient(135deg, rgba(28,44,85,0.9) 0%, rgba(28,44,85,0.95) 100%)
                       `,
                       borderColor: 'rgba(28,44,85,0.3)'
                     }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/25 to-white/15 flex items-center justify-center border border-white/30 shadow-lg">
                      <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <h4 className="finit-h2 text-white">Client Case</h4>
                  </div>
                  <p className="finit-body text-white/90 italic mb-6 leading-relaxed">
                    &ldquo;{step.useCase}&rdquo;
                  </p>
                  
                  {/* Development progress indicators */}
                  <div className="space-y-4">
                    <h4 className="finit-body font-medium text-white/80 mb-4">Ontwikkelingsstatus:</h4>
                    {["Backend API", "AI Integration", "Frontend UI", "Testing Suite"].map((component, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border transition-all duration-300"
                           style={{ 
                             background: 'linear-gradient(135deg, rgba(34,197,94,0.9) 0%, rgba(34,197,94,0.7) 100%)',
                             borderColor: 'rgba(34,197,94,0.3)'
                           }}>
                        <span className="finit-body font-medium text-white">{component}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance metrics */}
                <div className="p-6 rounded-xl shadow-lg border"
                     style={{
                       background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(34,197,94,0.15) 100%)',
                       borderColor: 'rgba(28,44,85,0.1)'
                     }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1C2C55' }}>Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#202226' }}>Response Time</span>
                      <span className="text-green-600 font-bold">&lt;200ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#202226' }}>Throughput</span>
                      <span className="text-green-600 font-bold">10TB/day</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#202226' }}>Uptime</span>
                      <span className="text-green-600 font-bold">99.9%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}