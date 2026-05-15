"use client";

import { useEffect } from "react";

export function AnchorScrollFix() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)
        ?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href === "#top") return;

      const id = decodeURIComponent(href.slice(1));
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });

      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      (el as HTMLElement).focus({ preventScroll: true });

      const oldURL = location.href;
      history.pushState(null, "", `#${id}`);
      window.dispatchEvent(
        new HashChangeEvent("hashchange", { oldURL, newURL: location.href })
      );
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
