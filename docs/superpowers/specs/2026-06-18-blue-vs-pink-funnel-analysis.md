# BLUE `/start-glp1` vs PINK `/glp2` — Funnel Analysis & PINK A/B Test Plan

**Date:** 2026-06-18
**Pages analyzed:**
- BLUE — [`/start-glp1`](<../../../app/(pages)/start-glp1/page.tsx>) (`modules/glp1/*`)
- PINK — [`/glp2`](<../../../app/(pages)/glp2/page.tsx>) (`modules/home/*`)

**Purpose:** Explain the conversion paradox between the two landing pages, and
turn it into a concrete A/B test backlog for the PINK page.

---

## The reported stats

| Metric        | BLUE `/start-glp1` | PINK `/glp2` | Winner |
| ------------- | -----------------: | -----------: | :----: |
| Views         |              2,600 |        3,870 |   —    |
| Clicked (CTR) |     453 (**17.42%**) | 434 (11.21%) | BLUE   |
| Leads         |        139 (**31%**) |   120 (28%)  | BLUE   |
| Sales         |                  4 |        **5** | PINK   |
| Funnel CVR    |              0.88% |  **1.15%**   | PINK   |
| Cost / Sale   |          **$488**  |        $581  | BLUE   |

The paradox: **BLUE wins top-of-funnel (CTR, leads) and cost-efficiency, while
PINK wins bottom-of-funnel (CVR, total sales).** They optimize opposite gates.

---

## 1. The two pages are built for opposite jobs

These are not two versions of the same page. They are two funnel philosophies
pointing at the same `/intake` destination.

| Aspect             | BLUE `/start-glp1`                        | PINK `/glp2`                                                        |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------------- |
| Module set         | `modules/glp1/*`                          | `modules/home/*`                                                    |
| Hero headline      | "Lose weight your way."                   | "Doctor-prescribed GLP-1…" + Trustpilot 4.7, $148, 4 detail bullets |
| Hero CTA           | 1 button: "Find your treatment →"         | 2 buttons: "Get Started" + "See pricing"                            |
| Price in hero?     | **No**                                    | **Yes** — $148, HSA/FSA, "no insurance"                             |
| Page length        | 7 modules, lean                           | 8 modules, dense (3 CTA blocks, 13-item FAQ, video, before/after)   |
| Proof density      | Light (media logos, 1 stat)               | Heavy (Trustpilot ×4, 10k customers, video testimonials, reviews)   |

**Thesis:** BLUE is a **low-friction curiosity page** — it tells you almost
nothing, so the only way to learn more is to click. PINK is a **high-context
qualification page** — it front-loads price, mechanism, and proof, so visitors
self-select *before* clicking.

That single difference explains the entire stat paradox.

---

## 2. Why BLUE wins the click but PINK wins the sale

The funnel has two conversion gates, and each page is tuned to a different one.

### Gate 1 — the click (CTR): BLUE 17.42% vs PINK 11.21%

BLUE's hero ([`glp1/Hero.tsx`](../../../app/components/modules/glp1/Hero.tsx))
is nearly empty: one line, one button, no price, no friction. Nothing to
evaluate, nothing to object to — clicking is the path of least resistance.

PINK's hero ([`home/Hero.tsx`](../../../app/components/modules/home/Hero.tsx))
asks you to read a Trustpilot rating, a `$148` price, a 17% claim, and 4 detail
bullets before the button. Every fact is also a potential objection. Fewer
people click — **but the ones who do are pre-qualified**: they saw the price and
clicked anyway. This is **friction-as-filter**: BLUE removes the filter, PINK
installs one in the hero.

### Gate 2 — the sale (Funnel CVR): PINK 1.15% vs BLUE 0.88%

The populations entering `/intake` are now different:

- **BLUE** sends a larger, colder, less-informed crowd. Many clicked on
  curiosity and meet the price + medical intake for the first time *inside* the
  funnel — where they drop.
- **PINK** sends a smaller, warmer, pre-sold crowd. They already accepted the
  price and absorbed the proof (video testimonials, before/after, 10k customers,
  "$150 off today"). The intake confirms a decision they've largely made.

PINK converts click→sale ~31% better (1.15 vs 0.88) and produces more total
sales at lower volume.

### The leads row confirms it mid-funnel

BLUE's edge **shrinks** from +6pt at CTR (17.42 vs 11.21) to +3pt at the lead
stage (31% vs 28%) — the qualification gap is already biting where it should.
By the sale, it inverts.

### Net: Cost/Sale — BLUE $488 vs PINK $581

