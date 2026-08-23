import { ImageResponse } from "next/og";

export const alt = "TraderMarket — The Prop Firm Leaderboard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fffefb",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ width: 30, height: 9, borderRadius: 4, background: "#ff4f00" }} />
            <div style={{ width: 40, height: 9, borderRadius: 4, background: "#201515" }} />
          </div>
          <span style={{ fontSize: 34, fontWeight: 800, color: "#201515" }}>
            Trader<span style={{ color: "#ff4f00" }}>Market</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#ff4f00",
            }}
          >
            Prop firm leaderboard
          </span>
          <span style={{ fontSize: 64, fontWeight: 500, lineHeight: 1.1, color: "#201515" }}>
            Outbid the firm currently holding your rank.
          </span>
          <span style={{ fontSize: 28, color: "#605d52" }}>
            One payment. No subscription. tradermarket.online
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
