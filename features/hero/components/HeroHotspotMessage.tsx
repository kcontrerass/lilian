import HeroHotspotIcon from "./HeroHotspotIcon";
import { HotspotDirection, HotspotIconName } from "../types";

type HeroHotspotMessageProps = {
  id: string;
  isOpen: boolean;
  direction: HotspotDirection;
  icon: HotspotIconName;
  label: string;
};

const POSITION_CLASSES: Record<HotspotDirection, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
  left: "right-full top-1/2 -translate-y-1/2 mr-3",
  right: "left-full top-1/2 -translate-y-1/2 ml-3",
};

const TAIL_POSITION_CLASSES: Record<HotspotDirection, string> = {
  top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
  bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
  left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
  right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
};

export default function HeroHotspotMessage({
  id,
  isOpen,
  direction,
  icon,
  label,
}: HeroHotspotMessageProps) {
  return (
    <div
      id={id}
      role="tooltip"
      className={`absolute z-10 flex items-center gap-1.5 whitespace-nowrap rounded-2xl bg-lilian-teal-light px-3 py-2 shadow-md transition-all duration-200 ${POSITION_CLASSES[direction]} ${
        isOpen ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
      }`}
    >
      <span
        className={`absolute size-3 rotate-45 bg-lilian-teal-light ${TAIL_POSITION_CLASSES[direction]}`}
        aria-hidden="true"
      />
      <HeroHotspotIcon name={icon} className="relative size-3.5 md:size-4 text-lilian-purple" />
      <span className="relative font-chronica font-bold uppercase tracking-wide text-[11px] md:text-xs text-lilian-purple">
        {label}
      </span>
    </div>
  );
}
