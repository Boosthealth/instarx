import "server-only";

/**
 * Server-side PostHog capture for routes that 302 before any page — and so
 * before client-side PostHog — ever loads. The affiliate `/quiz` route
 * (proxy.ts) is the case that matters: publishers send all their traffic there,
 * the proxy buckets each visitor and redirects them straight to an external
 * funnel, so no first-party event is ever recorded and a later sale can't be
 * tied back to the click. This lets the proxy record that click server-side.
 *
 * We POST directly to PostHog's capture endpoint rather than pull in a Node SDK:
 * the proxy hot-path is deliberately dependency-free (see the FNV-1a hash in
 * app/lib/experiments.ts), and one fetch is lighter than a batching client whose
 * timer never fires inside a short serverless invocation.
 */

// Same public project key as the client snippet in
// app/components/AnalyticsScripts.tsx. It is a public (phc_) key, safe to embed.
const POSTHOG_KEY = "phc_5dyMpbsb6sk28QyTlgtcnXfR0PrpPBvgAZlRL6Syrmy";
const POSTHOG_HOST = "https://us.i.posthog.com";

// Hard ceiling on the capture POST. A serverless invocation freezes once the
// redirect response is returned, so the proxy awaits delivery (a fire-and-forget
// POST would be dropped) — but a slow or unreachable PostHog must never stall
// the visitor's redirect, so we abort and move on.
const CAPTURE_TIMEOUT_MS = 1000;

/**
 * Send a single event to PostHog, keyed on `distinctId`. Best-effort: never
 * throws and never blocks longer than {@link CAPTURE_TIMEOUT_MS}, so a capture
 * failure can't break or delay the request that triggered it.
 */
export async function captureServerEvent(
  event: string,
  distinctId: string,
  properties: Record<string, unknown>,
): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CAPTURE_TIMEOUT_MS);
  try {
    await fetch(`${POSTHOG_HOST}/i/v0/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event,
        distinct_id: distinctId,
        timestamp: new Date().toISOString(),
        properties,
      }),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (error) {
    console.error(`[analytics] failed to capture "${event}":`, error);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Record an affiliate `/quiz` click as a first-party event, keyed on `cvt_vid`.
 * A sale reported later against the same id can then be reconciled with the
 * click. `params` are the publisher's inbound query params (transaction_id,
 * click_id, sub_id, …); they ride along flat so each is filterable in PostHog.
 * `cvt_vid` is dropped from that spread — it's already the distinct id — and our
 * own fields are written last so a stray publisher param can't clobber them.
 */
export async function captureAffiliateClick(args: {
  visitorId: string;
  destination: string;
  variationKey: string | null;
  params: URLSearchParams;
}): Promise<void> {
  const { visitorId, destination, variationKey, params } = args;

  const publisherParams: Record<string, string> = {};
  params.forEach((value, key) => {
    if (key !== "cvt_vid") publisherParams[key] = value;
  });

  await captureServerEvent("affiliate_click", visitorId, {
    ...publisherParams,
    cvt_vid: visitorId,
    funnel_destination: destination,
    variation_key: variationKey,
  });
}
