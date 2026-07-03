"use client";

import { useProductSearch } from "../hooks/useProductSearch";
import { PRODUCTS } from "../constants";
import CatalogTitle from "./CatalogTitle";
import ProductSearch from "./ProductSearch";
import ProductGrid from "./ProductGrid";
import CatalogCta from "./CatalogCta";

export default function CatalogSection() {
  const { searchTerm, setSearchTerm, filteredProducts } = useProductSearch({
    products: PRODUCTS,
  });

  return (
    <section
      id="catalogo"
      className="py-16 px-4 w-full bg-white flex flex-col items-center relative overflow-hidden"
    >
      <CatalogTitle />
      <ProductSearch value={searchTerm} onChange={setSearchTerm} />
      <ProductGrid products={filteredProducts} />
      <CatalogCta />

      <div className="absolute bottom-[-50px] left-[-100px] w-full max-w-[800px] h-[300px] opacity-30 z-0 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full text-lilian-purple"
          fill="currentColor"
        >
          <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}
