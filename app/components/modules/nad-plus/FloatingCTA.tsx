"use client";

import { useEffect, useState } from "react";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

/* Floating bottom CTA (Hims-style). A glass pill with a soft white glow that
 * slides up from the bottom once the user scrolls past the hero, and slides away
 * again when the closing "What are you waiting for?" CTA comes into view — so it
 * never sits on top of the real CTA or the footer.
 *
 * Self-contained: it reads the hero height for the show threshold and observes
 * the .v2-waiting section for the hide trigger, so no extra markup is needed in
 * the page. Reduced-motion handling isn't about hiding it — it's a real CTA and
 * always shown; only the slide-in animation is disabled for reduced motion. */
export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide once the closing CTA section scrolls into view.
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

    // Show after the user scrolls past the hero (~85% of the first viewport),
    // and never while the closing CTA is on screen.
    function update() {
      const passedHero = window.scrollY > window.innerHeight * 0.85;
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
        Start your NAD+ journey
      </V2Button>
    </div>
  );
}
