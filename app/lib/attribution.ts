// Marketing attribution params persisted across the lander → funnel hop via
// the `ix_attribution` cookie (read back by proxy.ts at the /intake redirect).
//
// Two capture paths write the cookie with identical key filtering:
//   1. proxy.ts — server-side, on every proxied route (/, /weight-loss,
//      /intake), so a homepage ad click carries the cookie on the very first
//      response with no dependency on client-side JS at all.
//   2. app/layout.tsx — an inline pre-hydration <script> for entry pages the
//      proxy doesn't run on (direct lander visits). It must win the race
//      against a fast CTA click: the previous useEffect-based writer only ran
//      after the React bundle loaded and hydrated, so clicks that beat
//      hydration (slow mobile webviews, in-app browsers) reached the funnel
//      stripped of attribution.
//
// PII prefill params (email, phone, first_name, …) are deliberately NOT
// captured: this cookie is attribution-only. Prefill data belongs to the
// funnel's own entry URL when a campaign links straight to it, not to a
// year-long cookie.

export const ATTRIBUTION_COOKIE = "ix_attribution";

// Exact-match keys, from what live ad traffic actually sends (PostHog query
// over lander/homepage pageview URLs): gclid/gbraid/wbraid/gad_*  Google Ads,
// fbclid Meta, msclkid Microsoft, ttclid TikTok; ad_id/ad_group/ad_group_id/
// adset/adname/campaignid/campaign_id/transaction_id/sub_id ad-network
// template params (Bandit et al); _hsmi/_hsenc HubSpot email tracking.
export const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "gad_campaignid",
  "fbclid",
  "msclkid",
  "ttclid",
  "ad_id",
  "ad_group",
  "ad_group_id",
  "adset",
  "adname",
  "campaignid",
  "campaign_id",
  "transaction_id",
  "sub_id",
  "_hsmi",
  "_hsenc",
];

// Prefix-match keys: utm_source/medium/… plus the custom utm_* params ad
// platform URL templates add (utm_keyword, utm_device, utm_matchtype, …).
export const ATTRIBUTION_KEY_PREFIXES = ["utm_"];

export function isAttributionKey(key: string): boolean {
  return (
    ATTRIBUTION_KEYS.includes(key) ||
    ATTRIBUTION_KEY_PREFIXES.some((prefix) => key.startsWith(prefix))
  );
}

// Extract the attribution subset of `source` as a URL-encoded query string,
// or null when it carries none. Callers only write the cookie on a non-null
// result, keeping the previously-stored attribution rather than clearing it.
export function captureAttribution(source: URLSearchParams): string | null {
  const captured = new URLSearchParams();
  source.forEach((value, key) => {
    if (value && isAttributionKey(key)) captured.set(key, value);
  });
  const result = captured.toString();
  return result.length > 0 ? result : null;
}
