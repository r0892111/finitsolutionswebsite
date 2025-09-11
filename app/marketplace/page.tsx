"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Search, Filter, Star, ArrowRight, Zap, Bot, BarChart3, MessageSquare, Users, Clock, Building2, User, Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define consistent Product type
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "available" | "coming-soon" | "beta";
  price: string;
  originalPrice?: string;
  features: string[];
  image: string;
  icon: any;
  route: string;
  premium?: boolean;
  popular?: boolean;
}

// Business Products
const businessProducts: Product[] = [
  {
    id: "voice-to-crm-business",
    name: "Voice-to-CRM Enterprise",
    description: "Enterprise-grade spraakherkenning voor CRM-automatisering met team management en advanced analytics",
    category: "Sales & CRM",
    status: "available",
    price: "€499/maand",
    originalPrice: "€699/maand",
    features: ["Multi-user support", "Advanced analytics", "Custom integrations", "Priority support", "Team management"],
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
    icon: MessageSquare,
    route: "/voice-to-crm",
    premium: true,
    popular: true
  },
  {
    id: "ai-dashboard-enterprise",
    name: "AI Dashboard Enterprise",
    description: "Geavanceerde business intelligence dashboards met real-time data en predictive analytics",
    category: "Business Intelligence",
    status: "coming-soon",
    price: "€399/maand",
    features: ["Real-time analytics", "Custom widgets", "Multi-source data", "Advanced reporting", "API access"],
    image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg",
    icon: BarChart3,
    route: "/marketplace/ai-dashboard-enterprise",
    premium: true
  },
  {
    id: "smart-chatbot-business",
    name: "AI Customer Hub Pro",
    description: "Professionele AI-chatbot met document training en seamless human handoff voor bedrijven",
    category: "Customer Support",
    status: "beta",
    price: "€299/maand",
    features: ["Document training", "Human handoff", "Multi-language", "Analytics dashboard", "Custom branding"],
    image: "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg",
    icon: Bot,
    route: "/marketplace/smart-chatbot-business",
    premium: true
  },
  {
    id: "workflow-automator-pro",
    name: "Workflow Automator Pro",
    description: "Enterprise workflow automatisering met geavanceerde integraties en compliance features",
    category: "Operations",
    status: "coming-soon",
    price: "€199/maand",
    features: ["Enterprise integrations", "Compliance tracking", "Advanced workflows", "Team collaboration", "Audit logs"],
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    icon: Zap,
    route: "/marketplace/workflow-automator-pro",
    premium: true
  }
];

// Personal Products
const personalProducts: Product[] = [
  {
    id: "voice-to-crm-personal",
    name: "Voice-to-CRM Personal",
    description: "Persoonlijke CRM-automatisering voor freelancers en kleine ondernemers",
    category: "Productivity",
    status: "available",
    price: "€49/maand",
    features: ["Single user", "Basic integrations", "Voice notes", "Contact management", "Email support"],
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
    icon: MessageSquare,
    route: "/voice-to-crm",
    popular: true,
    premium: false
  },
  {
    id: "personal-assistant",
    name: "AI Personal Assistant",
    description: "Jouw persoonlijke AI-assistent voor dagelijkse taken en planning",
    category: "Productivity",
    status: "coming-soon",
    price: "€29/maand",
    features: ["Task management", "Calendar integration", "Email drafting", "Meeting notes", "Personal insights"],
    image: "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg",
    icon: User,
    route: "/marketplace/personal-assistant",
    premium: false
  },
  {
    id: "smart-budgeting",
    name: "Smart Budget Tracker",
    description: "AI-gedreven budgettering en financieel inzicht voor persoonlijk gebruik",
    category: "Finance",
    status: "beta",
    price: "€19/maand",
    features: ["Expense tracking", "Budget predictions", "Savings goals", "Financial insights", "Bank sync"],
    image: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg",
    icon: BarChart3,
    route: "/marketplace/smart-budgeting",
    premium: false
  },
  {
    id: "content-creator-suite",
    name: "Content Creator Suite",
    description: "AI-tools voor content creators: van ideatie tot publicatie",
    category: "Creative",
    status: "coming-soon",
    price: "€39/maand",
    features: ["Content ideas", "Auto-scheduling", "Performance analytics", "Multi-platform", "Brand consistency"],
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
    icon: Sparkles,
    route: "/marketplace/content-creator-suite",
    premium: false
  }
];

