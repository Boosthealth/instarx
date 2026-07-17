# `/glp1/how-it-works` — How-It-Works / FAQ page

**Date:** 2026-07-17
**Route:** `go.instarx.com/glp1/how-it-works`
**Reference:** [freyameds.com/how-it-works](https://freyameds.com/how-it-works)

## Purpose

A reusable "how it works" + FAQ destination for GLP-1, linkable from emails. Modeled
structurally on Freya's `/how-it-works` (5-step scroll page with a sticky stacking-card
interaction), restyled into InstaRx's blue `/start-glp1` design system. Built as a
copy-paste-able template so `/glp2` and `/glp2-v2` variants can be cloned later by
duplicating the folder and swapping content.

## Key context

- `/glp1` itself is a bare Savvy embed with no design system. The InstaRx GLP-1 visual
  language lives in `app/components/modules/glp1/` and ships on `/start-glp1`. **This page
  matches `/start-glp1`, not the `/glp1` embed.** The two share only a URL prefix.
- Freya's `/how-it-works` has **no FAQ** (Freya's FAQ is on their homepage). We combine
  Freya's step structure with an FAQ section to serve the email-destination role.
- Freya's page is mid-build (placeholder images, empty alts, watermarked stock, duplicated
  copy). We copy the *structure and interaction*, not its defects.

## Architecture

```
app/(pages)/glp1/how-it-works/page.tsx           # thin composition + metadata
app/components/modules/glp1/how-it-works/
  ├── content.ts        # ALL copy: hero, steps[], stats[], faqs[]  ← the clone swap-point
  ├── Hero.tsx          # blue radial card: eyebrow, H1, subtitle, CTA
  ├── Steps.tsx         # sticky stacking cards (Freya interaction, InstaRx palette)
  ├── Stats.tsx         # 3-stat band, real InstaRx claims
  └── FaqSection.tsx    # accordion, ported from modules/glp1/FAQ.tsx
```

**Reused unchanged:** `modules/glp1/Header`, `modules/glp1/CTA`, `modules/glp1/Disclaimer`,
`Footer`, `modules/glp1/ScrollReveal`, `modules/home/PageViewedEvent`.

**Why a `how-it-works/` subfolder instead of adding to `modules/glp1/`:** cloning for
`/glp2` = `cp -r how-it-works ../glp2/how-it-works`, then edit `content.ts` + restyle.
This matches the repo's existing convention (every lander duplicates; nothing is shared
across the three GLP design systems).

## Page composition (top → bottom)

```tsx
<PageViewedEvent pageName="GLP-1 How It Works" />
<ScrollReveal />
<Header />                        // fixed; page offsets with var(--header-height)
<main>
  <Hero />                        // new
  <Steps />                       // new — the sticky stack
  <Stats />                       // new
  <FaqSection />                  // ported from modules/glp1/FAQ
  <CTA />                         // reused from modules/glp1/CTA
  <Disclaimer />                  // reused from modules/glp1/CTA
</main>
<Footer />
```

## Section specs

### Hero

Blue radial card echoing `/start-glp1`'s hero: `rounded-3xl`, `background: var(--glp1-hero-gradient)`,
inset in `max-w-7xl mx-auto px-6`, top offset `paddingTop: "var(--header-height)"` on the section.

- Eyebrow: `HOW IT WORKS` (uppercase, tracked, blue-tinted)
- H1 (`font-[family-name:var(--font-inter)]`, `heading-display`): "Your GLP-1 journey, step by step"
- Subtitle: "From your first assessment to medication at your door, here's exactly how
  InstaRx works — and answers to the questions patients ask most."
- Primary CTA → `https://go.instarx.com/intake`, `prefetch={false}`, style matches
  `modules/glp1/CTA` button (`bg-gray-900 … rounded-full`, label ends with `→`).
- Entrance: `glp1FadeUp` keyframe, staggered delays (110/220/330ms), as Hero does.

### Steps — the sticky stack

Five step cards, ported from Freya's sticky-sibling interaction, restyled light:

