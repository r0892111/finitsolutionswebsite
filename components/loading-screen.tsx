"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const duration = 65000;

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#395686] to-[#2d4469]">
      <div className="w-full max-w-md px-8 space-y-8">
        <div className="flex justify-center">
          <Image
            src="/logo-white-yellow.png"
            alt="Finit Solutions"
            width={200}
            height={80}
            className="animate-pulse"
            priority
          />
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2 bg-white/20" />
          <p className="text-center text-white/80 text-sm font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
