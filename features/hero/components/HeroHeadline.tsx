import { HeadlineSegment } from "../types";

type HeroHeadlineProps = {
  lines: HeadlineSegment[][];
};

export default function HeroHeadline({ lines }: HeroHeadlineProps) {
  return (
    <h1 className="text-[36px] md:text-[64px] lg:text-[73px] text-lilian-purple tracking-normal font-chronica font-bold text-center leading-[1.15]">
      {lines.map((segments, lineIndex) => (
        <span key={lineIndex} className="block">
          {segments.map((segment, index) =>
            segment.highlight ? (
              <span
                key={index}
                className="font-owl-cute font-normal text-[50px] md:text-[80px] lg:text-[93px] text-lilian-orange align-middle"
              >
                {segment.text}
              </span>
            ) : (
              <span key={index} className="align-middle">
                {segment.text}
              </span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
