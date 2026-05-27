"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DollarSign, ShieldCheck, Package, Globe, Heart, Headphones, Menu, X } from "lucide-react";

const marqueeItems = [
  { label: "Affordable prices with no hidden fees", Icon: DollarSign },
  { label: "FDA-Regulated Pharmacies", Icon: ShieldCheck },
  { label: "Free & discreet shipping on all prescriptions", Icon: Package },
  { label: "100% Online", Icon: Globe },
  { label: "Trusted by over 1M Customers", Icon: Heart },
  { label: "Unlimited 24/7 support", Icon: Headphones },
];

const navLinks = [
  { label: "Weight Loss", href: "https://my.instarx.com/intake/wm-vtvz7x/" },
  { label: "Anti Aging", href: "https://my.instarx.com/intake/na-4syqyo" },
  { label: "Sexual Health", href: "https://my.instarx.com/intake/sh-lbpfcv" },
];


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

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

  // Move focus into menu on open; restore to toggle button on close
  useEffect(() => {
    if (menuOpen) {
      menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      menuBtnRef.current?.focus();
    }
  }, [menuOpen]);

  // Trap Tab/Shift+Tab within the open menu
  useEffect(() => {
    if (!menuOpen) return;
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Marquee bar */}
      <div
        className="py-2 overflow-hidden"
        style={{ backgroundColor: "var(--glp1-trust-bar-bg)" }}
      >
        <div
          className="marquee-track flex whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {[...marqueeItems, ...marqueeItems].map(({ label, Icon }, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 mx-8 text-sm text-black">
              <Icon size={16} aria-hidden="true" />
              {label}
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
                className="text-sm font-semibold text-gray-700 hover:text-blue-500 transition-colors duration-200 lg:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="https://my.instarx.com/sign-in"
              className="hidden md:inline-flex items-center px-6 py-2 bg-white text-black border border-gray-200 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              Login
            </Link>
            <button
              ref={menuBtnRef}
              className="md:hidden p-3 text-gray-700 hover:text-black transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — fullscreen overlay */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
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
              <X size={24} />
            </button>
          </div>
          <nav aria-label="Mobile menu" className="flex flex-col flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-5 text-xl font-medium text-gray-800 border-b border-gray-100 last:border-0 hover:text-blue-500 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="https://my.instarx.com/sign-in"
            className="block text-center px-6 py-3 bg-white text-black border border-gray-200 text-base font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
