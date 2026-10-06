import Image from "next/image";
import Link from "next/link";

/* The /glp2 footer (app/components/Footer.tsx), same structure and links,
 * restyled for the v3 graphite palette. The shared component stays untouched. */

const columns = [
  {
    title: "Weight Loss",
    links: [
      {
        label: "Semaglutide Injections",
        href: "/safety/compounded-semaglutide",
      },
      {
        label: "Tirzepatide Injections",
        href: "/safety/compounded-tirzepatide",
      },
    ],
  },
  {
    title: "Anti Aging",
    links: [{ label: "NAD+ Injections", href: "/safety/nad-plus" }],
  },
  {
    title: "Support",
    links: [
      { label: "How It Works", href: "/glp1/how-it-works" },
      { label: "Refund Policy", href: "/policies/refund-policy" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

const legal = [
  { label: "Safety", href: "/policies/safety" },
  { label: "Shipping and Refund Policy", href: "/policies/refund-policy" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Terms of Use", href: "/policies/terms-and-conditions" },
  { label: "Telehealth Consent", href: "/policies/telehealth-consent" },
  { label: "Contact Us", href: "/contact-us" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/instarx.telehealth/",
    path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1-.1-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c.1-2.7 1.4-4 4.1-4.1 1.1-.1 1.4-.1 4.1-.1Z",
  },
  {
    label: "X",
    href: "https://x.com/InstaRx",
    path: "M17.8 3.5h3l-6.6 7.5 7.8 10.3h-6.1l-4.8-6.2-5.5 6.2H2.6l7.1-8L2.2 3.5h6.2l4.3 5.7 5.1-5.7Zm-1 16h1.7L7.3 5.2H5.5l11.3 14.3Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582109890024",
    path: "M13.5 21v-7.8h2.6l.4-3h-3V8.3c0-.9.3-1.5 1.5-1.5h1.6V4.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@InstaRxllc",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  },
];

const cards = ["visa", "mastercard", "discover", "amex"];

export function SiteFooter() {
  return (
    <footer className="edv3-footer">
      <div className="edv3-container">
        <div className="edv3-footer__top">
          <div className="edv3-footer__brand">
            <Image
              src="/logos/instarx-logo-inverse.webp"
              alt="InstaRx"
              width={200}
              height={60}
              className="edv3-footer__logo"
            />
            <p className="edv3-footer__contact">
              <span>Contact Us:</span>
              <a href="mailto:patientcare@instarx.com">
                patientcare@instarx.com
              </a>
              <a href="tel:+18666738730">(866) 673-8730</a>
            </p>
            <ul className="edv3-footer__socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      aria-hidden="true"
                    >
                      <path d={s.path} fill="currentColor" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            className="edv3-footer__cols"
            aria-label="Treatments and support"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="edv3-footer__title">{col.title}</h2>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="edv3-footer__trust">
          <ul
            className="edv3-footer__cards"
            aria-label="Accepted payment cards"
          >
            {cards.map((card) => (
              <li key={card}>
                <Image
                  src={`/images/cards/${card}.svg`}
                  alt={card}
                  width={44}
                  height={28}
                />
              </li>
            ))}
          </ul>
          <div className="edv3-footer__badges">
            <Image
              src="/images/badges/hipaa-seal.svg"
              alt="HIPAA compliant"
              width={56}
              height={56}
            />
            <a
              href="https://www.legitscript.com/websites/?checker_keywords=instarx.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Verify LegitScript certification"
            >
              <Image
                src="/images/badges/legitscript.svg"
                alt="LegitScript certified"
                width={56}
                height={56}
              />
            </a>
            <p className="edv3-footer__secure">
              <strong>Secure &amp; Encrypted</strong>
              <span>
                Your information is encrypted and protected. We never sell your
                data.
              </span>
            </p>
          </div>
        </div>

        <div className="edv3-footer__bottom">
          <p>© 2026 InstaRX. All rights reserved.</p>
          <ul>
            {legal.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
