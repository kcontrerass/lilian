import Image from "next/image";
import { Product } from "../types";
import { CATALOG_TEXTS } from "../constants";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative w-full aspect-[0.9] flex flex-col bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300 border-[6px] border-white/50">
      <div className={`w-full h-[65%] relative ${product.color}`}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute inset-[-10px] sm:inset-[-20px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="w-full h-[35%] bg-white px-4 pt-3 pb-4 flex flex-col justify-between z-10">
        <h3 className="font-gotham font-bold uppercase text-[12px] sm:text-[13px] text-lilian-purple tracking-wide line-clamp-2">
          {product.name}
        </h3>

        <div className="flex justify-end w-full">
          <span className="font-gotham font-bold text-[13px] text-lilian-purple border-b-2 border-lilian-purple pb-0.5">
            {CATALOG_TEXTS.buyHere}
          </span>
        </div>
      </div>
    </div>
  );
}
