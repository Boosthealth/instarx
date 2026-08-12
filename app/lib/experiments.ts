/**
 * Experiment registry — framework-agnostic constants shared by the server-side
 * Convert bucketing layer (app/lib/convert.ts) and the components that render
 * variations. Intentionally free of any SDK / next imports so it can be pulled
 * into either the server or the client graph without side effects.
 *
 * The string values here MUST match the experience key and variation keys
 * configured in the Convert dashboard for the corresponding experiment.
 */

/** Convert experience key for the /weight-loss hero A/B test. */
export const WEIGHT_LOSS_HERO_EXPERIENCE = "weight_loss_hero";

/** Variation keys for {@link WEIGHT_LOSS_HERO_EXPERIENCE}. */
export type WeightLossHeroVariant = "control" | "variation_1";

/**
 * Map a raw variation key returned by Convert (which may be null on a miss, or
 * an unexpected key) onto a known, renderable variant. Anything we don't
 * recognise falls back to the control experience so the page always renders.
 */
export function normalizeHeroVariant(
  variationKey: string | null | undefined,
): WeightLossHeroVariant {
  return variationKey === "variation_1" ? "variation_1" : "control";
}

/**
 * Convert experience key for the /intake GLP-1 funnel split. Unlike the hero
 * test (a content variation), this is a split-URL / redirect test: the proxy
 * buckets the visitor and 302-redirects each variation to a different intake
 * funnel. Bucketing therefore lives in proxy.ts, not the render path.
 *
 * v2 (2026-07-09): the original `glp_funnel_split` had collected >1k visitors,
 * so Convert had locked its allocation (only a fresh Draft has editable %).
 * Rather than clone (which re-mangles every key — see docs/ab-testing-convert.md),
 * we created a FRESH experience `glp_funnel_split_v2` and hand-keyed the SAME
 * clean variation keys, so this file's only change was this constant — the
 * destinations map below is byte-identical to v1. The v2 allocation drops the
 * `start.instarx.com` arm to 0% (worst funnel on CVR, AOV, and revenue/visitor
 * over 3 weeks) and runs quiz/intake 50/50.
 */
export const GLP_FUNNEL_SPLIT_EXPERIENCE = "glp_funnel_split_v2";

/**
 * Variation key → redirect destination for {@link GLP_FUNNEL_SPLIT_EXPERIENCE}.
 *
 * `control` is intentionally absent: it has no redirect (the visitor stays on
 * /intake) and is allocated 0% in the Convert dashboard. The keys here MUST
 * match the variation keys configured in Convert exactly.
 *
 * `variation_1` (start.instarx.com) is retained at 0% allocation in v2 (start
 * retired for underperformance) — kept in the map so the keys stay stable and
 * a re-add is a Convert-only allocation change. Convert never returns it at 0%.
 */
export const GLP_FUNNEL_SPLIT_DESTINATIONS: Record<string, string> = {
  variation_1: "https://start.instarx.com/", // start (Intake v3) — 0% in v2 (retired)
  variation_2: "https://quiz.instarx.com/", // quiz (Intake v2) — 50%
  variation_3: "https://intake.instarx.com/", // intake (Intake01 v2) — 50%
};

/**
 * Resolve a bucketed variation key to its redirect destination, or `null` to
 * keep the visitor on /intake. Returns `null` for `control`, a bucketing miss
 * (key is null/undefined), or any unrecognised key — all of which mean "don't
 * redirect", matching the control behaviour.
 */
export function funnelSplitDestination(
  variationKey: string | null | undefined,
): string | null {
  if (!variationKey) return null;
  return GLP_FUNNEL_SPLIT_DESTINATIONS[variationKey] ?? null;
}

/**
 * Homepage lander destination for NON-AFFILIATE traffic — the homepage lander
 * split's winner.
 *
 * The homepage lander split (v1–v4) concluded 2026-08-11 for Google/direct
 * traffic: PINK /glp2 won decisively on revenue per visitor (~5x Blue
 * /start-glp1 and Pink 3.0 /glp2-v2 on Google traffic, Jun 17–Aug 11;
 * consistent across every Google campaign with meaningful volume — see the
 * reporting.instarx.com traffic report). Google/direct/organic homepage visits
 * 302 straight here with no Convert call.
 *
 * Affiliate traffic is EXCLUDED from this conclusion: per-publisher data shows
 * no clear winner on alpha's volume publisher (8667) and Pink possibly LOSING
 * on 11553/14821 — so affiliate sources keep bucketing through the v4 Convert
 * experience below. See {@link AFFILIATE_LANDER_SPLIT_SOURCES}.
 */
export const HOMEPAGE_LANDER_DESTINATION = "https://go.instarx.com/glp2";

/**
 * utm_source values (lowercased) that KEEP the 3-lander homepage split.
 * Affiliate networks send traffic to the bare homepage with
 * `?utm_source=<network>&utm_campaign=<affid>&transaction_id=…` — their lander
 * performance differs from Google's, so they stay in the Convert experience.
 * Editing this list is the only change needed to move a network on/off the
 * split.
 */
