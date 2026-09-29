import { GTM_SNIPPET, POSTHOG_SNIPPET } from "@/app/lib/analytics";
import { ATTRIBUTION_CAPTURE_SCRIPT } from "@/app/lib/attribution";

// The ED landers under public/ed/ are static HTML served through rewrites in
// next.config.ts, so they bypass the root layout and never get
// AnalyticsScripts or the attribution capture script. Each one loads this
// script synchronously at the top of <head> instead: attribution first (it must
// run before any CTA is clickable), then GTM and PostHog. None of the pages
// embeds Embeddables, so PostHog stays on.
export const dynamic = "force-static";

export function GET() {
  return new Response(
    [ATTRIBUTION_CAPTURE_SCRIPT, GTM_SNIPPET, POSTHOG_SNIPPET].join("\n"),
    {
      headers: {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    },
  );
}
