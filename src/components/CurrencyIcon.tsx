const GLYPHS: Record<string, string> = {
  BTC: "₿",
  ETH: "Ξ",
  USDT: "₮",
  USDC: "$",
  BNB: "B",
  DOGE: "Ð",
  TRX: "T",
};

export function CurrencyIcon({
  symbol,
  color,
  size = 28,
}: {
  symbol: string;
  color: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.5 }}
    >
      {GLYPHS[symbol] ?? symbol.charAt(0)}
    </span>
  );
}
