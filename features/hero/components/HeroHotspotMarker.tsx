type HeroHotspotMarkerProps = {
  isOpen: boolean;
  label: string;
  descriptionId: string;
  onClick: () => void;
  onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerEnter: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerLeave: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export default function HeroHotspotMarker({
  isOpen,
  label,
  descriptionId,
  onClick,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
}: HeroHotspotMarkerProps) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={label}
      aria-describedby={descriptionId}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className="relative flex size-7 md:size-8 items-center justify-center"
    >
      <span
        className="absolute inset-0 rounded-full bg-white/30 blur-sm motion-safe:animate-ping"
        aria-hidden="true"
      />
      <span className="absolute inset-0.5 rounded-full bg-white/60" aria-hidden="true" />
      <span
        className={`relative size-2.5 md:size-3 rounded-full bg-lilian-teal-light transition-transform duration-200 ${
          isOpen ? "scale-125" : "scale-100"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
