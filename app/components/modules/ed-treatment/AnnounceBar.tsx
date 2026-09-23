import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INTAKE_HREF, announcement } from "./content";

export function AnnounceBar() {
  return (
    <div className="ed-announce">
      <Link href={INTAKE_HREF} prefetch={false}>
        <span className="ed-announce__dot" aria-hidden="true" />
        <span>{announcement}</span>
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}
