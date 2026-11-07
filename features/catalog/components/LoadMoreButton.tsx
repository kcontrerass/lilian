import Link from "next/link";
import { CTA } from "@/lib/constants";
import { CATALOG_TEXTS } from "../constants";

export default function LoadMoreButton() {
  return (
    <div className="mt-16 text-center w-full relative z-10">
      <Link
        href={CTA.href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-lilian-purple text-white px-8 py-3.5 rounded-[100px] font-gotham font-medium text-[15px] hover:bg-lilian-purple-light transition-colors inline-flex items-center justify-center gap-2 shadow-md"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 3h7v7" />
          <path d="M10 14 21 3" />
          <path d="M21 14v7H3V3h7" />
        </svg>
        {CATALOG_TEXTS.loadMore}
      </Link>
    </div>
  );
}
