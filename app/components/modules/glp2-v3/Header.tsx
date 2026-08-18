"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { V2Button } from "./ui";
import { navLinks, INTAKE_HREF } from "./content";

/* Page-local header — ported unchanged from /glp2-v2 (same scroll-transition
 * behavior; palette comes from glp2-v3.css). */
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
        <div className="v2-header__glass" aria-hidden="true" />

        <div className="v2-header__row">
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

          <V2Button
            href={INTAKE_HREF}
            variant="primary"
            className="justify-self-end"
            arrow
          >
            Check my eligibility
          </V2Button>
        </div>
      </div>
    </header>
  );
}
