# GLP-2 Hero Layout Variants (D & C2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two landing pages, `/glp2-da` (mockup variant D) and `/glp2-c2` (mockup variant C2), identical to `/glp2` except for a mobile-only restructured Hero.

**Architecture:** Add a `layout?: "default" | "d" | "c2"` prop to the existing shared `Hero` component (default `"default"`, so all current callers are unchanged). Mobile-only differences are expressed with responsive Tailwind utilities gated at the `sm` breakpoint, keeping the desktop two-column markup shared and identical. Two new route files reuse the `glp2/page.tsx` body, changing only the Hero `layout` prop and page-level metadata / `PageViewedEvent` name.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.

## Global Constraints

- Changes are **mobile-only** (below the Tailwind `sm` breakpoint, 640px). Desktop (`sm:` and up) must render identically to current `/glp2`.
- `Hero` is imported by `glp2`, `weight-loss`, `start-glp1`, `glp1-new`. The new `layout` prop MUST default to `"default"` so none of these change.
- Variant CTA on mobile: a single full-width dark button, text exactly `Find your treatment →`, href `https://go.instarx.com/intake`.
- No Convert wiring. No changes to `/glp2` or to any non-Hero section.
- This project has no test runner configured (no test script in `package.json`). "Tests" in this plan are **manual browser/visual verification** plus `npm run lint`. There is no unit-test framework to add for a JSX-layout change — do not introduce one.
- Dev server runs on port 5050 (`npm run dev`).

---

### Task 1: Add `layout` prop and shared mobile-CTA logic to `Hero`

Add the `layout` prop and the conditional mobile rendering for variants D and C2 inside the existing left-text block of `Hero`. Desktop markup is shared and unchanged.

**Files:**
- Modify: `app/components/modules/home/Hero.tsx`

**Interfaces:**
- Consumes: existing `HERO_CONTENT`, `TrustpilotStars`, `checkItems`, `Button`, `WeightLossHeroVariant` type — all already in the file.
- Produces: `Hero` now accepts `layout?: "default" | "d" | "c2"` (default `"default"`) in addition to the existing `variant` prop. New pages consume this.

- [ ] **Step 1: Update the component signature to accept `layout`**

Replace the current signature (lines ~69-74):

```tsx
export default function Hero({
  variant = "control",
}: {
  variant?: WeightLossHeroVariant;
}) {
  const content = HERO_CONTENT[variant];
```

with:

```tsx
export default function Hero({
  variant = "control",
  layout = "default",
}: {
  variant?: WeightLossHeroVariant;
  layout?: "default" | "d" | "c2";
}) {
  const content = HERO_CONTENT[variant];
  const isVariant = layout !== "default";
```

- [ ] **Step 2: Center the stars for C2 only**

The stars row is rendered by `TrustpilotStars`, whose root `<div>` uses `flex flex-wrap items-center gap-x-2 gap-y-1 mb-4`. To allow centering on mobile for C2 without affecting other callers, make `TrustpilotStars` accept an optional className.

Change the `TrustpilotStars` definition (around line 46) from:

```tsx
function TrustpilotStars() {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
```

to:

```tsx
function TrustpilotStars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 mb-4 ${className}`}>
```

Then update its call site inside `Hero` from `<TrustpilotStars />` to:

```tsx
<TrustpilotStars className={layout === "c2" ? "justify-center sm:justify-start" : ""} />
```

(Variant D keeps stars left-aligned, so only C2 centers them. `sm:justify-start` restores the desktop default.)

- [ ] **Step 3: Center the headline on mobile for both variants**

The `<h1>` currently is:

```tsx
<h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4">
  {content.headline}
</h1>
```

Add `text-center sm:text-left` only when a variant is active:

```tsx
<h1
  className={`text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4${
    isVariant ? " text-center sm:text-left" : ""
  }`}
>
  {content.headline}
</h1>
```

- [ ] **Step 4: Conditionally render the lede (17%) line — removed for C2, centered for D**

The lede paragraph is:

```tsx
<p className="mb-4 max-w-md">
  Lose up to 17%* of your body weight with prescription GLP‑1.
</p>
```

Replace with a conditional. C2 removes it entirely; D centers it on mobile; default unchanged:

```tsx
{layout !== "c2" && (
  <p className={`mb-4 max-w-md${isVariant ? " text-center sm:text-left mx-auto sm:mx-0" : ""}`}>
    Lose up to 17%* of your body weight with prescription GLP‑1.
  </p>
)}
```

- [ ] **Step 5: Render the price paragraph per layout**

The current price paragraph is:

```tsx
<p className="mb-5 sm:mb-6">
  Starting at{" "}
  <span className="text-2xl font-bold sm:text-3xl">$148</span>
  {" "}— Doctor-prescribed GLP‑1, delivered in 1-2 days.{" "}
  <span className="font-semibold">No insurance needed. No hidden fees. No clinic visits.</span>
