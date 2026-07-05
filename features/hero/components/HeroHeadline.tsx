import { HeadlineSegment, HeadlineSegmentColor } from "../types";

type HeroHeadlineProps = {
  lines: HeadlineSegment[][];
  align?: "center" | "left";
};

const SEGMENT_COLOR_CLASS: Record<HeadlineSegmentColor, string> = {
  orange: "text-lilian-orange",
  teal: "text-lilian-teal",
};

export default function HeroHeadline({ lines, align = "center" }: HeroHeadlineProps) {
  return (
    <h1
      className={`text-[5.8cqh] md:text-[8.2cqh] lg:text-[8.7cqh] text-lilian-purple tracking-normal font-chronica font-bold ${
        align === "left" ? "leading-[0.95] text-left" : "leading-[0.8] text-center"
      }`}
    >
      {lines.map((segments, lineIndex) => (
        <span key={lineIndex} className="block">
          {segments.map((segment, index) =>
            segment.highlight ? (
              <span
                key={index}
                className={`font-owl-cute font-normal text-[8.1cqh] md:text-[10.3cqh] lg:text-[11.1cqh] align-middle ${
                  SEGMENT_COLOR_CLASS[segment.color ?? "orange"]
                }`}
              >
                {segment.text}
              </span>
            ) : (
              <span
                key={index}
                className={`align-middle ${segment.color ? SEGMENT_COLOR_CLASS[segment.color] : ""}`}
              >
                {segment.text}
              </span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
