import { Product } from "../types";
import { CATALOG_TEXTS } from "../constants";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto w-full z-10 px-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-lilian-purple/70 font-gotham">
          {CATALOG_TEXTS.noResults}
        </div>
      )}
    </div>
  );
}
