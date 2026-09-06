"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { HeroAnimation } from "@/components/home/hero-animation";
import { LeadFormPopup, useLeadForm } from "@/components/lead-form-popup";
import { pushEvent } from "@/lib/analytics";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE_LINK,
  PHONE_NUMBER,
  VAT_NUMBER,
} from "@/lib/finit-links";

/**
 * FinitHome — de homepage.
 *
 * Eén lange scrollpagina, elk blok één idee. Alle lopende tekst staat als
 * data bovenaan zodat copy aanpassen niet betekent dat je door JSX moet.
 *
 * Palet: porselein (#FDFBF7), Oxford navy (#1A2D63), leisteenblauw (#475D8F)
 * Typografie: Newsreader (serif) voor koppen, Instrument Sans voor de rest
 */

// ============================================
// PRIJZEN — één plek
// ============================================

const PRIJS_CURSUS = 295;
const PRIJS_PAKKET = 4950;
const PRIJS_LICENTIE_MAAND = 90;
/** Wat je het eerste jaar betaalt: pakket + twaalf maanden licentie. */
const PRIJS_EERSTE_JAAR = PRIJS_PAKKET + PRIJS_LICENTIE_MAAND * 12; // 6.030
const WERKWEKEN_PER_JAAR = 46;

// ============================================
// NAVIGATIE
// ============================================

const NAV_ITEMS = [
  { label: "Wat we doen", id: "wat-we-doen" },
  { label: "Hoe het werkt", id: "hoe-het-werkt" },
  { label: "Voor wie", id: "voor-wie" },
  { label: "Prijzen", id: "prijzen" },
  { label: "Over ons", id: "over-ons" },
];

// ============================================
// 2. HERKEN JE DIT? — de drie kaarten
// ============================================

type PersonaId = "installateur" | "dienstverlener" | "handelaar";

const PERSONA_STORAGE_KEY = "finit-persona";

const HERKEN_KAARTEN: {
  persona: PersonaId;
  quote: string;
  body: string;
  label: string;
}[] = [
  {
    persona: "installateur",
    label: "Installateur",
    quote: "Ik antwoord op klanten in de auto, 's avonds en op zondag.",
    body: "Elke vraag is dezelfde vraag. Prijs, beschikbaarheid, wanneer kom je langs. Je typt het voor de duizendste keer.",
  },
  {
    persona: "dienstverlener",
    label: "Dienstverlener",
    quote: "Mijn offertes vertrekken te laat en ik verlies er klanten mee.",
    body: "De klant belt op maandag. De offerte vertrekt donderdag. Tegen dan heeft hij al iemand anders.",
  },
  {
    persona: "handelaar",
    label: "Handelaar",
    quote: "Ik weet niet wie er nog moet betalen.",
    body: "Openstaande facturen leven in je hoofd, in een Excel en in je mailbox. Herinneringen sturen is een klus die altijd naar achteren schuift.",
  },
];

// ============================================
// 3. ZONDER / MET
// ============================================

interface VergelijkRij {
  zonder: string;
  met: string;
}

/** Wat iedereen ziet zolang er geen kaart is aangeklikt. */
const RIJEN_NEUTRAAL: VergelijkRij[] = [
  {
    zonder: "Klant stuurt een WhatsApp om 21u. Je antwoordt om 23u.",
    met: "Klant krijgt binnen een minuut een antwoord in jouw stijl, met de juiste prijs. Jij ziet het morgen.",
  },
  {
    zonder: "Je tikt elke offerte manueel in.",
    met: "Uit een foto, een spraakbericht of een mail komt een offerte klaar om te versturen.",
  },
  {
    zonder: "Klacht komt binnen. Wie pakt ze op?",
    met: "Klacht wordt geregistreerd, geklasseerd en aan de juiste persoon bezorgd, met een eerste antwoord naar de klant.",
  },
  {
    zonder: "Je stuurt betalingsherinneringen als je eraan denkt.",
    met: "Herinneringen vertrekken op dag 7, 14 en 30. Beleefd, in jouw naam. Jij ziet enkel wie nog niet betaald heeft.",
  },
  {
    zonder: "Nieuwe lead in je mailbox verdwijnt onder de rest.",
    met: "Elke lead komt in één lijst, met status en volgende stap.",
  },
];

/**
 * Klikt iemand op een kaart in blok 2, dan worden de voorbeelden hieronder
 * concreter. NIEUWE COPY — nog niet nagelezen, staat los van v1.
 */
