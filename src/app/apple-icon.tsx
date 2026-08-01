import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          gap: 6,
          backgroundImage: "linear-gradient(135deg, #5a1226 0%, #330b16 100%)",
          color: "#fbf8f4",
        }}
      >
        <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: -3 }}>FL</div>
        <div
          style={{
            fontSize: 15,
            letterSpacing: 5,
            color: "#d8bf9c",
            textTransform: "uppercase",
          }}
        >
          Kyiv Opt
        </div>
      </div>
    ),
    size,
  );
}
