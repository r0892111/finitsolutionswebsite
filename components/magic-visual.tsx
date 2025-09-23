import Image from "next/image";

/**
 * MagicVisual is engineered to the bitmap used in the codebase:
 * /about-image.png with intrinsic size ~818x768 (w x h).
 * All overlays are drawn in the same coordinate system (viewBox 0 0 818 768)
 * so they sit exactly on top of the existing network lines and hubs.
 */
export default function MagicVisual() {
  return (
    <div className="relative w-[320px] md:w-[640px] aspect-[818/768] select-none">
      {/* Base artwork */}
      <Image
        src="/about-image.png"
        alt="Connected data infrastructure"
        width={818}
        height={768}
        className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
        draggable={false}
        priority
        unoptimized
      />
    </div>
  );
}