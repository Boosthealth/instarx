// Route-scoped layout for /partner only. Its sole job is to warm up TLS
// connections to the (lazy-loaded) third-party analytics origins for this
// landing page, without forcing those preconnects onto every other route.
// Next hoists bare <link rel="preconnect"> elements into <head>.
export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://us-assets.i.posthog.com" />
      <link rel="preconnect" href="https://us.i.posthog.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      {children}
    </>
  );
}
