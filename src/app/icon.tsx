import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/**
 * Monogram favicon. Kept to Latin glyphs so it renders correctly with the
 * default font bundled with the image generator.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #5a1226 0%, #330b16 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 384,
            height: 384,
            borderRadius: "50%",
            border: "10px solid rgba(216, 191, 156, 0.55)",
            color: "#fbf8f4",
            fontSize: 190,
            fontWeight: 600,
            letterSpacing: -8,
          }}
        >
          FL
        </div>
      </div>
    ),
    size,
  );
}