</p>
```

Replace it with a conditional block. For `default` keep verbatim. For `d`, center on mobile but keep the guarantees inline. For `c2`, center on mobile and break the three guarantees onto their own centered lines:

```tsx
{layout === "c2" ? (
  <p className="mb-5 sm:mb-6 text-center sm:text-left">
    Starting at{" "}
    <span className="text-2xl font-bold sm:text-3xl">$148</span>
    {" "}— Doctor-prescribed GLP‑1, delivered in 1-2 days.{" "}
    <span className="font-semibold">
      <span className="block sm:inline">No insurance needed.</span>{" "}
      <span className="block sm:inline">No clinic visits.</span>{" "}
      <span className="block sm:inline">No hidden fees.</span>
    </span>
  </p>
) : (
  <p className={`mb-5 sm:mb-6${layout === "d" ? " text-center sm:text-left" : ""}`}>
    Starting at{" "}
    <span className="text-2xl font-bold sm:text-3xl">$148</span>
    {" "}— Doctor-prescribed GLP‑1, delivered in 1-2 days.{" "}
    <span className="font-semibold">No insurance needed. No hidden fees. No clinic visits.</span>
  </p>
)}
```

(`block sm:inline` keeps the desktop sentence inline and unchanged; on mobile each guarantee is its own centered line because the parent `<p>` is `text-center`.)

- [ ] **Step 6: Move the CTA + fine print above the bullets for variants**

Today the order in the text block is: bullets → CTA row → fine print. For variants, the CTA and fine print must appear **here** (right after the price paragraph, before the bullets), with a single mobile button.

Immediately after the price-paragraph block from Step 5, insert the variant-only CTA + fine print:

```tsx
{isVariant && (
  <div className="mb-6 sm:hidden">
    <Button
      href="https://go.instarx.com/intake"
      text="Find your treatment →"
      className="w-full"
    />
    <p className="mt-4 text-center text-sm text-gray-700">
      Zero Hidden Fees &nbsp;·&nbsp; Zero Monthly Membership &nbsp;·&nbsp; Cancel Anytime
    </p>
  </div>
)}
```

This block is `sm:hidden`, so it only exists on mobile and never touches desktop.

- [ ] **Step 7: Hide the original CTA row + fine print on mobile for variants**

The original CTA row and fine print (after the bullets) must stay for `default` and for **desktop** of variants, but be hidden on **mobile** for variants (the Step 6 block replaces them there).

Wrap the existing CTA `<div>` and the fine-print `<p>` so they hide on mobile only when a variant is active. Change:

```tsx
<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:justify-start">
  <Button href="https://go.instarx.com/intake" text={content.primaryCta} className="w-full sm:w-auto" />
  <Button href="https://go.instarx.com/intake" text="See pricing" color="light" className="w-full sm:w-auto" />
</div>
<p className="text-center text-sm text-gray-700 sm:text-left">
  Zero Hidden Fees &nbsp;·&nbsp; Zero Monthly Membership &nbsp;·&nbsp; Cancel Anytime
</p>
```

to:

```tsx
<div
  className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:justify-start${
    isVariant ? " hidden sm:flex" : ""
  }`}
>
  <Button href="https://go.instarx.com/intake" text={content.primaryCta} className="w-full sm:w-auto" />
  <Button href="https://go.instarx.com/intake" text="See pricing" color="light" className="w-full sm:w-auto" />
</div>
<p
  className={`text-center text-sm text-gray-700 sm:text-left${
    isVariant ? " hidden sm:block" : ""
  }`}
>
  Zero Hidden Fees &nbsp;·&nbsp; Zero Monthly Membership &nbsp;·&nbsp; Cancel Anytime
</p>
```

Note: the bullets `<ul>` is intentionally left unchanged (left-aligned for all layouts, per the mockups). Because of Step 6/7, on mobile the variant order becomes: stars → headline → (lede for D) → price → CTA+fine print → bullets → image. Desktop order is unchanged for every layout.

- [ ] **Step 8: Run lint**

Run: `npm run lint`
Expected: passes with no new errors in `Hero.tsx`.

- [ ] **Step 9: Commit**

```bash
git add app/components/modules/home/Hero.tsx
git commit -m "feat: add mobile layout variants (d, c2) to Hero"
```

---

### Task 2: Create `/glp2-da` page (variant D)

**Files:**
- Create: `app/(pages)/glp2-da/page.tsx`

**Interfaces:**
- Consumes: `Hero` with `layout="d"` (from Task 1), plus the same section components `/glp2` uses.
- Produces: route `/glp2-da`.

- [ ] **Step 1: Create the page file**

Create `app/(pages)/glp2-da/page.tsx` with the same structure as `glp2/page.tsx`, passing `layout="d"` and a distinct `PageViewedEvent` name:

