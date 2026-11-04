"use client";

import { useEffect, useMemo, useState } from "react";
import { CAREERS_TEXTS } from "../constants";
import { fetchPlazas } from "../lib/fetchPlazas";
import { JobPosition } from "../types";

export function useJobPositions() {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await fetchPlazas();
        if (!cancelled) {
          setJobs(data);
        }
      } catch (error) {
        if (!cancelled) {
          setJobs([]);
          setLoadError(
            error instanceof Error ? error.message : CAREERS_TEXTS.loadErrorMessage
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

  const departments = useMemo(() => {
    const list = Array.from(
      new Set(jobs.map((job) => job.department).filter(Boolean))
    );
    return ["Todas", ...list.sort((a, b) => a.localeCompare(b, "es"))];
  }, [jobs]);

  return {
    jobs,
    departments,
    isLoading,
    loadError,
  };
}
