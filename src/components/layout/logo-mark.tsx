// The brand mark: a wallet with a plane climbing out of it. Plain hex fills
// (not Tailwind classes) so the same SVG renders in the header and in the
// generated favicon / social images (next/og).
const action = "#1f5bd8";
const sun = "#ffc83d";

// Phosphor "AirplaneTilt" (fill), 256-unit box, nose pointing up and right.
const plane =
  "M215.52,197.26a8,8,0,0,1-1.86,8.39l-24,24A8,8,0,0,1,184,232a7.09,7.09,0,0,1-.79,0,8,8,0,0,1-5.87-3.52l-44.07-66.12L112,183.59V208a8,8,0,0,1-2.34,5.65s-14,14.06-15.88,15.88A7.91,7.91,0,0,1,91,231.41a8,8,0,0,1-10.41-4.35l-.06-.15-14.7-36.76L29,175.42a8,8,0,0,1-2.69-13.08l16-16A8,8,0,0,1,48,144H72.4l21.27-21.27L27.56,78.65a8,8,0,0,1-1.22-12.32l24-24a8,8,0,0,1,8.39-1.86l85.94,31.25L176.2,40.19a28,28,0,0,1,39.6,39.6l-31.53,31.53Z";

export function LogoMarkSvg({ size, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill={action} />
      <rect x="6" y="19" width="25" height="14" rx="4" fill="#ffffff" />
      <rect x="22" y="23" width="11.5" height="6" rx="3" fill={sun} />
      <circle cx="26.2" cy="26" r="1.3" fill={action} />
      {/* The tile-coloured stroke cuts the plane free where it overlaps the wallet. */}
      <path
        d={plane}
        transform="translate(17.5 1.2) scale(0.075)"
        fill={sun}
        stroke={action}
        strokeWidth="22"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
    </svg>
  );
}
