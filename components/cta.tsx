"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useLanguage } from "@/contexts/language-context";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const { t } = useLanguage();

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
            {t('cta.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground mb-8 md:text-lg"
          >
            {t('cta.description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 group"
              >
                <Calendar className="h-5 w-5" />
                {t('hero.cta.meeting')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}