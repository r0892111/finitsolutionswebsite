"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <section className="relative py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Klaar om tijd te besparen?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground mb-8 md:text-lg"
          >
            Plan een vrijblijvend gesprek en ontdek hoe we jouw bedrijf kunnen helpen.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ProjectRequestDialog buttonText="Neem contact op" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}