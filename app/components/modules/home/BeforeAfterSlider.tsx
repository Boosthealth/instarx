"use client";

import { useState, useRef, useCallback, useId } from "react";
import Image from "next/image";

export function BeforeAfterSlider() {
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

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    update(e.clientX);
  }, [update]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition(p => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPosition(p => Math.min(100, p + 2));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden aspect-4/3 select-none cursor-col-resize"
    >
      <Image
        src="/lose-weight/model1-before.webp"
        alt="Before weight loss"
        fill
        className="object-cover"
        style={{ objectPosition: "center 0%" }}
        sizes="(min-width: 1024px) 60vw, 100vw"
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
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </div>
      </div>

      <div
        className="absolute inset-y-0 w-0.5 bg-white z-20 pointer-events-none"
        style={{ left: `${position}%` }}
      />

      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-controls={comparisonId}
        className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{ left: `${position}%` }}
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
        </svg>
      </div>
    </div>
  );
}
