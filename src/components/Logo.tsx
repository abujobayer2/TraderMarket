type LogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  invert?: boolean;
  showText?: boolean;
};

export function LogoMark({ className, invert }: { className?: string; invert?: boolean }) {
  const barColor = invert ? "var(--color-canvas)" : "var(--color-ink)";
  return (
    <svg
      viewBox="0 0 40 28"
      className={className}
      width="28"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <rect x="16" y="0" width="24" height="8" rx="4" fill="var(--color-primary)" />
      <rect x="0" y="10" width="32" height="8" rx="4" fill={barColor} />
      <rect x="0" y="20" width="16" height="8" rx="4" fill={barColor} opacity="0.35" />
    </svg>
  );
}

export function Logo({ className = "", iconClassName, textClassName, invert, showText = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={iconClassName} invert={invert} />
      {showText && (
        <span
          className={`text-[22px] leading-none tracking-[-0.5px] ${
            invert ? "text-canvas" : "text-ink"
          } ${textClassName ?? ""}`}
          style={{ fontFamily: "var(--font-logo)", fontWeight: 800 }}
        >
          Trader<span style={{ color: "var(--color-primary)" }}>Market</span>
        </span>
      )}
    </span>
  );
}
