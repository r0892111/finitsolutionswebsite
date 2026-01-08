/* eslint-disable react/no-unescaped-entities */
"use client";


import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="pt-20">
      <section className="relative py-16 md:py-24 bg-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
            >
              <span>Privacyverklaring</span> <ChevronRight className="h-4 w-4 ml-1" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-2"
            >
              Privacyverklaring 
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-muted-foreground mb-8"
            >
              Versie: <strong>18/08/2025</strong> — Website:{" "}
              <a href="https://finitsolutions.be/" target="_blank" rel="noopener noreferrer" className="underline">
                https://finitsolutions.be/
              </a>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {/* 1. Inleiding */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="inleiding">1. Inleiding</h2>
              <p>
                Bedankt voor uw bezoek aan onze website! De bescherming van uw privacy en persoonsgegevens is voor ons
                van het grootste belang. Wij stellen alles in het werk om uw privacy te beschermen en ervoor te zorgen dat
                u uw persoonsgegevens veilig aan ons kunt toevertrouwen. Zo trachten wij om steeds op een veilige en
                discrete manier om te gaan met uw persoonsgegevens en werden passende beveiligingsmaatregelen genomen om
                verlies, wijziging, toegang door onbevoegden en/of enige andere onrechtmatige verwerking van uw
                persoonsgegevens te voorkomen.
              </p>
              <p>
                Deze privacyverklaring heeft betrekking op de verwerking van persoonsgegevens door ons via onze website:{" "}
                <a href="https://finitsolutions.be/" target="_blank" rel="noopener noreferrer" className="underline">
                  https://finitsolutions.be/
                </a>. Wij willen transparant zijn over hoe wij uw persoonsgegevens verwerken en wat wij met uw
                persoonsgegevens doen. Meer informatie daarover leest u in deze privacyverklaring.
              </p>

              {/* 2. Wie zijn wij */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="wie-zijn-wij">2. Wie zijn wij?</h2>
              <p>
                <strong>FINIT SOLUTIONS</strong>, gevestigd te Guldensporenlaan 9, 3120 Tremelo en ingeschreven in de
                Kruispuntbank van Ondernemingen onder het nummer <strong>1020.600.643</strong> (RPR Leuven)
                (hierna "Finit Solutions", "wij\" of "we").
              </p>
              <p>U kan ons contacteren via de volgende contactgegevens:</p>
              <ul>
                <li>
                  E-mail:{" "}
                  <a href="mailto:contact@finitsolutions.be" className="underline">
                    contact@finitsolutions.be
                  </a>
                </li>
                <li>Telefoon: +32 (0)495 702 314</li>
                <li>Telefoon: +32 (0)468 029 945</li>
              </ul>
              <p>
                Wij trachten uw persoonsgegevens steeds te verwerken conform de geldende wettelijke bepalingen voor de
                bescherming van persoonsgegevens, waaronder de Verordening (EU) 2016/679 van 27 april 2016 betreffende de
                bescherming van natuurlijke personen in verband met de verwerking van persoonsgegevens en betreffende het
                vrije verkeer van die gegevens en tot intrekking van Richtlijn 95/46/EG (hierna, de "AVG"), en de
                toepasselijke nationale uitvoeringswetgeving.
              </p>

              {/* 3. Begrippen */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="begrippen">3. Enkele begrippen toegelicht</h2>
              <p>
                Voor de toepassing van deze privacyverklaring wordt onder <strong>"persoonsgegevens"</strong> verstaan:
                alle informatie over een geïdentificeerde of identificeerbare natuurlijke persoon ("de betrokkene"). Als
                identificeerbaar wordt beschouwd een natuurlijke persoon die direct of indirect kan worden geïdentificeerd,
                met name aan de hand van een identificator zoals een naam, identificatienummer, locatiegegevens, een
                online identificator of van één of meerdere elementen die kenmerkend zijn voor de fysieke, fysiologische,
                genetische, psychische, economische, culturele of sociale identiteit van die natuurlijke persoon. Het gaat
                met andere woorden om alle informatie op basis waarvan een persoon kan worden geïdentificeerd. Daartoe
                behoren bijvoorbeeld uw naam, voornaam, geboortedatum, telefoonnummer en e-mailadres, maar ook uw
                IP-adres.
              </p>
              <p>
                Het begrip <strong>"verwerken"</strong> is heel ruim en dekt onder andere het verzamelen, vastleggen,
                ordenen, bewaren, actualiseren, wijzigen, opvragen, raadplegen, gebruiken, verspreiden, combineren,
                archiveren en wissen van gegevens.
              </p>

              {/* 4. Verwerkingsverantwoordelijke */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="verantwoordelijke">
                4. Verantwoordelijke voor de verwerking van uw persoonsgegevens ("verwerkingsverantwoordelijke")
              </h2>
              <p>
                Finit Solutions is verantwoordelijk voor het verwerken van uw persoonsgegevens. Wij zijn, zoals de AVG het
                noemt, de "verwerkingsverantwoordelijke" van uw persoonsgegevens. Dit betekent concreet dat Finit
                Solutions, eventueel samen met anderen, het doel en de middelen voor de verwerking van uw
                persoonsgegevens vaststelt.
              </p>

              {/* 5. Welke persoonsgegevens / waarom / rechtsgrond / bewaartermijn */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="categorieen-en-doeleinden">
                5. Welke persoonsgegevens verwerken wij, waarom en op basis van welke rechtsgrond?
              </h2>
              <p>In onderstaande tabel leest u:</p>
              <ul>
                <li>kolom 1:  welke categorieën van persoonsgegevens wij verwerken (de ‘Categorieën van persoonsgegevens’);</li>
                <li>kolom 2: waarom wij dit doen (de ‘Doeleinden’);</li>
                <li>kolom 3: op welke rechtsgrond de verwerkingsactiviteit gebaseerd is (de ‘Rechtsgrond’); en</li>
                <li>kolom 4: hoe lang we uw persoonsgegevens verwerken (de ‘Bewaartermijn’).</li>
              </ul>
              <p>
                Elke verwerkingsactiviteit gebeurt voor één of meerdere specifieke doeleinden. Daarnaast is er steeds een
                aantoonbare rechtsgrond voor elke verwerking. De toepasselijke rechtsgrond, die u terugvindt in de derde kolom ‘rechtsgrond’, heeft de volgende betekenis:
              </p>
              <ul>
                <li><strong>Toestemming</strong>: u heeft toestemming gegeven voor de verwerking van persoonsgegevens voor één of meer specifieke doeleinden;</li>
                <li>
                  <strong>Gerechtvaardigd belang</strong>: de verwerking is noodzakelijk voor de behartiging van onze gerechtvaardigde belangen of die van een derde, behalve wanneer uw belangen of grondrechten en fundamentele vrijheden die tot bescherming van persoonsgegevens nopen, zwaarder wegen dan die belangen;
                </li>
                <li>
                  <strong>Overeenkomst</strong>: de verwerking is noodzakelijk voor de uitvoering van een overeenkomst waarbij u partij bent, of om op uw verzoek voor de sluiting van een overeenkomst maatregelen te treffen;
                </li>
                <li>
                  <strong>Wettelijke verplichting</strong>: de verwerking is noodzakelijk om te voldoen aan een wettelijke verplichting die op ons, als verwerkingsverantwoordelijke, rust.
                </li>
              </ul>

              <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm border border-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">Categorieën van persoonsgegevens</th>
                      <th className="p-3 text-left">Doeleinden</th>
                      <th className="p-3 text-left">Rechtsgrond</th>
                      <th className="p-3 text-left">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 align-top">
                        (Elektronische) identificatiegegevens; Toestelgegevens
                      </td>
                      <td className="p-3 align-top">
                        Om u toegang te verschaffen tot onze website.
                      </td>
                      <td className="p-3 align-top">
                        Toestemming voor andere dan essentiële cookies;
 
Gerechtvaardigd belang van Finit Solutions om zich met een vlot functionerende website te profileren en het in het belang van de uzelf om er op een vlotte manier gebruik van te kunnen maken

                      </td>
                      <td className="p-3 align-top">
                        Tot het einde van uw bezoek aan onze website of tot de desbetreffende cookie automatisch wordt
                        gewist.
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">
                        Identificatie- en contactgegevens; Inhoud van uw bericht/oproep; Gegevens m.b.t. tewerkstelling
                      </td>
                      <td className="p-3 align-top">
                        Om op uw vraag of bericht te kunnen antwoorden dat u ons toezendt via het contactformulier op de
                        website, of via e-mail, WhatsApp of telefoon.
                      </td>
                      <td className="p-3 align-top">Toestemming.</td>
                      <td className="p-3 align-top">Voor de duur van behandeling van uw vraag of bericht.</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">
                        Identificatie- en contactgegevens; Inhoud van uw bericht
                      </td>
                      <td className="p-3 align-top">
                        Om u toe te laten om ons te contacteren met het oog op de opstart van een oplossing op maat.
                      </td>
                      <td className="p-3 align-top">Overeenkomst.</td>
                      <td className="p-3 align-top">
                        Voor de duur van behandeling van uw vraag of bericht en onze daaropvolgende samenwerking.
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">
                        Identificatiegegevens; Voorzijde identiteitskaart (met uitzondering van rijksregisternummer en foto)
                      </td>
                      <td className="p-3 align-top">
                        Om uw verzoek tot uitoefening van uw rechten te behandelen.
                      </td>
                      <td className="p-3 align-top">
                        Wettelijke verplichting (artikel 12, 2) AVG).
                      </td>
                      <td className="p-3 align-top">
                        Zolang als nodig om uw verzoek te behandelen (in geval van een gerechtelijke procedure: tot
                        beëindiging daarvan).
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">
                        Identificatiegegevens; Andere informatie over u die nodig is om onze rechten te verdedigen
                      </td>
                      <td className="p-3 align-top">Om onze rechten te verdedigen.</td>
                      <td className="p-3 align-top">Gerechtvaardigd belang (verdediging in rechte).</td>
                      <td className="p-3 align-top">
                        Tot het einde van de verjaringstermijn die van toepassing is op het desbetreffende geschil en in
                        ieder geval tot 10 jaar na de desbetreffende gebeurtenis.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 6. Minderjarigen */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="minderjarigen">6. Minderjarigen</h2>
              <p>
                Wij beogen geen persoonsgegevens te verzamelen van personen jonger dan 16 jaar. Deze minderjarigen mogen
                geen persoonsgegevens of een toestemmingsverklaring aan ons verstrekken zonder toestemming van de persoon
                die het ouderlijk gezag heeft.
              </p>

              {/* 7. Cookies */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="cookies">7. Cookies</h2>
              <p>
                We gebruiken ook cookies, voornamelijk om onze website permanent te optimaliseren voor de gebruikers. Voor
                meer specifieke informatie over de cookies die we gebruiken, kunt u onze cookieverklaring raadplegen:{" "}
                <a href="/cookieverklaring" className="underline">Cookieverklaring</a>.
              </p>

              {/* 8. Uw privacyrechten */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="uw-privacyrechten">
                8. Uw privacyrechten
              </h2>
              <p>
                Om u meer controle te geven over de verwerking van uw persoonsgegevens, beschikt u over heel wat rechten.
                Deze rechten zijn, onder andere, vastgelegd in artikelen 15-22 AVG. U beschikt over de volgende rechten:
              </p>
              <ul>
                <li>
                  <strong>Het recht op inzage in de persoonsgegevens die wij van u verwerken (artikel 15 AVG): </strong> u heeft het recht om op ieder ogenblik van ons te
                  vernemen of wij al dan niet uw persoonsgegevens verwerken. Als wij ze verwerken, dan heeft u het recht
                  om deze persoonsgegevens in te zien en bijkomende informatie te ontvangen over: de verwerkingsdoeleinden;
de betrokken categorieën van persoonsgegevens;
de ontvangers of categorieën van ontvangers (met name ontvangers in derde landen);
de bewaartermijn of, als dat niet mogelijk is, de criteria ter bepaling van die termijn;
het bestaan van uw privacy rechten;
het recht om een klacht in te dienen bij de toezichthoudende autoriteit;
de bron van de persoonsgegevens indien wij persoonsgegevens via een derde verkrijgen;
het bestaan van geautomatiseerde besluitvorming.
Als wij u geen toegang kunnen geven tot uw persoonsgegevens (bijvoorbeeld omwille van wettelijke verplichtingen), laten wij u weten waarom dat niet mogelijk is. 
Ook kan u een kosteloze kopie verkrijgen van de verwerkte persoonsgegevens in een begrijpelijke vorm. Let wel, wij kunnen een redelijke vergoeding vragen om onze administratieve kosten te dekken voor elke bijkomende kopie die u opvraagt.
                </li>
                <li>
                  <strong>Recht op gegevenswissing ('recht op vergetelheid') (art. 17 AVG):</strong> U kan ons in bepaalde gevallen vragen om uw persoonsgegevens te wissen. Houd er ook rekening mee dat uw recht op gegevenswissing niet absoluut is. Wij hebben het recht om uw persoonsgegevens te blijven bewaren wanneer dat nodig is voor, onder meer, de uitvoering van de overeenkomst, de naleving van een wettelijke verplichting of het instellen en uitoefenen of onderbouwen van een rechtsvordering. We zullen u daarover nader informeren in ons antwoord op uw verzoek.

                </li>
                <li>
                  <strong>Recht op verbetering en aanvulling (art. 16 AVG):</strong> Wanneer uw persoonsgegevens onjuist, verouderd of onvolledig zijn, kan u ons vragen om deze onjuistheden of onvolledigheden te laten verbeteren.
                </li>
                <li>
                  <strong>Recht op overdraagbaarheid van uw persoongsgegevens (art. 20 AVG):</strong> Ook heeft u het recht om, onder bepaalde voorwaarden, de persoonsgegevens die u aan ons heeft verstrekt voor de uitvoering van de overeenkomst of waarvoor u toestemming heeft gegeven, door ons te laten overdragen aan een andere verwerkingsverantwoordelijke. Voor zover het technisch mogelijk is, bezorgen wij uw persoonsgegevens rechtstreeks aan de nieuwe verwerkingsverantwoordelijke.
                </li>
                <li>
                  <strong>Recht op beperking van de verwerking (art. 18 AVG):</strong> Indien één van de volgende elementen van toepassing is, kan u ons verzoeken om de verwerking van uw persoonsgegevens te beperken:
u betwist de juistheid van die persoonsgegevens (in dit geval wordt het gebruik ervan beperkt gedurende een periode die ons in staat stelt om de juistheid van de persoonsgegevens te controleren);
de verwerking van uw persoonsgegevens is onrechtmatig;
wij hebben uw persoonsgegevens niet meer nodig voor de oorspronkelijke verwerkingsdoeleinden, maar u heeft ze nodig voor de instelling, uitoefening of onderbouwing van een rechtsvordering;
zolang er geen beslissing is genomen over de uitoefening van uw recht op bezwaar tegen de verwerking, kan u verzoeken om het gebruik van uw persoonsgegevens te beperken.

                </li>
                <li>
                  <strong>Recht van bezwaar (art. 21 AVG):</strong> U kan op grond van uw bijzondere situatie, bezwaar maken tegen de verwerking van uw persoonsgegevens, indien deze verwerking kadert in ons gerechtvaardigd belang of in de vervulling van een taak van algemeen belang. Wij staken in dat geval de verwerking van uw persoonsgegevens, tenzij we dwingende en legitieme gronden voor de verwerking kunnen aantonen die zwaarder wegen dan die van u, of wanneer de verwerking van de persoonsgegevens verband houdt met het instellen, uitoefenen of onderbouwen van een rechtsvordering.
                </li>
                <li>
                  <strong>Het recht om niet aan geautomatiseerde besluitvorming onderworpen te worden (artikel 22 AVG):</strong>{" "}
                  U heeft het recht om niet onderworpen te worden aan een besluit dat is genomen uitsluitend op basis van geautomatiseerde gegevensverwerking en die u aanzienlijk treft of juridische gevolgen heeft en die zonder substantiële menselijke tussenkomst tot stand komt.
In drie situaties kan u zich niet op dit recht beroepen:
als een wet dit toelaat (bijvoorbeeld ter voorkoming van belastingfraude);
als de besluitvorming berust op een uitdrukkelijke toestemming van de betrokkene; of
als dit noodzakelijk is voor de totstandkoming, of de uitvoering van een overeenkomst (let wel, hierbij maken wij steeds geval per geval een afweging of er minder privacy invasieve methoden bestaan om de overeenkomst te sluiten of uit te voeren).

                </li>
                <li>
                  <strong>Recht om toestemming in te trekken (art. 7 AVG):</strong> Wanneer uw persoonsgegevens worden verwerkt op basis van uw toestemming, kan u deze toestemming te allen tijde weer intrekken op eenvoudig verzoek. 
                </li>
              </ul>

              {/* 9. Klachten & Toezicht */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="klachten-en-toezicht">
                9. Klachten en toezicht
              </h2>
              <p> U heeft het recht om een klacht in te dienen bij de toezichthoudende autoriteit (artikel 77, 1. AVG):

                U kan een klacht indienen bij de toezichthoudende autoriteit voor gegevensbescherming. Een lijst van de
                toezichthoudende autoriteiten binnen de Europese Unie kan u raadplegen via deze hyperlink:{" "}
                <a
                  href="https://www.edpb.europa.eu/about-edpb/about-edpb/members_nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  https://www.edpb.europa.eu/about-edpb/about-edpb/members_nl
                </a>.
              </p>
              <p>De autoriteit die toezicht houdt op onze organisatie is de Gegevensbeschermingsautoriteit:</p>
              <ul>
                <li>
                  Website:{" "}
                  <a
                    href="https://www.gegevensbeschermingsautoriteit.be"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    https://www.gegevensbeschermingsautoriteit.be
                  </a>
                </li>
                <li>Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussel</li>
                <li>+32 (0)2 274 48 00</li>
                <li>+32 (0)2 274 48 35</li>
                <li>
                  <a href="mailto:contact@apd-gba.be" className="underline">
                    contact@apd-gba.be
                  </a>
                </li>
              </ul>

              {/* 10. Uitoefenen van uw rechten */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="uitoefenen-rechten">
                10. Uitoefenen van uw rechten
              </h2>
              <p>
                Om deze rechten uit te oefenen, kunt u contact met ons opnemen via de contactgegevens onder de titel "Wie zijn wij?". Om uw identiteit te kunnen nagaan, vragen wij u om een kopie van de voorzijde van uw identiteitskaart mee te sturen. Wij vragen u om daarbij uw rijksregisternummer en afbeelding op uw identiteitskaart onleesbaar te maken. In elk geval zullen wij uw identiteitskaartgegevens louter verwerken om uw identiteit te verifiëren en niet opslaan noch registreren in onze systemen.
U kan al deze rechten kosteloos uitoefenen, tenzij uw verzoek kennelijk ongegrond of buitensporig is (bijvoorbeeld vanwege het repetitieve karakter). In dat geval hebben wij het recht om u een redelijke vergoeding aan te rekenen of te weigeren om gevolg te geven aan je verzoek.

              </p>

              {/* 11. Bewaren */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="bewaren">11. Bewaren van uw persoonsgegevens</h2>
              <p>
                Wij bewaren uw persoonsgegevens zolang deze noodzakelijk zijn voor verwezenlijking van het beoogde doel. U dient er rekening mee te houden dat tal van (wettelijke) bewaartermijnen ertoe leiden dat persoonsgegevens opgeslagen (moeten) blijven. Voor zover geen bewaarplicht bestaat, worden de gegevens routinematig gewist nadat het doel waarvoor ze zijn verzameld, is verwezenlijkt. 
Daar komt bij dat wij persoonsgegevens kunnen bewaren als u ons hiervoor toestemming heeft verleend of als het mogelijk is dat wij deze gegevens nodig hebben in het kader van een rechtsvordering. In dat laatste geval dienen we bepaalde persoonsgegevens te gebruiken als bewijsmiddelen. Met dat doel bewaren we bepaalde persoonsgegevens overeenkomstig de wettelijke verjaringstermijn, die tot dertig jaar kan bedragen; de gebruikelijke verjaringstermijn in verband met persoonlijke rechtsvorderingen bedraagt tien jaar.

              </p>

              {/* 12. Bronnen */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="bronnen">12. Bronnen van persoonsgegevens</h2>
              <p>
                Wij verwerken de persoonsgegevens die u ons spontaan bezorgt. Indien bijkomstige persoonsgegevens nodig zijn, zal worden meegedeeld of u al dan niet verplicht bent om deze mee te delen en wat de gevolgen zijn indien u ze niet meedeelt. Het niet meedelen van persoonsgegevens kan ertoe leiden dat wij onze producten en diensten niet aan u kunnen leveren. 
In het bijzonder kunnen wij uw persoonsgegevens ontvangen van volgende bronnen: 
Onze externe partners en zelfstandige dienstverleners;
Publiek toegankelijke bronnen en officiële registers (zoals de Kruispuntbank van Ondernemingen);
Commerciële databanken of dataleveranciers (bijvoorbeeld leadlijsten, indien van toepassing).
              </p>

              {/* 13. Ontvangers */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="ontvangers">13. Categorieën van ontvangers</h2>
              <p>
                Binnen onze organisatie zien wij erop toe dat uw persoonsgegevens uitsluitend toegankelijk zijn voor personen die deze nodig hebben om te voldoen aan de contractuele en wettelijke verplichtingen. 
Wij zullen uw persoonsgegevens uitsluitend doorgeven aan derden conform de wettelijke bepalingen of wanneer u daarvoor toestemming heeft verleend. In bepaalde gevallen worden onze medewerkers bij het uitvoeren van hun taken ondersteund door externe dienstverleners.
Verder geven wij geen persoonsgegevens door aan derden, tenzij wij hiertoe verplicht zijn op basis van wettelijke bepalingen (bv. doorgifte aan overheidsinstanties zoals toezichthoudende of rechtshandhavingsinstanties). 
In het bijzonder identificeren we volgende categorieën van ontvangers:
Overheden of regulerende instanties wanneer zij hierom verzoeken in het kader van de naleving van een vonnis of arrest, wetgeving, regulering, norm of juridische procedure;
Externe (IT)-dienstverleners die ons ondersteunen bij het aanbieden van functionaliteiten op de website en het uitvoeren van onze bedrijfsactiviteiten;
Externe juridische en financiële adviseurs en consultants in het kader van hun dienstverlening;
Marketing- en communicatiepartners die ons bijstaan bij het opzetten en uitvoeren van campagnes, nieuwsbrieven en andere communicatie-initiatieven;
Financiële instellingen en betalingsdienstverleners voor de afhandeling van transacties.
              </p>

              {/* 14. Doorgiften buiten EER */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="doorgiften-buiten-eer">
                14. Doorgiften aan derde landen buiten de Europese Economische Ruimte ("EER")
              </h2>
              <p>
                We geven uw persoonsgegevens uitsluitend door aan verwerkers of verwerkingsverantwoordelijken in derde landen, voor zover we hiertoe wettelijk gerechtigd zijn of indien dit noodzakelijk is om een dossier te behandelen.
Voor zover dergelijke doorgiften nodig zijn, nemen wij de nodige maatregelen om ervoor te zorgen dat uw persoonsgegevens in hoge mate worden beschermd en dat alle doorgiften van persoonsgegevens buiten de EER rechtmatig plaatsvinden.

              </p>

              {/* 15. Beveiliging */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="beveiliging">15. Beveiliging van uw persoonsgegevens</h2>
              <p>
                De beveiliging van uw persoonsgegevens is belangrijk voor ons. Wij hebben redelijke en passende technische en organisatorische beveiligingsmaatregelen getroffen om uw persoonsgegevens zo goed mogelijk te beschermen tegen toevallige dan wel opzettelijke manipulatie, verlies, vernietiging of toegang door onbevoegde personen. 
Helaas is de overdracht van informatie via het internet niet volledig veilig. Hoewel wij ons best doen om uw persoonsgegevens te beschermen, kunnen wij de veiligheid van uw persoonsgegevens die via het internet aan ons worden doorgegeven niet garanderen. 

              </p>

              {/* 16. Vragen of klachten */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="vragen-klachten">16. Vragen of klachten?</h2>
              <p>
                Dan mag u steeds contact met ons opnemen via telefoon, e-mail of per brief via de contactgegevens onder de titel “Wie zijn wij?”. Wij beantwoorden graag uw vragen. 
              </p>

              {/* 17. Wijzigingen */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="wijzigingen">17. Wijzigingen</h2>
              <p>
                Om tegemoet te komen aan feedback of om veranderingen in onze verwerkingsactiviteiten te weerspiegelen, kunnen we deze privacyverklaring van tijd tot tijd wijzigen. Wij nodigen u dan ook uit om steeds de laatste versie van deze privacyverklaring te raadplegen op onze website.

              </p>

              {/* Contact snippet (footer convenience) */}
              <h3 className="text-xl font-semibold mt-10 mb-2" id="contact">Contact</h3>
              <p>
                <strong>Finit Solutions</strong> — Guldensporenlaan 9, 3120 Tremelo — KBO 1020.600.643 (RPR Leuven)
                <br />
                E-mail:{" "}
                <a href="mailto:contact@finitsolutions.be" className="underline">
                  contact@finitsolutions.be
                </a>{" "}
                • Tel: +32 (0)495 702 314 • Tel: +32 (0)468 029 945
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}