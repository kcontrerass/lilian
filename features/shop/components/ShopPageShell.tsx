import type { ReactNode } from "react";
import Image from "next/image";
import { SHOP_ASSETS } from "../constants";
import ShopBreadcrumbs, { type BreadcrumbItem } from "./ShopBreadcrumbs";

interface ShopPageShellProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function ShopPageShell({
  children,
  breadcrumbs = [],
}: ShopPageShellProps) {
  return (
    <section className="relative w-full py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[70vh] bg-[linear-gradient(180deg,#f7f1e4_0%,#fdfbf7_28%,#ffffff_62%,#f3faf9_100%)]">
      <div className="absolute inset-0 shop-grain" aria-hidden="true" />
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(1100px,140vw)] h-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,143,45,0.18),rgba(48,190,179,0.12),transparent_70%)] blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(61,36,106,0.08),transparent_65%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute top-10 left-0 hidden xl:block w-40 h-auto opacity-35 pointer-events-none animate-float-slow">
        <Image
          src={SHOP_ASSETS.leafLeft}
          alt=""
          width={336}
          height={109}
          className="w-full h-auto object-contain"
        />
      </div>
      <div
        className="absolute top-14 right-0 hidden xl:block w-40 h-auto opacity-35 pointer-events-none animate-float-slow"
        style={{ animationDelay: "1.2s" }}
      >
        <Image
          src={SHOP_ASSETS.leafRight}
          alt=""
          width={345}
          height={109}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-[1180px] w-full mx-auto relative z-10">
        {breadcrumbs.length > 0 ? (
          <div className="mb-4 sm:mb-6">
            <ShopBreadcrumbs items={breadcrumbs} />
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
