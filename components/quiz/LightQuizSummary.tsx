"use client";

import { CheckCircle, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LightQuizSummary as SummaryData } from "@/lib/quiz-calculator";

interface LightQuizSummaryProps {
  data: SummaryData;
  onRestart: () => void;
}

export function LightQuizSummary({ data, onRestart }: LightQuizSummaryProps) {
  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case "High":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2">Je Efficiency Scan Resultaat</CardTitle>
          <CardDescription className="text-base">
            Hier is een eerste indicatie van je automatisering en AI potentieel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Efficiency Score */}
          <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-white rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-700">Efficiency Potentieel</h3>
            </div>
            <div className={`text-6xl font-bold ${getScoreColor(data.efficiencyScore)}`}>
              {data.efficiencyScore}
              <span className="text-3xl">/100</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {data.efficiencyScore >= 70 && "Uitstekend potentieel voor automatisering!"}
              {data.efficiencyScore >= 40 && data.efficiencyScore < 70 && "Goed potentieel met concrete mogelijkheden"}
              {data.efficiencyScore < 40 && "Er zijn interessante kansen voor verbetering"}
            </p>
          </div>

          {/* AI Readiness */}
          <div className="text-center py-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-700">AI Readiness</h3>
            </div>
            <div className={`inline-block px-6 py-3 rounded-full text-2xl font-bold ${getReadinessColor(data.aiReadiness)}`}>
              {data.aiReadiness === "High" && "Hoog"}
              {data.aiReadiness === "Medium" && "Gemiddeld"}
              {data.aiReadiness === "Low" && "Laag"}
            </div>
          </div>

          {/* Quick Wins */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-700">Quick Wins voor jou</h3>
            </div>
            <ul className="space-y-3">
              {data.quickWins.map((win, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-800">{win}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl text-center">
            <h4 className="text-lg font-semibold mb-2">Wil je meer weten?</h4>
            <p className="text-gray-600 mb-4">
              Doe de Deep-Dive Scan voor een uitgebreid PDF rapport met concrete aanbevelingen en een roadmap
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={onRestart} variant="outline" size="lg">
                Terug naar start
              </Button>
              <Button
                onClick={() => window.location.href = "/#contact"}
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Neem contact op
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
