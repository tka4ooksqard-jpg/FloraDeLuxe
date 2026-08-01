/**
 * Generates the abstract placeholder artwork that ships with the repository.
 *
 * These files are deliberately NOT photographs: the project has no confirmed
 * imagery from Flora de Luxe yet, and using stock photos of unrelated
 * warehouses as if they were the company's own would be misleading. The output
 * is brand-toned gradient art that keeps the layout intact until real assets
 * land in the folders listed in `public/images/README.md`.
 *
 * Usage: pnpm placeholders
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Small deterministic PRNG so regenerating the assets is reproducible. */
function createRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

/** Layered rosette silhouette that reads as a flower head rather than a dot. */
function bloom(cx, cy, radius, tone, random) {
  const petals = [];
  const rings = [
    { count: 8, scale: 1, alpha: 0.34 },
    { count: 6, scale: 0.66, alpha: 0.46 },
    { count: 4, scale: 0.36, alpha: 0.6 },
  ];

  for (const ring of rings) {
    const offset = random() * 360;
    for (let p = 0; p < ring.count; p += 1) {
      const angle = offset + (360 / ring.count) * p;
      const distance = radius * ring.scale * 0.52;
      const rad = (angle * Math.PI) / 180;
      const px = cx + Math.cos(rad) * distance;
      const py = cy + Math.sin(rad) * distance * 0.86;
      const rx = radius * ring.scale * (0.5 + random() * 0.16);
      const ry = rx * (0.66 + random() * 0.2);
      petals.push(
        `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(
          1,
        )}" fill="${tone}" opacity="${ring.alpha}" transform="rotate(${angle.toFixed(
          1,
        )} ${px.toFixed(1)} ${py.toFixed(1)})" />`,
      );
    }
  }

  return petals.join("");
}

/**
 * Draws a dense field of stems so the artwork suggests wholesale bunches
 * instead of a single gift bouquet.
 */
function botanicalLayer(width, height, seed, tone, opacity, stemCount, scale) {
  const random = createRandom(seed);
  const parts = [];

  for (let i = 0; i < stemCount; i += 1) {
    const baseX = width * (-0.05 + ((i + random() * 0.7) / stemCount) * 1.1);
    const baseY = height * (1.04 + random() * 0.08);
    const topY = height * (0.08 + random() * 0.46);
    const bend = width * (random() * 0.1 - 0.05);
    const headX = baseX + bend * 0.5;

    parts.push(
      `<path d="M ${baseX.toFixed(1)} ${baseY.toFixed(1)} C ${(baseX + bend).toFixed(1)} ${(
        baseY * 0.72
      ).toFixed(1)}, ${(baseX - bend).toFixed(1)} ${(topY * 1.35).toFixed(1)}, ${headX.toFixed(
        1,
      )} ${topY.toFixed(1)}" fill="none" stroke="${tone}" stroke-width="${(
        width * 0.0022 * scale
      ).toFixed(2)}" stroke-linecap="round" opacity="0.5" />`,
    );

    const leaves = 2 + Math.floor(random() * 3);
    for (let l = 0; l < leaves; l += 1) {
      const t = 0.18 + (l / Math.max(leaves, 1)) * 0.6;
      const lx = baseX + bend * t;
      const ly = baseY - (baseY - topY) * t;
      const rx = width * (0.02 + random() * 0.026) * scale;
      const ry = rx * (0.26 + random() * 0.16);
      const angle = (random() * 130 - 65).toFixed(1);
      parts.push(
        `<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(
          1,
        )}" fill="${tone}" opacity="0.4" transform="rotate(${angle} ${lx.toFixed(1)} ${ly.toFixed(
          1,
        )})" />`,
      );
    }

    parts.push(bloom(headX, topY, width * (0.032 + random() * 0.026) * scale, tone, random));
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><g opacity="${opacity}">${parts.join(
    "",
  )}</g></svg>`;
}

/**
 * A single rosette: two rings of shaded petals around a tight centre.
 *
 * Petal counts, spacing and the overall squash are all randomised — identical
 * heads repeated across the frame are what make generated florals look like a
 * pattern instead of a photograph.
 */
function bloomHead(cx, cy, radius, fill, random) {
  const parts = [];
  const spin = random() * 360;
  const rings = [
    {
      count: 7 + Math.floor(random() * 5),
      distance: 0.44 + random() * 0.14,
      size: 0.48 + random() * 0.16,
      squash: 0.5 + random() * 0.2,
      opacity: 0.9,
    },
    {
      count: 5 + Math.floor(random() * 3),
      distance: 0.22 + random() * 0.12,
      size: 0.36 + random() * 0.12,
      squash: 0.56 + random() * 0.18,
      opacity: 1,
    },
  ];

  for (const ring of rings) {
    for (let p = 0; p < ring.count; p += 1) {
      const angle = spin + (360 / ring.count) * p + (random() * 16 - 8);
      const rad = (angle * Math.PI) / 180;
      const px = cx + Math.cos(rad) * radius * ring.distance;
      const py = cy + Math.sin(rad) * radius * ring.distance;
      const rx = radius * ring.size * (0.78 + random() * 0.44);
      const ry = rx * ring.squash;
      parts.push(
        `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(
          1,
        )}" fill="${fill}" opacity="${(ring.opacity * (0.78 + random() * 0.22)).toFixed(
          2,
        )}" transform="rotate(${angle.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})" />`,
      );
    }
  }

  parts.push(
    `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(radius * 0.15).toFixed(
      1,
    )}" fill="${fill}" opacity="0.8" />`,
  );

  // Tilt and flatten the finished head so no two read as the same stamp.
  const tilt = (random() * 70 - 35).toFixed(1);
  const squashX = (0.78 + random() * 0.4).toFixed(3);
  const squashY = (0.78 + random() * 0.4).toFixed(3);
  return `<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(
    1,
  )}) rotate(${tilt}) scale(${squashX} ${squashY}) translate(${(-cx).toFixed(1)} ${(-cy).toFixed(
    1,
  )})">${parts.join("")}</g>`;
}

