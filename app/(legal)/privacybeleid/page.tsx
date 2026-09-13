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
    <main>
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[74rem] px-5 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center rounded-full bg-[#E6ECF9] px-3 py-1 text-[0.8125rem] font-medium text-[#1A2D63]"
            >
              <span>Privacyverklaring</span> <ChevronRight className="h-4 w-4 ml-1" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hp-display mb-2 text-[2rem] font-bold leading-[1.1] text-[#1A2D63] sm:text-[2.5rem]"
            >
              Redirecting to Privacy Policy...
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#6C7590]"
            >
              You will be automatically redirected to the new privacy policy page.
            </motion.p>
          </div>
        </div>
      </section>
    </main>
  );
}
