import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          background: "#201515",
          borderRadius: 16,
          padding: "14px 12px",
        }}
      >
        <div style={{ width: 30, height: 8, borderRadius: 4, background: "#ff4f00" }} />
        <div style={{ width: 40, height: 8, borderRadius: 4, background: "#fffefb" }} />
        <div style={{ width: 20, height: 8, borderRadius: 4, background: "#fffefb", opacity: 0.35 }} />
      </div>
    ),
    { ...size }
  );
}
