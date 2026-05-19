"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { ReactNode } from "react";

interface Badge {
  icon: ReactNode;
  label: string;
}

const badges: Badge[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Certified U.S. Pharmacy Partners",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M18 14l1.5 1.5L22 13" />
      </svg>
    ),
    label: "Personalized Treatments",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3" />
        <circle cx="15" cy="8" r="3" />
        <path d="M2 20c0-3.5 3-6 7-6" />
        <path d="M22 20c0-3.5-3-6-7-6" />
        <path d="M9 14c0-3.5 6-3.5 6 0v6H9v-6z" />
      </svg>
    ),
    label: "Trusted by 10k+ Americans",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    label: "1:1 Medical Support",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2.03z" />
      </svg>
    ),
    label: "American Customer Support",
  },
];

function BadgeItem({ badge }: { badge: Badge }) {
  return (
    <>
      <span className="text-gray-700">{badge.icon}</span>
      <span className="text-sm text-gray-700 font-medium leading-tight">{badge.label}</span>
    </>
  );
}

export function TrustBadgesCarousel() {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  return (
    <>
      {/* Mobile: infinite drag carousel */}
      <div className="block lg:hidden -mx-4">
        <div ref={emblaRef} className="overflow-hidden px-4">
          <div className="flex gap-8">
            {badges.map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 flex-none w-36">
                <BadgeItem badge={badge} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: static grid */}
      <div className="hidden lg:grid grid-cols-5 gap-8">
        {badges.map((badge, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <BadgeItem badge={badge} />
          </div>
        ))}
      </div>
    </>
  );
}
