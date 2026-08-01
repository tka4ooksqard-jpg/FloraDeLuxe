/**
 * Firm mark asset.
 * Source file `brand-logo-gold.svg` in /public is a PNG mislabeled as SVG
 * (browsers refuse to paint PNG bytes under image/svg+xml). We serve the
 * correctly encoded transparent PNG instead.
 */
export const brandLogo = {
  src: "/images/branding/brand-logo-gold.png",
  width: 807,
  height: 216,
} as const;
