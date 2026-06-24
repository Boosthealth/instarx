"use client";

import { useState } from "react";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

const MIN = 150;
const MAX = 400;
const LOSS_RATE = 0.17; // up to 17% body weight

/* Weight projection calculator. Adapted from home/WeightCalculator (same MIN/MAX
 * clamp + parse-on-blur), re-skinned to the cream/beige palette and reframed
 * around a −17% trajectory with start/projected end-weights. */
export function Calculator() {
  const [raw, setRaw] = useState("260");
  const weight = Math.min(MAX, Math.max(MIN, Number(raw) || MIN));
  const loss = Math.round(weight * LOSS_RATE);
  const projected = weight - loss;
  const pct = ((weight - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="v2-section v2-bg-blush">
      <div className="v2-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="v2-eyebrow mb-5 inline-flex justify-center">
            The projection
          </p>
          <h2 className="v2-h2 mb-10">
            How much could you shed by{" "}
            <span className="v2-accent">next spring</span>?
          </h2>
        </div>

        <div className="v2-card mx-auto max-w-3xl p-6 sm:p-10">
          <label
            htmlFor="v2-weight"
            className="mb-3 block text-center text-sm font-medium"
            style={{ color: "var(--v2-ink-soft)" }}
          >
            Your current weight
          </label>
          <div className="mb-7 flex items-center justify-center gap-2">
            <input
              id="v2-weight"
              type="number"
              min={MIN}
              max={MAX}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              onBlur={(e) =>
                setRaw(
                  String(Math.min(MAX, Math.max(MIN, Number(e.target.value) || MIN))),
                )
              }
              className="w-32 rounded-full border bg-transparent py-3 text-center text-3xl font-semibold focus:outline-none"
              style={{
                borderColor: "var(--v2-line-strong)",
                color: "var(--v2-ink)",
                fontFamily: "var(--v2-fb)",
              }}
            />
            <span className="text-lg" style={{ color: "var(--v2-ink-mute)" }}>
              lbs
            </span>
          </div>

          <input
            aria-label="Adjust your current weight"
            type="range"
            min={MIN}
            max={MAX}
            value={weight}
            onChange={(e) => setRaw(e.target.value)}
            className="v2-range mb-2"
            style={{
              background: `linear-gradient(to right, var(--v2-rose) 0%, var(--v2-rose) ${pct}%, var(--v2-blush-deep) ${pct}%, var(--v2-blush-deep) 100%)`,
            }}
          />
          <div
            className="mb-8 flex justify-between text-xs"
            style={{ color: "var(--v2-ink-mute)" }}
          >
            <span>{MIN} lbs</span>
            <span>{MAX} lbs</span>
          </div>

          {/* trajectory result */}
          <div
            className="rounded-2xl px-6 py-7 text-center"
            style={{ background: "var(--v2-ink)", color: "var(--v2-cream)" }}
          >
            <div className="mb-5 flex items-center justify-center gap-4 text-sm">
              <span style={{ color: "rgba(251,247,242,0.7)" }}>
                Today · {weight} lbs
              </span>
              <span aria-hidden="true" style={{ color: "var(--v2-beige)" }}>
                →
              </span>
              <span style={{ color: "rgba(251,247,242,0.7)" }}>
                6 mo · {projected} lbs
              </span>
            </div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--v2-beige)" }}
            >
              You could easily lose
            </p>
            <p
              className="v2-display my-1"
              style={{ color: "#fff", fontStyle: "normal" }}
            >
              {loss} lbs
            </p>
            <p className="text-sm" style={{ color: "rgba(251,247,242,0.6)" }}>
              Projected trajectory · −17% body weight
            </p>
          </div>

          <div className="mt-8 text-center">
            <V2Button href={INTAKE_HREF} variant="primary" arrow>
              Find your treatment
            </V2Button>
            <p className="mt-4 text-sm" style={{ color: "var(--v2-ink-mute)" }}>
              No hidden fees · No monthly membership · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
