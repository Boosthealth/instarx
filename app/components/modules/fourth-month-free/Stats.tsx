import { Stars } from "./display";

export function Stats() {
  return <section className="m4-stats"><div className="m4-container m4-stats__grid"><div><strong>10,000+</strong><span>Happy Customers</span></div><a href="https://www.trustpilot.com/review/instarx.com" target="_blank" rel="noopener noreferrer"><Stars /><span>InstaRx Trustpilot Rating</span></a><div><strong>Up to <a href="#clinical-sources">17%*</a></strong><span>Body Weight Lost</span></div><div><strong>$0</strong><span>Hidden Fees. $0 Membership. Ever.</span></div></div></section>;
}
