"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Image drift inside a media card. The layer is 16% taller than the card
 * (see .edv2-parallax) and slides from -6% to +6% while the card crosses
 * the viewport, so the photo reads as sitting deeper than the card edge.
 * The card itself never moves. Transform only; the stylesheet pins it to
 * none under reduced motion, which also covers the server-rendered frame. */
export function ParallaxLayer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <motion.div ref={ref} className="edv2-parallax" style={{ y }}>
      {children}
    </motion.div>
  );
}

/* Hero media at 0.85x scroll speed: it trails the copy by 15% of the
 * distance scrolled, which the hero's overflow clips at the bottom edge. */
export function HeroParallax({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => Math.max(0, v) * 0.15);
  return (
    <motion.div className="edv2-hero__media" style={{ y }}>
      {children}
    </motion.div>
  );
}
