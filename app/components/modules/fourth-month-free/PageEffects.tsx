"use client";

import { useEffect } from "react";
import type { Treatment } from "./types";
import { buildCtaHref, CTA_BASE_URL, PROMO, track } from "./ui";

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

  // The shared /glp2 Header renders plain links to ctaHref; give its CTAs the same
  // treatment passthrough and lp_cta_click ("nav") that CtaLink provides elsewhere.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(`header a[href^="${CTA_BASE_URL}"]`);
      if (!link) return;
      const chosen = (sessionStorage.getItem("treatment") as Treatment | null) || "tirzepatide";
      link.href = buildCtaHref(chosen);
      // The Header renders next/link, which soft-navigates on its href prop when
      // CTA_BASE_URL is same-origin (production), dropping the rewrite above and
      // skipping the proxy's /intake split. Stop the event before React sees it so
      // the browser does a full navigation to the rewritten href.
      if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        event.stopPropagation();
      }
      track({ event: "lp_cta_click", cta_location: "nav", treatment: chosen, promo: PROMO });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
