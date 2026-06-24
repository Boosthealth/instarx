"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { V2Button } from "./ui";
import { navLinks, INTAKE_HREF } from "./content";

/* Page-local editorial header. Transparent over the hero gradient at the top;
 * on scroll a translucent frosted-glass background + hairline fades in
 * (Lightship-style). The blur stays mounted and only the background opacity /
 * border animate, so the transition eases smoothly instead of snapping. The nav
 * text stays dark ink at both states (our backdrop is light, so no white->dark
 * color flip is needed). Mobile keeps a single CTA — no hamburger. */
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
      className="sticky top-0 z-40"
      style={{
        backgroundColor: scrolled
          ? "rgba(251,247,242,0.72)"
          : "rgba(251,247,242,0)",
        // Blur stays mounted at both states so toggling doesn't snap; it's
        // imperceptible when the background is fully transparent.
        WebkitBackdropFilter: "saturate(150%) blur(10px)",
        backdropFilter: "saturate(150%) blur(10px)",
        borderBottom: scrolled
          ? "1px solid var(--v2-line)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 6px 24px -20px rgba(60,40,30,0.5)" : "none",
        transition:
          "background-color 0.35s cubic-bezier(0.165,0.84,0.44,1), border-color 0.35s ease, box-shadow 0.35s ease",
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
