import { isAttributionKey } from "@/app/lib/attribution";

// Shared logic for the /weight-loss-goal and /weight-loss-goal-v2 pre-landers.
// Both arms render the same three goal options and forward attribution the same
// way; keeping it here stops the two copies from drifting (e.g. a goal value
// typo'd in one arm but not the other would silently split funnel data).

/** Closed set of goal values, forwarded as `?goal=` and fired as an analytics
 *  property. A literal union so a typo is a compile error, not a silent funnel
 *  data split. */
export type GoalValue = "up-to-20" | "21-50" | "51-plus";

export type Goal = {
  value: GoalValue;
  label: string;
};

export const GOALS: readonly Goal[] = [
  { value: "up-to-20", label: "Lose up to 20 lbs" },
  { value: "21-50", label: "Lose 21–50 lbs" },
  { value: "51-plus", label: "Lose 51+ lbs" },
] as const;

// Where every answer button sends the visitor. The bare homepage runs the
// homepage-lander split (see proxy.ts), so this pre-lander feeds straight into
// the existing experiment + funnel.
const DESTINATION = "https://go.instarx.com/";

// Build the destination URL, carrying ONLY the marketing-attribution params
// (utm_*, gclid, fbclid, ad_id, …) onto go.instarx.com, plus the chosen goal.
// We filter through the shared isAttributionKey() allow-list to skip the
// browser/analytics noise (HubSpot __hstc/__hssc/__hsfp, GA _gl, …) that would
// otherwise bloat the URL without adding attribution value. The proxy adds
// cvt_vid on the homepage redirect, so we don't carry it here.
//
// Attribution backstop note: proxy.ts does NOT match these pre-lander routes
// (its matcher is /, /weight-loss, /intake), so the server-side cookie writer
// doesn't run here. The ix_attribution cookie is still set client-side by the
// pre-hydration inline script in app/layout.tsx, which is the backstop when a
// click forwards no params. Callers read window.location.search synchronously
// (not via useEffect) so the href carries params even on a hydration-beating
// click.
export function buildGoalHref(goal: GoalValue, search: string): string {
  const target = new URL(DESTINATION);
  try {
    new URLSearchParams(search).forEach((value, key) => {
      if (value && isAttributionKey(key)) target.searchParams.set(key, value);
    });
  } catch {
    // Malformed location.search: forward the goal only. The ix_attribution
    // cookie (app/layout.tsx) remains the attribution backstop.
  }
  target.searchParams.set("goal", goal);
  return target.toString();
}

// Fire-and-forget analytics for a goal selection: a GTM dataLayer push plus an
// optional PostHog capture. Best-effort by design — navigation happens via the
// anchor href regardless, and we never block it on the network.
export function trackGoalSelected(goal: GoalValue): void {
  if (typeof window === "undefined") return;
  const dataLayer = (window.dataLayer ??= []);
  dataLayer.push({ event: "weight_loss_goal_selected", goal });
  window.posthog?.capture?.("weight_loss_goal_selected", { goal });
}
