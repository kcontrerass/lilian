import { HERO_TEXTS } from "../constants";

export default function HeroHeadline() {
  return (
    <h1 className="flex items-center flex-wrap justify-center gap-4 text-[40px] md:text-[73px] uppercase text-lilian-purple tracking-normal font-chronica">
      <span className="font-medium">{HERO_TEXTS.headlinePrefix}</span>
      <span className="font-owl-cute text-[60px] md:text-[93px] text-lilian-orange lowercase normal-case mt-[-10px]">
        {HERO_TEXTS.highlightedWord}
      </span>
      <span className="font-medium">{HERO_TEXTS.headlineSuffix}</span>
    </h1>
  );
}
