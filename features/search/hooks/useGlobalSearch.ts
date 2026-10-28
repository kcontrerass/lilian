import { useMemo, useState } from "react";
import { SEARCH_INDEX } from "../lib/buildSearchIndex";
import { SEARCH_RESULT_ORDER } from "../constants";
import { SearchResult, SearchResultType } from "../types";

interface UseGlobalSearchResult {
  query: string;
  setQuery: (value: string) => void;
  clearQuery: () => void;
  results: SearchResult[];
  groupedResults: Partial<Record<SearchResultType, SearchResult[]>>;
  hasQuery: boolean;
  hasResults: boolean;
}

function matchesQuery(result: SearchResult, term: string): boolean {
  if (result.title.toLowerCase().includes(term)) {
    return true;
  }
  return Boolean(result.subtitle?.toLowerCase().includes(term));
}

export function useGlobalSearch(): UseGlobalSearchResult {
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;

  const results = useMemo(() => {
    if (!hasQuery) {
      return [];
    }
    const term = trimmed.toLowerCase();
    return SEARCH_INDEX.filter((result) => matchesQuery(result, term));
  }, [hasQuery, trimmed]);

  const groupedResults = useMemo(() => {
    const groups: Partial<Record<SearchResultType, SearchResult[]>> = {};
    for (const type of SEARCH_RESULT_ORDER) {
      const items = results.filter((result) => result.type === type);
      if (items.length > 0) {
        groups[type] = items;
      }
    }
    return groups;
  }, [results]);

  return {
    query,
    setQuery,
    clearQuery: () => setQuery(""),
    results,
    groupedResults,
    hasQuery,
    hasResults: results.length > 0,
  };
}
