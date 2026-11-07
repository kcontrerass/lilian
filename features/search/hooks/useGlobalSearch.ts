"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchBranches } from "@/features/branches/lib/fetchBranches";
import { fetchPlazas } from "@/features/careers/lib/fetchPlazas";
import { includesFolded } from "@/lib/normalizeText";
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
  const haystack = [result.title, result.subtitle ?? ""].join(" ");
  return includesFolded(haystack, term);
}

export function useGlobalSearch(): UseGlobalSearchResult {
  const [query, setQuery] = useState("");
  const [remoteResults, setRemoteResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [branchesResult, jobsResult] = await Promise.allSettled([
        fetchBranches(),
        fetchPlazas(),
      ]);

      if (cancelled) return;

      const branches =
        branchesResult.status === "fulfilled"
          ? branchesResult.value.map((branch) => ({
              id: `branch-${branch.id}`,
              type: "branch" as const,
              title: branch.name,
              subtitle: [branch.address, ...branch.phones].filter(Boolean).join(" · "),
              href: "/sucursales",
            }))
          : [];

      const jobs =
        jobsResult.status === "fulfilled"
          ? jobsResult.value.map((job) => ({
              id: `job-${job.id}`,
              type: "job" as const,
              title: job.title,
              subtitle: [job.department, job.location].filter(Boolean).join(" · "),
              href: "/trabaja-con-nosotros",
            }))
          : [];

      setRemoteResults([...branches, ...jobs]);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;

  const results = useMemo(() => {
    if (!hasQuery) return [];
    return [...SEARCH_INDEX, ...remoteResults].filter((result) =>
      matchesQuery(result, trimmed),
    );
  }, [hasQuery, remoteResults, trimmed]);

  const groupedResults = useMemo(() => {
    const groups: Partial<Record<SearchResultType, SearchResult[]>> = {};
    for (const type of SEARCH_RESULT_ORDER) {
      const items = results.filter((result) => result.type === type);
      if (items.length > 0) groups[type] = items;
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
