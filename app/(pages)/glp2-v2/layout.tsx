// Route-scoped layout for /glp2-v2 only. Its sole job is to warm up TLS
// connections to the (lazy-loaded) third-party analytics/marketing origins for
// THIS landing page, without forcing those preconnects onto every other route
// from the root layout. Next hoists bare <link rel="preconnect"> elements into
// <head>, so they don't need to live in a literal <head> tag.
export default function Glp2V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* When the lazy analytics fire after page-idle, the TLS handshake is
          already done — saves ~400ms of connection setup (Lighthouse flagged). */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://connect.facebook.net" />
      <link rel="preconnect" href="https://us-assets.i.posthog.com" />
      <link rel="preconnect" href="https://us.i.posthog.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      {children}
    </>
  );
}
