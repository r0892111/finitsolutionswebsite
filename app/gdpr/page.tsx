"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function GDPRPage() {
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
              <span>GDPR</span> <ChevronRight className="h-4 w-4 ml-1" />
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-8"
            >
              GDPR Verklaring
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

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. GDPR Compliance</h2>
              <p>
                Finit Solutions voldoet aan de Algemene Verordening Gegevensbescherming (AVG/GDPR).
                We nemen de bescherming van uw gegevens serieus en hebben maatregelen getroffen om uw privacy te waarborgen.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Gegevensverwerking</h2>
              <p>Als verwerkingsverantwoordelijke zorgen wij voor:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Rechtmatige, behoorlijke en transparante verwerking</li>
                <li>Doelgebonden gegevensverzameling</li>
                <li>Minimale gegevensverwerking</li>
                <li>Juiste en actuele gegevens</li>
                <li>Beperkte bewaartermijnen</li>
                <li>Integriteit en vertrouwelijkheid</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Uw GDPR Rechten</h2>
              <p>Onder de GDPR heeft u de volgende rechten:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Recht op inzage</li>
                <li>Recht op rectificatie</li>
                <li>Recht op vergetelheid</li>
                <li>Recht op beperking van verwerking</li>
                <li>Recht op dataportabiliteit</li>
                <li>Recht van bezwaar</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Gegevensbeveiliging</h2>
              <p>
                We hebben technische en organisatorische maatregelen genomen om uw gegevens te beschermen:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Encryptie van gegevens</li>
                <li>Regelmatige veiligheidsaudits</li>
                <li>Toegangscontrole en authenticatie</li>
                <li>Regelmatige backups</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact DPO</h2>
              <p>
                Voor GDPR-gerelateerde vragen kunt u contact opnemen met ons team:{" "}
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