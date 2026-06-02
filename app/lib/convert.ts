import "server-only";

/**
 * Server-side Convert.com Full-Stack SDK integration.
 *
 * Bucketing runs here, from React Server Components, rather than from the proxy
 * (proxy.ts). This is a deliberate design choice — the variation is a
 * component-level content decision, and keeping it in the render path means we
 * only bucket when a page actually renders (not on prefetches / HEAD / other
 * proxy-matched traffic). The proxy's only job is to mint the stable visitor id.
 *
 * (Note: in Next.js 16 the proxy runs on the Node.js runtime, and the SDK is
 * fetch-based, so either layer *could* host the SDK. The split above is about
 * where the decision belongs, not a runtime constraint.)
 *
 * Every public helper degrades gracefully: if `CONVERT_SDK_KEY` is unset, or
 * the CDN config can't be fetched, or bucketing errors out, we return `null`
 * (→ the caller renders the control experience). This keeps the site fully
 * functional before any Convert credentials are wired in.
 */
import ConvertSDK, {
  type ConvertConfig,
  type BucketedVariation,
  type ConversionAttributes,
} from "@convertcom/js-sdk";

const SDK_KEY = process.env.CONVERT_SDK_KEY;
const SDK_KEY_SECRET = process.env.CONVERT_SDK_KEY_SECRET;
const ENVIRONMENT = process.env.CONVERT_ENVIRONMENT ?? "production";

// Hard ceiling on how long the FIRST request will wait for the SDK to fetch its
// config from Convert's CDN. On timeout we fall back to control rather than
// blocking. Kept short because this also sits on a redirect hot-path
// (proxy.ts) — a cold-start visitor shouldn't stare at a stalled tab.
const ON_READY_TIMEOUT_MS = 1500;
// How often the SDK refreshes the project config from the CDN (5 minutes).
const DATA_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

type Sdk = InstanceType<typeof ConvertSDK>;
type Context = NonNullable<ReturnType<Sdk["createContext"]>>;

// Module-level singleton: reused across warm server invocations so we don't
// re-fetch the project config on every request. (Each serverless cold start
// still does one initial fetch — that's expected.)
let sdkInstance: Sdk | null = null;

function getSdk(): Sdk {
  if (!SDK_KEY) {
    // Callers guard on SDK_KEY before reaching here; this makes a future
    // mis-call loud instead of silently constructing a misconfigured SDK.
    throw new Error("getSdk() called without CONVERT_SDK_KEY set");
  }
  if (!sdkInstance) {
    const config: ConvertConfig = SDK_KEY_SECRET
      ? {
          sdkKey: SDK_KEY,
          sdkKeySecret: SDK_KEY_SECRET,
          environment: ENVIRONMENT,
          dataRefreshInterval: DATA_REFRESH_INTERVAL_MS,
        }
      : {
          sdkKey: SDK_KEY,
          environment: ENVIRONMENT,
          dataRefreshInterval: DATA_REFRESH_INTERVAL_MS,
        };
    sdkInstance = new ConvertSDK(config);
  }
  return sdkInstance;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timerId: ReturnType<typeof setTimeout>;
  const timeout = new Promise<T>((_, reject) => {
    timerId = setTimeout(
      () => reject(new Error(`Convert SDK timed out after ${ms}ms`)),
      ms,
    );
  });
  // clearTimeout on settle so the timer doesn't keep the event loop alive or
  // pin the promise chain in memory once the race is decided.
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timerId));
}

/**
 * Ensure the SDK has config loaded. Awaits the initial CDN fetch only on the
 * first call (when `sdk.data` is empty). Once config is present we proceed with
 * it directly — the SDK reassigns its internal ready-promise on every 5-minute
 * background refresh, so awaiting `onReady()` unconditionally would block every
 * request that lands inside a refresh window.
 */
async function ensureReady(sdk: Sdk): Promise<void> {
  if (!sdk.data) {
    await withTimeout(sdk.onReady(), ON_READY_TIMEOUT_MS);
  }
}

/**
 * Force-send any queued tracking events (impressions, conversions) to Convert
 * now, awaiting the network POST. Required on serverless: the SDK batches
 * events behind a ~10s timer (DEFAULT_RELEASE_INTERVAL) that never fires before
 * a short-lived invocation ends — so without an explicit flush the proxy
 * redirect / RSC response is sent and the process freezes with the event still
 * queued, and Convert records nothing. Never throws: delivery is best-effort
 * and must not break the request or change the bucketing decision.
 */
async function flushEvents(context: Context, reason: string): Promise<void> {
  try {
    await context.releaseQueues(reason);
  } catch (error) {
    console.error(`[convert] failed to flush events (${reason}):`, error);
  }
}

/** True when a Convert SDK key is configured via env. */
export function isConvertConfigured(): boolean {
  return Boolean(SDK_KEY);
}

/**
 * Bucket a visitor into an experience and return the chosen variation key,
 * or `null` if Convert isn't configured / there's no visitor id / the visitor
 * isn't bucketed / an error occurs. Callers should map `null` to control.
 */
export async function getVariationKey(
  experienceKey: string,
  visitorId: string | null,
  visitorAttributes?: Record<string, unknown>,
): Promise<string | null> {
  if (!SDK_KEY || !visitorId) return null;

  try {
    const sdk = getSdk();
    await ensureReady(sdk);

    const context = sdk.createContext(visitorId, visitorAttributes);
    if (!context) return null;

    // runExperience returns a BucketedVariation (object) on success, or a
    // RuleError / BucketingError (plain string) when the visitor isn't bucketed.
    //
    // ignoreLocationProperties: this is a server-side, key-targeted call — the
    // route we run on (proxy.ts matcher) already decides "where" we are, so we
    // never hand Convert a URL/location to match. Without this flag the SDK's
    // rule matcher treats every experience as location-gated, finds no
    // locationProperties, logs "Location does not match", and refuses to bucket
    // (returns null → control) for ALL visitors. Audience + traffic allocation
    // still apply.
    const result = context.runExperience(experienceKey, {
      ignoreLocationProperties: true,
    });

    // Send the impression/visit event now (see flushEvents) — otherwise the
    // experiment records no bucketing data on serverless. No-op if nothing was
    // queued (e.g. visitor not bucketed).
    await flushEvents(context, "bucketing");

    if (result !== null && typeof result === "object") {
      const key = (result as BucketedVariation).key;
      if (typeof key === "string") return key;
    }
    return null;
  } catch (error) {
    console.error(`[convert] failed to bucket "${experienceKey}":`, error);
    return null;
  }
}

/**
 * Report a conversion (goal) for a visitor. No-op when Convert isn't
 * configured or there's no visitor id; never throws.
 */
export async function trackConversion(
  goalKey: string,
  visitorId: string | null,
  attributes?: ConversionAttributes,
): Promise<void> {
  if (!SDK_KEY || !visitorId) return;

  try {
    const sdk = getSdk();
    await ensureReady(sdk);
    const context = sdk.createContext(visitorId);
    if (!context) return;
    context.trackConversion(goalKey, attributes);
    // Flush before the invocation ends, same reason as bucketing.
    await flushEvents(context, "conversion");
  } catch (error) {
    console.error(`[convert] failed to track "${goalKey}":`, error);
  }
}
