import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroBackground from "./HeroBackground";
import HeroHeadline from "./HeroHeadline";
import { HeroSlideData } from "../types";
import { getHeroPanelId, getHeroTabId } from "../constants";

type HeroSlideProps = {
  slide: HeroSlideData;
  index: number;
  isActive: boolean;
  isFirst: boolean;
};

function HeroSlide({ slide, index, isActive, isFirst }: HeroSlideProps) {
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
          priority={isFirst}
        />
      </div>

      {slide.foregroundImage && (
        <div className="absolute inset-x-0 bottom-0 h-[38%] md:h-[36%] lg:h-[34%] z-[1] pointer-events-none">
          <div className="relative w-full h-full max-w-[1440px] mx-auto">
            <Image
              src={slide.foregroundImage.src}
              alt={slide.foregroundImage.alt}
              fill
              priority={isFirst}
              className="object-contain object-bottom"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-8 text-center pt-[195px] md:pt-[200px] lg:pt-[210px]">
        <HeroHeadline lines={slide.headline} />

        <Link
          href={slide.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white px-8 py-4 rounded-full font-chronica text-[18px] md:text-[20px] uppercase flex items-center gap-3 hover:scale-105 transition-transform shadow-md"
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.155793 0.00242139C4.01169 -0.00403548 7.86754 0.00242139 11.7234 0.0217881C14.3515 0.401632 16.0587 1.85415 16.845 4.3793C17.3478 6.88199 16.6273 8.95423 14.6834 10.596C14.0532 11.0449 13.3651 11.3806 12.6192 11.6031C12.2326 11.6844 11.8431 11.7489 11.4507 11.7968C9.47738 11.8161 7.50404 11.8226 5.53062 11.8161C5.26897 12.823 5.00284 13.83 4.73219 14.8373C4.4953 15.4216 4.07334 15.8024 3.46637 15.98C2.37953 16.0121 1.29545 16.0056 0.214215 15.9606C0.126785 15.8297 0.100818 15.6876 0.136319 15.5345C0.83701 12.8516 1.53806 10.1661 2.23951 7.47798C2.27196 7.44572 2.30444 7.41341 2.33688 7.38115C5.32291 7.36825 8.3089 7.35531 11.2949 7.34242C12.3581 7.05521 12.754 6.37737 12.4828 5.30891C12.2657 4.87331 11.9217 4.59575 11.4507 4.47614C8.64646 4.46324 5.8422 4.4503 3.03795 4.4374C2.20555 4.418 1.45257 4.1727 0.778961 3.70147C0.366331 3.30038 0.113168 2.81622 0.019475 2.24896C-0.00649166 1.55176 -0.00649166 0.854558 0.019475 0.157355C0.0730519 0.110678 0.118493 0.0590342 0.155793 0.00242139Z"
              fill="currentColor"
            />
          </svg>
          {slide.cta.label}
        </Link>
      </div>
    </div>
  );
}

export default memo(HeroSlide);
