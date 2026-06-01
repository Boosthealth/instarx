import { NextResponse, type NextRequest } from "next/server";

/**
 * Lightweight proxy (Next.js 16's renamed "middleware" convention; runs on the
 * Node.js runtime). Its ONLY job is to guarantee every visitor on an A/B-tested
 * route has a stable `cvt_vid` id, so server-side bucketing is consistent
 * across requests. The actual bucketing decision lives in the render path (see
 * app/lib/convert.ts), not here — keeping this proxy minimal and fast.
 *
 * The id is forwarded to the same request via a header (read by app/lib/visitor.ts)
 * and persisted in a cookie for subsequent requests.
 */
const VISITOR_COOKIE = "cvt_vid";
const VISITOR_HEADER = "x-cvt-vid";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const existingId = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorId = existingId ?? crypto.randomUUID();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(VISITOR_HEADER, visitorId);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  if (!existingId) {
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      path: "/",
      maxAge: ONE_YEAR_SECONDS,
      sameSite: "lax",
    });
  }

  return response;
}

// Only run on A/B-tested routes. Add paths here as more server-side
// experiments are introduced.
export const config = {
  matcher: ["/weight-loss"],
};
