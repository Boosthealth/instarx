import type { ReactNode } from "react";

/* Bespoke duotone glyphs for this page. One grid (32 units), one stroke
 * (1.75 at 28px), round caps and joins, ink outline, and exactly one shape
 * per glyph filled with --edv2-glyph-fill so the pair reads as a set.
 * Each is drawn for its concept: the timer's filled wedge is a quarter hour,
 * the clock's filled band is most of the dial. */
export type GlyphName =
  | "pill"
  | "timer"
  | "clock"
  | "utensils"
  | "brain"
  | "stethoscope"
  | "receipt"
  | "package"
  | "clipboard";

const GLYPHS: Record<GlyphName, ReactNode> = {
  // Capsule on a diagonal, one half filled.
  pill: (
    <g transform="rotate(-40 16 16)">
      <path className="edv2-glyph__fill" d="M16 11.5H9.5a4.5 4.5 0 0 0 0 9H16z" />
      <rect x="5" y="11.5" width="22" height="9" rx="4.5" />
      <path d="M16 11.5v9" />
    </g>
  ),
  // Stopwatch with the first quarter hour filled.
  timer: (
    <>
      <path className="edv2-glyph__fill" d="M16 18V9a9 9 0 0 1 9 9z" />
      <circle cx="16" cy="18" r="9" />
      <path d="M13 4.5h6M16 4.5V9M24 10l1.5-1.5" />
    </>
  ),
  // Dial with a filled band from twelve round to nine.
  clock: (
    <>
      <path
        className="edv2-glyph__fill"
        d="M16 5a11 11 0 1 1-11 11h4a7 7 0 1 0 7-7z"
      />
      <circle cx="16" cy="16" r="11" />
      <path d="M16 16v-3.5M16 16l2.5 1.5" />
    </>
  ),
  // Fork and a knife with a filled blade.
  utensils: (
    <>
      <path className="edv2-glyph__fill" d="M21 5c3.5 2 4 7 4 11h-4z" />
      <path d="M8 5v6a3 3 0 0 0 6 0V5M11 5v22M21 5v22" />
    </>
  ),
  // Two hemispheres, the right one filled.
  brain: (
    <>
      <path
        className="edv2-glyph__fill"
        d="M16 7c4-2 8 0 8 4 2.5 1 2.5 6 0 7 0 4-3.5 7-8 5.5z"
      />
      <path d="M16 7c-4-2-8 0-8 4-2.5 1-2.5 6 0 7 0 4 3.5 7 8 5.5V7" />
      <path d="M11 12c2 0 2 3 0 3M21 12c-2 0-2 3 0 3" />
    </>
  ),
  // Binaurals into a tube, filled chest piece.
  stethoscope: (
    <>
      <path d="M7.5 5h3M17.5 5h3M9 5v6a5 5 0 0 0 10 0V5M14 16v4a5 5 0 0 0 10 0v-2.5" />
      <circle className="edv2-glyph__fill" cx="24" cy="14.5" r="3" />
    </>
  ),
  // Torn-edge receipt, filled total line.
  receipt: (
    <>
      <path d="M8 4h16v24l-2.67-2-2.66 2L16 26l-2.67 2-2.66-2L8 28z" />
      <path d="M12 10h8M12 14h8" />
      <rect className="edv2-glyph__fill" x="12" y="18.5" width="8" height="3.5" rx="1" />
    </>
  ),
  // Plain box, filled lid.
  package: (
    <>
      <path className="edv2-glyph__fill" d="M16 4l11 5.5L16 15 5 9.5z" />
      <path d="M16 4l11 5.5v13L16 28 5 22.5v-13zM5 9.5L16 15l11-5.5M16 15v13" />
    </>
  ),
  // Clipboard, filled clip, check.
  clipboard: (
    <>
      <rect x="7" y="6" width="18" height="22" rx="3" />
      <rect className="edv2-glyph__fill" x="12" y="3.5" width="8" height="5" rx="1.5" />
      <path d="M11.5 17.5l3 3 6-6.5" />
    </>
  ),
};

export function Glyph({
  name,
  className = "",
}: {
  name: GlyphName;
  className?: string;
}) {
  return (
    <svg
      className={`edv2-glyph ${className}`.trim()}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}
