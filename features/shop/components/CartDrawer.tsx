"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SHOP_ROUTES, SHOP_TEXTS } from "../constants";
import {
  decodeHtmlEntities,
  formatMinorAmount,
  isOnSale,
} from "../lib/formatPrice";
import { formatCartVariation } from "../lib/variations";
import { useCart } from "../context/CartContext";
import CartItemImage from "./CartItemImage";

export default function CartDrawer() {
  const {
    cart,
    drawerOpen,
    closeDrawer,
    mutating,
    error,
    setItemQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  const items = cart?.items ?? [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[120] flex justify-end" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-lilian-purple/40 backdrop-blur-sm cursor-pointer"
        aria-label={SHOP_TEXTS.cartCloseLabel}
        onClick={closeDrawer}
      />

      <aside className="relative z-10 w-full max-w-md h-full bg-[linear-gradient(180deg,#f7f1e4_0%,#fdfbf7_40%,#ffffff_100%)] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-5 border-b border-lilian-purple/10 bg-white/40 backdrop-blur-sm">
          <div>
            <h2 className="font-chronica font-bold text-xl text-lilian-purple">
              {SHOP_TEXTS.cartTitle}
            </h2>
            <p className="font-gotham text-xs text-lilian-purple/55 mt-0.5">
              {itemCount} {itemCount === 1 ? "artículo" : "artículos"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lilian-purple/70 hover:bg-lilian-purple/5 transition-colors cursor-pointer"
            aria-label={SHOP_TEXTS.cartCloseLabel}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-gotham text-sm text-lilian-purple/65 max-w-xs mx-auto">
                {SHOP_TEXTS.cartEmpty}
              </p>
              <button
                type="button"
                onClick={closeDrawer}
                className="mt-6 text-sm font-chronica font-semibold text-lilian-orange hover:underline cursor-pointer"
              >
                {SHOP_TEXTS.cartContinue}
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex gap-3 rounded-2xl bg-white border border-lilian-purple/8 p-3"
                >
                  <CartItemImage item={item} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-chronica font-bold text-sm text-lilian-purple truncate">
                          {decodeHtmlEntities(item.name)}
                        </h3>
                        {formatCartVariation(item.variation) ? (
                          <p className="text-[11px] font-gotham text-lilian-purple/55 mt-0.5">
                            {formatCartVariation(item.variation)}
                          </p>
                        ) : null}
                      </div>
                      <div className="text-right shrink-0">
                        {isOnSale(item.prices) ? (
                          <p className="text-[11px] font-chronica font-semibold text-lilian-purple/40 line-through">
                            {formatMinorAmount(
                              Number(item.prices.regular_price) * item.quantity,
                              item.prices,
                            )}
                          </p>
                        ) : null}
                        <p className="font-chronica font-bold text-sm text-lilian-orange">
                          {formatMinorAmount(
                            item.totals.line_total,
                            item.totals,
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full border border-lilian-purple/15 overflow-hidden">
                        <button
                          type="button"
                          disabled={mutating}
                          aria-label="Disminuir cantidad"
                          onClick={() => void setItemQuantity(item.key, item.quantity - 1)}
                          className="w-8 h-8 text-lilian-purple hover:bg-lilian-purple/5 disabled:opacity-50 cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-chronica font-bold text-lilian-purple">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={mutating}
                          aria-label="Aumentar cantidad"
                          onClick={() => void setItemQuantity(item.key, item.quantity + 1)}
                          className="w-8 h-8 text-lilian-purple hover:bg-lilian-purple/5 disabled:opacity-50 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        disabled={mutating}
                        onClick={() => void removeItem(item.key)}
                        className="text-xs font-chronica font-semibold text-lilian-pink hover:underline disabled:opacity-50 cursor-pointer"
                      >
                        {SHOP_TEXTS.removeItem}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && cart ? (
          <div className="border-t border-lilian-purple/10 px-5 py-4 bg-white/80 backdrop-blur-sm space-y-3">
            {error ? (
              <p className="text-xs font-gotham text-lilian-pink" role="alert">
                {error}
              </p>
            ) : null}
            <div className="flex justify-between font-chronica font-bold text-base text-lilian-purple">
              <span>{SHOP_TEXTS.total}</span>
              <span className="text-lilian-orange">
                {formatMinorAmount(cart.totals.total_price, cart.totals)}
              </span>
            </div>
            <Link
              href={SHOP_ROUTES.cart}
              onClick={closeDrawer}
              className="block w-full text-center py-3 rounded-full border border-lilian-purple/20 text-lilian-purple font-chronica font-bold text-sm hover:bg-lilian-purple/5 transition-colors"
            >
              {SHOP_TEXTS.miniCartView}
            </Link>
            <Link
              href={SHOP_ROUTES.checkout}
              onClick={closeDrawer}
              className="block w-full text-center py-3.5 rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-bold text-sm shadow-lg hover:brightness-105 transition-all"
            >
              {SHOP_TEXTS.cartCheckout}
            </Link>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
