interface ChromatogramProps {
  className?: string;
}

/**
 * Understated HPLC-style trace used as a background detail. Decorative only.
 */
export function Chromatogram({ className }: ChromatogramProps) {
  return (
    <svg
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
    >
      <g stroke="currentColor" strokeOpacity="0.12" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 45 + 20} x2="1200" y2={i * 45 + 20} />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="320" />
        ))}
      </g>
      <path
        d="M0 296 L120 294 L180 290 Q205 200 226 290 L300 288 Q318 258 336 288 L420 286 Q452 60 486 286 L560 284 Q580 236 600 284 L700 282 Q716 214 734 282 L840 280 Q874 132 906 280 L1000 278 Q1016 250 1034 278 L1200 274"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeDasharray="1400"
        className="animate-regent-trace"
      />
    </svg>
  );
}
