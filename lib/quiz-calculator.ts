export interface LightQuizSummary {
  efficiencyScore: number;
  aiReadiness: "Low" | "Medium" | "High";
  quickWins: string[];
}

export function calculateLightQuizSummary(answers: Record<string, any>): LightQuizSummary {
  let score = 0;
  const quickWins: string[] = [];

  // Calculate efficiency score based on answers

  // Admin hours contribution (high hours = more potential)
  if (answers.admin_hours === ">10") {
    score += 25;
    quickWins.push("Automatiseer repetitieve administratieve taken om 5-10 uur per week te besparen");
  } else if (answers.admin_hours === "5-10") {
    score += 15;
  } else {
    score += 5;
  }

  // Current automation (less automation = more potential)
  if (answers.current_automation === "no") {
    score += 25;
    if (!quickWins.some(w => w.includes("administratieve"))) {
      quickWins.push("Start met basis automatisering van email workflows en data invoer");
    }
  } else if (answers.current_automation === "few-tools") {
    score += 15;
  } else {
    score += 5;
  }

  // Data centralization (not central = more potential)
  if (answers.data_central === "no") {
    score += 20;
    quickWins.push("Centraliseer je data in één CRM of ERP systeem voor beter overzicht");
  } else if (answers.data_central === "partially") {
    score += 12;
  } else {
    score += 5;
  }

  // Investment readiness
  if (answers.investment_readiness === "very-open") {
    score += 15;
  } else if (answers.investment_readiness === "unsure") {
    score += 10;
  } else {
    score += 5;
  }

  // AI experience (less experience = more to gain)
  if (answers.ai_experience === "not-yet") {
    score += 15;
    if (quickWins.length < 3) {
      quickWins.push("Begin met AI chatbots voor klantenservice en interne kennisdeling");
    }
  } else if (answers.ai_experience === "a-bit") {
    score += 10;
  } else {
    score += 5;
  }

  // Ensure we have at least 3 quick wins
  if (quickWins.length < 3) {
    const defaultWins = [
      "Implementeer geautomatiseerde rapportage voor real-time business inzichten",
      "Gebruik AI voor snellere analyse van klantdata en voorspellingen",
      "Automatiseer facturatie en betalingsherinneringen",
      "Zet een digitale assistant in voor planning en agenda beheer",
    ];

    for (const win of defaultWins) {
      if (quickWins.length >= 3) break;
      if (!quickWins.includes(win)) {
        quickWins.push(win);
      }
    }
  }

  // Cap score at 100
  score = Math.min(score, 100);

  // Determine AI readiness
  let aiReadiness: "Low" | "Medium" | "High";
  if (score >= 70) {
    aiReadiness = "High";
  } else if (score >= 40) {
    aiReadiness = "Medium";
  } else {
    aiReadiness = "Low";
  }

  return {
    efficiencyScore: score,
    aiReadiness,
    quickWins: quickWins.slice(0, 3),
  };
}
