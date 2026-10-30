import Image from "next/image";
import { CATALOG_IMAGES, CATALOG_TEXTS } from "../constants";

export default function CatalogTitle() {
  return (
    <div className="relative flex flex-col items-center mb-10 sm:mb-12 text-center w-full max-w-[1440px] px-4">
      <div className="relative flex items-center justify-center w-full min-h-[4.5rem] sm:min-h-[5.5rem]">
        <Image
          src={CATALOG_IMAGES.leafLeft}
          alt=""
          width={336}
          height={109}
          className="hidden sm:block w-[100px] md:w-[160px] lg:w-[220px] h-auto object-contain absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
          sizes="(max-width: 768px) 100px, (max-width: 1024px) 160px, 220px"
        />

        <h2 className="font-chronica text-lilian-purple text-[24px] sm:text-[34px] md:text-[42px] lg:text-[50px] font-bold leading-[1.1] px-2 sm:px-28 md:px-40 lg:px-56">
          {CATALOG_TEXTS.titleLine1}
          <br />
          <span className="font-owl-cute text-lilian-orange text-[30px] sm:text-[44px] md:text-[54px] lg:text-[64px] inline-block align-middle mx-1">
            {CATALOG_TEXTS.highlightedWord}
          </span>
          {CATALOG_TEXTS.titleLine2Suffix}
        </h2>

        <Image
          src={CATALOG_IMAGES.leafRight}
          alt=""
          width={345}
          height={109}
          className="hidden sm:block w-[100px] md:w-[160px] lg:w-[220px] h-auto object-contain absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
          sizes="(max-width: 768px) 100px, (max-width: 1024px) 160px, 220px"
        />
      </div>
    </div>
  );
}
