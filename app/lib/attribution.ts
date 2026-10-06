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

// Persists marketing attribution (utm_*, gclid, ad_id, …) from the entry URL
// into the `ix_attribution` cookie. Inlined and pre-hydration ON PURPOSE: the
// previous useEffect version only ran after the React bundle hydrated, so a
// CTA click that beat hydration (slow mobile webviews) reached /intake with no
// cookie and the funnel lost all attribution. A parser-executed script at the
// top of <body> runs before any CTA is clickable (the static /ed landers load
// it via app/ed/analytics.js/route.ts). proxy.ts also sets the same
// cookie server-side on proxied routes; this covers direct lander entries.
// Key filtering must stay in lockstep with proxy.ts — both sides read the
// shared lists in app/lib/attribution.ts. ES5-only: it must run in the oldest
// in-app webviews, which are exactly where the hydration race bit.
export const ATTRIBUTION_CAPTURE_SCRIPT = `(function () {
  try {
    var keys = ${JSON.stringify(ATTRIBUTION_KEYS)};
    var prefixes = ${JSON.stringify(ATTRIBUTION_KEY_PREFIXES)};
    var search = new URLSearchParams(window.location.search);
    var captured = new URLSearchParams();
    var any = false;
    search.forEach(function (value, key) {
      if (!value) return;
      var keep = keys.indexOf(key) !== -1;
      if (!keep) {
        for (var i = 0; i < prefixes.length; i++) {
          if (key.lastIndexOf(prefixes[i], 0) === 0) { keep = true; break; }
        }
      }
      if (keep) { captured.set(key, value); any = true; }
    });
    if (!any) return;
    var domain = /(^|\\.)instarx\\.com$/.test(window.location.hostname) ? "; domain=.instarx.com" : "";
    var secure = window.location.protocol === "https:" ? "; secure" : "";
    document.cookie = "${ATTRIBUTION_COOKIE}=" + captured.toString() + "; path=/" + domain + "; max-age=31536000; samesite=lax" + secure;
  } catch (e) {}
})();`;
