type CacheEntry<T> = {
  expires: number;
  value?: T;
  promise?: Promise<T>;
};

const store = new Map<string, CacheEntry<unknown>>();

/** In-memory GET cache + in-flight dedupe for Store API reads. */
export async function cachedRequest<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as CacheEntry<T> | undefined;

  if (hit?.value !== undefined && hit.expires > now) {
    return hit.value;
  }

  if (hit?.promise) {
    return hit.promise;
  }

  const promise = loader()
    .then((value) => {
      store.set(key, { expires: Date.now() + ttlMs, value });
      return value;
    })
    .catch((error) => {
      store.delete(key);
      throw error;
    });

  store.set(key, { expires: 0, promise });
  return promise;
}

export function invalidateCache(prefix?: string): void {
  if (!prefix) {
    store.clear();
    return;
  }
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}
