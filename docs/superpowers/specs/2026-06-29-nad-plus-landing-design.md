# NAD+ Landing Page (`/nad-plus`) — Design Spec

**Date:** 2026-06-29
**Route:** `go.instarx.com/nad-plus`
**Base:** `/glp2-v2` (editorial luxe-wellness lander)

## Goal

Ship a marketing landing page for the **NAD+ anti-aging** product that mirrors
the look, feel, and architecture of the existing `/glp2-v2` weight-loss lander,
re-themed and re-copied for NAD+ using the client-supplied content.

## Architecture

Mirror `/glp2-v2` exactly — it is a proven, well-factored pattern:

- **Page:** `app/(pages)/nad-plus/page.tsx` + `layout.tsx` (copies the TLS
  preconnect warmups from glp2-v2's layout).
- **CSS:** copy `glp2-v2.css` → `app/(pages)/nad-plus/nad-plus.css`, scoped under
  the existing `.v2` wrapper. Reused as-is — same Fraunces/DM Sans editorial type
  system and cream/pink/lilac palette. New rules added only for the two net-new
  sections (Benefits grid, 3-column comparison).
- **Module:** new `app/components/modules/nad-plus/` directory holding the
  section components + a central `content.ts`.
- **Fonts:** Fraunces + DM Sans, loaded in `page.tsx` (same as glp2-v2), scoped
  via the `.v2` wrapper class.

### Analytics (per CLAUDE.md)

This is **our own marketing page**, not an embeddable Savvy/Embeddables flow. It
does **not** render `<EmbeddablesScript />`, therefore it must **NOT** be added
to `EMBEDDABLES_ROUTES` in `AnalyticsScripts.tsx`. PostHog fires normally here.

### Intake / CTA target

All CTAs point at the NAD+ quiz flow:
`INTAKE_HREF = "https://go.instarx.com/nad-quiz"`
(the existing `/nad-quiz` page renders Savvy flow `flow_a5c71j78g8j6b5ic2a919bbg4`).

### Images

All hero/product/community images stay as the **glp2-v2 placeholders** for now
(`/images/hero-4.webp`, `/images/community-2.webp`, `/images/phone.webp`,
`/images/sem-glp1.png`, `/images/tirz-glp1.png`). New NAD+ imagery will be
generated later and swapped in. Press logos, badges, and the LegitScript/HIPAA
seals are reused as-is (brand-level, product-agnostic).

## Section plan

Order top → bottom. "Reuse" = copy component, only swap copy via `content.ts`.
"Adapt" = structural edits. "New" = net-new component.

| # | Section | Source | Treatment |
|---|---------|--------|-----------|
| 1 | AnnounceBar | AnnounceBar | reuse — "NAD+ in stock — doctor-prescribed, delivered in 1–2 days." |
| 2 | Header | Header | reuse — nav: How it works · Reviews · Pricing · FAQ |
| 3 | Hero | Hero | adapt — "Start Aging Backwards with NAD+", price card "$89", category pill "NAD+ Anti-Aging", trust-bar (3 NAD+ checks) |
| 4 | FeaturedIn | FeaturedIn | reuse — press strip, unchanged |
| 5 | **Benefits** | **NEW** | 6-up benefit grid (Energy, Memory, Inflammation, DNA, Skin, Recovery) — icon + title + body, on a soft wash. Replaces glp2-v2 `Results`/`BeforeAfter`. |
| 6 | Mechanism | Mechanism | adapt — "How NAD+ Works" centered editorial copy; **drop the 3 weight-loss testimonial videos**; keep FloatingBottles decoration. |
| 7 | HowItWorks | HowItWorks | reuse — "Get your NAD+ in 1–2 days" 5-step timeline (from content). |
| 8 | **Comparison** | **NEW** | 3-column table: InstaRx NAD+ Injections vs Research Peptides vs Oral Supplements, 7 rows (Rx status, purity, absorption, oversight, results, safety, cost). InstaRx column emphasized. |
| 9 | Reviews | Reviews | reuse — Darlene P. testimonial + supporting reviews (placeholders flagged for real, consenting NAD+ members before launch). |
| 10 | Community | Community | adapt — "Feel like yourself again" reassurance band copy. |
| 11 | FAQ | FAQ | adapt — 13 NAD+ questions grouped into 3 categories (Getting started / Safety & medication / Pricing & logistics). |
| 12 | WhatAreYouWaitingFor | WhatAreYouWaitingFor | adapt — "Ready to Elevate Your Energy?" closing CTA. |
| 13 | Ticker | Ticker | reuse — generic trust ticker, unchanged. |
| 14 | V2Footer | V2Footer | reuse — same footer, NAD+ disclaimers added to bottom bar / safety line. |
| — | FloatingCTA | FloatingCTA | adapt — pill copy "Start your NAD+ journey". |

### Dropped from glp2-v2

- **Calculator** — weight-projection slider; meaningless for NAD+.
- **BeforeAfter** — weight-loss before/after photos.
- **Medications** (peptide diptych) — NAD+ is a single product; dosage detail is
  folded into the FAQ + comparison instead.
- **Mechanism testimonial videos** — GLP-1-specific clips.

## Content source

All copy is drawn verbatim (lightly tightened for layout) from the client's
`NAD.docx`. Key facts preserved exactly:

- Pricing: **Starting at $89** (hero); **$99/mo** and **$40–$100/mo** comparison
  figures; "$100 OFF" offer; "same price, every dose, no hidden fees".
- Dosage: **500mg–1000mg injections**.
- Claims: 250k+ customers, 5-star Google rating, free 1–2 day shipping,
  HIPAA-compliant, FDA-registered 503A compounding pharmacies.
- Required legal: the FDA disclaimer, NAD+ safety information, and medical
  oversight statements go in the footer.

## Net-new CSS

Two new section component styles appended to `nad-plus.css`:

1. `.nad-benefits` — responsive 6-card grid (3×2 desktop, 2×3 tablet, 1-col
   mobile), each card: icon chip + Fraunces title + body. Uses existing tokens
   (`--v2-ink`, `--v2-rose`, glass/card treatments).
2. `.nad-compare3` — 3-column comparison. Desktop: feature label rail + 3 value
   columns with the InstaRx column raised/accented; the other two recessed.
   Mobile: stacks into 3 labeled cards (InstaRx first). Reuses `Check`/`X` lucide
   icons and the existing compare color tokens where possible.

## Out of scope

- Real NAD+ photography/illustration (placeholders for now).
- Any change to `/nad-quiz` or `/nad_plus_intake` (existing embeddable flows).
- A/B experiment wiring or proxy routing.

## Open items to verify before launch

- Confirm all testimonials are from real, consenting NAD+ members (FTC).
- Confirm final CTA destination (nad-quiz vs a dedicated nad intake).
- Swap placeholder imagery once NAD+ assets are generated.
