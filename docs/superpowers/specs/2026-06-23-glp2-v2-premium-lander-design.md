# /glp2-v2 — Premium Editorial GLP-1 Lander

**Date:** 2026-06-23
**Status:** Approved direction (autonomous build authorized by user)
**Route:** `/glp2-v2`

## Goal

Build a more polished, premium variant of the `/glp2` weight-loss lander as a
new standalone page. It is the "next meaningful variant" the client asked for —
a genuine design upgrade, not a prop-tweak like the existing `glp2-a/b/c2/da`
variants.

## Constraints (from the user)

1. **Keep the copy.** Reuse existing copy; refinements for clarity and a few new
   content pieces are allowed. We adopt the more premium copy the designer
   already drafted (design-responsive.vercel.app), which is itself a clarity
   upgrade over the live `/glp2`. **All factual claims, prices, and percentages
   stay identical** ($148 first month / $298 reg / $150 off, "up to 17%", 4.7
   Trustpilot, 10,000+ customers, 1–2 day shipping, HSA/FSA, 503A pharmacies).
2. **Keep pink + light-beige tones.** Palette treatment: **calm & editorial** —
   cream/beige canvas, soft dusty-rose accent. Drop the loud purple→yellow
   gradient of the current hero.
3. **More premium feel.** Aesthetic direction: **editorial / luxe-wellness**.

## Design decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Fidelity to designer WIP | Loose inspiration | User chose creative latitude |
| Aesthetic | Editorial / luxe-wellness | Serif display + airy whitespace, soft pink/beige |
| Fonts | **Fraunces (display) + DM Sans (body)** | Matches the `/optin` house style already in the repo |
| Palette | **Calm & editorial** | Cream canvas `#FBF7F2`, ink `#1A1714`, dusty rose accent `#C76B86` / hover `#B05576`, soft blush wash `#F7E9EC` on select panels |
| Motion | Subtle | Fade/rise on scroll, marquee ticker, slider/accordion interactions only |

### Palette tokens (scoped to the page)

```
--v2-cream:    #FBF7F2   /* dominant canvas */
--v2-cream-2:  #F4ECE3   /* alternating section / cards */
--v2-blush:    #F7E9EC   /* soft pink wash panels */
--v2-ink:      #1A1714   /* headlines / body */
--v2-ink-soft: #5B524B   /* secondary text */
--v2-rose:     #C76B86   /* primary accent: buttons, eyebrows, italic words, rules */
--v2-rose-deep:#B05576   /* hover / active */
--v2-line:     #E7DDD2   /* hairline rules / card borders */
```

Pink is used **sparingly as an accent** (eyebrows, italic accent words in
headlines, primary CTA, rules, the projected-loss highlight). Cream + ink carry
most of the page so it reads expensive and quiet.

### Typography system

- Display headlines: Fraunces, weight 600–700, tight tracking, italic used for
  the accent word/number (e.g. *1–2 lbs*, *17%*, *GLP-1/GIP*).
- Eyebrows: DM Sans, uppercase, letter-spaced `0.18em`, rose, small.
- Body: DM Sans 400/500, `--v2-ink-soft`, generous line-height (1.6).
- Fluid sizes via `clamp()`.

## Page structure (top → bottom)

