import type { VslInstelling } from "@/components/hub/video";

/**
 * De VSL van de cursus op /cursus/: dezelfde video als op Skool ("Wat is deze
 * lessenreeks?", 6:38, master VSL_motion_4K.mp4 op de externe schijf, map
 * 1_Skool/2_VSL). Dezelfde speler als de hub (components/hub/vsl-speler.tsx).
 *
 * Een nieuwe versie = de HLS-link van Bunny Stream (bibliotheek finit-vsl) in
 * `bron` zetten (of de Netlify-variabele NEXT_PUBLIC_CURSUS_VSL_BRON), het `id`
 * ophogen en de ondertitels opnieuw maken met scripts/hub/ondertitels.mjs.
 */
export const CURSUS_VSL: VslInstelling = {
  /** Eigen naam in de kijkmeting: de cijfers op /hub/cijfers/ tonen de cursus als aparte video. */
  id: "cursus-v1",
  // Bunny Stream, bibliotheek finit-vsl (zelfde als de hub), opgeladen door Alex op 25/11.
  bron: process.env.NEXT_PUBLIC_CURSUS_VSL_BRON || "https://vz-a3aedf8d-709.b-cdn.net/81fa6f6c-0111-4992-baad-733fbb4bd222/playlist.m3u8",
  ondertekenen: process.env.NEXT_PUBLIC_HUB_VSL_TOKEN === "1",
  affiche: "/cursus/affiche.jpg",
  // Op deze plek vindt ook de cijferpagina ze terug (ondertitels-<video-id>.json).
  ondertitels: "/hub/vsl/ondertitels-cursus-v1.json",
  balkSterkte: 2,
  verderVanaf: 15,
  bewaarElke: 5,
};
