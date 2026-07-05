import { memo } from "react";
import CtaButton from "@/components/CtaButton";
import HeroBackground from "./HeroBackground";
import HeroEyebrow from "./HeroEyebrow";
import HeroForegroundImage from "./HeroForegroundImage";
import HeroHeadline from "./HeroHeadline";
import HeroHotspot from "./HeroHotspot";
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

      {slide.foregroundImage && (
        <HeroForegroundImage foregroundImage={slide.foregroundImage} />
      )}

      {slide.hotspots?.map((hotspot) => (
        <HeroHotspot key={hotspot.id} hotspot={hotspot} />
      ))}

      <div
        className={`relative z-10 flex flex-col px-4 sm:px-8 ${
          slide.align === "left"
            ? "h-full justify-center items-start text-left md:pl-24 lg:pl-32"
            : "pt-[31.5cqh] sm:pt-[29cqh] md:pt-[25.6cqh] lg:pt-[25cqh] items-center text-center"
        }`}
      >
        {slide.eyebrow && <HeroEyebrow text={slide.eyebrow} />}
        <HeroHeadline lines={slide.headline} align={slide.align} />

        {slide.description && (
          <p className="mt-[2.4cqh] sm:mt-[2.2cqh] md:mt-[1.9cqh] lg:mt-[1.7cqh] max-w-[52ch] font-chronica text-[2.4cqh] md:text-[2.6cqh] lg:text-[2.8cqh] text-lilian-purple/80">
            {slide.description}
          </p>
        )}

        <CtaButton
          href={slide.cta.href}
          label={slide.cta.label}
          external
          className="mt-[5.2cqh] sm:mt-[4.7cqh] md:mt-[4.1cqh] lg:mt-[3.8cqh]"
        />
      </div>
    </div>
  );
}

export default memo(HeroSlide);
