"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, CheckCircle2, Users, TrendingUp, Clock, Shield } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MarketplacePage() {
  return (
    <main className="pt-20 bg-white min-h-screen font-general-sans">
      {/* Hero Section - Dark Blue Canvas */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#1C2C55' }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <div className="inline-block mb-8">
                <Image
                  src="/Finit Marketplace Blue@4x.png"
                  alt="Finit Solutions Marketplace"
                  width={240}
                  height={120}
                  className="object-contain opacity-90"
                  priority
                />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="finit-h1 text-white mb-8"
            >
              Plug & play <span className="finit-highlight">AI solutions</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="finit-body text-white/90 max-w-3xl mx-auto"
            >
              Ontdek onze curated collectie van enterprise-grade AI-oplossingen. 
              Professionele tools die uw bedrijfsprocessen transformeren binnen minuten.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Product Section - VoiceLink */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-green-50 text-green-700 mb-8 border border-green-200">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <span>Nu beschikbaar</span>
            </div>
            <h2 className="finit-h2 mb-6" style={{ color: '#1C2C55' }}>
              VoiceLink
            </h2>
            <p className="finit-body max-w-3xl mx-auto" style={{ color: '#202226' }}>
              De eerste AI-oplossing uit onze marketplace. Transformeer spraaknotities automatisch naar gestructureerde CRM-data.
            </p>
          </motion.div>

          {/* VoiceLink Product Card - Professional Layout */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-6xl mx-auto"
          >
            <Card className="overflow-hidden bg-white border border-gray-200 shadow-soft hover:shadow-lg transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Product Image - 2/5 width */}
                <div className="lg:col-span-2 relative h-80 lg:h-96 overflow-hidden">
                  <Image
                    src="/finit voicelink 1@4x-100.jpg"
                    alt="VoiceLink Interface"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    unoptimized
                  />
                  
                  {/* Status Badge - Professional positioning */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-soft">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      LIVE
                    </div>
                  </div>

                  {/* CTA Button - Top Right */}
                  <div className="absolute top-6 right-6">
                    <a 
                      href="https://voicelink.me" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium rounded-full shadow-soft hover:shadow-lg transition-all duration-300"
                      style={{ backgroundColor: '#1C2C55' }}
                    >
                      <span>Probeer nu</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Product Details - 3/5 width */}
                <CardContent className="lg:col-span-3 p-12 lg:p-16 flex flex-col justify-center">
                  <div className="space-y-8">
                    {/* Category */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 border border-blue-200" style={{ color: '#1C2C55' }}>
                      Sales & CRM
                    </div>

                    {/* Product Title and Description */}
                    <div>
                      <h3 className="finit-h2 mb-6" style={{ color: '#1C2C55' }}>
                        VoiceLink
                      </h3>
                      <p className="finit-body mb-8" style={{ color: '#202226' }}>
                        Uw verkopers sturen een WhatsApp spraakbericht met hun klantbezoek - klantnaam, 
                        offertebedrag, vervolgafspraken - en alles staat automatisch op de juiste plaats 
                        in uw CRM naar keuze.
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-medium" style={{ color: '#1C2C55' }}>Belangrijkste features:</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          "WhatsApp spraakherkenning",
                          "Automatische CRM-integratie", 
                          "3 minuten installatie",
                          "Plug & play oplossing"
                        ].map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1C2C55' }}>
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            </div>
                            <span className="finit-body font-medium" style={{ color: '#202226' }}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Value Proposition */}
                    <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#F7E69B', borderColor: '#1C2C55' }}>
                      <p className="finit-body text-center font-medium" style={{ color: '#1C2C55' }}>
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
                          className="w-full text-white shadow-soft hover:shadow-lg transition-all duration-300 text-lg py-4 rounded-2xl font-medium"
                          style={{ backgroundColor: '#1C2C55' }}
                        >
                          <span>Ontdek VoiceLink</span>
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </Button>
                      </a>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="flex-1 text-lg py-4 rounded-2xl font-medium shadow-soft hover:shadow-lg transition-all duration-300"
                        style={{ borderColor: '#1C2C55', color: '#1C2C55' }}
                        onClick={() => window.location.href = '/#contact'}
                      >
                        <span>Meer info</span>
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

      {/* Performance Metrics Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="finit-h2 mb-6" style={{ color: '#1C2C55' }}>
              Bewezen resultaten
            </h2>
            <p className="finit-body max-w-3xl mx-auto" style={{ color: '#202226' }}>
              VoiceLink levert meetbare verbeteringen voor sales teams wereldwijd
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                metric: "2 uur",
                description: "Minder administratie per verkoper per dag",
                color: "#1C2C55"
              },
              {
                icon: TrendingUp,
                metric: "25%",
                description: "Hogere conversie door betere opvolging",
                color: "#1C2C55"
              },
              {
                icon: Users,
                metric: "90%",
                description: "Minder CRM-invoerfouten",
                color: "#1C2C55"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center"
              >
                <Card className="bg-white border border-gray-200 shadow-soft hover:shadow-lg transition-all duration-300 p-8">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#F7E69B' }}>
                      <item.icon className="h-8 w-8" style={{ color: '#1C2C55' }} />
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#1C2C55' }}>
                      {item.metric}
                    </div>
                    <p className="finit-body" style={{ color: '#202226' }}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section - Dark Blue Canvas */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: '#1C2C55' }}>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mb-8 border border-yellow-200">
              <span>Binnenkort beschikbaar</span>
            </div>
            <h2 className="finit-h2 text-white mb-6">
              Meer innovaties onderweg
            </h2>
            <p className="finit-body text-white/90 max-w-3xl mx-auto">
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
                icon: Shield
              },
              {
                title: "Smart Dashboard Builder",
                description: "Genereer real-time dashboards automatisch uit uw bestaande data bronnen",
                category: "Business Intelligence", 
                icon: TrendingUp
              },
              {
                title: "AI Meeting Assistant",
                description: "Automatische notities, actiepunten en follow-ups voor al uw vergaderingen",
                category: "Productivity",
                icon: Users
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
                <Card className="h-full bg-white/95 backdrop-blur-sm border border-white/50 shadow-soft hover:shadow-lg transition-all duration-500 overflow-hidden">
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#F7E69B' }}>
                      <preview.icon className="h-8 w-8" style={{ color: '#1C2C55' }} />
                    </div>

                    {/* Category */}
                    <div className="mb-4 text-center">
                      <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-gray-100" style={{ color: '#202226' }}>
                        {preview.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-medium mb-4 text-center group-hover:text-blue-600 transition-colors duration-300" style={{ color: '#1C2C55' }}>
                      {preview.title}
                    </h3>

                    {/* Description */}
                    <p className="finit-body text-center mb-6" style={{ color: '#202226' }}>
                      {preview.description}
                    </p>

                    {/* Coming Soon Badge */}
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
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

      {/* CTA Section - White Canvas */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="finit-h2 mb-8" style={{ color: '#1C2C55' }}>
              Interesse in een specifieke oplossing?
            </h2>
            <p className="finit-body mb-12" style={{ color: '#202226' }}>
              We ontwikkelen voortdurend nieuwe enterprise-grade AI-oplossingen. 
              Vertel ons wat u nodig heeft en we houden u op de hoogte van nieuwe releases.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="text-white shadow-soft hover:shadow-lg transition-all duration-300 text-lg px-10 py-4 rounded-2xl font-medium"
                style={{ backgroundColor: '#1C2C55' }}
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
                  className="text-lg px-10 py-4 rounded-2xl font-medium shadow-soft hover:shadow-lg transition-all duration-300"
                  style={{ borderColor: '#1C2C55', color: '#1C2C55' }}
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