import type { StorePrices, CartTotals, CartItemTotals, ShippingRate } from "../types";

type PriceLike = Pick<
  StorePrices | CartTotals | CartItemTotals | ShippingRate,
  | "currency_minor_unit"
  | "currency_prefix"
  | "currency_suffix"
  | "currency_symbol"
> & { price?: string };

export function formatMinorAmount(
  amount: string | number,
  prices: PriceLike,
): string {
  const minor = typeof amount === "string" ? Number(amount) : amount;
  if (Number.isNaN(minor)) return `${prices.currency_prefix}—`;

  const units = prices.currency_minor_unit ?? 2;
  const value = minor / 10 ** units;
  const formatted = value.toLocaleString("es-MX", {
    minimumFractionDigits: units,
    maximumFractionDigits: units,
  });

  return `${prices.currency_prefix || prices.currency_symbol || "$"}${formatted}${prices.currency_suffix || ""}`;
}

export function formatProductPrice(prices: StorePrices): string {
  const range = prices.price_range;
  if (range && range.min_amount !== range.max_amount) {
    return `${formatMinorAmount(range.min_amount, prices)} – ${formatMinorAmount(range.max_amount, prices)}`;
  }
  return formatMinorAmount(prices.price, prices);
}

/** True when Woo marks a lower sale price than regular (minor units as strings). */
export function isOnSale(prices: Pick<StorePrices, "price" | "regular_price" | "sale_price">): boolean {
  const regular = Number(prices.regular_price);
  const sale = Number(prices.sale_price || prices.price);
  if (Number.isNaN(regular) || Number.isNaN(sale)) return false;
  return sale < regular;
}

export function discountPercent(
  prices: Pick<StorePrices, "price" | "regular_price" | "sale_price">,
): number | null {
  if (!isOnSale(prices)) return null;
  const regular = Number(prices.regular_price);
  const sale = Number(prices.sale_price || prices.price);
  if (regular <= 0) return null;
  return Math.round(((regular - sale) / regular) * 100);
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'");
}
