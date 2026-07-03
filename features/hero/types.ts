export type BackgroundType = "image" | "video" | "color";

export type HeadlineSegmentColor = "orange" | "teal";

export type HeadlineSegment = {
  text: string;
  highlight: boolean;
  color?: HeadlineSegmentColor;
};

export type HeroBackground =
  | { type: "image"; src: string; alt: string; overlay?: boolean }
  | { type: "video"; src: string; alt: string; poster?: string }
  | { type: "color"; color: string };

export type HeroSlideData = {
  id: string;
  background: HeroBackground;
  foregroundImage?: {
    src: string;
    alt: string;
    /** "contain" (default) shows the full image inside a fixed-height box; "cover" anchors it to the bottom edge, cropping excess height. */
    fit?: "contain" | "cover";
  };
  headline: HeadlineSegment[][];
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
