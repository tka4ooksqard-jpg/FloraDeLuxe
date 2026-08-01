import { supplierRegions, supplyHub } from "@/lib/content/suppliers";

const VIEW_W = 100;
const VIEW_H = 62;

/** Percent coordinates → viewBox units. */
function toPoint(x: number, y: number) {
  return { x: (x / 100) * VIEW_W, y: (y / 100) * VIEW_H };
}

/** Quadratic arc bowed away from the straight line, so routes never overlap. */
function arc(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  return `M ${from.x} ${from.y} Q ${midX} ${midY - distance * 0.24} ${to.x} ${to.y}`;
}

/**
 * Schematic diagram of supply directions — intentionally not a geographic
 * projection, so it cannot be read as a precise route or logistics claim.
 */
export function SupplyMap() {
  const hub = toPoint(supplyHub.x, supplyHub.y);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={`Схема напрямків поставок: ${supplierRegions
        .map((region) => region.country)
        .join(", ")} — до Києва`}
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="supply-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brass)" stopOpacity="0.15" />
          <stop offset="65%" stopColor="var(--color-bordeaux)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--color-bordeaux)" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="hub-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--color-bordeaux)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-bordeaux)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="var(--color-line-strong)" strokeWidth="0.15" opacity="0.55">
        {[10, 20, 30, 40, 50].map((y) => (
          <line key={`lat-${y}`} x1="0" y1={y} x2={VIEW_W} y2={y} />
        ))}
        {[12, 26, 40, 54, 68, 82, 96].map((x) => (
          <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2={VIEW_H} />
        ))}
      </g>

      {supplierRegions.map((region) => {
        const point = toPoint(region.map.x, region.map.y);
        if (region.code === "UA") return null;
        return (
          <path
            key={`route-${region.code}`}
            d={arc(point, hub)}
            fill="none"
            stroke="url(#supply-line)"
            strokeWidth="0.45"
            strokeLinecap="round"
            strokeDasharray="1.6 1.4"
          />
        );
      })}

      <circle cx={hub.x} cy={hub.y} r="9" fill="url(#hub-glow)" />

      {supplierRegions.map((region) => {
        const point = toPoint(region.map.x, region.map.y);
        return (
          <g key={`node-${region.code}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="2.6"
              fill="var(--color-porcelain)"
              stroke="var(--color-bordeaux)"
              strokeWidth="0.5"
            />
            <text
              x={point.x}
              y={point.y + 0.9}
              textAnchor="middle"
              fontSize="2"
              fontWeight="600"
              letterSpacing="0.1"
              fill="var(--color-bordeaux)"
            >
              {region.code}
            </text>
          </g>
        );
      })}

      <g>
        <circle
          cx={hub.x}
          cy={hub.y}
          r="2.2"
          fill="var(--color-bordeaux)"
          stroke="var(--color-porcelain)"
          strokeWidth="0.7"
        />
        <text
          x={hub.x}
          y={hub.y + 6}
          textAnchor="middle"
          fontSize="2.6"
          fontWeight="600"
          letterSpacing="0.2"
          fill="var(--color-ink)"
        >
          {supplyHub.label}
        </text>
      </g>
    </svg>
  );
}
