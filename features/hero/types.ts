export type BackgroundType = "image" | "video";

export type HeadlineSegment = {
  text: string;
  highlight: boolean;
};

export type HeroSlideData = {
  id: string;
  background: {
    type: BackgroundType;
    src: string;
    poster?: string;
    alt: string;
    overlay?: boolean;
  };
  foregroundImage?: {
    src: string;
    alt: string;
  };
  headline: HeadlineSegment[][];
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
