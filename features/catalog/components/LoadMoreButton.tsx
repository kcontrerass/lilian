import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { CATALOG_TEXTS } from "../constants";

export default function LoadMoreButton() {
  return (
    <div className="mt-16 text-center w-full relative z-10">
      <Link
        href={NAV_LINKS.shop.href}
        className="bg-lilian-purple text-white px-8 py-3.5 rounded-[100px] font-gotham font-medium text-[15px] hover:bg-lilian-purple-light transition-colors inline-flex items-center justify-center shadow-md"
      >
        {CATALOG_TEXTS.loadMore}
      </Link>
    </div>
  );
}
