// Route-scoped layout for /glp2-v3 only — ported unchanged from /glp2-v2.
// Warms up TLS connections to the (lazy-loaded) third-party analytics/
// marketing origins for THIS landing page, without forcing those preconnects
// onto every other route from the root layout.
export default function Glp2V3Layout({
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
      {children}
    </>
  );
}
