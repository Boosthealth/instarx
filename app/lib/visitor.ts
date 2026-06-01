import { cookies, headers } from "next/headers";

/**
 * Cookie holding the stable per-visitor id used for consistent A/B bucketing.
 * Written by proxy.ts (see VISITOR_HEADER for the same-request handoff).
 */
export const VISITOR_COOKIE = "cvt_vid";

/**
 * Request header the proxy uses to forward the visitor id to the same request's
 * render. On a visitor's first request the cookie isn't on the request yet (the
 * proxy only just minted it), so the header is the source of truth; the cookie
 * covers every subsequent request.
 */
export const VISITOR_HEADER = "x-cvt-vid";

/**
 * Resolve the current visitor's stable id for server-side bucketing. Prefers
 * the proxy-forwarded header, falls back to the cookie, and returns `null` if
 * neither is present (only reachable if a request bypasses the proxy). Callers
 * treat `null` as "don't bucket" and serve control — never collapse missing
 * ids onto a shared sentinel, which would bias every such visitor into the
 * same variation.
 */
export async function getVisitorId(): Promise<string | null> {
  const headerStore = await headers();
  const fromHeader = headerStore.get(VISITOR_HEADER);
  if (fromHeader) return fromHeader;

  const cookieStore = await cookies();
  return cookieStore.get(VISITOR_COOKIE)?.value ?? null;
}
