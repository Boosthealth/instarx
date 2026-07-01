# /optin 18+ Age Gate — Design

**Date:** 2026-07-01
**Author:** Claude (autonomous — user requested async work, unavailable for interactive approval)
**Scope:** Block `/optin` form submission when the customer is under 18, based on the existing Birthday field.

## Problem

`go.instarx.com/optin` collects a Birthday (`MM/DD/YYYY`) but currently only validates the string *format*. It does not compute age or prevent an under-18 visitor from submitting. InstaRx sells prescription products; submissions must be limited to adults (18+), consistent with the TCPA checkbox affirmation ("I am 18+") already on the form.

## Goal

On submit, reject the form when the entered birthday indicates the person is under 18, with clear, specific, respectful messaging. Purely client-side (the form is client-only; `OPTIN_POST_URL` is currently empty). No visual redesign.

## Non-goals

- Server-side enforcement (no endpoint is wired yet; see "Future work").
- Changing the birthday field UI, other fields, or consent copy.
- Storing/transmitting a computed age (we already send the raw `birthday` string in the payload).

## Approach

Reintroduce the previously-reviewed, verified date helpers (they were removed in an earlier iteration when age validation was explicitly not wanted; it is now required) and gate submission on them.

### Helpers

- `parseBirthday(value): Date | null` — matches `MM/DD/YYYY`, builds a **local-time** `Date` from explicit parts, and round-trips `getFullYear/getMonth/getDate` back to reject impossible dates (02/30, 13/01) and the 2-digit-year footgun (`new Date(50, …)` → 1950).
- `ageInYears(birth, now): number` — whole years, decrementing if this year's birthday hasn't occurred yet. Both dates are local-time, so no UTC off-by-one.

### Validation order (in `handleSubmit`, after the existing format check)

1. Format check (existing): `^\d{2}/\d{2}/\d{4}$` → "Please enter your birthday as MM/DD/YYYY."
2. Real-date + plausibility: `parseBirthday` returns null, OR age < 0 (future date), OR age > 120 → **"Please enter a valid birthday."**
3. Age gate: age < 18 → **"You must be 18 years old to continue."**

### Boundary behavior (best practices)

- **Exactly 18 today** (18th birthday is today) → allowed (`age >= 18`).
- **Future date** / **age > 120** → treated as an *invalid entry*, not "under 18", so the message is accurate and non-accusatory.
- Age computed against `new Date()` at submit time, local timezone — consistent with how a US-facing form is used.

## Error copy

| Case | Message |
|------|---------|
| Malformed | Please enter your birthday as MM/DD/YYYY. |
| Impossible / future / absurd | Please enter a valid birthday. |
| Under 18 | You must be 18 years old to continue. |

Rationale: the under-18 message is direct and matches the site's plain, reassuring tone; it states the requirement without judgment and mirrors the existing "I am 18+" affirmation.

## Testing / verification

- `tsc --noEmit`, `eslint`, `next build` must pass; `/optin` prerenders static.
- Manual reasoning matrix: valid adult, exactly-18-today, one-day-before-18th-birthday (blocked), 17y, leap-day 02/29 adult, 02/30 (invalid), 13/01 (invalid), future date (invalid), 2-digit year (invalid).

## Future work (out of scope, flagged)

Client-side gating is trivially bypassable. When `OPTIN_POST_URL` is wired to a real endpoint, the 18+ check MUST be re-validated server-side, since this gate has a compliance purpose.
