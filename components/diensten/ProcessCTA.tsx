/**
 * Call-to-action section component for the diensten page
 * Final section encouraging users to start their transformation
 */

"use client";

import { motion } from "framer-motion";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

export function ProcessCTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-white tracking-tight">
            Klaar voor Excellentie?
          </h2>
          <p className="text-white/80 text-xl mb-12 leading-relaxed font-light">
            Transformeer uw digitale visie in meetbare bedrijfsimpact. Uw ambitie verdient uitzonderlijke uitvoering.
          </p>
          
          <ProjectRequestDialog 
            buttonText="Begin Uw Transformatie"
            buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-4 rounded-2xl font-medium"
          />
        </motion.div>
      </div>
    </section>
  );
}