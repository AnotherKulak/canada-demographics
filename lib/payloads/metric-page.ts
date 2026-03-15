import {
  getGeographyBySlug,
  getLatestObservation,
  getMethodology,
  getMetricBySlug,
  getMetricObservations,
  getMetricSources
} from "../data/queries";

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
    latestOfficial: geographyId ? getLatestObservation(metric.id, geographyId, "official") : undefined,
    latestEstimate: geographyId ? getLatestObservation(metric.id, geographyId, "estimate") : undefined
  };
}