Despite PINK's better conversion, BLUE is still **~16% cheaper per sale**.
PINK's conversion edge **does not fully compensate** for needing ~50% more
traffic to find its buyers. Both statements are true because they're measured at
different gates: "PINK converts better" *and* "BLUE is more efficient."

---

## 3. Caution: the sales numbers are too small to rank

**The sale counts are noise, not signal.** BLUE = 4 sales, PINK = 5. A single
sale either way is a 20–25% swing. The "PINK converts better" conclusion rests
on a **1-sale difference** — nowhere near statistical significance. You cannot
yet claim PINK's funnel CVR truly beats BLUE's.

**What you _can_ trust:**

- **CTR (17.42% vs 11.21%)** — 453/434 clicks over 2,600/3,870 views. A real,
  significant difference. BLUE genuinely earns more clicks.
- **Lead rate (31% vs 28%)** — 139/120 leads. Directional, reasonably solid.
- **Funnel CVR / Cost-per-sale** — small and noisy. Treat as **hypotheses**, not
  verdicts.

**Implication for testing:** at ~5 sales per several thousand views, sale-based
A/B tests take a very long time to reach significance. **Test on the gates you
can power** — CTR and lead-rate move fast and are statistically reachable;
final CVR is a *lagging confirmation*, not the primary judging metric.

---

## 4. PINK A/B test backlog

PINK's measurable weakness is **Gate 1 (the click)** — it trails BLUE on CTR,
and CTR is the fastest gate to reach significance on. Hypotheses, grounded in
what the code shows, ordered by leverage × ease:

| # | Hypothesis | Targets gate | Judge on (primary → confirm) | Effort | Notes |
| - | ---------- | ------------ | ---------------------------- | ------ | ----- |
| 1 | **Hero headline** variants lift CTR | Gate 1 (click) | CTR → lead-rate | **Low** | Convert harness already wired in [`home/Hero.tsx`](../../../app/components/modules/home/Hero.tsx) (`control` vs `variation_1`). Cheapest test; plumbing exists. |
| 2 | **Price placement** — soften/move the raw `$148`; lead with "$150 off today" framing (already used in `HowItWorks`/`FinalCTA`) | Gate 1 (click) | CTR → lead-rate | Med | Recover clicks without losing qualification. Risk: too soft re-imports BLUE's drop-off. |
| 3 | **Hero CTA label & count** — single primary button vs current dual "Get Started / See pricing" | Gate 1 (click) | CTR (primary-button clicks) | Low | A second button can split intent and depress primary CTR. |
| 4 | **Hero density** — lighter hero deferring the 4 bullets + Trustpilot to the (strong) modules below | Gate 1 (click) | CTR → lead-rate | Med | Tests how much front-loaded detail is actually costing clicks. |

### Testing protocol

- **Run one variable at a time** through the Convert server-side harness
  (see [`docs/ab-testing-convert.md`](../../ab-testing-convert.md)). Variations
  are decided server-side in the RSC — no flicker.
- **Primary metric = CTR or lead-rate**, not sales. Sales are the confirming
  read once a CTR winner has enough downstream volume.
- **Guardrail:** watch lead-rate alongside CTR. A headline that lifts clicks but
  drops lead-rate is just re-importing BLUE's qualification problem — net
  neutral or worse.

### The strategic decision the tests should resolve

Tests 2 and 4 pull PINK toward BLUE's low-friction top; keeping the dense hero
preserves PINK's high-qualification identity. The real question:

> **Do we want PINK to keep its high-qualification identity (optimize
> lead→sale), or borrow BLUE's low-friction top (optimize CTR)?**

These pull in opposite directions. The A/B tests above exist to answer it with
data instead of opinion — but only the CTR/lead-rate gates will answer it on a
reasonable timeline.

---

## Appendix — module inventory

**BLUE `/start-glp1`** (`modules/glp1/*`): Header → Hero → Difference →
Calculator (15%-of-weight slider) → FAQ (4 Q) → Features → CTA → Disclaimer.

**PINK `/glp2`** (`modules/home/*`): Header → Hero (price + Trustpilot + 4
bullets) → Results (before/after slider + 20%-weight calculator + trust badges +
CTA) → VideoTestimonials (3 videos + 2 CTA blocks) → HowItWorks (5-step timeline,
"$150 off") → Reviews (4 written) → Medications (Sem/Tirz, "up to $200 off") →
FAQ (13 Q) → FinalCTA ("$150 OFF instantly"). Three separate in-page CTA blocks
vs BLUE's lighter touch.
