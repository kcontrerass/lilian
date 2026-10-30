"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "../types";
import { CATEGORY_COLORS, SHOP_ROUTES, SHOP_TEXTS } from "../constants";
import { decodeHtmlEntities, stripHtml } from "../lib/formatPrice";
import { isVariableProduct } from "../lib/variations";
import { prefetchProduct } from "../lib/wooStore";
import { useCart } from "../context/CartContext";
import ProductPrice from "./ProductPrice";

interface ShopProductCardProps {
  product: StoreProduct;
  colorIndex: number;
}

export default function ShopProductCard({
  product,
  colorIndex,
}: ShopProductCardProps) {
  const { addItem, mutating } = useCart();
  const [adding, setAdding] = useState(false);
  const color = CATEGORY_COLORS[colorIndex % CATEGORY_COLORS.length];
  const image = product.images[0];
  const name = decodeHtmlEntities(product.name);
  const blurb = stripHtml(product.short_description || product.description);
  const variable = isVariableProduct(product);
  const canBuy = !variable && product.is_purchasable && product.is_in_stock;
  const href = SHOP_ROUTES.product(product.slug);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await addItem(product.id, 1);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="shop-card relative w-full flex flex-col rounded-[28px] p-2.5 pb-4 overflow-hidden group">
      <Link
        href={href}
        onMouseEnter={() => prefetchProduct(product.slug)}
        onFocus={() => prefetchProduct(product.slug)}
        className={`w-full aspect-[1.12] relative rounded-[20px] overflow-hidden block ${color}`}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1.4px, transparent 1.4px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent z-[1]" />
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt || name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-owl-cute text-white/90 text-6xl sm:text-7xl drop-shadow-md select-none">
              {name.charAt(0)}
            </span>
          </div>
        )}
        {product.on_sale ? (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-lilian-pink text-white px-2.5 py-1 text-[10px] font-chronica font-bold uppercase tracking-wide shadow-md">
            {SHOP_TEXTS.onSaleBadge}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-col flex-grow pt-4 px-2.5 gap-2.5">
        <div className="flex flex-col gap-1.5">
          <Link
            href={href}
            onMouseEnter={() => prefetchProduct(product.slug)}
            onFocus={() => prefetchProduct(product.slug)}
          >
            <h3 className="font-chronica font-bold text-[15px] sm:text-base text-lilian-purple leading-snug group-hover:text-lilian-orange transition-colors">
              {name}
            </h3>
          </Link>
          <ProductPrice prices={product.prices} />
        </div>

        {blurb ? (
          <p className="font-gotham text-xs text-lilian-purple/60 line-clamp-2 leading-relaxed">
            {blurb}
          </p>
        ) : null}

        <div className="mt-auto pt-2 flex flex-col gap-2">
          {variable ? (
            <Link
              href={href}
              className="w-full text-center py-2.5 rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-bold text-sm shadow-[0_12px_24px_-12px_rgba(239,111,40,0.8)] hover:brightness-105 transition-all"
            >
              {SHOP_TEXTS.selectOptions}
            </Link>
          ) : canBuy ? (
            <button
              type="button"
              disabled={mutating || adding}
              onClick={() => void handleAdd()}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-bold text-sm shadow-[0_12px_24px_-12px_rgba(239,111,40,0.8)] hover:brightness-105 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {adding ? SHOP_TEXTS.adding : SHOP_TEXTS.addToCart}
            </button>
          ) : (
            <span className="block w-full text-center py-2.5 rounded-full bg-lilian-purple/8 text-lilian-purple/45 font-chronica font-semibold text-sm">
              {SHOP_TEXTS.outOfStock}
            </span>
          )}
          <Link
            href={href}
            className="w-full text-center py-1 text-xs font-chronica font-semibold text-lilian-purple/55 hover:text-lilian-orange transition-colors"
          >
            {SHOP_TEXTS.viewProduct}
          </Link>
        </div>
      </div>
    </article>
  );
}
