"use client";

/**
 * De eigen videospeler van de hub, naar het model van Shadowboys (zie
 * docs/hub-analyse-shadowboys.md), met één verschil: je kan pauzeren.
 *
 * - Klik op play: de video speelt met geluid. De enige bediening is pauze en
 *   verder (de knop linksonder, of klikken op het beeld), plus de kwaliteit. Geen tijdlijn, geen
 *   vooruitspoelen, geen snelheid, geen native bediening.
 * - De voortgangsbalk "liegt": 1 − (1 − echt)^sterkte (zie video.ts). In het
 *   begin loopt hij snel, op het einde traag, zodat de video korter lijkt.
 * - De positie gaat om de paar seconden naar localStorage. Kom je terug, dan
 *   vraagt de speler "Wil je verder kijken?".
 * - HLS via hls.js (Chrome, Firefox, Safari op de Mac, Android), zonder plafond:
 *   4K kan. Op een groot scherm met snelle verbinding begint hij hoog. Een klein
 *   menu (Auto, 4K, 1080p, …) om zelf te kiezen. iPhone en iPad spelen HLS zelf.
 *   Een gewone mp4 als bron werkt ook.
 * - Ondertitels woord voor woord uit public/hub/vsl/ondertitels.json, het
 *   woord dat Alex nu zegt is gemarkeerd.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type HlsType from "hls.js";
import { pushEvent } from "@/lib/analytics";
import { HUB } from "./copy";
import { VSL } from "./video";

type Fase = "start" | "verder" | "speelt" | "pauze" | "einde" | "fout";
type Woord = [string, number, number];
type Regel = [number, number, Woord[]];

// Hangt aan de bron: een nieuwe video begint dus niet op de plek van de oude.
const SLEUTEL = `finit_hub_vsl_positie:${VSL.bron}`;
const IS_HLS = /\.m3u8(\?|$)/i.test(VSL.bron);
const T = HUB.speler;

function leesPositie(): number {
  try {
    const n = parseFloat(window.localStorage.getItem(SLEUTEL) ?? "");
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}
function bewaarPositie(sec: number) {
  try {
    window.localStorage.setItem(SLEUTEL, String(Math.floor(sec)));
  } catch {
    /* privévenster of opslag geblokkeerd: dan vragen we gewoon niet */
  }
}
function wisPositie() {
  try {
    window.localStorage.removeItem(SLEUTEL);
  } catch {
    /* idem */
  }
}

/** iPhone en iPad: daar speelt de eigen speler van Apple HLS af (hls.js via ManagedMediaSource is daar minder zeker). */
function isIos(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

/**
 * Groot scherm (minstens 2560 echte pixels breed, bv. een 4K-scherm of een
 * Retina-laptop) en geen teken van een trage of zuinige verbinding: dan mikt
 * de speler meteen op de hoogste kwaliteit. Valt de verbinding tegen, dan
 * schakelt hls.js vanzelf terug.
 */
function grootEnSnel(): boolean {
  const pixels = Math.max(window.screen.width, window.screen.height) * (window.devicePixelRatio || 1);
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string; downlink?: number } }).connection;
  const traag = !!c && (c.saveData === true || (c.effectiveType !== undefined && c.effectiveType !== "4g") || (c.downlink !== undefined && c.downlink < 10));
  return pixels >= 2560 && !traag;
}

/**
 * De link die de speler laadt. Met token-authenticatie bij Bunny eerst een
 * tijdelijke, ondertekende link vragen aan /api/vsl-bron; `null` als dat mislukt.
 */
async function haalBron(): Promise<string | null> {
  if (!VSL.ondertekenen) return VSL.bron;
  try {
    const r = await fetch(`/api/vsl-bron?bron=${encodeURIComponent(VSL.bron)}`, { cache: "no-store" });
    const j = (await r.json()) as { bron?: string };
    return r.ok && j.bron ? j.bron : null;
  } catch {
    return null;
  }
}

/** "4K" voor 2160p, anders "1080p" enzovoort. */
export function kwaliteitLabel(hoogte: number): string {
  return hoogte >= 2160 ? "4K" : `${hoogte}p`;
}

/** De getoonde voortgang: eerst snel, dan traag. */
export function getoondeVoortgang(echt: number, sterkte = VSL.balkSterkte): number {
  const p = Math.min(1, Math.max(0, echt));
  return 1 - Math.pow(1 - p, sterkte);
}

