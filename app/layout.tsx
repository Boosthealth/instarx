import type { Metadata } from "next";
import AnalyticsScripts from "./components/AnalyticsScripts";
import CtaClickTracker from "./components/CtaClickTracker";
import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_KEYS,
  ATTRIBUTION_KEY_PREFIXES,
} from "./lib/attribution";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";

// Persists marketing attribution (utm_*, gclid, ad_id, …) from the entry URL
// into the `ix_attribution` cookie. Inlined and pre-hydration ON PURPOSE: the
// previous useEffect version only ran after the React bundle hydrated, so a
// CTA click that beat hydration (slow mobile webviews) reached /intake with no
// cookie and the funnel lost all attribution. A parser-executed script at the
// top of <body> runs before any CTA is clickable. proxy.ts also sets the same
// cookie server-side on proxied routes; this covers direct lander entries.
// Key filtering must stay in lockstep with proxy.ts — both sides read the
// shared lists in app/lib/attribution.ts. ES5-only: it must run in the oldest
// in-app webviews, which are exactly where the hydration race bit.
const attributionScript = `(function () {
  try {
    var keys = ${JSON.stringify(ATTRIBUTION_KEYS)};
    var prefixes = ${JSON.stringify(ATTRIBUTION_KEY_PREFIXES)};
    var search = new URLSearchParams(window.location.search);
    var captured = new URLSearchParams();
    var any = false;
    search.forEach(function (value, key) {
      if (!value) return;
      var keep = keys.indexOf(key) !== -1;
      if (!keep) {
        for (var i = 0; i < prefixes.length; i++) {
          if (key.lastIndexOf(prefixes[i], 0) === 0) { keep = true; break; }
        }
      }
      if (keep) { captured.set(key, value); any = true; }
    });
    if (!any) return;
    var domain = /(^|\\.)instarx\\.com$/.test(window.location.hostname) ? "; domain=.instarx.com" : "";
    var secure = window.location.protocol === "https:" ? "; secure" : "";
    document.cookie = "${ATTRIBUTION_COOKIE}=" + captured.toString() + "; path=/" + domain + "; max-age=31536000; samesite=lax" + secure;
  } catch (e) {}
})();`;

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-figtree",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://go.instarx.com"),
  title: {
    default: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
    template: "%s | InstaRx",
  },
  description:
    "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
  icons: {
    icon: [
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
    description:
      "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
    siteName: "InstaRx",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
    description:
      "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${inter.variable} ${figtree.className}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: attributionScript }} />
        <AnalyticsScripts />
        <CtaClickTracker />
        {children}
      </body>
    </html>
  );
}
