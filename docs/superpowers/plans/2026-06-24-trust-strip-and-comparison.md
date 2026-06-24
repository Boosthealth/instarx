# Trust strip restyle + "vs. others" comparison section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the credibility strip in the Results section into a polished editorial panel, and replace the duplicate strip in Medications with a new light "What your plan includes — InstaRx vs. other providers" comparison section.

**Architecture:** Two independent visual workstreams on the `/glp2-v2` lander. (1) CSS-only restyle of the shared `.v2-trust*` styles. (2) A new static `PlanComparison` server component rendered after `<Medications />`, with co-located row data and a new `.v2-compare*` CSS namespace. No new dependencies, no state.

**Tech Stack:** Next.js (App Router) React server components, Tailwind utility classes on markup, scoped plain CSS in `app/(pages)/glp2-v2/glp2-v2.css` (everything namespaced under `.v2`), `next/font` (Fraunces + DM Sans), existing `V2Button` / `Reveal` primitives. Verification via Playwright headless screenshots against the running dev server on **port 5050**.

## Global Constraints

- All styles namespaced under `.v2`; new CSS goes in `app/(pages)/glp2-v2/glp2-v2.css` following its sectioned-comment convention.
- Reuse existing tokens/classes — do NOT introduce new color values. Palette tokens: `--v2-cream` `#fbf7f2`, `--v2-cream-2` `#f1e7da`, `--v2-blush` `#efe2d3`, `--v2-ink` `#1a1714`, `--v2-ink-soft` `#423b34`, `--v2-ink-mute` `#635a51`, `--v2-line` `#e7ddd2`, `--v2-line-strong` `#d8cabb`, `--v2-rose` (→ ink), `--v2-gradient`, `--v2-glass-divider`.
- Fonts via tokens only: `--v2-fh` (Fraunces, display), `--v2-fb` (DM Sans, body).
- No new factual/marketing claims beyond what the page already states. The "10,000+" figure must match the Hero/TrustRow count.
- The Header trust strip and Hero trust-bar (`.v2-trustbar*`) are OUT OF SCOPE — do not edit them.
- Intake CTA href is the exported `INTAKE_HREF` from `./content` (`https://go.instarx.com/intake`) — never hardcode it.
- Dev server already runs on `http://localhost:5050` (Next 16). Playwright is installed in the session scratchpad at `/private/tmp/claude-501/-Users-misha-Repositories-instarx/6601217d-0181-4013-a0e5-cf929ed6e2f1/scratchpad` (`node_modules/playwright`). Run screenshot scripts from there.

---

## File Structure

- `app/components/modules/glp2-v2/TrustRow.tsx` — **modify**: wrap the badge row in a panel element/class (markup only; `BADGES` data, `Star`, rating, and `showRating` prop unchanged).
- `app/(pages)/glp2-v2/glp2-v2.css` — **modify**: restyle `.v2-trust*` (panel + icon tiles + dividers); remove the now-unused `#medications .v2-trust` override; add a new `.v2-compare*` section block.
- `app/components/modules/glp2-v2/Medications.tsx` — **modify**: remove the `TrustRow` import + its `<Reveal><TrustRow showRating={false} /></Reveal>` usage.
- `app/components/modules/glp2-v2/PlanComparison.tsx` — **create**: new static section component + co-located `COMPARISON_ROWS`.
- `app/(pages)/glp2-v2/page.tsx` — **modify**: import and render `<PlanComparison />` between `<Medications />` and `<Community />`.

---

## Task 1: Restyle the Results trust strip into an editorial panel

**Files:**
- Modify: `app/components/modules/glp2-v2/TrustRow.tsx`
- Modify: `app/(pages)/glp2-v2/glp2-v2.css` (`.v2-trust*` block, lines ~1610–1690)

**Interfaces:**
- Consumes: nothing new.
- Produces: `.v2-trust__panel` (new class wrapping the badge row); `.v2-trust__icon` (new icon-tile span). `TrustRow`'s public API (`{ showRating?: boolean }`) is unchanged. Task 2 relies on `TrustRow` still rendering in Results exactly as before, only better-looking.

