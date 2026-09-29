"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { INTAKE_HREF, stickyBar } from "./content";
import { Button } from "./ui";

/* Mobile bottom bar: price, the same CTA, a tiny safety link. Appears once
 * the hero CTA has scrolled out, hides while the final CTA is on screen. Two
 * IntersectionObservers, no scroll listener. Hidden entirely on desktop via
 * CSS. The slide is a CSS transition on a data attribute. */
export function StickyBar() {
  const [heroOut, setHeroOut] = useState(false);
  const [finalIn, setFinalIn] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector(".edv2-hero__cta");
    const finalSection = document.getElementById("edv2-final");
    if (!heroCta || typeof IntersectionObserver === "undefined") return;

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        // Out = scrolled above the viewport, not merely below the fold.
        setHeroOut(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    heroObs.observe(heroCta);

    const finalObs =
      finalSection &&
      new IntersectionObserver(([entry]) => setFinalIn(entry.isIntersecting), {
        threshold: 0.15,
      });
    finalObs?.observe(finalSection as Element);

    return () => {
      heroObs.disconnect();
      finalObs?.disconnect();
    };
  }, []);

  const visible = heroOut && !finalIn;

  return (
    <div
      className="edv2-sticky"
      data-visible={visible ? "true" : "false"}
      aria-hidden={!visible}
    >
      <div className="edv2-sticky__inner">
        <p className="edv2-sticky__price">
          <strong>{stickyBar.price}</strong>
          <Link
            href={stickyBar.safetyHref}
            className="edv2-sticky__safety"
            tabIndex={visible ? 0 : -1}
          >
            {stickyBar.safetyLabel}
          </Link>
        </p>
        <Button href={INTAKE_HREF} tabIndex={visible ? 0 : -1}>
          {stickyBar.cta}
        </Button>
      </div>
    </div>
  );
}
