import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { trackConversion } from "@/app/lib/convert";

const VISITOR_COOKIE = "cvt_vid";

type TrackBody = {
  goal?: string;
  ruleData?: Record<string, unknown>;
};

/**
 * Server-side conversion sink for client-initiated goals.
 *
 * The browser fires `navigator.sendBeacon('/api/convert-track', ...)` on a real
 * user action (e.g. clicking a CTA on a lander). This route picks up the
 * visitor's `cvt_vid` from the cookie and reports the conversion via the
 * FullStack SDK. We use this for click-style goals so the firing is tied to an
 * actual user action — not a server pageview — which keeps bots, prefetches,
 * refreshes, and back-button revisits out of the conversion count.
 */
export async function POST(request: Request): Promise<Response> {
  let body: TrackBody;
  try {
    body = (await request.json()) as TrackBody;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (!body.goal || typeof body.goal !== "string") {
    return NextResponse.json({ error: "missing goal" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const visitorId = cookieStore.get(VISITOR_COOKIE)?.value ?? null;

  await trackConversion(body.goal, visitorId, body.ruleData);

  // 204 keeps the beacon response empty — the caller doesn't read it.
  return new NextResponse(null, { status: 204 });
}
