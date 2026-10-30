import Link from "next/link";
import { SHOP_ROUTES } from "../constants";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function ShopBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-1">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-gotham text-lilian-purple/50">
        <li>
          <Link
            href={SHOP_ROUTES.shop}
            className="hover:text-lilian-orange transition-colors font-medium"
          >
            Tienda
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span className="text-lilian-purple/25" aria-hidden="true">
              /
            </span>
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-lilian-orange transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-lilian-purple font-semibold">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
