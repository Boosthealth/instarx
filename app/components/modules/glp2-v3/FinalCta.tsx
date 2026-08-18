import { Reveal } from "./Reveal";
import { V2Button, Stars } from "./ui";
import { Ticker } from "./Ticker";
import { finalCta, INTAKE_HREF } from "./content";

/* S10 — Final CTA. Matches the approved build-sheet mockup's `.final` panel:
 * a solid navy section, white headline, light-blue eyebrow/body/fine-print.
 * The trust ticker (marquee) sits directly inside this panel, per the
 * mockup's static marquee line under the CTA — recolored for the dark
 * background via the `.v2-waiting .v2-ticker*` overrides in glp2-v3.css. */
export function FinalCta() {
  return (
    <section className="v2-waiting">
      <div className="v2-container relative">
        <Reveal className="v2-reveal--peak">
          <div className="mx-auto max-w-3xl px-2 py-24 text-center sm:py-32">
            <p className="v2-eyebrow v2-waiting__eyebrow">{finalCta.eyebrow}</p>

            <h2 className="v2-waiting__title">{finalCta.title}</h2>
            <p className="v2-waiting__sub">{finalCta.body}</p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3">
              <V2Button
                href={INTAKE_HREF}
                variant="primary"
                className="v2-btn--lg w-full sm:w-96"
                arrow
              >
                {finalCta.cta}
              </V2Button>
              <p className="v2-caption v2-waiting__ctasub">{finalCta.sub}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span className="text-sm font-semibold" style={{ color: "#fff" }}>
                Excellent 4.7
              </span>
              <Stars count={5} size={16} />
              <span className="text-sm" style={{ color: "#cfe6ef" }}>
                10,000+ happy customers
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <Ticker />
    </section>
  );
}