This is a CSS/markup restyle. There is no unit-test harness for these landers; the test cycle is a **headless screenshot diff**. Steps reflect that.

- [ ] **Step 1: Capture the BEFORE screenshot of the Results strip**

Create `scratchpad/trust-before.mjs` (in the scratchpad dir from Global Constraints) and run it:

```js
import { chromium } from 'playwright';
const out = process.cwd();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1400 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:5050/glp2-v2', { waitUntil: 'networkidle' });
// Results section has no id; the only .v2-trust on the page (before Task 2)
// other than Medications' is the Results one — grab the first.
const el = await page.$('.v2-trust');
await el.scrollIntoViewIfNeeded();
await el.screenshot({ path: `${out}/trust-before.png` });
await browser.close();
```

Run: `cd <scratchpad> && node trust-before.mjs`
Expected: writes `trust-before.png` showing the flat four-icon strip. Read it to confirm the current flat look.

- [ ] **Step 2: Wrap the badge row in a panel in `TrustRow.tsx`**

Add a `__panel` wrapper around the `<ul>` and give each icon a tile span. Replace the existing `return` body of `TrustRow` (lines 64–102) with:

```tsx
export function TrustRow({ showRating = true }: { showRating?: boolean }) {
  return (
    <div className="v2-trust">
      <div className="v2-trust__panel">
        <ul className="v2-trust__row">
          {BADGES.map((badge) => (
            <li key={badge.label} className="v2-trust__item">
              <span className="v2-trust__icon" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {badge.icon}
                </svg>
              </span>
              <span>{badge.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {showRating && (
        <div className="v2-trust__rating" role="img" aria-label="Rated Excellent, 4.7 out of 5 stars">
          <span className="v2-trust__score">Excellent 4.7</span>
          <span className="v2-trust__stars">
            <Star fill={1} />
            <Star fill={1} />
            <Star fill={1} />
            <Star fill={1} />
            <Star fill={0.7} />
          </span>
          <span className="v2-trust__count">10,000+ happy customers</span>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Replace the `.v2-trust*` CSS with the panel treatment**

In `glp2-v2.css`, replace the block from `.v2-trust {` through the end of `.v2-trust__item svg { ... }` (the rules at lines ~1610–1641, i.e. `.v2-trust`, the `#medications .v2-trust` override, `.v2-trust__row`, `.v2-trust__item`, `.v2-trust__item svg`) with:

```css
.v2-trust {
  margin-top: 2.5rem;
}
/* The four credibility points lifted into one soft editorial panel (echoes the
   hero trust-bar's structure — icon tiles + hairline dividers — without the
   frosted-glass-over-photo treatment, since there's no photo behind it here). */
.v2-trust__panel {
  border-radius: 18px;
  background: var(--v2-cream-2);
  border: 1px solid var(--v2-line);
  padding: 0.35rem 0.5rem;
}
.v2-trust__row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: stretch;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
}
.v2-trust__item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem 1.15rem;
  position: relative;
  font-family: var(--v2-fb);
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--v2-ink);
}
/* Hairline divider on the left edge of every item except the first. */
.v2-trust__item + .v2-trust__item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.85rem;
  bottom: 0.85rem;
  width: 1px;
  background: var(--v2-line);
}
.v2-trust__icon {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--v2-cream);
  color: var(--v2-ink);
}
/* Responsive: 4 cols -> 2 cols (drop the inter-column divider on the new
   first-of-row), then -> stacked single column on the smallest phones. */
@media (max-width: 860px) {
  .v2-trust__row {
    grid-template-columns: repeat(2, 1fr);
  }
  .v2-trust__item:nth-child(odd)::before {
    display: none;
  }
}
@media (max-width: 480px) {
  .v2-trust__row {
    grid-template-columns: 1fr;
  }
  .v2-trust__item::before {
    display: none;
  }
}
```

Note: `.v2-trust__rating`, `.v2-trust__score`, `.v2-trust__count`, `.v2-trust__stars`, `.v2-trust-star` rules that follow are UNCHANGED — leave them exactly as-is.

- [ ] **Step 4: Capture the AFTER screenshots (desktop + mobile)**

Create `scratchpad/trust-after.mjs`:

```js
import { chromium } from 'playwright';
const out = process.cwd();
const browser = await chromium.launch();
for (const w of [1280, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: 1600 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5050/glp2-v2', { waitUntil: 'networkidle' });
  const el = await page.$('.v2-trust');
  await el.scrollIntoViewIfNeeded();
  const ov = await page.$$eval('.v2-trust__row', els => els.map(e => e.scrollWidth > e.clientWidth + 1));
  console.log(`w=${w} overflow=`, JSON.stringify(ov));
  await el.screenshot({ path: `${out}/trust-after-${w}.png` });
}
await browser.close();
```

Run: `cd <scratchpad> && node trust-after.mjs`
Expected: console prints `overflow= [false]` (or `[false,false]` if two `.v2-trust` exist) for BOTH widths. Read `trust-after-1280.png` and `trust-after-390.png`; confirm the four points sit inside one rounded panel with icon tiles + hairline dividers (desktop) and collapse to 2-up / stacked without overflow (mobile).

- [ ] **Step 5: Commit**

```bash
git add app/components/modules/glp2-v2/TrustRow.tsx "app/(pages)/glp2-v2/glp2-v2.css"
git commit -m "style(glp2-v2): lift the trust strip into an editorial panel

Wrap the four credibility points in a soft rounded cream-2 panel with
rounded icon tiles and hairline dividers (echoing the hero trust-bar's
structure), so the strip reads as a deliberate unit instead of flat
floating icons. CSS-only + a panel wrapper; badge data and rating
unchanged. Drops the now-unused #medications .v2-trust override.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Remove the duplicate strip from Medications

**Files:**
- Modify: `app/components/modules/glp2-v2/Medications.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: Medications no longer renders `TrustRow`. Its closing rating (`.v2-medcta`) must still render. Task 4 will fill the vacated "vs. competitors" beat with a dedicated section after Medications.

- [ ] **Step 1: Remove the `TrustRow` import**

In `Medications.tsx`, delete line 4:

```tsx
import { TrustRow } from "./TrustRow";
```

- [ ] **Step 2: Remove the `TrustRow` usage block**

Delete the credibility-strip block (lines ~90–94):

```tsx
        {/* Credibility strip — four trust points (shared TrustRow, no rating
            here since the rating closes the section just below). */}
        <Reveal>
          <TrustRow showRating={false} />
        </Reveal>
```

Leave the `{/* Rating closes the section */}` `<Reveal className="v2-medcta">` block that follows fully intact.

- [ ] **Step 3: Verify Medications still renders with its rating, no strip**

Create `scratchpad/meds-check.mjs`:

```js
import { chromium } from 'playwright';
const out = process.cwd();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 2000 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:5050/glp2-v2', { waitUntil: 'networkidle' });
const sec = await page.$('#medications');
await sec.scrollIntoViewIfNeeded();
const stripInMeds = await page.$('#medications .v2-trust');
const ratingInMeds = await page.$('#medications .v2-medcta');
console.log('strip-in-medications:', !!stripInMeds, ' rating-in-medications:', !!ratingInMeds);
await sec.screenshot({ path: `${out}/meds-after.png` });
await browser.close();
```

Run: `cd <scratchpad> && node meds-check.mjs`
Expected: console prints `strip-in-medications: false  rating-in-medications: true`. Read `meds-after.png` to confirm the section ends cleanly on its rating line.

- [ ] **Step 4: Commit**

```bash
git add app/components/modules/glp2-v2/Medications.tsx
git commit -m "refactor(glp2-v2): drop the duplicate trust strip from Medications

The strip stays (restyled) in Results; Medications' credibility beat is
replaced by the dedicated vs.-competitors comparison section landing
immediately after it.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Build the `PlanComparison` component

**Files:**
- Create: `app/components/modules/glp2-v2/PlanComparison.tsx`
- Modify: `app/(pages)/glp2-v2/glp2-v2.css` (append a new `.v2-compare*` block)

**Interfaces:**
- Consumes: `INTAKE_HREF` from `./content`; `V2Button` from `./ui`; `Reveal` from `./Reveal`.
- Produces: named export `PlanComparison` (`() => JSX.Element`), a server component. Task 4 imports and renders it.

- [ ] **Step 1: Create `PlanComparison.tsx` with co-located rows + markup**

```tsx
import Image from "next/image";
import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

/* "What your personalized plan includes" — a light editorial comparison
 * (yourEra-style) that lands right after Medications: feature statements down
 * the left, an InstaRx accent card holding every "Included" check in the
 * centre, and a recessed "Other providers" column on the right so InstaRx wins
 * the eye. Replaces the old duplicate trust strip in Medications. Every claim
 * reuses facts already stated elsewhere on the page — no new claims. */
const COMPARISON_ROWS = [
  {
    feature: "Same flat price at every dose — no memberships or contracts.",
    competitor: "Prices climb as your dose goes up · surprise fees.",
  },
  {
    feature: "Free 1–2 day shipping, cold-chain packed.",
    competitor: "Speed and cost vary · you wait.",
  },
  {
    feature: "A real U.S.-licensed provider, 1:1 — not a chatbot.",
    competitor: "Limited hours or automated replies.",
  },
  {
    feature: "Compounded by certified U.S. pharmacies.",
    competitor: "Pharmacy sourcing is opaque or unverified.",
  },
  {
    feature: "Ongoing care that stays with you past month one.",
    competitor: "Short-term, meds-only — then you're on your own.",
  },
] as const;

export function PlanComparison() {
  return (
    <section className="v2-section v2-bg-cream">
      <div className="v2-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="v2-eyebrow v2-kicker-rule mb-4 inline-flex">
            The InstaRx difference
          </p>
          <h2 className="v2-h2 mb-10">
            What your personalized plan{" "}
            <span className="v2-accent">includes</span>
          </h2>
        </Reveal>

        <Reveal className="v2-compare">
          {/* Column headers — empty over the feature rail, brand over the
              InstaRx card, muted over competitors. */}
          <div className="v2-compare__head" aria-hidden="true">
            <span />
            <span className="v2-compare__brand">
              <Image
                src="/logos/instarx-logo.png"
                alt="InstaRx"
                width={104}
                height={26}
                className="h-5 w-auto"
              />
            </span>
            <span className="v2-compare__vs">Other providers</span>
          </div>

          <ul className="v2-compare__rows">
            {COMPARISON_ROWS.map((row) => (
              <li key={row.feature} className="v2-compare__row">
                <span className="v2-compare__feature">{row.feature}</span>
                <span className="v2-compare__cell v2-compare__cell--us">
                  <span className="v2-compare__check" aria-hidden="true">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  Included
                </span>
                <span className="v2-compare__cell v2-compare__cell--them">
                  <span className="v2-compare__x" aria-hidden="true">
                    <X size={14} strokeWidth={2.5} />
                  </span>
                  {row.competitor}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="v2-compare__cta">
          <p className="v2-compare__join">
            Join 10,000+ Americans losing weight with InstaRx
          </p>
          <V2Button href={INTAKE_HREF} variant="primary" className="v2-btn--lg" arrow>
            Find your treatment
          </V2Button>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append the `.v2-compare*` CSS block to `glp2-v2.css`**

Add at the END of `glp2-v2.css`:

```css
/* ---- Plan comparison (InstaRx vs. other providers) ----
   Light editorial 3-column comparison (yourEra-style): feature rail (left),
   an InstaRx accent card spanning all rows (centre) where every row reads
   "Included", and a recessed muted competitors column (right). The centre
   column gets a continuous tinted card via a pseudo-element so the per-row
   grid still aligns the three cells on one baseline. */
.v2-compare {
  position: relative;
  max-width: 64rem;
  margin-inline: auto;
}
.v2-compare__head,
.v2-compare__row {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr 1.1fr;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.75rem);
}
.v2-compare__head {
  padding: 0 clamp(1rem, 2vw, 1.75rem) 0.85rem;
}
.v2-compare__brand {
  display: inline-flex;
  justify-content: center;
}
.v2-compare__vs {
  text-align: center;
  font-family: var(--v2-fb);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--v2-ink-mute);
}
.v2-compare__rows {
  list-style: none;
  margin: 0;
  padding: 0;
  /* The continuous InstaRx card behind the centre column. */
  position: relative;
}
.v2-compare__rows::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  /* Aligns to the centre grid track: left rail is 1.4fr of (1.4+0.9+1.1=3.4)
     plus one gap. Use a percentage band that sits under the "Included" cells. */
  left: 41.2%;
  width: 26.5%;
  border-radius: 16px;
  background: var(--v2-blush);
  border: 1px solid var(--v2-line);
}
.v2-compare__row {
  position: relative;
  padding: clamp(0.9rem, 1.8vw, 1.25rem) clamp(1rem, 2vw, 1.75rem);
}
.v2-compare__row + .v2-compare__row::before {
  content: "";
  position: absolute;
  left: clamp(1rem, 2vw, 1.75rem);
  right: clamp(1rem, 2vw, 1.75rem);
  top: 0;
  height: 1px;
  background: var(--v2-line);
}
.v2-compare__feature {
  font-family: var(--v2-fb);
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--v2-ink);
}
.v2-compare__cell {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--v2-fb);
  font-size: 0.9rem;
  line-height: 1.35;
}
.v2-compare__cell--us {
  justify-content: center;
  font-weight: 700;
  color: var(--v2-ink);
}
.v2-compare__cell--them {
  color: var(--v2-ink-mute);
}
.v2-compare__check,
.v2-compare__x {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
}
.v2-compare__check {
  background: var(--v2-ink);
  color: var(--v2-cream);
}
.v2-compare__x {
  border: 1px solid var(--v2-line-strong);
  color: var(--v2-ink-mute);
}
.v2-compare__cta {
  margin-top: clamp(2rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
}
.v2-compare__join {
  font-family: var(--v2-fh);
  font-size: clamp(1.35rem, 3vw, 1.9rem);
  line-height: 1.2;
  color: var(--v2-ink);
}
/* Mobile: drop the 3-col table + centre card. Each row stacks: feature, then a
   "✓ InstaRx Included" line and a "✗ competitor" line beneath it. */
@media (max-width: 760px) {
  .v2-compare__head {
    display: none;
  }
  .v2-compare__rows::before {
    display: none;
  }
  .v2-compare__row {
    grid-template-columns: 1fr;
    gap: 0.55rem;
    padding: 1.15rem clamp(0.75rem, 4vw, 1.25rem);
  }
  .v2-compare__feature {
    font-size: 1rem;
    font-weight: 600;
  }
  .v2-compare__cell {
    justify-content: flex-start;
  }
  .v2-compare__cell--us {
    /* Re-tint the check inline (no centre card on mobile). */
    align-self: start;
  }
}
```

- [ ] **Step 3: Confirm the component compiles (typecheck the new file)**

Run: `cd /Users/misha/Repositories/instarx && npx tsc --noEmit -p tsconfig.json 2>&1 | grep -i "PlanComparison" || echo "no PlanComparison type errors"`
Expected: prints `no PlanComparison type errors`. (Lucide `Check`/`X` and the imports resolve; if tsc surfaces unrelated pre-existing errors elsewhere, ignore them — only PlanComparison must be clean.)

- [ ] **Step 4: Commit**

```bash
git add app/components/modules/glp2-v2/PlanComparison.tsx "app/(pages)/glp2-v2/glp2-v2.css"
git commit -m "feat(glp2-v2): add InstaRx vs. competitors plan-comparison section

New light editorial comparison (yourEra-style): feature rail, an InstaRx
accent card of 'Included' checks, and a recessed competitors column, with
a 'Join 10,000+' close + CTA. Co-located row data; new .v2-compare* CSS.
Not yet wired into the page (next task).

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Wire `PlanComparison` into the page + final verification

**Files:**
- Modify: `app/(pages)/glp2-v2/page.tsx`

**Interfaces:**
- Consumes: `PlanComparison` from `./PlanComparison` (Task 3).
- Produces: the section rendered live between Medications and Community.

- [ ] **Step 1: Import `PlanComparison`**

In `page.tsx`, add after the `Community` import (line 16):

```tsx
import { PlanComparison } from "@/app/components/modules/glp2-v2/PlanComparison";
```

- [ ] **Step 2: Render it after `<Medications />`**

In the `<main>` body, insert `<PlanComparison />` between `<Medications />` and `<Community />`:

```tsx
        <Medications />
        <PlanComparison />
        <Community />
```

- [ ] **Step 3: Verify the full section renders in order, desktop + mobile, no overflow**

Create `scratchpad/compare-check.mjs`:

```js
import { chromium } from 'playwright';
const out = process.cwd();
const browser = await chromium.launch();
for (const w of [1280, 390, 320]) {
  const page = await browser.newPage({ viewport: { width: w, height: 2200 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5050/glp2-v2', { waitUntil: 'networkidle' });
  const sec = await page.$('.v2-compare');
  await sec.scrollIntoViewIfNeeded();
  const rows = await page.$$eval('.v2-compare__row', els => els.length);
  const join = await page.$eval('.v2-compare__join', el => el.textContent.trim());
  const docOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  // order: medications section must come before the compare section in the DOM
  const order = await page.evaluate(() => {
    const m = document.querySelector('#medications');
    const c = document.querySelector('.v2-compare');
    return !!(m && c && (m.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING));
  });
  console.log(`w=${w} rows=${rows} join="${join}" pageOverflow=${docOverflow} medsBeforeCompare=${order}`);
  await sec.screenshot({ path: `${out}/compare-${w}.png` });
}
await browser.close();
```

Run: `cd <scratchpad> && node compare-check.mjs`
Expected per line: `rows=5`, `join="Join 10,000+ Americans losing weight with InstaRx"`, `pageOverflow=false`, `medsBeforeCompare=true` at all three widths. Read `compare-1280.png` (InstaRx column visually "wins" — accent card of checks; competitors recessed/muted), `compare-390.png` and `compare-320.png` (rows stacked cleanly, no horizontal scroll).

- [ ] **Step 4: Verify the centre card band aligns under the "Included" cells (desktop)**

Read `compare-1280.png` closely: the tinted InstaRx card (`.v2-compare__rows::before`) must sit centred behind the column of "✓ Included" cells, not bleeding into the feature text or the competitors text. If it's misaligned, adjust the `left`/`width` percentages on `.v2-compare__rows::before` (currently `left: 41.2%; width: 26.5%`) to match the `1.4fr 0.9fr 1.1fr` track and re-run Step 3's script. Re-read until aligned.

- [ ] **Step 5: Commit**

```bash
git add "app/(pages)/glp2-v2/page.tsx"
git commit -m "feat(glp2-v2): render the plan-comparison section after Medications

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Workstream 1 (restyle strip in Results, CSS-scoped, data unchanged, drop `#medications .v2-trust`) → Task 1. ✓
- Remove Medications strip → Task 2. ✓
- New `PlanComparison.tsx` after `<Medications />`, light/yourEra style, 3 zones, 5 locked rows, co-located data, close line + CTA, reuse tokens/`Reveal`/`V2Button`, `.v2-compare*` namespace, mobile stacked collapse → Tasks 3–4. ✓
- Out of scope (Header strip, Hero trust-bar, badge labels, no new claims) honored — no task touches `.v2-trustbar*`, `.v2-header*`, or `BADGES`. ✓
- Verification via Playwright at desktop + 390/320 mobile → Steps in Tasks 1–4. ✓

**Placeholder scan:** No TBD/TODO; every code step shows full code; every command shows expected output. The one tunable (centre-card band %) has an explicit measure-and-adjust loop (Task 4 Step 4), not a vague "adjust as needed."

**Type/name consistency:** `PlanComparison` named export matches Task 4 import. `COMPARISON_ROWS` shape `{ feature, competitor }` matches the markup map. Classes introduced in Task 3 CSS (`v2-compare`, `__head`, `__brand`, `__vs`, `__rows`, `__row`, `__feature`, `__cell`/`--us`/`--them`, `__check`, `__x`, `__cta`, `__join`) all match the JSX. `v2-trust__panel`/`v2-trust__icon` introduced in Task 1 markup match its CSS. `INTAKE_HREF`, `V2Button`, `Reveal`, `v2-btn--lg`, `v2-accent`, `v2-eyebrow`, `v2-kicker-rule`, `v2-section`, `v2-bg-cream`, `v2-h2` are all pre-existing in the codebase.
