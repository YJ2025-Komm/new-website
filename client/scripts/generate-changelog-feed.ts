// Build-time changelog JSON feed generator.
//
// Generates client/public/changelog.json from the same changelogEntries
// array that powers the /changelog page itself — single source of truth,
// so the feed can never drift out of sync with the site. Run via `tsx`
// (not plain node) because the data file's `body`/`intro`/`sections` fields
// are JSX; tsx transforms them at import time. We only read the plain
// fields (slug/date/title/tags/summary) back out — the JSX fields are
// evaluated as a side effect of importing the module but never used here.
//
// Consumed cross-origin by the product dashboard's notification bell
// (dashboard.georankers.co) — see client/public/_headers for the CORS
// config that makes that fetch() work.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import React from "react";

// tsx transforms this project's JSX with the classic runtime (calls global
// `React.createElement` rather than auto-importing react/jsx-runtime), so
// the data file's JSX fields need a global `React` to exist before they're
// evaluated. Harmless here — we only read plain fields back out below, the
// constructed React elements themselves are never used.
(globalThis as unknown as { React: typeof React }).React = React;

const { changelogEntries } = await import("../src/data/changelog");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://georankers.ai";

const feed = changelogEntries
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : -1)) // newest first
  .map((entry) => ({
    slug: entry.slug,
    date: entry.date, // ISO 8601 (YYYY-MM-DD) — format client-side, don't send a display string
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    url: `${BASE_URL}/changelog/${entry.slug}`,
  }));

const outputPath = path.join(__dirname, "..", "public", "changelog.json");
fs.writeFileSync(outputPath, JSON.stringify(feed, null, 2), "utf-8");
console.log(`Changelog feed written to ${outputPath} (${feed.length} entries)`);
