"use client";

import { CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeepDiveConfirmationProps {
  onRestart: () => void;
}

export function DeepDiveConfirmation({ onRestart }: DeepDiveConfirmationProps) {
  return (
    <Card className="border-2 border-green-200">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-3xl mb-2">Bedankt voor je tijd!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800">Je PDF rapport is onderweg</h3>
          </div>
          <p className="text-gray-700 text-lg">
            Je ontvangt binnenkort een uitgebreid rapport per email met:
          </p>
          <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Gedetailleerde analyse van je huidige situatie</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Concrete automatisering en AI mogelijkheden</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Prioriteiten en roadmap voor de komende maanden</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>ROI inschatting en implementatie tips</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold mb-2">Hulp nodig bij implementatie?</h4>
          <p className="text-gray-600 mb-4">
            Ons team staat klaar om je te helpen met het realiseren van je automatisering doelen
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
              Plan een gesprek in
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Geen email ontvangen? Check je spam folder of neem direct contact met ons op.
        </p>
      </CardContent>
    </Card>
  );
}
