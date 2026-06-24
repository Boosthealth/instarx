"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/* Decorative GLP-1 bottles scattered behind a section. Each bottle has its own
 * size, position, rotation, blur (for depth) and parallax speed. On scroll they
 * drift at different rates (depth/parallax) and they gently float via CSS. All
 * purely decorative (aria-hidden) and frozen under prefers-reduced-motion. */

type Bottle = {
  src: string;
  /* position as % of the section box */
  top: string;
  left?: string;
  right?: string;
  width: number;
  rotate: number;
  blur: number;
  /* parallax: px of vertical drift per viewport scrolled (negative = up) */
  speed: number;
  /* float animation duration + delay (seconds) */
  floatDur: number;
  floatDelay: number;
  opacity: number;
};

/* Bottles flank the centered copy — clustered on the far left and far right
 * edges so they never sit behind the text. Some blurred for depth. */
const BOTTLES: Bottle[] = [
  // left cluster
  { src: "/images/sem-glp1.png", top: "14%", left: "0%", width: 190, rotate: -14, blur: 0, speed: -70, floatDur: 5, floatDelay: 0, opacity: 1 },
  { src: "/images/tirz-glp1.png", top: "38%", left: "5%", width: 140, rotate: 10, blur: 5, speed: 60, floatDur: 6, floatDelay: 0.6, opacity: 0.9 },
  { src: "/images/sem-glp1.png", top: "20%", left: "14%", width: 88, rotate: 22, blur: 11, speed: 38, floatDur: 7, floatDelay: 0.3, opacity: 0.55 },
  // right cluster
  { src: "/images/tirz-glp1.png", top: "14%", right: "0%", width: 200, rotate: 14, blur: 0, speed: -60, floatDur: 5.5, floatDelay: 0.3, opacity: 1 },
  { src: "/images/sem-glp1.png", top: "40%", right: "5%", width: 140, rotate: -10, blur: 6, speed: 75, floatDur: 6.5, floatDelay: 0.9, opacity: 0.9 },
  { src: "/images/tirz-glp1.png", top: "21%", right: "14%", width: 84, rotate: -24, blur: 12, speed: 40, floatDur: 7.5, floatDelay: 1.1, opacity: 0.55 },
];

export function FloatingBottles() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-speed]"),
    );
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: -1 (section entering from below) → 1 (leaving above)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      for (const el of items) {
        const speed = Number(el.dataset.speed) || 0;
        el.style.setProperty("--py", `${progress * speed}px`);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="v2-bottles" aria-hidden="true">
      {BOTTLES.map((b, i) => (
        <span
          key={i}
          data-speed={b.speed}
          className="v2-bottles__item"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            width: b.width,
            opacity: b.opacity,
            filter: b.blur ? `blur(${b.blur}px)` : undefined,
            // float animation timing as CSS vars; rotation baked into the inner img
            ["--rot" as string]: `${b.rotate}deg`,
            ["--float-dur" as string]: `${b.floatDur}s`,
            ["--float-delay" as string]: `${b.floatDelay}s`,
          }}
        >
          <Image
            src={b.src}
            alt=""
            width={b.width}
            height={b.width}
            sizes={`${b.width}px`}
            className="v2-bottles__img"
          />
        </span>
      ))}
    </div>
  );
}
