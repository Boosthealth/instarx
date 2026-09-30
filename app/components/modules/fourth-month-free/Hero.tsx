import Image from "next/image";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { FreeLink, Stars } from "./display";
import { CtaLink } from "./ui";

export function Hero() {
  return <section className="m4-hero" data-track-section="hero"><div className="m4-container m4-hero__grid">
    <div className="m4-hero__intro"><p className="m4-pill m4-pill--danger"><span /> Don&apos;t quit right before the breakthrough.</p><h1>Commit to Weight Loss.<br /><strong>Get Your 4th Month <FreeLink /> — Forever.</strong></h1><p className="m4-hero__lede">Most weight loss journeys stall in month 2, right before real results kick in. Lock in your 4-month plan today, silence the &quot;food noise&quot; for good, and get a free month on us.</p></div>
    <div className="m4-hero__visual" aria-label="InstaRx member before and after results">
      <figure className="m4-photo m4-photo--before"><Image src="/lose-weight/model1-before-cropped.webp" alt="InstaRx member before beginning her weight-loss journey" fill sizes="(max-width: 767px) 45vw, 260px" priority /><figcaption>Before</figcaption></figure>
      <figure className="m4-photo m4-photo--after"><Image src="/lose-weight/model1-after-cropped.webp" alt="InstaRx member after progressing on her weight-loss journey" fill sizes="(max-width: 767px) 45vw, 260px" priority /><figcaption>After</figcaption></figure>
      <Image className="m4-hero__vial" src="/lose-weight/instarx-tirzepatide-v2.webp" alt="InstaRx tirzepatide medication vial" width={180} height={240} priority />
    </div>
    <div className="m4-hero__details"><ul className="m4-checklist m4-checklist--hero">
      <li><Check /><span><strong>Every 4th Month Is <FreeLink />:</strong> We cover it, every four months, for as long as you stay.</span></li>
      <li><Check /><span><strong>Same Price at Every Dose:</strong> No step-ups, no dosage-based pricing, ever.</span></li>
      <li><Check /><span><strong>Zero Hidden Fees:</strong> Doctor visit, prescription, and free 1-2 day shipping are all included.</span></li>
    </ul><CtaLink location="hero" className="m4-btn m4-btn--green m4-hero-cta">Claim My Free Month Now <ArrowRight /></CtaLink><p className="m4-secure"><LockKeyhole /> Secure checkout · HIPAA compliant · No membership fees</p><div className="m4-trust-row"><Stars compact /><strong>Excellent 4.7</strong><span>10,000+ happy customers</span><span>Doctor-prescribed</span></div></div>
  </div></section>;
}