/**
 * A wall of flower heads on a jittered grid.
 *
 * Stacking two or three of these at different blur radii is what sells the
 * scale of a wholesale floor: an even mass of blooms receding into softness,
 * rather than a handful of stems on an empty background.
 */
function flowerWall(width, height, seed, { columns, rows, radius, palette, opacity = 1, spread = 0.62 }) {
  const random = createRandom(seed);

  // One gradient per palette entry; each petal shades itself against its own
  // bounding box, which is what gives the heads volume.
  const defs = palette
    .map(
      ([light, dark], index) =>
        `<radialGradient id="pal${index}" cx="0.36" cy="0.28" r="0.82">
          <stop offset="0%" stop-color="${light}" />
          <stop offset="100%" stop-color="${dark}" />
        </radialGradient>`,
    )
    .join("");

  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const parts = [];

  for (let row = -1; row <= rows; row += 1) {
    for (let column = -1; column <= columns; column += 1) {
      const cx = (column + 0.5 + (random() - 0.5) * spread) * cellWidth;
      const cy = (row + 0.5 + (random() - 0.5) * spread) * cellHeight;
      const size = cellWidth * (radius.min + random() * (radius.max - radius.min));
      const fill = `url(#pal${Math.floor(random() * palette.length)})`;
      parts.push(bloomHead(cx, cy, size, fill, random));
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs>${defs}</defs><g opacity="${opacity}">${parts.join(
    "",
  )}</g></svg>`;
}

/**
 * Out-of-focus highlight orbs. Rasterised behind the botanical fields, this is
 * what gives the hero art a shallow depth of field instead of a flat wash.
 */
function bokehLayer(width, height, seed, { count, min, max, tones, alpha: range }) {
  const random = createRandom(seed);
  const { min: alphaMin = 0.08, max: alphaMax = 0.32 } = range ?? {};
  const defs = [];
  const orbs = [];

  for (let i = 0; i < count; i += 1) {
    const cx = width * (-0.1 + random() * 1.2);
    const cy = height * (-0.05 + random() * 1.1);
    const radius = width * (min + random() * (max - min));
    const tone = tones[Math.floor(random() * tones.length)];
    const alpha = alphaMin + random() * (alphaMax - alphaMin);

    defs.push(
      `<radialGradient id="orb${i}">
        <stop offset="0%" stop-color="${tone}" stop-opacity="${alpha.toFixed(3)}" />
        <stop offset="58%" stop-color="${tone}" stop-opacity="${(alpha * 0.62).toFixed(3)}" />
        <stop offset="86%" stop-color="${tone}" stop-opacity="${(alpha * 0.22).toFixed(3)}" />
        <stop offset="100%" stop-color="${tone}" stop-opacity="0" />
      </radialGradient>`,
    );
    orbs.push(
      `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${radius.toFixed(1)}" fill="url(#orb${i})" />`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs>${defs.join(
    "",
  )}</defs>${orbs.join("")}</svg>`;
}

function buildBaseSvg({ width, height, base, glows }) {
  const glowDefs = glows
    .map(
      (glow, index) => `
      <radialGradient id="glow${index}" cx="${glow.cx}" cy="${glow.cy}" r="${glow.r}">
        <stop offset="0%" stop-color="${glow.color}" stop-opacity="${glow.opacity}" />
        <stop offset="100%" stop-color="${glow.color}" stop-opacity="0" />
      </radialGradient>`,
    )
    .join("");

  const glowRects = glows
    .map((_, index) => `<rect width="${width}" height="${height}" fill="url(#glow${index})" />`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${base.from}" />
        <stop offset="55%" stop-color="${base.via}" />
        <stop offset="100%" stop-color="${base.to}" />
      </linearGradient>
      ${glowDefs}
    </defs>
    <rect width="${width}" height="${height}" fill="url(#base)" />
    ${glowRects}
  </svg>`;
}

/** Bottom-weighted veil that keeps overlaid white text readable. */
function buildVeilSvg(width, height, veil = {}) {
  const { top = 0.1, bottom = 0.34, vignette = 0.3 } = veil;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000000" stop-opacity="${top}" />
        <stop offset="45%" stop-color="#000000" stop-opacity="0" />
        <stop offset="100%" stop-color="#0B0709" stop-opacity="${bottom}" />
      </linearGradient>
      <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.78">
        <stop offset="45%" stop-color="#000000" stop-opacity="0" />
        <stop offset="100%" stop-color="#000000" stop-opacity="${vignette}" />
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#veil)" />
    <rect width="${width}" height="${height}" fill="url(#vignette)" />
  </svg>`;
}

/** Every asset generated by this script, grouped by the folder it belongs to. */
const assets = [
  {
    // Portrait: this asset carries the right-hand column of the hero, so it is
    // taller than it is wide and pushed further in contrast than the rest.
    file: "images/hero/wholesale-hall.webp",
    width: 1500,
    height: 1900,
    seed: 11,
    base: { from: "#93213F", via: "#4A1024", to: "#1A060C" },
    glows: [
      { cx: "0.6", cy: "0.16", r: "0.66", color: "#FBD4DB", opacity: "0.5" },
      { cx: "0.24", cy: "0.46", r: "0.56", color: "#C43D5E", opacity: "0.44" },
      { cx: "0.84", cy: "0.68", r: "0.52", color: "#D8BF9C", opacity: "0.34" },
    ],
    // Three receding planes of blooms, sharpest at the front.
    walls: [
      {
        columns: 12,
        rows: 14,
        radius: { min: 0.45, max: 0.8 },
        blur: 0.024,
        opacity: 0.82,
        spread: 0.8,
        palette: [
          ["#6E1730", "#1C060B"],
          ["#571122", "#170509"],
          ["#82203C", "#240810"],
        ],
      },
      {
        columns: 8,
        rows: 10,
        radius: { min: 0.26, max: 0.72 },
        blur: 0.009,
        opacity: 0.55,
        spread: 0.95,
        palette: [
          ["#A93A54", "#320A15"],
          ["#8A2C45", "#26080F"],
          ["#B85F6E", "#3E0D1A"],
        ],
      },
      {
        columns: 5,
        rows: 6,
        radius: { min: 0.2, max: 0.56 },
        blur: 0.003,
        opacity: 0.34,
        spread: 1,
        palette: [
          ["#F2D2D8", "#7E2440"],
          ["#F8E6DC", "#96455C"],
          ["#E3BC9C", "#7A4826"],
        ],
      },
    ],
    bokeh: {
      count: 20,
      min: 0.05,
      max: 0.2,
      tones: ["#FFFFFF", "#FBF0F2", "#EFD9DE", "#E8B27F"],
      alpha: { min: 0.12, max: 0.34 },
    },
    // Light veil only: the CSS mask in the hero does the real fading, so the
    // file itself should stay luminous.
    veil: { top: 0.06, bottom: 0.3, vignette: 0.24 },
  },
  // ------------------------------------------------------------------
  // Categories & suppliers share one "studio session": soft side light,
  // warm bordeaux undertone, shallow depth of field via stacked walls.
  // Regional accent shifts stay inside that grade so nothing looks stock.
  // ------------------------------------------------------------------
  {
    file: "images/categories/roses.webp",
    width: 1200,
    height: 1500,
    seed: 21,
    base: { from: "#6A1830", via: "#3A0F1C", to: "#16060C" },
    glows: [
      { cx: "0.62", cy: "0.22", r: "0.62", color: "#F2D4DA", opacity: "0.42" },
      { cx: "0.28", cy: "0.72", r: "0.55", color: "#8A2440", opacity: "0.4" },
    ],
    walls: [
      {
        columns: 9,
        rows: 11,
        radius: { min: 0.4, max: 0.78 },
        blur: 0.02,
        opacity: 0.78,
        palette: [
          ["#7A1C36", "#1E070E"],
          ["#5A1226", "#14050A"],
          ["#9A3550", "#2A0A16"],
        ],
      },
      {
        columns: 5,
        rows: 6,
        radius: { min: 0.22, max: 0.55 },
        blur: 0.004,
        opacity: 0.4,
        palette: [
          ["#F0D0D6", "#7A2A42"],
          ["#E8B8C2", "#5A1830"],
        ],
      },
    ],
    bokeh: {
      count: 12,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#FBF0F2", "#EFD9DE"],
      alpha: { min: 0.1, max: 0.28 },
    },
    veil: { top: 0.08, bottom: 0.42, vignette: 0.28 },
  },
  {
    file: "images/categories/chrysanthemums.webp",
    width: 1200,
    height: 1500,
    seed: 22,
    base: { from: "#5A3A22", via: "#3A2416", to: "#16100C" },
    glows: [
      { cx: "0.58", cy: "0.24", r: "0.6", color: "#F4E2C4", opacity: "0.4" },
      { cx: "0.3", cy: "0.74", r: "0.52", color: "#8A5A30", opacity: "0.36" },
    ],
    walls: [
      {
        columns: 9,
        rows: 11,
        radius: { min: 0.38, max: 0.74 },
        blur: 0.02,
        opacity: 0.76,
        palette: [
          ["#B8844A", "#2A1810"],
          ["#8A5A2E", "#1A100A"],
          ["#D4A86A", "#3A2214"],
        ],
      },
      {
        columns: 5,
        rows: 6,
        radius: { min: 0.2, max: 0.52 },
        blur: 0.004,
        opacity: 0.38,
        palette: [
          ["#F8E8CC", "#8A5A30"],
          ["#E8D0A8", "#6A4020"],
        ],
      },
    ],
    bokeh: {
      count: 12,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#FBF4E8", "#E8D4B0"],
      alpha: { min: 0.1, max: 0.26 },
    },
    veil: { top: 0.08, bottom: 0.42, vignette: 0.28 },
  },
  {
    file: "images/categories/exotic.webp",
    width: 1200,
    height: 1500,
    seed: 23,
    base: { from: "#3A2038", via: "#241828", to: "#100C14" },
    glows: [
      { cx: "0.6", cy: "0.2", r: "0.58", color: "#E0C0D4", opacity: "0.36" },
      { cx: "0.28", cy: "0.76", r: "0.5", color: "#3A6A5A", opacity: "0.28" },
    ],
    walls: [
      {
        columns: 9,
        rows: 11,
        radius: { min: 0.36, max: 0.72 },
        blur: 0.02,
        opacity: 0.74,
        palette: [
          ["#6A3A62", "#1A1018"],
          ["#4A2848", "#120C14"],
          ["#3A5A4E", "#101814"],
        ],
      },
      {
        columns: 5,
        rows: 6,
        radius: { min: 0.2, max: 0.5 },
        blur: 0.004,
        opacity: 0.36,
        palette: [
          ["#E8D0E0", "#5A3A58"],
          ["#C8E0D4", "#3A5A4E"],
        ],
      },
    ],
    bokeh: {
      count: 12,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#F0E4F0", "#D8E8E0"],
      alpha: { min: 0.1, max: 0.26 },
    },
    veil: { top: 0.08, bottom: 0.42, vignette: 0.28 },
  },
  {
    file: "images/categories/greenery.webp",
    width: 1200,
    height: 1500,
    seed: 24,
    base: { from: "#1A3228", via: "#12241C", to: "#0A1410" },
    glows: [
      { cx: "0.55", cy: "0.22", r: "0.58", color: "#C8E0D0", opacity: "0.34" },
      { cx: "0.3", cy: "0.74", r: "0.5", color: "#2A4A3A", opacity: "0.36" },
    ],
    walls: [
      {
        columns: 9,
        rows: 11,
        radius: { min: 0.36, max: 0.7 },
        blur: 0.02,
        opacity: 0.74,
        palette: [
          ["#2E5445", "#0C1812"],
          ["#1E3A31", "#08120E"],
          ["#4A6A58", "#14241C"],
        ],
      },
      {
        columns: 5,
        rows: 6,
        radius: { min: 0.18, max: 0.48 },
        blur: 0.004,
        opacity: 0.34,
        palette: [
          ["#D8EDE0", "#2E5445"],
          ["#B8D4C4", "#1E3A31"],
        ],
      },
    ],
    bokeh: {
      count: 12,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#E8F4EC", "#C8E0D0"],
      alpha: { min: 0.1, max: 0.24 },
    },
    veil: { top: 0.08, bottom: 0.42, vignette: 0.28 },
  },
  {
    file: "images/categories/seasonal.webp",
    width: 1200,
    height: 1500,
    seed: 25,
    base: { from: "#5A2834", via: "#3A1A22", to: "#160C10" },
    glows: [
      { cx: "0.58", cy: "0.22", r: "0.6", color: "#F4D8C8", opacity: "0.4" },
      { cx: "0.28", cy: "0.74", r: "0.5", color: "#8A4A48", opacity: "0.34" },
    ],
    walls: [
      {
        columns: 9,
        rows: 11,
        radius: { min: 0.38, max: 0.74 },
        blur: 0.02,
        opacity: 0.76,
        palette: [
          ["#A85A58", "#2A1216"],
          ["#6B2438", "#160A10"],
          ["#C08A7A", "#3A1E22"],
        ],
      },
      {
        columns: 5,
        rows: 6,
        radius: { min: 0.2, max: 0.52 },
        blur: 0.004,
        opacity: 0.38,
        palette: [
          ["#F8E4D8", "#8A4A48"],
          ["#E8C8B8", "#6A3040"],
        ],
      },
    ],
    bokeh: {
      count: 12,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#FBF0E8", "#EFD9DE"],
      alpha: { min: 0.1, max: 0.26 },
    },
    veil: { top: 0.08, bottom: 0.42, vignette: 0.28 },
  },
  {
    file: "images/suppliers/netherlands.webp",
    width: 1000,
    height: 750,
    seed: 31,
    base: { from: "#4A1A28", via: "#2A1018", to: "#14080C" },
    glows: [{ cx: "0.4", cy: "0.3", r: "0.66", color: "#F2D0C0", opacity: "0.4" }],
    walls: [
      {
        columns: 10,
        rows: 8,
        radius: { min: 0.36, max: 0.7 },
        blur: 0.018,
        opacity: 0.72,
        palette: [
          ["#A33A44", "#220C12"],
          ["#7A2834", "#16080C"],
          ["#C06A58", "#2A1214"],
        ],
      },
    ],
    bokeh: {
      count: 10,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#F8E8DC", "#EFD9DE"],
      alpha: { min: 0.1, max: 0.26 },
    },
    veil: { top: 0.08, bottom: 0.38, vignette: 0.26 },
  },
  {
    file: "images/suppliers/ecuador.webp",
    width: 1000,
    height: 750,
    seed: 32,
    base: { from: "#4A1226", via: "#2A0A14", to: "#120508" },
    glows: [{ cx: "0.62", cy: "0.32", r: "0.64", color: "#E8A0B0", opacity: "0.42" }],
    walls: [
      {
        columns: 10,
        rows: 8,
        radius: { min: 0.36, max: 0.7 },
        blur: 0.018,
        opacity: 0.74,
        palette: [
          ["#8E1F3A", "#1C0A12"],
          ["#5A1226", "#120508"],
          ["#C44A62", "#2A0C16"],
        ],
      },
    ],
    bokeh: {
      count: 10,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#FBF0F2", "#EFD9DE"],
      alpha: { min: 0.1, max: 0.28 },
    },
    veil: { top: 0.08, bottom: 0.38, vignette: 0.26 },
  },
  {
    file: "images/suppliers/ukraine.webp",
    width: 1000,
    height: 750,
    seed: 33,
    base: { from: "#1E3A31", via: "#14241C", to: "#0A1410" },
    glows: [{ cx: "0.38", cy: "0.62", r: "0.64", color: "#E8D8A8", opacity: "0.36" }],
    walls: [
      {
        columns: 10,
        rows: 8,
        radius: { min: 0.34, max: 0.66 },
        blur: 0.018,
        opacity: 0.72,
        palette: [
          ["#4A6A40", "#121C12"],
          ["#1E3A31", "#0A1410"],
          ["#7A8A4A", "#1A2414"],
        ],
      },
    ],
    bokeh: {
      count: 10,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#F4F0DC", "#D8E0C8"],
      alpha: { min: 0.1, max: 0.24 },
    },
    veil: { top: 0.08, bottom: 0.38, vignette: 0.26 },
  },
  {
    file: "images/suppliers/armenia.webp",
    width: 1000,
    height: 750,
    seed: 34,
    base: { from: "#3A1A28", via: "#221018", to: "#120A0E" },
    glows: [{ cx: "0.58", cy: "0.58", r: "0.62", color: "#E2B08C", opacity: "0.38" }],
    walls: [
      {
        columns: 10,
        rows: 8,
        radius: { min: 0.34, max: 0.66 },
        blur: 0.018,
        opacity: 0.72,
        palette: [
          ["#8A4A46", "#1A1014"],
          ["#5A2830", "#120A0E"],
          ["#B07A5A", "#2A1614"],
        ],
      },
    ],
    bokeh: {
      count: 10,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#F8E2D2", "#EFD9DE"],
      alpha: { min: 0.1, max: 0.24 },
    },
    veil: { top: 0.08, bottom: 0.38, vignette: 0.26 },
  },
  {
    file: "images/about/hall.webp",
    width: 1400,
    height: 1050,
    seed: 41,
    base: { from: "#20191A", via: "#4A2A32", to: "#141012" },
    glows: [
      { cx: "0.25", cy: "0.3", r: "0.62", color: "#D9AFA0", opacity: "0.36" },
      { cx: "0.8", cy: "0.75", r: "0.5", color: "#A98456", opacity: "0.28" },
    ],
    walls: [
      {
        columns: 11,
        rows: 8,
        radius: { min: 0.3, max: 0.6 },
        blur: 0.022,
        opacity: 0.55,
        palette: [
          ["#5A2A34", "#141012"],
          ["#3A1A22", "#100C0E"],
          ["#6A4A3A", "#1A1210"],
        ],
      },
    ],
    bokeh: {
      count: 14,
      min: 0.04,
      max: 0.16,
      tones: ["#FFFFFF", "#F3E5DC", "#D8BF9C"],
      alpha: { min: 0.08, max: 0.22 },
    },
    veil: { top: 0.1, bottom: 0.4, vignette: 0.3 },
  },
  {
    file: "images/about/craft.webp",
    width: 1000,
    height: 1250,
    seed: 42,
    base: { from: "#2E1A1E", via: "#6B3A38", to: "#171112" },
    glows: [{ cx: "0.42", cy: "0.28", r: "0.66", color: "#EFC9B4", opacity: "0.4" }],
    walls: [
      {
        columns: 8,
        rows: 10,
        radius: { min: 0.32, max: 0.64 },
        blur: 0.018,
        opacity: 0.62,
        palette: [
          ["#6B3A38", "#171112"],
          ["#4A2428", "#120C0E"],
          ["#8A5A48", "#221410"],
        ],
      },
    ],
    bokeh: {
      count: 10,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#FBEADF", "#EFD9DE"],
      alpha: { min: 0.1, max: 0.24 },
    },
    veil: { top: 0.1, bottom: 0.4, vignette: 0.28 },
  },
  {
    file: "images/og/cover.webp",
    width: 1200,
    height: 630,
    seed: 51,
    base: { from: "#2A0B16", via: "#4A1226", to: "#191614" },
    glows: [
      { cx: "0.2", cy: "0.3", r: "0.7", color: "#C6879A", opacity: "0.45" },
      { cx: "0.85", cy: "0.75", r: "0.6", color: "#A98456", opacity: "0.3" },
    ],
    walls: [
      {
        columns: 12,
        rows: 7,
        radius: { min: 0.32, max: 0.62 },
        blur: 0.016,
        opacity: 0.58,
        palette: [
          ["#5A1226", "#191614"],
          ["#7A2A3A", "#1A0A10"],
          ["#A98456", "#2A1810"],
        ],
      },
    ],
    bokeh: {
      count: 12,
      min: 0.04,
      max: 0.14,
      tones: ["#FFFFFF", "#F6E7DD", "#EFD9DE"],
      alpha: { min: 0.1, max: 0.26 },
    },
    veil: { top: 0.12, bottom: 0.36, vignette: 0.28 },
  },
];

async function rasterize(svg, width, height, blur) {
  const pipeline = sharp(Buffer.from(svg), { density: 96 }).resize(width, height);
  return (blur ? pipeline.blur(blur) : pipeline).png().toBuffer();
}

async function main() {
  for (const asset of assets) {
    const { width, height, seed, botanical, bokeh, walls } = asset;
    const target = join(root, "public", asset.file);
    await mkdir(dirname(target), { recursive: true });

    const layers = [];

    for (const [index, wall] of (walls ?? []).entries()) {
      const svg = flowerWall(width, height, seed + index * 331, wall);
      layers.push({ input: await rasterize(svg, width, height, Math.max(1, width * wall.blur)) });
    }

    if (bokeh) {
      const svg = bokehLayer(width, height, seed + 613, bokeh);
      layers.push({ input: await rasterize(svg, width, height, Math.max(4, width * 0.006)) });
    }

    if (botanical) {
      // Out-of-focus back field, then a crisper foreground field: the depth cue
      // is what stops flat vector art from looking like clip art.
      const back = botanicalLayer(
        width,
        height,
        seed,
        botanical.tone,
        botanical.opacity * 0.75,
        botanical.back?.count ?? 16,
        botanical.back?.scale ?? 1.25,
      );
      const front = botanicalLayer(
        width,
        height,
        seed + 977,
        botanical.tone,
        botanical.opacity,
        botanical.front?.count ?? 9,
        botanical.front?.scale ?? 0.85,
      );
      const backBlur = Math.max(6, width * (botanical.back?.blur ?? 0.012));
      const frontBlur = Math.max(1, width * (botanical.front?.blur ?? 0.0012));
      layers.push({ input: await rasterize(back, width, height, backBlur) });
      layers.push({ input: await rasterize(front, width, height, frontBlur) });
    }

    layers.push({ input: await rasterize(buildVeilSvg(width, height, asset.veil), width, height, 0) });

    const buffer = await sharp(Buffer.from(buildBaseSvg(asset)))
      .resize(width, height)
      .composite(layers)
      .webp({ quality: 80, effort: 6 })
      .toBuffer();

    await writeFile(target, buffer);
    process.stdout.write(`generated ${asset.file} (${(buffer.byteLength / 1024).toFixed(1)} KB)\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
});
