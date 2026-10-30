import { SearchResultType } from "./types";

export const SEARCH_TEXTS = {
  placeholder: "Buscar en tienda, sucursales, vacantes…",
  empty: "No encontramos resultados para tu búsqueda.",
  hint: "Prueba con un producto de la tienda, sucursal o vacante.",
  productsLoading: "Cargando productos de la tienda…",
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
  "product",
  "page",
  "branch",
  "job",
];
