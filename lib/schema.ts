import * as z from "zod";

export const projectRequestSchema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  company: z.string().optional(),
  phone: z.string().optional()
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  subject: z.string().min(2, "Onderwerp is verplicht"),
  message: z.string().min(10, "Bericht is verplicht (minimaal 10 karakters)")
});

export type ProjectRequestForm = z.infer<typeof projectRequestSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;