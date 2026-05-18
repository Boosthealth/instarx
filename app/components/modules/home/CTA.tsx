import { Button } from "./Button";

function StarBox({ fill = 1 }: { fill?: number }) {
  const pct = `${Math.round(fill * 100)}%`;
  return (
    <span className="relative inline-flex items-center justify-center w-4 h-4 overflow-hidden" style={{ backgroundColor: "#dcdce0" }}>
      <span className="absolute inset-0" style={{ backgroundColor: "#00b67a", width: pct }} />
      <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden="true" className="relative z-10">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </span>
  );
}

export const CTA = ({ href, btnText, className, price = false }: { href: string; btnText?: string; className?: string; price?: boolean }) => {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Button href={href} text={btnText || "Start Quiz →"} className={`${price ? "" : "min-w-60"} w-full sm:w-auto`} />
        {price && <Button href="#pricing" text="See Pricing" color="light" className="w-full sm:w-auto" />}
      </div>
      <p className="text-center text-sm text-gray-700">
        No Hidden Fees &nbsp;·&nbsp; No Monthly Membership &nbsp;·&nbsp; Cancel Anytime
      </p>

      <div className="flex flex-wrap justify-center items-center gap-2">
        <span className="text-sm font-bold text-gray-800">Excellent 4.7</span>
        <div className="flex items-center gap-0.5" role="img" aria-label="4.7 out of 5 stars">
          <StarBox fill={1} />
          <StarBox fill={1} />
          <StarBox fill={1} />
          <StarBox fill={1} />
          <StarBox fill={0.7} />
        </div>
        <span className="text-sm text-gray-700">10,000+ Happy Customers</span>
      </div>
    </div>
  )
}