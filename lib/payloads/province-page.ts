import { buildMetricCsv } from "../data/export";
import { dataset, getGeographyBySlug, getLatestObservation, getMetricObservations } from "../data/queries";

const featuredMetrics = [
  "population-total",
  "population-temporary-residents",
  "population-naturalized",
  "population-permanent-residents"
] as const;

export function getProvincePayload(provinceSlug: string) {
  const geography = getGeographyBySlug(provinceSlug);

  if (!geography || geography.level !== "province") {
    return null;
  }

  const profile = dataset.provinceProfiles.find((item) => item.geographyId === geography.id);
  const populationSeries = getMetricObservations("population-total", geography.id);
  const snapshotMetrics = featuredMetrics.map((metricId) => {
    const metric = dataset.metrics.find((entry) => entry.id === metricId)!;
    const official = getLatestObservation(metricId, geography.id, "official");

    return { metric, official };
  });

  return {
    geography,
    profile,
    populationSeries,
    populationCsv: buildMetricCsv("population-total", geography.id),
    snapshotMetrics
  };
}
