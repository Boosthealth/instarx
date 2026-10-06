import localFont from "next/font/local";
import "./ed-treatment-v3.css";

/* Route-scoped layout: the .edv3 token scope, the self-hosted display serif
 * and TLS warm-up for the analytics origins AnalyticsScripts loads on every
 * page.
 *
 * Type: Source Serif 4 (variable, opsz + wght) is self-hosted with
 * next/font/local; a route-level next/font/google import fails intermittently
 * on Turbopack. The sans is the sitewide --font-figtree from the root layout. */
const sourceSerif = localFont({
  src: [
    { path: "./fonts/SourceSerif4-Variable.woff2", style: "normal" },
    { path: "./fonts/SourceSerif4-Variable-Italic.woff2", style: "italic" },
  ],
  weight: "200 900",
  display: "swap",
  variable: "--edv3-font-serif-face",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export default function EdTreatmentV3Layout({
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
      <div className={`edv3 ${sourceSerif.variable}`}>{children}</div>
    </>
  );
}
