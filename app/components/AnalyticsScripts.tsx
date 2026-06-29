"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const GTM_ID = "GTM-NPDBMQX2";
const POSTHOG_KEY = "phc_5dyMpbsb6sk28QyTlgtcnXfR0PrpPBvgAZlRL6Syrmy";
const POSTHOG_API_HOST = "https://us.i.posthog.com";

// Pages that embed Savvy/Embeddables flows. The third-party flow owns PostHog
// on these routes, so we keep OUR PostHog off them to avoid collisions/
// double-firing. GTM, however, loads everywhere (the GTM container itself
// manages the marketing scripts and tag de-duping), so it is NOT gated here.
// Must stay in sync with the pages that render <EmbeddablesScript />.
const EMBEDDABLES_ROUTES = new Set([
  "/",
  "/glp1",
  "/intake",
  "/intake01",
  "/nad_plus_intake",
  "/nad-quiz",
  "/glp1-weight-loss",
]);

export default function AnalyticsScripts() {
  const pathname = usePathname();

  // PostHog is skipped on embeddables pages (their flow handles it); GTM loads
  // on every page.
  const skipPostHog = pathname !== null && EMBEDDABLES_ROUTES.has(pathname);

  // Defer analytics to page-idle on the glp2-v2 lander ONLY, so the ~900KB of
  // marketing/analytics JS doesn't compete with its hero LCP + interactivity.
  // Every other route keeps the original `afterInteractive` timing untouched.
  const analyticsStrategy =
    pathname === "/glp2-v2" ? "lazyOnload" : "afterInteractive";

  return (
    <>
      {/* Google Tag Manager. On glp2-v2 it's lazyOnload (loads after page-idle);
          elsewhere afterInteractive. The gtm.start timestamp is captured inline
          either way, so timing attribution is preserved and pageview/conversion
          tags still fire. */}
      <Script id="gtm" strategy={analyticsStrategy}>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      {/* End Google Tag Manager */}

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}

      {/* PostHog — skipped on embeddables pages (their flow handles it) */}
      {!skipPostHog && (
        <Script id="posthog" strategy={analyticsStrategy}>
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('${POSTHOG_KEY}', {
  api_host: '${POSTHOG_API_HOST}',
  capture_pageleave: true,
  defaults: '2026-01-30'
});`}
        </Script>
      )}
      {/* End PostHog */}
    </>
  );
}
