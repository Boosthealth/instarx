"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PartnerButton } from "./ui";
import { navLinks, FORM_HREF } from "./content";

/* Page-local editorial header with the same Lightship-style scroll transition
 * as /glp2-v2: full-width and transparent at the top; on scroll the inner
 * wrapper eases in to the content width and a rounded frosted-glass band fades
 * in behind it. 3-column grid: logo left, nav centered, CTA right. Mobile keeps
 * a single CTA — no hamburger (this is a single-scroll lander; the nav links
 * are anchor aids, not required navigation). */
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

          {/* Center: nav with animated underline, shown at lg+ only. */}
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
          <PartnerButton
            href={FORM_HREF}
            variant="primary"
            className="justify-self-end"
            arrow
          >
            Apply now
          </PartnerButton>
        </div>
      </div>
    </header>
  );
}
