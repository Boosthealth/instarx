import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://go.instarx.com"),
  title: {
    default: "InstaRx",
    template: "%s | InstaRx",
  },
  description:
    "InstaRx offers accessible, affordable weight loss treatments including GLP-1 medications. Start your personalized weight loss journey today.",
  openGraph: {
    type: "website",
    siteName: "InstaRx",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
