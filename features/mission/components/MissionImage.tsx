import Image from "next/image";
import { MISSION_IMAGES } from "../constants";

export default function MissionImage() {
  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-[1.05] max-w-[650px] mx-auto lg:mx-0">
      <div className="relative w-full h-full rounded-2xl lg:rounded-[20px] overflow-hidden">
        <Image
          src={MISSION_IMAGES.main}
          alt="Panadería Lilian sucursal"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-24 sm:w-32 lg:w-[140px] h-[58px] sm:h-[78px] lg:h-[86px]">
        <Image
          src={MISSION_IMAGES.whiteLogo}
          alt="Lilian Logo"
          fill
          className="object-contain object-left"
          sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 140px"
        />
      </div>

      <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-10 lg:-right-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-[160px] lg:h-[160px] z-20">
        <Image
          src={MISSION_IMAGES.sticker}
          alt="Sticker Lilian"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 140px"
        />
      </div>
    </div>
  );
}
