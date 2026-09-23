import { Archivo } from "next/font/google";
import "./ed-treatment-v2.css";

/* Provisional display face. Superpower.com sets NB International Pro, which
 * is not available; Archivo is the nearest open grotesk with a heavy 800.
 * Swap here only: the CSS reads --edv2-font-sans. */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--edv2-font-sans",
});

/* Route-scoped layout: the type variable, the .edv2 token scope, and TLS
 * warm-up for the analytics origins that load after idle on this lander. */
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
      <div className={`edv2 ${archivo.variable}`}>{children}</div>
    </>
  );
}
