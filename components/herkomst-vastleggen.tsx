"use client";

/**
 * Legt de herkomst van het bezoek vast zodra de eerste pagina laadt (lib/herkomst.ts), op elke
 * pagina van de site. Zo blijft de post of advertentie bekend, ook als de bezoeker eerst
 * rondklikt en pas later een formulier invult.
 *
 * Zet ze ook één keer in de dataLayer, als gewone variabelen voor Google Tag Manager (dat pas
 * na toestemming laadt; tot dan gaat er niets naar buiten).
 */
import { useEffect } from "react";
import { pushEvent } from "@/lib/analytics";
import { leesHerkomst } from "@/lib/herkomst";

export function HerkomstVastleggen() {
  useEffect(() => {
    const h = leesHerkomst();
    pushEvent("herkomst", {
      herkomst_bron: h.bron,
      herkomst_reel: h.reel,
      utm_source: h.utm_source,
      utm_medium: h.utm_medium,
      utm_campaign: h.utm_campaign,
      utm_content: h.utm_content,
    });
  }, []);
  return null;
}