export const AFFILIATE_LANDER_SPLIT_SOURCES = new Set([
  "alpha",
  "bandit",
  "willow",
  "fire",
  "mako",
]);

/**
 * Convert experience key for the homepage lander split — now serving
 * AFFILIATE homepage traffic only (see above). v4 experience (Convert
 * experience ID 1004202936, display name "homepage_lander_split_v4"), a clone
 * of v3 created to add the /glp2-v2 arm. The string below is the experience
 * *key*, auto-generated by Convert on the (third) clone; the SDK matches on it
 * verbatim. This experience must stay ACTIVE in Convert — pausing it would
 * leave affiliate homepage traffic unredirected on the bare homepage.
 */
export const HOMEPAGE_LANDER_SPLIT_EXPERIENCE = "hmpg-lndr-splt-cln-cln-clone";

/**
 * Variation key → redirect destination for {@link HOMEPAGE_LANDER_SPLIT_EXPERIENCE}.
 *
 * `control` (Original, 0%) is intentionally absent: it has no redirect (the
 * visitor stays on the homepage). The keys here MUST match the variation keys
 * configured in Convert exactly.
 *
 * ⚠️ Clone-mangled keys: each clone re-prefixes the variation keys with fresh
 * numeric ids and Convert does NOT let you edit them once the test is Active.
 * On this v4 clone the inherited arms are keyed "1004476830-variation-1"
 * (blue) / "1004476831-variation-2" (pink); the third arm was hand-keyed clean
 * as "variation-3" in the draft before activation. Verified against the live
 * Convert variation dialogs.
 */
export const HOMEPAGE_LANDER_SPLIT_DESTINATIONS: Record<string, string> = {
  "1004476830-variation-1": "https://go.instarx.com/start-glp1", // BLUE (Variation 1)
  "1004476831-variation-2": "https://go.instarx.com/glp2", // PINK (Variation 2)
  "variation-3": "https://go.instarx.com/glp2-v2", // PINK 3.0 (Variation 3)
};

/**
 * Resolve a bucketed variation key to its redirect destination, or `null` to
 * keep the visitor on the homepage. Returns `null` for `control`, a bucketing
 * miss (key is null/undefined), or any unrecognised key — all of which mean
 * "don't redirect", matching the control behaviour.
 */
export function homepageLanderDestination(
  variationKey: string | null | undefined,
): string | null {
  if (!variationKey) return null;
  return HOMEPAGE_LANDER_SPLIT_DESTINATIONS[variationKey] ?? null;
}

/**
 * Convert experience key for the affiliate funnel split. A split-URL / redirect
 * test: publishers send their traffic to ONE url (go.instarx.com/quiz) and the
 * proxy buckets each visitor and 302-redirects them to one of the three
 * affiliate intake funnels. Bucketing therefore lives in proxy.ts, not the
 * render path.
 *
 * Created FRESH in the Convert dashboard (never cloned), so the keys below are
 * clean. If this experiment ever needs a structural change, create another
 * fresh experience rather than cloning — clones mangle every key (see
 * docs/ab-testing-convert.md).
 */
export const AFFILIATE_FUNNEL_SPLIT_EXPERIENCE = "affiliate_funnel_split";

/**
 * Variation key → redirect destination for {@link AFFILIATE_FUNNEL_SPLIT_EXPERIENCE}.
 *
 * `control` is intentionally absent: it's allocated 0% in the Convert
 * dashboard, and unlike /intake this route has no page of its own — anything
 * that doesn't map to an arm goes to {@link AFFILIATE_FUNNEL_SPLIT_FALLBACK}.
 * The keys here MUST match the variation keys configured in Convert exactly.
 */
export const AFFILIATE_FUNNEL_SPLIT_DESTINATIONS: Record<string, string> = {
  variation_1: "https://begin.instarx.com/", // Intake01 v2 - Affiliates (33%)
  variation_2: "https://get.instarx.com/", // Intake v2 - Affiliates (33%)
  variation_3: "https://join.instarx.com/", // Intake v3 - Affiliates (34%)
};

/**
 * Where /quiz traffic goes when bucketing can't produce an arm: `control`, a
 * bucketing miss (SDK unreachable, experience paused, key mismatch), an
 * unrecognised key, or non-human traffic. There is no page at /quiz, so a
 * visitor must NEVER be left there — worst case everyone lands on this funnel
 * and the publisher's traffic still converts, just unsplit.
 */
export const AFFILIATE_FUNNEL_SPLIT_FALLBACK = "https://begin.instarx.com/";

/**
 * Resolve a bucketed variation key to its redirect destination. Unlike the
 * other splits this never returns null — a miss resolves to the fallback
 * funnel, because /quiz has no page to fall through to.
 */
export function affiliateFunnelSplitDestination(
  variationKey: string | null | undefined,
): string {
  if (!variationKey) return AFFILIATE_FUNNEL_SPLIT_FALLBACK;
  return (
    AFFILIATE_FUNNEL_SPLIT_DESTINATIONS[variationKey] ??
    AFFILIATE_FUNNEL_SPLIT_FALLBACK
  );
}
