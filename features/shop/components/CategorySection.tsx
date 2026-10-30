"use client";

import ShopSection from "./ShopSection";

export default function CategorySection({ slug }: { slug: string }) {
  return <ShopSection categorySlug={slug} />;
}
