"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const GTM_ID = "GTM-NPDBMQX2";
const POSTHOG_KEY = "phc_5dyMpbsb6sk28QyTlgtcnXfR0PrpPBvgAZlRL6Syrmy";
const POSTHOG_API_HOST = "https://us.i.posthog.com";

// Pages that embed Savvy/Embeddables flows. Those flows ship their own
// GTM/analytics, so loading ours here double-fires and collides. Keep this
// list in sync with the pages that render <EmbeddablesScript />.
// Note: "/" is the Savvy embeddables flow; the marketing site that used
// to live at "/" now lives at "/weight-loss" (which DOES get analytics).
const EMBEDDABLES_ROUTES = new Set([
  "/",
  "/intake",
  "/intake01",
  "/glp1-weight-loss",
]);

export default function AnalyticsScripts() {
  const pathname = usePathname();

  // Skip on embeddables pages — their third-party flow handles analytics.
  if (pathname !== null && EMBEDDABLES_ROUTES.has(pathname)) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
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

      {/* PostHog */}
      <Script id="posthog" strategy="afterInteractive">
        {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('${POSTHOG_KEY}', {
  api_host: '${POSTHOG_API_HOST}',
  capture_pageleave: true,
  defaults: '2026-01-30'
});`}
      </Script>
      {/* End PostHog */}
    </>
  );
}
