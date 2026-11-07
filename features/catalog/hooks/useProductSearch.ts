import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "../types";
import { includesFolded } from "@/lib/normalizeText";

interface UseProductSearchOptions {
  products: Product[];
}

interface UseProductSearchResult {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredProducts: Product[];
  hasResults: boolean;
}

export function useProductSearch({
  products,
}: UseProductSearchOptions): UseProductSearchResult {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchTerm = searchParams.get("search") || "";

  const setSearchTerm = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => includesFolded(product.name, searchTerm));
  }, [products, searchTerm]);

  const hasResults = filteredProducts.length > 0;

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    hasResults,
  };
}