const RIJEN_PER_PERSONA: Record<PersonaId, VergelijkRij[]> = {
  installateur: [
    {
      zonder: "Klant appt om 21u of je morgen kan langskomen. Jij zit op de zetel.",
      met: "Hij krijgt je eerstvolgende vrije dag en je voorrijkost, binnen de minuut. Jij leest het morgen in de bestelwagen.",
    },
    {
      zonder: "Je tikt de offerte 's avonds in, met de meterkast nog in je hoofd.",
      met: "Je stuurt een foto van de meterkast en een spraakbericht. De offerte staat klaar met jouw materiaalprijzen.",
    },
    {
      zonder: "Een klant belt dat de boiler weer lekt. Wie was daar ook alweer geweest?",
      met: "De klacht hangt meteen aan het juiste adres en de juiste werkbon, met een eerste antwoord naar de klant.",
    },
    {
      zonder: "Die werf van maart is nog altijd niet betaald. Denk je.",
      met: "Herinneringen vertrekken op dag 7, 14 en 30. Jij ziet enkel welke werven nog openstaan.",
    },
    {
      zonder: "Een aanvraag via je website verdwijnt onder de leveranciersmails.",
      met: "Elke aanvraag komt in één lijst: adres, type werk, status, volgende stap.",
    },
  ],
  dienstverlener: [
    {
      zonder: "Een klant mailt om 21u met een vraag die je al twintig keer beantwoordde.",
      met: "Hij krijgt binnen de minuut hetzelfde antwoord dat jij zou geven, met de juiste tarieven. Jij leest het morgen.",
    },
    {
      zonder: "Elk voorstel begint bij een leeg document.",
      met: "Uit je gespreksnotities komt een voorstel klaar om te versturen, in jouw structuur en jouw tarieven.",
    },
    {
      zonder: "Een ontevreden klant mailt. Het blijft twee dagen liggen.",
      met: "De klacht wordt geregistreerd, bij de juiste dossierhouder gelegd, en de klant heeft binnen het uur antwoord.",
    },
    {
      zonder: "Je factureert op tijd, maar opvolgen doe je als het uitkomt.",
      met: "Herinneringen vertrekken op dag 7, 14 en 30. Beleefd, in jouw naam.",
    },
    {
      zonder: "Een aanvraag via LinkedIn blijft in je inbox hangen.",
      met: "Elke aanvraag komt in één lijst, met status en volgende stap.",
    },
  ],
  handelaar: [
    {
      zonder: "'Hebben jullie dit op stock?' Om 21u, op Instagram en op WhatsApp tegelijk.",
      met: "De klant krijgt binnen de minuut antwoord over stock, prijs en openingsuren. Jij leest het morgen.",
    },
    {
      zonder: "Een prijsvraag voor twintig stuks tik je manueel uit.",
      met: "Uit de vraag komt een offerte met je staffelprijzen, klaar om te versturen.",
    },
    {
      zonder: "Een retour komt binnen via mail, telefoon en de webshop tegelijk.",
      met: "Elke klacht of retour komt op één plek, geklasseerd, met een eerste antwoord naar de klant.",
    },
    {
      zonder: "Klanten op factuur betalen wanneer het hen uitkomt.",
      met: "Herinneringen vertrekken op dag 7, 14 en 30. Jij ziet enkel wie nog niet betaald heeft.",
    },
    {
      zonder: "Een offerteaanvraag verdwijnt tussen de bestellingen.",
      met: "Elke aanvraag komt in één lijst, met status en volgende stap.",
    },
  ],
};

// ============================================
// 4. DRIE STAPPEN
// ============================================

const STAPPEN = [
  {
    nummer: "Stap 1",
    titel: "De cursus: zet je eigen AI-brein op",
    prijs: "295 euro, online, op eigen tempo",
    body: "In een paar avonden zet je zelf de basis op: je bedrijfscontext, je prijzen, je manier van antwoorden. Aan het einde heb je een werkend brein dat vragen beantwoordt en eenvoudige taken doet. Je weet meteen of dit iets voor jou is, zonder groot engagement.",
    resultaat:
      "Wat je hebt na de cursus: een AI dat jouw zaak kent, en een helder beeld van wat je verder wilt automatiseren.",
  },
  {
    nummer: "Stap 2",
    titel: "Het ontwikkelpakket: wij zetten het in productie",
    prijs: "4.950 euro, eenmalig, klaar in twee weken",
    body: "Wij nemen wat je in de cursus opzette en maken er een systeem van dat écht in je zaak draait: gekoppeld aan je WhatsApp, je mail, je agenda, je facturatie. Getest, veilig, met een noodrem voor als je zelf wilt ingrijpen.",
    resultaat:
      "Wat je hebt na het pakket: de vijf grootste tijdvreters uit je week zijn geautomatiseerd.",
  },
  {
    nummer: "Stap 3",
    titel: "De licentie: het blijft werken",
    prijs: "90 euro per maand",
    body: "AI-kosten, hosting, updates en een mens die kijkt als er iets hapert. Geen verrassingen op je factuur. Opzegbaar per maand.",
    resultaat: null,
  },
];

// ============================================
// 7. OVER ONS
// ============================================

const TEAM = [
  {
    naam: "Alex legt uit.",
    body: "Op Instagram en in je zaak, zonder jargon.",
    foto: "/alex.png",
    alt: "Alex van Finit Solutions",
  },
  {
    naam: "Jord bouwt.",
    body: "Elk systeem dat bij een klant draait, is door hem gemaakt en getest.",
    foto: "/jord.png",
    alt: "Jord van Finit Solutions",
  },
  {
    naam: "Karel houdt het draaiend.",
    body: "Planning, opvolging, en de mens die je belt als iets hapert.",
    foto: "/karel.png",
    alt: "Karel van Finit Solutions",
  },
];

