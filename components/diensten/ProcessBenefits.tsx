"use client";

import { motion } from "framer-motion";
import { Users, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProcessBenefits() {
  const benefits = [
    {
      icon: Users,
      title: "Echte samenwerking",
      description: "We werken niet voor u, maar met u — uw expertise gecombineerd met onze technische kennis voor optimale resultaten.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Clock,
      title: "Snelle resultaten",
      description: "Door onze agile aanpak ziet u snel concrete vooruitgang en kunt u tijdig bijsturen voor maximale impact.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: TrendingUp,
      title: "Meetbare impact",
      description: "Elke oplossing wordt gebouwd met duidelijke KPI's en meetbare verbeteringen die uw ROI aantonen.",
      color: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <section className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-medium"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="finit-h1 mb-8 text-white">
            Waarom ons proces werkt
          </h2>
          <p className="finit-body text-white/80 max-w-4xl mx-auto mb-20">
            Bewezen resultaten door een gestructureerde aanpak, continue samenwerking en focus op meetbare impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {benefits.map((benefit, i) => {
            const BenefitIcon = benefit.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group"
              >
                <Card className="h-full bg-white/15 backdrop-blur-xl border border-white/25 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardContent className="p-10 text-center relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl`}
                    >
                      <BenefitIcon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="finit-h2 mb-6 text-white">{benefit.title}</h3>
                    <p className="finit-body text-white/80">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}