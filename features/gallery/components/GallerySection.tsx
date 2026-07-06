import GalleryGrid from "./GalleryGrid";
import ScallopedBadge from "@/components/ScallopedBadge";
import LilianSticker from "@/components/LilianSticker";

export default function GallerySection() {
  return (
    <section
      id="galeria"
      className="relative py-5 lg:py-5 px-0 w-full bg-white flex flex-col items-center"
    >
      {/* Grid container wrapper to bound absolute-positioned stickers */}
      <div className="relative w-full z-10">
        {/* Background light-purple blob (top-left) - positioned behind (z-0) */}
        <div className="absolute -top-16 -left-16 sm:-top-24 sm:-left-24 lg:-top-32 lg:-left-32 w-48 h-40 sm:w-80 sm:h-72 lg:w-[480px] lg:h-[420px] pointer-events-none z-0 opacity-85">
          <svg
            viewBox="0 0 525.048 448.293"
            className="w-full h-full text-lilian-purple/10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M195.226 6.61977C278.068 26.6757 334.082 31.3947 385.673 14.5831C455.248 -8.1273 553.715 63.5432 517.158 150.846C489.446 217.502 478.538 209.244 492.689 286.223C500.649 328.695 454.364 400.365 385.084 439.887C353.539 457.583 286.027 454.634 248.292 357.894C210.556 261.153 178.127 258.499 116.807 244.342C75.5335 234.904 -24.1121 199.511 5.36888 97.4613C30.4277 10.7489 112.385 -13.4362 195.226 6.61977Z" />
          </svg>
        </div>

        <GalleryGrid />

        {/* --- STICKERS & DECORATIVE BADGES --- */}

        {/* 1. Top-Right Scalloped Badge (over team photo) */}
        <ScallopedBadge
          size={90}
          outerColor="#ef6f28"
          innerColor="#3d246a"
          className="absolute -top-6 -right-4 lg:-top-10 lg:-right-6 z-20 drop-shadow-md hidden sm:block"
        />
        <ScallopedBadge
          size={64}
          outerColor="#ef6f28"
          innerColor="#3d246a"
          className="absolute -top-4 -right-2 z-20 drop-shadow-md sm:hidden"
        />

        {/* 2. Bottom-Left Scalloped Badge (over left photo) */}
        <ScallopedBadge
          size={110}
          outerColor="#e9c468"
          innerColor="#ef6f28"
          variant="outline"
          className="absolute -bottom-8 -left-6 lg:-bottom-12 lg:-left-8 z-20 drop-shadow-md hidden sm:block"
        />
        <ScallopedBadge
          size={80}
          outerColor="#e9c468"
          innerColor="#ef6f28"
          variant="outline"
          className="absolute -bottom-6 -left-4 z-20 drop-shadow-md sm:hidden"
        />

        {/* 3. Center-Left Dark Blue Lilian Sticker */}
        <LilianSticker
          size={100}
          bg="#3d246a"
          fg="white"
          foldBg="#2a1a4a"
          className="absolute z-20 drop-shadow-lg transition-all duration-300 w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] lg:w-[105px] lg:h-[105px] rotate-[15deg] top-[26%] left-[48%] lg:top-[38%] lg:left-[33.3%] -translate-x-1/2 -translate-y-1/2"
        />

        {/* 4. Middle-Right Teal Lilian Sticker */}
        <LilianSticker
          size={80}
          bg="#30beb3"
          fg="white"
          foldBg="#269e95"
          className="absolute z-20 drop-shadow-lg transition-all duration-300 w-[55px] h-[55px] sm:w-[70px] sm:h-[70px] lg:w-[85px] lg:h-[85px] -rotate-[10deg] top-[58%] left-[82%] lg:top-[50%] lg:left-[83.3%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  );
}

