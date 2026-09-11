import { NextResponse, type NextRequest } from "next/server";
import {
  ATTRIBUTION_COOKIE,
  captureAttribution,
} from "@/app/lib/attribution";
import { getVariationKey } from "@/app/lib/convert";
import {
  AFFILIATE_FUNNEL_SPLIT_EXPERIENCE,
  HOMEPAGE_LANDER_SPLIT_EXPERIENCE,
  affiliateFunnelSplitDestination,
  funnelSplitDestinationFor,
  homepageLanderDestination,
} from "@/app/lib/experiments";
import { isLanderSlug, landerArmFor, type LanderArm } from "@/app/lib/landers";

/**
 * Lightweight proxy (Next.js 16's renamed "middleware" convention; runs on the
 * Node.js runtime). It has two jobs:
 *
 *  1. Guarantee every visitor on an A/B-tested route has a stable `cvt_vid` id,
 *     so server-side bucketing is consistent across requests. The id is
 *     forwarded to the same request via a header (read by app/lib/visitor.ts)
 *     and persisted in a cookie for subsequent requests.
 *
 *  2. Drive split-URL / redirect experiments. For content variations (e.g. the
 *     /weight-loss hero) the bucketing decision lives in the render path
 *     (app/lib/convert.ts) and the proxy only mints the id. But a redirect test
 *     has no page to render for the redirected arms — the decision must happen
 *     before render — so for those routes we bucket here and 302 the visitor.
 */
const VISITOR_COOKIE = "cvt_vid";
const VISITOR_HEADER = "x-cvt-vid";
// Query param carrying the visitor id across a redirect to an external funnel
// domain, which can't read our host-only cvt_vid cookie. The funnel reads this
// and reports the conversion back to Convert keyed on the same id.
const VISITOR_QUERY_PARAM = "cvt_vid";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// The visitor's marketing attribution lives in the `ix_attribution` cookie as
// a URL-encoded query string (utm_*, gclid, ad_id, …) scoped to `.instarx.com`
// so it survives the in-page lander → /intake navigation (which Next
// client-routes, dropping the query string). It's written server-side below on
// every proxied request that carries attribution params, and client-side by a
// pre-hydration inline script in app/layout.tsx for entries the proxy doesn't
// run on (direct lander visits) — see app/lib/attribution.ts. The /intake
// redirect reads it to re-attach attribution to the funnel's entry URL, where
// Embeddables captures it via originUrl. Once the funnel has it, Embeddables
// owns persistence — we do NOT pass it slide to slide.

// Copy attribution params from `source` onto a redirect target so they survive
// the 302 into the lander / funnel. Existing target params win (we never clobber
// a value already on the destination), and cvt_vid is managed separately so it's
// skipped. Without this, every redirected ad click reaches the funnel/analytics
// stripped of campaign data — PostHog/GA can't attribute and Google Ads loses gclid.
function carryForwardParams(target: URL, source: URLSearchParams): void {
  source.forEach((value, key) => {
    if (key === VISITOR_QUERY_PARAM) return;
    if (!value) return;
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  });
}

// /glp2 message-matched lander split (content test, same URL). Ads keep their
// final URL and append `lp=<slug>` via a final-URL suffix; we bucket the
// visitor 50/50 (sticky, pure function of cvt_vid — see app/lib/landers.ts)
// and REWRITE the "new" arm to the prerendered /glp2/lp/<slug> page. The
// address bar stays /glp2?lp=…, so no redirect, no final-URL change, and no ad
// re-review. Control and bots fall through to the unchanged /glp2 page.
// `?arm=new|control` overrides the coin flip for QA; those visits are marked
// `forced` so dashboards can exclude them.
type LanderSplit = { slug: string; arm: LanderArm; forced: boolean };

function glp2LanderSplit(
  request: NextRequest,
  visitorId: string,
): LanderSplit | null {
  if (request.nextUrl.pathname !== "/glp2") return null;
  const slug = request.nextUrl.searchParams.get("lp");
  if (!isLanderSlug(slug) || isNonHumanRequest(request)) return null;
  const armOverride = request.nextUrl.searchParams.get("arm");
  const forced = armOverride === "new" || armOverride === "control";
  const arm = forced ? (armOverride as LanderArm) : landerArmFor(visitorId);
  return { slug, arm, forced };
}