// ============================================
// 8. VEELGESTELDE VRAGEN
// ============================================

// NOOT uit de copy bij de gegevensvraag: juridisch nakijken en aanvullen met
// de precieze leveranciers voor je live gaat.
const FAQ = [
  {
    vraag: "Moet ik iets van techniek kennen?",
    antwoord:
      "Nee. Als je WhatsApp en mail gebruikt, kun je de cursus volgen. Voor het pakket doen wij het technische werk.",
  },
  {
    vraag: "Werkt dit met mijn huidige tools?",
    antwoord:
      "Meestal wel. WhatsApp, Gmail en Outlook, Google Agenda, de meeste Belgische facturatiepakketten. Twijfel je? Stuur ons de naam van je tool en je hebt binnen de dag antwoord.",
  },
  {
    vraag: "Wat gebeurt er met de gegevens van mijn klanten?",
    antwoord:
      "Ze blijven van jou. Het systeem draait op Europese servers en wij gebruiken jouw klantgegevens nooit voor iets anders dan jouw zaak.",
  },
  {
    vraag: "Wat als de AI een fout maakt?",
    antwoord:
      "Elk systeem heeft een noodrem: jij bepaalt wat automatisch vertrekt en wat eerst langs jou passeert. In het begin zet je de rem strak, en je lost hem als je vertrouwen hebt.",
  },
  {
    vraag: "Kan ik stoppen?",
    antwoord:
      "De licentie is per maand opzegbaar. Wat gebouwd is, blijft van jou.",
  },
  {
    vraag: "Waarom eerst een cursus en niet meteen bouwen?",
    antwoord:
      "Omdat het goedkoper is voor jou. Wat jij in de cursus vastlegt, moeten wij niet meer uitzoeken. Wie liever meteen wil laten bouwen, kan dat ook: plan een gesprek.",
  },
];

// ============================================
// HULPJES
// ============================================

