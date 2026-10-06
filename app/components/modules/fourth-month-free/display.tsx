export function FreeLink({ children = "FREE*", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a href="#offer-terms" className={`underline decoration-2 underline-offset-4 hover:text-blue-500 ${className}`.trim()}>
      {children}
    </a>
  );
}

// Same Trustpilot treatment as the /glp2 hero (app/components/modules/home/Hero.tsx).
function StarBox({ fill = 1 }: { fill?: number }) {
  return (
    <span className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-[#dcdce0]">
      <span className="absolute inset-0 bg-[#00b67a]" style={{ width: `${Math.round(fill * 100)}%` }} />
      <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true" className="relative z-10">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </span>
  );
}

export function TrustpilotStars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`.trim()}>
      <span className="text-sm font-bold text-gray-900">Excellent 4.7</span>
      <div className="flex items-center gap-0.5" role="img" aria-label="4.7 out of 5 stars">
        <StarBox />
        <StarBox />
        <StarBox />
        <StarBox />
        <StarBox fill={0.7} />
      </div>
      <span className="text-sm text-gray-700">10,000+ happy customers</span>
    </div>
  );
}

export function Price({ value }: { value: number }) {
  return <>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)}</>;
}
