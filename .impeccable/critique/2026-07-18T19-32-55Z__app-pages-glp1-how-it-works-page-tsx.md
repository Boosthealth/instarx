---
target: /glp1/how-it-works
total_score: 32
p0_count: 1
p1_count: 2
timestamp: 2026-07-18T19-32-55Z
slug: app-pages-glp1-how-it-works-page-tsx
---
# Design Critique — /glp1/how-it-works

## Design Health Score: ~32/40 (Good)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | FAQ accordion animates; no scroll/step cue on ~9000px page |
| 2 | Match System / Real World | 4 | Journey maps real patient flow; plain language |
| 3 | User Control and Freedom | 3 | Only one destination; no path for not-ready user |
| 4 | Consistency and Standards | 2 | One destination, three button names; radius/shadow/cream drift |
| 5 | Error Prevention | n/a | No forms |
| 6 | Recognition Rather Than Recall | 3 | 01-05 + LABEL taxonomy the copy already conveys |
| 7 | Flexibility and Efficiency | 2 | No anchor nav / jump-to-FAQ on a reference page |
| 8 | Aesthetic and Minimalist | 3 | 7 near-identical alternating rows (Steps+Features) |
| 9 | Error Recovery | n/a | No error states |
| 10 | Help and Documentation | 3 | FAQ 4 items, 3 about payment, 0 safety |

## Anti-Patterns Verdict
LLM: Borderline "competent template." Structural tells: 01-05 badge + ALL-CAPS label on every step; 7 identical alternating rows; uniform radii; recycled imagery (3 photos ~11 jobs). Absent: gradient text, side-stripes, icon-card grid.
Detector: clean (exit 0, []). tsc clean. eslint 1 cosmetic warning. a11y fundamentals pass (1 h1, no skips, all alt present, correct accordion ARIA, 44px+ targets, CLS-safe).
Verified contrast fail: #5f8dba step labels 3.28:1 on #f4f8fc (needs 4.5). gray-500 footnote 4.45:1 borderline.

## Priority Issues
- [P0] Recycled stand-in imagery (3 photos ~11x), semantically mismatched (32.4lbs scale under "Maintain"; same couple = quiz + message provider; vial blobs collide with Results scrim). Trust-critical page. Fix: uniqueness + semantic fit as acceptance criterion.
- [P1] #5f8dba step labels fail contrast 3.28:1 on soft-blue bg. Fix: darken to ~#3f6ea3 or drop labels.
- [P1] Mobile hero "Your GLP-1journey" collapsed space at 390px (nbsp hyphen packs tight). Fix: guarantee real space before "journey".
- [P2] One destination, three button names (Weight Loss / Start your assessment / Find your treatment). Fix: one primary verb hero+CTA.
- [P3] No in-page nav + thin mis-ordered FAQ (4 items, 3 payment, 0 safety) on a reference page. Fix: jump-to-FAQ link, lead FAQ with safety, differentiate Features layout.

## Persona Red Flags
Jordan (first-timer): recycled photos erode credibility; FAQ answers insurance before safety; 3 button labels create hesitation.
Sam (a11y, health): header auto-scroll marquee no pause control (reduced-motion/vestibular); #5f8dba labels fail contrast. Positives: accordion ARIA, mobile focus trap.
Casey (mobile): GLP-1journey bug; marquee clips at edge; no jump nav on long scroll.

## Minor Observations
- Cream token drift: Features #f5f0eb vs --glp1-feature-bg #f7f5f5.
- Stats footnote floats untethered from the claim it qualifies.
- Results tablet (768) orphans 3rd card; use grid-cols-1 -> lg:grid-cols-3.
- Disclaimer "Insta RX" vs "InstaRx".

## Questions to Consider
1. Delete 01-05 badges + labels — worse, or quieter/more premium?
2. Email reference destination, yet FAQ is last and 3/4 about payment — funnel or reassure?
3. Safety is the deciding emotion but lives only in 12px disclaimer — why least-designed?