- Each card is a sibling `<section>` with
  `position: sticky; top: calc(var(--header-height) + 16px)`. (Freya uses `-78px` under a
  non-sticky header; InstaRx's Header **is** fixed, so cards must pin *below* it.)
- Card: `bg-white` (opaque background is load-bearing for the stack to read as discrete
  cards), `rounded-3xl`, `ring-1 ring-gray-200`, generous padding.
- Wrapper has **no** `overflow`/`height` clipping (sticky siblings won't stack otherwise).
- Layout per card: two columns desktop (text left / image right), stacked mobile.
  - Number badge: `01`–`05` in a pill using `var(--glp1-hero-gradient)`, white text.
  - Category label: `LEARN` / `ASSESS` / `BEGIN` / `MAINTAIN` / `SUCCESS` (uppercase, tracked).
  - H2 (`font-[family-name:var(--font-inter)]`), paragraph, 3-item bullet list (checkmarks).
  - Image slot: `rounded-[20px]` `<Image>` — see Assets. Reveal via `data-reveal`.
- `prefers-reduced-motion`: sticky is fine to keep; reveal is already disabled centrally.

**Step content** (InstaRx-adapted, compounded-GLP-1 model):

| # | Label | Heading | Paragraph | Bullets |
|---|-------|---------|-----------|---------|
| 01 | LEARN | Take the quiz | Answer a few questions about your health, goals, and history — it takes just a few minutes. | Quick, confidential assessment · Questions about your health & goals · No commitment to start |
| 02 | ASSESS | Get reviewed by a licensed provider | A licensed U.S. provider reviews your intake and, if appropriate, prescribes a compounded GLP-1 plan tailored to you. | Independent medical review · Personalized treatment plan · Clear guidance on what's next |
| 03 | BEGIN | Start treatment, delivered to your door | If prescribed, your medication ships from a regulated compounding pharmacy — discreetly, in 1–2 days. | Fast, discreet delivery · Step-by-step dosing guidance · Support when you need it |
| 04 | MAINTAIN | Stay supported the whole way | Check in with your care team, adjust as needed, and build habits that make the results stick. | Ongoing provider access · Dose adjustments when appropriate · Progress you can track |
| 05 | SUCCESS | Reach your goals | Make steady, sustainable progress toward the weight and wellbeing goals you set. | Real, self-reported results · More energy & confidence · A plan built to last |

### Stats

3-stat band, `bg-[var(--glp1-feature-bg)]` or plain, `max-w-7xl` grid. **All numbers are
existing, already-live InstaRx self-reported claims** — no fabrication:

| Value | Label | Source |
|-------|-------|--------|
| **9 lbs** | Average weight loss in the first month | `modules/glp1/Hero.tsx:85` (live) |
| **up to 17%** | Average body-weight reduction with prescription GLP-1 | `glp2-v2` Results + FAQ (live) |
| **1–2 days** | Typical delivery once prescribed | `glp2-v2/content.ts:213` (live) |

Footnote under band: "*Individual results vary. Claims reflect self-reported data from
InstaRx customers." (matches existing Disclaimer language.)

### FAQ

Ported from `modules/glp1/FAQ.tsx` — same accordion mechanic (`Set<number>` multi-open,
`grid-template-rows: 0fr→1fr` transition, full ARIA). **Seeds with the 4 questions already
in that component** (legally-reviewed InstaRx copy): what compounded GLP-1s are, insurance
coverage, HSA/FSA, how to get started. Copy lives in `content.ts` so clones swap it freely.
Left column keeps the "Questions & Answers" heading + intro; right column is the accordion.

### CTA + Disclaimer

Reused verbatim from `modules/glp1/`. CTA links to `/intake` with `prefetch={false}`.

## Analytics / tracking

- **Add `"/glp1/how-it-works"` to `HOMEPAGE_LANDER_PATHS`** in
  `app/components/CtaClickTracker.tsx` so `/intake` CTA clicks fire the
  `homepage-cta-click` Convert goal (consistent with the other landers).
- **Do NOT add to `EMBEDDABLES_ROUTES`** — this is a real InstaRx page, so PostHog should
  fire (per CLAUDE.md, only Savvy/Embeddables pages are gated off).

## Metadata

```ts
export const metadata: Metadata = {
  title: "How It Works",   // root template appends " | InstaRx"
  description: "See how InstaRx GLP-1 treatment works — from quiz to licensed provider review to medication at your door — plus answers to the questions patients ask most.",
  openGraph: { title: "How GLP-1 Treatment Works", description: "…", url: "/glp1/how-it-works", siteName: "InstaRx", type: "website" },
};
```

## Assets needed from the user

Step image slots are wired to `/glp1/how-it-works/step-1.webp … step-5.webp`. Until real
assets exist, they fall back to existing `public/glp1/*.webp` files so nothing is broken.
A spec sheet (dimensions, aspect, subject, alt text) will be provided for the 5 finals.

**Deferred (need real data before shipping):** none. Stats use existing live claims; no new
copy requires Legal sign-off beyond what's already published.

## Explicitly out of scope

- Video testimonial carousel (needs real UGC video).
- Support cards / Trustpilot widget (Freya has them; not required for v1).
- Any shared cross-product component — the three GLP design systems differ in fonts, CSS,
  and motion, so cloning-per-product is the intended reuse model.

## Cloning to `/glp2` and `/glp2-v2` (future)

1. `cp -r modules/glp1/how-it-works modules/<product>/how-it-works`
2. Edit `content.ts` (copy stays product-appropriate).
3. Restyle: swap the blue tokens for that product's palette/fonts; for `/glp2-v2` scope
   under `.v2` and use its `V2Button`/`Reveal` primitives.
4. Add `app/(pages)/<product>/how-it-works/page.tsx`.
5. Add the new path to `HOMEPAGE_LANDER_PATHS`.
