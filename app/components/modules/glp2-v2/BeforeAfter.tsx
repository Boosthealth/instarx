"use client";

import { useState, useRef, useCallback, useId } from "react";
import Image from "next/image";

/* Before/after comparison slider, adapted from home/BeforeAfterSlider with the
 * focus ring re-skinned to the ink palette and a softer handle. Kept local to
 * the glp2-v2 module so the shared component stays untouched. */
export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const sliderId = useId();
  const comparisonId = `${sliderId}-comparison`;

  const update = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      update(e.clientX);
    },
    [update],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] cursor-col-resize select-none overflow-hidden rounded-[24px] sm:aspect-[4/4]"
      style={{ boxShadow: "var(--v2-shadow-card)", border: "1px solid var(--v2-line)" }}
    >
      <Image
        src="/lose-weight/model1-before.webp"
        alt="Before weight loss"
        fill
        className="object-cover"
        style={{ objectPosition: "center 0%" }}
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <div
        id={comparisonId}
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <div className="absolute inset-0" style={{ transform: "translateY(0.5%)" }}>
          <Image
            src="/lose-weight/model1-after.webp"
            alt="After weight loss"
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>

      {/* before / after labels */}
      <span
        className="absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
        style={{ background: "rgba(26,23,20,0.55)", color: "#fff", backdropFilter: "blur(4px)" }}
      >
        Before
      </span>
      <span
        className="absolute right-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
        style={{ background: "var(--v2-rose)", color: "#fff" }}
      >
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5"
        style={{ left: `${position}%`, background: "#fff" }}
      />

      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-controls={comparisonId}
        className="absolute top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full bg-white"
        style={{
          left: `${position}%`,
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        onTouchStart={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          if (!touch) return;
          update(touch.clientX);
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1a1714"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
        </svg>
      </div>
    </div>
  );
}
