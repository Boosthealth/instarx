# Server-side A/B testing with Convert.com

Server-side experimentation using the **Convert.com Full-Stack SDK**
([`@convertcom/js-sdk`](https://www.npmjs.com/package/@convertcom/js-sdk)).
Variations are decided on the server and delivered in the HTML, so there is no
client-side flicker (no CLS) and no flash of the control variant.

**Last updated:** 2026-06-01

## Why bucketing runs in the Server Component (not the proxy)

Both layers run on Node in Next.js 16 (the proxy — Next 16's renamed
"middleware" — runs on the Node.js runtime), and the Convert SDK is fetch-based,
so either layer *could* host it. We deliberately put the bucketing decision in
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

> If we later want full-page **split-URL** tests (rewriting one URL to another),
> the bucketing can move into the proxy and drive a rewrite. That's a larger
> change; the current setup is the right fit for component/content variations.

## Files

| File | Role |
| --- | --- |
| [`proxy.ts`](../proxy.ts) | Assigns the `cvt_vid` visitor cookie + `x-cvt-vid` header. Matched routes only. |
| [`app/lib/convert.ts`](../app/lib/convert.ts) | `server-only` Convert SDK singleton. `getVariationKey()` + `trackConversion()`, both degrade gracefully. |
| [`app/lib/visitor.ts`](../app/lib/visitor.ts) | `getVisitorId()` — reads the forwarded header, falls back to the cookie, else `null` (→ control). |
| [`app/lib/experiments.ts`](../app/lib/experiments.ts) | Experiment/variation keys + variant normalisation. No SDK import. |
| [`app/(pages)/weight-loss/page.tsx`](<../app/(pages)/weight-loss/page.tsx>) | First experiment: buckets the visitor and passes `variant` to `<Hero>`. |
| [`app/components/modules/home/Hero.tsx`](../app/components/modules/home/Hero.tsx) | Renders `control` vs `variation_1` (headline + primary CTA). |

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

| Variation | Headline | Primary CTA |
| --- | --- | --- |
| `control` | "Drop up to 1-2lbs per week!" | "Start Quiz →" |
| `variation_1` | "Doctor-prescribed GLP-1, delivered to your door" | "Get Started →" |

> `/weight-loss` is now **dynamically rendered** (it reads per-visitor
> headers/cookies). That's required for per-visitor bucketing and is expected.

### Forcing a variant while testing

`variation_1` only renders once Convert is configured and buckets the visitor
into it. To eyeball the variant locally without the dashboard, temporarily pass
`variant="variation_1"` to `<Hero>` in the page, or have `getVariationKey`
return `"variation_1"`. Revert before committing.

## Adding another experiment

1. Add the experience/variation keys to `app/lib/experiments.ts`.
2. Add the route to the `matcher` in `proxy.ts` (so visitors get a `cvt_vid`).
3. In the page's Server Component: `const v = await getVariationKey(KEY, await getVisitorId())`.
4. Branch your component on the normalised variant.

## Tracking conversions

```ts
import { trackConversion } from "@/app/lib/convert";
import { getVisitorId } from "@/app/lib/visitor";

await trackConversion("started_intake", await getVisitorId());
```

Call this from a Server Action or Route Handler (Node runtime) at the point the
goal fires. The goal key must match a goal configured in Convert.
