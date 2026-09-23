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
  // Server HTML is visible; the hidden state only applies once `.ed[data-js]`
  // is set below, and the observer reveals as each block approaches.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Mark on-screen blocks revealed before hiding kicks in, so content that
    // is already painted never blinks out.
    const onScreen = el.getBoundingClientRect().top < window.innerHeight;
    if (onScreen) el.classList.add("is-in");
    el.closest(".ed")?.setAttribute("data-js", "");
    if (onScreen) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
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
