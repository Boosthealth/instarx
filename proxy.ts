import { NextResponse, type NextRequest } from "next/server";
import { getVariationKey, trackConversion } from "@/app/lib/convert";
import {
  GLP_FUNNEL_SPLIT_EXPERIENCE,
  HOMEPAGE_LANDER_SPLIT_EXPERIENCE,
  funnelSplitDestination,
  homepageLanderDestination,
} from "@/app/lib/experiments";

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

export async function proxy(request: NextRequest) {
  const existingId = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorId = existingId ?? crypto.randomUUID();

  const response = await routeResponse(request, visitorId);

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

  return response;
}

async function routeResponse(
  request: NextRequest,
  visitorId: string,
): Promise<NextResponse> {
  // / — Homepage lander split (split-URL test). Bucket the visitor and 302
  // the non-control arms to the assigned GLP-1 lander, carrying the visitor id
  // as a query param so it persists across the redirect. Same prefetch/bot
  // skip rationale as the /intake split. `control`, a miss, an unknown key,
  // or a bot → fall through and stay on the homepage.
  if (request.nextUrl.pathname === "/" && !isNonHumanRequest(request)) {
    const variationKey = await getVariationKey(
      HOMEPAGE_LANDER_SPLIT_EXPERIENCE,
      visitorId,
    );
    const destination = homepageLanderDestination(variationKey);
    if (destination) {
      const target = new URL(destination);
      target.searchParams.set(VISITOR_QUERY_PARAM, visitorId);
      return NextResponse.redirect(target, 302);
    }
  }

  // /intake — GLP-1 funnel split (split-URL test). Bucket the visitor and 302
  // the non-control arms to their funnel, carrying the visitor id as a query
  // param so the funnel (a different domain that can't read our cvt_vid cookie)
  // can attribute the conversion back to this experiment. Prefetch/crawler
  // traffic skips bucketing so bots don't burn allocations. `control`, a miss,
  // an unknown key, or a bot → fall through and stay on /intake.
  //
  // Also fires the `homepage_cta_click` goal — every (human) /intake hit is a
  // CTA click-through from a lander, so this serves as the CTR metric for the
  // homepage lander split. Convert only attributes the goal to experiments
  // the visitor is bucketed into; visitors outside the lander test are a
  // no-op for it. Run in parallel with bucketing to avoid extra latency on
  // the redirect hot-path.
  if (request.nextUrl.pathname === "/intake" && !isNonHumanRequest(request)) {
    const [, variationKey] = await Promise.all([
      // Pass ruleData so the goal's triggering rule in the Convert dashboard
      // has something to match against. Without it the SDK evaluates the
      // rule against an empty bag and silently drops the conversion. Paired
      // with dashboard condition:
      //   Generic Text Value `goal_trigger` Matches exactly `intake_visit`
      // NB: Convert normalizes goal keys to kebab-case in the dashboard
      // (typing `homepage_cta_click` gets saved as `homepage-cta-click`),
      // so the SDK only finds the goal under the hyphenated form.
      trackConversion("homepage-cta-click", visitorId, {
        goal_trigger: "intake_visit",
      }),
      getVariationKey(GLP_FUNNEL_SPLIT_EXPERIENCE, visitorId),
    ]);
    const destination = funnelSplitDestination(variationKey);
    if (destination) {
      const target = new URL(destination);
      target.searchParams.set(VISITOR_QUERY_PARAM, visitorId);
      return NextResponse.redirect(target, 302);
    }
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
// real visitor is never misrouted to control. Bots shouldn't consume A/B
// allocations — they'd skew the split with traffic that never converts.
function isNonHumanRequest(request: NextRequest): boolean {
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
  matcher: ["/", "/weight-loss", "/intake"],
};
