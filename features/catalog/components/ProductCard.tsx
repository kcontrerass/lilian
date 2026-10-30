import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Product } from "../types";
import { CATALOG_TEXTS } from "../constants";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const href = product.href || NAV_LINKS.shop.href;
  const isRemote = /^https?:\/\//.test(product.image);

  return (
    <Link
      href={href}
      className="relative w-full flex flex-col bg-[#F8F9FA] rounded-[24px] shadow-[0_22px_45px_rgba(0,0,0,0.15)] p-2 pb-4 overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <div
        className={`w-full aspect-[1.15] relative rounded-[16px] overflow-hidden ${product.color}`}
      >
        <div
          className="absolute inset-0 opacity-20 rounded-[16px]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0",
          }}
        />

        {isRemote ? (
          <>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="font-owl-cute text-white/90 text-6xl drop-shadow-md">
                  {product.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent z-[1]" />
          </>
        ) : (
          <>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] lg:w-[65%] h-[25%] bg-black/15 z-0" />
            <div className="absolute inset-0 z-10">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-xl scale-[1.55] sm:scale-[1.75] origin-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : null}
            </div>
          </>
        )}
      </div>

      <div className="w-full flex flex-col justify-between pt-4 px-2 flex-grow gap-2">
        <h3 className="font-gotham font-bold uppercase text-[12px] sm:text-[13px] text-lilian-purple tracking-wide line-clamp-2 min-h-[2.5em]">
          {product.name}
        </h3>

        <div className="flex justify-end w-full">
          <span className="font-gotham font-bold text-[11px] sm:text-[12px] text-lilian-purple border-b-2 border-lilian-teal/60 pb-0.5 group-hover:text-lilian-orange group-hover:border-lilian-orange transition-colors">
            {CATALOG_TEXTS.buyHere}
          </span>
        </div>
      </div>
    </Link>
  );
}
