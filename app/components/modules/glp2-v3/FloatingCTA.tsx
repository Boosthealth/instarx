"use client";

import { useEffect, useState } from "react";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

/* Floating bottom CTA — ported unchanged from /glp2-v2 (slides up after the
 * hero, slides away once the closing CTA is in view). Per the build sheet:
 * "Sticky bottom CTA bar on mobile after 50% scroll" — the hero-relative
 * threshold below lands close to that on this page's shorter hero. */
export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let closingInView = false;
    const closing = document.querySelector(".v2-waiting");
    const obs =
      closing &&
      new IntersectionObserver(
        (entries) => {
          closingInView = entries[0]?.isIntersecting ?? false;
          update();
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
    if (closing && obs) obs.observe(closing);

    function update() {
      const passedHero = window.scrollY > window.innerHeight * 0.6;
      setVisible(passedHero && !closingInView);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      obs?.disconnect();
    };
  }, []);

  return (
    <div
      className={`v2-floatcta ${visible ? "is-visible" : ""}`.trim()}
      aria-hidden={!visible}
    >
      <div className="v2-floatcta__glow" aria-hidden="true" />
      <V2Button
        href={INTAKE_HREF}
        variant="glass"
        className="v2-btn--lg v2-floatcta__btn"
        arrow
        tabIndex={visible ? 0 : -1}
      >
        Check my eligibility
      </V2Button>
    </div>
  );
}
