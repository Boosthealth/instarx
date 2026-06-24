import Image from "next/image";
import Link from "next/link";

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

/* Accepted card networks. Each is a self-contained SVG "chip": the full-color
 * brand mark on a white rounded card, so the recognizable colors (Mastercard's
 * circles, Discover's orange) read against the dark footer. The chips share a
 * uniform internal height, so all four render at one CSS height. */
const PAYMENT_CARDS = [
  { src: "/images/cards/visa.svg", alt: "Visa" },
  { src: "/images/cards/mastercard.svg", alt: "Mastercard" },
  { src: "/images/cards/discover.svg", alt: "Discover" },
  { src: "/images/cards/amex.svg", alt: "American Express" },
];

const footerBottomLinks = [
  { label: "Safety", href: "/policies/safety" },
  { label: "Shipping and Refund Policy", href: "/policies/refund-policy" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Terms of Use", href: "/policies/terms-and-conditions" },
  { label: "Telehealth Consent", href: "/policies/telehealth-consent" },
  { label: "Contact Us", href: "/contact-us" },
];

/* Compliance seals shown in the footer. Reduced to the two that carry the most
 * weight for a telehealth pharmacy: HIPAA (privacy) and LegitScript (legitimacy). */
const TRUST_BADGES = [
  {
    src: "/images/badges/hipaa-seal.svg",
    alt: "HIPAA Compliant",
    href: null,
  },
  {
    src: "/images/badges/legitscript.svg",
    alt: "LegitScript Certified",
    href: "https://www.legitscript.com/websites/?checker_keywords=instarx.com",
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[#2a2a2a] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section: logo/contact + links */}
          <div className="py-12 flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Brand & Contact - Left side */}
            <div className="lg:min-w-[280px]">
              <Link href="/">
                <Image
                  src="/logos/instarx-logo-inverse.webp"
                  alt="InstaRx"
                  width={200}
                  height={60}
                  className="h-14 w-auto"
                />
              </Link>
              <p className="mt-6 text-lg font-semibold text-gray-300">Contact Us:</p>
              <div className="mt-2 space-y-1">
                <p>
                  <a
                    href="mailto:patientcare@instarx.com"
                    className="text-base text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    patientcare@instarx.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+18666738730"
                    className="text-base text-blue-400 hover:text-blue-300 underline transition-colors"
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
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links - Right side */}
            <div className="flex flex-wrap gap-x-16 gap-y-8">
              {footerProductLinks.map((group) => (
                <div key={group.heading}>
                  <h3 className="text-lg font-bold text-white mb-3">{group.heading}</h3>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-base text-gray-200 hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="text-lg font-bold text-white mb-3">Support</h3>
                <ul className="space-y-2">
                  {footerSupportLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-base text-gray-200 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Accepted payment methods */}
          <div className="border-t border-gray-600 py-6">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
              {PAYMENT_CARDS.map((card) => (
                <Image
                  key={card.src}
                  src={card.src}
                  alt={card.alt}
                  height={32}
                  width={64}
                  className="h-8 w-auto"
                />
              ))}
            </div>
          </div>

          {/* Trust strip: compliance seals + "secure & encrypted" reassurance */}
          <div className="border-t border-gray-600 py-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
              <div className="flex items-center gap-6">
                {TRUST_BADGES.map((badge) =>
                  badge.href ? (
                    <a
                      key={badge.src}
                      href={badge.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Image
                        src={badge.src}
                        alt={badge.alt}
                        width={84}
                        height={84}
                        className="h-[84px] w-auto"
                      />
                    </a>
                  ) : (
                    <Image
                      key={badge.src}
                      src={badge.src}
                      alt={badge.alt}
                      width={84}
                      height={84}
                      className="h-[84px] w-auto shrink-0"
                    />
                  ),
                )}
              </div>
              <div className="max-w-md text-center sm:text-left">
                <p className="text-base font-semibold text-white">Secure &amp; Encrypted</p>
                <p className="mt-1 text-sm text-gray-400">
                  Your information is encrypted and protected. We never sell your data.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-600 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm text-gray-400">&copy; 2026 InstaRX. All rights reserved.</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {footerBottomLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};
