#!/usr/bin/env node
/**
 * Injects the universal disclaimer + footer into the static ED landers in
 * public/ed/ and points every remaining placeholder CTA at the intake funnel.
 *
 * Idempotent: each run strips the previously injected blocks (delimited by
 * HTML comment markers) and re-inserts them, so re-running after editing the
 * copy below or public/ed/universal.css is the whole update procedure:
 *
 *   node scripts/ed-landers-universal.mjs
 *
 * The footer is a static copy of app/components/Footer.tsx (the one /glp2
 * renders). Keep the two in step.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ED_DIR = join(ROOT, "public", "ed");

/** Where every CTA on the landers goes (PRO-847). */
export const INTAKE_HREF = "https://my.instarx.com/intake/weight-management";
/** Placeholder host the landers were exported with. */
const PLACEHOLDER_HREF = "https://spray.instarx.com/";

/** Bump when universal.css changes so cached landers pick it up. */
const CSS_VERSION = "2026101303";

const HEAD_START = "<!-- irx-universal-head:start -->";
const HEAD_END = "<!-- irx-universal-head:end -->";
const BODY_START = "<!-- irx-universal:start -->";
const BODY_END = "<!-- irx-universal:end -->";

const HEAD_BLOCK = `${HEAD_START}<link rel="stylesheet" href="/ed/universal.css?v=${CSS_VERSION}">${HEAD_END}`;

/* Disclaimer copy is the client's text from PRO-847, verbatim. */
const DISCLAIMER_HTML = `<section class="irx-u-legal" aria-labelledby="irx-u-legal-title">
  <div class="irx-u-wrap">
    <h2 id="irx-u-legal-title">Important disclaimer</h2>
    <p>This is an advertisement published by InstaRx Health, which sells InstaReady. It is a comparison written by an interested party and should be read as such. InstaReady is a compounded medication available by prescription following review by a US-licensed physician and dispensed by a US compounding pharmacy.</p>
    <p>The compounded combination is not FDA-approved as a combination product. The individual active ingredients are FDA-approved medicines; apomorphine is FDA-approved in the United States for a different indication. The FDA does not verify the safety or effectiveness of compounded drugs. Individual results may vary.</p>
    <p><strong>DO NOT USE IF YOU TAKE NITRATES, INCLUDING NITROGLYCERIN. THIS IS A HARD CONTRAINDICATION.</strong> Not suitable for men with severe uncontrolled hypertension, unstable cardiovascular disease or recent stroke. Apomorphine interacts with certain Parkinson's medications. Possible side effects include headache, flushing, nasal congestion, dizziness and nausea. Seek immediate medical attention for an erection lasting more than four hours.</p>
    <p>All customer quotes, stories and profile photographs on this page are dramatizations based on composite customer experience. Names, images and details are not those of specific individuals and no image depicts a real customer. Product and format photography is illustrative and does not depict any specific manufacturer's product. This content is not medical advice. Consult your healthcare provider before starting any new medication.</p>
    <p>Treatment category descriptions reflect manufacturer published information and clinical literature at the time of writing. References to third-party brands are for editorial comparison only. InstaRx is not affiliated with or endorsed by any of them.</p>
    <p><strong>THIS IS AN ADVERTISEMENT. INDIVIDUAL RESULTS MAY VARY.</strong></p>
  </div>
</section>`;

