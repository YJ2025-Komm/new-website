export const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  generatedAt: string;
}

/**
 * Shared by the free GEO tools. Each tool owns its own instance (with its
 * own TTL and cache-key scheme) rather than sharing one Map, since what a
 * cache key should mean differs per tool (e.g. per-domain vs per-page-URL).
 */
export class TtlCache<T> {
  private store = new Map<string, CacheEntry<T>>();
  private inFlight = new Map<string, Promise<T>>();

  constructor(private ttlMs: number) {}

  private peek(key: string): CacheEntry<T> | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry;
  }

  size(): number {
    return this.store.size;
  }

  /**
   * Returns the cached value if fresh; otherwise runs `compute()` — sharing
   * a single in-flight promise across concurrent callers for the same key
   * so simultaneous requests for the same key don't each trigger the full
   * pipeline.
   */
  async getOrCompute(
    key: string,
    compute: () => Promise<T>
  ): Promise<{ data: T; generatedAt: string; fromCache: boolean }> {
    const cached = this.peek(key);
    if (cached) return { data: cached.data, generatedAt: cached.generatedAt, fromCache: true };

    const existing = this.inFlight.get(key);
    if (existing) {
      const data = await existing;
      const entry = this.peek(key);
      return { data, generatedAt: entry?.generatedAt ?? new Date().toISOString(), fromCache: true };
    }

    const generatedAt = new Date().toISOString();
    const promise = compute();
    this.inFlight.set(key, promise);
    try {
      const data = await promise;
      this.store.set(key, { data, expiresAt: Date.now() + this.ttlMs, generatedAt });
      return { data, generatedAt, fromCache: false };
    } finally {
      this.inFlight.delete(key);
    }
  }
}
