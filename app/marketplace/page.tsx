"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Search, Sparkles, ArrowRight, Mic, BarChart3, Bot, Zap, Shield, Database, Globe, Users, MessageSquare, Calendar, FileText, Brain, Workflow, Lock, TrendingUp, Mail, Phone, Building2, Headphones, Settings, Cloud, Target, PieChart, UserCheck, ClipboardList, Briefcase, CreditCard, Truck, UserPlus, BookOpen, Award, Lightbulb, Cog } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "available" | "coming-soon" | "beta";
  features: string[];
  image: string;
  icon: any;
  route: string;
  featured?: boolean;
  external?: boolean;
}

const services: Service[] = [
  {
    id: "voicelink",
    name: "VoiceLink",
    description: "Transformeer spraaknotities automatisch naar gestructureerde CRM-data. Uw verkopers spreken, wij zorgen dat het CRM klopt.",
    category: "Sales & CRM",
    status: "available",
    features: ["Spraakherkenning", "CRM-integratie", "Automatische data-entry", "Multi-platform support"],
    image: "/finit voicelink 1@4x-100copy.jpg",
    icon: Mic,
    route: "https://voicelink.me/",
    featured: true,
    external: true
  }
];

const categories = ["Alle", "Sales & CRM", "Integration Tools", "Automation", "Reporting & Analytics", "Security & Compliance", "Customer Support"];

const statusColors = {
  available: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "coming-soon": "bg-blue-100 text-blue-800 border-blue-200",
  beta: "bg-amber-100 text-amber-800 border-amber-200"
};

const statusLabels = {
  available: "Beschikbaar",
  "coming-soon": "Binnenkort",
  beta: "Beta"
};

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "Alle" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredServices = services.filter(service => service.featured);

  return (
    <main className="pt-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary mb-6 border border-primary/20">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>SaaS Marketplace</span> 
              <ChevronRight className="h-4 w-4 ml-2" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <Image
              src="/Finit Marketplace Blue@4x.png"
              alt="Finit Solutions Marketplace"
              width={400}
              height={200}
              className="object-contain"
              priority
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-xl mb-12 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Ontdek onze curated collectie van AI-oplossingen en SaaS-services. 
            Professionele tools die uw bedrijfsprocessen transformeren.
          </motion.p>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-6 mb-16 max-w-4xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Zoek naar oplossingen, features of categorieën..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-slate-200/50 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300"
              />
            </div>
            
            <div className="flex gap-3 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-primary to-blue-600 shadow-lg"
                      : "bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      {featuredServices.length > 0 && selectedCategory === "Alle" && !searchTerm && (
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Nu Beschikbaar
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Onze eerste SaaS-oplossing is live en klaar voor gebruik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={service.route}>
                      <Card className="h-full hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden bg-white/90 backdrop-blur-sm border-slate-200/50 ring-2 ring-primary/20">
                        {/* Featured Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            LIVE
                          </div>
                        </div>

                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          
                          {/* Status Badge */}
                          <div className="absolute bottom-4 left-4">
                            <Badge className={`${statusColors[service.status]} font-semibold`}>
                              {statusLabels[service.status]}
                            </Badge>
                          </div>

                          {/* Icon */}
                          <div className="absolute bottom-4 right-4">
                            <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-6">
                          <div className="mb-3">
                            <Badge variant="secondary" className="text-xs font-medium bg-slate-100 text-slate-700">
                              {service.category}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {service.name}
                          </h3>
                          
                          <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed text-sm">
                            {service.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {service.features.slice(0, 2).map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-slate-50 border-slate-200">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Services Grid */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              {selectedCategory === "Alle" ? "Volledige Catalogus" : selectedCategory}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {filteredServices.length} oplossing{filteredServices.length !== 1 ? 'en' : ''} gevonden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {service.external ? (
                    <a href={service.route} target="_blank" rel="noopener noreferrer">
                      <Card className="h-full hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden bg-white/80 backdrop-blur-sm border-slate-200/50">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          
                          {/* Status Badge */}
                          <div className="absolute bottom-4 left-4">
                            <Badge className={`${statusColors[service.status]} font-semibold ${service.status === 'available' ? 'animate-pulse' : ''}`}>
                              {statusLabels[service.status]}
                            </Badge>
                          </div>

                          {/* Icon */}
                          <div className="absolute bottom-4 right-4">
                            <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-6">
                          <div className="mb-3">
                            <Badge variant="secondary" className="text-xs font-medium bg-slate-100 text-slate-700">
                              {service.category}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {service.name}
                          </h3>
                          
                          <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed text-sm">
                            {service.description}
                          </p>
                          
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {service.features.slice(0, 3).map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-slate-50 border-slate-200">
                                  {feature}
                                </Badge>
                              ))}
                              {service.features.length > 3 && (
                                <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200">
                                  +{service.features.length - 3} meer
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className={`p-0 h-auto font-semibold ${
                                service.status === 'available' 
                                  ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                                  : 'text-primary hover:text-primary/80 hover:bg-primary/5'
                              }`}
                            >
                              {service.status === 'available' ? 'Bekijk nu' : 'Meer informatie'}
                            </Button>
                            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ) : (
                    <Link href={service.route}>
                      <Card className="h-full hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden bg-white/80 backdrop-blur-sm border-slate-200/50">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          
                          {/* Status Badge */}
                          <div className="absolute bottom-4 left-4">
                            <Badge className={`${statusColors[service.status]} font-semibold ${service.status === 'available' ? 'animate-pulse' : ''}`}>
                              {statusLabels[service.status]}
                            </Badge>
                          </div>

                          {/* Icon */}
                          <div className="absolute bottom-4 right-4">
                            <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-6">
                          <div className="mb-3">
                            <Badge variant="secondary" className="text-xs font-medium bg-slate-100 text-slate-700">
                              {service.category}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {service.name}
                          </h3>
                          
                          <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed text-sm">
                            {service.description}
                          </p>
                          
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {service.features.slice(0, 3).map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-slate-50 border-slate-200">
                                  {feature}
                                </Badge>
                              ))}
                              {service.features.length > 3 && (
                                <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200">
                                  +{service.features.length - 3} meer
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className={`p-0 h-auto font-semibold ${
                                service.status === 'available' 
                                  ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                                  : 'text-primary hover:text-primary/80 hover:bg-primary/5'
                              }`}
                            >
                              {service.status === 'available' ? 'Bekijk nu' : 'Meer informatie'}
                            </Button>
                            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Geen oplossingen gevonden</h3>
              <p className="text-slate-600 text-lg">
                Probeer een andere zoekopdracht of categorie
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-slate-900 via-primary to-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Interesse in een specifieke oplossing?
            </h2>
            <p className="text-blue-100 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              We ontwikkelen voortdurend nieuwe SaaS-oplossingen. 
              Vertel ons wat u nodig heeft en we houden u op de hoogte van nieuwe releases.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4"
              onClick={() => window.location.href = '/#contact'}
            >
              Neem contact op
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}