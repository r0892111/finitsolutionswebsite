/**
 * De open vacatures en wie ervoor mag solliciteren.
 *
 * Gedeeld door de pagina /vacatures en de Netlify-functie die de sollicitatie
 * mailt (netlify/functions/sollicitatie-submit.ts), zodat beide dezelfde lijst
 * controleren. De tekst op de pagina staat in components/vacatures/copy.ts.
 * Geen imports met "@/": de Netlify-functie leest dit bestand ook.
 */

/** "Ik ben een…": in de volgorde waarin Alex ze noemde. */
export const PROFIELEN = {
  agency: "Agency",
  freelancer: "Freelancer",
  stagiair: "Stagiair",
  jobstudent: "Jobstudent",
} as const;

export type Profiel = keyof typeof PROFIELEN;

export interface Vacature {
  id: string;
  titel: string;
  /** Wie mag solliciteren. Het formulier toont alleen deze keuzes. */
  profielen: Profiel[];
}

export const VACATURES: Vacature[] = [
  { id: "content", titel: "Content en social media", profielen: ["agency", "freelancer", "stagiair", "jobstudent"] },
  { id: "projectmanagement", titel: "Stagiair IT-projectmanagement", profielen: ["stagiair", "jobstudent"] },
  { id: "software", titel: "Stagiair of jobstudent software development", profielen: ["stagiair", "jobstudent"] },
];

export function vindVacature(id: string): Vacature | undefined {
  return VACATURES.find((v) => v.id === id);
}

/** Aan stagiairs en jobstudenten vragen we ook de studierichting en het studiejaar. */
export function isStudent(profiel: string): boolean {
  return profiel === "stagiair" || profiel === "jobstudent";
}