1. **Announcement ticker** — slim marquee bar of trust phrases ("Licensed
   providers & pharmacies — Safe & effective medications — 10k+ success
   stories — Personalized treatment plans — 100% U.S. licensed").
2. **Header** — page-local, editorial styling (logo, anchor nav: How it works /
   Medications / Reviews, "Start the quiz →" CTA). Transparent over cream, thin
   bottom hairline on scroll. Mobile: compact bar + single CTA.
3. **Hero** — eyebrow ("GLP-1 Weight Loss · Telehealth"), serif headline
   ("Drop up to *1–2 lbs* per week"), lede, price line, two CTAs (primary rose
   "Start the quiz →", ghost "See pricing"), Trustpilot row, the 4 check items,
   `hero-lady.webp` on the right in a soft rounded frame. Pricing strip:
   "First month $148 · $150 off · Reg. $298 · No hidden fees · Cancel anytime".
4. **As featured in** — "Featured in" eyebrow + press logos (`seen-on-*.webp`).
5. **Results** — before/after slider (reuse `BeforeAfterSlider`, re-skinned),
   headline "Finally lose weight without the cravings, the crash diets, or the
   constant exhaustion.", caption "Drag to compare · 6 months on GLP-1",
   `*Individual results vary` disclaimer.
6. **Weight projection calculator** — "How much could you shed by next spring?",
   weight input + slider, projected −17% trajectory, "You could easily lose
   {N} lbs", CTA. Reuse `WeightCalculator` logic, re-skinned to the palette
   (no blue; rose/cream).
7. **Mechanism** — "Kill the cravings, feel full faster, and switch on
   fat-burning mode — with *GLP-1/GIP*." Explanatory paragraph + the two vial
   images. Obesity-certified doctors note.
8. **Sema vs Tirz comparison (NEW content)** — "Two proven peptides. One clear
   choice." Side-by-side editorial comparison of Semaglutide vs Tirzepatide
   (single- vs dual-action, up to 15% vs 20.9%, long-term balance vs accelerated
   transformation, starting point vs comprehensive). Footnote: physician
   recommends based on goals/health profile.
9. **How it works** — premium 4-step concierge timeline (intake ~5 min →
   physician review <24h → cold-chain dispensing 1–2 day → ongoing care), plus
   "In every temperature-controlled kit" list (vial, syringes, prep pads,
   injection guide) with `timeline.webp`.
10. **Reviews** — "In their words" testimonials (Sara P., Alex B., Amy J.,
    Darlene N.) as editorial quote cards, 4.7 / 10,000+ customers.
11. **Medications / in-stock** — "Medications in stock." Compounded Semaglutide
    & Tirzepatide, "Ready to ship · In stock · $150 off", checklist (503A,
    personalized, 1:1 support, US support), CTAs, vial images.
12. **FAQ** — categorized accordions (Getting started / Safety & medication /
    Pricing & logistics). First item open by default.
13. **Final CTA** — "Lose the weight without the struggle." blush panel, single
    primary CTA, "$150 off instantly" badge.
14. **Footer** — reuse the existing shared `Footer` component as-is.

> Section order intentionally adds the **comparison** block and an explicit
> **mechanism** block relative to the live `/glp2` (Hero → Results →
> VideoTestimonials → HowItWorks → Reviews → Medications → FAQ → FinalCTA).
> VideoTestimonials is dropped in favor of the editorial quote treatment;
> revisit if the client wants video back.

## Architecture

Follow the `/optin` precedent: a **self-contained module + page-local CSS +
fonts loaded in the page**, so the shared `home` module is untouched and no
existing variant can regress.

```
app/(pages)/glp2-v2/
  page.tsx          # loads Fraunces+DM Sans, scopes via wrapper className,
                    # imports glp2-v2.css, composes sections, metadata, tracking
  glp2-v2.css       # @layer: palette tokens, font vars, marquee, utilities

app/components/modules/glp2-v2/
  Ticker.tsx        # announcement marquee (CSS animation)
  Header.tsx        # page-local editorial header (client: scroll state)
  Hero.tsx
  FeaturedIn.tsx
  Results.tsx       # wraps a re-skinned before/after slider
  Calculator.tsx    # client: weight projection (adapted logic)
  Mechanism.tsx
  Comparison.tsx    # NEW Sema vs Tirz
  HowItWorks.tsx
  Reviews.tsx
  Medications.tsx
  FAQ.tsx           # client: accordion
  FinalCTA.tsx
  Button.tsx        # page-local rose/editorial button (own variant)
  content.ts        # all copy + data arrays in one place
```

- **Server components by default.** Client only where interactivity is required:
  `Header` (scroll state), `Calculator`, `FAQ`, and the slider inside `Results`.
- **Page-local `Button`** with rose/ghost variants (the shared `home/Button`
  hardcodes blue hover, which clashes with the palette). The before/after slider
  may be reused from `home/BeforeAfterSlider` if its blue focus ring is
  overridden, or copied into the module and re-skinned — implementation detail.
- **`content.ts`** centralizes copy so the client can tweak words without
  touching layout, and keeps each section component focused.

## Reuse

- Images: `hero-lady`, `model1-before/after`, `seen-on-*`, `timeline`, vials
  (`sem-glp1.png` / `tirz-glp1.png`), icons (`clipboard-*`, `shield-check`,
  `truck`), trust badges (LegitScript, HIPAA, Stripe, SSL, cards), logos.
- Components: shared `Footer`, `AnchorScrollFix`.
- All CTAs point to `https://go.instarx.com/intake` (same as every lander).

## Tracking / wiring (must-have)

- `<PageViewedEvent pageName="glp2-v2" />` at the top of the page.
- `<AnchorScrollFix />` for in-page anchor nav.
- **Add `/glp2-v2` to `HOMEPAGE_LANDER_PATHS`** in
  `app/components/CtaClickTracker.tsx` — otherwise the `homepage-cta-click`
  Convert goal will not fire for this lander. (This is the one edit outside the
  new files.)
- Metadata: reuse the `/glp2` title/description, set `openGraph.url` to
  `/glp2-v2`. Page is indexable (unlike `/optin`).

## Accessibility & quality bar

- Headings hierarchical (one `h1`), slider/accordion keyboard-operable and
  `aria-*` labeled (the reused slider already is), focus-visible rings in rose.
- Color contrast: ink on cream and rose-on-white CTAs meet AA.
- Respect `prefers-reduced-motion`: disable marquee + scroll reveals.
- Fully responsive; mobile keeps a single full-width primary CTA in the hero.
- Images sized with `sizes`/dimensions to avoid CLS; hero image `priority`.

## Out of scope (YAGNI)

- No Convert A/B variation wiring inside the page (it's a standalone variant
  route; experiment assignment is handled upstream by the proxy/middleware).
- No CMS / content editing UI — copy lives in `content.ts`.
- No changes to the shared `home` module or existing `glp2*` variants.
- No new backend, API, or intake-flow changes.

## Success criteria

- `/glp2-v2` renders a visibly more premium, editorial take on `/glp2` in
  pink/beige, with all copy/claims preserved and the new comparison section.
- `next build` and `eslint` pass clean.
- Tracking (`page_viewed`, CTA-click goal) wired correctly.
- Shared `home` module and existing variants are byte-for-byte unchanged.
