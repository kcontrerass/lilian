import { NAV_LINKS } from "@/lib/constants";
import { INITIAL_BRANCHES } from "@/features/branches/constants";
import { INITIAL_JOB_POSITIONS } from "@/features/careers/constants";
import { SearchResult } from "../types";

/** Static site pages, branches and jobs. Woo products load at runtime. */
export function buildSearchIndex(): SearchResult[] {
  const pages: SearchResult[] = Object.values(NAV_LINKS).map((link) => ({
    id: `page-${link.href}`,
    type: "page",
    title: link.label,
    href: link.href,
  }));

  const branches: SearchResult[] = INITIAL_BRANCHES.map((branch) => ({
    id: `branch-${branch.id}`,
    type: "branch",
    title: branch.name,
    subtitle: `${branch.department} · ${branch.address}`,
    href: "/sucursales",
  }));

  const jobs: SearchResult[] = INITIAL_JOB_POSITIONS.map((job) => ({
    id: `job-${job.id}`,
    type: "job",
    title: job.title,
    subtitle: `${job.department} · ${job.location}`,
    href: "/trabaja-con-nosotros",
  }));

  return [...pages, ...branches, ...jobs];
}

export const SEARCH_INDEX = buildSearchIndex();
