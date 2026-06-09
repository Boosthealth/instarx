"use client";

import { useEffect } from "react";

/**
 * Persists marketing attribution (utm_*, gclid, …) from the landing URL into a
 * cookie scoped to `.instarx.com`, so it survives the in-page lander → /intake
 * navigation and reaches the funnel's entry URL.
 *
 * Why a cookie and not the link href: the lander CTAs are absolute, same-origin
 * `<Link>`s, so Next.js client-routes them using the React href prop — query
 * params appended to the DOM anchor at click time are ignored. Capturing once
 * here, then re-attaching at the /intake redirect (see proxy.ts), is robust to
 * however the click navigates. Mounted globally in the root layout so it runs on
 * every entry — homepage, direct-to-lander, shopping landers, future landers —
 * without a path list to maintain.
 *
 * Scope is deliberately the funnel ENTRANCE only. Once Embeddables has the data
 * (captured via originUrl), it owns persistence; we never pass params slide to
 * slide (redundant, and unsafe alongside the PII already in funnel slide URLs).
 */
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "fbclid",
  "msclkid",
  "ttclid",
];
const ATTRIBUTION_COOKIE = "ix_attribution";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export default function UtmForwarder() {
  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const captured = new URLSearchParams();
    for (const key of ATTRIBUTION_KEYS) {
      const value = incoming.get(key);
      if (value) captured.set(key, value);
    }

    // No attribution on this URL → keep whatever we captured on an earlier
    // (first-touch) entry rather than clearing it.
    if ([...captured].length === 0) return;

    const secure = window.location.protocol === "https:" ? "; secure" : "";
    document.cookie =
      `${ATTRIBUTION_COOKIE}=${captured.toString()}` +
      `; path=/; domain=.instarx.com; max-age=${ONE_YEAR_SECONDS}; samesite=lax${secure}`;
  }, []);

  return null;
}
