import { useEffect } from "react";

// Standalone BreadcrumbList JSON-LD, injected as its own <script> tag.
//
// Kept separate from the page schema in useSEO for two reasons: a page can then
// declare its primary @type without nesting a breadcrumb inside it, and the
// check-before-create pattern below survives prerender + hydration (the prerendered
// HTML already carries the tag, so creating a second one would duplicate it).
//
// Every ListItem needs a real `item` URL. Google flags a missing one as a critical
// error, so `item` is required on the type rather than optional.

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * @param id  DOM id for the script tag. Must be unique per page, since the cleanup
 *            below removes by id — a shared id means one page's unmount deletes
 *            another page's breadcrumb. Convention: `<slug>-breadcrumb-schema`.
 */
export function useBreadcrumbSchema(id: string, items: BreadcrumbItem[]) {
  // items is a fresh array literal on every render, so it is serialized for the
  // dependency check rather than compared by reference.
  const serialized = JSON.stringify(items);

  useEffect(() => {
    let el = document.querySelector(`script#${id}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": (JSON.parse(serialized) as BreadcrumbItem[]).map((entry, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": entry.name,
        "item": entry.item,
      })),
    });
    return () => { el?.remove(); };
  }, [id, serialized]);
}

// Every /features/* child page shares the first two crumbs.
export const FEATURES_CRUMBS: BreadcrumbItem[] = [
  { name: "Home", item: "https://georankers.ai/" },
  { name: "Features", item: "https://georankers.ai/features" },
];
