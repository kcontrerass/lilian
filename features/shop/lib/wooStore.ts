import type {
  StoreCart,
  StoreCategory,
  StoreProduct,
  CheckoutResult,
  CartAddress,
} from "../types";
import { getAuthToken } from "@/features/account/lib/tokenStorage";
import { buildWooApiUrl } from "@/lib/wooApiUrl";
import { cachedRequest, invalidateCache } from "./requestCache";

const CART_TOKEN_KEY = "lilian_woo_cart_token";

/** Catalog GETs are stable enough to reuse while browsing. */
const CATALOG_TTL_MS = 60_000;
const PRODUCT_TTL_MS = 60_000;

export const CATALOG_PRODUCT_FIELDS = [
  "id",
  "name",
  "slug",
  "type",
  "sku",
  "short_description",
  "description",
  "prices",
  "images",
  "categories",
  "attributes",
  "variations",
  "has_options",
  "is_purchasable",
  "is_in_stock",
  "add_to_cart",
  "on_sale",
].join(",");

export class WooStoreError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "WooStoreError";
    this.status = status;
    this.code = code;
  }
}

export function getStoredCartToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CART_TOKEN_KEY);
}

export function setStoredCartToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (!token) {
    window.localStorage.removeItem(CART_TOKEN_KEY);
    return;
  }
  window.localStorage.setItem(CART_TOKEN_KEY, token);
}

