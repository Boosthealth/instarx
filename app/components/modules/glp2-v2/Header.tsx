"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { V2Button } from "./ui";
import { navLinks, INTAKE_HREF } from "./content";

/* Page-local editorial header with a Lightship-style scroll transition.
 *
 * At the top the bar is full-width (items near the screen edges, transparent
 * over the hero gradient). On scroll the inner wrapper's max-width animates from
 * full-bleed down to the content-container width (1200px, centered), so the nav
 * items ease inward to align with every section below — and a rounded frosted-
 * glass band fades in behind them at that same width. Nav text stays dark ink
 * at both states (our backdrop is light, so no white->dark flip). All driven by
 * a single `is-scrolled` class; the geometry/animation lives in glp2-v2.css.
 * Mobile keeps a single CTA — no hamburger. */
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
        {/* Glass band — fades in on scroll, sized to the inner wrapper (which is
            content-width when scrolled). Sits behind the nav row. */}
        <div className="v2-header__glass" aria-hidden="true" />

        <div className="v2-header__row">
          <div className="flex items-center gap-4">
            <a
              href="#top"
              aria-label="InstaRx home"
              className="flex items-center"
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
            {/* Glass promo tag (Coivas-style). Wrapper owns the responsive hide
                so it beats .v2-glass-pill's inline-flex. */}
            <span className="hidden lg:block">
              <span className="v2-glass v2-glass-pill">
                <span className="v2-glass-dot" aria-hidden="true" />
                $150 off · First month $148
              </span>
            </span>
          </div>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--v2-ink-soft)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <V2Button
            href={INTAKE_HREF}
            variant="primary"
            className="!px-5 !py-2.5"
          >
            Find your treatment →
          </V2Button>
        </div>
      </div>
    </header>
  );
}
