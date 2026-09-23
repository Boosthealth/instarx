"use client";

import { useEffect, useState } from "react";
import { EdButton } from "./ui";
import { INTAKE_HREF, floatingCta, safetyStrip } from "./content";

/* 5.15 mobile bottom bar (hidden from lg up in CSS). Appears once the hero has
 * left the viewport and hides while #pricing or the footer is on screen, so it
 * never sits on top of a real offer or the disclaimers. Out of the tab order
 * while hidden. */
export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const hero = document.getElementById("hero");
    const blockers = [
      document.getElementById("pricing"),
      document.querySelector("footer.ed-footer"),
    ].filter(Boolean) as Element[];
    if (!hero) return;

    let heroOut = false;
    const blocking = new Set<Element>();
    const update = () => setVisible(heroOut && blocking.size === 0);

    const heroObs = new IntersectionObserver(([e]) => {
      // Only "out" once it's scrolled past (above), not before first paint.
      heroOut = !!e && !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    });
    const blockObs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) blocking.add(e.target);
        else blocking.delete(e.target);
      }
      update();
    });
    heroObs.observe(hero);
    blockers.forEach((b) => blockObs.observe(b));
    return () => {
      heroObs.disconnect();
      blockObs.disconnect();
    };
  }, []);

  return (
    <div
      className={`ed-float ${visible ? "is-visible" : ""}`.trim()}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="ed-float__row">
        <span className="ed-float__price">{floatingCta.price}</span>
        <EdButton href={INTAKE_HREF} className="ed-btn--sm" variant="light">
          {floatingCta.cta}
        </EdButton>
      </div>
      <a className="ed-float__safety" href={safetyStrip.href}>
        {safetyStrip.short}
      </a>
    </div>
  );
}
