import { wpClientRestUrl, getWooStoreOrigin } from "@/lib/wp";
import type { Branch } from "../types";
import { extractBranchesPayload, mapBranchFromApi } from "./mapBranchFromApi";

export async function fetchBranches(): Promise<Branch[]> {
  const response = await fetch(wpClientRestUrl("/lilian/v1/sucursales"), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar las sucursales (${response.status}).`);
  }

  const data: unknown = await response.json();
  const items = extractBranchesPayload(data);

  return items
    .map((item) => mapBranchFromApi(item, getWooStoreOrigin()))
    .filter((branch): branch is Branch => branch !== null);
}
