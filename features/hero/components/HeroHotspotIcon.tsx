import { HotspotIconName } from "../types";

type HeroHotspotIconProps = {
  name: HotspotIconName;
  className?: string;
};

export default function HeroHotspotIcon({ name, className }: HeroHotspotIconProps) {
  if (name === "cake") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M4 20v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
        <path d="M2.5 20h19" />
        <path d="M4 16c1 .9 2 .9 3 0s2-.9 3 0 2 .9 3 0 2-.9 3 0 2 .9 3 0" />
        <path d="M7 13v-2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" />
        <path d="M12 10V5.5" />
        <circle cx="12" cy="4" r="1.3" />
      </svg>
    );
  }

  return null;
}
