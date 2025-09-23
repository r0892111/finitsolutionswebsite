"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { useMemo } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  // Video iframe component
  const VideoIframe = () => (
    <iframe 
      width="1581" 
      height="889" 
      src="https://www.youtube.com/embed/L1BTq-44MCc" 
      title="Voice-to-CRM: Laat AI Agents je CRM invullen" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerPolicy="strict-origin-when-cross-origin" 
      allowFullScreen
      className="w-full h-full rounded-2xl"
    />
  );


  // Optimized integration logos list - Reduced to essential ones for performance
  const integrationLogos = [
    { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg", color: "#00A1E0" },
    { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg", color: "#0FAAFF" },
    { name: "Odoo", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Odoo_logo.svg", color: "#714B67" },
    { name: "Outlook", logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg", color: "#0078D4" },
    { name: "Gmail", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg", color: "#EA4335" },
    { name: "Microsoft Excel", logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg", color: "#217346" },
    { name: "Microsoft Word", logo: "Microsoft_Office_Word_Logo.svg", color: "#2B579A" },
    { name: "Google Calendar", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg", color: "#4285F4" },
    { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg", color: "#F2C811" },
    { name: "Pipedrive", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Pipedrive_Logo.svg", color: "#FF6B35" },
    { name: "Teamleader", logo: "Logo_Teamleader_Default_CMYK.jpg", color: "#FF6900" },
    { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg", color: "#FF7A59" },
    { name: "Calendly", logo: "calendly-logo-brandlogos.net_fftw0yxev.svg", color: "#006BFF" },
    { name: "Mailchimp", logo: "https://logos-world.net/wp-content/uploads/2021/02/Mailchimp-Logo.png", color: "#FFE01B" },
    { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", color: "#4A154B" },
    { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg", color: "#96BF48" },
    { name: "WhatsApp", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", color: "#25D366" },
    { name: "Zoom", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg", color: "#2D8CFF" },
    { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", color: "#000000" },
    { name: "Microsoft Teams", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg", color: "#6264A7" },
    { name: "Asana", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg", color: "#F06A6A" }
  ];

  // Memoize animation variants to prevent recreation
  const animationVariants = useMemo(() => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, x: -50 },
    animate: shouldReduceMotion ? {} : { opacity: 1, x: 0 },
    transition: shouldReduceMotion ? {} : { duration: 0.8, delay: 0.2 }
  }), [shouldReduceMotion]);

  return (
    <section id="about" className="relative py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Slideshow Side - Now on the left */}
          <motion.div
            ref={ref}
            {...animationVariants}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              {/* Floating background elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
              
              {/* Video iframe container with 16:9 aspect ratio */}
              <div 
                className="relative bg-gradient-to-tr from-background via-muted to-background rounded-2xl overflow-hidden shadow-xl border"
                style={{ aspectRatio: '16/9' }}
              >
                <VideoIframe />
              </div>
              
            </div>
          </motion.div>
          
          {/* Content Side - Now on the right */}
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={shouldReduceMotion ? {} : (isInView ? { opacity: 1 } : {})}
              transition={shouldReduceMotion ? {} : { duration: 0.5 }}
            >
              <Link href="/diensten">
                <Button
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  <span>{t('about.badge')}</span> <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.h2
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
              transition={shouldReduceMotion ? {} : { duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold"
            >
              {t('about.title')}
            </motion.h2>
            
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
              transition={shouldReduceMotion ? {} : { duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              {t('about.description')}

            </motion.p>
            
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
              transition={shouldReduceMotion ? {} : { duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              {/* Simple "In de kijker" section */}
              <div className="bg-card border border-border rounded-lg p-6 relative">
                {/* Prominent CTA Button in top right */}
                <div className="absolute top-4 right-4">
                  <a 
                    href="https://voicelink.me" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 transform hover:scale-105"
                  >
                    <span>{t('about.spotlight.cta')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-md">
                    {t('about.spotlight.title')}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{t('about.spotlight.product')}</h3>
                
                <p className="text-muted-foreground">
                  {t('about.spotlight.description')}
                </p>
              </div>
            </motion.div>
            
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
              transition={shouldReduceMotion ? {} : { duration: 0.5, delay: 0.4 }}
              className="text-foreground text-lg font-semibold"
            >
              {t('about.tagline')}
            </motion.p>
            
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
              transition={shouldReduceMotion ? {} : { duration: 0.5, delay: 0.5 }}
              className="pt-4 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/about">
                <Button size="lg">
                  {t('about.cta')}
                </Button>
              </Link>
              <a href="https://voicelink.me" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  {t('about.spotlight.cta')}
                </Button>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Logo Carousel Section */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
          transition={shouldReduceMotion ? {} : { duration: 0.8, delay: 0.6 }}
          className="mt-20 md:mt-32"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('about.integrations.title')}</h3>
            <p className="text-muted-foreground text-lg">
              {t('about.integrations.subtitle')}
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            {/* Fade effects at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling logos container with precise width calculation */}
            <div className="flex animate-scroll-fast" style={{ width: `${integrationLogos.length * 152 * 2}px` }}>
              {/* First complete set */}
              {integrationLogos.map((integration, index) => (
                <div
                  key={`set1-${index}`}
                  className="group relative flex items-center justify-center w-32 h-20 md:w-32 md:h-20 sm:w-20 sm:h-16 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 shrink-0 mx-3"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      loading="lazy"
                      fill
                      className="object-contain transition-all duration-300 p-4"
                      sizes="(max-width: 640px) 80px, 128px"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement?.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                          const fallbackDiv = document.createElement('div');
                          fallbackDiv.className = 'fallback-text flex items-center justify-center h-full w-full';
                          fallbackDiv.innerHTML = `<span class="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors text-center px-2">${integration.name}</span>`;
                          parent.appendChild(fallbackDiv);
                        }
                      }}
                    />
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"
                    style={{ backgroundColor: integration.color }}
                  />
                </div>
              ))}
              
              {/* Second complete set for seamless infinite loop */}
              {integrationLogos.map((integration, index) => (
                <div
                  key={`set2-${index}`}
                  className="group relative flex items-center justify-center w-32 h-20 md:w-32 md:h-20 sm:w-20 sm:h-16 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 shrink-0 mx-3"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      loading="lazy"
                      fill
                      className="object-contain transition-all duration-300 p-4"
                      sizes="(max-width: 640px) 80px, 128px"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement?.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                          const fallbackDiv = document.createElement('div');
                          fallbackDiv.className = 'fallback-text flex items-center justify-center h-full w-full';
                          fallbackDiv.innerHTML = `<span class="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors text-center px-2">${integration.name}</span>`;
                          parent.appendChild(fallbackDiv);
                        }
                      }}
                    />
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"
                    style={{ backgroundColor: integration.color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(20px, 0);
          }
          75% {
            transform: translate(10px, 10px);
          }
        }
        
        @keyframes scroll-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${integrationLogos.length * 152}px);
          }
        }
        
        .animate-scroll-fast {
          animation: scroll-fast 36s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-fast { animation: none; }
        }
        
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
        
        /* Responsive logo sizes */
        @media (max-width: 640px) {
          .animate-scroll-fast {
            animation: scroll-fast-mobile 36s linear infinite;
          }
        }
        
        @keyframes scroll-fast-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${integrationLogos.length * 104}px);
          }
        }
      `}</style>
    </section>
  );
}