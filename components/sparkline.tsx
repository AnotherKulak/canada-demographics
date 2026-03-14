import { Observation } from "../lib/types";

type SparklineProps = {
  series: Observation[];
};

export function Sparkline({ series }: SparklineProps) {
  if (series.length === 0) {
    return null;
  }

  const width = 540;
  const height = 180;
  const padding = 18;
  const values = series.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = series.map((point, index) => {
    const x = padding + (index / Math.max(series.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
    return { ...point, x, y };
  });

  const official = points.filter((point) => point.kind === "official");
  const estimate = points.filter((point) => point.kind === "estimate");

  const pathFor = (items: typeof points) =>
    items.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Metric trend chart">
      <path className="line" d={pathFor(official)} />
      {estimate.length > 0 ? <path className="line estimate" d={pathFor([official.at(-1)!, ...estimate])} /> : null}
      {points.map((point) => (
        <circle
          key={`${point.period}-${point.kind}`}
          className="point"
          cx={point.x}
          cy={point.y}
          r={point.kind === "estimate" ? 4.5 : 4}
          opacity={point.kind === "estimate" ? 0.6 : 1}
        />
      ))}
    </svg>
  );
}
