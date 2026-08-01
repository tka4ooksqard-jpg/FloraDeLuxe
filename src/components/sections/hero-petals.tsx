import type { CSSProperties } from "react";

/**
 * Very thin decorative petals — 3 max, low opacity, never interactive.
 * Hidden under prefers-reduced-motion via the global media query.
 */
const petals = [
  { top: "18%", left: "64%", size: 9, duration: "28s", delay: "0s", x: "32px", y: "-110px", rot: "24deg" },
  { top: "36%", left: "80%", size: 7, duration: "24s", delay: "3s", x: "-24px", y: "-85px", rot: "-18deg" },
  { top: "56%", left: "70%", size: 10, duration: "30s", delay: "1.6s", x: "38px", y: "-120px", rot: "30deg" },
] as const;

export function HeroPetals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {petals.map((petal, index) => (
        <span
          key={index}
          className="hero-petal"
          style={
            {
              top: petal.top,
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.3,
              "--petal-duration": petal.duration,
              "--petal-delay": petal.delay,
              "--petal-x": petal.x,
              "--petal-y": petal.y,
              "--petal-rot": petal.rot,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
