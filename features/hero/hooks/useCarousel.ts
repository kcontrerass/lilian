"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CarouselConfig } from "../types";

export function useCarousel(totalSlides: number, config: CarouselConfig) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    progressRef.current = 0;
    setProgress(0);
    lastTimeRef.current = null;
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => {
      const next = current + 1;
      if (next >= totalSlides) {
        return config.loop ? 0 : current;
      }
      return next;
    });
    progressRef.current = 0;
    setProgress(0);
    lastTimeRef.current = null;
  }, [totalSlides, config.loop]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => {
      const prev = current - 1;
      if (prev < 0) {
        return config.loop ? totalSlides - 1 : current;
      }
      return prev;
    });
    progressRef.current = 0;
    setProgress(0);
    lastTimeRef.current = null;
  }, [totalSlides, config.loop]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => {
    lastTimeRef.current = null;
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (!config.autoplay || isPaused || totalSlides <= 1) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      return;
    }

    const tick = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      progressRef.current += delta;
      const progressPercent = Math.min(
        (progressRef.current / config.interval) * 100,
        100
      );
      setProgress(progressPercent);

      if (progressRef.current >= config.interval) {
        goToNext();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [config.autoplay, config.interval, isPaused, totalSlides, goToNext]);

  return {
    activeIndex,
    progress,
    isPaused,
    goToSlide,
    goToNext,
    goToPrevious,
    pause,
    resume,
  };
}
