import Image from "next/image";
import MissionImage from "./MissionImage";
import MissionText from "./MissionText";
import { MISSION_IMAGES } from "../constants";

export default function MissionSection() {
  return (
    <section className="relative w-full py-24 flex flex-col items-center overflow-hidden">
      <div className="absolute top-0 right-[-100px] w-[50%] h-full z-0 opacity-40 pointer-events-none">
        <Image
          src={MISSION_IMAGES.backgroundShape}
          alt=""
          fill
          className="object-cover object-left"
        />
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        <MissionImage />
        <MissionText />
      </div>
    </section>
  );
}
