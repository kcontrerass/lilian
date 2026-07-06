import Image from "next/image";
import { Product } from "../types";
import { CATALOG_TEXTS } from "../constants";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative w-full flex flex-col bg-[#F8F9FA] rounded-[24px] shadow-[0_22px_45px_rgba(0,0,0,0.15)] p-2 pb-4 overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
      <div className={`w-full aspect-[1.15] relative rounded-[16px] ${product.color}`}>
        {/* Dots pattern */}
        <div
          className="absolute inset-0 opacity-20 rounded-[16px]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0",
          }}
        />
        {/* Darker bottom strip */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] lg:w-[65%] h-[25%] bg-black/15 z-0" />

        {/* Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain drop-shadow-xl scale-[1.55] sm:scale-[1.75] origin-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </div>

      <div className="w-full flex flex-col justify-between pt-4 px-2 flex-grow">
        <h3 className="font-gotham font-bold uppercase text-[12px] sm:text-[13px] text-lilian-purple tracking-wide line-clamp-2">
          {product.name}
        </h3>

        <div className="flex justify-end w-full mt-2">
          <span className="font-gotham font-bold text-[11px] sm:text-[12px] text-lilian-purple border-b-2 border-lilian-teal/60 pb-0.5">
            {CATALOG_TEXTS.buyHere}
          </span>
        </div>
      </div>
    </div>
  );
}
