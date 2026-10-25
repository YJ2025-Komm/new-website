// Thin wrapper over the GA4 gtag snippet in index.html. A no-op when gtag is
// missing (ad blockers, prerender), so callers never need to guard.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  try {
    window.gtag?.("event", name, params);
  } catch {
    // Analytics must never break the page.
  }
}
