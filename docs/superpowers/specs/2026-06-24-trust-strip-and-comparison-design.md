# Trust strip restyle + new "vs. others" comparison section

**Date:** 2026-06-24
**Surface:** `/glp2-v2` premium lander
**Branch:** `feat/glp2-v2-premium-lander`

## Problem

The shared `TrustRow` strip (flat icons + text on a cream background, no
container) currently renders in **two** places — `Results` and `Medications` —
and reads as a flat, afterthought element. It also repeats a "credibility line"
beat that the Hero trust-bar and header strip already cover, so three similar
strips stack up across the page.

## Goal

Two separate workstreams:

1. **Restyle the strip in ONE location** (keep it in `Results`) so it stops
   looking flat and reads as a deliberate, polished credibility line.
2. **Replace the OTHER instance** (`Medications`) with a new, more persuasive
   **"What your plan includes — InstaRx vs. other providers"** comparison
   section (light editorial, yourEra-inspired).

## Decisions (locked)

- **Results** keeps the strip (restyled). **Medications** loses its `TrustRow`
  and the new comparison section is placed **immediately after `Medications`**
  in `page.tsx` (natural beat: "here are the meds → here's why you get them from
  us, not a competitor").
- New section visual style: **light editorial (yourEra-style)** — on-brand with
  the cream/Fraunces/DM Sans palette. No dark tonal break.
- The comparison rows use **different labels** from the restyled strip so the
  two don't feel like duplicates.

---

## Workstream 1 — Restyle the Results strip

**Scope:** visual only. `TrustRow` keeps its current API (`showRating` prop),
its four badge labels, and its rating. Only the `.v2-trust*` CSS changes.

**Treatment:** lift the four points off the flat cream into a single soft
editorial panel so it reads as one intentional unit (not four floating
icon+label pairs):

- Wrap `.v2-trust__row` in a soft rounded container: `--v2-blush` / cream-2 fill
  (or a hairline-bordered white card), `border-radius` ~18px matching the Hero
  trust-bar and med cards, generous padding.
- Keep the four points in a row on desktop; even spacing with hairline vertical
  dividers between items (reuse the divider treatment from `.v2-trustbar` /
  `.v2-glass-divider`) so it echoes the Hero bar's structure without copying its
  frosted-glass-over-photo look (there's no photo behind it here).
- Icon tiles: give each icon a small rounded-square tile (like the Hero bar's
  `.v2-trustbar__icon`) for consistency, OR keep inline icons but tighten
  alignment — pick the tile treatment for a cleaner, more "designed" read.
- Rating row (`.v2-trust__rating`) stays below the panel, unchanged in content.
- Mobile: panel collapses the row to a 2-col or stacked layout; dividers drop.

**Constraint:** changes scoped to `.v2-trust*` selectors. The `Medications`
override (`#medications .v2-trust`) is removed along with that usage (see
workstream 2), so no need to preserve it.

**No new component.** `TrustRow.tsx` markup may gain a wrapping element/class if
the panel needs it, but the badge data and rating logic are untouched.

---

## Workstream 2 — New comparison section

### Component

New file: `app/components/modules/glp2-v2/PlanComparison.tsx`
(client-agnostic — static, server component; no state needed).

Rendered in `page.tsx` directly after `<Medications />` and before
`<Community />`.

### Layout (desktop)

A 3-zone editorial comparison, light background (`v2-bg-cream` or `cream-2` —
whichever alternates correctly against the neighboring sections):

```
            What your personalized plan includes        <- v2-h2, centered
            (optional eyebrow: "The InstaRx difference") <- v2-eyebrow + kicker-rule

  Feature text (left)        [ InstaRx card ]      Our competitors (right, muted)
  ─────────────────          ┌──────────────┐      ───────────────────
  Same flat price …          │   ✓ Included │      Prices climb …
  ─────────────────          │   ✓ Included │      ───────────────────
  Free 1–2 day ship …        │   ✓ Included │      Speed and cost vary
  …                          │   …          │      …
                             └──────────────┘

        Join 10,000+ Americans losing weight with InstaRx   <- closing line
                    [ Find your treatment → ]                <- v2-btn primary
```

- **Left column:** feature statements (ink), each separated by a hairline rule —
  matches yourEra's left rail.
- **Center column:** a single brand-accent **card** (soft rose/accent fill, or
  `--v2-gradient`/`--v2-blush`) containing one ✓ "Included" badge per row,
  aligned to the same baseline as the left/right rows. The card reads as one
  unit (yourEra's green card), signaling "with InstaRx, all of this is in."
  Header of the card = small InstaRx wordmark/logo (reuse
  `/logos/instarx-logo.png`) or just the brand name.
- **Right column:** "Our competitors" header (muted), each row a muted ✗ +
  short phrase, hairline rules — visually recessed (lower contrast) so InstaRx
  wins the eye.

### Rows (content — locked)

| # | InstaRx (✓ Included) — left feature text | Competitors (✗) — right |
|---|---|---|
| 1 | Same flat price at every dose — no memberships or contracts | Prices climb as your dose goes up · surprise fees |
| 2 | Free 1–2 day shipping, cold-chain packed | Speed and cost vary · you wait |
| 3 | A real U.S.-licensed provider, 1:1 — not a chatbot | Limited hours or automated replies |
| 4 | Compounded by certified U.S. pharmacies | Pharmacy sourcing is opaque or unverified |
| 5 | Ongoing care that stays with you past month one | Short-term, meds-only — then you're on your own |

**Closing line:** "Join 10,000+ Americans losing weight with InstaRx"
**CTA:** `Find your treatment` → `INTAKE_HREF` (primary `V2Button`, `arrow`).

> All factual claims reuse facts already on the page (flat pricing, free 1–2 day
> shipping, 1:1 U.S.-licensed care, certified 503A U.S. pharmacies, ongoing/
> retention care). No new claims introduced. The "10,000+" figure matches the
> Hero / TrustRow count.

### Data location

Define the five rows as a `COMPARISON_ROWS` array inside `PlanComparison.tsx`
(co-located, like `PRESS_LOGOS` in `FeaturedIn.tsx` and `BADGES` in
`TrustRow.tsx`) — not in `content.ts`, since it's presentation-coupled and
single-use. Each row: `{ feature: string, competitor: string }`.

### Responsive (mobile)

The 3-column grid collapses. Recommended mobile pattern (to decide at build):
per-row stacked group — feature statement, then a small "✓ InstaRx / ✗ Others"
inline pair beneath it — so the comparison stays legible without horizontal
scroll. The center "card" framing is a desktop affordance; on mobile each row's
✓ can carry the accent fill instead.

### Styling

- Reuse existing tokens/classes: `v2-section`, `v2-container`, `v2-h2`,
  `v2-eyebrow`, `v2-kicker-rule`, `v2-accent`, `V2Button`, `Reveal` (for the
  scroll-in), and the blush/gradient/glass-divider tokens.
- New CSS lives in `glp2-v2.css` under a `.v2-compare*` namespace, following the
  file's existing sectioned-comment convention.
- ✓ marks use the ink/accent fill (like the calculator's checkmark bg,
  `--v2-rose` → ink); ✗ marks use a muted outline (`--v2-ink-mute` / line color).

---

## Files touched

- `app/components/modules/glp2-v2/TrustRow.tsx` — possibly a wrapping
  element/class for the new panel (markup only; data unchanged).
- `app/components/modules/glp2-v2/Medications.tsx` — remove the `TrustRow`
  import + usage (the no-rating strip).
- `app/components/modules/glp2-v2/PlanComparison.tsx` — **new** component.
- `app/(pages)/glp2-v2/page.tsx` — import + render `<PlanComparison />` after
  `<Medications />`.
- `app/(pages)/glp2-v2/glp2-v2.css` — restyle `.v2-trust*` (panel); add
  `.v2-compare*` section styles; drop the now-unused `#medications .v2-trust`
  override.

## Out of scope

- The Header trust strip and the Hero trust-bar are **not** touched.
- No copy changes to the four `TrustRow` badge labels (only its container
  styling).
- No new factual/marketing claims beyond what the page already states.

## Verification

- Headless screenshots (Playwright, port 5050) at desktop (1280) + mobile (390):
  - Results strip reads as a polished panel, not flat icons.
  - New comparison section renders after Medications, on-brand, with all 5 rows,
    closing line, and CTA; InstaRx column visually "wins"; competitors recessed.
  - No layout overflow at 320/390px.
- Confirm `Medications` no longer shows the old strip and its closing rating
  still renders correctly.
