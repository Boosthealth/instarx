"use client";

import { useEffect } from "react";
import { PROMO, track } from "./ui";

export function PageEffects() {
  useEffect(() => {
    track({ event: "lp_view", promo: PROMO });
    const seen = new Set<string>();
    const observers = Array.from(document.querySelectorAll<HTMLElement>("[data-track-section]")).map((section) => {
      const threshold = Math.min(0.5, (window.innerHeight * 0.5) / section.offsetHeight);
      const observer = new IntersectionObserver(([entry]) => {
        const key = (entry.target as HTMLElement).dataset.trackSection;
        if (!entry.isIntersecting || entry.intersectionRatio < threshold || !key || seen.has(key)) return;
        seen.add(key);
        track({ event: "lp_section_view", section: key, promo: PROMO });
        observer.disconnect();
      }, { threshold });
      observer.observe(section);
      return observer;
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return null;
}