async function storeFetch<T>(
  path: string,
  init: RequestInit = {},
  options: { withCartToken?: boolean; cacheTtlMs?: number } = {},
): Promise<T> {
  const { withCartToken = false, cacheTtlMs } = options;
  const method = (init.method ?? "GET").toUpperCase();
  const canCache = method === "GET" && !withCartToken && cacheTtlMs;

  const run = async (): Promise<T> => {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");

    if (init.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (withCartToken) {
      const token = getStoredCartToken();
      if (token) headers.set("Cart-Token", token);
    }

    // When logged in, attach JWT so checkout/orders can bind to the customer.
    const jwt = getAuthToken();
    if (jwt && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${jwt}`);
    }

    let response: Response;
    try {
      response = await fetch(buildWooApiUrl(path), {
        ...init,
        headers,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo conectar con la tienda.";
      throw new WooStoreError(message, 500);
    }

    const nextToken = response.headers.get("Cart-Token");
    if (nextToken) setStoredCartToken(nextToken);

    const text = await response.text();
    const data = text ? (JSON.parse(text) as unknown) : null;

    if (!response.ok) {
      const err = data as {
        message?: string;
        code?: string;
        data?: { params?: Record<string, string> };
      } | null;
      const paramMsgs = err?.data?.params
        ? Object.values(err.data.params).filter(Boolean)
        : [];
      throw new WooStoreError(
        paramMsgs[0] || err?.message || `Error WooCommerce (${response.status})`,
        response.status,
        err?.code,
      );
    }

    return data as T;
  };

  if (!canCache) return run();

  return cachedRequest(`GET ${path}`, cacheTtlMs, run);
}

export async function fetchProducts(params?: {
  category?: number | null;
  perPage?: number;
  type?: string;
  parent?: number;
  fields?: string | false;
}): Promise<StoreProduct[]> {
  const search = new URLSearchParams();
  search.set("per_page", String(params?.perPage ?? 48));
  if (params?.category) search.set("category", String(params.category));
  if (params?.type) search.set("type", params.type);
  if (params?.parent) search.set("parent", String(params.parent));
  // Do not use Store API `slug` query — it frequently ignores the filter.
  if (params?.fields !== false) {
    search.set("_fields", params?.fields ?? CATALOG_PRODUCT_FIELDS);
  }

  return storeFetch<StoreProduct[]>(
    `/wp-json/wc/store/v1/products?${search.toString()}`,
    undefined,
    { cacheTtlMs: CATALOG_TTL_MS },
  );
}

export async function fetchProductBySlug(
  slug: string,
): Promise<StoreProduct | null> {
  // Store API `?slug=` is unreliable (often returns an unrelated product).
  // Resolve from the catalog (cached), then load the canonical product by ID.
  const catalog = await fetchProducts({ perPage: 100 });
  const summary = catalog.find((product) => product.slug === slug);
  if (!summary) return null;

  const full = await fetchProductById(summary.id);
  return full ?? summary;
}

export async function fetchProductById(
  id: number,
): Promise<StoreProduct | null> {
  try {
    return await storeFetch<StoreProduct>(
      `/wp-json/wc/store/v1/products/${id}?_fields=${CATALOG_PRODUCT_FIELDS}`,
      undefined,
      { cacheTtlMs: PRODUCT_TTL_MS },
    );
  } catch (err) {
    if (err instanceof WooStoreError && err.status === 404) return null;
    throw err;
  }
}

/** One request for all variations of a variable product. */
export async function fetchVariationsByParent(
  parentId: number,
): Promise<StoreProduct[]> {
  return fetchProducts({
    type: "variation",
    parent: parentId,
    perPage: 100,
  });
}

export async function fetchVariationsByIds(
  ids: number[],
): Promise<StoreProduct[]> {
  if (ids.length === 0) return [];
  const results = await Promise.all(
    ids.map(async (id) => {
      try {
        return await fetchProductById(id);
      } catch {
        return null;
      }
    }),
  );
  return results.filter((item): item is StoreProduct => item !== null);
}

export async function fetchCategories(): Promise<StoreCategory[]> {
  return storeFetch<StoreCategory[]>(
    "/wp-json/wc/store/v1/products/categories?_fields=id,name,slug,description,parent,count,image",
    undefined,
    { cacheTtlMs: CATALOG_TTL_MS },
  );
}

export async function fetchCategoryBySlug(
  slug: string,
): Promise<StoreCategory | null> {
  const categories = await fetchCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function fetchCart(): Promise<StoreCart> {
  return storeFetch<StoreCart>("/wp-json/wc/store/v1/cart", undefined, {
    withCartToken: true,
  });
}

export async function addCartItem(
  id: number,
  quantity = 1,
): Promise<StoreCart> {
  return storeFetch<StoreCart>(
    "/wp-json/wc/store/v1/cart/add-item",
    {
      method: "POST",
      body: JSON.stringify({ id, quantity }),
    },
    { withCartToken: true },
  );
}

export async function updateCartItem(
  key: string,
  quantity: number,
): Promise<StoreCart> {
  return storeFetch<StoreCart>(
    "/wp-json/wc/store/v1/cart/update-item",
    {
      method: "POST",
      body: JSON.stringify({ key, quantity }),
    },
    { withCartToken: true },
  );
}

export async function removeCartItem(key: string): Promise<StoreCart> {
  return storeFetch<StoreCart>(
    "/wp-json/wc/store/v1/cart/remove-item",
    {
      method: "POST",
      body: JSON.stringify({ key }),
    },
    { withCartToken: true },
  );
}

export async function updateCustomer(payload: {
  billing_address: CartAddress & { email: string };
  shipping_address: CartAddress;
}): Promise<StoreCart> {
  return storeFetch<StoreCart>(
    "/wp-json/wc/store/v1/cart/update-customer",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { withCartToken: true },
  );
}

export async function selectShippingRate(
  packageId: number,
  rateId: string,
): Promise<StoreCart> {
  return storeFetch<StoreCart>(
    "/wp-json/wc/store/v1/cart/select-shipping-rate",
    {
      method: "POST",
      body: JSON.stringify({ package_id: packageId, rate_id: rateId }),
    },
    { withCartToken: true },
  );
}

export async function checkoutOrder(payload: {
  billing_address: CartAddress & { email: string };
  shipping_address: CartAddress;
  payment_method: string;
}): Promise<CheckoutResult> {
  invalidateCache();
  return storeFetch<CheckoutResult>(
    "/wp-json/wc/store/v1/checkout",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { withCartToken: true },
  );
}

/** Warm catalog cache (e.g. on product card hover). */
export function prefetchProduct(slug: string): void {
  void fetchProductBySlug(slug);
}
