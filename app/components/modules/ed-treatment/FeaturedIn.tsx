import Image from "next/image";
import { SHOW_FEATURED_IN, featuredIn } from "./content";

/* 5.3 press strip. Hidden by content flag until placements are confirmed. */
export function FeaturedIn() {
  if (!SHOW_FEATURED_IN || featuredIn.logos.length === 0) return null;
  return (
    <section className="ed-featured" aria-label={featuredIn.label}>
      <div className="ed-wrap">
        <p className="ed-eyebrow">{featuredIn.label}</p>
        <ul className="ed-chips">
          {featuredIn.logos.map((l) => (
            <li key={l.name}>
              <Image
                src={l.src}
                alt={l.name}
                width={l.width}
                height={l.height}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
