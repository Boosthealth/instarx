import { redirect } from "next/navigation";

// Catch-all for unknown URLs. These are visitors landing on paths we never
// shipped (typo'd ad links, bad email/QR URLs), so there's nothing to render
// and nothing indexed to protect — we send them straight to the homepage.
//
// Server-side rather than a client-side timer: no flash of a 404 page, no
// dependency on JS running. The response keeps a real 404 status with a
// `Location: /?from=404` header — browsers follow it to the homepage, while
// crawlers see an honest "not found" (so no soft-404 / indexing harm).
//
// `?from=404` is a deliberate, dedicated marker — NOT a utm_* param. It lets us
// segment "redirected from a dead URL" sessions in analytics (it rides the
// homepage $pageview's $current_url) without overwriting the visitor's real
// utm_source. Note it is intentionally outside attribution.ts's capture keys,
// so it never enters the ix_attribution cookie or follows the user to the
// funnel.
export default function NotFound(): never {
  redirect("/?from=404");
}
