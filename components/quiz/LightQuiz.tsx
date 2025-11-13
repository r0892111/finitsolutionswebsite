"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Users, Clock, Cog, Sparkles, Database, TrendingUp, Lightbulb, Globe } from "lucide-react";
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
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
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
    icon: Building2,
    color: "from-blue-500 to-cyan-500",
    options: [
      { value: "production", label: "Productie" },
      { value: "services", label: "Diensten" },
      { value: "retail", label: "Retail & E-commerce" },
      { value: "construction", label: "Bouw" },
      { value: "other", label: "Anders" },
    ],
  },
  {
    id: "fte",
    label: "Hoeveel medewerkers (FTE) heeft je bedrijf?",
    type: "select",
    icon: Users,
    color: "from-emerald-500 to-teal-500",
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
    icon: Clock,
    color: "from-amber-500 to-orange-500",
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
    icon: Cog,
    color: "from-violet-500 to-purple-500",
    options: [
      { value: "yes-broadly", label: "Ja, op grotere schaal" },
      { value: "few-tools", label: "Enkele tools" },
      { value: "no", label: "Nee" },
    ],
  },
  {
    id: "ai_experience",
    label: "Heb je al AI-tools geprobeerd?",
    type: "select",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    options: [
      { value: "yes-regularly", label: "Ja, regelmatig" },
      { value: "a-bit", label: "Een beetje" },
      { value: "not-yet", label: "Nog niet" },
    ],
  },
  {
    id: "data_central",
    label: "Worden kernbedrijfsgegevens centraal beheerd (CRM/ERP/cloud)?",
    type: "select",
    icon: Database,
    color: "from-sky-500 to-blue-500",
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
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
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
    icon: Lightbulb,
    color: "from-yellow-500 to-amber-500",
    optional: true,
    placeholder: "Bv. offertes opmaken, facturen, planning, support…",
  },
  {
    id: "tools_in_use",
    label: "Welke tools gebruik je vandaag? (meerdere mogelijk)",
    type: "multiselect",
    icon: ListChecks,
    color: "from-fuchsia-500 to-pink-500",
    options: [
      { value: "crm", label: "CRM (HubSpot, Pipedrive, Salesforce)" },
      { value: "erp", label: "ERP/Boekhouding (Odoo, Exact, SAP B1)" },
      { value: "rpa", label: "Workflow/RPA (Zapier, Make, Power Automate)" },
      { value: "ai_assistant", label: "AI-assistent (ChatGPT, Copilot, Gemini)" },
      { value: "bi", label: "Data & BI (Power BI, Looker Studio, Tableau)" },
      { value: "marketing_auto", label: "Marketing automation (Mailchimp, HubSpot, ActiveCampaign)" },
      { value: "support", label: "Support/Chatbot (Zendesk, Intercom)" },
      { value: "docs", label: "Documentverwerking (DocuSign, OCR)" },
      { value: "custom", label: "Custom scripts (Python, Apps Script)" },
      { value: "none", label: "Geen van bovenstaande" },
      { value: "other", label: "Andere" },
    ],
  },
  {
    id: "company_website",
    label: "Wat is de website van je bedrijf?",
    type: "text",
    icon: Globe,
    color: "from-indigo-500 to-blue-500",
    placeholder: "https://www.jouwbedrijf.be",
  }
];

  const totalSteps = questions.length + 1;

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
    setDirection('forward');
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setDirection('backward');
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

      const responseText = await response.text();
      let backendData;

      try {
        backendData = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse backend response:", responseText);
        throw new Error("Invalid response from server");
      }

      console.log("Backend response:", backendData);

      const summaryData = Array.isArray(backendData) ? backendData[0] : backendData;

      if (!summaryData) {
        throw new Error("No data received from server");
      }

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
    const Icon = question.icon;

    return (
      <div
        key={currentStep}
        className={`space-y-6 animate-in ${direction === 'forward' ? 'slide-in-from-right' : 'slide-in-from-left'} fade-in duration-500`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${question.color} flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <Label className="text-xl font-semibold text-gray-800 leading-relaxed">
              {question.label}
            </Label>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full mt-2" />
          </div>
        </div>

        <div className="pl-16">
          {question.type === "select" && (
            <Select
              value={answers[question.id]}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <SelectTrigger className="w-full h-14 text-base border-2 hover:border-blue-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <SelectValue placeholder="Selecteer een optie" />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option, index) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-base py-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${question.color}`} />
                      {option.label}
                    </div>
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
              className="w-full h-14 text-base border-2 hover:border-blue-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />
          )}
        </div>

        {answers[question.id] && (
          <div className="pl-16 animate-in slide-in-from-top fade-in duration-300">
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              Antwoord opgeslagen
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContactForm = () => {
    return (
      <div className="space-y-6 animate-in slide-in-from-right fade-in duration-500">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Bijna klaar!</h3>
          <p className="text-gray-600">Vul je contactgegevens in om je resultaten te ontvangen</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-base font-medium text-gray-700">
              Bedrijfsnaam *
            </Label>
            <Input
              id="companyName"
              value={contactInfo.companyName}
              onChange={(e) => setContactInfo(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Je bedrijfsnaam"
              className="h-12 text-base border-2 hover:border-blue-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium text-gray-700">
              E-mailadres *
            </Label>
            <Input
              id="email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              placeholder="naam@bedrijf.be"
              className="h-12 text-base border-2 hover:border-blue-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              required
            />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
            <Checkbox
              id="gdpr"
              checked={contactInfo.gdprConsent}
              onCheckedChange={(checked) =>
                setContactInfo(prev => ({ ...prev, gdprConsent: checked as boolean }))
              }
              className="mt-1"
            />
            <Label htmlFor="gdpr" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
              Ik ga ermee akkoord dat mijn gegevens gebruikt worden voor contactname over dit rapport
            </Label>
          </div>
        </div>
      </div>
    );
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Card className="w-full shadow-xl border-0 overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${currentStep < questions.length ? questions[currentStep].color : 'from-blue-500 to-purple-500'} transition-all duration-500`}
           style={{ width: `${progress}%` }}
      />

      <CardHeader className="pb-6 pt-8">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Light Scan
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Stap</span>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-blue-600">{currentStep + 1}</span>
              <span className="text-lg text-gray-400">/</span>
              <span className="text-lg text-gray-600">{totalSteps}</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${currentStep < questions.length ? questions[currentStep].color : 'from-blue-500 to-purple-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <div className="min-h-[280px]">
          {currentStep < questions.length ? renderQuestion() : renderContactForm()}
        </div>

        <div className="flex justify-between pt-8 mt-8 border-t">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onBack : handlePrevious}
            disabled={isSubmitting}
            className="h-12 px-6 text-base font-medium hover:bg-gray-50 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {currentStep === 0 ? "Terug" : "Vorige"}
          </Button>

          {currentStep < questions.length ? (
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`h-12 px-8 text-base font-medium bg-gradient-to-r ${questions[currentStep].color} hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg`}
            >
              Volgende
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-12 px-8 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verzenden...
                </>
              ) : (
                <>
                  Bekijk resultaat
                  <Sparkles className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
