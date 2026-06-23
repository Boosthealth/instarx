import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import OptinForm from "./OptinForm";
import "./optin.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Get Text Updates",
  description:
    "Sign up for InstaRx text updates — shipping alerts, dose reminders, and exclusive savings sent right to your phone by your care team.",
  // Standalone SMS opt-in lander: no index in search, it's a direct-link page.
  robots: { index: false, follow: false },
};

export default function OptinPage() {
  return (
    <div className={`${fraunces.variable} ${dmSans.variable}`}>
      <OptinForm />
    </div>
  );
}
