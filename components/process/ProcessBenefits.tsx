"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

/**
 * ProcessBenefits Component
 * Displays the key benefits of the Finit Solutions process with Apple-inspired styling
 */
export function ProcessBenefits() {
  const benefits = [
    {
      icon: Users,
      title: "Echte samenwerking",
      description: "We werken niet voor u, maar met u — uw expertise gecombineerd met onze technische kennis voor optimale resultaten."
    },
    {
      icon: Zap,
      title: "Snelle resultaten",
      description: "Door onze agile aanpak ziet u snel concrete vooruitgang en kunt u tijdig bijsturen voor maximale impact."
    },
    {
      icon: BarChart3,
      title: "Meetbare impact",
      description: "Elke oplossing wordt gebouwd met duidelijke KPI's en meetbare verbeteringen die uw ROI aantonen."
    }
  ];

  return (
    <div className="container mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white tracking-tight">
          Waarom ons proces werkt
        </h2>
        <p className="text-blue-100 text-xl max-w-4xl mx-auto mb-20 font-light leading-relaxed tracking-wide">
          Bewezen resultaten door een gestructureerde aanpak, continue samenwerking en focus op meetbare impact.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -12, scale: 1.03 }}
          >
            <Card className="h-full bg-gradient-to-br from-white/15 via-white/10 to-white/8 backdrop-blur-xl border border-white/25 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/8 rounded-lg" />
              
              <CardContent className="p-10 relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-18 h-18 rounded-2xl bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/40 shadow-lg"
                >
                  <benefit.icon className="h-9 w-9 text-white" />
                </motion.div>
                <h3 className="text-xl font-light mb-6 text-white tracking-wide">{benefit.title}</h3>
                <p className="text-blue-100 font-light leading-relaxed tracking-wide text-base">{benefit.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}