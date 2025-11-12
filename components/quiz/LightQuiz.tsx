"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface LightQuizProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function LightQuiz({ onComplete, onBack }: LightQuizProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({
    sector: "",
    fte: "",
    admin_hours: "",
    current_automation: "",
    ai_experience: "",
    data_central: "",
    investment_readiness: "",
    biggest_gain: "",
  });
  const [contactInfo, setContactInfo] = useState({
    companyName: "",
    email: "",
    gdprConsent: false,
  });

  const questions = [
    {
      id: "sector",
      label: "In welke sector is je bedrijf actief?",
      type: "select",
      options: [
        { value: "production", label: "Production" },
        { value: "services", label: "Services" },
        { value: "retail", label: "Retail & E-commerce" },
        { value: "construction", label: "Construction" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "fte",
      label: "Hoeveel medewerkers (FTE) heeft je bedrijf?",
      type: "select",
      options: [
        { value: "1-5", label: "1–5" },
        { value: "6-20", label: "6–20" },
        { value: "21-50", label: "21–50" },
        { value: "50+", label: "50+" },
      ],
    },
    {
      id: "admin_hours",
      label: "Hoeveel uren per week besteed je aan handmatig administratief of datawerk?",
      type: "select",
      options: [
        { value: "<5", label: "<5 uur" },
        { value: "5-10", label: "5–10 uur" },
        { value: ">10", label: ">10 uur" },
      ],
    },
    {
      id: "current_automation",
      label: "Automatiseer je al repetitieve taken?",
      type: "select",
      options: [
        { value: "yes-broadly", label: "Ja, op grote schaal" },
        { value: "few-tools", label: "Een paar tools" },
        { value: "no", label: "Nee" },
      ],
    },
    {
      id: "ai_experience",
      label: "Heb je al AI-tools geprobeerd?",
      type: "select",
      options: [
        { value: "yes-regularly", label: "Ja, regelmatig" },
        { value: "a-bit", label: "Een beetje" },
        { value: "not-yet", label: "Nog niet" },
      ],
    },
    {
      id: "data_central",
      label: "Worden bedrijfsgegevens centraal beheerd (CRM/ERP/cloud)?",
      type: "select",
      options: [
        { value: "yes", label: "Ja" },
        { value: "partially", label: "Gedeeltelijk" },
        { value: "no", label: "Nee" },
      ],
    },
    {
      id: "investment_readiness",
      label: "Hoe open sta je om binnen 6 maanden te investeren in automatisering/AI?",
      type: "select",
      options: [
        { value: "very-open", label: "Zeer open" },
        { value: "unsure", label: "Onzeker" },
        { value: "not-right-away", label: "Niet meteen" },
      ],
    },
    {
      id: "biggest_gain",
      label: "Wat zou de grootste winst opleveren als het geautomatiseerd werd? (optioneel)",
      type: "text",
      optional: true,
    },
  ];

  const totalSteps = questions.length + 1; // +1 for contact info

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    if (!currentQuestion.optional && !answers[currentQuestion.id]) {
      toast({
        title: "Vul dit veld in",
        description: "Dit is een verplicht veld",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!contactInfo.companyName || !contactInfo.email) {
      toast({
        title: "Contactgegevens vereist",
        description: "Vul je bedrijfsnaam en e-mailadres in",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      toast({
        title: "Ongeldig e-mailadres",
        description: "Voer een geldig e-mailadres in",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        quiz: "light",
        companyName: contactInfo.companyName,
        email: contactInfo.email,
        answers,
        meta: {
          path: "/KMO-quiz",
          version: "2025-11-12",
        },
      };

      const response = await fetch(
        "https://alexfinit.app.n8n.cloud/webhook-test/2e2d8a56-43a4-48ef-996a-f20779fd7e39",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      // Get response from backend
      const responseText = await response.text();
      let backendData;

      try {
        backendData = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse backend response:", responseText);
        throw new Error("Invalid response from server");
      }

      console.log("Backend response:", backendData);

      // Backend returns an array, get the first item
      const summaryData = Array.isArray(backendData) ? backendData[0] : backendData;

      if (!summaryData) {
        throw new Error("No data received from server");
      }

      // Pass backend data to summary
      onComplete(summaryData);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het opnieuw",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentStep];

    return (
      <div className="space-y-4">
        <Label className="text-lg font-medium">{question.label}</Label>
        {question.type === "select" && (
          <Select
            value={answers[question.id]}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecteer een optie" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {question.type === "text" && (
          <Input
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Je antwoord..."
            className="w-full"
          />
        )}
      </div>
    );
  };

  const renderContactForm = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Contactgegevens</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName">Bedrijfsnaam *</Label>
            <Input
              id="companyName"
              value={contactInfo.companyName}
              onChange={(e) => setContactInfo(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Je bedrijfsnaam"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">E-mailadres *</Label>
            <Input
              id="email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              placeholder="naam@bedrijf.be"
              required
            />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="gdpr"
              checked={contactInfo.gdprConsent}
              onCheckedChange={(checked) =>
                setContactInfo(prev => ({ ...prev, gdprConsent: checked as boolean }))
              }
            />
            <Label htmlFor="gdpr" className="text-sm text-gray-600 cursor-pointer">
              Ik ga ermee akkoord dat mijn gegevens gebruikt worden voor contactname over dit rapport
            </Label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-2xl">Light Scan</CardTitle>
          <span className="text-sm text-gray-500">
            {currentStep + 1} van {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep < questions.length ? renderQuestion() : renderContactForm()}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onBack : handlePrevious}
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 0 ? "Terug" : "Vorige"}
          </Button>

          {currentStep < questions.length ? (
            <Button onClick={handleNext} disabled={isSubmitting}>
              Volgende
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Verzenden..." : "Bekijk resultaat"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
