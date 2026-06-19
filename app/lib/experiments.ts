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
 */
export const GLP_FUNNEL_SPLIT_EXPERIENCE = "glp_funnel_split";

/**
 * Variation key → redirect destination for {@link GLP_FUNNEL_SPLIT_EXPERIENCE}.
 *
 * `control` is intentionally absent: it has no redirect (the visitor stays on
 * /intake) and is allocated 0% in the Convert dashboard. The keys here MUST
 * match the variation keys configured in Convert exactly.
 */
export const GLP_FUNNEL_SPLIT_DESTINATIONS: Record<string, string> = {
  variation_1: "https://start.instarx.com/",
  variation_2: "https://quiz.instarx.com/",
  variation_3: "https://intake.instarx.com/",
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
 * Convert experience key for the homepage lander split. Like the GLP funnel
 * split, this is a split-URL / redirect test: the proxy buckets the visitor at
 * the homepage and 302-redirects each variation to a different GLP-1 lander.
 * Bucketing therefore lives in proxy.ts, not the render path.
 *
 * NB: this is the v2 experience (Convert experience ID 1004202320, display name
 * "homepage_lander_split_v2") — a clone of the original homepage_lander_split,
 * created because Convert can't add a variation to a started experiment. The
 * string below is the experience *key*, which Convert auto-generated on clone
 * as "homepage-lander-split-clone" and does NOT let you edit once the test is
 * Active. The SDK matches on this key, so it must stay verbatim — the readable
 * "homepage_lander_split_v2" is only the display name, not the key.
 */
export const HOMEPAGE_LANDER_SPLIT_EXPERIENCE = "homepage-lander-split-clone";

/**
 * Variation key → redirect destination for {@link HOMEPAGE_LANDER_SPLIT_EXPERIENCE}.
 *
 * `control` (Original, 0%) is intentionally absent: it has no redirect (the
 * visitor stays on the homepage). The keys here MUST match the variation keys
 * configured in Convert exactly.
 *
 * ⚠️ Clone-mangled keys: when this v2 experience was cloned, Convert prefixed
 * each pre-existing variation's key with its numeric id and does NOT let you
 * edit variation keys once the test is Active. So the blue/pink arms are keyed
 * "<id>-variation-1" / "<id>-variation-2", NOT "variation_1"/"variation_2".
 * Only `variation_3` (added by hand before activation) is clean. Verified
 * against Convert's live CDN config (experience 1004202320). Display names in
 * the Convert UI are still "Variation 1/2/3"; these are the underlying keys.
 */
export const HOMEPAGE_LANDER_SPLIT_DESTINATIONS: Record<string, string> = {
  "1004475375-variation-1": "https://go.instarx.com/start-glp1", // BLUE (Variation 1, 40%)
  "1004475376-variation-2": "https://go.instarx.com/glp2", // PINK (Variation 2, 20%)
  variation_3: "https://go.instarx.com/glp2-da", // PINK 2.0 (Variation 3, 40%)
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
