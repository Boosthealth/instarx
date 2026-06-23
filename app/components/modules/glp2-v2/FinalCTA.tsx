import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

export function FinalCTA() {
  return (
    <section className="v2-section v2-bg-cream">
      <div className="v2-container">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[32px] px-6 py-16 text-center sm:px-12 sm:py-20"
            style={{ background: "var(--v2-ink)", color: "var(--v2-cream)" }}
          >
            {/* soft rose glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/3 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(199,107,134,0.55) 0%, rgba(199,107,134,0) 65%)",
              }}
            />
            <span
              className="relative mb-6 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ background: "var(--v2-rose)", color: "#fff" }}
            >
              $150 off instantly
            </span>
            <h2
              className="relative mx-auto mb-5 max-w-2xl"
              style={{
                fontFamily: "var(--v2-fh)",
                fontWeight: 600,
                fontSize: "clamp(2.1rem, 4.5vw, 3.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
                color: "#fff",
              }}
            >
              Lose the weight without the{" "}
              <span style={{ fontStyle: "italic", color: "var(--v2-rose-tint)" }}>
                struggle
              </span>
              .
            </h2>
            <p
              className="relative mx-auto mb-9 max-w-xl"
              style={{ color: "rgba(251,247,242,0.72)", fontSize: "1.1rem" }}
            >
              This isn&apos;t a fad. It&apos;s medicine backed by science. Over
              10,000 members are already losing up to 17% of their body weight
              safely and effectively from the comfort of home.
            </p>
            <V2Button href={INTAKE_HREF} variant="onink" className="relative">
              Find your treatment →
            </V2Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
