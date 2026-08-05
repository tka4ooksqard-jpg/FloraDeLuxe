/**
 * Art-direction pass 2:
 * - Prefer client archive real-media for categories & core gallery (authentic wholesale)
 * - Replace branded / text-baked AI frames with clean pass2 assets
 * - Apply one restrained cream–wine grade
 *
 * Usage: node scripts/apply-brand-photoset-pass2.mjs
 */
import sharp from "sharp";
import { mkdir, access } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ASSETS = path.resolve(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-Users-User-Desktop-FloraDeLuxe/assets",
);
const ARCHIVE = path.join(ROOT, "public/images/archive/real-media");
const OUT = path.join(ROOT, "public/images");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/** Restrained editorial grade — less saturation, soft warm lift, slight contrast. */
function grade(pipeline) {
  return pipeline
    .modulate({ brightness: 0.97, saturation: 0.78 })
    .linear(1.05, -5)
    .sharpen({ sigma: 0.55 });
}

async function writeWebp(srcAbs, destRel, width, height, position = "centre") {
  if (!(await exists(srcAbs))) {
    throw new Error(`Missing source: ${srcAbs}`);
  }
  const dest = path.join(OUT, destRel);
  await mkdir(path.dirname(dest), { recursive: true });
  let pipeline = sharp(srcAbs).rotate().resize(width, height, { fit: "cover", position });
  pipeline = grade(pipeline);
  await pipeline.webp({ quality: 80, effort: 5 }).toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(`✓ ${destRel}  ← ${path.relative(ROOT, srcAbs)}  (${meta.width}×${meta.height})`);
}

const archive = (rel) => path.join(ARCHIVE, rel);
const asset = (name) => path.join(ASSETS, name);

const jobs = [
  // —— Categories: real client archive (no baked text / foreign brands)
  [archive("categories/roses.webp"), "categories/roses-premium.webp", 1600, 1067, "left"],
  [archive("categories/chrysanthemums.webp"), "categories/chrysanthemums-premium.webp", 1200, 1500, "centre"],
  [archive("categories/exotic.webp"), "categories/exotic-premium.webp", 1200, 1500, "centre"],
  [archive("categories/greenery.webp"), "categories/greenery-premium.webp", 1200, 1500, "centre"],
  [archive("categories/seasonal.webp"), "categories/seasonal-premium.webp", 1600, 1067, "centre"],

  // —— Gallery: real archive + clean cold storage / order prep
  [archive("gallery/warehouse-overview.webp"), "gallery/wholesale-hall-premium.webp", 1600, 2000, "centre"],
  [archive("gallery/flower-floor.webp"), "gallery/new-delivery-premium.webp", 2200, 1238, "centre"],
  [archive("gallery/red-white-roses.webp"), "gallery/red-white-roses-premium.webp", 1600, 2000, "centre"],
  [archive("gallery/pink-roses.webp"), "gallery/pink-roses-premium.webp", 1600, 2000, "centre"],
  [archive("gallery/baskets.webp"), "gallery/floral-baskets-premium.webp", 1600, 2000, "centre"],
  [archive("gallery/packaging-stock.webp"), "gallery/packaging-materials-premium.webp", 2200, 1238, "centre"],
  [asset("pass2-order-prep.png"), "gallery/order-preparation-premium.webp", 2200, 1238, "centre"],
  [asset("pass2-cold-storage.png"), "gallery/cold-storage-premium.webp", 2200, 1238, "centre"],

  // —— Suppliers: clean product stills, no logos
  [asset("pass2-suppliers-netherlands.png"), "suppliers/netherlands.webp", 1600, 1200, "centre"],
  [asset("pass2-suppliers-ecuador.png"), "suppliers/ecuador.webp", 1600, 1200, "centre"],
  [asset("pass2-suppliers-ukraine.png"), "suppliers/ukraine.webp", 1600, 1200, "centre"],
  [asset("pass2-suppliers-armenia.png"), "suppliers/armenia.webp", 1600, 1200, "centre"],

  // —— About: clean hall / packing (no foreign brands)
  [asset("pass2-hall.png"), "about/warehouse-stock.webp", 1600, 2000, "centre"],
  [asset("pass2-packaging.png"), "about/packaging-area.webp", 2200, 1238, "centre"],

  // —— Scenes
  [asset("pass2-delivery.png"), "scenes/delivery-arrival.webp", 1920, 1440, "centre"],
  [asset("pass2-cold-storage.png"), "scenes/import-logistics.webp", 1920, 1440, "centre"],
  [asset("pass2-contacts.png"), "scenes/contacts-entrance.webp", 1920, 1440, "centre"],
  [asset("pass2-final-bouquet.png"), "scenes/final-bouquet.webp", 1920, 1440, "centre"],
  [archive("categories/mixed-flowers.webp"), "scenes/assortment.webp", 1920, 1440, "centre"],
  [asset("pass2-order-prep.png"), "scenes/telegram-desk.webp", 1920, 1440, "centre"],
  [asset("pass2-packaging.png"), "scenes/faq-desk.webp", 1920, 1440, "centre"],
  [asset("pass2-og.png"), "og/cover.webp", 1200, 630, "centre"],
];

for (const job of jobs) {
  await writeWebp(...job);
}

console.log(`\nPass 2 complete — ${jobs.length} slots rewritten.`);
