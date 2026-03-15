import { geographyLookup, geographies } from "../registry/geographies";
import { metrics } from "../registry/metrics";
import { sources } from "../registry/sources";
import type { Geography } from "../types/dataset";
import { dataset, observations } from "./build-dataset";
import { quarterToTuple } from "./build-dataset";

export function getMetricBySlug(slug: string) {
  return metrics.find((metric) => metric.slug === slug);
}

export function getGeographyBySlug(slug: string): Geography | undefined {
  return geographies.find((geo) => geo.slug === slug);
}

export function getMetricObservations(metricId: string, geographyId?: string) {
  return observations
    .filter((observation) => observation.metricId === metricId)
    .filter((observation) => (geographyId ? observation.geographyId === geographyId : true))
    .sort((a, b) => {
      const [yearA, quarterA] = quarterToTuple(a.period);
      const [yearB, quarterB] = quarterToTuple(b.period);
      return yearA - yearB || quarterA - quarterB;
    });
}

export function getLatestObservation(metricId: string, geographyId: string, preferredKind?: "official" | "estimate") {
  const series = getMetricObservations(metricId, geographyId);
  const filtered = preferredKind ? series.filter((item) => item.kind === preferredKind) : series;
  return filtered.at(-1);
}

export function getMetricSources(metricId: string) {
  const metric = metrics.find((entry) => entry.id === metricId);
  if (!metric) {
    return [];
  }

  return metric.sourceIds.map((sourceId) => {
    const source = sources.find((entry) => entry.id === sourceId);
    if (!source) {
      throw new Error(`Unknown source: ${sourceId}`);
    }

    return source;
  });
}

export function getMethodology(methodologyId: string) {
  const methodology = dataset.methodologies.find((entry) => entry.id === methodologyId);
  if (!methodology) {
    throw new Error(`Unknown methodology: ${methodologyId}`);
  }

  return methodology;
}

export function listProvinceSnapshots(metricId: string) {
  return geographies
    .filter((geo) => geo.level === "province")
    .map((geo) => ({
      geography: geo,
      latest: getLatestObservation(metricId, geo.id, "official")
    }))
    .filter((entry) => Boolean(entry.latest));
}

export { dataset, geographyLookup, geographies, metrics };
