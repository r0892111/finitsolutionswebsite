"use client";

import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  TrendingUp,
  Zap,
  Info,
  BarChart3,
  ShieldAlert,
  Sparkles,
  Cpu,
  Gauge,
  Calculator,
  ArrowRight,
  Rocket,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinitChatbot } from "./FinitChatbot";

interface BackendSummaryData {
  version?: string;
  quiz?: string;
  efficiency_score?: number;
  ai_readiness?: string;
  kpis?: {
    time_saving_pct_estimate?: number;
    automation_coverage_estimate?: number;
    payback_range_months?: string;
    confidence?: string;
  };
  summary?: {
    intro?: string;
    current_state?: string;
    ai_potential?: string;
    closing?: string;
  };
  friction_points?: Array<{ text: string; severity: string }>;
  opportunities?: Array<{ area: string; text: string }>;
  quick_wins?: string[];
  quick_wins_detailed?: Array<{
    title: string;
    why_it_matters: string;
    effort: string;
    impact: string;
    suggested_tools: string[];
  }>;
  solutions?: Array<{ title: string; description: string }>;
  roadmap?: Array<{ step: number; title: string; duration_weeks: number; outcome: string }>;
  recommended_stack?: {
    automation?: string[];
    ai_assistant?: string[];
    bi?: string[];
    crm?: string[];
    storage?: string[];
  };
  metrics?: Array<{ kpi: string; definition: string; target: string }>;
  cta?: { tagline: string; next_best_action: string };
  recommendation_tagline?: string;
  meta?: {
    sector?: string;
    employees?: number;
    avg_hourly_cost?: number;
    admin_hours_per_week?: number;
  };
}

interface LightQuizSummaryProps {
  data: BackendSummaryData;
  onRestart: () => void;
}

