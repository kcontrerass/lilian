"use client";

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
import ShopPageShell from "./ShopPageShell";

export default function CartPageContent() {
  const { cart, loading, mutating, error, setItemQuantity, removeItem } =
    useCart();
  const items = cart?.items ?? [];

  return (
    <ShopPageShell breadcrumbs={[{ label: SHOP_TEXTS.breadcrumbCart }]}>
      <div className="shop-fade-up mb-8">
        <h1 className="font-chronica text-3xl sm:text-4xl font-bold text-lilian-purple mb-2">
          {SHOP_TEXTS.cartPageTitle}
        </h1>
        <p className="font-gotham text-sm text-lilian-purple/70">
          {SHOP_TEXTS.cartPageSubtitle}
        </p>
      </div>

      {loading ? (
        <div className="rounded-[28px] shop-panel animate-pulse h-48" />
      ) : null}

      {!loading && items.length === 0 ? (
        <div className="text-center py-16 rounded-[28px] shop-panel max-w-lg mx-auto shop-fade-up">
          <p className="font-gotham text-sm text-lilian-purple/70 mb-6">
            {SHOP_TEXTS.cartEmpty}
          </p>
          <Link
            href={SHOP_ROUTES.shop}
            className="inline-flex py-3 px-6 rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-bold text-sm shadow-md"
          >
            {SHOP_TEXTS.cartContinue}
          </Link>
        </div>
      ) : null}

      {!loading && items.length > 0 && cart ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start shop-fade-up shop-fade-up-delay-1">
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li
                key={item.key}
                className="flex gap-4 rounded-[24px] shop-panel p-4 sm:p-5"
              >
                <CartItemImage item={item} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-chronica font-bold text-base text-lilian-purple">
                        {decodeHtmlEntities(item.name)}
                      </h2>
                      {formatCartVariation(item.variation) ? (
                        <p className="text-xs font-gotham text-lilian-purple/55 mt-1">
                          {formatCartVariation(item.variation)}
                        </p>
                      ) : null}
                    </div>
                    <div className="text-right shrink-0">
                      {isOnSale(item.prices) ? (
                        <p className="text-xs font-chronica font-semibold text-lilian-purple/40 line-through">
                          {formatMinorAmount(
                            Number(item.prices.regular_price) * item.quantity,
                            item.prices,
                          )}
                        </p>
                      ) : null}
                      <p className="font-chronica font-bold text-lilian-orange">
                        {formatMinorAmount(
                          item.totals.line_total,
                          item.totals,
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-lilian-purple/15 overflow-hidden">
                      <button
                        type="button"
                        disabled={mutating}
                        onClick={() => void setItemQuantity(item.key, item.quantity - 1)}
                        className="w-9 h-9 text-lilian-purple hover:bg-lilian-purple/5 disabled:opacity-50 cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-9 text-center font-chronica font-bold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        disabled={mutating}
                        onClick={() => void setItemQuantity(item.key, item.quantity + 1)}
                        className="w-9 h-9 text-lilian-purple hover:bg-lilian-purple/5 disabled:opacity-50 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      disabled={mutating}
                      onClick={() => void removeItem(item.key)}
                      className="text-sm font-chronica font-semibold text-lilian-pink hover:underline cursor-pointer"
                    >
                      {SHOP_TEXTS.removeItem}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="rounded-[28px] shop-panel p-6 space-y-3 sticky top-24">
            <h2 className="font-chronica font-bold text-lg text-lilian-purple mb-2">
              {SHOP_TEXTS.orderSummary}
            </h2>
            {error ? (
              <p className="text-xs text-lilian-pink" role="alert">
                {error}
              </p>
            ) : null}
            <div className="flex justify-between text-sm text-lilian-purple/70">
              <span>{SHOP_TEXTS.subtotal}</span>
              <span>{formatMinorAmount(cart.totals.total_items, cart.totals)}</span>
            </div>
            <div className="flex justify-between text-sm text-lilian-purple/70">
              <span>{SHOP_TEXTS.shipping}</span>
              <span>
                {formatMinorAmount(cart.totals.total_shipping, cart.totals)}
              </span>
            </div>
            <div className="flex justify-between font-chronica font-bold text-lg text-lilian-purple pt-2 border-t border-lilian-purple/10">
              <span>{SHOP_TEXTS.total}</span>
              <span className="text-lilian-orange">
                {formatMinorAmount(cart.totals.total_price, cart.totals)}
              </span>
            </div>
            <Link
              href={SHOP_ROUTES.checkout}
              className="block w-full text-center mt-4 py-3.5 rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-bold text-sm shadow-lg"
            >
              {SHOP_TEXTS.cartCheckout}
            </Link>
            <Link
              href={SHOP_ROUTES.shop}
              className="block w-full text-center py-2 text-sm font-chronica font-semibold text-lilian-purple/60 hover:text-lilian-orange"
            >
              {SHOP_TEXTS.cartContinue}
            </Link>
          </aside>
        </div>
      ) : null}
    </ShopPageShell>
  );
}
