import Image from "next/image";
import { Reveal } from "./Reveal";
import { comparison } from "./content";

/* NEW content vs the live /glp2: a side-by-side editorial comparison of the two
 * peptides. Two cards on desktop (Tirzepatide flagged as the "advanced" pick),
 * stacked on mobile. Rows are driven by content.ts so copy stays editable. */
export function Comparison() {
  return (
    <section className="v2-section v2-bg-cream-2">
      <div className="v2-container">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="v2-eyebrow mb-5 inline-flex justify-center">
            Choose your path
          </p>
          <h2 className="v2-h2 mb-5">
            Two proven peptides. One{" "}
            <span className="v2-accent">clear choice</span>.
          </h2>
          <p className="v2-lede">
            Both are doctor-prescribed and U.S.-compounded. Here&apos;s how they
            compare.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {/* Semaglutide */}
          <Reveal as="article" className="v2-card overflow-hidden">
            <div className="flex items-center gap-4 border-b p-6" style={{ borderColor: "var(--v2-line)" }}>
              <Image
                src="/images/sem-glp1.png"
                alt="Compounded Semaglutide vial"
                width={56}
                height={92}
                className="h-16 w-auto"
              />
              <div>
                <h3 className="v2-h3" style={{ fontStyle: "normal" }}>
                  Semaglutide
                </h3>
                <p className="text-sm" style={{ color: "var(--v2-ink-mute)" }}>
                  Single-action · proven
                </p>
              </div>
            </div>
            <dl className="p-6">
              {comparison.rows.map((row) => (
                <div key={row.label} className="border-b py-3 last:border-0" style={{ borderColor: "var(--v2-line)" }}>
                  <dt className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--v2-rose-deep)" }}>
                    {row.label}
                  </dt>
                  <dd className="mt-1" style={{ color: "var(--v2-ink-soft)" }}>
                    {row.sema}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Tirzepatide — flagged as advanced */}
          <Reveal
            as="article"
            delay={80}
            className="v2-card relative overflow-hidden"
          >
            <span
              className="absolute right-5 top-5 z-10 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "var(--v2-rose)", color: "#fff" }}
            >
              Most comprehensive
            </span>
            <div
              className="flex items-center gap-4 border-b p-6"
              style={{
                borderColor: "var(--v2-blush-deep)",
                background:
                  "linear-gradient(180deg, var(--v2-blush) 0%, #fff 100%)",
              }}
            >
              <Image
                src="/images/tirz-glp1.png"
                alt="Compounded Tirzepatide vial"
                width={56}
                height={92}
                className="h-16 w-auto"
              />
              <div>
                <h3 className="v2-h3" style={{ fontStyle: "normal" }}>
                  Tirzepatide
                </h3>
                <p className="text-sm" style={{ color: "var(--v2-ink-mute)" }}>
                  Dual-action · next-generation
                </p>
              </div>
            </div>
            <dl className="p-6">
              {comparison.rows.map((row) => (
                <div key={row.label} className="border-b py-3 last:border-0" style={{ borderColor: "var(--v2-line)" }}>
                  <dt className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--v2-rose-deep)" }}>
                    {row.label}
                  </dt>
                  <dd className="mt-1" style={{ color: "var(--v2-ink)" }}>
                    {row.tirz}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <p
          className="mx-auto mt-8 max-w-2xl text-center text-sm"
          style={{ color: "var(--v2-ink-mute)" }}
        >
          Not sure which fits? Your physician recommends the right one for you
          based on your goals and health profile.
        </p>
      </div>
    </section>
  );
}
