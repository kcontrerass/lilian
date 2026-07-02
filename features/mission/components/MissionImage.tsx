import Image from "next/image";
import { MISSION_IMAGES } from "../constants";

export default function MissionImage() {
  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-[1.1] max-w-[650px] mx-auto lg:mx-0">
      <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl">
        <Image
          src={MISSION_IMAGES.main}
          alt="Panadería Lilian sucursal"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-[120px] h-[120px] opacity-70">
        <Image src={MISSION_IMAGES.dots} alt="" fill className="object-cover" />
      </div>

      <div className="absolute bottom-6 left-6 w-[120px] sm:w-[150px] h-[50px]">
        <Image
          src={MISSION_IMAGES.whiteLogo}
          alt="Lilian Logo"
          fill
          className="object-contain object-left"
        />
      </div>

      <div className="absolute top-[-20px] right-[-20px] sm:top-[-30px] sm:right-[-30px] w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] z-20">
        <Image
          src={MISSION_IMAGES.sticker}
          alt="Sticker Lilian"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
