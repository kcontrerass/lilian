import Image from "next/image";
import HeroVideo from "./HeroVideo";
import { HeroSlideData } from "../types";

type HeroBackgroundProps = {
  background: HeroSlideData["background"];
  isActive: boolean;
  priority: boolean;
};

export default function HeroBackground({
  background,
  isActive,
  priority,
}: HeroBackgroundProps) {
  if (background.type === "video") {
    return (
      <HeroVideo
        src={background.src}
        poster={background.poster}
        isActive={isActive}
      />
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
          className="absolute inset-0 bg-lilian-teal-light/95"
          aria-hidden="true"
        />
      )}
    </>
  );
}
