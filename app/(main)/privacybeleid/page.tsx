"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new privacy URL
    router.replace('/privacy');
  }, [router]);

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
              Redirecting to Privacy Policy...
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
            >
              You will be automatically redirected to the new privacy policy page.
            </motion.p>
          </div>
        </div>
      </section>
    </main>
  );
}
