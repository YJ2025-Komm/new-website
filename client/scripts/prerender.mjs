import puppeteer from "puppeteer";
import express from "express";
import { mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = resolve(__dirname, "../dist");
const PORT = 5173;

const routes = [
  "/",
  "/geo-guide",
  "/pricing",
  "/features",
  "/free-geo-tools/brand-visibility",
  "/free-geo-tools/geo-audit",
  "/free-geo-tools/visibility-score",
];

const app = express();
app.use(express.static(distPath));
app.get("*", (_req, res) => res.sendFile(resolve(distPath, "index.html")));
const server = createServer(app);

await new Promise((resolve) => server.listen(PORT, resolve));
console.log(`[prerender] static server on port ${PORT}`);

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });

for (const route of routes) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  const html = await page.content();
  await page.close();

  const subdir = route === "/" ? "" : route.replace(/^\//, "");
  const outDir = resolve(distPath, subdir);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), html, "utf-8");
  console.log(`[prerender] ${route}`);
}

await browser.close();
server.close();
console.log("[prerender] done");
