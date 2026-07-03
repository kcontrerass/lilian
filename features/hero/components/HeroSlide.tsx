import { memo } from "react";
import Image from "next/image";
import CtaButton from "@/components/CtaButton";
import HeroBackground from "./HeroBackground";
import HeroHeadline from "./HeroHeadline";
import { HeroSlideData } from "../types";
import { getHeroPanelId, getHeroTabId } from "../constants";

type HeroSlideProps = {
  slide: HeroSlideData;
  index: number;
  isActive: boolean;
};

function HeroSlide({ slide, index, isActive }: HeroSlideProps) {
  return (
    <div
      id={getHeroPanelId(index)}
      role="tabpanel"
      aria-labelledby={getHeroTabId(index)}
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
      aria-hidden={!isActive}
    >
      <div className="absolute inset-0">
        <HeroBackground
          background={slide.background}
          isActive={isActive}
          priority
        />
      </div>

      {slide.foregroundImage && slide.foregroundImage.fit === "cover" ? (
        <div className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none w-full aspect-[1920/820]">
          <Image
            src={slide.foregroundImage.src}
            alt={slide.foregroundImage.alt}
            fill
            priority
            className="object-cover object-bottom"
            sizes="100vw"
          />
        </div>
      ) : (
        slide.foregroundImage && (
          <div className="absolute inset-x-0 z-[1] pointer-events-none flex justify-center top-[325px] sm:top-[357px] md:top-[409px] lg:top-[444px]">
            <div className="relative h-[527px] sm:h-[578px] md:h-[663px] lg:h-[714px] aspect-[1920/820]">
              <Image
                src={slide.foregroundImage.src}
                alt={slide.foregroundImage.alt}
                fill
                priority
                className="object-contain object-top"
                sizes="(max-width: 768px) 130vw, 110vw"
              />
            </div>
          </div>
        )
      )}

      <div
        className={`relative z-10 flex flex-col px-4 sm:px-8 ${
          slide.align === "left"
            ? "h-full justify-center items-start text-left md:pl-24 lg:pl-32"
            : "pt-[195px] md:pt-[200px] lg:pt-[210px] items-center text-center"
        }`}
      >
        <HeroHeadline lines={slide.headline} align={slide.align} />

        <CtaButton
          href={slide.cta.href}
          label={slide.cta.label}
          external
          className="mt-8"
        />
      </div>
    </div>
  );
}

export default memo(HeroSlide);
