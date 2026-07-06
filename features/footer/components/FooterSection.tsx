import Image from "next/image";
import { FOOTER_IMAGES, FOOTER_TEXTS } from "../constants";

export default function FooterSection() {
  const phoneHref = FOOTER_TEXTS.phone.replace(/\s+/g, "");

  return (
    <footer className="relative w-full bg-transparent px-3 pb-3 pt-0 sm:px-4 sm:pb-4">
      <section className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-[#DF8D40] text-white">


        {/* Background pattern on the left */}
        <div className="pointer-events-none absolute left-0 top-[98px] w-[163px] h-[217px] hidden lg:block">
          <Image
            src="/assets/fondo.svg"
            alt=""
            fill
            className="object-contain object-left"
          />
        </div>

        {/* Hand holding container product image (desktop) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[40%] lg:block">
          <Image
            src={FOOTER_IMAGES.main}
            alt="Producto Lilian"
            fill
            className="object-contain object-left-bottom scale-[1.35] lg:scale-[1.5] origin-bottom-left translate-y-[12%] lg:translate-y-[16%] -translate-x-[8%] lg:-translate-x-[0%] transition-transform duration-300"
            sizes="40vw"
          />
        </div>

        {/* Card contents */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 pt-10 pb-2 sm:px-8 sm:pt-12 md:grid-cols-2 lg:grid-cols-[0.9fr_0.75fr_1.15fr] lg:gap-10 lg:px-12 lg:pt-14">
          {/* Center Column: Schedules */}
          <div className="space-y-3 text-center md:text-left lg:col-start-2 lg:text-left flex flex-col justify-center">
            <p className="font-chronica text-[14px] font-bold uppercase tracking-[0.16em] text-white">
              {FOOTER_TEXTS.scheduleTitle}
            </p>
            <div className="font-chronica text-sm sm:text-base font-medium leading-relaxed text-white space-y-1.5">
              <p>{FOOTER_TEXTS.scheduleLunesViernes}</p>
              <p>{FOOTER_TEXTS.scheduleSabado}</p>
              <p>{FOOTER_TEXTS.scheduleDomingo}</p>
            </div>

            <a
              href={`tel:${phoneHref}`}
              className="inline-flex items-center justify-center md:justify-start lg:justify-start gap-2 text-base font-bold text-white underline underline-offset-4 hover:text-white/85 sm:text-lg mt-3"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {FOOTER_TEXTS.phone}
            </a>
          </div>

          {/* Right Column: Title and Tagline */}
          <div className="space-y-4 text-center md:text-left lg:col-start-3 lg:text-left flex flex-col justify-center">
            <h2 className="font-chronica text-[2.2rem] font-bold leading-[1.1] sm:text-[2.8rem] lg:text-[3.5rem] text-white">
              Cada{" "}
              <span className="font-owl-cute text-lilian-purple text-[2.6rem] sm:text-[3.4rem] lg:text-[4.2rem] font-normal inline-block rotate-[-2deg] mx-1">
                {FOOTER_TEXTS.highlightedWord}
              </span>{" "}
              tiene
              <br />
              una historia
            </h2>
            <p className="font-gotham max-w-[46ch] text-sm leading-relaxed text-white/85 sm:text-base">
              {FOOTER_TEXTS.taglineSupport}
            </p>
          </div>
        </div>

        {/* Footer Bottom Label */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col sm:flex-row items-center justify-center  gap-y-2 gap-x-4 px-5 pb-6 pt-6 text-center text-xs text-white/50 font-gotham border-t border-white/5 mt-6 lg:px-12">
          <span>{FOOTER_TEXTS.poweredBy}</span>
          <span>
            {FOOTER_TEXTS.copyrightLabel} <strong>{FOOTER_TEXTS.copyrightYear}</strong>
          </span>
        </div>
      </section>
    </footer>
  );
}
