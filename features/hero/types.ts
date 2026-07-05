export type BackgroundType = "image" | "video" | "color";

export type HeadlineSegmentColor = "orange" | "teal";

export type HeadlineSegment = {
  text: string;
  highlight: boolean;
  color?: HeadlineSegmentColor;
};

export type HeroBackground =
  | { type: "image"; src: string; alt: string; overlay?: "teal" | "gray" }
  | { type: "video"; src: string; alt: string; poster?: string }
  | { type: "color"; color: string };

export type HeroSlideData = {
  id: string;
  background: HeroBackground;
  foregroundImage?:
    | {
        src: string;
        alt: string;
        /** "contain" (default) shows the full image inside a fixed-height box; "cover" anchors it full-width to the bottom edge; "compact" shows it uncropped in a smaller box anchored to the bottom-right corner, so it always touches the right edge. */
        fit?: "contain" | "cover" | "compact";
      }
    | {
        /** "dual" shows two images anchored to the top-left and top-right corners, each bleeding off its edge. */
        fit: "dual";
        left: { src: string; alt: string };
        right: { src: string; alt: string };
      };
  /** Small uppercase label with side rules, rendered above the headline (e.g. "EST. 1979"). Omitted when not set. */
  eyebrow?: string;
  headline: HeadlineSegment[][];
  /** Optional paragraph rendered between the headline and the CTA button. */
  description?: string;
  /** Interactive markers overlaid on the slide, shown on hover (desktop) or tap (touch). */
  hotspots?: HotspotData[];
  /** "center" (default) or "left" text/CTA alignment. */
  align?: "center" | "left";
  cta: {
    label: string;
    href: string;
  };
};

export type CarouselConfig = {
  autoplay: boolean;
  interval: number;
  loop: boolean;
};

export type HotspotDirection = "top" | "bottom" | "left" | "right";
export type HotspotIconName = "cake";

export type HotspotData = {
  id: string;
  /**
   * Full responsive Tailwind classes for the `top` position, e.g.
   * `"top-[84%] sm:top-[72%] md:top-[67%] lg:top-[62%] xl:top-[58%]"`.
   * The foreground image reflows drastically across breakpoints (full-width/bottom-anchored
   * on mobile vs. right-anchored/height-scaled on sm+), so a single percentage pair can't
   * track it — each breakpoint needs its own value, same as `HeroForegroundImage`.
   */
  top: string;
  /** Full responsive Tailwind classes for the `left` position, same shape as `top`. */
  left: string;
  /** Side the message bubble opens toward, relative to the marker. Defaults to "top". */
  direction?: HotspotDirection;
  icon: HotspotIconName;
  label: string;
};
