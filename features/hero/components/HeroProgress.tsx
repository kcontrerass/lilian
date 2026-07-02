import { useRef } from "react";
import { getHeroPanelId, getHeroTabId } from "../constants";

type HeroProgressProps = {
  total: number;
  activeIndex: number;
  progress: number;
  onSelect: (index: number) => void;
};

export default function HeroProgress({
  total,
  activeIndex,
  progress,
  onSelect,
}: HeroProgressProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusAndSelect = (index: number) => {
    const nextIndex = (index + total) % total;
    onSelect(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAndSelect(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAndSelect(index - 1);
    }
  };

  return (
    <div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[1130px] z-20"
      role="tablist"
      aria-label="Controles del carrusel"
    >
      <div className="flex gap-3">
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === activeIndex;
          const width = isActive ? `${progress}%` : "0%";

          return (
            <button
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              id={getHeroTabId(index)}
              role="tab"
              aria-selected={isActive}
              aria-controls={getHeroPanelId(index)}
              aria-label={`Ir al slide ${index + 1}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="flex-1 h-[13px] bg-white/50 backdrop-blur-md rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-lilian-orange"
            >
              <div
                className="h-full bg-lilian-orange rounded-full"
                style={{ width }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
