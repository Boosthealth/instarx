"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { V2Button } from "./ui";
import { navLinks, INTAKE_HREF } from "./content";

/* Page-local editorial header. Transparent over the cream canvas; on scroll it
 * gains a cream backdrop + bottom hairline for legibility. Mobile collapses the
 * nav to a single CTA (the page is a focused lander — no hamburger needed). */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(251,247,242,0.85)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--v2-line)"
          : "1px solid transparent",
      }}
    >
      <div className="v2-container flex items-center justify-between gap-6 py-4">
        <div className="flex items-center gap-4">
          <a href="#top" aria-label="InstaRx home" className="flex items-center">
            <Image
              src="/logos/instarx-logo.png"
              alt="InstaRx"
              width={128}
              height={32}
              className="h-7 w-auto"
              priority
            />
          </a>
          {/* Glass promo tag (Coivas-style label near the brand). Wrapper owns
              the responsive hide so it beats .v2-glass-pill's inline-flex. */}
          <span className="hidden lg:block">
            <span className="v2-glass v2-glass-pill">
              <span className="v2-glass-dot" aria-hidden="true" />
              $150 off · First month $148
            </span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
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

        <V2Button href={INTAKE_HREF} variant="primary" className="!px-5 !py-2.5">
          Find your treatment →
        </V2Button>
      </div>
    </header>
  );
}
