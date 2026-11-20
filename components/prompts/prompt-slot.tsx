"use client";

/**
 * De prompts op een promptpagina (/prompts/…) achter hetzelfde e-mailslot als
 * de hub (beslissing Alex, 20/11/2026). Wie het slot al opende (op de hub of op
 * een andere promptpagina), ziet de prompts meteen. Wie via een rechtstreekse
 * link binnenkomt, ziet eerst het slot; na een geldig adres staan de prompts
 * van deze pagina meteen open, zonder ergens anders heen te moeten.
 *
 * Een zacht slot: de site is statisch, dus wie de broncode leest, vindt de
 * tekst. Het gaat erom dat wie de prompts wil, één keer zijn adres achterlaat.
 */

import { useEffect, useState } from "react";
import { SlotFormulier } from "@/components/hub/slot-formulier";
import { HUB } from "@/components/hub/copy";
import { bijBezoek, heeftToegang } from "@/lib/hub-toegang";

function schoon(v: string | null, max: number): string {
  return (v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max);
}

export function PromptSlot({ reel, children }: { reel: string; children: React.ReactNode }) {
  // null = nog niet gekeken: dan niets tonen, zodat er niets flitst.
  const [open, setOpen] = useState<boolean | null>(null);
  const [bron, setBron] = useState("prompts");

  useEffect(() => {
    const toegang = heeftToegang();
    setOpen(toegang);
    if (toegang) void bijBezoek();
    setBron(schoon(new URLSearchParams(window.location.search).get("bron"), 40) || "prompts");
  }, []);

  if (open === null) return <div className="min-h-[24rem]" aria-hidden="true" />;
  if (open) return <>{children}</>;

  return (
    <SlotFormulier
      titel={HUB.slot.titelPrompt}
      tekst={HUB.slot.tekstPrompt}
      bron={bron}
      reel={reel.toUpperCase()}
      meta={{ bron, reel: reel.toUpperCase(), plek: "promptpagina" }}
      onOpen={() => setOpen(true)}
      className="mb-12"
    />
  );
}
