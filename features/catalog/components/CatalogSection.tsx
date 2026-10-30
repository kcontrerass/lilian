"use client";

import { useEffect, useState, startTransition } from "react";
import { CATEGORY_COLORS, SHOP_ROUTES, SHOP_TEXTS } from "@/features/shop/constants";
import { fetchProducts, WooStoreError } from "@/features/shop/lib/wooStore";
import { decodeHtmlEntities } from "@/features/shop/lib/formatPrice";
import type { Product } from "../types";
import { CATALOG_TEXTS } from "../constants";
import CatalogTitle from "./CatalogTitle";
import ProductGrid from "./ProductGrid";
import LoadMoreButton from "./LoadMoreButton";

const HOME_PRODUCT_LIMIT = 8;

function toCatalogProduct(
  product: Awaited<ReturnType<typeof fetchProducts>>[number],
  index: number,
): Product {
  return {
    id: product.id,
    name: decodeHtmlEntities(product.name),
    image: product.images[0]?.src || "",
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    href: SHOP_ROUTES.product(product.slug),
  };
}

export default function CatalogSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    startTransition(() => {
      void (async () => {
        try {
          const next = await fetchProducts({ perPage: HOME_PRODUCT_LIMIT });
          if (cancelled) return;
          setProducts(
            next.slice(0, HOME_PRODUCT_LIMIT).map(toCatalogProduct),
          );
          setError(null);
        } catch (err) {
          if (cancelled) return;
          setError(
            err instanceof WooStoreError ? err.message : SHOP_TEXTS.errorLoad,
          );
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="catalogo"
      className="py-16 px-4 w-full bg-white flex flex-col items-center relative overflow-hidden"
    >
      <CatalogTitle />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto w-full z-10 px-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[24px] bg-[#F8F9FA] animate-pulse aspect-[0.85]"
            />
          ))}
        </div>
      ) : null}

      {!loading && error ? (
        <div className="col-span-full text-center py-8 text-lilian-pink font-gotham z-10">
          {error}
        </div>
      ) : null}

      {!loading && !error ? (
        <ProductGrid
          products={
            products.length > 0
              ? products
              : []
          }
        />
      ) : null}

      {!loading && !error && products.length === 0 ? (
        <p className="text-center py-8 text-lilian-purple/70 font-gotham z-10">
          {CATALOG_TEXTS.noResults}
        </p>
      ) : null}

      {!loading && !error && products.length > 0 ? <LoadMoreButton /> : null}
    </section>
  );
}