```tsx
import type { Metadata } from "next";
import Header from "@/app/components/modules/home/Header";
import Hero from "@/app/components/modules/home/Hero";
import Results from "@/app/components/modules/home/Results";
import { VideoTestimonials } from "@/app/components/modules/home/VideoTestimonials";
import { HowItWorks } from "@/app/components/modules/home/HowItWorks";
import { Reviews } from "@/app/components/modules/home/Reviews";
import { Medications } from "@/app/components/modules/home/Medications";
import { FAQ } from "@/app/components/modules/home/FAQ";
import { FinalCTA } from "@/app/components/modules/home/FinalCTA";
import { Footer } from "@/app/components/Footer";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";

export const metadata: Metadata = {
  title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
  description:
    "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
  openGraph: {
    title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
    description:
      "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
    url: "/glp2-da",
  },
};

export default function Glp2Da() {
  return (
    <>
      <AnchorScrollFix />
      <PageViewedEvent pageName="glp2-da" />
      <Header />
      <main>
        <Hero layout="d" />
        <Results />
        <VideoTestimonials />
        <HowItWorks />
        <Reviews />
        <Medications />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify the route compiles**

Run: `npm run dev` (if not already running), then load `http://localhost:5050/glp2-da`.
Expected: page renders, no console/build errors.

- [ ] **Step 3: Commit**

```bash
git add "app/(pages)/glp2-da/page.tsx"
git commit -m "feat: add /glp2-da landing page (hero variant d)"
```

---

### Task 3: Create `/glp2-c2` page (variant C2)

**Files:**
- Create: `app/(pages)/glp2-c2/page.tsx`

**Interfaces:**
- Consumes: `Hero` with `layout="c2"` (from Task 1).
- Produces: route `/glp2-c2`.

- [ ] **Step 1: Create the page file**

Create `app/(pages)/glp2-c2/page.tsx` identical to the Task 2 file except `layout="c2"`, `pageName="glp2-c2"`, `url: "/glp2-c2"`, and component name `Glp2C2`:

```tsx
import type { Metadata } from "next";
import Header from "@/app/components/modules/home/Header";
import Hero from "@/app/components/modules/home/Hero";
import Results from "@/app/components/modules/home/Results";
import { VideoTestimonials } from "@/app/components/modules/home/VideoTestimonials";
import { HowItWorks } from "@/app/components/modules/home/HowItWorks";
import { Reviews } from "@/app/components/modules/home/Reviews";
import { Medications } from "@/app/components/modules/home/Medications";
import { FAQ } from "@/app/components/modules/home/FAQ";
import { FinalCTA } from "@/app/components/modules/home/FinalCTA";
import { Footer } from "@/app/components/Footer";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";

export const metadata: Metadata = {
  title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
  description:
    "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
  openGraph: {
    title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
    description:
      "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
    url: "/glp2-c2",
  },
};

export default function Glp2C2() {
  return (
    <>
      <AnchorScrollFix />
      <PageViewedEvent pageName="glp2-c2" />
      <Header />
      <main>
        <Hero layout="c2" />
        <Results />
        <VideoTestimonials />
        <HowItWorks />
        <Reviews />
        <Medications />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify the route compiles**

Run: load `http://localhost:5050/glp2-c2`.
Expected: page renders, no errors.

- [ ] **Step 3: Commit**

```bash
git add "app/(pages)/glp2-c2/page.tsx"
git commit -m "feat: add /glp2-c2 landing page (hero variant c2)"
```

---

### Task 4: Visual verification against mockups

**Files:** none (verification only).

- [ ] **Step 1: Ensure dev server is running**

Run: `npm run dev`
Expected: ready on `http://localhost:5050`.

- [ ] **Step 2: Verify `/glp2` is unchanged on mobile**

Open `http://localhost:5050/glp2` at 390px width. Confirm the hero is exactly as before: left-aligned headline, 17% lede, price paragraph with inline guarantees, bullets, then two buttons ("Start Quiz →" + "See pricing"), then fine print.

- [ ] **Step 3: Verify `/glp2-da` (variant D) on mobile (390px)**

Confirm order: stars (left) → headline (centered) → 17% lede (centered) → price paragraph (centered) → single "Find your treatment →" full-width button → fine print (centered) → bullets (left-aligned) → image. Compare to mockup column D in `ab-testing/image (146).png`.

- [ ] **Step 4: Verify `/glp2-c2` (variant C2) on mobile (390px)**

Confirm order: stars (centered) → headline (centered) → price paragraph (centered) with "No insurance needed. / No clinic visits. / No hidden fees." on separate centered lines and **no** 17% lede → single "Find your treatment →" full-width button → fine print (centered) → bullets (left-aligned) → image. Compare to mockup column C2.

- [ ] **Step 5: Verify desktop is identical for all three**

At ≥1024px width, load `/glp2`, `/glp2-da`, `/glp2-c2`. Confirm all three render the identical two-column hero (left text with two buttons, right image). No centering, no single-button, no removed lede on desktop.

- [ ] **Step 6: Final lint**

Run: `npm run lint`
Expected: passes.

---

## Notes on correctness

- The `sm:hidden` mobile CTA (Task 1 Step 6) and the `hidden sm:flex` / `hidden sm:block` desktop CTA (Step 7) are mutually exclusive at every breakpoint, so exactly one CTA set shows — no duplicate buttons.
- Bullets are never reordered in the DOM; CTA repositioning is achieved by rendering the mobile CTA earlier in the flow and hiding the later one on mobile. This keeps a single bullets list (DRY) and avoids duplicate hidden bullet markup.
