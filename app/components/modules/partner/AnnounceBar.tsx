import { ArrowRight } from "lucide-react";
import { announcement, FORM_HREF } from "./content";

/* Static announcement bar (Coivas-style): a slim, dark, full-width band with a
 * single centered message + arrow, linking to the partner application form. */
export function AnnounceBar() {
  return (
    <div className="v2-announce">
      <a
        href={FORM_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="v2-announce__link"
      >
        <span>{announcement}</span>
        <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
      </a>
    </div>
  );
}
