/**
 * Convert generated FDL photoset PNGs → graded WebP into public/images.
 * One grade pipeline so every slot shares temperature / contrast / palette.
 */
import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const ASSETS = path.join(
  process.env.USERPROFILE ?? "",
  ".cursor",
  "projects",
  "c-Users-User-Desktop-FloraDeLuxe",
  "assets",
);
const OUT = path.join(ROOT, "public", "images");

/** Shared cinematic grade — warm, muted, never HDR. */
async function grade(input, { width, height, fit = "cover" }) {
  return sharp(input)
    .rotate()
    .resize({ width, height, fit, position: "attention" })
    .modulate({ brightness: 0.96, saturation: 0.82, hue: -2 })
    .linear(0.92, 8)
    .gamma(1.05)
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 86, effort: 5, smartSubsample: true })
    .toBuffer({ resolveWithObject: true });
}

async function writeSlot(sourceName, destRel, size) {
  const src = path.join(ASSETS, sourceName);
  await access(src);
  const dest = path.join(OUT, destRel);
  await mkdir(path.dirname(dest), { recursive: true });
  const { data, info } = await grade(src, size);
  await sharp(data).toFile(dest);
  console.log(`✓ ${destRel}  ${info.width}×${info.height}`);
}

/** source → many destinations (same grade, crop per slot). */
const jobs = [
  // Hero
  ["fdl-hero-warehouse.png", "hero/hero-premium-wholesale.webp", { width: 1920, height: 1280 }],
  ["fdl-flower-floor.png", "hero/hero-wholesale-floor.webp", { width: 1920, height: 1280 }],
  ["fdl-about-hall.png", "hero/wholesale-hall.webp", { width: 1600, height: 2000 }],

  // Delivery / gallery overview
  ["fdl-delivery-arrival.png", "gallery/warehouse-overview.webp", { width: 1600, height: 2000 }],
  ["fdl-delivery-arrival.png", "scenes/delivery-arrival.webp", { width: 1920, height: 1440 }],
  ["fdl-flower-floor.png", "gallery/flower-floor.webp", { width: 2200, height: 1238 }],
  ["fdl-red-white-roses.png", "gallery/red-white-roses.webp", { width: 1600, height: 2000 }],
  ["fdl-pink-roses.png", "gallery/pink-roses.webp", { width: 1600, height: 2000 }],
  ["fdl-baskets.png", "gallery/baskets.webp", { width: 1920, height: 1440 }],
  ["fdl-packaging.png", "gallery/packaging-stock.webp", { width: 2200, height: 1238 }],
  ["fdl-ribbons.png", "gallery/ribbons.webp", { width: 2200, height: 1238 }],
  ["fdl-floral-supplies.png", "gallery/floral-supplies.webp", { width: 1920, height: 1440 }],

  // Categories
  ["fdl-roses.png", "categories/roses.webp", { width: 2200, height: 1238 }],
  ["fdl-chrysanthemums.png", "categories/chrysanthemums.webp", { width: 1200, height: 1500 }],
  ["fdl-exotic.png", "categories/exotic.webp", { width: 1200, height: 1500 }],
  ["fdl-greenery.png", "categories/greenery.webp", { width: 1200, height: 1500 }],
  ["fdl-mixed-seasonal.png", "categories/mixed-flowers.webp", { width: 2200, height: 1238 }],
  ["fdl-mixed-seasonal.png", "categories/seasonal.webp", { width: 1600, height: 2000 }],
  ["fdl-hydrangeas.png", "categories/hydrangeas.webp", { width: 1920, height: 1440 }],
  ["fdl-peonies.png", "categories/peonies.webp", { width: 1920, height: 1440 }],
  ["fdl-floral-supplies.png", "categories/floral-supplies.webp", { width: 1920, height: 1440 }],

  // Import / suppliers
  ["fdl-suppliers-nl.png", "suppliers/netherlands.webp", { width: 1600, height: 1200 }],
  ["fdl-suppliers-ec.png", "suppliers/ecuador.webp", { width: 1600, height: 1200 }],
  ["fdl-suppliers-ua.png", "suppliers/ukraine.webp", { width: 1600, height: 1200 }],
  ["fdl-suppliers-am.png", "suppliers/armenia.webp", { width: 1600, height: 1200 }],
  ["fdl-import-logistics.png", "scenes/import-logistics.webp", { width: 1920, height: 1440 }],

  // About
  ["fdl-about-hall.png", "about/warehouse-stock.webp", { width: 1600, height: 2000 }],
  ["fdl-packaging.png", "about/packaging-area.webp", { width: 2200, height: 1238 }],
  ["fdl-about-hall.png", "about/hall.webp", { width: 1600, height: 2000 }],
  ["fdl-assortment-closeup.png", "about/craft.webp", { width: 1920, height: 1280 }],

  // Warehouse ops
  ["fdl-unloading.png", "warehouse/unloading.webp", { width: 1920, height: 1440 }],
  ["fdl-cold-room.png", "warehouse/cold-room.webp", { width: 1920, height: 1440 }],
  ["fdl-import-logistics.png", "warehouse/sorting.webp", { width: 1920, height: 1440 }],
  ["fdl-assortment-closeup.png", "warehouse/picking.webp", { width: 1920, height: 1440 }],
  ["fdl-roses.png", "warehouse/bunches.webp", { width: 1920, height: 1280 }],

  // Section scenes (new)
  ["fdl-telegram-desk.png", "scenes/telegram-desk.webp", { width: 1920, height: 1440 }],
  ["fdl-contacts-entrance.png", "scenes/contacts-entrance.webp", { width: 1920, height: 1440 }],
  ["fdl-faq-desk.png", "scenes/faq-desk.webp", { width: 1920, height: 1440 }],
  ["fdl-final-bouquet.png", "scenes/final-bouquet.webp", { width: 1920, height: 1440 }],
  ["fdl-assortment-closeup.png", "scenes/assortment.webp", { width: 1920, height: 1440 }],

  // OG
  ["fdl-og-cover.png", "og/cover.webp", { width: 1200, height: 630 }],
];

const missing = [];
for (const [src] of jobs) {
  try {
    await access(path.join(ASSETS, src));
  } catch {
    if (!missing.includes(src)) missing.push(src);
  }
}
if (missing.length) {
  console.error("Missing sources:\n", missing.join("\n"));
  process.exit(1);
}

for (const job of jobs) {
  await writeSlot(...job);
}

console.log(`\nDone — ${jobs.length} WebP slots written with shared grade.`);
