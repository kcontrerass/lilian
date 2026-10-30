import type { Metadata } from "next";
import CategorySection from "@/features/shop/components/CategorySection";
import { getCategoryStaticParams } from "@/features/shop/lib/staticParams";

export async function generateStaticParams() {
  return getCategoryStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return {
    title: `${title} - Tienda Lilian`,
    description: `Productos de ${title} en Panadería y Pastelería Lilian.`,
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CategorySection slug={slug} />;
}
