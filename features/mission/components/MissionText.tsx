import { MISSION_TEXTS } from "../constants";

export default function MissionText() {
  const { title, highlightedWord, subtitle } = MISSION_TEXTS;
  const [before, after] = title.split(highlightedWord);

  return (
    <div className="flex flex-col text-left max-w-[600px] mx-auto lg:mx-0">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="font-chronica text-[40px] sm:text-[50px] md:text-[60px] leading-[1.1] uppercase font-bold">
          <span className="text-lilian-orange">{before}</span>
          <span className="font-owl-cute text-lilian-teal text-[50px] sm:text-[65px] md:text-[75px] normal-case lowercase inline-block -mb-2">
            {highlightedWord}
          </span>
          <span className="text-lilian-orange">{after}</span>
          <br />
          <span className="text-lilian-orange">{subtitle}</span>
        </h2>
      </div>

      <div className="text-lilian-purple font-gotham text-[16px] md:text-[18px] leading-relaxed flex flex-col gap-8 text-center lg:text-left">
        <p>
          <span className="font-bold">{MISSION_TEXTS.missionLabel}</span>{" "}
          {MISSION_TEXTS.missionText}
        </p>
        <p>
          <span className="font-bold">{MISSION_TEXTS.visionLabel}</span>{" "}
          {MISSION_TEXTS.visionText}
        </p>
      </div>
    </div>
  );
}
