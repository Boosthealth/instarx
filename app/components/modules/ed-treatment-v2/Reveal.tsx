"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Fade + 12px rise, once, on scroll-in. IntersectionObserver toggles a data
 * attribute; the transition (and its reduced-motion short-circuit) lives in
 * CSS. Starts hidden on both server and client so hydration matches, with a
 * 1.2s safety net so content is never stuck invisible. */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "li" | "ul" | "ol" | "section" | "article" | "p";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    /* The safety net only fires for an element that is on screen, so groups
     * further down still play their entrance when scrolled to. */
    const fallback = window.setTimeout(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) setShown(true);
    }, 1200);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            window.clearTimeout(fallback);
            obs.disconnect();
            break;
          }
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
  return (
    <Comp
      ref={ref}
      className={`edv2-reveal ${className}`.trim()}
      data-in={shown ? "true" : "false"}
    >
      {children}
    </Comp>
  );
}
