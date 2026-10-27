"use client";

import { useEffect } from "react";
import { INTAKE_HREF } from "./content";

/**
 * The shared Header renders its CTAs with next/link. On go.instarx.com the
 * intake URL is same-origin, so Link soft-navigates on its href prop, which
 * skips the proxy's /intake funnel split (the RSC fetch reads as non-human).
 * Cancel the default in the capture phase and navigate ourselves: Link runs
 * its caller's onClick (the Header closes its mobile menu there) and then
 * bails on `defaultPrevented`, so no soft navigation happens and the menu
 * overlay is not left open in the bfcache snapshot. Only plain left clicks
 * on the intake path itself are handled (query strings allowed, `/intake01`
 * and the like are not); modified clicks, `target` and `download` links keep
 * their native behaviour.
 */
const INTAKE_URL = new URL(INTAKE_HREF);

function isIntakeLink(link: HTMLAnchorElement): boolean {
  const url = new URL(link.href);
  return (
    url.origin === INTAKE_URL.origin && url.pathname === INTAKE_URL.pathname
  );
}

export function PageEffects() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link || !isIntakeLink(link)) return;
      if (
        event.defaultPrevented ||
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download") ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      event.preventDefault();
      window.location.assign(link.href);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
