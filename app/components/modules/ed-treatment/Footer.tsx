import Image from "next/image";
import Link from "next/link";
import { brandName, footer } from "./content";

/* 5.16 footer: links, safety pages, contact, badges, then the disclaimer
 * block and the onset footnote (Part 4). `#safety` lands here. */
export function Footer() {
  return (
    <footer className="ed-footer">
      <div className="ed-wrap">
        <div className="ed-footer__top">
          <div>
            <Image
              src="/logos/instarx-logo-inverse.webp"
              alt={brandName}
              width={83}
              height={26}
              className="ed-footer__logo"
            />
            <p>{footer.tagline}</p>
            <p>
              <a href={`mailto:${footer.contact.email}`}>
                {footer.contact.email}
              </a>
              <br />
              <a href={`tel:${footer.contact.tel}`}>{footer.contact.phone}</a>
            </p>
            <div className="ed-footer__badges">
              <Image
                src="/images/badges/69f395416dc69a4d53c619e4_HIPAA Logo.svg"
                alt={footer.badges.hipaa}
                width={72}
                height={36}
              />
              {footer.badges.showLegitScript && (
                <Image
                  src="/images/legitscript_19343194433531208.webp"
                  alt={footer.badges.legitscript}
                  width={72}
                  height={36}
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>
          </div>
          <nav id="safety" aria-labelledby="ed-foot-safety">
            <h2 id="ed-foot-safety">{footer.safetyHeading}</h2>
            <ul>
              {footer.safetyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} prefetch={false}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {footer.columns.map((c) => (
            <nav key={c.heading} aria-label={c.heading}>
              <h2>{c.heading}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} prefetch={false}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="ed-footer__legal">
          <p>
            <strong>{footer.safetyLabel}</strong> {footer.safetyStripLong}
          </p>
          <p>{footer.disclaimer}</p>
          <p>{footer.footnote}</p>
          <p>{footer.trademarks}</p>
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
