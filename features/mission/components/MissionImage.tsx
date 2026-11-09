import Image from "next/image";
import { MISSION_IMAGES } from "../constants";

export default function MissionImage() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] lg:mx-0">
      <div className="relative z-0 h-full w-full overflow-hidden rounded-[28px]">
        <Image
          src={MISSION_IMAGES.main}
          alt="Panadería Lilian sucursal"
          fill
          className="origin-[44%_28%] scale-[1.32] object-cover"
          sizes="(max-width: 1024px) 100vw, 560px"
          priority
        />
        <Image
          src="/assets/fondo.svg"
          alt=""
          width={163}
          height={217}
          className="pointer-events-none absolute left-4 top-1/4 z-10 h-auto w-28 o sm:left-6 sm:w-36"
        />
        <div
          className="pointer-events-none absolute -bottom-6 -right-6 z-10 h-[55%] w-[100%] rounded-full bg-[#f6c3cf]/30 blur-3xl"
          aria-hidden="true"
        />
      </div>

      <div className="absolute bottom-5 left-5 z-20 h-16 w-28 sm:bottom-6 sm:left-6 sm:h-[72px] sm:w-36">
        <Image
          src={MISSION_IMAGES.whiteLogo}
          alt="Lilian"
          fill
          className="object-contain object-left"
          sizes="144px"
        />
      </div>

      <div className="absolute -right-3 top-6 z-20 h-24 w-24 sm:-right-5 sm:top-10 sm:h-28 sm:w-28 lg:top-12 lg:h-32 lg:w-32">
        <Image
          src={MISSION_IMAGES.sticker}
          alt="Sello Lilian"
          fill
          className="object-contain"
          sizes="128px"
        />
      </div>
    </div>
  );
}
