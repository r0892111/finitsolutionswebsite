# Lettertypes van de site

De vier lettertypes staan hier als bestand, zodat een build ze niet meer bij Google hoeft op te halen. Tot 26/11/2026 deed `next/font/google` dat bij elke build, en als Google even niet antwoordde, mislukte de hele build ("An error occurred in `next/font`").

| Bestand | Lettertype | Gewichten | Gebruikt voor |
|---|---|---|---|
| `inter-latin.woff2` | Inter (variabel) | 100 tot 900 | de oudere pagina's (`inter`, `--font-general-sans`) |
| `montserrat-700-latin.woff2` | Montserrat | 700 | koppen op oudere pagina's (`--font-montserrat`) |
| `bricolage-grotesque-latin.woff2` | Bricolage Grotesque (variabel, met optische maat) | 200 tot 800 | koppen in de huisstijl (`--font-bricolage`) |
| `schibsted-grotesk-latin.woff2` | Schibsted Grotesk (variabel) | 400 tot 900 | lopende tekst en knoppen (`--font-schibsted`) |

Het zijn dezelfde bestanden die Google Fonts uitlevert voor de tekenset "latin" (opgehaald op 26/11/2026 van fonts.gstatic.com). Die set dekt alle tekens die de site gebruikt, ook de Franse en Duitse accenten. Ze worden geladen in `lib/fonts.ts` en `app/layout.tsx` met `next/font/local`.

Een nieuw lettertype of een extra tekenset toevoegen: het woff2-bestand hier zetten en het in `lib/fonts.ts` aanmelden. Niet terug naar `next/font/google`.

Licentie: alle vier vallen onder de SIL Open Font License 1.1 (https://openfontlicense.org), die zelf hosten toestaat. Makers: Inter (Rasmus Andersson), Montserrat (Julieta Ulanovsky e.a.), Bricolage Grotesque (Mathieu Triay), Schibsted Grotesk (Bakken & Bæck voor Schibsted).
