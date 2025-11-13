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
  FileText,
  Link as LinkIcon,
  Gauge,
  Calculator,
  ArrowRight,
  Rocket,
  ChevronRight,
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
  friction_points?: Array<{
    text: string;
    severity: string;
  }>;
  opportunities?: Array<{
    area: string;
    text: string;
  }>;
  quick_wins?: string[];
  quick_wins_detailed?: Array<{
    title: string;
    why_it_matters: string;
    effort: string;
    impact: string;
    suggested_tools: string[];
  }>;
  solutions?: Array<{
    title: string;
    description: string;
  }>;
  roadmap?: Array<{
    step: number;
    title: string;
    duration_weeks: number;
    outcome: string;
  }>;
  recommended_stack?: {
    automation?: string[];
    ai_assistant?: string[];
    bi?: string[];
    crm?: string[];
    storage?: string[];
  };
  metrics?: Array<{
    kpi: string;
    definition: string;
    target: string;
  }>;
  cta?: {
    tagline: string;
    next_best_action: string;
  };
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

const readinessPill = (readiness?: string) => {
  if (!readiness) return "text-gray-700 bg-gray-100";
  const r = readiness.toLowerCase();
  if (r.includes("hoog") || r.includes("high")) return "text-green-700 bg-green-100";
  if (r.includes("gemiddeld") || r.includes("medium")) return "text-amber-700 bg-amber-100";
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

function ProgressRing({ value, size = 140 }: { value: number; size?: number }) {
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
        className="fill-gray-800 text-2xl font-semibold"
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
    const timeWinPct = data.kpis?.time_saving_pct_estimate ?? Math.round((efficiency / 100) * 30);
    const coverage = data.kpis?.automation_coverage_estimate ?? Math.round(efficiency * 0.8);
    const payback = data.kpis?.payback_range_months ?? (efficiency >= 75 ? "1–3 mnd" : efficiency < 40 ? ">6 mnd" : "3–6 mnd");

    return [
      { label: "Efficiency Potentieel", icon: TrendingUp, value: `${efficiency}/100`, tone: scoreTint(efficiency) },
      { label: "Verwachte tijdswinst", icon: Gauge, value: `${timeWinPct}%`, tone: "text-sky-700" },
      { label: "Automatisering dekking", icon: BarChart3, value: `${coverage}%`, tone: "text-violet-700" },
      { label: "Terugverdientijd", icon: Zap, value: payback, tone: "text-emerald-700" },
    ];
  }, [score, data.kpis]);

  const [employees, setEmployees] = useState<number>(data.meta?.employees ?? 25);
  const [hours, setHours] = useState<number>(data.meta?.admin_hours_per_week ?? 6);
  const [rate, setRate] = useState<number>(data.meta?.avg_hourly_cost ?? 38);

  const savings = useMemo(() => {
    const timeWinPct = (clamp(score) / 100) * 0.3;
    const weeklyHoursSaved = employees * hours * timeWinPct;
    const monthlyHoursSaved = weeklyHoursSaved * 4.3;
    const monthlyEuro = monthlyHoursSaved * rate;
    return {
      weeklyHoursSaved: Math.round(weeklyHoursSaved),
      monthlyEuro: Math.round(monthlyEuro),
    };
  }, [employees, hours, rate, score]);

  return (
    <>
      <FinitChatbot autoOpen={true} />
      <section
        id="scan-result"
        aria-labelledby="scan-title"
        className="pt-[var(--nav-h,72px)] scroll-mt-[var(--nav-h,72px)]"
      >
        <div className="space-y-6">
        <Card className="border border-white/30 bg-white/60 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle id="scan-title" className="text-3xl mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Je Efficiency Scan Resultaat
            </CardTitle>
            <CardDescription className="text-base">
              Hier is een eerste indicatie van je automatisering en AI potentieel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="relative rounded-xl border border-white/40 bg-white/50 backdrop-blur-md p-4 shadow-lg overflow-hidden"
                >
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="flex items-center gap-3">
                    <k.icon className="w-5 h-5 text-slate-700" />
                    <span className="text-sm text-slate-600">{k.label}</span>
                  </div>
                  <div className={`mt-2 text-2xl font-semibold ${k.tone}`}>{k.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex items-center justify-center p-6 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md">
                <ProgressRing value={clamp(score)} />
              </div>
              <div className="text-center md:text-left space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-800">Efficiency Potentieel</h3>
                </div>
                <p className="text-slate-600">{scoreCopy(score)}</p>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${readinessPill(readiness)}`}>
                    <Sparkles className="w-4 h-4" /> AI Readiness: {readiness}
                  </span>
                </div>
              </div>
            </div>

            {data.summary?.intro && (
              <div className="rounded-2xl border border-blue-200/60 bg-blue-50/70 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800">Over jouw organisatie</h3>
                </div>
                <p className="text-blue-900/90 leading-relaxed">{data.summary.intro}</p>
              </div>
            )}

            {data.summary?.current_state && (
              <div className="rounded-2xl border border-rose-200/60 bg-rose-50/70 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <h3 className="text-lg font-semibold text-rose-800">Huidige situatie</h3>
                </div>
                <p className="text-rose-900/90 leading-relaxed">{data.summary.current_state}</p>
              </div>
            )}

            {data.friction_points && data.friction_points.length > 0 && (
              <div className="rounded-2xl border border-amber-200/60 bg-amber-50/70 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-amber-800">Waar het vandaag wringt</h3>
                </div>
                <ul className="space-y-2">
                  {data.friction_points.map((fp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                        fp.severity === 'high' ? 'bg-rose-500' :
                        fp.severity === 'medium' ? 'bg-amber-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-amber-900/90 leading-relaxed">{fp.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.summary?.ai_potential && (
              <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/70 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-emerald-800">AI Potentieel</h3>
                </div>
                <p className="text-emerald-900/90 leading-relaxed">{data.summary.ai_potential}</p>
              </div>
            )}

            {data.opportunities && data.opportunities.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Kansen voor jouw organisatie</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.opportunities.map((opp, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded-md bg-violet-100 text-violet-700 text-xs font-semibold">
                          {opp.area}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{opp.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.solutions && data.solutions.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-violet-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Oplossingen die snel resultaat geven</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.solutions.map((sol, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-slate-700" />
                        <h4 className="font-semibold text-slate-800">{sol.title}</h4>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{sol.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.quick_wins_detailed && data.quick_wins_detailed.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Quick Wins voor jou</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {data.quick_wins_detailed.map((win, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-emerald-200/60 bg-emerald-50/70 p-5 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">
                          {idx + 1}
                        </span>
                        <div className="flex-1 space-y-3">
                          <h4 className="text-lg font-semibold text-slate-800">{win.title}</h4>
                          <p className="text-slate-700 leading-relaxed">{win.why_it_matters}</p>
                          <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 rounded-full bg-white/60 text-slate-700 text-xs font-medium">
                              Effort: {win.effort}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                              Impact: {win.impact}
                            </span>
                          </div>
                          {win.suggested_tools.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs text-slate-600">Tools:</span>
                              {win.suggested_tools.map((tool, toolIdx) => (
                                <span key={toolIdx} className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs">
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
              </div>
            ) : data.quick_wins && data.quick_wins.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Quick Wins voor jou</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.quick_wins.map((win, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg border border-emerald-200/60 bg-emerald-50/70"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-slate-800">{win}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl border border-blue-200/60 bg-blue-50/70 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-blue-700" />
                <h3 className="text-lg font-semibold text-slate-800">Wat levert dit op?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-slate-700"># Medewerkers</Label>
                  <Input
                    type="number"
                    min={1}
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value || 0))}
                    className="bg-white/70 backdrop-blur border-white/40"
                  />
                </div>
                <div>
                  <Label className="text-slate-700">Admin uren p/week (per medewerker)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value || 0))}
                    className="bg-white/70 backdrop-blur border-white/40"
                  />
                </div>
                <div>
                  <Label className="text-slate-700">Kost per uur (€)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value || 0))}
                    className="bg-white/70 backdrop-blur border-white/40"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/50 bg-white/60 backdrop-blur p-4">
                  <div className="text-sm text-slate-600">Geschatte tijdswinst</div>
                  <div className="text-2xl font-semibold text-slate-800">{savings.weeklyHoursSaved} uur/week</div>
                </div>
                <div className="rounded-xl border border-white/50 bg-white/60 backdrop-blur p-4">
                  <div className="text-sm text-slate-600">Geschatte waarde</div>
                  <div className="text-2xl font-semibold text-slate-800">€ {savings.monthlyEuro.toLocaleString("nl-BE")}/maand</div>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Indicatieve berekening op basis van je score (max. ~30% tijdswinst). Exacte ROI volgt uit de Deep-Dive Scan.
              </p>
            </div>

            {data.roadmap && data.roadmap.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white/60 backdrop-blur p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowRight className="w-5 h-5 text-slate-700" />
                  <h3 className="text-lg font-semibold text-slate-800">Aanpak in {data.roadmap.length} stappen</h3>
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.roadmap.map((r) => (
                    <li key={r.step} className="flex gap-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-900/80 text-white font-bold shadow flex-shrink-0">
                        {r.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{r.title}</div>
                        <div className="text-xs text-slate-500 mb-1">{r.duration_weeks} weken</div>
                        <div className="text-slate-600 text-sm leading-relaxed">{r.outcome}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {data.metrics && data.metrics.length > 0 && (
              <div className="rounded-2xl border border-blue-200/60 bg-blue-50/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-800">KPIs om te volgen</h3>
                </div>
                <div className="space-y-3">
                  {data.metrics.map((metric, idx) => (
                    <div key={idx} className="rounded-lg border border-white/40 bg-white/60 p-4">
                      <div className="font-semibold text-slate-800 mb-1">{metric.kpi}</div>
                      <div className="text-sm text-slate-600 mb-2">{metric.definition}</div>
                      <div className="text-sm font-medium text-blue-700">Target: {metric.target}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.recommended_stack && (
              <div className="rounded-2xl border border-slate-200 bg-white/60 backdrop-blur p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-5 h-5 text-slate-700" />
                  <h3 className="text-lg font-semibold text-slate-800">Aanbevolen Tools</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.recommended_stack.automation && data.recommended_stack.automation.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">Automatisering</div>
                      <div className="flex flex-wrap gap-2">
                        {data.recommended_stack.automation.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.recommended_stack.ai_assistant && data.recommended_stack.ai_assistant.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">AI Assistant</div>
                      <div className="flex flex-wrap gap-2">
                        {data.recommended_stack.ai_assistant.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.recommended_stack.bi && data.recommended_stack.bi.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">Business Intelligence</div>
                      <div className="flex flex-wrap gap-2">
                        {data.recommended_stack.bi.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.recommended_stack.crm && data.recommended_stack.crm.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">CRM</div>
                      <div className="flex flex-wrap gap-2">
                        {data.recommended_stack.crm.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.recommended_stack.storage && data.recommended_stack.storage.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">Storage</div>
                      <div className="flex flex-wrap gap-2">
                        {data.recommended_stack.storage.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {data.cta?.tagline && (
              <div className="bg-gradient-to-r from-emerald-50/80 to-blue-50/80 border border-emerald-200 rounded-2xl p-5">
                <p className="text-slate-800 font-medium text-lg">💡 {data.cta.tagline}</p>
                {data.cta.next_best_action && (
                  <p className="text-slate-600 mt-2">{data.cta.next_best_action}</p>
                )}
              </div>
            )}

            {data.summary?.closing && (
              <div className="rounded-2xl border border-slate-200 bg-white/60 backdrop-blur p-6">
                <p className="text-slate-700 leading-relaxed">{data.summary.closing}</p>
              </div>
            )}

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-1 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse" />
              <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center shadow-xl animate-bounce">
                      <Rocket className="w-10 h-10 text-blue-900" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Klaar voor de Deep-Dive Scan?
                    </h3>
                    <p className="text-blue-100 text-lg mb-1">
                      Ontdek je volledige automatiseringspotentieel met een uitgebreid PDF-rapport
                    </p>
                    <p className="text-yellow-300 font-semibold text-base">
                      ✓ Concrete roadmap  ✓ ROI berekeningen  ✓ Prioriteiten overzicht
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      onClick={onRestart}
                      size="lg"
                      className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-lg px-8 py-6 h-auto rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                    >
                      Start Deep-Dive Scan
                      <ChevronRight className="w-6 h-6 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/60 backdrop-blur p-6 text-center border border-white/40">
              <h4 className="text-lg font-semibold mb-2">Liever persoonlijk contact?</h4>
              <p className="text-slate-600 mb-4">
                Neem contact op voor een vrijblijvend gesprek over je automatiseringskansen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => (window.location.href = "/#contact")}
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
    </section>
    </>
  );
}
