import { describe, expect, it } from "vitest";

import { buildMetricCsv } from "../../lib/data/export";
import { getLatestObservation, getMetricObservations } from "../../lib/data/queries";
import { getMetricPayload } from "../../lib/payloads/metric-page";

describe("dataset pipeline", () => {
  it("builds official and estimated observations for nowcast-enabled metrics", () => {
    const series = getMetricObservations("population-total", "ca");

    expect(series.some((point) => point.kind === "official")).toBe(true);
    expect(series.some((point) => point.kind === "estimate")).toBe(true);
    expect(getLatestObservation("population-total", "ca", "estimate")?.period).toBe("2026-Q1");
  });

  it("exports metric series as CSV", () => {
    const csv = buildMetricCsv("population-total", "ca");

    expect(csv).toContain("period,geography,kind,value,sourceId");
    expect(csv).toContain("2025-Q4,Canada,official,41240000,statscan-pop-estimates");
  });

  it("defaults metric payloads to Canada-only observations", () => {
    const payload = getMetricPayload("population-total");

    expect(payload?.geography?.id).toBe("ca");
    expect(payload?.series.every((point) => point.geographyId === "ca")).toBe(true);
    expect(payload?.series.filter((point) => point.period === "2025-Q2")).toHaveLength(1);
  });
});
