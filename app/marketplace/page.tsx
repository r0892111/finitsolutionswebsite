"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, CheckCircle2, Users, TrendingUp, Clock, Shield, Zap, Database, MessageSquare, BarChart3, Calendar } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

export default function MarketplacePage() {
  // Memoize static data to prevent recreation on re-renders
  const featuredProducts = useMemo(() => [
    {
      id: "voicelink",
      name: "VoiceLink",
      tagline: "Voice-to-CRM automation",
      description: "WhatsApp spraakberichten worden automatisch omgezet naar CRM-data. Klantnaam, offertebedrag, vervolgafspraken - alles op de juiste plaats.",
      image: "/voicelink display.png",
      logo: "/Finit Voicelink Blue@4x.png",
      category: "Sales & CRM",
      status: "live",
      price: "Vanaf €49/maand",
      rating: 4.9,
      reviews: 127,
      features: ["WhatsApp integratie", "Automatische CRM-sync", "3 min installatie", "Alle CRM's ondersteund"],
      metrics: {
        timeSaved: "2 uur/dag",
        accuracy: "90%",
        adoption: "95%"
      },
      url: "https://voicelink.me"
    }
  ], []);

  const comingSoonProducts = useMemo(() => [
    {
      name: "DocuFlow AI",
      tagline: "Intelligent document processing",
      description: "Automatische verwerking en analyse van documenten met AI-gedreven data-extractie",
      category: "Document Management",
      icon: Database,
      estimatedLaunch: "Q2 2025"
    },
    {
      name: "MeetingMind",
      tagline: "AI meeting assistant",
      description: "Automatische notities, actiepunten en follow-ups voor al uw vergaderingen",
      category: "Productivity",
      icon: MessageSquare,
      estimatedLaunch: "Q3 2025"
    },
    {
      name: "InsightDash",
      tagline: "Smart dashboard builder",
      description: "Genereer real-time dashboards automatisch uit uw bestaande data bronnen",
      category: "Business Intelligence",
      icon: BarChart3,
      estimatedLaunch: "Q4 2025"
    }
  ], []);

  const categories = useMemo(() => [
    { name: "Sales & CRM", count: 1, color: "bg-blue-100 text-blue-800" },
    { name: "Document Management", count: 1, color: "bg-green-100 text-green-800" },
    { name: "Productivity", count: 1, color: "bg-purple-100 text-purple-800" },
    { name: "Business Intelligence", count: 1, color: "bg-orange-100 text-orange-800" }
  ], []);

  return (
    <main className="pt-20 bg-white min-h-screen font-general-sans">
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 mt-12 flex w-full items-center justify-center gap-6 md:gap-8">
              <Image
                src="/Finit Marketplace White.svg"
                alt="Finit Marketplace"
                width={220}
                height={110}
                className="opacity-90"
                priority
              />

              {/* Robust vertical divider */}
              <div
                aria-hidden="true"
                className="hidden md:block self-stretch border-l-4 mx-4 rounded-full"
                style={{ borderColor: 'rgba(255, 255, 255, 0.9)' }}
              />

              <div className="text-left min-w-0 flex-1 md:min-w-[700px]">
                <h1 className="finit-h1 text-white mb-2">
                  Plug &amp; play <span className="finit-highlight">AI solutions</span>
                </h1>
                <p className="finit-body text-white/90">
                  Enterprise-grade AI tools die direct integreren met uw bestaande systemen
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product - VoiceLink */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Live & beschikbaar
              </Badge>
              <Badge variant="outline">Featured</Badge>
            </div>
            <h2 className="finit-h2 mb-2" style={{ color: '#1C2C55' }}>
              Meest populaire oplossing
            </h2>
          </div>

          <Card className="overflow-hidden bg-white border border-gray-200 shadow-soft hover:shadow-lg transition-all duration-300 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Product Image - 5/12 width */}
              <div className="lg:col-span-7 relative">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative overflow-hidden rounded-l-xl bg-gray-50">
                  <Image
                    src="/voicelink display.png"
                    alt="VoiceLink Interface"
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                    unoptimized
                  />
                  
                  {/* Status and CTA in top corners */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 text-white border-0 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-white mr-2" aria-hidden="true"></div>
                      LIVE
                    </Badge>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <a 
                      href="https://voicelink.me" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ backgroundColor: '#1C2C55' }}
                    >
                      Probeer nu
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Product Details - 7/12 width */}
              <div className="lg:col-span-5 p-6 lg:p-8">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                        Sales & CRM
                      </Badge>
                    </div>
                    
                    <h3 className="finit-h2 mb-2" style={{ color: '#1C2C55' }}>
                      VoiceLink
                    </h3>
                    
                    <p className="finit-body mb-3" style={{ color: '#202226' }}>
                      WhatsApp spraakberichten worden automatisch omgezet naar CRM-data. Klantnaam, offertebedrag, vervolgafspraken - alles op de juiste plaats.
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-2xl font-bold" style={{ color: '#1C2C55' }}>
                        Vanaf €29,90/maand
                      </div>
                      <div className="text-sm text-gray-600">
                        Volume kortingen beschikbaar
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-3" style={{ color: '#1C2C55' }}>Belangrijkste features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {featuredProducts[0].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm" style={{ color: '#202226' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <a 
                      href="https://voicelink.me" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button 
                        size="lg" 
                        className="w-full text-white shadow-soft hover:shadow-lg transition-all duration-300 font-medium"
                        style={{ backgroundColor: '#1C2C55' }}
                      >
                        Ontdek VoiceLink
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="font-medium shadow-soft hover:shadow-lg transition-all duration-300"
                      style={{ borderColor: '#1C2C55', color: '#1C2C55' }}
                      onClick={() => {
                        if (window.location.pathname === '/') {
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        } else {
                          window.location.href = '/#contact';
                        }
                      }}
                    >
                      Meer info
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Coming Soon Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                Binnenkort beschikbaar
              </Badge>
            </div>
            <h2 className="finit-h2" style={{ color: '#1C2C55' }}>
              Nieuwe oplossingen in ontwikkeling
            </h2>
            <p className="finit-body mt-2" style={{ color: '#202226' }}>
              Innovatieve AI-tools die binnenkort uw workflow zullen transformeren
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <Card className="h-full bg-white border border-gray-200 shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                        <product.icon className="h-6 w-6" style={{ color: '#1C2C55' }} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    {/* Product Info */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors" style={{ color: '#1C2C55' }}>
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                      {product.tagline}
                    </p>
                    
                    <p className="finit-body mb-4 text-sm leading-relaxed" style={{ color: '#202226' }}>
                      {product.description}
                    </p>

                    {/* Launch Timeline */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium" style={{ color: '#1C2C55' }}>
                        {product.estimatedLaunch}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs"
                      >
                        <a
                          href="https://calendly.com/alex-finitsolutions/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1"
                        >
                          <Calendar className="h-3 w-3" />
                          Book meeting
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Marketplace */}
      <section className="py-12 bg-finit-aurora">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="finit-h2 text-white mb-4">
              Waarom Finit Marketplace
            </h2>
            <p className="finit-body text-white/90">
              Curated AI-oplossingen met enterprise-grade beveiliging en support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Plug & Play",
                description: "Alle oplossingen zijn plug & play - geen complexe implementatie nodig"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Alle tools voldoen aan de hoogste beveiligingsstandaarden"
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Dedicated support van AI-specialisten voor elke oplossing"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F7E69B' }}>
                  <benefit.icon className="h-8 w-8" style={{ color: '#1C2C55' }} />
                </div>
                <h3 className="text-lg font-medium text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="finit-body text-white/80">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="finit-h2 mb-4" style={{ color: '#1C2C55' }}>
              Interesse in een specifieke oplossing?
            </h2>
            <p className="finit-body mb-8" style={{ color: '#202226' }}>
              Vertel ons wat u nodig heeft en we houden u op de hoogte van nieuwe releases
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/alex-finitsolutions/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white shadow-soft hover:shadow-lg transition-all duration-300 font-medium px-8 py-3 rounded-md"
                style={{ backgroundColor: '#1C2C55' }}
              >
                <Calendar className="h-5 w-5" />
                Book an online meeting
              </a>
              <a 
                href="https://voicelink.me" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="font-medium shadow-soft hover:shadow-lg transition-all duration-300 px-8"
                  style={{ borderColor: '#1C2C55', color: '#1C2C55' }}
                >
                  Probeer VoiceLink
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}