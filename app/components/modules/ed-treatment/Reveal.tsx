"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Reveal once on scroll-in (opacity + 14px rise, 340ms ease-out, no bounce).
 * IntersectionObserver-based; the CSS short-circuits it under
 * prefers-reduced-motion. `group` mode leaves the wrapper still and lets
 * `.ed-seq` children stagger via their `--i` index (comparison rows, cards). */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  group = false,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "ul" | "ol";
  className?: string;
  group?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  // Start hidden so the client's first render matches SSR; the observer (or a
  // 1.2s safety net) reveals, so content is never stuck invisible.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const fallback = window.setTimeout(() => setShown(true), 1200);
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          window.clearTimeout(fallback);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => {
      window.clearTimeout(fallback);
      obs.disconnect();
    };
  }, []);

  const Comp = Tag as React.ElementType;
  const base = group ? "ed-reveal-group" : "ed-reveal";
  return (
    <Comp
      ref={ref}
      className={`${base} ${shown ? "is-in" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
