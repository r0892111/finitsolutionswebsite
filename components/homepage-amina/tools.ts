/**
 * De logo's onder "Werkt met wat je al gebruikt" (homepage, sectie 6).
 *
 * Alex, 25/11: alleen de logo's, zonder de naam ernaast, en meer software die
 * Belgische kmo's gebruiken. De naam staat nog in de alt-tekst (voor
 * schermlezers en als je met de muis op het logo blijft staan).
 *
 * `vorm` bepaalt de maat in de pil (zie .nh-logo in homepage.css):
 * - geen: een los symbool (Outlook, Slack);
 * - "breed": een woordmerk, het logo ís de naam (Exact, Odoo);
 * - "hoog": een woordmerk met een ondertitel of veel lucht rond het logo (Yuki, Mollie);
 * - "ruim": een logo met veel lucht in het bestand zelf (Slack, Odoo, Calendly).
 *
 * Volgorde: eerst de Belgische bedrijfssoftware en boekhouding, dan mail en
 * kantoor, CRM en planning, verkoop en betalen, en de rest.
 * De bestanden in /public/tools/ komen van de site van de maker zelf, van
 * Wikimedia Commons of van Simple Icons (25/11/2026).
 *
 * Alleen software met een API (Alex, 26/11). Op 26/11/2026 nagekeken in de
 * documentatie van de makers: alle 39 hebben er een. Bij een aantal is de
 * toegang niet vrij, dus eerst nakijken voor je het een klant belooft:
 * - Billit, Octopus, Silverfin: toegang voor een bureau moet je bij hen aanvragen.
 * - Exact Online: voor meerdere klanten een betaald ontwikkelaarsabonnement.
 * - Lightspeed: verschilt per product, vaak alleen voor partners.
 * - Odoo en Salesforce: alleen op de duurdere formules van de klant.
 * - WhatsApp: alleen het Business Platform, niet de gewone app.
 * - SAP: een hele familie producten, per product anders.
 * - Yuki heet in Nederland sinds 1/9/2026 "Nmbrs Accounting"; yuki.be toont nog Yuki.
 * Een nieuw logo toevoegen = eerst nakijken dat er een API is.
 */
export interface Tool {
  naam: string;
  src: string;
  vorm?: "breed" | "hoog" | "ruim";
}

export const TOOLS: Tool[] = [
  // Bedrijfssoftware en boekhouding
  { naam: "Teamleader", src: "/Teamleader_Icon.svg" },
  { naam: "Odoo", src: "/tool-odoo.svg", vorm: "ruim" },
  { naam: "Exact Online", src: "/tools/tool-exact.svg", vorm: "breed" },
  { naam: "Yuki", src: "/tools/tool-yuki.svg", vorm: "hoog" },
  { naam: "Billit", src: "/tools/tool-billit.svg", vorm: "hoog" },
  { naam: "Octopus", src: "/tools/tool-octopus.webp", vorm: "hoog" },
  { naam: "Silverfin", src: "/tools/tool-silverfin.svg", vorm: "hoog" },
  { naam: "Robaws", src: "/tools/tool-robaws.svg", vorm: "breed" },
  { naam: "SAP", src: "/tools/tool-sap.svg", vorm: "breed" },
  { naam: "QuickBooks", src: "/tools/tool-quickbooks.svg" },
  // Mail, agenda en kantoor
  { naam: "Outlook", src: "/Microsoft_Office_Outlook_(2018–2024).svg" },
  { naam: "Gmail", src: "/Gmail_icon_(2020).png" },
  { naam: "Excel", src: "/Microsoft_Office_Excel_(2019–2025).svg" },
  { naam: "Microsoft Teams", src: "/Microsoft_Office_Teams_(2019–2025).svg" },
  { naam: "SharePoint", src: "/tools/tool-sharepoint.svg" },
  { naam: "Google Calendar", src: "/tool-googlecalendar.svg" },
  { naam: "Google Drive", src: "/tool-googledrive.svg" },
  { naam: "WhatsApp", src: "/tool-whatsapp.svg" },
  { naam: "Slack", src: "/tools/tool-slack.svg", vorm: "ruim" },
  // CRM en planning
  { naam: "HubSpot", src: "/tool-hubspot.svg" },
  { naam: "Pipedrive", src: "/Pipedrive_id-7ejZnwv_0.svg" },
  { naam: "Salesforce", src: "/tools/tool-salesforce.svg", vorm: "ruim" },
  { naam: "Microsoft Dynamics 365", src: "/microsoft-dynamics-icon.svg" },
  { naam: "Zoho", src: "/ZOHO_logo_2023.svg.png", vorm: "hoog" },
  { naam: "monday.com", src: "/Monday_logo.svg", vorm: "breed" },
  { naam: "Asana", src: "/tools/tool-asana.svg" },
  { naam: "Trello", src: "/trello-tile.svg" },
  { naam: "Airtable", src: "/tools/tool-airtable.svg", vorm: "breed" },
  { naam: "Calendly", src: "/Calendly.svg", vorm: "ruim" },
  // Verkoop en betalen
  { naam: "Shopify", src: "/shopify_icon.png" },
  { naam: "WooCommerce", src: "/tool-woocommerce.svg", vorm: "ruim" },
  { naam: "Lightspeed", src: "/tools/tool-lightspeed.svg", vorm: "breed" },
  { naam: "Stripe", src: "/Stripe_Logo,_revised_2016.svg.webp", vorm: "breed" },
  { naam: "Mollie", src: "/tools/tool-mollie.svg", vorm: "hoog" },
  { naam: "Mailchimp", src: "/tools/tool-mailchimp.svg" },
  // Documenten en koppelen
  { naam: "Notion", src: "/tool-notion.svg" },
  { naam: "Dropbox", src: "/dropbox_icon.png" },
  { naam: "DocuSign", src: "/docusign.svg", vorm: "breed" },
  { naam: "Zapier", src: "/tools/tool-zapier.svg" },
];
