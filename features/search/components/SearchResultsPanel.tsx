import Link from "next/link";
import { SEARCH_RESULT_ORDER, SEARCH_TEXTS } from "../constants";
import { SearchResult, SearchResultType } from "../types";

interface SearchResultsPanelProps {
  groupedResults: Partial<Record<SearchResultType, SearchResult[]>>;
  hasQuery: boolean;
  hasResults: boolean;
  onSelect: () => void;
  variant?: "overlay";
}

export default function SearchResultsPanel({
  groupedResults,
  hasQuery,
  hasResults,
  onSelect,
}: SearchResultsPanelProps) {
  if (!hasQuery) {
    return null;
  }

  return (
    <div role="listbox">
      {!hasResults ? (
        <p className="px-4 py-6 text-center text-sm font-gotham text-lilian-purple/60">
          {SEARCH_TEXTS.empty}
        </p>
      ) : (
        SEARCH_RESULT_ORDER.map((type) => {
          const items = groupedResults[type];
          if (!items || items.length === 0) {
            return null;
          }

          return (
            <div key={type} className="py-2">
              <p className="px-4 pb-1 text-[11px] font-chronica font-bold uppercase tracking-wide text-lilian-purple/45">
                {SEARCH_TEXTS.groupLabels[type]}
              </p>
              <ul>
                {items.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={result.href}
                      role="option"
                      onClick={onSelect}
                      className="block rounded-xl px-4 py-2.5 transition-colors hover:bg-lilian-orange/10"
                    >
                      <span className="block text-sm font-chronica font-semibold text-lilian-purple">
                        {result.title}
                      </span>
                      {result.subtitle ? (
                        <span className="mt-0.5 block text-xs font-gotham text-lilian-purple/55 line-clamp-1">
                          {result.subtitle}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}
