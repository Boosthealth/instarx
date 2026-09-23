import Image from "next/image";
import Link from "next/link";
import { header, INTAKE_HREF } from "./content";
import { Button } from "./ui";

/* Transparent header over the hero video: logo, one anchor, one CTA. */
export function Header() {
  return (
    <header className="edv2-header">
      <div className="edv2-container edv2-header__inner">
        <Link href="/" className="edv2-header__logo" aria-label="InstaRx home">
          <Image
            src={header.logoSrc}
            alt={header.logoAlt}
            width={128}
            height={40}
            priority
          />
        </Link>
        <nav className="edv2-header__nav" aria-label="Page">
          <a href={header.anchor.href} className="edv2-header__anchor">
            {header.anchor.label}
          </a>
          <Button href={INTAKE_HREF} size="sm">
            {header.cta}
          </Button>
        </nav>
      </div>
    </header>
  );
}
