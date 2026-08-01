/**
 * Grade + export assortment + gallery premium photoset to public/images.
 */
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS = path.join(
  process.env.USERPROFILE ?? "",
  ".cursor/projects/c-Users-User-Desktop-FloraDeLuxe/assets",
);
const OUT = path.join(process.cwd(), "public", "images");

async function exportWebp(srcName, destRel, width, height) {
  const src = path.join(ASSETS, srcName);
  await access(src);
  const dest = path.join(OUT, destRel);
  await mkdir(path.dirname(dest), { recursive: true });

  await sharp(src)
    .rotate()
    .resize({ width, height, fit: "cover", position: "attention" })
    .modulate({ brightness: 0.97, saturation: 0.84, hue: -1 })
    .linear(0.94, 6)
    .gamma(1.04)
    .sharpen({ sigma: 0.55 })
    .webp({ quality: 85, effort: 5, smartSubsample: true })
    .toFile(dest);

  console.log(`✓ ${destRel} (${width}×${height})`);
}

const jobs = [
  // Categories — wide 1600×1067 (~3:2), portrait 1200×1500 (4:5)
  ["cat-roses-premium.png", "categories/roses-premium.webp", 1600, 1067],
  ["cat-chrysanthemums-v2.png", "categories/chrysanthemums-premium.webp", 1200, 1500],
  ["cat-exotic-premium.png", "categories/exotic-premium.webp", 1200, 1500],
  ["cat-greenery-premium.png", "categories/greenery-premium.webp", 1200, 1500],
  ["cat-seasonal-v2.png", "categories/seasonal-premium.webp", 1600, 1067],

  // Gallery
  ["gal-wholesale-hall-premium.png", "gallery/wholesale-hall-premium.webp", 1600, 2000],
  ["gal-new-delivery-premium.png", "gallery/new-delivery-premium.webp", 2200, 1238],
  ["gal-red-white-roses-premium.png", "gallery/red-white-roses-premium.webp", 1600, 2000],
  ["gal-pink-roses-premium.png", "gallery/pink-roses-premium.webp", 1600, 2000],
  ["gal-floral-baskets-premium.png", "gallery/floral-baskets-premium.webp", 1600, 2000],
  ["gal-packaging-materials-premium.png", "gallery/packaging-materials-premium.webp", 2200, 1238],
  ["gal-order-preparation-premium.png", "gallery/order-preparation-premium.webp", 2200, 1238],
  ["gal-cold-storage-premium.png", "gallery/cold-storage-premium.webp", 1600, 2000],
];

for (const job of jobs) {
  await exportWebp(...job);
}

console.log(`\nDone — ${jobs.length} premium WebP files.`);