export async function proxy(request: NextRequest) {
  const existingId = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorId = existingId ?? crypto.randomUUID();

  const landerSplit = glp2LanderSplit(request, visitorId);
  const response = await routeResponse(request, visitorId, landerSplit);

  // Expose the lander-split assignment to the client (both arms render a
  // LanderSplitEvent that reports it to the dataLayer). Session-scoped cookie:
  // stickiness comes from cvt_vid, this is only the event's data channel.
  if (landerSplit) {
    response.cookies.set(
      "ix_lander",
      `${landerSplit.slug}:${landerSplit.arm}${landerSplit.forced ? ":forced" : ""}`,
      {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    );
  }

  // Persist a freshly-minted id on whatever response we return (redirect or
  // next), so the visitor buckets consistently if they come back to /intake.
  if (!existingId) {
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      path: "/",
      maxAge: ONE_YEAR_SECONDS,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  // Persist inbound attribution server-side, on the very first response. The
  // dominant ad flow enters at `/` (or `/intake`), both proxied — setting the
  // cookie here means the lander → /intake hop keeps attribution even when
  // client-side JS never runs (in-app webviews, clicks that beat hydration).
  // Newer params overwrite the stored set; a bare URL leaves it untouched.
  // The domain guard keeps the cookie working on *.vercel.app previews.
  // Fold the lander assignment into attribution as utm_ params (already
  // whitelisted by captureAttribution), so it rides the ix_attribution cookie
  // into the intake funnel's entry URL → PostHog → the per-arm sales join.
  const attributionSource = new URLSearchParams(request.nextUrl.searchParams);
  if (landerSplit) {
    attributionSource.set("utm_lp", landerSplit.slug);
    attributionSource.set("utm_lander_arm", landerSplit.arm);
    if (landerSplit.forced) attributionSource.set("utm_lander_forced", "1");
  }
  const attribution = captureAttribution(attributionSource);
  if (attribution) {
    response.cookies.set(ATTRIBUTION_COOKIE, attribution, {
      path: "/",
      ...(request.nextUrl.hostname.endsWith("instarx.com")
        ? { domain: ".instarx.com" }
        : {}),
      maxAge: ONE_YEAR_SECONDS,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

async function routeResponse(
  request: NextRequest,
  visitorId: string,
  landerSplit: LanderSplit | null,
): Promise<NextResponse> {
  // /glp2 lander split — "new" arm rewrites to the prerendered matched lander;
  // the URL the visitor sees is untouched. Control falls through to /glp2
  // below (and still gets the visitor-id header like every other route).
  if (landerSplit?.arm === "new") {
    const rewriteTarget = request.nextUrl.clone();
    rewriteTarget.pathname = `/glp2/lp/${landerSplit.slug}`;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(VISITOR_HEADER, visitorId);
    return NextResponse.rewrite(rewriteTarget, {
      request: { headers: requestHeaders },
    });
  }

  // / — Homepage lander split (split-URL test). Bucket the visitor and 302
  // the non-control arms to the assigned GLP-1 lander, carrying the visitor id
  // as a query param so it persists across the redirect. Same prefetch/bot
  // skip rationale as the /intake split. `control`, a miss, an unknown key,
  // or a bot → fall through and stay on the homepage.
  //
  // `current_page_key` carve-out: the homepage also serves standalone
  // Embeddables landers at the root (e.g. `/?current_page_key=landing_page_5`
  // for Google Shopping campaigns). Those are dedicated landing pages, not the
  // bare homepage, and must NOT be hijacked into the lander split — doing so
  // sends paid traffic to the wrong page and breaks ad/landing-page match. Only
  // the bare homepage (no `current_page_key`) participates in the split.
  if (
    request.nextUrl.pathname === "/" &&
    !request.nextUrl.searchParams.has("current_page_key") &&
    !isNonHumanRequest(request)
  ) {
    const variationKey = await getVariationKey(
      HOMEPAGE_LANDER_SPLIT_EXPERIENCE,
      visitorId,
    );
    const destination = homepageLanderDestination(variationKey);
    if (destination) {
      const target = new URL(destination);
      // Carry the inbound ad params onto the lander URL so PostHog/GA attribute
      // the lander pageview (the funnel hop itself rides the ix_attribution
      // cookie, which proxy() sets on this same redirect response).
      carryForwardParams(target, request.nextUrl.searchParams);
      target.searchParams.set(VISITOR_QUERY_PARAM, visitorId);
      return NextResponse.redirect(target, 302);
    }
  }

  // /intake — GLP-1 funnel split (split-URL test). Bucket the visitor and 302
  // them to their funnel, carrying the visitor id as a query param so the
  // funnel (a different domain that can't read our cvt_vid cookie) can
  // attribute the conversion back on the same id. Prefetch/crawler traffic
  // skips bucketing entirely and falls through to the /intake page, so bots
  // never land in a funnel or skew the arm counts.
  //
  // Allocation is decided HERE, not in Convert. Convert freezes a running
  // experience's traffic percentages once it has visitors, which made every
  // re-weighting a fresh-experience + key-swap + deploy dance. We already mint
  // a stable `cvt_vid` per visitor above, so the split is a pure function of
  // that id — see GLP_FUNNEL_SPLIT_WEIGHTS in app/lib/experiments.ts. Changing
  // the mix is now a one-line edit to those weights. Convert still owns the
  // homepage lander split and the affiliate split below; measurement for this
  // split lives in PostHog + Stripe, as it already did.
  //
  // NB: the `homepage-cta-click` goal that backs the lander CTR metric is NOT
  // fired here — see app/components/CtaClickTracker.tsx, which fires it from a
  // real DOM click on the lander instead. Firing it on every /intake pageview
  // inflated the count from bots, prefetches, refreshes, and back-button
  // revisits.
  if (request.nextUrl.pathname === "/intake" && !isNonHumanRequest(request)) {
    const target = new URL(funnelSplitDestinationFor(visitorId));
    // Attribution reaches the funnel's entry URL (Embeddables reads it via
    // originUrl). Prefer params on this request; fall back to the attribution
    // cookie, since the lander → /intake click is client-routed and arrives
    // here with the query string stripped.
    carryForwardParams(target, request.nextUrl.searchParams);
    const storedAttribution = request.cookies.get(ATTRIBUTION_COOKIE)?.value;
    if (storedAttribution) {
      carryForwardParams(target, new URLSearchParams(storedAttribution));
    }
    target.searchParams.set(VISITOR_QUERY_PARAM, visitorId);
    return NextResponse.redirect(target, 302);
  }

  // /quiz — Affiliate funnel split (split-URL test). Publishers send their
  // traffic to this one URL; each visitor is bucketed and 302-redirected to one
  // of the three affiliate intake funnels (begin./get./join.instarx.com).
  // Unlike /intake there is NO page at this path — every request must leave
  // with a redirect. So misses don't fall through: `control`, an SDK miss, an
  // unknown key, and non-human traffic all 302 to the fallback funnel instead
  // (bots still skip getVariationKey so they don't burn allocations).
  if (request.nextUrl.pathname === "/quiz") {
    const variationKey = isNonHumanRequest(request)
      ? null
      : await getVariationKey(AFFILIATE_FUNNEL_SPLIT_EXPERIENCE, visitorId);
    const target = new URL(affiliateFunnelSplitDestination(variationKey));
    // The publisher's params (transaction_id, utm_*, sub-ids) arrive on THIS
    // request — copy them onto the funnel URL, where Embeddables captures them
    // via originUrl. The attribution cookie only fills gaps, e.g. a revisit
    // whose link params were stripped.
    carryForwardParams(target, request.nextUrl.searchParams);
    const storedAttribution = request.cookies.get(ATTRIBUTION_COOKIE)?.value;
    if (storedAttribution) {
      carryForwardParams(target, new URLSearchParams(storedAttribution));
    }
    target.searchParams.set(VISITOR_QUERY_PARAM, visitorId);
    return NextResponse.redirect(target, 302);
  }

  // Everything else we run on — the /weight-loss content test, plus /intake
  // control / misses / bots that stay put — forwards the visitor id so the
  // render path can bucket. That decision is made in the Server Component, not
  // here. Forwarding on the /intake fall-through too means a future content
  // experiment on /intake works without another proxy change.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(VISITOR_HEADER, visitorId);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

// Conservative non-human check: only well-known prefetch/crawler signals, so a
// real visitor is never misrouted to control. Prefetches and bots shouldn't
// consume A/B allocations — they'd skew visitor counts with traffic that never
// actually navigated. A real click triggers a full HTTP navigation (no `_rsc=`
// param, no RSC/prefetch headers) so the user's actual visit still buckets
// normally.
function isNonHumanRequest(request: NextRequest): boolean {
  // DEBUG: log what middleware sees so we can verify the prefetch detection
  const hasRscParam = request.nextUrl.searchParams.has("_rsc");
  const nextPrefetchHeader = request.headers.get("next-router-prefetch");
  const rscHeader = request.headers.get("rsc");
  const allHeaders: Record<string, string> = {};
  request.headers.forEach((v, k) => { allHeaders[k] = v; });
  console.log(`[debug-middleware] path=${request.nextUrl.pathname} search="${request.nextUrl.search}" hasRsc=${hasRscParam} nextPrefetch=${nextPrefetchHeader} rsc=${rscHeader} headers=${JSON.stringify(allHeaders)}`);

  // Next.js App Router <Link> prefetch — fires when a Link enters the viewport,
  // before any click. App Router RSC prefetches use a `?_rsc=…` query param +
  // `RSC: 1` + `Next-Router-Prefetch: 1` headers, but DON'T reliably include
  // `Sec-Purpose: prefetch` (which is for browser-level prefetches like
  // <link rel="prefetch">). Without these checks every CTA on a lander
  // pre-buckets the visitor into glp_funnel_split before they click.
  if (hasRscParam) return true;
  if (nextPrefetchHeader) return true;
  if (rscHeader) return true;

  // Browser-level prefetches (Speculation Rules, <link rel="prefetch">,
  // search-engine top-result prefetches): these DO set sec-purpose.
  const purpose =
    request.headers.get("sec-purpose") ?? request.headers.get("purpose") ?? "";
  if (purpose.includes("prefetch")) return true;

  const ua = request.headers.get("user-agent")?.toLowerCase() ?? "";
  return /bot\b|crawler|spider|facebookexternalhit|slackbot|whatsapp|telegrambot|discordbot|bingpreview|google-inspectiontool|lighthouse|pingdom|uptimerobot|headlesschrome/.test(
    ua,
  );
}

// Only run on A/B-tested routes. Add paths here as more server-side
// experiments are introduced.
export const config = {
  matcher: ["/", "/weight-loss", "/intake", "/quiz", "/glp2"],
};
