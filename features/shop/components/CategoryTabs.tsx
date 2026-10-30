"use client";

import Link from "next/link";
import type { StoreCategory } from "../types";
import { SHOP_ROUTES, SHOP_TEXTS } from "../constants";

interface CategoryTabsProps {
  categories: StoreCategory[];
  selectedSlug?: string | null;
}

export default function CategoryTabs({
  categories,
  selectedSlug = null,
}: CategoryTabsProps) {
  const tabs: { href: string; label: string; slug: string | null }[] = [
    { href: SHOP_ROUTES.shop, label: SHOP_TEXTS.allCategories, slug: null },
    ...categories.map((cat) => ({
      href: SHOP_ROUTES.category(cat.slug),
      label: cat.name,
      slug: cat.slug,
    })),
  ];

  return (
    <div className="relative mb-8 sm:mb-10 shop-fade-up shop-fade-up-delay-2">
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const isActive = tab.slug === selectedSlug;
          return (
            <Link
              key={tab.slug ?? "all"}
              href={tab.href}
              className={`shrink-0 py-2.5 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-chronica font-semibold transition-all duration-200 border ${
                isActive
                  ? "bg-lilian-purple text-white border-lilian-purple shadow-[0_10px_24px_-12px_rgba(61,36,106,0.65)]"
                  : "bg-white/70 text-lilian-purple/75 border-lilian-purple/10 hover:border-lilian-orange/35 hover:text-lilian-purple hover:bg-white"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#fdfbf7] to-transparent sm:hidden"
        aria-hidden="true"
      />
    </div>
  );
}
