import { MISSION_TEXTS } from "../constants";

export default function MissionText() {
  return (
    <div className="flex flex-col text-center lg:text-left max-w-[600px] mx-auto lg:mx-0">
      <div className="mb-8 lg:mb-10">
        <h2 className="font-chronica text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05] font-bold tracking-tight">
          <span className="text-lilian-orange">{MISSION_TEXTS.titleBefore}</span>
          <span className="font-owl-cute text-lilian-teal text-[40px] sm:text-[52px] lg:text-[68px] inline-block align-middle mx-1 lg:mx-2">
            {MISSION_TEXTS.highlightedWord}
          </span>
          <span className="text-lilian-orange">{MISSION_TEXTS.titleAfter}</span>
          <br />
          <span className="text-lilian-orange">{MISSION_TEXTS.subtitle}</span>
        </h2>
      </div>

      <div className="text-lilian-purple font-gotham text-[15px] sm:text-base lg:text-lg leading-relaxed lg:leading-[1.7] flex flex-col gap-6 lg:gap-8">
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
