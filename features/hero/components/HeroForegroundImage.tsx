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
        <div className="absolute -left-[32.3cqh] bottom-[-3.8cqh] sm:-left-[64.7cqh] sm:bottom-[-7.6cqh] md:-left-[66cqh] md:bottom-[-7.7cqh] lg:-left-[70.8cqh] lg:bottom-[-8.3cqh] z-[1] pointer-events-none h-[64.5cqh] sm:h-[129.4cqh] md:h-[132.1cqh] lg:h-[141.7cqh] aspect-square">
          <Image
            src={foregroundImage.left.src}
            alt={foregroundImage.left.alt}
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 640px) 400px, (max-width: 1024px) 1030px, 1190px"
          />
        </div>
        <div className="absolute -right-[32.3cqh] top-0 sm:-right-[64.7cqh] md:-right-[66cqh] lg:-right-[70.8cqh] z-[1] pointer-events-none h-[64.5cqh] sm:h-[129.4cqh] md:h-[132.1cqh] lg:h-[141.7cqh] aspect-square">
          <Image
            src={foregroundImage.right.src}
            alt={foregroundImage.right.alt}
            fill
            priority
            className="object-contain object-top"
            sizes="(max-width: 640px) 400px, (max-width: 1024px) 1030px, 1190px"
          />
        </div>
      </>
    );
  }

  if (foregroundImage.fit === "compact") {
    return (
      <div className="absolute inset-x-0 sm:inset-x-auto sm:right-0 bottom-0 sm:bottom-[-11cqh] md:bottom-[-6.9cqh] lg:bottom-[-5cqh] xl:bottom-[-5.75cqh] z-[1] pointer-events-none w-full sm:w-auto sm:h-[47.1cqh] md:h-[47.4cqh] lg:h-[50cqh] xl:h-[57.5cqh] aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-contain object-bottom"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 750px, (max-width: 1024px) 866px, 983px"
        />
      </div>
    );
  }

  if (foregroundImage.fit === "cover") {
    return (
      <div className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none w-full xl:w-[85%] xl:mx-auto aspect-[1920/820]">
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
