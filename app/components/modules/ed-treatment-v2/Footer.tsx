import Image from "next/image";
import Link from "next/link";
import { footerDisclaimers, header } from "./content";

/* Disclaimer block, onset footnote, trademark line, policy links. */
export function Footer() {
  return (
    <footer className="edv2-footer" aria-label="Disclaimers and policies">
      <div className="edv2-container edv2-footer__inner">
        <Link href="/" className="edv2-footer__logo" aria-label="InstaRx home">
          <Image
            src={header.logoSrc}
            alt={header.logoAlt}
            width={128}
            height={40}
          />
        </Link>
        <p id="edv2-footnote">{footerDisclaimers.footnote}</p>
        {footerDisclaimers.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
        <p>{footerDisclaimers.trademarks}</p>
        <ul className="edv2-footer__links">
          {footerDisclaimers.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <p>{footerDisclaimers.copyright}</p>
      </div>
    </footer>
  );
}
