"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const marqueeItems = [
  "Licensed Providers and Pharmacies",
  "Safe & Effective Medications",
  "10k+ Success Stories",
  "Premium Care & Affordable Pricing",
  "Personalized Treatment Plans",
  "100% U.S. Licensed Providers and Pharmacies",
];

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Customer Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
  { label: "Plans & Pricing", href: "https://go.instarx.com/intake" },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7l4 4 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Marquee bar */}
      <div
        className="py-2 overflow-hidden"
        style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
      >
        <div
          className="marquee-track flex whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 mx-8 text-sm font-medium text-black">
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo — self-stretch ensures 64px (h-16) tap target on mobile */}
          <Link href="/" className="shrink-0 self-stretch flex items-center">
            <Image
              src="/logos/instarx-logo.png"
              alt="InstaRx"
              width={110}
              height={34}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200 lg:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="https://go.instarx.com/intake"
              prefetch={false}
              className="hidden md:inline-flex items-center px-5 py-2 bg-black text-white text-sm font-semibold rounded-full hover:bg-blue-500 transition-colors duration-200"
            >
              Start Your Journey
            </Link>
            <button
              className="md:hidden p-3 text-gray-700 hover:text-black transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — fullscreen overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-white flex flex-col px-6 pb-10"
          style={{ animation: "fadeInDown 0.2s ease" }}
        >
          {/* Menu header */}
          <div className="flex items-center justify-between h-16 shrink-0">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Image src="/logos/instarx-logo.png" alt="InstaRx" width={110} height={34} priority />
            </Link>
            <button
              className="p-2 text-gray-700 hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Mobile menu" className="flex flex-col flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="py-5 text-xl font-medium text-gray-800 border-b border-gray-100 last:border-0 hover:text-blue-500 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="https://go.instarx.com/intake"
            prefetch={false}
            className="block text-center px-6 py-4 bg-black text-white text-base font-semibold rounded-full hover:bg-blue-500 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Start Your Journey
          </Link>
        </div>
      )}
    </header>
  );
}
