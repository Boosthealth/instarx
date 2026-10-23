// care.instarx.com (INS-730): a /glp2 copy for Pinterest campaigns whose CTAs
// skip the go.instarx.com/intake funnel router and go straight to the Rimo
// weight-management intake. proxy.ts rewrites the host's root to the lander
// route, so the browser keeps care.instarx.com/ and its query string.
export const CARE_HOST = "care.instarx.com";
export const CARE_LANDER_PATH = "/glp2-care";
export const CARE_INTAKE_URL =
  "https://my.instarx.com/intake/weight-management";
