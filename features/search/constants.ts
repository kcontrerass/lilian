import { SearchResultType } from "./types";

export const SEARCH_TEXTS = {
  placeholder: "Buscar productos, sucursales, vacantes…",
  empty: "No encontramos resultados para tu búsqueda.",
  hint: "Escribe para buscar en todo el sitio.",
  clearLabel: "Limpiar búsqueda",
  openLabel: "Buscar",
  closeLabel: "Cerrar búsqueda",
  dialogTitle: "Búsqueda",
  groupLabels: {
    product: "Productos",
    branch: "Sucursales",
    job: "Vacantes",
    page: "Páginas",
  } satisfies Record<SearchResultType, string>,
} as const;

export const SEARCH_RESULT_ORDER: SearchResultType[] = [
  "page",
  "product",
  "branch",
  "job",
];
