import Image from "next/image";
import { HERO_IMAGES } from "../constants";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#e7ebf0]">
      <Image
        src={HERO_IMAGES.background}
        alt="Bakery background"
        fill
        className="object-cover opacity-30"
      />
    </div>
  );
}
