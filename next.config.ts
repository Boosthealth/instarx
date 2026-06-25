import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // gzip is on by default; the production host (CDN) adds brotli on top.
  compress: true,
  images: {
    // Prefer modern formats from the optimizer — AVIF first (smallest), WebP
    // fallback — for any image still passed through next/image.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "vumbnail.com" },
    ],
  },
};

export default nextConfig;
