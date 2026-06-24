import Image from "next/image";

/* "As featured in" press strip. Each logo is an individual vectorized SVG
 * (crisp at any size) rendered in a muted/desaturated treatment so it reads as
 * quiet credibility, not noise. Logos wrap onto a second row on narrow screens. */
/* `twoTone` logos depend on their own light/dark contrast (e.g. LA Weekly's
 * white "LA" knocked out of a dark box), so they get a desaturate-only
 * treatment. Single-color logos are flattened to one ink tone for even weight. */
const PRESS_LOGOS = [
  { src: "/lose-weight/press/ok-magazine.svg", alt: "OK! magazine", h: 34 },
  { src: "/lose-weight/press/balancing-act.svg", alt: "The Balancing Act", h: 26 },
  { src: "/lose-weight/press/womans-world.svg", alt: "Woman's World", h: 22 },
  { src: "/lose-weight/press/la-weekly.svg", alt: "LA Weekly", h: 26, twoTone: true },
  { src: "/lose-weight/press/lifetime.svg", alt: "Lifetime", h: 26 },
  { src: "/lose-weight/press/health-uncensored.svg", alt: "Health Uncensored with Dr. Drew", h: 40 },
] as const;

export function FeaturedIn() {
  return (
    <section className="v2-bg-cream">
      <div className="v2-container py-12 text-center">
        <p
          className="mb-7 text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: "var(--v2-ink-mute)" }}
        >
          As featured in
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 lg:gap-x-14">
          {PRESS_LOGOS.map((logo) => (
            <li key={logo.src} className="flex items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                height={logo.h}
                width={logo.h * 6}
                sizes="(max-width: 640px) 40vw, 200px"
                className="h-[var(--logo-h)] w-auto object-contain opacity-55 transition-opacity hover:opacity-80"
                style={
                  {
                    "--logo-h": `${logo.h}px`,
                    /* Two-tone logos keep their internal contrast; single-color
                     * logos flatten to one ink tone for even weight across the
                     * strip (OK! red, Lifetime pink, light-gray Health). */
                    filter:
                      "twoTone" in logo && logo.twoTone
                        ? "grayscale(1) contrast(1.1)"
                        : "brightness(0) invert(8%)",
                  } as React.CSSProperties
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
