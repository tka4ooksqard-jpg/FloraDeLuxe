import { ImageResponse } from "next/og";

import { contactConfig } from "@/lib/contact-config";

export const alt = "Flora de Luxe Kyiv OPT — оптові поставки свіжих квітів у Києві";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card. The artwork is composed from gradients and Latin
 * lettering only: the generator's bundled font has no Cyrillic coverage, so
 * Ukrainian copy is carried by the `og:title` / `og:description` tags instead.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#330b16",
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(198,135,154,0.45) 0%, rgba(198,135,154,0) 55%), radial-gradient(circle at 85% 78%, rgba(169,132,86,0.4) 0%, rgba(169,132,86,0) 55%), linear-gradient(135deg, #42101f 0%, #330b16 60%, #1c0810 100%)",
          color: "#fbf8f4",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, letterSpacing: 14, color: "#fbf8f4" }}>FLORA DE LUXE</div>
          <div style={{ fontSize: 17, letterSpacing: 10, color: "#d8bf9c", marginTop: 12 }}>
            KYIV OPT
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
            Wholesale fresh flowers
          </div>
          <div style={{ fontSize: 40, color: "rgba(251,248,244,0.65)", marginTop: 10 }}>
            for florists, shops & events
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(251,248,244,0.2)",
            paddingTop: 28,
            fontSize: 25,
            color: "rgba(251,248,244,0.8)",
          }}
        >
          <div style={{ display: "flex" }}>Kyiv · Netherlands · Ecuador · Ukraine · Armenia</div>
          <div style={{ display: "flex", color: "#d8bf9c" }}>
            {`t.me/${contactConfig.telegramUsername}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
