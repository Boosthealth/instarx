import { NextResponse, type NextRequest } from "next/server";
import { ATTRIBUTION_COOKIE, captureAttribution } from "@/app/lib/attribution";
import { getVariationKey } from "@/app/lib/convert";
import {
  AFFILIATE_FUNNEL_SPLIT_EXPERIENCE,
  HOMEPAGE_LANDER_SPLIT_EXPERIENCE,
  affiliateFunnelSplitDestination,
  funnelSplitDestinationFor,
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
// ---------------------------------------------------------------------------
// Funnel guard — requires visitors to have passed verification on
// instarx.org before reaching any page on this site. This is access control,
// NOT cloaking: every visitor is treated identically, with no branching on
// user agent, crawler, ad platform, IP, country, referrer or account history.
// The only input is whether the visitor holds a valid access token or a
// session this guard issued.
//
// Runs FIRST, ahead of the visitor-id/attribution/A-B logic below, so an
// ungated visitor is redirected to instarx.org before being bucketed into any
// experiment or having attribution captured.
//
// Rollback is one env var: set INSTARX_GATE_DRY_RUN back to true, or remove
// the guardFunnel() call below. No other cleanup.
// ---------------------------------------------------------------------------
const GATE_ENTRY_URL =
  process.env.INSTARX_GATE_ENTRY_URL ?? "https://instarx.org/";
const GATE_VALIDATE_URL =
  process.env.INSTARX_GATE_VALIDATE_URL ??
  "https://instarx.org/api/access/validate";
const GUARD_VALIDATION_KEY = process.env.INSTARX_GATE_VALIDATION_KEY ?? "";

const GUARD_TOKEN_PARAM = "fg_access_token";
const GUARD_COOKIE_NAME = "ix_fg_session";
const GUARD_SESSION_SECONDS = 28_800; // 8 hours
const GUARD_GRACE_SECONDS = 300; // 5 minutes, outage only

// Deliberately broad: anything machine to machine, anything that is not a
// page view, and every page an ad reviewer or a patient might legitimately
// open without coming through an ad.
const GUARD_EXCLUDED_PREFIXES = [
  "/api",
  "/_next",
  "/_vercel",
  "/favicon",
  "/robots.txt",
  "/sitemap",
  "/.well-known",
  "/policies", // privacy, terms, refund, safety, telehealth consent
  "/safety", // compounded ingredient safety pages
  "/contact-us",
];

const GUARD_ASSET_PATTERN =
  /\.(css|js|mjs|map|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|eot|pdf|txt|xml|json)$/i;

function isGuardExcluded(path: string): boolean {
  if (
    GUARD_EXCLUDED_PREFIXES.some((p) => path === p || path.startsWith(p + "/"))
  )
    return true;
  if (GUARD_ASSET_PATTERN.test(path)) return true;
  return false;
}

function isGuardDryRun(): boolean {
  // Read per request, never at module load, or it would be untestable and
  // stale at every cold start.
  return process.env.INSTARX_GATE_DRY_RUN === "true";
}

const guardEncoder = new TextEncoder();

async function guardHmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    guardEncoder.encode(GUARD_VALIDATION_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    guardEncoder.encode(message),
  );
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function makeGuardSession(
  seconds: number,
): Promise<{ value: string; expires: number }> {
  const expires = Math.floor(Date.now() / 1000) + seconds;
  return { value: `${expires}.${await guardHmac(String(expires))}`, expires };
}

async function hasValidGuardSession(request: NextRequest): Promise<boolean> {
  const raw = request.cookies.get(GUARD_COOKIE_NAME)?.value;
  if (!raw) return false;
  const [body, sig] = raw.split(".");
  if (!body || !sig) return false;
  if (Number(body) <= Math.floor(Date.now() / 1000)) return false;
  const expected = await guardHmac(body);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++)
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

// The three outcomes are kept apart on purpose. Only 'unavailable' earns a
// grace session; collapsing it into 'rejected' would take the funnel down
// during an outage on our side rather than theirs.
async function validateGuardToken(
  token: string,
): Promise<"accepted" | "rejected" | "unavailable"> {
  if (!GUARD_VALIDATION_KEY) return "unavailable";
  try {
    const response = await fetch(GATE_VALIDATE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-validation-key": GUARD_VALIDATION_KEY,
      },
      body: JSON.stringify({ token }),
      signal: AbortSignal.timeout(3000),
    });
    // A 401 means OUR key is wrong, which is our problem and not the visitor's.
    if (response.status === 401) return "unavailable";
    if (!response.ok) return "unavailable";
    const data = (await response.json()) as { status?: string };
    return data?.status === "accepted" ? "accepted" : "rejected";
  } catch {
    return "unavailable";
  }
}

