export function FreeLink({ children = "FREE*", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <a href="#offer-terms" className={className}>{children}</a>;
}

export function Stars({ compact = false }: { compact?: boolean }) {
  return <span className="m4-stars" aria-label="4.7 out of 5 stars">
    {[0, 1, 2, 3, 4].map((star) => <span key={star} className={star === 4 ? "m4-star m4-star--partial" : "m4-star"}>★</span>)}
    {!compact && <strong>Trustpilot</strong>}
  </span>;
}

export function Price({ value }: { value: number }) {
  return <>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)}</>;
}
