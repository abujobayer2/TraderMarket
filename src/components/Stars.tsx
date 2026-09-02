import { useId } from "react";

// Trustpilot-style star rating: five rounded-square tiles with a white star
// knocked out of each. One <svg> per rating (not ten): the filled colour is
// revealed through a single clip rect whose width tracks `value`, so a
// fractional rating like 4.3 partially fills the straddling tile.
const STAR =
  "M12 .587l3.668 7.431 8.2 1.192-5.934 5.783 1.401 8.168L12 18.897l-7.335 3.855 1.401-8.168L.132 9.21l8.2-1.192z";

const GAP = 3; // px between tiles

export function Stars({
  value,
  size = 18,
  className = "",
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const clipId = useId();
  const clamped = Math.max(0, Math.min(5, value));
  const width = size * 5 + GAP * 4;
  const fillWidth = (clamped / 5) * width;
  const pad = size * 0.14;
  const scale = (size - pad * 2) / 24;

  const tiles = (color: string) =>
    [0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(${i * (size + GAP)} 0)`}>
        <rect width={size} height={size} rx={size * 0.16} fill={color} />
        <path
          d={STAR}
          fill="var(--color-on-primary)"
          transform={`translate(${pad} ${pad}) scale(${scale})`}
        />
      </g>
    ));

  return (
    <svg
      className={`inline-block shrink-0 align-middle ${className}`}
      width={width}
      height={size}
      viewBox={`0 0 ${width} ${size}`}
      role="img"
      aria-label={`${clamped.toFixed(1)} out of 5 stars`}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={fillWidth} height={size} />
        </clipPath>
      </defs>
      {tiles("var(--color-mute)")}
      <g clipPath={`url(#${clipId})`}>{tiles("var(--color-primary)")}</g>
    </svg>
  );
}
