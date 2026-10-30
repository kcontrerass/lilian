import type { StorePrices } from "../types";
import { SHOP_TEXTS } from "../constants";
import {
  discountPercent,
  formatMinorAmount,
  formatProductPrice,
  isOnSale,
} from "../lib/formatPrice";

interface ProductPriceProps {
  prices: StorePrices;
  /** Larger type for product detail */
  size?: "sm" | "lg";
  className?: string;
  showBadge?: boolean;
}

export default function ProductPrice({
  prices,
  size = "sm",
  className = "",
  showBadge = true,
}: ProductPriceProps) {
  const sale = isOnSale(prices);
  const pct = discountPercent(prices);
  const range = prices.price_range;
  const hasRange = Boolean(
    range && range.min_amount !== range.max_amount,
  );

  const currentClass =
    size === "lg"
      ? "font-chronica text-2xl font-bold text-lilian-orange"
      : "font-chronica font-bold text-sm text-lilian-orange";
  const regularClass =
    size === "lg"
      ? "font-chronica text-base font-semibold text-lilian-purple/45 line-through"
      : "font-chronica text-xs font-semibold text-lilian-purple/45 line-through";

  if (!sale || hasRange) {
    return (
      <span className={`inline-flex flex-wrap items-center gap-1.5 ${className}`}>
        <span className={currentClass}>{formatProductPrice(prices)}</span>
        {sale && showBadge ? (
          <span className="rounded-full bg-lilian-pink/15 text-lilian-pink px-2 py-0.5 text-[10px] font-chronica font-bold uppercase tracking-wide">
            {SHOP_TEXTS.onSaleBadge}
            {pct != null ? ` −${pct}%` : ""}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}
    >
      <span className={regularClass}>
        {formatMinorAmount(prices.regular_price, prices)}
      </span>
      <span className={currentClass}>
        {formatMinorAmount(prices.sale_price || prices.price, prices)}
      </span>
      {showBadge && pct != null ? (
        <span className="rounded-full bg-lilian-pink/15 text-lilian-pink px-2 py-0.5 text-[10px] font-chronica font-bold uppercase tracking-wide">
          −{pct}%
        </span>
      ) : showBadge ? (
        <span className="rounded-full bg-lilian-pink/15 text-lilian-pink px-2 py-0.5 text-[10px] font-chronica font-bold uppercase tracking-wide">
          {SHOP_TEXTS.onSaleBadge}
        </span>
      ) : null}
    </span>
  );
}