const SOCIAL = [
  {
    href: "https://www.instagram.com/instarx.telehealth/",
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    href: "https://x.com/InstaRx",
    label: "X (Twitter)",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61582109890024",
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    href: "https://www.youtube.com/@InstaRxllc",
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const COLUMNS = [
  {
    heading: "Weight Loss",
    links: [
      {
        label: "Semaglutide Injections",
        href: "/safety/compounded-semaglutide",
      },
      {
        label: "Tirzepatide Injections",
        href: "/safety/compounded-tirzepatide",
      },
    ],
  },
  {
    heading: "Anti Aging",
    links: [{ label: "NAD+ Injections", href: "/safety/nad-plus" }],
  },
  {
    heading: "Support",
    links: [
      { label: "How It Works", href: "/glp1/how-it-works" },
      { label: "Refund Policy", href: "/policies/refund-policy" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

const CARDS = [
  { src: "/images/cards/visa.svg", alt: "Visa" },
  { src: "/images/cards/mastercard.svg", alt: "Mastercard" },
  { src: "/images/cards/discover.svg", alt: "Discover" },
  { src: "/images/cards/amex.svg", alt: "American Express" },
];

const BOTTOM_LINKS = [
  { label: "Safety", href: "/policies/safety" },
  { label: "Shipping and Refund Policy", href: "/policies/refund-policy" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Terms of Use", href: "/policies/terms-and-conditions" },
  { label: "Telehealth Consent", href: "/policies/telehealth-consent" },
  { label: "Contact Us", href: "/contact-us" },
];

const socialHtml = SOCIAL.map(
  (s) =>
    `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${s.path}"/></svg></a>`,
).join("\n          ");

const columnsHtml = COLUMNS.map(
  (c) => `<div>
          <h3>${c.heading}</h3>
          <ul>
            ${c.links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("\n            ")}
          </ul>
        </div>`,
).join("\n        ");

const cardsHtml = CARDS.map(
  (c) =>
    `<img src="${c.src}" alt="${c.alt}" width="64" height="32" loading="lazy">`,
).join("\n        ");

const bottomLinksHtml = BOTTOM_LINKS.map(
  (l) => `<a href="${l.href}">${l.label}</a>`,
).join("\n          ");

const FOOTER_HTML = `<div class="irx-u-footer" role="contentinfo">
  <div class="irx-u-wrap">
    <div class="irx-u-top">
      <div class="irx-u-brand">
        <a class="irx-u-logo" href="/" aria-label="InstaRx home"><img src="/logos/instarx-logo-inverse.webp" alt="InstaRx" width="200" height="60" loading="lazy"></a>
        <p class="irx-u-contact-label">Contact Us:</p>
        <div class="irx-u-contact">
          <p><a href="mailto:patientcare@instarx.com">patientcare@instarx.com</a></p>
          <p><a href="tel:+18666738730">(866) 673-8730</a></p>
        </div>
        <div class="irx-u-social">
          ${socialHtml}
        </div>
      </div>
      <div class="irx-u-cols">
        ${columnsHtml}
      </div>
    </div>
    <div class="irx-u-cards">
        ${cardsHtml}
    </div>
    <div class="irx-u-trust">
      <div class="irx-u-badges">
        <img src="/images/badges/hipaa-seal.svg" alt="HIPAA Compliant" width="84" height="84" loading="lazy">
        <a href="https://www.legitscript.com/websites/?checker_keywords=instarx.com" target="_blank" rel="noopener noreferrer"><img src="/images/badges/legitscript.svg" alt="LegitScript Certified" width="84" height="84" loading="lazy"></a>
      </div>
      <div class="irx-u-secure">
        <p class="irx-u-secure-title">Secure &amp; Encrypted</p>
        <p class="irx-u-secure-sub">Your information is encrypted and protected. We never sell your data.</p>
      </div>
    </div>
    <div class="irx-u-bottom">
      <p class="irx-u-copy">&copy; 2026 InstaRX. All rights reserved.</p>
      <div class="irx-u-bottom-links">
          ${bottomLinksHtml}
      </div>
    </div>
  </div>
</div>`;

/**
 * Per-page placement. `anchor` is a unique string the block is inserted
 * BEFORE. Pages with their own footer (`footer: false`) only get the
 * disclaimer, placed above that footer; the rest get disclaimer + footer
 * at the end of <body>.
 */
const PAGES = [
  {
    // Inside the Framer <footer>, between its trust strip and the footer proper.
    file: "lander-a-quad.html",
    footer: false,
    anchor: '<div class="framer-5e0x37" data-framer-name="Footer wrapper"',
  },
  {
    file: "lander-b-prequiz.html",
    footer: false,
    anchor: '<div class="wf:pt-36 wf:sm:pt-24">',
  },
  { file: "lander-c-braverx.html", footer: true, anchor: "</body>" },
  { file: "instaready.html", footer: true, anchor: "</body>" },
  { file: "primed.html", footer: true, anchor: "</body>" },
  { file: "instaready-comparison.html", footer: true, anchor: "</body>" },
  { file: "instaready-listicle.html", footer: true, anchor: "</body>" },
];

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* A block is always inserted as "\n<block>\n" straight before its anchor and
 * stripped as exactly that, so a re-run restores the pre-injection bytes and
 * then re-inserts: byte-for-byte idempotent whatever surrounds the anchor. */
function stripBetween(html, start, end) {
  const re = new RegExp(
    `\\n${escapeRe(start)}[\\s\\S]*?${escapeRe(end)}\\n`,
    "g",
  );
  return html.replace(re, "");
}

function insertBefore(html, anchor, block, file) {
  const count = html.split(anchor).length - 1;
  if (count !== 1) {
    throw new Error(
      `${file}: expected exactly one "${anchor}", found ${count}`,
    );
  }
  return html.replace(anchor, `\n${block}\n${anchor}`);
}

let changed = 0;
for (const page of PAGES) {
  const path = join(ED_DIR, page.file);
  const before = readFileSync(path, "utf8");
  let html = before;

  html = stripBetween(html, HEAD_START, HEAD_END);
  html = stripBetween(html, BODY_START, BODY_END);

  html = insertBefore(html, "</head>", HEAD_BLOCK, page.file);

  const body = `${BODY_START}\n<div class="irx-u">\n${DISCLAIMER_HTML}${page.footer ? `\n${FOOTER_HTML}` : ""}\n</div>\n${BODY_END}`;
  html = insertBefore(html, page.anchor, body, page.file);

  html = html.split(PLACEHOLDER_HREF).join(INTAKE_HREF);

  if (html !== before) {
    writeFileSync(path, html);
    changed += 1;
  }
  const leftovers = (html.match(/spray\.instarx\.com/g) || []).length;
  console.log(
    `${page.file}: ${page.footer ? "disclaimer + footer" : "disclaimer"}, ` +
      `${html.split(INTAKE_HREF).length - 1} intake links, ${leftovers} placeholder hosts left`,
  );
}
console.log(`${changed} file(s) written`);
