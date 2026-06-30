import Image from "next/image";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { benefits, INTAKE_HREF } from "./content";

/* NAD+ benefits — a magazine-style two-column split (Reference 3 layout): a left
 * header rail (oversized headline + sub-line + CTA) and a right vertical stack
 * of rows, each with its own rounded thumbnail image + title + body, separated
 * by hairlines. Styling lives in nad-plus.css under `.nad-benefits*`.
 *
 * IMAGES: benefit thumbnails are placeholders reusing existing assets (two are
 * GLP-1 product shots, not neutral) — replace with real per-benefit photos. Swap to
 * real per-benefit photos (drop into /images/benefits/) when generated. */
export function Benefits() {
  return (
    <section id="benefits" className="v2-section v2-bg-lilac">
      <div className="v2-container">
        <div className="nad-benefits">
          {/* Left: header rail */}
          <Reveal className="nad-benefits__head">
            <p className="v2-eyebrow v2-kicker-rule mb-5 inline-flex">
              The benefits
            </p>
            <h2 className="nad-benefits__title">Benefits</h2>
            <p className="nad-benefits__sub">
              NAD+ works at the cellular level to recharge your energy, sharpen
              your focus, and support healthy aging from the inside out. Most
              members feel the difference within days — steadier energy, a
              clearer head, and a renewed sense of vitality every day.
            </p>
            <V2Button
              href={INTAKE_HREF}
              variant="primary"
              className="nad-benefits__cta"
              arrow
            >
              Get started
            </V2Button>
          </Reveal>

          {/* Right: vertical rows, each with its own thumbnail */}
          <ul className="nad-benefits__rows">
            {benefits.map((benefit, i) => (
              <Reveal
                as="li"
                key={benefit.title}
                delay={(i % 2) * 80}
                className="nad-benefit"
              >
                <div className="nad-benefit__thumb">
                  <Image
                    src={benefit.img}
                    alt=""
                    width={520}
                    height={400}
                    sizes="(max-width: 720px) 40vw, 220px"
                    className="nad-benefit__img"
                  />
                </div>
                <div className="nad-benefit__text">
                  <h3 className="nad-benefit__title">{benefit.title}</h3>
                  <p className="nad-benefit__body">{benefit.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
