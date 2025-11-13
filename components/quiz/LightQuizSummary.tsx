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

interface BackendSummaryData {
  quiz?: string;
  efficiency_score?: number; // 0-100
  ai_readiness?: string; // "Laag" | "Gemiddeld" | "Hoog"
  summary?: {
    intro?: string;
    current_state?: string;
    ai_potential?: string;
    closing?: string;
  };
  quick_wins?: string[];
  recommendation_tagline?: string;
  // optional extra input to refine KPI’s/ROI (all optional; safe fallbacks used)
  meta?: {
    sector?: string;
    employees?: number; // e.g. 25
    avg_hourly_cost?: number; // EUR
    admin_hours_per_week?: number; // per employee
  };
}

interface LightQuizSummaryProps {
  data: BackendSummaryData;
  onRestart: () => void;
}

// --------- helpers ---------
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

// simple donut using SVG
function ProgressRing({ value, size = 140 }: { value: number; size?: number }) {
  const radius = (size - 14) / 2; // 7px stroke
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

  // derived KPIs (safe defaults)
  const kpis = useMemo(() => {
    const efficiency = clamp(score);
    const timeWinPct = Math.round((efficiency / 100) * 30); // up to ~30% tijdswinst
    const coverage = Math.round(efficiency * 0.8); // indicatieve dekking

    let payback = "3–6 mnd";
    if (efficiency >= 75) payback = "1–3 mnd";
    else if (efficiency < 40) payback = ">6 mnd";

    return [
      { label: "Efficiency Potentieel", icon: TrendingUp, value: `${efficiency}/100`, tone: scoreTint(efficiency) },
      { label: "Verwachte tijdswinst", icon: Gauge, value: `${timeWinPct}%`, tone: "text-sky-700" },
      { label: "Automatisering dekking", icon: BarChart3, value: `${coverage}%`, tone: "text-violet-700" },
      { label: "Terugverdientijd", icon: Zap, value: payback, tone: "text-emerald-700" },
    ];
  }, [score]);

  // ROI micro-calculator state
  const [employees, setEmployees] = useState<number>(data.meta?.employees ?? 25);
  const [hours, setHours] = useState<number>(data.meta?.admin_hours_per_week ?? 6);
  const [rate, setRate] = useState<number>(data.meta?.avg_hourly_cost ?? 38);

  const savings = useMemo(() => {
    const timeWinPct = (clamp(score) / 100) * 0.3; // up to 30%
    const weeklyHoursSaved = employees * hours * timeWinPct;
    const monthlyHoursSaved = weeklyHoursSaved * 4.3; // avg weeks per month
    const monthlyEuro = monthlyHoursSaved * rate;
    return {
      weeklyHoursSaved: Math.round(weeklyHoursSaved),
      monthlyEuro: Math.round(monthlyEuro),
    };
  }, [employees, hours, rate, score]);

  return (
    <div className="space-y-6">
      <Card className="border border-white/30 bg-white/60 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Je Efficiency Scan Resultaat
          </CardTitle>
          <CardDescription className="text-base">Hier is een eerste indicatie van je automatisering en AI potentieel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          {/* KPI strip */}
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

          {/* Efficiency score ring + readiness */}
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

          {/* Situation (slightly negative, but constructive) */}
          {data.summary && (
            <div className="rounded-2xl border border-rose-200/60 bg-rose-50/70 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-semibold text-rose-800">Waar het vandaag wringt</h3>
              </div>
              <div className="space-y-3 text-rose-900/90">
                {data.summary.current_state ? (
                  <p className="leading-relaxed">{data.summary.current_state}</p>
                ) : (
                  <p className="leading-relaxed">
                    Er gebeurt nog veel manueel werk, systemen praten beperkt met elkaar en inzichten blijven verspreid.
                  </p>
                )}
                <ul className="list-disc ml-6 space-y-1">
                  <li>Dubbele invoer en kopieerwerk vertragen je doorlooptijd en verhogen foutkansen.</li>
                  <li>Data zit verspreid (mail, Excel, tools), waardoor rapportering traag en onvolledig is.</li>
                  <li>AI wordt ad-hoc gebruikt; zonder duidelijke processen levert het te weinig consistente winst op.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Solutions we offer */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-violet-600" />
              <h3 className="text-lg font-semibold text-slate-800">Oplossingen die snel resultaat geven</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Workflow & RPA",
                  icon: LinkIcon,
                  desc: "Koppel planning, facturatie en CRM. Elimineer dubbele invoer met betrouwbare automatiseringen.",
                },
                {
                  title: "AI Document verwerking",
                  icon: FileText,
                  desc: "Offertes, pakbonnen en e-mails automatisch uitlezen, labelen en doorsturen naar de juiste flow.",
                },
                {
                  title: "CRM/ERP centralisatie",
                  icon: BarChart3,
                  desc: "Één bron van waarheid voor klanten, projecten en facturen — met rollen en rechten.",
                },
                {
                  title: "BI Dashboards",
                  icon: Sparkles,
                  desc: "Realtime KPI’s in een helder dashboard: doorlooptijd, bezetting, omzet per project en meer.",
                },
                {
                  title: "AI Assistenten",
                  icon: Zap,
                  desc: "Veilige interne assistenten voor offertes, planning en support — getraind op je eigen data.",
                },
                {
                  title: "Integraties op maat",
                  icon: CheckCircle2,
                  desc: "Van legacy naar cloud: stabiele koppelingen met Odoo, Exact, HubSpot, Teams, SharePoint, …",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className="w-5 h-5 text-slate-700" />
                    <h4 className="font-semibold text-slate-800">{s.title}</h4>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wins (from backend) */}
          {data.quick_wins && data.quick_wins.length > 0 && (
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
          )}

          {/* ROI mini calculator */}
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
              Indicatieve berekening op basis van je score (max. ~30% tijdswinst). Exacte ROI volgt uit de Deep‑Dive Scan.
            </p>
          </div>

          {/* Roadmap */}
          <div className="rounded-2xl border border-slate-200 bg-white/60 backdrop-blur p-6">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="w-5 h-5 text-slate-700" />
              <h3 className="text-lg font-semibold text-slate-800">Aanpak in 4 stappen</h3>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  step: "1",
                  title: "Inventaris & KPI’s",
                  desc: "Processen, tools en data in kaart. We definiëren 3–5 KPI’s die er wél toe doen.",
                },
                {
                  step: "2",
                  title: "Pilot automations",
                  desc: "2–3 quick wins live binnen 2 weken. Meting: tijdswinst en foutreductie.",
                },
                {
                  step: "3",
                  title: "AI integraties",
                  desc: "Document- en e-mailflows, assistenten en koppelingen met CRM/ERP.",
                },
                {
                  step: "4",
                  title: "Opschalen & dashboard",
                  desc: "Roll-out, training en realtime BI. Duidelijke governance & support.",
                },
              ].map((r) => (
                <li key={r.step} className="flex gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-900/80 text-white font-bold shadow">
                    {r.step}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{r.title}</div>
                    <div className="text-slate-600 text-sm leading-relaxed">{r.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Recommendation / tagline */}
          {data.recommendation_tagline && (
            <div className="bg-gradient-to-r from-emerald-50/80 to-blue-50/80 border border-emerald-200 rounded-2xl p-5">
              <p className="text-slate-800 font-medium text-lg">💡 {data.recommendation_tagline}</p>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl bg-white/60 backdrop-blur p-6 text-center border border-white/40">
            <h4 className="text-lg font-semibold mb-2">Wil je meer weten?</h4>
            <p className="text-slate-600 mb-4">
              Doe de Deep‑Dive Scan voor een uitgebreid PDF‑rapport met concrete aanbevelingen en een roadmap.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={onRestart} variant="outline" size="lg">
                Terug naar start
              </Button>
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
  );
}
