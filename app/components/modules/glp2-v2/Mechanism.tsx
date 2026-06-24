import Image from "next/image";
import { Reveal } from "./Reveal";

/* How GLP-1/GIP works — the "why it's different" beat. Vials shown as small
 * still-life on a cream panel; copy preserved from the premium rewrite. */
export function Mechanism() {
  return (
    <section className="v2-section v2-bg-pink">
      <div className="v2-container grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div
            className="relative flex items-center justify-center rounded-[28px] px-8 py-12"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 0%, var(--v2-blush) 0%, var(--v2-cream-2) 70%)",
              border: "1px solid var(--v2-line)",
            }}
          >
            <Image
              src="/images/sem-glp1.png"
              alt="Compounded Semaglutide vial"
              width={180}
              height={300}
              className="w-28 -rotate-6 drop-shadow-xl sm:w-36"
            />
            <Image
              src="/images/tirz-glp1.png"
              alt="Compounded Tirzepatide vial"
              width={180}
              height={300}
              className="-ml-6 w-28 rotate-6 drop-shadow-xl sm:w-36"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={80}>
          <p className="v2-eyebrow v2-kicker-rule mb-5">How it works</p>
          <h2 className="v2-h2 mb-6">
            Kill the cravings, feel full faster, and switch on fat-burning mode —
            with <span className="v2-accent">GLP-1/GIP</span>.
          </h2>
          <p className="v2-lede mb-6 max-w-xl">
            You shouldn&apos;t have to suffer to lose weight. GLP-1/GIP attacks
            the problem from both sides — killing hunger at the source and
            switching on your body&apos;s ability to burn stored fat.
          </p>
          <p className="max-w-xl" style={{ color: "var(--v2-ink-soft)" }}>
            InstaRx is one of the few providers where{" "}
            <span style={{ color: "var(--v2-ink)", fontWeight: 600 }}>
              all of our doctors are obesity certified
            </span>
            . Questions? Concerns? We&apos;re a message away.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
