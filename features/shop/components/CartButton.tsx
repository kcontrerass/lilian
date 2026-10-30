"use client";

import Link from "next/link";
import { SHOP_ROUTES, SHOP_TEXTS } from "../constants";
import { useCart } from "../context/CartContext";

interface CartButtonProps {
  /** Compact icon for header; default is shop toolbar with label. */
  variant?: "default" | "header";
  /** Softer chip over home hero. */
  tone?: "solid" | "ghost";
  showLabel?: boolean;
}

export default function CartButton({
  variant = "default",
  tone = "solid",
  showLabel,
}: CartButtonProps) {
  const { cart, openDrawer } = useCart();
  const count = cart?.items.reduce((n, i) => n + i.quantity, 0) ?? 0;
  const labelVisible = showLabel ?? variant === "default";

  const iconClass =
    variant === "header"
      ? tone === "ghost"
        ? "relative inline-flex items-center justify-center w-9 h-9 xl:w-11 xl:h-11 rounded-full bg-white/20 hover:bg-white/40 text-lilian-purple transition-colors cursor-pointer"
        : "relative inline-flex items-center justify-center w-9 h-9 xl:w-11 xl:h-11 rounded-full bg-lilian-purple/5 hover:bg-lilian-purple/10 text-lilian-purple border border-lilian-purple/10 transition-colors cursor-pointer"
      : "relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/90 border border-lilian-purple/12 text-lilian-purple hover:border-lilian-orange/45 hover:text-lilian-orange shadow-sm transition-all cursor-pointer";

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={openDrawer}
        aria-label={SHOP_TEXTS.cartOpenLabel}
        className={iconClass}
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.4.4-.1 1.1.4 1.1H17M17 13v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0H7"
          />
        </svg>
        {count > 0 ? (
          <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-lilian-orange text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
            {count}
          </span>
        ) : null}
      </button>
      {labelVisible ? (
        <Link
          href={SHOP_ROUTES.cart}
          className={
            variant === "header"
              ? "bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-semibold text-[13px] xl:text-[15px] px-5 xl:px-7 py-2.5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-md"
              : "hidden sm:inline-flex py-2.5 px-5 rounded-full bg-lilian-purple text-white font-chronica font-bold text-sm shadow-[0_12px_24px_-14px_rgba(61,36,106,0.8)] hover:bg-lilian-purple-dark transition-colors"
          }
        >
          Carrito
          {count > 0 ? ` (${count})` : ""}
        </Link>
      ) : null}
    </div>
  );
}
