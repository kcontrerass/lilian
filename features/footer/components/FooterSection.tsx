import Image from "next/image";
import { FOOTER_IMAGES, FOOTER_TEXTS } from "../constants";

export default function FooterSection() {
  const phoneHref = FOOTER_TEXTS.phone.replace(/\s+/g, "");

  return (
    <footer className="relative w-full bg-transparent px-3 pb-3 pt-0 sm:px-4 sm:pb-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-4 -top-8 z-20 h-28 w-28 rounded-[45%_55%_60%_40%/55%_45%_55%_45%] bg-lilian-beige sm:-left-6 sm:-top-10 sm:h-36 sm:w-36 lg:-left-8 lg:-top-12 lg:h-40 lg:w-40"
      >
        <svg
          viewBox="0 0 100 40"
          className="absolute left-1/2 top-[38%] w-2/3 -translate-x-1/2"
          fill="none"
        >
          <path
            d="M0 20 Q 12 5 24 20 T 48 20 T 72 20 T 96 20"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden rounded-[2rem] bg-lilian-orange-dark text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute left-10 top-14 bottom-14 hidden w-24 lg:block"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "22px 22px",
            opacity: 0.35,
          }}
        />

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[36%] lg:block">
          <Image
            src={FOOTER_IMAGES.main}
            alt="Producto Lilian"
            fill
            className="object-contain object-bottom"
            sizes="36vw"
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 pt-10 pb-8 sm:px-8 sm:pt-12 lg:grid-cols-[0.9fr_0.75fr_1.15fr] lg:gap-10 lg:px-12 lg:pt-14">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[300px] sm:max-w-[360px] lg:hidden">
            <Image
              src={FOOTER_IMAGES.main}
              alt="Producto Lilian"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 640px) 90vw, 360px"
            />
          </div>

          <div className="space-y-2 text-center lg:col-start-2 lg:text-left">
            <p className="font-chronica text-[13px] font-bold uppercase tracking-[0.16em] text-white">
              {FOOTER_TEXTS.scheduleTitle}
            </p>
            <p className="font-chronica text-base font-bold leading-snug text-white sm:text-lg">
              {FOOTER_TEXTS.scheduleDays}
              <br />
              {FOOTER_TEXTS.scheduleHours}
            </p>
            <a
              href={`tel:${phoneHref}`}
              className="inline-flex items-center gap-2 text-base font-bold text-white underline underline-offset-4 hover:text-white/85 sm:text-lg"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {FOOTER_TEXTS.phone}
            </a>
          </div>

          <div className="space-y-4 text-center lg:col-start-3 lg:text-left">
            <h2 className="font-chronica text-[2.4rem] font-bold leading-[1.05] sm:text-[3rem] lg:text-[3.75rem]">
              {FOOTER_TEXTS.titleBefore}
              <span className="font-owl-cute text-lilian-purple text-[2.6rem] font-normal align-middle sm:text-[3.3rem] lg:text-[4.2rem]">
                {FOOTER_TEXTS.highlightedWord}
              </span>
              {FOOTER_TEXTS.titleAfter}
            </h2>
            <p className="font-gotham max-w-[46ch] text-sm leading-relaxed text-white/90 sm:text-base">
              {FOOTER_TEXTS.taglineSupportBefore}
              <span className="font-bold text-white">
                {FOOTER_TEXTS.taglineSupportBold}
              </span>
              {FOOTER_TEXTS.taglineSupportAfter}
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 pb-6 pt-6 text-center text-xs text-white/70 sm:justify-start sm:px-8 sm:text-left lg:px-12 lg:pb-8">
          <span className="font-bold text-white">{FOOTER_TEXTS.poweredBy}</span>
          <span>
            {FOOTER_TEXTS.copyrightLabel}{" "}
            <strong className="font-bold text-white">
              {FOOTER_TEXTS.copyrightYear}
            </strong>
          </span>
        </div>
      </section>
    </footer>
  );
}
