import Image from "next/image";
import { EdButton } from "./ui";
import { INTAKE_HREF, brandName, navLinks, primaryCta } from "./content";

/* Sticky ink header. Anchor nav from lg up; the CTA is always visible. */
export function Header() {
  return (
    <header className="ed-header">
      <div className="ed-wrap ed-header__inner">
        <a href="#hero" className="ed-header__logo" aria-label={brandName}>
          <Image
            src="/logos/instarx-logo-inverse.webp"
            alt=""
            width={83}
            height={26}
            priority
          />
        </a>
        <nav className="ed-header__nav" aria-label="Page sections">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <EdButton href={INTAKE_HREF} variant="light" className="ed-btn--sm">
          {primaryCta}
        </EdButton>
      </div>
    </header>
  );
}
