/**
 * Downloads real product photos from the public Flora de Luxe OPT Telegram
 * channel and converts them to WebP for site slots.
 *
 * Source: https://t.me/s/floradeluxekyiv_opt
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Post IDs mapped to on-site assets (confirmed product posts from the channel). */
const assets = [
  { post: 8510, file: "images/categories/roses.webp", width: 1200, height: 1500 },
  { post: 8524, file: "images/categories/exotic.webp", width: 1200, height: 1500 },
  { post: 8523, file: "images/categories/greenery.webp", width: 1200, height: 1500 },
  { post: 8519, file: "images/categories/seasonal.webp", width: 1200, height: 1500 },
  { post: 8519, file: "images/suppliers/netherlands.webp", width: 1000, height: 750 },
  { post: 8518, file: "images/suppliers/ecuador.webp", width: 1000, height: 750 },
  { post: 8512, file: "images/suppliers/armenia.webp", width: 1000, height: 750 },
  { post: 8511, file: "images/suppliers/ukraine.webp", width: 1000, height: 750 },
  { post: 8510, file: "images/hero/wholesale-hall.webp", width: 1500, height: 1900 },
  { post: 8511, file: "images/about/hall.webp", width: 1400, height: 1050 },
  { post: 8516, file: "images/about/craft.webp", width: 1000, height: 1250 },
  { post: 8516, file: "images/warehouse/bunches.webp", width: 1400, height: 1050 },
  { post: 8520, file: "images/warehouse/picking.webp", width: 1400, height: 1050 },
  { post: 8523, file: "images/warehouse/sorting.webp", width: 1400, height: 1050 },
  { post: 8519, file: "images/warehouse/cold-room.webp", width: 1400, height: 1050 },
  { post: 8510, file: "images/warehouse/unloading.webp", width: 1600, height: 1200 },
  { post: 8510, file: "images/og/cover.webp", width: 1200, height: 630 },
];

async function ogImage(postId) {
  const res = await fetch(`https://t.me/floradeluxekyiv_opt/${postId}`, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; FloraDeLuxeBot/1.0)" },
  });
  const html = await res.text();
  const match = html.match(/property="og:image"\s+content="([^"]+)"/i);
  if (!match) throw new Error(`No og:image for post ${postId}`);
  return match[1].replace(/&#x2F;/g, "/");
}

async function main() {
  const cache = new Map();

  for (const asset of assets) {
    if (!cache.has(asset.post)) {
      const url = await ogImage(asset.post);
      const imgRes = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; FloraDeLuxeBot/1.0)" },
      });
      if (!imgRes.ok) throw new Error(`Failed to download post ${asset.post}: ${imgRes.status}`);
      cache.set(asset.post, Buffer.from(await imgRes.arrayBuffer()));
      process.stdout.write(`fetched post ${asset.post} (${cache.get(asset.post).byteLength} B)\n`);
    }

    const target = join(root, "public", asset.file);
    await mkdir(dirname(target), { recursive: true });
    await sharp(cache.get(asset.post))
      .rotate()
      .resize(asset.width, asset.height, { fit: "cover", position: "centre" })
      .webp({ quality: 82, effort: 6 })
      .toFile(target);
    process.stdout.write(`wrote ${asset.file}\n`);
  }

  // Chrysanthemums: reuse a pack photo until a dedicated хризантема post is mapped.
  // Prefer post 8516 (Heidi rose pack still reads as wholesale bunches) only if no better;
  // keep seasonal as tanacetum; for chrysanthemums search was empty in recent feed —
  // fall back to craft/pack imagery reused once.
  const chrysTarget = join(root, "public/images/categories/chrysanthemums.webp");
  const source = cache.get(8516) ?? cache.get(8510);
  await sharp(source)
    .rotate()
    .resize(1200, 1500, { fit: "cover", position: "centre" })
    .webp({ quality: 82, effort: 6 })
    .toFile(chrysTarget);
  process.stdout.write("wrote images/categories/chrysanthemums.webp (reused wholesale pack)\n");

  // Tiny blur for hero
  const heroBuf = await sharp(join(root, "public/images/hero/wholesale-hall.webp"))
    .resize(12, 16)
    .webp({ quality: 40 })
    .toBuffer();
  await writeFile(
    join(root, "scripts/_hero-blur.txt"),
    `data:image/webp;base64,${heroBuf.toString("base64")}`,
  );
  process.stdout.write("wrote scripts/_hero-blur.txt\n");
}

main().catch((error) => {
  process.stderr.write(`${error}\n`);
  process.exitCode = 1;
});
