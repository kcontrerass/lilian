/**
 * Build Store / custom REST URLs against WooCommerce.
 * When pretty /wp-json/ rewrites fail (common on some hosts), set
 * NEXT_PUBLIC_WOO_USE_REST_ROUTE=1 to use ?rest_route=.
 */
export function getWooBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_WOO_STORE_URL?.replace(/\/$/, "");
  if (!base) {
    throw new Error("Falta NEXT_PUBLIC_WOO_STORE_URL en el entorno.");
  }
  return base;
}

export function buildWooApiUrl(pathWithQuery: string): string {
  const base = getWooBaseUrl();
  const flag = process.env.NEXT_PUBLIC_WOO_USE_REST_ROUTE;
  const useRestRoute = flag === "1" || flag === "true";

  if (!useRestRoute) {
    return `${base}${pathWithQuery}`;
  }

  const qIndex = pathWithQuery.indexOf("?");
  const pathOnly = qIndex >= 0 ? pathWithQuery.slice(0, qIndex) : pathWithQuery;
  const search = qIndex >= 0 ? pathWithQuery.slice(qIndex + 1) : "";
  const restRoute = pathOnly.replace(/^\/wp-json/, "") || "/";
  const params = new URLSearchParams(search);
  params.set("rest_route", restRoute);
  return `${base}/?${params.toString()}`;
}
