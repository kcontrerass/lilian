import { useMemo, useState } from "react";
import { Product } from "../types";

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const hasResults = filteredProducts.length > 0;

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    hasResults,
  };
}
