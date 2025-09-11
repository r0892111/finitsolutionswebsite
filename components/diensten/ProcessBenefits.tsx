/**
 * Benefits section component for the diensten page
 * Displays why the Finit process works with three key benefits
 */

"use client";

import { motion } from "framer-motion";
import { Users, Zap, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

export function ProcessBenefits() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white tracking-tight">
            Waarom ons proces werkt
          </h2>
          <p className="text-white/80 text-xl max-w-4xl mx-auto mb-20 font-light leading-relaxed tracking-wide">
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
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/25 hover:shadow-3xl transition-all duration-500"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/25 to-white/15 flex items-center justify-center mx-auto mb-6 border border-white/40 shadow-lg"
              >
                <benefit.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-light mb-6 text-white tracking-wide">{benefit.title}</h3>
              <p className="text-white/80 font-light leading-relaxed tracking-wide text-base">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}