/** 6030 -> "6.030". Bewust geen Intl: zo rendert server en client identiek. */
function formatGetal(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ============================================
// 2. HERKEN JE DIT?
// ============================================

function HerkenSection({
  persona,
  onPersona,
}: {
  persona: PersonaId | null;
  onPersona: (id: PersonaId) => void;
}) {
  return (
    <section
      id="herken"
      className="scroll-mt-24 px-6 md:px-12 py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-[75rem] mx-auto">
        <h2 className="font-newsreader text-3xl md:text-5xl text-[#1A2D63] text-center mb-3">
          Herken je dit?
        </h2>
        <p className="font-instrument text-center text-[#475D8F] text-base md:text-lg mb-10 md:mb-14">
          Klik op de situatie die het meest op jou lijkt. De voorbeelden
          hieronder passen zich aan.
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {HERKEN_KAARTEN.map((kaart) => {
            const actief = persona === kaart.persona;
            return (
              <button
                key={kaart.persona}
                type="button"
                aria-pressed={actief}
                onClick={() => {
                  onPersona(kaart.persona);
                  pushEvent("persona_select", { persona: kaart.persona });
                }}
                className={`group text-left rounded-3xl p-7 md:p-8 border transition-all duration-200 ${
                  actief
                    ? "bg-[#1A2D63] border-[#1A2D63] text-white shadow-2xl shadow-[#1A2D63]/20 -translate-y-1"
                    : "bg-white border-[#1A2D63]/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1A2D63]/10"
                }`}
              >
                <span
                  className={`font-instrument text-[0.7rem] uppercase tracking-[0.16em] ${
                    actief ? "text-white/60" : "text-[#475D8F]/50"
                  }`}
                >
                  {kaart.label}
                </span>
                <p
                  className={`font-newsreader text-2xl md:text-[1.7rem] leading-snug mt-3 mb-4 ${
                    actief ? "text-white" : "text-[#1A2D63]"
                  }`}
                >
                  &ldquo;{kaart.quote}&rdquo;
                </p>
                <p
                  className={`font-instrument text-base leading-relaxed ${
                    actief ? "text-white/75" : "text-[#475D8F]"
                  }`}
                >
                  {kaart.body}
                </p>
                <span
                  className={`mt-6 inline-flex items-center gap-2 font-instrument text-sm font-medium ${
                    actief ? "text-white" : "text-[#1A2D63]"
                  }`}
                >
                  {actief ? (
                    <>
                      <Check className="w-4 h-4" />
                      Dit ben ik
                    </>
                  ) : (
                    <>
                      Dit ben ik
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <p className="font-newsreader text-2xl md:text-4xl text-[#1A2D63] text-center leading-snug max-w-3xl mx-auto mt-12 md:mt-16">
          Dit is geen gebrek aan discipline. Dit is werk dat een systeem hoort te
          doen.
        </p>
      </div>
    </section>
  );
}

// ============================================
// 3. WAT EEN AI-BREIN IS
// ============================================

function VergelijkSection({
  persona,
  rijen,
}: {
  persona: PersonaId | null;
  rijen: VergelijkRij[];
}) {
  const [mobielTab, setMobielTab] = useState<"zonder" | "met">("met");
  const personaLabel = persona
    ? HERKEN_KAARTEN.find((k) => k.persona === persona)?.label.toLowerCase()
    : null;

  return (
    <section
      id="wat-we-doen"
      className="scroll-mt-24 px-6 md:px-12 py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-[75rem] mx-auto">
        <h2 className="font-newsreader text-3xl md:text-5xl text-[#1A2D63] mb-5 max-w-3xl">
          Wat een AI-brein is
        </h2>
        <p className="font-instrument text-[#475D8F] text-base md:text-xl leading-relaxed max-w-3xl mb-10 md:mb-14">
          Een AI-brein is één systeem dat jouw zaak kent (je prijzen, je klanten,
          je manier van werken) en dat de terugkerende taken uitvoert zoals jij
          het zou doen. Het leeft in de tools die je al gebruikt: WhatsApp, mail,
          je agenda, je facturatie.
        </p>

        {personaLabel && (
          <p className="font-instrument text-sm text-[#475D8F]/70 mb-4">
            Voorbeelden voor een {personaLabel}.
          </p>
        )}

        {/* Mobiel: tabs */}
        <div className="md:hidden flex p-1 bg-[#1A2D63]/[0.06] rounded-full mb-5">
          {(["zonder", "met"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMobielTab(tab)}
              className={`flex-1 py-2.5 rounded-full font-instrument text-sm font-medium transition-colors ${
                mobielTab === tab
                  ? "bg-white text-[#1A2D63] shadow-sm"
                  : "text-[#475D8F]"
              }`}
            >
              {tab === "zonder" ? "Zonder" : "Met een AI-brein"}
            </button>
          ))}
        </div>

        {/* Kolomkoppen op desktop */}
        <div className="hidden md:grid grid-cols-2 gap-4 mb-3">
          <span className="font-instrument text-xs uppercase tracking-[0.16em] text-[#475D8F]/60 px-6">
            Zonder
          </span>
          <span className="font-instrument text-xs uppercase tracking-[0.16em] text-[#1A2D63] px-6">
            Met een AI-brein
          </span>
        </div>

        <div className="space-y-3">
          {rijen.map((rij, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3 md:gap-4">
              <div
                className={`rounded-2xl border border-[#1A2D63]/[0.08] bg-white/50 px-6 py-5 ${
                  mobielTab === "zonder" ? "block" : "hidden"
                } md:block`}
              >
                <p className="font-instrument text-base leading-relaxed text-[#475D8F]">
                  {rij.zonder}
                </p>
              </div>
              <div
                className={`rounded-2xl border border-[#1A2D63]/10 bg-white px-6 py-5 shadow-sm ${
                  mobielTab === "met" ? "block" : "hidden"
                } md:block`}
              >
                <p className="font-instrument text-base leading-relaxed text-[#1A2D63]">
                  {rij.met}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#hoe-het-werkt"
            className="group inline-flex items-center gap-2.5 bg-[#1A2D63] text-white px-7 py-3.5 rounded-full font-instrument text-base font-medium hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10"
          >
            Zo werkt het
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 4. HOE HET WERKT: DRIE STAPPEN
// ============================================

function StapKaart({
  stap,
  index,
}: {
  stap: (typeof STAPPEN)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex flex-col rounded-3xl bg-white border border-[#1A2D63]/10 p-7 md:p-8 shadow-sm"
    >
      <span className="absolute -top-3.5 left-7 md:left-8 bg-[#1A2D63] text-white font-instrument text-xs font-medium uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full">
        {stap.nummer}
      </span>

      <h3 className="font-newsreader text-2xl md:text-[1.7rem] leading-snug text-[#1A2D63] mt-3 mb-2">
        {stap.titel}
      </h3>
      <p className="font-instrument text-base font-medium text-[#1A2D63] mb-4">
        {stap.prijs}
      </p>
      <p className="font-instrument text-base leading-relaxed text-[#475D8F] mb-6">
        {stap.body}
      </p>

      {stap.resultaat && (
        <p className="mt-auto font-instrument text-base leading-relaxed text-[#1A2D63] bg-[#1A2D63]/[0.05] rounded-2xl px-5 py-4">
          {stap.resultaat}
        </p>
      )}
    </motion.div>
  );
}

function StappenSection({
  onCursus,
  onGesprek,
}: {
  onCursus: () => void;
  onGesprek: () => void;
}) {
  return (
    <section
      id="hoe-het-werkt"
      className="scroll-mt-24 px-6 md:px-12 py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-[75rem] mx-auto">
        <h2 className="font-newsreader text-3xl md:text-5xl text-[#1A2D63] mb-10 md:mb-16 max-w-2xl">
          Hoe het werkt: drie stappen
        </h2>

        <div id="prijzen" className="scroll-mt-28 relative">
          {/* Tijdlijn op desktop */}
          <div
            className="hidden md:block absolute top-0 left-0 right-0 h-px bg-[#1A2D63]/15"
            aria-hidden="true"
          />
          <div className="grid gap-8 md:gap-6 md:grid-cols-3 pt-8">
            {STAPPEN.map((stap, i) => (
              <StapKaart key={stap.nummer} stap={stap} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16 rounded-3xl bg-[#1A2D63]/[0.05] border border-[#1A2D63]/10 px-7 py-8 md:px-10 md:py-10">
          <h3 className="font-newsreader text-2xl md:text-3xl text-[#1A2D63] mb-3">
            Waarom in deze volgorde?
          </h3>
          <p className="font-instrument text-base md:text-lg leading-relaxed text-[#475D8F] max-w-3xl">
            Omdat jij je zaak beter kent dan wij. In de cursus leg je vast hoe
            jij werkt. Daardoor bouwen wij daarna sneller en juister, en betaal
            je geen tien ontwikkeldagen voor iets wat jij in twee avonden zelf
            kon aanleveren.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            type="button"
            onClick={onCursus}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1A2D63] text-white px-8 py-4 rounded-full font-instrument text-base font-medium hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/15"
          >
            Start met de cursus
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            type="button"
            onClick={onGesprek}
            className="font-instrument text-base text-[#1A2D63] underline underline-offset-4 decoration-[#1A2D63]/25 hover:decoration-[#1A2D63] transition-colors"
          >
            Liever eerst praten? Plan 20 minuten in.
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 5. WAT HET JE OPBRENGT
// ============================================

function OpbrengstSection() {
  const [uren, setUren] = useState(8);
  const [tariefInput, setTariefInput] = useState("60");

  const tarief = Number.parseInt(tariefInput, 10);
  const geldigTarief = Number.isFinite(tarief) && tarief > 0;

  const urenPerJaar = uren * WERKWEKEN_PER_JAAR;
  const waardePerJaar = geldigTarief ? urenPerJaar * tarief : 0;
  const wekenTerugverdiend = geldigTarief
    ? Math.ceil(PRIJS_EERSTE_JAAR / (uren * tarief))
    : null;

  return (
    <section
      id="opbrengst"
      className="scroll-mt-24 px-6 md:px-12 py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-[68rem] mx-auto">
        <h2 className="font-newsreader text-3xl md:text-5xl text-[#1A2D63] mb-3">
          Wat het je opbrengt
        </h2>
        <p className="font-newsreader text-2xl md:text-3xl text-[#475D8F] mb-10 md:mb-14">
          Jij schuift. Wij rekenen.
        </p>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-stretch">
          {/* Invoer */}
          <div className="rounded-3xl bg-white border border-[#1A2D63]/10 p-7 md:p-9 shadow-sm flex flex-col justify-center">
            <label
              htmlFor="uren-slider"
              className="font-instrument text-base md:text-lg text-[#1A2D63] leading-snug mb-6 block"
            >
              Hoeveel uur per week ben je bezig met antwoorden, offertes en
              opvolging?
            </label>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-newsreader text-6xl md:text-7xl text-[#1A2D63] tabular-nums leading-none">
                {uren}
              </span>
              <span className="font-instrument text-lg text-[#475D8F]">
                uur per week
              </span>
            </div>

            <input
              id="uren-slider"
              type="range"
              min={2}
              max={20}
              step={1}
              value={uren}
              onChange={(e) => setUren(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-[#1A2D63]/10 accent-[#1A2D63] cursor-pointer"
            />
            <div className="flex justify-between font-instrument text-xs text-[#475D8F]/60 mt-2 mb-8">
              <span>2 uur</span>
              <span>20 uur</span>
            </div>

            <label
              htmlFor="uurtarief"
              className="font-instrument text-base text-[#1A2D63] mb-2 block"
            >
              Jouw uurtarief
            </label>
            <div className="flex items-center gap-3">
              <input
                id="uurtarief"
                type="number"
                inputMode="numeric"
                min={0}
                max={500}
                value={tariefInput}
                onChange={(e) => setTariefInput(e.target.value)}
                className="w-32 px-4 py-3 rounded-xl border border-[#1A2D63]/15 bg-white text-[#1A2D63] font-instrument text-lg tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/20 focus:border-[#1A2D63]/30 transition-all"
              />
              <span className="font-instrument text-base text-[#475D8F]">
                euro per uur
              </span>
            </div>
          </div>

          {/* Uitkomst */}
          <div className="rounded-3xl bg-[#1A2D63] text-white p-7 md:p-9 shadow-2xl shadow-[#1A2D63]/20 flex flex-col justify-center">
            <p className="font-instrument text-sm uppercase tracking-[0.16em] text-white/50 mb-6">
              Bij {uren} uur per week
            </p>

            <div className="space-y-6">
              <div>
                <p className="font-newsreader text-4xl md:text-5xl tabular-nums leading-none mb-1.5">
                  {formatGetal(urenPerJaar)} uur
                </p>
                <p className="font-instrument text-base text-white/70">
                  per jaar die je niet meer zelf doet
                </p>
              </div>

              <div>
                <p className="font-newsreader text-4xl md:text-5xl tabular-nums leading-none mb-1.5">
                  {geldigTarief ? `${formatGetal(waardePerJaar)} euro` : "—"}
                </p>
                <p className="font-instrument text-base text-white/70">
                  per jaar aan tijd die je terugkrijgt
                </p>
              </div>

              <div className="pt-5 border-t border-white/15">
                <p className="font-instrument text-base leading-relaxed text-white/80">
                  Het pakket plus een jaar licentie kost{" "}
                  {formatGetal(PRIJS_EERSTE_JAAR)} euro.
                </p>
                {wekenTerugverdiend !== null && (
                  <p className="font-newsreader text-2xl md:text-3xl mt-2">
                    Terugverdiend na {wekenTerugverdiend}{" "}
                    {wekenTerugverdiend === 1 ? "week" : "weken"}.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="font-instrument text-sm text-[#475D8F]/70 leading-relaxed mt-6 max-w-3xl">
          Rekenvoorbeeld op basis van {WERKWEKEN_PER_JAAR} werkweken. Je vult
          zelf je uurtarief in. Wat je met die uren doet (meer klanten, of gewoon
          om 18u stoppen) is aan jou.
        </p>
      </div>
    </section>
  );
}

// ============================================
// 6. MAATWERK
// ============================================

function MaatwerkSection({ onGesprek }: { onGesprek: () => void }) {
  return (
    <section
      id="voor-wie"
      className="scroll-mt-24 px-6 md:px-12 py-16 md:py-24 bg-[#1A2D63] text-white"
    >
      <div className="max-w-[68rem] mx-auto">
        <p className="font-instrument text-sm uppercase tracking-[0.16em] text-white/50 mb-5">
          Voor bedrijven met meer processen: maatwerk
        </p>

        <h2 className="font-newsreader text-3xl md:text-5xl leading-tight mb-6 max-w-3xl">
          Vanaf 20 medewerkers zijn de flows niet meer te tellen op één hand.
        </h2>

        <p className="font-instrument text-base md:text-lg leading-relaxed text-white/75 max-w-3xl mb-10">
          Klachten, planning, onboarding van personeel, opvolging van
          leveranciers, rapportering. Dan bouwen we geen pakket maar een centraal
          AI-brein dat al die flows samenbrengt. We beginnen met een inventaris
          van je processen, kiezen er één als pilot, en breiden uit als de pilot
          werkt.
        </p>

        {/* NOOT uit de copy: naam van het schoonmaakbedrijf nog te bevestigen
            met de klant. Tot dan blijft het anoniem. */}
        <div className="rounded-3xl bg-white/[0.07] border border-white/10 p-7 md:p-9 mb-10">
          <h3 className="font-newsreader text-2xl md:text-3xl mb-4">
            Zo ging het bij een schoonmaakbedrijf
          </h3>
          <p className="font-instrument text-base md:text-lg leading-relaxed text-white/75">
            14 flows in kaart gebracht. Gestart met klachtenbehandeling: elke
            klacht wordt nu automatisch geregistreerd, geklasseerd en opgevolgd,
            met een antwoord naar de klant binnen het uur in plaats van binnen de
            week. De volgende flows staan gepland.
          </p>
        </div>

        <p className="font-newsreader text-2xl md:text-3xl">
          Vanaf 10.000 euro. Zes weken van handtekening tot oplevering.
        </p>

        <button
          type="button"
          onClick={onGesprek}
          className="group mt-8 inline-flex items-center gap-2.5 bg-white text-[#1A2D63] px-8 py-4 rounded-full font-instrument text-base font-medium hover:bg-white/90 transition-colors"
        >
          Plan een verkennend gesprek
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}

// ============================================
// 7. OVER ONS
// ============================================

function OverOnsSection() {
  return (
    <section
      id="over-ons"
      className="scroll-mt-24 px-6 md:px-12 py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-[68rem] mx-auto">
        <h2 className="font-newsreader text-3xl md:text-5xl text-[#1A2D63] mb-10 md:mb-14">
          Drie mensen, geen tussenlaag.
        </h2>

        <div className="grid gap-8 sm:grid-cols-3 mb-12">
          {TEAM.map((lid) => (
            <div key={lid.naam}>
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#1A2D63]/[0.06] mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lid.foto}
                  alt={lid.alt}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <h3 className="font-newsreader text-2xl text-[#1A2D63] mb-1.5">
                {lid.naam}
              </h3>
              <p className="font-instrument text-base leading-relaxed text-[#475D8F]">
                {lid.body}
              </p>
            </div>
          ))}
        </div>

        <p className="font-instrument text-base md:text-lg leading-relaxed text-[#475D8F] max-w-3xl mb-8">
          Finit Solutions is een Belgische BV, opgericht in 2025. We werken van
          thuis uit, zonder kantoor en zonder overhead die jij zou betalen. Wat
          we bouwen, gebruiken we zelf: onze eigen offertes, opvolging en
          planning lopen door hetzelfde brein.
        </p>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            pushEvent("contact_click", {
              method: "instagram",
              location: "over_ons",
            })
          }
          className="group inline-flex items-center gap-2 font-instrument text-base font-medium text-[#1A2D63] underline underline-offset-4 decoration-[#1A2D63]/25 hover:decoration-[#1A2D63] transition-colors"
        >
          Volg ons op Instagram voor eerlijke uitleg over AI
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

// ============================================
// 8. VEELGESTELDE VRAGEN
// ============================================

function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 px-6 md:px-12 py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-[52rem] mx-auto">
        <h2 className="font-newsreader text-3xl md:text-5xl text-[#1A2D63] mb-10 md:mb-14">
          Veelgestelde vragen
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((item, i) => (
            <AccordionItem
              key={item.vraag}
              value={`faq-${i}`}
              className="border-b border-[#1A2D63]/10"
            >
              <AccordionTrigger className="font-newsreader text-xl md:text-2xl text-[#1A2D63] text-left hover:no-underline py-6 gap-6">
                {item.vraag}
              </AccordionTrigger>
              <AccordionContent className="font-instrument text-base md:text-lg leading-relaxed text-[#475D8F] pb-6 pr-8">
                {item.antwoord}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ============================================
// PAGINA
// ============================================

export function FinitHome() {
  const { intent, openForm, closeForm } = useLeadForm();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [actief, setActief] = useState<string>("");
  const [persona, setPersona] = useState<PersonaId | null>(null);
  const currentYear = new Date().getFullYear();

  // De pagina onthoudt op welke kaart je klikte
  useEffect(() => {
    try {
      const bewaard = window.localStorage.getItem(PERSONA_STORAGE_KEY);
      if (
        bewaard === "installateur" ||
        bewaard === "dienstverlener" ||
        bewaard === "handelaar"
      ) {
        setPersona(bewaard);
      }
    } catch {
      // privémodus of geblokkeerde opslag: dan gewoon de neutrale voorbeelden
    }
  }, []);

  const kiesPersona = useCallback((id: PersonaId) => {
    setPersona(id);
    try {
      window.localStorage.setItem(PERSONA_STORAGE_KEY, id);
    } catch {
      // niet erg, de keuze geldt dan enkel voor dit bezoek
    }
  }, []);

  const rijen = useMemo(
    () => (persona ? RIJEN_PER_PERSONA[persona] : RIJEN_NEUTRAAL),
    [persona]
  );

  // Nav: achtergrond vanaf 40px, en markeren waar je bent
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      let huidig = "";
      let hoogsteTop = -Infinity;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 140 && top > hoogsteTop) {
          hoogsteTop = top;
          huidig = item.id;
        }
      }
      setActief(huidig);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu blokkeert het scrollen, en sluit zichzelf als je naar desktop verspringt
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const openCursus = useCallback(
    (locatie: string) => {
      openForm("cursus");
      pushEvent("cta_click", { cta_label: "cursus", location: locatie });
    },
    [openForm]
  );

  const openGesprek = useCallback(
    (locatie: string) => {
      openForm("gesprek");
      pushEvent("cta_click", { cta_label: "gesprek", location: locatie });
    },
    [openForm]
  );

  return (
    <div className="bg-[#FDFBF7] min-h-screen overflow-x-hidden">
      {/* ============================================ */}
      {/* 0. NAVIGATIE                                 */}
      {/* ============================================ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#1A2D63]/[0.08]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[86rem] mx-auto px-5 md:px-10 h-[4.5rem] flex items-center justify-between gap-6">
          <a href="#top" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Solutions"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`font-instrument text-[0.95rem] font-medium transition-colors ${
                  actief === item.id
                    ? "text-[#1A2D63]"
                    : "text-[#1A2D63]/70 hover:text-[#1A2D63]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openGesprek("nav")}
              className="hidden sm:inline-flex items-center bg-[#1A2D63] text-white px-5 py-2.5 rounded-full font-instrument text-sm font-medium hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/15"
            >
              Plan een gesprek
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full text-[#1A2D63] hover:bg-[#1A2D63]/5 transition-colors"
              aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobiel menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-[#FDFBF7]/95 backdrop-blur-xl"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative z-10 flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openGesprek("mobile_nav");
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1A2D63] text-white px-7 py-3.5 rounded-full font-instrument text-base font-medium mb-8"
            >
              Plan een gesprek
            </button>

            <div className="border-t border-[#1A2D63]/10">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between w-full py-4 border-b border-[#1A2D63]/10 text-[#1A2D63]"
                >
                  <span className="font-instrument text-lg font-medium">
                    {item.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#1A2D63]/30" />
                </a>
              ))}
            </div>

            <a
              href={PHONE_LINK}
              onClick={() =>
                pushEvent("contact_click", {
                  method: "phone",
                  location: "mobile_menu",
                })
              }
              className="mt-8 flex items-center justify-center gap-2 font-instrument text-base text-[#475D8F]"
            >
              <Phone className="w-4 h-4" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* 1. HERO                                      */}
      {/* ============================================ */}
      <header
        id="top"
        className="px-6 md:px-12 pt-28 md:pt-36 pb-16 md:pb-24"
      >
        <div className="max-w-[80rem] mx-auto grid gap-12 lg:gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <h1 className="font-newsreader text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4rem] tracking-tight text-[#1A2D63] mb-6">
              Jij runt je zaak. Wij bouwen het brein dat de rest doet.
            </h1>

            <p className="font-instrument text-lg md:text-xl leading-relaxed text-[#475D8F] max-w-xl mb-8">
              Offertes, klachten, planning, opvolging van facturen. Werk dat je
              elke avond nog even doet. Wij zetten daar een AI-systeem op dat het
              voor je afhandelt, gebouwd op hoe jouw zaak echt werkt.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <a
                href="#wat-we-doen"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#1A2D63] text-white px-7 py-4 rounded-full font-instrument text-base font-medium hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/15"
              >
                Bekijk wat het voor jou doet
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                type="button"
                onClick={() => openCursus("hero")}
                className="inline-flex items-center justify-center gap-2 border border-[#1A2D63]/20 text-[#1A2D63] px-7 py-4 rounded-full font-instrument text-base font-medium hover:bg-[#1A2D63]/[0.04] transition-colors"
              >
                Start met de cursus ({PRIJS_CURSUS} euro)
              </button>
            </div>

            <p className="font-instrument text-sm text-[#475D8F]/70">
              Voor zelfstandigen en bedrijven tot 20 medewerkers. Geen
              IT-afdeling nodig.
            </p>
          </div>

          <HeroAnimation />
        </div>
      </header>

      {/* ============================================ */}
      {/* 2 t/m 8                                      */}
      {/* ============================================ */}
      <HerkenSection persona={persona} onPersona={kiesPersona} />
      <VergelijkSection persona={persona} rijen={rijen} />
      <StappenSection
        onCursus={() => openCursus("stappen")}
        onGesprek={() => openGesprek("stappen")}
      />
      <OpbrengstSection />
      <MaatwerkSection onGesprek={() => openGesprek("maatwerk")} />
      <OverOnsSection />
      <FaqSection />

      {/* ============================================ */}
      {/* 9. AFSLUITEND BLOK                           */}
      {/* ============================================ */}
      <section className="px-6 md:px-12 py-20 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-[46rem] mx-auto text-center">
          <h2 className="font-newsreader text-4xl md:text-6xl leading-[1.1] text-[#1A2D63] mb-8">
            Begin klein. Begin vanavond.
          </h2>
          <p className="font-instrument text-lg md:text-xl leading-relaxed text-[#475D8F] mb-10">
            Voor {PRIJS_CURSUS} euro heb je binnen een week een AI dat jouw zaak
            kent. Bevalt het niet, dan heb je twee avonden geleerd hoe dit werkt.
            Bevalt het wel, dan weet je precies wat je vervolgens wilt laten
            bouwen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openCursus("slot")}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1A2D63] text-white px-8 py-4 rounded-full font-instrument text-base font-medium hover:bg-[#2A4488] transition-colors shadow-xl shadow-[#1A2D63]/20"
            >
              Start met de cursus
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => openGesprek("slot")}
              className="w-full sm:w-auto inline-flex items-center justify-center border border-[#1A2D63]/20 text-[#1A2D63] px-8 py-4 rounded-full font-instrument text-base font-medium hover:bg-[#1A2D63]/[0.04] transition-colors"
            >
              Plan 20 minuten met Karel
            </button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 10. FOOTER                                   */}
      {/* ============================================ */}
      <footer className="bg-[#1A2D63] text-white px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-[80rem] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-2 font-instrument text-base text-white/75">
              <span className="text-white font-medium">
                Finit Solutions BV
              </span>
              <span className="hidden sm:inline text-white/30">·</span>
              <span>België</span>
              <span className="hidden sm:inline text-white/30">·</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() =>
                  pushEvent("contact_click", {
                    method: "email",
                    location: "footer",
                  })
                }
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-instrument text-base text-white/75">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="/algemene-voorwaarden"
                className="hover:text-white transition-colors"
              >
                Algemene voorwaarden
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-instrument text-sm text-white/50">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <span>BTW: {VAT_NUMBER}</span>
              <a
                href="/cookieverklaring"
                className="hover:text-white/80 transition-colors"
              >
                Cookieverklaring
              </a>
              <span className="[&>button]:text-white/50 [&>button]:hover:text-white/80 [&>button]:transition-colors">
                <CookieSettingsLink />
              </span>
            </div>
            <span>© {currentYear} Finit Solutions</span>
          </div>
        </div>
      </footer>

      <LeadFormPopup intent={intent} onClose={closeForm} />
    </div>
  );
}

export default FinitHome;
