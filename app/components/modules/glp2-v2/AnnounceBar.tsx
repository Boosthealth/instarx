import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { announcement, INTAKE_HREF } from "./content";

/* Static announcement bar (Coivas-style): a slim, dark, full-width band with a
 * single centered message + arrow, linking to intake. Replaces the old animated
 * marquee — quieter and more generic. */
export function AnnounceBar() {
  return (
    <div className="v2-announce">
      <Link href={INTAKE_HREF} prefetch={false} className="v2-announce__link">
        <span>{announcement}</span>
        <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
      </Link>
    </div>
  );
}
