/**
 * Apply the brand photoset: convert generated PNGs into optimized WebP
 * slots already wired by content configs. One soft cream/wine grade for cohesion.
 *
 * Usage: node scripts/apply-brand-photoset.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ASSETS = path.resolve(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-Users-User-Desktop-FloraDeLuxe/assets",
);
const OUT = path.resolve("public/images");

/** Soft editorial grade — cream lift, restrained saturation, subtle warmth. */
async function grade(pipeline) {
  return pipeline
    .modulate({ brightness: 0.98, saturation: 0.86, hue: 0 })
    .linear(1.06, -6)
    .sharpen({ sigma: 0.6 });
}

async function writeWebp(srcName, destRel, width, height, position = "centre") {
  const src = path.join(ASSETS, srcName);
  const dest = path.join(OUT, destRel);
  await mkdir(path.dirname(dest), { recursive: true });

  let pipeline = sharp(src).rotate().resize(width, height, {
    fit: "cover",
    position,
  });
  pipeline = await grade(pipeline);
  await pipeline.webp({ quality: 82, effort: 5 }).toFile(dest);

  const meta = await sharp(dest).metadata();
  console.log(`✓ ${destRel}  ${meta.width}×${meta.height}`);
}

const jobs = [
  // Categories
  ["gen-category-roses.png", "categories/roses-premium.webp", 1600, 1067, "centre"],
  ["gen-category-chrysanthemums.png", "categories/chrysanthemums-premium.webp", 1200, 1500, "centre"],
  ["gen-category-exotic.png", "categories/exotic-premium.webp", 1200, 1500, "centre"],
  ["gen-category-greenery.png", "categories/greenery-premium.webp", 1200, 1500, "centre"],
  ["gen-category-seasonal.png", "categories/seasonal-premium.webp", 1600, 1067, "centre"],

  // Gallery
  ["gen-gallery-hall.png", "gallery/wholesale-hall-premium.webp", 1600, 2000, "centre"],
  ["gen-gallery-new-delivery.png", "gallery/new-delivery-premium.webp", 2200, 1238, "centre"],
  ["gen-gallery-red-white-roses.png", "gallery/red-white-roses-premium.webp", 1600, 2000, "centre"],
  ["gen-gallery-pink-roses.png", "gallery/pink-roses-premium.webp", 1600, 2000, "centre"],
  ["gen-gallery-baskets.png", "gallery/floral-baskets-premium.webp", 1600, 2000, "centre"],
  ["gen-gallery-packaging.png", "gallery/packaging-materials-premium.webp", 2200, 1238, "centre"],
  ["gen-gallery-order-prep.png", "gallery/order-preparation-premium.webp", 2200, 1238, "centre"],
  ["gen-gallery-cold-storage.png", "gallery/cold-storage-premium.webp", 2200, 1238, "centre"],

  // Suppliers
  ["gen-suppliers-netherlands.png", "suppliers/netherlands.webp", 1600, 1200, "centre"],
  ["gen-suppliers-ecuador.png", "suppliers/ecuador.webp", 1600, 1200, "centre"],
  ["gen-suppliers-ukraine.png", "suppliers/ukraine.webp", 1600, 1200, "centre"],
  ["gen-suppliers-armenia.png", "suppliers/armenia.webp", 1600, 1200, "centre"],

  // About
  ["gen-about-warehouse.png", "about/warehouse-stock.webp", 1600, 2000, "centre"],
  ["gen-about-packaging.png", "about/packaging-area.webp", 2200, 1238, "centre"],

  // Scenes
  ["gen-scene-delivery.png", "scenes/delivery-arrival.webp", 1920, 1440, "centre"],
  ["gen-scene-import.png", "scenes/import-logistics.webp", 1920, 1440, "centre"],
  ["gen-scene-telegram.png", "scenes/telegram-desk.webp", 1920, 1440, "centre"],
  ["gen-scene-contacts.png", "scenes/contacts-entrance.webp", 1920, 1440, "centre"],
  ["gen-scene-faq.png", "scenes/faq-desk.webp", 1920, 1440, "centre"],
  ["gen-scene-final-bouquet.png", "scenes/final-bouquet.webp", 1920, 1440, "centre"],
  ["gen-scene-assortment.png", "scenes/assortment.webp", 1920, 1440, "centre"],

  // OG
  ["gen-og-cover.png", "og/cover.webp", 1200, 630, "centre"],
];

for (const job of jobs) {
  await writeWebp(...job);
}

console.log(`\nDone — ${jobs.length} images written under public/images/`);
