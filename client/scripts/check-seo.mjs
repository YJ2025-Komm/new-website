// Build-time SEO/CLS gate. Runs against the PRERENDERED dist/ output (after
// prerender.mjs), i.e. exactly what crawlers and users actually receive —
// not the JSX source, which can hide dynamic/component-level gaps.
//
// Fails the build (exit 1) on:
//   - missing/empty <title>, or > TITLE_MAX chars
//   - missing/empty meta description, or > DESC_MAX chars
//   - any <img> missing width or height attributes (CLS risk)
//   - any <script type="application/ld+json"> block that isn't valid JSON
//
// Why this exists: these exact gaps (a page's <img> missing width/height,
// title/description drifting past the safe length) were found by hand during
// a manual review, more than once, after already shipping. A checklist that
// only runs when someone remembers to run it doesn't scale — this runs on
// every build and blocks the deploy instead.
//
// To add an exception (e.g. a genuinely dynamic image where dimensions can't
// be known at build time and the CSS surrounding it already fixes the layout
// box, so there's no real CLS risk despite the missing attributes), add its
// src to IMG_ALLOWLIST below with a comment explaining why — don't loosen
// the general rule.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../dist");

const TITLE_MAX = 60;
const DESC_MAX = 165;

// Files in dist that aren't app pages (verification stubs etc.) — skip entirely.
const SKIP_FILENAME_PATTERNS = [/^google[0-9a-f-]+\.html$/i];

// Known, deliberate exceptions to the img width/height rule. Each entry needs
// a reason — this is an audit trail, not a way to silence the checker.
const IMG_ALLOWLIST = [];

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(p));
    else if (entry.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

if (!fs.existsSync(distPath)) {
  console.error(`[check-seo] dist/ not found at ${distPath} — run this after vite build + prerender.`);
  process.exit(1);
}

const files = walk(distPath).filter(
  (f) => !SKIP_FILENAME_PATTERNS.some((re) => re.test(path.basename(f)))
);

const violations = []; // { file, message }

for (const file of files) {
  const rel = path.relative(distPath, file);
  const html = fs.readFileSync(file, "utf-8");

  // --- title ---
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? decodeEntities(titleMatch[1]).trim() : "";
  if (!title) {
    violations.push({ file: rel, message: "missing or empty <title>" });
  } else if (title.length > TITLE_MAX) {
    violations.push({ file: rel, message: `<title> is ${title.length} chars (max ${TITLE_MAX}): "${title}"` });
  }

  // --- meta description ---
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  const desc = descMatch ? decodeEntities(descMatch[1]).trim() : "";
  if (!desc) {
    violations.push({ file: rel, message: "missing or empty meta description" });
  } else if (desc.length > DESC_MAX) {
    violations.push({ file: rel, message: `meta description is ${desc.length} chars (max ${DESC_MAX})` });
  }

  // --- image width/height (CLS) ---
  const imgs = html.match(/<img[^>]*>/g) || [];
  for (const img of imgs) {
    const srcMatch = img.match(/src="([^"]*)"/);
    const src = srcMatch ? srcMatch[1] : "(no src)";
    if (IMG_ALLOWLIST.includes(src)) continue;
    const hasWidth = /width="\d+"/.test(img);
    const hasHeight = /height="\d+"/.test(img);
    if (!hasWidth || !hasHeight) {
      violations.push({ file: rel, message: `<img src="${src}"> missing ${!hasWidth ? "width" : ""}${!hasWidth && !hasHeight ? "/" : ""}${!hasHeight ? "height" : ""}` });
    }
  }

  // --- JSON-LD validity ---
  const ldRe = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = ldRe.exec(html))) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      violations.push({ file: rel, message: `invalid JSON-LD: ${e.message}` });
    }
  }
}

console.log(`[check-seo] checked ${files.length} pages in dist/`);

if (violations.length) {
  console.error(`\n[check-seo] ${violations.length} violation(s) found:\n`);
  for (const v of violations) {
    console.error(`  ${v.file}: ${v.message}`);
  }
  console.error(`\n[check-seo] FAILED — fix the above before this can deploy.`);
  process.exit(1);
}

console.log("[check-seo] OK — every page has a valid title/description, every <img> has width+height, all JSON-LD is valid.");
