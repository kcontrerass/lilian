"use client";

import { useProductSearch } from "../hooks/useProductSearch";
import { PRODUCTS } from "../constants";
import CatalogTitle from "./CatalogTitle";
import ProductGrid from "./ProductGrid";
import LoadMoreButton from "./LoadMoreButton";

export default function CatalogSection() {
  const { filteredProducts } = useProductSearch({
    products: PRODUCTS,
  });

  return (
    <section
      id="catalogo"
      className="py-16 px-4 w-full bg-white flex flex-col items-center relative overflow-hidden"
    >
      <CatalogTitle />
      <ProductGrid products={filteredProducts} />
      <LoadMoreButton />


    </section>
  );
}
