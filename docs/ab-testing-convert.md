# Server-side A/B testing with Convert.com

Server-side experimentation using the **Convert.com Full-Stack SDK**
([`@convertcom/js-sdk`](https://www.npmjs.com/package/@convertcom/js-sdk)).
Variations are decided on the server and delivered in the HTML, so there is no
client-side flicker (no CLS) and no flash of the control variant.

**Last updated:** 2026-06-25

## ⚡ Operational quick-reference (read this BEFORE touching Convert / `experiments.ts`)

**Source of truth for what's actually live** (public, no auth):
`https://cdn-4.convertexperiments.com/api/v1/config/10049347/100417921`
(Drafts do NOT appear here until activated; the server-side SDK reads this config.)

### Current live experiments (2026-06-25)

| Display name | Experience KEY (the SDK matches this string) | Route | Type | Status |
| --- | --- | --- | --- | --- |
| homepage_lander_split_v4 | `hmpg-lndr-splt-cln-cln-clone` | `/` | redirect | **active** |
| glp_funnel_split | `glp_funnel_split` | `/intake` | redirect | active |
| weight_loss_hero | `weight_loss_hero` | `/weight-loss` | content | as configured |

**Homepage split** — `HOMEPAGE_LANDER_SPLIT_DESTINATIONS` in `app/lib/experiments.ts`:

| Variation key | → Lander | Alloc |
| --- | --- | --- |
| `1004476830-variation-1` | `/start-glp1` (blue) | 33% |
| `1004476831-variation-2` | `/glp2` (pink) | 33% |
| `variation-3` | `/glp2-v2` (Pink 3.0) | 34% |
| Original | stay on homepage | 0% |

**Funnel split** — `GLP_FUNNEL_SPLIT_DESTINATIONS`:

| Variation key | → Funnel | Alloc |
| --- | --- | --- |
| `variation_1` | `start.instarx.com` | 34% |
| `variation_2` | `quiz.instarx.com` | 33% |
| `variation_3` | `intake.instarx.com` | 33% |
| `control` | stay on `/intake` | 0% |

> ⚠️ **Who owns what:** Convert owns the experience key, variation keys, and traffic %. The **code** owns the destinations (`*_DESTINATIONS` maps) and which routes run a test (`proxy.ts` matcher). To change where an arm points, edit the map + PR — **not** the Convert UI.

### Hard-won gotchas (each has cost us deploys)

1. **Can't add a variation to a STARTED experiment** → you must **Clone** it into a new draft (that's why we're on v4).
2. **Cloning re-mangles ALL keys** (experience + each variation get fresh `<id>-variation-N` prefixes) and **keys lock once Active**. The SDK matches on the key *string*, so after a clone you MUST re-point `experiments.ts` to the new keys or the whole split breaks. Read the real keys from the Convert Edit-Variation dialogs (draft) or the CDN config (active) — **never guess**.
3. **Set clean keys in the draft before activating** where you can (e.g. `variation-3`) — they lock on Activate.
4. **CDN propagation ≈ 2 min.** A freshly-activated experience isn't in the public config (which the SDK reads) for ~2 min. Deploying code that points at a not-yet-propagated key = stranding.
5. **Deploy order to avoid stranding** (`/` is bucketed server-side; a missing/locked key → bare homepage for everyone): **activate the NEW experience → confirm it's in the CDN config → deploy the code → THEN pause the OLD one.** Never pause the old before the new code is live.
6. **Verifying live:** a fresh `curl https://go.instarx.com/` (no cookie) DOES get bucketed — it 302s to a lander; sample ~15 to see the split. Headless *browsers* can trip the Vercel checkpoint and not bucket — so the authoritative state is the CDN config URL above.
7. **UTM pass-through:** the proxy copies inbound params onto the lander redirect AND stores them in the `.instarx.com` `ix_attribution` cookie; at `/intake` it re-attaches them onto the funnel redirect (the lander→`/intake` click is client-routed and strips the URL query, so the params ride the **cookie**). Embeddables then persists them to checkout/thank-you (~85–90% reach `/thank-you`). Attribute off the **first landing pageview**, not the thank-you URL.

### Playbook: add a new lander arm to the homepage split

1. Build the lander page (e.g. `/glp2-v2`); its CTA must point at `https://go.instarx.com/intake`. Add its path to `HOMEPAGE_LANDER_PATHS` in `app/components/CtaClickTracker.tsx` (so the CTA-click goal fires).
2. In Convert: **Clone** the current homepage experience → new draft (`vN+1`). Add the new variation (hand-key it clean, e.g. `variation-3`). Set allocation (Original stays 0%).
3. Grab the keys: experience key from the Experiences list **"Key" column**; each variation key from its `•••` → **Edit**.
4. Update `app/lib/experiments.ts`: `HOMEPAGE_LANDER_SPLIT_EXPERIENCE` = new experience key; `HOMEPAGE_LANDER_SPLIT_DESTINATIONS` = `{ variation key → lander URL }`. PR to `main`.
5. **Go live in this order:** activate the new experience → confirm it's in the CDN config (~2 min) → merge/deploy → confirm `/glp2-vN` is being served (sample fresh curls) → **pause the old experience.**

### Changelog

- **2026-06-25** — Homepage split: added `/glp2-v2` (Pink 3.0) as a 3rd arm. Cloned v3 → **v4** (`homepage_lander_split_v4`, key `hmpg-lndr-splt-cln-cln-clone`); blue 33 / pink 33 / glp2-v2 34. PR #35.
- **2026-06-21** — Homepage split v2 → **v3** (`hmpg-lndr-splt-cln-cln`): dropped the losing `/glp2-da` (Pink 2.0) arm, rebalanced blue/pink to 50/50. PR #31.
- **2026-06-19** — Homepage split: added `/glp2-da` (Pink 2.0) as a 3rd arm via the v2 clone (`homepage-lander-split-clone`). PRs #27 / #28 / #29 (the key-mangling fixes).
- **2026-06-16** — `glp_funnel_split` `variation_1` destination changed `go.instarx.com/intake01` → `start.instarx.com`. PR #25.
- **2026-06-02** — Initial server-side Convert setup (`weight_loss_hero` content test + `glp_funnel_split` redirect test).

## Why bucketing runs in the Server Component (not the proxy)

Both layers run on Node in Next.js 16 (the proxy — Next 16's renamed
"middleware" — runs on the Node.js runtime), and the Convert SDK is fetch-based,
so either layer _could_ host it. We deliberately put the bucketing decision in
the **React Server Component** because:

- The variation is a **component-level content decision**, so it belongs in the
  render path. This is also Convert's documented server-side usage pattern.
- It means we only bucket when a page actually **renders** — not on prefetches,
  HEAD requests, or other proxy-matched traffic.

The proxy (`proxy.ts`) is kept minimal: its only job is to mint/forward the
stable visitor id so bucketing is consistent across requests.

```
request ─▶ proxy.ts (Node)                 ─▶ /weight-loss page.tsx (Node RSC)
            • read/mint `cvt_vid` cookie         • getVisitorId()  (header → cookie)
            • forward via `x-cvt-vid` header      • getVariationKey(exp, visitorId)  ← Convert SDK
            • persist cookie for next time        • render <Hero variant={…} />
```

> Content variations work this way. **Split-URL / redirect** tests are the
> exception: there's no page to render for a redirected arm, so the decision has
> to happen before render. Those bucket in the **proxy** and 302 the visitor —
> see the `/intake` funnel split below.

## Files

| File                                                                              | Role                                                                                                     |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`proxy.ts`](../proxy.ts)                                                         | Assigns the `cvt_vid` visitor cookie + `x-cvt-vid` header. Matched routes only.                          |
| [`app/lib/convert.ts`](../app/lib/convert.ts)                                     | `server-only` Convert SDK singleton. `getVariationKey()` + `trackConversion()`, both degrade gracefully. |
| [`app/lib/visitor.ts`](../app/lib/visitor.ts)                                     | `getVisitorId()` — reads the forwarded header, falls back to the cookie, else `null` (→ control).        |
| [`app/lib/experiments.ts`](../app/lib/experiments.ts)                             | Experiment/variation keys + variant normalisation. No SDK import.                                        |
| [`app/(pages)/weight-loss/page.tsx`](<../app/(pages)/weight-loss/page.tsx>)       | First experiment: buckets the visitor and passes `variant` to `<Hero>`.                                  |
| [`app/components/modules/home/Hero.tsx`](../app/components/modules/home/Hero.tsx) | Renders `control` vs `variation_1` (headline + primary CTA).                                             |

## Configuration

Copy `.env.example` to `.env.local` and fill in the SDK key from your Convert
Full-Stack project (Configuration → SDK Config & Keys):

```bash
CONVERT_SDK_KEY=...          # SDK key (NOT the REST API application key)
CONVERT_SDK_KEY_SECRET=      # optional — only for an Authenticated key
CONVERT_ENVIRONMENT=production
```

**Key types:** an **unauthenticated** SDK key works on its own (leave
`CONVERT_SDK_KEY_SECRET` empty) — this is the current setup. An **Authenticated**
key additionally has a secret; it's the more secure choice for server-side use
because the project config can't be fetched without the secret. The integration
supports both: set `CONVERT_SDK_KEY_SECRET` and it's sent automatically.
Either way the key stays server-side only (never `NEXT_PUBLIC_`).

**Graceful fallback:** with no `CONVERT_SDK_KEY`, `getVariationKey()` returns
`null` and every visitor sees the **control** experience. The site is fully
functional before credentials are added — handy for local review.

## The first experiment: `/weight-loss` hero

- **Experience key:** `weight_loss_hero` (`WEIGHT_LOSS_HERO_EXPERIENCE`)
- **Variations:** `control`, `variation_1`

In the Convert dashboard, create a **Full-Stack (server-side) experience** with
the experience key `weight_loss_hero` and two variations keyed exactly
`control` and `variation_1`. The keys must match the strings in
`app/lib/experiments.ts`.

| Variation     | Headline                                          | Primary CTA     |
| ------------- | ------------------------------------------------- | --------------- |
| `control`     | "Drop up to 1-2lbs per week!"                     | "Start Quiz →"  |
| `variation_1` | "Doctor-prescribed GLP-1, delivered to your door" | "Get Started →" |

> `/weight-loss` is now **dynamically rendered** (it reads per-visitor
> headers/cookies). That's required for per-visitor bucketing and is expected.

### Forcing a variant while testing

`variation_1` only renders once Convert is configured and buckets the visitor
into it. To eyeball the variant locally without the dashboard, temporarily pass
`variant="variation_1"` to `<Hero>` in the page, or have `getVariationKey`
return `"variation_1"`. Revert before committing.

## The second experiment: `/intake` GLP-1 funnel split (redirect test)

A **split-URL test**, not a content variation. Visitors landing on `/intake`
are bucketed in `proxy.ts` and 302-redirected to a different intake funnel per
variation. Keys live in `app/lib/experiments.ts`.

- **Experience key:** `glp_funnel_split` (`GLP_FUNNEL_SPLIT_EXPERIENCE`)
- **Variations & actions:**

| Variation     | Dashboard allocation | Action                                                          |
| ------------- | -------------------- | --------------------------------------------------------------- |
| `control`     | 0%                   | No redirect — stay on `/intake` (renders the local intake flow) |
| `variation_1` | 34%                  | 302 → `https://start.instarx.com/`                              |
| `variation_2` | 33%                  | 302 → `https://quiz.instarx.com/`                               |
| `variation_3` | 34%                  | 302 → `https://intake.instarx.com/`                             |

In the Convert dashboard, create a **Full-Stack (server-side) experience** keyed
`glp_funnel_split` with four variations keyed exactly `control`, `variation_1`,
`variation_2`, `variation_3`, and set the allocation above. Allocation is owned
by the dashboard; the code just maps whatever key Convert returns to a
destination. `control`, a bucketing miss, or any unrecognised key → no redirect
(stay on `/intake`), so the page is always safe to serve.

The redirect destinations live in `GLP_FUNNEL_SPLIT_DESTINATIONS`; update that
map (not the dashboard) to change where an arm points.

**Cross-domain attribution.** Each redirect carries the visitor id as a query
param: `…?cvt_vid=<id>`. The funnel domains can't read our `cvt_vid` cookie
(it's host-only), so this is how a purchase on the funnel gets tied back to the
variation we assigned here — see "Tracking conversions" below. Bucketing is also
skipped for prefetch/crawler traffic (`isNonHumanRequest` in `proxy.ts`) so bots
don't consume allocations.

## Adding another experiment

**Content variation** (render different markup, no URL change):

1. Add the experience/variation keys to `app/lib/experiments.ts`.
2. Add the route to the `matcher` in `proxy.ts` (so visitors get a `cvt_vid`).
3. In the page's Server Component: `const v = await getVariationKey(KEY, await getVisitorId())`.
4. Branch your component on the normalised variant.

**Split-URL / redirect** (send arms to different URLs, like `/intake`):

1. Add the experience key + a destination map to `app/lib/experiments.ts`.
2. Add the route to the `matcher` in `proxy.ts`.
3. In `routeResponse()` in `proxy.ts`, branch on the path, call
   `getVariationKey(KEY, visitorId)`, and `NextResponse.redirect(dest, 302)`
   when the key maps to a destination (else `NextResponse.next()`).

## Tracking conversions

The goal key must match a goal configured in Convert. **How** you fire it
depends on where the conversion happens.

### A goal that fires inside this app

```ts
import { trackConversion } from "@/app/lib/convert";
import { getVisitorId } from "@/app/lib/visitor";

await trackConversion("started_intake", await getVisitorId());
```

Call this from a Server Action or Route Handler (Node runtime) at the point the
goal fires. `trackConversion` flushes the event before it returns (see "Event
flushing" below), so it's safe in a short-lived handler.

### A goal that fires on a redirect funnel (e.g. `glp_funnel_split` → `purchase`)

The funnel split redirects to **external domains** (`go.`/`quiz.`/`intake.`
instarx.com). The purchase happens there, not in this app, so we can't call
`trackConversion` from here — and a client-side `convert.track()` on the funnel
won't work either: it has no access to the server-side bucketing record, and the
funnel domain can't read our host-only `cvt_vid` cookie.

The conversion must be reported to Convert **with the same `cvt_vid`** we
bucketed on. We hand that id to the funnel via the `?cvt_vid=<id>` query param on
the redirect (see above). The funnel then reports the goal keyed on that id, by
either:

- **REST track API** — `POST https://<track-endpoint>/track/<sdk_key>` with the
  `cvt_vid` and the goal, from the funnel's checkout-success server event; or
- **Webhook → this app** — the funnel/payment platform calls a Route Handler
  here on purchase, passing the `cvt_vid`, and that handler calls
  `trackConversion("purchase", cvtVid)`.

A client-side `convert.track('purchase')` on the funnel is **not** sufficient on
its own and won't attribute to the Full-Stack experience.

## Event flushing (serverless)

Bucketing and conversion events are queued by the SDK and, by default, only sent
on a ~10s batch timer — which never fires before a serverless invocation ends.
`getVariationKey` and `trackConversion` therefore call `context.releaseQueues()`
to flush synchronously before returning. Without that, Convert records **no**
data (the experiment looks like it has zero traffic). Any new code path that
buckets or tracks must flush the same way.
