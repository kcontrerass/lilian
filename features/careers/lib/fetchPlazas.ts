import { wpClientRestUrl } from "@/lib/wp";
import type { JobPosition } from "../types";
import { extractPlazasPayload, mapPlazaFromApi } from "./mapPlazaFromApi";

export async function fetchPlazas(): Promise<JobPosition[]> {
  const response = await fetch(wpClientRestUrl("/lilian/v1/plazas"), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar las plazas (${response.status}).`);
  }

  const data: unknown = await response.json();
  const items = extractPlazasPayload(data);

  return items
    .map((item) => mapPlazaFromApi(item))
    .filter((job): job is JobPosition => job !== null);
}
