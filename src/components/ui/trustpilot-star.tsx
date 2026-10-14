/** Trustpilot's green star, for links to our profile. Never pair it with a score we don't have. */
export function TrustpilotStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <polygon points="12,1.6 14.59,9.04 22.46,9.2 16.18,13.96 18.47,21.5 12,17 5.53,21.5 7.82,13.96 1.54,9.2 9.41,9.04" fill="#00b67a" />
    </svg>
  );
}

/** One star rating as Trustpilot draws it: white stars on green squares. */
export function TrustpilotStars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className ?? ""}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`grid size-6 place-items-center ${n <= rating ? "bg-[#00b67a]" : "bg-line"}`}>
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            <polygon points="12,1.6 14.59,9.04 22.46,9.2 16.18,13.96 18.47,21.5 12,17 5.53,21.5 7.82,13.96 1.54,9.2 9.41,9.04" fill="#fff" />
          </svg>
        </span>
      ))}
    </span>
  );
}
