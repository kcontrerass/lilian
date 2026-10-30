"use client";

import { useEffect, useState, startTransition } from "react";
import type { StoreCategory, StoreProduct } from "../types";
import { fetchCategories, fetchProducts, WooStoreError } from "../lib/wooStore";

function sortCategories(categories: StoreCategory[]): StoreCategory[] {
  return categories
    .filter((cat) => cat.count > 0)
    .toSorted((a, b) => a.name.localeCompare(b.name, "es"));
}

export function useShopCatalog(options?: {
  categoryId?: number | null;
  categorySlug?: string | null;
}) {
  const categoryId = options?.categoryId ?? null;
  const categorySlug = options?.categorySlug ?? null;
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [resolvedCategory, setResolvedCategory] = useState<StoreCategory | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    startTransition(() => {
      void (async () => {
        setLoading(true);
        setError(null);
        try {
          const nextCategories = await fetchCategories();
          if (cancelled) return;

          const sorted = sortCategories(nextCategories);
          setCategories(sorted);

          const matched =
            (categoryId != null
              ? sorted.find((cat) => cat.id === categoryId)
              : null) ??
            (categorySlug
              ? sorted.find((cat) => cat.slug === categorySlug)
              : null) ??
            null;

          if ((categoryId != null || categorySlug) && !matched) {
            setResolvedCategory(null);
            setProducts([]);
            setError("Categoría no encontrada.");
            return;
          }

          setResolvedCategory(matched);

          const nextProducts = await fetchProducts({
            category: matched?.id ?? null,
          });
          if (cancelled) return;
          setProducts(nextProducts);
        } catch (err) {
          if (cancelled) return;
          setError(
            err instanceof WooStoreError
              ? err.message
              : "No pudimos cargar los productos.",
          );
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    });

    return () => {
      cancelled = true;
    };
  }, [categoryId, categorySlug]);

  return {
    products,
    categories,
    categoryId: resolvedCategory?.id ?? categoryId,
    categoryName: resolvedCategory?.name ?? null,
    selectedSlug: resolvedCategory?.slug ?? categorySlug,
    loading,
    error,
  };
}
