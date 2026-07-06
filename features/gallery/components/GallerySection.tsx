import GalleryGrid from "./GalleryGrid";
import ScallopedBadge from "@/components/ScallopedBadge";
import LilianSticker from "@/components/LilianSticker";

export default function GallerySection() {
  return (
    <section
      id="galeria"
      className="relative py-16 lg:py-24 px-0 w-full bg-white flex flex-col items-center overflow-hidden"
    >
      {/* Background light-purple blob (top-left) */}
      <div
        className="absolute -top-16 -left-16 lg:-top-24 lg:-left-24 w-60 h-60 lg:w-96 lg:h-96 bg-lilian-purple/5 pointer-events-none z-0"
        style={{
          borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%",
        }}
      />

      {/* Grid container wrapper to bound absolute-positioned stickers */}
      <div className="relative w-full z-10">
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
          className="absolute -bottom-8 -left-6 lg:-bottom-12 lg:-left-8 z-20 drop-shadow-md hidden sm:block"
        />
        <ScallopedBadge
          size={80}
          outerColor="#e9c468"
          innerColor="#ef6f28"
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

