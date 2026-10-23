"use client";

import { useEffect } from "react";
import { CARE_INTAKE_URL } from "@/app/lib/care-lander";

/**
 * Copies the page's query string, unchanged, onto every intake CTA at the
 * moment the visitor uses it. The page is static, so the CTA hrefs render
 * without the visit's utm_* / ad params; the intake is on another host and
 * can't read them any other way.
 *
 * Rewriting at interaction time (not in render) keeps the server and client
 * markup identical, and also covers anchors that mount later (the mobile
 * menu). pointerdown runs before click, middle-click, and long-press;
 * keyboard activation dispatches click.
 */
export function ForwardQueryToIntake() {
  useEffect(() => {
    function onInteract(event: Event): void {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const url = new URL(anchor.href);
      if (`${url.origin}${url.pathname}` !== CARE_INTAKE_URL) return;

      url.search = window.location.search;
      anchor.href = url.href;
    }

    document.addEventListener("pointerdown", onInteract, true);
    document.addEventListener("click", onInteract, true);
    return () => {
      document.removeEventListener("pointerdown", onInteract, true);
      document.removeEventListener("click", onInteract, true);
    };
  }, []);

  return null;
}
