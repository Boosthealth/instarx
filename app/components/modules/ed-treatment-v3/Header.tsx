"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { INTAKE_HREF, header, promo } from "./content";
import { ArrowIcon } from "./ui";

/* Promo strip + sticky header. The header sits transparent over the hero and
 * takes a graphite glass once a 1px sentinel at the top of the page scrolls
 * out of view. The promo strip scrolls away with the page. */
export function Header() {
  const sentinel = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <p className="edv3-promo">
        <span>{promo.offer}</span>
        <span className="edv3-promo__dot" aria-hidden="true" />
        <span className="edv3-promo__tail">{promo.tail}</span>
      </p>
      <div ref={sentinel} className="edv3-sentinel" aria-hidden="true" />
      <header className="edv3-header" data-scrolled={scrolled}>
        <div className="edv3-container edv3-header__inner">
          <Link
            href="/"
            className="edv3-header__logo"
            aria-label="InstaRx home"
          >
            <Image
              src="/logos/instarx-logo-inverse.webp"
              alt="InstaRx"
              width={200}
              height={60}
              priority
            />
          </Link>
          <a href={INTAKE_HREF} className="edv3-btn edv3-btn--sm">
            {header.cta}
            <ArrowIcon />
          </a>
        </div>
      </header>
    </>
  );
}
