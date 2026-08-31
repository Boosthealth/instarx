"use client";

import { useEffect } from "react";

/**
 * Site-wide phone-CTA click capture. Fires `phone_cta_clicked` to PostHog when a
 * visitor clicks a `tel:` link, so call reporting has a named event instead of
 * relying on raw autocapture. The `tel:` CTAs (headers, footers, contact and
 * policy pages) otherwise emit no dedicated event, so call intent is invisible
 * in the funnel.
 *
 * A single capture-phase listener on the document catches every `tel:` anchor
 * without each one wiring its own handler — the same pattern CtaClickTracker
 * uses for the intake CTA. Best-effort: PostHog is absent on the embeddables
 * routes (their own flow owns it), so the optional-chained capture no-ops there.
 */
export default function PhoneCtaTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent): void {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="tel:"]');
      if (!anchor) return;

      const phone = (anchor.getAttribute("href") ?? "").replace(/^tel:/, "");

      window.posthog?.capture?.("phone_cta_clicked", {
        phone,
        link_text: anchor.textContent?.trim() || null,
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
