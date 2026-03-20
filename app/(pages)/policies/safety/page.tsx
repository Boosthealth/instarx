import type { Metadata } from "next";
import Link from "next/link";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Safety",
  description: "Safety information for InstaRx products including Semaglutide, Tirzepatide, NAD+, and more.",
};

const safetyLinks = [
  { label: "Compounded Semaglutide", href: "/safety/compounded-semaglutide" },
  { label: "Compounded Tirzepatide", href: "/safety/compounded-tirzepatide" },
  { label: "B12/MIC Injections", href: "/safety/b12-mic-injections" },
  {
    label: "Sermorelin",
    href: "https://www.drugs.com/cons/sermorelin.html#side-effects",
    external: true,
  },
  { label: "NAD+", href: "/safety/nad-plus" },
  { label: "Sildenafil", href: "/safety/sildenafil" },
  { label: "Tadalafil", href: "/safety/tadalafil" },
];

export default function SafetyIndexPage() {
  return (
    <PolicyLayout>
      <h1 className="text-3xl font-bold mb-4">Safety</h1>
      <p className="text-gray-600 mb-8">
        Select a product below to view important safety information, potential side effects, and usage guidelines.
      </p>
      <ul className="space-y-3">
        {safetyLinks.map((link) =>
          link.external ? (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
              >
                {link.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <Link href={link.href} className="text-blue-600 hover:underline font-medium">
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </PolicyLayout>
  );
}
