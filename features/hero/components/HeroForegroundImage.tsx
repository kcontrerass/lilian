import Image from "next/image";
import { HeroSlideData } from "../types";

type HeroForegroundImageProps = {
  foregroundImage: NonNullable<HeroSlideData["foregroundImage"]>;
};

export default function HeroForegroundImage({
  foregroundImage,
}: HeroForegroundImageProps) {
  if (foregroundImage.fit === "dual") {
    return (
      <>
        <div className="absolute -left-[45.2cqh] bottom-0 sm:-left-[51.5cqh] md:-left-[52.6cqh] lg:-left-[56.5cqh] z-[1] pointer-events-none h-[90.3cqh] sm:h-[102.9cqh] md:h-[105.1cqh] lg:h-[113.1cqh] aspect-square">
          <Image
            src={foregroundImage.left.src}
            alt={foregroundImage.left.alt}
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 640px) 560px, (max-width: 1024px) 820px, 950px"
          />
        </div>
        <div className="absolute -right-[45.2cqh] top-0 sm:-right-[51.5cqh] md:-right-[52.6cqh] lg:-right-[56.5cqh] z-[1] pointer-events-none h-[90.3cqh] sm:h-[102.9cqh] md:h-[105.1cqh] lg:h-[113.1cqh] aspect-square">
          <Image
            src={foregroundImage.right.src}
            alt={foregroundImage.right.alt}
            fill
            priority
            className="object-contain object-top"
            sizes="(max-width: 640px) 560px, (max-width: 1024px) 820px, 950px"
          />
        </div>
      </>
    );
  }

  if (foregroundImage.fit === "compact") {
    return (
      <div className="absolute right-0 bottom-[-4.2cqh] sm:bottom-[-11cqh] md:bottom-[-6.9cqh] lg:bottom-[-5cqh] z-[1] pointer-events-none h-[45.2cqh] sm:h-[47.1cqh] md:h-[47.4cqh] lg:h-[50cqh] aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-contain object-bottom"
          sizes="(max-width: 640px) 655px, (max-width: 768px) 750px, (max-width: 1024px) 866px, 983px"
        />
      </div>
    );
  }

  if (foregroundImage.fit === "cover") {
    return (
      <div className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none w-full aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-cover object-bottom"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 z-[1] pointer-events-none flex justify-center top-[52.4cqh] sm:top-[52.5cqh] md:top-[52.4cqh] lg:top-[52.9cqh]">
      <div className="relative h-[85cqh] aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-contain object-top"
          sizes="(max-width: 768px) 130vw, 110vw"
        />
      </div>
    </div>
  );
}
