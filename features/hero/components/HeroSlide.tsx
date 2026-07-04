import { memo } from "react";
import CtaButton from "@/components/CtaButton";
import HeroBackground from "./HeroBackground";
import HeroEyebrow from "./HeroEyebrow";
import HeroForegroundImage from "./HeroForegroundImage";
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

      {slide.foregroundImage && (
        <HeroForegroundImage foregroundImage={slide.foregroundImage} />
      )}

      <div
        className={`relative z-10 flex flex-col px-4 sm:px-8 ${
          slide.align === "left"
            ? "h-full justify-center items-start text-left md:pl-24 lg:pl-32"
            : "pt-[195px] md:pt-[200px] lg:pt-[210px] items-center text-center"
        }`}
      >
        {slide.eyebrow && <HeroEyebrow text={slide.eyebrow} />}
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
