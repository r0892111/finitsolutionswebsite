/**
 * De VSL op de hub: waar de video staat en hoe de speler zich gedraagt.
 *
 * DE ECHTE VIDEO INPLUGGEN = de regel `bron` hieronder aanpassen (of de
 * Netlify-variabele NEXT_PUBLIC_HUB_VSL_BRON zetten, dan hoeft er geen code te
 * veranderen). Een HLS-playlist (.m3u8, bv. van Bunny Stream of Mux) of een
 * gewone mp4 werken allebei. Past de tijdlijn van de video niet meer bij de
 * ondertitels, maak ze dan opnieuw met `node scripts/hub/ondertitels.mjs`.
 *
 * Voor lokaal testen zonder Bunny staat er nog een voorlopige video met een klok
 * in beeld: NEXT_PUBLIC_HUB_VSL_BRON=/hub/vsl/voorlopig/master.m3u8.
 */
export const VSL = {
  // VSL v3 (7:43,8; 480p tot 4K) op Bunny Stream, bibliotheek finit-vsl. Opgeladen 20/11/2026.
  bron: process.env.NEXT_PUBLIC_HUB_VSL_BRON || "https://vz-a3aedf8d-709.b-cdn.net/05b3b526-5950-4fc8-8f2b-a9728a8965ed/playlist.m3u8",
  /**
   * Token-authenticatie bij Bunny (tegen anderen die onze link gebruiken): zet in
   * Netlify NEXT_PUBLIC_HUB_VSL_TOKEN=1 en BUNNY_TOKEN_SLEUTEL. De speler vraagt dan
   * eerst een tijdelijke, ondertekende link aan /api/vsl-bron.
   */
  ondertekenen: process.env.NEXT_PUBLIC_HUB_VSL_TOKEN === "1",
  /** Stilstaand beeld voor je op play drukt (1920 × 1080). */
  affiche: "/hub/vsl/affiche.jpg",
  /** Woord voor woord, met tijden. `null` = geen ondertitels. */
  ondertitels: "/hub/vsl/ondertitels.json" as string | null,
  /**
   * De balk "liegt": getoond = 1 − (1 − echt)^sterkte. Bij 2 (zoals Shadowboys)
   * staat de balk halverwege de video al op 75 %. Bij 1 klopt hij gewoon.
   */
  balkSterkte: 2,
  /** Pas vanaf zoveel seconden vragen we "Wil je verder kijken?". */
  verderVanaf: 15,
  /** Om de zoveel seconden onthouden we waar je zit. */
  bewaarElke: 5,
};
