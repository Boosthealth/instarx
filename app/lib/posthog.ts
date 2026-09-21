// PostHog project identity, shared by the client bootstrap snippet
// (app/components/AnalyticsScripts.tsx) and the server-side capture path
// (app/lib/analytics.ts) so a key rotation or region move is one edit, not two
// literals kept in sync by hand. Plain constants only — no "server-only" and no
// next/headers import — so the client component can pull them in too.
//
// The key is a public (phc_) project key, safe to embed in the browser bundle.
export const POSTHOG_KEY = "phc_5dyMpbsb6sk28QyTlgtcnXfR0PrpPBvgAZlRL6Syrmy";
export const POSTHOG_HOST = "https://us.i.posthog.com";
