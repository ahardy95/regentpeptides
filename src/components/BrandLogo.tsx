interface BrandLogoProps {
  className?: string;
  /** Renders light type for use on dark surfaces. */
  inverted?: boolean;
  compact?: boolean;
}

/**
 * Regent Peptides identity: a hexagonal lab-flask monogram paired with a
 * two-tone wordmark. Inline SVG keeps the mark crisp at every size.
 */
export function BrandLogo({ className, inverted, compact }: BrandLogoProps) {
  const size = compact ? 32 : 38;
  const ink = inverted ? "#ffffff" : "#1b1f1d";
  const accent = inverted ? "#3fd08a" : "#0c6b3d";

  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        aria-hidden
        className="shrink-0"
      >
        {/* Hexagon (molecular cell) */}
        <path
          d="M20 1.6 L35.6 10.8 L35.6 29.2 L20 38.4 L4.4 29.2 L4.4 10.8 Z"
          fill="none"
          stroke={ink}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        {/* Green fill level */}
        <path
          d="M4.4 24.6 L20 33.8 L35.6 24.6 L35.6 29.2 L20 38.4 L4.4 29.2 Z"
          fill={accent}
          opacity="0.9"
        />
        <text
          x="20"
          y="24"
          textAnchor="middle"
          fontFamily="Archivo, Inter, sans-serif"
          fontSize="15"
          fontWeight="800"
          letterSpacing="-0.5"
          fill={ink}
        >
          RP
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold uppercase ${
            compact ? "text-[15px]" : "text-[17px]"
          } tracking-[0.02em] ${inverted ? "text-white" : "text-navy"}`}
        >
          Regent
        </span>
        <span
          className={`mt-[3px] font-display font-semibold uppercase ${
            compact ? "text-[8.5px]" : "text-[9.5px]"
          } tracking-[0.34em] ${inverted ? "text-white/60" : "text-labblue"}`}
        >
          Peptides
        </span>
      </span>
    </span>
  );
}
