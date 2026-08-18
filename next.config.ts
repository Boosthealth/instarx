import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // gzip is on by default; the production host (CDN) adds brotli on top.
  compress: true,
  images: {
    // Prefer modern formats from the optimizer — AVIF first (smallest), WebP
    // fallback — for any image still passed through next/image.
    formats: ["image/avif", "image/webp"],
    // Default deviceSizes starts at 640, so a sub-640px `sizes` target (e.g.
    // the /glp2-v3 hero at 480px on desktop) always serves an oversized
    // srcset candidate. Add a breakpoint below the default range (384 is
    // already covered by the default imageSizes list).
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "vumbnail.com" },
    ],
  },
};

export default nextConfig;
