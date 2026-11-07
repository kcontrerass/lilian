import { includesFolded } from "@/lib/normalizeText";
import type { Branch } from "../types";

export function matchesBranchQuery(branch: Branch, term: string): boolean {
  const haystack = [
    branch.name,
    branch.address,
    branch.department,
    branch.description ?? "",
    ...branch.phones,
  ].join(" ");

  return includesFolded(haystack, term);
}