/** Break out to true full width (100vw), regardless of parent containers */
const FullBleed: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => (
  <div
    className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-[100vw] ${className || ""}`}
  >
    {children}
  </div>
);

const readinessPill = (readiness?: string) => {
  if (!readiness) return "text-gray-700 bg-gray-100";
  const r = readiness.toLowerCase();
  if (r.includes("hoog") || r.includes("high"))
    return "text-green-700 bg-green-100";
  if (r.includes("gemiddeld") || r.includes("medium"))
    return "text-amber-700 bg-amber-100";
  return "text-red-700 bg-red-100";
};

const scoreTint = (score: number) => {
  if (score >= 70) return "text-emerald-600";
  if (score >= 40) return "text-amber-600";
  return "text-rose-600";
};

const scoreCopy = (score: number) => {
  if (score >= 70) return "Uitstekend potentieel voor automatisering!";
  if (score >= 40) return "Goed potentieel met concrete mogelijkheden";
  return "Er zijn interessante kansen voor verbetering";
};

const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));

function ProgressRing({ value, size = 120 }: { value: number; size?: number }) {
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = clamp(value);
  const strokeDashoffset = circumference - (pct / 100) * circumference;
  return (
    <svg width={size} height={size} className="block">
      <defs>
        <linearGradient id="ring" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={7}
        fill="none"
        className="opacity-60"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#ring)"
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        fill="none"
        className="drop-shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-gray-800 text-xl font-semibold"
      >
        {pct}%
      </text>
    </svg>
  );
}

export function LightQuizSummary({ data, onRestart }: LightQuizSummaryProps) {
  const score = data.efficiency_score ?? 0;
  const readiness = data.ai_readiness ?? "Gemiddeld";

  const kpis = useMemo(() => {
    const efficiency = clamp(score);
    const timeWinPct =
      data.kpis?.time_saving_pct_estimate ??
      Math.round((efficiency / 100) * 30);
    const coverage =
      data.kpis?.automation_coverage_estimate ?? Math.round(efficiency * 0.8);
    const payback =
      data.kpis?.payback_range_months ??
      (efficiency >= 75 ? "1–3 mnd" : efficiency < 40 ? ">6 mnd" : "3–6 mnd");
    return [
      {
        label: "Efficiency Potentieel",
        icon: TrendingUp,
        value: `${efficiency}/100`,
        tone: scoreTint(efficiency),
      },
      { label: "Tijdswinst", icon: Gauge, value: `${timeWinPct}%`, tone: "text-sky-700" },
      { label: "Automatisering", icon: BarChart3, value: `${coverage}%`, tone: "text-violet-700" },
      { label: "Payback", icon: Zap, value: payback, tone: "text-emerald-700" },
    ];
  }, [score, data.kpis]);

  const [employees, setEmployees] = useState<number>(data.meta?.employees ?? 25);
  const [hours, setHours] = useState<number>(data.meta?.admin_hours_per_week ?? 6);
  const [rate, setRate] = useState<number>(data.meta?.avg_hourly_cost ?? 38);

  const savings = useMemo(() => {
    const timeWinPct = (clamp(score) / 100) * 0.3;
    const weeklyHoursSaved = employees * hours * timeWinPct;
    const monthlyEuro = weeklyHoursSaved * 4.3 * rate;
    return {
      weeklyHoursSaved: Math.round(weeklyHoursSaved),
      monthlyEuro: Math.round(monthlyEuro),
    };
  }, [employees, hours, rate, score]);

  const exportToPDF = () => {
    window.print();
  };

  return (
    <>
      <FinitChatbot autoOpen={true} />
      <section
        id="scan-result"
        aria-labelledby="scan-title"
        className="pt-[var(--nav-h,72px)] scroll-mt-[var(--nav-h,72px)] overflow-x-hidden"
      >
        {/* ===== Sticky summary bar – full width, opaque ===== */}
        <div className="sticky top-[var(--nav-h,72px)] z-50">
          <FullBleed>
            <div className="bg-white border-b border-slate-200 shadow-sm">
              <div className="px-6 py-3">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Score + titel */}
                  <div className="col-span-12 lg:col-span-3 flex items-center gap-4">
                    <ProgressRing value={clamp(score)} />
                    <div>
                      <h1
                        id="scan-title"
                        className="text-xl font-semibold text-slate-800"
                      >
                        Je Efficiency Scan Resultaat
                      </h1>
                      <p className="text-slate-600 text-sm">{scoreCopy(score)}</p>
                      <span
                        className={`inline-flex items-center gap-2 mt-1 px-3 py-1 rounded-full text-xs font-medium ${readinessPill(
                          readiness
                        )}`}
                      >
                        <Sparkles className="w-4 h-4" /> AI Readiness: {readiness}
                      </span>
                    </div>
                  </div>

                  {/* KPI's */}
                  <div className="col-span-12 lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {kpis.map((k) => (
                      <div
                        key={k.label}
                        className="rounded-lg border border-slate-200 bg-white p-3"
                      >
                        <div className="flex items-center gap-2">
                          <k.icon className="w-4 h-4 text-slate-700" />
                          <span className="text-xs text-slate-600">{k.label}</span>
                        </div>
                        <div className={`mt-1 text-lg font-semibold ${k.tone}`}>
                          {k.value}
                        </div>
                      </div>
                    ))}
                  </div>

                 
                </div>
              </div>
            </div>
          </FullBleed>
        </div>

        {/* ===== Dashboard grid – full width ===== */}
        <FullBleed>
          <div className="px-6 py-6 mt-16">
            <div className="grid grid-cols-12 gap-6">
              {/* Left rail (8/12) */}
              <div className="col-span-12 xl:col-span-8 space-y-6">
                {(data.summary?.intro || data.summary?.current_state) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.summary?.intro && (
                      <Card className="border border-blue-200/60 bg-blue-50/60">
                        <CardHeader className="py-3">
                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-600" />
                            <CardTitle className="text-base">Over jouw organisatie</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 text-sm text-blue-900/90">
                          {data.summary.intro}
                        </CardContent>
                      </Card>
                    )}
                    {data.summary?.current_state && (
                      <Card className="border border-rose-200/60 bg-rose-50/60">
                        <CardHeader className="py-3">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-rose-600" />
                            <CardTitle className="text-base">Huidige situatie</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 text-sm text-rose-900/90">
                          {data.summary.current_state}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {/* Quick Wins */}
                {data.quick_wins_detailed && data.quick_wins_detailed.length > 0 ? (
                  <Card className="border border-emerald-200/60 bg-emerald-50/60">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        <CardTitle className="text-lg">Quick Wins voor jou</CardTitle>
                      </div>
                      <CardDescription>Hoogste impact eerst. Start met 1–2 pilots.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.quick_wins_detailed.map((win, idx) => (
                          <div key={idx} className="rounded-lg border border-white/60 bg-white/70 p-4">
                            <div className="flex items-start gap-3">
                              <span className="flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                                {idx + 1}
                              </span>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-800">{win.title}</div>
                                <p className="text-sm text-slate-700 mt-1">{win.why_it_matters}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <span className="px-2.5 py-1 rounded-full bg-white/80 text-slate-700 text-xs">
                                    Effort: {win.effort}
                                  </span>
                                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs">
                                    Impact: {win.impact}
                                  </span>
                                </div>
                                {win.suggested_tools?.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {win.suggested_tools.map((tool, t) => (
                                      <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">
                                        {tool}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : data.quick_wins && data.quick_wins.length > 0 ? (
                  <Card className="border border-emerald-200/60 bg-emerald-50/60">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        <CardTitle className="text-lg">Quick Wins voor jou</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.quick_wins.map((win, idx) => (
                          <li key={idx} className="rounded-lg border border-white/60 bg-white/70 p-3">
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                                {idx + 1}
                              </span>
                              <span className="text-slate-800 text-sm">{win}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ) : null}

                {/* Opportunities & Solutions */}
                {(data.opportunities?.length || data.solutions?.length) ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {data.opportunities && data.opportunities.length > 0 && (
                      <Card className="border border-violet-200/60 bg-violet-50/60">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-violet-700" />
                            <CardTitle className="text-lg">Kansen</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {data.opportunities.map((opp, idx) => (
                              <div key={idx} className="rounded-md border border-white/60 bg-white/70 p-3">
                                <span className="px-2 py-0.5 rounded bg-violet-100 text-violet-700 text-[10px] font-semibold">
                                  {opp.area}
                                </span>
                                <p className="text-sm text-slate-700 mt-1">{opp.text}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    {data.solutions && data.solutions.length > 0 && (
                      <Card className="border border-slate-200/60 bg-white/60">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-slate-700" />
                            <CardTitle className="text-lg">Oplossingen</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {data.solutions.map((sol, idx) => (
                              <div key={idx} className="rounded-md border border-white/60 bg-white/70 p-3">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-slate-700" />
                                  <div className="font-medium text-slate-800">{sol.title}</div>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">{sol.description}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : null}

                {/* Roadmap */}
                {data.roadmap && data.roadmap.length > 0 && (
                  <Card className="border border-slate-200/60 bg-white/60">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 text-slate-700" />
                        <CardTitle className="text-lg">
                          Roadmap ({data.roadmap.length} stappen)
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.roadmap.map((r) => (
                          <li
                            key={r.step}
                            className="flex gap-3 rounded-lg border border-white/60 bg-white/70 p-3"
                          >
                            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-900/80 text-white text-sm font-bold">
                              {r.step}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-slate-800">
                                {r.title}
                              </div>
                              <div className="text-[11px] text-slate-500 mb-0.5">
                                {r.duration_weeks} weken
                              </div>
                              <div className="text-sm text-slate-600">
                                {r.outcome}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                )}

                {/* Closing */}
                {data.summary?.closing && (
                  <Card className="border border-slate-200/60 bg-white/60">
                    <CardContent className="py-4">
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {data.summary.closing}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right rail (4/12) */}
              <div className="col-span-12 xl:col-span-4 space-y-6">
                {/* ROI */}
                <Card className="border border-blue-200/60 bg-blue-50/60">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-blue-700" />
                      <CardTitle className="text-lg">Wat levert dit op?</CardTitle>
                    </div>
                    <CardDescription>
                      Indicatieve berekening op basis van je score.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-slate-700 text-xs"># Medewerkers</Label>
                        <Input
                          type="number"
                          min={1}
                          value={employees}
                          onChange={(e) => setEmployees(Number(e.target.value || 0))}
                          className="bg-white/70 backdrop-blur border-white/40 h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-700 text-xs">Admin uren/week</Label>
                        <Input
                          type="number"
                          min={0}
                          value={hours}
                          onChange={(e) => setHours(Number(e.target.value || 0))}
                          className="bg-white/70 backdrop-blur border-white/40 h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-700 text-xs">Kost/uur (€)</Label>
                        <Input
                          type="number"
                          min={0}
                          value={rate}
                          onChange={(e) => setRate(Number(e.target.value || 0))}
                          className="bg-white/70 backdrop-blur border-white/40 h-9"
                        />
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3">
                      <div className="rounded-lg border border-white/50 bg-white/70 p-3">
                        <div className="text-xs text-slate-600">Geschatte tijdswinst</div>
                        <div className="text-xl font-semibold text-slate-800">
                          {savings.weeklyHoursSaved} uur/week
                        </div>
                      </div>
                      <div className="rounded-lg border border-white/50 bg-white/70 p-3">
                        <div className="text-xs text-slate-600">Geschatte waarde</div>
                        <div className="text-xl font-semibold text-slate-800">
                          € {savings.monthlyEuro.toLocaleString("nl-BE")}/maand
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Friction points */}
                {data.friction_points && data.friction_points.length > 0 && (
                  <Card className="border border-amber-200/60 bg-amber-50/60">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-amber-700" />
                        <CardTitle className="text-lg">Waar het wringt</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {data.friction_points.map((fp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span
                              className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                                fp.severity === "high"
                                  ? "bg-rose-500"
                                  : fp.severity === "medium"
                                  ? "bg-amber-500"
                                  : "bg-yellow-500"
                              }`}
                            />
                            <span className="text-slate-800 text-sm">{fp.text}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Metrics */}
                {data.metrics && data.metrics.length > 0 && (
                  <Card className="border border-blue-200/60 bg-blue-50/60">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-700" />
                        <CardTitle className="text-lg">KPIs om te volgen</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {data.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="rounded-md border border-white/60 bg-white/70 p-3"
                          >
                            <div className="font-medium text-slate-800">{m.kpi}</div>
                            <div className="text-xs text-slate-600">{m.definition}</div>
                            <div className="text-xs font-medium text-blue-700 mt-1">
                              Target: {m.target}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Stack */}
                {data.recommended_stack && (
                  <Card className="border border-slate-200/60 bg-white/60">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-slate-700" />
                        <CardTitle className="text-lg">Aanbevolen Tools</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(["automation", "ai_assistant", "bi", "crm", "storage"] as const).map(
                          (k) => {
                            const list = (data.recommended_stack as any)?.[k] as
                              | string[]
                              | undefined;
                            if (!list || list.length === 0) return null;
                            const badge =
                              k === "automation"
                                ? "bg-blue-100 text-blue-700"
                                : k === "ai_assistant"
                                ? "bg-purple-100 text-purple-700"
                                : k === "bi"
                                ? "bg-emerald-100 text-emerald-700"
                                : k === "crm"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-700";
                            const label =
                              k === "automation"
                                ? "Automatisering"
                                : k === "ai_assistant"
                                ? "AI Assistant"
                                : k === "bi"
                                ? "Business Intelligence"
                                : k === "crm"
                                ? "CRM"
                                : "Storage";
                            return (
                              <div key={k}>
                                <div className="text-sm font-semibold text-slate-700 mb-2">
                                  {label}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {list.map((tool, i) => (
                                    <span
                                      key={i}
                                      className={`px-3 py-1 rounded-full text-xs font-medium ${badge}`}
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTAs */}
                <Card className="relative overflow-hidden border-0 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse" />
                  <CardContent className="relative p-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-xl">
                        <Rocket className="w-9 h-9 text-blue-900" />
                      </div>
                      <div className="flex-1 text-white">
                        <div className="text-2xl font-bold mb-1">Klaar voor de Deep-Dive Scan?</div>
                        <div className="text-blue-100 mb-1">
                          Uitgebreid PDF-rapport met roadmap en ROI-berekening
                        </div>
                        <div className="text-yellow-300 font-semibold text-sm">
                          ✓ Concrete roadmap  ✓ ROI berekeningen  ✓ Prioriteiten
                        </div>
                      </div>
                      <Button
                        onClick={onRestart}
                        size="lg"
                        className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-6 h-11 rounded-xl shadow-xl"
                      >
                        Start
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </FullBleed>
      </section>
    </>
  );
}