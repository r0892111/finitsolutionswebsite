"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function TermsPage() {
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
              <span>Algemene Voorwaarden</span> <ChevronRight className="h-4 w-4 ml-1" />
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-8"
            >
              Algemene Voorwaarden
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <p className="text-muted-foreground">
                Laatst bijgewerkt: {new Date().toLocaleDateString('nl-BE')}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Algemeen</h2>
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle diensten en producten van Finit Solutions.
                Door gebruik te maken van onze diensten gaat u akkoord met deze voorwaarden.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Dienstverlening</h2>
              <p>
                Finit Solutions verplicht zich tot het leveren van kwalitatieve diensten volgens de overeengekomen specificaties.
                We streven naar continue verbetering en innovatie in onze dienstverlening.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Prijzen en Betalingen</h2>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Alle prijzen zijn exclusief BTW</li>
                <li>Facturen dienen binnen 30 dagen te worden voldaan</li>
                <li>Bij late betaling kunnen extra kosten in rekening worden gebracht</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectueel Eigendom</h2>
              <p>
                Alle intellectuele eigendomsrechten met betrekking tot onze diensten en producten blijven bij Finit Solutions,
                tenzij expliciet anders overeengekomen.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Aansprakelijkheid</h2>
              <p>
                Finit Solutions is niet aansprakelijk voor indirecte schade of gevolgschade.
                Onze aansprakelijkheid is beperkt tot het bedrag dat door onze verzekering wordt gedekt.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact</h2>
              <p>
                Voor vragen over onze algemene voorwaarden kunt u contact opnemen via:{" "}
                <a href="mailto:contact@finitsolutions.be" className="text-primary hover:underline">
                  contact@finitsolutions.be
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}