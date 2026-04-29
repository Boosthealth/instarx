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

interface PolicyLayoutProps {
  children: React.ReactNode;
  contentWidth?: "prose" | "full";
}

export default function PolicyLayout({ children, contentWidth = "prose" }: PolicyLayoutProps) {
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
      <main className={`flex-1 w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 ${contentWidth === "prose" ? "max-w-4xl mx-auto" : "max-w-7xl mx-auto"}`}>
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
              <p className="mt-6 text-sm text-gray-300">Contact Us:</p>
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

              {/* Social icons */}
              <div className="mt-4 flex items-center gap-4">
                <a
                  href="https://www.instagram.com/instarx.telehealth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/InstaRx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61582109890024"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@InstaRxllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
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
                        <Link href={link.href} className="text-sm text-gray-200 hover:text-white transition-colors">
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
                      <Link href={link.href} className="text-sm text-gray-200 hover:text-white transition-colors">
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
              <p className="text-xs text-gray-400">&copy; 2026 InstaRX. All rights reserved.</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {footerBottomLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs text-gray-300 hover:text-white transition-colors"
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
              <div className="inline-flex items-center flex-wrap justify-center gap-6 bg-white rounded-xl px-8 py-5">
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
                    className="h-20 w-auto"
                  />
                </a>
                <Image
                  src="/images/hippa-compliant.png"
                  alt="HIPAA Compliant"
                  width={100}
                  height={120}
                  className="h-20 w-auto"
                />
                <Image
                  src="/images/stripe-payment.png"
                  alt="Stripe Secure Payment"
                  width={100}
                  height={120}
                  className="h-20 w-auto"
                />
                <Image
                  src="/images/secure-ssl-encryption.png"
                  alt="Secure SSL Encryption"
                  width={100}
                  height={120}
                  className="h-20 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
