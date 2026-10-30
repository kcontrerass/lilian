"use client";

import Link from "next/link";
import { SHOP_ROUTES, SHOP_TEXTS } from "../constants";
import { useShopCatalog } from "../hooks/useShopCatalog";
import CategoryTabs from "./CategoryTabs";
import ShopProductCard from "./ShopProductCard";
import ShopPageShell from "./ShopPageShell";

interface ShopSectionProps {
  categoryId?: number | null;
  categorySlug?: string | null;
  categoryName?: string | null;
}

export default function ShopSection({
  categoryId = null,
  categorySlug = null,
  categoryName = null,
}: ShopSectionProps) {
  const {
    products,
    categories,
    selectedSlug,
    categoryName: resolvedName,
    loading,
    error,
  } = useShopCatalog({
    categoryId,
    categorySlug,
  });

  const titleName = categoryName ?? resolvedName;
  const breadcrumbs = titleName ? [{ label: titleName }] : [];

  return (
    <ShopPageShell breadcrumbs={breadcrumbs}>
      <header className="shop-panel rounded-[28px] sm:rounded-[32px] px-5 py-7 sm:px-8 sm:py-9 mb-8 sm:mb-10 relative overflow-hidden shop-fade-up">
        <div
          className="absolute -right-10 -top-16 w-56 h-56 rounded-full bg-lilian-orange/15 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute -left-8 bottom-0 w-40 h-40 rounded-full bg-lilian-teal/20 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative max-w-2xl">
          <span className="inline-block text-[11px] uppercase tracking-[0.18em] font-chronica font-bold text-lilian-orange bg-lilian-orange/10 px-3.5 py-1.5 rounded-full mb-4">
            {SHOP_TEXTS.badge}
          </span>
          <h1 className="font-chronica text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-lilian-purple leading-[1.05] mb-3">
            {titleName ? (
              <span className="font-owl-cute text-lilian-orange text-[2.6rem] sm:text-5xl lg:text-6xl inline-block tracking-tight">
                {titleName}
              </span>
            ) : (
              <>
                <span>{SHOP_TEXTS.titleBefore}</span>
                <span className="font-owl-cute text-lilian-orange text-[2.6rem] sm:text-5xl lg:text-6xl inline-block mx-1.5 tracking-tight">
                  {SHOP_TEXTS.titleHighlight}
                </span>
                <span>{SHOP_TEXTS.titleAfter}</span>
              </>
            )}
          </h1>
          <p className="font-gotham text-sm sm:text-base text-lilian-purple/70 leading-relaxed max-w-xl">
            {SHOP_TEXTS.subtitle}
          </p>
        </div>
      </header>

      <CategoryTabs categories={categories} selectedSlug={selectedSlug} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[28px] bg-white/60 border border-lilian-purple/5 animate-pulse aspect-[0.82]"
              style={{ animationDelay: `${index * 40}ms` }}
            />
          ))}
        </div>
      ) : null}

      {!loading && error ? (
        <div className="text-center py-14 rounded-[28px] shop-panel max-w-lg mx-auto px-6 shop-fade-up">
          <p className="font-gotham text-sm text-lilian-pink">{error}</p>
          <p className="font-gotham text-xs text-lilian-purple/50 mt-2">
            {SHOP_TEXTS.errorLoad}
          </p>
          <Link
            href={SHOP_ROUTES.shop}
            className="inline-block mt-4 font-chronica font-semibold text-lilian-orange"
          >
            {SHOP_TEXTS.backToShop}
          </Link>
        </div>
      ) : null}

      {!loading && !error && products.length === 0 ? (
        <div className="text-center py-14 rounded-[28px] shop-panel max-w-lg mx-auto shop-fade-up">
          <p className="font-gotham text-sm text-lilian-purple/70">
            {SHOP_TEXTS.empty}
          </p>
        </div>
      ) : null}

      {!loading && !error && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 shop-fade-up shop-fade-up-delay-3">
          {products.map((product, index) => (
            <ShopProductCard
              key={product.id}
              product={product}
              colorIndex={index}
            />
          ))}
        </div>
      ) : null}
    </ShopPageShell>
  );
}
