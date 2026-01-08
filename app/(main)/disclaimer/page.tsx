/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function DisclaimerPage() {
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
              <span>Disclaimer</span> <ChevronRight className="h-4 w-4 ml-1" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-2"
            >
              DISCLAIMER
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <p>Dank u voor uw bezoek aan de Finit Solutions website of onze productpagina van VoiceLink!</p>
              <p>
                Deze disclaimer is van toepassing telkens wanneer u, de websitebezoeker, de website{" "}
                <a href="https://www.finitsolutions.be" target="_blank" rel="noopener noreferrer" className="underline">
                  https://www.finitsolutions.be
                </a>{" "}
                en al haar subdomeinen of het SaaS-platform{" "}
                <a href="https://www.voicelink.me" target="_blank" rel="noopener noreferrer" className="underline">
                  https://www.voicelink.me
                </a>{" "}
                gebruikt (hierna de “Websites”).
              </p>
              <p>
                Beide Websites worden beheerd door en zijn exclusieve eigendom van:
                <br />
                Finit Solutions, gevestigd te Guldensporenlaan 9, 3120 Tremelo en ingeschreven in de Kruispuntbank van
                Ondernemingen onder het nummer 1020.600.643 (RPR Leuven) (hierna “Finit Solutions”, “wij” of “we”).
              </p>
              <p>
                U kan ons steeds contacteren via:
                <br />
                E-mail:{" "}
                <a href="mailto:contact@finitsolutions.be" className="underline">
                  contact@finitsolutions.be
                </a>
                <br />
                Tel.: +32 (0)495 702 314
                <br />+32 (0)468 029 945
              </p>
              <p>
                Wanneer u onze website Websites bezoekt en gebruikt, aanvaardt u de onderstaande voorwaarden daaromtrent:
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Algemeen</h2>
              <p>In deze disclaimer wordt onder de volgende termen verstaan:</p>
              <ul>
                <li>
                  ● gebruik: laden, inloggen, opvragen, raadplegen, lezen, bekijken, beluisteren, bewerken, invullen van
                  (formulieren), verzenden, (tijdelijk) kopiëren, opslaan, doorsturen, verspreiden, gebruik maken van
                  diensten, verrichten van rechtshandelingen (bijv. kopen, huren) of enige andere handeling of gebruik
                  van de Websites;
                </li>
                <li>
                  ● u: de natuurlijke of rechtspersoon, al dan niet vertegenwoordigd, die zich toegang verschaft tot deze
                  Websites en/of er gebruik van maakt;
                </li>
                <li>
                  ● de inhoud: omvat teksten, afbeeldingen, hyperlinks, geluids- en/of videofragmenten en/of andere
                  objecten, tekst of inhoud die in de Websites zijn opgenomen;
                </li>
                <li>
                  ● schade: directe of indirecte schade van welke aard dan ook, zoals verlies van gegevens of voorwerpen,
                  verlies van inkomsten, winst of andere economische verliezen;
                </li>
              </ul>
              <p>
                Wij behouden ons het recht voor om u de toegang tot en/of het gebruik van de Websites en de daarop
                aangeboden diensten te ontzeggen indien u de bepalingen en voorwaarden van deze disclaimer niet naleeft.
                Wij hebben daartoe het recht om de toegang en het gebruik van de Websites te monitoren.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Inhoud van de Websites</h2>
              <ul>
                <li>
                  ● De informatie die via de Websites wordt verzameld (via verwijzingen of hyperlinks naar andere websites
                  en apps die geen eigendom zijn van ons) en de andere inhoud die u raadpleegt, hebben een louter
                  informatieve waarde. Wij kunnen in geen geval aansprakelijk worden gesteld voor de informatie,
                  afbeeldingen, teksten, hyperlinks of werken van intellectuele of industriële eigendom op de website die
                  niet onze eigendom zijn.
                </li>
                <li>
                  ● Wij verschaffen de inhoud van de Websites "in de staat waarin deze zich bevindt", zonder garantie of
                  waarborg ten aanzien van de juistheid of volledigheid, de deugdelijkheid of geschiktheid voor een
                  bepaald doel of anderszins. Ondanks de grote zorg die wij aan het beheer van de Websites besteden, is
                  het mogelijk dat bepaalde informatie die wordt verstrekt en/of gepubliceerd onvolledig of onjuist is.
                  Druk-, spel- of andere soortgelijke fouten in documenten of andere inhoud, van welke aard dan ook, die
                  door ons of door derden op de Websites werden gepubliceerd, kunnen in geen geval enige verbintenis
                  scheppen of aanleiding geven tot enige aansprakelijkheid jegens ons of de aan ons gelieerde
                  vennootschappen.
                </li>
                <li>
                  ● Wij spannen ons in om de Websites regelmatig bij te werken en/of aan te vullen. De inhoud van de
                  Websites is bijgevolg vatbaar voor wijzigingen en kan dus zonder voorafgaande kennisgeving en naar ons
                  goeddunken worden gewijzigd. Wij en de aan ons gelieerde vennootschappen kunnen niet aansprakelijk
                  worden gesteld voor de gevolgen van een update, aanvulling of wijziging van de inhoud van de Websites
                  (desktop en mobiel).
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">IP</h2>
              <ul>
                <li>
                  · Alle intellectuele, industriële en andere (eigendoms-)rechten op de Websites en op alle informatie
                  die zich op de Websites bevindt of erop is geplaatst, in welke vorm dan ook, berusten bij ons, de aan
                  ons gelieerde vennootschappen en/of onze licentiehouders. De Websites en de inhoud daarvan zijn
                  uitsluitend bestemd voor particulier gebruik en mogen niet voor commerciële doeleinden worden
                  aangewend. De Websites en de inhoud ervan mogen niet worden gereproduceerd, overgedragen, verspreid,
                  gecirculeerd, gecommercialiseerd of meegedeeld zonder onze voorafgaande en uitdrukkelijke toestemming.
                  Door enige informatie op de Websites te plaatsen, aanvaardt u de overdracht van alle rechten daarop aan
                  ons.
                </li>
                <li>
                  ● Wij kunnen in geen geval aansprakelijk worden gesteld voor informatie, afbeeldingen, tekst,
                  hyperlinks of werken van intellectuele of industriële eigendom die door u of door derden op de Websites
                  worden geplaatst. Wij zijn niet verantwoordelijk voor de controle van de juistheid en de naleving van
                  de toepasselijke wet- en regelgeving van de verstrekte informatie, in het bijzonder afbeeldingen,
                  teksten, hyperlinks en andere werken met intellectuele, industriële of andere eigendomsrechten, of het
                  bestaan van intellectuele eigendomsrechten van derden. Wij behouden ons het recht voor om informatie
                  die inbreuk (kan) maken op de toepasselijke wet- of regelgeving of op de intellectuele, industriële of
                  andere eigendomsrechten van derden, te weigeren en/of van de Websites te verwijderen.
                </li>
                <li>
                  · Ongeoorloofd of oneigenlijk gebruik van de Websites of de inhoud daarvan kan een inbreuk vormen op
                  intellectuele of industriële eigendomsrechten, regelgeving met betrekking tot gegevensbescherming,
                  publicaties en/of communicatie in de breedste zin van het woord. U verklaart en garandeert dat uw
                  toegang tot en gebruik van de Websites en alle informatie die u eventueel in welke vorm dan ook naar de
                  Websites uploadt, in overeenstemming is met de toepasselijke wet- en regelgeving en geen inbreuk maakt
                  op enige intellectuele, industriële of andere rechten van derden. U verbindt zich ertoe om ons, de met
                  ons gelieerde vennootschappen en onze licentiehouders volledig te vrijwaren en schadeloos te stellen
                  voor elke schade, gerechtelijke of andere maatregelen, veroordelingen en alle andere mogelijke kosten
                  die voortvloeien uit uw toegang tot en gebruik van de Websites en uw inzending van informatie, beelden,
                  teksten, hyperlinks of werken van intellectuele of industriële eigendom en voor alle aanspraken van
                  derden die daaruit voortvloeien of daarmee verband houden.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Privacy en gegevensbescherming</h2>
              <ul>
                <li>
                  ● Wij hechten waarde aan uw privacy en verbinden ons ertoe uw persoonsgegevens te beschermen in
                  overeenstemming met de toepasselijke regelgeving inzake privacy en gegevensbescherming, in het
                  bijzonder de Algemene Verordening Gegevensbescherming en de toepasselijke nationale
                  uitvoeringswetten en -regelgeving.
                </li>
                <li>
                  ● Als u meer wilt weten over de gegevensverwerking via de website, kunt u onze{" "}
                  <a href="https://finitsolutions.be/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                    privacyverklaring met betrekking tot onze website
                  </a>{" "}
                  raadplegen.
                </li>
                <li>
                  ● Als u meer wilt weten over de gegevensverwerking via het platform, kunt u onze{" "}
                  <a href="https://voicelink.me/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                    privacyverklaring met betrekking tot ons SaaS-platform
                  </a>{" "}
                  raadplegen.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Toepasselijk recht en bevoegde rechter</h2>
              <ul>
                <li>
                  ● De Websites wordt beheerst door het Belgisch recht. In geval van geschil, klacht of argument in
                  verband met de Websites, de inhoud ervan of deze disclaimer zijn uitsluitend de rechtbanken van Leuven
                  bevoegd om dat geschil, die klacht of dat argument te beslechten, behalve wanneer u een consument bent
                  in de zin van artikel I.1, 2° van het Wetboek van Economisch Recht, in welk geval de rechtbanken van uw
                  woonplaats bevoegd zijn.
                </li>
                <li>
                  ● In geval van geschillen, klachten of betwistingen zal een gedrukte versie van deze disclaimer worden
                  beschouwd als een juridisch bindend document in gerechtelijke en/of administratieve procedures.
                </li>
              </ul>

              
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
