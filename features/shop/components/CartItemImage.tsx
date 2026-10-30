import Image from "next/image";
import type { CartItem } from "../types";
import { decodeHtmlEntities } from "../lib/formatPrice";

interface CartItemImageProps {
  item: CartItem;
  size?: "xs" | "sm" | "md";
  className?: string;
}

const SIZE_CLASS = {
  xs: "w-12 h-12 rounded-lg",
  sm: "w-16 h-16 rounded-xl",
  md: "w-20 h-20 rounded-2xl",
} as const;

const SIZE_PX = {
  xs: "48px",
  sm: "64px",
  md: "80px",
} as const;

export default function CartItemImage({
  item,
  size = "sm",
  className = "",
}: CartItemImageProps) {
  const image = item.images?.[0];
  const src = image?.thumbnail || image?.src || "";
  const alt = image?.alt || decodeHtmlEntities(item.name);

  return (
    <div
      className={`${SIZE_CLASS[size]} relative overflow-hidden bg-lilian-purple/10 shrink-0 ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          sizes={SIZE_PX[size]}
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-owl-cute text-2xl text-lilian-purple/70">
          {decodeHtmlEntities(item.name).charAt(0)}
        </span>
      )}
    </div>
  );
}
