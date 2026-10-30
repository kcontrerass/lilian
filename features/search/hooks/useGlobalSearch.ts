"use client";

import { useEffect, useMemo, useState, startTransition } from "react";
import { SEARCH_INDEX } from "../lib/buildSearchIndex";
import { SEARCH_RESULT_ORDER } from "../constants";
import { SearchResult, SearchResultType } from "../types";
import { fetchProducts } from "@/features/shop/lib/wooStore";
import { SHOP_ROUTES } from "@/features/shop/constants";
import { decodeHtmlEntities, stripHtml } from "@/features/shop/lib/formatPrice";

interface UseGlobalSearchResult {
  query: string;
  setQuery: (value: string) => void;
  clearQuery: () => void;
  results: SearchResult[];
  groupedResults: Partial<Record<SearchResultType, SearchResult[]>>;
  hasQuery: boolean;
  hasResults: boolean;
  productsLoading: boolean;
}

function matchesQuery(result: SearchResult, term: string): boolean {
  if (result.title.toLowerCase().includes(term)) {
    return true;
  }
  return Boolean(result.subtitle?.toLowerCase().includes(term));
}

let cachedProductResults: SearchResult[] | null = null;
let productFetchPromise: Promise<SearchResult[]> | null = null;

async function loadShopProducts(): Promise<SearchResult[]> {
  if (cachedProductResults) return cachedProductResults;
  if (!productFetchPromise) {
    productFetchPromise = fetchProducts({ perPage: 100 })
      .then((products) => {
        const mapped = products.map((product) => ({
          id: `woo-product-${product.id}`,
          type: "product" as const,
          title: decodeHtmlEntities(product.name),
          subtitle:
            stripHtml(product.short_description || product.description).slice(
              0,
              80,
            ) || "Tienda",
          href: SHOP_ROUTES.product(product.slug),
        }));
        cachedProductResults = mapped;
        return mapped;
      })
      .catch(() => {
        productFetchPromise = null;
        return [] as SearchResult[];
      });
  }
  return productFetchPromise;
}

export function useGlobalSearch(): UseGlobalSearchResult {
  const [query, setQuery] = useState("");
  const [productResults, setProductResults] = useState<SearchResult[]>(
    () => cachedProductResults ?? [],
  );
  const [productsReady, setProductsReady] = useState(
    () => cachedProductResults !== null,
  );

  useEffect(() => {
    if (cachedProductResults) return;
    let cancelled = false;
    startTransition(() => {
      void loadShopProducts().then((items) => {
        if (cancelled) return;
        startTransition(() => {
          setProductResults(items);
          setProductsReady(true);
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;
  const productsLoading = !productsReady;

  const index = useMemo(
    () => [...SEARCH_INDEX, ...productResults],
    [productResults],
  );

  const results = useMemo(() => {
    if (!hasQuery) {
      return [];
    }
    const term = trimmed.toLowerCase();
    return index.filter((result) => matchesQuery(result, term));
  }, [hasQuery, trimmed, index]);

  const groupedResults = useMemo(() => {
    const groups: Partial<Record<SearchResultType, SearchResult[]>> = {};
    for (const type of SEARCH_RESULT_ORDER) {
      const items = results.filter((result) => result.type === type);
      if (items.length > 0) {
        groups[type] = items;
      }
    }
    return groups;
  }, [results]);

  return {
    query,
    setQuery,
    clearQuery: () => setQuery(""),
    results,
    groupedResults,
    hasQuery,
    hasResults: results.length > 0,
    productsLoading,
  };
}
