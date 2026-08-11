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
 * Homepage lander destination — the CONCLUDED homepage lander split's winner.
 *
 * The homepage lander split ran v1–v4 (final Convert experience
 * "homepage_lander_split_v4", ID 1004202936, key "hmpg-lndr-splt-cln-cln-clone")
 * splitting `/` across Blue /start-glp1, Pink /glp2, and Pink 3.0 /glp2-v2.
 * Concluded 2026-08-11: PINK /glp2 won decisively on revenue per visitor
 * (~5x Blue and Pink 3.0 on Google traffic, Jun 17–Aug 11; consistent across
 * every Google campaign with meaningful volume — see the reporting.instarx.com
 * traffic report). The Convert dependency for this hop is removed; the proxy
 * 302s every human bare-homepage visit straight here.
 *
 * Blue and Pink 3.0 remain live at their URLs — affiliate publishers link
 * directly to lander paths (where the winner is NOT clear-cut per publisher),
 * and the proxy never redirects lander paths.
 */
export const HOMEPAGE_LANDER_DESTINATION = "https://go.instarx.com/glp2";

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
