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
 * NB: this is the v3 experience (Convert experience ID 1004202365, display name
 * "homepage_lander_split_v3") — a clone of v2 (homepage_lander_split_v2, ID
 * 1004202320), created to drop the losing "pink 2.0" /glp2-da arm (old
 * variation_3) and rebalance the two survivors to a clean 50/50. We had to
 * clone because Convert won't let you edit traffic allocation on an experiment
 * once it has collected data. The string below is the experience *key*, which
 * Convert auto-generated on this (second) clone as "hmpg-lndr-splt-cln-cln"
 * (homepage-lander-split-clone-clone, abbreviated) and does NOT let you edit
 * once the test is Active. The SDK matches on this key, so it must stay
 * verbatim — the readable "homepage_lander_split_v3" is only the display name,
 * not the key.
 */
export const HOMEPAGE_LANDER_SPLIT_EXPERIENCE = "hmpg-lndr-splt-cln-cln";

/**
 * Variation key → redirect destination for {@link HOMEPAGE_LANDER_SPLIT_EXPERIENCE}.
 *
 * `control` (Original, 0%) is intentionally absent: it has no redirect (the
 * visitor stays on the homepage). The keys here MUST match the variation keys
 * configured in Convert exactly.
 *
 * ⚠️ Clone-mangled keys: each clone re-prefixes the variation keys with fresh
 * numeric ids and Convert does NOT let you edit them once the test is Active.
 * On this v3 clone (experience 1004202365) the arms are keyed
 * "1004475474-variation-1" / "1004475475-variation-2" — NOT "variation_1/2",
 * and NOT the v2 ids (…375/…376). Verified against the live Convert config.
 * Display names in the UI are still "Variation 1/2"; these are the underlying
 * keys. The old "pink 2.0" /glp2-da arm (variation_3) was dropped in v3.
 */
export const HOMEPAGE_LANDER_SPLIT_DESTINATIONS: Record<string, string> = {
  "1004475474-variation-1": "https://go.instarx.com/start-glp1", // BLUE (Variation 1, 50%)
  "1004475475-variation-2": "https://go.instarx.com/glp2", // PINK (Variation 2, 50%)
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
