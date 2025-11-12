"use client";

import { useState } from "react";
import { QuizModeSelector } from "@/components/quiz/QuizModeSelector";
import { LightQuiz } from "@/components/quiz/LightQuiz";
import { DeepDiveQuiz } from "@/components/quiz/DeepDiveQuiz";
import { LightQuizSummary } from "@/components/quiz/LightQuizSummary";
import { DeepDiveConfirmation } from "@/components/quiz/DeepDiveConfirmation";

type QuizMode = "selector" | "light" | "deep-dive" | "light-summary" | "deep-dive-complete";

export default function KMOQuizPage() {
  const [mode, setMode] = useState<QuizMode>("selector");
  const [summaryData, setSummaryData] = useState<any>(null);

  const handleModeSelect = (selectedMode: "light" | "deep-dive") => {
    setMode(selectedMode);
  };

  const handleLightQuizComplete = (data: any) => {
    setSummaryData(data);
    setMode("light-summary");
  };

  const handleDeepDiveComplete = () => {
    setMode("deep-dive-complete");
  };

  const handleRestart = () => {
    setMode("selector");
    setSummaryData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            QAIMO Efficiency Scan
          </h1>
          <p className="text-lg text-gray-600">
            Ontdek het AI en automatisering potentieel van je bedrijf
          </p>
        </div>

        {mode === "selector" && (
          <QuizModeSelector onSelect={handleModeSelect} />
        )}

        {mode === "light" && (
          <LightQuiz onComplete={handleLightQuizComplete} onBack={handleRestart} />
        )}

        {mode === "deep-dive" && (
          <DeepDiveQuiz onComplete={handleDeepDiveComplete} onBack={handleRestart} />
        )}

        {mode === "light-summary" && summaryData && (
          <LightQuizSummary data={summaryData} onRestart={handleRestart} />
        )}

        {mode === "deep-dive-complete" && (
          <DeepDiveConfirmation onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
