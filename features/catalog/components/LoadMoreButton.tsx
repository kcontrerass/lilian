import { CATALOG_TEXTS } from "../constants";

export default function LoadMoreButton() {
  return (
    <div className="mt-16 text-center w-full relative z-10">
      <button className="bg-lilian-purple text-white px-8 py-3.5 rounded-[100px] font-gotham font-medium text-[15px] hover:bg-lilian-purple-light transition-colors inline-flex items-center justify-center gap-2 shadow-md">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        {CATALOG_TEXTS.loadMore}
      </button>
    </div>
  );
}
