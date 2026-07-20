---
target: /glp1/how-it-works
total_score: 29
p0_count: 1
p1_count: 3
timestamp: 2026-07-19T01-43-51Z
slug: app-pages-glp1-how-it-works-page-tsx
---
# Design Critique — /glp1/how-it-works (run 2)

## Design Health Score: 29/40 (Good — ships with fixes)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | No scroll/step progress on ~8000px narrative |
| 2 | Match System / Real World | 4 | Journey copy mirrors real patient flow |
| 3 | User Control and Freedom | 3 | Jump-to-answers good; no back-to-top |
| 4 | Consistency and Standards | 2 | Four sizes for one heading rank; .heading-section bypassed |
| 5 | Error Prevention | 3 | "No commitment", "if appropriate" |
| 6 | Recognition Rather Than Recall | 3 | Features repeats Steps layout |
| 7 | Flexibility and Efficiency | 2 | All 6 FAQs collapsed; safety answers need a click |
| 8 | Aesthetic and Minimalist | 2 | 7 near-identical alternating rows |
| 9 | Error Recovery | 3 | No dead ends |
| 10 | Help and Documentation | 4 | Strong for a regulated category |

## Anti-Patterns Verdict
LLM: not slop; "well-executed assembly rather than composed page". Tell = structural monotony (5 byte-identical Steps blocks, always exactly 3 bullets; Features reuses same grid/beige).
Detector clean (exit 0). tsc clean. eslint 1 cosmetic warning. Touch targets pass. All alt present. FAQ ARIA correct. 2px overflow = FALSE POSITIVE (maxScrollX 0, data-reveal translateX pre-visible state).

## Priority Issues (ALL ADDRESSED)
- [P0] Step 04 image /glp1/weight.webp = text-bearing UI asset cropped mid-word at object-cover. FIXED: repointed to image_2.webp (telehealth provider), semantically correct.
- [P1] Contrast failures (verified): white on #5f8dba badge 3.50:1; hero 14px eyebrow 3.50:1 over gradient light end; Results white/90 caption 2.72:1 over light photo. FIXED: badge/icons -> #3f6ea3 (5.29:1); hero scrim 0.34->0.50 (4.78:1); Results scrim 0.32->0.55 + full-opacity white (4.85:1).
- [P1] Heading scale unsystematic (4 sizes for one rank). FIXED: section headings text-3xl sm:text-4xl (Results/FAQ/Features/CTA); item headings text-2xl sm:text-3xl (Steps/Features cards).
- [P1] Features had NO h2 (h3 with no parent h2 = level skip) and reused Steps' grid. FIXED: added "Why patients choose InstaRx" h2 + intro; restructured to 2-up card grid distinct from Steps' alternating rows.
- [P2] Closing CTA under-delivered at peak-end. FIXED: added subcopy "A licensed U.S. provider reviews every assessment. No commitment to start."
- [P3] Stats <sup> broke baseline + forced "up to 17%" wrap at 768px. FIXED: align-top text-sm + whitespace-nowrap.

## Also fixed
Stale/incorrect comments (Steps soft-blue, Features #f5f0eb hex, Results competitor attribution); Steps image frame bg-white -> #eef3f8 matching Results/reference.

## Remaining / accepted
- Imagery still stand-in (3 photos reused) — known asset TODO.
- 01-05 badges + labels kept by explicit decision.
- Header marquee has no pause control (shared component, out of scope).
- FAQs all collapsed by default — candidate: open first item.