const categories = ["Alle", "Sales & CRM", "Business Intelligence", "Customer Support", "Operations", "Productivity", "Finance", "Creative"];

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
  const [activeTab, setActiveTab] = useState<"business" | "personal">("business");

  const currentProducts = activeTab === "business" ? businessProducts : personalProducts;

  // Filter products based on search and category
  const filteredProducts = currentProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Alle" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: Product) => {
    if (product.status === "available") {
      window.location.href = product.route;
    } else {
      console.log(`Product ${product.name} is ${product.status}`);
    }
  };

  return (
    <main className="pt-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen relative">
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
              <span>AI SaaS Marketplace</span> 
              <ChevronRight className="h-4 w-4 ml-2" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent"
          >
            Premium AI Solutions
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-xl mb-12 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Ontdek onze collectie van premium AI-oplossingen. Plug & play, enterprise-grade, 
            en klaar om uw bedrijf naar het volgende niveau te tillen.
          </motion.p>

          {/* Business/Personal Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-slate-200/50 shadow-lg">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("business")}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "business"
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="h-5 w-5" />
                  Business
                  {activeTab === "business" && <Crown className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "personal"
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <User className="h-5 w-5" />
                  Personal
                </button>
              </div>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 mb-16 max-w-4xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Zoek naar AI-oplossingen..."
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

      {/* Products Grid */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              {activeTab === "business" ? "Business Solutions" : "Personal Tools"}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {activeTab === "business" 
                ? "Enterprise-grade AI-oplossingen voor professionele teams en organisaties"
                : "Persoonlijke AI-tools om uw dagelijkse productiviteit te verhogen"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredProducts.map((product, index) => {
              const IconComponent = product.icon;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className={`h-full hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden bg-white/80 backdrop-blur-sm border-slate-200/50 ${
                      (product.premium ?? false) ? 'ring-2 ring-gradient-to-r from-primary/20 to-blue-500/20' : ''
                    }`}
                    onClick={() => handleProductClick(product)}
                  >
                    {/* Premium Badge */}
                    {(product.premium ?? false) && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          PREMIUM
                        </div>
                      </div>
                    )}

                    {/* Popular Badge */}
                    {(product.popular ?? false) && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          POPULAIR
                        </div>
                      </div>
                    )}

                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${statusColors[product.status]} font-semibold`}>
                          {statusLabels[product.status]}
                        </Badge>
                      </div>

                      {/* Icon */}
                      <div className="absolute bottom-4 right-4">
                        <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-8">
                      <div className="mb-4">
                        <Badge variant="secondary" className="text-xs font-medium bg-slate-100 text-slate-700">
                          {product.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {product.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-slate-50 border-slate-200">
                              {feature}
                            </Badge>
                          ))}
                          {product.features.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200">
                              +{product.features.length - 3} meer
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-primary">
                              {product.price}
                            </div>
                            {product.originalPrice && (
                              <div className="text-sm text-slate-400 line-through">
                                {product.originalPrice}
                              </div>
                            )}
                          </div>
                          {product.originalPrice && (
                            <div className="text-xs text-green-600 font-medium">
                              Bespaar €{parseInt(product.originalPrice.replace(/[^\d]/g, '')) - parseInt(product.price.replace(/[^\d]/g, ''))}/maand
                            </div>
                          )}
                        </div>
                        <Button 
                          size="lg" 
                          variant={product.status === "available" ? "default" : "outline"}
                          className={`group-hover:translate-x-1 transition-all duration-300 ${
                            product.status === "available" 
                              ? "bg-gradient-to-r from-primary to-blue-600 shadow-lg hover:shadow-xl" 
                              : "border-slate-300 hover:border-primary"
                          }`}
                        >
                          {product.status === "available" ? "Bekijk" : "Meer info"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Geen producten gevonden</h3>
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
              Mist er een oplossing?
            </h2>
            <p className="text-blue-100 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              We bouwen voortdurend nieuwe AI-oplossingen. Laat ons weten wat je nodig hebt 
              en misschien wordt het ons volgende premium product.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4">
              Suggereer een product
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}