export function VslSpeler({
  meta = {},
  onNaarFormulier,
}: {
  /** Gaat mee met de analytics-events (bron, reel). */
  meta?: Record<string, string>;
  /** De knop op het einde van de video. */
  onNaarFormulier?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<HlsType | null>(null);
  const bronKlaar = useRef<Promise<void> | null>(null);
  const bronFout = useRef(false);
  const hervatOp = useRef(0);
  const laatsteTijd = useRef(0);
  const eigenSprong = useRef(false);
  const laatstBewaard = useRef(0);
  const kwartGemeld = useRef(0);
  const metaRef = useRef(meta);
  metaRef.current = meta;

  const [fase, setFase] = useState<Fase>("start");
  const [laadt, setLaadt] = useState(false);
  const [balk, setBalk] = useState(0);
  const [regels, setRegels] = useState<Regel[] | null>(null);
  const [nu, setNu] = useState<{ r: number; w: number }>({ r: -1, w: -1 });
  // Kwaliteitsmenu (alleen met hls.js): de niveaus, de keuze (-1 = automatisch) en wat er nu speelt.
  const [niveaus, setNiveaus] = useState<Array<{ i: number; h: number }>>([]);
  const [keuze, setKeuze] = useState(-1);
  const [speeltNiveau, setSpeeltNiveau] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  // Terugkomer? Dan de vraag in plaats van de afspeelknop.
  useEffect(() => {
    const pos = leesPositie();
    if (pos > VSL.verderVanaf) {
      hervatOp.current = pos;
      setFase("verder");
    }
  }, []);

  /** De bron één keer klaarzetten: hls.js laadt alleen de playlist, nog geen beeld. */
  const zetBronKlaar = useCallback(() => {
    if (bronKlaar.current) return bronKlaar.current;
    const v = videoRef.current;
    if (!v) return Promise.resolve();
    bronKlaar.current = (async () => {
      const bron = await haalBron();
      if (!bron) {
        bronFout.current = true;
        return;
      }
      // hls.js overal waar het kan, zodat wij de kwaliteit kiezen (ook 4K). Op iPhone en iPad
      // de eigen speler van Apple; een mp4 als bron speelt gewoon.
      if (!IS_HLS || isIos()) {
        v.src = bron;
        return;
      }
      const { default: Hls } = await import("hls.js");
      if (!Hls.isSupported()) {
        v.src = bron;
        return;
      }
      // Geen plafond op de kwaliteit (geen capLevelToPlayerSize): 4K moet kunnen. Op een groot
      // scherm met snelle verbinding gaan we uit van 40 Mbit/s en slaan we de snelheidstest over
      // (die laadt eerst een stukje in de laagste kwaliteit), zodat hij meteen in 4K begint.
      // Anders: test + 5 Mbit/s. Daarna meet hls.js zelf en schakelt hij terug als het hapert.
      const groot = grootEnSnel();
      const schatting = groot ? 40_000_000 : 5_000_000;
      const hls = new Hls({
        autoStartLoad: false,
        startLevel: -1,
        testBandwidth: !groot,
        capLevelToPlayerSize: false,
        abrEwmaDefaultEstimate: schatting,
        abrEwmaDefaultEstimateMax: schatting,
      });
      // Netwerkfout: één keer opnieuw proberen. Weigert de server de video (bv. het maandplafond
      // bij Bunny is bereikt of het token is verlopen), dan de foutmelding in plaats van eeuwig laden.
      let herkansing = false;
      hls.on(Hls.Events.ERROR, (_e, data) => {
        if (!data.fatal) return;
        const playlistFout = data.details.startsWith("manifest");
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR && !playlistFout && !herkansing) {
          herkansing = true;
          hls.startLoad();
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
        else {
          setLaadt(false);
          setFase("fout");
        }
      });
      hls.on(Hls.Events.MANIFEST_PARSED, (_e, data) => {
        // Eén keuze per hoogte, de hoogste eerst; onder 720p heeft het menu geen zin.
        const gezien = new Set<number>();
        const lijst = data.levels
          .map((l, i) => ({ i, h: l.height }))
          .filter((l) => l.h >= 720 && !gezien.has(l.h) && (gezien.add(l.h), true))
          .sort((x, y) => y.h - x.h);
        setNiveaus(lijst);
      });
      hls.on(Hls.Events.LEVEL_SWITCHED, (_e, data) => setSpeeltNiveau(data.level));
      hls.loadSource(bron);
      hls.attachMedia(v);
      hlsRef.current = hls;
    })();
    return bronKlaar.current;
  }, []);

  // hls.js alvast inladen zodra de pagina rustig is, zodat play meteen reageert.
  useEffect(() => {
    const id = window.setTimeout(() => void zetBronKlaar(), 600);
    return () => {
      window.clearTimeout(id);
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [zetBronKlaar]);

  const laadOndertitels = useCallback(() => {
    if (!VSL.ondertitels || regels) return;
    fetch(VSL.ondertitels)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => Array.isArray(d) && setRegels(d as Regel[]))
      .catch(() => undefined);
  }, [regels]);

  const start = useCallback(
    async (vanaf: number) => {
      const v = videoRef.current;
      if (!v) return;
      setLaadt(true);
      laadOndertitels();
      await zetBronKlaar();
      if (bronFout.current) {
        setLaadt(false);
        setFase("fout");
        return;
      }
      eigenSprong.current = true;
      laatsteTijd.current = vanaf;
      kwartGemeld.current = 0;
      if (hlsRef.current) {
        hlsRef.current.startLoad(vanaf);
        if (vanaf === 0 && v.currentTime > 0) v.currentTime = 0;
      } else if (v.readyState >= 1) {
        v.currentTime = vanaf;
      } else {
        v.addEventListener("loadedmetadata", () => (v.currentTime = vanaf), { once: true });
      }
      v.muted = false;
      try {
        await v.play();
        pushEvent(vanaf > 0 ? "vsl_verder" : "vsl_start", { ...metaRef.current, vanaf: String(Math.floor(vanaf)) });
      } catch {
        // De browser weigerde (bv. energiebesparing): terug naar de afspeelknop.
        setLaadt(false);
        setFase(vanaf > 0 ? "verder" : "start");
      }
    },
    [laadOndertitels, zetBronKlaar]
  );

  const pauzeer = useCallback(() => videoRef.current?.pause(), []);
  /** Kwaliteit kiezen: -1 = automatisch. Wisselt meteen; spoelen kan nog altijd niet. */
  const kiesKwaliteit = useCallback((i: number) => {
    const hls = hlsRef.current;
    setKeuze(i);
    setMenuOpen(false);
    if (!hls) return;
    hls.currentLevel = i;
    pushEvent("vsl_kwaliteit", { ...metaRef.current, kwaliteit: i === -1 ? "auto" : kwaliteitLabel(hls.levels[i]?.height ?? 0) });
  }, []);

  const speelVerder = useCallback(() => {
    const v = videoRef.current;
    if (v) void v.play().catch(() => undefined);
  }, []);

  // Alle gebeurtenissen van de video.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const opTijd = () => {
      const d = v.duration;
      if (!d || !Number.isFinite(d)) return;
      // Onze eigen sprong (verder kijken, opnieuw) is klaar zodra we op de doeltijd zitten.
      if (eigenSprong.current && !v.seeking && Math.abs(v.currentTime - laatsteTijd.current) < 1.5) eigenSprong.current = false;
      if (!v.seeking && !eigenSprong.current) laatsteTijd.current = v.currentTime;
      const echt = v.currentTime / d;
      setBalk(getoondeVoortgang(echt));
      if (Math.abs(v.currentTime - laatstBewaard.current) >= VSL.bewaarElke) {
        laatstBewaard.current = v.currentTime;
        bewaarPositie(v.currentTime);
      }
      // Echte voortgang voor de analytics: 25, 50, 75 %.
      const kwart = Math.floor(echt * 4);
      if (kwart > kwartGemeld.current && kwart < 4) {
        kwartGemeld.current = kwart;
        pushEvent("vsl_voortgang", { ...metaRef.current, procent: String(kwart * 25) });
      }
    };
    // Spoelen kan niet: elke sprong die niet van ons komt, zetten we terug.
    const opSpoelen = () => {
      if (eigenSprong.current) return;
      if (Math.abs(v.currentTime - laatsteTijd.current) > 1) v.currentTime = laatsteTijd.current;
    };
    const opSpelen = () => {
      setFase("speelt");
      setLaadt(false);
    };
    const opPauze = () => {
      if (v.ended) return;
      bewaarPositie(v.currentTime);
      setFase((f) => (f === "speelt" ? "pauze" : f));
    };
    const opEinde = () => {
      wisPositie();
      setBalk(1);
      setFase("einde");
      pushEvent("vsl_voortgang", { ...metaRef.current, procent: "100" });
    };
    const opWachten = () => setLaadt(true);
    const opLoopt = () => setLaadt(false);
    const opFout = () => setFase("fout");
    const opWeg = () => {
      if (v.currentTime > 0 && !v.ended) bewaarPositie(v.currentTime);
    };

    v.addEventListener("timeupdate", opTijd);
    v.addEventListener("seeking", opSpoelen);
    v.addEventListener("play", opSpelen);
    v.addEventListener("playing", opLoopt);
    v.addEventListener("pause", opPauze);
    v.addEventListener("ended", opEinde);
    v.addEventListener("waiting", opWachten);
    v.addEventListener("error", opFout);
    window.addEventListener("pagehide", opWeg);

    // Knoppen op het vergrendelscherm en de koptelefoon: pauze en verder mogen, spoelen niet.
    if ("mediaSession" in navigator) {
      const ms = navigator.mediaSession;
      const zet = (a: MediaSessionAction, f: MediaSessionActionHandler | null) => {
        try {
          ms.setActionHandler(a, f);
        } catch {
          /* niet elke browser kent elke actie */
        }
      };
      zet("play", () => void v.play().catch(() => undefined));
      zet("pause", () => v.pause());
      (["seekbackward", "seekforward", "seekto", "previoustrack", "nexttrack"] as MediaSessionAction[]).forEach((a) => zet(a, () => undefined));
    }

    return () => {
      v.removeEventListener("timeupdate", opTijd);
      v.removeEventListener("seeking", opSpoelen);
      v.removeEventListener("play", opSpelen);
      v.removeEventListener("playing", opLoopt);
      v.removeEventListener("pause", opPauze);
      v.removeEventListener("ended", opEinde);
      v.removeEventListener("waiting", opWachten);
      v.removeEventListener("error", opFout);
      window.removeEventListener("pagehide", opWeg);
    };
  }, []);

  // Ondertitels: het woord dat nu gezegd wordt, per beeldje bijgewerkt.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !regels || fase !== "speelt") return;
    let id = 0;
    const tik = () => {
      const t = v.currentTime;
      let r = -1;
      for (let i = 0; i < regels.length; i++) {
        if (regels[i][0] > t) break;
        // Een regel blijft staan tot de volgende begint, maar niet langer dan een halve seconde na zijn laatste woord.
        const volgende = regels[i + 1]?.[0] ?? Infinity;
        if (t < Math.min(volgende, regels[i][1] + 0.5)) r = i;
      }
      let w = -1;
      if (r >= 0) regels[r][2].forEach(([, s], j) => s <= t && (w = j));
      setNu((oud) => (oud.r === r && oud.w === w ? oud : { r, w }));
      id = requestAnimationFrame(tik);
    };
    id = requestAnimationFrame(tik);
    return () => cancelAnimationFrame(id);
  }, [regels, fase]);

  const regel = regels && nu.r >= 0 && (fase === "speelt" || fase === "pauze") ? regels[nu.r] : null;

  return (
    <div
      className="vsl-frame relative aspect-video w-full select-none overflow-hidden rounded-[18px] bg-[#0F1D47] shadow-[0_30px_70px_-30px_rgba(26,45,99,0.7)] sm:rounded-[28px]"
      role="region"
      aria-label={T.label}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={VSL.affiche}
        preload="none"
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noplaybackrate noremoteplayback"
        aria-hidden="true"
      />

      {/* Ondertitels */}
      {regel && (
        <div className="pointer-events-none absolute inset-x-0 bottom-[11%] z-10 flex justify-center px-[6%]">
          <p className="vsl-ondertitel rounded-xl bg-[#0F1D47]/60 px-[0.6em] py-[0.3em] text-center font-bold leading-[1.35] text-white">
            {regel[2].map(([tekst], j) => (
              <span key={j}>
                {j > 0 && " "}
                <span className={j === nu.w ? "rounded-[0.3em] bg-[#E6ECF9] px-[0.12em] text-[#1A2D63]" : "px-[0.12em]"}>{tekst}</span>
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Tijdens het spelen: klik op het beeld = pauze, plus een kleine knop linksonder. */}
      {fase === "speelt" && (
        <>
          <button type="button" onClick={pauzeer} className="absolute inset-0 z-10 h-full w-full cursor-pointer" aria-label={T.pauze} tabIndex={-1} />
          <button
            type="button"
            onClick={pauzeer}
            className="absolute bottom-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1D47]/70 text-white backdrop-blur-sm transition hover:bg-[#0F1D47]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-6 sm:left-6 sm:h-12 sm:w-12"
            aria-label={T.pauze}
          >
            <Pause className="h-4 w-4 fill-current sm:h-5 sm:w-5" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Laden */}
      {laadt && (fase === "speelt" || fase === "start" || fase === "verder") && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 z-30 -ml-6 -mt-6 h-12 w-12 animate-spin rounded-full border-[3px] border-white/25 border-t-white" aria-hidden="true" />
      )}

      {/* Start en pauze: één grote knop in het midden. */}
      {(fase === "start" || fase === "pauze") && !laadt && (
        <button
          type="button"
          onClick={() => (fase === "start" ? void start(0) : speelVerder())}
          className="group absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-gradient-to-t from-[#0F1D47]/45 via-[#0F1D47]/10 to-transparent"
          aria-label={fase === "start" ? T.afspelen : T.verder}
        >
          <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white shadow-[0_0_0_10px_rgba(255,255,255,0.18),0_18px_40px_-10px_rgba(0,0,0,0.55)] transition-transform duration-200 group-hover:scale-105 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-[14px] group-focus-visible:outline-white sm:h-24 sm:w-24">
            <Play className="ml-1 h-7 w-7 fill-[#1A2D63] text-[#1A2D63] sm:h-9 sm:w-9" aria-hidden="true" />
          </span>
        </button>
      )}

      {/* Terugkomer: verder kijken of opnieuw beginnen. */}
      {fase === "verder" && !laadt && (
        <Laag>
          <p className="hp-display hp-display-sm text-[1.05rem] font-semibold leading-[1.25] sm:text-[1.6rem]">{T.verderVraag}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-5 sm:gap-3">
            <button type="button" onClick={() => void start(hervatOp.current)} className="hp-btn hp-btn--light hp-btn--md">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              {T.verderKnop}
            </button>
            <button type="button" onClick={() => void start(0)} className="hp-btn hp-btn--md hp-btn--wit-rand">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {T.opnieuwKnop}
            </button>
          </div>
        </Laag>
      )}

      {/* Einde: door naar het formulier. */}
      {fase === "einde" && (
        <Laag>
          <p className="hp-display hp-display-sm text-[1.05rem] font-semibold leading-[1.25] sm:text-[1.6rem]">{T.eindeVraag}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-5 sm:gap-3">
            {onNaarFormulier && (
              <button type="button" onClick={onNaarFormulier} className="hp-btn hp-btn--light hp-btn--md">
                {T.eindeKnop}
              </button>
            )}
            <button type="button" onClick={() => void start(0)} className="hp-btn hp-btn--md hp-btn--wit-rand">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {T.eindeOpnieuw}
            </button>
          </div>
        </Laag>
      )}

      {fase === "fout" && (
        <Laag>
          <p className="max-w-[28rem] text-[0.95rem] leading-[1.5] sm:text-[1.05rem]">{T.fout}</p>
        </Laag>
      )}

      {/* Kwaliteit (alleen met hls.js en minstens twee keuzes): Auto, 4K, 1440p, 1080p, 720p. */}
      {niveaus.length > 1 && (fase === "speelt" || fase === "pauze") && (
        <div className="absolute bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
          {menuOpen && (
            <ul role="menu" aria-label={T.kwaliteit} className="absolute bottom-full right-0 mb-2 min-w-[8.5rem] overflow-hidden rounded-xl bg-[#0F1D47]/95 py-1 text-[0.875rem] text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              {[{ i: -1, h: 0 }, ...niveaus].map((n) => (
                <li key={n.i} role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={keuze === n.i}
                    onClick={() => kiesKwaliteit(n.i)}
                    className={`flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left transition-colors hover:bg-white/10 ${keuze === n.i ? "font-semibold" : ""}`}
                  >
                    {n.i === -1 ? T.kwaliteitAuto : kwaliteitLabel(n.h)}
                    {keuze === n.i && <span aria-hidden="true">✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label={T.kwaliteit}
            className="flex h-10 items-center gap-1.5 rounded-full bg-[#0F1D47]/70 px-3.5 text-[0.8125rem] font-semibold text-white backdrop-blur-sm transition hover:bg-[#0F1D47]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:px-4 sm:text-[0.875rem]"
          >
            {keuze === -1
              ? `${T.kwaliteitAuto}${speeltNiveau >= 0 && hlsRef.current?.levels[speeltNiveau] ? ` · ${kwaliteitLabel(hlsRef.current.levels[speeltNiveau].height)}` : ""}`
              : kwaliteitLabel(hlsRef.current?.levels[keuze]?.height ?? 0)}
          </button>
        </div>
      )}

      {/* De voortgangsbalk: niet klikbaar, niet te verslepen. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1 bg-white/20 sm:h-1.5" aria-hidden="true">
        <span className="block h-full origin-left bg-[#9DB1EC] transition-transform duration-[250ms] ease-linear" style={{ transform: `scaleX(${balk})` }} />
      </div>
    </div>
  );
}

function Laag({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0F1D47]/80 p-4 text-center text-white backdrop-blur-[2px]">
      {children}
    </div>
  );
}
