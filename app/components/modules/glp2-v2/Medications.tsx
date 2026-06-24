import Image from "next/image";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { medicationPoints, INTAKE_HREF } from "./content";

export function Medications() {
  return (
    <section id="medications" className="v2-section v2-bg-lilac">
      <div className="v2-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div
            className="relative flex items-center justify-center rounded-[28px] px-8 py-14"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 100%, var(--v2-blush) 0%, var(--v2-cream-2) 70%)",
              border: "1px solid var(--v2-line)",
            }}
          >
            <span
              className="absolute left-6 top-6 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "var(--v2-ink)", color: "var(--v2-cream)" }}
            >
              Ready to ship · In stock · $150 off
            </span>
            <Image
              src="/images/sem-glp1.png"
              alt="Compounded Semaglutide vial"
              width={180}
              height={300}
              className="w-32 -rotate-6 drop-shadow-xl sm:w-40"
            />
            <Image
              src="/images/tirz-glp1.png"
              alt="Compounded Tirzepatide vial"
              width={180}
              height={300}
              className="-ml-6 w-32 rotate-6 drop-shadow-xl sm:w-40"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="v2-eyebrow v2-kicker-rule mb-5">Medications in stock</p>
          <h2 className="v2-h2 mb-5">
            Compounded Semaglutide &amp;{" "}
            <span className="v2-accent">Tirzepatide</span> injections.
          </h2>
          <ul className="mb-8 space-y-3">
            {medicationPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--v2-rose)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mt-1 shrink-0"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span style={{ color: "var(--v2-ink-soft)" }}>{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <V2Button href={INTAKE_HREF} variant="primary" className="w-full sm:w-auto" arrow>
              Find your treatment
            </V2Button>
            <V2Button href={INTAKE_HREF} variant="glass" className="w-full sm:w-auto">
              See pricing
            </V2Button>
          </div>
          <p className="mt-4 text-sm" style={{ color: "var(--v2-ink-mute)" }}>
            No hidden fees · No monthly membership · Cancel anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}
