"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  GTM_ID,
  GTM_SNIPPET,
  POSTHOG_LIGHTWEIGHT_SNIPPET,
  POSTHOG_SNIPPET,
} from "@/app/lib/analytics";

// Pages that embed Savvy/Embeddables flows. The third-party flow owns PostHog
// on these routes, so we keep OUR PostHog off them to avoid collisions/
// double-firing. GTM, however, loads everywhere (the GTM container itself
// manages the marketing scripts and tag de-duping), so it is NOT gated here.
// Must stay in sync with the pages that render <EmbeddablesScript />.
const EMBEDDABLES_ROUTES = new Set([
  "/",
  "/glp1",
  "/intake",
  "/intake01",
  "/nad",
  "/nad_plus_intake",
  "/nad-quiz",
  "/glp1-weight-loss",
  "/quiz02",
]);

export default function AnalyticsScripts() {
  const pathname = usePathname();

  // PostHog is skipped on embeddables pages (their flow handles it); GTM loads
  // on every page.
  const skipPostHog = pathname !== null && EMBEDDABLES_ROUTES.has(pathname);

  // Defer analytics to page-idle on the heavy editorial landers (glp2-v2,
  // nad-plus, glp1/how-it-works) ONLY, so the ~900KB of marketing/analytics JS
  // doesn't compete with their hero LCP + interactivity. Every other route keeps
  // the original `afterInteractive` timing untouched.
  const LAZY_ANALYTICS_ROUTES = new Set([
    "/glp2-v2",
    "/glp2-v3",
    "/nad-plus",
    "/glp1/how-it-works",
    "/glp-fourth-month-free",
  ]);
  const analyticsStrategy =
    pathname !== null && LAZY_ANALYTICS_ROUTES.has(pathname)
      ? "lazyOnload"
      : "afterInteractive";
  const lightweightPostHog = pathname === "/glp-fourth-month-free";

  return (
    <>
      {/* Google Tag Manager. On glp2-v2 it's lazyOnload (loads after page-idle);
          elsewhere afterInteractive. The gtm.start timestamp is captured inline
          either way, so timing attribution is preserved and pageview/conversion
          tags still fire. */}
      <Script id="gtm" strategy={analyticsStrategy}>
        {GTM_SNIPPET}
      </Script>
      {/* End Google Tag Manager */}

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}

      {/* PostHog — skipped on embeddables pages (their flow handles it) */}
      {!skipPostHog && (
        <Script id="posthog" strategy={analyticsStrategy}>
          {lightweightPostHog ? POSTHOG_LIGHTWEIGHT_SNIPPET : POSTHOG_SNIPPET}
        </Script>
      )}
      {/* End PostHog */}
    </>
  );
}
