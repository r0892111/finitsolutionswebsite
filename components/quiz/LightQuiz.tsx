"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Users, Clock, Cog, Sparkles, Database, TrendingUp, Lightbulb, ListChecks, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    tools_in_use: [],
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
    label: "Wat zou de grootste winst opleveren als het geautomatiseerd werd?",
    type: "text",
    icon: Lightbulb,
    color: "from-yellow-500 to-amber-500",
    optional: true,
    placeholder: "Bv. offertes opmaken, facturen, planning, support…",
  },
  {
    id: "tools_in_use",
    label: "Welke tools gebruik je vandaag?",
    type: "multiselect",
    icon: ListChecks,
    color: "from-fuchsia-500 to-pink-500",
    optional: true,
    options: [
      { value: "crm", label: "CRM (HubSpot, Pipedrive, Salesforce)" },
      { value: "erp", label: "ERP/Boekhouding (Odoo, Exact, SAP B1)" },
      { value: "rpa", label: "Workflow/RPA (Zapier, Make, Power Automate)" },
      { value: "ai_assistant", label: "AI-assistent (ChatGPT, Copilot, Gemini)" },
      { value: "bi", label: "Data & BI (Power BI, Looker Studio, Tableau)" },
      { value: "marketing_auto", label: "Marketing automation (Mailchimp, HubSpot)" },
      { value: "support", label: "Support/Chatbot (Zendesk, Intercom)" },
      { value: "docs", label: "Documentverwerking (DocuSign, OCR)" },
      { value: "custom", label: "Custom scripts (Python, Apps Script)" },
      { value: "none", label: "Geen van bovenstaande" },
      { value: "other", label: "Andere" },
    ],
  },
];

  const totalSteps = questions.length + 1;

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultiSelectToggle = (questionId: string, value: string) => {
    setAnswers(prev => {
      const current = prev[questionId] || [];
      const newValue = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      return { ...prev, [questionId]: newValue };
    });
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
        "https://alexfinit.app.n8n.cloud/webhook/2e2d8a56-43a4-48ef-996a-f20779fd7e39",
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
        className={`space-y-8 animate-in ${direction === 'forward' ? 'slide-in-from-right-4' : 'slide-in-from-left-4'} fade-in duration-300`}
      >
        {/* Question Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${question.color} flex items-center justify-center shadow-sm`}>
              <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <Label className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                {question.label}
              </Label>
              {question.optional && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                  optioneel
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          {question.type === "select" && (
            <Select
              value={answers[question.id]}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <SelectTrigger className="w-full h-12 text-base text-gray-900 dark:text-grey-100 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/70 hover:bg-white/95 transition-all duration-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 shadow-sm">
                <SelectValue placeholder="Selecteer een optie" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-gray-200/50 shadow-xl">
                {question.options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-base py-3 cursor-pointer text-gray-900 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 transition-colors duration-150"
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
              placeholder={question.placeholder || "Je antwoord..."}
              className="w-full h-12 text-base text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/70 hover:bg-white/95 transition-all duration-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 shadow-sm placeholder:text-gray-400"
            />
          )}

          {question.type === "multiselect" && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {question.options?.map((option) => {
                  const isSelected = (answers[question.id] || []).includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleMultiSelectToggle(question.id, option.value)}
                      className={`
                        px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${isSelected
                          ? `bg-gradient-to-r ${question.color} text-white shadow-md scale-[0.98] ring-2 ring-offset-1 ring-blue-500/30`
                          : 'bg-white/80 backdrop-blur-sm text-gray-900 border border-gray-200/50 hover:border-gray-300/70 hover:bg-white/95 shadow-sm'
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        {isSelected && <Check className="w-4 h-4" strokeWidth={2.5} />}
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Indicator */}
        {answers[question.id] && answers[question.id] !== "" && (question.type !== "multiselect" || answers[question.id].length > 0) && (
          <div className="animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm font-medium text-green-700">Opgeslagen</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContactForm = () => {
    return (
      <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-md mb-2">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Ontvang je persoonlijk advies</h3>
          <p className="text-base text-gray-600 max-w-md mx-auto">Vul je contactgegevens in om je op maat gemaakt AI-automatiseringsrapport te ontvangen</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-base font-semibold text-gray-800">
              Bedrijfsnaam
            </Label>
            <Input
              id="companyName"
              value={contactInfo.companyName}
              onChange={(e) => setContactInfo(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Je bedrijfsnaam"
              className="h-12 text-base text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/70 hover:bg-white/95 transition-all duration-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 shadow-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-semibold text-gray-800">
              E-mailadres
            </Label>
            <Input
              id="email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              placeholder="naam@bedrijf.be"
              className="h-12 text-base text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/70 hover:bg-white/95 transition-all duration-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 shadow-sm"
              required
            />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/80 backdrop-blur-sm border border-blue-100/50">
            <Checkbox
              id="gdpr"
              checked={contactInfo.gdprConsent}
              onCheckedChange={(checked) =>
                setContactInfo(prev => ({ ...prev, gdprConsent: checked as boolean }))
              }
              className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="gdpr" className="text-sm text-gray-700 cursor-pointer leading-relaxed font-medium">
              Ik ga ermee akkoord dat mijn gegevens gebruikt worden voor contactname over dit rapport
            </Label>
          </div>
        </div>
      </div>
    );
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Sticky Progress Header */}
      <div className="sticky top-4 z-10 mb-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/50 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Light Scan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Vraag</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{currentStep + 1}</span>
              <span className="text-sm text-gray-400">/</span>
              <span className="text-sm font-semibold text-gray-600">{totalSteps}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${currentStep < questions.length ? questions[currentStep].color : 'from-blue-500 to-purple-500'} shadow-sm`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 md:p-10">
        <div className="min-h-[320px]">
          {currentStep < questions.length ? renderQuestion() : renderContactForm()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4 pt-8 mt-8 border-t border-gray-200/50">
          <Button
            variant="ghost"
            onClick={currentStep === 0 ? onBack : handlePrevious}
            disabled={isSubmitting}
            className="h-11 px-5 text-base font-semibold text-gray-700 hover:bg-gray-100/80 transition-all duration-200 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={2.5} />
            {currentStep === 0 ? "Terug" : "Vorige"}
          </Button>

          {currentStep < questions.length ? (
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`h-11 px-6 text-base font-semibold bg-gradient-to-r ${questions[currentStep].color} hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg rounded-xl`}
            >
              Volgende
              <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2.5} />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !contactInfo.gdprConsent}
              className="h-11 px-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-lg rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verzenden...
                </>
              ) : (
                <>
                  Bekijk resultaat
                  <Sparkles className="w-4 h-4 ml-2" strokeWidth={2.5} />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
