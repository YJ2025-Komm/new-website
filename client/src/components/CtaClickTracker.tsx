import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// One delegated listener instead of an onClick on every CTA: any link to the
// signup, login, demo or email destinations is reported as `cta_click`, so new
// buttons are tracked automatically. Order matters: first match wins.
const CTA_TYPES: { type: string; match: (href: string) => boolean }[] = [
  { type: "signup", match: (h) => h.includes("dashboard.georankers.co/register") },
  { type: "login", match: (h) => h.includes("dashboard.georankers.co/login") },
  { type: "demo", match: (h) => h.includes("calendly.com") },
  { type: "email", match: (h) => h.startsWith("mailto:") },
];

export default function CtaClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const cta = CTA_TYPES.find((c) => c.match(href));
      if (!cta) return;
      trackEvent("cta_click", {
        cta_type: cta.type,
        cta_text: (link.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100),
        page_path: window.location.pathname,
      });
    };
    // Capture phase so the event is recorded even if a handler stops propagation.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
