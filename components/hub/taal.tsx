"use client";

/**
 * De teksten van de hub in de taal van de pagina (Alex 25/11): /hub/ is Nederlands,
 * /hub/en/ Engels. HubPagina zet de juiste teksten klaar; het formulier, het slot en de
 * resources lezen ze hier. Zonder provider (bv. op de promptpagina's) is het Nederlands.
 */

import { createContext, useContext } from "react";
import { HUB, type HubTekst } from "./copy";

export const HubTekstContext = createContext<HubTekst>(HUB);

export function useHub(): HubTekst {
  return useContext(HubTekstContext);
}
