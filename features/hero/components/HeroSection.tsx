"use client";

import HeroSlide from "./HeroSlide";
import HeroProgress from "./HeroProgress";
import HeroArrows from "./HeroArrows";
import { useCarousel } from "../hooks/useCarousel";
import { useSwipe } from "../hooks/useSwipe";
import { HERO_CAROUSEL_CONFIG, HERO_SLIDES } from "../constants";

export default function HeroSection() {
  const { activeIndex, progress, goToSlide, goToNext, goToPrevious, pause, resume } =
    useCarousel(HERO_SLIDES.length, HERO_CAROUSEL_CONFIG);

  const swipeHandlers = useSwipe(goToNext, goToPrevious);

  return (
    <section
      className="relative w-full h-dvh min-h-[620px] sm:min-h-[680px] md:min-h-[780px] lg:min-h-[840px] overflow-hidden @container-size"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Hero principal"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      {...swipeHandlers}
    >
      {HERO_SLIDES.map((slide, index) => (
        <HeroSlide
          key={slide.id}
          slide={slide}
          index={index}
          isActive={index === activeIndex}
        />
      ))}

      <HeroArrows onPrevious={goToPrevious} onNext={goToNext} />

      <HeroProgress
        total={HERO_SLIDES.length}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={goToSlide}
      />
    </section>
  );
}
