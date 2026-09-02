// Trustpilot-style star rating: each star is a rounded square tile with a
// white star knocked out of it. Filled tiles use the brand colour, empty
// tiles a muted grey. `value` may be fractional (e.g. 4.3) — only the tile
// straddling the value is partially filled, via an overlay clipped to the
// remaining fraction, so alignment never depends on two rows overlapping.
const STAR_PATH =
  "M12 .587l3.668 7.431 8.2 1.192-5.934 5.783 1.401 8.168L12 18.897l-7.335 3.855 1.401-8.168L.132 9.21l8.2-1.192z";

function Tile({ size, fill }: { size: number; fill: number }) {
  const clamped = Math.max(0, Math.min(1, fill));
  return (
    <span
      className="relative inline-block shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <TileFace size={size} color="var(--color-mute)" />
      {clamped > 0 && (
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${clamped * 100}%` }}
        >
          <TileFace size={size} color="var(--color-primary)" />
        </span>
      )}
    </span>
  );
}

function TileFace({ size, color }: { size: number; color: string }) {
  const pad = size * 0.14;
  const inner = size - pad * 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 block"
    >
      <rect width={size} height={size} rx={size * 0.16} fill={color} />
      <svg x={pad} y={pad} width={inner} height={inner} viewBox="0 0 24 24">
        <path d={STAR_PATH} fill="var(--color-on-primary)" />
      </svg>
    </svg>
  );
}

/**
 * Read-only star rating. `size` is the tile edge length in px.
 */
export function Stars({
  value,
  size = 18,
  className = "",
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[3px] align-middle ${className}`}
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Tile key={i} size={size} fill={value - i} />
      ))}
    </span>
  );
}
