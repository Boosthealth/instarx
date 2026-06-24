import Image from "next/image";
import { V2Button, Stars } from "./ui";
import { heroChecks, INTAKE_HREF } from "./content";

const HERO_IMG =
  "/images/YMI_httpss.mj.runzjh3wTP036k_Create_a_photo_of_a_happy_woman__d32d1251-0c8b-4af2-a97d-91315b1c4c78_0.png";

export function Hero() {
  return (
    // Contained hero (Lightship-style): the section provides a gutter so the
    // card floats inset from the browser edges; the header stays full-width above.
    <section id="top" className="v2-hero-wrap">
      <div className="v2-hero-card">
        {/* Animated drifting pink/beige blobs — living gradient layer (CSS-only). */}
        <div className="v2-hero-anim" aria-hidden="true">
          <span />
        </div>

        <div className="v2-container relative z-10 grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-14">
          {/* Left: copy (sits on a subtle darker wash for contrast) */}
          <div className="v2-hero-copy">
            {/* Glass tag wrapping the category label (Coivas-style) */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="v2-glass v2-glass-pill">
                <span className="v2-glass-dot" aria-hidden="true" />
                GLP-1 Weight Loss
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--v2-ink-mute)" }}
              >
                HSA / FSA eligible
              </span>
            </div>

            <h1 className="v2-display mb-6">
              Drop up to <span className="v2-accent">1–2 lbs</span>
              <br />
              per week
            </h1>

            <p className="v2-lede mb-5 max-w-md">
              Lose up to{" "}
              <span style={{ color: "var(--v2-ink)", fontWeight: 600 }}>17%*</span>{" "}
              of your body weight with prescription GLP-1.
            </p>

            <p className="mb-7 max-w-md" style={{ color: "var(--v2-ink-soft)" }}>
              Starting at{" "}
              <span
                className="v2-h3"
                style={{ fontStyle: "normal", color: "var(--v2-ink)" }}
              >
                $148
              </span>{" "}
              — doctor-prescribed GLP-1, delivered in 1–2 days.{" "}
              <span style={{ color: "var(--v2-ink)", fontWeight: 600 }}>
                No insurance needed. No hidden fees. No clinic visits.
              </span>
            </p>

            {/* Trustpilot-style social proof */}
            <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1">
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

            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <V2Button
                href={INTAKE_HREF}
                variant="primary"
                className="w-full sm:w-auto"
                arrow
              >
                Find your treatment
              </V2Button>
              {/* Glass secondary button */}
              <V2Button
                href={INTAKE_HREF}
                variant="glass"
                className="w-full sm:w-auto"
              >
                See pricing
              </V2Button>
            </div>

            <ul className="space-y-3">
              {heroChecks.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(255,255,255,0.6)" }}
                  >
                    <Image
                      src={`/lose-weight/${item.icon}`}
                      alt=""
                      aria-hidden="true"
                      width={15}
                      height={15}
                    />
                  </span>
                  <span style={{ color: "var(--v2-ink-soft)" }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: lifestyle photo + floating glass price card */}
          <div className="relative">
            {/* Spotlight halo behind the photo — makes the subject pop. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,252,248,0.9) 0%, rgba(255,252,248,0.4) 42%, rgba(255,252,248,0) 70%)",
              }}
            />
            <div
              className="relative overflow-hidden rounded-[24px]"
              style={{
                boxShadow:
                  "0 2px 6px rgba(60,40,30,0.08), 0 40px 70px -34px rgba(60,40,30,0.55)",
              }}
            >
              <Image
                src={HERO_IMG}
                alt="A happy woman holding her InstaRx GLP-1 medication"
                width={1272}
                height={952}
                sizes="(max-width: 1024px) 100vw, 540px"
                className="h-full w-full object-cover"
                style={{ filter: "saturate(1.06) contrast(1.04)" }}
                priority
              />
            </div>

            {/* floating glass price card */}
            <div className="v2-glass absolute -bottom-4 left-4 right-4 mx-auto flex max-w-sm items-center justify-between gap-3 rounded-2xl px-5 py-3.5 sm:left-auto sm:right-6 sm:max-w-xs">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--v2-ink-mute)" }}
                >
                  First month
                </p>
                <p className="v2-h3" style={{ fontStyle: "normal" }}>
                  $148{" "}
                  <span
                    className="align-middle text-sm font-normal line-through"
                    style={{
                      fontFamily: "var(--v2-fb)",
                      color: "var(--v2-ink-mute)",
                    }}
                  >
                    $298
                  </span>
                </p>
              </div>
              <span className="v2-chip">$150 off</span>
            </div>
          </div>
        </div>

        <p
          className="v2-container relative z-10 pb-10 text-sm"
          style={{ color: "var(--v2-ink-mute)" }}
        >
          Zero hidden fees · Zero monthly membership · Cancel anytime
        </p>
      </div>
    </section>
  );
}
