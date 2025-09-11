"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles, ArrowRight, Mic, ExternalLink, Play, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function MarketplacePage() {
  return (
    <main className="pt-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Hero Section with Premium Layout */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/8 to-blue-500/8 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/6 to-primary/6 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/4 to-yellow-500/4 rounded-full blur-3xl animate-float-fast"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-12"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary mb-8 border border-primary/20 shadow-lg backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Premium SaaS Solutions</span> 
                <ChevronRight className="h-4 w-4 ml-2" />
              </div>
            </motion.div>
            
            {/* Subtle Marketplace Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <div className="flex justify-center mb-6">
                <Image
                  src="/Finit Marketplace Blue@4x.png"
                  alt="Finit Solutions Marketplace"
                  width={200}
                  height={100}
                  className="object-contain opacity-90"
                  priority
                />
              </div>
            </motion.div>
            
            {/* Hero Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-6xl lg:text-7xl font-extralight mb-8 bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent tracking-tight leading-tight"
            >
              Plug & Play
              <span className="block font-light">AI Solutions</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed tracking-wide max-w-4xl mx-auto"
            >
              Ontdek onze curated collectie van enterprise-grade AI-oplossingen. 
              Professionele tools die uw bedrijfsprocessen transformeren binnen minuten.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Product Section - VoiceLink Showcase */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 mb-6 border border-green-500/20">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <span>Nu Beschikbaar</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-slate-900 tracking-tight">
              VoiceLink
            </h2>
            <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
              De eerste AI-oplossing uit onze marketplace. Transformeer spraaknotities automatisch naar gestructureerde CRM-data.
            </p>
          </motion.div>

          {/* Premium Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-6xl mx-auto"
          >
            <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-3xl hover:shadow-4xl transition-all duration-700 group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column - Visual */}
                <div className="relative h-80 lg:h-96 overflow-hidden">
                  <Image
                    src="/finit voicelink 1@4x-100.jpg"
                    alt="VoiceLink Interface"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-600/20"></div>
                  
                  {/* Floating Status Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      LIVE
                    </div>
                  </div>

                  {/* Premium CTA Button - Top Right */}
                  <div className="absolute top-6 right-6">
                    <a 
                      href="https://voicelink.me" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm text-primary text-sm font-bold rounded-full shadow-xl hover:shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300 border border-white/50"
                    >
                      <span>Probeer Nu</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute bottom-6 right-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl border border-white/50">
                      <Mic className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <CardContent className="p-12 lg:p-16 flex flex-col justify-center">
                  <div className="space-y-8">
                    {/* Category Badge */}
                    <div>
                      <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold px-4 py-2">
                        Sales & CRM
                      </Badge>
                    </div>

                    {/* Product Title */}
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 tracking-tight">
                        VoiceLink
                      </h3>
                      <p className="text-lg text-slate-600 font-light leading-relaxed">
                        Uw verkopers sturen een WhatsApp spraakbericht met hun klantbezoek - klantnaam, 
                        offertebedrag, vervolgafspraken - en alles staat automatisch op de juiste plaats 
                        in uw CRM naar keuze.
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-slate-900">Belangrijkste Features:</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          "WhatsApp spraakherkenning",
                          "Automatische CRM-integratie", 
                          "3 minuten installatie",
                          "Plug & play oplossing"
                        ].map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center shadow">
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-slate-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Value Proposition */}
                    <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl p-6 border border-primary/10">
                      <p className="text-slate-800 font-medium text-center italic">
                        "Meer tijd voor klanten, minder tijd aan administratie"
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <a 
                        href="https://voicelink.me" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button 
                          size="lg" 
                          className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg py-4 rounded-xl"
                        >
                          <span>Ontdek VoiceLink</span>
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </Button>
                      </a>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-4 rounded-xl"
                        onClick={() => window.location.href = '/#contact'}
                      >
                        <span>Meer Info</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-100 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-primary/8 to-blue-500/8 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-700 mb-6 border border-amber-500/20">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Binnenkort Beschikbaar</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-slate-900 tracking-tight">
              Meer Innovaties Onderweg
            </h2>
            <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
              We ontwikkelen voortdurend nieuwe AI-oplossingen die uw bedrijfsprocessen transformeren. 
              Blijf op de hoogte van onze nieuwste releases.
            </p>
          </motion.div>

          {/* Preview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "AI Document Processor",
                description: "Automatische verwerking en analyse van documenten met intelligente data-extractie",
                category: "Document Management",
                icon: "📄"
              },
              {
                title: "Smart Dashboard Builder",
                description: "Genereer real-time dashboards automatisch uit uw bestaande data bronnen",
                category: "Business Intelligence", 
                icon: "📊"
              },
              {
                title: "AI Meeting Assistant",
                description: "Automatische notities, actiepunten en follow-ups voor al uw vergaderingen",
                category: "Productivity",
                icon: "🤖"
              }
            ].map((preview, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Icon */}
                    <div className="text-4xl mb-6 text-center">
                      {preview.icon}
                    </div>

                    {/* Category */}
                    <div className="mb-4 text-center">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium">
                        {preview.category}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 mb-4 text-center">
                      {preview.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed text-center mb-6">
                      {preview.description}
                    </p>

                    {/* Coming Soon Badge */}
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-700 border border-amber-500/20">
                        <span className="text-sm font-medium">Binnenkort</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-slate-900 via-primary to-slate-900 relative overflow-hidden">
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-medium"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-white tracking-tight">
              Interesse in een specifieke oplossing?
            </h2>
            <p className="text-blue-100 text-xl mb-12 font-light leading-relaxed tracking-wide">
              We ontwikkelen voortdurend nieuwe enterprise-grade AI-oplossingen. 
              Vertel ons wat u nodig heeft en we houden u op de hoogte van nieuwe releases.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-4 rounded-full"
                onClick={() => window.location.href = '/#contact'}
              >
                Neem contact op
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a 
                href="https://voicelink.me" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/15 backdrop-blur-xl text-white border border-white/30 hover:bg-white/25 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-4 rounded-full"
                >
                  Probeer VoiceLink
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}