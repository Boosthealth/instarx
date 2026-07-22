"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, DollarSign, ShieldCheck, Package, Globe, Heart, Headphones } from "lucide-react";
import { INTAKE_HREF } from "./content";

const NAV_LINK = { label: "Weight Loss", href: INTAKE_HREF };

// Same trust marquee as modules/glp1/Header.tsx, ported here since this page
// uses its own header now.
const marqueeItems = [
  { label: "Affordable prices with no hidden fees", Icon: DollarSign },
  { label: "FDA-Regulated Pharmacies", Icon: ShieldCheck },
  { label: "Free & discreet shipping on all prescriptions", Icon: Package },
  { label: "100% Online", Icon: Globe },
  { label: "Trusted by over 1M Customers", Icon: Heart },
  { label: "Unlimited 24/7 support", Icon: Headphones },
];

/**
 * Lightship-style header from modules/glp2-v2/Header.tsx, ported as
 * Tailwind/inline styles (the `.v2-header*` rules live in glp2-v2.css, which
 * is bundled only for the /glp2-v2 route) — with a single nav link instead
 * of glp2-v2's four anchor links.
 *
 * At the top the bar is full-width and transparent over the hero. Past a
 * 12px scroll, `scrolled` shrinks the inner wrapper toward the page's
 * content width and fades in a frosted glass band behind the row — both are
 * CSS transitions driven by one class toggle, not per-frame scroll work.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Trust marquee — same strip as modules/glp1/Header.tsx, always
          full-width/opaque above the Lightship nav row below it. */}
      <div className="overflow-hidden py-2" style={{ backgroundColor: "var(--glp1-trust-bar-bg)" }}>
        <div className="marquee-track flex whitespace-nowrap" style={{ width: "max-content" }}>
          {[...marqueeItems, ...marqueeItems].map(({ label, Icon }, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-1.5 text-sm text-black">
              <Icon size={16} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`relative mx-auto px-5 py-[0.65rem] transition-[max-width,padding] duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] sm:px-10 ${
          scrolled ? "max-w-[calc(80rem+2.5rem)] py-[0.55rem]" : "max-w-full"
        }`}
      >
        {/* Glass band — fades in on scroll, sized to the inner wrapper */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-[0.4rem] rounded-full bg-white/55 shadow-[0_8px_22px_-18px_rgba(60,40,30,0.35)] backdrop-blur-2xl transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-[1] grid min-h-[54px] grid-cols-[1fr_auto] items-center gap-6 px-1 lg:grid-cols-[1fr_auto_1fr]">
          {/* Logo */}
          <Link href="/" aria-label="InstaRx home" className="flex items-center justify-self-start">
            <Image
              src="/logos/instarx-logo.png"
              alt="InstaRx"
              width={128}
              height={32}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Single nav link, lg+ only — mirrors glp2-v2's underline-on-hover
              treatment (.v2-ulink/.v2-navlink) */}
          <nav className="hidden items-center justify-self-center lg:flex" aria-label="Primary">
            <Link
              href={NAV_LINK.href}
              prefetch={false}
              className="group relative inline-block py-[0.85rem] text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {NAV_LINK.label}
              <span className="absolute inset-x-0 bottom-[calc(0.85rem-1px)] h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          </nav>

          {/* CTA — same diagonal arrow swap as the hero's primary button, at
              the header's smaller 40px size */}
          <Link
            href={INTAKE_HREF}
            prefetch={false}
            className="group inline-flex h-10 items-center gap-2 justify-self-end rounded-full bg-[#1a1714] px-5 text-sm font-medium text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-black"
          >
            <span>Start your assessment</span>
            <span className="relative inline-block h-4 w-4 shrink-0 overflow-hidden" aria-hidden="true">
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="absolute inset-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.48,1.4,0.5,1)] group-hover:translate-x-[110%] group-hover:-translate-y-[110%]"
              />
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="absolute inset-0 -translate-x-[110%] translate-y-[110%] transition-transform duration-[400ms] ease-[cubic-bezier(0.48,1.4,0.5,1)] group-hover:translate-x-0 group-hover:translate-y-0"
              />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
