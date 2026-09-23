import "./ed-treatment-v2.css";

/* Route-scoped layout: the .edv2 token scope and TLS warm-up for the
 * analytics origins (GTM, Meta, PostHog) that AnalyticsScripts loads on every
 * page. Adding this route to LAZY_ANALYTICS_ROUTES there is a separate change.
 *
 * Type: the page reads --edv2-font-sans, which the stylesheet maps to the
 * sitewide --font-figtree set on <html> by the root layout. A route-level
 * next/font/google import (Archivo) was dropped after a Vercel build failed
 * on Turbopack's Google Fonts fetch; the house face is already cached and
 * loaded on every page, so this also removes a second font download. */
export default function EdTreatmentV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://connect.facebook.net" />
      <link rel="preconnect" href="https://us-assets.i.posthog.com" />
      <link rel="preconnect" href="https://us.i.posthog.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <div className="edv2">{children}</div>
    </>
  );
}
