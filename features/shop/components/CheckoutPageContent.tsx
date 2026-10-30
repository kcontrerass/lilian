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
import CheckoutForm from "./CheckoutForm";
import ShopPageShell from "./ShopPageShell";

export default function CheckoutPageContent() {
  const { cart, loading } = useCart();
  const items = cart?.items ?? [];

  return (
    <ShopPageShell breadcrumbs={[{ label: SHOP_TEXTS.breadcrumbCheckout }]}>
      <div className="shop-fade-up mb-8">
        <h1 className="font-chronica text-3xl sm:text-4xl font-bold text-lilian-purple mb-2">
          {SHOP_TEXTS.checkoutTitle}
        </h1>
        <p className="font-gotham text-sm text-lilian-purple/70">
          {SHOP_TEXTS.checkoutSubtitle}
        </p>
      </div>

      {loading ? (
        <div className="rounded-[28px] shop-panel animate-pulse h-64" />
      ) : null}

      {!loading && items.length === 0 ? (
        <div className="text-center py-16 rounded-[28px] shop-panel max-w-lg mx-auto shop-fade-up">
          <p className="font-gotham text-sm text-lilian-purple/70 mb-6">
            {SHOP_TEXTS.checkoutEmpty}
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
          <div className="rounded-[28px] shop-panel p-5 sm:p-7">
            <CheckoutForm />
          </div>
          <aside className="rounded-[28px] shop-panel p-6 space-y-3 sticky top-24">
            <h2 className="font-chronica font-bold text-lg text-lilian-purple mb-2">
              {SHOP_TEXTS.orderSummary}
            </h2>
            <ul className="space-y-2 mb-3">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center justify-between gap-3 text-sm font-gotham text-lilian-purple/80"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <CartItemImage item={item} size="xs" />
                    <span className="truncate">
                      {decodeHtmlEntities(item.name)}
                      {formatCartVariation(item.variation)
                        ? ` (${formatCartVariation(item.variation)})`
                        : ""}{" "}
                      × {item.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 text-right font-chronica font-semibold">
                    {isOnSale(item.prices) ? (
                      <span className="mr-1.5 text-xs font-semibold text-lilian-purple/40 line-through">
                        {formatMinorAmount(
                          Number(item.prices.regular_price) * item.quantity,
                          item.prices,
                        )}
                      </span>
                    ) : null}
                    {formatMinorAmount(item.totals.line_total, item.totals)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-sm text-lilian-purple/70 pt-2 border-t border-lilian-purple/10">
              <span>{SHOP_TEXTS.subtotal}</span>
              <span>{formatMinorAmount(cart.totals.total_items, cart.totals)}</span>
            </div>
            <div className="flex justify-between text-sm text-lilian-purple/70">
              <span>{SHOP_TEXTS.shipping}</span>
              <span>
                {formatMinorAmount(cart.totals.total_shipping, cart.totals)}
              </span>
            </div>
            <div className="flex justify-between font-chronica font-bold text-lg text-lilian-purple">
              <span>{SHOP_TEXTS.total}</span>
              <span className="text-lilian-orange">
                {formatMinorAmount(cart.totals.total_price, cart.totals)}
              </span>
            </div>
          </aside>
        </div>
      ) : null}
    </ShopPageShell>
  );
}
