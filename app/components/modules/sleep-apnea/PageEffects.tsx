"use client";

import { useEffect } from "react";
import { INTAKE_HREF } from "./content";

/**
 * The shared Header renders its CTAs with next/link. On go.instarx.com the
 * intake URL is same-origin, so Link soft-navigates on its href prop, which
 * skips the proxy's /intake funnel split (the RSC fetch reads as non-human).
 * Stop the capture-phase click before React sees it so the browser performs
 * a full navigation. Same approach as /glp-fourth-month-free.
 */
export function PageEffects() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link || !link.href.startsWith(INTAKE_HREF)) return;
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      event.stopPropagation();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
