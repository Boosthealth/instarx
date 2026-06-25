"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { V2Button } from "./ui";
import { navLinks, INTAKE_HREF } from "./content";

/* Page-local editorial header with a Lightship-style scroll transition.
 *
 * At the top the bar is full-width (logo near the left edge, CTA near the right,
 * transparent over the hero gradient). On scroll the inner wrapper's max-width
 * animates down to the content-container width (1200px, centered), so the items
 * ease inward to align with every section below — and a rounded frosted-glass
 * band fades in behind them. Layout is a 3-column grid: logo left, nav centered,
 * CTA right. Nav links get an animated underline (Lightship-style). Mobile keeps
 * a single CTA — no hamburger. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`v2-header ${scrolled ? "is-scrolled" : ""}`.trim()}>
      <div className="v2-header__inner">
        {/* Glass band — fades in on scroll, sized to the inner wrapper. */}
        <div className="v2-header__glass" aria-hidden="true" />

        <div className="v2-header__row">
          {/* Left: logo */}
          <a
            href="#top"
            aria-label="InstaRx home"
            className="flex items-center justify-self-start"
          >
            <Image
              src="/logos/instarx-logo.png"
              alt="InstaRx"
              width={128}
              height={32}
              className="h-7 w-auto"
              priority
            />
          </a>

          {/* Center: nav with animated underline. Shown at lg+ (≥1024px) only —
              below that the four links + logo + CTA crowd the single row, so we
              keep just logo + CTA (the floating CTA covers conversion on scroll).
              This page is a single-scroll lander, so the nav links are anchor
              aids, not required navigation; a hamburger would be overkill. */}
          <nav
            className="hidden items-center gap-9 justify-self-center lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="v2-ulink v2-navlink">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA */}
          <V2Button
            href={INTAKE_HREF}
            variant="primary"
            className="justify-self-end"
            arrow
          >
            Find your treatment
          </V2Button>
        </div>
      </div>
    </header>
  );
}
