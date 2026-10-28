"use client";

/**
 * De VSL bovenaan de hub: de video die ook op de Skool-pagina van de lesreeks
 * staat. Eerst alleen de thumbnail met een afspeelknop; YouTube laadt pas na
 * een klik (sneller, en geen YouTube-cookies zolang niemand klikt). Daarna de
 * nocookie-variant van de speler.
 */

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { HUB } from "./copy";

export const VSL_ID = "IukO_isk2gA";

export function Vsl({ onPlay }: { onPlay?: () => void }) {
  const [speelt, setSpeelt] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#14234F] shadow-[0_24px_60px_-28px_rgba(26,45,99,0.6)]">
      {speelt ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VSL_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={HUB.vslTitel}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setSpeelt(true);
            onPlay?.();
          }}
          className="group absolute inset-0 h-full w-full"
          aria-label={HUB.vslAfspelen}
        >
          <Image
            src={`https://i.ytimg.com/vi/${VSL_ID}/maxresdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover transition-opacity duration-200 group-hover:opacity-90"
            priority
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20">
              <Play className="ml-1 h-7 w-7 fill-[#1A2D63] text-[#1A2D63] sm:h-8 sm:w-8" aria-hidden="true" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
