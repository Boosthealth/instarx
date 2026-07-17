"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Animated gradient background for the hero — a lightweight framer-motion
 * crossfade between a few pastel pink/purple/beige gradients (matching the soft
 * palette of the "What are you waiting for?" section). Adapted from the
 * gradient-background community component: same animate-between-gradients idea,
 * but trimmed to a pure background layer (no centering wrapper) and wired to our
 * palette. Absolutely positioned to fill the hero card behind the content.
 *
 * Under prefers-reduced-motion it renders the first gradient statically. */

const PASTEL_GRADIENTS = [
  // soft pink -> warm beige
  "linear-gradient(125deg, #f5d6e0 0%, #f3dcd0 50%, #ecdcc4 100%)",
  // lavender lift -> peach
  "linear-gradient(125deg, #e4d4ee 0%, #f3d3d8 52%, #efd9c2 100%)",
  // warm peach -> sand
  "linear-gradient(125deg, #f6dcd0 0%, #efd6c6 48%, #e8d6bf 100%)",
  // pink + lavender -> cream
  "linear-gradient(125deg, #f0d2e2 0%, #e6d6ee 50%, #f0e2d2 100%)",
  // back toward the first for a seamless loop
  "linear-gradient(125deg, #f5d6e0 0%, #f3dcd0 50%, #ecdcc4 100%)",
];

export function GradientBg() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="v2-gradientbg"
      style={{ background: PASTEL_GRADIENTS[0] }}
      animate={reduce ? undefined : { background: PASTEL_GRADIENTS }}
      transition={{
        duration: 18,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}
