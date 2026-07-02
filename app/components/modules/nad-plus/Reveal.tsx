"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Fade + rise on scroll-in. IntersectionObserver-based so it's cheap and
 * respects prefers-reduced-motion (the CSS short-circuits the transition).
 * `delay` staggers grouped reveals (in ms). */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  // Always start hidden so the client's first render matches SSR (no hydration
  // mismatch). The observer reveals on scroll-in; if IntersectionObserver is
  // unavailable we reveal on the next frame so content is never stuck invisible.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    // Safety net: never let content stay invisible. If the observer hasn't
    // fired within 1.2s (misfire, odd scroll container, prerender quirks),
    // reveal anyway. Cleared as soon as the observer legitimately fires.
    const fallback = window.setTimeout(() => setShown(true), 1200);
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
      className={`v2-reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
