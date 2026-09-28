import Link from "next/link";
import { footerDisclaimers } from "./content";

/* Disclaimer band: onset footnote, regulatory paragraphs, trademark line and
 * the safety link. The shared site footer (app/components/Footer, the same one
 * /glp2 uses) renders below it with the logo, contact, policy links and
 * badges, so nothing brand-level is repeated here. */
export function Footer() {
  return (
    <section className="edv2-footer" aria-label="Disclaimers">
      <div className="edv2-container edv2-footer__inner">
        <p id="edv2-footnote">{footerDisclaimers.footnote}</p>
        {footerDisclaimers.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
        <p>
          {footerDisclaimers.trademarks}{" "}
          <Link
            href={footerDisclaimers.safety.href}
            className="edv2-footer__link"
          >
            {footerDisclaimers.safety.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
