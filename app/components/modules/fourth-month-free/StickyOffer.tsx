"use client";

import { useEffect, useRef, useState } from "react";
import { Price } from "./display";
import { BTN_DARK } from "./buttons";
import { CtaLink } from "./ui";

// Mobile-only bar: appears once the hero CTA has scrolled away, hides while the
// plans or final CTA are on screen (they carry their own buttons).
export function StickyOffer({ startingAt }: { startingAt: number }) {
  const [show, setShow] = useState(false);
  const states = useRef({ heroGone: false, plans: false, final: false });

  useEffect(() => {
    const update = () => setShow(states.current.heroGone && !states.current.plans && !states.current.final);
    const hero = document.querySelector("[data-hero-cta]");
    const plans = document.getElementById("plans");
    const final = document.getElementById("final-cta");
    const heroObserver = new IntersectionObserver(([entry]) => {
      states.current.heroGone = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    });
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === plans) states.current.plans = entry.isIntersecting;
        if (entry.target === final) states.current.final = entry.isIntersecting;
      });
      update();
    }, { threshold: 0.08 });
    if (hero) heroObserver.observe(hero);
    if (plans) sectionObserver.observe(plans);
    if (final) sectionObserver.observe(final);
    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <aside
      aria-label="Offer"
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-gray-200 bg-white px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 motion-reduce:transition-none md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="leading-tight">
        <p className="font-bold text-gray-900">Get month 4 FREE*</p>
        <p className="text-sm text-gray-600">Starting at <Price value={startingAt} />/mo</p>
      </div>
      <CtaLink location="sticky" className={`${BTN_DARK} shrink-0`}>Claim Now →</CtaLink>
    </aside>
  );
}
