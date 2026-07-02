"use client";

import { useEffect, useState } from "react";
import { PartnerButton } from "./ui";
import { FORM_HREF } from "./content";

/* Floating bottom CTA (Hims-style), identical mechanics to /glp2-v2: a glass
 * pill that slides up once the user scrolls past the hero, and slides away
 * when the closing CTA comes into view — so it never sits on top of the real
 * CTA or the footer. */
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
      <PartnerButton
        href={FORM_HREF}
        variant="glass"
        className="v2-btn--lg v2-floatcta__btn"
        arrow
        tabIndex={visible ? 0 : -1}
      >
        Apply to partner
      </PartnerButton>
    </div>
  );
}
