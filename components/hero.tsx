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
              <span>Where the Future Begins</span>
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="space-y-4"
>
  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-blue-900">
    AI Workforces  
    <br className="md:block hidden" />
    <span className="font-semibold">to automate </span>  
    <br className="md:block hidden" />
    <span className="font-semibold">and scale your business.</span>
  </h1>

  {/* Subheading */}
  <p className="text-xl font-semibold lg:text-2xl text-blue-900 leading-relaxed max-w-2xl">
    We build AI-powered workforces that eliminate inefficiencies  
    <br className="md:block hidden" /> and unlock powerful leverage for your company's growth.
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
        
        {/* Hero Image with Dynamic Server Effects */}
        <div className="relative w-[300px] md:w-[600px] h-auto">
          <motion.img
            src="/about-image.png"
            alt="3D Graphic"
            className="w-full h-auto relative z-10"
          />
          
          {/* Dynamic Data Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating Data Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-70"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-20, -60, -20],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Data Stream Lines */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`stream-${i}`}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                style={{
                  left: `${15 + (i * 20)}%`,
                  top: `${40 + (i * 15)}%`,
                  width: '60px'
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Pulsing Core */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Orbiting Data Points */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full"
                style={{
                  transformOrigin: '0 0'
                }}
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "linear"
                }}
                initial={{
                  x: `${30 + (i * 15)}px`,
                  y: `${-10 + (i * 5)}px`
                }}
              />
            ))}
            
            {/* Network Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[...Array(3)].map((_, i) => (
                <motion.line
                  key={`connection-${i}`}
                  x1={20 + (i * 25)}
                  y1={30 + (i * 10)}
                  x2={60 + (i * 15)}
                  y2={70 - (i * 10)}
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                  animate={{
                    strokeDashoffset: [0, -10, 0],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}