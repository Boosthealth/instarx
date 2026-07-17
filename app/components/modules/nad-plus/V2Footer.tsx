import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { footerDisclaimers } from "./content";

/* Light, editorial footer for the /nad-plus lander (the rest of the site keeps
 * the shared dark Footer). Layout mirrors the Coivas footer: a brand column with
 * tagline, three link columns separated by hairline rules, a right rail with a
 * "Secure & Encrypted" reassurance + LegitScript seal, and a thin bottom bar
 * that also carries the required NAD+ regulatory disclaimers. Styling lives in
 * nad-plus.css under `.v2-foot*`. */

const FOOTER_COLUMNS = [
  {
    heading: "Treatments",
    links: [
      { label: "NAD+ Injections", href: "/safety/nad-plus" },
      { label: "Semaglutide Injections", href: "/safety/compounded-semaglutide" },
      { label: "Tirzepatide Injections", href: "/safety/compounded-tirzepatide" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Safety", href: "/policies/safety" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Refund Policy", href: "/policies/refund-policy" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy-policy" },
      { label: "Terms of Use", href: "/policies/terms-and-conditions" },
      { label: "Telehealth Consent", href: "/policies/telehealth-consent" },
    ],
  },
];

export function V2Footer() {
  return (
    <footer className="v2-foot">
      <div className="v2-container">
        {/* Top: brand + link columns + secure rail */}
        <div className="v2-foot__top">
          {/* Brand */}
          <div className="v2-foot__brand">
            <Link href="/" aria-label="InstaRx home" className="inline-flex">
              <Image
                src="/logos/instarx-logo.png"
                alt="InstaRx"
                width={140}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="v2-foot__tagline">
              Personalized telehealth, delivered to your door. Real medicine, real
              results — without the clinic.
            </p>
            <div className="v2-foot__contact">
              <a href="mailto:patientcare@instarx.com" className="v2-ulink">
                patientcare@instarx.com
              </a>
              <a href="tel:+18666738730" className="v2-ulink">
                (866) 673-8730
              </a>
            </div>
          </div>

          {/* Link columns with hairline dividers */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} className="v2-foot__col" aria-label={col.heading}>
              <h3 className="v2-foot__heading">{col.heading}</h3>
              <ul className="v2-foot__links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="v2-ulink v2-foot__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Secure rail */}
          <div className="v2-foot__rail">
            <span className="v2-glass v2-glass-pill v2-foot__pill">
              <ShieldCheck size={16} strokeWidth={2} aria-hidden="true" />
              Secure &amp; Encrypted
            </span>
            <p className="v2-foot__reassure">
              Your information is encrypted and protected. We never sell your data.
            </p>
            <div className="v2-foot__seals">
              <Image
                src="/images/badges/69f395416dc69a4d53c619e4_HIPAA Logo.svg"
                alt="HIPAA Compliant"
                width={72}
                height={72}
                className="h-[72px] w-auto"
              />
              <a
                href="https://www.legitscript.com/websites/?checker_keywords=instarx.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/legitscript_19343194433531208.webp"
                  alt="LegitScript Certified"
                  width={66}
                  height={72}
                  className="h-[72px] w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Required NAD+ regulatory disclaimers (clinical-research note, safety
            information, medical oversight, FDA disclaimer). */}
        <div className="v2-foot__disclaimers">
          {footerDisclaimers.map((line, i) => (
            <p key={i} className="v2-foot__disclaimer">
              {line}
            </p>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="v2-foot__bottom">
          <p className="v2-foot__copy">
            &copy; 2026 InstaRx (instarx.com). All rights reserved.
          </p>
          <p className="v2-foot__legal">
            Compounded medications are prescribed by U.S.-licensed physicians.
          </p>
        </div>
      </div>
    </footer>
  );
}
