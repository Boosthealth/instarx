"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Weight Loss", href: "https://my.instarx.com/intake/wm-vtvz7x/" },
  { label: "Anti Aging", href: "https://my.instarx.com/intake/na-4syqyo" },
  { label: "Sexual Health", href: "https://my.instarx.com/intake/sh-lbpfcv" },
  { label: "Login", href: "https://my.instarx.com/sign-in" },
];

const footerProductLinks = [
  {
    heading: "Weight Loss",
    links: [
      { label: "Semaglutide Injections", href: "/safety/compounded-semaglutide" },
      { label: "Tirzepatide Injections", href: "/safety/compounded-tirzepatide" },
    ],
  },
  {
    heading: "Anti Aging",
    links: [{ label: "NAD+ Injections", href: "/safety/nad-plus" }],
  },
];

const footerSupportLinks = [
  { label: "Refund Policy", href: "/policies/refund-policy" },
  { label: "Contact Us", href: "/contact-us" },
];

const footerBottomLinks = [
  { label: "Safety", href: "/policies/safety" },
  { label: "Shipping and Refund Policy", href: "/policies/refund-policy" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Terms of Use", href: "/policies/terms-and-conditions" },
  { label: "Telehealth Consent", href: "/policies/telehealth-consent" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function PolicyLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logos/instarx-logo.png"
              alt="InstaRx"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#2a2a2a] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section: logo/contact + links */}
          <div className="py-12 flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Brand & Contact - Left side */}
            <div className="lg:min-w-[280px]">
              <Link href="/">
                <Image
                  src="/logos/instarx-logo-inverse.png"
                  alt="InstaRx"
                  width={200}
                  height={60}
                  className="h-14 w-auto"
                />
              </Link>
              <p className="mt-6 text-sm text-gray-400">Contact Us:</p>
              <div className="mt-2 space-y-1">
                <p>
                  <a
                    href="mailto:patientcare@instarx.com"
                    className="text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    patientcare@instarx.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+18666738730"
                    className="text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    (866) 673-8730
                  </a>
                </p>
              </div>
            </div>

            {/* Links - Right side */}
            <div className="flex flex-wrap gap-x-16 gap-y-8">
              {footerProductLinks.map((group) => (
                <div key={group.heading}>
                  <h3 className="text-sm font-bold text-white mb-3">{group.heading}</h3>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="text-sm font-bold text-white mb-3">Support</h3>
                <ul className="space-y-2">
                  {footerSupportLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider + Bottom bar */}
          <div className="border-t border-gray-600 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-xs text-gray-500">&copy; 2026 InstaRX. All rights reserved.</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {footerBottomLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Payment icons + LegitScript badge */}
          <div className="pb-10">
            <div className="flex justify-center mt-4">
              <Image
                src="/images/cards_5357343140307497.png"
                alt="We accept Visa, MasterCard, Discover, and American Express"
                width={300}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex justify-center mt-6">
              <a
                href="https://www.legitscript.com/websites/?checker_keywords=instarx.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/legitscript_19343194433531208.png"
                  alt="LegitScript Certified"
                  width={100}
                  height={120}
                  className="h-24 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
