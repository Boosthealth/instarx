import Image from "next/image";
import { V2Button, Stars } from "./ui";
import { heroChecks, INTAKE_HREF } from "./content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        background: "var(--v2-gradient)",
        // Full-bleed: pull up behind the sticky header so the gradient runs
        // edge-to-edge from the very top, header floats over it.
        marginTop: "calc(-1 * var(--v2-header-h, 72px))",
        paddingTop: "calc(var(--v2-header-h, 72px) + 1.5rem)",
      }}
    >
      {/* subtle warm glow accents layered on the gradient for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-24 h-[44rem] w-[44rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(246,222,228,0.7) 0%, rgba(246,222,228,0) 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-[40rem] w-[40rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,228,210,0.7) 0%, rgba(240,228,210,0) 60%)",
        }}
      />

      <div className="v2-container relative grid grid-cols-1 items-center gap-10 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-20">
        {/* Left: copy */}
        <div>
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

        {/* Right: portrait + floating glass price card */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[24px]"
            style={{ boxShadow: "var(--v2-shadow-card)" }}
          >
            <Image
              src="/lose-weight/hero-lady.webp"
              alt="A woman achieving her weight loss goals with InstaRx GLP-1 medication"
              width={620}
              height={620}
              sizes="(max-width: 1024px) 100vw, 540px"
              className="h-full w-full object-cover"
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
        className="v2-container relative pb-10 text-sm"
        style={{ color: "var(--v2-ink-mute)" }}
      >
        Zero hidden fees · Zero monthly membership · Cancel anytime
      </p>
    </section>
  );
}
