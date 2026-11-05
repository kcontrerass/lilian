const storeUrl = (process.env.NEXT_PUBLIC_WOO_STORE_URL ?? "").replace(/\/$/, "");
const useRestRoute = process.env.NEXT_PUBLIC_WOO_USE_REST_ROUTE === "1";

function normalizeRoute(route: string): string {
  return route.startsWith("/") ? route : `/${route}`;
}

/**
 * URL directa al WordPress (build en servidor, proxy en `/api/wp`, o mismo origen en cPanel).
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
 * URL para `fetch` en el navegador. En Vercel usa proxy same-origin (evita CORS).
 */
export function wpClientRestUrl(route: string): string {
  const path = normalizeRoute(route);

  if (process.env.NEXT_PUBLIC_WP_PROXY === "1") {
    const params = new URLSearchParams({ rest_route: path });
    return `/api/wp/?${params.toString()}`;
  }

  return wpRestUrl(route);
}

export function getWooStoreOrigin(): string {
  return storeUrl;
}
