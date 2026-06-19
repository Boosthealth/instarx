"use client";

import { useEffect } from "react";

const HOMEPAGE_LANDER_PATHS = new Set(["/start-glp1", "/glp2", "/glp2-da", "/glp2-c2"]);
const INTAKE_HREF_PREFIX = "https://go.instarx.com/intake";
const GOAL_KEY = "homepage-cta-click";
const TRACK_ENDPOINT = "/api/convert-track";

/**
 * Client-side click goal: fires `homepage-cta-click` to the Convert FullStack
 * project when a visitor clicks an `/intake` CTA on a homepage-lander-split
 * variation (`/start-glp1` blue, `/glp2` pink, and the `/glp2-da` / `/glp2-c2`
 * hero A/B variants of the pink lander).
 *
 * Tying the goal to a real DOM click avoids the false fires we'd get from
 * server-side firing on every /intake hit (bots, prefetches, back-button,
 * refresh) — bots don't click, and refreshes / back-navigations don't generate
 * new click events. sendBeacon is fire-and-forget so the click doesn't wait on
 * the network before the browser navigates.
 *
 * Mounted globally in the root layout but no-ops outside the lander pages, so
 * a future /intake link on, say, /weight-loss doesn't accidentally count.
 */
export default function CtaClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent): void {
      if (!HOMEPAGE_LANDER_PATHS.has(window.location.pathname)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      // Resolve relative URLs against the document base before comparing.
      const resolved = new URL(href, window.location.href).href;
      if (!resolved.startsWith(INTAKE_HREF_PREFIX)) return;

      const payload = JSON.stringify({
        goal: GOAL_KEY,
        ruleData: { goal_trigger: "intake_visit" },
      });
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(TRACK_ENDPOINT, blob);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
