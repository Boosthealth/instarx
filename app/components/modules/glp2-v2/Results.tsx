import { BeforeAfter } from "./BeforeAfter";
import { Reveal } from "./Reveal";

export function Results() {
  return (
    <section className="v2-section v2-bg-cream">
      <div className="v2-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <BeforeAfter />
          <p className="mt-4 text-sm" style={{ color: "var(--v2-ink-mute)" }}>
            Drag to compare · 6 months on GLP-1
          </p>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={80}>
          <p className="v2-eyebrow v2-kicker-rule mb-5">Real results</p>
          <h2 className="v2-h2 mb-6">
            Finally lose weight without the cravings, the crash diets, or the
            constant <span className="v2-accent">exhaustion</span>.
          </h2>
          <p className="v2-lede mb-6 max-w-lg">
            A real InstaRx member, six months into a prescription GLP-1
            protocol. Drag the slider to see the difference for yourself.
          </p>
          <p className="text-sm" style={{ color: "var(--v2-ink-mute)" }}>
            *Individual results vary. Average loss up to 17% of body weight.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
