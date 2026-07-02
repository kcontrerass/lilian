import Link from "next/link";
import HeroBackground from "./HeroBackground";
import HeroHeadline from "./HeroHeadline";
import HeroSliderProgress from "./HeroSliderProgress";
import { HERO_TEXTS } from "../constants";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[840px] flex flex-col items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center justify-center mt-32 text-center">
        <HeroHeadline />

        <Link
          href="#"
          className="mt-8 bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white px-8 py-4 rounded-full font-chronica text-[20px] uppercase flex items-center gap-3 hover:scale-105 transition-transform"
        >
          <span className="w-4 h-4 block bg-white rounded-sm" />
          {HERO_TEXTS.cta}
        </Link>
      </div>

      <HeroSliderProgress />
    </section>
  );
}
