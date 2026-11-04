import { wpRestUrl } from "@/lib/wp";
import type { Branch } from "../types";
import { extractBranchesPayload, mapBranchFromApi } from "./mapBranchFromApi";

const storeUrl = (process.env.NEXT_PUBLIC_WOO_STORE_URL ?? "").replace(/\/$/, "");

export async function fetchBranches(): Promise<Branch[]> {
  const response = await fetch(wpRestUrl("/lilian/v1/sucursales"), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar las sucursales (${response.status}).`);
  }

  const data: unknown = await response.json();
  const items = extractBranchesPayload(data);

  return items
    .map((item) => mapBranchFromApi(item, storeUrl))
    .filter((branch): branch is Branch => branch !== null);
}
