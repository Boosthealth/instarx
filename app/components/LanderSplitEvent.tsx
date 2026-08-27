"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Reports the visitor's /glp2 lander-split assignment to the dataLayer, from
 * the `ix_lander` cookie proxy.ts sets when it buckets a `?lp=` visit
 * (value: "<slug>:<arm>[:forced]"). Mounted on BOTH arms — the /glp2 control
 * page and the /glp2/lp/<slug> rewrites — so PostHog can compare identical
 * traffic. No cookie (organic /glp2 visit, no `lp` param) → no event, so the
 * split funnels only ever count bucketed ad traffic. `forced` marks QA visits
 * that overrode the coin flip via `?arm=`, so dashboards can exclude them.
 */
export function LanderSplitEvent() {
  useEffect(() => {
    const raw = document.cookie
      .split("; ")
      .find((c) => c.startsWith("ix_lander="))
      ?.split("=")[1];
    if (!raw) return;
    const [slug, arm, forced] = decodeURIComponent(raw).split(":");
    if (!slug || (arm !== "new" && arm !== "control")) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lander_split",
      lander: slug,
      lander_arm: arm,
      lander_forced: forced === "forced",
    });
  }, []);

  return null;
}
