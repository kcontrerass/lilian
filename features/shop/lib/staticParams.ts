import { fetchCategories, fetchProducts } from "./wooStore";

export async function getProductStaticParams(): Promise<{ slug: string }[]> {
  try {
    const products = await fetchProducts({ perPage: 100 });
    return products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
}

export async function getCategoryStaticParams(): Promise<{ slug: string }[]> {
  try {
    const categories = await fetchCategories();
    return categories
      .filter((category) => category.count > 0)
      .map((category) => ({ slug: category.slug }));
  } catch {
    return [];
  }
}