function setGuardSessionCookie(
  response: NextResponse,
  session: { value: string; expires: number },
) {
  response.cookies.set({
    name: GUARD_COOKIE_NAME,
    value: session.value,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(session.expires * 1000),
  });
}

// Returns a response to short-circuit with (redirect to the gate, or a
// redirect that spends an access token and mints a session), or null to let
// the request continue into the rest of the proxy.
async function guardFunnel(request: NextRequest): Promise<NextResponse | null> {
  // No key configured (e.g. Preview deployments, which don't get the
  // Production-only env vars): fail OPEN rather than letting WebCrypto throw
  // on a zero-length HMAC key. Every crypto operation below assumes a key.
  if (!GUARD_VALIDATION_KEY) return null;

  const url = request.nextUrl;
  const path = url.pathname;

  // Never redirect anything but a page view. A redirected POST loses its body.
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  if (isGuardExcluded(path)) return null;

  const token = url.searchParams.get(GUARD_TOKEN_PARAM);

  if (await hasValidGuardSession(request)) {
    // Already authenticated. A leftover single-use token must still never be
    // left on the URL to be copied, shared, logged, or forwarded downstream.
    if (!token) return null;
    const clean = new URL(url);
    clean.searchParams.delete(GUARD_TOKEN_PARAM);
    return NextResponse.redirect(clean, 302);
  }

  // Arriving from the gate with a token: spend it, then clean the URL so a
  // single-use token is never left to be copied, shared or logged.
  if (token) {
    const verdict = await validateGuardToken(token);

    if (verdict === "accepted" || verdict === "unavailable") {
      const clean = new URL(url);
      clean.searchParams.delete(GUARD_TOKEN_PARAM);
      const response = NextResponse.redirect(clean, 302);
      // A session is minted on a real acceptance, and a SHORT one on grace, so
      // an outage cannot become a redirect loop.
      setGuardSessionCookie(
        response,
        await makeGuardSession(
          verdict === "accepted" ? GUARD_SESSION_SECONDS : GUARD_GRACE_SECONDS,
        ),
      );
      console.log(`[instarx-guard] ${verdict} path=${path}`);
      return response;
    }

    console.log(`[instarx-guard] rejected path=${path}`);
  }

  console.log(
    `[instarx-guard] no_access path=${path} dry_run=${isGuardDryRun()}`,
  );

  if (isGuardDryRun()) return null;

  // Carry attribution forward so a visitor sent back to the gate does not lose
  // the ad click they arrived with.
  const gate = new URL(GATE_ENTRY_URL);
  url.searchParams.forEach((value, key) => {
    if (key !== GUARD_TOKEN_PARAM) gate.searchParams.set(key, value);
  });

  return NextResponse.redirect(gate, 302);
}

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
    // A spent (or unspent) single-use guard token must never ride a redirect
    // onward to a third-party lander/funnel domain or an analytics query string.
    if (key === GUARD_TOKEN_PARAM) return;
    if (!value) return;
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  });
}

export async function proxy(request: NextRequest) {
  const guardResponse = await guardFunnel(request);
  if (guardResponse) return guardResponse;

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

  // Persist inbound attribution server-side, on the very first response. The
  // dominant ad flow enters at `/` (or `/intake`), both proxied — setting the
  // cookie here means the lander → /intake hop keeps attribution even when
  // client-side JS never runs (in-app webviews, clicks that beat hydration).
  // Newer params overwrite the stored set; a bare URL leaves it untouched.
  // The domain guard keeps the cookie working on *.vercel.app previews.
  const attribution = captureAttribution(request.nextUrl.searchParams);
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
): Promise<NextResponse> {
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
  request.headers.forEach((v, k) => {
    // Cookie carries bearer credentials (ix_fg_session, etc.) — never log it.
    allHeaders[k] = k.toLowerCase() === "cookie" ? "[redacted]" : v;
  });
  console.log(
    `[debug-middleware] path=${request.nextUrl.pathname} search="${request.nextUrl.search}" hasRsc=${hasRscParam} nextPrefetch=${nextPrefetchHeader} rsc=${rscHeader} headers=${JSON.stringify(allHeaders)}`,
  );

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

// Broadened from the original A/B-only path list to cover every route (minus
// API/Next internals/assets) so the funnel guard above can run sitewide. The
// A/B branches below still gate on an explicit pathname check, so this is a
// superset of what they need — add paths there as more experiments are
// introduced, not here.
//
// The excluded extension list mirrors GUARD_ASSET_PATTERN above (keep them in
// sync). It deliberately does NOT include .html: static landers served from
// public/ (e.g. public/ed/*.html) are real page views and must stay gated —
// a blanket "any dotted path" exclusion let them bypass the guard entirely.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:css|js|mjs|map|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|eot|pdf|txt|xml|json)$).*)",
  ],
};
