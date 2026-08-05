/**
 * Brand cleanup pass: overwrite active slots that had foreign tags / blank packaging
 * with Flora De Luxe–clean frames (same paths, no content wiring changes).
 *
 * Usage: node scripts/apply-brand-cleanup.mjs
 */
import sharp from "sharp";
import { mkdir, access } from "node:fs/promises";
import path from "node:path";

const ASSETS = path.resolve(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-Users-User-Desktop-FloraDeLuxe/assets",
);
const OUT = path.resolve("public/images");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function grade(pipeline) {
  return pipeline
    .modulate({ brightness: 0.97, saturation: 0.8 })
    .linear(1.05, -5)
    .sharpen({ sigma: 0.55 });
}

async function write(srcName, destRel, width, height, position = "centre") {
  const src = path.join(ASSETS, srcName);
  if (!(await exists(src))) throw new Error(`Missing ${src}`);
  const dest = path.join(OUT, destRel);
  await mkdir(path.dirname(dest), { recursive: true });
  let pipeline = sharp(src).rotate().resize(width, height, { fit: "cover", position });
  pipeline = grade(pipeline);
  await pipeline.webp({ quality: 80, effort: 5 }).toFile(dest);
  console.log(`✓ ${destRel}`);
}

const jobs = [
  ["brand-cat-roses.png", "categories/roses-premium.webp", 1600, 1067, "left"],
  ["brand-cat-chrys.png", "categories/chrysanthemums-premium.webp", 1200, 1500, "centre"],
  ["brand-cat-exotic.png", "categories/exotic-premium.webp", 1200, 1500, "centre"],
  ["brand-cold.png", "gallery/cold-storage-premium.webp", 2200, 1238, "centre"],
  ["brand-packaging.png", "gallery/packaging-materials-premium.webp", 2200, 1238, "centre"],
  ["brand-packaging.png", "about/packaging-area.webp", 2200, 1238, "centre"],
  ["brand-packaging.png", "scenes/faq-desk.webp", 1920, 1440, "centre"],
  ["brand-delivery.png", "scenes/delivery-arrival.webp", 1920, 1440, "centre"],
  ["brand-order-prep.png", "gallery/order-preparation-premium.webp", 2200, 1238, "centre"],
  ["brand-order-prep.png", "scenes/telegram-desk.webp", 1920, 1440, "centre"],
  ["brand-sup-ecuador.png", "suppliers/ecuador.webp", 1600, 1200, "centre"],
  ["brand-sup-nl.png", "suppliers/netherlands.webp", 1600, 1200, "centre"],
  ["brand-sup-ukraine.png", "suppliers/ukraine.webp", 1600, 1200, "centre"],
  ["brand-sup-armenia.png", "suppliers/armenia.webp", 1600, 1200, "centre"],
  ["brand-cold.png", "scenes/import-logistics.webp", 1920, 1440, "centre"],
];

for (const job of jobs) await write(...job);
console.log(`\nBrand cleanup done — ${jobs.length} files updated.`);
