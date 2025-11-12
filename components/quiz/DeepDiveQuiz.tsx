"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface DeepDiveQuizProps {
  onComplete: () => void;
  onBack: () => void;
}

export function DeepDiveQuiz({ onComplete, onBack }: DeepDiveQuizProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [contactInfo, setContactInfo] = useState({
    companyName: "",
    email: "",
    gdprConsent: false,
  });

  const questions = [
    {
      id: "sector",
      label: "In welke sector is je bedrijf activ?",
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
      label: "Hoeveel medewerkers (FTE)?",
      type: "select",
      options: [
        { value: "1-5", label: "1–5" },
        { value: "6-20", label: "6–20" },
        { value: "21-50", label: "21–50" },
        { value: "50+", label: "50+" },
      ],
    },
    {
      id: "role",
      label: "Wat is jouw rol?",
      type: "select",
      options: [
        { value: "owner-ceo", label: "Owner/CEO" },
        { value: "operations", label: "Operations" },
        { value: "marketing-sales", label: "Marketing & Sales" },
        { value: "admin-finance", label: "Admin & Finance" },
      ],
    },
    {
      id: "time_sinks",
      label: "Welke taken kosten de meeste tijd?",
      type: "multi-select",
      options: [
        { value: "administration", label: "Administration" },
        { value: "customer-followup", label: "Customer follow-up" },
        { value: "reporting-data", label: "Reporting & Data" },
        { value: "internal-comms", label: "Internal comms" },
        { value: "production-service", label: "Production or Service delivery" },
      ],
    },
    {
      id: "manual_reentry",
      label: "Handmatige re-entry van data tussen systemen?",
      type: "select",
      options: [
        { value: "yes-daily", label: "Ja, dagelijks" },
        { value: "sometimes", label: "Soms" },
        { value: "no", label: "Nee" },
      ],
    },
    {
      id: "system_links",
      label: "Hoe goed zijn systemen met elkaar verbonden?",
      type: "select",
      options: [
        { value: "everything-connected", label: "Alles verbonden" },
        { value: "some-connections", label: "Enkele koppelingen" },
        { value: "everything-separate", label: "Alles apart" },
      ],
    },
    {
      id: "digital_tools",
      label: "Worden processen getrackt in digitale tools (PM/CRM/ERP)?",
      type: "select",
      options: [
        { value: "yes-mostly", label: "Ja, grotendeels" },
        { value: "partially", label: "Gedeeltelijk" },
        { value: "no", label: "Nee" },
      ],
    },
    {
      id: "data_storage",
      label: "Waar sla je klant-/projectdata op?",
      type: "multi-select",
      options: [
        { value: "crm", label: "CRM" },
        { value: "excel-docs", label: "Excel & Docs" },
        { value: "multiple-tools", label: "Meerdere tools" },
        { value: "no-central", label: "Geen centrale opslag" },
      ],
    },
    {
      id: "realtime_insight",
      label: "Real-time inzicht (omzet, marges, status)?",
      type: "select",
      options: [
        { value: "dashboards", label: "Dashboards" },
        { value: "periodic-reports", label: "Periodieke rapporten" },
        { value: "not-really", label: "Niet echt" },
      ],
    },
    {
      id: "bi_tools",
      label: "Rapportage/BI tools? (optioneel)",
      type: "multi-select",
      optional: true,
      options: [
        { value: "power-bi", label: "Power BI" },
        { value: "looker", label: "Looker" },
        { value: "metabase", label: "Metabase" },
        { value: "excel-sheets", label: "Excel of Google Sheets" },
        { value: "none", label: "Geen" },
      ],
    },
    {
      id: "customer_mgmt",
      label: "Hoe beheer je leads/klanten?",
      type: "select",
      options: [
        { value: "crm", label: "CRM" },
        { value: "excel-email", label: "Excel & Email" },
        { value: "manual", label: "Handmatig" },
      ],
    },
    {
      id: "mktg_automation",
      label: "Marketing/Sales automatisering in gebruik?",
      type: "select",
      options: [
        { value: "yes", label: "Ja" },
        { value: "partially", label: "Gedeeltelijk" },
        { value: "no", label: "Nee" },
      ],
    },
    {
      id: "profitability_insight",
      label: "Ken je je meest winstgevende klanten/producten?",
      type: "select",
      options: [
        { value: "yes", label: "Ja" },
        { value: "unsure", label: "Onzeker" },
        { value: "no", label: "Nee" },
      ],
    },
    {
      id: "ai_tried",
      label: "AI geprobeerd in het bedrijf?",
      type: "select",
      options: [
        { value: "actively-used", label: "Actief gebruikt" },
        { value: "tried-paused", label: "Geprobeerd, toen gepauzeerd" },
        { value: "not-yet", label: "Nog niet" },
      ],
    },
    {
      id: "ai_potential",
      label: "Waar zit AI-potentieel?",
      type: "multi-select",
      options: [
        { value: "administration", label: "Administration" },
        { value: "marketing-comms", label: "Marketing & Comms" },
        { value: "production-processes", label: "Production & Processes" },
        { value: "customer-service", label: "Customer service" },
      ],
    },
    {
      id: "ai_barriers",
      label: "Voornaamste barrières voor AI?",
      type: "multi-select",
      options: [
        { value: "cost", label: "Kosten" },
        { value: "lack-knowledge", label: "Gebrek aan kennis" },
        { value: "lack-time", label: "Gebrek aan tijd" },
        { value: "uncertain-value", label: "Onzekere waarde" },
      ],
    },
    {
      id: "it_partner",
      label: "IT-partner?",
      type: "select",
      options: [
        { value: "internal", label: "Intern" },
        { value: "external", label: "Extern" },
        { value: "none", label: "Geen" },
      ],
    },
    {
      id: "security_level",
      label: "Data security niveau (backups/toegang)?",
      type: "select",
      options: [
        { value: "well-arranged", label: "Goed geregeld" },
        { value: "basic", label: "Basis" },
        { value: "unclear", label: "Onduidelijk/niet geregeld" },
      ],
    },
    {
      id: "goal_12m",
      label: "Hoofddoel komende 12 maanden?",
      type: "select",
      options: [
        { value: "growth", label: "Groei" },
        { value: "work-efficiently", label: "Efficiënter werken" },
        { value: "cost-reduction", label: "Kostenreductie" },
        { value: "better-cx", label: "Betere klantervaring" },
      ],
    },
    {
      id: "digital_maturity",
      label: "Digitale maturiteit (zelfbeoordeling)?",
      type: "select",
      options: [
        { value: "very-digital", label: "Zeer digitaal" },
        { value: "average", label: "Gemiddeld" },
        { value: "early-stage", label: "Beginfase" },
      ],
    },
    {
      id: "frustration",
      label: "Grootste tijdverspillende frustratie vandaag? (optioneel)",
      type: "textarea",
      optional: true,
    },
    {
      id: "tech_help",
      label: "Waar hoop je dat tech het meest helpt? (optioneel)",
      type: "textarea",
      optional: true,
    },
  ];

  const totalSteps = questions.length + 1; // +1 for contact info

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultiSelectChange = (questionId: string, optionValue: string, checked: boolean) => {
    setAnswers(prev => {
      const currentValues = prev[questionId] || [];
      if (checked) {
        return { ...prev, [questionId]: [...currentValues, optionValue] };
      } else {
        return { ...prev, [questionId]: currentValues.filter((v: string) => v !== optionValue) };
      }
    });
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    if (!currentQuestion.optional) {
      const answer = answers[currentQuestion.id];
      if (!answer || (Array.isArray(answer) && answer.length === 0)) {
        toast({
          title: "Vul dit veld in",
          description: "Dit is een verplicht veld",
          variant: "destructive",
        });
        return;
      }
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
        quiz: "deep-dive",
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
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      onComplete();
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
    const currentAnswer = answers[question.id];

    return (
      <div className="space-y-4">
        <Label className="text-lg font-medium">
          {question.label}
          {question.optional && <span className="text-gray-400 ml-1">(optioneel)</span>}
        </Label>

        {question.type === "select" && (
          <Select value={currentAnswer} onValueChange={(value) => handleAnswerChange(question.id, value)}>
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

        {question.type === "multi-select" && (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <Checkbox
                  id={`${question.id}-${option.value}`}
                  checked={(currentAnswer || []).includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleMultiSelectChange(question.id, option.value, checked as boolean)
                  }
                />
                <Label htmlFor={`${question.id}-${option.value}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {question.type === "textarea" && (
          <Textarea
            value={currentAnswer || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Je antwoord..."
            className="w-full min-h-[100px]"
          />
        )}
      </div>
    );
  };

  const renderContactForm = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Contactgegevens voor je PDF rapport</h3>
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
          <CardTitle className="text-2xl">Deep-Dive Scan</CardTitle>
          <span className="text-sm text-gray-500">
            {currentStep + 1} van {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
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
            <Button onClick={handleNext} disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
              Volgende
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
              {isSubmitting ? "Verzenden..." : "Verstuur"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
