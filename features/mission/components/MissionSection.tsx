import Image from "next/image";
import MissionImage from "./MissionImage";
import MissionText from "./MissionText";
import Timeline from "./Timeline";
import { MISSION_IMAGES } from "../constants";

export default function MissionSection() {
  return (
    <section
      id="quienes-somos"
      className="relative w-full py-16 lg:py-24 flex flex-col items-center overflow-hidden scroll-mt-24"
    >
      {/* Anchor fallback for legacy #historia links */}
      <span id="historia" className="sr-only" aria-hidden="true" />

      <div className="absolute top-0 -right-6 sm:-right-12 lg:-right-[80px] w-[220px] sm:w-[280px] lg:w-[340px] h-auto aspect-[259/494] z-0 pointer-events-none">
        <Image
          src={MISSION_IMAGES.backgroundShape}
          alt=""
          fill
          className="object-contain object-top-right"
          sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 340px"
        />
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <MissionImage />
          <MissionText />
        </div>

        {/* Timeline (1979 a la fecha) */}
        <Timeline />
      </div>
    </section>
  );
}
