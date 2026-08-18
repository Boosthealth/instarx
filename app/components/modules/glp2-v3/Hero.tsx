import Image from "next/image";
import { V2Button, Stars } from "./ui";
import { hero, INTAKE_HREF } from "./content";

/* S1 — Announcement bar + Hero (build sheet). Single centered column: eyebrow,
 * H1, subhead, CTA, price chip, trust line, then the lifestyle photo below the
 * fold copy. Field audits show the hero image (not the H1) is the actual LCP
 * element, so it loads with `priority` — preloaded, fetchpriority=high, no
 * lazy-loading — with explicit width/height to reserve its box. Unlike every
 * other section, the hero is NOT wrapped in <Reveal>: that component paints
 * its content at opacity:0 until client JS hydrates and an IntersectionObserver
 * fires, which delays the browser's LCP timestamp until well after the image
 * bytes have already arrived. The hero is always in the initial viewport, so
 * the scroll-reveal effect has no purpose here anyway. */
export function Hero() {
  return (
    <section id="top" className="v2-hero">
      <div className="v2-container v2-hero__inner">
        <div className="v2-hero__copy">
          <span className="v2-hero__pill">{hero.eyebrow}</span>

          <h1 className="v2-hero__title">{hero.title}</h1>
          <p className="v2-hero__sub">{hero.sub}</p>

          <div className="v2-hero__actions">
            <V2Button
              href={INTAKE_HREF}
              variant="primary"
              className="v2-btn--lg w-full sm:w-auto sm:min-w-96"
              arrow
            >
              {hero.cta}
            </V2Button>
            <p className="v2-hero__ctasub">{hero.ctaSub}</p>
            <span className="v2-hero__price-chip mt-2">
              <span aria-hidden="true">💧</span>
              {hero.price}
            </span>
            

            <div className="v2-hero__rating">
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--v2-ink)" }}
              >
                Excellent 4.7
              </span>
              <Stars count={5} size={16} />
              <span className="text-sm" style={{ color: "var(--v2-ink-mute)" }}>
                10,000+ happy customers
              </span>
            </div>
          </div>
        </div>

        <div className="v2-hero__media">
          <Image
            src={hero.img}
            alt={hero.imgAlt}
            width={hero.imgWidth}
            height={hero.imgHeight}
            sizes="(max-width: 640px) 88vw, 480px"
            priority
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
