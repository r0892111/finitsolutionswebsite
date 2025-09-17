"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="pt-20">
      <section className="relative py-16 md:py-24 bg-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
            >
              <span>Privacyverklaring</span> <ChevronRight className="h-4 w-4 ml-1" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-2"
            >
              Privacyverklaring 
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-muted-foreground mb-8"
            >
              Versie: <strong>18/08/2025</strong> — Website:{" "}
              <a href="https://finitsolutions.be/" target="_blank" rel="noopener noreferrer" className="underline">
                https://finitsolutions.be/
              </a>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {/* Content continues as before... */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="inleiding">1. Inleiding</h2>
              <p>
                Bedankt voor uw bezoek aan onze website! De bescherming van uw privacy en persoonsgegevens is voor ons
                van het grootste belang. Wij stellen alles in het werk om uw privacy te beschermen en ervoor te zorgen dat
                u uw persoonsgegevens veilig aan ons kunt toevertrouwen.
              </p>
              {/* Rest of privacy content... */}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}