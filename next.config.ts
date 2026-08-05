import type { NextConfig } from "next";

/**
 * Enforced CSP — clickjacking / embed / base / form surface only.
 * Broader script/style/img/frame allowlists stay in Report-Only until verified.
 */
const enforcedCsp = [
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

/**
 * Report-Only CSP grounded in this app's production assets:
 * - Next.js runtime scripts + inline bootstraps → 'unsafe-inline' (Report-Only only)
 * - Tailwind / next/font self-hosted CSS & fonts
 * - local images + data: LQIP blur placeholders
 * - local gallery videos
 * - Google Maps embed origin from contactConfig.mapsEmbedUrl
 *
 * Not a final strict policy — do not treat as production-enforced CSP.
 */
const reportOnlyCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Content-Security-Policy", value: enforcedCsp },
  { key: "Content-Security-Policy-Report-Only", value: reportOnlyCsp },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 160, 256, 384, 512],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
