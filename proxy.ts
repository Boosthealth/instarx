import { NextResponse, type NextRequest } from "next/server";
import { getVariationKey } from "@/app/lib/convert";
import {
  GLP_FUNNEL_SPLIT_EXPERIENCE,
  funnelSplitDestination,
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
    });
  }

  return response;
}

async function routeResponse(
  request: NextRequest,
  visitorId: string,
): Promise<NextResponse> {
  // /intake — GLP-1 funnel split (split-URL test). Bucket the visitor and
  // redirect the non-control arms to their intake funnel. `control` (0%
  // allocation), a bucketing miss, or an unknown key → no destination → stay
  // on /intake and render the page normally.
  if (request.nextUrl.pathname === "/intake") {
    const variationKey = await getVariationKey(
      GLP_FUNNEL_SPLIT_EXPERIENCE,
      visitorId,
    );
    const destination = funnelSplitDestination(variationKey);
    if (destination) {
      return NextResponse.redirect(destination, 302);
    }
    return NextResponse.next();
  }

  // Default (content-variation routes, e.g. /weight-loss): forward the visitor
  // id so the Server Component can bucket. The decision is made in the render
  // path, not here.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(VISITOR_HEADER, visitorId);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

// Only run on A/B-tested routes. Add paths here as more server-side
// experiments are introduced.
export const config = {
  matcher: ["/weight-loss", "/intake"],
};
