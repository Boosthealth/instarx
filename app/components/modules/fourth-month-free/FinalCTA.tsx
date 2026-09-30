import { ArrowRight, LockKeyhole, TriangleAlert } from "lucide-react";
import { CtaLink } from "./ui";

export function FinalCTA() {
  return <section className="m4-section m4-final" data-track-section="final"><div className="m4-container"><p className="m4-pill m4-pill--danger"><TriangleAlert /> Don&apos;t miss the breakthrough</p><h2>Your 4th Month Is Already Paid For.<a href="#offer-terms">*</a><br /><span>You Just Have to Claim It.</span></h2><p>Thousands of patients almost gave up in month 2. The ones who committed to the full journey are the ones who transformed. Your breakthrough is waiting.</p><p className="m4-secure"><LockKeyhole /> Secure checkout · HIPAA compliant · No hidden fees</p><CtaLink location="final" className="m4-btn m4-btn--green">Claim My Free Month Now <ArrowRight /></CtaLink></div></section>;
}
