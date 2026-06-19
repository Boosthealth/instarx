# GLP-2 Hero Layout Variants (D & C2) — Design

Date: 2026-06-18

## Goal

Build two new landing pages, `/glp2-da` and `/glp2-c2`, that are identical to the
existing `/glp2` page except for the **Hero section**, and only on **mobile**
(below the `sm` breakpoint). On desktop they must render byte-for-byte the same
as `/glp2`. The variants come from the client's A/B mockup board
(`ab-testing/image (146).png`):

- `/glp2-da` → mockup column **D** ("A + centered lede")
- `/glp2-c2` → mockup column **C2** ("centered, no 17% line")

These are plain static landers (no Convert wiring), matching how `/glp2` itself
is a static lander the client can later point a split-URL experiment at.

## Baseline: current `/glp2` mobile hero

DOM order of the hero text block today (`app/components/modules/home/Hero.tsx`),
all left-aligned on mobile:

1. Trustpilot stars
2. Headline ("Drop up to 1-2lbs per week!")
3. Lede: "Lose up to 17%* of your body weight with prescription GLP‑1."
4. Price paragraph: "Starting at **$148** — Doctor-prescribed GLP‑1, delivered
   in 1-2 days. **No insurance needed. No hidden fees. No clinic visits.**"
5. Bullets (4 check items)
6. CTA row: "Start Quiz →" (dark) + "See pricing" (light)
7. Fine print: "Zero Hidden Fees · Zero Monthly Membership · Cancel Anytime"
8. Image (hero lady)

## Architecture

Add a `layout?: "default" | "d" | "c2"` prop to the existing `Hero` component,
defaulting to `"default"` so `/glp2` is unchanged. Mobile-only layout differences
are expressed with responsive Tailwind utilities (`text-center sm:text-left`,
conditional ordering) gated at the `sm` breakpoint, so the desktop two-column
markup remains shared and identical across all three pages.

Create two route files that reuse the exact `glp2/page.tsx` body, changing only
the Hero prop and page-level metadata/`PageViewedEvent` name:

- `app/(pages)/glp2-da/page.tsx` → renders `<Hero layout="d" />`
- `app/(pages)/glp2-c2/page.tsx` → renders `<Hero layout="c2" />`

Rationale: single source of truth for hero content and the entire desktop layout;
no duplication of bullets/stars/image/desktop markup; trivial to delete a losing
variant later (remove the page file + its branch in `Hero`).

## Mobile hero — Variant D (`/glp2-da`)

Order on mobile (centered upper block, CTA moved above bullets):

1. Stars — left-aligned (unchanged)
2. Headline — **centered**
3. Lede "Lose up to 17%*…" — **centered**
4. Price paragraph "Starting at $148…" — **centered**
5. **Single CTA**: "Find your treatment →" (dark, full-width), positioned
   directly under the price paragraph (before the bullets)
6. Fine print "Zero Hidden Fees · …" — centered
7. Bullets — left-aligned, below the CTA/fine print
8. Image

## Mobile hero — Variant C2 (`/glp2-c2`)

Order on mobile (fully centered upper block, 17% lede removed):

1. Stars — **centered**
2. Headline — **centered**
3. *(Lede "Lose up to 17%*…" line removed entirely)*
4. Price block — **centered**: "Starting at **$148** — Doctor-prescribed GLP‑1,
   delivered in 1-2 days." followed by the guarantee lines stacked & centered:
   "No insurance needed." / "No clinic visits." / "No hidden fees."
5. **Single CTA**: "Find your treatment →" (dark, full-width), under the price
6. Fine print "Zero Hidden Fees · …" — centered
7. Bullets — left-aligned, below the CTA/fine print
8. Image

## CTA

On mobile, both variants render a single full-width dark `Button` with text
`Find your treatment →` pointing at the existing `https://go.instarx.com/intake`.
The secondary "See pricing" button is hidden on mobile for the variants. On
desktop (`sm:` and up) the original two-button row ("Start Quiz →" + "See pricing")
is preserved unchanged.

## Out of scope

- No changes to `/glp2` rendering.
- No changes to any other section (Results, VideoTestimonials, HowItWorks,
  Reviews, Medications, FAQ, FinalCTA, Footer).
- No Convert experiment wiring; variants are standalone URLs.
- No desktop layout changes.

## Verification

1. `npm run dev` (port 5050).
2. At 390px width, screenshot `/glp2`, `/glp2-da`, `/glp2-c2`; confirm `/glp2`
   matches today and the variants match mockup columns D and C2.
3. At desktop width, screenshot all three; confirm they are identical.
4. `npm run lint` passes.
