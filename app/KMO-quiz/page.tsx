"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Zap, Clock, FileText, TrendingUp, Search, Target, CheckCircle, Sparkles, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizModeSelector } from "@/components/quiz/QuizModeSelector";
import { LightQuiz } from "@/components/quiz/LightQuiz";
import { DeepDiveQuiz } from "@/components/quiz/DeepDiveQuiz";
import { LightQuizSummary } from "@/components/quiz/LightQuizSummary";
import { DeepDiveConfirmation } from "@/components/quiz/DeepDiveConfirmation";

type QuizMode = "landing" | "selector" | "light" | "deep-dive" | "light-summary" | "deep-dive-complete";

function KMOQuizContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<QuizMode>("landing");
  const [summaryData, setSummaryData] = useState<any>(null);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "light") {
      setMode("light");
    } else if (modeParam === "deep-dive") {
      setMode("deep-dive");
    }
  }, [searchParams]);

  // Hide navbar and footer when in quiz modes
  useEffect(() => {
    const isQuizMode = mode === "light" || mode === "deep-dive";
    if (isQuizMode) {
      document.body.classList.add("quiz-active");
    } else {
      document.body.classList.remove("quiz-active");
    }

    return () => {
      document.body.classList.remove("quiz-active");
    };
  }, [mode]);

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
    setMode("landing");
    setSummaryData(null);
  };

  const handleStartFromLanding = (selectedMode: "light" | "deep-dive") => {
    setMode(selectedMode);
  };

  if (mode === "light") {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Glassmorphism Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
          {/* Ambient bokeh orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.5\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }} />
        </div>

        <div className="relative z-10 py-12 px-4">
          <LightQuiz onComplete={handleLightQuizComplete} onBack={handleRestart} />
        </div>
      </div>
    );
  }

  if (mode === "deep-dive") {
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
          <DeepDiveQuiz onComplete={handleDeepDiveComplete} onBack={handleRestart} />
        </div>
      </div>
    );
  }

  if (mode === "light-summary" && summaryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <LightQuizSummary data={summaryData} onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  if (mode === "deep-dive-complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <DeepDiveConfirmation onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  if (mode === "selector") {
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
          <QuizModeSelector onSelect={handleModeSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
            Elke dag hetzelfde admin-gedoe… en toch blijft het traag?
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Op <strong>drie minuten</strong> tijd krijg je persoonlijk advies over AI voor jouw KMO.
          </p>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => handleStartFromLanding("light")}
              aria-label="Start gratis scan — 3 minuten"
              className="h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px]"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start gratis scan — 3 minuten
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Direct resultaat · Geen verkooppraatje · Persoonlijke aanbevelingen
          </p>
        </div>
      </section>

      {/* UPDATED VALUE PROP */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Wat je krijgt in 3 minuten
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Proces & administratie
              </h3>
              <p className="text-gray-600 leading-relaxed">
                waar dubbel werk en overtypen zitten
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI-readiness
              </h3>
              <p className="text-gray-600 leading-relaxed">
                data, tools en team: ben je er klaar voor?
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3 concrete quick wins
              </h3>
              <p className="text-gray-600 leading-relaxed">
                voor de komende 30 dagen
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              onClick={() => handleStartFromLanding("light")}
              aria-label="Start gratis scan"
              className="h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px]"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start gratis scan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* UPDATED SOCIAL PROOF */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-base text-gray-700 max-w-2xl mx-auto mb-8">
              Wij implementeren toegankelijke AI die écht voor je werkt — praktisch, betaalbaar en afgestemd op KMO&apos;s.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-gray-600">
              <span>150+ scans bij KMO&apos;s</span>
              <span>·</span>
              <span>GDPR-proof</span>
              <span>·</span>
              <span>Begeleiding mogelijk</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/80 backdrop-blur border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg font-medium">
                ⏱️ &ldquo;27% minder admin-tijd binnen 6 weken.&rdquo;
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg font-medium">
                📈 &ldquo;Offertes 2× sneller de deur uit.&rdquo;
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg font-medium">
                💶 &ldquo;40% minder fouten door overtypen.&rdquo;
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* UPDATED PRODUCT CHOICE */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kies jouw aanpak
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Light Scan Card */}
            <Card className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Light Scan</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold">gratis • 3 min</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Snel je score + 3 quick wins.
                </p>

                <Button
                  onClick={() => handleStartFromLanding("light")}
                  aria-label="Start gratis Light Scan"
                  className="w-full h-12 min-h-[44px] bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02]"
                >
                  Start gratis Light Scan
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Deep-Dive Scan Card */}
            <Card className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />

              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                  Meest gekozen
                </span>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Deep-Dive Gesprek</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold">30 min</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Afdelingsanalyse, professioneel PDF-rapport en implementatie-roadmap.
                </p>

                <Link href="https://calendly.com/karel-finitsolutions/rl-30-minuten-kennismaking-finit-solutions" target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    aria-label="Plan Deep-Dive — rapport inbegrepen"
                    className="w-full h-12 min-h-[44px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02]"
                  >
                    Plan Deep-Dive — rapport inbegrepen
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>



    </div>
  );
}

export default function KMOQuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>}>
      <KMOQuizContent />
    </Suspense>
  );
}
