import { CATALOG_TEXTS } from "../constants";

export default function CatalogTitle() {
  return (
    <div className="flex flex-col items-center mb-12 text-center w-full max-w-[1440px]">
      <div className="flex items-center justify-center gap-4 sm:gap-8 w-full">
        <div className="w-[100px] sm:w-[150px] h-[40px] sm:h-[60px] relative hidden sm:block opacity-50">
          <svg
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#e2b18a] rotate-180 transform scale-y-[-1]"
          >
            <path
              d="M10 20 Q 30 5 50 20 T 90 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M30 13 Q 40 5 50 13 Z" fill="currentColor" />
            <path d="M60 27 Q 70 35 80 27 Z" fill="currentColor" />
            <path d="M20 25 Q 25 35 30 25 Z" fill="currentColor" />
            <path d="M70 15 Q 75 5 80 15 Z" fill="currentColor" />
          </svg>
        </div>

        <h2 className="font-chronica text-lilian-purple text-[32px] sm:text-[45px] md:text-[55px] font-bold leading-[1.2] whitespace-nowrap">
          {CATALOG_TEXTS.titleLine1}
          <br />
          {CATALOG_TEXTS.titleLine2Prefix}
          <span className="font-owl-cute text-lilian-orange text-[42px] sm:text-[60px] md:text-[70px] normal-case lowercase inline-block -mb-2">
            {CATALOG_TEXTS.highlightedWord}
          </span>
        </h2>

        <div className="w-[100px] sm:w-[150px] h-[40px] sm:h-[60px] relative hidden sm:block opacity-50">
          <svg
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#e2b18a]"
          >
            <path
              d="M10 20 Q 30 5 50 20 T 90 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M30 13 Q 40 5 50 13 Z" fill="currentColor" />
            <path d="M60 27 Q 70 35 80 27 Z" fill="currentColor" />
            <path d="M20 25 Q 25 35 30 25 Z" fill="currentColor" />
            <path d="M70 15 Q 75 5 80 15 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}
