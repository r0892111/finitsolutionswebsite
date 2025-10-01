"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Phone, Mail, Shield, Zap, Euro, Brain, ArrowRight, CheckCircle2, Clock, Users, TrendingUp, MessageSquare, Calendar, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectRequestSchema, type ProjectRequestForm } from "@/lib/schema";
import Image from "next/image";

export default function VoiceToCRMPage() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProjectRequestForm>({
    resolver: zodResolver(projectRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: ""
    }
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form;

  // Form for the main contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      phone: ""
    };

    if (!formData.name.trim()) {
      errors.name = "Naam is verplicht";
    }

    if (!formData.email.trim()) {
      errors.email = "E-mailadres is verplicht";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Voer een geldig e-mailadres in";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Telefoonnummer is verplicht";
    }

    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.phone;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Send to the webhook URL without telefonisch_contact
      const response = await fetch('https://alexfinit.app.n8n.cloud/webhook/03451c85-9d5c-4463-884a-7689e19b0917', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setFormSubmitted(true);
      toast({
        title: "Formulier verstuurd",
        description: "We nemen binnen 48 uur contact met je op.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", phone: "" });
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw of neem direct contact met ons op.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: ProjectRequestForm) => {
    try {
      const response = await fetch('https://alexfinit.app.n8n.cloud/webhook/8bfcfe00-bdad-44a2-a2f3-e7b1c47b200f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: 'Voice-to-CRM Landing Page'
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
      toast({
        title: "Aanvraag ontvangen",
        description: "Check je inbox om een gesprek in te plannen.",
      });

      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
        reset();
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw of neem direct contact met ons op.",
        variant: "destructive",
      });
    }
  };

  const openConsultationDialog = () => {
    setOpen(true);
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // CRM Integration logos
  const crmIntegrations = [
    { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg", color: "#00A1E0" },
    { name: "Odoo", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Odoo_logo.svg", color: "#714B67" },
    { name: "Pipedrive", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Pipedrive_Logo.svg", color: "#FF6B35" },
    { name: "Teamleader", logo: "/Logo_Teamleader_Default_CMYK.jpg", color: "#FF6900" },
    { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg", color: "#FF7A59" },
    { name: "Zoho", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/ZOHO_logo_2023.svg", color: "#C8202F" },
    { name: "Monday Sales", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Monday_logo.svg", color: "#FF3D57" },
    { name: "Oracle NetSuite", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg", color: "#F80000" },
    { name: "Microsoft Dynamics", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Microsoft_Dynamics_Logo.svg", color: "#00BCF2" }
  ];

  const expandableSections = [
    {
      key: 'success-stories',
      title: 'Succesverhaal',
      content: `
        <div class="space-y-6">
          <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-4">
              <div class="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                <img src="/papa foto.jpg" alt="Bas van PRS Rotselaar" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <div class="mb-3">
                  <p class="text-gray-700 text-sm leading-relaxed italic text-center sm:text-left">
                    "Als verkoper was ik 's avonds nog uren bezig met administratie om mijn klantbezoeken in Pipedrive bij te werken. Nu spreek ik gewoon een kort berichtje in en Voice-to-CRM doet de rest. Dat scheelt me anderhalf uur per dag, tijd die ik nu kan besteden aan extra klantbezoeken!"
                  </p>
                </div>
                <div class="text-center sm:text-right">
                  <p class="font-semibold text-gray-800 text-sm">— Bas van <a href="https://www.prs-medical.eu/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 hover:underline transition-colors">PRS Rotselaar</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      key: 'security-reliability',
      title: 'Waarom het wél veilig en betrouwbaar is',
      content: `
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(57, 86, 134, 0.1);">
              <svg class="w-5 h-5" style="color: rgb(57, 86, 134);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 mb-2">GDPR-compliant</h4>
              <p class="text-gray-600 text-sm leading-relaxed">Alle data wordt verwerkt volgens Europese privacywetgeving.</p>
            </div>
          </div>
          
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(57, 86, 134, 0.1);">
              <svg class="w-5 h-5" style="color: rgb(57, 86, 134);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 mb-2">End-to-end encryptie</h4>
              <p class="text-gray-600 text-sm leading-relaxed">Spraakopnames worden direct versleuteld en na verwerking automatisch gewist. Jouw klantgegevens blijven 100% privé.</p>
            </div>
          </div>
          
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(57, 86, 134, 0.1);">
              <svg class="w-5 h-5" style="color: rgb(57, 86, 134);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 mb-2">Uptime garantie</h4>
              <p class="text-gray-600 text-sm leading-relaxed">Onze systemen draaien op enterprise-grade cloud-infrastructuur met robuuste integraties.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      key: 'roi-savings',
      title: 'Waarom het tijd bespaart én geld oplevert',
      content: `
        <div class="space-y-6">
          <div class="border border-gray-200 p-6 rounded-lg bg-white shadow-sm">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(57, 86, 134, 0.1);">
                <svg class="w-5 h-5" style="color: rgb(57, 86, 134);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold mb-3" style="color: rgb(57, 86, 134);">Directe kostenbesparing</h4>
                <ul class="text-gray-700 text-sm space-y-2">
                  <li class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full" style="background-color: rgb(57, 86, 134);"></div>
                    <span>2 uur minder administratie per verkoper per dag</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full" style="background-color: rgb(57, 86, 134);"></div>
                    <span>90% minder CRM-invoerfouten = minder verloren deals</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full" style="background-color: rgb(57, 86, 134);"></div>
                    <span>Geen extra administratief personeel nodig</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="border border-gray-200 p-6 rounded-lg bg-white shadow-sm">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(57, 86, 134, 0.1);">
                <svg class="w-5 h-5" style="color: rgb(57, 86, 134);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold mb-3" style="color: rgb(57, 86, 134);">Omzetgroei</h4>
                <ul class="text-gray-700 text-sm space-y-2">
                  <li class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full" style="background-color: rgb(57, 86, 134);"></div>
                    <span>Minstens 1 extra klantbezoek per dag per verkoper</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full" style="background-color: rgb(57, 86, 134);"></div>
                    <span>Betere opvolging = 25% hogere conversie</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full" style="background-color: rgb(57, 86, 134);"></div>
                    <span>Snellere reactietijd op leads</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, rgb(245, 246, 248) 0%, rgb(241, 243, 246) 50%, rgb(237, 240, 244) 100%)' }}>
      {/* Single Page Layout - No navbar, starts from top */}
      <div className="min-h-screen flex flex-col">
        
        {/* Hero Section - Mobile Optimized with proper spacing from top */}
        <section className="relative text-gray-800 flex-1 flex items-center">
          <div className="relative container mx-auto px-4 py-12 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Column - Main Content - Mobile Optimized with increased top padding */}
              <div className="pt-16 md:pt-12">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mb-4 md:mb-6"
                >
                  <span className="text-gray-700">Je verkopers verkopen<strong> meer</strong> – wij zorgen dat hun <span className="relative inline-block pb-3 sm:pb-4">
                    <strong>CRM vanzelf klopt.</strong>
                    {/* Dynamic hand-drawn scribble underline with mobile-optimized spacing */}
                    <svg 
                      className="absolute left-0 w-full h-4 sm:h-5 pointer-events-none" 
                      viewBox="0 0 100 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      style={{ 
                        bottom: '-4px', // Moved further down to create more space
                        transform: 'translateY(0px)' 
                      }}
                    >
                      <path 
                        d="M1 12c8-3 12-8 18-5s13 8 21 6c10-3 15-8 23-4s13 7 18 5c8-2 10-5 15-3s3 2 7 1" 
                        stroke="rgb(57, 86, 134)" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        fill="none"
                        opacity="0.8"
                        vectorEffect="non-scaling-stroke"
                        style={{
                          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                        }}
                      />
                      <path 
                        d="M2 14c7-2 11-6 16-4s12 6 20 5c9-2 14-6 21-3s12 6 17 4c7-1 9-4 14-2s3 1 6 0" 
                        stroke="rgb(57, 86, 134)" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        fill="none"
                        opacity="0.6"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </span></span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-gray-700 mb-3 md:mb-4 leading-relaxed"
                >
                  Via WhatsApp sturen je verkopers <strong>een spraakbericht</strong> met hun klantbezoek. <strong>VoiceLink zet alles automatisch om</strong> in volledige CRM-data: <strong>klantinfo, nota&apos;s, offertes, taken</strong> en <strong>opvolging</strong>. Deze plug & play tool integreert met elk CRM naar keuze en is in <strong>slechts 3 minuten geïnstalleerd</strong>.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed"
                >
                  Terwijl zij al onderweg zijn naar de volgende klant, worden <strong>notities direct doorgestuurd</strong>, <strong>afspraken gepland</strong> en <strong>updates gedeeld</strong> via e-mail, agenda of Slack. <strong>De toekomst van sales is begonnen</strong>. Zorg dat je team <strong>niet achterblijft</strong>.
                </motion.p>

                {/* Compact Expandable Hand-drawn Checkmark Sections */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-6 md:mb-8 space-y-3"
                >
                  {expandableSections.map((section, index) => (
                    <div key={section.key} className="border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm">
                      <button
                        onClick={() => toggleSection(section.key)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {/* Hand-drawn style checkmark SVG */}
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                            <svg 
                              className="w-5 h-5" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path 
                                d="M4 12.5l4.5 4.5c0.2 0.2 0.5 0.2 0.7 0L20 6.5" 
                                stroke="#22c55e" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                fill="none"
                                opacity="0.9"
                                style={{
                                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                                }}
                              />
                              <path 
                                d="M4.2 12.7l4.3 4.3c0.15 0.15 0.4 0.15 0.55 0L19.8 6.3" 
                                stroke="#22c55e" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                fill="none"
                                opacity="0.7"
                              />
                            </svg>
                          </div>
                          <span className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-gray-900">
                            {section.title}
                          </span>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          <motion.div
                            animate={{ rotate: expandedSections[section.key] ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />
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
                              duration: 0.3,
                              ease: [0.04, 0.62, 0.23, 0.98]
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4">
                              <div 
                                className="text-sm leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-200"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>

                {/* Social Proof Metrics - Mobile Optimized - Moved below CTA button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="grid grid-cols-3 gap-2 sm:gap-4"
                >
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'rgb(57, 86, 134)' }}><strong>90%</strong></div>
                    <div className="text-xs sm:text-sm text-gray-600">minder input</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'rgb(57, 86, 134)' }}><strong>1 extra</strong></div>
                    <div className="text-xs sm:text-sm text-gray-600">bezoek/dag</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'rgb(57, 86, 134)' }}><strong>2 uur</strong></div>
                    <div className="text-xs sm:text-sm text-gray-600">bespaard per verkoper</div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Contact Form - Mobile Optimized */}
              <div className="space-y-3 md:space-y-4 mt-8 lg:mt-0">
                
                {/* Contact Form - Replaces the "What it does" section */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-5 md:p-7 shadow-lg border border-gray-200"
                >
                  {!formSubmitted ? (
                    <>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-700">
                        Wil je weten hoe we dit binnen jouw bedrijf kunnen implementeren?
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-5">
                        Vul dit formulier in en we nemen binnen de 48u contact met je op.
                      </p>
                      
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Naam *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Jouw naam"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className={`${formErrors.name ? 'border-red-500' : ''}`}
                          />
                          {formErrors.name && (
                            <p className="text-sm text-red-500">{formErrors.name}</p>
                          )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            E-mailadres *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jouw@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className={`${formErrors.email ? 'border-red-500' : ''}`}
                          />
                          {formErrors.email && (
                            <p className="text-sm text-red-500">{formErrors.email}</p>
                          )}
                        </div>

                        {/* Phone Field - Now mandatory */}
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Telefoonnummer *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+32 xxx xx xx xx"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className={`${formErrors.phone ? 'border-red-500' : ''}`}
                          />
                          {formErrors.phone && (
                            <p className="text-sm text-red-500">{formErrors.phone}</p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          className="w-full text-white border-none mt-6"
                          style={{ backgroundColor: 'rgb(57, 86, 134)' }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Versturen...' : 'Versturen'}
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                          Wil je weten hoe we VoiceLink binnen jouw bedrijf kunnen implementeren?
                        {/* Disclaimer */}
                        <p className="text-xs text-gray-500 italic text-center mt-4">
                          Je gegevens worden nooit gedeeld met derden.
                        </p>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 mx-auto mb-4 flex items-center justify-center">
                        <Check className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-700">Bedankt voor je aanvraag!</h3>
                      <p className="text-gray-600">We nemen binnen 48 uur contact met je op.</p>
                    </div>
                  )}
                </motion.div>

                {/* Personal Touch - Horizontal Layout */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    {/* Left Section - Picture */}
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                        <Image
                          src="/alex.png"
                          alt="Alex Otten"
                          fill
                          className="object-cover rounded-full border-3 border-gray-200 shadow-md"
                          sizes="80px"
                        />
                      </div>
                    </div>
                    
                    {/* Right Section - Text and Phone */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                        Rechtstreeks bellen is ook mogelijk. <strong>Karel</strong> beantwoordt je VoiceLink vragen met plezier.
                      </p>
                      
                      <a 
                        href="tel:+32495702314"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-center font-medium text-gray-700 bg-gray-50 border-2 border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                      >
                        <Phone className="h-4 w-4" />
                        <div className="flex flex-col items-center">
                          <span className="text-xs sm:text-sm font-semibold">Neem telefonisch contact op</span>
                          <span className="text-xs text-gray-600 font-medium">+32 (0)495 70 23 14</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* CRM Integration Carousel - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 md:mt-20"
            >
              {/* Carousel Container */}
              <div className="relative overflow-hidden">
                {/* Fade effects at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" />
                
                {/* Scrolling logos container - Mobile Optimized */}
                <div className="flex animate-scroll-crm w-[2736px]">
                  {/* First complete set - All 9 CRM logos */}
                  {crmIntegrations.map((crm, index) => (
                    <div
                      key={`set1-${index}`}
                      className="group relative flex items-center justify-center w-24 h-16 sm:w-32 sm:h-20 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 shrink-0 mx-2 sm:mx-3"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={crm.logo}
                          alt={`${crm.name} logo`}
                          fill
                          className="object-contain transition-all duration-300 p-3 sm:p-4"
                          sizes="(max-width: 640px) 96px, 128px"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement?.parentElement;
                            if (parent && !parent.querySelector('.fallback-text')) {
                              const fallbackDiv = document.createElement('div');
                              fallbackDiv.className = 'fallback-text flex items-center justify-center h-full w-full';
                              fallbackDiv.innerHTML = `<span class="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-primary transition-colors text-center px-2">${crm.name}</span>`;
                              parent.appendChild(fallbackDiv);
                            }
                          }}
                        />
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"
                        style={{ backgroundColor: crm.color }}
                      />
                    </div>
                  ))}
                  
                  {/* Second complete set for seamless infinite loop */}
                  {crmIntegrations.map((crm, index) => (
                    <div
                      key={`set2-${index}`}
                      className="group relative flex items-center justify-center w-24 h-16 sm:w-32 sm:h-20 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 shrink-0 mx-2 sm:mx-3"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={crm.logo}
                          alt={`${crm.name} logo`}
                          fill
                          className="object-contain transition-all duration-300 p-3 sm:p-4"
                          sizes="(max-width: 640px) 96px, 128px"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement?.parentElement;
                            if (parent && !parent.querySelector('.fallback-text')) {
                              const fallbackDiv = document.createElement('div');
                              fallbackDiv.className = 'fallback-text flex items-center justify-center h-full w-full';
                              fallbackDiv.innerHTML = `<span class="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-primary transition-colors text-center px-2">${crm.name}</span>`;
                              parent.appendChild(fallbackDiv);
                            }
                          }}
                        />
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"
                        style={{ backgroundColor: crm.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Consultation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] mx-4">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle>Plan een gratis consultatie</DialogTitle>
                <DialogDescription>
                  Je ontvangt binnen enkele minuten een mailtje met een Calendly URL om een afspraak in te plannen.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Naam *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jouw naam"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jouw@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Bedrijfsnaam</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Jouw bedrijf (optioneel)"
                      {...register("company")}
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive">{errors.company.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefoonnummer</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+32 xxx xx xx xx (optioneel)"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-white border-none"
                    style={{ backgroundColor: 'rgb(57, 86, 134)' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Versturen...' : 'Plan gesprek'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 mx-auto mb-4 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <DialogTitle className="mb-2">Bedankt voor je aanvraag!</DialogTitle>
              <DialogDescription>
                Check je mailbox om een gesprek in te plannen.
              </DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Custom CSS for CRM carousel animation - Mobile Optimized */}
      <style jsx>{`
        @keyframes scroll-crm {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1368px);
          }
        }
        
        .animate-scroll-crm {
          animation: scroll-crm 24s linear infinite;
        }
        
        .animate-scroll-crm:hover {
          animation-play-state: paused;
        }
        
        /* Mobile responsive logo sizes */
        @media (max-width: 640px) {
          .animate-scroll-crm {
            /* Mobile: w-24 h-16 + mx-2 = 96px + 16px = 112px per logo */
            /* 9 logos × 112px = 1008px for one set */
            animation: scroll-crm-mobile 24s linear infinite;
          }
        }
        
        @keyframes scroll-crm-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1008px);
          }
        }
      `}</style>
    </div>
  );
}