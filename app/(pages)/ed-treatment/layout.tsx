// Route-scoped layout for /ed-treatment only. Warms TLS to the lazy-loaded
// analytics/marketing origins for this lander without forcing the preconnects
// onto every route from the root layout (same pattern as /nad-plus).
export default function EdTreatmentLayout({
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
