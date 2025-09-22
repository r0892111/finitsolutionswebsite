"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2, Users } from "lucide-react";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

export function ProcessCTA() {
  return (
    <section className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-white/8 via-primary/8 to-blue-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h2 className="finit-h1 mb-8 text-white">
            Klaar voor{" "}
            <span className="font-light bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
              Excellentie
            </span>
            ?
          </h2>
          <p className="finit-body text-white/80 mb-12">
            Transformeer uw digitale visie in meetbare bedrijfsimpact. Uw ambitie verdient uitzonderlijke uitvoering.
          </p>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectRequestDialog
              buttonText="Begin Uw Transformatie"
              buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-12 py-5 rounded-2xl font-medium group"
            />
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-8 mt-12 text-white/60"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}