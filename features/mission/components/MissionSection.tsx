import Image from "next/image";
import MissionImage from "./MissionImage";
import MissionText from "./MissionText";
import { MISSION_IMAGES } from "../constants";

export default function MissionSection() {
  return (
    <section
      id="historia"
      className="relative w-full py-16 lg:py-24 flex flex-col items-center overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[220px] sm:w-[280px] lg:w-[340px] h-auto aspect-[259/494] z-0 pointer-events-none">
        <Image
          src={MISSION_IMAGES.backgroundShape}
          alt=""
          fill
          className="object-contain object-top-right"
          sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 340px"
        />
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        <MissionImage />
        <MissionText />
      </div>
    </section>
  );
}
