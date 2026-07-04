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
        <div className="absolute -left-[70px] top-[105px] sm:-left-[110px] sm:top-[140px] md:-left-[140px] md:top-[165px] lg:-left-[180px] lg:top-[200px] z-[1] pointer-events-none h-[320px] sm:h-[420px] md:h-[500px] lg:h-[600px] aspect-square">
          <Image
            src={foregroundImage.left.src}
            alt={foregroundImage.left.alt}
            fill
            priority
            className="object-contain object-top"
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 500px, 600px"
          />
        </div>
        <div className="absolute -right-[70px] top-0 sm:-right-[110px] md:-right-[140px] lg:-right-[180px] z-[1] pointer-events-none h-[320px] sm:h-[420px] md:h-[500px] lg:h-[600px] aspect-square">
          <Image
            src={foregroundImage.right.src}
            alt={foregroundImage.right.alt}
            fill
            priority
            className="object-contain object-top"
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 500px, 600px"
          />
        </div>
      </>
    );
  }

  if (foregroundImage.fit === "compact") {
    return (
      <div className="absolute right-0 bottom-[-26px] sm:bottom-[-75px] md:bottom-[-54px] lg:bottom-[-42px] z-[1] pointer-events-none h-[280px] sm:h-[320px] md:h-[370px] lg:h-[420px] aspect-[1920/820]">
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
    <div className="absolute inset-x-0 z-[1] pointer-events-none flex justify-center top-[325px] sm:top-[357px] md:top-[409px] lg:top-[444px]">
      <div className="relative h-[527px] sm:h-[578px] md:h-[663px] lg:h-[714px] aspect-[1920/820]">
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
