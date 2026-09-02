import { ImageResponse } from "next/og";

export const alt =
  "TraderMarket — compare, review and rank proprietary trading firms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#201515";
const CREAM = "#fffefb";
const ORANGE = "#ff4f00";

function Bars({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 * scale }}>
      <div
        style={{
          width: 34 * scale,
          height: 9 * scale,
          borderRadius: 5 * scale,
          background: ORANGE,
        }}
      />
      <div
        style={{
          width: 46 * scale,
          height: 9 * scale,
          borderRadius: 5 * scale,
          background: CREAM,
        }}
      />
      <div
        style={{
          width: 22 * scale,
          height: 9 * scale,
          borderRadius: 5 * scale,
          background: CREAM,
          opacity: 0.35,
        }}
      />
    </div>
  );
}

function Row({
  rank,
  width,
  dim,
}: {
  rank: number;
  width: number;
  dim?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        width: 420,
        padding: "18px 22px",
        borderRadius: 18,
        background: dim ? "rgba(255,254,251,0.06)" : "rgba(255,254,251,0.1)",
        border: `1px solid rgba(255,254,251,${dim ? 0.08 : 0.16})`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: 12,
          background: rank === 1 ? ORANGE : "rgba(255,254,251,0.14)",
          color: rank === 1 ? INK : CREAM,
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        {rank}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div
          style={{
            width: 150 - rank * 12,
            height: 12,
            borderRadius: 6,
            background: CREAM,
            opacity: dim ? 0.55 : 0.9,
          }}
        />
        <div
          style={{
            width,
            height: 8,
            borderRadius: 5,
            background: ORANGE,
            opacity: dim ? 0.5 : 1,
          }}
        />
      </div>
      <span style={{ fontSize: 20, fontWeight: 700, color: CREAM, opacity: dim ? 0.5 : 0.9 }}>
        {`$${(9 - rank * 2) * 50}`}
      </span>
    </div>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          padding: 72,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* soft brand glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: ORANGE,
            opacity: 0.14,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {/* brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Bars scale={1} />
            <span style={{ fontSize: 34, fontWeight: 800, color: CREAM }}>
              Trader<span style={{ color: ORANGE }}>Market</span>
            </span>
          </div>

          {/* headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 620 }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ORANGE,
              }}
            >
              Prop firm leaderboard
            </span>
            <span style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.08, color: CREAM }}>
              Compare, review &amp; rank prop trading firms
            </span>
            <span style={{ fontSize: 25, color: "rgba(255,254,251,0.62)", lineHeight: 1.4 }}>
              Trader reviews, live rankings, and payout feedback — forex, futures &amp; crypto.
            </span>
          </div>

          {/* footer */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: CREAM }}>
              tradermarket.online
            </span>
            <span style={{ fontSize: 20, color: "rgba(255,254,251,0.45)" }}>
              One payment. No subscription.
            </span>
          </div>
        </div>

        {/* mock leaderboard */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <Row rank={1} width={210} />
          <Row rank={2} width={150} />
          <Row rank={3} width={110} dim />
        </div>
      </div>
    ),
    { ...size }
  );
}
