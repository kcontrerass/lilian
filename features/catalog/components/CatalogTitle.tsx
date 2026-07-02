import { CATALOG_TEXTS } from "../constants";
import DecorativeArrow from "./DecorativeArrow";

export default function CatalogTitle() {
  return (
    <div className="flex flex-col items-center mb-12 text-center w-full max-w-[1440px]">
      <div className="flex items-center justify-center gap-4 sm:gap-8 w-full">
        <DecorativeArrow className="rotate-180 transform scale-y-[-1]" />

        <h2 className="font-chronica text-lilian-purple text-[32px] sm:text-[45px] md:text-[55px] font-bold leading-[1.2] whitespace-nowrap">
          {CATALOG_TEXTS.titleLine1}
          <br />
          {CATALOG_TEXTS.titleLine2Prefix}
          <span className="font-owl-cute text-lilian-orange text-[42px] sm:text-[60px] md:text-[70px] normal-case lowercase inline-block -mb-2">
            {CATALOG_TEXTS.highlightedWord}
          </span>
        </h2>

        <DecorativeArrow />
      </div>
    </div>
  );
}
