const storeUrl = (process.env.NEXT_PUBLIC_WOO_STORE_URL ?? "").replace(/\/$/, "");
const useRestRoute = process.env.NEXT_PUBLIC_WOO_USE_REST_ROUTE === "1";

/**
 * Build a WordPress REST URL for the given route (e.g. "/lilian/v1/upload/pdf").
 */
export function wpRestUrl(route: string): string {
  const path = route.startsWith("/") ? route : `/${route}`;

  if (!storeUrl) {
    throw new Error("NEXT_PUBLIC_WOO_STORE_URL is not set.");
  }

  if (useRestRoute) {
    return `${storeUrl}/?rest_route=${encodeURIComponent(path)}`;
  }

  return `${storeUrl}/wp-json${path}`;
}
