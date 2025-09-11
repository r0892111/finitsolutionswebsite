"use client";
import { useState, useEffect, useCallback } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <section className="relative md:min-h-screen overflow-hidden">
      <div className="max-w-[1500px] gap-20  md:gap-0 px-4 md:px-10  mx-auto md:flex-row flex-col-reverse flex items-center justify-between py-20 md:py-0 md:h-screen lg:px-8">
        <div className="absolute inset-0 bg-[url('/about-bg.png')] bg-cover z-[-1] bg-center"></div>
        {/* Left Content - Main Text */}
        <div className="w-full lg:w-1/2 space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-[12px] font-semibold bg-white text-blue-700 border border-blue-200">
              <Zap className="h-4 w-4 mr-2" />
              <span>AI & Automatisering voor KMOs</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-blue-900">
              AI workforces
              <br className="md:block hidden" />
              <span className="font-semibold"> that automate </span>
              <br className="md:block hidden" />
              <span className="font-semibold"> and scale your business.</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl font-semibold lg:text-2xl text-blue-900 leading-relaxed max-w-2xl">
              Building AI workforces that automate{" "}
              <br className="md:block hidden" /> inefficiency and give your
              company powerful leverage.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <ProjectRequestDialog 
              buttonText="Get Started"
              buttonClassName="bg-gray-400 hover:bg-gray-500 text-white px-8 py-4 text-lg rounded-full font-medium"
            />
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-blue-800 px-8 py-4 text-lg rounded-full font-medium"
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
        <img
            src="/about-image.png"
            alt="3D Graphic"
            className="w-[300px] md:w-[600px] h-auto motion-safe:animate-float"
          />
      </div>
    </section>
  );
}