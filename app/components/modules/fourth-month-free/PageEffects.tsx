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

  useEffect(() => {
    const revealSelectors = [
      ".m4-trap .m4-section-head", ".m4-trap-card",
      ".m4-science .m4-section-head", ".m4-science-card", ".m4-phases",
      ".m4-journey .m4-section-head", ".m4-month__copy", ".m4-month__chips",
      ".m4-stats__grid > *",
      ".m4-plans .m4-section-head", ".m4-plan", ".m4-includes",
      ".m4-member-results .m4-section-head", ".m4-video-card", ".m4-results-note",
      ".m4-compare .m4-section-head", ".m4-table", ".m4-compare__note", ".m4-compare .m4-btn",
      ".m4-faq__grid > header", ".m4-accordion",
      ".m4-final .m4-container > *",
      ".m4-footer__top", ".m4-footer__links", ".m4-footer__legal", ".m4-footer__bottom",
    ];
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors.join(",")));
    elements.forEach((element) => {
      element.classList.add("m4-reveal");
      const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
      const siblingIndex = Math.max(0, siblings.indexOf(element));
      element.style.setProperty("--m4-reveal-delay", `${Math.min(siblingIndex, 3) * 80}ms`);
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
