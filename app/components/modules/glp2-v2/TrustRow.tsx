import type { ReactNode } from "react";

/* Shared trust row: five credibility points (icon + label) plus a Trustpilot-
 * style rating. Ported from the original /glp2 (home/TrustBadgesCarousel +
 * home/CTA) and re-skinned to the v2 editorial palette. Used at the foot of the
 * Results and Medications sections. */

type Badge = { icon: ReactNode; label: string };

const BADGES: Badge[] = [
  {
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
    label: "Certified U.S. pharmacy partners",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M18 14l1.5 1.5L22 13" />
      </>
    ),
    label: "Personalized treatments",
  },
  {
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="15" cy="8" r="3" />
        <path d="M2 20c0-3.5 3-6 7-6" />
        <path d="M22 20c0-3.5-3-6-7-6" />
        <path d="M9 14c0-3.5 6-3.5 6 0v6H9v-6z" />
      </>
    ),
    label: "Trusted by 10k+ Americans",
  },
  {
    icon: (
      <>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </>
    ),
    label: "1:1 medical support",
  },
];

function Star({ fill }: { fill: number }) {
  return (
    <span className="v2-trust-star" style={{ "--fill": `${fill * 100}%` } as React.CSSProperties}>
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </span>
  );
}

/* `showRating` (default true) appends the Trustpilot-style rating after the
   badge strip. Set it false to render just the four credibility points — used
   in Medications, which already closes with its own rating. */
export function TrustRow({ showRating = true }: { showRating?: boolean }) {
  return (
    <div className="v2-trust">
      <ul className="v2-trust__row">
        {BADGES.map((badge) => (
          <li key={badge.label} className="v2-trust__item">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {badge.icon}
            </svg>
            <span>{badge.label}</span>
          </li>
        ))}
      </ul>

      {showRating && (
        <div className="v2-trust__rating" role="img" aria-label="Rated Excellent, 4.7 out of 5 stars">
          <span className="v2-trust__score">Excellent 4.7</span>
          <span className="v2-trust__stars">
            <Star fill={1} />
            <Star fill={1} />
            <Star fill={1} />
            <Star fill={1} />
            <Star fill={0.7} />
          </span>
          <span className="v2-trust__count">10,000+ happy customers</span>
        </div>
      )}
    </div>
  );
}
