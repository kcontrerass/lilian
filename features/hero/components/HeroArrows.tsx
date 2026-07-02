import { memo } from "react";

type HeroArrowsProps = {
  onPrevious: () => void;
  onNext: () => void;
};

function HeroArrows({ onPrevious, onNext }: HeroArrowsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Slide anterior"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-lilian-purple hover:bg-white/50 hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lilian-orange"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Slide siguiente"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-lilian-purple hover:bg-white/50 hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lilian-orange"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </>
  );
}

export default memo(HeroArrows);
