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
 * The /intake GLP-1 funnel split is a split-URL / redirect test, and unlike the
 * other splits it is NO LONGER bucketed by Convert. History: the original
 * `glp_funnel_split` collected >1k visitors, at which point Convert froze its
 * traffic percentages (only a fresh Draft has editable %). Re-weighting then
 * cost a fresh experience + a constant swap + a deploy every time — that is why
 * `glp_funnel_split_v2` existed at all.
 *
 * Since proxy.ts already mints a stable `cvt_vid` per visitor, the allocation
 * now lives in code, below. Re-weighting is a one-line edit and a deploy, with
 * no dashboard step and no key mangling. Measurement was already PostHog +
 * Stripe rather than Convert goals, so nothing downstream changes.
 *
 * 2026-08-25: `start.instarx.com` re-added as a third arm (redesigned funnel).
 * It had been at 0% since 2026-07-09 under the previous, retired build.
 */

/**
 * Weighted arms for the /intake funnel split, bucketed IN CODE rather than by
 * Convert. Convert locks a running experience's allocation once it has
 * visitors, so re-adding `start` there would mean a fresh experience + a key
 * swap + a deploy. We already mint a stable `cvt_vid` per visitor in proxy.ts,
 * so the split can just live here: change the weights, deploy, done.
 *
 * Weights are integers and need not sum to 100 — a visitor is placed by
 * position within the running total, so re-weighting is a one-line edit.
 * Order matters for stickiness: appending a new arm at the END re-buckets the
 * fewest existing visitors. Editing a weight in the middle shifts every arm
 * after it.
 */
export const GLP_FUNNEL_SPLIT_WEIGHTS: ReadonlyArray<
  readonly [destination: string, weight: number]
> = [
  ["https://quiz.instarx.com/", 0], // quiz (Intake v2) — paused 2026-08-31
  ["https://intake.instarx.com/", 50], // intake (Intake01 v2)
  ["https://start.instarx.com/", 25], // start (Intake v3, redesigned)
  ["https://flow.instarx.com/", 25], // flow (Heyflow intake, added 2026-08-31)
];

/**
 * FNV-1a over the visitor id. Deterministic and uniform enough for traffic
 * allocation, and dependency-free so it runs in the proxy without pulling the
 * Convert SDK into the hot path. Returns an unsigned 32-bit int.
 */
function hashVisitorId(visitorId: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < visitorId.length; i += 1) {
    hash ^= visitorId.charCodeAt(i);
    // 32-bit FNV prime multiply, kept in range via Math.imul.
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Resolve a visitor to a funnel destination using {@link GLP_FUNNEL_SPLIT_WEIGHTS}.
 *
 * Assignment is a pure function of the visitor id, so a returning visitor with
 * the same `cvt_vid` cookie always lands on the same funnel — the stickiness
 * Convert used to provide. Never returns null: every /intake visitor gets a
 * funnel. An empty visitor id (shouldn't happen — proxy.ts mints one before
 * calling) falls back to the first arm rather than leaving the visitor stranded.
 */
export function funnelSplitDestinationFor(visitorId: string): string {
  const total = GLP_FUNNEL_SPLIT_WEIGHTS.reduce((sum, [, w]) => sum + w, 0);
  if (!visitorId || total <= 0) return GLP_FUNNEL_SPLIT_WEIGHTS[0][0];

  let position = hashVisitorId(visitorId) % total;
  for (const [destination, weight] of GLP_FUNNEL_SPLIT_WEIGHTS) {
    if (position < weight) return destination;
    position -= weight;
  }
  return GLP_FUNNEL_SPLIT_WEIGHTS[GLP_FUNNEL_SPLIT_WEIGHTS.length - 1][0];
}

/**
 * Convert experience key for the homepage lander split. Like the GLP funnel
 * split, this is a split-URL / redirect test: the proxy buckets the visitor at
 * the homepage and 302-redirects each variation to a different GLP-1 lander.
 * Bucketing therefore lives in proxy.ts, not the render path.
 *
 * NB: this is the v4 experience (Convert experience ID 1004202936, display name
 * "homepage_lander_split_v4") — a clone of v3 (ID 1004202365), created to add a
 * THIRD lander arm (/glp2-v2 "Pink 3.0", the premium editorial redesign).
 * Convert can't add a variation to a started experiment, so we cloned v3. The
 * string below is the experience *key*, which Convert auto-generated on this
 * (third) clone as "hmpg-lndr-splt-cln-cln-clone" and does NOT let you edit once
 * the test is Active. The SDK matches on this key, so it must stay verbatim —
 * the readable "homepage_lander_split_v4" is only the display name, not the key.
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
 * On this v4 clone (experience 1004202936) the inherited arms are keyed
 * "1004476830-variation-1" (blue) / "1004476831-variation-2" (pink); the new
 * third arm was hand-keyed clean as "variation-3" in the draft before activation.
 * Verified against the live Convert variation dialogs. Display names in the UI
 * are "Variation 1/2/3"; these are the underlying keys.
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
