"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, ExternalLink, CheckCircle2, Clock, Users, TrendingUp, Zap, Shield, Brain } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function MarketplacePage() {
  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* Hero Section with Dark Blue Canvas */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#1C2C55' }}>
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Navigation breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                <span>Marketplace</span> 
                <ChevronRight className="h-4 w-4 ml-2" />
              </div>
            </motion.div>
            
            {/* Hero Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight tracking-tight"
            >
              Ready-to-Deploy
              <br />
              <span className="relative inline-block">
                AI Solutions
                <div 
                  className="absolute inset-0 -z-10 rounded-full opacity-80"
                  style={{
                    background: 'linear-gradient(90deg, #F7E69B 0%, rgba(247,230,155,0.6) 100%)',
                    padding: '0.1em 0.35em',
                    boxShadow: '0 8px 24px rgba(28,44,85,0.18)'
                  }}
                />
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/90 font-regular leading-relaxed max-w-3xl mx-auto mb-12"
            >
              Enterprise-grade AI tools that integrate seamlessly with your existing systems. 
              No complex setup, no lengthy implementations — just immediate value.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">3 min</div>
                <div className="text-sm text-white/70">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-white/70">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-white/70">Support</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Product Section - VoiceLink */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-700 mb-6 border border-green-200">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <span>Now Available</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1C2C55' }}>
              VoiceLink
            </h2>
            <p className="text-lg" style={{ color: '#202226' }} className="max-w-2xl mx-auto">
              Transform voice notes into structured CRM data automatically
            </p>
          </motion.div>

          {/* Product Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Left Column - Product Image */}
                <div className="lg:col-span-2 relative h-80 lg:h-96">
                  <Image
                    src="/finit voicelink 1@4x-100.jpg"
                    alt="VoiceLink Interface"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    unoptimized
                  />
                  {/* Status overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      LIVE
                    </div>
                  </div>
                </div>

                {/* Right Column - Product Details */}
                <div className="lg:col-span-3 p-8 lg:p-12">
                  <div className="space-y-8">
                    {/* Category */}
                    <div>
                      <Badge 
                        className="text-sm font-medium px-4 py-2"
                        style={{ 
                          backgroundColor: 'rgba(28,44,85,0.1)', 
                          color: '#1C2C55',
                          border: '1px solid rgba(28,44,85,0.2)'
                        }}
                      >
                        Sales & CRM
                      </Badge>
                    </div>

                    {/* Product Description */}
                    <div>
                      <p className="text-lg leading-relaxed" style={{ color: '#202226' }}>
                        Your sales team sends a WhatsApp voice message with client visit details — 
                        client name, quote amount, follow-up appointments — and everything appears 
                        automatically in your CRM of choice.
                      </p>
                    </div>

                    {/* Key Benefits */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium" style={{ color: '#1C2C55' }}>
                        Key Benefits
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          "WhatsApp voice recognition",
                          "Automatic CRM integration", 
                          "3-minute installation",
                          "Works with any CRM system"
                        ].map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div 
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: '#1C2C55' }}
                            >
                              <CheckCircle2 className="h-3 w-3 text-white" />
                            </div>
                            <span className="font-regular" style={{ color: '#202226' }}>
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Value Proposition */}
                    <div 
                      className="rounded-xl p-6 border"
                      style={{ 
                        backgroundColor: 'rgba(28,44,85,0.05)',
                        borderColor: 'rgba(28,44,85,0.1)'
                      }}
                    >
                      <p className="text-center font-medium italic" style={{ color: '#1C2C55' }}>
                        "More time with clients, less time on administration"
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href="https://voicelink.me" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button 
                          size="lg" 
                          className="w-full text-white font-medium py-4 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300"
                          style={{ backgroundColor: '#1C2C55' }}
                        >
                          <span>Explore VoiceLink</span>
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </Button>
                      </a>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="flex-1 font-medium py-4 rounded-xl border-2 transition-all duration-300"
                        style={{ 
                          borderColor: '#1C2C55',
                          color: '#1C2C55'
                        }}
                        onClick={() => window.location.href = '/#contact'}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1C2C55' }}>
              Proven Results
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#202226' }}>
              Real metrics from businesses using VoiceLink
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                metric: "2 hours",
                description: "Saved per salesperson daily",
                detail: "Less administrative work"
              },
              {
                icon: TrendingUp,
                metric: "90%",
                description: "Reduction in data entry errors",
                detail: "Automated accuracy"
              },
              {
                icon: Users,
                metric: "+1 visit",
                description: "Extra client visit per day",
                detail: "More selling time"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="text-center p-8 bg-white rounded-2xl shadow-soft border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: 'rgba(28,44,85,0.1)' }}
                    >
                      <stat.icon className="h-8 w-8" style={{ color: '#1C2C55' }} />
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#1C2C55' }}>
                      {stat.metric}
                    </div>
                    <div className="text-lg font-medium mb-2" style={{ color: '#202226' }}>
                      {stat.description}
                    </div>
                    <div className="text-sm" style={{ color: 'rgba(32,34,38,0.7)' }}>
                      {stat.detail}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1C2C55' }}>
              Works with Your CRM
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#202226' }}>
              Seamless integration with leading CRM platforms
            </p>
          </motion.div>

          {/* CRM Integration Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
              { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
              { name: "Pipedrive", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Pipedrive_Logo.svg" },
              { name: "Teamleader", logo: "/Logo_Teamleader_Default_CMYK.jpg" },
              { name: "Odoo", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Odoo_logo.svg" },
              { name: "Zoho", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/ZOHO_logo_2023.svg" }
            ].map((crm, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md">
                  <div className="relative h-12 w-full">
                    <Image
                      src={crm.logo}
                      alt={`${crm.name} logo`}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      sizes="120px"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                          const fallbackDiv = document.createElement('div');
                          fallbackDiv.className = 'fallback-text flex items-center justify-center h-full w-full';
                          fallbackDiv.innerHTML = `<span class="text-sm font-medium text-gray-600">${crm.name}</span>`;
                          parent.appendChild(fallbackDiv);
                        }
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#1C2C55' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/80 mb-6 border border-white/20">
              <Clock className="h-4 w-4 mr-2" />
              <span>In Development</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              More Solutions Coming Soon
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              We're continuously developing new AI solutions to streamline your business operations
            </p>
          </motion.div>

          {/* Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "AI Document Processor",
                description: "Automatic document analysis and data extraction with intelligent categorization",
                category: "Document Management",
                icon: Brain
              },
              {
                title: "Smart Dashboard Builder",
                description: "Generate real-time dashboards automatically from your existing data sources",
                category: "Business Intelligence", 
                icon: TrendingUp
              },
              {
                title: "AI Meeting Assistant",
                description: "Automatic notes, action items and follow-ups for all your meetings",
                category: "Productivity",
                icon: Users
              }
            ].map((preview, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: 'rgba(247,230,155,0.2)' }}
                    >
                      <preview.icon className="h-8 w-8" style={{ color: '#F7E69B' }} />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/20 text-white/90 border border-white/30 font-medium"
                      >
                        {preview.category}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-4">
                      {preview.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/80 leading-relaxed mb-6">
                      {preview.description}
                    </p>

                    {/* Status */}
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white/70 border border-white/20">
                        <span className="text-sm font-medium">Coming Soon</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1C2C55' }}>
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-lg mb-12" style={{ color: '#202226' }}>
              Join forward-thinking businesses already using our AI solutions to save time and increase productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://voicelink.me" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="text-white font-medium px-8 py-4 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#1C2C55' }}
                >
                  Try VoiceLink Free
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline"
                className="font-medium px-8 py-4 rounded-xl border-2 transition-all duration-300"
                style={{ 
                  borderColor: '#1C2C55',
                  color: '#1C2C55'
                }}
                onClick={() => window.location.href = '/#contact'}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}