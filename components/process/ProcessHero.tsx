"use client";

import { motion } from "framer-motion";
import { ChevronRight, Cog } from "lucide-react";

/**
 * ProcessHero Component
 * Renders the hero section with title, description and controls
 */
export function ProcessHero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative py-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
            <Cog className="h-4 w-4 mr-2" />
            <span>Maatwerk proces</span>
            <ChevronRight className="h-4 w-4 ml-2" />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent">
          Van Idee tot Impact
        </h1>
        
        <p className="text-slate-600 text-base md:text-lg mb-6 max-w-2xl mx-auto text-center leading-relaxed">
          Ontdek hoe wij samen met u van uitdaging naar oplossing gaan — kort, duidelijk en
          resultaatgericht.
        </p>

        {children}
      </div>
    </section>
  );
}