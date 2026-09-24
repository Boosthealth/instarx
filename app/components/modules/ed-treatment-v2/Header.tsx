"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { header, INTAKE_HREF } from "./content";
import { Button } from "./ui";

/* Fixed header: transparent over the hero, then dark glass once the page
 * scrolls (a pill inside the content width from 64rem, a full-width bar
 * below), so the logo and the CTA stay in reach the whole way down. One
 * IntersectionObserver on a sentinel at the top of the document, no scroll
 * listener; the state is a data attribute and the change is a CSS
 * transition. Server and first paint render the transparent state, which is
 * right for the top of the page. */
export function Header() {
  const sentinel = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className="edv2-header__sentinel" aria-hidden="true" />
      <header
        className="edv2-header"
        data-scrolled={scrolled ? "true" : "false"}
      >
        <div className="edv2-header__inner">
          <Link href="/" className="edv2-header__logo" aria-label="InstaRx home">
            <Image
              src={header.logoSrc}
              alt={header.logoAlt}
              width={128}
              height={40}
              priority
            />
          </Link>
          <nav className="edv2-header__nav" aria-label="Page">
            <a href={header.anchor.href} className="edv2-header__anchor">
              {header.anchor.label}
            </a>
            <Button href={INTAKE_HREF} size="sm">
              {header.cta}
            </Button>
          </nav>
        </div>
      </header>
    </>
  );
}
