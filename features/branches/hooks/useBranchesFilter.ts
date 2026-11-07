"use client";

import { useEffect, useMemo, useState } from "react";
import { BRANCHES_TEXTS } from "../constants";
import { fetchBranches } from "../lib/fetchBranches";
import { matchesBranchQuery } from "../lib/matchesBranchQuery";
import { Branch } from "../types";

export function useBranchesFilter() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await fetchBranches();
        if (!cancelled) {
          setBranches(data);
        }
      } catch (error) {
        if (!cancelled) {
          setBranches([]);
          setLoadError(
            error instanceof Error ? error.message : BRANCHES_TEXTS.loadErrorMessage
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredBranches = useMemo<Branch[]>(() => {
    const term = searchQuery.trim();
    if (!term) {
      return branches;
    }
    return branches.filter((branch) => matchesBranchQuery(branch, term));
  }, [branches, searchQuery]);

  const hasSearchQuery = searchQuery.trim().length > 0;

  return {
    searchQuery,
    setSearchQuery,
    filteredBranches,
    hasSearchQuery,
    isLoading,
    loadError,
  };
}
