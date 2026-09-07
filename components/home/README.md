# Homepage (rework 2026-09)

Vier bestanden, één idee: **de pagina beantwoordt de vragen van een niet-technische zaakvoerder, in de volgorde waarin hij ze zich stelt.**

| Bestand | Wat |
|---|---|
| `copy.ts` | Alle tekst, als data. Copy aanpassen = alleen dit bestand. |
| `home-page.tsx` | De pagina: navigatie, zeven secties, footer. Geen scroll-animaties. |
| `brein-pagina.tsx` | Het beeld in de hero: één pagina uit een AI-brein plus wat de AI ermee doet. |
| `gesprek-form.tsx` | "Vraag een gesprek aan" (popup). Stuurt naar de n8n-flow met dezelfde veldnamen als vroeger (`naam`, `telefoonnummer`, `email`). |

Links en contactgegevens staan in `lib/finit-links.ts`. **`SKOOL_URL` moet nog ingevuld worden:** de knop "Start de lesreeks" gaat rechtstreeks naar Skool, niet naar een formulier.

## De volgorde (en de vraag die elke sectie beantwoordt)

1. **Hero** — "Wat is dit, is dit voor mij?" Herkenning (ChatGPT kent je zaak niet) + wat wij doen (wij leren je een AI opzetten die dat wel doet). Geen prijs in de hero; wel de belofte dat alle prijzen op de pagina staan.
2. **Zo leert een AI jouw zaak kennen** — "Waarom lukt dat niet met ChatGPT, en wat is een brein dan?"
3. **Wat wij daarna voor je bouwen** — "En wat heb ik daaraan?" Nu/straks-voorbeelden, uitdrukkelijk als resultaat van stap 2.
4. **Hoe het werkt** — "Hoe gaat dat concreet en wat kost het?" Drie stappen met de prijs bovenaan, en waarom de klant eerst zelf bouwt (dat is de reden dat stap 1 goedkoop is en stap 2 een vaste prijs heeft).
5. **Drie mensen, in Leuven** — "Wie zijn jullie?" Echte foto's, concrete eerdere resultaten.
6. **Vragen** — de "ja maar"-vragen, ingeklapt.
7. **Slot** — één keer navy, twee uitgangen: lesreeks (Skool) of gesprek (formulier).

## Regels voor de copy

- Elke zin moet door iemand zonder IT-kennis in één keer begrepen worden. Jargon meteen in gewone woorden uitleggen.
- Het heet een **lesreeks** (geen cursus) en een **AI-brein**. Het programma heet Claude en wordt bij de eerste vermelding uitgelegd.
- Stap 1 levert een AI die je zaak kent plus een lijst met knelpunten. Alles wat "vanzelf vertrekt" is stap 2. Hou die twee uit elkaar.
- Geen gedachtestreepjes, geen emoji, geen "niet X, maar Y", geen drieslagen als reflex, geen oneliners voor het effect, geen "echt/gewoon/eigenlijk".
- Prijzen altijd excl. btw, en de Claude-abonnementskost altijd erbij vermeld.

## Opmaak

Warm papier (`#FDFBF7`), marineblauw (`#1A2D63`) voor koppen en knoppen, één lettertype (Schibsted Grotesk via `next/font`), hairlines als scheiding. Knoppen volgen het Finit-designsysteem (vlakke vulling + glazen rand, `app/globals.css` onder "Homepage 2026-09"). Bewust weggelaten: gradients, gloed, glas-effecten, iconen-tegels, badges, scroll-animaties, chatbot-mockups.
