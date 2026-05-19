# Pages, Embedded Solution & Analytics Map

Reference for which pages exist, which embed the third-party (Savvy/Embeddables)
flow, and which analytics each page loads.

**Branch:** `main`
**Last updated:** 2026-05-19

## How analytics is wired

`<AnalyticsScripts />` is mounted once in the root layout
([app/layout.tsx](../app/layout.tsx)). It self-guards via `usePathname()`:
on the routes in its `EMBEDDABLES_ROUTES` set it renders `null`, so those
pages load **no** first-party analytics. The third-party embeddables flow on
those pages ships its own GTM/analytics — loading ours too would double-fire
and collide, which is the bug this setup fixes.

| Analytics | ID / Host |
| --- | --- |
| Google Tag Manager | `GTM-NPDBMQX2` |
| PostHog key | `phc_5dyMpbsb6sk28QyTlgtcnXfR0PrpPBvgAZlRL6Syrmy` |
| PostHog host | `https://us.i.posthog.com` |

Source of truth: [app/components/AnalyticsScripts.tsx](../app/components/AnalyticsScripts.tsx)

> **Maintenance coupling:** `EMBEDDABLES_ROUTES` is a hardcoded list that must
> stay in sync with the pages that render `<EmbeddablesScript />`. If you add a
> new embeddables landing page, add its path to that set or it will
> double-fire analytics. (Conversely, if a page stops embedding the flow,
> remove it or it ships with no analytics.)
>
> **Home/marketing split:** `/` is the Savvy embeddables flow
> (`flow_a22jeg0agf2ch469bbf95406`) and is intentionally **excluded** from
> first-party analytics. The marketing site (Hero/Results/Testimonials/…)
> lives at `/weight-loss` and **does** get GTM + PostHog.

## Page map

Legend: ✅ = yes / loaded · ❌ = no / not loaded

| Route | Embedded solution (`EmbeddablesScript`) | GTM | PostHog |
| --- | :---: | :---: | :---: |
| `/` | ✅ | ❌ | ❌ |
| `/contact-us` | ❌ | ✅ | ✅ |
| `/glp1-info` | ❌ | ✅ | ✅ |
| `/glp1-new` | ❌ | ✅ | ✅ |
| `/glp1-weight-loss` | ✅ | ❌ | ❌ |
| `/intake` | ✅ | ❌ | ❌ |
| `/intake01` | ✅ | ❌ | ❌ |
| `/policies/privacy-policy` | ❌ | ✅ | ✅ |
| `/policies/refund-policy` | ❌ | ✅ | ✅ |
| `/policies/safety` | ❌ | ✅ | ✅ |
| `/policies/telehealth-consent` | ❌ | ✅ | ✅ |
| `/policies/terms-and-conditions` | ❌ | ✅ | ✅ |
| `/policies/third-party-partners` | ❌ | ✅ | ✅ |
| `/safety/b12-mic-injections` | ❌ | ✅ | ✅ |
| `/safety/compounded-semaglutide` | ❌ | ✅ | ✅ |
| `/safety/compounded-tirzepatide` | ❌ | ✅ | ✅ |
| `/safety/nad-plus` | ❌ | ✅ | ✅ |
| `/safety/sildenafil` | ❌ | ✅ | ✅ |
| `/safety/tadalafil` | ❌ | ✅ | ✅ |
| `/weight-loss` | ❌ | ✅ | ✅ |

## Summary

- **20** total routes.
- **4** embed the third-party flow and run **no** first-party analytics:
  `/`, `/glp1-weight-loss`, `/intake`, `/intake01`.
- **16** are first-party pages running **GTM + PostHog**.
- `/` is the Savvy embeddables flow (`flow_a22jeg0agf2ch469bbf95406`),
  intentionally excluded from first-party analytics (the flow ships its own).
- `/weight-loss` holds the marketing site that previously lived at `/`
  (Hero/Results/Testimonials/etc.) and receives GTM + PostHog.
- `/glp1` was removed; it now returns 404.
