import {
  dataset,
  getGeographyBySlug,
  getLatestObservation,
  getMetricBySlug,
  getMetricObservations,
  getMethodology,
  getMetricSources
} from "./dataset";

export function getHomepagePayload() {
  const headlineMetric = getMetricBySlug("population-total");
  const headlineObservation = headlineMetric ? getLatestObservation(headlineMetric.id, "ca") : undefined;

  return {
    generatedAt: dataset.generatedAt,
    highlights: dataset.highlights,
    roadmapItems: [
      "More demographic domains will be added through the same metric registry.",
      "Daily source checks prepare the platform for official release updates.",
      "Nowcasts stay visible but clearly separated from official values."
    ],
    headlineMetric,
    headlineObservation
  };
}

export function getMetricPayload(metricSlug: string, geographySlug?: string) {
  const metric = getMetricBySlug(metricSlug);
  if (!metric) {
    return null;
  }

  const geography = geographySlug ? getGeographyBySlug(geographySlug) : getGeographyBySlug("canada");
  const geographyId = geography?.id;
  const series = getMetricObservations(metric.id, geographyId);

  return {
    metric,
    geography,
    series,
    sources: getMetricSources(metric.id),
    methodology: getMethodology(metric.methodologyId),
    latestOfficial: series.filter((item) => item.kind === "official").at(-1),
    latestEstimate: series.filter((item) => item.kind === "estimate").at(-1)
  };
}
