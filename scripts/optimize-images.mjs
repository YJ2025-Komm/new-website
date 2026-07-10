import sharp from "sharp";
import { statSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Caps are set to >=2x the largest on-page display size so images stay
// crisp on retina displays. fit: 'inside' preserves aspect ratio and never
// upscales (withoutEnlargement), so nothing gets stretched or cropped.
const targets = [
  { file: "client/public/georankers-icon.png", width: 128, height: 128 },
  { file: "client/public/openai-logo.png", width: 128, height: 128 },
  { file: "client/public/perplexity-logo.png", width: 128, height: 128 },
  { file: "client/public/startup-india.png", width: 700 },
  { file: "attached_assets/generated_images/AI_content_building_blocks_237b4917.png", width: 1400 },
  { file: "attached_assets/generated_images/GEO_vs_SEO_comparison_96025f03.png", width: 1400 },
  { file: "attached_assets/generated_images/Strategic_AI_search_leadership_2959319a.png", width: 1400 },
  { file: "attached_assets/image_1775465238496.png", width: 1400 },
  { file: "attached_assets/image_1775465155621.png", width: 1400 },
  { file: "attached_assets/image_1775465178832.png", width: 1400 },
  { file: "attached_assets/gr1_1772251203326.png", width: 1200 },
  { file: "attached_assets/gr2_1772251203323.png", width: 1200 },
  { file: "attached_assets/gr3_1772251203321.png", width: 1200 },
  // gr4_1772251203317.png intentionally excluded: already 1263x533/44.6 KiB,
  // re-encoding at the same width made it larger, not smaller.
];

const fmt = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

for (const { file, width, height } of targets) {
  const abs = path.join(root, file);
  const before = statSync(abs).size;
  const buffer = await sharp(abs)
    .resize({
      width,
      height,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png({ quality: 80, compressionLevel: 9, palette: true })
    .toBuffer();

  const afterBefore = before;
  await sharp(buffer).toFile(abs);
  const after = statSync(abs).size;

  const savedPct = (((afterBefore - after) / afterBefore) * 100).toFixed(0);
  console.log(`${file}: ${fmt(afterBefore)} -> ${fmt(after)} (-${savedPct}%)`);
}

console.log("Done.");
