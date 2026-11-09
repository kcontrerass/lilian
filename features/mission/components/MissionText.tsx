import { MISSION_TEXTS } from "../constants";

export default function MissionText() {
  return (
    <div className="mx-auto flex max-w-[540px] flex-col items-center text-center">
      <div className="mb-6 lg:mb-8">
        <h2 className="font-chronica text-[32px] font-bold leading-[1.05] tracking-tight sm:text-[42px] lg:text-[48px]">
          <span className="text-lilian-orange">{MISSION_TEXTS.titleBefore}</span>
          <span className="mx-1 inline-block align-middle font-owl-cute text-[40px] text-lilian-teal sm:text-[50px] lg:text-[56px]">
            {MISSION_TEXTS.highlightedWord}
          </span>
          <span className="text-lilian-orange">{MISSION_TEXTS.titleAfter}</span>
          <br />
          <span className="text-lilian-orange">{MISSION_TEXTS.subtitle}</span>
        </h2>
      </div>

      <div className="flex flex-col gap-5 text-[15px] font-gotham leading-relaxed text-lilian-purple sm:text-base">
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
