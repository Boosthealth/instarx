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
 * right for the top of the page.
 *
 * Section anchors sit inline from 48rem. Below that a Menu button toggles the
 * same list as a dropdown under the bar; Escape, a tap outside, or choosing a
 * link closes it. AnchorScrollFix handles the smooth scroll and focus. */
export function Header() {
  const sentinel = useRef<HTMLDivElement | null>(null);
  const nav = useRef<HTMLElement | null>(null);
  const menuBtn = useRef<HTMLButtonElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // The list is display:none once closed; return focus to the toggle
      // so keyboard users are not dropped to <body>.
      menuBtn.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (nav.current && !nav.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <>
      <div
        ref={sentinel}
        className="edv2-header__sentinel"
        aria-hidden="true"
      />
      <header
        className="edv2-header"
        data-scrolled={scrolled ? "true" : "false"}
      >
        <div className="edv2-header__inner">
          <Link
            href="/"
            className="edv2-header__logo"
            aria-label="InstaRx home"
          >
            <Image
              src={header.logoSrc}
              alt={header.logoAlt}
              width={128}
              height={40}
              priority
            />
          </Link>
          <nav className="edv2-header__nav" aria-label="Page" ref={nav}>
            <button
              type="button"
              className="edv2-header__menu-btn"
              ref={menuBtn}
              aria-expanded={open}
              aria-controls="edv2-header-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="edv2-header__menu-icon" aria-hidden="true">
                <span />
                <span />
              </span>
              {open ? header.menu.close : header.menu.open}
            </button>
            <ul
              id="edv2-header-menu"
              className="edv2-header__links"
              data-open={open ? "true" : "false"}
            >
              {header.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="edv2-header__anchor"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href={INTAKE_HREF} size="sm">
              {header.cta}
            </Button>
          </nav>
        </div>
      </header>
    </>
  );
}
