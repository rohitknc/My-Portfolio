import { ImageResponse } from "next/og";
export const alt =
  "Narasimha Charyulu — Dynamics 365 & Power Platform Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#f5f3eb",
        color: "#263c32",
        padding: "64px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>Narasimha Charyulu.</span>
        <span style={{ color: "#b94d31" }}>DYNAMICS 365 / POWER PLATFORM</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 90,
          letterSpacing: -4,
          lineHeight: 1.05,
        }}
      >
        <span>Business systems.</span>
        <span style={{ color: "#b94d31" }}>Human outcomes.</span>
      </div>
      <div style={{ fontSize: 24 }}>
        Enterprise applications · Automation · AI integrations
      </div>
    </div>,
    { ...size },
  );
}
