# Hoist GTM into `<head>` to shrink the Convert redirect flash

**Date:** 2026-05-22
**Status:** Approved for implementation

## Problem

Visitors landing on `/` (the blue homepage) see a 2–4 second flash of that page
before Convert.com redirects ~90% of them to `/weight-loss`. Facebook paid ads
point at `/`, so this flash hits paid traffic hardest.

Cause: GTM is loaded via Next's `<Script strategy="afterInteractive">` as the
first child of `<body>` in `AnalyticsScripts.tsx`. `afterInteractive` defers the
script until after hydration. The load chain is therefore:

```
HTML paints (blue homepage) -> page hydrates -> GTM loads -> GTM loads Convert
  -> Convert decides -> redirect
```

Convert.com is not loaded by application code. It runs inside the GTM container
`GTM-NPDBMQX2`. There is no Convert `<script>` tag in this repository to move.
The lever we control is *when GTM starts*.

## Goal

Start GTM — and therefore Convert — as early as possible in page load so Convert
can run its redirect decision before (or with minimal) paint of the homepage.

## Non-goals

- Do NOT add a direct Convert script tag. Convert must continue to load only via
  GTM, exactly once, so the two live A/B experiments are not disturbed.
- Do NOT change PostHog's load strategy.
- Do NOT change any experiment configuration. This change affects load *timing*
  only.

## Approach

The earliest a script can execute is a plain synchronous `<script>` in `<head>`,
parsed before `<body>`. The Next.js App Router allows raw `<head>` markup in a
layout. We therefore move GTM out of `<body>`/`afterInteractive` and into
`<head>` of `app/layout.tsx`.

### 1. Render GTM synchronously in `<head>` of `app/layout.tsx`

Add a `<head>` element to `RootLayout` containing two inline `<script>` tags,
written as plain JSX `<script dangerouslySetInnerHTML={{ __html: ... }} />`
(NOT `next/script` — `next/script` cannot render a truly synchronous in-head
tag). Order in `<head>`:

1. **Convert Anti-Flicker snippet** (client-supplied). Hides the page until
   Convert resolves or its internal timeout fires, eliminating the visible
   flash. This snippet is account-specific and comes from the Convert
   dashboard. Implementation ships a clearly-labeled placeholder; the client
   pastes the real snippet.
2. **GTM loader snippet** — the same loader currently in `AnalyticsScripts.tsx`,
   inlined. GTM's own injected script remains internally `async` (that is GTM's
   loader and is unavoidable and acceptable); the win is that it now *starts*
   during head parsing instead of after hydration.

### 2. Preserve the embeddables route skip

Today `AnalyticsScripts.tsx` skips GTM entirely on embeddables routes
(`/intake`, `/intake01`, `/glp1-weight-loss`) because the Savvy/Embeddables flow
ships its own GTM/analytics and double-loading collides.

Because `<head>` is server-rendered for every route, the skip must be a runtime
check inside the inline scripts. Both the Anti-Flicker snippet and the GTM
loader are wrapped:

```js
if (!["/intake", "/intake01", "/glp1-weight-loss"].includes(location.pathname)) {
  /* snippet body */
}
```

The exclusion list must stay in sync with `EMBEDDABLES_ROUTES` in
`AnalyticsScripts.tsx` and with the pages rendering `<EmbeddablesScript />`.

### 3. Trim `AnalyticsScripts.tsx` to PostHog only

- Remove the GTM `<Script>` and the GTM `<noscript>` iframe from
  `AnalyticsScripts.tsx`.
- PostHog stays in `AnalyticsScripts.tsx` with `strategy="afterInteractive"`
  and keeps the existing embeddables skip.
- The GTM `<noscript>` iframe moves to the top of `<body>` in `app/layout.tsx`.

`<html>`, `<body>`, and the `figtree` font className on `<html>` are unchanged.
Only a `<head>` element is added.

## Files affected

| File | Change |
|---|---|
| `app/layout.tsx` | Add `<head>` with Anti-Flicker placeholder + inline GTM loader (both route-guarded); add GTM `<noscript>` at top of `<body>`. |
| `app/components/AnalyticsScripts.tsx` | Remove GTM `<Script>` and GTM `<noscript>`; keep PostHog and the embeddables skip. |

## Risks and notes

- **No duplicate Convert.** Convert still loads once, via GTM. The live
  experiments see only a timing change, not a config or instance change.
- **Anti-Flicker snippet is client-supplied.** It cannot be generated here; it
  is account-specific. Ships as a labeled placeholder. If the real snippet is
  not available at implementation time, the GTM hoist alone still reduces the
  flash, just less than with Anti-Flicker present.
- **PostHog `$exception` "Aborting execution." errors on `/`.** These are thrown
  by Convert's own script as its normal redirect mechanism aborts page
  execution. Loading Convert earlier is expected to reduce or eliminate them
  because the abort happens before more page JS runs. No separate fix; verified
  on the preview.

## Verification (Vercel preview deploy)

Push to a branch, deploy a Vercel preview, and confirm on the preview URL before
any merge to `main`:

1. `/` still redirects ~90% of visitors to `/weight-loss`, faster, with a
   smaller or no flash.
2. `/weight-loss` -> `/intake` vs `/intake01` funnel split (the other Convert
   experiment) still works.
3. UTMs and `fbclid` pass through the redirect cleanly.
4. `/intake` and `/intake01` do NOT load GTM (embeddables skip still holds).
5. PostHog `$exception` count on `/` drops.

No commit to `main` until the client signs off on the preview.
