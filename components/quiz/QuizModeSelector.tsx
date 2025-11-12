"use client";

import { Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizModeSelectorProps {
  onSelect: (mode: "light" | "deep-dive") => void;
}

export function QuizModeSelector({ onSelect }: QuizModeSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <Card className="hover:shadow-lg transition-shadow border-2 hover:border-blue-400">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Light Scan</CardTitle>
          </div>
          <CardDescription className="text-base">
            Krijg in 2 minuten een eerste indicatie van je automatisering potentieel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>±2 minuten</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center text-blue-600 font-bold">✓</span>
              <span>8 snelle vragen</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center text-blue-600 font-bold">✓</span>
              <span>Direct resultaat op je scherm</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center text-blue-600 font-bold">✓</span>
              <span>Efficiency score + quick wins</span>
            </li>
          </ul>
          <Button
            onClick={() => onSelect("light")}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Start Light Scan
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow border-2 hover:border-purple-400">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">Deep-Dive Scan</CardTitle>
          </div>
          <CardDescription className="text-base">
            Ontvang een uitgebreid PDF rapport met concrete aanbevelingen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>5–7 minuten</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center text-purple-600 font-bold">✓</span>
              <span>20 gedetailleerde vragen</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center text-purple-600 font-bold">✓</span>
              <span>PDF rapport per email</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center text-purple-600 font-bold">✓</span>
              <span>Concrete roadmap en next steps</span>
            </li>
          </ul>
          <Button
            onClick={() => onSelect("deep-dive")}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            Start Deep-Dive Scan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
