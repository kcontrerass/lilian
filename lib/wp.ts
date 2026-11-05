const storeUrl = (process.env.NEXT_PUBLIC_WOO_STORE_URL ?? "").replace(/\/$/, "");
const useRestRoute = process.env.NEXT_PUBLIC_WOO_USE_REST_ROUTE === "1";

function normalizeRoute(route: string): string {
  return route.startsWith("/") ? route : `/${route}`;
}

function isStaticExportSite(): boolean {
  return process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
}

/**
 * URL directa al WordPress (servidor Next o sitio estático en el mismo dominio).
 */
export function wpRestUrl(route: string): string {
  const path = normalizeRoute(route);

  if (!storeUrl) {
    throw new Error("NEXT_PUBLIC_WOO_STORE_URL is not set.");
  }

  if (useRestRoute) {
    return `${storeUrl}/?rest_route=${encodeURIComponent(path)}`;
  }

  return `${storeUrl}/wp-json${path}`;
}

/**
 * URL para `fetch` en el navegador.
 * Vercel / `next dev`: proxy same-origin `/api/wp` (sin CORS).
 * Export estático (cPanel): URL directa a WordPress.
 */
export function wpClientRestUrl(route: string): string {
  const path = normalizeRoute(route);

  if (typeof window !== "undefined" && !isStaticExportSite()) {
    const params = new URLSearchParams({ rest_route: path });
    return `/api/wp/?${params.toString()}`;
  }

  return wpRestUrl(route);
}

export function getWooStoreOrigin(): string {
  return storeUrl;
}
