import { dataset, getLatestObservation, getMetricBySlug } from "../data/queries";

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
