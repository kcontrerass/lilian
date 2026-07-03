import Image from "next/image";
import HeroVideo from "./HeroVideo";
import { HeroSlideData } from "../types";

type HeroBackgroundProps = {
  background: HeroSlideData["background"];
  isActive: boolean;
  priority: boolean;
};

const OVERLAY_CLASS: Record<"teal" | "gray", string> = {
  teal: "bg-lilian-teal-light/95",
  gray: "bg-slate-100/90",
};

export default function HeroBackground({
  background,
  isActive,
  priority,
}: HeroBackgroundProps) {
  if (background.type === "video") {
    return (
      <>
        <HeroVideo
          src={background.src}
          poster={background.poster}
          isActive={isActive}
        />
        <div
          className="absolute inset-0 bg-linear-to-br from-white/95 via-white/75 to-white/10 backdrop-blur-xl mask-linear-135 mask-linear-from-20% mask-linear-to-95%"
          aria-hidden="true"
        />
      </>
    );
  }

  if (background.type === "color") {
    return (
      <div
        className="absolute inset-0"
        style={{ backgroundColor: background.color }}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <Image
        src={background.src}
        alt={background.alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="100vw"
      />
      {background.overlay && (
        <div
          className={`absolute inset-0 ${OVERLAY_CLASS[background.overlay]}`}
          aria-hidden="true"
        />
      )}
    </>
  );
}
