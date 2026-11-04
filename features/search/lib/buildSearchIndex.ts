import { NAV_LINKS } from "@/lib/constants";
import { PRODUCTS } from "@/features/catalog/constants";
import { SearchResult } from "../types";

export function buildSearchIndex(): SearchResult[] {
  const pages: SearchResult[] = Object.values(NAV_LINKS).map((link) => ({
    id: `page-${link.href}`,
    type: "page",
    title: link.label,
    href: link.href,
  }));

  const products: SearchResult[] = PRODUCTS.map((product) => ({
    id: `product-${product.id}`,
    type: "product",
    title: product.name,
    subtitle: "Catálogo",
    href: "/#catalogo",
  }));

  return [...pages, ...products];
}

export const SEARCH_INDEX = buildSearchIndex();
